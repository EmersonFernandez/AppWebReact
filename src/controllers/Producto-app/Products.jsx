import React, { useState, useEffect } from 'react'
import './Products.css'
import TableProducts from './TableProducts';
import BtnCreate from './BtnCreate';
import axios from 'axios'
import { SweetAlertGenerteWithToast, SessionExperix_alert } from '../../funcions/sweet-alert';
import ModalProduct from './ModalProduct'
import { camposVacios } from '../../funcions/otros'
import { useNavigate } from 'react-router-dom'



function Products() {
    // declaracion de variables y estados 
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/producto';
    const [title, setTitle] = useState('');
    const [btnText, setBtnText] = useState('Guardar');
    const [operacion, setOperacion] = useState(1);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState({
        addDisabled: false,
        updateDisabled: false,
        deleteDisabled: false
    });
    const [form, setForm] = useState({});
    const [file, setFile] = useState(null);

    // fucion para detectar la imagen
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        camposVacios(form, '#dee2e6', 'n');
    };

    // para determinar si se va crear o actualizar
    const openModal = (op, productos) => {
        if (op == 1) {
            setTitle('Añadir Producto');
            setBtnText('Guardar');
            setForm({
                ...form,
                codigo: '',
                codProducto: '',
                nombre: '',
                descripcion: '',
                precio: '',
            })
            camposVacios(form, '#dee2e6', 'y');
        } else if (op == 2) {
            setTitle('Editar Producto');
            setBtnText('Actualizar');
            setForm({
                ...form,
                codigo: productos.ncodigo,
                codProducto: productos.ncodigo_producto,
                nombre: productos.vnombre,
                descripcion: productos.vdescripcion,
                precio: productos.nprecio
            })
            camposVacios(form, '#dee2e6', 'n');
        }

        setOperacion(op);

        setTimeout(() => {
            document.getElementById('codProducto').focus();
        }, 300);

    }

    // guardar la imagen
    const addImgProductos = async (idProduct) => {
        try {
            const formData = new FormData();
            formData.append('image', file); // Agrega el archivo de imagen al FormData
            formData.append('codigo', idProduct); // Agrega el campo 'codigo'
            const response = await axios.post('https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Incluir credenciales en la solicitud
            });
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    }

    // Agregar y Actualizar
    const handleOnClickAddUpdate = async () => {
        if (form.codProducto == '' || form.nombre == '' || form.descripcion == '' || form.precio == '') {
            await camposVacios(form, 'red', 'y');
            return SweetAlertGenerteWithToast('Todos los campos son obligatorios', 'info');
        };
        if (operacion == 1) {
            try {
                const respuesta = await axios.post(
                    url,
                    {
                        codProducto: form.codProducto,
                        nombre: form.nombre,
                        descripcion: form.descripcion,
                        precio: form.precio,
                    },
                    { withCredentials: true, });


                    if(response.data.error && Number(response.data.status) == 401){
                        SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                            navigate('/')
                            window.location.reload();
                        });
                        return;
                    }

                if (file) {
                    await addImgProductos(respuesta.data.idProduct);
                }

                if (respuesta.data.error === false) {
                    document.getElementById('modalClose').click();
                    SweetAlertGenerteWithToast(respuesta.data.message, 'success');
                    showProducts();
                } else if (respuesta.data.error === true) {
                    SweetAlertGenerteWithToast(respuesta.data.errorMessage, 'error');
                }
                
            } catch (error) {
                SweetAlertGenerteWithToast('Error al guardar el regsitro', 'error');
                console.log(error);
            }
        } else if (operacion == 2) {
            try {
                const respuesta = await axios.put(
                    url,
                    {
                        codigo: form.codigo,
                        codProducto: form.codProducto,
                        nombre: form.nombre,
                        descripcion: form.descripcion,
                        precio: form.precio,
                    },
                    { withCredentials: true, });

                    if(response.data.error && Number(response.data.status) == 401){
                        SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                            navigate('/')
                            window.location.reload();
                        });
                        return;
                    }

                if (file) {
                    await addImgProductos(form.codigo);
                }


                if (respuesta.data.error === false) {
                    document.getElementById('modalClose').click();
                    SweetAlertGenerteWithToast(respuesta.data.message, 'success');
                    showProducts();

                } else if (respuesta.data.error === true) {
                    SweetAlertGenerteWithToast('Error al actualizar el regsitro', 'error');
                }

            } catch (error) {
                SweetAlertGenerteWithToast('Error al actualizar el regsitro', 'error');
                console.log(error);
            }
        }
    };

    // para mostrar los productos
    const showProducts = async () => {
        const response = await axios.get(url, { withCredentials: true });
        console.log(response.data);
        if (response.data.error) {
            console.log('error');
        } else {
            setProductos(response.data.results);
            const privilegios = Number(response.data.token.privilegio);
            if(response.data.error && Number(response.data.status) == 401){
                SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                    navigate('/')
                    window.location.reload();
                });
                return;
            }
            if (privilegios === 2) {
                setDisabled({
                    ...disabled,
                    addDisabled: true,
                    updateDisabled: true,
                    deleteDisabled: true,
                });
            }
            else if (privilegios === 3) {
                setDisabled({
                    ...disabled,
                    addDisabled: true,
                    updateDisabled: true,
                });
            } else if (privilegios === 4) {
                setDisabled({
                    ...disabled,
                    deleteDisabled: false,
                    addDisabled: true,
                    updateDisabled: true,
                });
            }
        }
    }


    return (
        <>
            <div className='container'>
                {/* btn crear */}
                <div className='mb-2 mt-2'>
                    <BtnCreate disabled={disabled} openModal={openModal} />
                </div>
                {/* tabla de visualizacion de los productos */}
                <div>
                    <TableProducts
                        url={url}
                        setDisabled={setDisabled}
                        disabled={disabled}
                        openModal={openModal}
                        showProducts={showProducts}
                        productos={productos}
                    />
                </div>
            </div>
            <ModalProduct
                form={form}
                handleChange={handleChange}
                title={title}
                btnText={btnText}
                addAndUpdate={handleOnClickAddUpdate}
                handleFileChange={handleFileChange}
            />
        </>
    )
}

export default Products


