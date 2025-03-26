import { createContext, useState } from 'react';

const UniContext = createContext({
  count: 0,
  setCount: () => { },
});

const UniProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState();
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [actor, setActor] = useState();

  return (
    <UniContext.Provider value={{ isAuthenticated, setIsAuthenticated, authClient, setAuthClient, files, setFiles, errorMessage, setErrorMessage, actor, setActor }}>
      {children}
    </UniContext.Provider>
  );
};

export { UniContext, UniProvider };