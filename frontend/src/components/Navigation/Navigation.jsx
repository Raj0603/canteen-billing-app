import {Outlet,NavLink} from 'react-router-dom';
import home from '../../assets/SVG/House.svg';
import menu from '../../assets/SVG/Fork.svg';
import cart from '../../assets/SVG/Cart.svg';
import user from '../../assets/SVG/account.svg';

const Navigation = () => {
  return(
    <>
    <main>
      <Outlet/>
    </main>
    <footer>
    <nav className="navigation">
    <ul className="navigation__list">
      <li className={'navigation__item' }>
        <NavLink to='/oitems' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'} end>
          <img src={home} alt='home' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/odashboard' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={menu} alt='menu' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/additem?mode=add' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={cart} alt='cart' />
        </NavLink>
      </li>
      <li className={'navigation__item' }>
        <NavLink to='/oprofile' className={({isActive}) => isActive ? 'navigation__button--active' : 'navigation__button'}>
          <img src={user} alt='user' />
        </NavLink>
      </li>
    </ul>
  </nav>
  </footer>
  </>
  )
};

export default Navigation;
