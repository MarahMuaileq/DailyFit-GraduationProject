
const products = [
  {id:'acc-01',name:'إكسسوارات',cat:'accessories',price:25,img:'assets/prod-2.jpg',desc:"إكسسوار أنيق وخفيف، يناسب كل الأذواق. خامة ممتازة وسعر مناسب."},
  {id:'ring-01',name:'خاتم',cat:'accessories',price:20,img:'assets/acc-2.jpg',desc:'خاتم أنيق'},
  {id:'Accessories',name:'إكسسوارات',cat:'accessories',price:40,img:'assets/cat-1.jpg',desc:'إكسسوارات مميزة'},
  {id:'watch-03',name:'ساعة وسوار',cat:'accessories',price:30,img:'assets/acc-1.jpg',desc:'متوفّر بكميات أخرى'},
  {id:'watch-02',name:'تصميم مشهور',cat:'accessories',price:45,img:'assets/acc-3.jpg',desc:'متوفر بأشكال أخرى'},
  {id:'watch-01',name:'عدة حلاقة',cat:'accessories',price:55,img:'assets/acc-4.jpg',desc:'متوفّر بكميات أخرى'},
  {id:'bag-01',name:'شنطة كاجوال',cat:'bags',price:45,img:'assets/bag-1.jpg',desc:'عملية ومريحة'},
  {id:'bag-02',name:'تصميم مشهور',cat:'bags',price:55,img:'assets/bag-3.jpg',desc:'اختر التصميم اللي يعجبك'},
  {id:'bag-04',name:'طباعة مخصصة',cat:'bags',price:35,img:'assets/bag-2.jpg',desc:'صمّمها بذوقك'},
  {id:'bag-03',name:'شنطة رسمية',cat:'bags',price:65,img:'assets/bag-4.jpg',desc:'اختر اللي تحبه'},
  {id:'bag-05',name:'شنطة رسمية',cat:'bags',price:65,img:'assets/cat-3.jpg',desc:'ستايل أنيق'},
  {id:'shoe-01',name:'حذاء مريح',cat:'shoes',price:30,img:'assets/shoes-1.jpg',desc:'متوفر بمقاسات أخرى'},
  {id:'shoe-02',name:'بوت',cat:'shoes',price:35,img:'assets/shoes-2.jpg',desc:'متوفر بألوان أخرى'},
  {id:'shoe-03',name:'تصميم مشهور',cat:'shoes',price:50,img:'assets/shoes-3.jpg',desc:'اختر تصميمك'},
  {id:'shoe-04',name:'بوستر',cat:'shoes',price:40,img:'assets/shoes-4.jpg',desc:'اختر اللي تحبه'},
  {id:'shoe-05',name:'حذاء مريح',cat:'shoes',price:65,img:'assets/cat-2.jpg',desc:'راحة وثبات'},
  {id:'shoe-06',name:'حذاء مريح',cat:'shoes',price:45,img:'assets/prod-3.jpg',desc:'نعومة بالمشي'},
  {id:'tee-01',name:'قميص أبيض',cat:'clothes',price:15,img:'assets/cloth-1.jpg',desc:'متوفر بمقاسات أخرى'},
  {id:'tee-02',name:'طباعة على التيشيرت',cat:'clothes',price:25,img:'assets/cloth-2.jpg',desc:'صمّم تصميمك الخاص'},
  {id:'tee-03',name:'تصميم مشهور',cat:'clothes',price:28,img:'assets/cloth-3.jpg',desc:'اختر ستايلك'},
  {id:'tee-05',name:'شتوي',cat:'clothes',price:48,img:'assets/prod-4.jpg',desc:'تصاميم دافئة'},
  {id:'tee-06',name:'فستان أزرق',cat:'clothes',price:25,img:'assets/saved-2.jpg',desc:'اختيار ناعم'},
  {id:'tee-07',name:'تنورة',cat:'clothes',price:65,img:'assets/prod-1.jpg',desc:'متوفرة بألوان أخرى'},
  {id:'tee-04',name:'تصاميم موسمية',cat:'clothes',price:22,img:'assets/cloth-4.jpg',desc:'اختاري اللي يعجبك'},
];

const state = {
  cart: JSON.parse(localStorage.getItem('cart')||'[]'),
  user: JSON.parse(localStorage.getItem('user')||'null')
};

function persist(){
  localStorage.setItem('cart', JSON.stringify(state.cart));
  if(state.user) localStorage.setItem('user', JSON.stringify(state.user));
  else localStorage.removeItem('user');
}

function openLogin(){ document.getElementById('loginOv').classList.add('show'); }
function closeLogin(){ document.getElementById('loginOv').classList.remove('show'); }
function doLogin(){
  const email = document.getElementById('liEmail').value.trim();
  const pass = document.getElementById('liPass').value.trim();
  if(!email || !pass){ alert('ادخل البريد وكلمة المرور'); return; }
  state.user = {name:email.split('@')[0], email};
  persist();
  syncAuthUI();
  closeLogin();
  location.href = "profile-ar.html";
}
function social(p){
  state.user = {name:"مستخدم " + p, email:p.toLowerCase()+"@example.com"};
  persist(); syncAuthUI(); closeLogin(); location.href="profile-ar.html";
}
function signup(){ alert('تم إنشاء الحساب (نسخة تجريبية) - يمكنك تسجيل الدخول الآن'); }
function syncAuthUI(){
  const a = document.getElementById('authBtn');
  if(!a) return;
  if(state.user){
    a.textContent = state.user.name;
    a.href = "profile-ar.html";
    a.onclick = (e)=>{};
  }else{
    a.textContent = 'تسجيل الدخول / إنشاء حساب';
    a.href="#";
    a.onclick = (e)=>{ e.preventDefault(); openLogin(); };
  }
}

function addToCart(id,qty=1){
  const item = state.cart.find(i=>i.id===id);
  if(item) item.qty += qty; else state.cart.push({id,qty});
  persist();
}
function changeQty(id,delta,cb){
  const it = state.cart.find(i=>i.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty<1) it.qty=1;
  persist();
  if(cb) cb();
}
function removeItem(id,cb){
  state.cart = state.cart.filter(i=>i.id!==id);
  persist();
  if(cb) cb();
}

function openPayment(){
  if(state.cart.length===0) return alert('السلة فارغة');
  document.getElementById('payOv').classList.add('show');
}
function closePayment(){ document.getElementById('payOv').classList.remove('show'); }
function luhn(ok){
  const s = ok.replace(/\D/g,'');
  let sum=0, dbl=false;
  for(let i=s.length-1;i>=0;i--){
    let d=parseInt(s[i]);
    if(dbl){d*=2; if(d>9)d-=9;}
    sum+=d;
    dbl=!dbl;
  }
  return sum%10===0 && s.length>=12;
}
function payNow(){
  const method = document.querySelector('input[name=pay]:checked').value;
  if(method==='card'){
    const num = document.getElementById('ccNum').value.trim();
    const exp = document.getElementById('ccExp').value.trim();
    const cvc = document.getElementById('ccCvc').value.trim();
    if(!luhn(num)) return alert('رقم البطاقة غير صالح');
    if(!/^\d{2}-\d{2}$/.test(exp)) return alert('تاريخ الانتهاء غير صالح (MM-YY)');
    if(!/^\d{3,4}$/.test(cvc)) return alert('كود الأمان غير صالح');
  }
  closePayment();
  state.cart = []; persist();
  document.getElementById('okOv').classList.add('show');
  renderCart && renderCart();
}
function closeSuccess(){
  document.getElementById('okOv').classList.remove('show');
  location.href = "index-ar.html";
}

function cardHTML(p){
  return `<div class="card">
    <img src="${p.img}" alt="${p.name}">
    <div class="p">
      <div class="stars">★★★★☆ <span class=badge>4.5</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        <div>
          <div style="font-weight:700">${p.name}</div>
          <div class="badge">${p.desc}</div>
          <div class="price">${p.price}$</div>
        </div>
        <a class="btn" href="product-ar.html?id=${p.id}">عرض</a>
      </div>
    </div>
  </div>`;
}

function renderHome(){
  const offers = ['acc-01','tee-01','shoe-01','shoe-03'].map(id=>products.find(p=>p.id===id));
  document.getElementById('offerGrid').innerHTML = offers.map(cardHTML).join('');

  const cats = [
    {k:'accessories',name:'إكسسوارات',img:products[0].img},
    {k:'shoes',name:'أحذية',img:products[9].img},
    {k:'bags',name:'شنط',img:products[14].img},
    {k:'clothes',name:'ملابس',img:products[15].img}
  ];

  document.getElementById('catGrid') && (
    document.getElementById('catGrid').innerHTML = cats.map(c=>`
      <div class="card">
        <a href="products-ar.html?cat=${c.k}">
          <img src="${c.img}" alt="${c.name}">
        </a>
        <div class="p"><b>${c.name}</b></div>
      </div>`).join('')
  );
}

function fillGrid(id,cat){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = products
    .filter(p=>p.cat===cat)
    .map(cardHTML)
    .join('');
}

function renderCatalog(){
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');

  if(cat){
    fillGrid('productsGrid', cat);
  } else {
    fillGrid('bagsGrid','bags');
    fillGrid('shoesGrid','shoes');
    fillGrid('accGrid','accessories');
    fillGrid('clothesGrid','clothes');
  }
}

function renderDetail(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const p = products.find(x=>x.id===id) || products[0];

  document.getElementById('pdImg').src = p.img;
  document.getElementById('pdName').textContent = p.name;
  document.getElementById('pdPrice').textContent = p.price + '$';
  document.getElementById('pdDesc').textContent = p.desc;

  const qtyEl = document.getElementById('pdQty');
  document.getElementById('btnAddDetail').onclick = ()=>{
    addToCart(p.id, parseInt(qtyEl.value||'1'));
    location.href="cart-ar.html";
  };
  document.getElementById('btnWish').onclick = ()=>{ alert('تم الحفظ 🤍'); };

  document.getElementById('qtyMinus').onclick = ()=>{
    qtyEl.value = Math.max(1,(parseInt(qtyEl.value||'1')||1)-1);
  };
  document.getElementById('qtyPlus').onclick = ()=>{
    qtyEl.value = (parseInt(qtyEl.value||'1')||1)+1;
  };

  const related = products.filter(x=>x.cat===p.cat && x.id!==p.id).slice(0,4);
  document.getElementById('relatedGrid').innerHTML = related.map(cardHTML).join('');
}

function renderCart(){
  const tBody = document.getElementById('cartTable');
  if(!tBody) return;

  if(state.cart.length===0){
    document.getElementById('cartEmpty').hidden=false;
    document.getElementById('cartWrap').hidden=true;
    return;
  }

  document.getElementById('cartEmpty').hidden=true;
  document.getElementById('cartWrap').hidden=false;

  tBody.innerHTML = state.cart.map(it=>{
    const p = products.find(x=>x.id===it.id);
    const line = p.price*it.qty;
    return `<tr>
      <td style="display:flex;align-items:center;gap:10px">
        <img src="${p.img}" alt="" style="width:68px;height:68px;object-fit:cover;border-radius:10px">
        ${p.name}
      </td>
      <td>${p.price}$</td>
      <td>
        <div class="qty">
          <button onclick="changeQty('${it.id}',-1,renderCart)">−</button>
          <input value="${it.qty}" readonly>
          <button onclick="changeQty('${it.id}',1,renderCart)">+</button>
        </div>
      </td>
      <td>${line}$</td>
      <td><button class="btn secondary" onclick="removeItem('${it.id}',renderCart)">إزالة</button></td>
    </tr>`
  }).join('');

  const total = state.cart.reduce(
    (s,it)=>s+products.find(p=>p.id===it.id).price*it.qty,
    0
  );
  document.getElementById('cartTotal').textContent = total + '$';
}

function renderProfile(){
  if(!document.getElementById('pfName')) return;
  document.getElementById('pfName').textContent = state.user? state.user.name : 'زائر';

  const saved = ['tee-01','acc-01'];
  document.getElementById('savedGrid').innerHTML =
    saved.map(id=>cardHTML(products.find(p=>p.id===id))).join('');
}

function highlightActive(linkId){
  document.querySelectorAll('[data-link]').forEach(a=>a.classList.remove('active'));
  const a = document.getElementById(linkId);
  if(a) a.classList.add('active');
}

document.addEventListener('DOMContentLoaded', ()=>{
  syncAuthUI();
  const page = document.body.dataset.page;
  if(page==='home'){ renderHome(); highlightActive('nav-home'); }
  if(page==='products'){ renderCatalog(); highlightActive('nav-products'); }
  if(page==='product'){ renderDetail(); highlightActive('nav-products'); }
  if(page==='cart'){ renderCart(); highlightActive('nav-cart'); }
  if(page==='profile'){ renderProfile(); highlightActive('nav-profile'); }
  if(page==='contact'){ highlightActive('nav-contact'); }
});
