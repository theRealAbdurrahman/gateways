export interface Device {
  uid: string;
  vendor: string;
  status: status;
}

export enum status{
  online= 'online',
  offline= 'offline'
}
