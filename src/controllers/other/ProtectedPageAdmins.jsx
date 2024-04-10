import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../funcions/axiosDatas';

// funcion para proteger las rutas de tipo administrador 
function ProtectedPageAdmins() {
    // inicializamos los estados
    const [dataUser, setDataUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const alertShown = useRef(false);
    // para la navegacion
    const navegate = useNavigate();

    // para llamar la fucion para almacenar la respuesta de la api
    useEffect(() => {
        fetchUserData(setDataUser);
    }, []);

    // logica para dar los permisos a los adminitradores a las rutas protegidas
    useEffect(() => {
        if (Object.keys(dataUser).length !== 0 && dataUser.data && !alertShown.current) {
                if(!dataUser.data.error){
                    if (Number(dataUser.data.dataUser.rol) !== 1) {
                        navegate('/home');
                    } else {
                        setIsAdmin(true);
                    }
                }
            // esta es para impedir que se repita la logica
            alertShown.current = true;
        }
    }, [dataUser]);

    // validamos si es admin el usuario conectado
    return isAdmin ? <Outlet /> : null;
}

export default ProtectedPageAdmins;
