const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'meals', label: 'Meals' },
  { id: 'gym', label: 'Gym' },
  { id: 'health', label: 'Health' },
  { id: 'mind', label: 'Mind' },
  { id: 'debt', label: 'Debt' },
  { id: 'learn', label: 'Learn' }
];

const STORE = 'roh-v7';
const PIN_KEY = 'roh-pin-hash';
const UNLOCK_KEY = 'roh-unlocked-session';
const DAY_IDS = ['mon','tue','wed','thu','fri','sat','sun'];
const DAY_LABEL = { mon:'Mon', tue:'Tue', wed:'Wed', thu:'Thu', fri:'Fri', sat:'Sat', sun:'Sun' };

const MEALS = {
  mon: { title:'Monday', training:true, meals:[
    { id:'breakfast', title:'Breakfast', items:['4 eggs + spinach','Toast','200 g yoghurt + berries'], steps:['Cook eggs with spinach.','Toast.','Yoghurt mid-morning.'] },
    { id:'lunch', title:'Lunch', items:['Chicken 200 g','1 rice pouch','Half salad bag','1 tsp olive oil'], steps:['Pan chicken 6–8 min/side.','Mic rice.','Salad + oil.'] },
    { id:'tea', title:'Early tea (6:30–7)', items:['Batch chilli portion','No full second rice if lunch had pouch','Yoghurt + veg OK'], steps:['Serve chilli.','Kitchen closed before night tablet.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  tue: { title:'Tuesday', training:true, meals:[
    { id:'breakfast', title:'Breakfast', items:['4 eggs + spinach','Toast','Yoghurt + berries'], steps:['Same breakfast rail.'] },
    { id:'lunch', title:'Lunch', items:['Chicken ~200 g','Carb + salad'], steps:['Training-day lunch.'] },
    { id:'tea', title:'Early tea (6:30–7)', items:['Chicken traybake/stir-fry ~200 g','Veg'], steps:['Cook chicken + veg.','Kitchen closed.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  wed: { title:'Wednesday', training:true, meals:[
    { id:'breakfast', title:'Breakfast', items:['4 eggs + spinach','Toast','Yoghurt + berries'], steps:['Same breakfast rail.'] },
    { id:'lunch', title:'Lunch', items:['Chicken ~200 g','Carb + salad'], steps:['Training-day lunch.'] },
    { id:'tea', title:'Early tea (6:30–7)', items:['Fridge chilli','Pasta or rice'], steps:['Reheat chilli.','Kitchen closed.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  thu: { title:'Thursday', training:false, meals:[
    { id:'breakfast', title:'Breakfast', items:['4 eggs + spinach','Toast','Yoghurt + berries'], steps:['Same breakfast rail.'] },
    { id:'lunch', title:'Lunch', items:['Chicken ~200 g','Lighter carb','Extra veg'], steps:['Rest-day lunch.'] },
    { id:'tea', title:'Early tea (6:30–7)', items:['Chicken + veg'], steps:['Kitchen closed.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  fri: { title:'Friday', training:true, meals:[
    { id:'breakfast', title:'Breakfast', items:['4 eggs + spinach','Toast','Yoghurt + berries'], steps:['Same breakfast rail.'] },
    { id:'lunch', title:'Lunch', items:['Chicken ~200 g','Carb + salad'], steps:['Training-day lunch.'] },
    { id:'tea', title:'Early tea (6:30–7)', items:['Last chilli portion','Rice only if lunch wasn’t a full pouch'], steps:['Reheat chilli.','Kitchen closed.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  sat: { title:'Saturday', training:false, meals:[
    { id:'breakfast', title:'Breakfast', items:['Keep protein — eggs or yoghurt'], steps:['Stay on rails; no free-for-all.'] },
    { id:'lunch', title:'Lunch', items:['Protein + veg + modest carb'], steps:['Simple plate.'] },
    { id:'tea', title:'Early tea', items:['Protein + veg · early'], steps:['Kitchen closed before night tablet.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]},
  sun: { title:'Sunday', training:false, meals:[
    { id:'breakfast', title:'Breakfast', items:['Eggs or yoghurt + fruit'], steps:['Prep week if you can.'] },
    { id:'lunch', title:'Lunch', items:['Protein + veg'], steps:['Simple plate.'] },
    { id:'tea', title:'Early tea', items:['Protein + veg · early'], steps:['Kitchen closed before night tablet.'] },
    { id:'snack', title:'Snack (optional)', items:['Only if planned'], steps:['Mark only if you had one.'] }
  ]}
};

const GYM = {
  mon:{ session:'PT 10:00', note:'Egg breakfast before PT. Rebuild / knees-aware.' },
  tue:{ session:'Class 9:00', note:'Show up; loads as planned.' },
  wed:{ session:'PT 10:00', note:'Egg breakfast before PT.' },
  thu:{ session:'Rest / walk', note:'~10k steps floor — not a fourth hard session.' },
  fri:{ session:'PT 10:00', note:'Egg breakfast before PT.' },
  sat:{ session:'Walk / optional easy', note:'Steps count. No invent-HIIT.' },
  sun:{ session:'Walk / rest', note:'Protect Monday legs.' }
};

const DEBT = {
  pinned: 'Job start pinned in the room — ask Debt for date',
  holds: [
    { name:'Moorcroft (×2)', status:'On hold', until:'Early Nov' },
    { name:'Tesco loan', status:'On hold', until:'Late Oct' },
    { name:'Zinc / NatWest', status:'On hold', until:'Late Oct' }
  ],
  open: [
    { name:'Barclaycard', next:'Next call block' },
    { name:'Very Pay', next:'After Barclaycard' },
    { name:'Littlewoods', next:'After Very' },
    { name:'Jacamo', next:'With Littlewoods' },
    { name:'Fluro', next:'Watch — default in progress' },
    { name:'Zopa', next:'Watching mail' }
  ],
  avoid: 'Do-not-contact list — ask Debt before dialling'
};

const LEARN = [
  { id:'l1', title:'What FX actually is', body:'You’re exchanging one currency for another. Price = how many units of quote currency per 1 unit of base (e.g. EUR/USD).' },
  { id:'l2', title:'Pairs, pip, lot (words only)', body:'Major pairs involve USD. A pip is the usual smallest price move. Lot size scales risk — learn it on a demo before real size.' },
  { id:'l3', title:'Long vs short', body:'Long = you profit if the base rises vs quote. Short = you profit if it falls. Direction is a bet; size is the risk.' },
  { id:'l4', title:'Spread & costs', body:'You buy at ask, sell at bid. Spread + overnight fees eat small accounts. Factor cost before “I’m up”.' },
  { id:'l5', title:'Leverage = amplifier', body:'Leverage boosts gains and losses. High leverage is how accounts blow up. Default rule: tiny size or none until you can explain your risk in £.' },
  { id:'l6', title:'Risk per trade', body:'Decide max £ you’re willing to lose *before* entry. Position size from stop distance — never “feels right” size.' },
  { id:'l7', title:'Demo before live', body:'Open a demo. Log 20 trades with rules. If you can’t follow rules on fake money, don’t go live.' },
  { id:'l8', title:'Journal every trade', body:'Setup, why, size, result, emotion. The Learn tab + Diary are for this — not screenshots of wins.' },
  { id:'l9', title:'News & volatility', body:'Big releases (CPI, NFP, central banks) gap prices. Beginners sit out or use tiny size — don’t “guess the number”.' },
  { id:'l10', title:'Scams & “signals”', body:'No paid signal group, no “guaranteed” robot, no depositing to random apps. Regulated broker only when you go live — and only with money you can lose.' }
];

const DIARY_DEFAULTS = [
  { id:'alarm', short:'First alarm', hideRough:false, text:'Up at the first alarm — feet on the floor, no snooze' },
  { id:'bed', short:'Out of bed', hideRough:true, text:'Out of bed, even when I feel like shit' },
  { id:'teeth', short:'Brush teeth', hideRough:true, text:'Brush teeth' },
  { id:'shower', short:'Shower', hideRough:true, text:'Shower' },
  { id:'moist', short:'Moisturise', hideRough:true, text:'Moisturise' },
  { id:'food', short:'Breakfast', hideRough:true, text:"When breakfast happens, eggs if I feel well, easy food if I don't." },
  { id:'tea', short:'Kitchen closed', hideRough:true, text:'Tea is finished by about 7, then the kitchen stays closed.' },
  { id:'meds-am', short:'Morning meds', hideRough:false, text:'When breakfast happens, I take morning meds.' },
  { id:'meds-pm', short:'Night tablet', hideRough:false, text:'When the kitchen is closed, I take the night tablet.' }
];

const BLOCK_INTENT = /\b(gym|gyms|walk|walking|pt|whoop|steps?|calories?|calorie|protein|proteins)\b|personal training/i;

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
function londonHour(d = new Date()) {
  return Number(new Intl.DateTimeFormat('en-GB', {
    timeZone:'Europe/London', hour:'2-digit', hourCycle:'h23'
  }).format(d));
}
function intentBlocked(text) { return BLOCK_INTENT.test(text || ''); }
function nightTabletOn(day) {
  return londonHour() >= 17 || !!(day && day.eod);
}
function roughShows(id, nightOn) {
  if (id === 'alarm' || id === 'meds-am') return true;
  if (id === 'meds-pm') return !!nightOn;
  return false;
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function hasPin() { return !!localStorage.getItem(PIN_KEY); }
function isUnlocked() { return sessionStorage.getItem(UNLOCK_KEY) === '1'; }
function lockNow() { sessionStorage.removeItem(UNLOCK_KEY); render(); }
async function setPin(pin) {
  if (!pin || pin.length < 4) throw new Error('Use at least 4 characters');
  localStorage.setItem(PIN_KEY, await sha256(pin));
  sessionStorage.setItem(UNLOCK_KEY, '1');
}
async function tryUnlock(pin) {
  const hash = localStorage.getItem(PIN_KEY);
  if (!hash) return false;
  if ((await sha256(pin)) === hash) { sessionStorage.setItem(UNLOCK_KEY, '1'); return true; }
  return false;
}

function load() {
  try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; }
}
function save(data) {
  localStorage.setItem(STORE, JSON.stringify(data));
  // verify round-trip
  try {
    const ok = localStorage.getItem(STORE) === JSON.stringify(data);
    if (!ok) throw new Error('verify fail');
    return true;
  } catch (e) {
    showToast('Save failed — storage full?');
    return false;
  }
}
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg || 'Saved';
  t.classList.add('show');
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(() => t.classList.remove('show'), 1600);
}

function londonParts(d = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone:'Europe/London', year:'numeric', month:'2-digit', day:'2-digit', weekday:'short' });
  const parts = Object.fromEntries(fmt.formatToParts(d).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
  const map = { Mon:'mon', Tue:'tue', Wed:'wed', Thu:'thu', Fri:'fri', Sat:'sat', Sun:'sun' };
  return { key: `${parts.year}-${parts.month}-${parts.day}`, dow: map[parts.weekday] || 'mon', label: parts.weekday };
}
function weekKeys() {
  const { key, dow } = londonParts();
  const idx = DAY_IDS.indexOf(dow);
  const today = new Date(key + 'T12:00:00Z');
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - idx);
  return DAY_IDS.map((id, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    const parts = londonParts(d);
    // londonParts on a Date uses that instant — for UTC noon keys this matches London date in BST/GMT for our strip
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth()+1).padStart(2,'0');
    const day = String(d.getUTCDate()).padStart(2,'0');
    return { id, key: `${y}-${m}-${day}`, label: DAY_LABEL[id] };
  });
}

function dayBucket(dateKey) {
  const d = load();
  d.days = d.days || {};
  d.days[dateKey] = d.days[dateKey] || { dones:{}, diary:[], whoop:'normal' };
  return d;
}
function isDone(dateKey, kind, id) {
  const d = load();
  return !!(d.days && d.days[dateKey] && d.days[dateKey].dones && d.days[dateKey].dones[`${kind}:${id}`]);
}
function toggleDone(dateKey, kind, id) {
  const d = dayBucket(dateKey);
  const k = `${kind}:${id}`;
  const cur = !!d.days[dateKey].dones[k];
  d.days[dateKey].dones[k] = !cur;
  d.days[dateKey].dones[k + ':at'] = new Date().toISOString();
  if (save(d)) showToast(!cur ? 'Marked done' : 'Unchecked');
  render();
}
function setWhoop(dateKey, mode) {
  const d = dayBucket(dateKey);
  d.days[dateKey].whoop = mode;
  if (save(d)) showToast('Day mode saved');
  render();
}
function addDiary(dateKey, text, tag) {
  const t = (text || '').trim();
  if (!t) return;
  if (/(punish|i'm broken|heart.?fail|grind harder|what if mark)/i.test(t)) {
    showToast('Spiral blocked — not saved');
    return;
  }
  const d = dayBucket(dateKey);
  d.days[dateKey].diary.push({ text: t, tag: tag || 'note', at: new Date().toISOString() });
  if (save(d)) showToast('Diary saved');
  render();
}

const state = { tab: 'today', dayKey: londonParts().key, dayId: londonParts().dow, mealDay: londonParts().dow, review: false, diary: false, prayerPanel: null };
let live = {
  whoopMode: 'normal',
  steps: { baseGoal: 10000, yesterday: null, carry: 0, todayGoal: 10000 },
  focus: ''
};

async function refreshLive() {
  try {
    const res = await fetch('./data/live.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    live = Object.assign(live, data);
    if (data.whoopMode) {
      const d = dayBucket(londonParts().key);
      if (!d.days[londonParts().key].whoop || d.days[londonParts().key].whoop === 'normal') {
        d.days[londonParts().key].whoop = data.whoopMode;
        save(d);
      }
    }
  } catch (e) {}
}

function stepGoal() {
  const s = (live && live.steps) || {};
  return Number(s.todayGoal || s.baseGoal || 10000);
}


function ensureDiary(dateKey) {
  const d = dayBucket(dateKey);
  const day = d.days[dateKey];
  if (!Array.isArray(day.intentions)) {
    day.intentions = DIARY_DEFAULTS.map((x) => ({
      id: x.id, text: x.text, done: false, why: '', hideRough: !!x.hideRough
    }));
    day.rough = !!day.rough;
    day.eod = !!day.eod;
    day.prayerAmSeen = !!day.prayerAmSeen;
    save(d);
  }
  return d;
}
function orderIntentions(list) {
  list.sort((a, b) => {
    const ia = DIARY_DEFAULTS.findIndex((x) => x.id === a.id);
    const ib = DIARY_DEFAULTS.findIndex((x) => x.id === b.id);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}
function setRough(dateKey, on) {
  const d = ensureDiary(dateKey);
  d.days[dateKey].rough = !!on;
  if (save(d)) showToast('Saved');
  render();
}
function toggleIntent(dateKey, id) {
  const d = ensureDiary(dateKey);
  const item = (d.days[dateKey].intentions || []).find((i) => i.id === id);
  if (!item) return;
  item.done = !item.done;
  if (item.done) item.why = '';
  save(d);
  render();
}
function removeIntent(dateKey, id) {
  const d = ensureDiary(dateKey);
  d.days[dateKey].intentions = (d.days[dateKey].intentions || []).filter((i) => i.id !== id);
  save(d);
  render();
}
function addPreset(dateKey, id) {
  const preset = DIARY_DEFAULTS.find((x) => x.id === id);
  if (!preset) return;
  const d = ensureDiary(dateKey);
  const day = d.days[dateKey];
  if (day.rough && !roughShows(id, nightTabletOn(day))) return;
  if ((day.intentions || []).some((i) => i.id === id)) return;
  day.intentions.push({ id: preset.id, text: preset.text, done: false, why: '', hideRough: !!preset.hideRough });
  orderIntentions(day.intentions);
  save(d);
  render();
}
function addCustomIntent(dateKey, text) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (!t) return;
  if (intentBlocked(t)) { showToast('Not on this list'); return; }
  const d = ensureDiary(dateKey);
  const list = d.days[dateKey].intentions;
  if (list.some((i) => i.text.toLowerCase() === t.toLowerCase())) { showToast('Already on the list'); return; }
  list.push({ id: 'c' + Date.now(), text: t.slice(0, 140), done: false, why: '', hideRough: false });
  save(d);
  render();
}
function saveWhy(dateKey, id, text) {
  const d = ensureDiary(dateKey);
  const item = (d.days[dateKey].intentions || []).find((i) => i.id === id);
  if (!item || item.done) return;
  item.why = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 240);
  save(d);
}
function setEod(dateKey) {
  const d = ensureDiary(dateKey);
  d.days[dateKey].eod = true;
  save(d);
  render();
}
function dismissPrayer(dateKey) {
  if (state.prayerPanel === 'pm') {
    state.prayerPanel = null;
    render();
    return;
  }
  const d = ensureDiary(dateKey);
  d.days[dateKey].prayerAmSeen = true;
  save(d);
  state.prayerPanel = null;
  render();
}
function wireDiary() {
  const open = document.getElementById('open-diary');
  if (open) open.onclick = () => { state.diary = true; state.review = false; render(); };
  const back = document.getElementById('diary-back');
  if (back) back.onclick = () => { state.diary = false; state.prayerPanel = null; render(); };
  const rough = document.getElementById('rough-btn');
  if (rough) rough.onclick = () => {
    const d = ensureDiary(state.dayKey);
    setRough(state.dayKey, !d.days[state.dayKey].rough);
  };
  document.querySelectorAll('[data-intent]').forEach((b) => {
    b.onclick = () => toggleIntent(state.dayKey, b.dataset.intent);
  });
  document.querySelectorAll('[data-remove]').forEach((b) => {
    b.onclick = () => removeIntent(state.dayKey, b.dataset.remove);
  });
  document.querySelectorAll('[data-add-preset]').forEach((b) => {
    b.onclick = () => addPreset(state.dayKey, b.dataset.addPreset);
  });
  const addBtn = document.getElementById('intent-add');
  const addInput = document.getElementById('intent-text');
  if (addBtn && addInput) {
    const go = () => addCustomIntent(state.dayKey, addInput.value);
    addBtn.onclick = go;
    addInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } };
  }
  document.querySelectorAll('[data-why]').forEach((el) => {
    el.oninput = () => saveWhy(state.dayKey, el.dataset.why, el.value);
  });
  const eod = document.getElementById('eod-btn');
  if (eod) eod.onclick = () => setEod(state.dayKey);
  const eve = document.getElementById('evening-prayer');
  if (eve) eve.onclick = () => { state.prayerPanel = 'pm'; render(); };
  const dis = document.getElementById('prayer-dismiss');
  if (dis) dis.onclick = () => dismissPrayer(state.dayKey);
}

function doneBtn(dateKey, kind, id, label) {
  const on = isDone(dateKey, kind, id);
  return `<button type="button" class="done ${on?'on':''}" data-date="${dateKey}" data-kind="${kind}" data-id="${id}">${on ? 'DONE ✓' : (label || 'DONE')}</button>`;
}

function dayStrip(activeKey) {
  const week = weekKeys();
  return `<div class="days">${week.map(w => `
    <button type="button" class="day-btn ${w.key===activeKey?'active':''}" data-jump="${w.key}" data-jumpid="${w.id}">
      ${w.label}<span class="d">${w.key.slice(8)}</span>
    </button>`).join('')}</div>`;
}

function wireCommon() {
  document.querySelectorAll('[data-date][data-kind]').forEach(b => {
    b.onclick = () => toggleDone(b.dataset.date, b.dataset.kind, b.dataset.id);
  });
  document.querySelectorAll('[data-jump]').forEach(b => {
    b.onclick = () => {
      state.dayKey = b.dataset.jump;
      state.dayId = b.dataset.jumpid;
      state.mealDay = b.dataset.jumpid;
      state.review = false;
      state.prayerPanel = null;
      render();
    };
  });
  document.querySelectorAll('[data-mode]').forEach(b => {
    b.onclick = () => setWhoop(state.dayKey, b.dataset.mode);
  });
  const lockBtn = document.getElementById('lock-btn');
  if (lockBtn) lockBtn.onclick = () => lockNow();
  const reviewBtn = document.getElementById('review-btn');
  if (reviewBtn) reviewBtn.onclick = () => { state.review = !state.review; render(); };
  const diarySave = document.getElementById('diary-save');
  if (diarySave) diarySave.onclick = () => {
    const el = document.getElementById('diary-text');
    addDiary(state.dayKey, el.value, 'diary');
    el.value = '';
  };
  const voiceBtn = document.getElementById('voice-btn');
  const diaryText = document.getElementById('diary-text');
  if (voiceBtn && diaryText) wireVoice(voiceBtn, diaryText);
  wireDiary();
}

/** iPhone Home Screen PWAs often crash on SpeechRecognition — guard hard. */
function isIosStandalone() {
  const ua = navigator.userAgent || '';
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
  return iOS && standalone;
}

let _rec = null;
let _listening = false;

function wireVoice(voiceBtn, diaryText) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR || isIosStandalone()) {
    voiceBtn.textContent = 'Type diary (voice off on Home Screen)';
    voiceBtn.onclick = () => {
      diaryText.focus();
      showToast(isIosStandalone()
        ? 'Voice can crash the iPhone app — type here, or open in Safari for mic'
        : 'Voice not supported — type instead');
    };
    return;
  }

  voiceBtn.onclick = () => {
    if (_listening && _rec) {
      try { _rec.stop(); } catch (e) {}
      return;
    }
    try {
      if (_rec) {
        try { _rec.abort(); } catch (e) {}
        _rec = null;
      }
      const rec = new SR();
      _rec = rec;
      rec.lang = 'en-GB';
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 1;
      rec.onstart = () => {
        _listening = true;
        voiceBtn.textContent = 'Listening… tap to stop';
        showToast('Listening…');
      };
      rec.onresult = (e) => {
        try {
          let t = '';
          for (let i = 0; i < e.results.length; i++) {
            if (e.results[i] && e.results[i][0]) t += e.results[i][0].transcript;
          }
          t = (t || '').trim();
          if (!t) return;
          const box = document.getElementById('diary-text') || diaryText;
          box.value = (box.value ? box.value + ' ' : '') + t;
          showToast('Captured — tap Save diary');
        } catch (err) {
          showToast('Could not read speech — type instead');
        }
      };
      rec.onerror = (e) => {
        _listening = false;
        voiceBtn.textContent = 'Talk to diary';
        const err = (e && e.error) || '';
        if (err === 'not-allowed') showToast('Mic blocked — allow microphone or type');
        else if (err === 'no-speech') showToast('No speech heard — try again or type');
        else showToast('Voice error — type instead');
      };
      rec.onend = () => {
        _listening = false;
        voiceBtn.textContent = 'Talk to diary';
      };
      rec.start();
    } catch (err) {
      _listening = false;
      voiceBtn.textContent = 'Talk to diary';
      showToast('Voice failed — type your diary note');
    }
  };
}


function renderLock() {
  const setup = !hasPin();
  document.getElementById('tabs').style.display = 'none';
  document.getElementById('app').innerHTML = `
    <div class="topbar"><h1>Rich On Health</h1></div>
    <p class="meta">v12 · PIN gate</p>
    <p class="sub">${setup ? 'Set a PIN (min 4). Stays on this phone.' : 'Enter PIN to unlock.'}</p>
    <div class="card">
      <input class="field" id="pin-input" type="password" inputmode="numeric" autocomplete="one-time-code" placeholder="${setup?'Create PIN':'PIN'}" />
      ${setup ? '<input class="field" id="pin-confirm" type="password" inputmode="numeric" placeholder="Confirm PIN" />' : ''}
      <button class="btn accent" id="pin-go" type="button">${setup ? 'Save PIN & open' : 'Unlock'}</button>
      <p class="meta" id="pin-msg"></p>
    </div>`;
  document.getElementById('pin-go').onclick = async () => {
    const msg = document.getElementById('pin-msg');
    const pin = document.getElementById('pin-input').value.trim();
    try {
      if (setup) {
        const c = document.getElementById('pin-confirm').value.trim();
        if (pin !== c) { msg.textContent = 'PINs don’t match.'; return; }
        await setPin(pin);
      } else if (!(await tryUnlock(pin))) { msg.textContent = 'Wrong PIN.'; return; }
      document.getElementById('tabs').style.display = '';
      state.tab = 'today';
      const t = londonParts();
      state.dayKey = t.key; state.dayId = t.dow; state.mealDay = t.dow;
      render();
    } catch (e) { msg.textContent = e.message || 'Error'; }
  };
}

function renderWeekReview() {
  const week = weekKeys();
  const d = load();
  const bit = (ok, yes, no) => ok ? `<span class="ok">${yes}</span>` : `<span class="miss">${no}</span>`;
  const rows = week.map(w => {
    const bucket = (d.days && d.days[w.key]) || { dones:{}, diary:[] };
    const dones = bucket.dones || {};
    const on = (k) => !!(dones[k] && !String(k).endsWith(':at'));
    const mealN = Object.keys(dones).filter(k => k.startsWith('meals:') && !k.endsWith(':at') && dones[k]).length;
    const gym = on('gym:session') || on('gym:eased');
    const am = on('health:am-meds');
    const pm = on('health:pm-tab');
    const mind = on('mind:prayer-am') || on('mind:prayer-pm') || ['c7','c10','c13','c17','c20'].some(id => on('mind:'+id));
    const debt = on('debt:spoke') || on('debt:hold') || on('debt:phone');
    const visibleIntent = (bucket.intentions || []).filter((i) => !(bucket.rough && i.hideRough));
    const ticked = visibleIntent.filter((i) => i.done).length;
    const diaryNotes = (bucket.diary || []).length;
    const diaryBit = ticked ? bit(true, ticked+' ticked','') : (diaryNotes ? bit(true, diaryNotes+' notes','') : bit(false,'','diary —'));
    return `<div class="review-row"><span><strong>${w.label}</strong> ${w.key.slice(5)}</span>
      <span style="text-align:right;line-height:1.45">
        ${mealN ? bit(true, mealN+' meal', '') : bit(false,'','meals —')} ·
        ${bit(gym,'gym ✓','gym —')} ·
        ${bit(am,'am meds ✓','am —')} ·
        ${bit(pm,'night ✓','night —')}<br/>
        ${bit(mind,'mind ✓','mind —')} ·
        ${debt ? bit(true,'debt ✓','') : bit(false,'','debt —')} ·
        ${diaryBit}
      </span></div>`;
  }).join('');
  return `<div class="card"><h2>This week’s review</h2>
    <p class="meta">What held / what slipped — checklist only, not a failure scoreboard. One kinder next step when you plan.</p>
    <div class="review-grid">${rows}</div>
  </div>`;
}

function renderToday() {
  if (state.diary) return renderDiary();
  const dayId = state.dayId;
  const dateKey = state.dayKey;
  const meal = MEALS[dayId];
  const gym = GYM[dayId];
  const d = load();
  const bucket = (d.days && d.days[dateKey]) || { whoop:'normal', diary:[] };
  const mode = bucket.whoop || 'normal';
  const actions = {
    ease: 'Ease: show up lighter · eat breakfast · water · early tea · protect sleep.',
    normal: 'Normal: locked plates + planned session · steps ~10k floor.',
    protect: 'Protect sleep: early tea · kitchen closed · night tablet on time · phone down.'
  };
  if (state.review) {
    return `<div class="topbar"><h1>Week</h1>
      <div><button class="icon-btn" id="review-btn" type="button">Back</button>
      <button class="icon-btn" id="lock-btn" type="button">Lock</button></div></div>
      ${dayStrip(dateKey)}${renderWeekReview()}`;
  }
  const goal = stepGoal();
  const yday = live.steps && live.steps.yesterday;
  const carry = (live.steps && live.steps.carry) || 0;
  const stepsDone = isDone(dateKey, 'gym', 'steps');
  const pct = stepsDone ? 100 : Math.min(95, Math.round((0 / goal) * 100)); // progress fills when marked for now; Whoop live fill comes with morning sync
  const focus = (live.focus || actions[mode]);
  return `<div class="topbar"><h1>Today</h1>
    <div><button class="icon-btn" id="review-btn" type="button">Week</button>
    <button class="icon-btn" id="lock-btn" type="button">Lock</button></div></div>
    <p class="sub">${dateKey} · London</p>
    ${dayStrip(dateKey)}

    <div class="hero">
      <div class="kicker">${meal.training ? 'Training day' : 'Rest day'} · ${mode}</div>
      <div class="big">${focus}</div>
      <div class="step-box">
        <div class="ring" style="--p:${pct}%"><span>${Math.round(goal/1000)}k</span></div>
        <div>
          <strong>Steps today</strong>
          <div class="meta">Goal ${goal.toLocaleString('en-GB')}${carry ? ` (10k + ${carry.toLocaleString('en-GB')} carry)` : ''}</div>
          <div class="meta">${yday == null ? 'Yesterday: waiting on morning Whoop' : `Yesterday: ${Number(yday).toLocaleString('en-GB')} steps`}</div>
        </div>
      </div>
      <div style="margin-top:12px" class="row">${doneBtn(dateKey,'gym','steps')}<div class="meta">Mark when you’ve hit today’s step goal</div></div>
    </div>

    <div class="card next-card"><h2>Mode</h2>
      <p class="meta">${actions[mode]}</p>
      <div class="chips">
        <button type="button" class="day-btn ${mode==='ease'?'active':''}" data-mode="ease">Ease</button>
        <button type="button" class="day-btn ${mode==='normal'?'active':''}" data-mode="normal">Normal</button>
        <button type="button" class="day-btn ${mode==='protect'?'active':''}" data-mode="protect">Protect sleep</button>
      </div>
    </div>

    <div class="card"><h2>Plan · ${meal.title}</h2>
      <div class="plan-line"><strong>Gym</strong>${gym.session} — ${gym.note}</div>
      ${meal.meals.filter(m=>m.id!=='snack').map(m => `<div class="plan-line"><strong>${m.title}</strong>${m.items[0]}${m.items[1] ? ' · ' + m.items[1] : ''}</div>`).join('')}
      <div style="margin-top:10px" class="row">${doneBtn(dateKey,'gym','session')}<div class="meta">Gym showed up</div></div>
      <div style="margin-top:8px" class="row">${doneBtn(dateKey,'gym','eased','EASED')}<div class="meta">Lighter loads — still counts</div></div>
      ${meal.meals.map(m => `<div style="margin-top:8px" class="row">${doneBtn(dateKey,'meals', dayId+'-'+m.id)}<div><strong>${m.title}</strong></div></div>`).join('')}
    </div>

    <div class="card" id="diary-card">
      <h2>Diary</h2>
      <p class="meta">Intentions for today. Tick what happens.</p>
      <button class="btn accent" id="open-diary" type="button">Open diary</button>
    </div>`;
}

const PRAYER_AM = [
  "Thank You for this day.\nForgive me for what I held onto yesterday.\nHelp me take the first small step.\nAmen.",
  "Thank You for this day.\nHelp me be a good person in the next small thing, not in a speech.\nAmen.",
  "Thank You for this day.\nI want to be great at the work in front of me.\nStart me with one small step.\nAmen.",
  "Thank You for health in this body today.\nHelp me look after it in the next small step.\nAmen.",
  "Thank You for this day.\nI want wealth that is clean and earned.\nHelp me do the next honest piece of work.\nAmen.",
  "Thank You for this day.\nForgive me where I was harsh.\nHelp me be kinder in the next conversation.\nAmen.",
  "Thank You for this day.\nI don't have to fix everything this morning.\nHelp me be good, and take the first step.\nAmen."
];
const PRAYER_PM = [
  "Thank You for what got done.\nI forgive myself for what I left.\nRest is enough for tonight.\nAmen.",
  "Thank You for the moments I was a good person today.\nI put down the rest without punishing myself.\nAmen.",
  "Thank You for any greatness that was quiet today.\nWhat I didn't finish can wait.\nAmen.",
  "Thank You for the health I had today.\nThe body can rest now.\nAmen.",
  "Thank You for any honest work I did toward money.\nI put down what I didn't finish.\nAmen.",
  "Thank You for forgiveness I gave or received.\nI don't have to replay the day.\nAmen.",
  "Thank You for this day.\nI was not perfect.\nRest is enough for tonight.\nAmen."
];
function prayerForDay(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const utc = Date.UTC(y, m - 1, d);
  const start = Date.UTC(y, 0, 0);
  const doy = Math.floor((utc - start) / 86400000);
  const i = ((doy % 7) + 7) % 7;
  return { am: PRAYER_AM[i], pm: PRAYER_PM[i] };
}

function renderDiary() {
  const dateKey = state.dayKey;
  const d = ensureDiary(dateKey);
  const day = d.days[dateKey];
  const rough = !!day.rough;
  const all = day.intentions || [];
  const nightOn = nightTabletOn(day);
  const visible = all.filter((i) => !rough || roughShows(i.id, nightOn));
  const have = new Set(all.map((i) => i.id));
  const chips = DIARY_DEFAULTS.filter((x) => !have.has(x.id) && !(rough && !roughShows(x.id, nightOn)));
  const eod = !!day.eod || londonHour() >= 19;
  const open = visible.filter((i) => !i.done);
  const showAm = !day.prayerAmSeen && state.prayerPanel !== 'pm';
  const showPm = state.prayerPanel === 'pm';
  const prayerSet = prayerForDay(dateKey);
  const prayerBody = showPm ? prayerSet.pm : prayerSet.am;
  const prayer = (showAm || showPm) ? `<div class="card prayer-panel" id="prayer-panel">
      <h2>${showPm ? 'Evening prayer' : 'Morning prayer'}</h2>
      <div class="prayer">${esc(prayerBody)}</div>
      <button type="button" class="btn ghost" id="prayer-dismiss">Dismiss</button>
    </div>` : '';
  const rows = visible.map((i) => `<div class="intent ${i.done ? 'is-done' : ''}">
      <button type="button" class="done ${i.done ? 'on' : ''}" data-intent="${esc(i.id)}">${i.done ? '✓' : 'Tick'}</button>
      <div class="label">${esc(i.text)}</div>
      <button type="button" class="icon-btn" data-remove="${esc(i.id)}">Remove</button>
    </div>`).join('');
  const chipHtml = chips.length ? `<div class="chips">${chips.map((c) => `<button type="button" class="chip" data-add-preset="${esc(c.id)}">${esc(c.short)}</button>`).join('')}</div>` : '';
  const eodHtml = (eod && open.length) ? `<div class="card"><h2>Still open</h2>
      <p class="meta">One line on why. Ticked items stay as they are.</p>
      ${open.map((i) => `<div class="diary-item"><div>${esc(i.text)}</div>
        <input class="field" data-why="${esc(i.id)}" maxlength="240" placeholder="One line on why" value="${esc(i.why)}" /></div>`).join('')}
    </div>` : ((!eod && open.length) ? `<button class="btn ghost" id="eod-btn" type="button">End of day</button>` : '');
  return `<div class="topbar"><h1>Diary</h1>
      <div><button class="icon-btn" id="diary-back" type="button">Back</button>
      <button class="icon-btn" id="lock-btn" type="button">Lock</button></div></div>
    <p class="sub">${esc(dateKey)} · London</p>
    ${dayStrip(dateKey)}
    ${prayer}
    <div class="card">
      <button type="button" class="day-btn ${rough ? 'active' : ''}" id="rough-btn" aria-pressed="${rough ? 'true' : 'false'}">${rough ? 'Rough morning on' : 'Rough morning'}</button>
      <p class="meta">${rough
        ? (nightOn
          ? 'Only the first alarm, morning meds, and the night tablet are on the list.'
          : 'Only the first alarm and morning meds are on the list. The night tablet shows from 17:00, or when end of day is open.')
        : 'If the morning is rough, only the first alarm and morning meds stay on the list until evening. The night tablet shows from 17:00, or when end of day is open.'}</p>
    </div>
    <div class="card"><h2>Intentions</h2>
      <p class="meta">Tick what happens. Add or remove a line.</p>
      ${rows || '<p class="meta">Nothing on the list.</p>'}
    </div>
    <div class="card"><h2>Add</h2>
      ${chipHtml}
      <input class="field" id="intent-text" maxlength="140" placeholder="Add an intention" autocomplete="off" />
      <button class="btn accent" id="intent-add" type="button">Add</button>
    </div>
    ${eodHtml}
    <button class="btn ghost" id="evening-prayer" type="button">Evening prayer</button>`;
}


function renderMeals() {
  const dayId = state.mealDay || state.dayId;
  const dateKey = state.dayKey;
  const m = MEALS[dayId];
  return `<div class="topbar"><h1>Meals</h1></div>
    <p class="sub">~2600 / ~200 g protein · early tea · kitchen closed</p>
    ${dayStrip(dateKey)}
    <h2>${m.title}</h2>
    ${m.meals.map(meal => `<div class="card"><div class="row">${doneBtn(dateKey,'meals', dayId+'-'+meal.id)}<div style="flex:1">
      <strong>${meal.title}</strong>
      <ul>${meal.items.map(i=>`<li>${i}</li>`).join('')}</ul>
      <ol>${meal.steps.map(i=>`<li>${i}</li>`).join('')}</ol>
    </div></div></div>`).join('')}`;
}

function renderGym() {
  const dateKey = state.dayKey; const g = GYM[state.dayId];
  return `<div class="topbar"><h1>Gym</h1></div>
    <p class="sub">PT Mon/Wed/Fri 10:00 · Tue class 9:00 · ~10k steps</p>
    ${dayStrip(dateKey)}
    <div class="card"><div class="row">${doneBtn(dateKey,'gym','session')}<div><strong>${g.session}</strong><div class="meta">${g.note}</div></div></div>
      <div style="margin-top:8px" class="row">${doneBtn(dateKey,'gym','eased','EASED')}<div class="meta">Lighter — still showed up</div></div>
    </div>
    <div class="card"><div class="row">${doneBtn(dateKey,'gym','steps')}<div><strong>${stepGoal().toLocaleString('en-GB')} steps</strong><div class="meta">Base 10k + carry from shortfall (cap +5k). Floor, not extra HIIT.</div></div></div></div>
    <p class="note">If voice turns into punish/grind — stop. Ease + show up is the rail.</p>`;
}

function renderHealth() {
  const dateKey = state.dayKey;
  return `<div class="topbar"><h1>Health</h1></div>
    <p class="sub">Rails only — not a diagnosis</p>
    ${dayStrip(dateKey)}
    <div class="card"><div class="row">${doneBtn(dateKey,'health','am-meds')}<div><strong>Morning meds</strong><div class="meta">As prescribed — with breakfast</div></div></div></div>
    <div class="card"><div class="row">${doneBtn(dateKey,'health','water')}<div><strong>Water ~3–3.5 L</strong><div class="meta">Roughly on track</div></div></div></div>
    <div class="card"><div class="row">${doneBtn(dateKey,'health','pm-tab')}<div><strong>Night tablet ~8:00–8:30</strong><div class="meta">After kitchen closed</div></div></div></div>
    <div class="card"><div class="row">${doneBtn(dateKey,'health','jolt')}<div><strong>Evening jolt?</strong><div class="meta">Optional checklist</div></div></div></div>
    <div class="card"><div class="row">${doneBtn(dateKey,'health','snus')}<div><strong>Last snus logged</strong><div class="meta">Note the time in Diary</div></div></div></div>
    <div class="card"><strong>Open reminder</strong><div class="meta">Dr follow-up · creatine held until cleared</div></div>`;
}

function renderMind() {
  const dateKey = state.dayKey;
  return `<div class="topbar"><h1>Mind</h1></div>
    <p class="sub">Check-ins · not a score</p>
    ${dayStrip(dateKey)}
    <div class="card"><strong>Prayer</strong><div class="meta">Morning and evening prayer open on Diary.</div></div>
    <div class="card"><strong>Check-ins</strong>
      <ul><li>7am gratitude / affirmation / win</li><li>10am steady / rushed / talking down</li><li>1pm depleted / wired / steady</li><li>5pm follow-through + kinder sentence</li><li>8pm put down + kind close</li></ul>
      <div class="row">${doneBtn(dateKey,'mind','c7','7am')}${doneBtn(dateKey,'mind','c10','10am')}${doneBtn(dateKey,'mind','c13','1pm')}</div>
      <div class="row" style="margin-top:8px">${doneBtn(dateKey,'mind','c17','5pm')}${doneBtn(dateKey,'mind','c20','8pm')}</div>
    </div>`;
}

function renderDebt() {
  const dateKey = state.dayKey;
  return `<div class="topbar"><h1>Debt</h1></div>
    <p class="sub">Status only on this public app · open on call-block days</p>
    ${dayStrip(dateKey)}
    <div class="card"><strong>Pinned</strong><div class="meta">${DEBT.pinned}</div></div>
    <div class="card"><strong>Holds</strong><ul>${DEBT.holds.map(h=>`<li><strong>${h.name}</strong> · ${h.status} · until ${h.until}</li>`).join('')}</ul></div>
    <div class="card"><strong>Open</strong><ul>${DEBT.open.map(h=>`<li><strong>${h.name}</strong> · ${h.next}</li>`).join('')}</ul>
      <div class="meta">${DEBT.avoid}</div></div>
    <div class="card">
      <div class="row">${doneBtn(dateKey,'debt','spoke','SPOKE')}<div class="meta">Spoke today</div></div>
      <div class="row" style="margin-top:8px">${doneBtn(dateKey,'debt','hold','HOLD')}<div class="meta">Hold secured</div></div>
      <div class="row" style="margin-top:8px">${doneBtn(dateKey,'debt','phone','PHONE DOWN')}<div class="meta">Block finished</div></div>
    </div>`;
}

function renderLearn() {
  const dateKey = state.dayKey;
  return `<div class="topbar"><h1>Learn · FX</h1></div>
    <p class="sub">Education rails only — not trading advice. Demo before live. Money you can lose only.</p>
    ${dayStrip(dateKey)}
    <div class="card"><p class="note">No signals, no “guaranteed” bots, no depositing to random apps. If it promises riches, skip it.</p></div>
    ${LEARN.map(l => `<div class="card"><div class="row">${doneBtn(dateKey,'learn', l.id)}<div style="flex:1">
      <strong>${l.title}</strong><div class="meta" style="margin-top:6px">${l.body}</div>
    </div></div></div>`).join('')}
    <div class="card"><h2>Today’s study note</h2>
      <p class="meta">Save one thing you learned into the Diary on Today — keeps the week review honest.</p>
    </div>`;
}

function render() {
  if (!hasPin() || !isUnlocked()) { renderLock(); return; }
  const app = document.getElementById('app');
  const tabs = document.getElementById('tabs');
  tabs.style.display = '';
  tabs.innerHTML = TABS.map(t => `<button type="button" class="tab ${state.tab===t.id?'active':''}" data-tab="${t.id}">${t.label}</button>`).join('');
  const map = { today:renderToday, meals:renderMeals, gym:renderGym, health:renderHealth, mind:renderMind, debt:renderDebt, learn:renderLearn };
  app.innerHTML = map[state.tab]();
  tabs.querySelectorAll('.tab').forEach(b => b.onclick = () => {
    state.tab = b.dataset.tab;
    state.review = false;
    state.diary = false;
    state.prayerPanel = null;
    if (b.dataset.tab==='today') { const t=londonParts(); state.dayKey=t.key; state.dayId=t.dow; }
    render();
  });
  wireCommon();
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
document.addEventListener('DOMContentLoaded', async () => {
  const t = londonParts();
  state.dayKey = t.key; state.dayId = t.dow; state.mealDay = t.dow; state.tab = 'today';
  await refreshLive();
  render();
});
