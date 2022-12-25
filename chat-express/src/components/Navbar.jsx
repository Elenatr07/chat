import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utilis/consts';

const Navbar = () => {
    const user = false //если пользователь залогинен то true, если нет false
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {user ?
                        <Button variant={'outlined'} color="inherit">Log out</Button>
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