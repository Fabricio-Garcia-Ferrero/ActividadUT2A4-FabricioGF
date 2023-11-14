import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { Button, Grid, Container, Toolbar, Typography, AppBar, TextField, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Home() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const dispatch = useDispatch();
    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    const handleOnClick = (e) => {
        dispatch(loginActions.logout());
    }

    const handleSaveItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                handleSelectItem()
            })


    }

    const handleSelectItem = (e) => {
        fetch('http://localhost:3030/getItems')
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }


    const handleDeleteItem = (id) => {
        fetch(`http://localhost:3030/deleteItem?id=${id}`)
            .then(response => response.json())
            .then(response => {
                handleSelectItem()
            })
    }

    console.log(userData);

    return (
        <>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3} lg={3}>
                                <AccountCircleIcon />
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Typography>{userData.userName}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Link to='/home' style={{ TextDecoration: 'none', color: 'white' }}>Inicio</Link>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Button variant="contained" onClick={handleOnClick}>
                                    Salir
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Paper
                elevation={3}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '700px',
                }}
            >
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSaveItem}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                    }}
                >
                    <TextField
                        label="Nombre"
                        required
                        value={item.nombre}
                        onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Marca"
                        required
                        value={item.marca}
                        onChange={(event) => setItem({ ...item, marca: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Tipo"
                        required
                        value={item.tipo}
                        onChange={(event) => setItem({ ...item, tipo: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Precio"
                        required
                        value={item.precio}
                        onChange={(event) => setItem({ ...item, precio: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button type="submit" variant="contained">
                        Insertar
                    </Button>
                </Box>
                <Button onClick={handleSelectItem}>Seleccionar</Button>
                <TableContainer>
                    <Table aria-label="tabla">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ color: 'white' }}>Nombre</TableCell>
                                <TableCell style={{ color: 'white' }}>Marca</TableCell>
                                <TableCell style={{ color: 'white' }}>Tipo</TableCell>
                                <TableCell style={{ color: 'white' }}>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteItem(row.id)}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default Home;