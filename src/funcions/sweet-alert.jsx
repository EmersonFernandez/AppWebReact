// funciones de sweet alerts
import Swal from 'sweetalert2'

export const SessionExperix_alert = (message, text, icon, redirectFunction) => {
    return Swal.fire({
        title: message,
        text: text,
        icon: icon,
        position: 'center',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Iniciar Sesión",
    }).then((result) => {
        if (result.isConfirmed) {
            redirectFunction();
            //window.location.reload();
        }
    });
}


export const SweetAlertGenerteWithToast = (message, icon) => {
    return Swal.fire({
        title: message,
        icon: icon,
        position: 'bottom-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000
    })
}


export const SweetAlertSimple = (message,icon) => {
    Swal.fire({
        position: "top-end",
        icon: icon,
        toast: true,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}


