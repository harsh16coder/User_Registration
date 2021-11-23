import React, { useState, useEffect, useReducer , useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';


// To check validity of email
const emailReduser = (state , action) =>{
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR'){
    return {value: state.value , isValid: state.value.includes('@')};
  }
  return {value: '' , isValid: false};
};
// To check validity of password
const passwordReduser = (state, action) =>{
  if (action.type === 'USER_INPUT'){ 
    return {value: action.val , isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    console.log(state.value.trim().length );
    return {value: state.value , isValid: state.value.trim().length > 6};
  }
  return {value: '' , isValid: false};
}

const Login = (props) => {
  
  const [formIsValid, setFormIsValid] = useState(false);
  const [error,setError] = useState('');
  const [emailState, dispatchEmail] = useReducer(emailReduser , {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReduser , {
    value: '',
    isValid: null,
  })
  const authCtx = useContext(AuthContext);

  
  const {isValid: emailIsValid} = emailState;  
  const {isValid: passwordIsValid} = passwordState;
  console.log(`psd`,passwordIsValid);
  console.log(emailIsValid);
  useEffect(() => {
    const identifier = setTimeout(()=> {
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500); 
    return ()=>{
      clearTimeout(identifier);
    }; 
  } , [emailIsValid , passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value}); 
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
    authCtx.onLogIn(emailState.value, passwordState.value);
    }
    if (!formIsValid) {
      setError('Please enter Valid email and Password ');
    }
    authCtx.isLoggedIn =  formIsValid;
    console.log(authCtx.isLoggedIn);
  };

  return (
    <Card className={classes.login}>
    <div className={`${classes.error}`}>{error}</div>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            SUBMIT
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
