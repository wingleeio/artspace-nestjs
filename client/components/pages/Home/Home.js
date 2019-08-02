import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Register from './Register';
import Login from './Login';

function Home({ match, history }) {
  const { isAuthenticated } = useSelector(state => ({ ...state.user }));
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/browse');
    }
  }, [isAuthenticated]);
  return (
    <div className="full-width-container h-100-hero flex front-page-container">
      <div
        className="image-mosaic-container"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/2505693/pexels-photo-2505693.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
          backgroundSize: 'cover',
        }}
      >
        {/* code for art gallery stuff here  */}
      </div>
      {match.path === '/register' ? <Register /> : <Login />}
    </div>
  );
}

export default Home;
