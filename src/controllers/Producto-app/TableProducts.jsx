import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { SweetAlertGenerteWithToast, SessionExperix_alert } from '../../funcions/sweet-alert'
import {useNavigate} from 'react-router-dom'
import ImageViewer from './ImageViewer';


function TableProducts({ url, disabled, openModal, showProducts, productos, update }) {

    const navigate = useNavigate();

    useEffect(() => {
        showProducts();
    }, []);

    // Eliminar
    const handleOnCLickDeleteProduct = async (id, nombre) => {
        Swal.fire({
            title: '¿Seguro que quieres eliminar el producto ' + nombre + ' ?',
            icon: 'question',
            text: 'No se recuperar esta información',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Calcelar'

        }).then(async (respuesta) => {
            if (respuesta.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `${url}/${id}`,
                        { withCredentials: true, });

                        if(response.data.error && Number(response.data.status) == 401){
                            SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                                navigate('/')
                                window.location.reload();
                            });
                            return;
                        }
                    if (response.data.error === false) {
                        showProducts();
                        SweetAlertGenerteWithToast(response.data.message, 'success');
                    } else {
                        SweetAlertGenerteWithToast('Error al eliminar el registro', 'error');
                    }

                } catch (error) {
                    console.log('Error');
                }

            } else {
                SweetAlertGenerteWithToast('El producto no fue eliminado', 'info');
            }
        })

    }

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-hover table-dark table-bordered table-sm align-middle" id='myTableProduct'>
                    <thead>
                        <tr>
                            <th title='Número del registro' className='text-center align-middle'>#</th>
                            <th title='Codigo del producto' className='text-center align-middle'>Cod Producto</th>
                            <th title='Nombre del producto' className='text-center align-middle'>Nombre</th>
                            <th title='Descripción' className='text-center align-middle'>Descripción</th>
                            <th title='Precio' className='text-center align-middle'>Precio</th>
                            <th title='Imagen' className='text-center align-middle'>imagen</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {productos.map((el, id) => (
                            <tr key={id} className='text-center'>

                                <td className="text-center align-middle">{el.ncodigo}</td>
                                <td className="text-center align-middle">{el.ncodigo_producto}</td>
                                <td className="text-center align-middle">{el.vnombre}</td>
                                <td className="text-center align-middle">{el.vdescripcion}</td>
                                <td className="text-center align-middle">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(el.nprecio)}
                                </td>
                                <td className="text-center align-middle"><ImageViewer key={el.ncodigo} id={el.ncodigo} productos={el.vmime} /></td>
                                {/* <td className="text-center align-middle">{el.vmime != null ? <ImageViewer key={el.ncodigo} id={el.ncodigo} update={update}/> : <span style={{ fontSize: '12px', fontStyle: 'italic' }}>No hay imagen</span>}</td> */}
                                <td>
                                    <div className="d-flex justify-content-center align-items-center bg-light g-1 bg-transparent">
                                        <button disabled={disabled.updateDisabled} className='btn btn-outline-warning me-1' data-bs-toggle='modal' data-bs-target='#modalProduct' onClick={() => openModal(2, productos[id])}>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        <button disabled={disabled.deleteDisabled} className='btn btn-outline-danger ms-1' onClick={() => handleOnCLickDeleteProduct(el.ncodigo, el.vnombre)}>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}



export default TableProducts
