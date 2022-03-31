import React from 'react';
import { useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import SummaryCard from './SummaryCard';

const Dashboard = () => {
  const { isFilePicked } = useContext(FileContext);

  return (
    <div className='dashboard content'>
      {isFilePicked ?
        <SummaryCard />
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