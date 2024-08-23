export interface PaymentStrategy {
  init(amount: number): Promise<void>;
}
