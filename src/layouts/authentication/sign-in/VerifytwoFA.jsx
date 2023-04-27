import React, { useState} from 'react'
import {
    Form,
    Button
    
} from 'react-bootstrap'
import { useDispatch} from 'react-redux'
import FormContainer from '../FormContainer/FormContainer'
import { login } from '../../actions/userActions'
import Meta from '../Helmet/Meta'

const VerifyComponent = ({ location,navigate }) => {
    const dispatch = useDispatch();
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
  
    const email = new URLSearchParams(location.search).get('email');
    const redirect = location.search ? location.search.split('=')[1] : '/';
  


    const verifyHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password, secret));
      navigate(redirect);
    };
  
  
    return (
      <FormContainer>
        <Meta title='Efarm| Verify' />
        <h1 style={{ marginTop: '120px' }}>Verify Account</h1>
        <Form onSubmit={verifyHandler}>
          <Form.Group controlId='secret'>
            <Form.Label>Enter Secret Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter 2FA code'
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
          <Form.Label>
            Password <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
          <Button type='submit' variant='primary'>
            Verify
          </Button>
        </Form>
      </FormContainer>
    );
  };
  export default VerifyComponent;
  