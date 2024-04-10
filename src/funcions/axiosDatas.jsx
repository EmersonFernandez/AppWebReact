// funciones de axios reutilizables
import axios from 'axios'

export const fetchUserData = async (setDataUser) => {
    try {
        const response = await axios.get('https://apinodeexpressfirst-production.up.railway.app/api/dataUserConectado', { withCredentials: true });
        setDataUser({ data: response.data });
    } catch (err) {
        console.log(`Error al extraer los datos: ${err.message}`);
    }
};



export const axiosDataGet = async (url) => {
    try {
        const response = await axios.get(url,{withCredentials:true});
        return await response.data;
    } catch (error) {
        console.log('Error al obtner los datos ' + error);
        return null;
    }
}