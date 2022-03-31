import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FileContext } from '../contexts/FileContext';

const Instructions = () => {
  const { selectedFileData, setSelectedFileData, isFilePicked, setIsFilePicked } = useContext(FileContext);
  const [ farmName, setFarmName ] = useState('');
  let fileReader;
  let navigate = useNavigate();

  const handleFileUpload = (event) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(event.target.files[0]);
  };

  const handleFileRead = () => {
    const xml2js = require('xml2js');
    xml2js.parseString(fileReader.result, (error, result) => {
      error ? console.log(error) : setSelectedFileData(result.SaveGame);
    });
  };

  useEffect(() => {
    console.log(selectedFileData);
    if (Object.keys(selectedFileData)[0]) {
      setIsFilePicked(true);

      try {
        setFarmName(`${selectedFileData.player[0].name}_${selectedFileData.uniqueIDForThisGame[0]}`);
      } catch (error) {
        console.log('Error setting farm name.');
      }
    }
  }, [selectedFileData]);

  const handleDashboardNavigation = () => {
    const path = '/dashboard';
    navigate(path);
  };

  return (
    <div className='instructions content'>
      <div className='instructions__overview content__panel'>
        <h2>How it works.</h2>
        <p>This is a placeholder description. This will include data on:</p>
        <ul>
          <li className='instructions__overview__list'>
            Uploading save file / manual input
          </li>
          <li>
            Simple display of incomplete criteria (sortable by season, etc)
          </li>
        </ul>
      </div>
      <div className='instructions__start content__panel'>

        <div className='instructions__start__overview'>
          <h2>Uploading a save file.</h2>
          <p>To automatically detect your Stardew progress, upload your save file here!</p>
          <p>Depending on your operating system, the file is typically located at:</p>
          <ul id='instructions__start__list'>
            <li>
              Windows: <strong>%AppData%/Roaming/StardewValley/Saves/</strong>
            </li>
            <li>
              Mac/Linux: <strong>~/.config/StardewValley/Saves/</strong>
            </li>
          </ul>
          <p>This file will have a name similar to: <strong>farmName_123456789</strong></p>
        </div>

        <form className='instructions__start__form' onSubmit={handleDashboardNavigation}>
          <label htmlFor='file-upload' className='instructions__start__input'>
            📄 File Upload
          </label>
          <input id='file-upload' type='file' onChange={handleFileUpload}/>
          {isFilePicked && farmName !== '' ? <p className='instructions__start__info'>File <span id='instructions__start__name'>{farmName}</span> loaded.</p> : null}
          {isFilePicked ? <button className='instructions__start__button' type='submit'>Submit</button> : null}
        </form>
      </div>

      <div className='instructions__resources content__panel'>
        <h2>Additional useful resources.</h2>
        <p>Placeholder for description.</p>
      </div>
    </div>
  );
};

export default Instructions;