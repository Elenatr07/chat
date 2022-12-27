import { Box, Button, Container, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../index";
import 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Login = () => {
    const { auth } = useContext(Context)

    const login = () => {
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
                        <Button onClick={login} variant="outlined" color="primary">Login with Google</Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    )
};

export default Login;