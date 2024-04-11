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
                            <div className='d-flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
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
