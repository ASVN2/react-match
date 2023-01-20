import React from 'react';

const Card = ({ card, matchHandler, flipped, disabled }) => {
  const clickHandler = () => {
    if (!disabled) {
      matchHandler(card);
    }
  };

  return (
    <div className="card mb-3">
      <div className={flipped ? 'holder flipped' : 'holder'}>
        <img src={card.src} alt={card.src} className="front bg-gray-300 rounded-2xl p-4" />
        <img src="/assest/cover.png" onClick={clickHandler} alt="cover" className="cover cursor-pointer bg-gray-700 rounded-2xl p-4" />
      </div>
    </div>
  );
};

export default Card;
