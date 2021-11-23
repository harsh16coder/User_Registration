import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const authCtx = useContext(AuthContext)
  return (
    <React.Fragment>
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogOut}>Logout</Button>
    </Card>
    </React.Fragment>
  );
};

export default Home;
