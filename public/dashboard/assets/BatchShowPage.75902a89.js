import{c as k,Q as m,a as I,b as p}from"./index.f4970416.js";import{c as f,Q as _,b as s,d as h}from"./QItem.88debe80.js";import{Q as b}from"./QPage.05c0d848.js";import{_ as L}from"./TrackedRunListItem.755b70c0.js";import{d as S}from"./dayjs.min.7d719b56.js";import{J as w,r as N,k as x,c as V,K as r,L as v,M as e,d as a,Q as n,O as l,P as c,$ as Q,R as y,S as j,F as P}from"./index.e40d63b2.js";import"./use-router-link.6cd4e016.js";import"./render.c0279511.js";import"./index.b7f28e66.js";import"./QCircularProgress.1c5c3ee2.js";import"./format.801e7424.js";import"./QChip.890341c4.js";import"./api.9a3f3035.js";import"./relativeTime.5ea38464.js";const q={class:"row"},C={class:"col-12 q-py-md"},D={class:"col-12"},X=w({__name:"BatchShowPage",props:{batchId:null},setup(B){const o=B,t=N(null);let g=k.batches.show(o.batchId).bypassAuth().listen().onUpdated(d=>t.value=d).start();x(()=>{g.stop()});const u=V(()=>t.value===null?"Loading":t.value.name!==null&&t.value.name!==""?t.value.name:"dispatched at "+S(t.value.created_at).format("L LTS"));return(d,E)=>t.value!==null?(r(),v(b,{key:0,class:"justify-evenly",padding:""},{default:e(()=>[a(I,null,{default:e(()=>[a(m,{icon:"list",to:"/batch",label:"Batches"}),a(m,{icon:"list",to:"/batch/"+o.batchId,label:"Batch #"+o.batchId},null,8,["to","label"])]),_:1}),n("div",q,[n("div",C,[a(h,{bordered:"",separator:""},{default:e(()=>[a(f,null,{default:e(()=>[a(_,null,{default:e(()=>[a(s,null,{default:e(()=>[l(c(t.value.batch_id),1)]),_:1}),a(s,{caption:""},{default:e(()=>[l("Batch ID")]),_:1})]),_:1})]),_:1}),a(f,null,{default:e(()=>[a(_,null,{default:e(()=>[a(s,null,{default:e(()=>[l(c(Q(u)),1)]),_:1}),a(s,{caption:""},{default:e(()=>[l("Name")]),_:1})]),_:1})]),_:1})]),_:1})]),n("div",D,[a(h,{class:"rounded-borders q-pa-lg"},{default:e(()=>[a(s,{header:""},{default:e(()=>[l("Viewing batch '"+c(Q(u))+"'",1)]),_:1}),a(p),(r(!0),y(P,null,j(t.value.runs,i=>(r(),y("div",{key:i.id},[a(L,{"tracked-run":i},null,8,["tracked-run"]),a(p)]))),128))]),_:1})])])]),_:1})):(r(),v(b,{key:1,class:"items-center justify-evenly"},{default:e(()=>[l(" Loading ")]),_:1}))}});export{X as default};