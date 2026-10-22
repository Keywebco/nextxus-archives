(function(){
  const rootOrb = document.querySelector('.orb[data-orb]'); if(!rootOrb) return;

  const type = (rootOrb.dataset.orb || '').toLowerCase(); // orca|keyhole-rss|echo-rss|nextxus-rss
  const manifestUrl = rootOrb.dataset.manifest || '/orbs/manifest.json';
  const theme = rootOrb.dataset.theme || (type==='orca' ? 'onyx' : 'blue');
  rootOrb.setAttribute('data-theme', theme);

  const dlg = document.createElement('dialog');
  dlg.className = 'orb-dialog';
  dlg.innerHTML = `
    <form method="dialog" class="orb-form">
      <h1 class="orb-h1" id="orbTitle">${rootOrb.dataset.title || 'Orb'}</h1>
      <p class="orb-sub" id="orbSub">${rootOrb.dataset.subtitle || ''}</p>
      <div id="orbContent"></div>
      <menu class="orb-row"><button class="orb-btn ghost">Close</button></menu>
    </form>`;
  document.body.appendChild(dlg);
  const content = dlg.querySelector('#orbContent');
  const titleEl = dlg.querySelector('#orbTitle');
  const subEl = dlg.querySelector('#orbSub');

  const state = { manifest:null, routes:{}, es:null };

  function byId(id){
    return (state.manifest?.routes || []).find(r => r.id === id) || null;
  }
  function authHeaders(){
    const a = state.manifest?.auth;
    if(!a || a.type==='none') return {};
    if(a.type==='apiKey') return { [a.headerOrParam||'x-api-key']: a.demoKey||'' };
    if(a.type==='bearer') return { 'Authorization': `Bearer ${a.demoKey||''}` };
    return {};
  }
  function h(tag, attrs={}, kids=[]){
    const el = document.createElement(tag);
    for(const [k,v] of Object.entries(attrs)){
      if(k==='class') el.className=v;
      else if(k.startsWith('on') && typeof v==='function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k,v);
    }
    (Array.isArray(kids)?kids:[kids]).forEach(c=>{
      if(c==null) return;
      el.appendChild(typeof c==='string' ? document.createTextNode(c) : c);
    });
    return el;
  }
  function pre(obj){ return h('pre',{}, JSON.stringify(obj,null,2)); }
  function escapeHtml(s){ return s.replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }

  async function loadManifest(){
    try{
      const res = await fetch(manifestUrl, { credentials:'include' });
      if(!res.ok) throw new Error(`Manifest ${res.status}`);
      state.manifest = await res.json();
    }catch(e){
      // Fallback if manifest not available: infer base from manifestUrl and build defaults
      const base = new URL(manifestUrl, location.href).origin;
      state.manifest = {
        routes: [
          { id:'orca-security-status', method:'GET', path:`${base}/orbs/orca/security/status` },
          { id:'orca-security-stream', method:'GET', path:`${base}/orbs/orca/security/stream` },
          { id:'rss-keyhole', method:'GET', path:`${base}/orbs/rss/keyhole` },
          { id:'rss-echo', method:'GET', path:`${base}/orbs/rss/echo` },
          { id:'rss-nextxus', method:'GET', path:`${base}/orbs/rss/nextxus` },
          { id:'status', method:'GET', path:`${base}/orbs/status` },
          { id:'health', method:'GET', path:`${base}/health` }
        ],
        auth:{ type:'none' }
      };
    }
  }

  function uiORCA(){
    titleEl.textContent = rootOrb.dataset.title || 'ORCA';
    subEl.textContent   = rootOrb.dataset.subtitle || 'SECURITY';
    const statusR = byId('orca-security-status');
    const streamR = byId('orca-security-stream');

    const out = h('div',{class:'orb-scroll'});
    const row = h('div',{class:'orb-row'},[
      h('button',{class:'orb-btn primary',onclick: async ()=>{
        try{
          const r = await fetch(statusR.path, { headers: authHeaders() });
          if(r.status===429){ out.innerHTML='<p>Rate limited.</p>'; return; }
          const j = await r.json(); out.innerHTML=''; out.append(pre(j));
        }catch(e){ out.innerHTML=`<p>Error: ${e.message}</p>`; }
      }},'Fetch Status'),
      h('button',{class:'orb-btn ghost',onclick: ()=>{
        if(state.es){ state.es.close(); state.es=null; out.prepend(document.createTextNode('[stream closed]\n')); return; }
        state.es = new EventSource(streamR.path);
        out.prepend(document.createTextNode(`[connecting ${streamR.path}] \n`));
        state.es.onmessage = (ev)=>{
          try{ out.prepend(pre(JSON.parse(ev.data))); }
          catch{ out.prepend(document.createTextNode(ev.data+'\n')); }
        };
        state.es.onerror = ()=> out.prepend(document.createTextNode('[stream error]\n'));
      }}, 'Toggle Stream')
    ]);
    content.innerHTML=''; content.append(row,out);
  }

  function rssCommonUI(kind, config){
    titleEl.textContent = rootOrb.dataset.title || config.title;
    subEl.textContent   = rootOrb.dataset.subtitle || 'RSS ORB';
    const r = byId(config.routeId);
    const out = h('div',{class:'orb-scroll'});

    const grid = h('div',{class:'orb-grid'}, config.fields.map(f=>{
      if(f.type==='select'){
        const sel = h('select',{id:f.id,class:'orb-select'}, f.options.map(o=> h('option',{value:o},o)));
        sel.value = f.value || f.options?.[0] || '';
        return h('div',{},[h('label',{},f.label), sel]);
      }
      const inp = h('input',{id:f.id,placeholder:f.placeholder||'',class:'orb-input',type:f.inputType||'text', value:f.value||''});
      return h('div',{},[h('label',{},f.label), inp]);
    }));

    const run = h('button',{class:'orb-btn primary',onclick: async ()=>{
      try{
        const url = new URL(r.path, location.origin);
        for(const f of config.fields){
          const el = document.getElementById(f.id);
          const val = (el?.value||'').trim();
          if(val || f.always) url.searchParams.set(f.qs||f.id, val);
        }
        const resp = await fetch(url.toString(), { headers:{ 'Accept':'application/rss+xml, text/xml, */*' }});
        if(resp.status===429){ out.innerHTML='<p>Rate limited.</p>'; return; }
        const txt = await resp.text();
        const xml = new DOMParser().parseFromString(txt, 'text/xml');
        const items = [...xml.querySelectorAll('item')];
        if(!items.length){ out.innerHTML='<p>No items.</p>'; return; }
        const rows = items.map(it=>{
          const t = it.querySelector('title')?.textContent || '';
          const l = it.querySelector('link')?.textContent || '';
          const d = it.querySelector('pubDate')?.textContent || '';
          return `<tr><td><a href="${l}" target="_blank" rel="noopener">${escapeHtml(t)}</a></td><td>${escapeHtml(l)}</td><td>${escapeHtml(d)}</td></tr>`;
        }).join('');
        out.innerHTML = `<table class="orb-table"><thead><tr><th>Title</th><th>Link</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table>`;
      }catch(e){ out.innerHTML = `<p>Error: ${e.message}</p>`; }
    }}, 'Load');

    content.innerHTML=''; content.append(grid, h('div',{class:'orb-row'}, run), out);
  }

  function uiKeyhole(){ rssCommonUI('keyhole', {
    title:'Keyhole Today',
    routeId:'rss-keyhole',
    fields:[
      { id:'site', label:'site', placeholder:'example.com' },
      { id:'limit', label:'limit', inputType:'number', value:'10' },
      { id:'paid', label:'paid', type:'select', options:['false','true'], value:'false' }
    ]
  }); }

  function uiEcho(){ rssCommonUI('echo', {
    title:'eCho',
    routeId:'rss-echo',
    fields:[
      { id:'topic', label:'topic', placeholder:'ai ethics' },
      { id:'source', label:'source', type:'select', options:['nextxus','user'], value:'nextxus' },
      { id:'limit', label:'limit', inputType:'number', value:'10' },
      { id:'paid', label:'paid', type:'select', options:['false','true'], value:'false' }
    ]
  }); }

  function uiNextxus(){ rssCommonUI('nextxus', {
    title:'NexTxuS',
    routeId:'rss-nextxus',
    fields:[
      { id:'site', label:'site', placeholder:'partner-site.com' },
      { id:'member', label:'member', type:'select', options:['false','true'], value:'false' },
      { id:'limit', label:'limit', inputType:'number', value:'10' }
    ]
  }); }

  // mount
  rootOrb.addEventListener('click', async ()=>{
    if(state.es){ state.es.close(); state.es=null; }
    await loadManifest();
    if(type==='orca'){ uiORCA(); }
    else if(type==='keyhole-rss'){ uiKeyhole(); }
    else if(type==='echo-rss'){ uiEcho(); }
    else { uiNextxus(); } // default
    dlg.showModal();
  });
})();
