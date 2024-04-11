import React, { useEffect, useState, useRef } from 'react';
import { axiosDataGet } from '../../funcions/axiosDatas';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import { SpinnerIcon } from '../../funcions/spinner';
import { SweetAlertGenerteWithToast } from '../../funcions/sweet-alert';


function NewPassword() {
    const [dataUser, setDataUser] = useState({});
    const [newPass, setNewPass] = useState(false);
    const alertShown = useRef(false);
    const navegate = useNavigate();

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

    const [formulario, setFormulario] = useState({
        user: '',
        pass: '',
        confirm: '',
    });

    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/login';
    const [loanding, setLoanding] = useState(false);

    let $campoPass = document.getElementById('pass');
    let $campoConfirm = document.getElementById('confirm');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value.trim()
        });
        formulario.pass != '' ? $campoPass.style.borderColor = '#dee2e6' : ''
        formulario.confirm != '' ? $campoConfirm.style.borderColor = '#dee2e6' : ''
    };

    useEffect(() => {
        
        if (Object.keys(dataUser).length !== 0 && dataUser.results && !alertShown.current) {
            if (!dataUser.error) {
                if (dataUser.results[0].bchangepassword) {
                    setNewPass(true);
                }else if (Number(dataUser.results[0].rol) == 2) {
                    navegate('/listproducts');
                } 
                else {
                    navegate('/home');

                }
            }

            alertShown.current = true;
        }
    }, [dataUser]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoanding(true);
            if(formulario.confirm == ''  || formulario.pass == '') {   
                setLoanding(false);
                formulario.pass == '' ? $campoPass.style.borderColor = 'red' : ''
                formulario.confirm == '' ? $campoConfirm.style.borderColor = 'red' : ''
                return SweetAlertGenerteWithToast('Todos los campos son obligatorios', 'info');
            };

            if(formulario.pass != formulario.confirm){
                setLoanding(false);
                return SweetAlertGenerteWithToast('Las constraseña no son iguales', 'info');
            }
            
            const response = await axios.put(url, {
                user:dataUser.results[0].vusuario,
                pass:formulario.pass
            },{ withCredentials: true, });

            if(!response.data.error){
                console.log(response.data.message);
                navegate('/home');
            }

            if(response.data.error) {
                setLoanding(false)
                console.log(formulario);
                return SweetAlertGenerteWithToast(response.data.message, 'error');
            };
            

        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    }

    return newPass ? (
        <>
            <div className='App' style={{ background: '#f0f2f5' }}>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='border border-light bg-body p-3 shadow rounded me-3 ms-3'>
                        <form onSubmit={handleSubmit}>
                            <div className='form text-center'>
                                <p className='h5'>Restablecer Contraseña</p>
                                <div className='mb-3'>
                                    <label htmlFor="user" className='label-form'>Usuario</label>
                                    <input type="text" id='user' readOnly name='user' className='form-control' value={formulario.user = dataUser.results[0].vusuario} onChange={handleChange}></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="pass" className='label-form'>Contraseña</label>
                                    <input type='password' id='pass' name='pass' className='form-control' autoComplete='off' value={formulario.pass} onChange={handleChange}></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="confirm" className='label-form'>Confirmar contraseña</label>
                                    <input type='password' id='confirm' name='confirm' className='form-control' autoComplete='off' value={formulario.confirm} onChange={handleChange}></input>
                                </div>
                                {loanding && <SpinnerIcon />}
                                <div>
                                    <button type="submit" className='btn btn-primary'>
                                        <i></i> ENTRAR
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
        : null
}

export default NewPassword