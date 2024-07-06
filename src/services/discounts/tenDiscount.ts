import { Discount } from '../../interfaces/discount';

export class TenPercentDiscountService extends Discount {
  protected readonly discount = 10;
}
