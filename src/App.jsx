import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
