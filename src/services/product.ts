import { IProduct } from '../interfaces/products';

export class ProductService implements IProduct {
  private _id: number;
  private _name: string;
  private _value: number;
  private _quantity: number;

  constructor(id: number, name: string, value: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._value = value;
    this._quantity = quantity;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get value(): number {
    return this._value;
  }

  get quantity(): number {
    return this._quantity;
  }
}
