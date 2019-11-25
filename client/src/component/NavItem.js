import React from 'react';
import { Link } from '@reach/router';

const NavItem = props => {
  // console.log(props)
  // const sendSection = () => {
  //   props.getStories(props.navItem)
  // }
  const { label, path } = props.navItem
  return (
    <li>
      <Link to={path}>{label}</Link>
      {/* <a href={`#${props.navItem}`} onClick={sendSection}>{props.navItem}</a> */}
    </li>
  );
};
export default NavItem;
