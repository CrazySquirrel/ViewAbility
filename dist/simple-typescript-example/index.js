!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ViewAbility",[],t):"object"==typeof exports?exports.ViewAbility=t():e.ViewAbility=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(4)},,,,function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(5),r=o(i);n(8),new r.default(document.getElementById("test-block"),{percentage:.5,time:2e3},function(){window.document.write("Div was seen.")})},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=n(6),s=n(7),a=function(){function e(t,n,a){var u=this;o(this,e),window.addEventListener?(window.addEventListener("resize",e.resizeEvent),window.addEventListener("orientationchange",e.resizeEvent)):window.attachEvent&&window.attachEvent("onresize",e.resizeEvent),setInterval(function(){e.resizeEvent()},1e3),e.resizeEvent(),t&&("object"===("undefined"==typeof t?"undefined":i(t))?t.id=this.ID=t.id||e.getID():(this.ID=t,t=document.getElementById(""+this.ID)),t&&(n&&"object"===("undefined"==typeof n?"undefined":i(n))?(n.percentage?(n.percentage=parseFloat(n.percentage),n.percentage?(n.percentage=n.percentage<0?0:n.percentage,n.percentage=n.percentage>1?1:n.percentage):n.percentage=.5):n.percentage=.5,n.time?(n.time=parseInt(n.time,10),n.time?(n.time=n.time<0?0:n.time,n.time=n.time>6e4?6e4:n.time):n.time=1e3):n.time=1e3):n={percentage:.5,time:1e3},a&&"function"==typeof a||(a=function(e){"undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Banner was seen ID "+u.ID)}),this.domElement=t,this.objSetting=n,this.funCallBack=a,this.booTimerFlag=!1,"undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Viewer watching init for ID "+this.ID),this.watchID=r.subscribe(this,this.watch,[]))),s.implementationStaticMethods(this)}return e.resizeEvent=function(){e.numDocumentWidth=!1,e.numDocumentHeight=!1,e.numWindowWidth=!1,e.numWindowHeight=!1,e.arrDomStyle=[]},e.getID=function(){return"v_"+Date.now()+"_"+~~(1e6*Math.random())},e.getComputedStyle=function(t){return t.viewability&&e.arrDomStyle[t.viewability]||(t.viewability||(t.viewability=this.getID()),e.arrDomStyle[t.viewability]=window.getComputedStyle(t)),e.arrDomStyle[t.viewability]},e.getWindowHeight=function(){return e.numWindowHeight||(e.numWindowHeight=s.Window.getHeight()),e.numWindowHeight},e.getDocumentHeight=function(){return e.numDocumentHeight||(e.numDocumentHeight=s.Document.getHeight()),e.numDocumentHeight},e.getWindowWidth=function(){return e.numWindowWidth||(e.numWindowWidth=s.Window.getWidth()),e.numWindowWidth},e.getDocumentWidth=function(){return e.numDocumentWidth||(e.numDocumentWidth=s.Document.getWidth()),e.numDocumentWidth},e.getBoundingClientRect=function(e){return s.DOM.getBoundingClientRect(e)},e.calcVisibility=function(t){var n=e.getWindowHeight(),o=t.top<0?0:t.top,i=t.bottom>n?n:t.bottom,r=i-o,s=t.height<n?t.height:n,a=r/s;a=a<0?0:a,a=a>1?1:a;var u=e.getWindowWidth(),c=t.left<0?0:t.left,d=t.right>u?u:t.right,f=d-c,l=t.width<u?t.width:u,g=f/l;g=g<0?0:g,g=g>1?1:g;var m=a*g;return m=m<0?0:m,m=m>1?1:m},e.isVisible=function(t,n,o,i){var r=!0,s=e.getBoundingClientRect(t);if(s.width&&s.height||!n&&""===t.style.overflow){if(n&&(s.bottom<0||s.right<0||s.left>o||s.top>i))r=!1;else if(window.getComputedStyle){var a=e.getComputedStyle(t);0!==a.opacity&&"none"!==a.display&&"hidden"!==a.visibility||(r=!1)}}else r=!1;return r},e.checkVisibility=function(t){for(var n=!0,o=t,i=!0,r=e.getDocumentWidth(),s=e.getDocumentHeight();o&&o!==document.body;){if(!e.isVisible(o,i,r,s)){n=!1;break}if("fixed"===o.style.position)break;o=o.parentNode,i=!1}var a=0;if(n){var u=e.getBoundingClientRect(t),c=1;if(window.getComputedStyle){var d=e.getComputedStyle(t);c=d.opacity}a=e.calcVisibility(u)*c}return a},e.prototype.watch=function(){if(this.domElement&&"object"===i(this.domElement))if(this.domElement.parentNode){var t=e.checkVisibility(this.domElement);t>this.objSetting.percentage?(this.booTimerFlag===!1&&("undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Viewer watching timer start for ID "+this.ID),this.numTimerFrom=Date.now()),this.booTimerFlag=!0):(this.booTimerFlag===!0&&"undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Viewer watching timer stop for ID "+this.ID),this.booTimerFlag=!1);var n=!1;this.booTimerFlag===!0&&Date.now()-this.numTimerFrom>this.objSetting.time&&(n=!0),n&&("undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&(window.console.info("Viewer watching timer stop for ID "+this.ID),window.console.info("Viewer end watching ID "+this.ID)),r.unsubscribe(this.watchID),this.funCallBack(this.ID))}else this.booTimerFlag&&"undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Viewer watching timer stop for ID "+this.ID),"undefined"!=typeof window&&"object"===("undefined"==typeof console?"undefined":i(console))&&"function"==typeof console.info&&window.console.info("Viewer end watching ID "+this.ID),r.unsubscribe(this.watchID);else this.ID&&(this.domElement=document.getElementById(this.ID))},e}();t.default=a,e.exports=a},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(4)},,,,function(e,t){"use strict";function n(e){function t(){"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.log&&window.console.log("Bind polyfill")}function n(){return s.apply(this instanceof t?this:e||window,r.concat(o.call(arguments)))}if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice,r=o.call(arguments,1),s=this;return t.prototype=this.prototype,n.prototype=new t,n}function o(){var e=!{toString:null}.propertyIsEnumerable("toString"),t=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],n=t.length;return function(o){if("object"!==("undefined"==typeof o?"undefined":i(o))&&("function"!=typeof o||null===o))throw new TypeError("Object.keys called on non-object");var r=[];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&r.push(s);if(e)for(var a=0;a<n;a++)Object.prototype.hasOwnProperty.call(o,t[a])&&r.push(t[a]);return r}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};window.requestAnimationFrame=function(){return window&&(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame)||function(e){window.setTimeout(e,1e3/60)}}(),Function.prototype.bind=Function.prototype.bind||n,Object.keys=Object.keys||o();var r=function(){function e(){this.stack={},this.watch()}return e.prototype.subscribe=function(e,t,n,o){void 0===e&&(e=window),void 0===t&&(t=function(){return null}),void 0===n&&(n=[]);try{if("object"===("undefined"==typeof e?"undefined":i(e))&&"function"==typeof t){var r=new Date,s=o||"x-"+r.getTime()+"-"+Math.round(1e6*Math.random());return this.stack[s]={context:e,callback:t,params:n},"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.info&&window.console.info("AnimationFrame stack "+Object.keys(this.stack).length),s}}catch(e){"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.error&&window.console.error(e)}return!1},e.prototype.unsubscribe=function(e){this.stack[e]&&(this.stack[e]=!1,delete this.stack[e],"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.info&&window.console.info("AnimationFrame stack "+Object.keys(this.stack).length))},e.prototype.watch=function(){try{if(this.stack&&"object"===i(this.stack)&&Object.keys(this.stack).length>0)for(var e in this.stack)if(this.stack.hasOwnProperty(e))try{if(e&&"string"==typeof e){var t=this.stack[e];t&&"object"===("undefined"==typeof t?"undefined":i(t))&&t.context&&t.callback&&t.params&&"object"===i(t.context)&&"function"==typeof t.callback&&Array.isArray(t.params)&&t.callback.apply(t.context,t.params)}}catch(e){"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.error&&window.console.error(e)}}catch(e){"undefined"!=typeof window&&"object"===i(window.console)&&"function"==typeof window.console.error&&window.console.error(e)}window.requestAnimationFrame(this.watch.bind(this))},e}();window.AnimationFrame=window.AnimationFrame||new r,e.exports=window.AnimationFrame}])})},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(5)},,,,,function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=n(6),a=o(s),u=n(7),c=o(u),d=n(8),f=o(d),l=n(9),g=o(l),m=n(10),h=o(m),w=n(11),p=o(w),y=n(12),v=o(y),b=n(13),S=o(b),x=function(){function e(){i(this,e)}return e.getBoundingClientRect=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return"object"===("undefined"==typeof console?"undefined":r(console))&&"function"==typeof console.log&&console.log(401,"Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method."),e.DOM.getBoundingClientRect(t,n,o)},e.findElementPosition=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"object"===("undefined"==typeof console?"undefined":r(console))&&"function"==typeof console.log&&console.log(401,"Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method."),e.DOM.findElementPosition(t,n)},e.implementationStaticMethods=function(e){var t=e.constructor,n=Object.keys(t);if(n.length>0)for(var o=function(){if(s){if(a>=i.length)return"break";u=i[a++]}else{if(a=i.next(),a.done)return"break";u=a.value}var n=u;"undefined"==typeof e[n]&&(e[n]=function(){return"object"===("undefined"==typeof console?"undefined":r(console))&&"function"==typeof console.log&&console.log(401,"That method was deprecated and soon will be removed. Please use "+t.name+"."+n+" method."),t[n].apply(t,arguments)})},i=n,s=Array.isArray(i),a=0,i=s?i:i[Symbol.iterator]();;){var u,c=o();if("break"===c)break}},e.stack=function(){var e=new Error;return e&&e.stack&&e.stack.split("\n").slice(5).map(function(e){var t=void 0;return e?(t=/^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/gi.exec(e))?(t[1]&&(t[1]=/([^\/<]+)/gi.exec(t[1]),t[1]&&(t[1]=t[1][0])),{column:t[4]||"",file:t[2]||"",line:t[3]||"",method:t[1]||""}):(t=/^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/gi.exec(e))?{column:t[5]||"",file:t[3]||"",line:t[4]||"",method:t[1]+":"+t[2]||""}:(t=/^(.*)@(.*):([0-9]+):([0-9]+)$/gi.exec(e))?{column:t[4]||"",file:t[2]||"",line:t[3]||"",method:t[1]||""}:(t=/^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/gi.exec(e))?{column:t[4]||"",file:t[2]||"",line:t[3]||"",method:t[1]||""}:(t=/^\s+at\s(.*):([0-9]+):([0-9]+)$/gi.exec(e),t?{column:t[3]||"",file:t[1]||"",line:t[2]||"",method:""}:e):{}})||[]},e.getUID=function(){return Math.random().toString(36).substring(2)},e}();t.default=x,x.Browser=a.default,x.Cookie=c.default,x.DOM=g.default,x.Document=f.default,x.Screen=h.default,x.System=p.default,x.User=v.default,x.Window=S.default,e.exports=x},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getInfo=function(){return{browser:e.getName(),mobile:e.isMobile(),version:e.getVersion()}},e.getName=function(){var t=void 0;return e.isOpera()?t="Opera":e.isOperaNew()?t="Opera":e.isMSIE()?t="Microsoft Internet Explorer":e.isMSIENew()?t="Microsoft Internet Explorer":e.isChrome()?t="Chrome":e.isFirefox()?t="Firefox":e.isSafari()?t="Safari":e.isOther()&&(t=e.getOtherName()),t},e.getVersion=function(){var t=void 0;return e.isOpera()?t=e.getOperaVersion():e.isOperaNew()?t=e.getOperaNewVersion():e.isMSIE()?t=e.getMSIEVersion():e.isMSIENew()?t=e.getMSIENewVersion():e.isChrome()?t=e.getChromeVersion():e.isFirefox()?t=e.getFirefoxVersion():e.isSafari()?t=e.getSafariVersion():e.isOther()&&(t=e.getOtherVersion()),t},e.trimVersion=function(e){for(var t=[";"," ",")"],n=t,o=Array.isArray(n),i=0,n=o?n:n[Symbol.iterator]();;){var r;if(o){if(i>=n.length)break;r=n[i++]}else{if(i=n.next(),i.done)break;r=i.value}var s=r,a=e.indexOf(s);a!==-1&&(e=e.substring(0,a))}return e},e.isMobile=function(){return/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)},e.isOpera=function(){return navigator.userAgent.indexOf("Opera")!==-1},e.getOperaVersion=function(){var t=navigator.userAgent.indexOf("Opera"),n=navigator.userAgent.substring(t+6);return t=navigator.userAgent.indexOf("Version"),t!==-1&&(n=navigator.userAgent.substring(t+8)),e.trimVersion(n)},e.isOperaNew=function(){return navigator.userAgent.indexOf("OPR")!==-1},e.getOperaNewVersion=function(){var t=navigator.userAgent.indexOf("OPR"),n=navigator.userAgent.substring(t+4);return e.trimVersion(n)},e.isMSIE=function(){return navigator.userAgent.indexOf("MSIE")!==-1},e.getMSIEVersion=function(){var t=navigator.userAgent.indexOf("MSIE"),n=navigator.userAgent.substring(t+5);return e.trimVersion(n)},e.isMSIENew=function(){return navigator.userAgent.indexOf("Trident/")!==-1},e.getMSIENewVersion=function(){var t=navigator.userAgent.substring(navigator.userAgent.indexOf("rv:")+3);return e.trimVersion(t)},e.isChrome=function(){return navigator.userAgent.indexOf("Chrome")!==-1},e.getChromeVersion=function(){var t=navigator.userAgent.indexOf("Chrome"),n=navigator.userAgent.substring(t+7);return e.trimVersion(n)},e.isSafari=function(){return navigator.userAgent.indexOf("Safari")!==-1},e.getSafariVersion=function(){var t=navigator.userAgent.indexOf("Safari"),n=navigator.userAgent.substring(t+7);return t=navigator.userAgent.indexOf("Version"),t!==-1&&(n=navigator.userAgent.substring(t+8)),e.trimVersion(n)},e.isFirefox=function(){return navigator.userAgent.indexOf("Firefox")!==-1},e.getFirefoxVersion=function(){var t=navigator.userAgent.indexOf("Firefox"),n=navigator.userAgent.substring(t+8);return e.trimVersion(n)},e.isOther=function(){var e=navigator.userAgent.lastIndexOf(" ")+1,t=navigator.userAgent.lastIndexOf("/");return e<t},e.getOtherName=function(){var e=navigator.userAgent.lastIndexOf(" ")+1,t=navigator.userAgent.lastIndexOf("/"),n=navigator.userAgent.substring(e,t);return n.toLowerCase()===n.toUpperCase()&&(n=navigator.appName),n},e.getOtherVersion=function(){var t=(navigator.userAgent.lastIndexOf(" ")+1,navigator.userAgent.lastIndexOf("/")),n=navigator.userAgent.substring(t+1);return e.trimVersion(n)},e.isSupported=function(){return!e.isMSIE()||parseInt(e.getMSIEVersion(),10)>8},e.isWebKit=function(){return navigator.userAgent.indexOf("AppleWebKit/")!==-1},e.isGecko=function(){return navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")===-1},e.isAndroid=function(){return navigator.userAgent.indexOf("Android")>-1},e.isLinux=function(){return navigator.userAgent.indexOf("Linux")>-1},e.isTabletPC=function(){return navigator.userAgent.indexOf("iPad")>-1},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(){n(this,e)}return e.isSupported=function(){return"object"===("undefined"==typeof document?"undefined":o(document))&&"string"==typeof document.cookie},e.setItem=function(t,n,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:30,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"/",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:location.hostname,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"https:"===location.protocol;try{if(!t||e.isSupported()){var u=new Date;u.setTime(u.getTime()+24*i*60*60*1e3);var c=u.toUTCString();return o=encodeURIComponent(o),document.cookie=n+"="+o+(c?"; expires="+c:"")+(r?"; path="+r:"")+(s?"; domain="+s:"")+(a?"; secure":""),e.getItem(t,n)===o}return!1}catch(e){return!1}},e.getItem=function(t,n){try{if(!t||e.isSupported()){for(var o=document.cookie.split(";"),i=o,r=Array.isArray(i),s=0,i=r?i:i[Symbol.iterator]();;){var a;if(r){if(s>=i.length)break;a=i[s++]}else{if(s=i.next(),s.done)break;a=s.value}var u=a,c=u.trim().split("=",2);if(c[0]===n)return decodeURIComponent(c[1])}return!1}return!1}catch(e){return!1}},e.removeItem=function(t,n){try{return!(t&&!e.isSupported())&&(e.setItem(t,n,"",-1),e.getItem(t,n)===!1)}catch(e){return!1}},e.getKeys=function(t){try{if(!t||e.isSupported()){for(var n=[],o=document.cookie.split(";"),i=o,r=Array.isArray(i),s=0,i=r?i:i[Symbol.iterator]();;){var a;if(r){if(s>=i.length)break;a=i[s++]}else{if(s=i.next(),s.done)break;a=s.value}var u=a,c=u.trim().split("=",2);n.push(c[0])}return n}return[]}catch(e){return[]}},e.clear=function(t){try{if(!t||e.isSupported()){var n=e.getKeys(t);if(n)for(var o=n,i=Array.isArray(o),r=0,o=i?o:o[Symbol.iterator]();;){var s;if(i){if(r>=o.length)break;s=o[r++]}else{if(r=o.next(),r.done)break;s=r.value}var a=s;e.removeItem(t,a)}return 0===e.getKeys(t).length}return!0}catch(e){return!1}},e}();t.default=i},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getHeight=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},e.getWidth=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return Math.max(e.document.body.scrollWidth,e.document.documentElement.scrollWidth,e.document.body.offsetWidth,e.document.documentElement.offsetWidth,e.document.body.clientWidth,e.document.documentElement.clientWidth)},e.getScrollTop=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return e.pageYOffset||e.document.documentElement&&e.document.documentElement.scrollTop||e.document.body&&e.document.body.scrollTop},e.getScrollLeft=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return e.pageXOffset||e.document.documentElement&&e.document.documentElement.scrollLeft||e.document.body&&e.document.body.scrollLeft},e.getScroll=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return{left:e.getScrollLeft(t),top:e.getScrollTop(t)}},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getBoundingClientRect=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];"string"==typeof e&&(e=t.getElementById(e));var o=void 0;n&&(o=getComputedStyle(e),o&&"none"===o.display&&(e.style.display="block"));var i={bottom:0,height:0,left:0,right:0,top:0,width:0};if(e)if(e.getBoundingClientRect)i=e.getBoundingClientRect(),i={bottom:i.bottom,height:i.height||e.clientHeight,left:i.left,right:i.right,top:i.top,width:i.width||e.clientWidth};else{for(var r=e,s={height:r.offsetHeight,width:r.offsetWidth,x:0,y:0};r;)s.x+=r.offsetLeft,s.y+=r.offsetTop,r=r.offsetParent;i={bottom:s.y+s.height,height:s.height,left:s.x,right:s.x+s.width,top:s.y,width:s.width}}return n&&e&&(e.style.display=""),i},e.findElementPosition=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0,o=0;e;){var i=void 0;t&&(i=getComputedStyle(e),i&&"none"===i.display&&(e.style.display="block")),n+=e.offsetLeft,o+=e.offsetTop,e=e.offsetParent,t&&e&&(e.style.display="")}return{top:o,left:n}},e.addEvent=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},e.removeEvent=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},e.hasClassName=function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")!==-1},e.addClassName=function(t,n){if(!e.hasClassName(t,n)){var o=t.className;t.className=o?o+" "+n:n}return t},e.removeClassName=function(e,t){for(var n=e.className.split(" "),o=n.length-1;o>=0;o--)n[o]===t&&n.splice(o,1);return e.className=n.join(" "),e},e.toggleClassName=function(t,n,o){return o?e.addClassName(t,n):e.removeClassName(t,n),t},e.replaceClass=function(t,n,o){return e.removeClassName(t,n),e.addClassName(t,o),t},e.getElementByTagName=function(e,t,n){var o=t||document,i=o.getElementsByTagName(e);return null==n||isNaN(n)?void 0:i[n]},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getInfo=function(){return{availableSize:e.getAvailableSizes(),colorDepth:e.getColorDepth(),pixelRatio:e.getPixelRatio(),size:e.getSizes()}},e.getHeight=function(){return screen.height},e.getWidth=function(){return screen.width},e.getSizes=function(){return{height:e.getHeight(),width:e.getWidth()}},e.getAvailableHeight=function(){return screen.availHeight},e.getAvailableWidth=function(){return screen.availWidth},e.getAvailableSizes=function(){return{height:e.getAvailableHeight(),width:e.getAvailableWidth()}},e.getPixelRatio=function(){var e=1;return"undefined"!=typeof window.screen.systemXDPI&&"undefined"!=typeof window.screen.logicalXDPI&&window.screen.systemXDPI>window.screen.logicalXDPI?e=window.screen.systemXDPI/window.screen.logicalXDPI:"undefined"!=typeof window.devicePixelRatio&&(e=window.devicePixelRatio),e},e.getColorDepth=function(){return screen.colorDepth},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getInfo=function(){return{name:e.getName(),version:e.getVersion()}},e.getName=function(){for(var e="",t=[{r:/(Windows 10.0|Windows NT 10.0)/,s:"Windows 10"},{r:/(Windows 8.1|Windows NT 6.3)/,s:"Windows 8.1"},{r:/(Windows 8|Windows NT 6.2)/,s:"Windows 8"},{r:/(Windows 7|Windows NT 6.1)/,s:"Windows 7"},{r:/Windows NT 6.0/,s:"Windows Vista"},{r:/Windows NT 5.2/,s:"Windows Server 2003"},{r:/(Windows NT 5.1|Windows XP)/,s:"Windows XP"},{r:/(Windows NT 5.0|Windows 2000)/,s:"Windows 2000"},{r:/(Win 9x 4.90|Windows ME)/,s:"Windows ME"},{r:/(Windows 98|Win98)/,s:"Windows 98"},{r:/(Windows 95|Win95|Windows_95)/,s:"Windows 95"},{r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,s:"Windows NT 4.0"},{r:/Windows CE/,s:"Windows CE"},{r:/Win16/,s:"Windows 3.11"},{r:/Android/,s:"Android"},{r:/OpenBSD/,s:"Open BSD"},{r:/SunOS/,s:"Sun OS"},{r:/(Linux|X11)/,s:"Linux"},{r:/(iPhone|iPad|iPod)/,s:"iOS"},{r:/Mac OS X/,s:"Mac OS X"},{r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,s:"Mac OS"},{r:/QNX/,s:"QNX"},{r:/UNIX/,s:"UNIX"},{r:/BeOS/,s:"BeOS"},{r:/OS\/2/,s:"OS/2"},{r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,s:"Search Bot"}],n=t,o=Array.isArray(n),i=0,n=o?n:n[Symbol.iterator]();;){var r;if(o){if(i>=n.length)break;r=n[i++]}else{if(i=n.next(),i.done)break;r=i.value}var s=r;if(s.r.test(navigator.userAgent)){e=s.s;break}}return e},e.getVersion=function(){var t=e.getName(),n="";switch(/Windows/.test(t)&&(n=/Windows (.*)/.exec(t)[1],t="Windows"),t){case"Mac OS X":n=/Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];break;case"Android":n=/Android ([._\d]+)/.exec(navigator.userAgent)[1];break;case"iOS":var o=/OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);n=o[1]+"."+o[2]+"."+(o[3]||0)}return n},e}();t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var r=n(6),s=o(r),a=n(10),u=o(a),c=n(11),d=o(c),f=function(){function e(){i(this,e)}return e.getInfo=function(){return{browser:s.default.getInfo(),screen:u.default.getInfo(),system:d.default.getInfo()}},e}();t.default=f},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(){n(this,e)}return e.getHeight=function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},e.getWidth=function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},e.getSizes=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return{height:e.getHeight(t),width:e.getWidth(t)}},e}();t.default=o}])})},function(e,t){}])});