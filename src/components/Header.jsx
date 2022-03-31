import React from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  let navigate = useNavigate();

  const handleHomepageNavigation = () => {
    const path = '/';
    navigate(path);
  };

  return (
    <div className='header'>
      <img id="header__logo" src={require('../images/logo.png')} alt="Stardew Valley Logo" onClick={handleHomepageNavigation}/>
      <img id="header__subtitle" src={require('../images/subtitle.png')} alt="Completion Tracker (Subtitle)"/>
    </div>
  );
};

export default Header;