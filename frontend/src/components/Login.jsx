//FABRICIO GARCÍA FERRERO
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Container, Typography, Box, TextField, Paper, Grid, Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';

const spacingStyles = {
    margin: '8px',
  };


function Login () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data,setData] = useState({user:'',pwd:''})
    const handleSubmit = (e) =>{
        e.preventDefault();
        isVerifiedUser()
        console.log('Login')
    }

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${data.user}&password=${data.pwd}`)
        .then(response => response.json())
        .then(response => {
        if (response) {
            console.log(response.data.nombre)
            console.log(response.data.rol)  
            if (response.data.nombre !== undefined) {
                console.log('entro y ahora navego')
                dispatch(loginActions.login({
                    name: response.data.nombre,
                    rol: response.data.rol
                    }))
                navigate('/home')
            }     
        }
    })}

return <>
    <Grid 
        container 
        component='main'  
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <Grid 
            item 
            component={Paper} 
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
        >
        <Avatar variant='solid' style={spacingStyles}></Avatar>
        <Typography align='center'>Acceder</Typography>
        <Box 
            onSubmit={handleSubmit}
            component='form' 
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            style={spacingStyles}
        >
            <TextField
                id='usuario'
                label='Usuario'
                variant='outlined'
                style={spacingStyles}

                value={data.user}
                onChange={(event) => {setData({...data, user: event.target.value})}}
            ></TextField>
            <TextField
                id='password'
                label='Contraseña'
                type='password'
                variant='outlined'
                style={spacingStyles}

                value={data.pwd}
                onChange={(event) => {setData({...data, pwd: event.target.value})}}
            ></TextField>
            <Button 
                type='submit'
                variant='contained'
                style={spacingStyles}
            >
                Login
            </Button>
        </Box>
    </Grid>
</Grid>
</>
}
export default Login
/*const [login, setLogin] = useState('')
    const handleSubmit = (e) =>{
        e.preventDeafult();
        isVerifiedUser()
        console.log(login)
    }

<Box 
    component = 'form'
    onSubmit={handleSubmit}
>
    <TextField 
        id='login'
        label='Usuario'
        variant='outlined'
        fullWidth
        autoFocus

        value={login}
        onChange={(event) => setLogin(event.target.value)}
    >

    </TextField>
    <Button 
        type='submit'
        variant='contained'
        fullWidth
    >
        Acceder
    </Button>
</Box>*/