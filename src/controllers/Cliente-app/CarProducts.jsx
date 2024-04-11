import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarProducts.css'; // Importa estilos CSS para el componente

// obtenemos la imagen
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

// 
function CarProducts() {
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/producto';
    const [cartItems, setCartItems] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showCart, setShowCart] = useState(false);

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

    // añadimos al carrito
    const addToCart = (productName, productPrice) => {
        const alreadyInCart = cartItems.find(item => item.vnombre === productName);

        if (!alreadyInCart) {
            const newItem = { vnombre: productName, nprecio: productPrice, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    // removemos el producto del carro
    const removeFromCart = (productName) => {
        const updatedCartItems = cartItems.filter(item => item.vnombre !== productName);
        setCartItems(updatedCartItems);
    };

    // incremetamos la cantida de un producto
    const increaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.vnombre === productName) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    // disminuimos la cantidad de un producto
    const decreaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.vnombre === productName && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    return (
        // inicio del html
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Icono de carrito para mostrar/ocultar el carrito */}
            <div className='cart-icon' onClick={() => setShowCart(!showCart)}>
                <i className='bi bi-cart'></i>
                <span className='total'>{Object.keys(cartItems).length}</span>
            </div>
            {/* Carrito de Compras */}
            <div className={`cart ${showCart ? 'show' : ''}`}>
                <h3>Carrito de Compras</h3>
                {cartItems.length === 0 ? (
                    <p style={{fontStyle:'italic'}}>El carrito está vacío.</p>
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
                                    <button className='button delete' onClick={() => removeFromCart(item.vnombre)}>
                                        <i className="bi bi-x-square-fill text-white"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='pago'>
                            <span>total : $374.4394 </span>
                            <button className='btn btn-success'>Pagar</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}


export default CarProducts;
