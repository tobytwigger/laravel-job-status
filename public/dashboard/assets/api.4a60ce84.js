import{c as y,h as m}from"./render.460e5296.js";import{j as o,c,h as b,a as u,g as $,l as j,E as v}from"./index.8b0422ed.js";import{a as g}from"./index.2cf0d985.js";import{C as h}from"./config.b6f61684.js";var R=y({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:t}){const{proxy:{$q:r}}=$(),n=u(j,o);if(n===o)return console.error("QPage needs to be a deep child of QLayout"),o;if(u(v,o)===o)return console.error("QPage needs to be child of QPageContainer"),o;const l=c(()=>{const s=(n.header.space===!0?n.header.size:0)+(n.footer.space===!0?n.footer.size:0);if(typeof e.styleFn=="function"){const f=n.isContainer.value===!0?n.containerHeight.value:r.screen.height;return e.styleFn(s,f)}return{minHeight:n.isContainer.value===!0?n.containerHeight.value-s+"px":r.screen.height===0?s!==0?`calc(100vh - ${s}px)`:"100vh":r.screen.height-s+"px"}}),p=c(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>b("main",{class:p.value,style:l.value},m(t.default))}});const C=(e,t={})=>g.post(e,t),i=(e,t={})=>g.get(e,t),a=e=>{var n;const t=(n=h.get().domain)!=null?n:"",r=h.get().path;return t+(t.endsWith("/")?"":"/")+r+(r.endsWith("/")?"":"/")+"api/"+e},Q=a("dashboard"),S=a("tracked-job"),x=e=>a("tracked-job/"+e),P=e=>a("job-run/"+e.toString()),F=a("history"),w=e=>a("signal/"+e.toString()),q=()=>i(Q).then(e=>({test:""})),H=()=>i(S).then(e=>e.data),L=e=>i(x(e)).then(t=>t.data),k=e=>i(P(e)).then(t=>t.data),z=()=>i(F).then(e=>e.data),K=(e,t,r,n)=>C(w(e),{signal:t,cancel_job:r?"1":"0",parameters:n}).then(d=>{});var U={dashboard:q,jobList:H,jobShow:L,runShow:k,history:z,signal:K};export{R as Q,U as a};