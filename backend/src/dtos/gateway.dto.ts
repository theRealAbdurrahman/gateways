import { IsString, Matches } from 'class-validator';

export class CreateGatewayDto {
  @IsString()
  public serial: string;

  @IsString()
  public name: string;

  @Matches(/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/)
  public ip: string;
}
