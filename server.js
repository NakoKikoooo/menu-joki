// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Database Simulasi
let orders = [];
let orderIdCounter = 1;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ==========================================================
//                   ROUTES (ENDPOINT API)
// ==========================================================

// 1. ENDPOINT POST: Menerima Pesanan Baru dari Frontend
app.post('/api/orders', (req, res) => {
    const { nama, whatsapp, discord, server, layanan, catatan } = req.body; 

    // Validasi data: Nama dan Layanan wajib
    if (!nama || !layanan) {
        return res.status(400).json({ error: "Nama dan Layanan harus diisi." });
    }
    
    // VALIDASI KHUSUS KONTAK: cek jika keduanya kosong (lapisan keamanan)
    if (!whatsapp && !discord) {
        return res.status(400).json({ error: "Mohon isi Nomor WhatsApp atau Nama/ID Discord, salah satunya wajib diisi." });
    }
    
    // Simpan pesanan baru
    const newOrder = {
        id: orderIdCounter++,
        nama,
        whatsapp: whatsapp || 'TIDAK ADA', // Jika kosong, simpan sebagai 'TIDAK ADA'
        discord: discord || 'TIDAK ADA',
        server,
        layanan,
        catatan,
        timestamp: new Date().toISOString()
    };
    orders.push(newOrder);

    // LOG KE TERMINAL
    console.log(`[INFO] Pesanan Baru Diterima: ID ${newOrder.id} dari ${nama} (WA: ${whatsapp || 'N/A'}, Discord: ${discord || 'N/A'})`);

    // Kirim respons sukses ke frontend
    res.status(201).json({ 
        message: "Pesanan berhasil diterima!",
        order: newOrder 
    });
});


// 2. ENDPOINT GET: Melihat Daftar Semua Pesanan yang Tersimpan
app.get('/api/orders', (req, res) => {
    res.status(200).json(orders); 
});

// ==========================================================
//                   JALANKAN SERVER (app.listen)
// ==========================================================
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log("Server siap menerima pesanan dari frontend...");
});