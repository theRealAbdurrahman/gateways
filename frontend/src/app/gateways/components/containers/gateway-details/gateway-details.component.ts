import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Device, DeviceStatus } from 'src/app/gateways/models/device';
import { Gateway } from 'src/app/gateways/models/gateaway';
import { GatewaysState } from 'src/app/gateways/store/state/gateways.state';
import {
  AddDevice,
  DeleteDevice,
  DeleteGateway,
  GetGetwayBySerial,
} from '../../../store/state/gateways.actions';
import { CreateDeviceDialogComponent } from '../../presentational/create-device-dialog/create-device-dialog.component';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.scss'],
})
export class GatewayDetailsComponent implements OnInit {
  @Select(GatewaysState.getSelectedGateway) gateway$!: Observable<Gateway>;
  gateway!: Gateway;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gateway$.subscribe({
      next: (gateway) => {
        // dispatch the action only if the gateway is not saved in the store
        if (gateway) {
          this.gateway = gateway;
        } else {
          this.store.dispatch(
            new GetGetwayBySerial(this.route.snapshot.params['serial'])
          );
        }
      },
    });
  }
  addDevice() {
    const dialog = this.dialog.open(CreateDeviceDialogComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialog.componentInstance.formSubmitted
      .pipe(
        concatMap((value) =>
          this.store.dispatch(
            new AddDevice(
              {
                ...value,
                status: value.serial
                  ? DeviceStatus.ONLINE
                  : DeviceStatus.OFFLINE,
              },
              this.gateway.serial
            )
          )
        )
      )
      .subscribe({ next: () => dialog.close() });
  }
  deleteGateway() {
    this.store
      .dispatch(new DeleteGateway(this.gateway.serial))
      .subscribe({ next: () => this.back() });
  }
  deleteDevice(device: Device) {
    this.store.dispatch(new DeleteDevice(device.uid, this.gateway.serial));
  }
  back() {
    window.history.back();
  }
}
