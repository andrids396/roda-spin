// mengambil elemen
const container = document.querySelector(".container");

// === LAYOUT ===

// layout kiri
const layoutKiri = document.createElement("div");
layoutKiri.classList.add("layout-kiri");

// layout tengah
const layoutTengah = document.createElement("div");
layoutTengah.classList.add("layout-tengah");

// layout kiri
const layoutKanan = document.createElement("div");
layoutKanan.classList.add("layout-kanan");

// append
container.appendChild(layoutKiri);
container.appendChild(layoutTengah);
container.appendChild(layoutKanan);

// variabel global
let kumpulanHadiah = [
    {namaHadiah: "+ Rp5.000", hadiah: 5000, sudut: 0, sudutPutar: 270},
    {namaHadiah: "- Rp5.000", hadiah: - 5000, sudut: 45, sudutPutar: 225},
    {namaHadiah: "+ Rp10.000", hadiah: 10000, sudut: 90, sudutPutar: 180},
    {namaHadiah: "- Rp10.000", hadiah: - 10000, sudut: 135, sudutPutar: 135},
    {namaHadiah: "+ Rp20.000", hadiah: 20000, sudut: 180, sudutPutar: 90},
    {namaHadiah: "- Rp20.000", hadiah: - 20000, sudut: 225, sudutPutar: 45},
    {namaHadiah: "+ Rp40.000", hadiah: 40000, sudut: 270, sudutPutar: 0},
    {namaHadiah: "- Rp40.000", hadiah: - 40000, sudut: 315, sudutPutar: 315}
];

let sudutSekarang = 0;
let saldo = 0;
let energi = 0;

// === ISI LAYOUT KIRI ===
const mode = [
    {mode: "easy", nama: "Saya pasrah"}, 
    {mode: "medium", nama: "Saya ingin kaya"}, 
    {mode: "hard", nama: "Saya tidak ingin kaya"}
    // {mode: "god", nama: "I'm Zeus"}
];
function membuatModePermainan (mode){

    // wadah mode permainan
    const wadahModePermainan = document.createElement("div");
    wadahModePermainan.classList.add("wadah-mode-permainan");

    const kepribadian = document.createElement("h3");
    kepribadian.classList.add("kepribadian");
    kepribadian.innerHTML = "Jenis kepribadian";
    
    wadahModePermainan.appendChild(kepribadian);
    
    mode.forEach(function(modePilihan){
        // membuat bungkus label
        const label = document.createElement("label");
        label.classList.add("label-mode");
    
        // membuat input radio
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "modePermainan";
        radio.value = modePilihan.mode;

        // membuat radio pilihan defoult
        if (modePilihan.mode === "easy") {
            radio.checked = true;
        }
    
        // append
        label.appendChild(radio);
        label.append(" " + modePilihan.nama);
    
        wadahModePermainan.appendChild(label);
    });
    layoutKiri.appendChild(wadahModePermainan);

    // return
    return wadahModePermainan;
};

const modePermainan = membuatModePermainan(mode);

// listener
modePermainan.addEventListener("change", function (event) {
    // mengecek apakah yang diklik input dengan nama modePermainan
    if (event.target.name === "modePermainan") {
        // ambil nilainya
        const modeTerpilih = event.target.value;
        console.log("mode terpilih: " + modeTerpilih);

        if (modeTerpilih === "easy") {
            kumpulanHadiah = [
            {namaHadiah: "+ Rp5.000", hadiah: 5000, sudut: 0, sudutPutar: 270},
            {namaHadiah: "- Rp5.000", hadiah: - 5000, sudut: 45, sudutPutar: 225},
            {namaHadiah: "+ Rp10.000", hadiah: 10000, sudut: 90, sudutPutar: 180},
            {namaHadiah: "- Rp10.000", hadiah: - 10000, sudut: 135, sudutPutar: 135},
            {namaHadiah: "+ Rp20.000", hadiah: 20000, sudut: 180, sudutPutar: 90},
            {namaHadiah: "- Rp20.000", hadiah: - 20000, sudut: 225, sudutPutar: 45},
            {namaHadiah: "+ Rp40.000", hadiah: 40000, sudut: 270, sudutPutar: 0},
            {namaHadiah: "- Rp40.000", hadiah: - 40000, sudut: 315, sudutPutar: 315}
        ];
        }
        else if (modeTerpilih === "medium") {
            kumpulanHadiah = [
            {namaHadiah: "+ Rp5.000", hadiah: 5000, sudut: 0, sudutPutar: 270},
            {namaHadiah: "+ Rp10.000", hadiah: 10000, sudut: 90, sudutPutar: 180},
            {namaHadiah: "+ Rp20.000", hadiah: 20000, sudut: 180, sudutPutar: 90},
            {namaHadiah: "+ Rp40.000", hadiah: 40000, sudut: 270, sudutPutar: 0},
        ];
        }
        else if (modeTerpilih === "hard") {
            kumpulanHadiah = [
            {namaHadiah: "- Rp5.000", hadiah: - 5000, sudut: 45, sudutPutar: 225},
            {namaHadiah: "- Rp10.000", hadiah: - 10000, sudut: 135, sudutPutar: 135},
            {namaHadiah: "- Rp20.000", hadiah: - 20000, sudut: 225, sudutPutar: 45},
            {namaHadiah: "- Rp40.000", hadiah: - 40000, sudut: 315, sudutPutar: 315}
        ];
        }
    }
});


// === ISI LAYOUT TENGAH ===

function mencariHadiah (kumpulanHadiah){
    // mencari indeks secara acak
    const banyakHadiah = kumpulanHadiah.length;
    const indeksTerpilih = Math.floor(Math.random() * banyakHadiah);

    // hadiah terpilih
    const hadiahTerpilih = kumpulanHadiah[indeksTerpilih];

    // return
    return hadiahTerpilih;    
};

function memutarRoda (roda, hadiahTerpilih){
    const kumpulanSudutMikro = [-18, -9, 0, 9, 18];
    const sudutMikro = kumpulanSudutMikro[Math.floor(Math.random() * kumpulanSudutMikro.length)];

    const sudut = hadiahTerpilih.sudutPutar + sudutMikro;

    const sudutEkstra = 1440;

    sudutSekarang = sudut + sudutEkstra + sudutSekarang;
    roda.style.transform = `rotate(${sudutSekarang}deg)`;
    sudutSekarang -= sudut;
};

function membuatElemenSpin (kumpulanHadiah) {
    // === membuat element ===

    // container spin
    const containerSpin = document.createElement("div");
    containerSpin.classList.add("container-spin");

    // wadah spin
    const wadahSpin = document.createElement("div");
    wadahSpin.classList.add("wadah-spin");

    // panah 
    const panah = document.createElement("div");
    panah.classList.add("panah");

    // lingkaran tengah
    const lingkaranTengah = document.createElement("div");
    lingkaranTengah.classList.add("lingkaran-tengah");

    // roda
    const roda = document.createElement("div");
    roda.classList.add("roda");

    // hadiah
    kumpulanHadiah.forEach(function(elemen){
        const kumpulanHadiah = document.createElement("div");
        kumpulanHadiah.classList.add("teks-hadiah");
        kumpulanHadiah.innerHTML = elemen.namaHadiah;
        kumpulanHadiah.style.transform = `rotate(${elemen.sudut}deg)`;
        roda.appendChild(kumpulanHadiah);
    });    

    // == append ==    
    wadahSpin.appendChild(panah);
    wadahSpin.appendChild(roda);
    wadahSpin.appendChild(lingkaranTengah);

    containerSpin.appendChild(wadahSpin);

    layoutTengah.appendChild(containerSpin);

    return {roda: roda};
};

function membuatFitur (){
    // --- membuat elemen ---

    // container fitur
    const containerFitur = document.createElement("div");
    containerFitur.classList.add("container-fitur");

    // wadah fitur
    const wadahFitur = document.createElement("div");
    wadahFitur.classList.add("wadah-fitur");

    // nominal hadiah
    const nominalHadiah = document.createElement("div");
    nominalHadiah.classList.add("nominal-hadiah");
    nominalHadiah.innerHTML = "Menunggu putaran...";    

    // nominal saldo
    const nominalSaldo = document.createElement("div");
    nominalSaldo.classList.add("nominal-saldo");
    const teksSaldo = Math.abs(saldo).toLocaleString("id-ID");
    nominalSaldo.innerHTML = saldo < 0 ? `- Rp${teksSaldo}`: `Rp${teksSaldo}`;

    // tambah saldo
    const tombolTambahSaldo = document.createElement("button");
    tombolTambahSaldo.classList.add("btn-tambah-saldo");
    tombolTambahSaldo.innerHTML = "+Rp";

    // wadah energi, tambah energi, dan tambah saldo
    const wadahEnergiTambahRp = document.createElement("div");
    wadahEnergiTambahRp.classList.add("wadah-energi-tambah-rp");

    const teksEnergi = document.createElement("div");
    teksEnergi.classList.add("energi");
    teksEnergi.innerHTML = "E" + energi;

    const tombolTambahEnergi = document.createElement("button");
    tombolTambahEnergi.classList.add("btn-tambah-energi");
    tombolTambahEnergi.innerHTML = "+E";

    // tombol spin
    const tombolSpin = document.createElement("button");
    tombolSpin.classList.add("btn-spin");
    tombolSpin.innerHTML = "Spin (E1)";

    // --- append ---
    // energi tambah E dan tambah Rp
    wadahEnergiTambahRp.appendChild(teksEnergi);
    wadahEnergiTambahRp.appendChild(tombolTambahEnergi);
    wadahEnergiTambahRp.appendChild(tombolTambahSaldo);

    wadahFitur.appendChild(nominalHadiah);
    wadahFitur.appendChild(nominalSaldo);
    wadahFitur.appendChild(wadahEnergiTambahRp);
    wadahFitur.appendChild(tombolSpin);

    containerFitur.appendChild(wadahFitur);

    layoutTengah.appendChild(containerFitur);

    // return
    return {
        wadahFitur: wadahFitur,
        tombolSpin: tombolSpin, 
        nominalHadiah: nominalHadiah,
        nominalSaldo: nominalSaldo,
        tombolTambahSaldo: tombolTambahSaldo,
        teksEnergi: teksEnergi,
        tombolTambahEnergi: tombolTambahEnergi,
        wadahEnergiTambahRp: wadahEnergiTambahRp
    };
};

const spin = membuatElemenSpin(kumpulanHadiah);

const fitur = membuatFitur();

// listener tombol spin
fitur.tombolSpin.addEventListener("click",function () {
    // disable tombol spin
    this.disabled = true;

    // periksa energi
    if (energi <= 0){
        const keteranga = document.createElement("p");
        keteranga.classList.add("keterangan-spin");
        keteranga.innerHTML = "E 0, segera isi";
        // keteranga.style.color = "red";
        fitur.wadahFitur.appendChild(keteranga);

        setTimeout(() => {
            keteranga.remove();
            this.disabled = false;
        }, 1500);

        return;
    }

    // update enrgi
    energi -= 1;
    fitur.teksEnergi.innerHTML = "E" + energi;

    // informasi hadiah saat menunggu putaran berhenti
    fitur.nominalHadiah.innerHTML = "Menunggu putaran...";

    // mencari hadiah terpilih
    hadiahTerpilih = mencariHadiah(kumpulanHadiah);

    // memutar roda
    memutarRoda(spin.roda, hadiahTerpilih);
});

// listener spin berhenti
spin.roda.addEventListener("transitionend", function(){
    setTimeout(() => {
        // display hadiah
        fitur.nominalHadiah.innerHTML = hadiahTerpilih.namaHadiah;
        fitur.nominalHadiah.style.color = hadiahTerpilih.hadiah < 0 ? "#f44336": "#419744";
        
        // akumulasi saldo dengan hadiah
        saldo += hadiahTerpilih.hadiah;
        
        // display saldo
        setTimeout(function (){
            // update display saldo
            const teksEnergi = Math.abs(saldo).toLocaleString("id-ID");
            fitur.nominalSaldo.innerHTML = saldo < 0 ? `- Rp${teksEnergi}`: `Rp${teksEnergi}`;
    
            // undisble tombol spin
            fitur.tombolSpin.disabled = false;
        }, 1000);

        // reset display hadiah
        setTimeout(() => {
            // reset hadiah
            fitur.nominalHadiah.innerHTML = "Menunggu putaran...";
            fitur.nominalHadiah.style.color = "#777";
        }, 1500);
    }, 500);
    
});

// Tambah saldo
fitur.tombolTambahSaldo.addEventListener("click", function () {
    this.disabled = true;

    // tambah saldo
    const opsiTambahSaldo = [100000, 300000, 500000];

    const wadahTambahSaldo = document.createElement("div");
    wadahTambahSaldo.classList.add("wadah-tambah-saldo");

    opsiTambahSaldo.forEach((nominalTambah) => {
        const tambahSaldo = document.createElement("button");
        tambahSaldo.classList.add("tambah-saldo");
        tambahSaldo.innerHTML = `+Rp${nominalTambah.toLocaleString("id-ID")}`;

        wadahTambahSaldo.appendChild(tambahSaldo);

        // listener
        tambahSaldo.addEventListener("click", () => {
            saldo += nominalTambah;
            wadahTambahSaldo.remove();

            this.disabled = false;
            
            // update tampilan saldo
            const teksSaldo = Math.abs(saldo).toLocaleString("id-ID");
            fitur.nominalSaldo.innerHTML = saldo < 0 ? `- Rp${teksSaldo}`: `Rp${teksSaldo}`;
        });
    });

    // close tambah saldo
    const closeTambahSaldo = document.createElement("button");
    closeTambahSaldo.classList.add("close-tambah-saldo");
    closeTambahSaldo.innerHTML = "X";

    // append
    wadahTambahSaldo.appendChild(closeTambahSaldo);

    fitur.wadahEnergiTambahRp.appendChild(wadahTambahSaldo);

    closeTambahSaldo.addEventListener("click", () => {
        wadahTambahSaldo.remove();
        this.disabled = false;
    });
});

// Tambah energi
fitur.tombolTambahEnergi.addEventListener("click", function(){
    this.disabled = true;

    // cek saldo dulu
    if (saldo <= 0){
        const keterangan = document.createElement("p");
        keterangan.classList.add("keteranga-tambah-energi");
        keterangan.innerHTML = "Saldo tidak cukup";
        keterangan.style.color = "red";
        fitur.wadahEnergiTambahRp.appendChild(keterangan);

        setTimeout(function(){
            keterangan.remove();
            fitur.tombolTambahEnergi.disabled = false;
        }, 1000);

        return;
    }

    const opsiTambahEnergi = [
        {energi: 10, harga: 10000},
        {energi: 20, harga: 20000},
        {energi: 50, harga: 45000}
    ];

    // wadah tambah energi
    const wadahTambahEnergi = document.createElement("div");
    wadahTambahEnergi.classList.add("wadah-tambah-energi");

    opsiTambahEnergi.forEach(function(itemEnergi) {
        // wadah peritem
        const wadahItemEnergi = document.createElement("div");
        wadahItemEnergi.classList.add("wadah-item-energi");

        // energi
        const banyakEnergi = document.createElement("div");
        banyakEnergi.classList.add("banyak-energi");
        banyakEnergi.innerHTML = "E" + itemEnergi.energi;

        // harga
        const hargaEnergi = document.createElement("button");
        hargaEnergi.classList.add("harga-energi");
        hargaEnergi.innerHTML = "Rp" + itemEnergi.harga.toLocaleString("id-ID");

        // append
        wadahItemEnergi.appendChild(banyakEnergi);
        wadahItemEnergi.appendChild(hargaEnergi);

        wadahTambahEnergi.appendChild(wadahItemEnergi);

        // listener
        hargaEnergi.addEventListener("click", function(){
            // cek saldo kurang dari harga energi
            if (saldo < itemEnergi.harga){
                // disabel tombol
                this.disabled = true;

                const keteranga = document.createElement("div");
                keteranga.classList.add("keterangan-harga-energi");
                keteranga.innerHTML = "Saldo kurang";
                wadahTambahEnergi.appendChild(keteranga);

                setTimeout(() => {
                    keteranga.remove();
                    this.disabled = false;
                }, 1000);
                return;
            }

            wadahTambahEnergi.remove();
            fitur.tombolTambahEnergi.disabled = false;

            // saldo
            saldo -= itemEnergi.harga;
            const teksEnergi = Math.abs(saldo).toLocaleString("id-ID");
            fitur.nominalSaldo.innerHTML = saldo < 0 ? `- Rp${teksEnergi}`: `Rp${teksEnergi}`;

            // energi
            energi += itemEnergi.energi;
            fitur.teksEnergi.innerHTML = "E" + energi;
        });
    });

    fitur.wadahEnergiTambahRp.appendChild(wadahTambahEnergi);

    // close
    const closeTambahEnergi = document.createElement("button");
    closeTambahEnergi.classList.add("close-tambah-energi");
    closeTambahEnergi.innerHTML = "X";

    wadahTambahEnergi.appendChild(closeTambahEnergi);

    // listener
    closeTambahEnergi.addEventListener("click", function(){
        wadahTambahEnergi.remove();
        fitur.tombolTambahEnergi.disabled = false;
    });
});