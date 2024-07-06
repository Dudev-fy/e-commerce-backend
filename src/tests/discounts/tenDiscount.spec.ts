import { Discount } from '../../interfaces/discount';
import { TenPercentDiscount } from '../../services/discounts/tenDiscount';

const createSut = (): Discount => {
  return new TenPercentDiscount();
};

describe('TenPercentDiscount', () => {
  afterEach(() => jest.clearAllMocks);

  it('should have ten percent discount', () => {
    const sut = createSut();
    expect(sut.calculate(100)).toBe(90);
  });
});
