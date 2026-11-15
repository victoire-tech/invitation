
/* =================================
   1. NAMA TAMU OTOMATIS
================================= */

const urlParams = new URLSearchParams(
  window.location.search
);

const guest = urlParams.get("to");

const guestName = document.getElementById("guestName");

if (guest && guestName) {

  guestName.textContent = guest
    .replace(/\+/g, " ")
    .trim();

}


/* =================================
   2. BUKA UNDANGAN
================================= */

const openButton = document.getElementById("openButton");

const cover = document.getElementById("cover");

const mainInvitation = document.getElementById("mainInvitation");

const music = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicToggle");


openButton.addEventListener("click", function () {

  // Animasi menutup cover
  cover.classList.add("closed");

  // Tampilkan halaman utama
  setTimeout(function () {

    cover.style.display = "none";

    mainInvitation.classList.add("active");

    musicButton.classList.add("visible");

    // Scroll ke bagian pembuka
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Putar musik setelah interaksi pengguna
    music.play()
      .then(function () {
        musicButton.classList.add("playing");
      })
      .catch(function () {
        console.log("Musik belum dapat diputar.");
      });

  }, 1200);

});


/* =================================
   3. MUSIK
================================= */

musicButton.addEventListener("click", function () {

  if (music.paused) {

    music.play()
      .then(function () {
        musicButton.classList.add("playing");
      })
      .catch(function () {
        showToast("Musik tidak dapat diputar.");
      });

  } else {

    music.pause();

    musicButton.classList.remove("playing");

  }

});


/* =================================
   4. COUNTDOWN
================================= */

// Waktu lokal Indonesia WIB
const weddingDate = new Date(
  "2027-12-28T08:00:00+07:00"
).getTime();


function updateCountdown() {

  const now = Date.now();

  const distance = weddingDate - now;

  const ids = [
    "days",
    "hours",
    "minutes",
    "seconds"
  ];

  if (distance <= 0) {

    ids.forEach(function (id) {
      document.getElementById(id).textContent = "00";
    });

    return;

  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =================================
   5. ANIMASI SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

  function (entries, observer) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }

);


revealElements.forEach(function (element) {

  observer.observe(element);

});


/* =================================
   6. TOAST NOTIFICATION
================================= */

const toast = document.getElementById("toast");

let toastTimeout;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(function () {

    toast.classList.remove("show");

  }, 2500);

}


/* =================================
   7. COPY NOMOR REKENING
================================= */

const copyButton = document.getElementById("copyAccount");

const accountNumber = document.getElementById("accountNumber");


copyButton.addEventListener("click", async function () {

  const number = accountNumber.textContent.trim();

  if (
    !number ||
    number === "ISI_NOMOR_REKENING"
  ) {

    showToast("Nomor rekening belum diisi.");

    return;

  }

  try {

    await navigator.clipboard.writeText(number);

    showToast("Nomor rekening berhasil disalin!");

  } catch (error) {

    // Fallback jika clipboard tidak tersedia
    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = number;

    document.body.appendChild(temporaryInput);

    temporaryInput.select();

    try {

      document.execCommand("copy");

      showToast("Nomor rekening berhasil disalin!");

    } catch (copyError) {

      showToast("Silakan salin nomor rekening manual.");

    }

    temporaryInput.remove();

  }

});


/* =================================
   8. RSVP DEMO
================================= */

const rsvpForm = document.getElementById("rsvpForm");

const rsvpStatus = document.getElementById("rsvpStatus");


rsvpForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = document.getElementById("rsvpName").value.trim();

  const attendance = document.getElementById("attendance").value;

  const message = document.getElementById("message").value.trim();


  if (!name || !attendance) {

    showToast("Mohon lengkapi data RSVP.");

    return;

  }


  const response = {

    name: name,

    attendance: attendance,

    message: message,

    date: new Date().toISOString()

  };


  // SIMPAN DEMO DI BROWSER
  const savedResponses = JSON.parse(
    localStorage.getItem("weddingRSVP") || "[]"
  );

  savedResponses.push(response);

  localStorage.setItem(
    "weddingRSVP",
    JSON.stringify(savedResponses)
  );


  rsvpStatus.textContent =
    "Terima kasih, " + name +
    ". Konfirmasi berhasil dicatat di browser ini.";


  showToast("Terima kasih atas konfirmasinya!");

  rsvpForm.reset();

});
