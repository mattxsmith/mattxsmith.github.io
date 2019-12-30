(this.webpackJsonpea_v2=this.webpackJsonpea_v2||[]).push([[0],{11:function(e,t,a){},12:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(5),c=a.n(l);a(11),a(12);var u=function(e){return r.a.createElement("div",{id:"sidebar"},r.a.createElement("h2",{id:"site-title"},"Explore Augur"))},m=a(1);var o=function(e){function t(e){var t=e.marketInfo.marketId.substring(0,8)+"...",a=new Date(1970,0,1,0,0,e.marketInfo.lastTradeTime),n=e.marketInfo.lastTradeTime?a.toString().substring(0,24):"",l=Math.round(100*Number(e.marketInfo.bidPrice))/100,c=Math.round(100*Number(e.marketInfo.askPrice))/100;return r.a.createElement("tr",null,r.a.createElement("td",null,t),r.a.createElement("td",null,e.marketInfo.marketDescription),r.a.createElement("td",null,e.marketInfo.outcome),r.a.createElement("td",null,e.marketInfo.volume),r.a.createElement("td",null,n),r.a.createElement("td",{style:{backgroundColor:"#FDE7D0"}},l),r.a.createElement("td",{style:{backgroundColor:"#E0FDD9"}},c))}var a=r.a.useState([{marketId:"0x023489023234",marketDescription:"foobar",outcome:"Yes",volume:23904.12,lastTradeTime:1576822958,bidPrice:.344,askPrice:.4,liquidity:.931},{marketId:"0xdea49023409",marketDescription:"test market 1",outcome:"No",volume:0,lastTradeTime:null,bidPrice:.1843,askPrice:.234,liquidity:.941},{marketId:"0xbeef0230482",marketDescription:"test market 2",outcome:"No",volume:4.12,lastTradeTime:1576812958,bidPrice:.44,askPrice:.5,liquidity:.92},{marketId:"0x48923998123",marketDescription:"test market 3",outcome:"No",volume:532134,lastTradeTime:1576802958,bidPrice:.666,askPrice:.7234,liquidity:.994},{marketId:"0x4890232345523",marketDescription:"test market 4",outcome:"Yes",volume:1,lastTradeTime:1576801958,bidPrice:.22,askPrice:.2344,liquidity:.331}]),n=Object(m.a)(a,2),l=n[0],c=(n[1],l.sort((function(e,t){return t.liquidity-e.liquidity})).map((function(e){return r.a.createElement(t,{key:e.marketId,marketInfo:e})})));return r.a.createElement("div",{id:"top-markets"},r.a.createElement("h3",null,"Top Markets"),r.a.createElement("table",{id:"top-markets-table"},r.a.createElement("thead",null,r.a.createElement((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,"Market ID"),r.a.createElement("td",null,"Market Description"),r.a.createElement("td",null,"Outcome"),r.a.createElement("td",null,"Volume"),r.a.createElement("td",null,"Last Trade"),r.a.createElement("td",null,"Bid Price"),r.a.createElement("td",null,"Ask Price"))}),null)),r.a.createElement("tbody",null,c)))},s=a(2),i=a.n(s),d=a(3);var E=function(e){var t=r.a.useState([]),a=Object(m.a)(t,2),n=a[0],l=a[1],c=r.a.useState("timestamp"),u=Object(m.a)(c,2),o=u[0],s=u[1],E=r.a.useState("desc"),k=Object(m.a)(E,2),p=k[0],f=k[1],b=r.a.useState(""),v=Object(m.a)(b,2),h=v[0],T=v[1];function y(e){var t=e.tradesInfo,a=t.description,n=t.outcome,l=t.takerSide,c=new Date(1970,0,1,0,0,t.timestamp).toString().substring(0,24),u=t.maker,m=u.substring(0,7)+"...",o=t.taker,s=o.substring(0,7)+"...",i=Math.round(1e3*t.price)/1e3,d=Math.round(t.amount),E="Buy"===l?"#E0FDD9":"#FDE7D0",k=t.maker===h?{color:"red"}:{},p=t.taker===h?{color:"red"}:{},f=function(e){return T("")};return r.a.createElement("tr",{style:{backgroundColor:E}},r.a.createElement("td",null,c),r.a.createElement("td",null,a),r.a.createElement("td",null,n),r.a.createElement("td",null,l),r.a.createElement("td",null,i),r.a.createElement("td",null,"$",d),r.a.createElement("td",{style:k,onMouseOver:function(e){return T(u)},onMouseLeave:f},m),r.a.createElement("td",{style:p,onMouseOver:function(e){return T(o)},onMouseLeave:f},s))}function I(e){o===e?f("desc"===p?"asc":"desc"):s(e)}return r.a.useEffect((function(){function e(){return t.apply(this,arguments)}function t(){return(t=Object(d.a)(i.a.mark((function e(){var t,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://x0gksbko2m.execute-api.us-east-1.amazonaws.com/prod/get-recent-trades",e.next=3,fetch("https://x0gksbko2m.execute-api.us-east-1.amazonaws.com/prod/get-recent-trades");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,n=a.data.sort((function(e,t){return t.timestamp-e.timestamp})),l(n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e(),setInterval(e,6e4)}),[]),r.a.createElement("div",{id:"recent-trades"},r.a.createElement("h3",null,"Recent Trades"),r.a.createElement("table",{id:"recent-trades-table"},r.a.createElement("thead",null,r.a.createElement((function(e){return r.a.createElement("tr",null,r.a.createElement("td",{onClick:function(e){return I("timestamp")}},"Time"),r.a.createElement("td",null,"Market Description"),r.a.createElement("td",null,"Outcome"),r.a.createElement("td",null,"Taker Order"),r.a.createElement("td",{onClick:function(e){return I("price")}},"Price"),r.a.createElement("td",{onClick:function(e){return I("amount")}},"Amount"),r.a.createElement("td",null,"Maker"),r.a.createElement("td",null,"Taker"))}),null)),r.a.createElement("tbody",null,n.sort((function(e,t){return"desc"===p?t[o]-e[o]:e[o]-t[o]})).map((function(e){return r.a.createElement(y,{key:e.marketId,tradesInfo:e})})))))};var k=function(e){var t=r.a.useState({volume:{"24hrs":"","1wk":"","1mo":"",total:""},volumeTrades:{"24hrs":"","1wk":"","1mo":"",total:""},activeMarkets:{"24hrs":"","1wk":"","1mo":"",total:""},newMarkets:{"24hrs":"","1wk":"","1mo":"",total:""},traders:{"24hrs":"","1wk":"","1mo":"",total:""}}),a=Object(m.a)(t,2),n=a[0],l=a[1];function c(e){var t=n[e.name],a={volume:"Volume",volumeTrades:"Volume (Trades)",activeMarkets:"Active Markets",newMarkets:"New Markets",traders:"Traders"};return r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("b",null,a[e.name])),r.a.createElement("td",null,t["24hrs"]),r.a.createElement("td",null,t["1wk"]),r.a.createElement("td",null,t["1mo"]),r.a.createElement("td",null,t.total))}return r.a.useEffect((function(){function e(){return t.apply(this,arguments)}function t(){return(t=Object(d.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://x0gksbko2m.execute-api.us-east-1.amazonaws.com/prod/homepage-stats",e.next=3,fetch("https://x0gksbko2m.execute-api.us-east-1.amazonaws.com/prod/homepage-stats");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,l(a.data);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e(),setInterval(e,6e4)}),[]),r.a.createElement("div",{id:"homepage-stats"},r.a.createElement("h3",null,"Stats"),r.a.createElement("table",{id:"homepage-stats-table"},r.a.createElement("thead",null,r.a.createElement((function(e){return r.a.createElement("tr",null,r.a.createElement("td",{style:{border:"solid black 1px"}}),r.a.createElement("td",null,r.a.createElement("b",null,"24 Hours")),r.a.createElement("td",null,r.a.createElement("b",null,"1 Week")),r.a.createElement("td",null,r.a.createElement("b",null,"1 Month")),r.a.createElement("td",null,r.a.createElement("b",null,"All-time")))}),null)),r.a.createElement("tbody",null,r.a.createElement(c,{name:"volume"}),r.a.createElement(c,{name:"volumeTrades"}),r.a.createElement(c,{name:"activeMarkets"}),r.a.createElement(c,{name:"newMarkets"}),r.a.createElement(c,{name:"traders"}))))};var p=function(e){return r.a.createElement("div",{id:"content"},"content component",r.a.createElement(k,null),r.a.createElement(E,null),r.a.createElement(o,null))};var f=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(u,null),r.a.createElement(p,null))};c.a.render(r.a.createElement(f,null),document.getElementById("root"))},6:function(e,t,a){e.exports=a(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.a1c321e4.chunk.js.map