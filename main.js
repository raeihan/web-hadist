const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books";

function getListHadist() {
    axios.get(url).then(function(res) {
    var hadist = res.data.data.map((h) => {
        return `<div class= "card-hadist" style="color: #fff">
        <img src="./images/${h.id}.jpg" style="margin-bottom: 15px; "class="img-hadist"/>
        <h2>${h.name}</h2>
        <p>Jumlah Hadist : <b>${h.available}</b></p>
        <a class="btn btn-outline-success w-100" href="/hadist/${h.id}.html">Read Now</a>
        </div>`;
    }).join("");
    output.innerHTML = hadist;
});
}
const outputHadist = document.getElementById('output-hadist')

        var currentURL = window.location.href;
        var fileName = currentURL.split('/').pop();
        var fileNameWithoutExtension = fileName.replace(/\.html$/,'');
        
function getHadistbyId() {
    axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`).then
    (function (res) {
        var gethadist = res.data.data.hadiths.map((hadist) => {
            return`
            <h2 style="color: #fff" >Hadist No : ${hadist.number}</h2>
            <p class="text-end" style="color: #fff"> ${hadist.arab}</p>
            <p style="color: #fff"> ${hadist.id}</p>`;
        })
        .join("");
        outputHadist.innerHTML = gethadist;
    });
}
function btnSearch() {
    const search = document.getElementById("search-hadist").value
    const judulPencarian = document.getElementById("judul-pencarian")
    const hasilPencarian = document.getElementById("output-search")

    axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`).then
    (function (res) {
        var getSearch = res.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase());
        });
        judulPencarian.innerHTML = `<h2>${search}</h2>`
        hasilPencarian.innerHTML = getSearch.map((hasil) => {
            return`<h2 style="color: #fff" >Hadist No : ${hasil.number}</h2>
            <p class="text-end" style="color: #fff"> ${hasil.arab}</p>
            <p style="color: #fff"> ${hasil.id}</p>`;
        }).join("");
    if (search.length > 0) {
        judulPencarian.innerHTML = `<h2 class="text-light" style="padding-bottom: 30px;" >Pencarian Hadist : <b>${search}</b></h2>`;
        hasilPencarian.innerHTML = getSearch.map (hasil)  
    } else if (search == ""){
        judulPencarian.innerHTML = "";
        hasilPencarian.innerHTML = `<h2 class="text-light" style="padding-bottom: 30px;">Data Tidak Tersedia</h2>`
    }
    });
}
