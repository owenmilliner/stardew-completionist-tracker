import React from 'react';

const AchievementsList = ({name, description, unlocked}) => {
  return (
    <li key={name} className={`stats__achievement--unlocked-${unlocked}`}>
      {unlocked ? '✔' : '✘'}{name}: {description}
    </li> 
  );
};

export default AchievementsList;
