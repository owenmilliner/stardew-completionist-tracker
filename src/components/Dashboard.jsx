import React from 'react';
import { useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import AchievementsCard from './AchievementsCard';
import SummaryCard from './SummaryCard';
import MoneyCard from './MoneyCard';
import FriendshipCard from './FriendshipCard';
import CookingCard from './CookingCard';
import CraftingCard from './CraftingCard';
import FishingCard from './FishingCard';
import QuestsCard from './QuestsCard';
import ShippingCard from './ShippingCard';
import MinesCard from './MinesCard';
import CommunityCard from './CommunityCard';
import PlayerCard from './PlayerCard';
import HomeCard from './HomeCard';

const Dashboard = () => {
  const { isFilePicked } = useContext(FileContext);

  return (
    <div className='dashboard content'>
      {isFilePicked ?
        <>
          <SummaryCard />
          <AchievementsCard />
          <MoneyCard />
          <FriendshipCard />
          <CookingCard />
          <CraftingCard />
          <FishingCard />
          <QuestsCard />
          <ShippingCard />
          <MinesCard />
          <CommunityCard />
          <PlayerCard />
          <HomeCard />
        </>
        :
        <div className='dashboard__error content__panel'>
          <h2>Error: Save file not loaded correctly.</h2>
          <p>Something went wrong! Please head back to the <a className='dashboard__error__navigation' href='/'>home page</a> and re-upload your save file.</p>
        </div>
      }
    </div>
  );
};

export default Dashboard;