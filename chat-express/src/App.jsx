import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Container } from '@material-ui/core';
import { Grid, Box, Button } from '@material-ui/core';

firebase.initializeApp({
    apiKey: "AIzaSyDDLEemdOpfycese9ZZJ8azCo4zTj6i8k0",
    authDomain: "chat-express-d3d7f.firebaseapp.com",
    projectId: "chat-express-d3d7f",
    storageBucket: "chat-express-d3d7f.appspot.com",
    messagingSenderId: "264503715783",
    appId: "1:264503715783:web:9f2c7bec41838414e71be2",
    measurementId: "G-QDXV3BC0T5"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>

                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>

        </div>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <Container>
            <Grid container
                style={{ height: window.innerHeight - 50 }}
                alignItems={"center"}
                justifyContent={"center"}>
                <Grid style={{ width: 400, background: 'lightblue' }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
                    </Box>
                </Grid>

            </Grid>


        </Container>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main>

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}


export default App;

