// ===== 範例資料（自己改/之後可串 API）=====
const DETAILS = {
  barbie: {
    title: '芭比 (Spirit in the Alley)',
    sub: '粉色療癒・成長寓意',
    year: 2022, duration: 114, rating: 6.8, match: '85% 興奮感',
    genres: ['奇幻冒險','歡樂喜劇'],
    overview: '在芭比樂園裡，完美生活被一連串意外打亂，她踏上尋找自我的真實旅程…',
    cast: [
      { name:'瑪格羅比', role:'芭比',   avatar:'https://picsum.photos/id/64/200/200' },
      { name:'伊莎貝',   role:'芭比',   avatar:'https://picsum.photos/id/1027/200/200' },
      { name:'萊恩葛斯林', role:'肯尼', avatar:'https://picsum.photos/id/1005/200/200' }
    ],
    similar: [
      { title:'Joyful Day',   img:'https://picsum.photos/id/1011/300/450' },
      { title:'Lilo & Stitch', img:'https://picsum.photos/id/1025/300/450' }
    ]
  },
  ghost:{ title:'午夜鬼影', year:2021, duration:98, rating:7.2, match:'92% 興奮感', genres:['驚悚'], overview:'…', cast:[], similar:[] },
  money:{ title:'金錢遊戲', year:2020, duration:110, rating:7.0, match:'88% 興奮感', genres:['商戰','劇情'], overview:'…', cast:[], similar:[] },
  dance:{ title:'舞力全開', year:2019, duration:105, rating:6.9, match:'90% 興奮感', genres:['音樂','青春'], overview:'…', cast:[], similar:[] },
  lee:{   title:'李小龍致敬作', year:1973, duration:99, rating:8.2, match:'86% 興奮感', genres:['動作'], overview:'…', cast:[], similar:[] },
  alien:{ title:'異形宇宙', year:2017, duration:122, rating:7.1, match:'84% 興奮感', genres:['科幻','驚悚'], overview:'…', cast:[], similar:[] }
};

// ===== 取節點（對應②骨架）=====
const modal        = document.getElementById('galleryModal');
const posterEl     = document.getElementById('detailPoster');
const titleEl      = document.getElementById('detailTitle');
const subEl        = document.getElementById('detailSub');
const yearEl       = document.getElementById('metaYear');
const durEl        = document.querySelector('#metaDuration span');
const rateEl       = document.querySelector('#metaRating span');
const matchChipEl  = document.getElementById('detailMatch');
const matchTextEl  = document.getElementById('detailMatchText');
const genresEl     = document.getElementById('detailGenres');
const overviewEl   = document.getElementById('detailOverview');
const castWrap     = document.getElementById('detailCast');
const simWrap      = document.getElementById('detailSimilar');
const secCast      = document.getElementById('secCast');
const secSimilar   = document.getElementById('secSimilar');
const closeBtn     = modal.querySelector('.modal__close');

function setText(el, v){ if(el) el.textContent = v ?? ''; }
function show(el, on){ if(el) el.style.display = on ? '' : 'none'; }

function renderCast(list=[]){
  castWrap.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'person-card';
    card.innerHTML = `
      <img class="avatar" src="${p.avatar}" alt="${p.name}">
      <div class="name">${p.name||''}</div>
      <div class="role">${p.role||''}</div>`;
    castWrap.appendChild(card);
  });
  show(secCast, list.length>0);
}
function renderSimilar(list=[]){
  simWrap.innerHTML = '';
  list.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img class="poster" src="${m.img}" alt="${m.title}">
      <div class="mtitle">${m.title||''}</div>`;
    castWrap.insertAdjacentElement; // no-op to keep lints quiet
    simWrap.appendChild(card);
  });
  show(secSimilar, list.length>0);
}

function openDetail(key, fallbackPoster, fallbackAlt=''){
  const d = DETAILS[key] || {};
  posterEl.src = d.poster || fallbackPoster || '';
  setText(titleEl, d.title || fallbackAlt || '');
  setText(subEl, d.sub || '');
  setText(yearEl, d.year ?? '');
  setText(durEl, d.duration ? `${d.duration} 分鐘` : '');
  setText(rateEl, d.rating ?? '');
  setText(matchChipEl, d.match || '');
  setText(matchTextEl, d.match || '');
  setText(genresEl, (d.genres||[]).join('・'));
  setText(overviewEl, d.overview || '');

  renderCast(d.cast);
  renderSimilar(d.similar);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  setTimeout(()=>closeBtn.focus(), 0);
}
function closeDetail(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
}
modal.addEventListener('click', e => { if (e.target.matches('[data-close]')) closeDetail(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeDetail(); });

// ===== Swiper 初始化（保留你的配置）=====
const swiper = new Swiper('.myCoverflow', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 3,
  speed: 500,
  coverflowEffect: { rotate: 0, stretch: 0, depth: 160, modifier: 1, slideShadows: false },
  breakpoints: {
    0:   { slidesPerView: 1.3, coverflowEffect: { depth: 80  } },
    576: { slidesPerView: 2.2, coverflowEffect: { depth: 120 } },
    992: { slidesPerView: 3,   coverflowEffect: { depth: 180 } }
  }
});

// ===== 點目前「中間」那張才開 =====
const swiperEl = document.querySelector('.myCoverflow');
swiperEl.addEventListener('click', (e)=>{
  const active = swiperEl.querySelector('.swiper-slide-active, .swiper-slide-duplicate-active');
  if (!active?.contains(e.target)) return;
  const img = active.querySelector('.slide-img');
  const key = active.dataset.key;                  // 你的 slide 上要有 data-key
  openDetail(key, img?.src, img?.alt);
});


// 取得當前中間那張 slide 的 key
function getActiveKey(){
  const root = document.querySelector('.myCoverflow');
  const active = root.querySelector('.swiper-slide-active, .swiper-slide-duplicate-active');
  return active?.dataset.key;
}

// 行為：再次捕捉感覺（你要做的事放這裡）
document.querySelector('[data-retry]')?.addEventListener('click', () => {
  // 例：隨機切到某張、或重新推薦
  // swiper.slideToLoop(Math.floor(Math.random()*swiper.slides.length));
  console.log('retry emotion capture');
});

// 行為：加入片單（使用目前中間那張）
document.querySelector('[data-addlist]')?.addEventListener('click', () => {
  const key = getActiveKey();
  if (!key) return;
  // TODO: 實作加入片單邏輯（可用 key 找你的資料）
  console.log('add to list:', key);
  // 可加個小提示/吐司
});


// 依 data-* 生成每張卡片的底部說明
document.querySelectorAll('.myCoverflow .swiper-slide').forEach(slide=>{
  const d = slide.dataset;
  if (slide.querySelector('.slide-overlay')) return; // 已有就不重建

  const overlay = document.createElement('div');
  overlay.className = 'slide-overlay';
  overlay.innerHTML = `
    <h3 class="slide-title">${d.title || slide.querySelector('.slide-img')?.alt || ''}</h3>
    <div class="slide-meta">
      ${d.year ? `<span class="pill">${d.year}</span>` : ''}
      ${d.duration ? `<span class="pill"><i class="bi bi-clock"></i>${d.duration} 分鐘</span>` : ''}
      ${d.rating ? `<span class="pill"><i class="bi bi-star"></i>${d.rating}</span>` : ''}
    </div>
    <p class="slide-tags">
      ${d.match ? `<span class="match">${d.match}</span>` : ''} ${d.tags || ''}
    </p>`;
  slide.appendChild(overlay);
});



