const STORAGE_KEY = 'if_students_v2'; // dinaikkan agar data dummy lama di browser tidak terbawa
const PER_PAGE = 5;
const EMAIL_DOMAIN = '@student.its.ac.id';

// ---------- Data awal ----------
function seedData() {
  const TI  = 'Teknik Informatika';
  const RPL = 'Rekayasa Perangkat Lunak';
  const RKA = 'Rekayasa Kecerdasan Artifisial';

  const list = [
    { nrp: '5025251101', nama: 'Ayudya Devina Azzahra',                prodi: TI  },
    { nrp: '5025251103', nama: 'Rafifah Nabil Rahmadian',              prodi: TI  },
    { nrp: '5025251104', nama: 'Amanda Putri Chaerunnisa',             prodi: TI  },
    { nrp: '5025251105', nama: 'Gita Renada',                          prodi: TI  },
    { nrp: '5054251013', nama: 'Evina Fitriyani',                      prodi: RKA },
  ];

  return list.map(s => ({
    id: crypto.randomUUID(),
    ...s,
    email: `${s.nrp}${EMAIL_DOMAIN}`
  }));
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* abaikan, pakai data awal */ }
  return seedData();
}
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); } catch (e) {}
}

// ---------- State ----------
let students = loadData();
let currentPage = 1;
let editingId = null;

// ---------- Elemen DOM ----------
const form        = document.getElementById('studentForm');
const inNrp       = document.getElementById('nrp');
const inNama      = document.getElementById('nama');
const inEmail     = document.getElementById('email');
const inProdi     = document.getElementById('prodi');       // hidden
const selectBox   = document.getElementById('prodiSelect');
const selTrigger  = document.getElementById('prodiTrigger');
const selText     = document.getElementById('prodiText');
const selMenu     = document.getElementById('prodiMenu');
const btnSimpan   = document.getElementById('btnSimpan');
const btnBatal    = document.getElementById('btnBatal');
const btnRestart  = document.getElementById('btnRestart');
const tableBody   = document.getElementById('tableBody');
const pagination  = document.getElementById('pagination');

// ---------- Dropdown Program Studi ----------
function openMenu()  { selMenu.hidden = false; selectBox.classList.add('open');  selTrigger.setAttribute('aria-expanded', 'true'); }
function closeMenu() { selMenu.hidden = true;  selectBox.classList.remove('open'); selTrigger.setAttribute('aria-expanded', 'false'); }

selTrigger.addEventListener('click', () => (selMenu.hidden ? openMenu() : closeMenu()));

selMenu.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  setProdi(li.dataset.value);
  closeMenu();
});

document.addEventListener('click', (e) => { if (!selectBox.contains(e.target)) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

function setProdi(value) {
  inProdi.value = value || '';
  if (value) {
    selText.textContent = value;
    selText.classList.remove('placeholder');
  } else {
    selText.textContent = 'Pilih program studi';
    selText.classList.add('placeholder');
  }
  selMenu.querySelectorAll('li').forEach(li =>
    li.classList.toggle('selected', li.dataset.value === value));
}

// ---------- Validasi ----------
function setError(field, message) {
  const wrapper = document.getElementById(field).closest('.field');
  document.getElementById('err-' + field).textContent = message || '';
  wrapper.classList.toggle('invalid', Boolean(message));
}

function validate() {
  let ok = true;
  const nrp = inNrp.value.trim();
  const nama = inNama.value.trim();
  const email = inEmail.value.trim().toLowerCase();
  const prodi = inProdi.value;

  if (!/^\d{10}$/.test(nrp)) {
    setError('nrp', 'NRP harus 10 digit angka.'); ok = false;
  } else if (students.some(s => s.nrp === nrp && s.id !== editingId)) {
    setError('nrp', 'NRP sudah terdaftar.'); ok = false;
  } else setError('nrp', '');

  if (nama.length < 3) { setError('nama', 'Nama lengkap minimal 3 karakter.'); ok = false; }
  else setError('nama', '');

  if (!email.endsWith(EMAIL_DOMAIN) || email.length <= EMAIL_DOMAIN.length) {
    setError('email', `Email harus menggunakan ${EMAIL_DOMAIN}`); ok = false;
  } else setError('email', '');

  if (!prodi) { setError('prodi', 'Pilih program studi.'); ok = false; }
  else setError('prodi', '');

  return ok;
}

// ---------- Form ----------
function resetForm() {
  form.reset();
  setProdi('');
  editingId = null;
  btnSimpan.textContent = 'Simpan';
  ['nrp', 'nama', 'email', 'prodi'].forEach(f => setError(f, ''));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

  const data = {
    nrp: inNrp.value.trim(),
    nama: inNama.value.trim(),
    email: inEmail.value.trim().toLowerCase(),
    prodi: inProdi.value
  };

  if (editingId) {
    const idx = students.findIndex(s => s.id === editingId);
    if (idx !== -1) students[idx] = { ...students[idx], ...data };
  } else {
    students.push({ id: crypto.randomUUID(), ...data });
    currentPage = Math.ceil(students.length / PER_PAGE); // lompat ke halaman data baru
  }

  saveData();
  resetForm();
  render();
});

// Batal: batalkan edit & kosongkan form
btnBatal.addEventListener('click', resetForm);

// Restart: kembalikan seluruh data ke data awal
btnRestart.addEventListener('click', () => {
  if (!confirm('Kembalikan semua data ke data awal? Perubahan yang sudah dibuat akan hilang.')) return;
  students = seedData();
  currentPage = 1;
  saveData();
  resetForm();
  render();
});

// ---------- Tabel ----------
const ICON_EDIT = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 17.25V21h3.75L17.8 9.95l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/></svg>';
const ICON_DELETE = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/></svg>';

function makeCell(text, className) {
  const td = document.createElement('td');
  if (className) td.className = className;
  td.textContent = text;
  return td;
}

function renderTable() {
  tableBody.innerHTML = '';
  const start = (currentPage - 1) * PER_PAGE;
  const rows = students.slice(start, start + PER_PAGE);

  if (rows.length === 0) {
    const tr = document.createElement('tr');
    const td = makeCell('Belum ada data mahasiswa.', 'empty');
    td.colSpan = 6;
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }

  rows.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.appendChild(makeCell(start + i + 1));

    tr.appendChild(makeCell(s.nrp, 'cell-nrp'));
    tr.appendChild(makeCell(s.nama, 'cell-nama'));

    tr.appendChild(makeCell(s.prodi));
    tr.appendChild(makeCell(s.email));

    const tdAksi = document.createElement('td');
    tdAksi.innerHTML =
      `<button class="icon-btn edit" title="Edit" aria-label="Edit ${s.nrp}" data-id="${s.id}">${ICON_EDIT}</button>` +
      `<button class="icon-btn delete" title="Hapus" aria-label="Hapus ${s.nrp}" data-id="${s.id}">${ICON_DELETE}</button>`;
    tr.appendChild(tdAksi);

    tableBody.appendChild(tr);
  });
}

// Event delegation untuk tombol edit & hapus
tableBody.addEventListener('click', (e) => {
  const btn = e.target.closest('.icon-btn');
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.classList.contains('edit')) {
    const s = students.find(x => x.id === id);
    if (!s) return;
    editingId = id;
    inNrp.value = s.nrp;
    inNama.value = s.nama;
    inEmail.value = s.email;
    setProdi(s.prodi);
    btnSimpan.textContent = 'Update';
    ['nrp', 'nama', 'email', 'prodi'].forEach(f => setError(f, ''));
    inNama.focus();
  } else if (btn.classList.contains('delete')) {
    const s = students.find(x => x.id === id);
    if (!s || !confirm(`Hapus data ${s.nama} (${s.nrp})?`)) return;
    students = students.filter(x => x.id !== id);
    if (editingId === id) resetForm();
    saveData();
    render();
  }
});

// ---------- Pagination ----------
function renderPagination() {
  const totalPages = Math.max(1, Math.ceil(students.length / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  pagination.innerHTML = '';

  const addBtn = (label, page, { active = false, disabled = false } = {}) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'page-btn' + (active ? ' active' : '');
    b.textContent = label;
    b.disabled = disabled;
    b.addEventListener('click', () => { currentPage = page; render(); });
    pagination.appendChild(b);
  };

  addBtn('<', currentPage - 1, { disabled: currentPage === 1 });
  for (let p = 1; p <= totalPages; p++) addBtn(String(p), p, { active: p === currentPage });
  addBtn('>', currentPage + 1, { disabled: currentPage === totalPages });
}

// ---------- Render utama ----------
function render() {
  renderPagination();   // juga memastikan currentPage valid
  renderTable();
}

render();