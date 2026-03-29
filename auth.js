// api/auth.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { user, pass } = req.body;

    // 1. LINK DATABASE (Ganti URL ni dengan DB kau)
    const DB_URL = "https://detect-project-default-rtdb.firebaseio.com/admin_config.json";

    try {
        // 2. Ambil data dari Firebase
        const response = await fetch(DB_URL);
        const adminData = await response.json();

        // 3. Hash password yang admin taip kat gate.html tadi
        // Kita kena import crypto (node built-in)
        const crypto = await import('crypto');
        const hashedInput = crypto.createHash('sha256').update(pass).digest('hex');

        // 4. BANDINGKAN!
        // Email kena sama, Password Hash pun kena sama sebijik.
        if (user === adminData.email && hashedInput === adminData.password) {
            return res.status(200).json({
                success: true,
                redirect: "/dashboard" 
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "AKSES_DITOLAK: Kredential Salah."
            });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "RALAT_SISTEM" });
    }
}