import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    image: 'img1',
    image_mobile: 'img1m',
    image_large: 'img1l'
  },
  {
    _id: '2',
    name: 'Соус',
    type: 'sauce',
    price: 50,
    proteins: 2,
    fat: 10,
    carbohydrates: 5,
    calories: 80,
    image: 'img2',
    image_mobile: 'img2m',
    image_large: 'img2l'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('should return initial state with unknown action', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  it('should handle fetchIngredients.rejected', () => {
    const error = new Error('Ошибка загрузки');
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
