import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  payment_method: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
