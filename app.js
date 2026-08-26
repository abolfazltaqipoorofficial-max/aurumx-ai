async function api(url,opts){const r=await fetch(url,{headers:{'Content-Type':'application/json'},...opts});return r.json()}
async function load(){
 const n=await api('/api/news'); document.getElementById('newsgrid').innerHTML=n.items.map(x=>`<article class="panel news"><div class="tag">${x.impact} IMPACT · ${x.time}</div><h3>${esc(x.title)}</h3><p>${esc(x.source)}</p></article>`).join('');
 const c=await api('/api/calendar'); document.getElementById('calgrid').innerHTML=c.items.map(x=>`<article class="panel"><div class="tag">${x.impact} IMPACT</div><h3>${esc(x.event)}</h3><p>Actual: ${esc(x.actual)} · Forecast: ${esc(x.forecast)} · Previous: ${esc(x.previous)}</p></article>`).join('');
}
async function runAnalysis(){
 const d=await api('/api/ai/analyze',{method:'POST',body:JSON.stringify({symbol:'XAUUSD',timeframe:'1H'})});
 document.getElementById('aibias').textContent=d.bias;
 document.getElementById('entry').textContent=d.entryZone;
 document.getElementById('sl').textContent=d.stopLoss;
 document.getElementById('tp1').textContent=d.takeProfit1;
 document.getElementById('tp2').textContent=d.takeProfit2;
 document.getElementById('bias').textContent=d.bias;
 document.getElementById('reasons').innerHTML=d.reasons.map(x=>`<li>${esc(x)}</li>`).join('');
 document.getElementById('ai').scrollIntoView();
}
async function askAI(){
 const i=document.getElementById('chatinput'),msg=i.value.trim();if(!msg)return;
 const box=document.getElementById('chatbox');box.innerHTML+=`<div class="user">${esc(msg)}</div>`;i.value='';
 const d=await api('/api/ai/chat',{method:'POST',body:JSON.stringify({message:msg})});
 box.innerHTML+=`<div class="bot">${esc(d.reply)}</div>`;box.scrollTop=box.scrollHeight;
}
function calcRisk(){let b=+balance.value||0,r=+risk.value||0;document.getElementById('riskout').textContent=`Risk: $${(b*r/100).toFixed(2)}`}
function showLogin(){modal.classList.remove('hidden')}function hideLogin(){modal.classList.add('hidden')}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
load();
