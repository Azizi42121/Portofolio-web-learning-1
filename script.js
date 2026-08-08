document.addEventListener("DOMContentLoaded", function () {
  const btn_buka = document.getElementById("btnBuka");
  const overlay = document.getElementById("overlay");
  const darkButton = document.querySelector('.switch input[type="checkbox"]');
  const noteInput = document.getElementById("noteInput");
  const nameInput = document.getElementById("nameInput"); // Menambahkan penangkap input nama
  const charCount = document.getElementById("charCount");
  const btnSimpan = document.getElementById("saveNote");
  const noteList = document.querySelector(".noteList"); // Menyesuaikan selector class HTML

  // Modal Profile
  if (btn_buka && overlay) {
    btn_buka.addEventListener("click", function () {
      overlay.style.display = "flex";
    });

    window.addEventListener("click", function (event) {
      if (event.target === overlay) {
        overlay.style.display = "none";
      }
    });
  }

  // Dark Mode Toggle
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkButton) darkButton.checked = true;
  }

  if (darkButton) {
    darkButton.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Real-time Character Counter
  if (noteInput && charCount) {
    noteInput.addEventListener("input", function () {
      charCount.textContent = noteInput.value.length;
    });
  }

  // Ambil data catatan dari localStorage saat halaman dimuat
  let notes = JSON.parse(localStorage.getItem("myNotes")) || [];
  renderNotes();

  // Simpan Catatan Baru
  if (btnSimpan) {
    btnSimpan.addEventListener("click", function () {
      const text = noteInput.value.trim();
      const name = nameInput ? nameInput.value.trim() : "Anonim";

      if (text === "") {
        alert("Catatan tidak boleh kosong!");
        return;
      }

      // Buat objek catatan baru yang menyertakan Nama & Teks Catatan
      const newNote = {
        nama: name !== "" ? name : "Anonim",
        pesan: text
      };

      notes.push(newNote);
      localStorage.setItem("myNotes", JSON.stringify(notes));

      // Reset input teks dan angka counter
      noteInput.value = "";
      if (nameInput) nameInput.value = "";
      charCount.textContent = "0";

      renderNotes();
    });
  }

  // Menampilkan seluruh catatan ke dalam daftar
  function renderNotes() {
    if (!noteList) return;
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
      const li = document.createElement("li");
      
      // Menyesuaikan struktur jika catatan dalam bentuk Object atau String
      const namaPengirim = note.nama ? note.nama : "Anonim";
      const isiPesan = note.pesan ? note.pesan : note;

      li.innerHTML = `
        <div>
          <strong>${namaPengirim}:</strong> <span>${isiPesan}</span>
        </div>
        <button class="btn-delete" data-index="${index}">Hapus</button>
      `;
      noteList.appendChild(li);
    });
  }

  // Event Delegation untuk Menghapus Catatan (Aman dari Masalah Scope)
  if (noteList) {
    noteList.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn-delete")) {
        const index = event.target.getAttribute("data-index");
        notes.splice(index, 1);
        localStorage.setItem("myNotes", JSON.stringify(notes));
        renderNotes();
      }
    });
  }
});