import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorData } from 'src/app/models/SensorData';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SensorService {
  readonly backendUrl = 'http://localhost:8080'; // sent through the broker
  readonly espStaticIP = 'http://192.168.108.170:80'; // directly sent to esp
  constructor(public httpClient: HttpClient) {}

  getSensorData(): Observable<SensorData> {
    return this.httpClient.get(
      this.backendUrl + '/getSensorData'
    ) as Observable<SensorData>;
  }

  activateMotor(): Observable<String> {
    return this.httpClient.get(
      this.espStaticIP + '/activate_motor'
    ) as Observable<String>;
  }
}
