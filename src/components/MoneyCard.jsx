import React, { useState, useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import { achievementReference } from '../data/achievementReference';
import { formatNumber } from '../utils/formatMoney';

const MoneyCard = () => {
  const [isActive, setIsActive] = useState(false);
  const { selectedFileData } = useContext(FileContext);

  const moneyData = [
    {
      key: 'Money',
      value: `${formatNumber(selectedFileData.player[0].money)}g`
    },
    {
      key: 'Total money earned',
      value: `${formatNumber(selectedFileData.player[0].totalMoneyEarned)}g`
    },
    {
      key: 'Qi Gems',
      value: formatNumber(selectedFileData.player[0].qiGems)
    },
    {
      key: 'Days played',
      value: formatNumber(selectedFileData.player[0].stats[0].daysPlayed)
    },
    {
      key: 'Average money earned per day',
      value: `${formatNumber(Math.floor(selectedFileData.player[0].totalMoneyEarned / selectedFileData.player[0].stats[0].daysPlayed))}g`
    },
    {
      key: 'Items shipped',
      value: formatNumber(selectedFileData.player[0].stats[0].itemsShipped)
    },
    {
      key: 'Average money earned per item',
      value: `${formatNumber(Math.floor(selectedFileData.player[0].totalMoneyEarned / selectedFileData.player[0].stats[0].itemsShipped))}g`
    },
  ];

  const moneyListItem = (key, value) =>
    (
      <tr>
        <td>
          {key}:
        </td>
        <td>
          {value}
        </td>
      </tr>
    );

  return (
    <div className='content__section content__panel'>
      <h2 className='content__section__header'>Money.</h2>
      <button className='content__section__toggle' onClick={() => setIsActive(!isActive)}>{isActive ? 'Hide' : 'Show'}</button>
      {isActive ? 
        <div className='content__section__body'>
          <h3>
            Money stats.
          </h3>
          <table className='stats__table'>
            <tbody>
              {moneyData.map((stat) => moneyListItem(stat.key, stat.value))}
            </tbody>
          </table>
        </div>
        : null}
    </div> 
  );
};

export default MoneyCard;
