import { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFileData, setSelectedFileData] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);

  return (
    <FileContext.Provider 
      value={{ selectedFileData, setSelectedFileData, isFilePicked, setIsFilePicked }}>
        {children}
    </FileContext.Provider>
  );
};