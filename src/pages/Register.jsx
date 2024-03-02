import { useState } from 'react';
import styled from 'styled-components';

import { FormRow, Logo } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    console.log(event.target);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page" onSubmit={handleSubmit}>
      <form className="form">
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* NAME */}
        {!values.isMember && (
          <FormRow
            label="name"
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <FormRow
          label="email"
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* PASSWORD */}
        <FormRow
          label="password"
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* SUBMIT */}
        <button type="submit" className="btn btn-block">
          submit
        </button>

        {/* LINK */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
