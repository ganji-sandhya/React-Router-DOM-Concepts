import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <NavLink to="/" className={(isActive) => isActive ? classes.active: undefined}>Home
          </NavLink>
          <NavLink to="events" className={(isActive) => isActive ? classes.active: undefined} >Events
          </NavLink>
          <NavLink to="/newsletter" className={(isActive) => isActive ? classes.active: undefined}>News Letter</NavLink>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
