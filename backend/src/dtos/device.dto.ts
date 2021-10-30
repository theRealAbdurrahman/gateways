import { IsString, IsEnum } from 'class-validator';
import { status } from '../interfaces/device.interface';

export class AddDeviceDto {

  @IsString()
  public vendor : string;

  @IsEnum(status)
  public status: status;
}
