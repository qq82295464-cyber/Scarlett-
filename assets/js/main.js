// 「淡雅」风格交互：中 / EN、导航、幻灯片式渐显、首屏 magic move、渐变视差
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var buttons = document.querySelectorAll('.lang button');
  var titles = {
    zh: '曲若暚 Scarlett Quincy｜FDE 前沿部署工程师 · 企业 AI 落地 · GEO',
    en: 'Scarlett Quincy | Forward Deployed Engineer · Enterprise AI · GEO'
  };
  function apply(lang) {
    var en = lang === 'en';
    root.classList.toggle('lang-en', en);
    root.setAttribute('lang', en ? 'en' : 'zh-CN');
    document.title = titles[en ? 'en' : 'zh'];
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.lang); }); });
  apply(root.classList.contains('lang-en') ? 'en' : 'zh');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]static=1/.test(location.search);

  /* 幻灯片整体进场 + 内部元素错开渐显 */
  var slides = Array.prototype.slice.call(document.querySelectorAll('main > section:not(.hero)'));
  slides.forEach(function (s) { s.classList.add('slide-rv'); });
  var groups = ['.facts > div', '.prose > p', '.svc', '.method li', '.cg-title', '.case', '.timeline li', '.skill-group, .creds', '.contact-list'];
  var items = slides.slice();
  groups.forEach(function (sel) {
    var counts = new Map();
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.classList.contains('rv')) return;
      var n = counts.get(el.parentNode) || 0; counts.set(el.parentNode, n + 1);
      el.style.setProperty('--d', (0.12 + Math.min(n, 5) * 0.07) + 's');
      el.classList.add('rv'); items.push(el);
    });
  });
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 首屏 magic move：滚动时轻缩、圆角略增、内容淡出；渐变缓慢视差 */
  var bar = document.querySelector('.topbar');
  var hero = document.querySelector('.hero');
  var heroIn = document.querySelector('.hero-in');
  var contact = document.querySelector('.contact');
  var ticking = false;
  function frame() {
    var y = window.scrollY || 0, vh = window.innerHeight || 800;
    if (bar) bar.classList.toggle('scrolled', y > 8);
    if (!reduce && hero) {
      var p = Math.min(Math.max(y / (hero.offsetHeight || 1), 0), 1);
      hero.style.transform = 'scale(' + (1 - p * 0.05).toFixed(4) + ')';
      hero.style.setProperty('--px', (p * -14).toFixed(2) + '%');
      if (heroIn) { heroIn.style.opacity = (1 - p * 1.1).toFixed(3); heroIn.style.transform = 'translateY(' + (p * -24).toFixed(1) + 'px)'; }
    }
    if (!reduce && contact) {
      var r = contact.getBoundingClientRect();
      var q = Math.min(Math.max(1 - r.top / vh, 0), 1.6);
      contact.style.setProperty('--px2', (q * -10).toFixed(2) + '%');
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();

/* 联系方式：邮箱用 JS 拼装，降低被抓取；抖音号复制 */
(function () {
  document.querySelectorAll('.js-mail').forEach(function (a) {
    var m = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
    a.href = 'mailto:' + m; a.textContent = m;
  });
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-copy');
      var ok = function () { b.classList.add('done'); setTimeout(function () { b.classList.remove('done'); }, 1600); };
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(t).then(ok, fallback); } else { fallback(); }
      function fallback() { var x = document.createElement('textarea'); x.value = t; x.style.position = 'fixed'; x.style.opacity = '0'; document.body.appendChild(x); x.select(); try { document.execCommand('copy'); ok(); } catch (e) {} document.body.removeChild(x); }
    });
  });
})();
