// ---------------- STARFIELD ----------------
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
const numStars = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < numStars; i++) {
    let s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveStars();
}

function moveStars() {
  for (let i = 0; i < numStars; i++) {
    let s = stars[i];
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

setInterval(drawStars, 30);
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ---------------- SCROLL ANIMATIONS ----------------
const elements = document.querySelectorAll(".glass, .card");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    if (position < screenHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// ---------------- WHITEPAPER MODAL ----------------
const modal = document.getElementById("whitepaperModal");
const btn = document.getElementById("whitepaperBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => (modal.style.display = "block");
span.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

// ---------------- LIVE TOKEN PRICE ----------------
async function fetchPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=no-scam-coin&vs_currencies=usd",
    );
    const data = await res.json();
    document.getElementById("tokenPrice").innerText =
      data["no-scam-coin"].usd.toFixed(4);
  } catch (e) {
    console.log("Price fetch error", e);
  }
}
setInterval(fetchPrice, 10000);
fetchPrice();

// ---------------- WALLET CONNECT ----------------
const connectButton = document.getElementById("connectWallet");
connectButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerText = "Wallet Connected";
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Install MetaMask!");
  }
});

// ---------------- BUY TOKEN ----------------
const buyBtn = document.getElementById("buyToken");
const finalBuyBtn = document.getElementById("finalBuyToken");
const swapLink =
  "https://pancakeswap.finance/swap?outputCurrency=YOUR_CONTRACT_ADDRESS";

buyBtn.onclick = () => window.open(swapLink, "_blank");
finalBuyBtn.onclick = () => window.open(swapLink, "_blank");
