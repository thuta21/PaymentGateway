export interface PaymentStrategy {
  init(data: any): Promise<any>;
}
