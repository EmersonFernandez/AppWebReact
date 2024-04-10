import React, { useState } from 'react';
import axios from 'axios';
import ImageViewer from '../Producto-app/ImageViewer';
// funcion que sirve para la carga de iamgenes
function ImageUpload() {
    // estados 
    const [file, setFile] = useState(null);
    const [id, setId] = useState(1); // Corregido: inicializa el estado de id como null

    // funcion para obtener los archivos
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // funcion que sirve para guardar los archivos 
    const handleSubmit = async (event) => {
        event.preventDefault();
        // manejos de errores 
        try {
            // funcion para incializar un variable tipo formData
            const formData = new FormData();
            formData.append('image', file);

            // hacemos las peticion a la api
            const response = await axios.post('https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // madamos por cosola la respuesta 
            console.log(response.data);
            // almacemos el id al estado
            setId(response.data.id); // Establece el estado de id con el id devuelto por la API
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };

    return (
        // formulario para guardar la imagen 
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Subir Imagen</button>
            </form>
            // id del producto de la imagen
            {id && <ImageViewer id={id} />} {/* Renderiza el componente ImageViewer si id no es null */}
        </>
    );
}

// exportamos la funcion de la imagen
export default ImageUpload;
