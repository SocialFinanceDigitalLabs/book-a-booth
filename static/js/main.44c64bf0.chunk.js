(this["webpackJsonpbook-a-booth"]=this["webpackJsonpbook-a-booth"]||[]).push([[0],{173:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(57),o=n.n(c),i=n(79),s=n(28),u=n(258),l=n(259),d=n(82),b=n(219),j=n(66),f=n(68),h=n(67),x=Object(b.a)({palette:{primary:{main:j.a[800]},secondary:{main:f.a[800]},error:{main:h.a.A400},background:{default:"#FFF"}}}),m=n(240),p=n(34),O=n(23),v=n.n(O),g=n(30),k=n(89),y=n(90),w=n(143),C=n(142),T=function(e){Object(w.a)(n,e);var t=Object(C.a)(n);function n(e){var r;return Object(k.a)(this,n),(r=t.call(this)).history=e,r}return Object(y.a)(n,[{key:"navigateInternal",value:function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.replace(window.location.origin,""),n.noHistory?this.history.replace(r):this.history.push(r),e.abrupt("return",!1);case 3:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),n}(n(130).a),S=n(248),A=n(249),E=n(101),I=n(250),D=n(18),M=n(1),z=function(){var e=Object(p.d)().instance,t=Object(r.useState)(null),n=Object(D.a)(t,2),a=n[0],c=n[1],o=e.getActiveAccount();return Object(r.useEffect)((function(){c(o?o.name.split(" ")[0]:null)}),[o]),a?Object(M.jsxs)(E.a,{variant:"h6",children:["Welcome, ",a]}):null},R=n(241),B=n(237),F=n(234),L=n(88),H=window.navigator.userAgent,N=H.indexOf("MSIE "),Y=H.indexOf("Trident/"),Z=H.indexOf("Edge/"),P=H.indexOf("Firefox"),U={auth:{clientId:"36bc0775-9527-484c-9c48-2e846090732b",authority:"https://login.microsoftonline.com/9c85420c-07ed-40e7-9c4c-4207556dc906",redirectUri:"",postLogoutRedirectUri:""},cache:{cacheLocation:"localStorage",storeAuthStateInCookie:N>0||Y>0||Z>0||P>0},system:{loggerOptions:{loggerCallback:function(e,t,n){if(!n)switch(e){case L.a.Error:return void console.error(t);case L.a.Info:return void console.info(t);case L.a.Verbose:return void console.debug(t);case L.a.Warning:return void console.warn(t);default:return}}}}},V={scopes:["User.Read","Calendars.ReadWrite"]},G="https://graph.microsoft.com/v1.0",J=function(){var e=Object(p.d)().instance,t=Object(r.useState)(null),n=Object(D.a)(t,2),a=n[0],c=n[1],o=Boolean(a);return Object(M.jsxs)("div",{children:[Object(M.jsx)(R.a,{onClick:function(e){return c(e.currentTarget)},color:"inherit",children:"Login"}),Object(M.jsx)(F.a,{id:"menu-appbar",anchorEl:a,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:o,onClose:function(){return c(null)},children:Object(M.jsx)(B.a,{onClick:function(){return t="redirect",c(null),void("popup"===t?e.loginPopup(V):"redirect"===t&&e.loginRedirect(V));var t},children:"Sign in"},"loginRedirect")})]})},W=n(247),q=n(134),K=n.n(q),$=n(37),_=n(239),Q=n(243),X=n(236),ee=n(246),te=n(227),ne=n(245),re=n(244),ae=n(132),ce=n.n(ae),oe=n(133),ie=n.n(oe),se=function(e){var t=Object(p.d)(),n=t.instance,r=t.accounts,a=e.onClose,c=e.open,o=function(e){n.setActiveAccount(e),e?window.location.reload():n.loginRedirect(Object($.a)(Object($.a)({},V),{},{prompt:"login"})),a(e)};return Object(M.jsxs)(re.a,{onClose:a,"aria-labelledby":"simple-dialog-title",open:c,children:[Object(M.jsx)(ne.a,{id:"simple-dialog-title",children:"Set active account"}),Object(M.jsxs)(Q.a,{children:[r.map((function(e){return Object(M.jsxs)(X.a,{button:!0,onClick:function(){return o(e)},children:[Object(M.jsx)(ee.a,{children:Object(M.jsx)(_.a,{children:Object(M.jsx)(ce.a,{})})}),Object(M.jsx)(te.a,{primary:e.name,secondary:e.username})]},e.homeAccountId)})),Object(M.jsxs)(X.a,{autoFocus:!0,button:!0,onClick:function(){return o(null)},children:[Object(M.jsx)(ee.a,{children:Object(M.jsx)(_.a,{children:Object(M.jsx)(ie.a,{})})}),Object(M.jsx)(te.a,{primary:"Add account"})]})]})]})},ue=function(){var e=Object(p.d)().instance,t=Object(r.useState)(!1),n=Object(D.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(null),i=Object(D.a)(o,2),s=i[0],u=i[1],l=Boolean(s);return Object(M.jsxs)("div",{children:[Object(M.jsx)(W.a,{onClick:function(e){return u(e.currentTarget)},color:"inherit",children:Object(M.jsx)(K.a,{})}),Object(M.jsxs)(F.a,{id:"menu-appbar",anchorEl:s,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:l,onClose:function(){return u(null)},children:[Object(M.jsx)(B.a,{onClick:function(){return u(null),void c(!0)},children:"Switch Account"},"switchAccount"),Object(M.jsx)(B.a,{onClick:function(){return t="redirect",u(null),void("popup"===t?e.logoutPopup():"redirect"===t&&e.logoutRedirect());var t},children:"Logout"},"logoutRedirect")]}),Object(M.jsx)(se,{open:a,onClose:function(){c(!1)}})]})},le=n(5),de=function(){var e=Object(p.d)().inProgress;return Object(p.c)()?Object(M.jsx)(ue,{}):e!==le.g.Startup&&e!==le.g.HandleRedirect?Object(M.jsx)(J,{}):null},be=n(232),je=n(126),fe=Object(be.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,"& a":{textDecoration:"none"}},bookingCell:{backgroundColor:je.a.A400,"& div":{display:"flex",flexDirection:"column",width:"100%"}}}})),he=n(146),xe=function(e){var t=e.width,n=e.height,r=e.color,a=e.textColor,c=e.showText,o={width:"100px",height:"100px"};return t&&(o.width=t),n&&(o.height=n),r||(r="#000"),a||(a="#fff"),void 0===c&&(c=!0),Object(M.jsx)(he.a,{viewBox:"0 0 50 20",style:o,children:Object(M.jsxs)("g",{id:"logo-socialfinance",children:[Object(M.jsx)("circle",{id:"circle",cx:"10",cy:"10",r:"10",color:r}),Object(M.jsx)("rect",{x:"22",y:"1",width:"18",height:"18",color:r}),c&&Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("text",{x:"10",y:"18",style:{font:"heavy 20px Klavika Bold, sans-serif",color:a},children:"s"}),Object(M.jsx)("text",{x:"33",y:"21",style:{font:"heavy 20px Klavika Bold, sans-serif",color:a},children:"f"})]})]})})},me=function(){var e=fe();return Object(M.jsx)("div",{className:e.root,children:Object(M.jsx)(S.a,{position:"static",children:Object(M.jsxs)(A.a,{children:[Object(M.jsx)(E.a,{className:e.title,children:Object(M.jsxs)(I.a,{component:i.b,to:"/",color:"inherit",variant:"h6",sx:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(xe,{width:75,showText:!1,color:"#FFF"})," Booth Booking"]})}),Object(M.jsx)(z,{}),Object(M.jsx)(de,{})]})})})},pe=n(251),Oe=function(){return Object(M.jsxs)(E.a,{variant:"body2",color:"textSecondary",align:"center",children:["Made with \u2764\ufe0f by ",Object(M.jsx)(I.a,{color:"inherit",href:"https://github.com/kws",sx:{textDecoration:"none"},children:"Kaj"})]})},ve=n(13),ge=Object(be.a)((function(e){return{root:Object(ve.a)({position:"fixed",display:"flex",bottom:50,right:-130,width:"400px",padding:"2px 1px 1px 1px",background:"#FFF",overflow:"hidden",transform:"rotate(-45deg)","-webkit-transform":" rotate(-45deg)","-ms-transform":"rotate(-45deg)","-moz-transform":"rotate(-45deg)","-o-transform":"rotate(-45deg)",boxShadow:"4px 4px 10px rgba(0, 0, 0, 0.8)",zIndex:9999,"& a":{width:"100%",background:"#000",color:"#fff",textDecoration:"none",fontFamily:"arial, sans-serif",textAlign:"center",fontWeight:"bold",padding:"5px 40px",fontSize:"1rem",lineHeight:"2rem",position:"relative",transition:"0.5s","&:hover":{background:"cornflowerblue",color:"#fff"}},"& a::before, a::after":{content:"",width:"100%",display:"block",position:"absolute",top:"1px",left:0,height:"1px",background:"#fff"},"& a::after":{bottom:"1px",top:"auto"}},e.breakpoints.down("sm"),{"& a":{fontSize:"0.5rem",lineHeight:"1rem"},bottom:20,right:-170})}})),ke=function(e){var t=e.repoUrl,n=ge();return Object(M.jsx)("span",{className:n.root,children:Object(M.jsx)("a",{href:t,children:"Fork me on GitHub"})})},ye=function(e){return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(me,{}),Object(M.jsx)("br",{}),Object(M.jsx)("br",{}),e.children,Object(M.jsx)(pe.a,{pt:4,children:Object(M.jsx)(Oe,{})}),Object(M.jsx)(ke,{repoUrl:"https://github.com/SocialFinanceDigitalLabs/book-a-booth"})]})},we=n(25);function Ce(){var e=Object(p.d)().instance;return Object(r.useEffect)((function(){e.logoutRedirect({account:e.getActiveAccount(),onRedirectNavigate:function(){return!we.a.isInIframe()}})}),[e]),Object(M.jsx)("div",{children:"Logout"})}var Te=n(229),Se=n(242),Ae=n(253),Ee=n(254),Ie=n(255),De=n(257),Me=n(256),ze=n(252),Re=n(33),Be=n.n(Re),Fe=n(139),Le=n.n(Fe),He=n(140),Ne=n.n(He),Ye=n(141),Ze=n.n(Ye),Pe=n(137),Ue=n.n(Pe),Ve=n(138),Ge=n.n(Ve),Je="YYYY-MM-DDTHH:mmZ",We="YYYY-MM-DDTHH:mm",qe="Europe/London",Ke=[1,2,3,4,5,6].map((function(e){return"zoombooth".concat(e,"@socialfinance.org.uk")})),$e=1800;Be.a.extend(Ue.a),Be.a.extend(Ge.a);var _e=function(e){var t=e.day();return 0===t?e.add(1,"day"):6===t?e.add(2,"day"):e},Qe=function(e){var t=Object($.a)({},e),n=t.value[0].availabilityView.split("");return t.occupied=n.map((function(e,n){return t.value.reduce((function(e,t){return e+parseInt(t.availabilityView[n])}),0)})),t.available=n.map((function(e,n){return t.value.length-t.occupied[n]})),t},Xe=function(e){return e.map((function(e){return(e=Object($.a)({},e)).booths=e.attendees.filter((function(e){return Ke.indexOf(e.emailAddress.address.toLowerCase())>=0})),e.acceptedBooths=e.booths.filter((function(e){return e.status.response.toLowerCase().indexOf("accepted")>=0})),e}))},et=function(e,t){var n=e.map((function(e){return(e=Object($.a)({},e)).startTime=Be.a.tz(e.start.dateTime,e.start.timeZone).unix(),e.endTime=Be.a.tz(e.end.dateTime,e.end.timeZone).unix(),e.startIndex=Math.floor((e.startTime-t.startTime)/t.interval),e.endIndex=Math.ceil((e.endTime-t.startTime)/t.interval)-1,e}));return n.intervals=n.reduce((function(e,t){for(var n=t.startIndex;n<=t.endIndex;n++)e[n]=t.id;return e}),[]),n},tt=function(e){var t,n=e.day,c=e.bookClick,o=a.a.useState(null),i=Object(D.a)(o,2),s=i[0],u=i[1],l=Boolean(s),d=Object(r.useCallback)((function(e){c(n.start,e).then((function(e){return u(null)}))}),[n,c]),b="rgba(76,175,80,".concat(n.available/Ke.length,")");return t=0===n.available?Le.a:n.available<=2?Ne.a:Ze.a,Object(M.jsxs)(ze.a,{sx:{backgroundColor:b},align:"center",children:[Object(M.jsx)(W.a,{id:"menu-button-".concat(n.timeslot),"aria-controls":"menu-".concat(n.timeslot),"aria-haspopup":"true","aria-expanded":l?"true":void 0,onClick:function(e){u(e.currentTarget)},size:"small",children:Object(M.jsx)(t,{fontSize:"small"})}),Object(M.jsxs)(F.a,{id:"menu-".concat(n.timeslot),anchorEl:s,open:l,onClose:function(){u(null)},MenuListProps:{"aria-labelledby":"menu-button-".concat(n.timeslot)},children:[Object(M.jsx)(B.a,{onClick:function(){return d(30)},children:"30 min"}),Object(M.jsx)(B.a,{onClick:function(){return d(60)},children:"60 min"}),Object(M.jsx)(B.a,{onClick:function(){return d(90)},children:"90 min"}),Object(M.jsx)(B.a,{onClick:function(){return d(120)},children:"120 min"})]})]})},nt=function(e){var t=e.day,n=e.deleteEventClick,r=a.a.useState(null),c=Object(D.a)(r,2),o=c[0],i=c[1],s=Boolean(o);return Object(M.jsxs)(ze.a,{align:"center",sx:{backgroundColor:j.a[100]},children:[Object(M.jsx)(R.a,{id:"menu-button-".concat(t.timeslot),"aria-controls":"menu-".concat(t.timeslot),"aria-haspopup":"true","aria-expanded":s?"true":void 0,onClick:function(e){i(e.currentTarget)},size:"small",children:t.event[0].subject}),Object(M.jsx)(F.a,{id:"menu-".concat(t.timeslot),anchorEl:o,open:s,onClose:function(){i(null)},MenuListProps:{"aria-labelledby":"menu-button-".concat(t.timeslot)},children:Object(M.jsx)(B.a,{onClick:function(){i(null),n(t.event[0].id)},children:"Cancel"})})]})},rt=n(228),at=function(e){var t=e.calendarService,n=e.bookClick,a=e.deleteEventClick,c=t.dates,o=t.boothData,i=t.calendarData,s=Object(r.useMemo)((function(){return c&&c.datesIndexes?c.datesIndexes[0].map((function(e){return{time:c.intervals[e],days:c.datesIndexes.map((function(t){var n=t[e];return{timeslot:n,start:c.intervals[n],end:c.intervals[n]+c.interval,available:o?o.available[n]:-1,event:i?i.filter((function(e){return e.id===i.intervals[n]})):[]}}))}})):[]}),[c,o,i]);return Object(M.jsx)(Ae.a,{component:Se.a,children:Object(M.jsxs)(Ee.a,{sx:{},size:"small",children:[Object(M.jsx)(Ie.a,{children:Object(M.jsxs)(Me.a,{sx:{backgroundColor:rt.a[300]},children:[Object(M.jsx)(ze.a,{children:"Time"}),c.dates.map((function(e){return Object(M.jsx)(ze.a,{align:"center",children:Be.a.unix(e.noon).format("ddd, D MMM")},e.noon)}))]})}),Object(M.jsx)(De.a,{children:s.map((function(e,t){var r=t%2===0?0:"1px solid #eee";return Object(M.jsxs)(Me.a,{sx:{"td,th":{borderBottom:r,borderRight:"1px solid #eee"},"&:last-child td, &:last-child th":{borderBottom:0}},children:[Object(M.jsx)(ze.a,{component:"th",scope:"row",sx:{backgroundColor:rt.a[300]},children:Be.a.unix(e.time).format("HH:mm")}),e.days.map((function(e){return Object(M.jsx)(ct,{day:e,bookClick:n,deleteEventClick:a},e.timeslot)}))]},e.time)}))})]})})},ct=function(e){var t=e.day,n=e.bookClick,r=e.deleteEventClick;return t.end<Date.now()/1e3?Object(M.jsx)(ze.a,{sx:{backgroundColor:rt.a[100]}}):t.event&&t.event.length>0?Object(M.jsx)(nt,{day:t,deleteEventClick:r}):Object(M.jsx)(tt,{day:t,bookClick:n})},ot=function(){return Object(M.jsx)(E.a,{variant:"h6",children:"Authentication in progress..."})},it=function(e){var t=e.error;return Object(M.jsxs)(E.a,{variant:"h6",children:["An Error Occurred: ",t.errorCode]})},st=n(26),ut=n(231),lt=n(17),dt=function(){var e=new ut.a(U);return!e.getActiveAccount()&&e.getAllAccounts().length>0&&e.setActiveAccount(e.getAllAccounts()[0]),e.enableAccountStorageEvents(),e.addEventCallback((function(t){if(t.eventType===lt.a.LOGIN_SUCCESS&&t.payload.account){var n=t.payload.account;e.setActiveAccount(n)}})),e}(),bt=n(52),jt=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ft(t,n);case 2:return r=e.sent,e.next=5,r.json();case 5:r=e.sent,a=r.value;case 7:if(!r["@odata.nextLink"]){e.next=17;break}return e.next=10,ft(r["@odata.nextLink"]);case 10:return r=e.sent,e.next=13,r.json();case 13:r=e.sent,a.push.apply(a,Object(st.a)(r.value)),e.next=7;break;case 17:return e.abrupt("return",a);case 18:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ft=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a,c,o,i,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=dt.getActiveAccount()){e.next=3;break}throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");case 3:return e.next=5,dt.acquireTokenSilent(Object($.a)(Object($.a)({},V),{},{account:r}));case 5:return a=e.sent,c=new Headers(null===n||void 0===n?void 0:n.headers),o="Bearer ".concat(a.accessToken),c.append("Authorization",o),i=Object($.a)(Object($.a)({method:"GET"},n),{},{headers:c}),s=t.startsWith("http")?t:"".concat(G).concat(t),e.abrupt("return",fetch(s,i).catch(ht(dt)));case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ht=function(e){return function(t){if(!(t instanceof bt.a))throw t;e.acquireTokenRedirect(Object($.a)(Object($.a)({},V),{},{account:e.getActiveAccount()}))}},xt=function(e){var t=e.startDate,n=e.days,a=Object(r.useState)({dates:[]}),c=Object(D.a)(a,2),o=c[0],i=c[1],s=mt(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",o.dates.length>0&&pt(o));case 1:case"end":return e.stop()}}),e)}))),[o]),u=Object(D.a)(s,2),l=u[0],d=u[1],b=mt(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",o.dates.length>0&&Ot(o));case 1:case"end":return e.stop()}}),e)}))),[o]),j=Object(D.a)(b,2),f=j[0],h=j[1];return Object(r.useEffect)((function(){i(function(e,t){for(var n=[],r=Be()(e).tz(qe).hour(12).minute(0).second(0),a=t>0?t:1,c=0;c<a;c++){var o=(r=_e(r)).format("YYYY-MM-DD");n.push({date:o,noon:Be.a.tz("".concat(o,"T12:00:00"),qe).unix(),startTime:Be.a.tz("".concat(o,"T").concat(8,":00:00"),qe).unix(),endTime:Be.a.tz("".concat(o,"T").concat(19,":00:00"),qe).unix()}),r=r.add(1,"days")}var i={dates:n,startTime:n[0].startTime,endTime:n[n.length-1].endTime,interval:$e};return i.intervalCount=(i.endTime-i.startTime)/$e,i.intervals=Array(Math.ceil(i.intervalCount)).fill(0).map((function(e,t){return i.startTime+t*$e})),i.datesIndexes=n.map((function(e){return i.intervals.map((function(t,n){return t>=e.startTime&&t<e.endTime?n:-1})).filter((function(e){return e>=0}))})),i}(t,n))}),[t,n]),Object(r.useEffect)((function(){d()}),[d]),Object(r.useEffect)((function(){h()}),[h]),Object(r.useMemo)((function(){return{dates:o,boothData:l,calendarData:f,refresh:function(){d(),h()}}}),[o,l,f,d,h])},mt=function(e,t){var n=Object(r.useState)(null),a=Object(D.a)(n,2),c=a[0],o=a[1];return[c,Object(r.useCallback)((function(){e&&e().then((function(e){return o(e)}))}),Object(st.a)(t))]},pt=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/me/calendar/getSchedule",n={"Content-Type":"application/json"},r={schedules:Ke,startTime:{dateTime:Be.a.unix(t.startTime).tz(qe).format(We),timeZone:qe},endTime:{dateTime:Be.a.unix(t.endTime).tz(qe).format(We),timeZone:qe},availabilityViewInterval:Math.round(30)},e.next=5,ft("/me/calendar/getSchedule",{method:"POST",headers:n,body:JSON.stringify(r)});case 5:return a=e.sent,e.t0=Qe,e.next=9,a.json();case 9:return e.t1=e.sent,e.t2=t,e.abrupt("return",(0,e.t0)(e.t1,e.t2));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ot=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/me/calendar/calendarView?"+"startDateTime=".concat(encodeURIComponent(Be.a.unix(t.startTime).format(Je)),"&")+"endDateTime=".concat(encodeURIComponent(Be.a.unix(t.endTime).format(Je)),"&")+"$select=start,end,subject,attendees&$top=50",e.t0=Xe,e.next=4,jt(n);case 4:return e.t1=e.sent,r=(0,e.t0)(e.t1).filter((function(e){return e.acceptedBooths.length>0})),e.abrupt("return",et(r,t));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),vt=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r,a,c,o,i,s,u,l,d,b,j,f,h,x;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Be.a.unix(t).tz(qe),a=r.add(n,"minutes"),c={"Content-Type":"application/json"},o={schedules:Ke,startTime:{dateTime:r.format(We),timeZone:qe},endTime:{dateTime:a.format(We),timeZone:qe},availabilityViewInterval:n},e.next=6,ft("/me/calendar/getSchedule",{method:"POST",headers:c,body:JSON.stringify(o)});case 6:return i=e.sent,e.next=9,i.json();case 9:if(s=e.sent,0!==(u=s.value.filter((function(e){return"0"===e.availabilityView}))).length){e.next=13;break}return e.abrupt("return",{error:"nobooth"});case 13:return l=u[Math.floor(Math.random()*u.length)],d=l.scheduleId,b=d.split("@")[0],j=b.replace("zoombooth",""),f={subject:"Booth ".concat(j),start:{dateTime:r.format(Je),timeZone:qe},end:{dateTime:r.add(n,"minutes").format(Je),timeZone:qe},attendees:[{emailAddress:{address:l.scheduleId}}]},e.next=20,ft("/me/calendar/events",{method:"POST",headers:c,body:JSON.stringify(f)});case 20:return h=e.sent,e.next=23,h.json();case 23:return x=e.sent,e.abrupt("return",{boothId:d,boothName:b,boothNumber:j,bookingData:x});case 25:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),gt=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/me/calendar/events/".concat(t),e.next=3,ft(n,{method:"DELETE"});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),kt=function(e){var t=e.bookClick,n=Object(r.useState)(!1),a=Object(D.a)(n,2),c=a[0],o=a[1],i=Object(r.useState)(!0),s=Object(D.a)(i,2),u=s[0],l=s[1],d=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(n){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!1),e.next=3,t(Math.floor(Date.now()/1e3),n);case 3:o(!1),l(!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(M.jsxs)(M.Fragment,{children:[c&&Object(M.jsxs)("div",{children:[Object(M.jsx)(R.a,{disabled:!u,variant:"outlined",color:"secondary",onClick:function(){return o(!1)},children:"Dismiss"}),Object(M.jsx)(R.a,{disabled:!u,variant:"outlined",onClick:function(){return d(30)},children:"30 min"}),Object(M.jsx)(R.a,{disabled:!u,variant:"outlined",onClick:function(){return d(60)},children:"60 min"}),Object(M.jsx)(R.a,{disabled:!u,variant:"outlined",onClick:function(){return d(90)},children:"90 min"}),Object(M.jsx)(R.a,{disabled:!u,variant:"outlined",onClick:function(){return d(120)},children:"120 min"})]}),!c&&Object(M.jsx)(R.a,{variant:"contained",color:"secondary",onClick:function(){return o(!0)},children:"Instant Book"})]})},yt=n(36),wt=function(){var e=Object(yt.e)(),t=Object(d.c)("date",d.b),n=Object(D.a)(t,1)[0],a=Object(Te.a)("(max-width:750px)"),c=xt({startDate:n,days:a?2:5});Object(r.useEffect)((function(){var e=setTimeout((function(){return c.refresh()}),15e3);return function(){clearTimeout(e)}}),[c]);var o=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(t,n){var r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt(t,n);case 2:return r=e.sent,setTimeout((function(){return c.refresh()}),3e3),setTimeout((function(){return c.refresh()}),6e3),setTimeout((function(){return c.refresh()}),9e3),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[c]),i=Object(r.useCallback)(function(){var e=Object(g.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,gt(t);case 2:setTimeout((function(){return c.refresh()}),2e3),setTimeout((function(){return c.refresh()}),4e3),setTimeout((function(){return c.refresh()}),6e3);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[c]);return Object(M.jsx)(m.a,{item:!0,xs:12,md:10,lg:8,children:Object(M.jsxs)(m.a,{container:!0,justifyContent:"left",xs:{width:"90%"},rowSpacing:e.spacing(2),children:[Object(M.jsx)(m.a,{item:!0,xs:12,md:3,children:Object(M.jsx)(kt,{bookClick:o})}),Object(M.jsx)(m.a,{item:!0,xs:12,children:Object(M.jsx)(Se.a,{children:c&&Object(M.jsx)(M.Fragment,{children:Object(M.jsx)(at,{calendarService:c,bookClick:o,deleteEventClick:i})})})}),Object(M.jsx)(m.a,{item:!0,xs:12,md:3,children:Object(M.jsx)(R.a,{variant:"outlined",color:"secondary",onClick:function(){return c.refresh()},children:"Refresh"})})]})})};function Ct(){var e=Object($.a)({},V);return Object(M.jsx)(p.a,{interactionType:le.h.Redirect,authenticationRequest:e,errorComponent:it,loadingComponent:ot,children:Object(M.jsx)(wt,{})})}function Tt(){return Object(M.jsxs)(s.c,{children:[Object(M.jsx)(s.a,{path:"/logout",children:Object(M.jsx)(Ce,{})}),Object(M.jsx)(s.a,{path:"/",children:Object(M.jsx)(Ct,{})})]})}var St=function(e){var t=e.pca,n=Object(s.f)(),r=new T(n);return t.setNavigationClient(r),Object(M.jsx)(p.b,{instance:t,children:Object(M.jsx)(ye,{children:Object(M.jsx)(m.a,{container:!0,justifyContent:"center",children:Object(M.jsx)(Tt,{})})})})};o.a.render(Object(M.jsxs)(a.a.StrictMode,{children:[Object(M.jsx)(u.a,{}),Object(M.jsx)(i.a,{children:Object(M.jsx)(l.a,{theme:x,children:Object(M.jsx)(d.a,{ReactRouterRoute:s.a,children:Object(M.jsx)(St,{pca:dt})})})})]}),document.getElementById("root"))}},[[173,1,2]]]);
//# sourceMappingURL=main.44c64bf0.chunk.js.map