import{Q as s,a as r}from"./api.4a60ce84.js";import{_ as n,J as i,K as p,L as l,M as d,I as u,O as f,P as c,Q as m}from"./index.8b0422ed.js";import"./render.460e5296.js";import"./index.2cf0d985.js";import"./config.b6f61684.js";const P=i({name:"DashboardPage",setup(){let a=null;function e(){r.dashboard().then(t=>{a=u(t)})}return{loadApi:e,results:a}}});function _(a,e,t,b,g,h){return p(),l(s,{class:"justify-evenly"},{default:d(()=>[f(" Result: "+c(a.apiResult)+" ",1),m("button",{onClick:e[0]||(e[0]=(...o)=>a.loadApi&&a.loadApi(...o))}," Load API ")]),_:1})}var B=n(P,[["render",_]]);export{B as default};