import React from 'react';
import gaEvent from '../ga4';

const EmailShareLink = () => {
  const subject = encodeURIComponent(`Check out this website: ridlr.app`);
  const body = encodeURIComponent(`Here's a link to ridlr.app that I think you might find interesting.`);
  const emailShareLink = `mailto:?subject=${subject}&body=${body}`;

  return (


    <button onClick={gaEvent("Share", "Mail", "clicked")}> 
    <a href={emailShareLink}  target="_blank" rel="noopener noreferrer" className='social'>
<svg fill="#F4F1DE" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"/></svg>    </a>
  </button>
  );
};

export default EmailShareLink;