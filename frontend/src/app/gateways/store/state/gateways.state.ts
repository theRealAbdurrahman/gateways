import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Gateway } from 'src/app/gateways/models/gateaway';
import {
  AddDevice,
  CreateGateways,
  DeleteDevice,
  DeleteGateway,
  GetGetwayBySerial,
  ListAllGateways,
  SetSelectedGateway,
} from './gateways.actions';
import { GatewaysService } from '../../services/gateaways.service';
import { tap } from 'rxjs/operators';
import { SnackBarService } from '../../../services/snackbar.service';
import { SnackBarState } from 'src/app/components/snackbar/snackbar.component';

export interface GatewaysStateModel {
  gatewaysList: Gateway[];
  selectedGateway?: Gateway;
}

const defaults = {
  gatewaysList: [],
};

@State<GatewaysStateModel>({
  name: 'gateways',
  defaults,
})
@Injectable()
export class GatewaysState {
  @Selector()
  static getAllGatewaysList(state: GatewaysStateModel): Gateway[] {
    return state.gatewaysList;
  }
  @Selector()
  static getSelectedGateway(state: GatewaysStateModel): Gateway | undefined {
    return state.selectedGateway;
  }

  constructor(
    private gatewayService: GatewaysService,
    private snackBarService: SnackBarService
  ) {}

  @Action(ListAllGateways)
  listAllGateways({ patchState }: StateContext<GatewaysStateModel>) {
    return this.gatewayService.getAllGateways().pipe(
      tap((gateways) => {
        patchState({ gatewaysList: gateways });
      })
    );
  }

  @Action(CreateGateways)
  addGateway(
    { getState, setState }: StateContext<GatewaysStateModel>,
    { gateway }: CreateGateways
  ) {
    return this.gatewayService.createGateway(gateway).pipe(
      tap((res) => {
        const state = getState();
        setState({ gatewaysList: [...state.gatewaysList, res] });
        this.snackBarService.showSnackbar(
          'Gateway added!',
          'OK',
          SnackBarState.SUCCESS
        );
      })
    );
  }
  @Action(DeleteGateway)
  deleteGateway(
    _: StateContext<GatewaysStateModel>,
    { gatewaySerial }: DeleteGateway
  ) {
    return this.gatewayService.deleteGateway(gatewaySerial).pipe(
      tap((res) => {
        this.snackBarService.showSnackbar(
          'Gateway deleted!',
          'OK',
          SnackBarState.SUCCESS
        );
      })
    );
  }
  @Action(AddDevice)
  addDevice(
    { getState, setState }: StateContext<GatewaysStateModel>,
    { device, gatewaySerial }: AddDevice
  ) {
    return this.gatewayService.addDevice(device, gatewaySerial).pipe(
      tap((res) => {
        const state = getState();
        setState({
          gatewaysList: [...state.gatewaysList, res],
          selectedGateway: res,
        });
        this.snackBarService.showSnackbar(
          'Device added!',
          'OK',
          SnackBarState.SUCCESS
        );
      })
    );
  }
  @Action(DeleteDevice)
  deleteDevice(
    { patchState }: StateContext<GatewaysStateModel>,
    { gatewaySerial, deviceUID }: DeleteDevice
  ) {
    return this.gatewayService.deleteDevice(gatewaySerial, deviceUID).pipe(
      tap((res) => {
        patchState({ selectedGateway: res });
        this.snackBarService.showSnackbar(
          'Device deleted!',
          'OK',
          SnackBarState.SUCCESS
        );
      })
    );
  }
  @Action(SetSelectedGateway)
  setSelectedGateway(
    { patchState }: StateContext<GatewaysStateModel>,
    { gateway }: SetSelectedGateway
  ) {
    patchState({ selectedGateway: gateway });
  }

  @Action(GetGetwayBySerial)
  getGetwayBySerial(
    { patchState }: StateContext<GatewaysStateModel>,
    { serial }: GetGetwayBySerial
  ) {
    return this.gatewayService.getGetwayBySerial(serial).pipe(
      tap((gateway) => {
        patchState({ selectedGateway: gateway });
      })
    );
  }
}
