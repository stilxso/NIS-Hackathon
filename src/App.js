import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import MapComponent from './Components/Map/Map';
import { animated, useTransition } from 'react-spring';
import AboutUs from './Components/AboutUs/AboutUs';
import Profile from './Components/Profile/Profile';
import History from './Components/History/History';

export default function App() {
  // Get current location for routing
  const location = useLocation();

  // Define transitions for route changes
  const transitions = useTransition(location, {
    from: { opacity: 0, position: 'absolute', width: '100%', transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' }
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Routes location={item}>
        <Route path='/' element={<MainPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<MapComponent />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </animated.div>
  ));
}