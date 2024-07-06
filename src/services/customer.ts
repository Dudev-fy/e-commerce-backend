import { ICustomer } from '../interfaces/customer';

export class CustomerService implements ICustomer {
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _cpf: number;

  constructor(firstName: string, lastName: string, cpf: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._cpf = cpf;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get cpf(): number {
    return this._cpf;
  }

  fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}
