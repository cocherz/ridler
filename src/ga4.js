import ReactGA from "react-ga4";

const gaEvent = (cat, act, lab) => {

    ReactGA.initialize([
        {
          trackingId: "G-JHPBGZ7SP2",
        }
      ]);

    ReactGA.event({
      category: cat,
      action: act,
      label: lab,
    });


};

export default gaEvent;