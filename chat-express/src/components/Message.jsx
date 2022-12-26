import React from 'react';
import firebase from 'firebase/app';

const auth = firebase.auth();
function Message(props) {
    const { text, uid } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    </>)
}

export default Message;