// Mengambil data dari browser
let profile = JSON.parse(localStorage.getItem("profile")) || {};
let matches = JSON.parse(localStorage.getItem("matches")) || [];

// Membuka fitur
function openFeature(feature) {
    document.querySelector(".menu").classList.add("hidden");
    document.querySelector(".welcome").classList.add("hidden");

    document.querySelectorAll(".feature").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(feature).classList.remove("hidden");

    if (feature === "match") {
        displayMatches();
    }

    if (feature === "analysis") {
        showAnalysis();
    }
}

// Kembali ke menu utama
function goHome() {
    document.querySelector(".menu").classList.remove("hidden");
    document.querySelector(".welcome").classList.remove("hidden");

    document.querySelectorAll(".feature").forEach(section => {
        section.classList.add("hidden");
    });
}

// Menyimpan profil
function saveProfile() {
    const name = document.getElementById("playerName").value.trim();
    const level = document.getElementById("playerLevel").value;

    if (!name || !level) {
        alert("Lengkapi nama dan level pemain!");
        return;
    }

    profile = { name, level };

    localStorage.setItem("profile", JSON.stringify(profile));

    document.getElementById("profileResult").textContent =
        "Profil berhasil disimpan: " + name + " (" + level + ")";
}

// Menyimpan pertandingan
function saveMatch() {
    const opponent = document.getElementById("opponent").value.trim();
    const result = document.getElementById("matchResult").value;

    if (!opponent || !result) {
        alert("Lengkapi nama lawan dan hasil pertandingan!");
        return;
    }

    matches.push({ opponent, result });

    localStorage.setItem("matches", JSON.stringify(matches));

    document.getElementById("opponent").value = "";
    document.getElementById("matchResult").value = "";

    displayMatches();
}

// Menampilkan daftar pertandingan
function displayMatches() {
    const list = document.getElementById("matchList");
    list.innerHTML = "";

    matches.forEach((match, index) => {
        const item = document.createElement("li");

        item.textContent =
            (index + 1) + ". " + match.opponent + " - " + match.result;

        list.appendChild(item);
    });
}

// Puzzle sederhana
function checkPuzzle() {
    const answer = document.getElementById("puzzleAnswer")
        .value.trim().toLowerCase();

    const result = document.getElementById("puzzleResult");

    if (answer === "qg7#") {
        result.textContent = "Benar! Jawabanmu tepat.";
    } else {
        result.textContent = "Belum tepat. Coba lagi!";
    }
}

// Analisis hasil pertandingan
function showAnalysis() {
    const wins = matches.filter(m => m.result === "Win").length;
    const draws = matches.filter(m => m.result === "Draw").length;
    const losses = matches.filter(m => m.result === "Loss").length;

    document.getElementById("totalMatches").textContent =
        "Total Matches: " + matches.length;

    document.getElementById("totalWins").textContent =
        "Wins: " + wins;

    document.getElementById("totalDraws").textContent =
        "Draws: " + draws;

    document.getElementById("totalLosses").textContent =
        "Losses: " + losses;
}
