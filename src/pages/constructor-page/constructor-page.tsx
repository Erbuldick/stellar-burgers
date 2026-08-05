import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
} from '../../services/slices/ingredientsSlice';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        Ошибка загрузки ингредиентов: {error}
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
