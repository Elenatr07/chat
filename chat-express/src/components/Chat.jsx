import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';


const Chat = () => {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')

    const sendMessage = async () => {
        console.log(value);

    }
    return (
        <Container>
            <Grid container
                justifyContent={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div style={{ width: '80%', height: '60vh', border: '1px solid grey', overflowY: 'auto' }}>

                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={'flex-end'}
                    style={{ width: '80%' }}
                >
                    <TextField
                        fullWidth
                        maxRows={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send message</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;