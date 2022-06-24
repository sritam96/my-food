import { FoodResponseMock } from '../../__mocks__';
import { getFoodState } from '../food.selectors';
import { foodInitialState, FoodState } from '../food.state';

const foodStateMock: FoodState = {
  ...foodInitialState,
  food: FoodResponseMock,
};

describe('getFood', () => {
  it('should get food', () => {
    expect(getFoodState.projector(foodStateMock)).toEqual(foodStateMock.food);
  });
});
