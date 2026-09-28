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

const PRAYER_AM = `Morning prayer / manifest (≈5 min)

Show up for this day.
Thank You for breath, for another chance to follow through.
I ask for steadiness — body, mind, and the work in front of me.
Help me keep the rails: food, training, meds, kindness.
I release what I cannot fix in this hour.
Amen / so it is.`;

const PRAYER_PM = `Evening prayer / kind close (≈5 min)

Thank You for what got done today — even the small things.
I put the phone and the spiral down until morning.
I forgive the missed bits without punishing myself.
Watch over my rest; let the night tablet do its work.
I am still building. That is enough for tonight.
Amen / so it is.`;

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
  // Mon-Sun of current London week containing today
  const now = new Date();
  const { key, dow } = londonParts(now);
  const idx = DAY_IDS.indexOf(dow);
  // Build from today going back/forward using noon UTC tricks — simpler: store relative dates
  const today = new Date(key + 'T12:00:00Z');
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - idx);
  return DAY_IDS.map((id, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
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

const state = { tab: 'today', dayKey: londonParts().key, dayId: londonParts().dow, mealDay: londonParts().dow, review: false };

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
  if (voiceBtn && diaryText) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      voiceBtn.onclick = () => showToast('Voice not supported — type instead');
    } else {
      const rec = new SR();
      rec.lang = 'en-GB';
      rec.onresult = (e) => {
        let t = '';
        for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
        diaryText.value = (diaryText.value ? diaryText.value + ' ' : '') + t;
      };
      voiceBtn.onclick = () => { try { rec.start(); showToast('Listening…'); } catch (e) { showToast('Mic busy'); } };
    }
  }
}

function renderLock() {
  const setup = !hasPin();
  document.getElementById('tabs').style.display = 'none';
  document.getElementById('app').innerHTML = `
    <div class="topbar"><h1>Rich On Health</h1></div>
    <p class="meta">v7 · PIN gate</p>
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
  const rows = week.map(w => {
    const bucket = (d.days && d.days[w.key]) || { dones:{}, diary:[] };
    const dones = Object.keys(bucket.dones || {}).filter(k => !k.endsWith(':at') && bucket.dones[k]);
    const meals = dones.filter(k => k.startsWith('meals:')).length;
    const gym = dones.some(k => k === 'gym:session' || k === 'gym:eased');
    const diary = (bucket.diary || []).length;
    return `<div class="review-row"><span><strong>${w.label}</strong> ${w.key.slice(5)}</span>
      <span>${meals ? `<span class="ok">${meals} meal ✓</span>` : '<span class="miss">meals —</span>'} ·
      ${gym ? '<span class="ok">gym ✓</span>' : '<span class="miss">gym —</span>'} ·
      ${diary ? `<span class="ok">${diary} diary</span>` : '<span class="miss">diary —</span>'}</span></div>`;
  }).join('');
  return `<div class="card"><h2>This week’s review</h2>
    <p class="meta">Checklist snapshot — not a score. Use it Friday night / Sunday to plan.</p>
    <div class="review-grid">${rows}</div>
  </div>`;
}

function renderToday() {
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
  const diaryHtml = (bucket.diary || []).slice().reverse().map(x => `
    <div class="diary-item"><div class="meta">${new Date(x.at).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} · ${x.tag}</div>
    <div>${x.text}</div></div>`).join('') || '<p class="meta">No diary yet today — tell Habits what to add, or log how the day went.</p>';

  return `<div class="topbar"><h1>Today</h1>
    <div><button class="icon-btn" id="review-btn" type="button">Week</button>
    <button class="icon-btn" id="lock-btn" type="button">Lock</button></div></div>
    <p class="sub">${dateKey} · Europe/London</p>
    ${dayStrip(dateKey)}
    <div class="chips"><span class="chip on">Mode: ${mode}</span><span class="chip">${meal.training ? 'Training' : 'Rest'}</span></div>

    <div class="card"><h2>What to do</h2>
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

    <div class="card"><h2>Diary</h2>
      <p class="meta">Tell Habits what to add, or log the day. Saves on this phone.</p>
      <button class="btn ghost" id="voice-btn" type="button">Talk to diary</button>
      <textarea class="field" id="diary-text" rows="3" placeholder="What happened / what to add…"></textarea>
      <button class="btn accent" id="diary-save" type="button">Save diary</button>
      <div style="margin-top:12px">${diaryHtml}</div>
    </div>`;
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
    <div class="card"><div class="row">${doneBtn(dateKey,'gym','steps')}<div><strong>~10k steps</strong><div class="meta">Floor, not extra HIIT</div></div></div></div>
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
    <p class="sub">Prompts + prayer · checklist not a score</p>
    ${dayStrip(dateKey)}
    <div class="card"><strong>Morning prayer</strong><div class="prayer">${PRAYER_AM}</div>
      <div class="row">${doneBtn(dateKey,'mind','prayer-am')}<div class="meta">With 7am set-up</div></div></div>
    <div class="card"><strong>Check-ins</strong>
      <ul><li>7am gratitude / affirmation / win</li><li>10am steady / rushed / talking down</li><li>1pm depleted / wired / steady</li><li>5pm follow-through + kinder sentence</li><li>8pm put down + kind close</li></ul>
      <div class="row">${doneBtn(dateKey,'mind','c7','7am')}${doneBtn(dateKey,'mind','c10','10am')}${doneBtn(dateKey,'mind','c13','1pm')}</div>
      <div class="row" style="margin-top:8px">${doneBtn(dateKey,'mind','c17','5pm')}${doneBtn(dateKey,'mind','c20','8pm')}</div>
    </div>
    <div class="card"><strong>Evening prayer</strong><div class="prayer">${PRAYER_PM}</div>
      <div class="row">${doneBtn(dateKey,'mind','prayer-pm')}<div class="meta">Hard stop after</div></div></div>`;
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
  tabs.querySelectorAll('.tab').forEach(b => b.onclick = () => { state.tab = b.dataset.tab; state.review = false; if (b.dataset.tab==='today') { const t=londonParts(); state.dayKey=t.key; state.dayId=t.dow; } render(); });
  wireCommon();
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
document.addEventListener('DOMContentLoaded', () => {
  const t = londonParts();
  state.dayKey = t.key; state.dayId = t.dow; state.mealDay = t.dow; state.tab = 'today';
  render();
});
