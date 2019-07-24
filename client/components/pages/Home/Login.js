import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../actions/user';
import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';

function Login() {
  const [values, handleChange] = useForm();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    login(values, dispatch);
  };
  return (
    <div className="login-container">
      <h1>
        Welcome back to <span className="txt-is-primary">Art.</span>Space
      </h1>
      <p style={{ minHeight: '20px' }}>
        {/* <small className="txt-is-dangerous">{errorMsg}</small> */}
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="control">
          <input
            type="text"
            name="login"
            placeholder="Enter your username or email"
            values={!values.login ? '' : values.login}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            values={!values.password ? '' : values.password}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary-outline login"
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link
            to="/"
            className="btn btn-grey-link register"
            // onClick={setForm('register')}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
