import React from 'react';
import { Typography, AppBar } from '@material-ui/core';       //importing components from material.ui
import { makeStyles } from '@material-ui/core/styles';

//all three component from different files are going to import here inside our react app
import VideoPlayer from './Components/VideoPlayer';
import Notifications from './Components/Notifications';
import Options from './Components/Options';
//now we use these components inside return section

//using the makeSyles component to add styling
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
 
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />               
      <Options>
        <Notifications />                 {/* notification componentis inside the options component (it is options componentchildren) */}
      </Options>
    </div>
  );
};

export default App;


//to display notification correctly we have to write something called 
// children in option component so it can dispaly the notification
// in the options component 
       