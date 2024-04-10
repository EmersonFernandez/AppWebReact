import React, { useEffect } from 'react';
import './Page404.css';

const NotFoundPage = () => {
  useEffect(() => {
    const errorText = document.querySelector('.error h1');
    let counter = 0;
    const interval = setInterval(() => {
      errorText.style.fontSize = `${100 + Math.sin(counter) * 10}px`;
      counter += 0.1;
    }, 50);

    // Detener la animación después de 3 segundos
    setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='body'>
        <div className="container">
          <div className="error">
            <h1>404</h1>
            <p>Página no encontrada</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
