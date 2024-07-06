import { ProductService } from '../services/product';

const createSut = () => {
  return new ProductService(1, 'Book', 25.9, 2);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks);

  const sut = createSut();

  it('should return id', () => {
    expect(sut.id).toBe(1);
  });

  it('should return name', () => {
    expect(sut.name).toBe('Book');
  });

  it('should return value', () => {
    expect(sut.value).toBe(25.9);
  });

  it('should return quantity', () => {
    expect(sut.quantity).toBe(2);
  });
});
