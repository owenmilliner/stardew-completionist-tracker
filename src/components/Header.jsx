import React from 'react';

const Header = () => {
  return (
    <div className='header'>
      <img id="header__logo" src={require('../images/logo.png')} alt="Stardew Valley Logo"/>
      <img id="header__subtitle" src={require('../images/subtitle.png')} alt="Completion Tracker (Subtitle)"/>
    </div>
  );
};

export default Header;