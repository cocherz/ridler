import React from 'react';

const BuyMeACoffeeLink = () => {
  const buyMeACoffeeLink = `https://www.buymeacoffee.com/cochrz`;

  return (
    <a href={buyMeACoffeeLink} target="_blank" rel="noopener noreferrer" className='bev'>
     <h4> 
      Donate a 🍻
      </h4>
    </a>
  );
};

export default BuyMeACoffeeLink;