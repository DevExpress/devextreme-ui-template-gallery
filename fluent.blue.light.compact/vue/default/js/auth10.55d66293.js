"use strict";(self["webpackChunkvue_ui_teplate_gallery"]=self["webpackChunkvue_ui_teplate_gallery"]||[]).push([[9226],{48832:function(e,a,s){s.r(a),s.d(a,{default:function(){return b}});s(69375);var t=s(59259),d=s(5313),o=s(32723),r=s(64277),l=s(539),u=s(38318),i=s(68974),n=s(12441);const p={class:"dx-button-text"},c={key:1};var f=(0,t.pM)({__name:"change-password-form",setup(e){const a=(0,i.rd)(),s=(0,i.lq)(),f=(0,o.KR)(""),w=(0,o.KR)(!1),b=(0,o.Kh)({password:""});async function v(){const{password:e}=b;w.value=!0;const s=await n.l.changePassword(e,f.value);w.value=!1,s.isOk?a.push("/login"):(0,u.A)(s.message,"error",2e3)}function m(e){return e.value===b.password}return f.value=s.params.recoveryCode,(e,a)=>((0,t.uX)(),(0,t.CE)("form",{onSubmit:(0,d.D$)(v,["prevent"])},[(0,t.bF)((0,o.R1)(r.Ay),{"form-data":b,disabled:w.value},{changePassword:(0,t.k6)((()=>[(0,t.Lk)("div",null,[(0,t.Lk)("span",p,[w.value?((0,t.uX)(),(0,t.Wv)((0,o.R1)(l.A),{key:0,width:"24px",height:"24px",visible:!0})):(0,t.Q3)("",!0),w.value?(0,t.Q3)("",!0):((0,t.uX)(),(0,t.CE)("span",c,"Continue"))])])])),default:(0,t.k6)((()=>[(0,t.bF)((0,o.R1)(r.KV),{"data-field":"password","editor-type":"dxTextBox","editor-options":{stylingMode:"filled",mode:"password"}},{default:(0,t.k6)((()=>[(0,t.bF)((0,o.R1)(r.az),{message:"Password is required"}),(0,t.bF)((0,o.R1)(r.jd),{text:"Password"})])),_:1}),(0,t.bF)((0,o.R1)(r.KV),{"data-field":"confirmedPassword","editor-type":"dxTextBox","editor-options":{stylingMode:"filled",mode:"password"}},{default:(0,t.k6)((()=>[(0,t.bF)((0,o.R1)(r.az),{message:"Password is required"}),(0,t.bF)((0,o.R1)(r.CC),{message:"Passwords do not match","validation-callback":m}),(0,t.bF)((0,o.R1)(r.jd),{text:"Confirm Password"})])),_:1}),(0,t.bF)((0,o.R1)(r.I),null,{default:(0,t.k6)((()=>[(0,t.bF)((0,o.R1)(r.$3),{width:"100%",type:"default",template:"changePassword","use-submit-behavior":!0})])),_:1})])),_:1},8,["form-data","disabled"])],32))}});const w=f;var b=w}}]);