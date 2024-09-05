import React, { useState, useEffect, useCallback } from 'react';
import Annotation from './Annotation';
import './Style/Look.css'; 

const Look = ({ look }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const media = look.media;

  const handleNextMedia = useCallback(() => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
  }, [media.length]);

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    let timer;
    if (media[currentMediaIndex].type === 'image') {
      timer = setTimeout(() => {
        handleNextMedia();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentMediaIndex, handleNextMedia, media]);

  return (
    <div className="look">
      <div className="media-container">
        {media[currentMediaIndex].type === 'image' ? (
          <div className="image-container">
            <img src={process.env.PUBLIC_URL + media[currentMediaIndex].url} alt="Look" />
            {media[currentMediaIndex].annotations && media[currentMediaIndex].annotations.map((annotation, idx) => (
              <Annotation key={idx} annotation={annotation} products={look.products} />
            ))}
          </div>
        ) : (
          <div className="video-container">
            <video src={process.env.PUBLIC_URL + media[currentMediaIndex].url} muted={isMuted} autoPlay onEnded={handleNextMedia} />
            <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
          </div>
        )}
      </div>
      <div className="media-navigation">
        <button onClick={handlePrevMedia}>Previous</button>
        <button onClick={handleNextMedia}>Next</button>
      </div>
    </div>
  );
};

export default Look;
