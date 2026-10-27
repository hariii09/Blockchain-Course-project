const K='lifehub',PG=[['Dashboard','dashboard.html'],['Focus','focus.html'],['Settings','settings.html'],['Accessibility','accessibility.html']];
const S=Object.assign({name:'Alex Doe',email:'you@example.com',pw:'',notif:true,theme:'Light',lang:'English',big:false,hc:false,voice:false,tasks:[false,false,false,false],focusMin:0},JSON.parse(localStorage.getItem(K)||'{}'));
const save=()=>localStorage.setItem(K,JSON.stringify(S));
const $=s=>document.querySelector(s);
function apply(){const c=document.documentElement.classList;c.toggle('dark',S.theme==='Dark');c.toggle('hc',S.hc);c.toggle('big',S.big)}
apply();
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}t.textContent=m;t.classList.add('s');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('s'),2200)}
function tog(el,on,fn){el.setAttribute('aria-checked',on);el.setAttribute('role','switch');el.onclick=()=>{const v=el.getAttribute('aria-checked')!=='true';el.setAttribute('aria-checked',v);fn(v)}}
function sidebar(){const e=$('#sb');if(!e)return;const p=location.pathname.split('/').pop();
e.innerHTML='<div class="logo"><i></i>Life Hub</div>'+PG.map(([n,u])=>`<a href="${u}" class="${u===p?'on':''}"><i></i>${n}</a>`).join('')+`<a href="settings.html" class="me"><i></i>${S.name.split(' ')[0]||'Profile'}</a>`}
function voice(){if(!S.voice)return;const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return;const r=new R();r.continuous=true;
r.onresult=e=>{const t=e.results[e.results.length-1][0].transcript.toLowerCase();PG.forEach(([n,u])=>t.includes(n.toLowerCase())&&(location.href=u))};
r.onend=()=>S.voice&&r.start();try{r.start()}catch{}}
sidebar();voice();
const fmt=m=>m<60?m+'m':Math.floor(m/60)+'h '+(m%60)+'m';
