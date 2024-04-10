// 
export const camposVacios = async (form, color,opcion) => {
    for (let clave in form) {
        if (Object.prototype.hasOwnProperty.call(form, clave)) { // Verificando si la propiedad es propia del objeto
            let $campos = await document.getElementById(`${clave}`);
            
            if ($campos) { // Verifica si $campos no es null antes de acceder a su propiedad value
                let campoVacio ;
                if (opcion == 'y') {
                    campoVacio = $campos.value == '';
                }else if (opcion == 'n') {
                    campoVacio = $campos.value != '';
                }
                if (campoVacio) {
                    $campos.style.borderColor = `${color}`;

                }
            } else {
                console.log(`El elemento con ID '${clave}' no se encontró en el DOM.`);
            }
        }
    }
}