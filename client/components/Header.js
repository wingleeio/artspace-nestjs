import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { user, isAuthenticated } = useSelector(state => ({ ...state.user }));
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            {/* <img src="#" /> */}
            <span className="txt-is-primary">ART.</span>SPACE
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/" type="submit" className="register">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/submit" className="login btn btn-success">
                  Submit
                </Link>
              </li>
              <li>
                <Link to={`/profile/${user.username}`}>
                  <img
                    src={user.avatar}
                    style={{ width: '32px', height: '32px' }}
                  />
                </Link>
              </li>
              <li>
                <Link to="/logout" className="login">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
