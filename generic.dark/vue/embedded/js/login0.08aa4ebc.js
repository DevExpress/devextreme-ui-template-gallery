(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login0"],{cdd9:function(e,t,o){"use strict";o.r(t);var n=o("7a23"),r={class:"dx-button-text"},a={key:1};function c(e,t,o,c,d,s){var i=Object(n["resolveComponent"])("dx-required-rule"),l=Object(n["resolveComponent"])("dx-label"),u=Object(n["resolveComponent"])("dx-item"),b=Object(n["resolveComponent"])("dx-custom-rule"),m=Object(n["resolveComponent"])("dx-button-options"),p=Object(n["resolveComponent"])("dx-button-item"),O=Object(n["resolveComponent"])("dx-loadIndicator"),j=Object(n["resolveComponent"])("dx-form");return Object(n["openBlock"])(),Object(n["createElementBlock"])("form",{onSubmit:t[0]||(t[0]=Object(n["withModifiers"])((function(){return c.onSubmit&&c.onSubmit.apply(c,arguments)}),["prevent"]))},[Object(n["createVNode"])(j,{"form-data":c.formData,disabled:c.loading},{changePassword:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",null,[Object(n["createElementVNode"])("span",r,[c.loading?(Object(n["openBlock"])(),Object(n["createBlock"])(O,{key:0,width:"24px",height:"24px",visible:!0})):Object(n["createCommentVNode"])("",!0),c.loading?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("span",a,"Continue"))])])]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(u,{"data-field":"password","editor-type":"dxTextBox","editor-options":{stylingMode:"filled",placeholder:"Password",mode:"password"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{message:"Password is required"}),Object(n["createVNode"])(l,{visible:!1})]})),_:1}),Object(n["createVNode"])(u,{"data-field":"confirmedPassword","editor-type":"dxTextBox","editor-options":{stylingMode:"filled",placeholder:"Confirm Password",mode:"password"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{message:"Password is required"}),Object(n["createVNode"])(b,{message:"Passwords do not match","validation-callback":c.confirmPassword},null,8,["validation-callback"]),Object(n["createVNode"])(l,{visible:!1})]})),_:1}),Object(n["createVNode"])(p,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(m,{width:"100%",type:"default",template:"changePassword","use-submit-behavior":!0})]})),_:1})]})),_:1},8,["form-data","disabled"])],32)}var d=o("1da1"),s=(o("96cf"),o("66dc")),i=o.n(s),l=o("4f34"),u=o.n(l),b=o("cbd3"),m=o("6c02"),p=o("1ab6"),O={components:{DxForm:i.a,DxItem:s["DxItem"],DxLabel:s["DxLabel"],DxButtonItem:s["DxButtonItem"],DxButtonOptions:s["DxButtonOptions"],DxRequiredRule:s["DxRequiredRule"],DxCustomRule:s["DxCustomRule"],DxLoadIndicator:u.a},setup:function(){var e=Object(m["d"])(),t=Object(m["c"])(),o=Object(n["ref"])(""),r=Object(n["ref"])(!1),a=Object(n["reactive"])({password:""});function c(){return s.apply(this,arguments)}function s(){return s=Object(d["a"])(regeneratorRuntime.mark((function t(){var n,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=a.password,r.value=!0,t.next=4,p["a"].changePassword(n,o.value);case 4:c=t.sent,r.value=!1,c.isOk?e.push("/login-form"):Object(b["a"])(c.message,"error",2e3);case 7:case"end":return t.stop()}}),t)}))),s.apply(this,arguments)}function i(e){return e.value===a.password}return o.value=t.params.recoveryCode,{loading:r,formData:a,onSubmit:c,confirmPassword:i}}},j=o("6b0d"),f=o.n(j);const x=f()(O,[["render",c]]);t["default"]=x}}]);