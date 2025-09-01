(function(){document.querySelectorAll(".myCoverflow .swiper-slide").forEach(a=>{var e;if(a.querySelector(".slide-overlay"))return;const s=a.dataset,l=s.title||((e=a.querySelector(".slide-img"))==null?void 0:e.alt)||"",i=s.year?`<span class="pill">${s.year}</span>`:"",c=s.duration?`<span class="pill"><i class="bi bi-clock"></i>${s.duration} 分鐘</span>`:"",n=s.rating?`<span class="pill"><i class="bi bi-star"></i>${s.rating}</span>`:"",r=s.match?`<span class="match">${s.match}</span>`:"",o=s.tags||"",t=document.createElement("div");t.className="slide-overlay",t.innerHTML=`
      <h3 class="slide-title">${l}</h3>
      <div class="slide-meta">${i}${c}${n}</div>
      <p class="slide-tags">${r} ${o}</p>
    `,a.appendChild(t)})})();
