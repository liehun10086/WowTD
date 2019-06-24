module.exports=function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e,r){const a=r(5),n=r(6),o=function(t,e){return new n(e?16:32).fromInt(t).bytes.map(t=>"0x"+t.toString(16))},d=function(t){return"0x"+t.charCodeAt(0).toString(16)};t.exports=function(){let t=[];return{addString:function(e,r){let a=Buffer.from(e);for(let e=0;e<a.length;e++)t.push("0x"+a[e].toString(16));r&&this.addNullTerminator()},addNewLine:function(){t.push("0x0d"),t.push("0x0a")},addChar:function(e){t.push(d(e))},addInt:function(e,r){o(e,r).forEach(e=>{t.push(e)})},addShort:function(t){this.addInt(t,!0)},addFloat:function(e){let r=new Buffer(4);a.write(r,e,0,!0,23,4),r.forEach(function(e){t.push("0x"+e.toString(16))})},addByte:function(e){t.push("0x"+e.toString(16))},addNullTerminator:function(){t.push("0x0")},getBuffer:()=>new Buffer(t)}}},function(t,e,r){roundTo=r(8),t.exports=function(t){let e=0;return{readInt:function(){let r=t.readInt32LE(e);return e+=4,r},readShort:function(){let r=t.readInt16LE(e);return e+=2,r},readFloat:function(){let r=t.readFloatLE(e);return e+=4,roundTo(r,3)},readString:function(){let r=[];for(;0!==t[e];)r.push(t[e]),e+=1;return e+=1,r.map(t=>String.fromCharCode(t)).join("")},readChars:function(r){let a=[],n=r||1;for(let r=0;r<n;r++)a.push(t[e]),e+=1;return a.map(t=>0===t?"0":String.fromCharCode(t)).join("")},readByte:function(){let r=t[e];return e+=1,r}}}},function(t,e,r){"use strict";const a=r(3),n=r(18),o={abilities:["json/abilities.json","map.w3x/war3map.w3a"],buffs:["json/buffs.json","map.w3x/war3map.w3h"],destructables:["json/destructables.json","map.w3x/war3map.w3b"],doodads:["json/doodads.json","map.w3x/war3map.w3d"],units:["json/units.json","map.w3x/war3map.w3u"]};function d(t,e,r){const o=n.readFileSync(e),d=new a.Objects.jsonToWar(t,JSON.parse(o));n.writeFileSync(r,d.buffer)}!function(){for(var t in o)d(t,o[t][0],o[t][1]);!function(t,e){const r=n.readFileSync(t),o=new a.Strings.jsonToWar(JSON.parse(r));n.writeFileSync(e,o.buffer)}("json/strings.json","map.w3x/war3map.wts")}()},function(t,e,r){const a={Doodads:r(4),Strings:r(9),Terrain:r(10),Units:r(11),Regions:r(12),Cameras:r(13),Sounds:r(14),Objects:r(15),Imports:r(16),Info:r(17)};t.exports=a},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addString("W3do"),a.addInt(8),a.addInt(11),a.addInt(t.length),t.forEach(function(t){a.addString(t.type),a.addInt(t.variation||0),a.addFloat(t.position[0]),a.addFloat(t.position[1]),a.addFloat(t.position[2]),a.addFloat(t.angle||0),t.scale||(t.scale=[1,1,1]),a.addFloat(t.scale[0]||1),a.addFloat(t.scale[1]||1),a.addFloat(t.scale[2]||1);let e=2;t.flags||(t.flags={visible:!0,solid:!0}),t.flags.visible||t.flags.solid?t.flags.visible&&!t.flags.solid?e=1:t.flags.visible&&t.flags.solid&&(e=2):e=0,a.addByte(e),a.addByte(t.life||100),a.addInt(0),a.addInt(0),a.addInt(t.id)}),a.addInt(0),a.addInt(0),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readChars(4),r.readInt(),r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={};t.type=r.readChars(4),t.variation=r.readInt(),t.position=[r.readFloat(),r.readFloat(),r.readFloat()],t.angle=r.readFloat(),t.scale=[r.readFloat(),r.readFloat(),r.readFloat()];let a=r.readByte();t.flags={visible:1===a||2===a,solid:2===a},t.life=r.readByte();r.readInt();let n=r.readInt();for(let t=0;t<n;t++){let t=r.readInt();for(let e=0;e<t;e++)r.readChars(4),r.readInt()}t.id=r.readInt(),e.push(t)}r.readInt();let n=r.readInt();for(let t=0;t<n;t++)r.readChars(4),r.readInt(),r.readInt(),r.readInt();return{errors:[],json:e}}};t.exports=d},function(t,e){e.read=function(t,e,r,a,n){var o,d,i=8*n-a-1,s=(1<<i)-1,l=s>>1,u=-7,f=r?n-1:0,g=r?-1:1,h=t[e+f];for(f+=g,o=h&(1<<-u)-1,h>>=-u,u+=i;u>0;o=256*o+t[e+f],f+=g,u-=8);for(d=o&(1<<-u)-1,o>>=-u,u+=a;u>0;d=256*d+t[e+f],f+=g,u-=8);if(0===o)o=1-l;else{if(o===s)return d?NaN:1/0*(h?-1:1);d+=Math.pow(2,a),o-=l}return(h?-1:1)*d*Math.pow(2,o-a)},e.write=function(t,e,r,a,n,o){var d,i,s,l=8*o-n-1,u=(1<<l)-1,f=u>>1,g=23===n?Math.pow(2,-24)-Math.pow(2,-77):0,h=a?0:o-1,p=a?1:-1,c=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(i=isNaN(e)?1:0,d=u):(d=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-d))<1&&(d--,s*=2),(e+=d+f>=1?g/s:g*Math.pow(2,1-f))*s>=2&&(d++,s/=2),d+f>=u?(i=0,d=u):d+f>=1?(i=(e*s-1)*Math.pow(2,n),d+=f):(i=e*Math.pow(2,f-1)*Math.pow(2,n),d=0));n>=8;t[r+h]=255&i,h+=p,i/=256,n-=8);for(d=d<<n|i,l+=n;l>0;t[r+h]=255&d,h+=p,d/=256,l-=8);t[r+h-p]|=128*c}},function(t,e,r){t.exports=r(7)},function(t,e,r){var a,n;
/**
 * @license IntN.js (c) 2014 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/IntN.js for details
 */
/**
 * @license IntN.js (c) 2014 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/IntN.js for details
 */
n=function(){"use strict";var t={},e=-2147483648,r=[1,256,65536,16777216,4294967296,1099511627776,281474976710656],a="0123456789abcdefghijklmnopqrstuvwxyz",n={compare:["comp"],equals:["eq","equal","=="],notEquals:["ne","notEqual","!="],lessThan:["lt","less","lesser","<"],lessThanEqual:["lte","lessThanOrEqual","<="],greaterThan:["gt","greater",">"],greaterThanEqual:["gte","greaterThanOrEqual",">="],not:["~"],and:["&"],or:["|"],xor:["^"],shiftLeft:["lsh","leftShift","<<"],shiftRight:["rsh","rightShift",">>"],shiftRightUnsigned:["rshu","rightShiftUnsigned",">>>"],add:["plus","+"],negate:["neg","!"],subtract:["sub","minus","-"],absolute:["abs","||"],multiply:["mult","*"],divide:["div","/"],modulo:["mod","%"]};return function(o){if(o<=0||o%8!=0)throw Error("illegal number of bits: "+o+" (not a positive multiple of 8)");if(t[o])return t[o];for(var d=o/8|0,i=d-1,s=new Array(d),l=0;l<d;++l)s[l]=0;var u=new Array(d);for(l=0;l<d;++l)u[l]=255;function f(t,e){this.bytes=new Array(d);for(var r=0,a=Math.min(d,t.length);r<a;++r)this.bytes[r]=255&t[r];for(;r<d;++r)this.bytes[r]=0;this.unsigned=!!e}f.BITS=0|o,f.BYTES=d,f.isIntN=function(t){return!0===(t&&t instanceof f)},f.valueOf=function(t){return"number"==typeof t?f.fromNumber(t):"string"==typeof t?f.fromString(t):f.isIntN(t)?t:t&&"number"==typeof t.low&&"number"==typeof t.high&&"boolean"==typeof t.unsigned?f.fromInts([t.low,t.high],t.unsigned):new f(t.bytes,t.unsigned)},f.prototype.cast=function(t,e){e="boolean"==typeof e?e:this.unsigned;var r=this.isNegative(),a=r?this.not():this;return a=new t(a.bytes,e),r?a.not():a},f.ZERO=new f([],!1),f.UZERO=new f([],!0),f.ONE=new f([1],!1),f.UONE=new f([1],!0),f.MIN_VALUE=new f(s.slice(0,d)),f.MIN_VALUE.bytes[i]|=128,f.MAX_VALUE=new f(u.slice(0,d)),f.MAX_VALUE.bytes[i]&=127,f.MAX_UNSIGNED_VALUE=new f(u.slice(0,d),!0),f.prototype.isSigned=function(){return!this.unsigned},f.prototype.isUnsigned=function(){return this.unsigned},f.prototype.toSigned=function(){return this.unsigned?new f(this.bytes,!1):this},f.prototype.toUnsigned=function(){return this.unsigned?this:new f(this.bytes,!0)},f.prototype.isNegative=function(){return!this.unsigned&&128==(128&this.bytes[i])},f.prototype.isPositive=function(){return this.unsigned||0==(128&this.bytes[i])},f.prototype.isEven=function(){return 0==(1&this.bytes[0])},f.prototype.isOdd=function(){return 1==(1&this.bytes[0])},f.prototype.isZero=function(){for(var t=0;t<d;++t)if(0!==this.bytes[t])return!1;return!0},f.prototype.compare=function(t){f.isIntN(t)||(t=f.valueOf(t));var e=this.isNegative();if(e!==t.isNegative())return e?-1:1;for(var r=i;r>=0;--r){if(this.bytes[r]<t.bytes[r])return-1;if(this.bytes[r]>t.bytes[r])return 1}return 0},f.prototype.equals=function(t){return 0===this.compare(t)},f.prototype.notEquals=function(t){return 0!==this.compare(t)},f.prototype.lessThan=function(t){return-1===this.compare(t)},f.prototype.lessThanEqual=function(t){return this.compare(t)<=0},f.prototype.greaterThan=function(t){return 1===this.compare(t)},f.prototype.greaterThanEqual=function(t){return this.compare(t)>=0},f.fromInt=function(t,r){if((t|=0)<0)return t===e?f.MIN_VALUE:f.fromInt(-t,r).negate();for(var a=s.slice(0,d),n=0;n<d&&0!==t;++n)a[n]=255&t,t>>>=8;return new f(a,r)},f.prototype.toInt=function(t){t="boolean"==typeof t?t:this.unsigned;for(var e=this.isNegative(),r=e?this.not():this,a=0,n=Math.min(4,r.bytes.length),o=0;a<n;++a)o|=r.bytes[a]<<8*a;return e&&(o=~o),t?o>>>0:o},f.fromInts=function(t,e){for(var r,a=f.ZERO,n=0,o=Math.min(t.length,Math.ceil(d/4));n<o;++n)r=t[n],a=a.or(new f([255&r,r>>>8&255,r>>>16&255,r>>>24&255]).shiftLeft(32*n));return e?a.toUnsigned():a},f.prototype.toInts=function(){for(var t,e=Math.ceil(d/4),r=new Array(e),a=0,n=0;a<e;n=4*++a){t=0;for(var o=0,i=Math.min(4,d-n);o<i;++o)t|=this.bytes[n+o]<<8*o;r[a]=t}return r},f.fromNumber=function(t,e){if("number"!=typeof t)throw TypeError("illegal arguments: "+typeof t);if(t!=t||!isFinite(t)||0===t)return e?f.UZERO:f.ZERO;if(t<0)return f.fromNumber(-t,e).negate();for(var r=0,a=new Array(d);r<d;++r)a[r]=t%256&255,t=Math.floor(t/256);return new f(a,e)},f.prototype.toNumber=function(){if(this.isNegative())return this.equals(f.MIN_VALUE)?+e:-this.negate().toNumber();for(var t=0,a=0,n=Math.min(d,7);t<n;++t)a+=this.bytes[t]*r[t];return a},f.prototype.not=function(){for(var t=0,e=new Array(d);t<d;++t)e[t]=~this.bytes[t];return new f(e,this.unsigned)},f.prototype.and=function(t){f.isIntN(t)||(t=f.valueOf(t));for(var e=0,r=new Array(d);e<d;++e)r[e]=this.bytes[e]&t.bytes[e];return new f(r,this.unsigned)},f.prototype.or=function(t){f.isIntN(t)||(t=f.valueOf(t));for(var e=0,r=new Array(d);e<d;++e)r[e]=this.bytes[e]|t.bytes[e];return new f(r,this.unsigned)},f.prototype.xor=function(t){f.isIntN(t)||(t=f.valueOf(t));for(var e=0,r=new Array(d);e<d;++e)r[e]=this.bytes[e]^t.bytes[e];return new f(r,this.unsigned)},f.prototype.shiftLeft=function(t){if(f.isIntN(t)&&(t=t.toInt()),0==(t%=o))return this;t<0&&(t+=o);var e=t/8|0;t%=8;for(var r,a=0,n=s.slice(0,d);a<d&&!((r=a+e)>=d);++a)n[r]|=this.bytes[a]<<t&255,++r<d&&(n[r]|=this.bytes[a]<<t>>>8&255);return new f(n,this.unsigned)},f.prototype.shiftRight=function(t,e){if(f.isIntN(t)&&(t=t.toInt()),0==(t%=o))return this;t<0&&(t+=o);var r=t/8|0;t%=8;var a,n,l=s.slice(0,d);if(!e&&128==(128&this.bytes[i])){var u;for(a=d-1,u=d-r-1;a>=u;--a)l[a]=255;l[++a]=l[a]<<7-t&255}for(a=0;a<d;++a)(n=a-r)>=0&&(l[n]|=this.bytes[a]>>>t&255),--n>=0&&(l[n]|=this.bytes[a]<<8>>>t&255);return new f(l,this.unsigned)},f.prototype.shiftRightUnsigned=function(t){return this.shiftRight(t,!0)},f.prototype.isSet=function(t){return(this.bytes[t/8|0]&(t=1<<t%8))===t},f.prototype.set=function(t,e){if(t>=o||this.isSet(t)==e)return this;var r=this.bytes.slice();return e?r[t/8|0]|=1<<t%8:r[t/8|0]&=255-(1<<t%8),new f(r,this.unsigned)},f.prototype.size=function(){for(var t,e=i,r=1;e>=0;--e)if(0!==(t=this.bytes[e])){for(;t>>=1;)r++;return 8*e+r}return 0},f.add=function(t,e){for(var r,a=t.and(e),n=t.xor(e);!a.isZero();)r=a.shiftLeft(1),a=n.and(r),n=n.xor(r);return n},f.prototype.add=function(t){return f.isIntN(t)||(t=f.valueOf(t)),f.add(this,t)},f.prototype.negate=function(){return f.add(this.not(),f.ONE)},f.NEG_ONE=f.ONE.negate(),f.subtract=function(t,e){return f.add(t,e.negate())},f.prototype.subtract=function(t){return f.isIntN(t)||(t=f.valueOf(t)),f.subtract(this,t)},f.prototype.absolute=function(){return this.unsigned?this:(this.isNegative()?this.negate():this).toUnsigned()},f.multiply=function(t,e){for(var r=t.unsigned?f.UZERO:f.ZERO,a=t.absolute(),n=e.absolute();!n.isZero();)1==(1&n.bytes[0])&&(r=f.add(r,a)),a=a.shiftLeft(1),n=n.shiftRight(1,!0);return t.unsigned||t.isNegative()!==e.isNegative()&&(r=r.negate()),r},f.prototype.multiply=function(t){return f.isIntN(t)||(t=f.valueOf(t)),f.multiply(this,t)},f.divide=function(t,e){if(e.isZero())throw Error("division by zero");t.unsigned&&(e=e.toUnsigned());for(var r=t.absolute(),a=e.absolute(),n=f.UZERO,o=f.UZERO,d=r.size()-1;d>=0;--d)(o=(o=o.shiftLeft(1)).set(0,r.isSet(d))).greaterThanEqual(a)&&(o=f.add(o,a.negate()),n=n.set(d,!0));return t.unsigned||(n=n.toSigned(),o=o.toSigned(),t.isNegative()!==e.isNegative()&&(n=n.negate()),t.isNegative()&&(o=o.negate())),{quotient:n,remainder:o}},f.prototype.divide=function(t){return f.isIntN(t)||(t=f.valueOf(t)),f.divide(this,t).quotient},f.prototype.modulo=function(t){return f.isIntN(t)||(t=f.valueOf(t)),f.divide(this,t).remainder},f.prototype.toDebug=function(t){for(var e,r=i,a="";r>=0;--r){for(e=this.bytes[r].toString(2);e.length<8;)e="0"+e;a+=e,t&&r>0&&(a+=" ")}return this.unsigned&&(a+=t?" U":"U"),a};var g=f.fromInt(2),h=f.fromInt(36);for(var p in f.fromString=function(t,e,r){if("number"==typeof e&&(r=e,e=!1),t=(t+"").toLowerCase(),(r=r||10)<2||r>36)throw RangeError("radix out of range: "+r+" (2-36)");if("-"===t.charAt(0))return f.fromString(t.substring(1),e,r).negate();if("+"===t.charAt(0)&&(t=t.substring(1)),"0"===t||"NaN"===t||"Infinity"===t)return e?f.UZERO:f.ZERO;for(var n,o,d=e?f.UZERO:f.ZERO,i=2===r?function(t){return 1<<t}:Math.pow.bind(Math,r),s=0,l=t.length;s<l;++s){if(n=t.charAt(l-s-1),(o=a.indexOf(n))<0||o>r)throw Error("illegal interior character: "+n);d=f.add(d,f.multiply(f.fromInt(o),f.fromInt(i(s))))}return d},f.prototype.toString=function(t){if(t=t||10,f.isIntN(t)||(t=f.valueOf(t)),t.lessThan(g)||t.greaterThan(h))throw RangeError("radix out of range: "+t.toInt()+" (2-36)");var e=this.unsigned?f.UZERO:f.ZERO;if(this.isNegative()){if(this.equals(f.MIN_VALUE)){var r=f.divide(this,t).quotient,n=f.add(f.multiply(r,t),this.negate());return r.toString(t)+n.toInt().toString(t.toInt())}return"-"+this.negate().toString(t)}var o,d=this.toUnsigned(),i=[];do{o=f.divide(d,t),i.unshift(a.charAt(o.remainder.toInt())),d=f.divide(d,t).quotient}while(!d.equals(e));return i.join("")},f["isInt"+o]=f.isIntN,n)if(n.hasOwnProperty(p)){for(l=0;l<n[p].length;++l)f[p]&&(f[n[p][l]]=f[p]);for(l=0;l<n[p].length;++l)f.prototype[p]&&(f.prototype[n[p][l]]=f.prototype[p])}return t[o]=f}}(),t.exports?t.exports=n:void 0===(a=function(){return n}.call(e,r,e,t))||(t.exports=a)},function(t,e,r){"use strict";function a(t,e,r){if("number"!=typeof e)throw new TypeError("Expected value to be a number");if(!Number.isInteger(r))throw new TypeError("Expected precision to be an integer");const a="round"===t&&e<0;a&&(e=Math.abs(e));let[n,o]=`${e}e`.split("e"),d=Math[t](`${n}e${Number(o)+r}`);return[n,o]=`${d}e`.split("e"),d=Number(`${n}e${Number(o)-r}`),a&&(d=-d),d}t.exports=a.bind(null,"round"),t.exports.up=a.bind(null,"ceil"),t.exports.down=a.bind(null,"floor")},function(t,e,r){let a,n=r(0);const o={jsonToWar:function(t){return a=new n,Object.keys(t).forEach(function(e){a.addString("STRING "+e),a.addNewLine(),a.addString("{"),a.addNewLine(),a.addString(t[e]),a.addNewLine(),a.addString("}"),a.addNewLine(),a.addNewLine()}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e,r=t.toString().replace(/\r\n/g,"\n"),a=new RegExp("STRING ([0-9]+)\n?(?:.*\n)?{\n((?:.|\n)*?)\n}","g"),n={};for(;null!==(e=a.exec(r));){let t=e[1],r=e[2];n[t]=r}return{errors:[],json:n}}};t.exports=o},function(t,e,r){let a=r(0),n=r(1);const o={jsonToWar:function(t){let e=new a;e.addString("W3E!"),e.addInt(11),e.addChar(t.tileset),e.addInt(+t.customtileset),e.addInt(t.tilepalette.length),t.tilepalette.forEach(function(t){e.addString(t)}),e.addInt(t.clifftilepalette.length),t.clifftilepalette.forEach(function(t){e.addString(t)}),e.addInt(t.map.width+1),e.addInt(t.map.height+1),e.addFloat(t.map.offset.x),e.addFloat(t.map.offset.y);for(let r=t.tiles.length-1;r>=0;r--)for(let a=0;a<t.tiles[r].length;a++){let n=t.tiles[r][a],o=n.boundaryFlag?16384:0;e.addShort(n.groundHeight),e.addShort(n.waterHeight|o),e.addByte(n.flags|n.groundTexture),e.addByte(n.groundVariation|n.cliffVariation),e.addByte(n.cliffTexture|n.layerHeight)}return{errors:[],buffer:e.getBuffer()}},warToJson:function(t){let e={},r=new n(t),a=(r.readChars(4),r.readInt(),r.readChars(1)),o=1===r.readInt();e.tileset=a,e.customtileset=o;let d=r.readInt(),i=[];for(let t=0;t<d;t++)i.push(r.readChars(4));e.tilepalette=i;let s=r.readInt(),l=[];for(let t=0;t<s;t++){let t=r.readChars(4);l.push(t)}e.clifftilepalette=l;let u=r.readInt()-1,f=r.readInt()-1;e.map={width:u,height:f};let g=r.readFloat(),h=r.readFloat();e.map.offset={x:g,y:h},e.tiles=[];for(let t=0;t<f+1;t++){let t=[];for(let e=0;e<u+1;e++){let e=r.readShort(),a=r.readShort(),n=r.readByte(),o=r.readByte(),d=r.readByte(),i=32767&a,s=16384==(16384&a),l=240&n,u=15&n,f=248&o,g=7&o,h=240&d,p=15&d;t.push({groundHeight:e,waterHeight:i,boundaryFlag:s,flags:l,groundTexture:u,groundVariation:f,cliffVariation:g,cliffTexture:h,layerHeight:p})}e.tiles.unshift(t)}return{errors:[],json:e}}};t.exports=o},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addString("W3do"),a.addInt(8),a.addInt(11),a.addInt(t.length),t.forEach(function(t){a.addString(t.type),a.addInt(t.variation||0),a.addFloat(t.position[0]),a.addFloat(t.position[1]),a.addFloat(t.position[2]),a.addFloat(t.rotation||0),t.scale||(t.scale=[1,1,1]),a.addFloat(t.scale[0]||1),a.addFloat(t.scale[1]||1),a.addFloat(t.scale[2]||1),a.addByte(0),a.addInt(t.player),a.addByte(0),a.addByte(0),a.addInt(t.hitpoints),a.addInt(t.mana||0),a.addInt(-1),a.addInt(0),a.addInt("ngol"===t.type?t.gold:0),a.addFloat(t.targetAcquisition||0),t.hero||(t.hero={level:1,str:1,agi:1,int:1}),a.addInt(t.hero.level||1),a.addInt(t.hero.str||1),a.addInt(t.hero.agi||1),a.addInt(t.hero.int||1),t.inventory||(t.inventory=[]),a.addInt(t.inventory.length),t.inventory.forEach(function(t){a.addInt(t.slot-1),a.addString(t.type)}),t.abilities||(t.abilities=[]),a.addInt(t.abilities.length),t.abilities.forEach(function(t){a.addString(t.ability),a.addInt(+t.active),a.addInt(t.level)}),a.addInt(0),a.addInt(1),a.addInt(t.color||t.player),a.addInt(0),a.addInt(t.id)}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readChars(4),r.readInt(),r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={hero:{},inventory:[],abilities:[]};t.type=r.readChars(4),t.variation=r.readInt(),t.position=[r.readFloat(),r.readFloat(),r.readFloat()],t.rotation=r.readFloat(),t.scale=[r.readFloat(),r.readFloat(),r.readFloat()];r.readByte();t.player=r.readInt(),r.readByte(),r.readByte(),t.hitpoints=r.readInt(),t.mana=r.readInt();r.readInt();let a=r.readInt();for(let t=0;t<a;t++){let t=r.readInt();for(let e=0;e<t;e++)r.readChars(4),r.readInt()}t.gold=r.readInt(),t.targetAcquisition=r.readFloat(),t.hero={level:r.readInt(),str:r.readInt(),agi:r.readInt(),int:r.readInt()};let n=r.readInt();for(let e=0;e<n;e++)t.inventory.push({slot:r.readInt()+1,type:r.readChars(4)});let o=r.readInt();for(let e=0;e<o;e++)t.abilities.push({ability:r.readChars(4),active:!!r.readInt(),level:r.readInt()});let d=r.readInt();if(0===d)r.readByte(),r.readByte(),r.readByte(),r.readByte();else if(1===d)r.readInt(),r.readInt();else if(2===d){let t=r.readInt();for(let e=0;e<t;e++)r.readChars(4),r.readInt()}t.color=r.readInt(),r.readInt(),t.id=r.readInt(),e.push(t)}return{errors:[],json:e}}};t.exports=d},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addInt(5),a.addInt(t.length),t.forEach(function(t){a.addFloat(t.position.left),a.addFloat(t.position.bottom),a.addFloat(t.position.right),a.addFloat(t.position.top),a.addString(t.name),a.addNullTerminator(),a.addInt(t.id),t.weatherEffect?a.addString(t.weatherEffect):(a.addByte(0),a.addByte(0),a.addByte(0),a.addByte(0)),a.addString(t.ambientSound||""),a.addNullTerminator(),t.color&&0!==t.color.length?(a.addByte(t.color[2]||0),a.addByte(t.color[1]||0),a.addByte(t.color[0]||255)):(a.addByte(255),a.addByte(0),a.addByte(0)),a.addByte(255)}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={position:{}};t.position.left=r.readFloat(),t.position.bottom=r.readFloat(),t.position.right=r.readFloat(),t.position.top=r.readFloat(),t.name=r.readString(),t.id=r.readInt(),t.weatherEffect=r.readChars(4),t.ambientSound=r.readString(),t.color=[r.readByte(),r.readByte(),r.readByte()],t.color.reverse(),r.readByte(),e.push(t)}return{errors:[],json:e}}};t.exports=d},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addInt(0),a.addInt(t.length),t.forEach(function(t){a.addFloat(t.target.x),a.addFloat(t.target.y),a.addFloat(t.offsetZ),a.addFloat(t.rotation||0),a.addFloat(t.aoa),a.addFloat(t.distance),a.addFloat(t.roll||0),a.addFloat(t.fov),a.addFloat(t.farClipping),a.addFloat(100),a.addString(t.name),a.addNullTerminator()}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={target:{}};t.target.x=r.readFloat(),t.target.y=r.readFloat(),t.offsetZ=r.readFloat(),t.rotation=r.readFloat(),t.aoa=r.readFloat(),t.distance=r.readFloat(),t.roll=r.readFloat(),t.fov=r.readFloat(),t.farClipping=r.readFloat(),r.readFloat(),t.name=r.readString(),e.push(t)}return{errors:[],json:e}}};t.exports=d},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addInt(1),a.addInt(t.length),t.forEach(function(t){a.addString(t.name),a.addNullTerminator(),a.addString(t.path),a.addNullTerminator(),a.addString(t.eax||"DefaultEAXON"),a.addNullTerminator();let e=0;t.flags&&(t.flags.looping&&(e|=1),t.flags["3dSound"]&&(e|=2),t.flags.stopOutOfRange&&(e|=4),t.flags.music&&(e|=8)),a.addInt(e),a.addInt(t.fadeRate&&t.fadeRate.in||10),a.addInt(t.fadeRate&&t.fadeRate.out||10),a.addInt(t.volume||-1),a.addFloat(t.pitch||1),a.addFloat(0),a.addInt(8),a.addInt(t.channel||0),a.addFloat(t.distance.min),a.addFloat(t.distance.max),a.addFloat(t.distance.cutoff),a.addFloat(0),a.addFloat(0),a.addFloat(127),a.addFloat(0),a.addFloat(0),a.addFloat(0)}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={flags:{},fadeRate:{},distance:{}};t.name=r.readString(),t.path=r.readString(),t.eax=r.readString();let a=r.readInt();t.flags={looping:!!(1&a),"3dSound":!!(2&a),stopOutOfRange:!!(4&a),music:!!(8&a)},t.fadeRate={in:r.readInt(),out:r.readInt()},t.volume=r.readInt(),t.pitch=r.readFloat(),r.readFloat(),r.readInt(),t.channel=r.readInt(),t.distance={min:r.readFloat(),max:r.readFloat(),cutoff:r.readFloat()},r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),e.push(t)}return{errors:[],json:e}}};t.exports=d},function(t,e,r){let a,n=r(0),o=r(1),d={int:0,real:1,unreal:2,string:3,0:"int",1:"real",2:"unreal",3:"string"};const i={jsonToWar:function(t,e){function r(e,r){Object.keys(r).forEach(function(n){let o=r[n];"original"===e?(a.addString(n),a.addByte(0),a.addByte(0),a.addByte(0),a.addByte(0)):(a.addString(n.substring(5,9)),a.addString(n.substring(0,4))),a.addInt(o.length),o.forEach(function(r){let o;a.addString(r.id),r.type?o=d[r.type]:"number"==typeof r.value?o=d.int:"string"==typeof r.value&&(o=d.string),a.addInt(o),"doodads"!==t&&"abilities"!==t&&"upgrades"!==t||(a.addInt(r.level||r.variation||0),a.addInt(r.column||0)),o===d.int?a.addInt(r.value):o===d.real||o===d.unreal?a.addFloat(r.value):o===d.string&&(a.addString(r.value),a.addNullTerminator()),"original"===e?a.addString(n):(a.addByte(0),a.addByte(0),a.addByte(0),a.addByte(0))})})}return(a=new n).addInt(2),a.addInt(Object.keys(e.original).length),r("original",e.original),a.addInt(Object.keys(e.custom).length),r("custom",e.custom),{errors:[],buffer:a.getBuffer()}},warToJson:function(t,e){let r={original:{},custom:{}},a=new o(e);a.readInt();function n(e){let n=a.readInt();for(let o=0;o<n;o++){let n=[],o=a.readChars(4),i=a.readChars(4),s=a.readInt();for(let r=0;r<s;r++){let r={};r.id=a.readChars(4),r.type=d[a.readInt()],"doodads"!==t&&"abilities"!==t&&"upgrades"!==t||(r.level=a.readInt(),r.column=a.readInt()),"int"===r.type?r.value=a.readInt():"real"===r.type||"unreal"===r.type?r.value=a.readFloat():r.value=a.readString(),e?a.readInt():a.readChars(4),n.push(r)}e?r.original[o]=n:r.custom[i+":"+o]=n}}return n(!0),n(!1),{errors:[],json:r}}};t.exports=i},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){return(a=new n).addInt(1),a.addInt(t.length),t.forEach(function(t){a.addByte("custom"===t.type?13:5),t.path.startsWith("war3mapImported\\")||"custom"!==t.type||(t.path="war3mapImported\\"+t.path),a.addString(t.path),a.addNullTerminator()}),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e=[],r=new o(t),a=(r.readInt(),r.readInt());for(let t=0;t<a;t++){let t={type:{0:"standard",5:"standard",8:"standard",10:"custom",13:"custom"}[r.readByte()],path:r.readString()};e.push(t)}return{errors:[],json:e}}};t.exports=d},function(t,e,r){let a,n=r(0),o=r(1);const d={jsonToWar:function(t){(a=new n).addInt(25),a.addInt(t.saves||0),a.addInt(t.editorVersion||0),a.addString(t.map.name,!0),a.addString(t.map.author,!0),a.addString(t.map.description,!0),a.addString(t.map.recommendedPlayers,!0);for(let e=0;e<8;e++)a.addFloat(t.camera.bounds[e]);for(let e=0;e<4;e++)a.addInt(t.camera.complements[e]);a.addInt(t.map.playableArea.width),a.addInt(t.map.playableArea.height);let e=0;return t.map.flags&&(t.map.flags.hideMinimapInPreview&&(e|=1),t.map.flags.modifyAllyPriorities&&(e|=2),t.map.flags.isMeleeMap&&(e|=4),t.map.flags.maskedPartiallyVisible&&(e|=16),t.map.flags.fixedPlayerSetting&&(e|=32),t.map.flags.useCustomForces&&(e|=64),t.map.flags.useCustomTechtree&&(e|=128),t.map.flags.useCustomAbilities&&(e|=256),t.map.flags.useCustomUpgrades&&(e|=512),t.map.flags.waterWavesOnCliffShores&&(e|=2048),t.map.flags.waterWavesOnRollingShores&&(e|=4096)),e|=32768,e|=16384,e|=1024,a.addInt(e),a.addChar(t.map.mainTileType),a.addInt(t.loadingScreen.background),a.addString(t.loadingScreen.path,!0),a.addString(t.loadingScreen.text,!0),a.addString(t.loadingScreen.title,!0),a.addString(t.loadingScreen.subtitle,!0),a.addInt(0),a.addString(t.prologue.path,!0),a.addString(t.prologue.text,!0),a.addString(t.prologue.title,!0),a.addString(t.prologue.subtitle,!0),a.addInt(t.fog.type),a.addFloat(t.fog.startHeight),a.addFloat(t.fog.endHeight),a.addFloat(t.fog.density),a.addByte(t.fog.color[0]),a.addByte(t.fog.color[1]),a.addByte(t.fog.color[2]),a.addByte(255),t.globalWeather&&"none"!==t.globalWeather.toLowerCase()?a.addString(t.globalWeather,!1):a.addInt(0),a.addString(t.customSoundEnvironment||"",!0),a.addChar(t.customLightEnv||"L"),a.addByte(t.water[0]),a.addByte(t.water[1]),a.addByte(t.water[2]),a.addByte(255),a.addInt(t.players.length),t.players.forEach(t=>{a.addInt(t.playerNum),a.addInt(t.type),a.addInt(t.race),a.addInt(t.startingPos.fixed?1:0),a.addString(t.name,!0),a.addFloat(t.startingPos.x),a.addFloat(t.startingPos.y),a.addInt(0),a.addInt(0)}),a.addInt(t.forces.length),t.forces.forEach(t=>{let e=0;t.flags.allied&&(e|=1),t.flags.alliedVictory&&(e|=2),t.flags.shareVision&&(e|=4),t.flags.shareUnitControl&&(e|=16),t.flags.shareAdvUnitControl&&(e|=32),a.addInt(e),a.addByte(255),a.addByte(255),a.addByte(255),a.addByte(255),a.addString(t.name,!0)}),a.addInt(0),a.addInt(0),a.addInt(0),a.addInt(0),{errors:[],buffer:a.getBuffer()}},warToJson:function(t){let e={map:{},loadingScreen:{},prologue:{},fog:{},camera:{},players:[],forces:[]},r=new o(t),a=(r.readInt(),r.readInt()),n=r.readInt();e.saves=a,e.editorVersion=n,e.map.name=r.readString(),e.map.author=r.readString(),e.map.description=r.readString(),e.map.recommendedPlayers=r.readString(),e.camera.bounds=[r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat(),r.readFloat()],e.camera.complements=[r.readInt(),r.readInt(),r.readInt(),r.readInt()],e.map.playableArea={width:r.readInt(),height:r.readInt()};let d=r.readInt();e.map.flags={hideMinimapInPreview:!!(1&d),modifyAllyPriorities:!!(2&d),isMeleeMap:!!(4&d),maskedPartiallyVisible:!!(16&d),fixedPlayerSetting:!!(32&d),useCustomForces:!!(64&d),useCustomTechtree:!!(128&d),useCustomAbilities:!!(256&d),useCustomUpgrades:!!(512&d),waterWavesOnCliffShores:!!(2048&d),waterWavesOnRollingShores:!!(4096&d)},e.map.mainTileType=r.readChars(),e.loadingScreen.background=r.readInt(),e.loadingScreen.path=r.readString(),e.loadingScreen.text=r.readString(),e.loadingScreen.title=r.readString(),e.loadingScreen.subtitle=r.readString();r.readInt();e.prologue={path:r.readString(),text:r.readString(),title:r.readString(),subtitle:r.readString()},e.fog={type:r.readInt(),startHeight:r.readFloat(),endHeight:r.readFloat(),density:r.readFloat(),color:[r.readByte(),r.readByte(),r.readByte(),r.readByte()]},e.globalWeather=r.readChars(4),e.customSoundEnvironment=r.readString(),e.customLightEnv=r.readChars(),e.water=[r.readByte(),r.readByte(),r.readByte(),r.readByte()];let i=r.readInt();for(let t=0;t<i;t++){let t={};t.playerNum=r.readInt(),t.type=r.readInt(),t.race=r.readInt(),r.readInt(),t.name=r.readString(),t.startingPos={x:r.readFloat(),y:r.readFloat()},r.readInt(),r.readInt(),e.players.push(t)}let s=r.readInt();for(let t=0;t<s;t++){let t={},a=r.readInt();t.flags={allied:!!(1&a),alliedVictory:!!(2&a),shareVision:!!(8&a),shareUnitControl:!!(16&a),shareAdvUnitControl:!!(32&a)},t.players=r.readInt(),t.name=r.readString(),e.forces.push(t)}let l=r.readInt();for(let t=0;t<l;t++)r.readInt(),r.readChars(4),r.readInt(),r.readInt();let u=r.readInt();for(let t=0;t<u;t++)r.readInt(),r.readChars(4);let f=r.readInt();for(let t=0;t<f;t++){r.readInt(),r.readString();let t=r.readInt();for(let e=0;e<t;e++){r.readInt();let t=r.readInt();for(let e=0;e<t;e++)r.readInt(),r.readChar()}}let g=r.readInt();for(let t=0;t<g;t++){r.readInt(),r.readString();let t=r.readInt();for(let e=0;e<t;e++){let t=r.readInt();for(let e=0;e<t;e++)r.readInt(),r.readChars(4)}}return{errors:[],json:e}}};t.exports=d},function(t,e){t.exports=require("fs")}]);
//# sourceMappingURL=extension.js.map