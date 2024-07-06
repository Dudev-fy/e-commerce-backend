import { Discount } from '../interfaces/discount';
import { ShoppingCartService } from '../services/shoppingCart';
import { IProduct } from '../interfaces/products';

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCartService(discountMock);
  return { sut, discountMock };
};

const createProductMock = (
  id: number,
  name: string,
  value: number,
  quantity: number,
) => {
  class ProductMock implements IProduct {
    id: number;
    name: string;
    value: number;
    quantity: number;
    constructor(id: number, name: string, value: number, quantity: number) {
      this.id = id;
      this.name = name;
      this.value = value;
      this.quantity = quantity;
    }
  }
  return new ProductMock(id, name, value, quantity);
};

describe('ShoppingCart', () => {
  afterAll(() => jest.clearAllMocks);

  it('should add item', () => {
    const { sut } = createSut();
    const productMock = createProductMock(1, 'Book', 100, 1);
    sut.addItems([productMock]);
    expect(sut.items.length).toBe(1);
  });

  it('should return total before discount', () => {
    const { sut } = createSut();
    const productMock = createProductMock(4, 'Book', 100, 1);
    sut.addItems([productMock]);
    expect(sut.totalBeforeDiscount()).toBe(100);
  });

  it('should be truthy', () => {
    const { sut } = createSut();
    const productMock = createProductMock(1, 'Book', 100, 1);
    const productMock1 = createProductMock(2, 'Book', 100, 1);
    const productMock2 = createProductMock(3, 'Book', 100, 1);
    sut.addItems([productMock]);
    sut.addItems([productMock1]);
    sut.addItems([productMock2]);
    expect(sut.hasDiscount()).toBeTruthy();
  });

  it('should call hasDiscount and return total after discount', () => {
    const { sut } = createSut();
    const productMock = createProductMock(1, 'Book', 100, 1);
    const productMock1 = createProductMock(3, 'Book', 100, 1);
    const productMock2 = createProductMock(2, 'Book', 100, 1);
    sut.addItems([productMock]);
    sut.addItems([productMock1]);
    sut.addItems([productMock2]);
    const hasDiscountSpy = jest.spyOn(sut, 'hasDiscount');
    expect(sut.totalAfterDiscount()).toBe(300);
    expect(hasDiscountSpy).toHaveBeenCalledTimes(1);
    expect(sut.hasDiscount()).toBeTruthy();
  });
});
