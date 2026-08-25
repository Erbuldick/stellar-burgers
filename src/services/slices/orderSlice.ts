import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredientsIds) => {
    const response = await orderBurgerApi(ingredientsIds);
    return response.order as unknown as TOrder;
  }
);

interface IOrderState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  order: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
    closeOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { clearOrder, closeOrder } = orderSlice.actions;
export const selectOrder = (state: { order: IOrderState }) => state.order;

export default orderSlice.reducer;
