import React from 'react';
import NavItem from './NavItem';
import { Link } from '@reach/router';
import logo from '../img/fire.svg';

const Nav = props => {
  return (
    <nav>
      <ul>
        <li className="logo">
        <Link to={`/`}><img src={logo} alt='logo'></img></Link>
        </li>
        {props.navItems.map((navItem,index) => (
          <NavItem key={index} navItem={navItem}/>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
