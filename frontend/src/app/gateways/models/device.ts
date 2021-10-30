export interface Device {
  vendor: string;
  status: DeviceStatus;
  uid: string;
  createdDate?: string;
}
export enum DeviceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}
