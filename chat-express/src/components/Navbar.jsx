import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utilis/consts';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';



const Navbar = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth) //если пользователь залогинен то true, если нет false
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {user ?
                        <Button onClick={() => auth.signOut()} variant={'outlined'} color="inherit">Log out</Button>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={'outlined'} color="inherit">Login</Button>
                        </NavLink>

                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;