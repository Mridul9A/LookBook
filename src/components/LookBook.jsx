import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/LookBook.css';

const LookBook = ({ looks }) => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const currentLook = looks[currentLookIndex];
  const currentMedia = currentLook.media[currentMediaIndex];

  let touchStartY = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50; 

  const handleNextMedia = useCallback(() => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % currentLook.media.length);
    setProgress(0); 
  }, [currentLook.media.length]);

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + currentLook.media.length) % currentLook.media.length);
    setProgress(0); 
  };

  const handleNextLook = () => {
    setCurrentLookIndex((prevIndex) => (prevIndex + 1) % looks.length);
    setCurrentMediaIndex(0); 
    setProgress(0); 
  };

  const handlePrevLook = () => {
    setCurrentLookIndex((prevIndex) => (prevIndex - 1 + looks.length) % looks.length);
    setCurrentMediaIndex(0); 
    setProgress(0); 
  };


  const handleTouchStart = (e) => {
    touchStartY = e.changedTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY = e.changedTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY - touchEndY;

    if (swipeDistance > SWIPE_THRESHOLD) {

      handleNextLook();
    } else if (swipeDistance < -SWIPE_THRESHOLD) {

      handlePrevLook();
    }
  };


  useEffect(() => {
    if (currentMedia.type === 'image') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + 20 >= 100) {
            handleNextMedia();
            return 0; 
          }
          return prev + 20;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [progress, currentMedia, handleNextMedia]);

const handleImageClick = () => {
    const productId = currentLook.products[currentMediaIndex]?.id; 
    if (productId) {
      console.log(`Navigating to product ID: ${productId}`); 
      navigate(`/product/${productId}`);
    }
  };
  

  return (
    <div
      className="lookbook-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="media-container">
        {currentMedia.type === 'image' && (
          <div className="image-container">
            <img
              src={currentMedia.url}
              alt={`Look ${currentLookIndex + 1} - Media ${currentMediaIndex + 1}`} 
              onClick={handleImageClick} 
            />
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {currentMedia.type === 'video' && (
          <video controls muted autoPlay>
            <source src={currentMedia.url} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="lookbook-navigation">
        <button onClick={handlePrevMedia}>Previous Media</button>
        <button onClick={handleNextMedia}>Next Media</button>
      </div>

      <div className="lookbook-navigation">
        <button onClick={handlePrevLook}>Previous Look</button>
        <button onClick={handleNextLook}>Next Look</button>
      </div>
    </div>
  );
};

export default LookBook;
