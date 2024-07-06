export abstract class Discount {
  protected discount = 0;

  calculate(price: number) {
    return price - price * (this.discount / 100);
  }
}
