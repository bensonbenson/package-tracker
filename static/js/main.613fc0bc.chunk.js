(this["webpackJsonppackage-tracker"]=this["webpackJsonppackage-tracker"]||[]).push([[0],{104:function(e,a,t){},105:function(e,a,t){},108:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(12),l=t.n(c),o=(t(64),t(89),t(143)),i=t(22),m=(t(90),t(68)),s=t.n(m).a.initializeApp({apiKey:"AIzaSyA8Nd3BWu8uuMjvn_lOuCvYtSIkicenw_s",authDomain:"package-tracker-fc29b.firebaseapp.com",databaseURL:"https://package-tracker-fc29b.firebaseio.com",projectId:"package-tracker-fc29b",storageBucket:"package-tracker-fc29b.appspot.com",messagingSenderId:"476804320370",appId:"1:476804320370:web:6420daba7c1315970886eb"}).firestore(),u=t(157),d=t(154),p=t(159),E=t(161),f=t(141),g=t(156),v=t(142);var b=function(){var e=Object(n.useState)(""),a=Object(i.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)(""),o=Object(i.a)(l,2),m=o[0],b=o[1],k=Object(n.useState)(""),h=Object(i.a)(k,2),y=h[0],w=h[1];return r.a.createElement("div",{style:{width:"75%"}},r.a.createElement("div",{className:"addTitle"},"Add Package"),r.a.createElement("div",null,r.a.createElement("form",{className:"formStyle"},r.a.createElement("div",{className:"spaceBetweenFields"},r.a.createElement(d.a,{fullWidth:!0,required:!0,id:"packageName",label:"Package name",onChange:function(e){c(e.target.value)},value:t})),r.a.createElement("div",{className:"spaceBetweenFields"},r.a.createElement(d.a,{fullWidth:!0,required:!0,id:"trackingNum",label:"Tracking number",onChange:function(e){b(e.target.value)},value:m})),r.a.createElement("div",{className:"moreSpaceBetweenFields"},r.a.createElement(p.a,{value:y,onChange:function(e){w(e.target.value)}},r.a.createElement(E.a,{id:"select-label"},"Select a carrier:"),r.a.createElement(f.a,{value:"Amazon",control:r.a.createElement(g.a,{color:"primary",size:"small"}),label:"Amazon (use Order ID number)"}),r.a.createElement(f.a,{value:"DHL",control:r.a.createElement(g.a,{color:"primary",size:"small"}),label:"DHL"}),r.a.createElement(f.a,{value:"Fedex",control:r.a.createElement(g.a,{color:"primary",size:"small"}),label:"Fedex"}),r.a.createElement(f.a,{value:"UPS",control:r.a.createElement(g.a,{color:"primary",size:"small"}),label:"UPS"}),r.a.createElement(f.a,{value:"USPS",control:r.a.createElement(g.a,{color:"primary",size:"small"}),label:"USPS"}))))),r.a.createElement(v.a,{onClick:function(){t&&m&&y?(!function(e,a,t){var n=Object(u.a)(),r={id:n,name:e,timestamp:new Date,carrier:t,trackingNum:a,delivered:!1};s.collection("packages").doc(n).set(r).catch((function(e){console.log("Error adding: ".concat(e))}))}(t,m,y),c(""),b(""),w("")):window.alert("Please complete all fields.")},variant:"contained",color:"primary",disableElevation:!0,style:{fontWeight:"bold"}},"Add Package"))};t(104);var k=function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"loader"}))},h=(t(105),t(73)),y=t.n(h),w=t(144),S=t(145),j=t(146),C=t(147),N=t(148),O=t(158),D=t(160),B=t(149),P=t(150),x=t(151),z=t(152);var A=function(){var e=Object(n.useState)(!0),a=Object(i.a)(e,2),t=a[0],c=a[1],l=Object(n.useState)([]),m=Object(i.a)(l,2),u=m[0],d=m[1],p=Object(n.useState)(!1),E=Object(i.a)(p,2),f=E[0],g=E[1],b=Object(n.useState)(""),h=Object(i.a)(b,2),A=h[0],I=h[1];Object(n.useEffect)((function(){var e=s.collection("packages").onSnapshot((function(e){var a=e.docs.map((function(e){return e.data()}));d(a),c(!1)}));return function(){return e()}}),[]);var _=function(e){var a=e.carrier,t=e.trackingNum;switch(a){case"USPS":return"https://tools.usps.com/go/TrackConfirmAction?tLabels=".concat(t);case"UPS":return"https://www.ups.com/track?loc=null&tracknum=".concat(t);case"Fedex":return"https://fedex.com/apps/fedextrack/index.html?tracknumbers=".concat(t);case"Amazon":return"https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=".concat(t);case"DHL":return"https://www.dhl.com/en/express/tracking.html?AWB=".concat(t);default:return"http://doge2048.com/"}},F=function(){g(!1),I("")};return t?r.a.createElement(k,null):r.a.createElement("div",null,function(){var e=function(){var e=u;return e.sort((function(e,a){return new Date(e.timestamp.toDate())-new Date(a.timestamp.toDate())})),e.reverse()}();return e.length<1?r.a.createElement("div",null,"You have no packages saved!"):r.a.createElement(o.a,{container:!0},r.a.createElement(o.a,{item:!0,xs:12},r.a.createElement(w.a,{style:{tableLayout:"fixed"}},r.a.createElement(S.a,null,r.a.createElement(j.a,null,r.a.createElement(C.a,{className:"tableCell",align:"center"},"Name"),r.a.createElement(C.a,{className:"tableCell",align:"center"},"Carrier"),r.a.createElement(C.a,{className:"tableCell",align:"center"},"Tracking"),r.a.createElement(C.a,{className:"tableCell",align:"center"},"Delivered"),r.a.createElement(C.a,null))),r.a.createElement(N.a,null,e.map((function(e){return r.a.createElement(j.a,{key:e.id,className:e.delivered?"deliveredRow":"inProgressRow"},r.a.createElement(C.a,{style:{borderBottom:"none"}},e.name),r.a.createElement(C.a,{style:{borderBottom:"none"},align:"center"},e.carrier),r.a.createElement(C.a,{style:{borderBottom:"none"},align:"center"},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:_(e)},"Track here")),r.a.createElement(C.a,{style:{borderBottom:"none"},align:"center"},r.a.createElement(O.a,{checked:e.delivered,onChange:function(){return function(e){s.collection("packages").doc(e.id).update({delivered:!e.delivered}).catch((function(e){console.log("Error in changing package delivered status: ".concat(e))}))}(e)},value:e.id})),r.a.createElement(C.a,{style:{borderBottom:"none"},align:"center"},r.a.createElement(v.a,{onClick:function(){return function(e){g(!0),I(e)}(e)},style:{backgroundColor:"transparent"}},r.a.createElement(y.a,{color:"secondary"}))))}))))))}(),r.a.createElement(D.a,{open:f,onClose:F},r.a.createElement(B.a,null,"Delete Confirmation"),r.a.createElement(P.a,null,r.a.createElement(x.a,null,"Are you sure you want to delete '",A.name,"'?")),r.a.createElement(z.a,null,r.a.createElement(v.a,{onClick:F,color:"primary"},"Cancel"),r.a.createElement(v.a,{onClick:function(){s.collection("packages").doc(A.id).delete().then((function(){F()})).catch((function(e){console.log("Error in deleting a package: ".concat(e))}))}},"Delete"))))},I=t(153),_=t(74),F=Object(_.a)({typography:{fontFamily:"'Gotu', sans-serif"},palette:{primary:{main:"#b3e5fc"},secondary:{main:"#ff8a65"}}});var U=function(){return r.a.createElement(I.a,{theme:F},r.a.createElement("div",{className:"centertitle"},"Package Tracker"),r.a.createElement(o.a,{container:!0,direction:"row",justify:"space-evenly",alignItems:"baseline"},r.a.createElement(b,null),r.a.createElement("div",{className:"packageList"},r.a.createElement(A,null))))};var L=function(){return r.a.createElement("div",null,r.a.createElement(U,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},64:function(e,a,t){},84:function(e,a,t){e.exports=t(108)},89:function(e,a,t){},90:function(e,a,t){}},[[84,1,2]]]);
//# sourceMappingURL=main.613fc0bc.chunk.js.map