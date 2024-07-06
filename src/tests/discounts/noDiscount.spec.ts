import { Discount } from '../../interfaces/discount';
import { NoDiscount } from '../../services/discounts/noDiscount';

const createSut = (): Discount => {
  return new NoDiscount();
};

describe('NoDiscount', () => {
  afterEach(() => jest.clearAllMocks);

  it('should have no discount', () => {
    const sut = createSut();
    expect(sut.calculate(100)).toBe(100);
  });
});
