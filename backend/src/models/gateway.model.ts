import * as mongoose from 'mongoose';
import { Gateway } from '../interfaces/gateway.interface';
import { deviceSchema } from './device.model';

const gatewaySchema = new mongoose.Schema({
  id: String,
  name: String,
  serial: {
    unique: true,
    type: String
  },
  ip: String,
  createdAt: { type: Date, default: Date.now() },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'device' }],

});

const gatewayModel = mongoose.model<Gateway & mongoose.Document>('Gateway', gatewaySchema);

export default gatewayModel;
