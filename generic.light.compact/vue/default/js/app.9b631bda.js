(function(e){function t(t){for(var r,o,i=t[0],l=t[1],s=t[2],u=0,d=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);m&&m(t);while(d.length)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==c[i]&&(r=!1)}r&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={app:0},c={app:0},a=[];function i(e){return l.p+"js/"+({"login0~login1~login3~login4":"login0~login1~login3~login4",login0:"login0",login1:"login1",login3:"login3",login4:"login4"}[e]||e)+"."+{"login0~login1~login3~login4":"fb10beab",login0:"08aa4ebc",login1:"ae09870b",login3:"e6908824",login4:"5d586fa3"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={login1:1,login3:1,login4:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({"login0~login1~login3~login4":"login0~login1~login3~login4",login0:"login0",login1:"login1",login3:"login3",login4:"login4"}[e]||e)+"."+{"login0~login1~login3~login4":"31d6cfe0",login0:"31d6cfe0",login1:"110bf41c",login3:"22ab5c96",login4:"976ffe2c"}[e]+".css",c=l.p+r,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var s=a[i],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===r||u===c))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],u=s.getAttribute("data-href");if(u===r||u===c)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],m.parentNode.removeChild(m),n(a)},m.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=a);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(e);var d=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(m);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}c[e]=void 0}};var m=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var m=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0507":function(e,t,n){"use strict";n("b30f")},"0bd8":function(e,t,n){},"0c3f":function(e,t,n){},"1a5d":function(e,t,n){var r={"./change-password-form.vue":["cdd9","login0~login1~login3~login4","login0"],"./create-account-form.vue":["9e38","login0~login1~login3~login4","login1"],"./crm-contact-list.vue":["7a4d"],"./login-form.vue":["bf37","login0~login1~login3~login4","login3"],"./reset-password-form.vue":["dc00","login0~login1~login3~login4","login4"]};function o(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(o)}))}o.keys=function(){return Object.keys(r)},o.id="1a5d",e.exports=o},"1ab6":function(e,t,n){"use strict";var r=n("5530"),o=n("1da1"),c=(n("96cf"),{email:"sandra@example.com",avatarUrl:"https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png"});t["a"]={_user:c,loggedIn:function(){return!!this._user},logIn:function(e,t){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,console.log(e,t),n._user=Object(r["a"])(Object(r["a"])({},c),{},{email:e}),o.abrupt("return",{isOk:!0,data:n._user});case 6:return o.prev=6,o.t0=o["catch"](0),o.abrupt("return",{isOk:!1,message:"Authentication failed"});case 9:case"end":return o.stop()}}),o,null,[[0,6]])})))()},logOut:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e._user=null;case 1:case"end":return t.stop()}}),t)})))()},getUser:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.abrupt("return",{isOk:!0,data:e._user});case 4:return t.prev=4,t.t0=t["catch"](0),t.abrupt("return",{isOk:!1});case 7:case"end":return t.stop()}}),t,null,[[0,4]])})))()},resetPassword:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,console.log(e),t.abrupt("return",{isOk:!0});case 5:return t.prev=5,t.t0=t["catch"](0),t.abrupt("return",{isOk:!1,message:"Failed to reset password"});case 8:case"end":return t.stop()}}),t,null,[[0,5]])})))()},changePassword:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,console.log(e,t),n.abrupt("return",{isOk:!0});case 5:return n.prev=5,n.t0=n["catch"](0),n.abrupt("return",{isOk:!1,message:"Failed to change password"});case 8:case"end":return n.stop()}}),n,null,[[0,5]])})))()},createAccount:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,console.log(e,t),n.abrupt("return",{isOk:!0});case 5:return n.prev=5,n.t0=n["catch"](0),n.abrupt("return",{isOk:!1,message:"Failed to create account"});case 8:case"end":return n.stop()}}),n,null,[[0,5]])})))()}}},"21db":function(e,t,n){"use strict";n("0bd8")},"2c35":function(e,t,n){"use strict";n("76a4")},"2c44":function(e,t,n){},3284:function(e,t,n){"use strict";n("6d94")},"429f":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("483b"),n("429f"),n("7e58");var r=n("7a23"),o=(n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("7a4d")),c=n("1ab6"),a=n("6c02"),i={class:"side-nav-outer-toolbar"};function l(e,t,n,o,c,a){var l=Object(r["resolveComponent"])("header-toolbar"),s=Object(r["resolveComponent"])("dx-scroll-view"),u=Object(r["resolveComponent"])("side-nav-menu"),d=Object(r["resolveComponent"])("dx-drawer");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",i,[Object(r["createVNode"])(l,{class:"layout-header","menu-toggle-enabled":!0,"toggle-menu-func":o.toggleMenu,title:n.title},null,8,["toggle-menu-func","title"]),Object(r["createVNode"])(d,{class:"layout-body",position:"before",template:"menuTemplate",opened:o.menuOpened,"onUpdate:opened":t[0]||(t[0]=function(e){return o.menuOpened=e}),"opened-state-mode":o.drawerOptions.menuMode,"reveal-mode":o.drawerOptions.menuRevealMode,"min-size":o.drawerOptions.minMenuSize,"max-size":o.drawerOptions.maxMenuSize,shading:o.drawerOptions.shaderEnabled,"close-on-outside-click":o.drawerOptions.closeOnOutsideClick},{menuTemplate:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(u,{"compact-mode":!o.menuOpened,onClick:o.handleSideBarClick},null,8,["compact-mode","onClick"])]})),default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{ref:"scrollViewRef",class:"with-footer"},{default:Object(r["withCtx"])((function(){return[Object(r["renderSlot"])(e.$slots,"default"),Object(r["renderSlot"])(e.$slots,"footer")]})),_:3},512)]})),_:3},8,["opened","opened-state-mode","reveal-mode","min-size","max-size","shading","close-on-outside-click"])])}var s=n("f87d"),u=n.n(s),d=n("5a1f"),m=n.n(d),p=[{text:"CRM",icon:"user",path:"",items:[{text:"Contact List",path:"/crm-contact-list"}]}],f={class:"header-component"};function b(e,t,n,o,c,a){var i=Object(r["resolveComponent"])("dx-button"),l=Object(r["resolveComponent"])("dx-item"),s=Object(r["resolveComponent"])("user-panel"),u=Object(r["resolveComponent"])("dx-toolbar");return Object(r["openBlock"])(),Object(r["createElementBlock"])("header",f,[Object(r["createVNode"])(u,{class:"header-toolbar"},{menuUserItem:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{email:o.email,"menu-items":o.userMenuItems,"menu-mode":"list"},null,8,["email","menu-items"])]})),default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l,{visible:n.menuToggleEnabled,location:"before","css-class":"menu-button"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{icon:"menu","styling-mode":"text",onClick:n.toggleMenuFunc},null,8,["onClick"])]})),_:1},8,["visible"]),n.title?(Object(r["openBlock"])(),Object(r["createBlock"])(l,{key:0,location:"before","css-class":"header-title dx-toolbar-label"},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",null,Object(r["toDisplayString"])(n.title),1)]})),_:1})):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])(l,{location:"after","locate-in-menu":"auto","menu-item-template":"menuUserItem"},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",null,[Object(r["createVNode"])(i,{class:"user-button authorization",width:210,height:"100%","styling-mode":"text"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(s,{email:o.email,"menu-items":o.userMenuItems,"menu-mode":"context"},null,8,["email","menu-items"])]})),_:1})])]})),_:1})]})),_:1})])}var g=n("6191"),v=n.n(g),h=n("d158"),O=n.n(h),j={class:"user-panel"},w={class:"user-info"},x=Object(r["createElementVNode"])("div",{class:"image-container"},[Object(r["createElementVNode"])("div",{class:"user-image"})],-1),k={class:"user-name"};function y(e,t,n,o,c,a){var i=Object(r["resolveComponent"])("dx-position"),l=Object(r["resolveComponent"])("dx-context-menu"),s=Object(r["resolveComponent"])("dx-list");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",j,[Object(r["createElementVNode"])("div",w,[x,Object(r["createElementVNode"])("div",k,Object(r["toDisplayString"])(n.email),1)]),"context"===n.menuMode?(Object(r["openBlock"])(),Object(r["createBlock"])(l,{key:0,target:".user-button",items:n.menuItems,width:210,"show-event":"dxclick","css-class":"user-menu"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(i,{my:"top center",at:"bottom center"})]})),_:1},8,["items"])):Object(r["createCommentVNode"])("",!0),"list"===n.menuMode?(Object(r["openBlock"])(),Object(r["createBlock"])(s,{key:1,class:"dx-toolbar-menu-action",items:n.menuItems},null,8,["items"])):Object(r["createCommentVNode"])("",!0)])}var C=n("c68b"),S=n.n(C),N=n("6dd7"),V=n.n(N),E={props:{menuMode:String,menuItems:Array,email:String},components:{DxContextMenu:S.a,DxPosition:C["DxPosition"],DxList:V.a}},M=(n("3284"),n("6b0d")),B=n.n(M);const I=B()(E,[["render",y]]);var D=I,_={props:{menuToggleEnabled:Boolean,title:String,toggleMenuFunc:Function,logOutFunc:Function},setup:function(){var e=Object(a["d"])(),t=Object(a["c"])(),n=Object(r["ref"])("");c["a"].getUser().then((function(e){return n.value=e.data.email}));var o=[{text:"Profile",icon:"user",onClick:l},{text:"Logout",icon:"runner",onClick:i}];function i(){c["a"].logOut(),e.push({path:"/login-form",query:{redirect:t.path}})}function l(){e.push({path:"/profile",query:{redirect:t.path}})}return{email:n,userMenuItems:o}},components:{DxButton:v.a,DxToolbar:O.a,DxItem:h["DxItem"],UserPanel:D}};n("0507");const P=B()(_,[["render",b]]);var L=P,A={class:"menu-container"};function R(e,t,n,o,c,a){var i=Object(r["resolveComponent"])("dx-tree-view");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"dx-swatch-additional side-navigation-menu",onClick:t[0]||(t[0]=function(){return o.forwardClick&&o.forwardClick.apply(o,arguments)})},[Object(r["renderSlot"])(e.$slots,"default"),Object(r["createElementVNode"])("div",A,[Object(r["createVNode"])(i,{ref:"treeViewRef",items:o.items,"key-expr":"path","selection-mode":"single","focus-state-enabled":!1,"expand-event":"click",onItemClick:o.handleItemClick,width:"100%"},null,8,["items","onItemClick"])])])}var T=n("5530"),z=(n("d81d"),n("8dc9")),U=n.n(z),F=(n("159b"),n("4de4"),{XSmall:"(max-width: 599.99px)",Small:"(min-width: 600px) and (max-width: 959.99px)",Medium:"(min-width: 960px) and (max-width: 1279.99px)",Large:"(min-width: 1280px)"}),q=[],X=window.matchMedia(F.XSmall),$=window.matchMedia(F.Small),J=window.matchMedia(F.Medium),G=window.matchMedia(F.Large);[X,$,J,G].forEach((function(e){e.addListener((function(){q.forEach((function(e){return e()}))}))}));var H=function(){return{"screen-x-small":X.matches,"screen-small":$.matches,"screen-medium":J.matches,"screen-large":G.matches}},K=function(e){return q.push(e)},W=function(e){q=q.filter((function(t){return t!==e}))},Y={props:{compactMode:Boolean},setup:function(e,t){var n=Object(a["c"])(),o=Object(a["d"])(),c=H()["screen-large"],i=p.map((function(e){return e.path&&!/^\//.test(e.path)&&(e.path="/".concat(e.path)),Object(T["a"])(Object(T["a"])({},e),{},{expanded:c})})),l=Object(r["ref"])(null);function s(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.emit("click",n)}function u(t){if(t.itemData.path&&!e.compactMode){o.push(t.itemData.path);var n=t.event;n.stopPropagation()}}function d(){l.value&&l.value.instance&&(l.value.instance.selectItem(n.path),l.value.instance.expandItem(n.path))}return Object(r["onMounted"])((function(){d(),e.compactMode&&l.value.instance.collapseAll()})),Object(r["watch"])((function(){return n.path}),(function(){d()})),Object(r["watch"])((function(){return e.compactMode}),(function(){e.compactMode?l.value.instance.collapseAll():d()})),{treeViewRef:l,items:i,forwardClick:s,handleItemClick:u,updateSelection:d}},components:{DxTreeView:U.a}};n("2c35");const Q=B()(Y,[["render",R]]);var Z=Q,ee={props:{title:String,isXSmall:Boolean,isLarge:Boolean},setup:function(e){var t=Object(a["c"])(),n=Object(r["ref"])(null),o=Object(r["ref"])(e.isLarge),c=Object(r["ref"])(!1);function i(e){var t=e.event;t.stopPropagation(),o.value&&(c.value=!1),o.value=!o.value}function l(){!1===o.value&&(c.value=!0),o.value=!0}var s=Object(r["computed"])((function(){var t=!e.isLarge;return{menuMode:e.isLarge?"shrink":"overlap",menuRevealMode:e.isXSmall?"slide":"expand",minMenuSize:e.isXSmall?0:60,maxMenuSize:e.isXSmall?250:void 0,closeOnOutsideClick:t,shaderEnabled:t}}));return Object(r["watch"])((function(){return e.isLarge}),(function(){c.value||(o.value=e.isLarge)})),Object(r["watch"])((function(){return t.path}),(function(){!c.value&&e.isLarge||(o.value=!1,c.value=!1),n.value.instance.scrollTo(0)})),{menuOpened:o,menuItems:p,toggleMenu:i,handleSideBarClick:l,drawerOptions:s,scrollViewRef:n}},components:{DxDrawer:u.a,DxScrollView:m.a,HeaderToolbar:L,SideNavMenu:Z}};n("9c5c");const te=B()(ee,[["render",l]]);var ne=te,re=(n("a4d3"),n("e01a"),{class:"dx-card content"}),oe={class:"header"},ce={class:"title"},ae={class:"description"};function ie(e,t,n,o,c,a){var i=Object(r["resolveComponent"])("dx-scroll-view");return Object(r["openBlock"])(),Object(r["createBlock"])(i,{height:"100%",width:"100%",class:"with-footer single-card"},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",re,[Object(r["createElementVNode"])("div",oe,[Object(r["createElementVNode"])("div",ce,Object(r["toDisplayString"])(o.title),1),Object(r["createElementVNode"])("div",ae,Object(r["toDisplayString"])(o.description),1)]),Object(r["renderSlot"])(e.$slots,"default")])]})),_:3})}var le={components:{DxScrollView:m.a},setup:function(){var e=Object(a["c"])(),t=Object(r["ref"])(e.meta.title),n=Object(r["ref"])("");return Object(r["watch"])((function(){return e.path}),(function(){t.value=e.meta.title,n.value=e.meta.description})),{title:t,description:n}}};n("e746");const se=B()(le,[["render",ie]]);var ue=se;function de(e){return function(){return n("1a5d")("./".concat(e,".vue"))}}var me=new a["a"]({routes:[{path:"/login-form",name:"login-form",meta:{requiresAuth:!1,layout:ue,title:"Sign In"},component:de("login-form")},{path:"/reset-password",name:"reset-password",meta:{requiresAuth:!1,layout:ue,title:"Reset Password",description:"Please enter the email address that you used to register, and we will send you a link to reset your password via Email."},component:de("reset-password-form")},{path:"/create-account",name:"create-account",meta:{requiresAuth:!1,layout:ue,title:"Sign Up"},component:de("create-account-form")},{path:"/change-password/:recoveryCode",name:"change-password",meta:{requiresAuth:!1,layout:ue,title:"Change Password"},component:de("change-password-form")},{path:"/",redirect:"/crm-contact-list"},{path:"/recovery",redirect:"/crm-contact-list"},{path:"/:pathMatch(.*)*",redirect:"/crm-contact-list"},{path:"/crm-contact-list",name:"crm-contact-list",meta:{requiresAuth:!0,layout:ne},component:o["default"]}],history:Object(a["b"])()});me.beforeEach((function(e,t,n){"login-form"===e.name&&c["a"].loggedIn()&&n({name:"home"}),e.matched.some((function(e){return e.meta.requiresAuth}))?c["a"].loggedIn()?n():n({name:"login-form",query:{redirect:e.fullPath}}):n()}));var pe=me,fe={id:"root"},be={class:"content"};function ge(e,t,n,o,c,a){var i=Object(r["resolveComponent"])("router-view"),l=Object(r["resolveComponent"])("app-footer");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",fe,[Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(o.cssClasses)},[(Object(r["openBlock"])(),Object(r["createBlock"])(Object(r["resolveDynamicComponent"])(e.$route.meta.layout),{title:o.title,"is-x-small":o.screen.getScreenSizeInfo.isXSmall,"is-large":o.screen.getScreenSizeInfo.isLarge},{footer:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(l)]})),default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",be,[Object(r["createVNode"])(i)])]})),_:1},8,["title","is-x-small","is-large"]))],2)])}n("b64b"),n("99af");var ve={class:"content-block"},he={class:"footer"},Oe=Object(r["createElementVNode"])("br",null,null,-1),je=Object(r["createTextVNode"])("All trademarks or registered trademarks are property of their respective owners. ");function we(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",ve,[Object(r["createElementVNode"])("footer",he,[Object(r["createTextVNode"])(" Copyright © 2011-"+Object(r["toDisplayString"])((new Date).getFullYear())+" "+Object(r["toDisplayString"])(this.$appInfo.title)+" Inc. ",1),Oe,je])])}n("21db");const xe={},ke=B()(xe,[["render",we]]);var ye=ke;function Ce(){var e=H();return{isXSmall:e["screen-x-small"],isLarge:e["screen-large"],cssClasses:Object.keys(e).filter((function(t){return e[t]}))}}var Se={components:{AppFooter:ye},setup:function(){var e=Object(r["getCurrentInstance"])(),t=e.proxy.$appInfo.title,n=Object(r["reactive"])({getScreenSizeInfo:{}});function o(){n.getScreenSizeInfo=Ce()}n.getScreenSizeInfo=Ce(),Object(r["onMounted"])((function(){K(o)})),Object(r["onBeforeUnmount"])((function(){W(o)}));var c=Object(r["computed"])((function(){return["app"].concat(n.getScreenSizeInfo.cssClasses)}));return{title:t,screen:n,cssClasses:c}}};n("cb63");const Ne=B()(Se,[["render",ge]]);var Ve=Ne,Ee={title:"UI Templates Gallery"},Me=Object(r["createApp"])(Ve);Me.use(pe),Me.config.globalProperties.$appInfo=Ee,Me.mount("#app")},"6d94":function(e,t,n){},"76a4":function(e,t,n){},"7a4d":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=Object(r["createElementVNode"])("h2",{class:"content-block"},"Crm Contact List",-1),c=Object(r["createElementVNode"])("div",{class:"content-block"},[Object(r["createElementVNode"])("div",{class:"dx-card responsive-paddings"}," Put your content here ")],-1),a=[o,c];function i(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",null,a)}var l=n("6b0d"),s=n.n(l);const u={},d=s()(u,[["render",i]]);t["default"]=d},"7e58":function(e,t,n){},"9c5c":function(e,t,n){"use strict";n("0c3f")},b30f:function(e,t,n){},be77:function(e,t,n){},cb63:function(e,t,n){"use strict";n("be77")},e746:function(e,t,n){"use strict";n("2c44")}});