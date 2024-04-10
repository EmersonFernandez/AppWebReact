import React from 'react'

function BtnCreate({disabled,openModal}) {
    return (
        <>
            <div>
                <button disabled={disabled.addDisabled} className='btn btn-info text-white --btn--' 
                data-bs-toggle="modal" data-bs-target="#modalProduct" onClick={() => openModal(1)}>Crear un nuevo producto</button>
            </div>
        </>
    );
}

export default BtnCreate
