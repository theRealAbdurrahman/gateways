import { NextFunction, Request, Response } from 'express';
import GatewayService from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dtos/gateway.dto';
import { AddDeviceDto } from '../dtos/device.dto';
import { Device } from '../interfaces/device.interface';

class GatewayController  {
  public gatewayService = new GatewayService();
  public  getAllGateways = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllGetWays: Gateway[] = await this.gatewayService.getAll();
      res.status(200).json({ data: findAllGetWays, message: 'findAllGetWays' });
    } catch (error) {
      next(error);
    }
  }
  public getoneGateway = async (req: Request, res: Response, next: NextFunction) => {
    const serial: string = req.params.serial;
    try {
      const findonegateway: Gateway = await this.gatewayService.getone(serial);
      res.status(200).json({ data: findonegateway, message: 'findonegateway' });
    } catch (error) {
      next(error);
    }
  }
  public  createGateways = async (req: Request, res: Response, next: NextFunction) => {
    const createGatewayDto: CreateGatewayDto = req.body;
    try {
      const createdGateway: Gateway = await this.gatewayService.createGetWays(createGatewayDto);
      res.status(200).json({ data: createdGateway, message: 'create gateway' });
    } catch (error) {
      next(error);
    }
  }
  public  addDevice = async (req: Request, res: Response, next: NextFunction) => {
    const addDeviceDto: AddDeviceDto = req.body;
    const serial: string = req.params.serial;
    try {
      const gateway: Gateway = await this.gatewayService.addDevice(addDeviceDto, serial);
      res.status(200).json({ data: gateway, message: 'added device' });
    } catch (error) {
      next(error);
    }
  }
  public getoneDevice = async (req: Request, res: Response, next: NextFunction) => {
    const uid: string = req.params.uid;
    try {
      const findonegateway: Device = await this.gatewayService.getoneDevice(uid);
      res.status(200).json({ data: findonegateway, message: 'fineOne Device' });
    } catch (error) {
      next(error);
    }
  }
  public deleteGateway = async (req: Request, res: Response, next: NextFunction) => {
    const serial: string = req.params.serial;
    try {
      const deletedGateway: Gateway = await this.gatewayService.deleteGateway(serial);
      res.status(200).json({ data: deletedGateway, message: 'deleted gateway' });
    } catch (error) {
      next(error);
    }
  }
  public deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    const serial: string = req.params.serial;
    const uid: string = req.params.uid;
    try {
      const deletedDevice: Gateway = await this.gatewayService.deleteDevice(serial, uid);
      res.status(200).json({ data: deletedDevice, message: 'deleted device' });
    } catch (error) {
      next(error);
    }
  }
}

export default GatewayController;
