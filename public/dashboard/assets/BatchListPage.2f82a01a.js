import{c as L,Q as S,a as w,b as f}from"./index.f4970416.js";import{Q as l,b as n,c as I,d as q}from"./QItem.88debe80.js";import{Q as h}from"./QPage.05c0d848.js";import{Q as b}from"./use-router-link.6cd4e016.js";import{_ as c}from"./StatusCount.2a1f6a9e.js";import{d as r}from"./dayjs.min.7d719b56.js";import{l as F}from"./localizedFormat.7e484916.js";import{r as N}from"./relativeTime.5ea38464.js";import{J as k,c as g,K as o,L as d,M as a,d as t,O as m,P as Q,$ as x,Q as y,r as j,k as z,R as B,S as A,F as C}from"./index.e40d63b2.js";import"./render.c0279511.js";import"./index.b7f28e66.js";import"./QAvatar.4fe76440.js";import"./QChip.890341c4.js";const P={class:"text-weight-medium"},T={class:"text-grey-8 q-gutter-xs"},V=k({__name:"BatchListItem",props:{batch:null},setup(p){const e=p;r.extend(N),r.extend(F);const u=g(()=>r().to(e.batch.created_at)),i=g(()=>e.batch.name!==null&&e.batch.name!==""?e.batch.name:"Batch dispatched at "+r(e.batch.created_at).format("L LTS"));return(s,v)=>(o(),d(I,{clickable:"",to:{path:"/batch/"+e.batch.id}},{default:a(()=>[t(l,{avatar:"",top:""},{default:a(()=>[t(b,{name:"group_work",color:"black",size:"34px"})]),_:1}),t(l,{top:"",class:"col-2 gt-sm"},{default:a(()=>[t(n,{class:"q-mt-sm"},{default:a(()=>[m(Q(x(u)),1)]),_:1})]),_:1}),t(l,{top:""},{default:a(()=>[t(n,{lines:"1"},{default:a(()=>[y("span",P,Q(x(i)),1)]),_:1}),t(n,{caption:"",lines:"5"},{default:a(()=>[t(c,{count:e.batch.queued,label:"Queued",color:"primary"},null,8,["count"]),t(c,{count:e.batch.started,label:"Running",color:"info"},null,8,["count"]),t(c,{count:e.batch.cancelled,label:"Cancelled",color:"warning"},null,8,["count"]),t(c,{count:e.batch.failed,label:"Failed",color:"negative"},null,8,["count"]),t(c,{count:e.batch.succeeded,label:"Succeeded",color:"positive"},null,8,["count"])]),_:1})]),_:1}),t(l,{top:"",side:""},{default:a(()=>[y("div",T,[t(b,{class:"gt-xs",size:"12px",icon:"keyboard_arrow_right"})])]),_:1})]),_:1},8,["to"]))}}),Y=k({__name:"BatchListPage",setup(p){const e=j(null);let u=L.batches.search().bypassAuth().listen().onUpdated(s=>e.value=s).start();z(()=>{u.stop()});function i(s){return s.batch_id}return(s,v)=>e.value!==null?(o(),d(h,{key:0,class:"justify-evenly"},{default:a(()=>[t(w,null,{default:a(()=>[t(S,{icon:"list",to:"/batch",label:"Batches"})]),_:1}),t(q,{class:"rounded-borders q-pa-lg"},{default:a(()=>[t(n,{header:""},{default:a(()=>[m("All Batches")]),_:1}),t(f),(o(!0),B(C,null,A(e.value,_=>(o(),B("div",{key:i(_)},[t(V,{batch:_},null,8,["batch"]),t(f)]))),128))]),_:1})]),_:1})):(o(),d(h,{key:1,class:"items-center justify-evenly"},{default:a(()=>[m(" Loading ")]),_:1}))}});export{Y as default};
