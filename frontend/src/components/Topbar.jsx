import { Button, Grid, Container, Toolbar, Typography, AppBar } from "@mui/material";
import React from "react";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginActions } from '../store/storelogin';
import { Tooltip } from "@mui/material";

function Topbar() {
    const userData = useSelector(state => state.login);
    const dispatch = useDispatch();
    const handleOnClick = (e) => {
        dispatch(loginActions.logout());
    }
    return <>
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={2} lg={2}>
                            {userData.userRol === 'admin' ? <AddModeratorIcon /> : <AccountCircleIcon />}
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            <Typography>{userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            <Link to='/home' style={{ TextDecoration: 'none', color: 'white' }}>Inicio</Link>
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            {userData.userRol==='admin' && <Link to='/informes' style={{ TextDecoration: 'none', color: 'white' }}>Informes</Link>}
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            <Link to ={'/ManualUsuarioPDF.pdf'} target="_blank" style={{ TextDecoration: 'none', color: 'white' }}>Ayuda</Link>
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            <Tooltip title="Volver al login" arrow>
                                <Button variant="contained" onClick={handleOnClick}>
                                    Salir
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    </>
}
export default Topbar;