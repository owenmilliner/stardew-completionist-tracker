import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { FileContext } from '../contexts/FileContext';
import { handleAchievementProgress } from '../data/achievementProgress';
import { achievementReference } from '../data/achievementReference';

const AchievementsCardTableData = ({achievement}) => {
  const { selectedFileData } = useContext(FileContext);
  const [ unlocked, setUnlocked ] = useState(false);  
  const [ achievementData, setAchievementData ] = useState({name: '', title: '', description: '', status: '', filename: ''});

  const achievementsUnlocked = selectedFileData.player[0].achievements[0].int.sort();

  useEffect(() => {
    if (achievementReference[achievement]) {
      handleAchievementData();
    }
  }, []);

  useEffect(() => {
  }, [achievementData]);

  const handleAchievementData = () => {
    let achievements = {};

    achievements.filename = handleAchievementFilename();
    achievements.name = handleAchievementName();
    achievements.description = handleAchievementDescription();
    achievements.status = handleAchievementStatus();
    setAchievementData({...achievements});
  };

  const handleAchievementFilename = () => {
    const achievementName = achievementReference[achievement].name;
    const filename = 
      `Achievement_${achievementName
        .replaceAll(' ', '_')
        .replaceAll('.', '')
        .replaceAll('\'', '')}.jpg`;
    
    return(require(`../images/achievement-icons/${filename}`));
  };

  const handleAchievementName = () => {
    const achievementName = achievementReference[achievement].name;
    return(achievementName);
  };

  const handleAchievementDescription = () => {
    const achievementDescription = achievementReference[achievement].description;
    return(achievementDescription);
  };

  const handleAchievementStatus = () => {
    if(achievementsUnlocked.includes(String(achievement))) setUnlocked(true);
    else {
      return handleAchievementProgress(achievementReference[achievement].name, selectedFileData, setUnlocked);
    }
    return;
  };

  const handleFectorsToggle = () => {
    if(String(achievement) === '50') {
      setUnlocked(!unlocked);
      // TODO: Change summary to correspond with unlocked status.
    }
  };

  return (
    achievementReference[achievement] ?
      <tr>
        <td>
          <img 
            src={achievementData.filename || require('../images/achievement-icons/Achievement_Not_Found.jpg')}
            className='achievement__image'
            onClick={handleFectorsToggle}
          />
        </td>
        <td>{achievementData.name}</td>
        <td className={`achievement__details--unlocked-${unlocked}`}>{unlocked ? '✔' : unlocked === undefined ? '•' : '✘'}{achievementData.description}</td>
        <td>{achievementData.status}</td>
      </tr>
      : null
  );
};

export default AchievementsCardTableData;