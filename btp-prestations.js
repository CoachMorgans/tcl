/* ═══════════════════════════════════════════════════════════
   BTP-PRESTATIONS.JS — Portail TCL v3.1
   Module Artisans BTP — 10 corps de métier
   Auto-injection dans le Portail TCL existant
   ═══════════════════════════════════════════════════════════ */

(function() {

/* ── DONNÉES : 10 corps de métier BTP ── */
var ARTISANS_BTP = [
  { id:'btp01', ico:'🧱', metier:'Maçon', desc:'Construction, crépissage, pose de parpaings, chape', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp02', ico:'🪚', metier:'Menuisier', desc:'Portes, fenêtres, placards, charpente bois', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp03', ico:'🔧', metier:'Plombier', desc:'Installation sanitaire, tuyauterie, WC, douche', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp04', ico:'⚡', metier:'Électricien', desc:'Installation électrique, tableau, prises, éclairage', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp05', ico:'🎨', metier:'Peintre', desc:'Peinture intérieure/extérieure, enduit, imperméabilisation', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp06', ico:'🏗️', metier:'Ferrailleur', desc:'Armature béton, dalle, poteau, longrine', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp07', ico:'🪟', metier:'Vitrier / Aluminier', desc:'Vitrage, menuiserie aluminium, vérandas, baies coulissantes', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp08', ico:'🏠', metier:'Staffeur', desc:'Staff décoratif, faux plafond, corniche, moulure', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp09', ico:'🪵', metier:'Carreleur', desc:'Pose carrelage sol/mur, faïence, mosaïque', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' },
  { id:'btp10', ico:'🏡', metier:'Agent Immobilier', desc:'Vente, location, estimation, gestion de biens', wave:'M_ci_sLb6dVzNX0Bi', tel:'01 41 86 14 84' }
];

var WAVE_QUINC = {
  label: 'VoteConnect Quincaillerie',
  tel: '01 41 86 14 84',
  num: '2250141861484',
  url: 'https://pay.wave.com/m/M_ci_sLb6dVzNX0Bi/c/ci/'
};
var WA_BTP = '2250767560908';

/* ── CSS injection ── */
var css = `
.btp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:7500;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}
.btp-overlay.on{display:flex}
.btp-box{width:100%;max-width:460px;background:var(--card);border:2px solid rgba(200,120,0,.5);border-radius:22px;overflow:hidden;box-shadow:0 0 60px rgba(200,120,0,.2);max-height:92vh;overflow-y:auto}
.btp-hd{background:linear-gradient(180deg,#1a0e00,#0c0600);padding:20px;text-align:center;border-bottom:2px solid rgba(200,120,0,.3);position:relative}
.btp-hd::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#e8a020,var(--yL),#e8a020,transparent)}
.btp-title{font-family:Georgia,serif;font-size:clamp(.9em,4vw,1.15em);background:linear-gradient(135deg,#e8a020,var(--yL));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:2px;margin-bottom:4px;font-weight:bold}
.btp-sub{font-size:.62em;color:rgba(200,120,0,.7);letter-spacing:2px}
.btp-body{padding:18px 16px}
.btp-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px}
.btp-card{background:#0c0600;border:1px solid rgba(200,120,0,.25);border-radius:12px;padding:13px 10px;cursor:pointer;transition:all .3s;text-align:center}
.btp-card:hover{border-color:rgba(200,120,0,.6);background:rgba(200,120,0,.07);transform:translateY(-2px)}
.btp-card.sel{border-color:#e8a020;background:rgba(200,120,0,.12)}
.btp-ico{font-size:1.8em;display:block;margin-bottom:5px}
.btp-metier{font-size:.72em;font-weight:bold;color:#e8a020;letter-spacing:.5px;margin-bottom:3px}
.btp-desc{font-size:.6em;color:var(--dim);line-height:1.4}
.btp-form{background:rgba(0,0,0,.4);border:1px dashed rgba(200,120,0,.35);border-radius:12px;padding:14px;margin-bottom:14px;display:none}
.btp-form.on{display:block}
.btp-lbl{font-size:.68em;color:#e8a020;letter-spacing:1px;font-weight:bold;display:block;margin-bottom:5px}
.btp-input{width:100%;background:#060300;border:1px solid rgba(200,120,0,.3);border-radius:8px;padding:10px 12px;color:var(--wh);font-size:.86em;margin-bottom:8px;outline:none;transition:border-color .3s;font-family:'Segoe UI',Arial,sans-serif}
.btp-input:focus{border-color:#e8a020}
.btp-textarea{width:100%;background:#060300;border:1px solid rgba(200,120,0,.3);border-radius:8px;padding:10px 12px;color:var(--wh);font-size:.84em;margin-bottom:8px;outline:none;resize:vertical;min-height:72px;font-family:'Segoe UI',Arial,sans-serif}
.btp-textarea:focus{border-color:#e8a020}
.btp-price-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.btp-select{width:100%;background:#060300;border:1px solid rgba(200,120,0,.3);border-radius:8px;padding:10px 12px;color:var(--wh);font-size:.86em;outline:none;appearance:none;cursor:pointer}
.btp-select option{background:#0c0600}
.btp-wave-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px;background:linear-gradient(135deg,#0050c8,#1a3a8a);border:none;border-radius:10px;color:var(--wh);font-size:.82em;font-weight:bold;letter-spacing:1px;cursor:pointer;transition:all .3s;margin-bottom:8px}
.btp-wave-btn:hover{transform:translateY(-2px);box-shadow:var(--bGlow)}
.btp-wa-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px;background:linear-gradient(135deg,#005c10,#128C7E);border:none;border-radius:10px;color:var(--wh);font-size:.82em;font-weight:bold;letter-spacing:1px;cursor:pointer;transition:all .3s;margin-bottom:8px}
.btp-wa-btn:hover{transform:translateY(-2px)}
.btp-close{display:block;text-align:center;margin-top:10px;font-size:.68em;color:var(--dim);cursor:pointer;letter-spacing:1px}
.btp-close:hover{color:#e8a020}
.btp-sel-label{background:rgba(200,120,0,.1);border:1px solid rgba(200,120,0,.3);border-radius:9px;padding:10px 13px;font-size:.74em;color:#e8a020;margin-bottom:12px;text-align:center;font-weight:bold;display:none}
.btp-sel-label.on{display:block}

/* Nav item BTP */
.btp-nav-trigger{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;cursor:pointer;transition:all .25s;padding:5px 2px;border-radius:12px}
.btp-nav-trigger:hover{background:rgba(200,120,0,.07)}
.btp-nav-trigger.active .btp-nav-ico{background:linear-gradient(135deg,#7a4a00,#b86f00,#e8a020);color:var(--wh);box-shadow:0 0 22px rgba(200,120,0,.45)}
.btp-nav-trigger.active .btp-nav-lbl{color:#e8a020}
.btp-nav-ico{width:42px;height:42px;border-radius:50%;background:#0c160c;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;font-size:1.15em;transition:all .3s}
.btp-nav-lbl{font-size:.5em;color:var(--dim);letter-spacing:.5px;text-align:center}

/* Page BTP dans l'app */
#pg-cli-btp{padding:14px 14px 140px}
#pg-cli-btp.on{display:block !important}
.btp-page-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:11px;margin-bottom:16px}
.btp-page-card{background:var(--card);border:1px solid rgba(200,120,0,.25);border-radius:13px;padding:16px 12px;text-align:center;cursor:pointer;transition:all .3s}
.btp-page-card:hover{border-color:rgba(200,120,0,.6);transform:translateY(-2px);box-shadow:0 0 22px rgba(200,120,0,.2)}
.btp-page-ico{font-size:2em;margin-bottom:7px;display:block}
.btp-page-metier{font-size:.76em;font-weight:bold;color:#e8a020;margin-bottom:4px}
.btp-page-desc{font-size:.62em;color:var(--dim);line-height:1.4}
`;
var styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

/* ── HTML : Overlay Modal BTP ── */
var modalHtml = `
<div class="btp-overlay" id="btp-overlay">
  <div class="btp-box">
    <div class="btp-hd">
      <div style="font-size:2.2em;margin-bottom:8px">🏗️</div>
      <div class="btp-title">ARTISANS BTP TCL</div>
      <div class="btp-sub">DEMANDE DE PRESTATION</div>
    </div>
    <div class="btp-body">
      <div style="font-size:.7em;color:var(--yL);letter-spacing:1.5px;margin-bottom:12px;font-weight:bold">① Choisissez votre corps de métier</div>
      <div class="btp-grid" id="btp-metier-grid"></div>
      <div class="btp-sel-label" id="btp-sel-label">✅ Corps de métier sélectionné</div>
      <div class="btp-form" id="btp-form">
        <label class="btp-lbl">② Décrivez vos travaux *</label>
        <textarea class="btp-textarea" id="btp-travaux" placeholder="Ex: Crépissage d'une pièce 20m², pose de carrelage 15m²..."></textarea>
        <label class="btp-lbl">Localité / Commune *</label>
        <input type="text" class="btp-input" id="btp-localite" placeholder="Ex: Cocody Angré, Abobo...">
        <label class="btp-lbl">Votre nom *</label>
        <input type="text" class="btp-input" id="btp-nom" placeholder="Nom et Prénoms">
        <label class="btp-lbl">Votre téléphone *</label>
        <input type="tel" class="btp-input" id="btp-tel" placeholder="+225 07 XX XX XX XX">
        <div class="btp-price-row">
          <div>
            <label class="btp-lbl">Budget estimé</label>
            <select class="btp-select" id="btp-budget">
              <option value="0">À définir</option>
              <option value="25000">~25 000 F</option>
              <option value="50000">~50 000 F</option>
              <option value="100000">~100 000 F</option>
              <option value="200000">~200 000 F</option>
              <option value="500000">~500 000 F</option>
              <option value="1000000">~1 000 000 F+</option>
            </select>
          </div>
          <div>
            <label class="btp-lbl">Délai souhaité</label>
            <select class="btp-select" id="btp-delai">
              <option>Urgent (< 48h)</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Flexible</option>
            </select>
          </div>
        </div>
        <div style="font-size:.68em;color:var(--dim);margin-bottom:10px;line-height:1.5">
          ③ Choisissez votre mode de contact avec l'artisan TCL :
        </div>
        <button class="btp-wave-btn" onclick="btpPayerWave()">
          💳 Réserver via Wave (+225 01 41 86 14 84)
        </button>
        <button class="btp-wa-btn" onclick="btpContactWA()">
          📲 Contacter directement par WhatsApp
        </button>
      </div>
      <span class="btp-close" onclick="closeBTP()">← Retour au Portail TCL</span>
    </div>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHtml);

/* ── Page BTP dans le shell ── */
var btpPageHtml = `
<div id="pg-cli-btp" class="page" style="padding:14px 14px 140px;display:none">
  <div class="page-hd">
    <div class="page-title" style="color:#e8a020">🏗️ Artisans BTP — Prestations TCL</div>
    <div class="ci-rule" style="background:linear-gradient(90deg,transparent,#e8a020,var(--yL),#e8a020,transparent)"></div>
  </div>
  <div class="card" style="border-color:rgba(200,120,0,.3);background:linear-gradient(145deg,rgba(200,120,0,.07),rgba(3,7,5,.98))">
    <div style="font-size:.76em;color:#e8a020;letter-spacing:1.5px;margin-bottom:6px;font-weight:bold">🏗️ 10 CORPS DE MÉTIER DISPONIBLES</div>
    <div style="font-size:.72em;color:var(--dim);line-height:1.6">
      Accédez à des artisans qualifiés TCL dans votre commune.<br>
      Réservation via Wave · Paiement sécurisé · CashBack 2,5%
    </div>
  </div>
  <div class="btp-page-grid" id="btp-page-grid"></div>
  <div class="card" style="border-color:rgba(200,120,0,.25)">
    <div style="font-size:.72em;color:#e8a020;letter-spacing:1px;margin-bottom:8px;font-weight:bold">📞 CONTACT DIRECT QUINCAILLERIE & BTP</div>
    <div style="font-size:.74em;color:var(--tx);line-height:1.7">
      Wave Business : <strong style="color:var(--yL)">+225 01 41 86 14 84</strong><br>
      WhatsApp Admin : <strong style="color:var(--gL)">+225 07 67 56 09 08</strong>
    </div>
  </div>
</div>
`;
var appShell = document.getElementById('app-shell');
if (appShell) appShell.insertAdjacentHTML('beforeend', btpPageHtml);

/* ── Remplir la grille métiers ── */
function buildBTPGrid() {
  var grid = document.getElementById('btp-metier-grid');
  var pageGrid = document.getElementById('btp-page-grid');
  if (!grid) return;
  grid.innerHTML = ARTISANS_BTP.map(function(a) {
    return '<div class="btp-card" id="btp-c-' + a.id + '" onclick="selMetier(\'' + a.id + '\')">'
      + '<span class="btp-ico">' + a.ico + '</span>'
      + '<div class="btp-metier">' + a.metier + '</div>'
      + '<div class="btp-desc">' + a.desc + '</div>'
      + '</div>';
  }).join('');
  if (pageGrid) {
    pageGrid.innerHTML = ARTISANS_BTP.map(function(a) {
      return '<div class="btp-page-card" onclick="openBTPFor(\'' + a.id + '\')">'
        + '<span class="btp-page-ico">' + a.ico + '</span>'
        + '<div class="btp-page-metier">' + a.metier + '</div>'
        + '<div class="btp-page-desc">' + a.desc + '</div>'
        + '</div>';
    }).join('');
  }
}

var btpMetierSel = null;

window.selMetier = function(id) {
  btpMetierSel = ARTISANS_BTP.find(function(a) { return a.id === id; });
  document.querySelectorAll('.btp-card').forEach(function(c) { c.classList.remove('sel'); });
  var el = document.getElementById('btp-c-' + id);
  if (el) el.classList.add('sel');
  var lbl = document.getElementById('btp-sel-label');
  if (lbl) {
    lbl.textContent = '✅ ' + btpMetierSel.ico + ' ' + btpMetierSel.metier + ' sélectionné';
    lbl.classList.add('on');
  }
  var form = document.getElementById('btp-form');
  if (form) form.classList.add('on');
  setTimeout(function() { form.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 200);
};

window.openBTPFor = function(id) {
  openBTP();
  setTimeout(function() { selMetier(id); }, 300);
};

window.btpPayerWave = function() {
  var trav = (document.getElementById('btp-travaux') || {}).value || '';
  var loc = (document.getElementById('btp-localite') || {}).value || '';
  var nom = (document.getElementById('btp-nom') || {}).value || '';
  var tel = (document.getElementById('btp-tel') || {}).value || '';
  var budget = parseInt((document.getElementById('btp-budget') || {}).value) || 0;
  if (!btpMetierSel || !trav.trim() || !loc.trim() || !nom.trim() || !tel.trim()) {
    if (typeof toast === 'function') toast('Remplissez tous les champs requis *');
    return;
  }
  var amount = budget > 0 ? budget : 25000; /* Acompte minimal */
  var waveUrl = WAVE_QUINC.url + '?amount=' + amount;
  window.open(waveUrl, '_blank');
  /* Notification WhatsApp Admin */
  var ref = 'BTP-' + Date.now().toString(36).toUpperCase();
  var msg = [
    '🏗️ *DEMANDE ARTISAN BTP TCL*',
    'Réf: *' + ref + '*',
    '',
    '🔨 Métier: *' + btpMetierSel.ico + ' ' + btpMetierSel.metier + '*',
    '📋 Travaux: ' + trav,
    '📍 Localité: ' + loc,
    '👤 Client: ' + nom,
    '📞 Tél: ' + tel,
    '💰 Budget: ' + (budget > 0 ? new Intl.NumberFormat('fr-FR').format(budget) + ' FCFA' : 'À définir'),
    '⏰ Délai: ' + ((document.getElementById('btp-delai') || {}).value || ''),
    '',
    '💳 Paiement Wave en cours → +225 ' + WAVE_QUINC.tel,
    '📲 Portail TCL VoteConnect'
  ].join('\n');
  setTimeout(function() {
    window.open('https://wa.me/' + WA_BTP + '?text=' + encodeURIComponent(msg), '_blank');
  }, 1500);
  if (typeof toast === 'function') toast('✅ Paiement Wave + Notification envoyée !');
};

window.btpContactWA = function() {
  var trav = (document.getElementById('btp-travaux') || {}).value || '';
  var loc = (document.getElementById('btp-localite') || {}).value || '';
  var nom = (document.getElementById('btp-nom') || {}).value || '';
  var tel = (document.getElementById('btp-tel') || {}).value || '';
  if (!btpMetierSel || !trav.trim() || !loc.trim()) {
    if (typeof toast === 'function') toast('Sélectionnez un métier et décrivez vos travaux');
    return;
  }
  var ref = 'BTP-' + Date.now().toString(36).toUpperCase();
  var msg = [
    '🏗️ *DEMANDE ARTISAN BTP TCL*',
    'Réf: *' + ref + '*',
    '',
    '🔨 Métier: *' + btpMetierSel.ico + ' ' + btpMetierSel.metier + '*',
    '📋 Travaux: ' + trav,
    '📍 Localité: ' + loc,
    '👤 Client: ' + (nom || 'Non précisé'),
    '📞 Tél: ' + (tel || 'Non précisé'),
    '💰 Budget: ' + (((document.getElementById('btp-budget') || {}).value || '0') === '0' ? 'À définir' : new Intl.NumberFormat('fr-FR').format(parseInt((document.getElementById('btp-budget') || {}).value)) + ' FCFA'),
    '⏰ Délai: ' + ((document.getElementById('btp-delai') || {}).value || ''),
    '',
    '📲 Via Portail TCL VoteConnect'
  ].join('\n');
  window.open('https://wa.me/' + WA_BTP + '?text=' + encodeURIComponent(msg), '_blank');
  if (typeof toast === 'function') toast('📲 Demande envoyée via WhatsApp !');
};

window.openBTP = function() {
  document.getElementById('btp-overlay').classList.add('on');
  btpMetierSel = null;
  document.querySelectorAll('.btp-card').forEach(function(c) { c.classList.remove('sel'); });
  var lbl = document.getElementById('btp-sel-label');
  if (lbl) lbl.classList.remove('on');
  var form = document.getElementById('btp-form');
  if (form) form.classList.remove('on');
  ['btp-travaux','btp-localite','btp-nom','btp-tel'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.value = '';
  });
};

window.closeBTP = function() {
  document.getElementById('btp-overlay').classList.remove('on');
};

/* ── Ajouter bouton BTP dans la nav Client ── */
function injectBTPNav() {
  var nav = document.getElementById('bottom-nav');
  if (!nav) return;
  /* Vérifie si le rôle est CLI */
  if (typeof ROLE !== 'undefined' && ROLE === 'cli') {
    var sep = document.createElement('div');
    sep.className = 'nav-sep';
    var item = document.createElement('div');
    item.className = 'btp-nav-trigger';
    item.id = 'nav-btp';
    item.innerHTML = '<div class="btp-nav-ico">🏗️</div><div class="btp-nav-lbl">BTP</div>';
    item.onclick = function() {
      document.querySelectorAll('.page').forEach(function(p) {
        p.classList.remove('on');
        p.style.display = 'none';
      });
      document.querySelectorAll('.nav-item, .btp-nav-trigger').forEach(function(n) {
        n.classList.remove('active','active-y');
      });
      var pg = document.getElementById('pg-cli-btp');
      if (pg) {
        pg.style.display = 'block';
        pg.classList.add('on');
      }
      item.classList.add('active');
      window.scrollTo(0,0);
    };
    nav.appendChild(sep);
    nav.appendChild(item);
  }
}

/* ── Hook sur launchApp ── */
var _origLaunchApp = window.launchApp;
window.launchApp = function() {
  if (typeof _origLaunchApp === 'function') _origLaunchApp.apply(this, arguments);
  setTimeout(function() {
    buildBTPGrid();
    injectBTPNav();
  }, 400);
};

/* Si l'app est déjà lancée */
if (typeof ROLE !== 'undefined' && ROLE) {
  setTimeout(function() { buildBTPGrid(); injectBTPNav(); }, 600);
}

console.log('[BTP-PRESTATIONS.JS] Module Artisans BTP chargé ✅ — 10 métiers disponibles');

})();
