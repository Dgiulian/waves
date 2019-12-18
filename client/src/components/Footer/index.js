import React from 'react';
import FontAwesomIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = ({ siteData }) => {

  return  siteData? (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomIcon icon={faCompass} className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>{siteData[0].address}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomIcon icon={faPhone} className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>{siteData[0].phone}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomIcon icon={faClock} className="icon" />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>{siteData[0].hours}</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomIcon icon={faEnvelope} className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>{siteData[0].email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div className="p">
              Get all the latest information on events, sales and offers. You
              can't miss out.
            </div>
          </div>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
