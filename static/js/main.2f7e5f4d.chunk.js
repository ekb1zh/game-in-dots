(this["webpackJsonpgame-in-dots"]=this["webpackJsonpgame-in-dots"]||[]).push([[0],{21:function(e,t,n){e.exports=n(42)},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r,a,c,o=n(0),l=n.n(o),i=n(6),u=n.n(i),s=n(1),d=n(2),f=n(3),p=n(15),E=n(16),m="https://starnavi-frontend-test-task.herokuapp.com/winners";function S(){return{difficulties:null,currentMode:null,playerName:null,winners:null,score:[0,0],stage:a.SETTING}}!function(e){e.DEFAULT="transparent",e.BLUE="#42d8e8",e.GREEN="#00e871",e.RED="#e85a5e"}(r||(r={})),function(e){e[e.SETTING=0]="SETTING",e[e.PLAYING=1]="PLAYING",e[e.WIN=2]="WIN"}(a||(a={})),function(e){e.SET_DIFFICULTIES="SET_DIFFICULTIES",e.SET_CURRENT_MODE="SET_CURRENT_MODE",e.SET_PLAYER_NAME="SET_PLAYER_NAME",e.SET_WINNERS="SET_WINNERS",e.SET_SCORE="SET_SCORE",e.SET_STAGE="SET_STAGE"}(c||(c={}));var T=Object(f.createStore)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.SET_DIFFICULTIES:return Object(d.a)({},e,{difficulties:t.payload});case c.SET_CURRENT_MODE:return Object(d.a)({},e,{currentMode:t.payload});case c.SET_PLAYER_NAME:return Object(d.a)({},e,{playerName:t.payload});case c.SET_WINNERS:return Object(d.a)({},e,{winners:t.payload});case c.SET_SCORE:return Object(d.a)({},e,{score:t.payload});case c.SET_STAGE:return Object(d.a)({},e,{stage:t.payload});default:return e}}),Object(E.composeWithDevTools)(Object(f.applyMiddleware)(p.a))),h=n(9);n(32);var y=function(){var e=Object(s.d)((function(e){return{difficulties:e.difficulties,currentMode:e.currentMode,stage:e.stage}})),t=e.difficulties,n=e.currentMode,r=e.stage,o=Object(s.c)(),i=["Pick game mode"];return t&&i.push.apply(i,Object(h.a)(Object.keys(t))),l.a.createElement("select",{className:"select-mode",value:n||"Pick game mode",onChange:function(e){var t=e.target.value;o({type:c.SET_CURRENT_MODE,payload:"Pick game mode"===t?null:t})},disabled:r!==a.SETTING},i.map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))};n(33);var b=function(){var e,t=Object(s.d)((function(e){return{currentMode:e.currentMode,playerName:e.playerName,stage:e.stage}})),n=t.currentMode,r=t.playerName,o=t.stage,i=Object(s.c)(),u=!r||!n;switch(o){case a.SETTING:e="PLAY";break;case a.PLAYING:case a.WIN:e="PLAY AGAIN";break;default:throw new Error}return l.a.createElement("button",{className:"play-button",onClick:function(e){switch(o){case a.SETTING:i({type:c.SET_STAGE,payload:a.PLAYING});break;case a.PLAYING:case a.WIN:i({type:c.SET_CURRENT_MODE,payload:null}),i({type:c.SET_SCORE,payload:[0,0]}),i({type:c.SET_STAGE,payload:a.SETTING});break;default:throw new Error}},disabled:u,style:{opacity:u?.1:1}},e)};n(34);var N=function(){var e=Object(s.d)((function(e){return{playerName:e.playerName,stage:e.stage}})),t=e.playerName,n=e.stage,r=Object(s.c)();return l.a.createElement("input",{className:"text-field",type:"text",value:t||"",placeholder:"Enter your name",onChange:function(e){r({type:c.SET_PLAYER_NAME,payload:e.target.value})},disabled:n!==a.SETTING})},v=n(5);n(35);var I=function(){var e=Object(s.d)((function(e){return{currentMode:e.currentMode,playerName:e.playerName,stage:e.stage,score:e.score}})),t=e.currentMode,n=e.playerName,r=e.stage,c=e.score,o="",i="#888888";switch(r){case a.SETTING:var u=!t,d=!n;u&&(o+="pick game mode"),u&&d&&(o+=" and "),d&&(o+="enter your name"),o||(o+="push PLAY button, and good luck :-)"),o="Please, ".concat(o),i="sandybrown";break;case a.PLAYING:var f=Object(v.a)(c,2),p=f[0],E=f[1];o="Score: You ".concat(p," : ").concat(E,' "computer"');break;case a.WIN:var m=Object(v.a)(c,2),S=m[0],T=m[1];o="Game over. Score: ".concat(S," : ").concat(T,". ").concat(S>T?"You are win!":"Computer win."," \nPlease, play again :-)");break;default:throw new Error}return o?l.a.createElement("p",{className:"message",style:{color:i}},o):null},g=n(17),O=n(18),w=n(8),C=n(19),_=n(20),k=function(){var e=arguments;return fetch.apply(null,e).then((function(e){if(e.ok)return e.json()})).catch((function(e){return console.error(e)}))};n(36);var M=function(e){Object(_.a)(n,e);var t=Object(C.a)(n);function n(e){var o;Object(g.a)(this,n),(o=t.call(this,e)).props=e,o.scoreLocal=void 0,o.timerId=void 0,o.cell=void 0,o.isStarted=void 0,o.table=void 0,o.coordinates=void 0,o.newTable=function(e){return new Array(e).fill(null).map((function(t){return new Array(e).fill(r.DEFAULT)}))},o.newCoordinates=function(e){for(var t=[],n=0;n<e;++n)for(var r=0;r<e;++r)t.push([n,r]);return t},o.timer=function(){o.clearTimer(),o.fillSelectedCell(r.RED),o.incrementComputerScore();var e=o.checkWinner();e?(o.sendResultsAndDispatchThem(e),o.dispatchStageWin()):(o.selectRandomCell(),o.fillSelectedCell(r.BLUE),o.startTimer()),o.dispatchScore()},o.onClick=function(e){o.clearTimer(),o.fillSelectedCell(r.GREEN),o.incrementPlayerScore();var t=o.checkWinner();t?(o.sendResultsAndDispatchThem(t),o.dispatchStageWin()):(o.selectRandomCell(),o.fillSelectedCell(r.BLUE),o.startTimer()),o.dispatchScore()},o.startTimer=function(){var e=o.props.store,t=e.difficulties[e.currentMode].delay;t&&("number"===typeof o.timerId&&(console.error(new Error),o.clearTimer()),o.timerId=window.setTimeout(o.timer,t))},o.clearTimer=function(){if("number"===typeof o.timerId)return window.clearTimeout(o.timerId),void(o.timerId=null)},o.selectRandomCell=function(){o.coordinates.length||(o.cell=null);var e,t,n=(e=0,t=o.coordinates.length,Math.floor(Math.random()*(t-e))+e);o.cell=o.coordinates[n],o.coordinates.splice(n,1)},o.fillSelectedCell=function(e){if(o.cell){var t=Object(v.a)(o.cell,2),n=t[0],r=t[1];o.table[n][r]=e}},o.incrementPlayerScore=function(){++o.scoreLocal[0]},o.incrementComputerScore=function(){++o.scoreLocal[1]},o.dispatchScore=function(){o.props.dispatch({type:c.SET_SCORE,payload:Object(h.a)(o.scoreLocal)})},o.checkWinner=function(){var e=o.props.store,t=e.difficulties,n=e.currentMode,r=e.playerName,c=e.stage,l=t[n].field;if(c===a.WIN)return null;for(var i=Object(w.a)(o).scoreLocal,u=0,s=i.length;u<s;++u){if(i[u]/Math.pow(l,2)*100>50){var d={date:(new Date).toLocaleString()};switch(u){case 0:d.winner=r||"";break;case 1:d.winner="computer";break;default:throw new Error}return d}}return null},o.sendResultsAndDispatchThem=function(e){o.props.dispatch((function(t,n){var r={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)};k(m,r).then((function(e){return t({type:c.SET_WINNERS,payload:e})}))}))},o.dispatchStageWin=function(){o.props.dispatch({type:c.SET_STAGE,payload:a.WIN})};var l=o.props.store,i=l.difficulties[l.currentMode].field;return o.timerId=null,o.cell=[0,0],o.scoreLocal=[0,0],o.isStarted=!1,o.table=o.newTable(i),o.coordinates=o.newCoordinates(i),o}return Object(O.a)(n,[{key:"shouldComponentUpdate",value:function(e){var t=e.store,n=t.difficulties[t.currentMode].field;n===this.props.store.difficulties[this.props.store.currentMode].field||(this.table=this.newTable(n),this.coordinates=this.newCoordinates(n));var c=e.store.stage;return this.isStarted||c!==a.PLAYING||(this.selectRandomCell(),this.fillSelectedCell(r.BLUE),this.startTimer(),this.isStarted=!0),!0}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"render",value:function(){var e=this;return l.a.createElement("table",{className:"table"},l.a.createElement("tbody",null,this.table.map((function(t,n){return l.a.createElement("tr",{key:n},t.map((function(t,n){return l.a.createElement("td",{key:n,onClick:t===r.BLUE?e.onClick:null,style:{backgroundColor:t}})})))}))))}}]),n}(l.a.Component),j=Object(s.b)((function(e){return{store:e}}),(function(e){return{dispatch:e}}))(M);n(37);var R=function(){var e=Object(s.d)((function(e){return{difficulties:e.difficulties,currentMode:e.currentMode}})),t=e.difficulties,n=e.currentMode;return l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"controls"},l.a.createElement(y,null),l.a.createElement(N,null),l.a.createElement(b,null)),l.a.createElement(I,null),t&&n&&l.a.createElement(j,null))},L=(n(38),l.a.memo((function(e){var t=e.winners;return l.a.createElement("div",{className:"winners"},l.a.createElement("h3",null,t?"Leader Board":"Loading..."),t&&l.a.createElement("ul",null,t.map((function(e){var t=e.winner,n=e.date,r=e.id;return l.a.createElement("li",{key:r},l.a.createElement("span",null,t),l.a.createElement("span",null,n))})).reverse()))}))),A=Object(s.b)((function(e){return{winners:e.winners}}))(L),G=function(e,t){k("https://starnavi-frontend-test-task.herokuapp.com/game-settings").then((function(t){return e({type:c.SET_DIFFICULTIES,payload:t})})),k(m).then((function(t){return e({type:c.SET_WINNERS,payload:t})}))};var P=function(){var e=Object(s.d)((function(e){return{difficulties:e.difficulties,currentMode:e.currentMode}})),t=e.difficulties,n=e.currentMode,r=Object(s.c)();return Object(o.useEffect)((function(){r(G)}),[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(R,null),l.a.createElement("div",{className:"separator".concat(t&&n?" hidden":"")}),l.a.createElement(A,null))};n(39),n(40),n(41);u.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(s.a,{store:T},l.a.createElement(P,null))),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.2f7e5f4d.chunk.js.map