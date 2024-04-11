import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarProducts.css'; // Importa estilos CSS para el componente

function CarProducts({ productsData }) {
    const url = 'https://apinodeexpressfirst-production.up.railway.app/api/producto';
    const [cartItems, setCartItems] = useState([]);
    const [productos, setProductos] = useState([]);

    const showProducts = async () => {
        const response = await axios.get(url, { withCredentials: true });
        if (response.data.error) {
            console.log('error');
        } else {
            setProductos(response.data.results);
        }
    }

    useEffect(() => {
        showProducts();
    }, [])

    const addToCart = (productName, productPrice) => {
        const alreadyInCart = cartItems.find(item => item.vnombre === productName);

        if (!alreadyInCart) {
            const newItem = { vnombre: productName, nprecio: productPrice, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeFromCart = (productName) => {
        const updatedCartItems = cartItems.filter(item => item.vnombre !== productName);
        setCartItems(updatedCartItems);
    };

    const increaseQuantity = (productName) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.vnombre === productName) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

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
        <div className='product-catalog-and-cart'>
            <div className='catalog'>
                <h2>Lista de Productos</h2>
                <div className='product-grid'>
                    {productos && productos.map(product => (
                        <div key={product.id} className='product-card'>
                            <img src={product.ncodigo} alt={product.vnombre} />
                            <div className='product-info'>
                                <h5>{product.vnombre}</h5>
                                <p>Precio: ${product.nprecio}</p>
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
            <div className='cart'>
                <h2>Carrito de Compras</h2>
                {cartItems.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.vnombre} className='cart-item'>
                                <div className='cart-item-info'>
                                    <span className='cart-item-name'>{item.vnombre}</span>
                                    <span className='cart-item-price'>${item.nprecio}</span>
                                </div>
                                <div className='cart-item-actions'>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => decreaseQuantity(item.vnombre)}
                                    >
                                        <i className="bi bi-caret-left text-success"></i>
                                    </button>
                                    <span className='cart-item-quantity'>{item.quantity}</span>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => increaseQuantity(item.vnombre)}
                                    >
                                        <i class="bi bi-caret-right text-success"></i>
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => removeFromCart(item.vnombre)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarProducts;
