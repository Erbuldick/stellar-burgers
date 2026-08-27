import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mocked-uuid'
  }
});

const mockBun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  image: 'bun1',
  image_mobile: 'bun1m',
  image_large: 'bun1l'
};

const mockIngredient: TIngredient = {
  _id: 'ing1',
  name: 'Начинка',
  type: 'main',
  price: 50,
  proteins: 5,
  fat: 8,
  carbohydrates: 10,
  calories: 120,
  image: 'ing1',
  image_mobile: 'ing1m',
  image_large: 'ing1l'
};

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state with unknown action', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('should add bun', () => {
    const state = constructorReducer(initialState, addIngredient(mockBun));
    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toHaveLength(0);
  });

  it('should add ingredient (with generated id)', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('mocked-uuid');
    expect(state.ingredients[0]._id).toBe(mockIngredient._id);
  });

  it('should remove ingredient', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const idToRemove = state.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should move ingredient', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const second = { ...mockIngredient, _id: 'ing2' };
    state = constructorReducer(state, addIngredient(second));
    expect(state.ingredients[0]._id).toBe('ing1');
    expect(state.ingredients[1]._id).toBe('ing2');
    state = constructorReducer(state, moveIngredient({ from: 0, to: 1 }));
    expect(state.ingredients[0]._id).toBe('ing2');
    expect(state.ingredients[1]._id).toBe('ing1');
  });

  it('should clear constructor', () => {
    let state = constructorReducer(initialState, addIngredient(mockBun));
    state = constructorReducer(state, addIngredient(mockIngredient));
    state = constructorReducer(state, clearConstructor());
    expect(state.bun).toBe(null);
    expect(state.ingredients).toHaveLength(0);
  });
});
