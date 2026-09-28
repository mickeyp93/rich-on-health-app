const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'meals', label: 'Meals' },
  { id: 'gym', label: 'Gym' },
  { id: 'health', label: 'Health' },
  { id: 'mind', label: 'Mind' },
  { id: 'debt', label: 'Debt' }
];

const STORE = 'roh-v2';
const PIN_KEY = 'roh-pin-hash';
const UNLOCK_KEY = 'roh-unlocked-session';

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
  if ((await sha256(pin)) === hash) {
    sessionStorage.setItem(UNLOCK_KEY, '1');
    return true;
  }
  return false;
}

function renderLock() {
  const setup = !hasPin();
  document.getElementById('tabs').style.display = 'none';
  document.getElementById('app').innerHTML = `
    <h1>Rich On Health</h1>
    <p class="meta">v5 · PIN gate</p>
    <p class="sub">${setup ? 'Set a PIN to protect this app on your phone (min 4 characters).' : 'Enter your PIN to unlock.'}</p>
    <div class="card">
      <input class="field" id="pin-input" type="password" inputmode="numeric" autocomplete="one-time-code" placeholder="${setup ? 'Create PIN' : 'PIN'}" />
      ${setup ? '<input class="field" id="pin-confirm" type="password" inputmode="numeric" placeholder="Confirm PIN" />' : ''}
      <button class="btn accent" id="pin-go" type="button">${setup ? 'Save PIN & open' : 'Unlock'}</button>
      <p class="meta" id="pin-msg"></p>
      <p class="note">PIN stays on this phone only. It does not make the public web link private.</p>
    </div>`;
  const go = document.getElementById('pin-go');
  const msg = document.getElementById('pin-msg');
  go.onclick = async () => {
    const pin = document.getElementById('pin-input').value.trim();
    try {
      if (setup) {
        const c = document.getElementById('pin-confirm').value.trim();
        if (pin !== c) { msg.textContent = 'PINs don’t match.'; return; }
        await setPin(pin);
      } else {
        if (!(await tryUnlock(pin))) { msg.textContent = 'Wrong PIN.'; return; }
      }
      document.getElementById('tabs').style.display = '';
      render();
    } catch (e) {
      msg.textContent = e.message || 'Could not set PIN.';
    }
  };
}


const MEALS = {
  mon: {
    title: 'Monday', training: true,
    meals: [
      { id: 'breakfast', title: 'Breakfast', items: ['4 eggs + spinach', 'Toast', 'Mid-morning: 200 g 0% yoghurt + berries'], steps: ['Cook eggs with spinach.', 'Toast on the side.', 'Yoghurt + berries mid-morning.'] },
      { id: 'lunch', title: 'Lunch', items: ['Chicken 200 g raw', '1 rice pouch (~250 g)', 'Half salad bag (80–100 g)', '1 tsp olive oil'], steps: ['Season chicken; pan 6–8 min/side; rest 2 min.', 'Microwave rice.', 'Salad + oil + chicken + rice.'] },
      { id: 'tea', title: 'Early tea (6:30–7)', items: ['Batch chilli portion (~180–200 g mince)', 'No full second rice if lunch had rice', 'Yoghurt + salad/veg (or half pouch max)'], steps: ['Serve chilli from cooker.', 'Skip full rice if lunch used a pouch.', 'Fridge Wed+Fri portions when cool.', 'Kitchen closed before tablet.'], note: 'Batch: ~550–600 g mince + 2 onions + 3–4 garlic + 2×400 g tomatoes + 2 tins beans + 150–200 ml stock + spices. Low 3–4h / high 1½–2h.' },
      { id: 'snack', title: 'Snack (optional)', items: ['Only if planned — yoghurt/fruit, not grazing'], steps: ['Mark Done only if you had one.'] }
    ]
  },
  tue: {
    title: 'Tuesday', training: true,
    meals: [
      { id: 'breakfast', title: 'Breakfast', items: ['4 eggs + spinach', 'Toast', '200 g yoghurt + berries'], steps: ['Same breakfast rail.'] },
      { id: 'lunch', title: 'Lunch', items: ['Chicken ~200 g', 'Carb (rice/potato/pitta)', 'Salad'], steps: ['Training-day chicken + carb.'] },
      { id: 'tea', title: 'Early tea (6:30–7)', items: ['Chicken traybake or stir-fry ~200 g', 'Veg', 'Modest carb'], steps: ['Cook chicken + veg.', 'Kitchen closed after.'] },
      { id: 'snack', title: 'Snack (optional)', items: ['Only if planned'], steps: ['Mark Done only if you had one.'] }
    ]
  },
  wed: {
    title: 'Wednesday', training: true,
    meals: [
      { id: 'breakfast', title: 'Breakfast', items: ['4 eggs + spinach', 'Toast', '200 g yoghurt + berries'], steps: ['Same breakfast rail.'] },
      { id: 'lunch', title: 'Lunch', items: ['Chicken ~200 g', 'Carb + salad'], steps: ['Training-day lunch.'] },
      { id: 'tea', title: 'Early tea (6:30–7)', items: ['Fridge chilli portion', 'Pasta or rice'], steps: ['Reheat chilli.', 'Pasta for variety or rice pouch.', 'Kitchen closed after.'] },
      { id: 'snack', title: 'Snack (optional)', items: ['Only if planned'], steps: ['Mark Done only if you had one.'] }
    ]
  },
  thu: {
    title: 'Thursday', training: false,
    meals: [
      { id: 'breakfast', title: 'Breakfast', items: ['4 eggs + spinach', 'Toast', '200 g yoghurt + berries'], steps: ['Same breakfast rail.'] },
      { id: 'lunch', title: 'Lunch', items: ['Chicken ~200 g', 'Lighter carb OK', 'Extra veg/salad'], steps: ['Rest-day: protein + veg, lighter carb.'] },
      { id: 'tea', title: 'Early tea (6:30–7)', items: ['Chicken traybake/stir-fry ~200 g', 'Veg-heavy'], steps: ['Chicken + veg.', 'Kitchen closed after.'] },
      { id: 'snack', title: 'Snack (optional)', items: ['Only if planned'], steps: ['Mark Done only if you had one.'] }
    ]
  },
  fri: {
    title: 'Friday', training: true,
    meals: [
      { id: 'breakfast', title: 'Breakfast', items: ['4 eggs + spinach', 'Toast', '200 g yoghurt + berries'], steps: ['Same breakfast rail.'] },
      { id: 'lunch', title: 'Lunch', items: ['Chicken ~200 g', 'Carb + salad'], steps: ['Training-day lunch.'] },
      { id: 'tea', title: 'Early tea (6:30–7)', items: ['Last chilli portion', '1 rice pouch', 'Optional yoghurt'], steps: ['Reheat chilli + rice.', 'Kitchen closed after.'] },
      { id: 'snack', title: 'Snack (optional)', items: ['Only if planned'], steps: ['Mark Done only if you had one.'] }
    ]
  }
};

const GYM = {
  mon: { session: 'PT 10:00', note: 'Egg breakfast before PT — don’t go empty. Rebuild / knees-aware.' },
  tue: { session: 'Class 9:00', note: 'Show up; loads as planned.' },
  wed: { session: 'PT 10:00', note: 'Egg breakfast before PT.' },
  thu: { session: 'Rest / walk', note: 'Steps ~10k floor — not a fourth hard session.' },
  fri: { session: 'PT 10:00', note: 'Egg breakfast before PT.' }
};

const DEBT = {
  pinned: 'Job start pinned in room — ask Debt for date if needed',
  holds: [
    { name: 'Moorcroft (×2)', status: 'On hold', until: 'Early Nov' },
    { name: 'Tesco loan', status: 'On hold', until: 'Late Oct' },
    { name: 'Zinc / NatWest', status: 'On hold', until: 'Late Oct' }
  ],
  open: [
    { name: 'Barclaycard', next: 'Next call block' },
    { name: 'Very Pay', next: 'After Barclaycard' },
    { name: 'Littlewoods', next: 'After Very' },
    { name: 'Jacamo', next: 'With Littlewoods' },
    { name: 'Fluro', next: 'Watch — default in progress' },
    { name: 'Zopa', next: 'Watching mail' }
  ],
  avoid: ['Do-not-contact list — ask Debt before dialling']
};

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
Watch over my rest; let the tablet do its work.
I am still building. That is enough for tonight.
Amen / so it is.`;

function todayKey() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function dowId() {
  const w = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short' }).format(new Date());
  const map = { Mon: 'mon', Tue: 'tue', Wed: 'wed', Thu: 'thu', Fri: 'fri', Sat: 'mon', Sun: 'mon' };
  return map[w] || 'mon';
}

function load() {
  try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; }
}
function save(data) { localStorage.setItem(STORE, JSON.stringify(data)); }

function isDone(kind, id) {
  const d = load();
  const day = d[todayKey()] || {};
  return !!(day[kind] && day[kind][id]);
}

function toggleDone(kind, id) {
  const d = load();
  const key = todayKey();
  d[key] = d[key] || {};
  d[key][kind] = d[key][kind] || {};
  d[key][kind][id] = !d[key][kind][id];
  d[key][kind][id + '_at'] = new Date().toISOString();
  save(d);
  // stash a sync queue Habits can read later when online sync exists
  d._queue = d._queue || [];
  d._queue.push({ at: new Date().toISOString(), kind, id, done: d[key][kind][id], day: key });
  save(d);
  render();
}

function setWhoopMode(mode) {
  const d = load();
  d.whoop = { mode, at: new Date().toISOString() };
  save(d);
  render();
}

function addJournal(tab, text) {
  if (!text || !text.trim()) return;
  const d = load();
  const key = todayKey();
  d[key] = d[key] || {};
  d[key].journal = d[key].journal || [];
  d[key].journal.push({ tab, text: text.trim(), at: new Date().toISOString() });
  save(d);
  render();
}

function spiralNudge() {
  return `<p class="note">If this turns into a spiral (self-attack, “my heart’s failing,” grind-punish), stop logging — tell the room or call Dr/111 if symptoms are urgent.</p>`;
}

function doneBtn(kind, id, label) {
  const on = isDone(kind, id);
  return `<button class="done ${on ? 'on' : ''}" data-kind="${kind}" data-id="${id}">${on ? 'DONE ✓' : (label || 'DONE')}</button>`;
}

function voiceBlock(tab) {
  return `<div class="voice card">
    <div class="muted">Voice note (short facts only)</div>
    <button class="btn ghost" id="voice-btn" type="button">Hold to talk / tap to start</button>
    <textarea class="field" id="voice-text" rows="3" placeholder="Or type a short note…"></textarea>
    <button class="btn accent" id="voice-save" type="button">Save note</button>
    <div class="voice-log" id="voice-status"></div>
  </div>`;
}

function wireVoice(tab) {
  const btn = document.getElementById('voice-btn');
  const status = document.getElementById('voice-status');
  const text = document.getElementById('voice-text');
  const saveBtn = document.getElementById('voice-save');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec;
  if (SR) {
    rec = new SR();
    rec.lang = 'en-GB';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      text.value = t;
      status.textContent = 'Listening…';
    };
    rec.onerror = () => { status.textContent = 'Mic error — type instead.'; };
    rec.onend = () => { status.textContent = 'Stopped. Save if it looks right.'; };
    btn.onclick = () => { try { rec.start(); status.textContent = 'Listening…'; } catch (e) { status.textContent = 'Mic busy — try again.'; } };
  } else {
    btn.onclick = () => { status.textContent = 'Voice not supported on this browser — type below.'; };
  }
  saveBtn.onclick = () => {
    const v = text.value.trim();
    if (!v) return;
    const lower = v.toLowerCase();
    if (/(punish|i'm broken|heart.?fail|grind harder|what if mark)/i.test(lower)) {
      status.textContent = 'Sounds like a spiral — not saving that dump. Close the note. Tell the room or Dr/111 if needed.';
      text.value = '';
      return;
    }
    addJournal(tab, v);
    text.value = '';
    status.textContent = 'Saved (checklist note, not a score).';
  };
}

function renderToday() {
  const d = load();
  const mode = (d.whoop && d.whoop.mode) || 'normal';
  const day = dowId();
  const gym = GYM[day];
  const actions = {
    ease: 'Ease day: still show up to gym lighter; eat breakfast; water first; early tea; protect sleep.',
    normal: 'Normal day: locked plates + planned session. Steps ~10k floor.',
    protect: 'Protect sleep: early tea, kitchen closed, tablet on time, put the phone down.'
  };
  return `<h1>Today <button class="day-btn" id="lock-btn" type="button" style="float:right;min-width:auto;padding:6px 10px;font-size:0.75rem">Lock</button></h1>
    <p class="sub">${todayKey()} · Europe/London · Whoop → action only (Habits fills this after the morning pull)</p>
    <div class="chips">
      <span class="chip">Mode: ${mode}</span>
      <span class="chip">${MEALS[day].training ? 'Training' : 'Rest'}</span>
    </div>
    <div class="card"><strong>What to do</strong><p class="meta">${actions[mode]}</p>
      <div class="chips">
        <button class="day-btn ${mode==='ease'?'active':''}" data-mode="ease">Ease</button>
        <button class="day-btn ${mode==='normal'?'active':''}" data-mode="normal">Normal</button>
        <button class="day-btn ${mode==='protect'?'active':''}" data-mode="protect">Protect sleep</button>
      </div>
      <p class="muted">Green/yellow → planned session. Red/low → show up lighter. Never undereat off a bad score. Never invent HIIT.</p>
    </div>
    <div class="card"><div class="row">${doneBtn('today','focus','DONE')}<div><strong>One focus</strong><div class="meta">Show up for rails — not a score.</div><div class="muted">Gym: ${gym.session}</div></div></div></div>
    ${voiceBlock('today')}`;
}

function renderMeals() {
  let day = state.mealDay || dowId();
  if (!MEALS[day]) day = 'mon';
  const m = MEALS[day];
  return `<h1>Meals</h1>
    <p class="sub">~2600 kcal / ~200 g protein · tea 6:30–7 · kitchen closed · no creatine</p>
    <div class="days">${Object.keys(MEALS).map(k => `<button class="day-btn ${k===day?'active':''}" data-mealday="${k}">${k[0].toUpperCase()+k.slice(1)}</button>`).join('')}</div>
    <h2>${m.title}</h2>
    ${m.meals.map(meal => `<div class="card"><div class="row">${doneBtn('meals', day+'-'+meal.id)}<div style="flex:1"><strong>${meal.title}</strong>
      <ul>${meal.items.map(i=>`<li>${i}</li>`).join('')}</ul>
      <ol>${meal.steps.map(i=>`<li>${i}</li>`).join('')}</ol>
      ${meal.note?`<p class="note">${meal.note}</p>`:''}
    </div></div></div>`).join('')}
    ${voiceBlock('meals')}`;
}

function renderGym() {
  const day = dowId();
  const g = GYM[day];
  return `<h1>Gym</h1>
    <p class="sub">Mon/Wed/Fri PT 10:00 · Tue class 9:00 · Thu rest/walk · ~10k steps</p>
    <div class="card"><div class="row">${doneBtn('gym','session','DONE')}<div><strong>Today: ${g.session}</strong><div class="meta">${g.note}</div></div></div>
      <div style="margin-top:8px" class="row">${doneBtn('gym','eased','EASED')}<div class="meta">Use Eased if loads were lighter — still counts as showing up.</div></div>
    </div>
    <div class="card"><div class="row">${doneBtn('gym','steps','DONE')}<div><strong>~10k steps</strong><div class="meta">Floor, not a fourth hard session.</div></div></div></div>
    ${spiralNudge()}
    ${voiceBlock('gym')}`;
}

function renderHealth() {
  return `<h1>Health</h1>
    <p class="sub">Rails only — not a diagnosis. No Whoop numbers here.</p>
    <div class="card"><div class="row">${doneBtn('health','art')} <div><strong>Morning ART</strong><div class="meta">As prescribed — with breakfast (details not stored on this public app)</div></div></div></div>
    <div class="card"><div class="row">${doneBtn('health','water')} <div><strong>Water ~3–3.5 L</strong><div class="meta">Roughly on track (PT days especially)</div></div></div></div>
    <div class="card"><div class="row">${doneBtn('health','mirta')} <div><strong>Mirtazapine ~8:00–8:30</strong><div class="meta">After kitchen closed · clinic overrides</div></div></div></div>
    <div class="card"><div class="row">${doneBtn('health','jolt')} <div><strong>Evening jolt?</strong><div class="meta">Optional yes/no — checklist only</div></div></div></div>
    <div class="card"><div class="row">${doneBtn('health','snus')} <div><strong>Last snus logged</strong><div class="meta">Voice/type the time in the note</div></div></div></div>
    <div class="card"><strong>Open reminder</strong><div class="meta">Dr / urology follow-up · creatine held until cleared</div></div>
    ${spiralNudge()}
    ${voiceBlock('health')}`;
}

function renderMind() {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }).format(new Date()));
  const evening = hour >= 17;
  return `<h1>Mind</h1>
    <p class="sub">Prompts + prayer · checklist, not a holiness score · 8pm ends kind</p>
    <div class="card">
      <strong>Morning prayer</strong>
      <div class="prayer">${PRAYER_AM}</div>
      <div class="row">${doneBtn('mind','prayer-am')}<div class="meta">With the 7am set-up</div></div>
    </div>
    <div class="card">
      <strong>Check-in prompts</strong>
      <ul>
        <li>7am — gratitude / affirmation / one win + prayer</li>
        <li>10am — steady / rushed / talking down + one thing that counts</li>
        <li>1pm — depleted / wired / steady + water/food/boundary/pause</li>
        <li>5pm — follow-through vs always-on + kinder sentence</li>
        <li>8pm — put it down + one true thing done well + kind close</li>
      </ul>
      <div class="row">${doneBtn('mind','checkin')} <div class="meta">Mark when you did today’s due prompt</div></div>
    </div>
    <div class="card">
      <strong>Evening prayer / kind close</strong>
      <div class="prayer">${PRAYER_PM}</div>
      <div class="row">${doneBtn('mind','prayer-pm')}<div class="meta">Hard stop after — no late open dump</div></div>
    </div>
    ${evening ? '<p class="note">Evening window — end kind, then stop.</p>' : ''}
    ${spiralNudge()}
    ${voiceBlock('mind')}`;
}

function renderDebt() {
  return `<h1>Debt</h1>
    <p class="sub">Status only on this public app · refs/balances live with Debt in the room · not a daily must</p>
    <div class="card"><strong>Pinned</strong><div class="meta">${DEBT.pinned}</div></div>
    <div class="card"><strong>Holds (28 Sep)</strong>
      <ul>${DEBT.holds.map(h=>`<li><strong>${h.name}</strong> · ${h.status} · until ${h.until}</li>`).join('')}</ul>
    </div>
    <div class="card"><strong>Open (call order)</strong>
      <ul>${DEBT.open.map(h=>`<li><strong>${h.name}</strong> · ${h.next}</li>`).join('')}</ul>
      <div class="meta">${DEBT.avoid}</div>
    </div>
    <div class="card">
      <div class="row">${doneBtn('debt','spoke','SPOKE')}<div class="meta">Spoke to someone today</div></div>
      <div class="row" style="margin-top:8px">${doneBtn('debt','hold','HOLD')}<div class="meta">Hold secured</div></div>
      <div class="row" style="margin-top:8px">${doneBtn('debt','phone','PHONE DOWN')}<div class="meta">Put the phone down after the block</div></div>
    </div>
    ${spiralNudge()}
    ${voiceBlock('debt')}`;
}

const state = { tab: 'today', mealDay: dowId() };

function render() {
  if (!hasPin() || !isUnlocked()) { renderLock(); return; }
  const app = document.getElementById('app');
  const tabs = document.getElementById('tabs');
  tabs.style.display = '';
  tabs.innerHTML = TABS.map(t => `<button class="tab ${state.tab===t.id?'active':''}" data-tab="${t.id}">${t.label}</button>`).join('');
  const map = { today: renderToday, meals: renderMeals, gym: renderGym, health: renderHealth, mind: renderMind, debt: renderDebt };
  app.innerHTML = map[state.tab]();

  tabs.querySelectorAll('.tab').forEach(b => b.onclick = () => { state.tab = b.dataset.tab; render(); });
  app.querySelectorAll('[data-kind]').forEach(b => b.onclick = () => toggleDone(b.dataset.kind, b.dataset.id));
  app.querySelectorAll('[data-mealday]').forEach(b => b.onclick = () => { state.mealDay = b.dataset.mealday; render(); });
  app.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => setWhoopMode(b.dataset.mode));
  wireVoice(state.tab);
  const lockBtn = document.getElementById('lock-btn');
  if (lockBtn) lockBtn.onclick = () => lockNow();
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
document.addEventListener('DOMContentLoaded', render);
