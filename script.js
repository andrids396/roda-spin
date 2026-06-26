// mengambil elemen
const container = document.querySelector(".container");

// variabel global
const kumpulanHadiah = [
    {namaHadiah: "+ Rp 5.000", hadiah: 5000, sudut: 0, sudutPutar: 270},
    {namaHadiah: "- Rp 5.000", hadiah: - 5000, sudut: 45, sudutPutar: 225},
    {namaHadiah: "+ Rp 10.000", hadiah: 10000, sudut: 90, sudutPutar: 180},
    {namaHadiah: "- Rp 10.000", hadiah: - 10000, sudut: 135, sudutPutar: 135},
    {namaHadiah: "+ Rp 20.000", hadiah: 20000, sudut: 180, sudutPutar: 90},
    {namaHadiah: "- Rp 20.000", hadiah: - 20000, sudut: 225, sudutPutar: 45},
    {namaHadiah: "+ Rp 40.000", hadiah: 40000, sudut: 270, sudutPutar: 0},
    {namaHadiah: "- Rp 40.000", hadiah: - 40000, sudut: 315, sudutPutar: 315}
];

let sudutSekarang = 0;
let saldo = 1000000;

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

    container.appendChild(wadahSpin);

    return {roda: roda};
};

function membuatFitur (){
    // --- membuat elemen ---

    // wadah fitur
    const wadahFitur = document.createElement("div");
    wadahFitur.classList.add("wadah-fitur");

    // membuat tombol spin
    const tombolSpin = document.createElement("button");
    tombolSpin.classList.add("btn-spin");
    tombolSpin.innerHTML = "Spim Rp100";

    // display hadiah
    const displayHadiah = document.createElement("div");
    displayHadiah.classList.add("display-hadiah");
    displayHadiah.innerHTML = `Rp${saldo.toLocaleString("id-ID")}`;

    // --- append ---
    wadahFitur.appendChild(displayHadiah);
    wadahFitur.appendChild(tombolSpin);

    container.appendChild(wadahFitur);

    // return
    return {tombolSpin: tombolSpin, displayHadiah: displayHadiah};
};

const spin = membuatElemenSpin(kumpulanHadiah);
// mengambil roda
const roda = spin.roda;

const fitur = membuatFitur();
// mengambil tombol
const tombolSpin = fitur.tombolSpin;
const displayHadiah = fitur.displayHadiah;

// listener tombol spin
tombolSpin.addEventListener("click",function () {
    // disable tombol spin
    this.disabled = true;

    hadiahTerpilih = mencariHadiah(kumpulanHadiah);

    memutarRoda(roda, hadiahTerpilih);
});

// listener spin berhenti
roda.addEventListener("transitionend", function(){
    
    // display hadiah
    displayHadiah.innerHTML = hadiahTerpilih.namaHadiah;
    
    // akumulasi saldo dengan hadiah
    saldo += hadiahTerpilih.hadiah;
    
    // display saldo
    setTimeout(function (){
        displayHadiah.innerHTML = `Rp${saldo.toLocaleString("id-ID")}`;

        // undisble tombol spin
        tombolSpin.disabled = false;
    }, 1000);
});