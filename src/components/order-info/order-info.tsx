import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  selectOrderDetails,
  clearOrderDetails
} from '../../services/slices/orderDetailsSlice';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const { order, loading } = useSelector(selectOrderDetails);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, number]);

  if (loading || !order) {
    return <Preloader />;
  }

  const date = new Date(order.createdAt);
  type TIngredientsWithCount = {
    [key: string]: TIngredient & { count: number };
  };

  const ingredientsInfo = order.ingredients.reduce(
    (acc: TIngredientsWithCount, item) => {
      if (!acc[item]) {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: 1
          };
        }
      } else {
        acc[item].count++;
      }
      return acc;
    },
    {}
  );

  const total = Object.values(ingredientsInfo).reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const orderInfo = {
    ...order,
    ingredientsInfo,
    date,
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
