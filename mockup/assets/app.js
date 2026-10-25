/* thepixcloud — data & shared UI */
(function(){
const rp = n => 'Rp' + Math.round(n).toLocaleString('id-ID');
const k = n => n >= 1000 ? (n/1000) + 'rb' : String(n);

const I = {
  phone:'<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><circle cx="12" cy="19.3" r=".6"/>',
  wallet:'<path d="M4 7.5V6a2 2 0 0 1 2-2h11v3.5"/><rect x="3" y="7.5" width="18" height="13" rx="2.5"/><path d="M16 14h2.5"/>',
  bolt:'<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z"/>',
  drop:'<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>',
  tv:'<rect x="3" y="5" width="18" height="12.5" rx="2.5"/><path d="M8 21h8M12 17.5V21"/>',
  game:'<path d="M7 8h10a4.5 4.5 0 0 1 4.3 5.8l-1 3.3a2.5 2.5 0 0 1-4.3.9L14.5 16h-5L8 18a2.5 2.5 0 0 1-4.3-.9l-1-3.3A4.5 4.5 0 0 1 7 8z"/><path d="M8 11v3M6.5 12.5h3"/><circle cx="16" cy="12" r=".6"/>',
  shield:'<path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10v-6z"/><path d="M12 9v5M9.5 11.5h5"/>',
  car:'<path d="M5 16.5V12l2-5h10l2 5v4.5"/><path d="M3.5 12h17v4.5h-17z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  chat:'<path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7.5z"/><path d="M8 9.5h8M8 12.5h5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  refund:'<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v4.5h4.5"/>',
  receipt:'<path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  qr:'<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h2.5v2.5M20.5 14v6.5H14"/>',
  bank:'<path d="M3 9.5 12 4l9 5.5"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
  store:'<path d="M4 9.5V20h16V9.5"/><path d="M3 4h18l-1.5 5.5a2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5 0z"/>',
  tag:'<path d="M3 12V3.5h8.5l9 9-8.5 8.5z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  copy:'<rect x="8" y="8" width="12.5" height="12.5" rx="2"/><path d="M16 8V5.5a2 2 0 0 0-2-2H5.5a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2H8"/>'
};
const icon = (n, c='ic') => `<svg class="${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n]||''}</svg>`;

const logo = (s=34) => `<span style="display:inline-flex;align-items:center;gap:9px">
<svg width="${s}" height="${s}" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#191F06"/><rect x="16" y="13" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="20" y="13" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="12" y="17" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="16" y="17" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="20" y="17" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="24" y="17" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="8" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="12" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="16" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="20" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="24" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="28" y="21" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="8" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="12" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="16" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="20" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="24" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="28" y="25" width="4.4" height="4.4" fill="#FFFCB0"/><rect x="28" y="11" width="4.4" height="4.4" rx=".6" fill="#E43E00"/></svg>
<span class="fh" style="font-weight:900;font-size:${Math.round(s*.64)}px;letter-spacing:-.05em;color:#191F06">thepix<span style="color:#E43E00">cloud</span></span></span>`;

/* ---------- operators ---------- */
const OPS = [
  ['Telkomsel',['0811','0812','0813','0821','0822','0823','0851','0852','0853']],
  ['Indosat',['0814','0815','0816','0855','0856','0857','0858']],
  ['XL',['0817','0818','0819','0859','0877','0878']],
  ['Axis',['0831','0832','0833','0838']],
  ['Tri',['0895','0896','0897','0898','0899']],
  ['Smartfren',['0881','0882','0883','0884','0885','0886','0887','0888','0889']]
];
function detectOp(num){
  let d = String(num||'').replace(/\D/g,'');
  if (d.startsWith('62')) d = '0' + d.slice(2);
  else if (d.startsWith('8')) d = '0' + d;
  if (d.length < 4) return null;
  const p = d.slice(0,4);
  const f = OPS.find(o => o[1].includes(p));
  return f ? f[0] : null;
}

/* ---------- prices ---------- */
const PULSA_BASE = [[5000,6200],[10000,11000],[20000,20900],[25000,25800],[50000,50800],[100000,100200]];
const OP_ADJ = {Telkomsel:0,Indosat:-150,XL:100,Axis:50,Tri:-200,Smartfren:-250};
const pulsaItems = op => PULSA_BASE.map(([n,p]) => ({name:'Pulsa '+k(n), sub:op, price:p + OP_ADJ[op]*(n>=50000?2:1)}));
const DATA_BASE = [['3GB · 7 hari',15000],['8GB · 30 hari',39000],['15GB · 30 hari',62000],['25GB · 30 hari',85000],['40GB · 30 hari',115000],['Unlimited harian · 30 hari',99000]];
const dataItems = op => DATA_BASE.map(([n,p]) => ({name:n, sub:op, price:p + OP_ADJ[op]*8}));
const plus = (list, admin, label) => list.map(n => ({name:label+' '+k(n), sub:'Admin '+rp(admin), price:n+admin}));

const GAMES = {
  'Mobile Legends':[['86 Diamonds',24500],['172 Diamonds',48500],['257 Diamonds',72000],['344 Diamonds',97000],['706 Diamonds',198000],['Weekly Diamond Pass',34900]],
  'Free Fire':[['70 Diamonds',10900],['140 Diamonds',21500],['355 Diamonds',51000],['720 Diamonds',101000],['1450 Diamonds',196000]],
  'PUBG Mobile':[['60 UC',17500],['325 UC',80500],['660 UC',167000]]
};

const P = {
  'pulsa':{name:'Pulsa',group:'isi',cat:'Isi ulang',icon:'phone',desc:'Isi pulsa semua operator, masuk dalam hitungan detik.',label:'Nomor HP',ph:'0812 3456 7890',detect:true,type:'tel'},
  'paket-data':{name:'Paket Data',group:'isi',cat:'Isi ulang',icon:'wifi',desc:'Kuota internet harian sampai bulanan, tinggal pilih.',label:'Nomor HP',ph:'0812 3456 7890',detect:true,type:'tel'},
  'e-wallet':{name:'E-Wallet',group:'isi',cat:'Isi ulang',icon:'wallet',desc:'Top up DANA, OVO, GoPay, ShopeePay, LinkAja.',label:'Nomor HP terdaftar',ph:'0812 3456 7890',type:'tel',providers:['DANA','OVO','GoPay','ShopeePay','LinkAja']},
  'pln':{name:'Token PLN',group:'tagihan',cat:'Tagihan',icon:'bolt',desc:'Beli token listrik prabayar, kode langsung dikirim.',label:'Nomor meter / ID pelanggan',ph:'5123 4567 8901',type:'num',providers:['PLN Prabayar']},
  'pdam':{name:'PDAM',group:'tagihan',cat:'Tagihan',icon:'drop',desc:'Bayar tagihan air bulanan tanpa ke loket.',label:'ID pelanggan PDAM',ph:'1234567890',type:'num',bill:true,providers:['PAM Jaya','PDAM Surya Sembada','PDAM Tirtawening','PDAM Tirta Moedal']},
  'tv-internet':{name:'TV & Internet',group:'tagihan',cat:'Tagihan',icon:'tv',desc:'IndiHome, Biznet, First Media, MNC Play.',label:'Nomor pelanggan',ph:'1220 0123 4567',type:'num',bill:true,providers:['IndiHome','Biznet','First Media','MNC Play']},
  'game':{name:'Voucher Game',group:'hiburan',cat:'Hiburan',icon:'game',desc:'Diamonds, UC, dan pass favorit, langsung ke akun.',label:'User ID (Zone ID)',ph:'12345678 (1234)',type:'text',providers:Object.keys(GAMES)},
  'bpjs':{name:'BPJS Kesehatan',group:'tagihan',cat:'Tagihan',icon:'shield',desc:'Iuran BPJS per kelas, bisa bayar beberapa bulan sekaligus.',label:'Nomor VA keluarga',ph:'8888 8012 3456 7890',type:'num',providers:['Kelas 1','Kelas 2','Kelas 3']},
  'multifinance':{name:'Multifinance',group:'tagihan',cat:'Tagihan',icon:'car',desc:'Cicilan Adira, FIF, BAF, WOM Finance.',label:'Nomor kontrak',ph:'0101 2345 6789',type:'num',bill:true,providers:['Adira Finance','FIF Group','BAF','WOM Finance']}
};
P.pulsa.providers = OPS.map(o=>o[0]);
P['paket-data'].providers = OPS.map(o=>o[0]);

const BPJS = {'Kelas 1':150000,'Kelas 2':100000,'Kelas 3':35000};
function items(slug, prov){
  switch(slug){
    case 'pulsa': return pulsaItems(prov||'Telkomsel');
    case 'paket-data': return dataItems(prov||'Telkomsel');
    case 'e-wallet': return plus([20000,25000,50000,100000,150000,200000],1500,'Saldo');
    case 'pln': return plus([20000,50000,100000,200000,500000],2500,'Token');
    case 'game': return (GAMES[prov]||GAMES['Mobile Legends']).map(([n,p])=>({name:n,sub:prov||'Mobile Legends',price:p}));
    case 'bpjs': { const b = BPJS[prov]||BPJS['Kelas 3']; return [1,2,3,6,12].map(m=>({name:m+' bulan',sub:rp(b)+'/bln + admin',price:b*m+2500})); }
    default: return [];
  }
}
function bill(slug, prov, id){
  const d = String(id).replace(/\D/g,'');
  let h = 0; for (const c of d+prov) h = (h*31 + c.charCodeAt(0)) % 99991;
  const ranges = {'pdam':[45000,260000],'tv-internet':[185000,520000],'multifinance':[650000,2400000]};
  const [a,b] = ranges[slug];
  const amt = Math.round((a + (h % 1000)/1000*(b-a))/100)*100;
  const names = ['Budi Santoso','Siti Rahma','Andi Wijaya','Dewi Lestari','Rizky Pratama','Nur Aini'];
  const months = ['Oktober 2026','Oktober 2026','September 2026'];
  return {name:'Tagihan '+months[h%3], sub:names[h%names.length], price:amt+2500, base:amt, admin:2500};
}

/* ---------- payments ---------- */
const PAY = [
  {id:'qris',name:'QRIS',grp:'QRIS',fee:0,icon:'qr'},
  {id:'bca',name:'BCA Virtual Account',grp:'Virtual Account',fee:4000,icon:'bank'},
  {id:'bri',name:'BRI Virtual Account',grp:'Virtual Account',fee:4000,icon:'bank'},
  {id:'mandiri',name:'Mandiri Virtual Account',grp:'Virtual Account',fee:4000,icon:'bank'},
  {id:'dana',name:'DANA',grp:'E-wallet',fee:0,icon:'wallet'},
  {id:'ovo',name:'OVO',grp:'E-wallet',fee:0,icon:'wallet'},
  {id:'alfamart',name:'Alfamart',grp:'Gerai retail',fee:2500,icon:'store'},
  {id:'indomaret',name:'Indomaret',grp:'Gerai retail',fee:2500,icon:'store'}
];
const PROMO = {code:'PIXCLOUD5',pct:5,max:5000};

/* ---------- storage ---------- */
const KEY = 'czh_orders';
const orders = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e){ return []; } };
const saveOrder = o => { const a = orders().filter(x=>x.id!==o.id); a.unshift(o); localStorage.setItem(KEY, JSON.stringify(a.slice(0,30))); };

/* ---------- header / footer ---------- */
const NAV = [['/','Beranda'],['/produk','Produk'],['/invoice','Cek Invoice'],['/bantuan','Bantuan']];
function active(href){
  const p = location.pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'') || '/';
  if (href === '/') return p === '/';
  return p.startsWith(href);
}
function renderHeader(){
  const el = document.getElementById('hdr'); if(!el) return;
  el.className = 'hdr';
  el.innerHTML = `<div class="wrap hdr-in" style="position:relative">
    <a href="/" aria-label="thepixcloud beranda">${logo(34)}</a>
    <nav class="nav-pill" aria-label="Menu utama">${NAV.map(([h,t])=>`<a href="${h}" class="${active(h)?'on':''}">${t}</a>`).join('')}</nav>
    <a href="/produk?s=pulsa" class="btn btn-red hdr-cta">Top up ${icon('arrow','ic')}</a>
    <button class="burger" id="burger" aria-label="Buka menu" aria-expanded="false">☰</button>
  </div>
  <div class="mnav" id="mnav">
    ${NAV.map(([h,t])=>`<a class="l ${active(h)?'on':''}" href="${h}">${t}</a>`).join('')}
    <a href="/produk?s=pulsa" class="btn btn-red" style="width:100%;margin-top:18px;min-height:54px">Top up sekarang ${icon('arrow')}</a>
  </div>`;
  const b = el.querySelector('#burger'), m = el.querySelector('#mnav');
  b.onclick = () => { const o = m.classList.toggle('open'); b.textContent = o ? '✕' : '☰'; b.setAttribute('aria-expanded', o); };
}
function renderFooter(){
  const el = document.getElementById('ftr'); if(!el) return;
  el.className = 'ftr';
  const prod = ['pulsa','paket-data','e-wallet','pln','game','bpjs'];
  el.innerHTML = `<footer style="border-top:1px solid var(--line);margin-top:80px;background:#fff">
  <div class="wrap" style="padding-top:48px;padding-bottom:32px">
    <div class="grid gap-10 md:grid-cols-4">
      <div class="md:col-span-2">${logo(36)}<p class="mute" style="margin-top:14px;max-width:340px;line-height:1.6">Top up pulsa, data, e-wallet, game, dan bayar tagihan. Cepat, murah, nggak pakai drama.</p></div>
      <div><h4 style="font-weight:800;margin-bottom:12px">Produk</h4><ul class="space-y-2">${prod.map(s=>`<li><a class="mute hover:text-[#E43E00]" href="/produk?s=${s}">${P[s].name}</a></li>`).join('')}</ul></div>
      <div><h4 style="font-weight:800;margin-bottom:12px">Bantuan</h4><ul class="space-y-2">
        <li><a class="mute hover:text-[#E43E00]" href="/invoice">Cek invoice</a></li>
        <li><a class="mute hover:text-[#E43E00]" href="/bantuan">Pusat bantuan</a></li>
        <li><a class="mute hover:text-[#E43E00]" href="/bantuan#kontak">Hubungi kami</a></li></ul></div>
    </div>
    <div class="mute" style="margin-top:40px;padding-top:20px;border-top:1px solid var(--line);font-size:13px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px">
      <span>© ${new Date().getFullYear()} thepixcloud. Semua hak dilindungi.</span><span>Dibuat dengan kopi & piksel.</span></div>
  </div></footer>`;
}
function reveal(){
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e=>e.classList.add('vis')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target);} }), {threshold:.12});
  els.forEach(e=>io.observe(e));
}
const qs = n => new URLSearchParams(location.search).get(n);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

window.CZ = {rp,k,icon,logo,OPS,detectOp,P,items,bill,PAY,PROMO,orders,saveOrder,qs,reduced,pulsaItems};
document.addEventListener('DOMContentLoaded', () => { renderHeader(); renderFooter(); reveal(); });
})();
