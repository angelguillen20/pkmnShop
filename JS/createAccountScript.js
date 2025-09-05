
const usuarios = [ { nombre: "Ash Ketchum", pass: "pikachu123", email: "" }, { nombre: "Misty", pass: "togepi123", email: "" } ];
 // Referencias a los elementos del formulario
  const user = document.getElementById("nombre"); 
  const contra1 = document.getElementById("pass1"); 
  const contra2 = document.getElementById("pass2"); 
  const email1 = document.getElementById("email"); 
  const form = document.getElementById("Form"); 
  const parrafoWarning = document.getElementById("warning");


if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    let warning = "";
    let regaxEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let entrar = false;

    if (user.value.length < 6) {
      warning += "El nombre debe tener al menos 6 caracteres <br>";
      entrar = true;
    }

    if (!regaxEmail.test(email1.value)) {
      warning += "El email no es válido <br>";
      entrar = true;
    }

    if (contra1.value.length < 8) {
      warning += "La contraseña debe tener al menos 8 caracteres <br>";
      entrar = true;
    }

    if (contra1.value !== contra2.value) {
      warning += "Las contraseñas no coinciden <br>";
      entrar = true;
    }

    if (entrar) {
      parrafoWarning.innerHTML = warning;
      return;
    } else {
      parrafoWarning.innerHTML = "Usuario registrado";

      if (usuarios.find(u => u.nombre === user.value)) {
        alert("El nombre de usuario ya existe");
        return;
      }
      if (usuarios.find(u => u.email === email1.value)) {
        alert("El email ya está registrado");
        return;
      }

      let usuario = {
        nombre: user.value,
        pass: contra1.value,
        email: email1.value
      };
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario registrado con éxito");
      form.reset();
      window.location.href = "IniciarSession.html";
    }
  });
}


//  Función que valida login
function loguear() {
  const nombre = document.getElementById("loginNombre").value;
  const pass = document.getElementById("loginPass").value;

  // Recuperar usuarios guardados en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar coincidencia
  const user = usuarios.find(u => u.nombre === nombre && u.pass === pass);

  if (user) {
    localStorage.setItem("usuario", user.nombre);
    alert("Bienvenido " + user.nombre);
    window.location.href = "index.html"; // Redirige a inicio
  } else {
    alert("Nombre o contraseña incorrectos");
  }
}  

// Función de logout
function logout() {
  localStorage.removeItem("usuario"); // Borra sesión
  window.location.href = "index.html"; // Redirige
}

// Función para actualizar navbar
function actualizarNavbar() {
  const authLinks = document.getElementById("authLinks");
  if (!authLinks) return; // Evita error si navbar no existe en esa página

  const usuario = localStorage.getItem("usuario");
  authLinks.innerHTML = "";

  if (usuario) {
    // Si hay usuario logueado
    authLinks.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Bienvenido, ${usuario}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Perfil</a></li>
          <li><a class="dropdown-item" href="#" onclick="logout()">Cerrar Sesión</a></li>
        </ul>
      </li>
    `;
  } else {
    // Si NO hay usuario logueado
    authLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="IniciarSession.html">Iniciar Sesión</a></li>
      <li class="nav-item"><a class="nav-link" href="createAccount.html">Registrarse</a></li>
    `;
  }
}

// Ejecutar al cargar cualquier página
document.addEventListener("DOMContentLoaded", actualizarNavbar);

