import React from 'react';

const Header = ({ siteTitle }) => {
  return (
    <header id='app-header'>
      <h1 id='app-header-h1'>{siteTitle}</h1>
    </header>
  );
};

export default Header;
