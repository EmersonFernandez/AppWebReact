import React, { useEffect, useState } from 'react';
import axios, { AxiosHeaders } from 'axios';
import { SpinnerIcon } from '../../funcions/spinner';
import {useNavigate} from 'react-router-dom'
import './Login.css'
import {SweetAlertGenerteWithToast} from '../../funcions/sweet-alert'
const apiUrl = import.meta.env.REACT_APP_API_URL;


function Formulario({onLogin ,isLoggedIn}) {

    const [formulario, setFormulario] = useState({
        user: '',
        pass: ''
    });

    useEffect(()=>{
        localStorage.setItem('isLoggedIn', false);;
    },[])

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if(isLoggedIn){
            onLogin();
        }else{
            localStorage.removeItem('isLoggedIn');
        }
    },[isLoggedIn])

   let ulrLogin = 'https://apinodeexpressfirst-production.up.railway.app/api/login';
    // let ulrLogin =  `${apiUrl}/login`;
    const [loanding, setLoanding] = useState(false);
    const history = useNavigate();

    let $campoUser = document.getElementById('user');
    let $campoPass = document.getElementById('pass');

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value.trim()
        });
        formulario.user != '' ? $campoUser.style.borderColor = '#dee2e6' : ''
        formulario.pass != '' ? $campoPass.style.borderColor = '#dee2e6' : ''
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoanding(true);
            if(formulario.user == ''  || formulario.pass == '') {   
                setLoanding(false);
                formulario.user == '' ? $campoUser.style.borderColor = 'red' : ''
                formulario.pass == '' ? $campoPass.style.borderColor = 'red' : ''
                return SweetAlertGenerteWithToast('Todos los campos son obligatorios', 'info');
            };


            const response = await axios.post(ulrLogin, formulario,{ withCredentials: true, });

            if(!response.data.error){
                localStorage.setItem('isLoggedIn', true);
                onLogin();
                history('/processlogin');
                window.location.reload();
                
            }

            if(response.data.error) {
                setLoanding(false)
                console.log(formulario);
                return SweetAlertGenerteWithToast(response.data.errorMesagge, 'error');
            };
            
            

        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }

        // reseteo de los input del formularios
        setFormulario({
            user: '',
            pass: ''
        });
    };

    return (
        <>
            <div className='App' style={{background:'#f0f2f5'}}>
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='border border-light bg-body p-3 shadow rounded me-3 ms-3'>
                        <form onSubmit={handleSubmit}>
                            <div className='form text-center'>
                                <p className='h5'>Inicio Sesión</p>
                                <div className='mb-3'>
                                    <label htmlFor="user" className='label-form'>Usuario</label>
                                    <input type="text" id='user' name='user' className='form-control' value={formulario.user} onChange={handleChange}></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="pass" className='label-form'>Contraseña</label>
                                    <input type='password' id='pass' name='pass' className='form-control' autoComplete='off' value={formulario.pass} onChange={handleChange}></input>
                                </div>
                                {loanding && <SpinnerIcon/>}
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
}


export default Formulario;
