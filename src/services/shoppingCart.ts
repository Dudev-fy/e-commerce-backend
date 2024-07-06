import { IProduct } from '../interfaces/products';
import { IShoppingCart } from '../interfaces/shopping-cart';
import { Discount } from '../interfaces/discount';

export class ShoppingCartService implements IShoppingCart {
  private readonly _items: IProduct[] = [];

  constructor(private readonly discount: Discount) {}

  addItems(products: IProduct[]): void {
    for (const product of products) {
      this._items.push(product);
    }
  }

  singleItemPrice(product: IProduct): number {
    return product.value * product.quantity;
  }

  get items(): Readonly<IProduct[]> {
    return this._items;
  }

  totalBeforeDiscount(): number {
    return +this._items
      .reduce((total, next) => total + next.value * next.quantity, 0)
      .toFixed(2);
  }

  totalAfterDiscount(): number {
    if (this.hasDiscount()) {
      return this.discount.calculate(this.totalBeforeDiscount());
    }
    return this.totalBeforeDiscount();
  }

  hasDiscount(): boolean {
    if (this._items.length >= 3) {
      return true;
    }
    return false;
  }
}
