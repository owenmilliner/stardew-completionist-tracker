import React, { useState } from 'react';
import AchievementsCardTableData from './AchievementsCardTableData';

const AchievementsCard = () => {
  const achievements = [];
  const [isActive, setIsActive] = useState(true);

  for (let i = 0; i <= 50; i++) {
    achievements.push(i);    
  }

  return (
    <div className='content__section content__panel'>
      <h2 className='content__section__header'>Achievements.</h2>
      <button className='content__section__toggle' onClick={() => setIsActive(!isActive)}>{isActive ? 'Hide' : 'Show'}</button>
      {isActive ? 
        <table className='content__section__body'>
          <col className='achievements__table__col1' />
          <col className='achievements__table__col2' />
          <col className='achievements__table__col3' />
          <col className='achievements__table__col4' />
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map(number => (
              <AchievementsCardTableData
                key={number}
                achievement={number}
              />))}
          </tbody>
        </table> 
        : null}
    </div> 
  );
};

export default AchievementsCard;
