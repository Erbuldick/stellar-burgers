import { TIngredient } from '@utils-types';

export type BurgerIngredientsUIProps = {
  currentTab: string;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: React.RefObject<HTMLHeadingElement>;
  titleMainRef: React.RefObject<HTMLHeadingElement>;
  titleSaucesRef: React.RefObject<HTMLHeadingElement>;
  bunsRef: React.Ref<HTMLUListElement>;
  mainsRef: React.Ref<HTMLUListElement>;
  saucesRef: React.Ref<HTMLUListElement>;
  onTabClick: (tab: string) => void;
  onIngredientAdd: (ingredient: TIngredient) => void;
  ingredientsCounters: { [key: string]: number };
};
