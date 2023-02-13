import React from 'react';
import gaEvent from '../ga4';

const BuyMeACoffeeLink = () => {
  const buyMeACoffeeLink = `https://www.buymeacoffee.com/cochrz`;

  return (
    <a href={buyMeACoffeeLink} onClick={gaEvent("Share", "Donate_link", "clicked")} target="_blank" rel="noopener noreferrer" className='bev'>
     <span className="smolTxt btn"> 
      Sponser a 🍻
      </span>
    </a>
  );
};

export default BuyMeACoffeeLink;