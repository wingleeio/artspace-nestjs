import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../actions/user';
import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';

function Register() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [values, handleChange] = useForm();
  const dispatch = useDispatch();

  const validationClasses = () => {
    if (error) return 'input-error';
    else return;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let error = false;
    let errors = [];

    if (!values.username) {
      error = true;
      errors = [...errors, 'Missing username.'];
    }

    if (!values.email) {
      error = true;
      errors = [...errors, 'Missing password.'];
    }

    if (values.password !== values.password2) {
      error = true;
      errors = [...errors, 'Passwords are not matching.'];
    }

    if (error) {
      setError(error);
      setErrorMsg(errors);
    } else {
      setError(error);
      register(values, dispatch);
    }
  };

  return (
    <div className="login-container">
      <h1>
        Join <span className="txt-is-primary">Art.</span>Space
      </h1>
      <p style={{ minHeight: '20px' }}>
        {errorMsg.map((msg, id) => (
          <small key={id} className="txt-is-dangerous">
            {msg}{' '}
          </small>
        ))}
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="control">
          <input
            type="text"
            name="username"
            placeholder="Pick a username"
            value={!values.username ? '' : values.username}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={!values.email ? '' : values.email}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <input
            className={validationClasses()}
            type="password"
            name="password"
            placeholder="Choose a password"
            value={!values.password ? '' : values.password}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <input
            className={validationClasses()}
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={!values.password2 ? '' : values.password2}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary-outline register"
            onClick={handleSubmit}
          >
            Register
          </button>
          <Link
            to="/login"
            className="btn btn-grey-link login"
            // onClick={setForm('login')}
          >
            Login
          </Link>
        </div>
        <p>
          <small>
            By clicking Register, you confirm that you have read and agree to
            Art.Space{' '}
            <Link to="/" className="txt-is-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/" className="txt-is-primary">
              Privacy Policy.
            </Link>
          </small>
        </p>
      </form>
    </div>
  );
}

export default Register;
