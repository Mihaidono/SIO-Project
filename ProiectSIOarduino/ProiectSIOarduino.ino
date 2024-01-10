#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

#define CONNECTION_TIMEOUT 10

const char* ssid = "Mihaidono";
const char* password = "pupupupu";

// Define the pins for the sensors
const int sensorMoistureAnalog = 35;    // Analog pin 13 on ESP32 for moisture sensor
const int temperatureSensorPin = 26;    // Digital pin 26 for DS18B20 temperature sensor
const int sensorBrightnessAnalog = 34;  // Analog pin 34 for ALSPT19 brightness sensor

// Define the motor control pins
const int motorPin = 25;     // Digital pin 25 for motor control
const int motorSpeed = 255;  // Adjust the speed as needed (0 to 255)
const int dcMotorIn3 = 33;
const int dcMotorIn4 = 32;

bool externalAction = false;
OneWire oneWire(temperatureSensorPin);
DallasTemperature sensors(&oneWire);
AsyncWebServer server(80);

WiFiClient client;

void setup() {

  // Initialize Serial communication
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");
  int timeout_counter = 0;

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
    timeout_counter++;
    if (timeout_counter >= CONNECTION_TIMEOUT * 5) {
      ESP.restart();
    }
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());

  // Resolve hostname to IP address
  // Initialize the DS18B20 sensor
  sensors.begin();
  // Set the motor control pin as OUTPUT
  pinMode(motorPin, OUTPUT);

  pinMode(dcMotorIn3, OUTPUT);
  pinMode(dcMotorIn4, OUTPUT);

  digitalWrite(dcMotorIn3, HIGH);
  digitalWrite(dcMotorIn4, LOW);

  // Set the initial motor speed
  analogWrite(motorPin, 0);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(200, "esp_online", "Hello, this is ESP32!");
  });

  server.on("/sensors", HTTP_GET, [](AsyncWebServerRequest* request) {
    int moistureSensorValue = analogRead(sensorMoistureAnalog);
    moistureSensorValue = (1.0 - (moistureSensorValue / 4095.0)) * 200.0;
    sensors.requestTemperatures();
    float temperatureCelsius = sensors.getTempCByIndex(0);
    int brightnessSensorValue = analogRead(sensorBrightnessAnalog);

    String json = "{";
    json += "\"moisture\": " + String(moistureSensorValue) + ",";
    json += "\"temperature\": " + String(temperatureCelsius) + ",";
    json += "\"brightness\": " + String(brightnessSensorValue);
    json += "}";

    request->send(200, "application/json", json);
  });

  server.on("/activate_motor", HTTP_GET, [](AsyncWebServerRequest* request) {
    externalAction = true;
    // Move the motor for 2 seconds
    analogWrite(motorPin, motorSpeed);

    // Delay for 2 seconds to keep the motor running
    delay(2000);

    // Stop the motor by setting the PWM to 0
    analogWrite(motorPin, 0);
    externalAction = false;
    // Send a response indicating that the motor has been activated
    request->send(200, "text/plain", "Motor activated for 2 seconds");
  });


  server.begin();
}

void loop() {
  // Read the analog value from the moisture sensor
  int moistureSensorValue = analogRead(sensorMoistureAnalog);
  // Read the analog value from the moisture sensor
  // Read the temperature from the DS18B20 sensor
  sensors.requestTemperatures();
  float temperatureCelsius = sensors.getTempCByIndex(0);

  // Read the analog value from the ALSPT19 brightness sensor
  int brightnessSensorValue = analogRead(sensorBrightnessAnalog);
  // Check the sensor values and control the motor speed through PWM
  float moisturePercentage = (1.0 - (moistureSensorValue / 4095.0)) * 200.0;
  if (!externalAction) {
    if (moisturePercentage < 40) {
      // Increase the motor speed
      analogWrite(motorPin, motorSpeed);
    } else {
      // Stop the motor by setting the PWM to 0
      analogWrite(motorPin, 0);
    }
  }


  // Print the sensor values to the Serial Monitor
  Serial.print("Analog Moisture Sensor Percentage Value: ");
  Serial.println(moisturePercentage);
  Serial.print("DS18B20 Temperature (°C): ");
  Serial.println(temperatureCelsius);
  Serial.print("Analog Brightness Sensor Value: ");
  Serial.println(brightnessSensorValue);
  Serial.println("-------------------------------------");
  delay(1000);  // Adjust this value as needed
}
