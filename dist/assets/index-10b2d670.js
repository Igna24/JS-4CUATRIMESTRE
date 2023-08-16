(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t);
  new MutationObserver((t) => {
    for (const n of t)
      if (n.type === 'childList')
        for (const r of n.addedNodes)
          r.tagName === 'LINK' && r.rel === 'modulepreload' && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(t) {
    const n = {};
    return (
      t.integrity && (n.integrity = t.integrity),
      t.referrerPolicy && (n.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (n.credentials = 'omit')
        : (n.credentials = 'same-origin'),
      n
    );
  }
  function s(t) {
    if (t.ep) return;
    t.ep = !0;
    const n = a(t);
    fetch(t.href, n);
  }
})();
class f {
  constructor() {
    (this.name = ''),
      (this.soil = ''),
      (this.pot = ''),
      (this.potMaterial = ''),
      (this.potStyle = ''),
      (this.extras = []),
      (this.plantImage = '');
  }

  withPlantImage(e) {
    return (this.plantImage = e), this;
  }

  withName(e) {
    return (this.name = g(e)), this;
  }

  withSoil(e) {
    return (this.soil = e), this;
  }

  withPot(e) {
    return (this.pot = e), this;
  }

  withPotMaterial(e) {
    return (this.potMaterial = e), this;
  }

  withPotStyle(e) {
    return (this.potStyle = e), this;
  }

  withExtras(e) {
    return (this.extras = e), this;
  }

  build() {
    return {
      name: this.name,
      soil: this.soil,
      pot: this.pot,
      potMaterial: this.potMaterial,
      potStyle: this.potStyle,
      extras: this.extras,
    };
  }
}
function g(o) {
  return o.charAt(0).toUpperCase() + o.slice(1);
}
function y(o) {
  const e = document.createElement('img');
  return (e.src = `./assets/images/${o}.png`), e;
}
function d(o, e) {
  const a = e;
  const s = JSON.parse(localStorage.getItem('recommendation'));
  const t = document.createElement('img');
  if (s) {
    const i = s.potStyle === 'Decorated pot' ? 'decorated-' : '';
    const u = s.potColor.toLowerCase();
    const m = s.potMaterial.toLowerCase();
    t.src = `./assets/images/pot-${m}-${i}${u}.png`;
  } else t.src = `./assets/images/pot-${o.pot.replace(' pot', '')}.png`;
  const n = document.createElement('img');
  n.src = `./assets/images/plant-${o.name}.png`;
  const r = document.createElement('img');
  r.src = `./assets/images/soil-${o.soil.replace(' Soil', '')}.png`;
  const l = document.createElement('div');
  (l.className = 'extras-container'),
    o.extras.forEach((i) => {
      const u = y(i);
      l.appendChild(u);
    }),
    (a.innerHTML = ''),
    a.appendChild(t),
    a.appendChild(n),
    a.appendChild(r),
    a.appendChild(l);
  const c = document.createElement('div');
  (c.innerHTML = `
    <p>The perfect plant for you is...</p>
    <h3 class="plant-created-title">${o.name}</h3>
    <div class="empty-container"></div>
    <div class="result-container">
      <div class="result-text-left">
        <p>Name</p>
        <p>Soil</p>
        <p>Pot</p>
        <p>Extras</p>
      </div>
      <div class="result-text-right">
        <p>${o.name}</p>
        <p>${o.soil}</p>
        <p>${o.potColor}</p>
        <p>${o.extras.join(', ')}</p>
      </div>  
    </div>
    <button id="customizeButton" class="customize-button">Customize</button>
  `),
    a.appendChild(c),
    document.getElementById('customizeButton').addEventListener('click', () => {
      window.location.href = 'customize.html';
    }),
    (a.style.display = 'block');
}
function S(o, e) {
  document.getElementById('clearButton').addEventListener('click', () => {
    o.reset();
    const s = e;
    (s.innerHTML = ''),
      (s.style.display = 'none'),
      localStorage.removeItem('recommendation');
  });
}
function w() {
  const o = document.getElementById('form');
  const e = document.getElementById('recommendation');
  o.addEventListener('submit', (s) => {
    s.preventDefault();
    const t = document.querySelector('input[name="place"]:checked');
    const n = document.querySelector('input[name="sunlight"]:checked');
    const r = document.querySelector('input[name="pets"]:checked');
    const l = document.querySelector('input[name="water"]:checked');
    const c = document.querySelector('input[name="style"]:checked');
    const p = Array.from(
      document.querySelectorAll('input[name="extras"]:checked'),
    );
    if (t && n && r && l && c) {
      const i = new f();
      t.value === 'inside_indirect'
        ? i.withName('Sansevieria').withPlantImage('plant-sansevieria')
        : t.value === 'inside_lot'
        ? i.withName('Aglaonema').withPlantImage('plant-aglaonema')
        : t.value === 'outside' &&
          i.withName('Aloe').withPlantImage('plant-aloe'),
        n.value === 'yes'
          ? i.withSoil('Composted Soil')
          : n.value === 'no' && i.withSoil('Fertilized Soil'),
        r.value === 'yes'
          ? (i.withPot('ceramic-unpainted'),
            i.withPotStyle('Substitute the soil for the easy drainage soil'))
          : r.value === 'no' && i.withPot('ceramic-unpainted'),
        l.value === 'overwater'
          ? i.withPotMaterial('pot-clay-simple-blue')
          : (l.value === 'underwater' || l.value === 'neither') &&
            i.withPotMaterial('ceramic-unpainted'),
        c.value === 'minimalism'
          ? i.withPotStyle('pot-ceramic-blue')
          : c.value === 'decoration'
          ? i.withPotStyle('pot-ceramic-decorated-green')
          : c.value === 'bright_colors' &&
            i.withPotStyle('pot-ceramic-decorated-purple');
      const u = p.map((h) => h.value);
      i.withExtras(u);
      const m = i.build();
      d(m, e), localStorage.setItem('recommendation', JSON.stringify(m));
    } else alert('Please check all boxes');
  });
  const a = JSON.parse(localStorage.getItem('recommendation'));
  a && d(a, e), S(o, e);
}
w();
const v = document.getElementById('customizeButton');
v.addEventListener('click', () => {
  const o = JSON.parse(localStorage.getItem('recommendation')) || d;
  const e = new URLSearchParams(o);
  window.location.href = `customize.html?${e.toString()}`;
});
