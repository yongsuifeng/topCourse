(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cdb3720"],{"0c97":function(t,i,e){},"2fa4":function(t,i,e){
/*!
 * Viewer.js v1.5.0
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-11-23T05:10:26.193Z
 */
(function(i,e){t.exports=e()})(0,(function(){"use strict";function t(i){return t="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(i)}function i(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function e(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}function s(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function o(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function a(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?o(Object(e),!0).forEach((function(i){s(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var r={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,zoom:null,zoomed:null},h='<div class="viewer-container" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div role="button" class="viewer-button" data-viewer-action="mix"></div><div class="viewer-player"></div></div>',l="undefined"!==typeof window&&"undefined"!==typeof window.document,c=l?window:{},u=!!l&&"ontouchstart"in c.document.documentElement,d=!!l&&"PointerEvent"in c,m="viewer",f="move",g="switch",v="zoom",p="".concat(m,"-active"),w="".concat(m,"-close"),b="".concat(m,"-fade"),y="".concat(m,"-fixed"),k="".concat(m,"-fullscreen"),x="".concat(m,"-fullscreen-exit"),z="".concat(m,"-hide"),D="".concat(m,"-hide-md-down"),T="".concat(m,"-hide-sm-down"),E="".concat(m,"-hide-xs-down"),I="".concat(m,"-in"),O="".concat(m,"-invisible"),S="".concat(m,"-loading"),C="".concat(m,"-move"),L="".concat(m,"-open"),N="".concat(m,"-show"),M="".concat(m,"-transition"),R="click",Y="dblclick",q="dragstart",X="hidden",F="hide",W="keydown",P="load",A=u?"touchstart":"mousedown",j=u?"touchmove":"mousemove",H=u?"touchend touchcancel":"mouseup",V=d?"pointerdown":A,B=d?"pointermove":j,K=d?"pointerup pointercancel":H,U="ready",Z="resize",$="show",J="shown",_="transitionend",G="view",Q="viewed",tt="wheel",it="zoom",et="zoomed",nt="".concat(m,"Action"),st=/\s\s*/,ot=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function at(t){return"string"===typeof t}var rt=Number.isNaN||c.isNaN;function ht(t){return"number"===typeof t&&!rt(t)}function lt(t){return"undefined"===typeof t}function ct(i){return"object"===t(i)&&null!==i}var ut=Object.prototype.hasOwnProperty;function dt(t){if(!ct(t))return!1;try{var i=t.constructor,e=i.prototype;return i&&e&&ut.call(e,"isPrototypeOf")}catch(n){return!1}}function mt(t){return"function"===typeof t}function ft(t,i){if(t&&mt(i))if(Array.isArray(t)||ht(t.length)){var e,n=t.length;for(e=0;e<n;e+=1)if(!1===i.call(t,t[e],e,t))break}else ct(t)&&Object.keys(t).forEach((function(e){i.call(t,t[e],e,t)}));return t}var gt=Object.assign||function(t){for(var i=arguments.length,e=new Array(i>1?i-1:0),n=1;n<i;n++)e[n-1]=arguments[n];return ct(t)&&e.length>0&&e.forEach((function(i){ct(i)&&Object.keys(i).forEach((function(e){t[e]=i[e]}))})),t},vt=/^(?:width|height|left|top|marginLeft|marginTop)$/;function pt(t,i){var e=t.style;ft(i,(function(t,i){vt.test(i)&&ht(t)&&(t+="px"),e[i]=t}))}function wt(t){return at(t)?t.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):t}function bt(t,i){return!(!t||!i)&&(t.classList?t.classList.contains(i):t.className.indexOf(i)>-1)}function yt(t,i){if(t&&i)if(ht(t.length))ft(t,(function(t){yt(t,i)}));else if(t.classList)t.classList.add(i);else{var e=t.className.trim();e?e.indexOf(i)<0&&(t.className="".concat(e," ").concat(i)):t.className=i}}function kt(t,i){t&&i&&(ht(t.length)?ft(t,(function(t){kt(t,i)})):t.classList?t.classList.remove(i):t.className.indexOf(i)>=0&&(t.className=t.className.replace(i,"")))}function xt(t,i,e){i&&(ht(t.length)?ft(t,(function(t){xt(t,i,e)})):e?yt(t,i):kt(t,i))}var zt=/([a-z\d])([A-Z])/g;function Dt(t){return t.replace(zt,"$1-$2").toLowerCase()}function Tt(t,i){return ct(t[i])?t[i]:t.dataset?t.dataset[i]:t.getAttribute("data-".concat(Dt(i)))}function Et(t,i,e){ct(e)?t[i]=e:t.dataset?t.dataset[i]=e:t.setAttribute("data-".concat(Dt(i)),e)}var It=function(){var t=!1;if(l){var i=!1,e=function(){},n=Object.defineProperty({},"once",{get:function(){return t=!0,i},set:function(t){i=t}});c.addEventListener("test",e,n),c.removeEventListener("test",e,n)}return t}();function Ot(t,i,e){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=e;i.trim().split(st).forEach((function(i){if(!It){var o=t.listeners;o&&o[i]&&o[i][e]&&(s=o[i][e],delete o[i][e],0===Object.keys(o[i]).length&&delete o[i],0===Object.keys(o).length&&delete t.listeners)}t.removeEventListener(i,s,n)}))}function St(t,i,e){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=e;i.trim().split(st).forEach((function(i){if(n.once&&!It){var o=t.listeners,a=void 0===o?{}:o;s=function(){delete a[i][e],t.removeEventListener(i,s,n);for(var o=arguments.length,r=new Array(o),h=0;h<o;h++)r[h]=arguments[h];e.apply(t,r)},a[i]||(a[i]={}),a[i][e]&&t.removeEventListener(i,a[i][e],n),a[i][e]=s,t.listeners=a}t.addEventListener(i,s,n)}))}function Ct(t,i,e){var n;return mt(Event)&&mt(CustomEvent)?n=new CustomEvent(i,{detail:e,bubbles:!0,cancelable:!0}):(n=document.createEvent("CustomEvent"),n.initCustomEvent(i,!0,!0,e)),t.dispatchEvent(n)}function Lt(t){var i=t.getBoundingClientRect();return{left:i.left+(window.pageXOffset-document.documentElement.clientLeft),top:i.top+(window.pageYOffset-document.documentElement.clientTop)}}function Nt(t){var i=t.rotate,e=t.scaleX,n=t.scaleY,s=t.translateX,o=t.translateY,a=[];ht(s)&&0!==s&&a.push("translateX(".concat(s,"px)")),ht(o)&&0!==o&&a.push("translateY(".concat(o,"px)")),ht(i)&&0!==i&&a.push("rotate(".concat(i,"deg)")),ht(e)&&1!==e&&a.push("scaleX(".concat(e,")")),ht(n)&&1!==n&&a.push("scaleY(".concat(n,")"));var r=a.length?a.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}function Mt(t){return at(t)?decodeURIComponent(t.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}var Rt=c.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(c.navigator.userAgent);function Yt(t,i){var e=document.createElement("img");if(t.naturalWidth&&!Rt)return i(t.naturalWidth,t.naturalHeight),e;var n=document.body||document.documentElement;return e.onload=function(){i(e.width,e.height),Rt||n.removeChild(e)},e.src=t.src,Rt||(e.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",n.appendChild(e)),e}function qt(t){switch(t){case 2:return E;case 3:return T;case 4:return D;default:return""}}function Xt(t){var i=a({},t),e=[];return ft(t,(function(t,n){delete i[n],ft(i,(function(i){var n=Math.abs(t.startX-i.startX),s=Math.abs(t.startY-i.startY),o=Math.abs(t.endX-i.endX),a=Math.abs(t.endY-i.endY),r=Math.sqrt(n*n+s*s),h=Math.sqrt(o*o+a*a),l=(h-r)/r;e.push(l)}))})),e.sort((function(t,i){return Math.abs(t)<Math.abs(i)})),e[0]}function Ft(t,i){var e=t.pageX,n=t.pageY,s={endX:e,endY:n};return i?s:a({timeStamp:Date.now(),startX:e,startY:n},s)}function Wt(t){var i=0,e=0,n=0;return ft(t,(function(t){var s=t.startX,o=t.startY;i+=s,e+=o,n+=1})),i/=n,e/=n,{pageX:i,pageY:e}}var Pt={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,i=this.options,e=this.parent;i.inline&&(t={width:Math.max(e.offsetWidth,i.minWidth),height:Math.max(e.offsetHeight,i.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=gt({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&pt(this.viewer,this.viewerData)},initList:function(){var t=this,i=this.element,e=this.options,n=this.list,s=[];n.innerHTML="",ft(this.images,(function(i,o){var a=i.src,r=i.alt||Mt(a),h=e.url;if(at(h)?h=i.getAttribute(h):mt(h)&&(h=h.call(t,i)),a||h){var l=document.createElement("li"),c=document.createElement("img");c.src=a||h,c.alt=r,c.setAttribute("data-index",o),c.setAttribute("data-original-url",h||a),c.setAttribute("data-viewer-action","view"),c.setAttribute("role","button"),l.appendChild(c),n.appendChild(l),s.push(l)}})),this.items=s,ft(s,(function(i){var n=i.firstElementChild;Et(n,"filled",!0),e.loading&&yt(i,S),St(n,P,(function(n){e.loading&&kt(i,S),t.loadImage(n)}),{once:!0})})),e.transition&&St(i,Q,(function(){yt(n,M)}),{once:!0})},renderList:function(t){var i=t||this.index,e=this.items[i].offsetWidth||30,n=e+1;pt(this.list,gt({width:n*this.length},Nt({translateX:(this.viewerData.width-e)/2-n*i})))},resetList:function(){var t=this.list;t.innerHTML="",kt(t,M),pt(t,Nt({translateX:0}))},initImage:function(t){var i,e=this,n=this.options,s=this.image,o=this.viewerData,a=this.footer.offsetHeight,r=o.width,h=Math.max(o.height-a,a),l=this.imageData||{};this.imageInitializing={abort:function(){i.onload=null}},i=Yt(s,(function(i,s){var o=i/s,a=r,c=h;e.imageInitializing=!1,h*o>r?c=r/o:a=h*o,a=Math.min(.9*a,i),c=Math.min(.9*c,s);var u={naturalWidth:i,naturalHeight:s,aspectRatio:o,ratio:a/i,width:a,height:c,left:(r-a)/2,top:(h-c)/2},d=gt({},u);n.rotatable&&(u.rotate=l.rotate||0,d.rotate=0),n.scalable&&(u.scaleX=l.scaleX||1,u.scaleY=l.scaleY||1,d.scaleX=1,d.scaleY=1),e.imageData=u,e.initialImageData=d,t&&t()}))},renderImage:function(t){var i=this,e=this.image,n=this.imageData;if(pt(e,gt({width:n.width,height:n.height,marginLeft:n.left,marginTop:n.top},Nt(n))),t)if((this.viewing||this.zooming)&&this.options.transition){var s=function(){i.imageRendering=!1,t()};this.imageRendering={abort:function(){Ot(e,_,s)}},St(e,_,s,{once:!0})}else t()},resetImage:function(){if(this.viewing||this.viewed){var t=this.image;this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null}}},At={bind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;St(i,R,this.onClick=this.click.bind(this)),St(i,q,this.onDragStart=this.dragstart.bind(this)),St(e,V,this.onPointerDown=this.pointerdown.bind(this)),St(n,B,this.onPointerMove=this.pointermove.bind(this)),St(n,K,this.onPointerUp=this.pointerup.bind(this)),St(n,W,this.onKeyDown=this.keydown.bind(this)),St(window,Z,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&St(i,tt,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&St(e,Y,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;Ot(i,R,this.onClick),Ot(i,q,this.onDragStart),Ot(e,V,this.onPointerDown),Ot(n,B,this.onPointerMove),Ot(n,K,this.onPointerUp),Ot(n,W,this.onKeyDown),Ot(window,Z,this.onResize),t.zoomable&&t.zoomOnWheel&&Ot(i,tt,this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&Ot(e,Y,this.onDblclick)}},jt={click:function(t){var i=t.target,e=this.options,n=this.imageData,s=Tt(i,nt);switch(u&&t.isTrusted&&i===this.canvas&&clearTimeout(this.clickCanvasTimeout),s){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.hide();break;case"view":this.view(Tt(i,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-n.scaleX||-1);break;case"flip-vertical":this.scaleY(-n.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(u&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle())},load:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var i=this.element,e=this.options,n=this.image,s=this.index,o=this.viewerData;kt(n,O),e.loading&&kt(this.canvas,S),n.style.cssText="height:0;"+"margin-left:".concat(o.width/2,"px;")+"margin-top:".concat(o.height/2,"px;")+"max-width:none!important;position:absolute;width:0;",this.initImage((function(){xt(n,C,e.movable),xt(n,M,e.transition),t.renderImage((function(){t.viewed=!0,t.viewing=!1,mt(e.viewed)&&St(i,Q,e.viewed,{once:!0}),Ct(i,Q,{originalImage:t.images[s],index:s,image:n})}))}))},loadImage:function(t){var i=t.target,e=i.parentNode,n=e.offsetWidth||30,s=e.offsetHeight||50,o=!!Tt(i,"filled");Yt(i,(function(t,e){var a=t/e,r=n,h=s;s*a>n?o?r=s*a:h=n/a:o?h=n/a:r=s*a,pt(i,gt({width:r,height:h},Nt({translateX:(n-r)/2,translateY:(s-h)/2})))}))},keydown:function(t){var i=this.options;if(this.fulled&&i.keyboard)switch(t.keyCode||t.which||t.charCode){case 27:this.played?this.stop():i.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.prev(i.loop);break;case 38:t.preventDefault(),this.zoom(i.zoomRatio,!0);break;case 39:this.next(i.loop);break;case 40:t.preventDefault(),this.zoom(-i.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle());break}},dragstart:function(t){"img"===t.target.tagName.toLowerCase()&&t.preventDefault()},pointerdown:function(t){var i=this.options,e=this.pointers,n=t.buttons,s=t.button;if(!(!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(ht(n)&&1!==n||ht(s)&&0!==s||t.ctrlKey))){t.preventDefault(),t.changedTouches?ft(t.changedTouches,(function(t){e[t.identifier]=Ft(t)})):e[t.pointerId||0]=Ft(t);var o=!!i.movable&&f;i.zoomOnTouch&&i.zoomable&&Object.keys(e).length>1?o=v:i.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(o=g),!i.transition||o!==f&&o!==v||kt(this.image,M),this.action=o}},pointermove:function(t){var i=this.pointers,e=this.action;this.viewed&&e&&(t.preventDefault(),t.changedTouches?ft(t.changedTouches,(function(t){gt(i[t.identifier]||{},Ft(t,!0))})):gt(i[t.pointerId||0]||{},Ft(t,!0)),this.change(t))},pointerup:function(t){var i,e=this,n=this.options,s=this.action,o=this.pointers;t.changedTouches?ft(t.changedTouches,(function(t){i=o[t.identifier],delete o[t.identifier]})):(i=o[t.pointerId||0],delete o[t.pointerId||0]),s&&(t.preventDefault(),!n.transition||s!==f&&s!==v||yt(this.image,M),this.action=!1,u&&s!==v&&i&&Date.now()-i.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout((function(){Ct(e.image,Y)}),50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout((function(){e.imageClicked=!1}),500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout((function(){Ct(e.canvas,R)}),50)))))},resize:function(){var t=this;if(this.isShown&&!this.hiding&&(this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage()})),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement))return void this.stop();ft(this.player.getElementsByTagName("img"),(function(i){St(i,P,t.loadImage.bind(t),{once:!0}),Ct(i,P)}))}},wheel:function(t){var i=this;if(this.viewed&&(t.preventDefault(),!this.wheeling)){this.wheeling=!0,setTimeout((function(){i.wheeling=!1}),50);var e=Number(this.options.zoomRatio)||.1,n=1;t.deltaY?n=t.deltaY>0?1:-1:t.wheelDelta?n=-t.wheelDelta/120:t.detail&&(n=t.detail>0?1:-1),this.zoom(-n*e,!0,t)}}},Ht={show:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.element,e=this.options;if(e.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(t),this;if(mt(e.show)&&St(i,$,e.show,{once:!0}),!1===Ct(i,$)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var n=this.viewer;if(kt(n,z),e.transition&&!t){var s=this.shown.bind(this);this.transitioning={abort:function(){Ot(n,_,s),kt(n,I)}},yt(n,M),n.initialOffsetWidth=n.offsetWidth,St(n,_,s,{once:!0}),yt(n,I)}else yt(n,I),this.shown();return this},hide:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.element,e=this.options;if(e.inline||this.hiding||!this.isShown&&!this.showing)return this;if(mt(e.hide)&&St(i,F,e.hide,{once:!0}),!1===Ct(i,F))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var n=this.viewer;if(e.transition&&!t){var s=this.hidden.bind(this),o=function(){setTimeout((function(){St(n,_,s,{once:!0}),kt(n,I)}),0)};this.transitioning={abort:function(){this.viewed?Ot(this.image,_,o):Ot(n,_,s)}},this.viewed&&bt(this.image,M)?(St(this.image,_,o,{once:!0}),this.zoomTo(0,!1,!1,!0)):o()}else kt(n,I),this.hidden();return this},view:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options.initialViewIndex;if(i=Number(i)||0,this.hiding||this.played||i<0||i>=this.length||this.viewed&&i===this.index)return this;if(!this.isShown)return this.index=i,this.show();this.viewing&&this.viewing.abort();var e=this.element,n=this.options,s=this.title,o=this.canvas,a=this.items[i],r=a.querySelector("img"),h=Tt(r,"originalUrl"),l=r.getAttribute("alt"),c=document.createElement("img");if(c.src=h,c.alt=l,mt(n.view)&&St(e,G,n.view,{once:!0}),!1===Ct(e,G,{originalImage:this.images[i],index:i,image:c})||!this.isShown||this.hiding||this.played)return this;this.image=c,kt(this.items[this.index],p),yt(a,p),this.viewed=!1,this.index=i,this.imageData={},yt(c,O),n.loading&&yt(o,S),o.innerHTML="",o.appendChild(c),this.renderList(),s.innerHTML="";var u,d=function(){var i=t.imageData,e=Array.isArray(n.title)?n.title[1]:n.title;s.innerHTML=wt(mt(e)?e.call(t,c,i):"".concat(l," (").concat(i.naturalWidth," × ").concat(i.naturalHeight,")"))};return St(e,Q,d,{once:!0}),this.viewing={abort:function(){Ot(e,Q,d),c.complete?this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort():(c.src="",Ot(c,P,u),this.timeout&&clearTimeout(this.timeout))}},c.complete?this.load():(St(c,P,u=this.load.bind(this),{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((function(){kt(c,O),t.timeout=!1}),1e3)),this},prev:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.index-1;return i<0&&(i=t?this.length-1:0),this.view(i),this},next:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.length-1,e=this.index+1;return e>i&&(e=t?0:i),this.view(e),this},move:function(t,i){var e=this.imageData;return this.moveTo(lt(t)?t:e.left+Number(t),lt(i)?i:e.top+Number(i)),this},moveTo:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,e=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&this.options.movable){var n=!1;ht(t)&&(e.left=t,n=!0),ht(i)&&(e.top=i,n=!0),n&&this.renderImage()}return this},zoom:function(t){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=this.imageData;return t=Number(t),t=t<0?1/(1-t):1+t,this.zoomTo(n.width*t/n.naturalWidth,i,e),this},zoomTo:function(t){var i=this,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=this.element,a=this.options,r=this.pointers,h=this.imageData,l=h.width,c=h.height,u=h.left,d=h.top,m=h.naturalWidth,f=h.naturalHeight;if(t=Math.max(0,t),ht(t)&&this.viewed&&!this.played&&(s||a.zoomable)){if(!s){var g=Math.max(.01,a.minZoomRatio),v=Math.min(100,a.maxZoomRatio);t=Math.min(Math.max(t,g),v)}n&&t>.95&&t<1.05&&(t=1);var p=m*t,w=f*t,b=p-l,y=w-c,k=l/m;if(mt(a.zoom)&&St(o,it,a.zoom,{once:!0}),!1===Ct(o,it,{ratio:t,oldRatio:k,originalEvent:n}))return this;if(this.zooming=!0,n){var x=Lt(this.viewer),z=r&&Object.keys(r).length?Wt(r):{pageX:n.pageX,pageY:n.pageY};h.left-=b*((z.pageX-x.left-u)/l),h.top-=y*((z.pageY-x.top-d)/c)}else h.left-=b/2,h.top-=y/2;h.width=p,h.height=w,h.ratio=t,this.renderImage((function(){i.zooming=!1,mt(a.zoomed)&&St(o,et,a.zoomed,{once:!0}),Ct(o,et,{ratio:t,oldRatio:k,originalEvent:n})})),e&&this.tooltip()}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var i=this.imageData;return t=Number(t),ht(t)&&this.viewed&&!this.played&&this.options.rotatable&&(i.rotate=t,this.renderImage()),this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,e=this.imageData;if(t=Number(t),i=Number(i),this.viewed&&!this.played&&this.options.scalable){var n=!1;ht(t)&&(e.scaleX=t,n=!0),ht(i)&&(e.scaleY=i,n=!0),n&&this.renderImage()}return this},play:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var e=this.options,n=this.player,s=this.loadImage.bind(this),o=[],a=0,r=0;if(this.played=!0,this.onLoadWhenPlay=s,i&&this.requestFullscreen(),yt(n,N),ft(this.items,(function(t,i){var h=t.querySelector("img"),l=document.createElement("img");l.src=Tt(h,"originalUrl"),l.alt=h.getAttribute("alt"),a+=1,yt(l,b),xt(l,M,e.transition),bt(t,p)&&(yt(l,I),r=i),o.push(l),St(l,P,s,{once:!0}),n.appendChild(l)})),ht(e.interval)&&e.interval>0){var h=function i(){t.playing=setTimeout((function(){kt(o[r],I),r+=1,r=r<a?r:0,yt(o[r],I),i()}),e.interval)};a>1&&h()}return this},stop:function(){var t=this;if(!this.played)return this;var i=this.player;return this.played=!1,clearTimeout(this.playing),ft(i.getElementsByTagName("img"),(function(i){Ot(i,P,t.onLoadWhenPlay)})),kt(i,N),i.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return!this.isShown||this.played||this.fulled||!i.inline?this:(this.fulled=!0,this.open(),yt(this.button,x),i.transition&&(kt(s,M),this.viewed&&kt(n,M)),yt(e,y),e.setAttribute("style",""),pt(e,{zIndex:i.zIndex}),this.initContainer(),this.viewerData=gt({},this.containerData),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage((function(){i.transition&&setTimeout((function(){yt(n,M),yt(s,M)}),0)}))})),this)},exit:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return this.isShown&&!this.played&&this.fulled&&i.inline?(this.fulled=!1,this.close(),kt(this.button,x),i.transition&&(kt(s,M),this.viewed&&kt(n,M)),kt(e,y),pt(e,{zIndex:i.zIndexInline}),this.viewerData=gt({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage((function(){t.renderImage((function(){i.transition&&setTimeout((function(){yt(n,M),yt(s,M)}),0)}))})),this):this},tooltip:function(){var t=this,i=this.options,e=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&i.tooltip?(e.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):i.transition?(this.fading&&Ct(e,_),yt(e,N),yt(e,b),yt(e,M),e.initialOffsetWidth=e.offsetWidth,yt(e,I)):yt(e,N),this.tooltipping=setTimeout((function(){i.transition?(St(e,_,(function(){kt(e,N),kt(e,b),kt(e,M),t.fading=!1}),{once:!0}),kt(e,I),t.fading=!0):kt(e,N),t.tooltipping=!1}),1e3),this):this},toggle:function(){return 1===this.imageData.ratio?this.zoomTo(this.initialImageData.ratio,!0):this.zoomTo(1,!0),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=gt({},this.initialImageData),this.renderImage()),this},update:function(){var t=this.element,i=this.options,e=this.isImg;if(e&&!t.parentNode)return this.destroy();var n=[];if(ft(e?[t]:t.querySelectorAll("img"),(function(t){i.filter?i.filter(t)&&n.push(t):n.push(t)})),!n.length)return this;if(this.images=n,this.length=n.length,this.ready){var s=[];if(ft(this.items,(function(t,i){var e=t.querySelector("img"),o=n[i];o&&e?o.src!==e.src&&s.push(i):s.push(i)})),pt(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var o=s.indexOf(this.index);o>=0?(this.viewed=!1,this.view(Math.max(this.index-(o+1),0))):yt(this.items[this.index],p)}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var t=this.element,i=this.options;return t[m]?(this.destroyed=!0,this.ready?(this.played&&this.stop(),i.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):i.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),i.inline||Ot(t,R,this.onStart),t[m]=void 0,this):this}},Vt={open:function(){var t=this.body;yt(t,L),t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyPaddingRight)||0),"px")},close:function(){var t=this.body;kt(t,L),t.style.paddingRight=this.initialBodyPaddingRight},shown:function(){var t=this.element,i=this.options;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,mt(i.shown)&&St(t,J,i.shown,{once:!0}),!1!==Ct(t,J)&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,i=this.options;this.fulled=!1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),yt(this.viewer,z),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(mt(i.hidden)&&St(t,X,i.hidden,{once:!0}),Ct(t,X))},requestFullscreen:function(){var t=this.element.ownerDocument;if(this.fulled&&!(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)){var i=t.documentElement;i.requestFullscreen?i.requestFullscreen():i.webkitRequestFullscreen?i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):i.mozRequestFullScreen?i.mozRequestFullScreen():i.msRequestFullscreen&&i.msRequestFullscreen()}},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var i=this.options,e=this.pointers,n=e[Object.keys(e)[0]],s=n.endX-n.startX,o=n.endY-n.startY;switch(this.action){case f:this.move(s,o);break;case v:this.zoom(Xt(e),!1,t);break;case g:this.action="switched";var a=Math.abs(s);a>1&&a>Math.abs(o)&&(this.pointers={},s>1?this.prev(i.loop):s<-1&&this.next(i.loop));break}ft(e,(function(t){t.startX=t.endX,t.startY=t.endY}))},isSwitchable:function(){var t=this.imageData,i=this.viewerData;return this.length>1&&t.left>=0&&t.top>=0&&t.width<=i.width&&t.height<=i.height}},Bt=c.Viewer,Kt=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(i(this,t),!e||1!==e.nodeType)throw new Error("The first argument is required and must be an element.");this.element=e,this.options=gt({},r,dt(n)&&n),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.init()}return n(t,[{key:"init",value:function(){var t=this,i=this.element,e=this.options;if(!i[m]){i[m]=this;var n="img"===i.tagName.toLowerCase(),s=[];ft(n?[i]:i.querySelectorAll("img"),(function(i){mt(e.filter)?e.filter.call(t,i)&&s.push(i):s.push(i)})),this.isImg=n,this.length=s.length,this.images=s;var o=i.ownerDocument,a=o.body||o.documentElement;if(this.body=a,this.scrollbarWidth=window.innerWidth-o.documentElement.clientWidth,this.initialBodyPaddingRight=window.getComputedStyle(a).paddingRight,lt(document.createElement(m).style.transition)&&(e.transition=!1),e.inline){var r=0,h=function(){var i;(r+=1,r===t.length)&&(t.initializing=!1,t.delaying={abort:function(){clearTimeout(i)}},i=setTimeout((function(){t.delaying=!1,t.build()}),0))};this.initializing={abort:function(){ft(s,(function(t){t.complete||Ot(t,P,h)}))}},ft(s,(function(t){t.complete?h():St(t,P,h,{once:!0})}))}else St(i,R,this.onStart=function(i){var n=i.target;"img"!==n.tagName.toLowerCase()||mt(e.filter)&&!e.filter.call(t,n)||t.view(t.images.indexOf(n))})}}},{key:"build",value:function(){if(!this.ready){var t=this.element,i=this.options,e=t.parentNode,n=document.createElement("div");n.innerHTML=h;var s=n.querySelector(".".concat(m,"-container")),o=s.querySelector(".".concat(m,"-title")),a=s.querySelector(".".concat(m,"-toolbar")),r=s.querySelector(".".concat(m,"-navbar")),l=s.querySelector(".".concat(m,"-button")),c=s.querySelector(".".concat(m,"-canvas"));if(this.parent=e,this.viewer=s,this.title=o,this.toolbar=a,this.navbar=r,this.button=l,this.canvas=c,this.footer=s.querySelector(".".concat(m,"-footer")),this.tooltipBox=s.querySelector(".".concat(m,"-tooltip")),this.player=s.querySelector(".".concat(m,"-player")),this.list=s.querySelector(".".concat(m,"-list")),yt(o,i.title?qt(Array.isArray(i.title)?i.title[0]:i.title):z),yt(r,i.navbar?qt(i.navbar):z),xt(l,z,!i.button),i.backdrop&&(yt(s,"".concat(m,"-backdrop")),i.inline||"static"===i.backdrop||Et(c,nt,"hide")),at(i.className)&&i.className&&i.className.split(st).forEach((function(t){yt(s,t)})),i.toolbar){var u=document.createElement("ul"),d=dt(i.toolbar),f=ot.slice(0,3),g=ot.slice(7,9),v=ot.slice(9);d||yt(a,qt(i.toolbar)),ft(d?i.toolbar:ot,(function(t,e){var n=d&&dt(t),s=d?Dt(e):t,o=n&&!lt(t.show)?t.show:t;if(o&&(i.zoomable||-1===f.indexOf(s))&&(i.rotatable||-1===g.indexOf(s))&&(i.scalable||-1===v.indexOf(s))){var a=n&&!lt(t.size)?t.size:t,r=n&&!lt(t.click)?t.click:t,h=document.createElement("li");h.setAttribute("role","button"),yt(h,"".concat(m,"-").concat(s)),mt(r)||Et(h,nt,s),ht(o)&&yt(h,qt(o)),-1!==["small","large"].indexOf(a)?yt(h,"".concat(m,"-").concat(a)):"play"===s&&yt(h,"".concat(m,"-large")),mt(r)&&St(h,R,r),u.appendChild(h)}})),a.appendChild(u)}else yt(a,z);if(!i.rotatable){var p=a.querySelectorAll('li[class*="rotate"]');yt(p,O),ft(p,(function(t){a.appendChild(t)}))}if(i.inline)yt(l,k),pt(s,{zIndex:i.zIndexInline}),"static"===window.getComputedStyle(e).position&&pt(e,{position:"relative"}),e.insertBefore(s,t.nextSibling);else{yt(l,w),yt(s,y),yt(s,b),yt(s,z),pt(s,{zIndex:i.zIndex});var x=i.container;at(x)&&(x=t.ownerDocument.querySelector(x)),x||(x=this.body),x.appendChild(s)}i.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,mt(i.ready)&&St(t,U,i.ready,{once:!0}),!1!==Ct(t,U)?this.ready&&i.inline&&this.view(this.index):this.ready=!1}}}],[{key:"noConflict",value:function(){return window.Viewer=Bt,t}},{key:"setDefaults",value:function(t){gt(r,dt(t)&&t)}}]),t}();return gt(Kt.prototype,Pt,At,jt,Ht,Vt),Kt}))}}]);