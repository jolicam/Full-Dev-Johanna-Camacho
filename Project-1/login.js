const usuarios = [
    { id: 1, usuario: 'usuario1', clave: '1234' },
    { id: 2, usuario: 'usuario2', clave: '5678' },
    { id: 3, usuario: 'usuario3', clave: '9101' },
    { id: 4, usuario: 'usuario4', clave: '1121' },
    { id: 5, usuario: 'usuario5', clave: '3141' }
];

function validarUsuario(usuario, clave) {
    const user = usuarios.find(u => u.usuario === usuario);
    if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
    }
    if (user.clave !== clave) {
        return { success: false, message: 'Clave incorrecta' };
    }
    return { success: true };
}

function gestionarIntentosFallidos(usuario) {
    let intentosFallidos = JSON.parse(localStorage.getItem('intentosFallidos')) || {};

    if (!intentosFallidos[usuario]) {
        intentosFallidos[usuario] = 0;
    }

    intentosFallidos[usuario]++;

    if (intentosFallidos[usuario] >= 3) {
        alert('Usuario bloqueado');
        let usuariosBloqueados = JSON.parse(localStorage.getItem('usuariosBloqueados')) || {};
        usuariosBloqueados[usuario] = true;
        localStorage.setItem('usuariosBloqueados', JSON.stringify(usuariosBloqueados));
    }

    localStorage.setItem('intentosFallidos', JSON.stringify(intentosFallidos));
}

function verificarBloqueo(usuario) {
    const usuariosBloqueados = JSON.parse(localStorage.getItem('usuariosBloqueados')) || {};
    return !!usuariosBloqueados[usuario];
}

function login(usuario, clave) {
    if (verificarBloqueo(usuario)) {
        alert('Usuario bloqueado');
        return;
    }

    const resultado = validarUsuario(usuario, clave);
    if (!resultado.success) {
        alert(resultado.message);
        gestionarIntentosFallidos(usuario);
    } else {
        alert('Inicio de sesión exitoso');
        let intentosFallidos = JSON.parse(localStorage.getItem('intentosFallidos')) || {};
        intentosFallidos[usuario] = 0;
        localStorage.setItem('intentosFallidos', JSON.stringify(intentosFallidos));
    }
}

document.getElementById('loginButton').addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
    login(usuario, clave);
});


