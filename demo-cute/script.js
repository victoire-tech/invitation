
// ==================================
// 1. NAMA TAMU OTOMATIS
// ==================================

const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

const guestName = document.getElementById("guestName");

if (guest && guest.trim()) {
  guestName.textContent = guest.replace(/\+/g, " ").trim();
}


// ==================================
// 2. BUKA UNDANGAN
// ==================================

const cover = document.getElementById("cover");

const mainInvitation = document.getElementById("mainInvitation");

const openButton = document.getElementById("openButton");

const music = document.getElementById("weddingMusic");

const musicToggle = document.getElementById("musicToggle");

openButton.addEventListener("click", async function () {

  cover.classList.add("closed");

  setTimeout(function () {

    cover.style.display = "none";

    mainInvitation.classList.add("active");

    musicToggle.classList.add("visible");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 1200);

  try {

    await music.play();

    musicToggle.classList.add("playing");

  } catch (error) {

    console.log("Musik belum bisa diputar.");

  }

});


// ==================================
// 3. MUSIK
// ==================================

musicToggle.addEventListener("click", async function () {

  if (music.paused) {

    try {

      await music.play();

      musicToggle.classList.add("playing");

    } catch (error) {

      showToast("Musik belum bisa diputar.");

    }

  } else {

    music.pause();

    musicToggle.classList.remove("playing");

  }

});


// ==================================
// 4. COUNTDOWN
// ==================================

const weddingDate = new Date(
  "2027-12-28T08:00:00+07:00"
).getTime();

function updateCountdown() {

  const now = Date.now();

  const distance = weddingDate - now;

  const ids = ["days", "hours", "minutes", "seconds"];

  if (distance <= 0) {

    ids.forEach(id => {
      document.getElementById(id).textContent = "00";
    });

    return;

  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    distance / (1000 * 60 * 60) % 24
  );

  const minutes = Math.floor(
    distance / (1000 * 60) % 60
  );

  const seconds = Math.floor(
    distance / 1000 % 60
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


// ==================================
// 5. ANIMASI SCROLL
// ==================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

  function (entries, observer) {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  }

);

revealElements.forEach(element => {

  revealObserver.observe(element);

});


// ==================================
// 6. NOTIFIKASI
// ==================================

const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


// ==================================
// 7. COPY REKENING
// ==================================

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

    showToast("♡ Nomor rekening berhasil disalin!");

  } catch (error) {

    const input = document.createElement("textarea");

    input.value = number;

    document.body.appendChild(input);

    input.select();

    try {

      document.execCommand("copy");

      showToast("♡ Nomor rekening berhasil disalin!");

    } catch (copyError) {

      showToast("Silakan salin nomor secara manual.");

    }

    input.remove();

  }

});


// ==================================
// 8. RSVP DEMO
// ==================================

const rsvpForm = document.getElementById("rsvpForm");

const rsvpStatus = document.getElementById("rsvpStatus");

rsvpForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = document.getElementById("rsvpName").value.trim();

  const attendance = document.getElementById("attendance").value;

  const message = document.getElementById("message").value.trim();

  if (!name || !attendance) {

    showToast("Mohon lengkapi formulir.");

    return;

  }

  const response = {
    name: name,
    attendance: attendance,
    message: message,
    date: new Date().toISOString()
  };

  const oldData = JSON.parse(
    localStorage.getItem("weddingRSVP") || "[]"
  );

  oldData.push(response);

  localStorage.setItem(
    "weddingRSVP",
    JSON.stringify(oldData)
  );

  rsvpStatus.textContent =
    "Terima kasih " + name + "! ♡ Konfirmasi dicatat di browser ini.";

  showToast("Konfirmasi berhasil dicatat!");

  rsvpForm.reset();

});
