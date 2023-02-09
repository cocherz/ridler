import React from 'react';
import TwitterShareLink from "./twitter";
import WhatsAppShareLink from './whatsapp';
import EmailShareLink from './email'
import BuyMeACoffeeLink from './bev';

const Share = () => {

  return (
    <div> 
    <section className='share-section'> 
        <TwitterShareLink /> 
        <WhatsAppShareLink />
        <EmailShareLink />
    </section>
    <div className='bev'>
        <BuyMeACoffeeLink /> 
    </div>
    </div>
  );
};

export default Share;


