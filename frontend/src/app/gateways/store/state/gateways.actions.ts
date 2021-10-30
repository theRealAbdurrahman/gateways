import { Gateway } from 'src/app/gateways/models/gateaway';
import { Device } from '../../models/device';

export class CreateGateways {
  static readonly type = '[Gateways] Add Gateway';
  constructor(public gateway: Gateway) {}
}
export class DeleteGateway {
  static readonly type = '[Gateways] Delete Gateway';
  constructor(public gatewaySerial: string) {}
}
export class ListAllGateways {
  static readonly type = '[Gateways] List all';
  constructor() {}
}

export class GetGetwayBySerial {
  static readonly type = '[Gateways] Get Getway By Serial';
  constructor(public serial: string) {}
}
export class SetSelectedGateway {
  static readonly type = '[Gateways] Set Selected Gateway';
  constructor(public gateway: Gateway) {}
}
export class AddDevice {
  static readonly type = '[Gateways] Add Device to gateway';
  constructor(public device: Device, public gatewaySerial: string) {}
}
export class DeleteDevice {
  static readonly type = '[Gateways] Delete Device';
  constructor(public deviceUID: string, public gatewaySerial: string) {}
}
