import { Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useContext, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message';

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Chat() {
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

            {messages && messages.map(msg => <Message key={msg.id} message={msg} />)}

            <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

export default Chat;