import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { Button,Grid,Container,Toolbar,Typography,AppBar,TextField,Paper,Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Home() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const dispatch = useDispatch();
    const [item, setItem] = useState({nombre: '', marca: '', tipo: '',precio: ''})

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    const handleOnClick = (e) => {
        dispatch(loginActions.logout());
    }

    const handleSaveItem = (e) => {

    }

    console.log(userData);

    return (
        <>
            <AppBar position='static'>
                <Container> 
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={12} md={6} lg={4}>
                                <AccountCircleIcon />
                                <Typography>{userData.userName}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Link to='/home'>Inicio</Link> </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Button variant="contained" onClick = {handleOnClick}>Salir</Button> </Grid>
                        </Grid> 
                    </Toolbar> 
                </Container> 
            </AppBar>
            <Paper> 
                <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label='Nombre' 
                                required value={item.nombre}
                                onChange={(event) => setItem({...item, nombre: event.target.value })}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label='Marca' 
                                required value={item.marca}
                                onChange={(event) => setItem({...item, marca: event.target.value })}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label='Tipo' 
                                required value={item.tipo}
                                onChange={(event) => setItem({...item, tipo: event.target.value })}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label='Precio' 
                                required value={item.precio}
                                onChange={(event) => setItem({...item, precio: event.target.value })}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                variant="contained"    
                            >
                                Insertar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    );
}

export default Home;