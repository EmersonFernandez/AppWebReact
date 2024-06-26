import React, { useEffect, useState,  } from 'react'
import axios from 'axios'
import {useNavigate, Navigate} from 'react-router-dom';
import { axiosDataGet } from '../../../funcions/axiosDatas'
import { SweetAlertGenerteWithToast, SessionExperix_alert } from '../../../funcions/sweet-alert'
import Swal from 'sweetalert2'
import { camposVacios } from '../../../funcions/otros'



function BtnCrear({ openModal }) {
    return <>
        <div className='btn btn-info text-white'
            data-bs-toggle="modal" data-bs-target="#modalUsuario"
            onClick={() => openModal(1)}
        >
            Crear usuario
        </div>
    </>
}

function TablesUsuarios({ dataUsers, openModal, handleDeleteUser }) {
    return (
        <>
            <div className='table-responsive'>
                <table className="table table-hover table-dark table-bordered table-sm align-middle" id='myTableProduct'>
                    <thead>
                        <tr>
                            <th title='Número del registro' className='text-center align-middle'>#</th>
                            <th title='Nombre completo del usuario' className='text-center align-middle'>Nombre</th>
                            <th title='Número de telefono' className='text-center align-middle'>N° Teléfono</th>
                            <th title='Número de documento' className='text-center align-middle'>N° Documento</th>
                            <th title='Rol del usuario' className='text-center align-middle'>Rol</th>
                            <th title='Privilegis del usuario' className='text-center align-middle'>Privilegio</th>
                            <th title='usuario' className='text-center align-middle'>User</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {dataUsers.results && dataUsers.results.map((el, id) => (
                            <tr key={id} className='text-center'>
                                <td className="text-center align-middle">{el.ncodigo}</td>
                                <td className="text-center align-middle">{el.vnombre + ' ' + el.vapellido}</td>
                                <td className="text-center align-middle">{el.vtelefono}</td>
                                <td className="text-center align-middle">{el.vdocumento}</td>
                                <td className="text-center align-middle">{el.name_rol}</td>
                                <td className="text-center align-middle">{el.name_privg}</td>
                                <td className="text-center align-middle">{el.vusuario}</td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center bg-light g-1 bg-transparent">
                                        <button className='btn btn-outline-warning me-1' data-bs-toggle='modal' data-bs-target='#modalUsuario' onClick={() => openModal(2, dataUsers.results[id])}>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        <button className='btn btn-outline-danger ms-1' onClick={() => handleDeleteUser(el.ncodigo, el.vusuario)}>
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
    )
}

function ModalUsuario({ form, handleChange, title, btnText, dataRol, dataPrivg, handleAddUpdate }) {
    return (
        <>
            <div className="modal fade" id="modalUsuario" tabndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='modalClose'></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='row'>
                                    <input type="hidden" name="codigo" id='codigo' value={form.codigo || ''} onChange={handleChange} ></input>
                                    <div className='col-md-6'>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Nombres</label>
                                            <input type="text" className='form-control form-control-sm' name='nombres' id='nombres' value={form.nombres || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Apellidos</label>
                                            <input type="text" className='form-control form-control-sm' name='apellidos' id='apellidos' value={form.apellidos || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Número Celular</label>
                                            <input type="number" className='form-control form-control-sm' name='telefono' id='telefono' value={form.telefono || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Número Documento</label>
                                            <input type="number" className='form-control form-control-sm' name='documento' id='documento' value={form.documento || ''} onChange={handleChange} autoComplete='off' />
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Seleccione el rol</label>
                                            <select
                                                name="rol"
                                                id="rol"
                                                className='form-select form-select-sm'
                                                value={form.rol || ''}
                                                onChange={handleChange}>
                                                <option value=""> -- seleccionar --</option>
                                                {
                                                    dataRol.results && dataRol.results.map((el, id) => (
                                                        <option key={id} value={el.ncodigo}>{el.vnombre}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        {form.rol != 1 ? <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Seleccione el privilegio</label>
                                            <select
                                                name="privilegio"
                                                id="privilegio"
                                                className='form-select form-select-sm'
                                                aria-label="Default select example"
                                                value={form.privilegio || ''}
                                                onChange={handleChange}>
                                                <option value="" > -- seleccionar --</option>
                                                {
                                                    dataPrivg.results && dataPrivg.results.map((el, id) => (
                                                        <option key={id} value={el.ncodigo}>{el.vnombre}</option>
                                                    ))
                                                }
                                            </select>
                                        </div> : ''

                                        }
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Usuario</label>
                                            <input type="text" name='usuario' id='usuario' className='form-control form-control-sm' value={form.usuario || ''} onChange={handleChange} />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Clave</label>
                                            <input type="password" name="pass" id="pass" className='form-control form-control-sm' value={form.pass || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button className="btn btn-primary" onClick={handleAddUpdate}>{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Usuarios() {
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/usuarios';
    const urlP = 'https://apinodeexpressfirst-production.up.railway.app/api/privilegios';
    const [form, setForm] = useState({});
    const [title, setTitle] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [btnText, setBtnText] = useState('');
    const [dataUsers, setDataUsers] = useState([]);
    const [dataRol, setDataRol] = useState([]);
    const [dataPrivg, setDataPrivg] = useState([]);
    const navigate = useNavigate();
    const axiosUser = async () => {
        const response = await axiosDataGet(url);
        setDataUsers(response);
    }

    useEffect(() => {
        axiosUser();
    }, [])

    useEffect(() => {
        const getDataRol = async () => {
            const response = await axiosDataGet(`${urlP}/rol`);
            setDataRol(response);
        }

        getDataRol();
    }, [])

    useEffect(() => {
        const getDataPrivg = async () => {
            const response = await axiosDataGet(`${urlP}/privg`);
            setDataPrivg(response);
        }
        getDataPrivg();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        camposVacios(form, '#dee2e6', 'n');
    }

    const openModal = (op, data) => {
        if (op == 1) {
            setTitle('Registro de usuarios');
            setBtnText('Guardar');
            setForm({
                ...form,
                codigo: '',
                nombres: '',
                apellidos: '',
                telefono: '',
                documento: '',
                usuario: '',
                rol: '',
                privilegio: ''
            })

            camposVacios(form, '#dee2e6', 'y');
        } else if (op == 2) {
            setTitle('Actulizar usuario');
            setBtnText('Actulizar');
            console.log(data);
            setForm({
                ...form,
                codigo: data.ncodigo,
                nombres: data.vnombre,
                apellidos: data.vapellido,
                telefono: data.vtelefono,
                documento: data.vdocumento,
                usuario: data.vusuario,
                rol: data.nrol,
                privilegio: data.nprivilegio,
            })
            camposVacios(form, '#dee2e6', 'n');
        }

        setOperacion(op)
    }




    const handleAddUpdate = async () => {

        if (form.nombres = '' || form.apellidos == '' || form.telefono == '' || form.documento == '' || form.usuario == '' || form.rol == '' || form.privilegio == '') {
            //await camposVacios(form, 'red', 'y');
            console.log(form);
            camposVacios(form, 'red', 'y');
            return SweetAlertGenerteWithToast('Todos los campos son obligatorios', 'info');
        };

        console.log(form);

        if (operacion == 1) {
            const response = await axios.post(url, form, { withCredentials: true });

            if(response.data.error && Number(response.data.status) == 401){
                SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                    navigate('/')
                    window.location.reload();
                });
                return;
            }

            if (response.data.error) {
                SweetAlertGenerteWithToast(response.data.message, 'error');
            } else {
                SweetAlertGenerteWithToast('Se creo correctamente el usuario', 'success');
                document.getElementById('modalClose').click();
                axiosUser();

            }

        } else if (operacion == 2) {
            const response = await axios.put(url, form, { withCredentials: true });

            if(response.data.error && Number(response.data.status) == 401){
                SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                    navigate('/')
                    window.location.reload();
                });
                return;
            }

            if (response.data.error) {
                SweetAlertGenerteWithToast(response.data.message || response.data.errorMesagge, 'error');
                console.log(response);
            } else {
                SweetAlertGenerteWithToast(response.data.message, 'success');
                document.getElementById('modalClose').click();
                axiosUser();
            }
        }
    }






    const handleDeleteUser = async (id, nombre) => {

        Swal.fire({
            title: '¿Seguro que quieres eliminar el usuario ' + nombre + ' ?',
            icon: 'question',
            text: 'No se recuperar esta información',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Calcelar'

        }).then(async (respuesta) => {
            if (respuesta.isConfirmed) {
                try {
                    const response = await axios.delete(`${url}/${id}`, { withCredentials: true });

                    if(response.data.error && Number(response.data.status) == 401){
                        SessionExperix_alert('Tu sesión ha expirado','¿Desea nuevamente iniciar sesión?','info',() => {
                            navigate('/')
                            window.location.reload();
                        });
                        return;
                    }

                    if (response.data.error) {
                        SweetAlertGenerteWithToast(response.data.errorMessage, 'error');
                    } else {
                        SweetAlertGenerteWithToast(response.data.message, 'success');
                        axiosUser();

                    }
                } catch (error) {
                    console.log('error eliminar usuario ', error);
                    SweetAlertGenerteWithToast('Ocurrrio un error en el serviddor.\n comuniquece con el administrador', 'error');
                }

            } else {
                SweetAlertGenerteWithToast('El usuario no fue eliminado', 'info');
            }
        })

    }


    return (
        <>
            <div className='container'>
                <div className='mb-2 mt-2'>
                    <BtnCrear openModal={openModal} />
                </div>
                <div>
                    <TablesUsuarios
                        dataUsers={dataUsers}
                        openModal={openModal}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>
            </div>
            <ModalUsuario
                form={form}
                handleChange={handleChange}
                title={title}
                btnText={btnText}
                dataRol={dataRol}
                dataPrivg={dataPrivg}
                handleAddUpdate={handleAddUpdate} />
        </>
    )
}

export default Usuarios
