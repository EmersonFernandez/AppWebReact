import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { axiosDataGet } from '../../funcions/axiosDatas';

// funcion que valida si el usuario necesita cambio de password
function ProtectPageNewPass() {
    // inicializamos el estado
    const [dataUser, setDataUser] = useState({});
    const [newPass, setNewPass] = useState(false);
    const alertShown = useRef(false);

    // para la navegacion
    const history = useNavigate();

    // para pedir la data de la api del usuario conectado
    useEffect(() => {
        const data = async () =>{
            try {
                const response = await axiosDataGet('https://apinodeexpressfirst-production.up.railway.app/api/usuarios/unique');
                setDataUser(response);
            } catch (error) {
                console.log('Error de axios ', error);
            }
        }
        data();
    }, []);

    // logica para validar que el usuario si necesita el cambio de password 
    useEffect(() => {
        if (dataUser && dataUser.results && !alertShown.current) {
                if(!dataUser.error){
                    if (dataUser.results[0].bchangepassword) {
                        history('/processlogin');
                    } else {
                        setNewPass(true);
                    }
                }
            
            // para que no se repita la logica
            alertShown.current = true;
        }
    },[dataUser])

    // valiados si necita el cambio de password
    return newPass ? <Outlet /> : null;


}

export default ProtectPageNewPass;

