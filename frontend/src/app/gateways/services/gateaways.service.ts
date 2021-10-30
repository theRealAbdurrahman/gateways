import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { map, tap } from 'rxjs/operators';
import { Gateway } from '../models/gateaway';
import { Observable } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  baseURl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllGateways(): Observable<Gateway[]> {
    return this.http
      .get<{ data: Gateway[]; message: string }>(`${this.baseURl}/gateway`)
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res.data)
      );
  }
  createGateway(gateaway: Gateway): Observable<Gateway> {
    return this.http
      .post<{ data: Gateway; message: string }>(
        `${this.baseURl}/gateway`,
        gateaway
      )
      .pipe(map((res) => res.data));
  }

  deleteGateway(gatewaySerial: string) {
    return this.http
      .delete<{ data: Gateway; message: string }>(
        `${this.baseURl}/gateway/${gatewaySerial}`
      )
      .pipe(map((res) => res.data));
  }

  getGetwayBySerial(serial: string): Observable<Gateway> {
    return this.http
      .get<{ data: Gateway; message: string }>(
        `${this.baseURl}/gateway/${serial}`
      )
      .pipe(map((res) => res.data));
  }
  addDevice(device: Device, gatewaySerial: string): Observable<Gateway> {
    return this.http
      .post<{ data: Gateway; message: string }>(
        `${this.baseURl}/gateway/${gatewaySerial}/device`,
        device
      )
      .pipe(map((res) => res.data));
  }
  deleteDevice(gatewaySerial: string, deviceUID: string) {
    return this.http
      .delete<{ data: Gateway; message: string }>(
        `${this.baseURl}/gateway/${gatewaySerial}/device/${deviceUID}`
      )
      .pipe(map((res) => res.data));
  }
}
