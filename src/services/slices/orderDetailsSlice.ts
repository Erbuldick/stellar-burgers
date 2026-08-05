import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orderDetails/fetch',
  async number => {
    const response = await getOrderByNumberApi(number);
    if (!response.success) throw new Error('Ошибка загрузки заказа');
    return response.orders[0];
  }
);

interface IOrderDetailsState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: IOrderDetailsState = {
  order: null,
  loading: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrderDetails: state => {
      state.order = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrderByNumber.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  },
});

export const { clearOrderDetails } = orderDetailsSlice.actions;
export const selectOrderDetails = (state: {
  orderDetails: IOrderDetailsState;
}) => state.orderDetails;

export default orderDetailsSlice.reducer;
