import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id: crypto.randomUUID(),
        };
        state.ingredients.push(constructorIngredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        item => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [removed] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, removed);
    },
    clearConstructor: state => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export const selectConstructor = (state: {
  burgerConstructor: IConstructorState;
}) => state.burgerConstructor;

console.log('constructorSlice.reducer:', constructorSlice.reducer);

export default constructorSlice.reducer;
