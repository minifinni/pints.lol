// pints.lol — GasBuddy for pints
// Crowdsourced London pub prices

const PUBS = [
  { name: "The Timothy Taylor", area: "Shoreditch", price: 4.49, type: "independent", beer: "Boltmaker", updated: "2h ago" },
  { name: "The Old Blue Last", area: "Shoreditch", price: 4.80, type: "independent", beer: "Stella", updated: "5h ago" },
  { name: "The Dragon Bar", area: "Shoreditch", price: 5.20, type: "craft", beer: "IPA", updated: "1d ago" },
  { name: "The Wetherspoons E1", area: "Shoreditch", price: 3.29, type: "wetherspoons", beer: "Carling", updated: "3h ago" },
  { name: "The Spread Eagle", area: "Camden", price: 4.70, type: "independent", beer: "Guinness", updated: "4h ago" },
  { name: "The World's End", area: "Camden", price: 5.10, type: "independent", beer: "Camden Hells", updated: "6h ago" },
  { name: "The Roundhouse Bar", area: "Camden", price: 6.20, type: "craft", beer: "Craft IPA", updated: "2d ago" },
  { name: "The Falcon", area: "Clapham", price: 5.50, type: "independent", beer: "Peroni", updated: "1d ago" },
  { name: "The Railway", area: "Clapham", price: 4.90, type: "independent", beer: "Guinness", updated: "8h ago" },
  { name: "Tim's Wetherspoons", area: "Clapham", price: 3.49, type: "wetherspoons", beer: "Carling", updated: "2h ago" },
  { name: "The Prince of Wales", area: "Brixton", price: 4.60, type: "independent", beer: "Stella", updated: "5h ago" },
  { name: "Brixton Brewery Taproom", area: "Brixton", price: 5.80, type: "craft", beer: "Reliance Pale", updated: "1d ago" },
  { name: "The Crown & Anchor", area: "Brixton", price: 4.50, type: "independent", beer: "Guinness", updated: "3h ago" },
  { name: "The Rye", area: "Peckham", price: 4.40, type: "independent", beer: "Peroni", updated: "6h ago" },
  { name: "The Nines", area: "Peckham", price: 5.00, type: "craft", beer: "IPA", updated: "1d ago" },
  { name: "Wetherspoons Peckham", area: "Peckham", price: 3.29, type: "wetherspoons", beer: "Carling", updated: "4h ago" },
  { name: "The Slug & Lettuce", area: "Canary Wharf", price: 6.80, type: "independent", beer: "Peroni", updated: "2h ago" },
  { name: "The Henry Addington", area: "Canary Wharf", price: 7.20, type: "independent", beer: "Guinness", updated: "1d ago" },
  { name: "Wetherspoons Wetherspoons", area: "Canary Wharf", price: 3.49, type: "wetherspoons", beer: "Carling", updated: "1h ago" },
  { name: "The Marquis of Granby", area: "Soho", price: 6.50, type: "independent", beer: "Stella", updated: "3h ago" },
  { name: "The Spice of Life", area: "Soho", price: 6.90, type: "independent", beer: "Guinness", updated: "5h ago" },
  { name: "The Wetherspoons Soho", area: "Soho", price: 3.49, type: "wetherspoons", beer: "Carling", updated: "2h ago" },
  { name: "The Wenlock Arms", area: "Islington", price: 4.30, type: "independent", beer: "Real Ale", updated: "1d ago" },
  { name: "The Compton Arms", area: "Islington", price: 4.80, type: "independent", beer: "Guinness", updated: "8h ago" },
  { name: "The York", area: "Islington", price: 5.60, type: "craft", beer: "IPA", updated: "2d ago" },
  { name: "The Crosse Keys", area: "City of London", price: 5.10, type: "independent", beer: "Peroni", updated: "3h ago" },
  { name: "The Hamilton Hall", area: "City of London", price: 5.80, type: "independent", beer: "Guinness", updated: "1d ago" },
  { name: "Wetherspoons Liverpool St", area: "City of London", price: 3.49, type: "wetherspoons", beer: "Carling", updated: "1h ago" },
  { name: "The Effra Social", area: "Herne Hill", price: 4.20, type: "independent", beer: "Guinness", updated: "6h ago" },
  { name: "The Florence", area: "Herne Hill", price: 5.00, type: "craft", beer: "Craft Lager", updated: "1d ago" },
];

const AREAS = [
  { name: "Shoreditch", avgPrice: 4.60, pubs: 12 },
  { name: "Camden", avgPrice: 4.90, pubs: 15 },
  { name: "Clapham", avgPrice: 5.00, pubs: 18 },
  { name: "Brixton", avgPrice: 4.80, pubs: 14 },
  { name: "Peckham", avgPrice: 4.50, pubs: 11 },
  { name: "Canary Wharf", avgPrice: 6.50, pubs: 9 },
  { name: "Soho", avgPrice: 6.70, pubs: 22 },
  { name: "Islington", avgPrice: 4.90, pubs: 16 },
  { name: "City of London", avgPrice: 5.60, pubs: 8 },
  { name: "Hackney", avgPrice: 4.70, pubs: 20 },
  { name: "Bermondsey", avgPrice: 5.20, pubs: 13 },
  { name: "Herne Hill", avgPrice: 4.60, pubs: 10 },
  { name: "Dalston", avgPrice: 4.80, pubs: 17 },
  { name: "Bethnal Green", avgPrice: 4.50, pubs: 14 },
  { name: "Borough", avgPrice: 5.80, pubs: 11 },
  { name: "Mayfair", avgPrice: 8.50, pubs: 6 },
  { name: "Notting Hill", avgPrice: 6.20, pubs: 9 },
  { name: "Elephant & Castle", avgPrice: 4.30, pubs: 8 },
];

let currentArea = 'all';
let submittedPrices = JSON.parse(localStorage.getItem('pints_submissions') || '[]');

// ── PRICE COLOUR ──────────────────────────────────────────
function priceColour(price) {
  if (price < 4.50) return 'green';
  if (price < 5.50) return 'amber';
  return 'red';
}

// ── RENDER PUBS ───────────────────────────────────────────
function renderPubs() {
  const sort = document.getElementById('sortSelect').value;
  const filter = document.getElementById('filterSelect').value;

  let pubs = [...PUBS, ...submittedPrices];

  if (currentArea !== 'all') {
    pubs = pubs.filter(p => p.area.toLowerCase() === currentArea.toLowerCase());
  }

  if (filter === 'no-spoons') {
    pubs = pubs.filter(p => p.type !== 'wetherspoons');
  } else if (filter !== 'all') {
    pubs = pubs.filter(p => p.type === filter);
  }

  if (sort === 'price-asc') pubs.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') pubs.sort((a, b) => b.price - a.price);

  const list = document.getElementById('pubList');
  const count = document.getElementById('resultsCount');
  const title = document.getElementById('resultsTitle');

  title.textContent = currentArea === 'all' ? 'All London Pubs' : `Pubs in ${currentArea}`;
  count.textContent = `${pubs.length} pub${pubs.length !== 1 ? 's' : ''}`;

  if (pubs.length === 0) {
    list.innerHTML = `<div class="empty-state">No pubs found. <a href="#" onclick="openModal()">Be the first to submit one →</a></div>`;
    return;
  }

  list.innerHTML = pubs.map((pub, i) => `
    <div class="pub-card ${priceColour(pub.price)}">
      <div class="pub-rank">${i + 1}</div>
      <div class="pub-info">
        <div class="pub-name">${pub.name}</div>
        <div class="pub-meta">
          <span class="pub-area">${pub.area}</span>
          <span class="pub-beer">${pub.beer || 'Pint'}</span>
          <span class="pub-updated">${pub.updated || 'Just now'}</span>
        </div>
      </div>
      <div class="pub-price-wrap">
        <div class="pub-price ${priceColour(pub.price)}">£${pub.price.toFixed(2)}</div>
        <div class="pub-price-label">per pint</div>
      </div>
    </div>
  `).join('');
}

// ── RENDER AREAS ──────────────────────────────────────────
function renderAreas() {
  const grid = document.getElementById('areaGrid');
  const sorted = [...AREAS].sort((a, b) => a.avgPrice - b.avgPrice);

  grid.innerHTML = sorted.map(area => `
    <div class="area-card" onclick="searchArea('${area.name}')">
      <div class="area-name">${area.name}</div>
      <div class="area-avg ${priceColour(area.avgPrice)}">avg £${area.avgPrice.toFixed(2)}</div>
      <div class="area-count">${area.pubs} pubs</div>
    </div>
  `).join('');
}

// ── LEADERBOARD ───────────────────────────────────────────
function renderLeaderboard() {
  const sorted = [...AREAS].sort((a, b) => a.avgPrice - b.avgPrice);

  document.getElementById('cheapestAreas').innerHTML = sorted.slice(0, 5).map((a, i) => `
    <div class="leaderboard-row">
      <span class="lb-rank">${i + 1}.</span>
      <span class="lb-name">${a.name}</span>
      <span class="lb-price green">avg £${a.avgPrice.toFixed(2)}</span>
    </div>
  `).join('');

  document.getElementById('expensiveAreas').innerHTML = sorted.slice(-5).reverse().map((a, i) => `
    <div class="leaderboard-row">
      <span class="lb-rank">${i + 1}.</span>
      <span class="lb-name">${a.name}</span>
      <span class="lb-price red">avg £${a.avgPrice.toFixed(2)}</span>
    </div>
  `).join('');
}

// ── SEARCH ────────────────────────────────────────────────
function handleSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (q) searchArea(q);
}

function searchArea(area) {
  currentArea = area;
  document.getElementById('searchInput').value = area;
  renderPubs();
  document.getElementById('pubList').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
});

// ── MODAL ─────────────────────────────────────────────────
function openModal() {
  document.getElementById('submitModal').style.display = 'flex';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('submitModal')) {
    document.getElementById('submitModal').style.display = 'none';
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const newPub = {
    name: document.getElementById('pubName').value,
    area: document.getElementById('pubArea').value,
    price: parseFloat(document.getElementById('pintPrice').value),
    beer: document.getElementById('beerName').value || 'Pint',
    type: 'independent',
    updated: 'Just now',
  };

  submittedPrices.unshift(newPub);
  localStorage.setItem('pints_submissions', JSON.stringify(submittedPrices));

  // Update stats
  const statPrices = document.getElementById('statPrices');
  const current = parseInt(statPrices.textContent.replace(',', '')) + 1;
  statPrices.textContent = current.toLocaleString();

  closeModal();
  renderPubs();
  showToast(`Thanks! ${newPub.name} added at £${newPub.price.toFixed(2)}`);
  e.target.reset();
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── INIT ──────────────────────────────────────────────────
renderPubs();
renderAreas();
renderLeaderboard();
