/* Local, buildless enhancements. Every essential destination also works without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let manualPause = false;
  try { manualPause = localStorage.getItem('church-motion') === 'paused'; } catch {}
  const motionButton = $('.motion-toggle');
  const applyMotion = () => {
    const paused = manualPause || reduced.matches;
    document.documentElement.classList.toggle('motion-paused', paused);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.textContent = reduced.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.disabled = reduced.matches;
    }
  };
  applyMotion();
  reduced.addEventListener('change', applyMotion);
  motionButton?.addEventListener('click', () => {
    manualPause = !manualPause;
    try { localStorage.setItem('church-motion', manualPause ? 'paused' : 'active'); } catch {}
    applyMotion();
  });
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  const menu = $('.menu-toggle'); const nav = $('#navigation');
  const closeMenu = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); };
  if (menu && nav) {
    menu.hidden = false;
    menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
    nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
    document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
    matchMedia('(min-width:601px)').addEventListener('change', closeMenu);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!manualPause && !reduced.matches) entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    }), { threshold: .08 });
    $$('[data-reveal]').forEach(el => observer.observe(el));
  }
  const rooms = {
    a: { title: 'Studio A', lead: 'Give the performance some air.', detail: 'An 1,800-square-foot live room beneath a 30-foot wooden cathedral ceiling. Track together, find separation in the isolation booths, and shape the take through a modified Neve V3.', image: 'live-room', alt: 'Grand piano and drums in Studio A’s cathedral live room', specs: [['Live room', '30 × 60 feet'], ['Ceiling', '30 feet, cathedral'], ['Console', 'Neve V3']], action: 'Ask about Studio A' },
    b: { title: 'Studio B', lead: 'A closer kind of focus.', detail: 'A 15 × 20 foot control room with a 6 × 15 foot isolation booth and a connection to the Studio A live room. Outboard preamps, Apogee Symphony converters and Focal monitoring keep the signal path hands-on.', image: 'studio-b', alt: 'Studio B control room and equipment at The Church', specs: [['Control room', '15 × 20 feet'], ['Isolation booth', '6 × 15 feet'], ['Conversion', 'Apogee Symphony']], action: 'Ask about Studio B' },
    master: { title: 'Treelady Mastering', lead: 'One last, careful listen.', detail: 'A dedicated mastering room with Dunlavy SC-VI mains, Acoustic Geometry treatment and an analog chain including Manley, Maselec and Rupert Neve Designs. Work directly with mastering engineer Garrett Haines.', image: 'master-suite', alt: 'Treelady mastering suite at The Church Recording Studio', specs: [['Monitoring', 'Dunlavy SC-VI'], ['Tape', 'AMPEX ATR-104'], ['Engineer', 'Garrett Haines']], action: 'Ask Garrett about mastering' },
    space: { title: 'Room to resonate.', lead: 'See what thirty feet of air means.', detail: 'Rotate a spatial study of Studio A’s 30 × 60 foot live room and 30-foot cathedral ceiling. The proportions come from the studio’s published dimensions; windows and trusses are illustrative, not a measured architectural survey.', specs: [['Length', '60 feet'], ['Width', '30 feet'], ['Ridge height', '30 feet']], action: 'Arrange a studio tour' }
  };
  let activeRoom = 'a'; let model; let modelPromise;
  const initModel = async () => {
    if (model) { model.resize(); return; }
    if (modelPromise) return modelPromise;
    modelPromise = (async () => {
      try {
        if (location.protocol === 'file:') throw new Error('file-preview');
        const module = await import('./room-3d.js');
        model = await module.createRoom($('#model-container'), $('#model-status'));
      } catch (e) {
        $('#model-status').textContent = location.protocol === 'file:' ? 'For interactive 3D, open this site through a local web server.' : '3D isn’t available here. The real room photograph and dimensions are shown instead.';
        $$('.model-controls button').forEach(b => b.disabled = true);
      }
    })();
    return modelPromise;
  };
  const changeRoom = key => {
    const room = rooms[key]; if (!room) return;
    activeRoom = key;
    $$('[data-room]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.room === key)));
    $('#room-name').textContent = room.title; $('#room-lead').textContent = room.lead; $('#room-detail').textContent = room.detail;
    $('#room-specs').replaceChildren(...room.specs.map(([label, value]) => {
      const row = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; row.append(dt, dd); return row;
    }));
    const action = $('#room-inquiry'); action.textContent = room.action;
    action.href = key === 'master' ? 'mailto:garrett@treelady.com?subject=Mastering%20inquiry%20via%20The%20Church' : '#contact';
    $('#room-image').hidden = key === 'space'; $('#spatial-view').hidden = key !== 'space';
    if (room.image) { $('#room-image').src = `./assets/images/${room.image}-1280.webp`; $('#room-image').alt = room.alt; }
    if (!manualPause && !reduced.matches) {
      const panel = $('.room-description'); panel.classList.remove('room-change'); void panel.offsetWidth; panel.classList.add('room-change');
    }
    if (key === 'space') initModel();
  };
  $$('[data-room]').forEach((b, i, buttons) => {
    b.addEventListener('click', () => changeRoom(b.dataset.room));
    b.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % buttons.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + buttons.length) % buttons.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { e.preventDefault(); buttons[next].focus(); changeRoom(buttons[next].dataset.room); }
    });
  });
  const requestedRoom = new URLSearchParams(location.search).get('room');
  if (Object.hasOwn(rooms, requestedRoom)) changeRoom(requestedRoom);
  $$('[data-view]').forEach(b => b.addEventListener('click', () => model?.view(b.dataset.view)));
  $('#room-inquiry')?.addEventListener('click', () => { if ($('#service') && activeRoom !== 'master') $('#service').value = activeRoom === 'space' ? 'Studio tour' : 'Recording'; });
  $$('[data-service]').forEach(a => a.addEventListener('click', () => { if ($('#service')) $('#service').value = a.dataset.service; }));
  // Native dialog provides focus containment and Escape handling.
  const lightbox = $('#lightbox'); const photos = $$('[data-gallery]'); let photoIndex = 0;
  const setPhoto = i => { photoIndex = (i + photos.length) % photos.length; const photo = photos[photoIndex]; $('#lightbox-image').src = photo.href; $('#lightbox-image').alt = $('img', photo).alt; $('#lightbox-caption').textContent = photo.dataset.caption; };
  if (lightbox?.showModal) {
    photos.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); setPhoto(i); lightbox.showModal(); document.body.style.overflow = 'hidden'; }));
    $('#close-lightbox').addEventListener('click', () => lightbox.close());
    $('#previous-photo').addEventListener('click', () => setPhoto(photoIndex - 1)); $('#next-photo').addEventListener('click', () => setPhoto(photoIndex + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) { const r = lightbox.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) lightbox.close(); } });
    lightbox.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); setPhoto(photoIndex - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); setPhoto(photoIndex + 1); } });
    lightbox.addEventListener('close', () => { document.body.style.overflow = ''; photos[photoIndex].focus(); });
  }
  const play = $('#load-performance');
  if (play) {
    play.hidden = false;
    play.addEventListener('click', () => {
      const player = document.createElement('iframe');
      player.src = 'https://www.youtube-nocookie.com/embed/jjQFPlDKdzM?rel=0';
      player.title = 'Charles Wesley Godwin — The Jealous Kind, Live From The Church';
      player.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.allowFullscreen = true;
      $('#performance').replaceChildren(player);
      player.focus();
      $('#video-privacy').textContent = 'YouTube is now connected. If playback is unavailable, use the Watch on YouTube link.';
    });
  }
  const form = $('#inquiry-form'); let message = '';
  if (form) {
    const status = $('#form-status');
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!form.reportValidity()) return;
      const values = new FormData(form); const value = name => String(values.get(name) || '').trim();
      if (!value('name') || !value('project')) { status.textContent = 'Please add your name and a short description of the project.'; return; }
      const subject = `${value('service')} inquiry — ${value('name')}`;
      message = `Hello The Church,\n\nI’m interested in ${value('service').toLowerCase()}.\n\nName: ${value('name')}\nReply email: ${value('email')}\nIdeal dates: ${value('dates') || 'Flexible / to discuss'}\n${activeRoom === 'a' || activeRoom === 'b' ? `Room of interest: Studio ${activeRoom.toUpperCase()}\n` : ''}\n${value('project')}\n\nThanks,\n${value('name')}`;
      $('#inquiry-preview').textContent = message;
      $('#open-email').href = `mailto:info@thechurchrecordingstudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      $('#inquiry-result').hidden = false;
      status.textContent = 'Your inquiry is ready to review below. It has not been sent.';
      $('#inquiry-result').scrollIntoView({ behavior: manualPause || reduced.matches ? 'instant' : 'smooth', block: 'nearest' });
    });
    $('#copy-inquiry').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(message); status.textContent = 'Message copied. Paste it into an email to info@thechurchrecordingstudio.com.'; }
      catch { status.textContent = 'Copy isn’t available in this browser. Select the message above, or use Download message.'; const r = document.createRange(); r.selectNodeContents($('#inquiry-preview')); getSelection().removeAllRanges(); getSelection().addRange(r); $('#inquiry-preview').focus(); }
    });
    $('#download-inquiry').addEventListener('click', () => {
      const u = URL.createObjectURL(new Blob([message], {type:'text/plain;charset=utf-8'})); const a = document.createElement('a'); a.href = u; a.download = 'the-church-project-inquiry.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); status.textContent = 'Message downloaded. Attach it or paste it into an email to the studio.';
    });
  }
  const search = $('#gear-search');
  if (search) {
    const groups = $$('.equipment-group'); const items = $$('.equipment-group li');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase(); let count = 0;
      items.forEach(item => { const match = item.textContent.toLowerCase().includes(query); item.hidden = !match; if (match) count++; });
      groups.forEach(group => { group.hidden = !$$('li:not([hidden])',group).length; if (query && !group.hidden) group.open = true; });
      $('#gear-status').textContent = `${count} ${count === 1 ? 'item' : 'items'}${query ? ' found' : ' in the collection'}`;
      $('#no-gear').hidden = count !== 0;
    });
  }
})();
