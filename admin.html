<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | ImanzLY Portal</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <style>
        body {
            background-color: #0f172a;
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh; margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            flex-direction: column;
            color: white;
            padding: 20px;
        }

        #number-grid {
            display: grid; 
            /* Kat handphone (default) buat 5 column */
            grid-template-columns: repeat(5, 1fr);
            gap: 10px; 
            width: 100%;
            max-width: 450px; 
            margin-bottom: 20px;
            transition: 0.3s;
            max-height: 60vh;
            overflow-y: auto;
            padding: 10px;
        }

        /* Kat laptop/PC buat 10 column balik */
        @media (min-width: 768px) {
            #number-grid {
                grid-template-columns: repeat(10, 1fr);
            }
        }

        .block {
            aspect-ratio: 1/1; /* Biar petak tepat */
            border: 1px solid #1e293b;
            display: flex; justify-content: center; align-items: center;
            font-size: 12px; cursor: pointer; color: #64748b; transition: 0.3s;
            user-select: none;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 8px;
        }
        .block:hover { color: #38bdf8; border-color: #38bdf8; background: #1e293b; }

        #login-section { display: none; opacity: 0; width: 100%; max-width: 400px; }
        
        .login-card {
            background: #1e293b; padding: 2rem; border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            width: 100%; 
            border: 1px solid #334155; text-align: center;
        }

        @media (max-width: 480px) {
            .login-card { padding: 1.5rem; }
            .login-card h2 { font-size: 1.5rem; }
        }

        .login-card h2 { color: #38bdf8; margin-bottom: 0.5rem; font-weight: 800; }
        .login-card p { color: #94a3b8; font-size: 0.8rem; margin-bottom: 2rem; }
        
        .input-group { text-align: left; margin-bottom: 1.2rem; }
        .input-group label { display: block; color: #cbd5e1; margin-bottom: 0.5rem; font-size: 0.8rem; font-weight: 600; }
        .input-group input { 
            width: 100%; padding: 0.8rem; border-radius: 10px; border: 1px solid #475569;
            background: #0f172a; color: white; box-sizing: border-box; outline: none;
            font-size: 16px; /* Elak auto-zoom kat iPhone */
        }

        .login-btn {
            width: 100%; padding: 0.8rem; border: none; border-radius: 10px;
            background: #38bdf8; color: #0f172a; font-weight: 800; cursor: pointer;
            transition: 0.2s; text-transform: uppercase; letter-spacing: 1px;
        }
        .login-btn:hover { background: #7dd3fc; transform: translateY(-2px); }

        #timer-msg { color: #f87171; font-weight: bold; margin-top: 10px; font-size: 14px; text-align: center; }
        .locked-grid { pointer-events: none; opacity: 0.2; }
    </style>
</head>
<body>

    <div id="number-grid"></div>

    <div id="login-section">
        <div class="login-card">
            <h2>Admin Access</h2>
            <p>Sila masukkan kelayakan verifikasi.</p>
            <form id="adminLoginForm">
                <div class="input-group">
                    <label>Gmail Admin</label>
                    <input type="email" id="email" placeholder="admin@imanzly.com" required>
                </div>
                <div class="input-group">
                    <label>Password Verification</label>
                    <input type="password" id="password" placeholder="••••••••" required>
                </div>
                <button type="submit" class="login-btn">MASUK DASHBOARD</button>
            </form>
            <div id="message" style="margin-top:15px; font-size: 13px; font-weight: bold;"></div>
        </div>
    </div>

    <p id="timer-msg"></p>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

        let dbSecretCode = 12;
        const grid = document.getElementById('number-grid');
        const timerMsg = document.getElementById('timer-msg');

        async function syncSettings() {
            try {
                const snapshot = await get(ref(db));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    dbSecretCode = data.secret_pin || 12;
                }
            } catch (e) { console.error("Sync Error", e); }
        }
        syncSettings();

        for (let i = 1; i <= 100; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.innerText = i;
            block.onclick = () => {
                if (i === parseInt(dbSecretCode)) {
                    revealLogin();
                } else {
                    handleFail();
                }
            };
            grid.appendChild(block);
        }

        const loginForm = document.getElementById('adminLoginForm');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailIn = document.getElementById('email').value.trim();
            const passIn = document.getElementById('password').value.trim();
            const msg = document.getElementById('message');

            msg.innerHTML = '<span style="color: #38bdf8;">Establishing Link...</span>';

            try {
                const snapshot = await get(ref(db));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (emailIn === data.user && passIn === data.pass) {
                        sessionStorage.setItem('admin_token', 'AUTHORIZED_IMANZ_2026');
                        msg.innerHTML = '<span style="color: #4ade80;">ACCESS GRANTED</span>';
                        setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
                    } else {
                        msg.innerHTML = '<span style="color: #f87171;">ACCESS DENIED: Wrong Credentials</span>';
                    }
                }
            } catch (err) {
                msg.innerHTML = '<span style="color: #f87171;">SYSTEM ERROR: Check Database</span>';
            }
        });

        function handleFail() {
            let count = (parseInt(localStorage.getItem('failCount')) || 0) + 1;
            localStorage.setItem('failCount', count);
            if (count >= 3) {
                const wait = (count - 2) * 30;
                localStorage.setItem('lockUntil', Date.now() + (wait * 1000));
                startBan(wait);
            }
        }

        function startBan(s) {
            grid.classList.add('locked-grid');
            let c = s;
            const itv = setInterval(() => {
                timerMsg.innerText = `SISTEM TERKUNCI! CUBA LAGI: ${c}s`;
                if (c-- <= 0) {
                    clearInterval(itv);
                    timerMsg.innerText = "";
                    grid.classList.remove('locked-grid');
                    localStorage.removeItem('lockUntil');
                    localStorage.setItem('failCount', 0);
                }
            }, 1000);
        }

        function revealLogin() {
            gsap.to("#number-grid", { opacity: 0, scale: 0.8, duration: 0.4, onComplete: () => {
                grid.style.display = "none";
                const sec = document.getElementById('login-section');
                sec.style.display = "block";
                gsap.to(sec, { opacity: 1, y: 0, duration: 0.6 });
            }});
        }

        const lockUntil = localStorage.getItem('lockUntil');
        if (lockUntil && Date.now() < lockUntil) {
            startBan(Math.ceil((lockUntil - Date.now()) / 1000));
        }
    </script>
</body>
</html>
