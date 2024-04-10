import { useEffect, useState, useRef } from 'react';
import { Outlet , useNavigate} from 'react-router-dom';
import { SessionExperix_alert } from '../../funcions/sweet-alert';
import {fetchUserData} from '../../funcions/axiosDatas';


// funcion que valida si la session del usuario esta expirada
function SessionExperi() {
    // inicializamos los estados
    const [dataUser, setDataUser] = useState({});
    const alertShown = useRef(false);
    // para la navegacion
    const navegate = useNavigate();


    // pedimos la data del usuario de la api
    useEffect(() => {
        fetchUserData(setDataUser);
    }, []);

    // logica para validar que el usuario si tenga la session activa
    useEffect(() => {
        if (Object.keys(dataUser).length !== 0 && dataUser.data.error && !alertShown.current) {
            SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => navegate('/'));
            // para validar que la logica no se repita
            alertShown.current = true;
        }
    }, [dataUser]);

    return <Outlet />;
}

export default SessionExperi;
