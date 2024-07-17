import './App.css';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Pages/Home';
import { Show } from './Pages/Show';
import { Searcher } from './Pages/Searcher';
import { ActorPage } from './Pages/ActorPage';
import { FavsPage } from './Pages/FavsPage';
import { ScrollToTop } from './Utils/ScrollToTop';
import { GenreShows } from './Pages/GenreShows';

function App() {

  const AppRoutes = () => {
    let routes = useRoutes([
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/:genre',
        element: <GenreShows/>
      },
      {
        path: '/show/:id',
        element: <Show/>
      },
      {
        path: '/search',
        element: <Searcher/>
      },
      {
        path: '/actor/:id',
        element: <ActorPage/>
      },
      {
        path: '/favs',
        element: <FavsPage/>
      },
    ])

    return routes;
  }

  return (
   
      <div className="App">
        <h1 className='title'>Showflix</h1>
        <BrowserRouter basename='/showflix'>
          <ScrollToTop />
          <Navbar/>
          <AppRoutes/>
        </BrowserRouter>
      </div>
  );
}

export default App;
