(this["webpackJsonpbook-a-booth"]=this["webpackJsonpbook-a-booth"]||[]).push([[0],{229:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(62),o=n.n(c),i=n(83),s=n(35),u=n(321),l=n(322),d=n(195),b=n(279),j=n(88),f=n(90),h=n(89),x=Object(b.a)({palette:{primary:{main:j.a[800]},secondary:{main:f.a[800]},error:{main:h.a.A400},background:{default:"#FFF"}}}),p=n(303),m=n(37),O=n(25),v=n.n(O),g=n(38),k=n(118),y=n(119),w=n(197),C=n(196),T=function(e){Object(w.a)(n,e);var t=Object(C.a)(n);function n(e){var r;return Object(k.a)(this,n),(r=t.call(this)).history=e,r}return Object(y.a)(n,[{key:"navigateInternal",value:function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.replace(window.location.origin,""),n.noHistory?this.history.replace(r):this.history.push(r),e.abrupt("return",!1);case 3:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),n}(n(176).a),S=n(311),A=n(312),E=n(131),D=n(313),I=n(21),M=n(1),z=function(){var e=Object(m.d)().instance,t=Object(r.useState)(null),n=Object(I.a)(t,2),a=n[0],c=n[1],o=e.getActiveAccount();return Object(r.useEffect)((function(){c(o?o.name.split(" ")[0]:null)}),[o]),a?Object(M.jsxs)(E.a,{variant:"h6",children:["Welcome, ",a]}):null},B=n(304),R=n(300),Y=n(297),F=n(117),N=window.navigator.userAgent,L=N.indexOf("MSIE "),q=N.indexOf("Trident/"),H=N.indexOf("Edge/"),P=N.indexOf("Firefox"),Z={auth:{clientId:"36bc0775-9527-484c-9c48-2e846090732b",authority:"https://login.microsoftonline.com/9c85420c-07ed-40e7-9c4c-4207556dc906",redirectUri:"",postLogoutRedirectUri:""},cache:{cacheLocation:"localStorage",storeAuthStateInCookie:L>0||q>0||H>0||P>0},system:{loggerOptions:{loggerCallback:function(e,t,n){if(!n)switch(e){case F.a.Error:return void console.error(t);case F.a.Info:return void console.info(t);case F.a.Verbose:return void console.debug(t);case F.a.Warning:return void console.warn(t);default:return}}}}},U={scopes:["User.Read","Calendars.ReadWrite"]},V="https://graph.microsoft.com/v1.0",W=function(){var e=Object(m.d)().instance,t=Object(r.useState)(null),n=Object(I.a)(t,2),a=n[0],c=n[1],o=Boolean(a);return Object(M.jsxs)("div",{children:[Object(M.jsx)(B.a,{onClick:function(e){return c(e.currentTarget)},color:"inherit",children:"Login"}),Object(M.jsx)(Y.a,{id:"menu-appbar",anchorEl:a,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:o,onClose:function(){return c(null)},children:Object(M.jsx)(R.a,{onClick:function(){return t="redirect",c(null),void("popup"===t?e.loginPopup(U):"redirect"===t&&e.loginRedirect(U));var t},children:"Sign in"},"loginRedirect")})]})},_=n(310),G=n(180),J=n.n(G),K=n(30),$=n(302),Q=n(306),X=n(299),ee=n(309),te=n(287),ne=n(308),re=n(307),ae=n(178),ce=n.n(ae),oe=n(179),ie=n.n(oe),se=function(e){var t=Object(m.d)(),n=t.instance,r=t.accounts,a=e.onClose,c=e.open,o=function(e){n.setActiveAccount(e),e?window.location.reload():n.loginRedirect(Object(K.a)(Object(K.a)({},U),{},{prompt:"login"})),a(e)};return Object(M.jsxs)(re.a,{onClose:a,"aria-labelledby":"simple-dialog-title",open:c,children:[Object(M.jsx)(ne.a,{id:"simple-dialog-title",children:"Set active account"}),Object(M.jsxs)(Q.a,{children:[r.map((function(e){return Object(M.jsxs)(X.a,{button:!0,onClick:function(){return o(e)},children:[Object(M.jsx)(ee.a,{children:Object(M.jsx)($.a,{children:Object(M.jsx)(ce.a,{})})}),Object(M.jsx)(te.a,{primary:e.name,secondary:e.username})]},e.homeAccountId)})),Object(M.jsxs)(X.a,{autoFocus:!0,button:!0,onClick:function(){return o(null)},children:[Object(M.jsx)(ee.a,{children:Object(M.jsx)($.a,{children:Object(M.jsx)(ie.a,{})})}),Object(M.jsx)(te.a,{primary:"Add account"})]})]})]})},ue=function(){var e=Object(m.d)().instance,t=Object(r.useState)(!1),n=Object(I.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(null),i=Object(I.a)(o,2),s=i[0],u=i[1],l=Boolean(s);return Object(M.jsxs)("div",{children:[Object(M.jsx)(_.a,{onClick:function(e){return u(e.currentTarget)},color:"inherit",children:Object(M.jsx)(J.a,{})}),Object(M.jsxs)(Y.a,{id:"menu-appbar",anchorEl:s,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:l,onClose:function(){return u(null)},children:[Object(M.jsx)(R.a,{onClick:function(){return u(null),void c(!0)},children:"Switch Account"},"switchAccount"),Object(M.jsx)(R.a,{onClick:function(){return t="redirect",u(null),void("popup"===t?e.logoutPopup():"redirect"===t&&e.logoutRedirect());var t},children:"Logout"},"logoutRedirect")]}),Object(M.jsx)(se,{open:a,onClose:function(){c(!1)}})]})},le=n(5),de=function(){var e=Object(m.d)().inProgress;return Object(m.c)()?Object(M.jsx)(ue,{}):e!==le.g.Startup&&e!==le.g.HandleRedirect?Object(M.jsx)(W,{}):null},be=n(294),je=n(172),fe=Object(be.a)((function(e){return{root:{flexGrow:1},pageContainer:{marginBottom:e.spacing(2)},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,"& a":{textDecoration:"none"}},bookingCell:{backgroundColor:je.a.A400,"& div":{display:"flex",flexDirection:"column",width:"100%"}}}})),he=n(200),xe=function(e){var t=e.width,n=e.height,r=e.color,a=e.textColor,c=e.showText,o={width:"100px",height:"100px"};return t&&(o.width=t),n&&(o.height=n),r||(r="#000"),a||(a="#fff"),void 0===c&&(c=!0),Object(M.jsx)(he.a,{viewBox:"0 0 50 20",style:o,children:Object(M.jsxs)("g",{id:"logo-socialfinance",children:[Object(M.jsx)("circle",{id:"circle",cx:"10",cy:"10",r:"10",color:r}),Object(M.jsx)("rect",{x:"22",y:"1",width:"18",height:"18",color:r}),c&&Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("text",{x:"10",y:"18",style:{font:"heavy 20px Klavika Bold, sans-serif",color:a},children:"s"}),Object(M.jsx)("text",{x:"33",y:"21",style:{font:"heavy 20px Klavika Bold, sans-serif",color:a},children:"f"})]})]})})},pe=function(){var e=fe();return Object(M.jsx)("div",{className:e.root,children:Object(M.jsx)(S.a,{position:"static",children:Object(M.jsxs)(A.a,{children:[Object(M.jsx)(E.a,{className:e.title,children:Object(M.jsxs)(D.a,{component:i.b,to:"/",color:"inherit",variant:"h6",sx:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(xe,{width:75,showText:!1,color:"#FFF"})," Booth Booking"]})}),Object(M.jsx)(z,{}),Object(M.jsx)(de,{})]})})})},me=n(314),Oe=function(){return Object(M.jsxs)(E.a,{variant:"body2",color:"textSecondary",align:"center",children:["Made with \u2764\ufe0f by ",Object(M.jsx)(D.a,{color:"inherit",href:"https://github.com/kws",sx:{textDecoration:"none"},children:"Kaj"})]})},ve=n(15),ge=Object(be.a)((function(e){return{root:Object(ve.a)({position:"fixed",display:"flex",bottom:50,right:-130,width:"400px",padding:"2px 1px 1px 1px",background:"#FFF",overflow:"hidden",transform:"rotate(-45deg)","-webkit-transform":" rotate(-45deg)","-ms-transform":"rotate(-45deg)","-moz-transform":"rotate(-45deg)","-o-transform":"rotate(-45deg)",boxShadow:"4px 4px 10px rgba(0, 0, 0, 0.8)",zIndex:9999,"& a":{width:"100%",background:"#000",color:"#fff",textDecoration:"none",fontFamily:"arial, sans-serif",textAlign:"center",fontWeight:"bold",padding:"5px 40px",fontSize:"1rem",lineHeight:"2rem",position:"relative",transition:"0.5s","&:hover":{background:"cornflowerblue",color:"#fff"}},"& a::before, a::after":{content:"",width:"100%",display:"block",position:"absolute",top:"1px",left:0,height:"1px",background:"#fff"},"& a::after":{bottom:"1px",top:"auto"}},e.breakpoints.down("sm"),{"& a":{fontSize:"0.5rem",lineHeight:"1rem"},bottom:20,right:-170})}})),ke=function(e){var t=e.repoUrl,n=ge();return Object(M.jsx)("span",{className:n.root,children:Object(M.jsx)("a",{href:t,children:"Fork me on GitHub"})})},ye=function(e){return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(pe,{}),Object(M.jsx)("br",{}),Object(M.jsx)("br",{}),e.children,Object(M.jsx)(me.a,{pt:4,children:Object(M.jsx)(Oe,{})}),Object(M.jsx)(ke,{repoUrl:"https://github.com/SocialFinanceDigitalLabs/book-a-booth"})]})},we=n(27);function Ce(){var e=Object(m.d)().instance;return Object(r.useEffect)((function(){e.logoutRedirect({account:e.getActiveAccount(),onRedirectNavigate:function(){return!we.a.isInIframe()}})}),[e]),Object(M.jsx)("div",{children:"Logout"})}var Te=n(289),Se=n(305),Ae=n(316),Ee=n(317),De=n(318),Ie=n(320),Me=n(319),ze=n(315),Be=n(33),Re=n.n(Be),Ye=n(185),Fe=n.n(Ye),Ne=n(186),Le=n.n(Ne),qe=n(187),He=n.n(qe),Pe=n(183),Ze=n.n(Pe),Ue=n(184),Ve=n.n(Ue),We="YYYY-MM-DDTHH:mmZ",_e="YYYY-MM-DDTHH:mm",Ge="Europe/London",Je=[1,2,3,4,5,6].map((function(e){return"zoombooth".concat(e,"@socialfinance.org.uk")})),Ke=1800;Re.a.extend(Ze.a),Re.a.extend(Ve.a);var $e=function(e){var t=e.day();return 0===t?e.add(1,"day"):6===t?e.add(2,"day"):e},Qe=function(e){var t=Object(K.a)({},e),n=t.value[0].availabilityView.split("");return t.occupied=n.map((function(e,n){return t.value.reduce((function(e,t){return e+parseInt(t.availabilityView[n])}),0)})),t.available=n.map((function(e,n){return t.value.length-t.occupied[n]})),t},Xe=function(e){return e.map((function(e){return(e=Object(K.a)({},e)).booths=e.attendees.filter((function(e){return Je.indexOf(e.emailAddress.address.toLowerCase())>=0})),e.acceptedBooths=e.booths.filter((function(e){return e.status.response.toLowerCase().indexOf("accepted")>=0})),e}))},et=function(e,t){var n=e.map((function(e){return(e=Object(K.a)({},e)).startTime=Re.a.tz(e.start.dateTime,e.start.timeZone).unix(),e.endTime=Re.a.tz(e.end.dateTime,e.end.timeZone).unix(),e.startIndex=Math.floor((e.startTime-t.startTime)/t.interval),e.endIndex=Math.ceil((e.endTime-t.startTime)/t.interval)-1,e}));return n.intervals=n.reduce((function(e,t){for(var n=t.startIndex;n<=t.endIndex;n++)e[n]=t.id;return e}),[]),n},tt=function(e){var t,n=e.day,c=e.bookClick,o=e.sx,i=a.a.useState(null),s=Object(I.a)(i,2),u=s[0],l=s[1],d=Boolean(u),b=Object(r.useCallback)((function(e){l(null),c(n.start,e)}),[n,c]),j="rgba(76,175,80,".concat(n.available/Je.length,")");return t=0===n.available?Fe.a:n.available<=2?Le.a:He.a,Object(M.jsxs)(ze.a,{sx:Object(K.a)(Object(K.a)({},o),{},{backgroundColor:j}),align:"center",children:[Object(M.jsx)(_.a,{id:"menu-button-".concat(n.timeslot),"aria-controls":"menu-".concat(n.timeslot),"aria-haspopup":"true","aria-expanded":d?"true":void 0,onClick:function(e){l(e.currentTarget)},size:"small",children:Object(M.jsx)(t,{fontSize:"small"})}),Object(M.jsxs)(Y.a,{id:"menu-".concat(n.timeslot),anchorEl:u,open:d,onClose:function(){l(null)},MenuListProps:{"aria-labelledby":"menu-button-".concat(n.timeslot)},children:[Object(M.jsx)(R.a,{onClick:function(){return b(30)},children:"30 min"}),Object(M.jsx)(R.a,{onClick:function(){return b(60)},children:"60 min"}),Object(M.jsx)(R.a,{onClick:function(){return b(90)},children:"90 min"}),Object(M.jsx)(R.a,{onClick:function(){return b(120)},children:"120 min"})]})]})},nt=function(e){var t=e.day,n=e.deleteEventClick,r=e.sx,c=a.a.useState(null),o=Object(I.a)(c,2),i=o[0],s=o[1],u=Boolean(i);return Object(M.jsxs)(ze.a,{align:"center",sx:Object(K.a)(Object(K.a)({},r),{},{backgroundColor:j.a[100]}),children:[Object(M.jsx)(B.a,{id:"menu-button-".concat(t.timeslot),"aria-controls":"menu-".concat(t.timeslot),"aria-haspopup":"true","aria-expanded":u?"true":void 0,onClick:function(e){s(e.currentTarget)},size:"small",children:t.event[0].subject}),Object(M.jsx)(Y.a,{id:"menu-".concat(t.timeslot),anchorEl:i,open:u,onClose:function(){s(null)},MenuListProps:{"aria-labelledby":"menu-button-".concat(t.timeslot)},children:Object(M.jsx)(R.a,{onClick:function(){s(null),n(t.event[0].id)},children:"Cancel"})})]})},rt=n(288),at=function(e){var t=e.calendarService,n=e.bookClick,a=e.deleteEventClick,c=t.dates,o=t.boothData,i=t.calendarData,s=Object(r.useMemo)((function(){if(c&&c.datesIndexes){var e=c.dates.map((function(e){return Re.a.unix(e.noon).day()}));return c.datesIndexes[0].map((function(t){return{time:c.intervals[t],days:c.datesIndexes.map((function(n,r){var a=n[t];return{timeslot:a,start:c.intervals[a],end:c.intervals[a]+c.interval,available:o?o.available[a]:-1,event:i?i.filter((function(e){return e.id===i.intervals[a]})):[],weekSlot:r,dayOfWeek:e[r]}}))}}))}return[]}),[c,o,i]);return Object(M.jsx)(Ae.a,{component:Se.a,children:Object(M.jsxs)(Ee.a,{sx:{},size:"small",children:[Object(M.jsx)(De.a,{children:Object(M.jsxs)(Me.a,{sx:{backgroundColor:rt.a[300]},children:[Object(M.jsx)(ze.a,{children:"Time"}),c.dates.map((function(e){return Object(M.jsx)(ze.a,{align:"center",children:Re.a.unix(e.noon).format("ddd, D MMM")},e.noon)}))]})}),Object(M.jsx)(Ie.a,{children:s.map((function(e,t){var r=t%2===0?0:"1px solid #eee";return Object(M.jsxs)(Me.a,{sx:{"td,th":{borderBottom:r,borderRight:"1px solid #eee"},"&:last-child td, &:last-child th":{borderBottom:0}},children:[Object(M.jsx)(ze.a,{component:"th",scope:"row",sx:{backgroundColor:rt.a[300]},children:Re.a.unix(e.time).format("HH:mm")}),e.days.map((function(e){return Object(M.jsx)(ct,{day:e,bookClick:n,deleteEventClick:a},e.timeslot)}))]},e.time)}))})]})})},ct=function(e){var t=e.day,n=e.bookClick,r=e.deleteEventClick,a={};return 1===t.dayOfWeek&&t.weekSlot>0&&(a.borderLeft="6px solid #eee"),t.end<Date.now()/1e3?Object(M.jsx)(ze.a,{sx:Object(K.a)(Object(K.a)({},a),{},{backgroundColor:rt.a[100]})}):t.event&&t.event.length>0?Object(M.jsx)(nt,{sx:a,day:t,deleteEventClick:r}):Object(M.jsx)(tt,{sx:a,day:t,bookClick:n})},ot=function(){return Object(M.jsx)(E.a,{variant:"h6",children:"Authentication in progress..."})},it=function(e){var t=e.error;return Object(M.jsxs)(E.a,{variant:"h6",children:["An Error Occurred: ",t.errorCode]})},st=n(28),ut=n(293),lt=n(19),dt=function(){var e=new ut.a(Z);return!e.getActiveAccount()&&e.getAllAccounts().length>0&&e.setActiveAccount(e.getAllAccounts()[0]),e.enableAccountStorageEvents(),e.addEventCallback((function(t){if(t.eventType===lt.a.LOGIN_SUCCESS&&t.payload.account){var n=t.payload.account;e.setActiveAccount(n)}})),e}(),bt=n(72),jt=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ft(t,n);case 2:return r=e.sent,e.next=5,r.json();case 5:r=e.sent,a=r.value;case 7:if(!r["@odata.nextLink"]){e.next=17;break}return e.next=10,ft(r["@odata.nextLink"]);case 10:return r=e.sent,e.next=13,r.json();case 13:r=e.sent,a.push.apply(a,Object(st.a)(r.value)),e.next=7;break;case 17:return e.abrupt("return",a);case 18:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ft=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a,c,o,i,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=dt.getActiveAccount()){e.next=3;break}throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");case 3:return e.next=5,dt.acquireTokenSilent(Object(K.a)(Object(K.a)({},U),{},{account:r}));case 5:return a=e.sent,c=new Headers(null===n||void 0===n?void 0:n.headers),o="Bearer ".concat(a.accessToken),c.append("Authorization",o),i=Object(K.a)(Object(K.a)({method:"GET"},n),{},{headers:c}),s=t.startsWith("http")?t:"".concat(V).concat(t),e.abrupt("return",fetch(s,i).catch(ht(dt)));case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ht=function(e){return function(t){if(!(t instanceof bt.a))throw t;e.acquireTokenRedirect(Object(K.a)(Object(K.a)({},U),{},{account:e.getActiveAccount()}))}},xt=n(188),pt="GSN-408013-S",mt=function(){var e;window._gs&&(e=window)._gs.apply(e,arguments)},Ot=function(){var e=Object(s.g)(),t=Object(m.d)().instance;Object(r.useEffect)((function(){return mt("track")}),[e]);var n=t.getActiveAccount();return Object(r.useEffect)((function(){n?mt("identify",{email:n.username,name:n.name}):mt("unidentify")}),[n]),Object(M.jsx)(xt.a,{children:Object(M.jsx)("script",{children:"\n!function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};\nd=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=\ns.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document\n,'script','_gs');\n\n_gs('".concat(pt,"');\n_gs('set', 'anonymizeIP', true);\n_gs('track');\n")})})},vt=function(e){var t=e.startDate,n=e.days,a=Object(r.useState)({dates:[]}),c=Object(I.a)(a,2),o=c[0],i=c[1],s=gt(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",o.dates.length>0&&kt(o));case 1:case"end":return e.stop()}}),e)}))),[o]),u=Object(I.a)(s,2),l=u[0],d=u[1],b=gt(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",o.dates.length>0&&yt(o));case 1:case"end":return e.stop()}}),e)}))),[o]),j=Object(I.a)(b,2),f=j[0],h=j[1];return Object(r.useEffect)((function(){i(function(e,t){for(var n=[],r=Re()(e).tz(Ge).hour(12).minute(0).second(0),a=t>0?t:1,c=0;c<a;c++){var o=(r=$e(r)).format("YYYY-MM-DD");n.push({date:o,noon:Re.a.tz("".concat(o,"T12:00:00"),Ge).unix(),startTime:Re.a.tz("".concat(o,"T").concat(8,":00:00"),Ge).unix(),endTime:Re.a.tz("".concat(o,"T").concat(19,":00:00"),Ge).unix()}),r=r.add(1,"days")}var i={dates:n,startTime:n[0].startTime,endTime:n[n.length-1].endTime,interval:Ke};return i.intervalCount=(i.endTime-i.startTime)/Ke,i.intervals=Array(Math.ceil(i.intervalCount)).fill(0).map((function(e,t){return i.startTime+t*Ke})),i.datesIndexes=n.map((function(e){return i.intervals.map((function(t,n){return t>=e.startTime&&t<e.endTime?n:-1})).filter((function(e){return e>=0}))})),i}(t,n))}),[t,n]),Object(r.useEffect)((function(){d()}),[d]),Object(r.useEffect)((function(){h()}),[h]),Object(r.useMemo)((function(){return{dates:o,boothData:l,calendarData:f,refresh:function(){d(),h()}}}),[o,l,f,d,h])},gt=function(e,t){var n=Object(r.useState)(null),a=Object(I.a)(n,2),c=a[0],o=a[1];return[c,Object(r.useCallback)((function(){e&&e().then((function(e){return o(e)}))}),Object(st.a)(t))]},kt=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/me/calendar/getSchedule",n={"Content-Type":"application/json"},r={schedules:Je,startTime:{dateTime:Re.a.unix(t.startTime).tz(Ge).format(_e),timeZone:Ge},endTime:{dateTime:Re.a.unix(t.endTime).tz(Ge).format(_e),timeZone:Ge},availabilityViewInterval:Math.round(30)},e.next=5,ft("/me/calendar/getSchedule",{method:"POST",headers:n,body:JSON.stringify(r)});case 5:return a=e.sent,e.t0=Qe,e.next=9,a.json();case 9:return e.t1=e.sent,e.t2=t,e.abrupt("return",(0,e.t0)(e.t1,e.t2));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),yt=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/me/calendar/calendarView?"+"startDateTime=".concat(encodeURIComponent(Re.a.unix(t.startTime).format(We)),"&")+"endDateTime=".concat(encodeURIComponent(Re.a.unix(t.endTime).format(We)),"&")+"$select=start,end,subject,attendees&$top=50",e.t0=Xe,e.next=4,jt(n);case 4:return e.t1=e.sent,r=(0,e.t0)(e.t1).filter((function(e){return e.acceptedBooths.length>0})),e.abrupt("return",et(r,t));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),wt=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a,c,o,i,s,u,l,d,b,j,f,h,x;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return mt("event","Book",{duration:n}),r=Re.a.unix(t).tz(Ge),a=r.add(n,"minutes"),c={"Content-Type":"application/json"},o={schedules:Je,startTime:{dateTime:r.format(_e),timeZone:Ge},endTime:{dateTime:a.format(_e),timeZone:Ge},availabilityViewInterval:n},e.next=7,ft("/me/calendar/getSchedule",{method:"POST",headers:c,body:JSON.stringify(o)});case 7:return i=e.sent,e.next=10,i.json();case 10:if(s=e.sent,0!==(u=s.value.filter((function(e){return"0"===e.availabilityView}))).length){e.next=14;break}return e.abrupt("return",{error:"nobooth"});case 14:return l=u[Math.floor(Math.random()*u.length)],d=l.scheduleId,b=d.split("@")[0],j=b.replace("zoombooth",""),f={subject:"Booth ".concat(j),start:{dateTime:r.format(We),timeZone:Ge},end:{dateTime:r.add(n,"minutes").format(We),timeZone:Ge},attendees:[{emailAddress:{address:l.scheduleId}}]},e.next=21,ft("/me/calendar/events",{method:"POST",headers:c,body:JSON.stringify(f)});case 21:return h=e.sent,e.next=24,h.json();case 24:return x=e.sent,e.abrupt("return",{boothId:d,boothName:b,boothNumber:j,bookingData:x});case 26:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ct=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return mt("event","Cancel",{}),n="/me/calendar/events/".concat(t),e.next=4,ft(n,{method:"DELETE"});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Tt=function(e){var t,n=e.bookClick,c=e.calendarService,o=a.a.useState(null),i=Object(I.a)(o,2),s=i[0],u=i[1],l=Boolean(s),d=Math.floor((Date.now()/1e3-c.dates.startTime)/c.dates.interval),b=(null===(t=c.boothData)||void 0===t?void 0:t.available)?c.boothData.available[d]:-1,j=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(null),e.next=3,n(Math.floor(Date.now()/1e3),t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[n]);return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(B.a,{variant:"contained",color:"secondary",disabled:void 0===b||b<1,id:"menu-button-instant","aria-controls":"menu-instant","aria-haspopup":"true","aria-expanded":l?"true":void 0,onClick:function(e){u(e.currentTarget)},children:"Instant Book"}),Object(M.jsxs)(Y.a,{id:"menu-instant",anchorEl:s,open:l,onClose:function(){u(null)},MenuListProps:{"aria-labelledby":"menu-button-instant"},children:[Object(M.jsx)(R.a,{onClick:function(){return j(30)},children:"30 min"}),Object(M.jsx)(R.a,{onClick:function(){return j(60)},children:"60 min"}),Object(M.jsx)(R.a,{onClick:function(){return j(90)},children:"90 min"}),Object(M.jsx)(R.a,{onClick:function(){return j(120)},children:"120 min"})]})]})},St=n(127),At=n(191),Et=n.n(At),Dt=n(193),It=n.n(Dt),Mt=n(192),zt=n.n(Mt),Bt=function(){var e=fe(),t=Object(s.f)(),n=Object(s.h)().date,a=Object(Te.a)("(max-width:750px)"),c=vt({startDate:n,days:a?2:5}),o=Object(St.b)().enqueueSnackbar;Object(r.useEffect)((function(){var e=setTimeout((function(){return c.refresh()}),15e3);return function(){clearTimeout(e)}}),[c]);var i=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o("Sending booking"),e.next=3,wt(t,n);case 3:return r=e.sent,o("Booking sent. It can take a minute or so before appearing in calendar",{variant:"success"}),setTimeout((function(){return c.refresh()}),3e3),setTimeout((function(){return c.refresh()}),6e3),setTimeout((function(){return c.refresh()}),9e3),e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[c,o]),u=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o("Sending deletion request"),e.next=3,Ct(t);case 3:o("Deletion sent. It can take a minute or so before appearing in calendar.",{variant:"success"}),setTimeout((function(){return c.refresh()}),2e3),setTimeout((function(){return c.refresh()}),4e3),setTimeout((function(){return c.refresh()}),6e3);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[c,o]),l=Object(r.useCallback)((function(e){var n=e.currentTarget.id;if("btn-next"===n){var r=Re.a.unix(c.dates.endTime).add(1,"days").format("YYYY-MM-DD");t.push("/date/".concat(r))}else if("btn-prev"===n){var a=Re.a.unix(c.dates.startTime).subtract(c.dates.dates.length+2,"days").format("YYYY-MM-DD");t.push("/date/".concat(a))}else t.push("/")}),[c,t]);return Object(M.jsxs)(p.a,{item:!0,xs:12,md:10,lg:8,children:[Object(M.jsxs)(p.a,{container:!0,className:e.pageContainer,children:[Object(M.jsx)(p.a,{item:!0,xs:6,children:Object(M.jsx)(Tt,{calendarService:c,bookClick:i})}),Object(M.jsxs)(p.a,{item:!0,xs:6,sx:{display:"flex",justifyContent:"flex-end"},children:[Object(M.jsx)(_.a,{id:"btn-prev",onClick:l,children:Object(M.jsx)(Et.a,{})}),Object(M.jsx)(_.a,{id:"btn-tday",onClick:l,children:Object(M.jsx)(zt.a,{})}),Object(M.jsx)(_.a,{id:"btn-next",onClick:l,children:Object(M.jsx)(It.a,{})})]})]}),Object(M.jsx)(p.a,{container:!0,className:e.pageContainer,children:Object(M.jsx)(p.a,{item:!0,xs:12,children:Object(M.jsx)(Se.a,{children:c&&Object(M.jsx)(M.Fragment,{children:Object(M.jsx)(at,{calendarService:c,bookClick:i,deleteEventClick:u})})})})}),Object(M.jsx)(p.a,{container:!0,className:e.pageContainer,children:Object(M.jsx)(p.a,{item:!0,xs:12,md:3,children:Object(M.jsx)(B.a,{variant:"outlined",color:"secondary",onClick:function(){return c.refresh()},children:"Refresh"})})})]})};function Rt(){var e=Object(K.a)({},U);return Object(M.jsx)(m.a,{interactionType:le.h.Redirect,authenticationRequest:e,errorComponent:it,loadingComponent:ot,children:Object(M.jsx)(Bt,{})})}var Yt=function(e){var t=e.pca,n=Object(s.f)(),r=new T(n);return t.setNavigationClient(r),Object(M.jsxs)(m.b,{instance:t,children:[Object(M.jsx)(Ot,{}),Object(M.jsx)(ye,{children:Object(M.jsx)(p.a,{container:!0,justifyContent:"center",children:Object(M.jsxs)(s.c,{children:[Object(M.jsx)(s.a,{path:"/logout",children:Object(M.jsx)(Ce,{})}),Object(M.jsx)(s.a,{path:"/date/:date",children:Object(M.jsx)(Rt,{})}),Object(M.jsx)(s.a,{path:"/",children:Object(M.jsx)(Rt,{})})]})})})]})},Ft=n(296),Nt=n(228),Lt="https://87354d732e2a4488addf620b1abce675@o108858.ingest.sentry.io/6048038";Ft.a({dsn:Lt,integrations:[new Nt.a.BrowserTracing],tracesSampleRate:.1}),o.a.render(Object(M.jsxs)(a.a.StrictMode,{children:[Object(M.jsx)(u.a,{}),Object(M.jsx)(i.a,{children:Object(M.jsx)(l.a,{theme:x,children:Object(M.jsx)(d.a,{ReactRouterRoute:s.a,children:Object(M.jsx)(St.a,{maxSnack:3,children:Object(M.jsx)(Yt,{pca:dt})})})})})]}),document.getElementById("root"))}},[[229,1,2]]]);
//# sourceMappingURL=main.0a24fb24.chunk.js.map