import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
// para el estados globales globales 
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({}); // Inicializar con null o un valor vacío 
    const [newPassword, setNewPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //  const response = await axios.get(`${apiUrl}/dataUserConectado`, { withCredentials: true });
                const response = await axios.get('https://apinodeexpressfirst-production.up.railway.app/api/dataUserConectado', { withCredentials: true });
                // Sólo actualiza el estado si los datos han cambiado
                // console.log(apiUrl);
                console.log('data user con exito');
                if (JSON.stringify(globalState.data) !== JSON.stringify(response.data.dataUser) || globalState.error !== response.data.error) {
                    setGlobalState({ data: response.data.dataUser, error: response.data.error });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 
    }, []);

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState,setNewPassword,newPassword}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
