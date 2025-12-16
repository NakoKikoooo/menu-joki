document.getElementById('joki-form').addEventListener('submit', function(event) {
    // Mencegah form dikirim secara default (yang akan me-refresh halaman)
    event.preventDefault();

    // Mengambil data formulir
    const nama = document.getElementById('nama').value;
    const server = document.getElementById('server').value;
    const layanan = document.getElementById('layanan-pilih').value;
    const catatan = document.getElementById('catatan').value;

    // --- BAGIAN INI PERLU BACKEND UNTUK BERFUNGSI NYATA ---
    
    // **Simulasi** pengiriman data
    console.log("Pesanan diterima:");
    console.log(`Nama: ${nama}`);
    console.log(`Server: ${server}`);
    console.log(`Layanan: ${layanan}`);
    console.log(`Catatan: ${catatan}`);

    // Memberikan feedback ke pengguna
    alert(`Terima kasih, ${nama}! Pesanan joki ${layanan} Anda telah kami terima. Kami akan segera menghubungi Anda melalui informasi yang tersedia.`);

    // Mengosongkan formulir setelah pengiriman (opsional)
    this.reset();

    // IDEALNYA: Di sini Anda akan mengirim data ke server/backend 
    // menggunakan fetch() atau XMLHttpRequest.
    /* fetch('/api/submit-joki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, server, layanan, catatan })
    })
    .then(response => response.json())
    .then(data => {
        // Tampilkan pesan sukses dari server
    })
    .catch(error => {
        // Tampilkan pesan error
    });
    */
});