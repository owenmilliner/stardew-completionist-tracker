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
      let details = handleAchievementProgress(achievementReference[achievement].name, selectedFileData);
      return details;
    }
    return;
  };

  return (
    achievementReference[achievement] ?
      <tr>
        <td>
          <img 
            src={achievementData.filename || require('../images/achievement-icons/Achievement_Not_Found.jpg')}
            className='achievement__image'
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

/*
      let achieved = false;
      let counter = 0;

      switch(achievement) {
      case 8: // Prairie
        if (!selectedFileData.player[0].mailReceived.includes('Beat_PK')) {
          setUnlocked(false);
        }
        break;
      case 10: // Mines
        setUnlocked(Number(selectedFileData.player[0].timesReachedMineBottom) > 0);
        break;
      case 14: // Joja
        if (selectedFileData.player[0].mailReceived.includes('ccMovieTheaterJoja')) {
          setUnlocked(true);
        } else if (selectedFileData.player[0].mailReceived.includes('ccMovieTheater')) {
          setUnlocked(undefined); // Change details.
        } else {
          setUnlocked(false);
        }
        break;
      case 33: // Community Centre
        if (!selectedFileData.player[0].mailReceived.includes('ccMovieTheaterJoja') 
          && selectedFileData.player[0].mailReceived.includes('ccMovieTheater')) {
          setUnlocked(true);
        } else if (selectedFileData.player[0].mailReceived.includes('ccMovieTheaterJoja') ) {
          setUnlocked(undefined); // Change details.
        } else {
          setUnlocked(false);
        }
        break;
      case 35: // Stardrop
        if (!selectedFileData.player[0].maxStamina === '508') {
          setUnlocked(false);
        }
        setUnlocked(false);
        break;
      case 36: // Two Kids
        setUnlocked(false); // TODO:
        break;
      case 37: // 10 one skill
        selectedFileData.player[0].experiencePoints.forEach(skill => {
          if (Number(skill) >= 15000) {
            achieved = true;
          }
        });
        if (!achieved) setUnlocked(false); 
        break;
      case 38: // 10 all skills
        selectedFileData.player[0].experiencePoints.forEach(skill => {
          if (Number(skill) >= 15000) {
            counter++;
          }
        });
        if (counter < 5) setUnlocked(false); 
        break;
      case 39: // Monster slayer.
        setUnlocked(false); // TODO:
        break;
      case 40: // Prairie No Deaths
        setUnlocked(false); // TODO:
        break;
      }
    */