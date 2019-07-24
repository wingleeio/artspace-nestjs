import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="column">
          <div className="logo">
            <Link to="/">
              {/* <img src="#" /> */}
              <span className="txt-is-primary">ART.</span>SPACE
            </Link>
          </div>
        </div>
        <div className="column">
          <h2>Site Map</h2>
          <ul>
            <li>
              <Link to="/">Browse</Link>
            </li>
            <li>
              <Link to="/">Search</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <h2>Site Map</h2>
          <ul>
            <li>
              <Link to="/">Browse</Link>
            </li>
            <li>
              <Link to="/">Search</Link>
            </li>
          </ul>
        </div>
        <div className="column">
          <p>&copy; Art.space 2019 | All rights reserved </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
