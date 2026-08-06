import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '../ui/burger-ingredient';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count,
  onAdd
}) => {
  const location = useLocation();

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      handleAdd={onAdd}
      locationState={{ background: location }}
    />
  );
};
