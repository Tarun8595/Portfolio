import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from "./components/Loader/Loader";
import Home from "./components/Home/Home";
import MouseFollower from "./components/MouseFollower/MouseFollower";
import BackgroundEffect from "./components/BackgroundEffect/BackgroundEffect";
import './App.css';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <div className="App">
      <BackgroundEffect />
      <MouseFollower />
      <AnimatePresence mode="wait">
        {showLoader ? (
          <Loader key="loader" displayTime={3000} onComplete={handleLoaderComplete} />
        ) : (
          <Home key="home" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

