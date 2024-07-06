import { Discount } from '../../interfaces/discount';

export class FiftyPercentDiscountService extends Discount {
  protected readonly discount = 50;
}
