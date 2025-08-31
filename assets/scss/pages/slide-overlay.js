// 這段程式只做一件事：把 data-* 轉成每張卡片底部的 overlay
// 注意：它要在「new Swiper(...) 之前」執行，這樣 Swiper 複製的 slide 也會帶到 overlay。

(function injectOverlays(){
  const slides = document.querySelectorAll('.myCoverflow .swiper-slide');
  slides.forEach(slide => {
    if (slide.querySelector('.slide-overlay')) return;  // 已有就跳過

    const d = slide.dataset;
    const title    = d.title || slide.querySelector('.slide-img')?.alt || '';
    const year     = d.year ? `<span class="pill">${d.year}</span>` : '';
    const duration = d.duration ? `<span class="pill"><i class="bi bi-clock"></i>${d.duration} 分鐘</span>` : '';
    const rating   = d.rating ? `<span class="pill"><i class="bi bi-star"></i>${d.rating}</span>` : '';
    const match    = d.match ? `<span class="match">${d.match}</span>` : '';
    const tags     = d.tags || '';

    const overlay = document.createElement('div');
    overlay.className = 'slide-overlay';
    overlay.innerHTML = `
      <h3 class="slide-title">${title}</h3>
      <div class="slide-meta">${year}${duration}${rating}</div>
      <p class="slide-tags">${match} ${tags}</p>
    `;
    slide.appendChild(overlay);
  });
})();



