import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import gatewayModel from '../models/gateway.model';
import { isEmptyObject } from '../utils/util';
import { Gateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dtos/gateway.dto';
import { AddDeviceDto } from '../dtos/device.dto';
import { Device } from '../interfaces/device.interface';
import { v4 as uuidv4 } from 'uuid';
import deviceModel from '../models/device.model';

class GatewayService {
  public gateway = gatewayModel;
  public device = deviceModel;
  public async getAll() {
    const gateways: Gateway[] = await this.gateway.find().populate('devices');
    return gateways;
  }
  public async getone(serial: string) {
    const gateway: Gateway = await this.gateway.findOne({ serial }).populate('devices');
    if (!gateway) {
      throw new HttpException(404, 'gateway not found');
    }
    return gateway;
  }
  public async createGetWays(createGatewayDto: CreateGatewayDto) {
    const getOneGateway: Gateway = await this.gateway.findOne({ serial: createGatewayDto.serial });
    if (getOneGateway) {
      throw new HttpException(403, 'duplicate serial number');
    }
    const gateway: Gateway = await this.gateway.create(createGatewayDto);
    return gateway;
  }
  public async addDevice(addDeviceDto: AddDeviceDto, gatewaySerial: string) {
    const getOneGateway: Gateway = await this.getone(gatewaySerial);
    const device: Device = { ...addDeviceDto, uid: uuidv4() };
    if (getOneGateway.devices.length === 10) {
      throw new HttpException(403, `this gateway ${getOneGateway.name} exceed maximum device `);
    }
    const createdDevice: Device = await this.device.create(device);
    await this.gateway.findOneAndUpdate(
      { serial: gatewaySerial },
      { devices: [...getOneGateway.devices, createdDevice] }
    );
    return await this.getone(gatewaySerial);
  }
  public async getoneDevice(uid: string) {
    const device: Device = await this.device.findOne({ uid });
    if (!device) {
      throw new HttpException(404, 'device not found');
    }
    return device;
  }
  public async deleteGateway(serial: string) {
    const getOneGateway: Gateway = await this.getone(serial);

    return this.gateway.findOneAndDelete({ serial });
  }

  public async deleteDevice(serial: string, uid: string) {
    const getOneGateway: Gateway = await this.getone(serial);
    const device: Device = await this.getoneDevice(uid);
    const filterdGetWayDevices = getOneGateway.devices.filter((deviceItem) => {
      return deviceItem.uid !== uid;
    });
    const updatedGateway: Gateway = await this.gateway.findOneAndUpdate(
      { serial },
      { devices: filterdGetWayDevices }
    );

    await this.device.findOneAndDelete({ uid });
    return await this.getone(serial);
  }
}

export default GatewayService;
