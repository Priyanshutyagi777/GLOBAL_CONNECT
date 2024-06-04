import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext =createContext();

const socket=io('http://localhost:3000');

const ContextProvider=( { children } )=>{
    const[stream , setStream]=useState(null);
    const[me , setMe]=useState('');    //setting a state for me id with empty string
    const[call, setCall]=useState( {} );     //setting a state for calluser with an object      
    const [callAccepted, setCallAccepted]=useState(false);
    const [callEnded, setCallEnded]=useState(false);
    const [name, setName]= useState('')


    const myVideo= useRef();
    const userVideo= useRef();
    const connectionRef= useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })         //get the permission to use the users audio and video 
            .then((currentStream)=>{
                setStream(currentStream);

            myVideo.current.srcObject=currentStream;      //getting my video to currentstream
            })
            socket.on('me' ,(id)=>setMe(id));                     //socket.on means listening to the specific action in this case it is me id
            
            socket.on('calluser', ({ from, name: callerName, signal})=>{
                setCall({ isReceivedCall: true, from, name: callerName, signal });
            });
     },[] );  //using an empty dependency array 

    const answerCall= () =>{
        setCallAccepted(true);

        const peer=new Peer({initiator: false, trickle:false , stream})
        peer.on('signal',(data)=>{               //when we get signal a call back function will execut and in that we get data related to signal
            socket.emit('answercall', {signal: data , to :call.from });        //we pass some data to answer call i.e signal and to(who are we answering the call to)
        })

        peer.on('stream',(currentStream)=>{                //execute the action when we get stream
                userVideo.current.srcObject=currentStream;                  //getting user video to current stream
            });              

        peer.signal(call.signal);

        connectionRef.current = peer;

    }

    const callUser= (id) =>{
        const peer=new Peer({initiator: true, trickle:false , stream})
        peer.on('signal',(data)=>{               //when we get signal a call back function will execute and in that we get data related to signal
            socket.emit('calluser', {userToCall: id , signalData:data ,from:me,name });        //we pass some data to answer call i.e signal and to(who are we answering the call to)
        })

        peer.on('stream',(currentStream)=>{                //execute the action when we get stream
                userVideo.current.srcObject=currentStream;                  //getting user video to current stream
            });
            socket.on('callaccepted',(signal)=>{
                setCallAccepted(true);
                          
            peer.signal(signal);
        })
            connectionRef.current=peer;

    }
    const leaveCall= () =>{
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();

    }

    return(
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall, }}>
            {children}
        </SocketContext.Provider>
    )

}

export { ContextProvider , SocketContext };     //exporting ContextProvider and SocketContext