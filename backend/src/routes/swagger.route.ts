import { Router } from 'express';
import Route from '../interfaces/routes.interface';
// import swaggerDocument from '../swagger';
import * as specs from '../swagger';
import { serve, setup } from 'swagger-ui-express';

class SwaggerRoute implements Route {
  public path = '/api-docs';
  public router = Router();

  constructor() {
    // console.log("swaggerUi", swaggerUi);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const options = {
      // explorer: true
      // customCss: '.swagger-ui .topbar { display: none }'
    };
    this.router.use(`${this.path}`, serve);
    this.router.get(`${this.path}`, setup(specs.default, options));
  }
}

export default SwaggerRoute;
