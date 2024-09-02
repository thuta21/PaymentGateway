import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  application_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  invoice_id: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  payment_method: string;

  @IsNotEmpty()
  @IsString()
  payment_description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  currency_code: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  frontend_return_url: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  backend_return_url: string;
}
