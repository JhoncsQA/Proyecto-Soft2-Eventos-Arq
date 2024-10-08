// notificaciones.js
const admin = require('firebase-admin');

// Inicializa Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://tu-proyecto.firebaseio.com"
});

async function listenForEvents() {
    const db = admin.firestore();
    const eventsRef = db.collection('events');

    // Escuchar nuevos eventos
    eventsRef.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
                const event = change.doc.data();
                if (event.type === 'USER_REGISTERED') {
                    await sendEmail(event.payload.email);
                }
            }
        });
    });
}

async function sendEmail(email) {
    // Implementa la lógica para enviar el correo electrónico aquí
    console.log(`Enviando correo a: ${email}`);
}

// Iniciar el servicio de escucha
listenForEvents();
