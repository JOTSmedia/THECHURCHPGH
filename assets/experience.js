/* Bounded opening and optional, input-rendered console study. No remote runtime. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => reduced.matches || document.documentElement.classList.contains('motion-paused');
  const opening = $('#opening');
  let openingTimer, exitTimer, progressFrame, generation = 0, returnFocus, shown = 0;
  const paintProgress = value => {
    shown = Math.max(0, Math.min(100, value));
    const integer = Math.floor(shown);
    $('#opening-percent').textContent = `${integer}%`;
    $('#opening-fill').style.transform = `scaleX(${shown / 100})`;
    $('#opening-progress').setAttribute('aria-valuenow', String(integer));
  };
  const leave = (reason = 'skip') => {
    if (!opening?.open || opening.classList.contains('is-leaving')) return;
    clearTimeout(openingTimer); cancelAnimationFrame(progressFrame);
    if (reason === 'ready') paintProgress(100);
    $('#opening-status').textContent = reason === 'ready' ? 'Studio ready.' : reason === 'timeout' ? 'Continuing with available assets.' : 'Entering the studio.';
    scrollTo({top:0,left:0,behavior:'instant'});
    opening.classList.add('is-leaving');
    exitTimer = setTimeout(() => opening.close(), paused() ? 0 : 580);
  };
  const open = (replay = false) => {
    if (!opening?.showModal || opening.open) return;
    generation++; const run = generation;
    returnFocus = replay ? $('#hero-title') : null;
    if (replay) { returnFocus.tabIndex=-1; scrollTo({top:0,left:0,behavior:'instant'}); }
    opening.classList.remove('is-leaving');
    $('#opening-status').textContent = 'Preparing the studio.';
    paintProgress(0);
    document.documentElement.classList.add('opening-active');
    opening.showModal();
    let complete = 0, target = 0, tween = {from:0,to:0,start:performance.now()};
    const earliestExit = performance.now() + (paused() ? 0 : 1350);
    const resources = [
      () => $('.hero-photo img').decode(),
      () => document.fonts.load('400 24px "Libre Caslon Display"'),
      () => document.fonts.load('400 16px Chivo'),
      () => document.fonts.load('900 19px Chivo')
    ];
    const settled = () => {
      if (run !== generation || !opening.open || opening.classList.contains('is-leaving')) return;
      complete++; target = complete / resources.length * 100;
      tween = {from:shown,to:target,start:performance.now()};
    };
    resources.forEach(resource => Promise.resolve().then(resource).then(settled, settled));
    const tick = now => {
      if (run !== generation || !opening.open || opening.classList.contains('is-leaving')) return;
      const p = paused() ? 1 : Math.min(1, (now - tween.start) / 500);
      paintProgress(tween.from + (tween.to - tween.from) * (1 - Math.pow(1-p,3)));
      if (complete === resources.length && p === 1 && now >= earliestExit) { paintProgress(100); leave('ready'); return; }
      progressFrame = requestAnimationFrame(tick);
    };
    progressFrame = requestAnimationFrame(tick);
    // Failed/slow resources never trap the visitor. Progress describes prepared opening assets,
    // including fallbacks, rather than claiming to measure all website download bytes.
    openingTimer = setTimeout(() => leave(complete === resources.length ? 'ready' : 'timeout'), paused() ? 900 : 3200);
  };
  if (opening) {
    opening.addEventListener('cancel', e => { e.preventDefault(); leave('skip'); });
    $('#skip-opening').addEventListener('click', () => leave('skip'));
    opening.addEventListener('close', () => {
      clearTimeout(openingTimer); clearTimeout(exitTimer); cancelAnimationFrame(progressFrame); generation++;
      scrollTo({top:0,left:0,behavior:'instant'});
      document.documentElement.classList.remove('opening-active');
      requestAnimationFrame(() => scrollTo({top:0,left:0,behavior:'instant'}));
      if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
    });
    const replay = $('.opening-replay');
    if (replay) { replay.hidden = false; replay.addEventListener('click', () => open(true)); }
    const query = new URLSearchParams(location.search);
    const refresh = performance.getEntriesByType('navigation')[0]?.type === 'reload';
    if (refresh) scrollTo({top:0,left:0,behavior:'instant'});
    if (refresh || query.get('opening') === 'play' || (!location.hash && !query.has('room') && query.get('opening') !== 'skip')) open();
  }
  const instagram = $('.instagram-frame');
  const reloadInstagram = $('#reload-instagram');
  if (instagram && reloadInstagram) {
    reloadInstagram.hidden = false;
    let reloadTimer;
    instagram.addEventListener('load', () => { if (reloadInstagram.disabled) { clearTimeout(reloadTimer); reloadInstagram.disabled=false; $('#instagram-status').textContent='Profile view reloaded. Use Open profile if Instagram is unavailable.'; } });
    reloadInstagram.addEventListener('click', () => {
      reloadInstagram.disabled=true; clearTimeout(reloadTimer);
      reloadTimer=setTimeout(() => { reloadInstagram.disabled=false; $('#instagram-status').textContent='Instagram is taking longer to respond. Use Open profile or try again.'; },10000);
      instagram.src = 'https://www.instagram.com/thechurchrecordingstudio/embed/';
      $('#instagram-status').textContent = 'Reloading Instagram. If the feed is unavailable, use Open profile.';
    });
  }
  // Ambient reading motion yields immediately to visitor activity.
  {
    let timer, frame = 0, running = false, last = 0, position = 0, written = 0, keyboard = false, pressed = false;
    const speed = 56.4;
    const blocked = () => {
      const active = document.activeElement;
      return pressed || paused() || document.hidden || !!document.querySelector('dialog[open],#navigation.is-open') ||
        !!active?.matches('input,textarea,select,iframe,canvas,[contenteditable="true"]') ||
        (keyboard && !!active?.closest('a,button,summary')) ||
        !!document.querySelector('iframe:hover') || getSelection()?.isCollapsed === false;
    };
    const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; running = false; };
    const arm = () => {
      clearTimeout(timer); stop();
      if (!paused() && !document.hidden) timer = setTimeout(start, 12000);
    };
    const tick = now => {
      frame = 0;
      if (blocked()) { arm(); return; }
      const end = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      if (position >= end - 1) { stop(); return; }
      position = Math.min(end, position + Math.min(50, now - last) / 1000 * speed); last = now;
      scrollTo({top:position,left:0,behavior:'instant'}); written = scrollY;
      frame = requestAnimationFrame(tick);
    };
    function start() {
      if (blocked()) { arm(); return; }
      position = scrollY; written = scrollY; last = performance.now(); running = true;
      frame = requestAnimationFrame(tick);
    }
    addEventListener('pointerdown', () => { keyboard = false; pressed = true; arm(); }, {passive:true});
    addEventListener('pointerup', () => { pressed = false; arm(); }, {passive:true});
    addEventListener('pointercancel', () => { pressed = false; arm(); }, {passive:true});
    addEventListener('blur', () => { pressed = false; arm(); });
    addEventListener('pointermove', arm, {passive:true});
    addEventListener('wheel', arm, {passive:true});
    addEventListener('touchstart', arm, {passive:true});
    addEventListener('keydown', () => { keyboard = true; arm(); });
    addEventListener('scroll', () => { if (!running || Math.abs(scrollY - written) > 3) arm(); }, {passive:true});
    document.addEventListener('focusin', arm);
    document.addEventListener('selectionchange', arm);
    document.addEventListener('visibilitychange', arm);
    document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', arm));
    new MutationObserver(arm).observe(document.documentElement, {attributes:true,attributeFilter:['class']});
    reduced.addEventListener('change', arm); arm();
  }

  const stage = $('#console-stage'); if (!stage) return;
  const container = $('#console-model');
  // Keep the installation photograph in the model container so it remains the module's fallback.
  const poster = $('.console-poster'); poster.classList.add('model-fallback'); container.append(poster);
  const load = $('#load-console'); load.hidden = false;
  let model, modelPromise;
  const details = {
    overview:['40 channels.\nDual path.', 'The Church’s split-frame 2448, with the workstation between two channel banks.'],
    channel:['Channel strips.', 'Microphone preamp, dual signal paths and long-throw fader. Choose a channel in the model or the selector.'],
    eq:['API equalization.', '550A and 560 equalizers form the 2448’s modular EQ section. The model illustrates the control layout.'],
    bus:['Bus & routing.', 'Eight summing buses, eight auxiliary buses and four stereo returns.']
  };
  let selected = 'overview';
  const showDetail = (key, channel) => {
    if (!details[key]) return; selected = key;
    if (channel) { $('#console-channel').value = channel.channel; $('#fader-level').value = channel.faderValue; $('#fader-output').value = `${Math.round(channel.faderValue)}%`; }
    document.querySelectorAll('[data-console-zone]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.consoleZone === key)));
    $('#console-detail-title').textContent = details[key][0];
    $('#console-detail-copy').textContent = details[key][1];
    $('#console-fader').hidden = key !== 'channel' || !model;
  };
  const init = () => {
    if (model) return Promise.resolve(model);
    if (modelPromise) return modelPromise;
    load.disabled = true; load.textContent = 'Opening the console…';
    $('#console-status').textContent = 'Loading the interactive console.';
    modelPromise = (async () => {
      try {
        const module = await import('./console-3d.js');
        model = await module.createConsole(container, $('#console-status'), {onSectionChange:showDetail});
        load.hidden = true; $('.console-orbit').hidden = false;
        container.querySelector('canvas')?.focus({preventScroll:true});
        showDetail(selected); model.view(selected);
        return model;
      } catch {
        $('#console-status').textContent = '3D is unavailable in this browser. The installation photograph and console details remain available.';
        load.hidden = true; poster.hidden = false;
      }
    })();
    return modelPromise;
  };
  load.addEventListener('click', init);
  if (new URLSearchParams(location.search).get('console') === '3d') init();
  document.querySelectorAll('[data-console-zone]').forEach(b => b.addEventListener('click', () => { showDetail(b.dataset.consoleZone); model?.view(selected); }));
  document.querySelectorAll('[data-console-view]').forEach(b => b.addEventListener('click', () => model?.view(b.dataset.consoleView)));
  $('#console-channel').addEventListener('change', e => model?.selectChannel(e.target.value));
  $('#fader-level').addEventListener('input', e => { $('#fader-output').value = `${e.target.value}%`; model?.setFader(e.target.value); });
  // Small native-scroll travel through the actual architecture; no idle animation loop.
  const hero = $('.sanctuary'); let visible = true, frame;
  const paintHero = () => { frame = 0; const y = paused() ? 0 : Math.min(innerHeight, scrollY); $('.hero-photo').style.transform = `translateY(${y * .12}px)`; };
  const scroll = () => { if (visible && !frame) frame = requestAnimationFrame(paintHero); };
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) scroll(); }).observe(hero);
    addEventListener('scroll', scroll, {passive:true}); reduced.addEventListener('change', paintHero);
    new MutationObserver(paintHero).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
  }
})();
