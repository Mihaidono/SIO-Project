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
    this.sensorService.activateMotor();
  }

  toggleAutomatedCare() {
    this.automatedCareChecked = !this.automatedCareChecked;
  }
}
