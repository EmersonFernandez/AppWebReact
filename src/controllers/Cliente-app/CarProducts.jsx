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
    },[])


    const addToCart = (productName, productPrice) => {
        const alreadyInCart = cartItems.find(item => item.vnombre === productName);

        if (!alreadyInCart) {
            // Si el producto no está en el carrito, lo añade con cantidad inicial 1
            const newItem = { name: productName, price: productPrice, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeFromCart = (productName) => {
        const updatedCartItems = cartItems.filter(item => item.vnombre !== productName);
        setCartItems(updatedCartItems);
    };

    return (
        <div className='product-catalog-and-cart'>
            <div className='catalog'>
                <h2>Lista de Productos</h2>
                <div className='row'>
                    {console.log(productos)}
                    {productos && productos.map(product => (
                        <div key={product.id} className='col-md-4 mb-3'>
                            <div className='card'>
                                <img src={product.ncodigo} className='card-img-top' alt={product.vnombre} />
                                <div className='card-body'>
                                    <h5 className='card-title'>{product.vnombre}</h5>
                                    <p className='card-text'>Precio: ${product.nprecio}</p>
                                    <button
                                        className='btn btn-primary mr-2'
                                        onClick={() => addToCart(product.vnombre, product.nprecio)}
                                    >
                                        Añadir al Carrito
                                    </button>
                                    {/* Botón para ver más detalle del producto */}
                                    <button className='btn btn-secondary'>Ver más</button>
                                </div>
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
                                    <span className='cart-item-quantity'>Cantidad: {item.quantity}</span>
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
