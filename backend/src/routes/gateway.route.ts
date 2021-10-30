import { Router } from 'express';
import GatewayController from '../controllers/gateway.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateGatewayDto } from '../dtos/gateway.dto';
import { AddDeviceDto } from '../dtos/device.dto';

class GatewayRoute implements Route {
  public path = '/gateway';
  public router = Router();
  public gatewayController = new GatewayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /gateway:
     *   get:
     *     summary: This should retreive all gateways.
     *     description: This where you can list all gateways.
     *     consumes:
     *       — application/json
     *     responses:
     *       200:
     *         description: Receive list of all gateways.
     */
    this.router.get(`${this.path}`, this.gatewayController.getAllGateways);
    this.router.get(`${this.path}/:serial`, this.gatewayController.getoneGateway);
    this.router.get(`${this.path}/:uid/device`, this.gatewayController.getoneDevice);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateGatewayDto),
      this.gatewayController.createGateways
    );
    this.router.post(`${this.path}/:serial/device`,
                     validationMiddleware(AddDeviceDto), this.gatewayController.addDevice);
    this.router.delete(`${this.path}/:serial`, this.gatewayController.deleteGateway);
    this.router.delete(`${this.path}/:serial/device/:uid`, this.gatewayController.deleteDevice);
  }
}

export default GatewayRoute;
