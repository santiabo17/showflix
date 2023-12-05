import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Pages/Home';
import { Show } from './Pages/Show';

function App() {

  const AppRoutes = () => {
    let routes = useRoutes([
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/show/:id',
        element: <Show/>
      }
    ])

    return routes;
  }

  return (
   
      <div className="App">
        <h1 className='title'>My Netflix</h1>
        <BrowserRouter>
          <Navbar/>
          <AppRoutes/>
        </BrowserRouter>
      </div>
  );
}

export default App;
