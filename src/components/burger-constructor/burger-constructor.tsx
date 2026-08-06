import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructor,
  clearConstructor
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  selectOrder,
  closeOrder
} from '../../services/slices/orderSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorState = useSelector(selectConstructor) || {
    bun: null,
    ingredients: []
  };
  const bun = constructorState.bun;
  const ingredients = constructorState.ingredients || [];
  const { order, loading: orderRequest } = useSelector(selectOrder) || {
    order: null,
    loading: false
  };

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;

    const orderIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];
    dispatch(createOrder(orderIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch(() => {});
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
