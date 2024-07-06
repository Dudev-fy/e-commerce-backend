import { Discount } from '../../interfaces/discount';
import { FiftyPercentDiscount } from '../../services/discounts/fiftyDiscount';

const createSut = (): Discount => {
  return new FiftyPercentDiscount();
};

describe('FiftyPercentDiscount', () => {
  afterEach(() => jest.clearAllMocks);

  it('should have fifty percent discount', () => {
    const sut = createSut();
    expect(sut.calculate(100)).toBe(50);
  });
});
