import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css'

function ImageViewer({ id,productos }) {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/image/${id}`, { withCredentials: true });

                // Verifica si la respuesta indica que no hay imagen disponible
                if (response.data.status === 400 || response.data.status === 500) {
                    setImageData(null); // Establece imageData en null si no hay imagen
                } else {
                    // Si hay una imagen disponible, actualiza imageData con la URL de la imagen
                    const imageUrl = `https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/image/${id}`;
                    setImageData(imageUrl);
                }
            } catch (error) {
                console.error('Error al recuperar la imagen:', error);
            }
        };
        fetchImage();
    }, [id,productos]); // Ejecuta este efecto cada vez que el ID del producto cambia

    return (
        <div>
            {imageData ? (
                // Si hay imageData (URL de la imagen), muestra la imagen
                <a href={imageData} alt={`Imagen con ID ${id}`} className='text-primary'><i className="bi bi-image"></i></a>
            ) : (
                // Si no hay imageData, muestra un mensaje indicando que no hay imagen
                <span style={{ fontSize: '12px', fontStyle: 'italic' }}>No hay imagen</span>
            )}
        </div>
    );
}

export default ImageViewer;

