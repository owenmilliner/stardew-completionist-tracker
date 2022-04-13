import React from 'react';
import { useContext } from 'react';
import { FileContext } from '../contexts/FileContext';

const SummaryCard = () => {
  const { selectedFileData } = useContext(FileContext);

  const formatTimePlayed = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)));
    return(`${hours} hours, ${minutes} minutes and ${seconds} seconds played.`);
  };

  const formatGameDay = (day, season, year) => {
    season = `${season.substring(0, 1).toUpperCase()}${season.substring(1)}`;

    return (`${day} of ${season}, Year ${year}.`);
  };

  const formatMoneyEarned = (money) => {
    const formattedMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedMoney}g`;
  };

  const formatAchievementProgress = (achievements) => {
    const percentage = `${Math.floor((achievements.length / 39) * 100)}%`;
    return `${percentage} completed. (${achievements.length}/39 achievements).`;
  };

  return (
    <div className='summary content__panel'>
      <h2>Summary.</h2>
      <ul className='summary__list'>
        <li>
          {selectedFileData.player[0].name}.
        </li>
        <li>
          {selectedFileData.player[0].farmName} Farm.
        </li>
        <li>
          {formatTimePlayed(selectedFileData.player[0].millisecondsPlayed)}
        </li>
        <li>
          {formatGameDay(
            selectedFileData.dayOfMonth[0],
            selectedFileData.currentSeason[0],
            selectedFileData.year[0]
          )}
        </li>
        <li>
          {formatMoneyEarned(selectedFileData.player[0].totalMoneyEarned)} earned.
        </li>
        <li>
          {formatAchievementProgress(selectedFileData.player[0].achievements[0].int)}<strong>FIXME:</strong>  
        </li>
      </ul>
    </div> 
  );
};

export default SummaryCard;
