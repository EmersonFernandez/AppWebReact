import React from 'react'

function ModalProduct({ form, handleChange, title, btnText,addAndUpdate,handleFileChange }) {
    return (
        <>
            <div className="modal fade" id="modalProduct" tabndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='modalClose'></button>
                        </div>
                        <div className="modal-body">
                                <div className='row'>
                                    <input type="hidden" name="codigo"  id='codigo' value={form.codigo || ''} onChange={handleChange} ></input>
                                    <div className='col-md-6'>
                                        <div className='group-form mb-3'>
                                            <label htmlFor="" className='form-label'>Código del producto</label>
                                            <input type="text" className='form-control form-control-sm' name='codProducto' id='codProducto' value={form.codProducto || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Nombre del producto</label>
                                            <input type="text" className='form-control form-control-sm' name='nombre' id='nombre' value={form.nombre || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Precio</label>
                                            <input type="number" className='form-control form-control-sm' name='precio' id='precio' value={form.precio || ''} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Seleccione una categoría</label>
                                            <select name="" id="" className='form-control form-control-sm'>
                                                <option value='3'>Carnes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="" className='form-label'>Descripción</label>
                                            <textarea name='descripcion' id='descripcion' cols="30" rows="5" className='form-control form-control-sm' onChange={handleChange} value={form.descripcion || ''} autoComplete='off'></textarea>
                                        </div>
                                        <div className='group-form mb-2'>
                                            <label htmlFor="">Imagen</label>
                                            <input type="file" name="file" id="file" className='form-control form-control-sm' onChange={handleFileChange} />
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button className="btn btn-primary" onClick={addAndUpdate}>{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalProduct
