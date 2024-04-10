import React, { useEffect, useState } from 'react';
import { axiosDataGet } from '../../../funcions/axiosDatas';
import './ConfigProvg.css'
import axios from 'axios';
import { SweetAlertGenerteWithToast } from '../../../funcions/sweet-alert';

function ConfigPrivg() {
    // la url con la cual se va a trabar 
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/privilegios/';
    // vamos almacenar la lista de las tablas de el api     
    const [dataTables, setDataTables] = useState([]);
    // vamos almacenar la lista de roles que posee los privilegios
    const [dataPrivg, setDataPrivg] = useState([]);
    // vamos almacenar la lista de tablas con los repectivos roles 
    const [dataInforme, setDataInforme] = useState([]);
    // para determinar si se va añadir o actualizar
    const [operacion, setOperacion] = useState(1);
    // para el titulo de la modal
    const [title, setTitle] = useState('');
    // para cambar el texto de boton
    const [btnText, setBtnText] = useState('');

    // vamos almacenar la informacion del formulrio
    const [form, setForm] = useState({
        select_privg: [],
        select_tables: []
    });

    // vamos almacebar la informacion del formulario, para comparar si se va actualizrar los campos
    const [before, setBefore] = useState({
        select_privg: [],
        select_tables: []
    });

    // este useEffect es para hacer la llamda de la api de la rutas de las tablas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDataGet(`${url}/tables`);
                setDataTables(response);
            } catch (error) {
                console.log('Error al obtener los datos ', error);
            }
        };

        fetchData();
    }, []);

    // esta useEffect es para haver la llamada de la api de la rutas de los roles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDataGet(`${url}/privg`);
                setDataPrivg(response);
            } catch (error) {
                console.log('Error al obtener los datos ', error);
            }
        };

        fetchData();
    }, []);

    // esta es la funcion para llamar la api de los datos que mustra las tablas con los roles relacionados 
    const getData = async () => {
        try {
            const response = await axiosDataGet(`${url}`);
            setDataInforme(response);
        } catch (error) {
            console.log('Error al obtener los datos ', error);
        }
    };

    // llamos la funcion
    useEffect(() => {
        getData();
    }, []);

   // fucion para insertar y actualizar 
    const handelOnClickAdd = async () => {
    // alamcenanos en un objeto la data que vamos almacenar
    const dataAdd = {
        privilegios: form.select_privg.map(option => option[0]).join(':'),
        tablesSelect: form.select_tables.map(option => option).join(':')
    };


    // console.log(dataAdd);
    // si es 1 es para agregar
    if (operacion == 1) {
        const response = await axios.post(url, dataAdd, { withCredentials: true });
        if (response.data.error) {
            SweetAlertGenerteWithToast('Ocurrio un error al momento de configurar los privilegios', 'error');
        } else {
            getData();
            SweetAlertGenerteWithToast('Se configuro correctamente los privilegios', 'success')
            document.getElementById('closeModal').click();
        }
    
        // si es 2 es parar actualzar
    } else if (operacion == 2) {
        // declaramos unas constantes para determinar si se va agregar o eliminar roles o tablas
        // agregar roles
        const privgAdd = form.select_privg.filter(el => !before.select_privg.includes(el));
        // eliminar roles
        const privgRemove = before.select_privg.filter(el => !form.select_privg.includes(el));
        // agregar tablas
        const tablesAdd = form.select_tables.filter(el => !before.select_tables.includes(el));
        // eliminar tablas
        const tablesRemove = before.select_tables.filter(el => !form.select_tables.includes(el));

            let response = null;
            const dataNew = {
                privilegios : form.select_privg.map(el => el[0]).join(':'),
                tablesSelect : form.select_tables.map(option => option).join(':')
            }
        
            privgAdd.length > 0 ? dataNew.privilegios = privgAdd.map(el => el[0]).join(':') : null;
            tablesAdd.length > 0 ? dataNew.tablesSelect = tablesAdd.map(el => el).join(':') : null;

            
            const dataRemove = {
                privilegios : form.select_privg.map(el => el[0]).join(':'),
                tablesSelect : form.select_tables.map(option => option).join(':')
            }

            privgRemove.length > 0 ? dataRemove.privilegios = privgRemove.map(el => el[0]).join(':') : null;
            tablesRemove.length > 0 ? dataRemove.tablesSelect = tablesRemove.map(el => el).join(':') : null;

            if(privgAdd.length > 0 || tablesAdd.length > 0){
                response = await axios.post(url, dataNew, { withCredentials: true });
            }else if(privgRemove.length > 0 || tablesRemove.length > 0){
                response = await axios.post(`${url}/removeprivg`, dataRemove, { withCredentials: true });
            } else {
                console.log('No hay accioones que realizar');
                return  SweetAlertGenerteWithToast('No se actualizo, debido a que no se dectecto nigún cambio','info');
            }
            

            if (await response.data.error) {
                SweetAlertGenerteWithToast('Ocurrio un error al momento de configurar los privilegios', 'error');
                console.log(response.data.message);
            } else {
                getData();
                SweetAlertGenerteWithToast('Se actualizo correctamente los privilegios', 'success')
                document.getElementById('closeModal').click();
        }

    }

}


    // para determinar si se va crear o actualizar
    const openModal = (op, data) => {
        if (op == 1) {
            setTitle('Registrar Privilegios');
            setBtnText('Guardar');
            setForm({
                ...form,
                select_privg: [],
                select_tables: [],
            })
        } else if (op == 2) {
            setTitle('Editar Producto');
            setBtnText('Actualizar');

            const privg = data.codigos.split(",").map(el => el.split(':').reverse());
            const tables = data.table_name.split(",");
            setForm({
                ...form,
                select_privg: privg,
                select_tables: tables

            })

            setBefore({
                ...before,
                select_privg: privg,
                select_tables: tables
            });

        }

        setOperacion(op);
    }


    // este es para alamcenar los datos en el input
    const handleClickOption2 = (option) => {
        setForm(prevForm => {

            const isSelected = prevForm.select_privg.some(innerArray => innerArray.includes(option.ncodigo));
            return {
                ...prevForm,
                select_privg: isSelected
                    ? prevForm.select_privg.filter(data => data[0] !== option.ncodigo) // Elimina si ya está
                    : [...prevForm.select_privg, [option.ncodigo, option.vnombre]] // Agrega si no está
            };
        });
    };
    const handleClickOption3 = (option) => {
        setForm(prevForm => {
            const isSelected = prevForm.select_tables.includes(option.table_name);
            return {
                ...prevForm,
                select_tables: isSelected
                    ? prevForm.select_tables.filter(table_name => table_name !== option.table_name) // Elimina si ya está
                    : [...prevForm.select_tables, option.table_name] // Agrega si no está
            };
        });
    };

    const handleRemoveOption = (option, formField, nameArray) => {
        const updatedOptions = formField.filter(selectedOption => selectedOption !== option);
        setForm(prevForm => ({
            ...prevForm,
            [nameArray]: updatedOptions
        }));
    };

    return (
        <>
            <div>
                <button className='btn btn-info text-white' data-bs-toggle="modal" data-bs-target="#modalPrivg" onClick={() => openModal(1)}>
                    Configurar Privilegios
                </button>

                {/* tabla */}
                <div className='card card-body container mt-3'>
                    <div className='text-center'>
                        <p>Informe privilegios</p>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-hover table-dark table-bordered table-sm align-middle" id='myTableProduct'>
                            <thead>
                                <tr>
                                    <th title='Número del registro' className='text-center align-middle'>#</th>
                                    <th title='Codigo del producto' className='text-center align-middle'>Nombre tabla</th>
                                    <th title='Nombre del producto' className='text-center align-middle'>Usuario o rol</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {dataInforme.results && dataInforme.results.map((el, id) => (
                                    <tr key={id} className='text-center'>
                                        <td className="text-center align-middle">{id + 1}</td>
                                        <td className="text-center align-middle">{el.table_name}</td>
                                        <td className="text-center align-middle">{el.nombreprivg}</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center bg-light g-1 bg-transparent">
                                                <button
                                                    className='btn btn-outline-warning me-1' data-bs-toggle='modal' data-bs-target='#modalPrivg'
                                                    onClick={() => openModal(2, dataInforme.results[id])}>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* fin tabla */}
            </div>
            <div className="modal fade" id="modalPrivg" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closeModal'></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <input type="hidden" name="codigo" id='codigo'></input>
                                <div className='col-md-6'>

                                    <div className='group-form mb-3'>
                                        <label htmlFor="select_privg" className='form-label'>Privilegios</label>
                                        <select
                                            name="select_privg"
                                            multiple
                                            id="select_privg"
                                            className='form-control form-control-sm form-select'
                                            // value={form.select_privg.some(option => option.map( d => d)) || ''}
                                            onChange={() => { }}
                                        >
                                            {
                                                dataPrivg.results && dataPrivg.results.map(data => (
                                                    <option key={data.ncodigo} value={data.ncodigo}
                                                        onClick={() => handleClickOption2(data)} style={{ backgroundColor: form.select_privg.some(selectedOption => selectedOption[0] === data.ncodigo) ? 'lightgreen' : 'white' }}
                                                    >

                                                        {data.vnombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label>Opciones seleccionadas:</label>
                                        <div className='row'>
                                            <div className="col-12">
                                                {form.select_privg.map((option, index) => (
                                                    <div key={`${option}_${index}`} className="list-group-item d-flex justify-content-between align-items-center mb-1" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '3px', fontStyle: 'italic' }}>
                                                        {option[1]}
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleRemoveOption(option, form.select_privg, 'select_privg')}><i className="bi bi-trash-fill"></i></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='group-form mb-3'>
                                        <label htmlFor="select_tables" className='form-label'>Seleccione las tablas</label>
                                        <select
                                            name="select_tables"
                                            id="select_tables"
                                            multiple
                                            className='form-control form-control-sm form-select'
                                            //value={form.select_tables.map(option => option) || ''}
                                            onChange={() => { }}
                                        >
                                            {dataTables.results && dataTables.results.map(option => (
                                                <option key={option.table_name} value={option.table_name}
                                                    onClick={() => handleClickOption3(option)}
                                                    style={{ backgroundColor: form.select_tables.some(selectedOption => selectedOption === option.table_name) ? 'lightgreen' : 'white' }}
                                                >
                                                    {option.table_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label>Opciones seleccionadas:</label>
                                        <div className='row'>
                                            <div className="col-12">
                                                {form.select_tables.map((option, index) => (
                                                    <div key={`${option}_${index}`} className="list-group-item d-flex justify-content-between align-items-center mb-1" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '3px', fontStyle: 'italic' }}>
                                                        {option}
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleRemoveOption(option, form.select_tables, 'select_tables')}><i className="bi bi-trash-fill"></i></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button className="btn btn-primary" onClick={handelOnClickAdd}>{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfigPrivg;
