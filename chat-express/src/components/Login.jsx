import { Box, Button, Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../index";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Login = () => {
    const { auth } = useContext(Context)

    const login = () => {
        const provider = new GoogleAuthProvider()
        const { user } = getAuth();
        signInWithPopup(auth, provider);
        console.log(user);

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
                        <Button onClick={login} variant={"outlined"}>Login with Google</Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    )
};

export default Login;