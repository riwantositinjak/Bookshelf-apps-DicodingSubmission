const bukuSudahDibaca = "completeBookshelfList";
const bukuBelumDibaca = "incompleteBookshelfList";
const itemBooks = "itemBook";

const formBook = (judulBuku, penulisBuku, tahunTerbit, selesaiDibaca) => {
  const subContainer = document.createElement("div");
  subContainer.classList.add("book-subContainer");

  const judulBukuTag = document.createElement("h2");
  judulBukuTag.classList.add("book-judulBuku");
  judulBukuTag.innerText = judulBuku;

  const penulisBukuTag = document.createElement("p");
  penulisBukuTag.classList.add("book-penulis");
  penulisBukuTag.innerText = penulisBuku;

  const tahunTerbitTag = document.createElement("p");
  tahunTerbitTag.classList.add("book-tahun");
  tahunTerbitTag.innerText = tahunTerbit;

  subContainer.append(judulBukuTag, penulisBukuTag, tahunTerbitTag);

  const containerButton = document.createElement("div");
  containerButton.classList.add("book-buttonContainer");

  if (selesaiDibaca) {
    containerButton.append(showTombolUlang(), showTombolHapus());
  } else {
    containerButton.append(showTombolCek(), showTombolHapus());
  }

  const containerBook = document.createElement("div");
  containerBook.classList.add("book");
  containerBook.append(subContainer, containerButton);

  return containerBook;
};

const showTombolUlang = () => {
  return makeButton("tombolUlang", (e) => {
    ulangMasukkanBuku(e.target.parentElement.parentElement);
  });
};

const showTombolHapus = () => {
  return makeButton("tombolHapus", (e) => {
    hapusBuku(e.target.parentElement.parentElement);
  });
};

const showTombolCek = () => {
  return makeButton("tombolCek", (e) => {
    tambahKeBukuSudahDibaca(e.target.parentElement.parentElement);
  });
};

const makeButton = (typeButton, eventListener) => {
  const tombol = document.createElement("button");
  tombol.classList.add(typeButton);
  tombol.addEventListener("click", (e) => {
    eventListener(e);
  });
  return tombol;
};

const formPencarian = document.getElementById("pencarianBuku");
formPencarian.addEventListener("submit", (e) => {
  e.preventDefault();
  pencarianBuku();
});

const tombolReset = document.querySelector("#resetPencarian");
tombolReset.addEventListener("click", (e) => {
  document.getElementById("cariJudulBuku").value = "";
  pencarianBuku();
});

const masukkanBuku = () => {
  const incompleteBookshelfList = document.getElementById(bukuBelumDibaca);
  const judul = document.getElementById("inputJudulBuku").value;
  const penulis = `Penulis : ${document.getElementById("inputPenulis").value}`;
  const tahun = `Tahun : ${document.getElementById("inputTahunBuku").value}`;

  const masukkanBukuTag = formBook(judul, penulis, tahun, false);
  const objectBuku = listObjectBuku(judul, penulis, tahun, false);

  masukkanBukuTag[itemBooks] = objectBuku.id;
  buku.push(objectBuku);
  incompleteBookshelfList.append(masukkanBukuTag);
  resetInputForm();
  storageUpdateData();
};

const resetInputForm = () => {
  document.getElementById("inputJudulBuku").value = "";
  document.getElementById("inputPenulis").value = "";
  document.getElementById("inputTahunBuku").value = "";
};

const tambahKeBukuSudahDibaca = (tagDOM) => {
  const daftarBukuTerbaca = document.getElementById(bukuSudahDibaca);
  const judulBuku = tagDOM.querySelector(".book-subContainer h2").innerText;
  const penulisBuku = tagDOM.querySelector(
    ".book-subContainer .book-penulis"
  ).innerText;
  const tahunTerbit = tagDOM.querySelector(
    ".book-subContainer .book-tahun"
  ).innerText;

  const bukuBaru = formBook(judulBuku, penulisBuku, tahunTerbit, true);

  const book = cariBuku(tagDOM[itemBooks]);
  book.selesaiDibaca = true;
  bukuBaru[itemBooks] = book.id;

  daftarBukuTerbaca.append(bukuBaru);
  tagDOM.remove();

  storageUpdateData();
};

const hapusBuku = (tagDOM) => {
  const posisiBuku = cariIndexBuku(tagDOM[itemBooks]);
  buku.splice(posisiBuku, 1);

  tagDOM.remove();
  storageUpdateData();
};

const ulangMasukkanBuku = (tagDOM) => {
  const daftarBukuBelumTerbaca = document.getElementById(bukuBelumDibaca);
  const judulBuku = tagDOM.querySelector(".book-subContainer h2").innerText;
  const penulisBuku = tagDOM.querySelector(
    ".book-subContainer .book-penulis"
  ).innerText;
  const tahunTerbit = tagDOM.querySelector(
    ".book-subContainer .book-tahun"
  ).innerText;

  const bukuBaru = formBook(judulBuku, penulisBuku, tahunTerbit, false);
  const book = cariBuku(tagDOM[itemBooks]);
  book.selesaiDibaca = false;
  bukuBaru[itemBooks] = book.id;

  daftarBukuBelumTerbaca.append(bukuBaru);
  tagDOM.remove();

  storageUpdateData();
};

const perbaruiDataBuku = () => {
  const daftarBukuBelumTerbaca = document.getElementById(bukuBelumDibaca);
  const daftarBukuTerbaca = document.getElementById(bukuSudahDibaca);

  for (book of buku) {
    const bukuBaru = formBook(
      book.judulBuku,
      book.penulisBuku,
      book.tahunTerbit,
      book.selesaiDibaca
    );
    bukuBaru[itemBooks] = book.id;

    if (book.selesaiDibaca) {
      daftarBukuTerbaca.append(bukuBaru);
    } else {
      daftarBukuBelumTerbaca.append(bukuBaru);
    }
  }
};

const pencarianBuku = () => {
  const inputPencarian = document
    .getElementById("cariJudulBuku")
    .value.toLowerCase();
  const itemContainer = document.getElementsByClassName("book");

  for (let i = 0; i < itemContainer.length; i++) {
    const containerItem = itemContainer[i].querySelector(".book-subContainer");
    if (containerItem.textContent.toLowerCase().includes(inputPencarian)) {
      itemContainer[i].classList.remove("sembunyi");
    } else {
      itemContainer[i].classList.add("sembunyi");
    }
  }
};
