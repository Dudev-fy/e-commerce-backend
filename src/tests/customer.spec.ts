import { CustomerService } from '../services/customer';

const createSut = () => {
  return new CustomerService('Eduardo', 'Santos', 49504316840);
};

describe('Customer', () => {
  afterEach(() => jest.clearAllMocks());

  const sut = createSut();

  it('should return firstName', () => {
    expect(sut.firstName).toBe('Eduardo');
  });

  it('should return lastName', () => {
    expect(sut.lastName).toBe('Santos');
  });

  it('should return cpf', () => {
    expect(sut.cpf).toBe(49504316840);
  });

  it('should return firstName + lastName', () => {
    expect(sut.fullName()).toBe('Eduardo Santos');
  });
});
