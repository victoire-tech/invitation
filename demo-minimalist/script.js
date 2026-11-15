
// ===================================
// 1. BUKA UNDANGAN
// ===================================

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

openButton.addEventListener("click", () => {

  cover.style.transition = "opacity 1s ease";
  cover.style.opacity = "0";

  setTimeout(() => {
    cover.style.display = "none";
    mainContent.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    observeElements();

    music.play().then(() => {
      musicBtn.classList.add("playing");
    }).catch(() => {
      console.log("Musik tidak dapat diputar otomatis.");
    });

  }, 1000);

});


// ===================================
// 2. COUNTDOWN PERNIKAHAN
// ===================================

// Format: Tahun, Bulan (0-11), Tanggal, Jam, Menit
const weddingDate = new Date(2027, 11, 28, 8, 0, 0).getTime();

function updateCountdown() {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===================================
// 3. ANIMASI SCROLL REVEAL
// ===================================

let observer;

function observeElements() {

  if (observer) observer.disconnect();

  const elements = document.querySelectorAll(".reveal");

  observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  elements.forEach(element => {
    observer.observe(element);
  });

}


// ===================================
// 4. MUSIK PLAY / PAUSE
// ===================================

musicBtn.addEventListener("click", () => {

  if (music.paused) {

    music.play().then(() => {
      musicBtn.classList.add("playing");
    }).catch(() => {
      console.log("Musik gagal diputar.");
    });

  } else {

    music.pause();
    musicBtn.classList.remove("playing");

  }

});

music.addEventListener("pause", () => {
  musicBtn.classList.remove("playing");
});


// ===================================
// 5. RSVP SEMENTARA
// ===================================

const rsvpForm = document.getElementById("rsvpForm");
const rsvpResult = document.getElementById("rsvpResult");

rsvpForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !attendance) {
    alert("Mohon lengkapi nama dan konfirmasi kehadiran.");
    return;
  }

  const data = {
    name: name,
    attendance: attendance,
    message: message,
    date: new Date().toLocaleString("id-ID")
  };

  // Menyimpan data di browser pengunjung
  let responses = JSON.parse(
    localStorage.getItem("weddingRSVP") || "[]"
  );

  responses.push(data);

  localStorage.setItem(
    "weddingRSVP",
    JSON.stringify(responses)
  );

  rsvpResult.textContent =
    "Terima kasih " + name +
    ", konfirmasi Anda berhasil disimpan di browser ini ♡";

  rsvpForm.reset();

});


// ===================================
// 6. SALIN NOMOR REKENING
// ===================================

const copyButton = document.getElementById("copyAccount");

copyButton.addEventListener("click", async () => {

  const accountNumber =
    document.getElementById("accountNumber").textContent.trim();

  try {

    await navigator.clipboard.writeText(accountNumber);

    copyButton.textContent = "Berhasil Disalin ✓";

    setTimeout(() => {
      copyButton.textContent = "Salin Nomor Rekening";
    }, 2000);

  } catch (error) {

    alert("Gagal menyalin nomor rekening. Silakan salin manual.");

  }

});


// ===================================
// 7. NAMA TAMU DARI URL
// ===================================

// Contoh:
// index.html?to=Keluarga%20Bapak%20Ahmad

const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  document.getElementById("guestName").textContent = guest;
}
