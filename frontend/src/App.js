//FABRICIO GARCÍA FERRERO
import React from 'react'
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import Informes from './components/Informes'
import GesUser from './components/GesUser'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
//importamos la función createBrowserRouter y el componente RouterProvider
//de la librería react-router-dom
//HACERLO
const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'informes',
                element: <Informes/>
            },
            {
                path: 'gesuser',
                element: <GesUser/>
            }
        ]
    }
])
function App() {
    return (
        <RouterProvider router={router} />
    );
}
export default App;

