/* ===== ORIGINAL SCRIPT BLOCK 1 ===== */
document.querySelectorAll('.file').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.translate=`${x*8}px ${y*8}px`;
  });
  el.addEventListener('mouseleave',()=>el.style.translate='0 0');
});

/* ===== ORIGINAL SCRIPT BLOCK 2 ===== */
(function(){
 const canvas=document.getElementById('scratchCanvas'), area=document.getElementById('scratchArea');
 if(!canvas) return;
 const ctx=canvas.getContext('2d'); let drawing=false,last={x:0,y:0},progress=0,completed=false;
 const fill=document.getElementById('progressFill'),txt=document.getElementById('progressText'),done=document.getElementById('scratchDone');
 const evidence=[...document.querySelectorAll('.evidence')];
 function setup(){
   const dpr=Math.min(window.devicePixelRatio||1,2), r=area.getBoundingClientRect();
   canvas.width=r.width*dpr; canvas.height=r.height*dpr; canvas.style.width=r.width+'px'; canvas.style.height=r.height+'px';
   ctx.setTransform(dpr,0,0,dpr,0,0);
   const g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#25272d');g.addColorStop(.5,'#5d5f64');g.addColorStop(1,'#25272d');
   ctx.globalCompositeOperation='source-over';ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);
   ctx.fillStyle='rgba(255,255,255,.10)';ctx.font='12px DM Mono';ctx.letterSpacing='2px';
   for(let y=35;y<r.height;y+=70) for(let x=20;x<r.width;x+=140) ctx.fillText('CLASSIFIED · EVIDENCE',x,y);
   // grain dots
   for(let i=0;i<4500;i++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*.09})`;ctx.fillRect(Math.random()*r.width,Math.random()*r.height,1,1)}
   progress=0;completed=false;fill.style.width='0%';txt.textContent='0%';done.classList.remove('show');area.style.display='block';evidence.forEach(e=>e.classList.remove('show'));
 }
 function pos(e){const r=canvas.getBoundingClientRect();const p=e.touches?e.touches[0]:e;return{x:p.clientX-r.left,y:p.clientY-r.top}}
 function scratch(x,y,px,py){
   ctx.globalCompositeOperation='destination-out';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=42;
   ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke();
   // subtle particle specks
   ctx.lineWidth=5;for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(x+(Math.random()-.5)*50,y+(Math.random()-.5)*30,2+Math.random()*3,0,Math.PI*2);ctx.fill()}
 }
 let samples=[];
 function check(){
   const r=area.getBoundingClientRect();let total=0,clear=0,step=10;
   try{const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;for(let y=0;y<canvas.height;y+=step*2){for(let x=0;x<canvas.width;x+=step*2){total++;if(data[(y*canvas.width+x)*4+3]<40)clear++}}progress=Math.min(100,Math.round(clear/total*100));}catch(e){}
   fill.style.width=progress+'%';txt.textContent=progress+'%';
   const stage=Math.min(4,Math.ceil(progress/20)); evidence.forEach((e,i)=>{if(i<stage)e.classList.add('show')});
   if(progress>=75&&!completed){completed=true;canvas.style.transition='opacity .65s';canvas.style.opacity='0';setTimeout(()=>{area.style.display='none';done.classList.add('show')},650)}
 }
 function start(e){if(completed)return;drawing=true;last=pos(e);e.preventDefault()}
 function move(e){if(!drawing||completed)return;const p=pos(e);scratch(p.x,p.y,last.x,last.y);last=p;if(Math.random()>.65)check();e.preventDefault()}
 function end(){if(drawing)check();drawing=false}
 canvas.addEventListener('mousedown',start);canvas.addEventListener('mousemove',move);window.addEventListener('mouseup',end);
 canvas.addEventListener('touchstart',start,{passive:false});canvas.addEventListener('touchmove',move,{passive:false});canvas.addEventListener('touchend',end);
 document.getElementById('replayScratch').addEventListener('click',()=>{canvas.style.transition='none';canvas.style.opacity='1';setup()});
 window.addEventListener('resize',setup);setup();
})();

/* ===== ORIGINAL SCRIPT BLOCK 3 ===== */
(function(){
const KEY='fixmywallet-case-state';
let s=JSON.parse(localStorage.getItem(KEY)||'{"resolved":[],"watching":[],"xp":0,"statuses":{}}');
const fix=document.getElementById('fixHabitBtn'),watch=document.getElementById('watchCaseBtn'),done=document.getElementById('scratchDone');
if(!fix||!watch)return;
const toast=document.createElement('div');toast.style.cssText='position:fixed;left:50%;bottom:30px;transform:translateX(-50%);background:#315cff;color:#fff;padding:14px 22px;z-index:99;font-weight:800;display:none';document.body.appendChild(toast);
const save=()=>localStorage.setItem(KEY,JSON.stringify(s));
const feedback=t=>{toast.textContent=t;toast.style.display='block';setTimeout(()=>toast.style.display='none',1800)};
function enable(){fix.disabled=false;watch.disabled=false;fix.style.opacity=watch.style.opacity='1'}
new MutationObserver(()=>{if(done&&done.classList.contains('show'))enable()}).observe(done,{attributes:true,attributeFilter:['class']});
function act(type){
 if(fix.disabled&&watch.disabled)return;
 fix.disabled=watch.disabled=true;
 const m=(document.querySelector('.scratch-header .meta')?.textContent||'').match(/#(\d+)/),id=m?m[1]:'024';
 if(type==='fix'){if(!s.resolved.includes(id)){s.resolved.push(id);s.xp+=50}s.watching=s.watching.filter(x=>x!==id);s.statuses[id]='RESOLVED';feedback('Habit fixed. Your wallet just got healthier.')}
 else {if(!s.resolved.includes(id)&&!s.watching.includes(id))s.watching.push(id);if(!s.resolved.includes(id))s.statuses[id]='WATCHING';feedback('Case added to your watchlist.')}
 save();setTimeout(()=>document.getElementById('nextCase')?.click(),2100);
}
fix.addEventListener('click',()=>act('fix'));watch.addEventListener('click',()=>act('watch'));
})();

/* ===== ORIGINAL SCRIPT BLOCK 4 ===== */
(function(){
  const STORAGE='fixmywallet-unified-state-v3';
  const CASES=[
    {id:'024',title:'THE MIDNIGHT FOOD DELIVERY',amount:487,merchant:'Swiggy',date:'Friday',time:'11:48 PM',reason:'Late-night convenience',pattern:'3 similar purchases after 10 PM this month',impact:1563,annual:18756,xp:50},
    {id:'025',title:'THE ₹299 CONVENIENCE TRAP',amount:299,merchant:'Blinkit',date:'Saturday',time:'9:32 PM',reason:'Low-friction impulse purchase',pattern:'6 similar quick-commerce orders this month',impact:1794,annual:21528,xp:40},
    {id:'026',title:'THE SUBSCRIPTION YOU FORGOT',amount:499,merchant:'Streaming+',date:'Monday',time:'2:10 PM',reason:'Automatic renewal',pattern:'No usage detected for 31 days',impact:499,annual:5988,xp:100}
  ];
  const initial={cases:Object.fromEntries(CASES.map(c=>[c.id,{status:'ACTIVE',progress:0}])),xp:0,resolvedHistory:[],watchlist:[],insightSavings:0};
  let state;
  try{ state=JSON.parse(localStorage.getItem(STORAGE)) || initial }catch(e){state=initial}
  state.cases=state.cases||initial.cases; state.resolvedHistory=state.resolvedHistory||[]; state.watchlist=state.watchlist||[];
  CASES.forEach(c=>state.cases[c.id]=state.cases[c.id]||{status:'ACTIVE',progress:0});
  let idx=0,busy=false;
  const save=()=>localStorage.setItem(STORAGE,JSON.stringify(state));
  const $=s=>document.querySelector(s);
  const toast=$('#toast')||Object.assign(document.body.appendChild(document.createElement('div')),{id:'toast'});
  function notify(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1900)}
  function renderState(){
    $('#dashboardResolved').textContent=state.resolvedHistory.length;
    $('#dashboardWatching').textContent=state.watchlist.length;
    $('#dashboardXP').textContent=state.xp;
    $('#resolvedCount')&&($('#resolvedCount').textContent=state.resolvedHistory.length);
    $('#watchCount')&&($('#watchCount').textContent=state.watchlist.length);
    $('#xpCount')&&($('#xpCount').textContent=state.xp);
    const board=$('#caseBoard'); board.innerHTML='';
    CASES.forEach(c=>{
      const st=state.cases[c.id].status;
      const color=st==='RESOLVED'?'#315cff':st==='WATCHING'?'#111318':'#f7f5f0';
      const text=st==='RESOLVED'?'CASE SOLVED ✓':st==='WATCHING'?'UNDER WATCH':'ACTIVE CASE';
      board.innerHTML+=`<div style="padding:22px;border:1px solid #111318;background:${color};color:${st==='ACTIVE'?'#111318':'#fff'}"><div style="font-family:DM Mono;font-size:10px;letter-spacing:1px;opacity:.7">CASE #${c.id} · ${text}</div><div style="font-size:23px;font-weight:900;line-height:1;margin:15px 0">${c.title}</div><div style="font-family:DM Mono;font-size:11px">₹${c.amount} · ${c.merchant}</div></div>`;
    });
    const hist=$('#resolvedHistory');
    hist.innerHTML=state.resolvedHistory.length?state.resolvedHistory.map(id=>{let c=CASES.find(x=>x.id===id);return `<div style="padding:17px 0;border-bottom:1px solid #111318;display:flex;justify-content:space-between;gap:20px"><b>CASE #${id} · ${c.title}</b><span style="font-family:DM Mono;color:#315cff">CASE SOLVED ✓ +${c.xp} XP</span></div>`}).join(''):'<div style="padding:20px 0;font-family:DM Mono;font-size:12px">NO RESOLVED CASES YET.</div>';
    $('#financialInsight').textContent=state.insightSavings?`You have fixed patterns worth an estimated ₹${state.insightSavings.toLocaleString('en-IN')}/month. Your financial behaviour is getting healthier.`:'No habit has been fixed yet. Your next investigation could change this.';
    save();
  }
  function caseData(){return CASES[idx]}
  function refreshCase(){
    const c=caseData(), header=$('.scratch-header');
    header.querySelector('.meta').textContent=`FINANCIAL CASE FILE · CASE #${c.id}`;
    header.querySelector('h3').textContent=c.title;
    header.querySelector('div[style*="font-size:30px"]').textContent='₹'+c.amount;
    const ev=[...document.querySelectorAll('.evidence')];
    ev[0].innerHTML=`<small>LAYER 01 · TRANSACTION</small><b>₹${c.amount} · ${c.merchant}</b><small>${c.date.toUpperCase()} · ${c.time}</small>`;
    ev[1].innerHTML=`<small>LAYER 02 · CONTEXT</small><b>${c.reason.toUpperCase()}</b><small>${c.pattern.toUpperCase()}</small>`;
    ev[2].innerHTML=`<small>LAYER 03 · PATTERN</small><b>PATTERN DETECTED</b><small>${c.pattern.toUpperCase()}</small>`;
    ev[3].innerHTML=`<small>LAYER 04 · ANNUAL IMPACT</small><strong>₹${c.annual.toLocaleString('en-IN')}/YEAR</strong><small>IF THIS PATTERN CONTINUES</small>`;
    $('#scratchDone').querySelector('.meta').textContent=`INVESTIGATION COMPLETE · CASE #${c.id}`;
    $('#scratchDone').querySelector('h2 + div').textContent=c.title;
    $('#nextCase').textContent=`CASE #${CASES[(idx+1)%CASES.length].id} →`;
  }
  function getFreshButtons(){
    ['fixHabitBtn','watchCaseBtn'].forEach(id=>{
      const old=$('#'+id); if(!old)return;
      const clone=old.cloneNode(true); old.replaceWith(clone);
      clone.disabled=true; clone.style.opacity='.4';
      clone.addEventListener('click',()=>action(id==='fixHabitBtn'?'RESOLVED':'WATCHING'));
    });
  }
  function enableActions(){if(!busy){['fixHabitBtn','watchCaseBtn'].forEach(id=>{let b=$('#'+id);b.disabled=false;b.style.opacity='1'})}}
  function disableActions(){['fixHabitBtn','watchCaseBtn'].forEach(id=>{let b=$('#'+id);b.disabled=true;b.style.opacity='.4'})}
  function action(type){
    if(busy)return;
    const c=caseData(), rec=state.cases[c.id];
    if(rec.status==='RESOLVED' && type==='RESOLVED')return;
    busy=true;disableActions();
    if(type==='RESOLVED'){
      if(!state.resolvedHistory.includes(c.id)){state.resolvedHistory.push(c.id);state.xp+=c.xp;state.insightSavings+=c.impact}
      state.watchlist=state.watchlist.filter(x=>x!==c.id); rec.status='RESOLVED'; rec.progress=100;
      notify('Habit fixed. Your wallet just got healthier.');
    } else {
      if(rec.status!=='RESOLVED'){rec.status='WATCHING'; if(!state.watchlist.includes(c.id))state.watchlist.push(c.id)}
      notify('Case added to your watchlist.');
    }
    renderState();
    setTimeout(nextCase,2200);
  }
  function nextCase(){
    idx=(idx+1)%CASES.length; busy=false; refreshCase(); resetScratch(); getFreshButtons(); renderState();
  }
  function resetScratch(){
    // invoke existing replay button to rebuild canvas and hide solved panel
    const replay=$('#replayScratch'); if(replay) replay.click();
    setTimeout(()=>{disableActions(); const d=$('#scratchDone');d.classList.remove('show')},50);
  }
  // Existing scratch implementation signals solved state via MutationObserver
  const done=$('#scratchDone');
  new MutationObserver(()=>{if(done.classList.contains('show')){const c=caseData();state.cases[c.id].progress=100;save();enableActions()}}).observe(done,{attributes:true,attributeFilter:['class']});
  // Persist scratch progress visually at least at completion and keep unified state
  getFreshButtons(); refreshCase(); renderState();
  // Ensure next case button is unified
  const next=$('#nextCase'); next.onclick=(e)=>{e.preventDefault();if(!busy){busy=true;disableActions();setTimeout(nextCase,200)}};
})();

/* ===== ORIGINAL SCRIPT BLOCK 5 ===== */
/* FINAL UNIFIED APPLICATION CONTROLLER */
(function () {
  const KEY = 'fixmywallet-production-state';
  const CASES = [
    {id:'024', title:'THE MIDNIGHT FOOD DELIVERY', amount:487, merchant:'Swiggy', date:'Friday', time:'11:48 PM', category:'Food & Dining', reason:'Late-night convenience', pattern:'3 similar purchases after 10 PM this month', impact:1563, annual:18756, xp:50},
    {id:'025', title:'THE ₹299 CONVENIENCE TRAP', amount:299, merchant:'Blinkit', date:'Saturday', time:'9:32 PM', category:'Convenience', reason:'Low-friction impulse purchase', pattern:'6 similar quick-commerce orders this month', impact:1794, annual:21528, xp:40},
    {id:'026', title:'THE SUBSCRIPTION YOU FORGOT', amount:499, merchant:'Streaming+', date:'Monday', time:'2:10 PM', category:'Subscription', reason:'Automatic renewal', pattern:'No usage detected for 31 days', impact:499, annual:5988, xp:100}
  ];

  const fresh = () => ({
    xp:0,
    cases:Object.fromEntries(CASES.map(c=>[c.id,{status:'ACTIVE',progress:0}])),
    resolved:[],
    watchlist:[],
    currentCase:0,
    savings:0
  });

  let state;
  try { state = {...fresh(), ...JSON.parse(localStorage.getItem(KEY)||'null')}; }
  catch(e){ state=fresh(); }
  state.cases=state.cases||fresh().cases;
  state.resolved=state.resolved||[];
  state.watchlist=state.watchlist||[];
  CASES.forEach(c=>state.cases[c.id]=state.cases[c.id]||{status:'ACTIVE',progress:0});

  const $ = (s)=>document.querySelector(s);
  const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
  const current=()=>CASES[state.currentCase % CASES.length];

  function toast(message){
    let t=$('#appToast');
    if(!t){
      t=document.createElement('div'); t.id='appToast';
      t.style.cssText='position:fixed;left:50%;bottom:32px;transform:translate(-50%,20px);opacity:0;background:#315cff;color:#fff;padding:15px 22px;border-radius:8px;z-index:9999;font-weight:800;box-shadow:0 15px 40px rgba(0,0,0,.25);transition:.3s';
      document.body.appendChild(t);
    }
    t.textContent=message;t.style.opacity='1';t.style.transform='translate(-50%,0)';
    clearTimeout(window.__toastTimer);
    window.__toastTimer=setTimeout(()=>{t.style.opacity='0';t.style.transform='translate(-50%,20px)'},1900);
  }

  function render(){
    const resolved=state.resolved.length, watching=state.watchlist.length;
    if($('#dashboardResolved')) $('#dashboardResolved').textContent=resolved;
    if($('#dashboardWatching')) $('#dashboardWatching').textContent=watching;
    if($('#dashboardXP')) $('#dashboardXP').textContent=state.xp;
    if($('#financialInsight')) $('#financialInsight').textContent =
      state.savings ? `You have fixed patterns worth an estimated ₹${state.savings.toLocaleString('en-IN')}/month. Your wallet is getting healthier.` :
      'No habit has been fixed yet. Your next investigation could change this.';

    const board=$('#caseBoard');
    if(board){
      board.innerHTML=CASES.map((c,i)=>{
        const st=state.cases[c.id].status;
        const label=st==='RESOLVED'?'CASE SOLVED ✓':st==='WATCHING'?'UNDER WATCH':'ACTIVE CASE';
        return `<button data-case="${i}" class="case-board-card" style="text-align:left;padding:22px;border:1px solid #111318;background:${st==='RESOLVED'?'#315cff':st==='WATCHING'?'#111318':'#f7f5f0'};color:${st==='ACTIVE'?'#111318':'#fff'};cursor:pointer;font:inherit">
          <div style="font-family:monospace;font-size:10px;letter-spacing:1px;opacity:.7">CASE #${c.id} · ${label}</div>
          <div style="font-size:22px;font-weight:900;line-height:1;margin:15px 0">${c.title}</div>
          <div style="font-family:monospace;font-size:11px">₹${c.amount} · ${c.merchant}</div>
        </button>`;
      }).join('');
      board.querySelectorAll('[data-case]').forEach(b=>b.onclick=()=>{
        state.currentCase=Number(b.dataset.case);save();loadCase();document.querySelector('#scratch').scrollIntoView({behavior:'smooth'});
      });
    }

    const history=$('#resolvedHistory');
    if(history) history.innerHTML=state.resolved.length
      ? state.resolved.map(id=>{const c=CASES.find(x=>x.id===id);return `<div style="padding:17px 0;border-bottom:1px solid #111318;display:flex;justify-content:space-between"><b>CASE #${id} · ${c.title}</b><span style="font-family:monospace;color:#315cff">CASE SOLVED ✓ +${c.xp} XP</span></div>`}).join('')
      : '<div style="padding:20px 0;font-family:monospace;font-size:12px">NO RESOLVED CASES YET.</div>';
    save();
  }

  function updateScratchText(){
    const c=current();
    const header=$('.scratch-header');
    header.querySelector('.meta').textContent=`FINANCIAL CASE FILE · CASE #${c.id}`;
    header.querySelector('h3').textContent=c.title;
    header.querySelector('div[style*="font-size:30px"]').textContent='₹'+c.amount;
    const ev=[...document.querySelectorAll('.evidence')];
    ev[0].innerHTML=`<small>LAYER 01 · TRANSACTION</small><b>₹${c.amount} · ${c.merchant}</b><small>${c.date.toUpperCase()} · ${c.time}</small>`;
    ev[1].innerHTML=`<small>LAYER 02 · CONTEXT</small><b>${c.reason.toUpperCase()}</b><small>${c.pattern.toUpperCase()}</small>`;
    ev[2].innerHTML=`<small>LAYER 03 · PATTERN</small><b>PATTERN DETECTED</b><small>${c.pattern.toUpperCase()}</small>`;
    ev[3].innerHTML=`<small>LAYER 04 · ANNUAL IMPACT</small><strong>₹${c.annual.toLocaleString('en-IN')}/YEAR</strong><small>IF THIS PATTERN CONTINUES</small>`;
    $('#scratchDone .meta').textContent=`INVESTIGATION COMPLETE · CASE #${c.id}`;
    $('#scratchDone h2 + div').textContent=c.title;
    $('#nextCase').textContent=`CASE #${CASES[(state.currentCase+1)%CASES.length].id} →`;
  }

  function disableActions(v=true){
    ['fixHabitBtn','watchCaseBtn'].forEach(id=>{const b=$('#'+id);if(b){b.disabled=v;b.style.opacity=v?'.4':'1';}});
  }

  function resetScratch(){
    disableActions(true);
    const done=$('#scratchDone');
    done.classList.remove('show');
    const replay=$('#replayScratch');
    if(replay) replay.click();
  }

  function loadCase(){
    updateScratchText();
    resetScratch();
    render();
  }

  function replaceButton(id, handler){
    const old=$('#'+id); if(!old)return null;
    const b=old.cloneNode(true); old.replaceWith(b);
    b.onclick=(e)=>{e.preventDefault();handler();};
    return b;
  }

  let acting=false;
  function resolveCase(){
    if(acting) return;
    const c=current(), rec=state.cases[c.id];
    acting=true; disableActions(true);
    if(rec.status!=='RESOLVED'){
      rec.status='RESOLVED'; rec.progress=100;
      if(!state.resolved.includes(c.id)){state.resolved.push(c.id);state.xp+=c.xp;state.savings+=c.impact;}
      state.watchlist=state.watchlist.filter(x=>x!==c.id);
    }
    save();render();toast('Habit fixed. Your wallet just got healthier.');
    setTimeout(()=>nextCase(),2100);
  }

  function watchCase(){
    if(acting) return;
    const c=current(), rec=state.cases[c.id];
    acting=true; disableActions(true);
    if(rec.status!=='RESOLVED'){
      rec.status='WATCHING';
      if(!state.watchlist.includes(c.id))state.watchlist.push(c.id);
    }
    save();render();toast('Case added to your watchlist.');
    setTimeout(()=>nextCase(),2100);
  }

  function nextCase(){
    state.currentCase=(state.currentCase+1)%CASES.length;
    acting=false;save();loadCase();
  }

  function wireActions(){
    replaceButton('fixHabitBtn',resolveCase);
    replaceButton('watchCaseBtn',watchCase);
    replaceButton('nextCase',()=>{if(!acting){acting=true;setTimeout(nextCase,120)}});
  }

  // Enable actions only when scratch is actually completed
  const done=$('#scratchDone');
  new MutationObserver(()=>{
    if(done.classList.contains('show')){
      const c=current(); state.cases[c.id].progress=100;save();
      if(!acting) disableActions(false);
    }
  }).observe(done,{attributes:true,attributeFilter:['class']});

  // Every navigation/action button works
  const scrollTo=(id)=>document.querySelector(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  const legacyInvestigateBtn=document.querySelector('.navbtn');
  if(legacyInvestigateBtn) legacyInvestigateBtn.onclick=()=>scrollTo('#scratch');
  document.querySelectorAll('.hero .cta')[0].onclick=()=>scrollTo('#scratch');
  document.querySelectorAll('.hero .cta')[1].onclick=()=>scrollTo('#appstate');
  document.querySelector('.final .cta').onclick=()=>scrollTo('#scratch');
  document.querySelectorAll('.file').forEach(f=>{f.style.cursor='pointer';f.onclick=()=>scrollTo('#scratch')});
  document.querySelectorAll('.navlinks a').forEach(a=>a.onclick=(e)=>{e.preventDefault();scrollTo(a.getAttribute('href'))});

  wireActions();
  loadCase();

  // Add visible reset-state utility for testing persistence
  window.FixMyWalletApp={state,getState:()=>JSON.parse(localStorage.getItem(KEY)),reset:()=>{localStorage.removeItem(KEY);location.reload()}};
})();

/* ===== ORIGINAL SCRIPT BLOCK 6 ===== */
(function(){
const TX_KEY='fixmywallet-transactions-v1';
const transactions=[
{id:'TXN-AX91F24',merchant:'Salary Credit',date:'2026-09-01T09:15',category:'Income',amount:50000,type:'CREDIT',status:'COMPLETED',account:'HDFC Bank · ••4821',notes:'Monthly salary credit'},
{id:'TXN-SW4827',merchant:'Swiggy',date:'2026-09-05T23:48',category:'Food',amount:487,type:'DEBIT',status:'COMPLETED',account:'UPI · HDFC ••4821',notes:'Late-night food delivery'},
{id:'TXN-AM1920',merchant:'Amazon',date:'2026-09-04T21:24',category:'Shopping',amount:1299,type:'DEBIT',status:'COMPLETED',account:'HDFC Credit Card',notes:'Online purchase'},
{id:'TXN-SP9921',merchant:'Spotify',date:'2026-09-03T14:10',category:'Entertainment',amount:299,type:'DEBIT',status:'COMPLETED',account:'UPI AutoPay',notes:'Monthly subscription'},
{id:'TXN-UB7732',merchant:'Uber',date:'2026-09-03T20:32',category:'Transportation',amount:180,type:'DEBIT',status:'COMPLETED',account:'UPI · HDFC ••4821',notes:'Ride payment'},
{id:'TXN-ZO5521',merchant:'Zomato',date:'2026-09-02T22:54',category:'Food',amount:650,type:'DEBIT',status:'COMPLETED',account:'UPI · HDFC ••4821',notes:'Food delivery'},
{id:'TXN-NF8821',merchant:'Netflix',date:'2026-09-02T19:30',category:'Entertainment',amount:999,type:'DEBIT',status:'COMPLETED',account:'Credit Card ••1932',notes:'Monthly subscription'},
{id:'TXN-EL1102',merchant:'TNEB Electricity',date:'2026-08-31T11:10',category:'Bills',amount:1840,type:'DEBIT',status:'COMPLETED',account:'UPI · HDFC ••4821',notes:'Electricity bill'},
{id:'TXN-PH4408',merchant:'Apollo Pharmacy',date:'2026-08-29T17:20',category:'Healthcare',amount:760,type:'DEBIT',status:'COMPLETED',account:'HDFC Debit Card',notes:'Medicines'},
{id:'TXN-TR2204',merchant:'Friend Transfer',date:'2026-08-28T16:40',category:'Transfers',amount:2000,type:'CREDIT',status:'COMPLETED',account:'UPI',notes:'Money received'},
{id:'TXN-BL0092',merchant:'Blinkit',date:'2026-08-27T21:05',category:'Food',amount:342,type:'DEBIT',status:'COMPLETED',account:'UPI',notes:'Groceries and convenience'},
{id:'TXN-CA3002',merchant:'ATM Cash Withdrawal',date:'2026-08-25T13:30',category:'Transfers',amount:1000,type:'TRANSFER',status:'COMPLETED',account:'HDFC Debit Card',notes:'Cash withdrawal'},
{id:'TXN-GY5571',merchant:'Cult Fit',date:'2026-08-22T07:15',category:'Healthcare',amount:899,type:'DEBIT',status:'PENDING',account:'UPI AutoPay',notes:'Fitness membership'},
{id:'TXN-CA8829',merchant:'Cab Ride',date:'2026-08-21T18:44',category:'Transportation',amount:325,type:'DEBIT',status:'COMPLETED',account:'UPI',notes:'Airport ride'},
{id:'TXN-GI0921',merchant:'Freelance Payment',date:'2026-08-20T12:10',category:'Income',amount:8500,type:'CREDIT',status:'COMPLETED',account:'HDFC Bank',notes:'Project payment'}
];
window.__FMW_DEFAULT_TX=transactions;
let data;try{data=JSON.parse(localStorage.getItem(TX_KEY))||transactions}catch(e){data=transactions}
const cats=['All','Money In','Money Out','Transfers','Bills','Food','Shopping','Transportation','Healthcare','Entertainment'];
let filter='All', selected=null;
const fmt=n=>'₹'+Math.abs(n).toLocaleString('en-IN');
const modal=document.getElementById('txModal');
document.getElementById('transactionsBtn').onclick=()=>{modal.classList.add('open');render()};
document.getElementById('txClose').onclick=()=>modal.classList.remove('open');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};
const filters=document.getElementById('txFilters');
cats.forEach(c=>{let b=document.createElement('button');b.className='filter-chip'+(c==='All'?' active':'');b.textContent=c;b.onclick=()=>{filter=c;[...filters.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');render()};filters.appendChild(b)});
['txSearch','txFrom','txTo','txMin','txMax','txSort'].forEach(id=>document.getElementById(id).addEventListener('input',render));
function filtered(){
 let a=[...data],q=document.getElementById('txSearch').value.toLowerCase(),from=document.getElementById('txFrom').value,to=document.getElementById('txTo').value,min=+document.getElementById('txMin').value||0,max=+document.getElementById('txMax').value||Infinity;
 a=a.filter(t=>{
  const d=t.date.slice(0,10);
  const cat=filter==='All'||(filter==='Money In'&&t.type==='CREDIT')||(filter==='Money Out'&&t.type==='DEBIT')||t.category===filter;
  return cat&&(t.merchant.toLowerCase().includes(q)||t.category.toLowerCase().includes(q))&&(!from||d>=from)&&(!to||d<=to)&&t.amount>=min&&t.amount<=max;
 });
 const s=document.getElementById('txSort').value;
 a.sort((x,y)=>s==='newest'?new Date(y.date)-new Date(x.date):s==='oldest'?new Date(x.date)-new Date(y.date):s==='high'?y.amount-x.amount:x.amount-y.amount);
 return a;
}
function render(){
 const a=filtered(),income=data.filter(t=>t.type==='CREDIT').reduce((s,t)=>s+t.amount,0),out=data.filter(t=>t.type==='DEBIT').reduce((s,t)=>s+t.amount,0);
 document.getElementById('txMoneyIn').textContent=fmt(income);document.getElementById('txMoneyOut').textContent=fmt(out);document.getElementById('txNet').textContent=fmt(income-out);document.getElementById('txCount').textContent=data.length+' TXNS';
 const list=document.getElementById('txList');
 if(!a.length){list.innerHTML='<div class="tx-empty">NO TRANSACTIONS FOUND</div>';return}
 list.innerHTML=a.map(t=>`<div class="tx-row" data-id="${t.id}">
 <div><div class="tx-merchant">${t.merchant}</div><div class="tx-meta">${new Date(t.date).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</div></div>
 <div><div>${t.category}</div><div class="tx-meta">${t.account}</div></div>
 <div class="${t.type==='CREDIT'?'credit':t.type==='DEBIT'?'debit':'neutral'}" style="font-weight:900">${t.type==='CREDIT'?'+':t.type==='DEBIT'?'-':'↔'} ${fmt(t.amount)}</div>
 <div><span class="badge ${t.status==='COMPLETED'?'credit':'neutral'}">${t.status}</span></div><div class="tx-meta">${t.type}</div></div>`).join('');
 list.querySelectorAll('.tx-row').forEach(r=>r.onclick=()=>showDetail(data.find(t=>t.id===r.dataset.id)));
}
function showDetail(t){
 selected=t;const d=document.getElementById('txDetail');d.classList.add('show');
 d.innerHTML=`<div style="font-family:monospace;font-size:10px;letter-spacing:2px;color:#8fa6ff">TRANSACTION DETAILS</div><h3 style="font-size:30px;margin:8px 0">${t.merchant}</h3><div style="font-size:34px;font-weight:900" class="${t.type==='CREDIT'?'credit':t.type==='DEBIT'?'debit':'neutral'}">${t.type==='CREDIT'?'+':t.type==='DEBIT'?'-':'↔'} ${fmt(t.amount)}</div>
 <div class="tx-detail-grid">
 <div><small>DATE & TIME</small><b>${new Date(t.date).toLocaleString('en-IN',{dateStyle:'full',timeStyle:'short'})}</b></div>
 <div><small>CATEGORY</small><b>${t.category}</b></div><div><small>TYPE</small><b>${t.type}</b></div><div><small>STATUS</small><b>${t.status}</b></div>
 <div><small>ACCOUNT USED</small><b>${t.account}</b></div><div><small>REFERENCE ID</small><b>${t.id}</b></div>
 <div style="grid-column:1/-1"><small>NOTES</small><b>${t.notes||'No additional notes available.'}</b></div></div>`;
 // Integration hook: persist transaction data for future dashboard/AI/chart modules
 localStorage.setItem('fixmywallet-financial-data',JSON.stringify({
   transactions:data,
   categorySpending:Object.fromEntries([...new Set(data.map(x=>x.category))].map(c=>[c,data.filter(x=>x.category===c&&x.type==='DEBIT').reduce((s,x)=>s+x.amount,0)])),
   totalIncome:incomeValue(),totalOutflow:outflowValue()
 }));
}
function incomeValue(){return data.filter(t=>t.type==='CREDIT').reduce((s,t)=>s+t.amount,0)}
function outflowValue(){return data.filter(t=>t.type==='DEBIT').reduce((s,t)=>s+t.amount,0)}
render();
})();

/* ===== ORIGINAL SCRIPT BLOCK 7 ===== */
document.addEventListener('DOMContentLoaded', function () {
  const buttons = [...document.querySelectorAll('button, a')];
  const investigate = buttons.find(el => el.textContent.trim().toUpperCase().includes('INVESTIGATE') &&
    el.textContent.trim().startsWith('+'));
  if (investigate) {
    investigate.style.position = 'relative';
    investigate.style.left = '18px';
  }
});

/* ===== ORIGINAL SCRIPT BLOCK 8 ===== */
document.addEventListener('DOMContentLoaded', function () {
  const buttons = [...document.querySelectorAll('button, a')];
  const investigate = buttons.find(el => el.textContent.trim().toUpperCase().includes('INVESTIGATE') &&
    el.textContent.trim().startsWith('+'));
  if (investigate) {
    investigate.style.position = 'relative';
    investigate.style.left = '45px';
  }
});

/* ===== ORIGINAL SCRIPT BLOCK 9 ===== */
/* INVESTIGATE + START 1ST CASE: COMPLETE FUNCTIONAL FLOW */
(function(){
  const KEY='fixmywallet-production-state';
  const overlay=document.getElementById('investigationOverlay');
  const steps=[...overlay.querySelectorAll('.inv-step')];
  const progress=document.getElementById('invProgressFill');
  let step=0, opened=false;

  function getState(){
    const fallback={xp:0,cases:{'024':{status:'ACTIVE',progress:0}},resolved:[],watchlist:[],currentCase:0,savings:0,firstCaseCompleted:false,firstCaseRewarded:false};
    try{return {...fallback,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return fallback}
  }
  function saveState(s){localStorage.setItem(KEY,JSON.stringify(s))}
  function showStep(n){
    step=Math.max(0,Math.min(5,n));
    steps.forEach((el,i)=>el.classList.toggle('active',i===step));
    progress.style.width=(step===0?8:Math.min(100,step*20))+'%';
  }
  function openInvestigation(startDirect=false){
    overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); opened=true;
    showStep(startDirect?1:0);
  }
  function closeInvestigation(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');opened=false}

  // Override the two requested buttons with real flows
  const navInvestigate=document.querySelector('.navbtn');
  if(navInvestigate) navInvestigate.onclick=(e)=>{e.preventDefault();openInvestigation(false)};
  const startButtons=[...document.querySelectorAll('button.cta')].filter(b=>/START (YOUR )?FIRST CASE/i.test(b.textContent));
  startButtons.forEach(b=>b.onclick=(e)=>{e.preventDefault();openInvestigation(true)});
  const heroStart=[...document.querySelectorAll('.hero .cta')].find(b=>/START INVESTIGATING/i.test(b.textContent));
  if(heroStart) heroStart.onclick=(e)=>{e.preventDefault();openInvestigation(false)};

  document.getElementById('invClose').onclick=closeInvestigation;
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeInvestigation()});
  document.getElementById('invStartBtn').onclick=()=>showStep(1);
  document.getElementById('invBack1').onclick=()=>showStep(0);

  overlay.querySelectorAll('.inv-back').forEach(b=>b.onclick=()=>showStep(step-1));
  overlay.querySelectorAll('.inv-clue[data-clue]').forEach(clue=>{
    clue.onclick=()=>{
      clue.classList.add('revealed');
      const next=clue.closest('.inv-step').querySelector('.inv-next, #invCompleteBtn');
      if(next) next.disabled=false;
    };
  });
  overlay.querySelectorAll('.inv-next').forEach(b=>b.onclick=()=>showStep(step+1));

  document.getElementById('invCompleteBtn').onclick=()=>{
    const s=getState();
    s.firstCaseCompleted=true;
    s.cases=s.cases||{};
    s.cases['024']=s.cases['024']||{status:'ACTIVE',progress:0};
    s.cases['024'].progress=100;
    if(!s.firstCaseRewarded){s.xp=(s.xp||0)+20;s.firstCaseRewarded=true;}
    saveState(s);
    // Update any live dashboard values without forcing a reload
    const xp=document.getElementById('dashboardXP'); if(xp) xp.textContent=s.xp;
    showStep(5);
  };

  document.getElementById('invToScratch').onclick=()=>{
    closeInvestigation();
    document.getElementById('scratch')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  document.getElementById('invDashboard').onclick=()=>{
    closeInvestigation();
    window.scrollTo({top:0,behavior:'smooth'});
  };

  // Make Enter/Escape keyboard navigation safe
  document.addEventListener('keydown',e=>{
    if(!opened)return;
    if(e.key==='Escape')closeInvestigation();
  });
})();

/* ===== ORIGINAL SCRIPT BLOCK 10 ===== */
/* VIEW ALL CASES REAL CASE ARCHIVE + PERSISTENT PROGRESS */
(function(){
 const KEY='fixmywallet-production-state';
 const overlay=document.getElementById('casesOverlay'), grid=document.getElementById('casesGrid');
 const listView=document.getElementById('casesListView'), detail=document.getElementById('caseDetailView');

 const cases=[
  {id:'024',title:'THE MIDNIGHT FOOD DELIVERY',desc:'A late-night Swiggy transaction reveals a repeating convenience pattern.',difficulty:'EASY',reward:20,unlock:0},
  {id:'025',title:'THE ₹299 CONVENIENCE TRAP',desc:'Small quick-commerce purchases quietly become a monthly money leak.',difficulty:'MEDIUM',reward:35,unlock:1},
  {id:'026',title:'THE FORGOTTEN SUBSCRIPTION',desc:'An automatic payment continues even though the service is barely used.',difficulty:'MEDIUM',reward:50,unlock:2},
  {id:'027',title:'THE WEEKEND SHOPPING SPIRAL',desc:'A pattern of evening browsing turns into repeated impulse purchases.',difficulty:'HARD',reward:75,unlock:3},
  {id:'028',title:'THE CAB VS METRO MYSTERY',desc:'Convenience spending may be replacing cheaper daily transport choices.',difficulty:'HARD',reward:90,unlock:4},
  {id:'029',title:'THE COFFEE PATTERN',desc:'Tiny daily purchases leave a surprisingly large annual footprint.',difficulty:'EASY',reward:30,unlock:5}
 ];
 function state(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
 function completedCount(){return (state().resolved||[]).length + (state().firstCaseCompleted?1:0)}
 function status(c){
   const s=state(), rec=s.cases?.[c.id];
   if(s.resolved?.includes(c.id)|| (c.id==='024'&&s.firstCaseCompleted))return 'COMPLETED';
   if(rec?.progress>0)return 'IN PROGRESS';
   if(completedCount()>=c.unlock)return 'AVAILABLE';
   return 'LOCKED';
 }
 function renderCases(){
   grid.innerHTML=cases.map(c=>{
     const st=status(c), locked=st==='LOCKED';
     return `<div class="case-select ${locked?'locked':''} ${st==='COMPLETED'?'completed':''} ${st==='IN PROGRESS'?'inprogress':''}" data-id="${c.id}">
      <div class="case-num">CASE #${c.id} · ${st}</div><h3>${c.title}</h3><div class="case-desc">${c.desc}</div>
      <div class="case-tags"><span class="case-tag">${c.difficulty}</span><span class="case-tag">+${c.reward} XP</span></div>
      <button class="case-action" ${locked?'disabled':''}>${locked?`UNLOCK: COMPLETE ${c.unlock} CASE${c.unlock>1?'S':''}`:st==='COMPLETED'?'REVIEW CASE →':st==='IN PROGRESS'?'CONTINUE CASE →':'START CASE →'}</button>
     </div>`}).join('');
   grid.querySelectorAll('.case-select:not(.locked)').forEach(card=>card.onclick=()=>openCase(card.dataset.id));
 }
 function openCase(id){
   const c=cases.find(x=>x.id===id), st=status(c), s=state();
   listView.classList.add('hidden');detail.classList.add('open');
   detail.innerHTML=`<button class="cases-back" id="backToCases">← ALL CASES</button>
    <div class="case-detail-card"><div class="case-num">CASE #${c.id} · ${st}</div><h2>${c.title}</h2><p style="font-size:18px;line-height:1.6">${c.desc}</p>
    <div class="case-info-grid"><div class="case-info"><small>DIFFICULTY</small><b>${c.difficulty}</b></div><div class="case-info"><small>REWARD</small><b>+${c.reward} XP</b></div><div class="case-info"><small>STATUS</small><b>${st}</b></div><div class="case-info"><small>OBJECTIVE</small><b>Follow clues → Find pattern → Complete</b></div></div>
    <button class="case-action" id="launchSpecificCase" style="padding:15px 22px">${st==='COMPLETED'?'REVIEW INVESTIGATION →':st==='IN PROGRESS'?'CONTINUE INVESTIGATION →':'START INVESTIGATION →'}</button></div>`;
   document.getElementById('backToCases').onclick=showList;
   document.getElementById('launchSpecificCase').onclick=()=>{
     // Persist selected case and progress, then use existing investigation experience.
     const app=state();app.currentCase=cases.findIndex(x=>x.id===id);app.cases=app.cases||{};app.cases[id]=app.cases[id]||{status:'ACTIVE',progress:1};app.cases[id].progress=Math.max(1,app.cases[id].progress||0);save(app);
     overlay.classList.remove('open');
     // Case 024 uses the detailed interactive clue flow already built.
     const investigate=document.querySelector('.navbtn');
     if(investigate){investigate.click();return}
     document.getElementById('scratch')?.scrollIntoView({behavior:'smooth'});
   };
 }
 function showList(){detail.classList.remove('open');listView.classList.remove('hidden');renderCases()}
 document.getElementById('casesBack').onclick=()=>overlay.classList.remove('open');
 // Find View All Cases by exact visible label and replace dead handler.
 const allButtons=[...document.querySelectorAll('button,a')];
 allButtons.filter(x=>/VIEW ALL CASES/i.test(x.textContent.trim())).forEach(btn=>{
   btn.onclick=e=>{e.preventDefault();overlay.classList.add('open');showList();window.scrollTo(0,0)};
 });
 window.addEventListener('storage',renderCases);
 renderCases();
})();

/* ===== ORIGINAL SCRIPT BLOCK 11 ===== */
/* FINANCIAL DETECTIVE LEAGUE persistent functional gamification */
(function(){
 const KEY='fixmywallet-production-state';
 const LEVELS=[
  {name:'ROOKIE DETECTIVE',min:0,next:500},
  {name:'MONEY SCOUT',min:500,next:1200},
  {name:'BUDGET DETECTIVE',min:1200,next:2200},
  {name:'FINANCE INVESTIGATOR',min:2200,next:3500},
  {name:'MONEY MASTER',min:3500,next:5000}
 ];
 const BADGES=[
  {id:'first',icon:'🔍',name:'First Investigation',rule:s=>s.firstCaseCompleted},
  {id:'savings',icon:'💰',name:'Savings Sleuth',rule:s=>(s.unnecessaryFound||0)>=5},
  {id:'streak7',icon:'🔥',name:'7-Day Streak',rule:s=>(s.streak||0)>=7},
  {id:'smart',icon:'🧠',name:'Smart Investigator',rule:s=>(s.smartSolves||0)>=5},
  {id:'master',icon:'💎',name:'Money Master',rule:s=>(s.xp||0)>=3500}
 ];
 function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
 function levelInfo(xp){
   let i=LEVELS.length-1;
   for(let n=0;n<LEVELS.length;n++){if(xp<LEVELS[n].next){i=n;break}}
   const l=LEVELS[i], denom=Math.max(1,l.next-l.min);
   return {...l,index:i,pct:Math.min(100,((xp-l.min)/denom)*100),current:xp-l.min,total:denom};
 }
 function toast(msg){const t=document.getElementById('gameToast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
 function renderLeague(){
   const s=load(), xp=s.xp||0, coins=s.fixCoins||0, solved=(s.resolved||[]).length+(s.firstCaseCompleted?1:0), li=levelInfo(xp);
   document.getElementById('leagueRank').textContent=li.name;
   document.getElementById('leagueLevelText').textContent=`LEVEL ${li.index+1} · ${Math.round(li.current)} / ${li.total} XP`;
   document.getElementById('leagueXpFill').style.width=li.pct+'%';
   document.getElementById('leagueXp').textContent=xp;
   document.getElementById('leagueCoins').textContent=coins;
   document.getElementById('leagueStreak').textContent=s.streak||0;
   document.getElementById('leagueSolved').textContent=solved;
   document.getElementById('leagueAvailable').textContent=Math.max(1,solved+1);
   const badges=s.badges||[];
   document.getElementById('badgeList').innerHTML=BADGES.map(b=>{
      const unlocked=b.rule(s)||badges.includes(b.id);
      return `<div class="badge-item ${unlocked?'':'locked'}" title="${b.name}">${b.icon}<span>${b.name}</span></div>`;
   }).join('');
 }
 function award(xp,coins,msg){
   const s=load(); const before=levelInfo(s.xp||0).index;
   s.xp=(s.xp||0)+xp;s.fixCoins=(s.fixCoins||0)+coins;s.badges=s.badges||[];
   BADGES.forEach(b=>{if(b.rule(s)&&!s.badges.includes(b.id))s.badges.push(b.id)});
   const after=levelInfo(s.xp).index; save(s); renderLeague();
   toast(after>before?`LEVEL UP! ${LEVELS[after].name} · +${xp} XP · 🪙 +${coins}`:(msg||`+${xp} XP · 🪙 +${coins} FixCoins`));
 }
 document.addEventListener('click',function(e){
   if(e.target?.id==='dailyMissionBtn'){
     const s=load();
     if(s.dailyMissionDate===new Date().toDateString()){toast('TODAY’S MISSION ALREADY COMPLETED ✓');return}
     s.dailyMissionDate=new Date().toDateString();s.streak=(s.streak||0)+1;s.unnecessaryFound=(s.unnecessaryFound||0)+1;save(s);
     award(100,10,'MISSION COMPLETE! +100 XP · 🪙 +10 FIXCOINS');
     e.target.textContent='MISSION COMPLETE ✓';e.target.disabled=true;
   }
 });
 window.fixMyWalletLeague={award,render:renderLeague,toast};
 setTimeout(renderLeague,100);
})();

/* ===== ORIGINAL SCRIPT BLOCK 12 ===== */
/* LEAGUE INTEGRATION: case rewards, progress, unlocks and interactive answer gameplay */
(function(){
 const KEY='fixmywallet-production-state';
 function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
 const originalComplete=document.getElementById('invCompleteBtn');
 if(originalComplete){
   originalComplete.addEventListener('click',()=>{
     const s=load(); if(!s.leagueFirstAwarded){
       s.leagueFirstAwarded=true;s.fixCoins=(s.fixCoins||0)+15;s.smartSolves=(s.smartSolves||0)+1;
       save(s);setTimeout(()=>window.fixMyWalletLeague?.award(230,0,'CASE SOLVED! +250 XP · 🪙 +15 FIXCOINS'),80);
     }
   });
 }
 // Decorate case cards whenever archive opens/renders.
 const observer=new MutationObserver(()=>{
   document.querySelectorAll('.case-select').forEach(card=>{
     if(card.dataset.gamified)return;
     card.dataset.gamified='1';
     const id=card.dataset.id||'';
     const rewards={024:'250 XP · 🪙 15',025:'350 XP · 🪙 25',026:'500 XP · 🪙 35',027:'750 XP · 🪙 50',028:'900 XP · 🪙 65',029:'300 XP · 🪙 20'};
     const progress=document.createElement('div');progress.className='case-progress';
     const state=load(), p=state.cases?.[id]?.progress||0;
     progress.innerHTML=`<div style="width:${Math.min(100,p)}%"></div>`;
     const rw=document.createElement('div');rw.className='case-rewards';rw.textContent='REWARD: +'+(rewards[id]||'200 XP · 🪙 10');
     const tags=card.querySelector('.case-tags');if(tags){tags.after(progress);progress.after(rw)}
   });
 });
 const grid=document.getElementById('casesGrid');if(grid)observer.observe(grid,{childList:true,subtree:true});

 // Add a lightweight answer challenge after the standard clue completion.
 document.addEventListener('click',e=>{
   if(e.target?.id==='invCompleteBtn' && !document.getElementById('leagueQuiz')){
     setTimeout(()=>{
       const active=document.querySelector('.inv-step.active');
       if(!active)return;
       const quiz=document.createElement('div');quiz.id='leagueQuiz';
       quiz.innerHTML=`<div class="inv-kicker">FINAL DEDUCTION</div><h3 style="font-size:26px">What is responsible for this spending pattern?</h3>
       <button class="quiz-option" data-a="wrong">A. A one-time emergency</button>
       <button class="quiz-option" data-a="correct">B. Repeated late-night convenience spending</button>
       <button class="quiz-option" data-a="wrong">C. A bank processing error</button>`;
       active.prepend(quiz);
       quiz.querySelectorAll('.quiz-option').forEach(b=>b.onclick=()=>{
         if(b.dataset.a==='correct'){
           b.classList.add('correct');quiz.querySelectorAll('button').forEach(x=>x.disabled=true);
           const s=load();s.cases=s.cases||{};s.cases['024']={status:'COMPLETED',progress:100};s.resolved=[...new Set([...(s.resolved||[]),'024'])];save(s);
           window.fixMyWalletLeague?.toast('CORRECT DEDUCTION! CASE FULLY SOLVED ✓');
         }else{
           b.classList.add('wrong');window.fixMyWalletLeague?.toast('NOT QUITE. Recheck the clues the pattern is the key.');
         }
       });
     },120);
   }
 });
})();

/* ===== ORIGINAL SCRIPT BLOCK 13 ===== */
/* FIXMYWALLET CASE ENGINE V2 12 REAL-LIFE MULTI-MCQ INVESTIGATIONS */
(function(){
const KEY='fixmywallet-production-state', GAME='fixmywallet-case-game-v2', TX='fixmywallet-transactions-v1';
const cases=[
['01','THE ₹1,200 SUBSCRIPTION LEAK','Several recurring subscriptions are quietly draining the account.','Subscriptions',250,50,
 [['Netflix',499],['Spotify',299],['Cloud Storage',199],['Fitness App',203]],
 ['Which spending should be reviewed first?',['Rent','Unused subscriptions','Electricity bill','Loan EMI'],1],
 ['What is the best first action?',['Cancel everything','Check usage and cancel unused services','Ignore small amounts','Take a loan'],1],
 ['If ₹1,200/month is saved for a year, what is the impact?',['₹1,200','₹7,200','₹14,400','₹24,000'],2],
 'Unused recurring subscriptions are responsible for the leak.'],
['02','FOOD DELIVERY TRAP','Repeated convenience orders are pushing food spending above plan.','Food',280,55,
 [['Swiggy',600],['Zomato',450],['Swiggy',700]],
 ['What pattern should be investigated?',['One emergency order','Repeated food delivery','Salary credit','Rent'],1],
 ['What clue matters most?',['Merchant logo','Three similar purchases','Payment color','Account balance'],1],
 ['Best sustainable fix?',['Never eat outside','Set a limit and plan meals','Delete bank account','Ignore it'],1],
 'Repeated convenience spending is the core pattern.'],
['03','THE WEEKEND SPENDING MYSTERY','Weekends show a sharp jump compared with weekdays.','Lifestyle',300,60,
 [['Weekday avg',420],['Saturday',1850],['Sunday',1640]],
 ['What is the strongest pattern?',['Random income','Weekend spending spike','Lower bills','Duplicate charge'],1],
 ['What should be checked next?',['Weekend categories','PIN','Bank branch','Salary date'],0],
 ['Best decision?',['Set a weekend discretionary budget','Stop all spending forever','Ignore the pattern','Borrow more'],0],
 'Flexible weekend spending is the key behavior to control.'],
['04','THE ₹500 DAILY PROBLEM','Small daily purchases average ₹500 and compound across the month.','Lifestyle',320,65,
 [['Coffee/snacks',180],['Quick commerce',170],['Cab convenience',150]],
 ['What makes this dangerous?',['Each purchase is huge','Small costs repeat frequently','It is income','It is a bill'],1],
 ['Approx monthly impact at ₹500/day for 30 days?',['₹1,500','₹5,000','₹15,000','₹50,000'],2],
 ['Best intervention?',['Track and reduce one repeat habit','Close bank account','Ignore under ₹1,000','Increase subscriptions'],0],
 'The invisible leak is repetition, not one large purchase.'],
['05','EMI PRESSURE','Fixed commitments are consuming too much of monthly income.','Bills',350,70,
 [['Phone EMI',2200],['Bike EMI',4800],['Personal loan',3500],['Income',25000]],
 ['What should be reviewed first?',['All fixed obligations and affordability','Coffee','One-time gift','Salary credit'],0],
 ['What ratio is most important?',['EMIs vs income','Likes vs followers','Cashback points','ATM location'],0],
 ['Responsible next step?',['Compare rates/terms before new borrowing','Add another EMI','Ignore due dates','Use coins as money'],0],
 'High fixed obligations reduce financial flexibility.'],
['06','THE CASH WITHDRAWAL MYSTERY','Several ATM withdrawals appear with no matching spending record.','Transfers',330,60,
 [['ATM',2000],['ATM',2000],['ATM',1500]],
 ['What is unusual?',['Repeated cash withdrawals','Salary income','A grocery category','A date format'],0],
 ['Best investigation step?',['Reconcile cash usage','Delete statement','Guess','Ignore'],0],
 ['What improves visibility?',['Record cash spending','Withdraw more','Hide transactions','Disable categories'],0],
 'Cash is harder to trace unless withdrawals are reconciled.'],
['07','THE DUPLICATE PAYMENT','Two nearly identical transactions appear close together.','Shopping',380,75,
 [['Merchant',999],['Merchant',999],['Gap',3]],
 ['What should you suspect first?',['Duplicate/duplicate-looking charge','Salary','Rent','Festival'],0],
 ['Before disputing, what should you check?',['Merchant confirmation and pending status','Social media','Coin balance','Tree color'],0],
 ['If truly duplicated?',['Contact merchant/bank with reference IDs','Ignore it','Pay again','Share OTP'],0],
 'Close matching transactions deserve verification before action.'],
['08','FESTIVAL SPENDING','Spending jumped during a festival and month-end period.','Shopping',400,80,
 [['Gifts',4200],['Dining',2800],['Shopping',6100]],
 ['Which category contributed most?',['Dining','Shopping','Gifts','Transport'],1],
 ['Best way to prepare next time?',['Festival budget in advance','No plan','More EMIs','Ignore history'],0],
 ['What is the main insight?',['Seasonal spikes can be planned','Income disappeared','Transactions are fake','Bills do not matter'],0],
 'Seasonal spending is manageable when anticipated and capped.'],
['09','THE INVISIBLE ₹100s','Many tiny purchases look harmless individually.','Food',360,70,
 [['Snack',120],['Coffee',140],['Delivery fee',99],['Convenience item',160]],
 ['What is the financial leak?',['Repeated micro-spending','Rent','Salary','Interest credit'],0],
 ['What should be tracked?',['Frequency and total monthly impact','Only largest purchase','Nothing','Passwords'],0],
 ['Best habit?',['Pause before repeat convenience buys','Spend faster','Hide alerts','Add subscription'],0],
 'Frequency turns small amounts into meaningful monthly leakage.'],
['10','SALARY DAY MYSTERY','The balance drops rapidly after salary arrives.','Lifestyle',420,85,
 [['Salary',25000],['Shopping',3700],['Food',4800],['Subscriptions',1200],['Rent',8000]],
 ['Which flexible category is a strong investigation target?',['Rent','Shopping','Utilities','Income'],1],
 ['What should happen first on salary day?',['Allocate essentials/savings before discretionary spend','Spend everything','Ignore bills','Take another loan'],0],
 ['Why does timing matter?',['Early allocation prevents accidental overspending','Dates are decorative','Income vanishes','Coins replace savings'],0],
 'A salary plan should happen before discretionary spending begins.'],
['11','THE CAB VS METRO MYSTERY','Short trips repeatedly use expensive ride hailing.','Transportation',340,65,
 [['Cab',320],['Cab',280],['Cab',350],['Metro alternative',50]],
 ['What is the repeating pattern?',['Convenience transport premium','Income','Rent','Subscription'],0],
 ['Best question to ask?',['Which trips truly need a cab?','Which PIN is strongest?','Which color is best?','Nothing'],0],
 ['Potential fix?',['Use lower-cost alternatives for routine trips','Never travel','Borrow','Ignore'],0],
 'Convenience should be reserved for trips where it genuinely adds value.'],
['12','THE IMPULSE SHOPPING SPIRAL','Late-evening browsing repeatedly becomes unplanned shopping.','Shopping',450,90,
 [['Order',1299],['Order',899],['Order',1499],['Time','21:00–23:30']],
 ['What trigger is visible?',['Late-evening browsing','Salary credit','Rent cycle','Healthcare'],0],
 ['Best friction to add?',['24-hour waiting rule','One-click buying','More notifications','Ignore'],0],
 ['What should success measure?',['Fewer unplanned repeat purchases','More tabs open','Higher cart size','More EMIs'],0],
 'The pattern is behavioral: trigger → browsing → impulse purchase.']
].map((c,i)=>({id:c[0],title:c[1],story:c[2],category:c[3],xp:c[4],coins:c[5],evidence:c[6],questions:[c[7],c[8],c[9]],answer:c[10],unlock:i}));

function load(k=KEY){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
function save(v,k=KEY){localStorage.setItem(k,JSON.stringify(v))}
const overlay=document.getElementById('caseGameOverlay'), root=document.getElementById('caseGame');

function transactionEvidence(c){
 const tx=load(TX);
 const words=c.category==='Food'?['swiggy','zomato','blinkit']:c.category==='Shopping'?['amazon','shopping']:c.category==='Transportation'?['uber','cab']:c.category==='Entertainment'?['spotify','netflix']:[];
 const matches=(Array.isArray(tx)?tx:[]).filter(t=>words.some(w=>(t.merchant||'').toLowerCase().includes(w))||t.category===c.category).slice(0,4);
 return matches.map(t=>[t.merchant||'Transaction',t.amount]).length?matches.map(t=>[t.merchant||'Transaction',t.amount]):c.evidence;
}
function openCase(id,replay=false){
 const c=cases.find(x=>x.id===id); if(!c)return;
 let p={step:0,answers:[],clues:0,start:Date.now(),hints:0};
 if(!replay){const all=load(GAME); if(all[id]?.inProgress)p={...p,...all[id]};}
 render(c,p);
 overlay.classList.add('open');
}
function render(c,p){
 const total=c.questions.length+2, percent=Math.round((p.step/total)*100);
 let body=`<div class="cg-top"><div><div class="cg-kicker">FINANCIAL DETECTIVE LEAGUE · CASE #${c.id}</div><h2 class="cg-title">${c.title}</h2></div><button class="cg-close" id="cgClose">✕ CLOSE</button></div>
 <div class="cg-progress"><i style="width:${percent}%"></i></div><div class="cg-kicker">INVESTIGATION PROGRESS ${percent}%</div>`;
 if(p.step===0){
   const ev=transactionEvidence(c);
   body+=`<p class="cg-story">${c.story}</p><div class="evidence-box"><h4>🔎 TRANSACTION EVIDENCE</h4><div class="evidence-list">${ev.map((x,i)=>`<div class="evidence-item" data-clue="${i}"><b>${x[0]}</b><br>₹${x[1]} · Click to inspect</div>`).join('')}</div><p id="clueStatus">Inspect the evidence before continuing.</p></div><button class="cg-next" id="cgNext" disabled>CONTINUE TO CLUES →</button>`;
 } else if(p.step===1){
   body+=`<div class="evidence-box"><h4>🧩 CLUES DISCOVERED</h4><p>Look for repetition, timing, category concentration and flexible spending.</p><div class="evidence-list">${transactionEvidence(c).map((x,i)=>`<div class="evidence-item"><b>CLUE ${i+1}</b><br>${x[0]} · ₹${x[1]}</div>`).join('')}</div></div><button class="cg-next" id="cgNext">START REASONING →</button>`;
 } else if(p.step>=2 && p.step<c.questions.length+2){
   const q=c.questions[p.step-2], qi=p.step-1;
   body+=`<div class="cg-kicker">MCQ ${qi} / ${c.questions.length}</div><div class="cg-question">${q[0]}</div>${q[1].map((o,i)=>`<button class="cg-option ${p.answers[qi]===i?'selected':''}" data-option="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}<button class="cg-next" id="cgNext" ${p.answers[qi]===undefined?'disabled':''}>${qi===c.questions.length?'FINAL INVESTIGATION →':'NEXT QUESTION →'}</button>`;
 } else {
   const correct=p.answers.filter((a,i)=>a===c.questions[i][2]).length;
   const accuracy=Math.round(correct/c.questions.length*100);
   // Tunable weighted reward logic: 80% standard, 15% lucky break, 5% cold-case jackpot.
   // Multiplier is intentionally capped at 1.5x to keep rewards supportive, not chase-driven.
   const roll=Math.random();
   const rewardTier=roll<0.80?{name:'STANDARD LEAD',mult:1,rare:false}:roll<0.95?{name:'LUCKY BREAK',mult:1.25,rare:false}:{name:'COLD CASE JACKPOT',mult:1.5,rare:true};
   const baseEarned=Math.round(c.xp*(.5+.5*accuracy/100)), baseCoins=Math.round(c.coins*(.5+.5*accuracy/100));
   const earned=Math.round(baseEarned*rewardTier.mult), coins=Math.round(baseCoins*rewardTier.mult);
   const time=Math.max(1,Math.round((Date.now()-p.start)/1000));
   body+=`<div class="cg-result"><div class="cg-kicker">INVESTIGATION COMPLETE 🕵️</div><h2 class="cg-title">Case Closed.</h2><p>${c.answer}</p><div class="score-grid"><div><b>${correct}/${c.questions.length}</b>Correct answers</div><div><b>${Math.min(p.clues,transactionEvidence(c).length)}/${transactionEvidence(c).length}</b>Clues discovered</div><div><b>${accuracy}%</b>Accuracy</div><div><b>+${earned}</b>XP earned</div><div><b>🪙 +${coins}</b>FixCoins</div><div><b>${time}s</b>Time taken</div></div>
   <div class="variable-payout ${rewardTier.rare?'rare':''}"><span>REWARD REVEAL</span><strong>${rewardTier.name}</strong><em>×${rewardTier.mult.toFixed(2)} capped multiplier${rewardTier.rare?' · RARE FRUIT UNLOCKED 🍒':''}</em></div><p>Hints used: ${p.hints||0}</p><button class="cg-next" id="cgReplay">🔄 REPLAY INVESTIGATION</button> <button class="cg-next" id="cgFinish">RETURN TO CASES</button></div>`;
   const s=load(KEY); s.completedCases=[...new Set([...(s.completedCases||[]),c.id])];s.investigationScores=s.investigationScores||{};s.investigationScores[c.id]={correct,accuracy,earned,coins,time};
   s.xp=(s.xp||0)+earned;s.fixCoins=(s.fixCoins||0)+coins;s.lastMeaningfulActivity=Date.now();if(rewardTier.rare)s.rareFruitUnlocked=true;s.resolved=[...new Set([...(s.resolved||[]),c.id])];s.cases=s.cases||{};s.cases[c.id]={status:'COMPLETED',progress:100};save(s); localStorage.removeItem(GAME+'-'+c.id);
 }
 root.innerHTML=body;
 document.getElementById('cgClose').onclick=()=>overlay.classList.remove('open');
 root.querySelectorAll('[data-clue]').forEach(el=>el.onclick=()=>{el.style.background='#e8f0ff';p.clues=Math.max(p.clues,root.querySelectorAll('[data-clue]').length);document.getElementById('clueStatus').textContent='Evidence inspected ✓ You can continue.';document.getElementById('cgNext').disabled=false;persist(c,p)});
 root.querySelectorAll('[data-option]').forEach(el=>el.onclick=()=>{p.answers[p.step-1]=+el.dataset.option;root.querySelectorAll('[data-option]').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');document.getElementById('cgNext').disabled=false;persist(c,p)});
 const next=document.getElementById('cgNext');if(next)next.onclick=()=>{p.step++;persist(c,p);render(c,p)};
 const replay=document.getElementById('cgReplay');if(replay)replay.onclick=()=>{localStorage.removeItem(GAME+'-'+c.id);openCase(c.id,true)};
 const finish=document.getElementById('cgFinish');if(finish)finish.onclick=()=>{overlay.classList.remove('open');document.querySelector('[id="viewAllCases"]')?.click();};
}
function persist(c,p){const all=load(GAME);all[c.id]={...p,inProgress:true};save(all,GAME)}
window.FixMyWalletCaseEngine={openCase,cases};

// Override existing case-card actions to use full multi-MCQ engine.
document.addEventListener('click',e=>{
 const card=e.target.closest('.case-select'); if(card&&!card.classList.contains('locked')){
   const id=card.dataset.id; if(cases.find(x=>x.id===id)){e.preventDefault();e.stopImmediatePropagation();openCase(id);return;}
 }
 const launch=e.target.closest('#launchSpecificCase'); if(launch){const txt=document.querySelector('.case-detail-view')?.textContent||'';const m=txt.match(/CASE #(\d+)/);if(m&&cases.find(x=>x.id===m[1])){e.preventDefault();openCase(m[1]);}}
},true);
})();

/* ===== ORIGINAL SCRIPT BLOCK 14 ===== */
(function(){
 const $=id=>document.getElementById(id);
 const overlay=$('demoOverlay'), impact=$('impactToast');
 $('demoJourneyBtn').onclick=()=>overlay.classList.add('show');
 $('demoClose').onclick=()=>overlay.classList.remove('show');
 $('startDemoFlow').onclick=()=>{
   overlay.classList.remove('show');
   const steps=[...document.querySelectorAll('.demo-step')];
   let i=0;
   const timer=setInterval(()=>{
     steps.forEach((s,n)=>s.classList.toggle('active',n===i));
     i++;
     if(i>=steps.length){clearInterval(timer)}
   },650);
 };
 // AI quick questions: attach to existing Wallet Detective area if present
 const ai=document.querySelector('#aiInvestigator, .ai-investigator, [data-ai-investigator]');
 if(ai && !document.getElementById('aiQuick')){
   const box=document.createElement('div'); box.innerHTML='<div class="ai-quick" id="aiQuick"><button>Why am I overspending?</button><button>Find my biggest money leak</button><button>How can I save ₹5,000?</button></div><div class="ai-answer" id="aiAnswer"></div>';
   ai.appendChild(box);
   const answers={
    'Why am I overspending?':'Your spending increased mainly due to late-evening convenience purchases. Food delivery and impulse shopping account for the largest flexible spending increase.',
    'Find my biggest money leak':'Your biggest detected leak is recurring food delivery after 9 PM, with an estimated impact of ₹1,563/month.',
    'How can I save ₹5,000?':'Start with your top three flexible patterns: reduce late-night delivery, cancel unused subscriptions and set a weekly impulse-shopping limit.'
   };
   box.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=$('aiAnswer');a.textContent='WALLET DETECTIVE: '+answers[b.textContent];a.style.display='block';});
 }
 // Listen for habit-fix buttons and show impact conclusion without changing existing functionality
 document.addEventListener('click',e=>{
   if(e.target.closest('button') && /fix this habit|accept fix/i.test(e.target.textContent||'')){
     setTimeout(()=>{impact.classList.add('show');setTimeout(()=>impact.classList.remove('show'),3200)},450);
   }
 });
 // Surface a pattern alert shortly after first landing, only once per session
 if(!sessionStorage.getItem('fixmywallet-alert')){
   setTimeout(()=>{alert.classList.add('show');sessionStorage.setItem('fixmywallet-alert','1')},2200);
 }
})();

/* ===== ORIGINAL SCRIPT BLOCK 15 ===== */
(function(){
 const $=id=>document.getElementById(id);
 const overlay=$('authOverlay'), user=$('authUser'), userName=$('authUserName');
 const getUser=()=>{try{return JSON.parse(localStorage.getItem('fixmywallet_user'))}catch(e){return null}};
 const setLoggedIn=u=>{
   localStorage.setItem('fixmywallet_session',JSON.stringify({email:u.email,name:u.name}));
   overlay.classList.remove('show');
   user.style.display='flex'; userName.textContent=(u.name||u.email).toUpperCase();
 };
 function refresh(){
   const s=JSON.parse(localStorage.getItem('fixmywallet_session')||'null');
   if(s){user.style.display='flex';userName.textContent=(s.name||s.email).toUpperCase()}
   else overlay.classList.add('show');
 }
 document.querySelectorAll('.auth-tab').forEach(tab=>tab.onclick=()=>{
   document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
   document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
   tab.classList.add('active'); $(tab.dataset.auth+'Form').classList.add('active');
 });
 $('authClose').onclick=()=>overlay.classList.remove('show');
 $('loginForm').onsubmit=e=>{
   e.preventDefault(); const u=getUser(); const email=$('loginEmail').value.trim().toLowerCase(), pass=$('loginPassword').value;
   const box=$('loginSuccess');
   if(u && u.email===email && u.password===pass){box.textContent='✓ Access granted. Opening your financial case file...';box.classList.add('show');setTimeout(()=>setLoggedIn(u),700)}
   else{box.textContent='Account not found or password incorrect. Create an account for the demo.';box.style.background='#fff0f0';box.style.borderLeftColor='#c74747';box.classList.add('show')}
 };
 $('signupForm').onsubmit=e=>{
   e.preventDefault();
   const u={name:$('signupName').value.trim(),email:$('signupEmail').value.trim().toLowerCase(),password:$('signupPassword').value};
   localStorage.setItem('fixmywallet_user',JSON.stringify(u));
   const box=$('signupSuccess');box.textContent='✓ Investigator profile created. Welcome to FixMyWallet.';box.classList.add('show');
   setTimeout(()=>setLoggedIn(u),750);
 };
 $('logoutBtn').onclick=()=>{localStorage.removeItem('fixmywallet_session');user.style.display='none';overlay.classList.add('show')};
 refresh();
})();

/* ===== ORIGINAL SCRIPT BLOCK 16 ===== */
(function(){
 const $=id=>document.getElementById(id);
 const corner=$('profileCorner'), trigger=$('profileTrigger'), menu=$('profileMenu');
 function initials(name){return (name||'U').split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
 function syncProfile(){
  let s=null;try{s=JSON.parse(localStorage.getItem('fixmywallet_session'))}catch(e){}
  if(s){
   corner.style.display='flex';
   $('profileName').textContent=(s.name||s.email||'PROFILE').toUpperCase();
   $('profileEmail').textContent=(s.email||'INVESTIGATOR PROFILE').toUpperCase();
   $('profileAvatar').textContent=initials(s.name||s.email);
  }else corner.style.display='none';
 }
 trigger.onclick=(e)=>{e.stopPropagation();menu.classList.toggle('show')};
 document.addEventListener('click',()=>menu.classList.remove('show'));
 $('profileDashboard').onclick=()=>{menu.classList.remove('show');window.scrollTo({top:0,behavior:'smooth'})};
 $('profileCases').onclick=()=>{menu.classList.remove('show');const x=document.querySelector('#cases');if(x)x.scrollIntoView({behavior:'smooth'})};
 $('profileLogout').onclick=()=>{localStorage.removeItem('fixmywallet_session');menu.classList.remove('show');corner.style.display='none';const a=$('authOverlay');if(a)a.classList.add('show')};
 syncProfile();
 setInterval(syncProfile,500);
})();

/* ===== ORIGINAL SCRIPT BLOCK 17 ===== */
(function(){
  'use strict';
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  // Central navigation helpers. These are defensive bindings so the final demo
  // continues to work even after a page refresh or a dynamically rendered view.
  function go(selector){
    const el=$(selector);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function click(id){ const el=document.getElementById(id); if(el) el.click(); }

  // Brand always returns to the dashboard start.
  const logo=$('.logo');
  if(logo){ logo.style.cursor='pointer'; logo.setAttribute('role','button'); logo.tabIndex=0;
    const home=()=>window.scrollTo({top:0,behavior:'smooth'});
    logo.addEventListener('click',home); logo.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();home();}});
  }

  // Make hero actions explicit and resilient.
  const heroActions=$$('.hero .ctas .cta');
  if(heroActions[0]) heroActions[0].addEventListener('click',()=>{
    if(window.FixMyWalletCaseEngine?.openCase) window.FixMyWalletCaseEngine.openCase('01');
    else go('#scratch');
  });
  if(heroActions[1]) heroActions[1].addEventListener('click',()=>{
    const btn=$('#viewAllCases'); if(btn) btn.click(); else go('#cases');
  });

  // Mission CTA always starts the first playable case.
  const missionStart=$('.final .cta');
  if(missionStart) missionStart.addEventListener('click',()=>{
    if(window.FixMyWalletCaseEngine?.openCase) window.FixMyWalletCaseEngine.openCase('01');
    else go('#scratch');
  });

  // Transaction trigger remains the single source of truth for opening history.
  const tx=$('#transactionsBtn');
  if(tx){ tx.setAttribute('aria-label','Open transaction history'); }

  // Close overlays with Escape without affecting saved state.
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape') return;
    ['demoOverlay','caseGameOverlay','casesOverlay','investigationOverlay'].forEach(id=>{
      const el=document.getElementById(id); if(el){el.classList.remove('open','show'); el.setAttribute?.('aria-hidden','true');}
    });
  });

  // Ensure every intentionally interactive non-button control has keyboard support.
  $$('.file,.leak,.dna-card,.team-card').forEach(el=>{
    if(!el.hasAttribute('tabindex')) el.tabIndex=0;
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
  });

  // Financial insight cards have meaningful actions in the final demo.
  $$('.leak').forEach(el=>{
    el.style.cursor='pointer';
    el.addEventListener('click',()=>go('#scratch'));
  });
  $$('.dna-card').forEach(el=>{
    el.style.cursor='pointer';
    el.addEventListener('click',()=>go('#cases'));
  });

  // Profile menu routes are reinforced without changing visual UI.
  const pDash=$('#profileDashboard'); if(pDash) pDash.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const pCases=$('#profileCases'); if(pCases) pCases.addEventListener('click',()=>{
    const b=$('#viewAllCases'); if(b) b.click(); else go('#cases');
  });

  // Final safety net: buttons without a native form action or explicit ID still
  // receive a useful focus state, while known application actions are never replaced.
  $$('button').forEach(b=>{
    b.addEventListener('keydown',e=>{if(e.key==='Enter' && !b.disabled) b.classList.add('is-pressed');});
    b.addEventListener('keyup',()=>b.classList.remove('is-pressed'));
  });

  // Persist a small final-session marker for demo continuity; no user data is changed.
  try{ localStorage.setItem('fixmywallet-last-opened',new Date().toISOString()); }catch(e){}
})();

/* ===== ORIGINAL SCRIPT BLOCK 18 ===== */
(function(){
 const STATE='fixmywallet-production-state', TX='fixmywallet-transactions', TOOLS='fixmywallet-xp-tools';
 const load=(k,f={})=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}}, save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 const app=()=>load(STATE,{}), setApp=v=>save(STATE,v), tools=()=>load(TOOLS,{assistCredits:0,lastRestore:0,brokenStreak:0});
 function renderTools(){const s=app();document.getElementById('xpToolBalance').textContent=(s.xp||0)+' XP';document.getElementById('buyAssist').disabled=(s.xp||0)<75;const t=tools();document.getElementById('restoreStreak').disabled=(s.xp||0)<150||!t.brokenStreak||(Date.now()-t.lastRestore<30*864e5)}
 document.getElementById('xpToolFab').onclick=()=>{document.getElementById('xpTools').classList.toggle('show');renderTools()};
 document.getElementById('buyAssist').onclick=()=>{const s=app();if((s.xp||0)<75)return;s.xp-=75;setApp(s);const t=tools();t.assistCredits++;save(TOOLS,t);renderTools();alert('CASE ASSIST READY — one wrong option will be removed from your next challenge.');};
 // Healthy cap: a repair is available only after a real break and max once every 30 days.
 function detectBrokenStreak(){const s=app(),t=tools(),last=s.lastMeaningfulActivity||Date.now();if(Date.now()-last>48*3600e3&&(s.streak||0)>0&&!t.brokenStreak){t.brokenStreak=s.streak;save(TOOLS,t);}}
 detectBrokenStreak();
 document.getElementById('restoreStreak').onclick=()=>{const s=app(),t=tools();if(!t.brokenStreak||(s.xp||0)<150)return;s.xp-=150;s.streak=t.brokenStreak;t.brokenStreak=0;t.lastRestore=Date.now();setApp(s);save(TOOLS,t);renderTools();alert('STREAK RESTORED — 150 XP was used.');};
 // Inject the purchased assist into the existing case engine without changing its case data.
 const observer=new MutationObserver(()=>{const q=document.querySelector('.cg-question');const opts=[...document.querySelectorAll('.cg-option')];const t=tools();if(!q||opts.length<3||!t.assistCredits||q.dataset.assisted)return;const c=(window.FixMyWalletCaseEngine?.cases||[]).find(x=>x.questions.some(z=>z[0]===q.textContent));if(!c)return;const question=c.questions.find(z=>z[0]===q.textContent), wrong=opts.find((_,i)=>i!==question[2]);if(wrong){wrong.style.opacity='.18';wrong.style.pointerEvents='none';wrong.textContent='— ELIMINATED WITH XP ASSIST —';q.dataset.assisted='1';t.assistCredits--;save(TOOLS,t);}});observer.observe(document.body,{childList:true,subtree:true});

 // Floating Memory Bottle: turns saved transactions into a fast story-mode replay.
 const overlay=document.getElementById('memoryOverlay'),screen=document.getElementById('storyScreen'),title=document.getElementById('storyTitle'),progress=document.getElementById('storyProgress');let frames=[],idx=0,timer;
 function buildFrames(){let tx=load(TX,[]);if(!Array.isArray(tx)||!tx.length){tx=load('fixmywallet-financial-data',{}).transactions||[]};tx=tx.slice().sort((a,b)=>new Date(a.date||0)-new Date(b.date||0));const total=tx.reduce((n,x)=>n+Number(x.amount||0),0);const by={};tx.forEach(x=>{const k=x.category||'Other';by[k]=(by[k]||0)+Number(x.amount||0)});const top=Object.entries(by).sort((a,b)=>b[1]-a[1])[0];return [{type:'intro'},{type:'tx',x:tx[0]},{type:'tx',x:tx[Math.floor(tx.length*.35)]},{type:'tx',x:tx[Math.floor(tx.length*.7)]},{type:'tx',x:tx[tx.length-1]},{type:'summary',total,top,count:tx.length}].filter(f=>f.type!=='tx'||f.x)}
 function renderFrame(){clearTimeout(timer);const f=frames[idx];progress.style.width=((idx+1)/frames.length*100)+'%';if(f.type==='intro'){title.innerHTML='YOUR MONTH.<br>IN MOTION.';screen.innerHTML="<div class='story-card'><div style='font-size:90px'>🧪</div><p>Every transaction became a moment. Let's replay the story your money told.</p></div>"}else if(f.type==='tx'){title.textContent='A MOMENT FROM YOUR MONTH.';const x=f.x;screen.innerHTML=`<div class="story-card"><div class="memory-kicker">${x.date||'TRANSACTION'} · ${x.category||'SPENDING'}</div><div class="merchant">${x.merchant||x.description||'TRANSACTION'}</div><div class="amount">₹${Number(x.amount||0).toLocaleString('en-IN')}</div><p>${x.category||'Spending'} became another clue in your financial story.</p></div>`}else{title.innerHTML='THE MONTH<br>IN ONE GLANCE.';screen.innerHTML=`<div class="story-card"><div class="amount">₹${Math.round(f.total).toLocaleString('en-IN')}</div><p>${f.count} moments recorded.</p><div class="merchant">${f.top?f.top[0]:'Your spending'}</div><p>Your strongest spending chapter this month. The detective view turns this story into patterns you can actually improve.</p></div>`}if(idx<frames.length-1)timer=setTimeout(()=>{idx++;renderFrame()},3200)}
 document.getElementById('memoryBottle').onclick=()=>{frames=buildFrames();idx=0;overlay.classList.add('show');renderFrame()};document.getElementById('memoryClose').onclick=()=>{clearTimeout(timer);overlay.classList.remove('show')};document.getElementById('storyNext').onclick=()=>{if(idx<frames.length-1){idx++;renderFrame()}else{clearTimeout(timer);overlay.classList.remove('show')}};
 renderTools();
})();

/* ===== ORIGINAL SCRIPT BLOCK 19 ===== */
/* Combine XP utilities + rewards into one clear economy entry point. */
(function(){
  const tools=document.getElementById('xpTools');
  const vault=document.getElementById('vaultOverlay');
  const standalone=document.getElementById('evidenceVaultBtn');
  if(tools && !document.getElementById('xpVaultLaunch')){
    const launch=document.createElement('button');
    launch.id='xpVaultLaunch'; launch.className='xp-vault-launch';
    launch.innerHTML='🔒 REWARD VAULT <small>Redeem XP · Classified Packs · My Rewards</small>';
    tools.appendChild(launch);
    launch.onclick=()=>{ if(vault){ vault.classList.add('show'); tools.classList.remove('show'); } };
  }
  if(standalone) standalone.style.display='none';
})();

/* ===== ORIGINAL SCRIPT BLOCK 20 ===== */
/* DEFINITIVE TRANSACTION CONTROLS — static buttons + direct onclick API */
(function(){
'use strict';
const KEY='fixmywallet-transactions-v1';
const $=id=>document.getElementById(id);
function cloneDefaults(){try{return JSON.parse(JSON.stringify(window.__FMW_DEFAULT_TX||[]))}catch(e){return []}}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)&&x.length?x:cloneDefaults()}catch(e){return cloneDefaults()}}
function write(a){localStorage.setItem(KEY,JSON.stringify(a));localStorage.setItem('fixmywallet-financial-data',JSON.stringify({transactions:a,updatedAt:new Date().toISOString()}));}
function categoryFor(name){const s=String(name||'').toLowerCase();if(/swiggy|zomato|restaurant|cafe|food|blinkit|grocery/.test(s))return'Food';if(/uber|ola|metro|cab|fuel|transport/.test(s))return'Transportation';if(/netflix|spotify|prime|movie/.test(s))return'Entertainment';if(/amazon|flipkart|mall|shop/.test(s))return'Shopping';if(/hospital|pharmacy|medical|apollo/.test(s))return'Healthcare';if(/electric|water|rent|bill|recharge/.test(s))return'Bills';return'Other'}
function normDate(v){if(!v)return new Date().toISOString().slice(0,16);const s=String(v).trim();if(/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/.test(s)){const [d,m,y0]=s.split(/[\/-]/);const y=y0.length===2?'20'+y0:y0;return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}T12:00`;}const d=new Date(s);return isNaN(d)?new Date().toISOString().slice(0,16):d.toISOString().slice(0,16)}
function parseCSV(text){const rows=[];let row=[],cell='',q=false;text=String(text||'').replace(/^\uFEFF/,'');for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&q&&n==='"'){cell+='"';i++;continue}if(c==='"'){q=!q;continue}if(c===','&&!q){row.push(cell.trim());cell='';continue}if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());if(row.some(x=>x!==''))rows.push(row);row=[];cell='';continue}cell+=c}row.push(cell.trim());if(row.some(x=>x!==''))rows.push(row);return rows}
window.FMWTx={
 openForm(){const f=$('txForm');if(!f)return alert('Transaction form unavailable.');f.classList.add('open');f.style.display='block';if(!$('fDate').value){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());$('fDate').value=d.toISOString().slice(0,16)}$('fMerchant').focus()},
 closeForm(){const f=$('txForm');if(f){f.classList.remove('open');f.style.display='none'}},
 save(){const merchant=$('fMerchant').value.trim(),amount=Number($('fAmount').value),date=$('fDate').value;if(!merchant||!date||!Number.isFinite(amount)||amount<=0){alert('Please enter Date, Merchant and a valid Amount.');return}const a=read();a.push({id:'MAN-'+Date.now(),merchant,date,amount,type:$('fType').value,category:$('fCategory').value||categoryFor(merchant),status:'COMPLETED',account:$('fMethod').value||'Manual entry',notes:$('fNotes').value||''});write(a);alert('✓ Transaction added successfully.');location.reload()},
 pickCSV(){const input=$('csvInput');if(!input){alert('CSV importer unavailable.');return}input.value='';input.click()},
 async importCSV(file){if(!file)return;if(!/\.csv$/i.test(file.name)){alert('Please select a .CSV bank statement file.');return}try{const rows=parseCSV(await file.text());if(rows.length<2)throw new Error('CSV needs a header and at least one transaction row.');const h=rows[0].map(x=>String(x).toLowerCase().replace(/[^a-z0-9]/g,''));const idx=(...names)=>h.findIndex(x=>names.some(n=>x===n||x.includes(n)));const dateI=idx('date','transactiondate','valuedate'),nameI=idx('merchant','description','narration','particular','details','payee'),amountI=idx('amount','transactionamount'),debitI=idx('debit','withdrawal'),creditI=idx('credit','deposit'),typeI=idx('type','drcr'),catI=idx('category');const out=[];rows.slice(1).forEach((r,i)=>{let amount=amountI>=0?Number(String(r[amountI]||'').replace(/[^0-9.-]/g,'')):0;let type=typeI>=0?String(r[typeI]||'').toUpperCase():'';if(!amount&&debitI>=0){amount=Number(String(r[debitI]||'').replace(/[^0-9.-]/g,''));type='DEBIT'}if(!amount&&creditI>=0){amount=Number(String(r[creditI]||'').replace(/[^0-9.-]/g,''));type='CREDIT'}if(!Number.isFinite(amount)||amount<=0)return;if(/CR|CREDIT|DEPOSIT/.test(type))type='CREDIT';else if(/TRANSFER/.test(type))type='TRANSFER';else type='DEBIT';const merchant=(nameI>=0&&r[nameI])||'Imported transaction';out.push({id:'CSV-'+Date.now()+'-'+i,merchant,date:normDate(dateI>=0?r[dateI]:''),amount,type,category:(catI>=0&&r[catI])||categoryFor(merchant),status:'COMPLETED',account:'Imported bank statement',notes:'Imported from CSV statement'})});if(!out.length)throw new Error('No valid transactions found. Use columns like Date + Description + Amount, or Debit/Credit.');write([...read(),...out]);alert(`✓ Bank statement imported successfully: ${out.length} transactions added.`);location.reload()}catch(err){alert(err.message||'Could not import CSV.')} }
};
})();

/* ===== ORIGINAL SCRIPT BLOCK 21 ===== */
(function(){
 const STATE='fixmywallet-production-state', TOOLS='fixmywallet-xp-tools';
 const load=(k,f={})=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}},save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 document.querySelectorAll('.redeemReward').forEach(btn=>btn.onclick=()=>{
   const cost=Number(btn.dataset.cost), name=btn.dataset.name, s=load(STATE,{});
   if((s.xp||0)<cost){alert('Not enough XP yet. Keep solving real spending cases to earn more.');return}
   s.xp-=cost;save(STATE,s);
   const t=load(TOOLS,{assistCredits:0,lastRestore:0,brokenStreak:0,rewards:[]});t.rewards=t.rewards||[];
   const code='DEMO-'+name.replace(/[^A-Z]/gi,'').slice(0,6).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
   t.rewards.push({name,cost,code,redeemedAt:Date.now()});save(TOOLS,t);
   document.getElementById('voucherTitle').textContent=name.toUpperCase()+' UNLOCKED';
   document.getElementById('voucherText').textContent=cost+' XP was exchanged for this demo partner reward.';
   document.getElementById('voucherCode').textContent=code;document.getElementById('voucherModal').classList.add('show');
   const bal=document.getElementById('xpToolBalance');if(bal)bal.textContent=(s.xp||0)+' XP';
 });
 document.getElementById('voucherClose').onclick=()=>document.getElementById('voucherModal').classList.remove('show');
})();

/* ===== ORIGINAL SCRIPT BLOCK 22 ===== */
(function(){
 const STATE='fixmywallet-production-state', TOOLS='fixmywallet-xp-tools', VAULT='fixmywallet-evidence-vault';
 const load=(k,f={})=>{try{return JSON.parse(localStorage.getItem(k)||'null')||f}catch{return f}}, save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 const vault=()=>load(VAULT,{keys:1,rewards:[],packsOpened:0}); const xp=()=>load(STATE,{xp:0});
 function balance(){let s=xp(),v=vault();document.getElementById('vaultBalance').textContent=(s.xp||0)+' XP · '+(v.keys||0)+' KEYS'}
 function addReward(r){let v=vault();v.rewards.push({...r,at:Date.now()});save(VAULT,v);renderHistory()}
 function renderHistory(){let v=vault(),el=document.getElementById('rewardHistory');el.innerHTML=v.rewards.length?v.rewards.slice().reverse().map(r=>`<div class="history-item"><b>${r.icon||'🎁'} ${r.name}</b><br><small>${r.code} · ${new Date(r.at).toLocaleDateString()}</small></div>`).join(''):'<div class="history-item">No evidence collected yet. Solve meaningful cases to build toward your first reward.</div>'}
 document.getElementById('evidenceVaultBtn').onclick=()=>{balance();renderHistory();document.getElementById('vaultOverlay').classList.add('show')};document.getElementById('vaultClose').onclick=()=>document.getElementById('vaultOverlay').classList.remove('show');
 document.querySelectorAll('.vault-tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.vault-tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.vault-pane').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById('vault-'+b.dataset.vault).classList.add('active')});
 document.querySelectorAll('[data-direct]').forEach(b=>b.onclick=()=>{let s=xp(),c=+b.dataset.cost;if((s.xp||0)<c)return alert('Not enough XP. XP comes from solving meaningful financial cases.');s.xp-=c;save(STATE,s);let code='DEMO-'+b.dataset.direct.replace(/[^A-Z]/gi,'').slice(0,6).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();addReward({name:b.dataset.direct,code,icon:'🎟️'});balance();alert('Prototype reward added to My Evidence: '+code)});
 document.getElementById('openPack').onclick=()=>{let s=xp(),v=vault();if((s.xp||0)<900||!(v.keys||0))return alert('Requires 900 XP + 1 Evidence Key. Keys should be earned from meaningful progress.');s.xp-=900;v.keys--;v.packsOpened++;save(STATE,s);save(VAULT,v);balance();const roll=Math.random()*100;let r=roll<5?{tier:'LEGENDARY',name:'Mastermind Partner Reward',code:'LEGEND-'+Math.random().toString(36).slice(2,7).toUpperCase(),icon:'👑'}:roll<30?{tier:'RARE',name:'Rare Partner Boost',code:'RARE-'+Math.random().toString(36).slice(2,7).toUpperCase(),icon:'💎'}:{tier:'COMMON',name:'Everyday Partner Perk',code:'PERK-'+Math.random().toString(36).slice(2,7).toUpperCase(),icon:'🎁'};document.getElementById('scratchReward').innerHTML=`<div><div class="memory-kicker" style="color:#fff">${r.tier} EVIDENCE FOUND</div><h2>${r.icon} ${r.name}</h2><div class="voucher-code">${r.code}</div><small>Prototype reward · guaranteed reveal</small></div>`;document.getElementById('scratchZone').style.display='block';let cover=document.getElementById('scratchCover');cover.classList.remove('revealed');cover.onclick=()=>{cover.classList.add('revealed');addReward(r)};};
})();

/* ===== ORIGINAL SCRIPT BLOCK 23 ===== */
/* FIX: Reward Vault is injected later in the document, so bind the combined XP launcher after all vault DOM exists. */
(function(){
  function bindVault(){
    const launch=document.getElementById('xpVaultLaunch');
    const overlay=document.getElementById('vaultOverlay');
    const tools=document.getElementById('xpTools');
    if(!launch || !overlay) return;
    launch.onclick=function(){
      overlay.classList.add('show');
      if(tools) tools.classList.remove('show');
      const bal=document.getElementById('vaultBalance');
      if(bal){
        try{const s=JSON.parse(localStorage.getItem('fixmywallet-production-state')||'{}');const v=JSON.parse(localStorage.getItem('fixmywallet-evidence-vault')||'{"keys":1}');bal.textContent=(s.xp||0)+' XP · '+(v.keys||0)+' KEYS';}catch(e){}
      }
    };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindVault); else bindVault();
})();

// PATCH: reliable Transactions button initialization
(function () {
  'use strict';
  function bindTransactions() {
    const btn = document.getElementById('transactionsBtn');
    const modal = document.getElementById('txModal');
    if (!btn || !modal || btn.dataset.txBound === '1') return;
    btn.dataset.txBound = '1';
    btn.type = 'button';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      modal.classList.add('open');
      if (typeof window.FMWTx?.render === 'function') {
        window.FMWTx.render();
      }
    });
  }

  // Run after the entire DOM exists, and again in case another module renders later.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTransactions, { once: true });
  } else {
    bindTransactions();
  }
  window.addEventListener('load', bindTransactions, { once: true });
})();
