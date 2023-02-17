import React from 'react';
import TwitterShareLink from "./twitter";
import WhatsAppShareLink from './whatsapp';
import EmailShareLink from './email'
import BuyMeACoffeeLink from './bev';

const Share = () => {

  return  (
    <div> 
    <span className='b '> </span>
    <p className='lowMarg b'>Share:</p>
    <section className='share-section lowMarg'> 
        <TwitterShareLink /> 
        <WhatsAppShareLink />
        <EmailShareLink />
    </section>
    <div className='bev b'>
        <BuyMeACoffeeLink /> 
        <button  className="btn" onClick={() => localStorage.clear() + window.location.reload()}> Try again </button>
    </div>
    </div>
  );
};

export default Share;


