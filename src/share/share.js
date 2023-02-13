import React from 'react';
import TwitterShareLink from "./twitter";
import WhatsAppShareLink from './whatsapp';
import EmailShareLink from './email'
import BuyMeACoffeeLink from './bev';

const Share = () => {

  return  (
    <div> 
    <span className="center riddleSpan"> Come back tomorrow for a new riddle!</span>
    <h5 className="lowMarg" >Share: </h5>
    <section className='share-section'> 
        <TwitterShareLink /> 
        <WhatsAppShareLink />
        <EmailShareLink />
    </section>
    <div className='bev'>
        <BuyMeACoffeeLink /> 
        <button  className="btn" onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </div>
    </div>
  );
};

export default Share;


