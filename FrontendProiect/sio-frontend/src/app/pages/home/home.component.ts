import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { SensorData } from 'src/app/models/SensorData';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  automatedCareChecked: boolean = true;

  currentlyDisplayedSensorData: SensorData = {
    temperatureSensor: 0,
    humiditySensor: 0,
    brightnessSensor: 0,
    datetime: '',
  };
  private intervalSubscription!: Subscription;

  constructor(private sensorService: SensorService) {}

  ngOnInit() {
    const plantBackgroundImg = '../../../assets/plant_background.jpg';
    const containerElement = document.querySelector('.container') as HTMLDivElement;

    this.intervalSubscription = interval(1000).subscribe(() => {
      this.fetchSensorData();
    });

    this.sensorService.getSensorData().subscribe(
      (data: SensorData) => {
        this.currentlyDisplayedSensorData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching sensor data: ', error);
      }
    );

    if (containerElement) {
      this.checkImage(plantBackgroundImg)
        .then(() => {
          // Image exists, set it as the background for the .container element
          containerElement.style.backgroundImage = `url("${plantBackgroundImg}")`;
        })
        .catch(() => {
          // Image doesn't exist, handle accordingly (e.g., set a default background)
          console.error('Image not found:', plantBackgroundImg);
        });
    } else {
      console.error('.container element not found');
    }
  }

  private checkImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  fetchSensorData() {
    this.sensorService.getSensorData().subscribe(
      (data: SensorData) => {
        this.currentlyDisplayedSensorData = data;
      },
      (error) => {
        console.error('Error fetching sensor data: ', error);
      }
    );
  }

  waterPlant() {
    this.sensorService.activateMotor().subscribe(
      (response: any) => {
        console.log('Motor activated:', response);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  toggleAutomatedCare() {
    this.automatedCareChecked = !this.automatedCareChecked;
  }
}
