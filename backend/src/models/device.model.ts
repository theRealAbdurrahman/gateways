import * as mongoose from 'mongoose';
import { Device, status } from '../interfaces/device.interface';

export const deviceSchema = new mongoose.Schema({
  uid: String,
  vendor: String,
  status: {
    type: String,
    enum : [status.offline, status.online]
  },
  createdDate: { type: Date, default: Date.now() },
});

const deviceModel = mongoose.model<Device & mongoose.Document>('device', deviceSchema);

export default  deviceModel;
