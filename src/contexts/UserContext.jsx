import { useState, useEffect, createContext } from 'react';

const UserContext = createContext({
  userId: 1,
  projectId: 1,
});

function UserProvider({ children }) {
  const [userId, setUserId] = useState(
    () => Number(localStorage.getItem('loggedInUser')) || 1
  );
  const [projectId, setProjectId] = useState(
    () => Number(localStorage.getItem('currentProjectId')) || 1
  );

  useEffect(() => {
    const storedUserId = Number(localStorage.getItem('loggedInUser'));
    const storedProjectId = Number(localStorage.getItem('currentProjectId'));

    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedProjectId) {
      setProjectId(storedProjectId);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userId, projectId, setProjectId, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
