export interface ICustomer {
  firstName: string;
  lastName: string;
  cpf: number;
  fullName(): string;
}
