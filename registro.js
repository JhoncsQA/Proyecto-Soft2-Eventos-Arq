// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2WNuWG73fUUmKb-PeZ4qRR3uDwzlHjV4",
    authDomain: "arqeventos-42937.firebaseapp.com",
    projectId: "arqeventos-42937",
    storageBucket: "arqeventos-42937.appspot.com",
    messagingSenderId: "939735183928",
    appId: "1:939735183928:web:a8515992f76c7ebcfb6ccd",
    measurementId: "G-B7008F7PWL"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para registrar un nuevo usuario
async function registerUser(email, password) {
    try {
        // Crear el usuario en Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Guardar el usuario en Firestore
        await db.collection("evento").add({
            uid: user.uid,
            email: user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log(`Usuario registrado: ${user.email}`);
        return true; // Indica que el registro fue exitoso
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return false; // Indica que el registro falló
    }
}

// Manejar el envío del formulario
document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const success = await registerUser(email, password);
    if (success) {
        document.getElementById("message").innerText = "Usuario registrado con éxito. Se enviará un correo electrónico de confirmación.";
    } else {
        document.getElementById("message").innerText = "Error al registrar usuario.";
    }

    this.reset(); // Limpiar el formulario
});
