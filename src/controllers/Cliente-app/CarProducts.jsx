import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarProducts.css'; // Importa estilos CSS para el componente
import { SweetAlertSimple } from '../../funcions/sweet-alert'

function Imagen({ id }) {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/image/${id}`, { withCredentials: true });

                if (response.data.status === 400 || response.data.status === 500) {
                    setImageData(null);
                } else {
                    const imageUrl = `https://apinodeexpressfirst-production.up.railway.app/api/imgproductos/image/${id}`;
                    setImageData(imageUrl);
                }
            } catch (error) {
                console.error('Error al recuperar la imagen:', error);
            }
        };
        fetchImage();
    }, [id]);

    return (
        <div>
            {imageData ? (
                <img src={imageData} alt={'No imagen'} />
            ) : (
                <img src='https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg' alt='Imagen no disponible' />
            )}
        </div>
    );
}

function CarProducts() {
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/producto';
    const [cartItems, setCartItems] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [totalPago, setTotalPago] = useState(0);

    const showProducts = async () => {
        try {
            const response = await axios.get(url, { withCredentials: true });
            if (response.data.error) {
                console.log('Error al obtener productos');
            } else {
                setProductos(response.data.results);
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        showProducts();
    }, []);

    const TotalPagoProductos = async (cartItemss) => {
        const total = await cartItemss.reduce((accumulator, item) => {
            return accumulator + Number(item.nprecio) * item.quantity;
        }, 0);

        setTotalPago(total);
    };


    const addToCart = (productName, productPrice) => {
        const alreadyInCart = cartItems.find(item => item.vnombre === productName);

        if (alreadyInCart) {
            SweetAlertSimple('El producto seleccionado, ya esta en el carrito', 'info')
        } else {
            const newItem = { vnombre: productName, nprecio: productPrice, quantity: 1 };
            setCartItems([...cartItems, newItem]);
            TotalPagoProductos([...cartItems, newItem]); // Pasar los cartItems actualizados
            SweetAlertSimple('Producto añadido', 'success')
        }
    };



    const removeFromCart = (productName) => {
        const updatedCartItems = cartItems.filter(item => item.vnombre !== productName);
        setCartItems(updatedCartItems);
        TotalPagoProductos(updatedCartItems); // Actualiza el total después de remover del carrito
    };

    const increaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.vnombre === productName) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        TotalPagoProductos(updatedCartItems); // Actualiza el total después de incrementar la cantidad
    };

    const decreaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.vnombre === productName && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        TotalPagoProductos(updatedCartItems); // Actualiza el total después de decrementar la cantidad
    };

    const generatePedido = () => {
        SweetAlertSimple('Pedido realizado', 'success');
        setShowCart(false);
        setCartItems([]);
    }

    return (
        <>
            <div className='product-catalog-and-cart'>
                <div className='catalog'>
                    <h2>Lista de Productos</h2>
                    <div className='product-grid'>
                        {productos && productos.map(product => (
                            <div key={product.ncodigo} className='product-card'>
                                <Imagen id={product.ncodigo} />
                                <div className='product-info'>
                                    <h5 className='product-name'>{product.vnombre}</h5>
                                    <p className='product-price'>Precio: ${product.nprecio}</p>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => addToCart(product.vnombre, product.nprecio)}
                                    >
                                        Añadir al Carrito
                                    </button>
                                    {/* {console.log(cartItems)} */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='cart-icon' onClick={() => setShowCart(!showCart)}>
                <i className='bi bi-cart'></i>
                <span className='total'>{cartItems.length}</span>
            </div>

            <div className={`cart ${showCart ? 'show' : ''}`}>
                <div className='header'>
                    <h3>Carrito de Compras</h3>
                    <button className='button delete' onClick={() => setShowCart(false)}>
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <p style={{ fontStyle: 'italic' }}>El carrito está vacío.</p>
                ) : (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.vnombre} className='cart-item'>
                                <div className='cart-item-info'>
                                    <span className='cart-item-name'>{item.vnombre}</span>
                                    <span className='cart-item-price'>${item.nprecio}</span>
                                </div>
                                <div className='cart-item-actions'>
                                    <button className='button' onClick={() => decreaseQuantity(item.vnombre)}>
                                        <i className="bi bi-caret-left text-success"></i>
                                    </button>
                                    <span className='cart-item-quantity'>{item.quantity}</span>
                                    <button className='button' onClick={() => increaseQuantity(item.vnombre)}>
                                        <i className="bi bi-caret-right text-success"></i>
                                    </button>
                                    <button className='button delete product' onClick={() => removeFromCart(item.vnombre)}>
                                        <i className="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='pago'>
                            <span>Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalPago)}</span>
                            <button className='btn btn-success' onClick={() => generatePedido()}>Generar pedido</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CarProducts;
