import React from 'react';
import gaEvent from '../ga4';

const BuyMeACoffeeLink = () => {
  const buyMeACoffeeLink = `https://www.buymeacoffee.com/cochrz`;

  return (
    <button onClick={gaEvent("Share", "Donate_link", "clicked")}> 
    <a href={buyMeACoffeeLink}  target="_blank" rel="noopener noreferrer" className='bev'>
     <span className="smolTxt btn"> 
      Sponsor a 🍻
      </span>
    </a>
    </button>
  );
};

export default BuyMeACoffeeLink;