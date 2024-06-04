import React , {useContext} from "react";
import {Grid, Typography ,Paper} from '@material-ui/core';   //importing some component from material-ui for grid layout, typography for any kind of text
import {makeStyles} from '@material-ui/core/styles';  //importing makeStyles for styling

import {SocketContext} from '../SocketContext';

const useStyles = makeStyles((theme)=>({     //making various stylings
    video: {
        width:'550px',
        [theme.breakpoints.down('xs')]: {
            width:'300px',
        },
    },
    gridContainer:{
        justifyContent:'center',
        [theme.breakpoints.down('xs')]: {   //xs is what it looked like on mobile screens
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
}));

const VideoPlayer = () => {
    const {name , callAccepted ,myVideo ,userVideo , callEnded, stream ,call} = useContext(SocketContext);       //using the needed socketcontext 
    
    const classes =useStyles();    //making a variable for using the styles
    return(
       <Grid container className={classes.gridContainer}>

        {/* our own video */}
        { stream && (                               //if we have our stream then our video will be shown(conditional statement)

          <Paper className={classes.paper}>                                         {/*  paper is used for white type background */}
          <Grid item xs={12} md={6}>                                                {/* using grid for layout */}
             <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>   {/* it will show the name of our user or if name doesnot exist it says 'Name'*/}
                < video playsInline muted ref={myVideo} autoPlay className={classes.video} />   
          </Grid>
          </Paper> 
        )}       

        {/* other user's video */}
        { callAccepted && !callEnded && (    // if call is accepted and not ended by user then the user's stream should be visible
        
           <Paper className={classes.paper}>                     
             <Grid item xs={12} md={6}>                                
                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>       {/* in this we need user name so it it gives us user name(caller name) bcz the info of call is stored in call */} 
                < video playsInline ref={userVideo} autoPlay className={classes.video}  />  
             </Grid>  
           </Paper>  
        )}
            
        </Grid>
    )
}
export default VideoPlayer

// line:33 ...the video will take full width of the screen of mobiledevices(xs) so we make the grid's item type
// to be 12 by 12 spaces so it can cover whole screen of mobilephone(xs) and for medium and larger screen devices(md)
// it will going to take half of the screen , one half is for our video and other will be for user's videos.


// line:37 ... we use a video tag and also write muted so our video can be muted not the other user's and also
// write autoplay so we can immediately start receving the video and we also getting ref of myVideo from socketcontext
// file. but for other user's video, video will not be muted so that we can see the incoming video of the other user
// and also the ref will be userVideo (we are getting the video bcz we write logic in SocketContext for myVideo
// and userVideo and in this we are getting that video by using the ref of them) 