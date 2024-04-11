import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalState } from '../../Hook/useProvaider'

// link
const links = [
    {
        name: 'Inicio',
        path: '/home'
    },
    {
        name: 'Producto',
        path: '/product'
    },
    {
        name: 'Producto',
        path: '/listproducts'
    }
]

const linksAdmin = [
    {
        name: 'Creación Usuarios',
        path: '/user'
    }
]

const rutasRegistradas = links.map(link => link.path);
const rutasRegistradasAdmin = linksAdmin.map(link => link.path)

function NavBar() {
    const { globalState } = useGlobalState();
    const location = useLocation();
    const history = useNavigate();
    const mostrarNavbar = rutasRegistradas.includes(location.pathname) || rutasRegistradasAdmin.includes(location.pathname);
    const CloseSession = () => {
        return history('/');
    }
    return (
        <>
            {mostrarNavbar &&
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {Number(globalState && globalState.data && globalState.data.rol) == 2
                                    ? links.map((el, id) => (
                                        el.path == '/listproducts' && (
                                            <li className={`nav-item`} key={id}>
                                                <Link to={el.path} className={`nav-link ${location.pathname === el.path ? 'active' : ''}`}>{el.name}</Link>
                                            </li>
                                        )

                                    ))
                                    :
                                    links.map((el, id) => (
                                        el.path != '/listproducts' && (
                                            <li className={`nav-item`} key={id}>
                                                <Link to={el.path} className={`nav-link ${location.pathname === el.path ? 'active' : ''}`}>{el.name}</Link>
                                            </li>
                                        )
                                    ))
                                }
                                {Number(globalState && globalState.data && globalState.data.rol) == 1
                                    ? (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Administración
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {
                                                    linksAdmin.map((el, id) => (
                                                        <li key={id}><Link to={el.path} className="dropdown-item">{el.name}</Link></li>

                                                    ))

                                                }
                                            </ul>
                                        </li>
                                    ) : null

                                }
                            </ul>
                            <div className='d-flex me-5'>
                                <span className='text-white fs-5'><i class="bi bi-cart"></i></span>
                            </div>
                            <div className="d-flex">
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {globalState.data && `${globalState.data.nombres} ${globalState.data.apellidos}`}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={CloseSession}>Cerrar Sesión</button></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>

            }
        </>
    )
}

export default NavBar
