import React, { useState } from 'react';

const PlayerCard = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='content__section content__panel'>
      <h2 className='content__section__header'>Player.</h2>
      <button className='content__section__toggle' onClick={() => setIsActive(!isActive)}>{isActive ? 'Hide' : 'Show'}</button>
      {isActive ? 
        <p>
          Placeholder.
        </p> 
        : null}
    </div> 
  );
};

export default PlayerCard;
