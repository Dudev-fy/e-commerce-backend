import { IProduct } from './products';

export interface IShoppingCart {
  items: Readonly<IProduct[]>;
  addItems(products: IProduct[]): void;
  singleItemPrice(product: IProduct): void;
  totalBeforeDiscount(): number;
  totalAfterDiscount(): number;
  hasDiscount(): boolean;
}
