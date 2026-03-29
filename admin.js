import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --- [ 1. CONFIG FIREBASE IKUT SCREENSHOT KAU ] ---
const firebaseConfig = {
    apiKey: "AIzaSyCz5cj9VBeiunHIvxSSZNKXLr9MDZcnut0",
    authDomain: "detect-system-v3.firebaseapp.com",
    databaseURL: "https://detect-system-v3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "detect-system-v3",
    storageBucket: "detect-system-v3.firebasestorage.app",
    messagingSenderId: "18524075269",
    appId: "1:18524075269:web:dae72d517d9bc5cc89736c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- [ 2. PEERJS SETUP (UNTUK CCTV) ] ---
// ID Peer Admin kena statik supaya peserta senang cari
const peer = new Peer('ADMIN_OPERATOR_IMANZ'); 

peer.on('open', (id) => {
    console.log('Admin Peer ID is: ' + id);
});

// --- [ 3. FUNCTION CREATE ACCOUNT ] ---
window.addParticipant = function() {
    const nameInput = document.getElementById('pName');
    const msg = document.getElementById('status-msg');
    const name = nameInput.value.trim();
    
    if (name === "") return alert("Nama wajib isi!");

    // Generate ID (USER-1234) & Key (Rawak 5 Aksara)
    const pID = "USER-" + Math.floor(1000 + Math.random() * 9000);
    const pKey = Math.random().toString(36).substring(7).toUpperCase();
    
    // Hash key guna CryptoJS (pastikan script ada kat admin.html)
    const hashedKey = CryptoJS.SHA256(pKey).toString();

    // Simpan ke Firebase
    set(ref(db, 'participants/' + pID), {
        name: name,
        pass: hashedKey, // Simpan yang dah di-hash
        status: "OFFLINE",
        created_at: serverTimestamp()
    }).then(() => {
        msg.innerHTML = `
            <div class="bg-blue-500/10 border border-blue-500/50 p-3 rounded-lg mt-2">
                <p class="text-blue-400 text-xs font-bold">✅ ACCOUNT CREATED!</p>
                <code class="text-white text-[10px] block mt-1">ID: ${pID} | KEY: ${pKey}</code>
                <p class="text-[9px] text-slate-500 mt-1">*Bagi ID & Key ni kat kawan kau.</p>
            </div>`;
        nameInput.value = ""; // Reset input box
    }).catch((err) => {
        console.error(err);
        alert("Ralat Firebase! Pastikan 'Rules' di set kepada true.");
    });
}

// --- [ 4. FUNCTION DELETE ACCOUNT ] ---
window.deleteParticipant = function(id, name) {
    if(confirm(`Padam akaun ${name}?`)) {
        remove(ref(db, 'participants/' + id));
    }
}

// --- [ 5. MONITORING LIST (REAL-TIME) ] ---
const monitorList = document.getElementById('monitor-list');
const activeCount = document.getElementById('active-count');

onValue(ref(db, 'participants'), (snapshot) => {
    monitorList.innerHTML = "";
    let onlineCount = 0;

    if (snapshot.exists()) {
        snapshot.forEach((child) => {
            const id = child.key;
            const data = child.val();
            if (data.status === "ONLINE") onlineCount++;

            const card = document.createElement('div');
            card.className = "p-1"; // Padding celah grid
            card.innerHTML = `
                <div class="glass p-4 rounded-xl border-l-4 ${data.status === "ONLINE" ? 'border-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.2)]' : 'border-slate-700'}">
                    <div class="flex justify-between items-center">
                        <div>
                            <b class="text-white block">${data.name}</b>
                            <code class="text-[10px] text-slate-500">${id}</code>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="watchLive('${id}')" 
                                class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold transition ${data.status === "ONLINE" ? '' : 'opacity-30 cursor-not-allowed'}"
                                ${data.status === "ONLINE" ? '' : 'disabled'}>
                                WATCH
                            </button>
                            <button onclick="deleteParticipant('${id}', '${data.name}')" 
                                class="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded text-[10px] transition">
                                DEL
                            </button>
                        </div>
                    </div>
                </div>`;
            monitorList.appendChild(card);
        });
    } else {
        monitorList.innerHTML = '<p class="text-slate-600 italic text-sm">Tiada isyarat peserta...</p>';
    }
    activeCount.innerText = onlineCount;
});

// --- [ 6. LIVE WATCH LOGIC ] ---
window.watchLive = function(targetId) {
    const modal = document.getElementById('cctv-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.getElementById('target-id').innerText = "TARGET_STREAM: " + targetId;
    
    // Admin request stream dari peserta (PeerJS)
    const call = peer.call(targetId, null); 
    
    call.on('stream', (remoteStream) => {
        const videoElement = document.getElementById('remoteVideo');
        videoElement.srcObject = remoteStream;
    });

    call.on('error', (err) => {
        console.error("Peer Error:", err);
        alert("Gagal menyambung ke kamera peserta.");
    });
}

window.closeVideo = function() {
    document.getElementById('cctv-modal').style.display = 'none';
    const videoElement = document.getElementById('remoteVideo');
    if (videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}