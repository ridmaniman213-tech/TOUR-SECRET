// public/js/main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = { /* KAU PUNYA CONFIG */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let myPeer = null;

window.initializeGateway = async function() {
    const userId = document.getElementById('user-input').value.trim();
    const userPass = document.getElementById('pass-input').value.trim();
    
    // Hashing password yang user taip untuk bandingkan dengan DB
    const hashedInput = CryptoJS.SHA256(userPass).toString();

    onValue(ref(db, 'participants/' + userId), async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.pass === hashedInput) {
                // Berjaya Login
                await startScreenShare(userId);
                // --- FUNGSI KICK ---
                // Jika data dipadam dari DB, reload page
            } else {
                alert("KEY SALAH!");
            }
        } else {
            // Jika akaun dipadam masa user tengah login, dia akan reload
            if (myPeer) {
                alert("Akaun anda telah dipadam oleh Admin.");
                location.reload();
            } else {
                alert("ID TIDAK WUJUD!");
            }
        }
    });
}

async function startScreenShare(userId) {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        myPeer = new Peer(userId);

        myPeer.on('open', async () => {
            await update(ref(db, 'participants/' + userId), { status: "ONLINE" });
            // UI Change: Welcome Nama
            document.getElementById('login-card').innerHTML = `<h2 style='color:#00f2ff'>WELCOME ${userId}</h2><p>Monitoring Active...</p>`;
        });

        myPeer.on('call', (call) => call.answer(stream));

        stream.getVideoTracks()[0].onended = () => stopMonitoring(userId);
    } catch (err) {
        alert("Wajib share screen!");
        location.reload();
    }
}

async function stopMonitoring(userId) {
    await update(ref(db, 'participants/' + userId), { status: "OFFLINE" });
    location.reload();
}