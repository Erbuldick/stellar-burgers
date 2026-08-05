import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  
  const setActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={setActiveClass}>
            <BurgerIcon type='primary' />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </NavLink>
          <NavLink to='/feed' className={setActiveClass}>
            <ListIcon type='primary' />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to='/'>
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <NavLink to='/profile' className={setActiveClass}>
            <ProfileIcon type='primary' />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
