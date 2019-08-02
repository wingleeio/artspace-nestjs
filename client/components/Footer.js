import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as Unicons from '@iconscout/react-unicons';

function Footer() {
  return (
    <footer>
      {/* <div className="container"> */}
      <div className="row">
        <div className="column justify-between">
          <div className="logo">
            <Link to="/">
              {/* <img src="#" /> */}
              <h2>
                <span className="txt-is-primary">ART.</span>SPACE
              </h2>
            </Link>
          </div>
          <div className="footer-about">
            <p>
              ART.SPACE is a place for artists, illustrators, and designers
              everywhere to showcase their art to the world
            </p>
          </div>
          <div className="social-icons">
            <span className="footer-icon">
              <Unicons.UilFacebookF size="16" />
            </span>
            <span className="footer-icon">
              <Unicons.UilTwitter size="16" />
            </span>
            <span className="footer-icon">
              <Unicons.UilInstagram size="16" />
            </span>
          </div>
        </div>
        <div className="column footer-contact">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <p>Vancouver, BC, Canada</p>
            </li>
            <li>
              <p>604-324-0341</p>
            </li>
            <li>
              <p className="txt-is-primary">contact@aaart.space</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-end">
        <p>&copy; ART.SPACE 2019 | All rights reserved </p>
      </div>
      {/* </div> */}
    </footer>
  );
}

export default Footer;
