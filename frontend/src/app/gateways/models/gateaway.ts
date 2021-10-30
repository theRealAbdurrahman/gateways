import { Device } from "./device";

export interface Gateway {
   name: string,
   serial: string,
   ip: string,
   createdAt?: string,
   devices?: Device[]
}
