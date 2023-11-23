import { Button, Paper, Tooltip } from "@mui/material"
import Topbar from "./Topbar"
import React, { useState, useEffect } from "react";
import InformeColeccion from "./InformeColeccion";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Informes() {
    const [botonClicked, setBotonClicked] = useState(false)
    const [tableInform, setTableInform] = useState([])
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;

    const handleShowInfo  = (e) => {
        fetch('http://localhost:3030/getItems')
            .then(response => response.json())
            .then(response => {
                setTableInform(response.data)
                setBotonClicked(true)
            })
        
    }

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    return <>
        <Topbar></Topbar>
        <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Tooltip title="Obtener Informa" arrow>
                <Button 
                    variant="contained"
                    onClick={handleShowInfo}
                >
                    INFORME DE COLECCIÓN
                </Button>
            </Tooltip>
        </Paper>
        {botonClicked===true && <InformeColeccion datos = {tableInform}/>}
    </>
}
export default Informes