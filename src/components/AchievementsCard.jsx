import React from 'react';
import AchievementsCardTableData from './AchievementsCardTableData';

const AchievementsCard = () => {
  const achievements = [];
  for (let i = 0; i <= 40; i++) {
    achievements.push(i);    
  }

  return (
    <div className='achievements content__panel'>
      <h2>Achievements.</h2>

      <table className='achievements__money achievements__table'>
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
    </div> 
  );
};

export default AchievementsCard;
