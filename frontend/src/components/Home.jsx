import React from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { Button} from "@mui/material";

function Home() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    const handleOnClick = (e) => {
        dispatch(loginActions.logout());
    }

    console.log(userData);

    return (
        <>
            <div>
                <h1>Página home de Fabricio García Ferrero</h1>
                <h2>Nombre: {userData.userName} Rol: {userData.userRol}</h2>
                <Button onClick={handleOnClick} variant="contained">Volver</Button>
            </div>
        </>
    );
}

export default Home;