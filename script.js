// script.js

// DATA HARGA LAYANAN (Disesuaikan dengan Pricelist KIKO JOKI GENSHIN)
const servicePrices = {
    // -------------------------------------------------------------
    // 1. SPYRALL - Ikon AMBER
    // -------------------------------------------------------------
    spyrall: [
        { name: "Spyrall Abyss (Full Star)", desc: "Penyelesaian penuh Spyrall Abyss (tergantung gear akun).", price: "FREE" },
        { name: "Stygiant Onslaught", desc: "Penyelesaian penuh tantangan Stygiant Onslaught.", price: "FREE" },
        { name: "Imaginarium Theater", desc: "Penyelesaian penuh event Imaginarium Theater.", price: "FREE" }
    ],
    // -------------------------------------------------------------
    // 2. EKSPLORASI MAP - Ikon GANYU (Harga Per Wilayah)
    // -------------------------------------------------------------
    eksplorasi: [
        { name: "Explore Map: Mondstad", desc: "Eksplorasi Map wilayah Mondstad (Full Chest/Seelie).", price: "8K" },
        { name: "Explore Map: Dragonspine", desc: "Eksplorasi Map wilayah Dragonspine (Full Chest/Seelie).", price: "15K" },
        { name: "Explore Map: Liyue", desc: "Eksplorasi Map wilayah Liyue (Full Chest/Seelie).", price: "20K" },
        { name: "Explore Map: Inazuma", desc: "Eksplorasi Map wilayah Inazuma (Full Chest/Seelie).", price: "20K" },
        { name: "Explore Map: Sumeru", desc: "Eksplorasi Map wilayah Sumeru (Full Chest/Seelie).", price: "35K" },
        { name: "Explore Map: Fontaine", desc: "Eksplorasi Map wilayah Fontaine (Full Chest/Seelie).", price: "25K" },
        { name: "Explore Map: Natlan", desc: "Eksplorasi Map wilayah Natlan (Full Chest/Seelie).", price: "20K" },
        { name: "Explore Map: Nodkrai", desc: "Eksplorasi Map wilayah Nodkrai (Full Chest/Seelie).", price: "15K" },
        { name: "Open Teleport", desc: "Membuka semua titik Teleport di Map.", price: "Rp500" }
    ],
    // -------------------------------------------------------------
    // 3. DAILY COMMISION HARIAN - Ikon XIAO
    // -------------------------------------------------------------
    daily: [
        { name: "Rawat Akun (1 Bulan)", desc: "Perawatan akun penuh selama 1 bulan.", price: "20K" },
        { name: "Rawat Akun (1 Minggu)", desc: "Perawatan akun penuh selama 1 minggu.", price: "10K" },
        { name: "Rawat Akun (1 Hari)", desc: "Perawatan akun penuh selama 1 hari.", price: "2K" }
    ],
    // -------------------------------------------------------------
    // 4. JOKI QUEST - Ikon HU TAO (Quest Luna Ditambahkan di Sini)
    // -------------------------------------------------------------
    jokiquest: [
        { name: "Archon Quest", desc: "Penyelesaian Archon Quest.", price: "10K" },
        { name: "World Quest", desc: "Penyelesaian World Quest.", price: "8K" },
        { name: "Event Besar", desc: "Pengerjaan Event Besar / Misi Utama.", price: "25K" },
        { name: "Event Kecil", desc: "Pengerjaan Event Kecil / Misi Harian.", price: "10K" },
        // LAYANAN BARU: QUEST LUNA
        { name: "Quest Luna", desc: "Pengerjaan Quest Luna .", price: "20K" }, 
    ],
    // -------------------------------------------------------------
    // 5. FARMING MATERIAL - Ikon AETHER
    // -------------------------------------------------------------
    farming: [
        { name: "Material Ascending (50pcs)", desc: "Farming material ascending hingga 50 buah.", price: "2K" },
        { name: "Bebatuan (50pcs)", desc: "Farming Bebatuan (ore) hingga 50 buah.", price: "2K" },
        { name: "Weapon Mancing / Refine", desc: "Farming untuk senjata pancing atau refine.", price: "2K / refine" }
    ],
};

const form = document.getElementById('joki-form');
const inputWaDiv = document.getElementById('input-wa');
const inputDiscordDiv = document.getElementById('input-discord');
const inputWa = document.getElementById('whatsapp');
const inputDiscord = document.getElementById('discord');
const radioButtons = document.querySelectorAll('input[name="metode_kontak"]');

const serviceItems = document.querySelectorAll('.service-item'); 
const allHargaKontainer = document.querySelectorAll('.harga-layanan-detail');


// ==========================================================
// 1. FUNGSI UNTUK MENAMPILKAN/MENYEMBUNYIKAN INPUT KONTAK
// ==========================================================
radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        inputWaDiv.style.display = 'none';
        inputDiscordDiv.style.display = 'none';
        
        inputWa.value = '';
        inputDiscord.value = '';
        inputWa.removeAttribute('required');
        inputDiscord.removeAttribute('required');

        if (this.value === 'whatsapp') {
            inputWaDiv.style.display = 'block';
            inputWa.setAttribute('required', 'required');
        } else if (this.value === 'discord') {
            inputDiscordDiv.style.display = 'block';
            inputDiscord.setAttribute('required', 'required');
        }
    });
});

// ==========================================================
// 2. FUNGSI UNTUK MENAMPILKAN HARGA SAAT LAYANAN DIKLIK
// ==========================================================
serviceItems.forEach(item => {
    item.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-service-id');
        const prices = servicePrices[serviceId];
        const targetHargaKontainer = document.getElementById(`harga-${serviceId}`);
        const targetHargaBody = targetHargaKontainer ? targetHargaKontainer.querySelector('.harga-body-detail') : null;
        
        // 1. Toggle Tampilan: Sembunyikan semua kecuali yang diklik
        allHargaKontainer.forEach(kontainer => {
            if (kontainer.id === `harga-${serviceId}`) {
                // Toggle display: Jika sudah tampil, sembunyikan; jika tersembunyi, tampilkan
                kontainer.style.display = (kontainer.style.display === 'block' ? 'none' : 'block');
            } else {
                // Sembunyikan yang lain
                kontainer.style.display = 'none';
            }
        });

        // 2. Isi data harga ke tabel yang diklik
        if (prices && targetHargaBody) {
            targetHargaBody.innerHTML = ''; // Kosongkan tabel body lama
            prices.forEach(p => {
                const row = targetHargaBody.insertRow();
                row.insertCell().textContent = p.name;
                row.insertCell().textContent = p.desc;
                row.insertCell().textContent = p.price;
            });
        }
        
        // 3. Highlight Item yang Diklik (opsional)
        serviceItems.forEach(i => i.classList.remove('highlighted'));
        // Hanya tambahkan highlight jika tabel harga ditampilkan
        if (targetHargaKontainer && targetHargaKontainer.style.display === 'block') {
            this.classList.add('highlighted');
        }
    });
});


// ==========================================================
// 3. FUNGSI UNTUK MENGIRIM DATA KE SERVER
// ==========================================================
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nama = document.getElementById('nama').value;
    const whatsapp = inputWaDiv.style.display === 'block' ? inputWa.value : '';
    const discord = inputDiscordDiv.style.display === 'block' ? inputDiscord.value : '';
    
    const server = document.getElementById('server').value; 
    const layanan = document.getElementById('layanan-jasa').value;
    const catatan = document.getElementById('catatan').value;

    const orderData = {
        nama: nama,
        whatsapp: whatsapp, 
        discord: discord,   
        server: server,
        layanan: layanan,
        catatan: catatan
    };

    fetch('http://localhost:3000/api/orders', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => { throw new Error(error.error || 'Terjadi kesalahan saat mengirim pesanan.'); });
        }
        return response.json(); 
    })
    .then(data => {
        alert(`SUKSES! Pesanan ID: ${data.order.id} berhasil dikirim ke server!`);
        form.reset(); 
        
        inputWaDiv.style.display = 'none';
        inputDiscordDiv.style.display = 'none';
        serviceItems.forEach(i => i.classList.remove('highlighted'));
        allHargaKontainer.forEach(kontainer => kontainer.style.display = 'none');
    })
    .catch(error => {
        alert(`Gagal mengirim pesanan: ${error.message}`);
        console.error('Error:', error);
    });
});