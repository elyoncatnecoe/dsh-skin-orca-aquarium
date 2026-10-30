/**
 * Source of the built Client half. `scripts/build-client.mjs` inlines
 * lib/vendor/orca-embed.js at the vendor marker and writes lib/client.js, which
 * is the artifact `./client` exports. Edit this file, then run `npm run build`.
 *
 * Layout of the skin, bottom to top:
 *
 *   1. the sea    — a fixed layer behind the app (z-index -1), click-through, sharp
 *   2. the plates — sidebar and bottom row only, frosted, like the reference UI
 *   3. the app    — text, cards, composer, fully interactive on top
 *
 * No blur anywhere, and that is load-bearing rather than aesthetic: the plates
 * are .88–.94 opaque, so there is nothing left to frost, and `backdrop-filter`
 * also makes an element the containing block for `position: fixed` descendants.
 * The sidebar and bottom row both contain fixed descendants (ui-primitives'
 * Tooltip), so frosting them re-anchored tooltips to the column's padding box
 * instead of the viewport and clipped them under its `overflow: hidden`.
 *
 * Palette is token-level, in two schemes, and both are *measured* from the
 * reference frames rather than eyeballed:
 *
 *   night  — the ink-blue of the 逆水寒 night UI in shots\夜间参考1.png,
 *            c3.png and c5.png. The water column there samples at 216–220° hue
 *            and 0.36–0.47 saturation, and the row plates are the same family:
 *            #445c84 / #4c648c, with the chips at #344464 (on) and #455d7b
 *            (off). So the skin's base and layer surfaces sit on those measured
 *            colours rather than on a near-black wash — which is what made the
 *            old night skin read as "dark grey app" instead of "ink-blue app".
 *            Text is pale blue-white (#eaf3fb); the accent is the reference's
 *            own cyan glow, #5b9bc1.
 *   day    — the pale-cyan lagoon of shots\日间参考1.png: cards at 190–195° hue
 *            and 0.10–0.15 saturation, i.e. #c3d6db..#cfe7ed, with chips at
 *            #b1d5e1. Text is deep blue-violet (#1d3348); the accent is the
 *            deeper teal of its rail circles, #2f7d99.
 *
 * Only base surfaces go translucent; popovers stay dense so a menu is still read,
 * not looked through.
 *
 * The entry registers in the frame-wide `shell.overlay` list slot, so the slot
 * system owns activation, collapse and unload of everything below.
 */
window.__ModuleLoader__.load({
  id: '@local/orca-aquarium-backdrop',
  factory(require) {
    'use strict';

    const React = require('react');

        // ---- vendored orca-aquarium embed: lib/vendor/orca-embed.js ----
    (function () {
var Qv=Object.defineProperty;var t_=(si,Ne,Be)=>Ne in si?Qv(si,Ne,{enumerable:!0,configurable:!0,writable:!0,value:Be}):si[Ne]=Be;var Tt=(si,Ne,Be)=>t_(si,typeof Ne!="symbol"?Ne+"":Ne,Be);(function(){"use strict";/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ne={ROTATE:0,DOLLY:1,PAN:2},Be={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},dh=0,Ho=1,fh=2,Vo=1,ph=2,Hi=3,ri=0,Ge=1,ae=2,bn=0,oi=1,zn=2,Wo=3,Xo=4,mh=5,ai=100,gh=101,xh=102,Yo=103,qo=104,vh=200,_h=201,yh=202,bh=203,jo=204,Zo=205,Mh=206,wh=207,Sh=208,Th=209,Eh=210,Ch=0,Ah=1,Ph=2,mr=3,Lh=4,Rh=5,Dh=6,Ih=7,$o=0,Fh=1,Oh=2,hn=0,zh=1,Nh=2,kh=3,Uh=4,Bh=5,Jo=300,li=301,ci=302,gr=303,xr=304,ms=306,vr=1e3,je=1001,_r=1002,Ce=1003,Ko=1004,Qo=1005,He=1006,Gh=1007,gs=1008,Nn=1009,Hh=1010,Vh=1011,ta=1012,Wh=1013,kn=1014,Un=1015,hi=1016,Xh=1017,Yh=1018,ui=1020,qh=1021,jh=1022,Ke=1023,Zh=1024,$h=1025,Bn=1026,di=1027,Jh=1028,Kh=1029,ea=1030,Qh=1031,tu=1033,yr=33776,br=33777,Mr=33778,wr=33779,na=35840,ia=35841,sa=35842,ra=35843,eu=36196,oa=37492,aa=37496,la=37808,ca=37809,ha=37810,ua=37811,da=37812,fa=37813,pa=37814,ma=37815,ga=37816,xa=37817,va=37818,_a=37819,ya=37820,ba=37821,Ma=36492,Gn=3e3,ie=3001,nu=3200,iu=3201,su=0,ru=1,sn="srgb",Vi="srgb-linear",Sr=7680,ou=519,Tr=35044,Er=35048,wa="300 es",Cr=1035;class Hn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sa=1234567;const Wi=Math.PI/180,xs=180/Math.PI;function rn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[s&255]+Ae[s>>8&255]+Ae[s>>16&255]+Ae[s>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function ye(s,t,e){return Math.max(t,Math.min(e,s))}function Ar(s,t){return(s%t+t)%t}function au(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function lu(s,t,e){return s!==t?(e-s)/(t-s):0}function Xi(s,t,e){return(1-e)*s+e*t}function cu(s,t,e,n){return Xi(s,t,1-Math.exp(-e*n))}function hu(s,t=1){return t-Math.abs(Ar(s,t*2)-t)}function uu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function du(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function fu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function pu(s,t){return s+Math.random()*(t-s)}function mu(s){return s*(.5-Math.random())}function gu(s){s!==void 0&&(Sa=s);let t=Sa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xu(s){return s*Wi}function vu(s){return s*xs}function Pr(s){return(s&s-1)===0&&s!==0}function _u(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function vs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function yu(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*m,o*c);break;case"YXY":s.set(l*m,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function un(s,t){switch(t.constructor){case Float32Array:return s;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ee(s,t){switch(t.constructor){case Float32Array:return s;case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ta=Object.freeze({__proto__:null,DEG2RAD:Wi,RAD2DEG:xs,generateUUID:rn,clamp:ye,euclideanModulo:Ar,mapLinear:au,inverseLerp:lu,lerp:Xi,damp:cu,pingpong:hu,smoothstep:uu,smootherstep:du,randInt:fu,randFloat:pu,randFloatSpread:mu,seededRandom:gu,degToRad:xu,radToDeg:vu,isPowerOfTwo:Pr,ceilPowerOfTwo:_u,floorPowerOfTwo:vs,setQuaternionFromProperEuler:yu,normalize:ee,denormalize:un});class rt{constructor(t=0,e=0){rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],p=i[0],d=i[3],_=i[6],x=i[1],v=i[4],b=i[7],y=i[2],w=i[5],A=i[8];return r[0]=a*p+o*x+l*y,r[3]=a*d+o*v+l*w,r[6]=a*_+o*b+l*A,r[1]=c*p+h*x+u*y,r[4]=c*d+h*v+u*w,r[7]=c*_+h*b+u*A,r[2]=f*p+m*x+g*y,r[5]=f*d+m*v+g*w,r[8]=f*_+m*b+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,m=c*r-a*l,g=e*u+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/g;return t[0]=u*p,t[1]=(i*c-h*n)*p,t[2]=(o*n-i*a)*p,t[3]=f*p,t[4]=(h*e-i*l)*p,t[5]=(i*r-o*e)*p,t[6]=m*p,t[7]=(n*l-c*e)*p,t[8]=(a*e-n*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Lr.makeScale(t,e)),this}rotate(t){return this.premultiply(Lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lr.makeTranslation(t,e)),this}makeTranslation(t,e){return this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lr=new Ve;function Ea(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function _s(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ys(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Rr={[sn]:{[Vi]:Vn},[Vi]:{[sn]:ys}},De={legacyMode:!0,get workingColorSpace(){return Vi},set workingColorSpace(s){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(s,t,e){if(this.legacyMode||t===e||!t||!e)return s;if(Rr[t]&&Rr[t][e]!==void 0){const n=Rr[t][e];return s.r=n(s.r),s.g=n(s.g),s.b=n(s.b),s}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)}},Ca={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ge={r:0,g:0,b:0},Qe={h:0,s:0,l:0},bs={h:0,s:0,l:0};function Dr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}function Ms(s,t){return t.r=s.r,t.g=s.g,t.b=s.b,t}class gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,De.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=De.workingColorSpace){return this.r=t,this.g=e,this.b=n,De.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=De.workingColorSpace){if(t=Ar(t,1),e=ye(e,0,1),n=ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Dr(a,r,t+1/3),this.g=Dr(a,r,t),this.b=Dr(a,r,t-1/3)}return De.toWorkingColorSpace(this,i),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,De.toWorkingColorSpace(this,e),n(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,De.toWorkingColorSpace(this,e),n(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(r[1])/360,c=parseFloat(r[2])/100,h=parseFloat(r[3])/100;return n(r[4]),this.setHSL(l,c,h,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,De.toWorkingColorSpace(this,e),this;if(a===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,De.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=sn){const n=Ca[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return De.fromWorkingColorSpace(Ms(this,ge),t),ye(ge.r*255,0,255)<<16^ye(ge.g*255,0,255)<<8^ye(ge.b*255,0,255)<<0}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=De.workingColorSpace){De.fromWorkingColorSpace(Ms(this,ge),e);const n=ge.r,i=ge.g,r=ge.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=De.workingColorSpace){return De.fromWorkingColorSpace(Ms(this,ge),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=sn){return De.fromWorkingColorSpace(Ms(this,ge),t),t!==sn?`color(${t} ${ge.r} ${ge.g} ${ge.b})`:`rgb(${ge.r*255|0},${ge.g*255|0},${ge.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Qe),Qe.h+=t,Qe.s+=e,Qe.l+=n,this.setHSL(Qe.h,Qe.s,Qe.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qe),t.getHSL(bs);const n=Xi(Qe.h,bs.h,e),i=Xi(Qe.s,bs.s,e),r=Xi(Qe.l,bs.l,e);return this.setHSL(n,i,r),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}gt.NAMES=Ca;let fi;class Aa{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{fi===void 0&&(fi=_s("canvas")),fi.width=t.width,fi.height=t.height;const n=fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){const e=_s("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Vn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class Pa{constructor(t=null){this.isSource=!0,this.uuid=rn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ir(i[a].image)):r.push(Ir(i[a]))}else r=Ir(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ir(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?Aa.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bu=0;class Ie extends Hn{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=je,i=je,r=He,a=gs,o=Ke,l=Nn,c=Ie.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=rn(),this.name="",this.source=new Pa(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vr:t.x=t.x-Math.floor(t.x);break;case je:t.x=t.x<0?0:1;break;case _r:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vr:t.y=t.y-Math.floor(t.y);break;case je:t.y=t.y<0?0:1;break;case _r:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}Ie.DEFAULT_IMAGE=null,Ie.DEFAULT_MAPPING=Jo,Ie.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,n=0,i=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],p=l[2],d=l[6],_=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-p)<.01&&Math.abs(g-d)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+p)<.1&&Math.abs(g+d)<.1&&Math.abs(c+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,b=(m+1)/2,y=(_+1)/2,w=(h+f)/4,A=(u+p)/4,M=(g+d)/4;return v>b&&v>y?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=w/n,r=A/n):b>y?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=w/i,r=M/i):y<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(y),n=A/r,i=M/r),this.set(n,i,r,e),this}let x=Math.sqrt((d-g)*(d-g)+(u-p)*(u-p)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(d-g)/x,this.y=(u-p)/x,this.z=(f-h)/x,this.w=Math.acos((c+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tn extends Hn{constructor(t=1,e=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new Ie(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:He,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class La extends Ie{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=je,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mu extends Ie{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=je,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=r[a+0],m=r[a+1],g=r[a+2],p=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=p;return}if(u!==p||l!==f||c!==m||h!==g){let d=1-o;const _=l*f+c*m+h*g+u*p,x=_>=0?1:-1,v=1-_*_;if(v>Number.EPSILON){const y=Math.sqrt(v),w=Math.atan2(y,_*x);d=Math.sin(d*w)/y,o=Math.sin(o*w)/y}const b=o*x;if(l=l*d+f*b,c=c*d+m*b,h=h*d+g*b,u=u*d+p*b,d===1-o){const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*m-c*f,t[e+1]=l*g+h*f+c*u-o*m,t[e+2]=c*g+h*m+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),m=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-i)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-c)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*r+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,n=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ra.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ra.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=l*e+a*i-o*n,h=l*n+o*e-r*i,u=l*i+r*n-a*e,f=-r*e-a*n-o*i;return this.x=c*l+f*-r+h*-o-u*-a,this.y=h*l+f*-a+u*-r-c*-o,this.z=u*l+f*-o+c*-a-h*-r,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fr.copy(this).projectOnVector(t),this.sub(Fr)}reflect(t){return this.sub(Fr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fr=new E,Ra=new Mn;class Yi{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.length;l<c;l+=3){const h=t[l],u=t[l+1],f=t[l+2];h<e&&(e=h),u<n&&(n=u),f<i&&(i=f),h>r&&(r=h),u>a&&(a=u),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(r,a,o),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.count;l<c;l++){const h=t.getX(l),u=t.getY(l),f=t.getZ(l);h<e&&(e=h),u<n&&(n=u),f<i&&(i=f),h>r&&(r=h),u>a&&(a=u),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(r,a,o),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){const r=n.attributes.position;for(let a=0,o=r.count;a<o;a++)Wn.fromBufferAttribute(r,a).applyMatrix4(t.matrixWorld),this.expandByPoint(Wn)}else n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox),Or.applyMatrix4(t.matrixWorld),this.union(Or);const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Wn),Wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qi),ws.subVectors(this.max,qi),pi.subVectors(t.a,qi),mi.subVectors(t.b,qi),gi.subVectors(t.c,qi),wn.subVectors(mi,pi),Sn.subVectors(gi,mi),Xn.subVectors(pi,gi);let e=[0,-wn.z,wn.y,0,-Sn.z,Sn.y,0,-Xn.z,Xn.y,wn.z,0,-wn.x,Sn.z,0,-Sn.x,Xn.z,0,-Xn.x,-wn.y,wn.x,0,-Sn.y,Sn.x,0,-Xn.y,Xn.x,0];return!zr(e,pi,mi,gi,ws)||(e=[1,0,0,0,1,0,0,0,1],!zr(e,pi,mi,gi,ws))?!1:(Ss.crossVectors(wn,Sn),e=[Ss.x,Ss.y,Ss.z],zr(e,pi,mi,gi,ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Wn.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(Wn).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new E,new E,new E,new E,new E,new E,new E,new E],Wn=new E,Or=new Yi,pi=new E,mi=new E,gi=new E,wn=new E,Sn=new E,Xn=new E,qi=new E,ws=new E,Ss=new E,Yn=new E;function zr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Yn.fromArray(s,r);const o=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),l=t.dot(Yn),c=e.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const wu=new Yi,ji=new E,Nr=new E;class Ts{constructor(t=new E,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ji.subVectors(t,this.center);const e=ji.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ji,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Nr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ji.copy(t.center).add(Nr)),this.expandByPoint(ji.copy(t.center).sub(Nr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new E,kr=new E,Es=new E,Tn=new E,Ur=new E,Cs=new E,Br=new E;class Gr{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.direction).multiplyScalar(e).add(this.origin),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){kr.copy(t).add(e).multiplyScalar(.5),Es.copy(e).sub(t).normalize(),Tn.copy(this.origin).sub(kr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Es),o=Tn.dot(this.direction),l=-Tn.dot(Es),c=Tn.lengthSq(),h=Math.abs(1-a*a);let u,f,m,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const p=1/h;u*=p,f*=p,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(Es).multiplyScalar(f).add(kr),m}intersectSphere(t,e){fn.subVectors(t.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return o<0&&l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,i,r){Ur.subVectors(e,t),Cs.subVectors(n,t),Br.crossVectors(Ur,Cs);let a=this.direction.dot(Br),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,t);const l=o*this.direction.dot(Cs.crossVectors(Tn,Cs));if(l<0)return null;const c=o*this.direction.dot(Ur.cross(Tn));if(c<0||l+c>a)return null;const h=-o*Tn.dot(Br);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,r,a,o,l,c,h,u,f,m,g,p,d){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=r,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=f,_[3]=m,_[7]=g,_[11]=p,_[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/xi.setFromMatrixColumn(t,0).length(),r=1/xi.setFromMatrixColumn(t,1).length(),a=1/xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*u,g=o*h,p=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=f-p*c,e[9]=-o*l,e[2]=p-f*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*u,g=c*h,p=c*u;e[0]=f+p*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=p+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*u,g=c*h,p=c*u;e[0]=f-p*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=p-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*u,g=o*h,p=o*u;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+p,e[1]=l*u,e[5]=p*c+f,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,g=o*l,p=o*c;e[0]=l*h,e[4]=p-f*u,e[8]=g*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*u+g,e[10]=f-p*u}else if(t.order==="XZY"){const f=a*l,m=a*c,g=o*l,p=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+p,e[5]=a*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*h,e[10]=p*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Su,t,Tu)}lookAt(t,e,n){const i=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),En.crossVectors(n,We),En.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),En.crossVectors(n,We)),En.normalize(),As.crossVectors(We,En),i[0]=En.x,i[4]=As.x,i[8]=We.x,i[1]=En.y,i[5]=As.y,i[9]=We.y,i[2]=En.z,i[6]=As.z,i[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],p=n[6],d=n[10],_=n[14],x=n[3],v=n[7],b=n[11],y=n[15],w=i[0],A=i[4],M=i[8],T=i[12],R=i[1],V=i[5],K=i[9],H=i[13],O=i[2],F=i[6],Y=i[10],tt=i[14],j=i[3],I=i[7],z=i[11],N=i[15];return r[0]=a*w+o*R+l*O+c*j,r[4]=a*A+o*V+l*F+c*I,r[8]=a*M+o*K+l*Y+c*z,r[12]=a*T+o*H+l*tt+c*N,r[1]=h*w+u*R+f*O+m*j,r[5]=h*A+u*V+f*F+m*I,r[9]=h*M+u*K+f*Y+m*z,r[13]=h*T+u*H+f*tt+m*N,r[2]=g*w+p*R+d*O+_*j,r[6]=g*A+p*V+d*F+_*I,r[10]=g*M+p*K+d*Y+_*z,r[14]=g*T+p*H+d*tt+_*N,r[3]=x*w+v*R+b*O+y*j,r[7]=x*A+v*V+b*F+y*I,r[11]=x*M+v*K+b*Y+y*z,r[15]=x*T+v*H+b*tt+y*N,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],g=t[3],p=t[7],d=t[11],_=t[15];return g*(+r*l*u-i*c*u-r*o*f+n*c*f+i*o*m-n*l*m)+p*(+e*l*m-e*c*f+r*a*f-i*a*m+i*c*h-r*l*h)+d*(+e*c*u-e*o*m-r*a*u+n*a*m+r*o*h-n*c*h)+_*(-i*o*h-e*l*u+e*o*f+i*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],g=t[12],p=t[13],d=t[14],_=t[15],x=u*d*c-p*f*c+p*l*m-o*d*m-u*l*_+o*f*_,v=g*f*c-h*d*c-g*l*m+a*d*m+h*l*_-a*f*_,b=h*p*c-g*u*c+g*o*m-a*p*m-h*o*_+a*u*_,y=g*u*l-h*p*l-g*o*f+a*p*f+h*o*d-a*u*d,w=e*x+n*v+i*b+r*y;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=x*A,t[1]=(p*f*r-u*d*r-p*i*m+n*d*m+u*i*_-n*f*_)*A,t[2]=(o*d*r-p*l*r+p*i*c-n*d*c-o*i*_+n*l*_)*A,t[3]=(u*l*r-o*f*r-u*i*c+n*f*c+o*i*m-n*l*m)*A,t[4]=v*A,t[5]=(h*d*r-g*f*r+g*i*m-e*d*m-h*i*_+e*f*_)*A,t[6]=(g*l*r-a*d*r-g*i*c+e*d*c+a*i*_-e*l*_)*A,t[7]=(a*f*r-h*l*r+h*i*c-e*f*c-a*i*m+e*l*m)*A,t[8]=b*A,t[9]=(g*u*r-h*p*r-g*n*m+e*p*m+h*n*_-e*u*_)*A,t[10]=(a*p*r-g*o*r+g*n*c-e*p*c-a*n*_+e*o*_)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*m-e*o*m)*A,t[12]=y*A,t[13]=(h*p*i-g*u*i+g*n*f-e*p*f-h*n*d+e*u*d)*A,t[14]=(g*o*i-a*p*i-g*n*l+e*p*l+a*n*d-e*o*d)*A,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,m=r*h,g=r*u,p=a*h,d=a*u,_=o*u,x=l*c,v=l*h,b=l*u,y=n.x,w=n.y,A=n.z;return i[0]=(1-(p+_))*y,i[1]=(m+b)*y,i[2]=(g-v)*y,i[3]=0,i[4]=(m-b)*w,i[5]=(1-(f+_))*w,i[6]=(d+x)*w,i[7]=0,i[8]=(g+v)*A,i[9]=(d-x)*A,i[10]=(1-(f+p))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=xi.set(i[0],i[1],i[2]).length();const a=xi.set(i[4],i[5],i[6]).length(),o=xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],en.copy(this);const c=1/r,h=1/a,u=1/o;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,e.setFromRotationMatrix(en),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a){const o=this.elements,l=2*r/(e-t),c=2*r/(n-i),h=(e+t)/(e-t),u=(n+i)/(n-i),f=-(a+r)/(a-r),m=-2*a*r/(a-r);return o[0]=l,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=u,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=m,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,i,r,a){const o=this.elements,l=1/(e-t),c=1/(n-i),h=1/(a-r),u=(e+t)*l,f=(n+i)*c,m=(a+r)*h;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-u,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-m,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const xi=new E,en=new Qt,Su=new E(0,0,0),Tu=new E(1,1,1),En=new E,As=new E,We=new E,Da=new Qt,Ia=new Mn;class vi{constructor(t=0,e=0,n=0,i=vi.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Da.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Da,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ia.setFromEuler(this),this.setFromQuaternion(Ia,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}vi.DefaultOrder="XYZ",vi.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Hr{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Eu=0;const Fa=new E,_i=new Mn,pn=new Qt,Ps=new E,Zi=new E,Cu=new E,Au=new Mn,Oa=new E(1,0,0),za=new E(0,1,0),Na=new E(0,0,1),Pu={type:"added"},ka={type:"removed"};class be extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DefaultUp.clone();const t=new E,e=new vi,n=new Mn,i=new E(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Ve}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=be.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=be.DefaultMatrixWorldAutoUpdate,this.layers=new Hr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis(Oa,t)}rotateY(t){return this.rotateOnAxis(za,t)}rotateZ(t){return this.rotateOnAxis(Na,t)}translateOnAxis(t,e){return Fa.copy(t).applyQuaternion(this.quaternion),this.position.add(Fa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Oa,t)}translateY(t){return this.translateOnAxis(za,t)}translateZ(t){return this.translateOnAxis(Na,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ps.copy(t):Ps.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Zi,Ps,this.up):pn.lookAt(Ps,Zi,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),_i.setFromRotationMatrix(pn),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Pu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ka)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(ka)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,t,Cu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,Au,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}be.DefaultUp=new E(0,1,0),be.DefaultMatrixAutoUpdate=!0,be.DefaultMatrixWorldAutoUpdate=!0;const nn=new E,mn=new E,Vr=new E,gn=new E,yi=new E,bi=new E,Ua=new E,Wr=new E,Xr=new E,Yr=new E;class on{constructor(t=new E,e=new E,n=new E){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),nn.subVectors(t,e),i.cross(nn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){nn.subVectors(i,e),mn.subVectors(n,e),Vr.subVectors(t,e);const a=nn.dot(nn),o=nn.dot(mn),l=nn.dot(Vr),c=mn.dot(mn),h=mn.dot(Vr),u=a*c-o*o;if(u===0)return r.set(-2,-1,-1);const f=1/u,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,gn),l.set(0,0),l.addScaledVector(r,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l}static isFrontFacing(t,e,n,i){return nn.subVectors(n,e),mn.subVectors(t,e),nn.cross(mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),nn.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return on.getUV(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;yi.subVectors(i,n),bi.subVectors(r,n),Wr.subVectors(t,n);const l=yi.dot(Wr),c=bi.dot(Wr);if(l<=0&&c<=0)return e.copy(n);Xr.subVectors(t,i);const h=yi.dot(Xr),u=bi.dot(Xr);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(yi,a);Yr.subVectors(t,r);const m=yi.dot(Yr),g=bi.dot(Yr);if(g>=0&&m<=g)return e.copy(r);const p=m*c-l*g;if(p<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(bi,o);const d=h*g-m*u;if(d<=0&&u-h>=0&&m-g>=0)return Ua.subVectors(r,i),o=(u-h)/(u-h+(m-g)),e.copy(i).addScaledVector(Ua,o);const _=1/(d+p+f);return a=p*_,o=f*_,e.copy(n).addScaledVector(yi,a).addScaledVector(bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let Lu=0;class Mi extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=rn(),this.name="",this.type="Material",this.blending=oi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=jo,this.blendDst=Zo,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sr,this.stencilZFail=Sr,this.stencilZPass=Sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}const i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==oi&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class re extends Mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new E,Ls=new rt;class ne{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=Tr,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tr&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Ba extends ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ga extends ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Nt extends ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ru=0;const Ze=new Qt,qr=new be,wi=new E,Xe=new Yi,$i=new Yi,Me=new E;class Kt extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=rn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ea(t)?Ga:Ba)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return qr.lookAt(t),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Nt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new E,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Xe.min,$i.min),Xe.expandByPoint(Me),Me.addVectors(Xe.max,$i.max),Xe.expandByPoint(Me)):(Xe.expandByPoint($i.min),Xe.expandByPoint($i.max))}Xe.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(wi.fromBufferAttribute(t,c),Me.add(wi)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,a=e.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ne(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let R=0;R<o;R++)c[R]=new E,h[R]=new E;const u=new E,f=new E,m=new E,g=new rt,p=new rt,d=new rt,_=new E,x=new E;function v(R,V,K){u.fromArray(i,R*3),f.fromArray(i,V*3),m.fromArray(i,K*3),g.fromArray(a,R*2),p.fromArray(a,V*2),d.fromArray(a,K*2),f.sub(u),m.sub(u),p.sub(g),d.sub(g);const H=1/(p.x*d.y-d.x*p.y);isFinite(H)&&(_.copy(f).multiplyScalar(d.y).addScaledVector(m,-p.y).multiplyScalar(H),x.copy(m).multiplyScalar(p.x).addScaledVector(f,-d.x).multiplyScalar(H),c[R].add(_),c[V].add(_),c[K].add(_),h[R].add(x),h[V].add(x),h[K].add(x))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let R=0,V=b.length;R<V;++R){const K=b[R],H=K.start,O=K.count;for(let F=H,Y=H+O;F<Y;F+=3)v(n[F+0],n[F+1],n[F+2])}const y=new E,w=new E,A=new E,M=new E;function T(R){A.fromArray(r,R*3),M.copy(A);const V=c[R];y.copy(V),y.sub(A.multiplyScalar(A.dot(V))).normalize(),w.crossVectors(M,V);const H=w.dot(h[R])<0?-1:1;l[R*4]=y.x,l[R*4+1]=y.y,l[R*4+2]=y.z,l[R*4+3]=H}for(let R=0,V=b.length;R<V;++R){const K=b[R],H=K.start,O=K.count;for(let F=H,Y=H+O;F<Y;F+=3)T(n[F+0]),T(n[F+1]),T(n[F+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const i=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,u=new E;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),p=t.getX(f+1),d=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,p),a.fromBufferAttribute(e,d),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,d),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let p=0,d=l.length;p<d;p++){o.isInterleavedBufferAttribute?m=l[p]*o.data.stride+o.offset:m=l[p]*h;for(let _=0;_<h;_++)f[g++]=c[m++]}return new ne(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Kt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=t(f,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ha=new Qt,Si=new Gr,jr=new Ts,Cn=new E,An=new E,Pn=new E,Zr=new E,$r=new E,Jr=new E,Rs=new E,Ds=new E,Is=new E,Fs=new rt,Os=new rt,zs=new rt,Kr=new E,Ns=new E;class mt extends be{constructor(t=new Kt,e=new re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(r),t.ray.intersectsSphere(jr)===!1)||(Ha.copy(r).invert(),Si.copy(t.ray).applyMatrix4(Ha),n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,u=n.attributes.uv,f=n.attributes.uv2,m=n.groups,g=n.drawRange;if(o!==null)if(Array.isArray(i))for(let p=0,d=m.length;p<d;p++){const _=m[p],x=i[_.materialIndex],v=Math.max(_.start,g.start),b=Math.min(o.count,Math.min(_.start+_.count,g.start+g.count));for(let y=v,w=b;y<w;y+=3){const A=o.getX(y),M=o.getX(y+1),T=o.getX(y+2);a=ks(this,x,t,Si,l,c,h,u,f,A,M,T),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const p=Math.max(0,g.start),d=Math.min(o.count,g.start+g.count);for(let _=p,x=d;_<x;_+=3){const v=o.getX(_),b=o.getX(_+1),y=o.getX(_+2);a=ks(this,i,t,Si,l,c,h,u,f,v,b,y),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(i))for(let p=0,d=m.length;p<d;p++){const _=m[p],x=i[_.materialIndex],v=Math.max(_.start,g.start),b=Math.min(l.count,Math.min(_.start+_.count,g.start+g.count));for(let y=v,w=b;y<w;y+=3){const A=y,M=y+1,T=y+2;a=ks(this,x,t,Si,l,c,h,u,f,A,M,T),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const p=Math.max(0,g.start),d=Math.min(l.count,g.start+g.count);for(let _=p,x=d;_<x;_+=3){const v=_,b=_+1,y=_+2;a=ks(this,i,t,Si,l,c,h,u,f,v,b,y),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}}}function Du(s,t,e,n,i,r,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side!==ae,o),l===null)return null;Ns.copy(o),Ns.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ns);return c<e.near||c>e.far?null:{distance:c,point:Ns.clone(),object:s}}function ks(s,t,e,n,i,r,a,o,l,c,h,u){Cn.fromBufferAttribute(i,c),An.fromBufferAttribute(i,h),Pn.fromBufferAttribute(i,u);const f=s.morphTargetInfluences;if(r&&f){Rs.set(0,0,0),Ds.set(0,0,0),Is.set(0,0,0);for(let g=0,p=r.length;g<p;g++){const d=f[g],_=r[g];d!==0&&(Zr.fromBufferAttribute(_,c),$r.fromBufferAttribute(_,h),Jr.fromBufferAttribute(_,u),a?(Rs.addScaledVector(Zr,d),Ds.addScaledVector($r,d),Is.addScaledVector(Jr,d)):(Rs.addScaledVector(Zr.sub(Cn),d),Ds.addScaledVector($r.sub(An),d),Is.addScaledVector(Jr.sub(Pn),d)))}Cn.add(Rs),An.add(Ds),Pn.add(Is)}s.isSkinnedMesh&&(s.boneTransform(c,Cn),s.boneTransform(h,An),s.boneTransform(u,Pn));const m=Du(s,t,e,n,Cn,An,Pn,Kr);if(m){o&&(Fs.fromBufferAttribute(o,c),Os.fromBufferAttribute(o,h),zs.fromBufferAttribute(o,u),m.uv=on.getUV(Kr,Cn,An,Pn,Fs,Os,zs,new rt)),l&&(Fs.fromBufferAttribute(l,c),Os.fromBufferAttribute(l,h),zs.fromBufferAttribute(l,u),m.uv2=on.getUV(Kr,Cn,An,Pn,Fs,Os,zs,new rt));const g={a:c,b:h,c:u,normal:new E,materialIndex:0};on.getNormal(Cn,An,Pn,g.normal),m.face=g}return m}class xe extends Kt{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Nt(c,3)),this.setAttribute("normal",new Nt(h,3)),this.setAttribute("uv",new Nt(u,2));function g(p,d,_,x,v,b,y,w,A,M,T){const R=b/A,V=y/M,K=b/2,H=y/2,O=w/2,F=A+1,Y=M+1;let tt=0,j=0;const I=new E;for(let z=0;z<Y;z++){const N=z*V-H;for(let k=0;k<F;k++){const et=k*R-K;I[p]=et*x,I[d]=N*v,I[_]=O,c.push(I.x,I.y,I.z),I[p]=0,I[d]=0,I[_]=w>0?1:-1,h.push(I.x,I.y,I.z),u.push(k/A),u.push(1-z/M),tt+=1}}for(let z=0;z<M;z++)for(let N=0;N<A;N++){const k=f+N+F*z,et=f+N+F*(z+1),J=f+(N+1)+F*(z+1),at=f+(N+1)+F*z;l.push(k,et,at),l.push(et,J,at),j+=6}o.addGroup(m,j,T),m+=j,f+=tt}}static fromJSON(t){return new xe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ti(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Fe(s){const t={};for(let e=0;e<s.length;e++){const n=Ti(s[e]);for(const i in n)t[i]=n[i]}return t}function Iu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Va(s){return s.getRenderTarget()===null&&s.outputEncoding===ie?sn:Vi}const Us={clone:Ti,merge:Fe};var Fu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ou=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class de extends Mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fu,this.fragmentShader=Ou,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ti(t.uniforms),this.uniformsGroups=Iu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Wa extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $e extends Wa{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(Wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ei=-90,Ci=1;class zu extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new $e(Ei,Ci,t,e);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const r=new $e(Ei,Ci,t,e);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(-1,0,0),this.add(r);const a=new $e(Ei,Ci,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new $e(Ei,Ci,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new $e(Ei,Ci,t,e);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new $e(Ei,Ci,t,e);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,a,o,l,c]=this.children,h=t.getRenderTarget(),u=t.toneMapping,f=t.xr.enabled;t.toneMapping=hn,t.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,r),t.setRenderTarget(n,2),t.render(e,a),t.setRenderTarget(n,3),t.render(e,o),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(h),t.toneMapping=u,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Xa extends Ie{constructor(t,e,n,i,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:li,super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nu extends tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Xa(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:He}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new xe(5,5,5),r=new de({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:bn});r.uniforms.tEquirect.value=e;const a=new mt(i,r),o=e.minFilter;return e.minFilter===gs&&(e.minFilter=He),new zu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Qr=new E,ku=new E,Uu=new Ve;class Ln{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Qr.subVectors(n,e).cross(ku.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){const n=t.delta(Qr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(n).multiplyScalar(r).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Uu.getNormalMatrix(t),i=this.coplanarPoint(Qr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new Ts,Bs=new E;class Ya{constructor(t=new Ln,e=new Ln,n=new Ln,i=new Ln,r=new Ln,a=new Ln){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],r=n[1],a=n[2],o=n[3],l=n[4],c=n[5],h=n[6],u=n[7],f=n[8],m=n[9],g=n[10],p=n[11],d=n[12],_=n[13],x=n[14],v=n[15];return e[0].setComponents(o-i,u-l,p-f,v-d).normalize(),e[1].setComponents(o+i,u+l,p+f,v+d).normalize(),e[2].setComponents(o+r,u+c,p+m,v+_).normalize(),e[3].setComponents(o-r,u-c,p-m,v-_).normalize(),e[4].setComponents(o-a,u-h,p-g,v-x).normalize(),e[5].setComponents(o+a,u+h,p+g,v+x).normalize(),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSprite(t){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Bs.x=i.normal.x>0?t.max.x:t.min.x,Bs.y=i.normal.y>0?t.max.y:t.min.y,Bs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qa(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Bu(s,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,f=c.usage,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,u,f),c.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,u){const f=h.array,m=h.updateRange;s.bindBuffer(u,c),m.count===-1?s.bufferSubData(u,0,f):(e?s.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):s.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(r(u.buffer,c,h),u.version=c.version)}return{get:a,remove:o,update:l}}class xn extends Kt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,m=[],g=[],p=[],d=[];for(let _=0;_<h;_++){const x=_*f-a;for(let v=0;v<c;v++){const b=v*u-r;g.push(b,-x,0),p.push(0,0,1),d.push(v/o),d.push(1-_/l)}}for(let _=0;_<l;_++)for(let x=0;x<o;x++){const v=x+c*_,b=x+c*(_+1),y=x+1+c*(_+1),w=x+1+c*_;m.push(v,b,w),m.push(b,y,w)}this.setIndex(m),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(p,3)),this.setAttribute("uv",new Nt(d,2))}static fromJSON(t){return new xn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Gu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Hu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qu="vec3 transformed = vec3( position );",ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zu=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,$u=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ju=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,od=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,ad=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ld=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",pd=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,md=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Md=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Td=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ld=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Rd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,zd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nd=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Bd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Vd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$d=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Kd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Qd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,ef=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,lf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,df=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,yf=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bf=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Mf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Tf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ef=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Af=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,If=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Ff=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Of=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,zf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Nf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,kf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bt={alphamap_fragment:Gu,alphamap_pars_fragment:Hu,alphatest_fragment:Vu,alphatest_pars_fragment:Wu,aomap_fragment:Xu,aomap_pars_fragment:Yu,begin_vertex:qu,beginnormal_vertex:ju,bsdfs:Zu,iridescence_fragment:$u,bumpmap_pars_fragment:Ju,clipping_planes_fragment:Ku,clipping_planes_pars_fragment:Qu,clipping_planes_pars_vertex:td,clipping_planes_vertex:ed,color_fragment:nd,color_pars_fragment:id,color_pars_vertex:sd,color_vertex:rd,common:od,cube_uv_reflection_fragment:ad,defaultnormal_vertex:ld,displacementmap_pars_vertex:cd,displacementmap_vertex:hd,emissivemap_fragment:ud,emissivemap_pars_fragment:dd,encodings_fragment:fd,encodings_pars_fragment:pd,envmap_fragment:md,envmap_common_pars_fragment:gd,envmap_pars_fragment:xd,envmap_pars_vertex:vd,envmap_physical_pars_fragment:Ld,envmap_vertex:_d,fog_vertex:yd,fog_pars_vertex:bd,fog_fragment:Md,fog_pars_fragment:wd,gradientmap_pars_fragment:Sd,lightmap_fragment:Td,lightmap_pars_fragment:Ed,lights_lambert_fragment:Cd,lights_lambert_pars_fragment:Ad,lights_pars_begin:Pd,lights_toon_fragment:Rd,lights_toon_pars_fragment:Dd,lights_phong_fragment:Id,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:zd,lights_fragment_begin:Nd,lights_fragment_maps:kd,lights_fragment_end:Ud,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:Hd,logdepthbuf_vertex:Vd,map_fragment:Wd,map_pars_fragment:Xd,map_particle_fragment:Yd,map_particle_pars_fragment:qd,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Zd,morphcolor_vertex:$d,morphnormal_vertex:Jd,morphtarget_pars_vertex:Kd,morphtarget_vertex:Qd,normal_fragment_begin:tf,normal_fragment_maps:ef,normal_pars_fragment:nf,normal_pars_vertex:sf,normal_vertex:rf,normalmap_pars_fragment:of,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:lf,clearcoat_pars_fragment:cf,iridescence_pars_fragment:hf,output_fragment:uf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:pf,dithering_fragment:mf,dithering_pars_fragment:gf,roughnessmap_fragment:xf,roughnessmap_pars_fragment:vf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:yf,shadowmap_vertex:bf,shadowmask_pars_fragment:Mf,skinbase_vertex:wf,skinning_pars_vertex:Sf,skinning_vertex:Tf,skinnormal_vertex:Ef,specularmap_fragment:Cf,specularmap_pars_fragment:Af,tonemapping_fragment:Pf,tonemapping_pars_fragment:Lf,transmission_fragment:Rf,transmission_pars_fragment:Df,uv_pars_fragment:If,uv_pars_vertex:Ff,uv_vertex:Of,uv2_pars_fragment:zf,uv2_pars_vertex:Nf,uv2_vertex:kf,worldpos_vertex:Uf,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,depth_vert:`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`},xt={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Ve},uv2Transform:{value:new Ve},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ve}}},an={basic:{uniforms:Fe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Fe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new gt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Fe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Fe([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Fe([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new gt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Fe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Fe([xt.points,xt.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Fe([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Fe([xt.common,xt.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Fe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Fe([xt.sprite,xt.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Fe([xt.common,xt.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Fe([xt.lights,xt.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};an.physical={uniforms:Fe([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new rt(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const Gs={r:0,b:0,g:0};function Bf(s,t,e,n,i,r,a){const o=new gt(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function g(d,_){let x=!1,v=_.isScene===!0?_.background:null;v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v));const b=s.xr,y=b.getSession&&b.getSession();y&&y.environmentBlendMode==="additive"&&(v=null),v===null?p(o,l):v&&v.isColor&&(p(v,1),x=!0),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ms)?(h===void 0&&(h=new mt(new xe(1,1,1),new de({name:"BackgroundCubeMaterial",uniforms:Ti(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,(u!==v||f!==v.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,m=s.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new mt(new xn(2,2),new de({name:"BackgroundMaterial",uniforms:Ti(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,m=s.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function p(d,_){d.getRGB(Gs,Va(s)),n.buffers.color.setClear(Gs.r,Gs.g,Gs.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(d,_=1){o.set(d),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,p(o,l)},render:g}}function Gf(s,t,e,n){const i=s.getParameter(34921),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=d(null);let c=l,h=!1;function u(O,F,Y,tt,j){let I=!1;if(a){const z=p(tt,Y,F);c!==z&&(c=z,m(c.object)),I=_(O,tt,Y,j),I&&x(O,tt,Y,j)}else{const z=F.wireframe===!0;(c.geometry!==tt.id||c.program!==Y.id||c.wireframe!==z)&&(c.geometry=tt.id,c.program=Y.id,c.wireframe=z,I=!0)}j!==null&&e.update(j,34963),(I||h)&&(h=!1,M(O,F,Y,tt),j!==null&&s.bindBuffer(34963,e.get(j).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function m(O){return n.isWebGL2?s.bindVertexArray(O):r.bindVertexArrayOES(O)}function g(O){return n.isWebGL2?s.deleteVertexArray(O):r.deleteVertexArrayOES(O)}function p(O,F,Y){const tt=Y.wireframe===!0;let j=o[O.id];j===void 0&&(j={},o[O.id]=j);let I=j[F.id];I===void 0&&(I={},j[F.id]=I);let z=I[tt];return z===void 0&&(z=d(f()),I[tt]=z),z}function d(O){const F=[],Y=[],tt=[];for(let j=0;j<i;j++)F[j]=0,Y[j]=0,tt[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Y,attributeDivisors:tt,object:O,attributes:{},index:null}}function _(O,F,Y,tt){const j=c.attributes,I=F.attributes;let z=0;const N=Y.getAttributes();for(const k in N)if(N[k].location>=0){const J=j[k];let at=I[k];if(at===void 0&&(k==="instanceMatrix"&&O.instanceMatrix&&(at=O.instanceMatrix),k==="instanceColor"&&O.instanceColor&&(at=O.instanceColor)),J===void 0||J.attribute!==at||at&&J.data!==at.data)return!0;z++}return c.attributesNum!==z||c.index!==tt}function x(O,F,Y,tt){const j={},I=F.attributes;let z=0;const N=Y.getAttributes();for(const k in N)if(N[k].location>=0){let J=I[k];J===void 0&&(k==="instanceMatrix"&&O.instanceMatrix&&(J=O.instanceMatrix),k==="instanceColor"&&O.instanceColor&&(J=O.instanceColor));const at={};at.attribute=J,J&&J.data&&(at.data=J.data),j[k]=at,z++}c.attributes=j,c.attributesNum=z,c.index=tt}function v(){const O=c.newAttributes;for(let F=0,Y=O.length;F<Y;F++)O[F]=0}function b(O){y(O,0)}function y(O,F){const Y=c.newAttributes,tt=c.enabledAttributes,j=c.attributeDivisors;Y[O]=1,tt[O]===0&&(s.enableVertexAttribArray(O),tt[O]=1),j[O]!==F&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](O,F),j[O]=F)}function w(){const O=c.newAttributes,F=c.enabledAttributes;for(let Y=0,tt=F.length;Y<tt;Y++)F[Y]!==O[Y]&&(s.disableVertexAttribArray(Y),F[Y]=0)}function A(O,F,Y,tt,j,I){n.isWebGL2===!0&&(Y===5124||Y===5125)?s.vertexAttribIPointer(O,F,Y,j,I):s.vertexAttribPointer(O,F,Y,tt,j,I)}function M(O,F,Y,tt){if(n.isWebGL2===!1&&(O.isInstancedMesh||tt.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const j=tt.attributes,I=Y.getAttributes(),z=F.defaultAttributeValues;for(const N in I){const k=I[N];if(k.location>=0){let et=j[N];if(et===void 0&&(N==="instanceMatrix"&&O.instanceMatrix&&(et=O.instanceMatrix),N==="instanceColor"&&O.instanceColor&&(et=O.instanceColor)),et!==void 0){const J=et.normalized,at=et.itemSize,Z=e.get(et);if(Z===void 0)continue;const At=Z.buffer,vt=Z.type,Et=Z.bytesPerElement;if(et.isInterleavedBufferAttribute){const ut=et.data,Ft=ut.stride,nt=et.offset;if(ut.isInstancedInterleavedBuffer){for(let it=0;it<k.locationSize;it++)y(k.location+it,ut.meshPerAttribute);O.isInstancedMesh!==!0&&tt._maxInstanceCount===void 0&&(tt._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let it=0;it<k.locationSize;it++)b(k.location+it);s.bindBuffer(34962,At);for(let it=0;it<k.locationSize;it++)A(k.location+it,at/k.locationSize,vt,J,Ft*Et,(nt+at/k.locationSize*it)*Et)}else{if(et.isInstancedBufferAttribute){for(let ut=0;ut<k.locationSize;ut++)y(k.location+ut,et.meshPerAttribute);O.isInstancedMesh!==!0&&tt._maxInstanceCount===void 0&&(tt._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let ut=0;ut<k.locationSize;ut++)b(k.location+ut);s.bindBuffer(34962,At);for(let ut=0;ut<k.locationSize;ut++)A(k.location+ut,at/k.locationSize,vt,J,at*Et,at/k.locationSize*ut*Et)}}else if(z!==void 0){const J=z[N];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(k.location,J);break;case 3:s.vertexAttrib3fv(k.location,J);break;case 4:s.vertexAttrib4fv(k.location,J);break;default:s.vertexAttrib1fv(k.location,J)}}}}w()}function T(){K();for(const O in o){const F=o[O];for(const Y in F){const tt=F[Y];for(const j in tt)g(tt[j].object),delete tt[j];delete F[Y]}delete o[O]}}function R(O){if(o[O.id]===void 0)return;const F=o[O.id];for(const Y in F){const tt=F[Y];for(const j in tt)g(tt[j].object),delete tt[j];delete F[Y]}delete o[O.id]}function V(O){for(const F in o){const Y=o[F];if(Y[O.id]===void 0)continue;const tt=Y[O.id];for(const j in tt)g(tt[j].object),delete tt[j];delete Y[O.id]}}function K(){H(),h=!0,c!==l&&(c=l,m(c.object))}function H(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:K,resetDefaultState:H,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfProgram:V,initAttributes:v,enableAttribute:b,disableUnusedAttributes:w}}function Hf(s,t,e,n){const i=n.isWebGL2;let r;function a(c){r=c}function o(c,h){s.drawArrays(r,c,h),e.update(h,r,1)}function l(c,h,u){if(u===0)return;let f,m;if(i)f=s,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](r,c,h,u),e.update(h,r,u)}this.setMode=a,this.render=o,this.renderInstances=l}function Vf(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext!="undefined"&&s instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext!="undefined"&&s instanceof WebGL2ComputeRenderingContext;let o=e.precision!==void 0?e.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=s.getParameter(34930),f=s.getParameter(35660),m=s.getParameter(3379),g=s.getParameter(34076),p=s.getParameter(34921),d=s.getParameter(36347),_=s.getParameter(36348),x=s.getParameter(36349),v=f>0,b=a||t.has("OES_texture_float"),y=v&&b,w=a?s.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:d,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:y,maxSamples:w}}function Wf(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Ln,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f,m){const g=u.length!==0||f||n!==0||i;return i=f,e=h(u,m,0),n=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1,c()},this.setState=function(u,f,m){const g=u.clippingPlanes,p=u.clipIntersection,d=u.clipShadows,_=s.get(u);if(!i||g===null||g.length===0||r&&!d)r?h(null):c();else{const x=r?0:n,v=x*4;let b=_.clippingState||null;l.value=b,b=h(g,f,v,m);for(let y=0;y!==v;++y)b[y]=e[y];_.clippingState=b,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,m,g){const p=u!==null?u.length:0;let d=null;if(p!==0){if(d=l.value,g!==!0||d===null){const _=m+p*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(d===null||d.length<_)&&(d=new Float32Array(_));for(let v=0,b=m;v!==p;++v,b+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(d,b),d[b+3]=a.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,d}}function Xf(s){let t=new WeakMap;function e(a,o){return o===gr?a.mapping=li:o===xr&&(a.mapping=ci),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===gr||o===xr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nu(l.height/2);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class to extends Wa{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Pi=4,ja=[.125,.215,.35,.446,.526,.582],qn=20,eo=new to,Za=new gt;let no=null;const jn=(1+Math.sqrt(5))/2,Li=1/jn,$a=[new E(1,1,1),new E(-1,1,1),new E(1,1,-1),new E(-1,1,-1),new E(0,jn,Li),new E(0,jn,-Li),new E(Li,0,jn),new E(-Li,0,jn),new E(jn,Li,0),new E(-jn,Li,0)];class Ja{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){no=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(no),t.scissorTest=!1,Hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===li||t.mapping===ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),no=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:He,minFilter:He,generateMipmaps:!1,type:hi,format:Ke,encoding:Gn,depthBuffer:!1},i=Ka(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ka(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yf(r)),this._blurMaterial=qf(r,t,e)}return i}_compileMaterial(t){const e=new mt(this._lodPlanes[0],t);this._renderer.compile(e,eo)}_sceneToCubeUV(t,e,n,i){const o=new $e(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Za),h.toneMapping=hn,h.autoClear=!1;const m=new re({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),g=new mt(new xe,m);let p=!1;const d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,p=!0):(m.color.copy(Za),p=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(o.up.set(0,l[_],0),o.lookAt(c[_],0,0)):x===1?(o.up.set(0,0,l[_]),o.lookAt(0,c[_],0)):(o.up.set(0,l[_],0),o.lookAt(0,0,c[_]));const v=this._cubeSize;Hs(i,x*v,_>2?v:0,v,v),h.setRenderTarget(i),p&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===li||t.mapping===ci;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qa());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new mt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Hs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,eo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=$a[(i-1)%$a.length];this._blur(t,i-1,i,r,a)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new mt(this._lodPlanes[i],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*qn-1),p=r/g,d=isFinite(r)?1+Math.floor(h*p):qn;d>qn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${qn}`);const _=[];let x=0;for(let A=0;A<qn;++A){const M=A/p,T=Math.exp(-M*M/2);_.push(T),A===0?x+=T:A<d&&(x+=2*T)}for(let A=0;A<_.length;A++)_[A]=_[A]/x;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=_,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const b=this._sizeLods[i],y=3*b*(i>v-Pi?i-v+Pi:0),w=4*(this._cubeSize-b);Hs(e,y,w,3*b,2*b),l.setRenderTarget(e),l.render(u,eo)}}function Yf(s){const t=[],e=[],n=[];let i=s;const r=s-Pi+1+ja.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Pi?l=ja[a-s+Pi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,p=3,d=2,_=1,x=new Float32Array(p*g*m),v=new Float32Array(d*g*m),b=new Float32Array(_*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,M=w>2?0:-1,T=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];x.set(T,p*g*w),v.set(f,d*g*w);const R=[w,w,w,w,w,w];b.set(R,_*g*w)}const y=new Kt;y.setAttribute("position",new ne(x,p)),y.setAttribute("uv",new ne(v,d)),y.setAttribute("faceIndex",new ne(b,_)),t.push(y),i>Pi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ka(s,t,e){const n=new tn(s,t,e);return n.texture.mapping=ms,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function qf(s,t,e){const n=new Float32Array(qn),i=new E(0,1,0);return new de({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Qa(){return new de({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function tl(){return new de({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function io(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jf(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===gr||l===xr,h=l===li||l===ci;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Ja(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new Ja(s));const f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Zf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function $f(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],34962);const m=u.morphAttributes;for(const g in m){const p=m[g];for(let d=0,_=p.length;d<_;d++)t.update(p[d],34962)}}function c(u){const f=[],m=u.index,g=u.attributes.position;let p=0;if(m!==null){const x=m.array;p=m.version;for(let v=0,b=x.length;v<b;v+=3){const y=x[v+0],w=x[v+1],A=x[v+2];f.push(y,w,w,A,A,y)}}else{const x=g.array;p=g.version;for(let v=0,b=x.length/3-1;v<b;v+=3){const y=v+0,w=v+1,A=v+2;f.push(y,w,w,A,A,y)}}const d=new(Ea(f)?Ga:Ba)(f,1);d.version=p;const _=r.get(u);_&&t.remove(_),r.set(u,d)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Jf(s,t,e,n){const i=n.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,m){s.drawElements(r,m,o,f*l),e.update(m,r,1)}function u(f,m,g){if(g===0)return;let p,d;if(i)p=s,d="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,m,o,f*l,g),e.update(m,r,g)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u}function Kf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case 4:e.triangles+=o*(r/3);break;case 1:e.lines+=o*(r/2);break;case 3:e.lines+=o*(r-1);break;case 2:e.lines+=o*r;break;case 0:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Qf(s,t){return s[0]-t[0]}function tp(s,t){return Math.abs(t[1])-Math.abs(s[1])}function ep(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,a=new Se,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u,f){const m=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=g!==void 0?g.length:0;let d=r.get(h);if(d===void 0||d.count!==p){let F=function(){H.dispose(),r.delete(h),h.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();const v=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],M=h.morphAttributes.color||[];let T=0;v===!0&&(T=1),b===!0&&(T=2),y===!0&&(T=3);let R=h.attributes.position.count*T,V=1;R>t.maxTextureSize&&(V=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const K=new Float32Array(R*V*4*p),H=new La(K,R,V,p);H.type=Un,H.needsUpdate=!0;const O=T*4;for(let Y=0;Y<p;Y++){const tt=w[Y],j=A[Y],I=M[Y],z=R*V*4*Y;for(let N=0;N<tt.count;N++){const k=N*O;v===!0&&(a.fromBufferAttribute(tt,N),K[z+k+0]=a.x,K[z+k+1]=a.y,K[z+k+2]=a.z,K[z+k+3]=0),b===!0&&(a.fromBufferAttribute(j,N),K[z+k+4]=a.x,K[z+k+5]=a.y,K[z+k+6]=a.z,K[z+k+7]=0),y===!0&&(a.fromBufferAttribute(I,N),K[z+k+8]=a.x,K[z+k+9]=a.y,K[z+k+10]=a.z,K[z+k+11]=I.itemSize===4?a.w:1)}}d={count:p,texture:H,size:new rt(R,V)},r.set(h,d),h.addEventListener("dispose",F)}let _=0;for(let v=0;v<m.length;v++)_+=m[v];const x=h.morphTargetsRelative?1:1-_;f.getUniforms().setValue(s,"morphTargetBaseInfluence",x),f.getUniforms().setValue(s,"morphTargetInfluences",m),f.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),f.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}else{const g=m===void 0?0:m.length;let p=n[h.id];if(p===void 0||p.length!==g){p=[];for(let b=0;b<g;b++)p[b]=[b,0];n[h.id]=p}for(let b=0;b<g;b++){const y=p[b];y[0]=b,y[1]=m[b]}p.sort(tp);for(let b=0;b<8;b++)b<g&&p[b][1]?(o[b][0]=p[b][0],o[b][1]=p[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(Qf);const d=h.morphAttributes.position,_=h.morphAttributes.normal;let x=0;for(let b=0;b<8;b++){const y=o[b],w=y[0],A=y[1];w!==Number.MAX_SAFE_INTEGER&&A?(d&&h.getAttribute("morphTarget"+b)!==d[w]&&h.setAttribute("morphTarget"+b,d[w]),_&&h.getAttribute("morphNormal"+b)!==_[w]&&h.setAttribute("morphNormal"+b,_[w]),i[b]=A,x+=A):(d&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),_&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),i[b]=0)}const v=h.morphTargetsRelative?1:1-x;f.getUniforms().setValue(s,"morphTargetBaseInfluence",v),f.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function np(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);return i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const el=new Ie,nl=new La,il=new Mu,sl=new Xa,rl=[],ol=[],al=new Float32Array(16),ll=new Float32Array(9),cl=new Float32Array(4);function Ri(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=rl[i];if(r===void 0&&(r=new Float32Array(i),rl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ve(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function _e(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Vs(s,t){let e=ol[t];e===void 0&&(e=new Int32Array(t),ol[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function ip(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function sp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2fv(this.addr,t),_e(e,t)}}function rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;s.uniform3fv(this.addr,t),_e(e,t)}}function op(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4fv(this.addr,t),_e(e,t)}}function ap(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ve(e,n))return;cl.set(n),s.uniformMatrix2fv(this.addr,!1,cl),_e(e,n)}}function lp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ve(e,n))return;ll.set(n),s.uniformMatrix3fv(this.addr,!1,ll),_e(e,n)}}function cp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ve(e,n))return;al.set(n),s.uniformMatrix4fv(this.addr,!1,al),_e(e,n)}}function hp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2iv(this.addr,t),_e(e,t)}}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;s.uniform3iv(this.addr,t),_e(e,t)}}function fp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4iv(this.addr,t),_e(e,t)}}function pp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function mp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2uiv(this.addr,t),_e(e,t)}}function gp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;s.uniform3uiv(this.addr,t),_e(e,t)}}function xp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4uiv(this.addr,t),_e(e,t)}}function vp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||el,i)}function _p(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||il,i)}function yp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||sl,i)}function bp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||nl,i)}function Mp(s){switch(s){case 5126:return ip;case 35664:return sp;case 35665:return rp;case 35666:return op;case 35674:return ap;case 35675:return lp;case 35676:return cp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return xp;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return _p;case 35680:case 36300:case 36308:case 36293:return yp;case 36289:case 36303:case 36311:case 36292:return bp}}function wp(s,t){s.uniform1fv(this.addr,t)}function Sp(s,t){const e=Ri(t,this.size,2);s.uniform2fv(this.addr,e)}function Tp(s,t){const e=Ri(t,this.size,3);s.uniform3fv(this.addr,e)}function Ep(s,t){const e=Ri(t,this.size,4);s.uniform4fv(this.addr,e)}function Cp(s,t){const e=Ri(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ap(s,t){const e=Ri(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Pp(s,t){const e=Ri(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Lp(s,t){s.uniform1iv(this.addr,t)}function Rp(s,t){s.uniform2iv(this.addr,t)}function Dp(s,t){s.uniform3iv(this.addr,t)}function Ip(s,t){s.uniform4iv(this.addr,t)}function Fp(s,t){s.uniform1uiv(this.addr,t)}function Op(s,t){s.uniform2uiv(this.addr,t)}function zp(s,t){s.uniform3uiv(this.addr,t)}function Np(s,t){s.uniform4uiv(this.addr,t)}function kp(s,t,e){const n=this.cache,i=t.length,r=Vs(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||el,r[a])}function Up(s,t,e){const n=this.cache,i=t.length,r=Vs(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||il,r[a])}function Bp(s,t,e){const n=this.cache,i=t.length,r=Vs(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||sl,r[a])}function Gp(s,t,e){const n=this.cache,i=t.length,r=Vs(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||nl,r[a])}function Hp(s){switch(s){case 5126:return wp;case 35664:return Sp;case 35665:return Tp;case 35666:return Ep;case 35674:return Cp;case 35675:return Ap;case 35676:return Pp;case 5124:case 35670:return Lp;case 35667:case 35671:return Rp;case 35668:case 35672:return Dp;case 35669:case 35673:return Ip;case 5125:return Fp;case 36294:return Op;case 36295:return zp;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Bp;case 36289:case 36303:case 36311:case 36292:return Gp}}class Vp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=Mp(e.type)}}class Wp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=Hp(e.type)}}class Xp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const so=/(\w+)(\])?(\[|\.)?/g;function hl(s,t){s.seq.push(t),s.map[t.id]=t}function Yp(s,t,e){const n=s.name,i=n.length;for(so.lastIndex=0;;){const r=so.exec(n),a=so.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){hl(e,c===void 0?new Vp(o,s,t):new Wp(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Xp(o),hl(e,u)),e=u}}}class Ws{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Yp(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function ul(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}let qp=0;function jp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Zp(s){switch(s){case Gn:return["Linear","( value )"];case ie:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function dl(s,t,e){const n=s.getShaderParameter(t,35713),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+jp(s.getShaderSource(t),a)}else return i}function $p(s,t){const e=Zp(t);return"vec4 "+s+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function Jp(s,t){let e;switch(t){case zh:e="Linear";break;case Nh:e="Reinhard";break;case kh:e="OptimizedCineon";break;case Uh:e="ACESFilmic";break;case Bh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Kp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.tangentSpaceNormalMap||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function Qp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tm(s,t){const e={},n=s.getProgramParameter(t,35721);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ji(s){return s!==""}function fl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const em=/^[ \t]*#include +<([\w\d./]+)>/gm;function ro(s){return s.replace(em,nm)}function nm(s,t){const e=Bt[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return ro(e)}const im=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ml(s){return s.replace(im,sm)}function sm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function gl(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Vo?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ph?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Hi&&(t="SHADOWMAP_TYPE_VSM"),t}function om(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case li:case ci:t="ENVMAP_TYPE_CUBE";break;case ms:t="ENVMAP_TYPE_CUBE_UV";break}return t}function am(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ci:t="ENVMAP_MODE_REFRACTION";break}return t}function lm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case $o:t="ENVMAP_BLENDING_MULTIPLY";break;case Fh:t="ENVMAP_BLENDING_MIX";break;case Oh:t="ENVMAP_BLENDING_ADD";break}return t}function cm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function hm(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=rm(e),c=om(e),h=am(e),u=lm(e),f=cm(e),m=e.isWebGL2?"":Kp(e),g=Qp(r),p=i.createProgram();let d,_,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=[g].filter(Ji).join(`
`),d.length>0&&(d+=`
`),_=[m,g].filter(Ji).join(`
`),_.length>0&&(_+=`
`)):(d=[gl(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),_=[m,gl(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hn?"#define TONE_MAPPING":"",e.toneMapping!==hn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==hn?Jp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.encodings_pars_fragment,$p("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),a=ro(a),a=fl(a,e),a=pl(a,e),o=ro(o),o=fl(o,e),o=pl(o,e),a=ml(a),o=ml(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["#define varying in",e.glslVersion===wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const v=x+d+a,b=x+_+o,y=ul(i,35633,v),w=ul(i,35632,b);if(i.attachShader(p,y),i.attachShader(p,w),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p),s.debug.checkShaderErrors){const T=i.getProgramInfoLog(p).trim(),R=i.getShaderInfoLog(y).trim(),V=i.getShaderInfoLog(w).trim();let K=!0,H=!0;if(i.getProgramParameter(p,35714)===!1){K=!1;const O=dl(i,y,"vertex"),F=dl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,35715)+`

Program Info Log: `+T+`
`+O+`
`+F)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(R===""||V==="")&&(H=!1);H&&(this.diagnostics={runnable:K,programLog:T,vertexShader:{log:R,prefix:d},fragmentShader:{log:V,prefix:_}})}i.deleteShader(y),i.deleteShader(w);let A;this.getUniforms=function(){return A===void 0&&(A=new Ws(i,p)),A};let M;return this.getAttributes=function(){return M===void 0&&(M=tm(i,p)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.name=e.shaderName,this.id=qp++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=y,this.fragmentShader=w,this}let um=0;class dm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new fm(t),e.set(t,n)),n}}class fm{constructor(t){this.id=um++,this.code=t,this.usedTimes=0}}function pm(s,t,e,n,i,r,a){const o=new Hr,l=new dm,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M,T,R,V,K){const H=V.fog,O=K.geometry,F=M.isMeshStandardMaterial?V.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||F),tt=Y&&Y.mapping===ms?Y.image.height:null,j=g[M.type];M.precision!==null&&(m=i.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const I=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,z=I!==void 0?I.length:0;let N=0;O.morphAttributes.position!==void 0&&(N=1),O.morphAttributes.normal!==void 0&&(N=2),O.morphAttributes.color!==void 0&&(N=3);let k,et,J,at;if(j){const Ft=an[j];k=Ft.vertexShader,et=Ft.fragmentShader}else k=M.vertexShader,et=M.fragmentShader,l.update(M),J=l.getVertexShaderID(M),at=l.getFragmentShaderID(M);const Z=s.getRenderTarget(),At=M.alphaTest>0,vt=M.clearcoat>0,Et=M.iridescence>0;return{isWebGL2:h,shaderID:j,shaderName:M.type,vertexShader:k,fragmentShader:et,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:at,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,instancing:K.isInstancedMesh===!0,instancingColor:K.isInstancedMesh===!0&&K.instanceColor!==null,supportsVertexTextures:f,outputEncoding:Z===null?s.outputEncoding:Z.isXRRenderTarget===!0?Z.texture.encoding:Gn,map:!!M.map,matcap:!!M.matcap,envMap:!!Y,envMapMode:Y&&Y.mapping,envMapCubeUVHeight:tt,lightMap:!!M.lightMap,aoMap:!!M.aoMap,emissiveMap:!!M.emissiveMap,bumpMap:!!M.bumpMap,normalMap:!!M.normalMap,objectSpaceNormalMap:M.normalMapType===ru,tangentSpaceNormalMap:M.normalMapType===su,decodeVideoTexture:!!M.map&&M.map.isVideoTexture===!0&&M.map.encoding===ie,clearcoat:vt,clearcoatMap:vt&&!!M.clearcoatMap,clearcoatRoughnessMap:vt&&!!M.clearcoatRoughnessMap,clearcoatNormalMap:vt&&!!M.clearcoatNormalMap,iridescence:Et,iridescenceMap:Et&&!!M.iridescenceMap,iridescenceThicknessMap:Et&&!!M.iridescenceThicknessMap,displacementMap:!!M.displacementMap,roughnessMap:!!M.roughnessMap,metalnessMap:!!M.metalnessMap,specularMap:!!M.specularMap,specularIntensityMap:!!M.specularIntensityMap,specularColorMap:!!M.specularColorMap,opaque:M.transparent===!1&&M.blending===oi,alphaMap:!!M.alphaMap,alphaTest:At,gradientMap:!!M.gradientMap,sheen:M.sheen>0,sheenColorMap:!!M.sheenColorMap,sheenRoughnessMap:!!M.sheenRoughnessMap,transmission:M.transmission>0,transmissionMap:!!M.transmissionMap,thicknessMap:!!M.thicknessMap,combine:M.combine,vertexTangents:!!M.normalMap&&!!O.attributes.tangent,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUvs:!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatMap||!!M.clearcoatRoughnessMap||!!M.clearcoatNormalMap||!!M.iridescenceMap||!!M.iridescenceThicknessMap||!!M.displacementMap||!!M.transmissionMap||!!M.thicknessMap||!!M.specularIntensityMap||!!M.specularColorMap||!!M.sheenColorMap||!!M.sheenRoughnessMap,uvsVertexOnly:!(M.map||M.bumpMap||M.normalMap||M.specularMap||M.alphaMap||M.emissiveMap||M.roughnessMap||M.metalnessMap||M.clearcoatNormalMap||M.iridescenceMap||M.iridescenceThicknessMap||M.transmission>0||M.transmissionMap||M.thicknessMap||M.specularIntensityMap||M.specularColorMap||M.sheen>0||M.sheenColorMap||M.sheenRoughnessMap)&&!!M.displacementMap,fog:!!H,useFog:M.fog===!0,fogExp2:H&&H.isFogExp2,flatShading:!!M.flatShading,sizeAttenuation:M.sizeAttenuation,logarithmicDepthBuffer:u,skinning:K.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:z,morphTextureStride:N,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:M.toneMapped?s.toneMapping:hn,physicallyCorrectLights:s.physicallyCorrectLights,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ae,flipSided:M.side===Ge,useDepthPacking:!!M.depthPacking,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:M.extensions&&M.extensions.derivatives,extensionFragDepth:M.extensions&&M.extensions.fragDepth,extensionDrawBuffers:M.extensions&&M.extensions.drawBuffers,extensionShaderTextureLOD:M.extensions&&M.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)T.push(R),T.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(_(T,M),x(T,M),T.push(s.outputEncoding)),T.push(M.customProgramCacheKey),T.join()}function _(M,T){M.push(T.precision),M.push(T.outputEncoding),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.combine),M.push(T.vertexUvs),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.map&&o.enable(4),T.matcap&&o.enable(5),T.envMap&&o.enable(6),T.lightMap&&o.enable(7),T.aoMap&&o.enable(8),T.emissiveMap&&o.enable(9),T.bumpMap&&o.enable(10),T.normalMap&&o.enable(11),T.objectSpaceNormalMap&&o.enable(12),T.tangentSpaceNormalMap&&o.enable(13),T.clearcoat&&o.enable(14),T.clearcoatMap&&o.enable(15),T.clearcoatRoughnessMap&&o.enable(16),T.clearcoatNormalMap&&o.enable(17),T.iridescence&&o.enable(18),T.iridescenceMap&&o.enable(19),T.iridescenceThicknessMap&&o.enable(20),T.displacementMap&&o.enable(21),T.specularMap&&o.enable(22),T.roughnessMap&&o.enable(23),T.metalnessMap&&o.enable(24),T.gradientMap&&o.enable(25),T.alphaMap&&o.enable(26),T.alphaTest&&o.enable(27),T.vertexColors&&o.enable(28),T.vertexAlphas&&o.enable(29),T.vertexUvs&&o.enable(30),T.vertexTangents&&o.enable(31),T.uvsVertexOnly&&o.enable(32),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.physicallyCorrectLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.specularIntensityMap&&o.enable(15),T.specularColorMap&&o.enable(16),T.transmission&&o.enable(17),T.transmissionMap&&o.enable(18),T.thicknessMap&&o.enable(19),T.sheen&&o.enable(20),T.sheenColorMap&&o.enable(21),T.sheenRoughnessMap&&o.enable(22),T.decodeVideoTexture&&o.enable(23),T.opaque&&o.enable(24),M.push(o.mask)}function v(M){const T=g[M.type];let R;if(T){const V=an[T];R=Us.clone(V.uniforms)}else R=M.uniforms;return R}function b(M,T){let R;for(let V=0,K=c.length;V<K;V++){const H=c[V];if(H.cacheKey===T){R=H,++R.usedTimes;break}}return R===void 0&&(R=new hm(s,T,M,r),c.push(R)),R}function y(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),M.destroy()}}function w(M){l.remove(M)}function A(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:v,acquireProgram:b,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:A}}function mm(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function gm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function xl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function vl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,m,g,p,d){let _=s[t];return _===void 0?(_={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:p,group:d},s[t]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=m,_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=p,_.group=d),t++,_}function o(u,f,m,g,p,d){const _=a(u,f,m,g,p,d);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):e.push(_)}function l(u,f,m,g,p,d){const _=a(u,f,m,g,p,d);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):e.unshift(_)}function c(u,f){e.length>1&&e.sort(u||gm),n.length>1&&n.sort(f||xl),i.length>1&&i.sort(f||xl)}function h(){for(let u=t,f=s.length;u<f;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function xm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new vl,s.set(n,[a])):i>=r.length?(a=new vl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function vm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new E,color:new gt};break;case"SpotLight":e={position:new E,direction:new E,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new E,color:new gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new E,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":e={color:new gt,position:new E,halfWidth:new E,halfHeight:new E};break}return s[t.id]=e,e}}}function _m(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let ym=0;function bm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Mm(s,t){const e=new vm,n=_m(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new E);const r=new E,a=new Qt,o=new Qt;function l(h,u){let f=0,m=0,g=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let p=0,d=0,_=0,x=0,v=0,b=0,y=0,w=0,A=0,M=0;h.sort(bm);const T=u!==!0?Math.PI:1;for(let V=0,K=h.length;V<K;V++){const H=h[V],O=H.color,F=H.intensity,Y=H.distance,tt=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)f+=O.r*F*T,m+=O.g*F*T,g+=O.b*F*T;else if(H.isLightProbe)for(let j=0;j<9;j++)i.probe[j].addScaledVector(H.sh.coefficients[j],F);else if(H.isDirectionalLight){const j=e.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity*T),H.castShadow){const I=H.shadow,z=n.get(H);z.shadowBias=I.bias,z.shadowNormalBias=I.normalBias,z.shadowRadius=I.radius,z.shadowMapSize=I.mapSize,i.directionalShadow[p]=z,i.directionalShadowMap[p]=tt,i.directionalShadowMatrix[p]=H.shadow.matrix,b++}i.directional[p]=j,p++}else if(H.isSpotLight){const j=e.get(H);j.position.setFromMatrixPosition(H.matrixWorld),j.color.copy(O).multiplyScalar(F*T),j.distance=Y,j.coneCos=Math.cos(H.angle),j.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),j.decay=H.decay,i.spot[_]=j;const I=H.shadow;if(H.map&&(i.spotLightMap[A]=H.map,A++,I.updateMatrices(H),H.castShadow&&M++),i.spotLightMatrix[_]=I.matrix,H.castShadow){const z=n.get(H);z.shadowBias=I.bias,z.shadowNormalBias=I.normalBias,z.shadowRadius=I.radius,z.shadowMapSize=I.mapSize,i.spotShadow[_]=z,i.spotShadowMap[_]=tt,w++}_++}else if(H.isRectAreaLight){const j=e.get(H);j.color.copy(O).multiplyScalar(F),j.halfWidth.set(H.width*.5,0,0),j.halfHeight.set(0,H.height*.5,0),i.rectArea[x]=j,x++}else if(H.isPointLight){const j=e.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity*T),j.distance=H.distance,j.decay=H.decay,H.castShadow){const I=H.shadow,z=n.get(H);z.shadowBias=I.bias,z.shadowNormalBias=I.normalBias,z.shadowRadius=I.radius,z.shadowMapSize=I.mapSize,z.shadowCameraNear=I.camera.near,z.shadowCameraFar=I.camera.far,i.pointShadow[d]=z,i.pointShadowMap[d]=tt,i.pointShadowMatrix[d]=H.shadow.matrix,y++}i.point[d]=j,d++}else if(H.isHemisphereLight){const j=e.get(H);j.skyColor.copy(H.color).multiplyScalar(F*T),j.groundColor.copy(H.groundColor).multiplyScalar(F*T),i.hemi[v]=j,v++}}x>0&&(t.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=g;const R=i.hash;(R.directionalLength!==p||R.pointLength!==d||R.spotLength!==_||R.rectAreaLength!==x||R.hemiLength!==v||R.numDirectionalShadows!==b||R.numPointShadows!==y||R.numSpotShadows!==w||R.numSpotMaps!==A)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=x,i.point.length=d,i.hemi.length=v,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=w+A-M,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=M,R.directionalLength=p,R.pointLength=d,R.spotLength=_,R.rectAreaLength=x,R.hemiLength=v,R.numDirectionalShadows=b,R.numPointShadows=y,R.numSpotShadows=w,R.numSpotMaps=A,i.version=ym++)}function c(h,u){let f=0,m=0,g=0,p=0,d=0;const _=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const b=h[x];if(b.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(_),f++}else if(b.isSpotLight){const y=i.spot[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),y.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(_),g++}else if(b.isRectAreaLight){const y=i.rectArea[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),o.identity(),a.copy(b.matrixWorld),a.premultiply(_),o.extractRotation(a),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(b.isPointLight){const y=i.point[m];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(_),m++}else if(b.isHemisphereLight){const y=i.hemi[d];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(_),d++}}}return{setup:l,setupView:c,state:i}}function _l(s,t){const e=new Mm(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function wm(s,t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new _l(s,t),e.set(r,[l])):a>=o.length?(l=new _l(s,t),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class Sm extends Mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tm extends Mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new E,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Em=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Am(s,t,e){let n=new Ya;const i=new rt,r=new rt,a=new Se,o=new Sm({depthPacking:iu}),l=new Tm,c={},h=e.maxTextureSize,u={0:Ge,1:ri,2:ae},f=new de({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:Em,fragmentShader:Cm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Kt;g.setAttribute("position",new ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new mt(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo,this.render=function(b,y,w){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||b.length===0)return;const A=s.getRenderTarget(),M=s.getActiveCubeFace(),T=s.getActiveMipmapLevel(),R=s.state;R.setBlending(bn),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);for(let V=0,K=b.length;V<K;V++){const H=b[V],O=H.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const F=O.getFrameExtents();if(i.multiply(F),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/F.x),i.x=r.x*F.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/F.y),i.y=r.y*F.y,O.mapSize.y=r.y)),O.map===null){const tt=this.type!==Hi?{minFilter:Ce,magFilter:Ce}:{};O.map=new tn(i.x,i.y,tt),O.map.texture.name=H.name+".shadowMap",O.camera.updateProjectionMatrix()}s.setRenderTarget(O.map),s.clear();const Y=O.getViewportCount();for(let tt=0;tt<Y;tt++){const j=O.getViewport(tt);a.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),R.viewport(a),O.updateMatrices(H,tt),n=O.getFrustum(),v(y,w,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===Hi&&_(O,w),O.needsUpdate=!1}d.needsUpdate=!1,s.setRenderTarget(A,M,T)};function _(b,y){const w=t.update(p);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new tn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(y,null,w,f,p,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(y,null,w,m,p,null)}function x(b,y,w,A,M,T){let R=null;const V=w.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(V!==void 0?R=V:R=w.isPointLight===!0?l:o,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const K=R.uuid,H=y.uuid;let O=c[K];O===void 0&&(O={},c[K]=O);let F=O[H];F===void 0&&(F=R.clone(),O[H]=F),R=F}return R.visible=y.visible,R.wireframe=y.wireframe,T===Hi?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,w.isPointLight===!0&&R.isMeshDistanceMaterial===!0&&(R.referencePosition.setFromMatrixPosition(w.matrixWorld),R.nearDistance=A,R.farDistance=M),R}function v(b,y,w,A,M){if(b.visible===!1)return;if(b.layers.test(y.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Hi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,b.matrixWorld);const V=t.update(b),K=b.material;if(Array.isArray(K)){const H=V.groups;for(let O=0,F=H.length;O<F;O++){const Y=H[O],tt=K[Y.materialIndex];if(tt&&tt.visible){const j=x(b,tt,A,w.near,w.far,M);s.renderBufferDirect(w,null,V,j,b,Y)}}}else if(K.visible){const H=x(b,K,A,w.near,w.far,M);s.renderBufferDirect(w,null,V,H,b,null)}}const R=b.children;for(let V=0,K=R.length;V<K;V++)v(R[V],y,w,A,M)}}function Pm(s,t,e){const n=e.isWebGL2;function i(){let D=!1;const G=new Se;let X=null;const ct=new Se(0,0,0,0);return{setMask:function(Mt){X!==Mt&&!D&&(s.colorMask(Mt,Mt,Mt,Mt),X=Mt)},setLocked:function(Mt){D=Mt},setClear:function(Mt,Xt,oe,fe,Je){Je===!0&&(Mt*=fe,Xt*=fe,oe*=fe),G.set(Mt,Xt,oe,fe),ct.equals(G)===!1&&(s.clearColor(Mt,Xt,oe,fe),ct.copy(G))},reset:function(){D=!1,X=null,ct.set(-1,0,0,0)}}}function r(){let D=!1,G=null,X=null,ct=null;return{setTest:function(Mt){Mt?At(2929):vt(2929)},setMask:function(Mt){G!==Mt&&!D&&(s.depthMask(Mt),G=Mt)},setFunc:function(Mt){if(X!==Mt){switch(Mt){case Ch:s.depthFunc(512);break;case Ah:s.depthFunc(519);break;case Ph:s.depthFunc(513);break;case mr:s.depthFunc(515);break;case Lh:s.depthFunc(514);break;case Rh:s.depthFunc(518);break;case Dh:s.depthFunc(516);break;case Ih:s.depthFunc(517);break;default:s.depthFunc(515)}X=Mt}},setLocked:function(Mt){D=Mt},setClear:function(Mt){ct!==Mt&&(s.clearDepth(Mt),ct=Mt)},reset:function(){D=!1,G=null,X=null,ct=null}}}function a(){let D=!1,G=null,X=null,ct=null,Mt=null,Xt=null,oe=null,fe=null,Je=null;return{setTest:function(te){D||(te?At(2960):vt(2960))},setMask:function(te){G!==te&&!D&&(s.stencilMask(te),G=te)},setFunc:function(te,Ee,Re){(X!==te||ct!==Ee||Mt!==Re)&&(s.stencilFunc(te,Ee,Re),X=te,ct=Ee,Mt=Re)},setOp:function(te,Ee,Re){(Xt!==te||oe!==Ee||fe!==Re)&&(s.stencilOp(te,Ee,Re),Xt=te,oe=Ee,fe=Re)},setLocked:function(te){D=te},setClear:function(te){Je!==te&&(s.clearStencil(te),Je=te)},reset:function(){D=!1,G=null,X=null,ct=null,Mt=null,Xt=null,oe=null,fe=null,Je=null}}}const o=new i,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let f={},m={},g=new WeakMap,p=[],d=null,_=!1,x=null,v=null,b=null,y=null,w=null,A=null,M=null,T=!1,R=null,V=null,K=null,H=null,O=null;const F=s.getParameter(35661);let Y=!1,tt=0;const j=s.getParameter(7938);j.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(j)[1]),Y=tt>=1):j.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Y=tt>=2);let I=null,z={};const N=s.getParameter(3088),k=s.getParameter(2978),et=new Se().fromArray(N),J=new Se().fromArray(k);function at(D,G,X){const ct=new Uint8Array(4),Mt=s.createTexture();s.bindTexture(D,Mt),s.texParameteri(D,10241,9728),s.texParameteri(D,10240,9728);for(let Xt=0;Xt<X;Xt++)s.texImage2D(G+Xt,0,6408,1,1,0,6408,5121,ct);return Mt}const Z={};Z[3553]=at(3553,3553,1),Z[34067]=at(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),At(2929),l.setFunc(mr),ft(!1),It(Ho),At(2884),ot(bn);function At(D){f[D]!==!0&&(s.enable(D),f[D]=!0)}function vt(D){f[D]!==!1&&(s.disable(D),f[D]=!1)}function Et(D,G){return m[D]!==G?(s.bindFramebuffer(D,G),m[D]=G,n&&(D===36009&&(m[36160]=G),D===36160&&(m[36009]=G)),!0):!1}function ut(D,G){let X=p,ct=!1;if(D)if(X=g.get(G),X===void 0&&(X=[],g.set(G,X)),D.isWebGLMultipleRenderTargets){const Mt=D.texture;if(X.length!==Mt.length||X[0]!==36064){for(let Xt=0,oe=Mt.length;Xt<oe;Xt++)X[Xt]=36064+Xt;X.length=Mt.length,ct=!0}}else X[0]!==36064&&(X[0]=36064,ct=!0);else X[0]!==1029&&(X[0]=1029,ct=!0);ct&&(e.isWebGL2?s.drawBuffers(X):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(X))}function Ft(D){return d!==D?(s.useProgram(D),d=D,!0):!1}const nt={[ai]:32774,[gh]:32778,[xh]:32779};if(n)nt[Yo]=32775,nt[qo]=32776;else{const D=t.get("EXT_blend_minmax");D!==null&&(nt[Yo]=D.MIN_EXT,nt[qo]=D.MAX_EXT)}const it={[vh]:0,[_h]:1,[yh]:768,[jo]:770,[Eh]:776,[Sh]:774,[Mh]:772,[bh]:769,[Zo]:771,[Th]:775,[wh]:773};function ot(D,G,X,ct,Mt,Xt,oe,fe){if(D===bn){_===!0&&(vt(3042),_=!1);return}if(_===!1&&(At(3042),_=!0),D!==mh){if(D!==x||fe!==T){if((v!==ai||w!==ai)&&(s.blendEquation(32774),v=ai,w=ai),fe)switch(D){case oi:s.blendFuncSeparate(1,771,1,771);break;case zn:s.blendFunc(1,1);break;case Wo:s.blendFuncSeparate(0,769,0,1);break;case Xo:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case oi:s.blendFuncSeparate(770,771,1,771);break;case zn:s.blendFunc(770,1);break;case Wo:s.blendFuncSeparate(0,769,0,1);break;case Xo:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,y=null,A=null,M=null,x=D,T=fe}return}Mt=Mt||G,Xt=Xt||X,oe=oe||ct,(G!==v||Mt!==w)&&(s.blendEquationSeparate(nt[G],nt[Mt]),v=G,w=Mt),(X!==b||ct!==y||Xt!==A||oe!==M)&&(s.blendFuncSeparate(it[X],it[ct],it[Xt],it[oe]),b=X,y=ct,A=Xt,M=oe),x=D,T=!1}function bt(D,G){D.side===ae?vt(2884):At(2884);let X=D.side===Ge;G&&(X=!X),ft(X),D.blending===oi&&D.transparent===!1?ot(bn):ot(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),o.setMask(D.colorWrite);const ct=D.stencilWrite;c.setTest(ct),ct&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Pt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?At(32926):vt(32926)}function ft(D){R!==D&&(D?s.frontFace(2304):s.frontFace(2305),R=D)}function It(D){D!==dh?(At(2884),D!==V&&(D===Ho?s.cullFace(1029):D===fh?s.cullFace(1028):s.cullFace(1032))):vt(2884),V=D}function Rt(D){D!==K&&(Y&&s.lineWidth(D),K=D)}function Pt(D,G,X){D?(At(32823),(H!==G||O!==X)&&(s.polygonOffset(G,X),H=G,O=X)):vt(32823)}function kt(D){D?At(3089):vt(3089)}function Wt(D){D===void 0&&(D=33984+F-1),I!==D&&(s.activeTexture(D),I=D)}function P(D,G,X){X===void 0&&(I===null?X=33984+F-1:X=I);let ct=z[X];ct===void 0&&(ct={type:void 0,texture:void 0},z[X]=ct),(ct.type!==D||ct.texture!==G)&&(I!==X&&(s.activeTexture(X),I=X),s.bindTexture(D,G||Z[D]),ct.type=D,ct.texture=G)}function S(){const D=z[I];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function L(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function U(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(D){et.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),et.copy(D))}function q(D){J.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),J.copy(D))}function lt(D,G){let X=u.get(G);X===void 0&&(X=new WeakMap,u.set(G,X));let ct=X.get(D);ct===void 0&&(ct=s.getUniformBlockIndex(G,D.name),X.set(D,ct))}function wt(D,G){const ct=u.get(G).get(D);h.get(D)!==ct&&(s.uniformBlockBinding(G,ct,D.__bindingPointIndex),h.set(D,ct))}function Ot(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},I=null,z={},m={},g=new WeakMap,p=[],d=null,_=!1,x=null,v=null,b=null,y=null,w=null,A=null,M=null,T=!1,R=null,V=null,K=null,H=null,O=null,et.set(0,0,s.canvas.width,s.canvas.height),J.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:At,disable:vt,bindFramebuffer:Et,drawBuffers:ut,useProgram:Ft,setBlending:ot,setMaterial:bt,setFlipSided:ft,setCullFace:It,setLineWidth:Rt,setPolygonOffset:Pt,setScissorTest:kt,activeTexture:Wt,bindTexture:P,unbindTexture:S,compressedTexImage2D:$,compressedTexImage3D:ht,texImage2D:Ct,texImage3D:St,updateUBOMapping:lt,uniformBlockBinding:wt,texStorage2D:U,texStorage3D:yt,texSubImage2D:dt,texSubImage3D:pt,compressedTexSubImage2D:_t,compressedTexSubImage3D:L,scissor:Dt,viewport:q,reset:Ot}}function Lm(s,t,e,n,i,r,a){const o=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let p;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,S){return _?new OffscreenCanvas(P,S):_s("canvas")}function v(P,S,$,ht){let dt=1;if((P.width>ht||P.height>ht)&&(dt=ht/Math.max(P.width,P.height)),dt<1||S===!0)if(typeof HTMLImageElement!="undefined"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&P instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&P instanceof ImageBitmap){const pt=S?vs:Math.floor,_t=pt(dt*P.width),L=pt(dt*P.height);p===void 0&&(p=x(_t,L));const U=$?x(_t,L):p;return U.width=_t,U.height=L,U.getContext("2d").drawImage(P,0,0,_t,L),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+_t+"x"+L+")."),U}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function b(P){return Pr(P.width)&&Pr(P.height)}function y(P){return o?!1:P.wrapS!==je||P.wrapT!==je||P.minFilter!==Ce&&P.minFilter!==He}function w(P,S){return P.generateMipmaps&&S&&P.minFilter!==Ce&&P.minFilter!==He}function A(P){s.generateMipmap(P)}function M(P,S,$,ht,dt=!1){if(o===!1)return S;if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pt=S;return S===6403&&($===5126&&(pt=33326),$===5131&&(pt=33325),$===5121&&(pt=33321)),S===33319&&($===5126&&(pt=33328),$===5131&&(pt=33327),$===5121&&(pt=33323)),S===6408&&($===5126&&(pt=34836),$===5131&&(pt=34842),$===5121&&(pt=ht===ie&&dt===!1?35907:32856),$===32819&&(pt=32854),$===32820&&(pt=32855)),(pt===33325||pt===33326||pt===33327||pt===33328||pt===34842||pt===34836)&&t.get("EXT_color_buffer_float"),pt}function T(P,S,$){return w(P,$)===!0||P.isFramebufferTexture&&P.minFilter!==Ce&&P.minFilter!==He?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function R(P){return P===Ce||P===Ko||P===Qo?9728:9729}function V(P){const S=P.target;S.removeEventListener("dispose",V),H(S),S.isVideoTexture&&g.delete(S)}function K(P){const S=P.target;S.removeEventListener("dispose",K),F(S)}function H(P){const S=n.get(P);if(S.__webglInit===void 0)return;const $=P.source,ht=d.get($);if(ht){const dt=ht[S.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&O(P),Object.keys(ht).length===0&&d.delete($)}n.remove(P)}function O(P){const S=n.get(P);s.deleteTexture(S.__webglTexture);const $=P.source,ht=d.get($);delete ht[S.__cacheKey],a.memory.textures--}function F(P){const S=P.texture,$=n.get(P),ht=n.get(S);if(ht.__webglTexture!==void 0&&(s.deleteTexture(ht.__webglTexture),a.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++)s.deleteFramebuffer($.__webglFramebuffer[dt]),$.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer[dt]);else{if(s.deleteFramebuffer($.__webglFramebuffer),$.__webglDepthbuffer&&s.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&s.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let dt=0;dt<$.__webglColorRenderbuffer.length;dt++)$.__webglColorRenderbuffer[dt]&&s.deleteRenderbuffer($.__webglColorRenderbuffer[dt]);$.__webglDepthRenderbuffer&&s.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let dt=0,pt=S.length;dt<pt;dt++){const _t=n.get(S[dt]);_t.__webglTexture&&(s.deleteTexture(_t.__webglTexture),a.memory.textures--),n.remove(S[dt])}n.remove(S),n.remove(P)}let Y=0;function tt(){Y=0}function j(){const P=Y;return P>=l&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l),Y+=1,P}function I(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.encoding),S.join()}function z(P,S){const $=n.get(P);if(P.isVideoTexture&&kt(P),P.isRenderTargetTexture===!1&&P.version>0&&$.__version!==P.version){const ht=P.image;if(ht===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{vt($,P,S);return}}e.bindTexture(3553,$.__webglTexture,33984+S)}function N(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){vt($,P,S);return}e.bindTexture(35866,$.__webglTexture,33984+S)}function k(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){vt($,P,S);return}e.bindTexture(32879,$.__webglTexture,33984+S)}function et(P,S){const $=n.get(P);if(P.version>0&&$.__version!==P.version){Et($,P,S);return}e.bindTexture(34067,$.__webglTexture,33984+S)}const J={[vr]:10497,[je]:33071,[_r]:33648},at={[Ce]:9728,[Ko]:9984,[Qo]:9986,[He]:9729,[Gh]:9985,[gs]:9987};function Z(P,S,$){if($?(s.texParameteri(P,10242,J[S.wrapS]),s.texParameteri(P,10243,J[S.wrapT]),(P===32879||P===35866)&&s.texParameteri(P,32882,J[S.wrapR]),s.texParameteri(P,10240,at[S.magFilter]),s.texParameteri(P,10241,at[S.minFilter])):(s.texParameteri(P,10242,33071),s.texParameteri(P,10243,33071),(P===32879||P===35866)&&s.texParameteri(P,32882,33071),(S.wrapS!==je||S.wrapT!==je)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(P,10240,R(S.magFilter)),s.texParameteri(P,10241,R(S.minFilter)),S.minFilter!==Ce&&S.minFilter!==He&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const ht=t.get("EXT_texture_filter_anisotropic");if(S.type===Un&&t.has("OES_texture_float_linear")===!1||o===!1&&S.type===hi&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(s.texParameterf(P,ht.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function At(P,S){let $=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",V));const ht=S.source;let dt=d.get(ht);dt===void 0&&(dt={},d.set(ht,dt));const pt=I(S);if(pt!==P.__cacheKey){dt[pt]===void 0&&(dt[pt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,$=!0),dt[pt].usedTimes++;const _t=dt[P.__cacheKey];_t!==void 0&&(dt[P.__cacheKey].usedTimes--,_t.usedTimes===0&&O(S)),P.__cacheKey=pt,P.__webglTexture=dt[pt].texture}return $}function vt(P,S,$){let ht=3553;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ht=35866),S.isData3DTexture&&(ht=32879);const dt=At(P,S),pt=S.source;e.bindTexture(ht,P.__webglTexture,33984+$);const _t=n.get(pt);if(pt.version!==_t.__version||dt===!0){e.activeTexture(33984+$),s.pixelStorei(37440,S.flipY),s.pixelStorei(37441,S.premultiplyAlpha),s.pixelStorei(3317,S.unpackAlignment),s.pixelStorei(37443,0);const L=y(S)&&b(S.image)===!1;let U=v(S.image,L,!1,h);U=Wt(S,U);const yt=b(U)||o,Ct=r.convert(S.format,S.encoding);let St=r.convert(S.type),Dt=M(S.internalFormat,Ct,St,S.encoding,S.isVideoTexture);Z(ht,S,yt);let q;const lt=S.mipmaps,wt=o&&S.isVideoTexture!==!0,Ot=_t.__version===void 0||dt===!0,D=T(S,U,yt);if(S.isDepthTexture)Dt=6402,o?S.type===Un?Dt=36012:S.type===kn?Dt=33190:S.type===ui?Dt=35056:Dt=33189:S.type===Un&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Bn&&Dt===6402&&S.type!==ta&&S.type!==kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=kn,St=r.convert(S.type)),S.format===di&&Dt===6402&&(Dt=34041,S.type!==ui&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=ui,St=r.convert(S.type))),Ot&&(wt?e.texStorage2D(3553,1,Dt,U.width,U.height):e.texImage2D(3553,0,Dt,U.width,U.height,0,Ct,St,null));else if(S.isDataTexture)if(lt.length>0&&yt){wt&&Ot&&e.texStorage2D(3553,D,Dt,lt[0].width,lt[0].height);for(let G=0,X=lt.length;G<X;G++)q=lt[G],wt?e.texSubImage2D(3553,G,0,0,q.width,q.height,Ct,St,q.data):e.texImage2D(3553,G,Dt,q.width,q.height,0,Ct,St,q.data);S.generateMipmaps=!1}else wt?(Ot&&e.texStorage2D(3553,D,Dt,U.width,U.height),e.texSubImage2D(3553,0,0,0,U.width,U.height,Ct,St,U.data)):e.texImage2D(3553,0,Dt,U.width,U.height,0,Ct,St,U.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){wt&&Ot&&e.texStorage3D(35866,D,Dt,lt[0].width,lt[0].height,U.depth);for(let G=0,X=lt.length;G<X;G++)q=lt[G],S.format!==Ke?Ct!==null?wt?e.compressedTexSubImage3D(35866,G,0,0,0,q.width,q.height,U.depth,Ct,q.data,0,0):e.compressedTexImage3D(35866,G,Dt,q.width,q.height,U.depth,0,q.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):wt?e.texSubImage3D(35866,G,0,0,0,q.width,q.height,U.depth,Ct,St,q.data):e.texImage3D(35866,G,Dt,q.width,q.height,U.depth,0,Ct,St,q.data)}else{wt&&Ot&&e.texStorage2D(3553,D,Dt,lt[0].width,lt[0].height);for(let G=0,X=lt.length;G<X;G++)q=lt[G],S.format!==Ke?Ct!==null?wt?e.compressedTexSubImage2D(3553,G,0,0,q.width,q.height,Ct,q.data):e.compressedTexImage2D(3553,G,Dt,q.width,q.height,0,q.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):wt?e.texSubImage2D(3553,G,0,0,q.width,q.height,Ct,St,q.data):e.texImage2D(3553,G,Dt,q.width,q.height,0,Ct,St,q.data)}else if(S.isDataArrayTexture)wt?(Ot&&e.texStorage3D(35866,D,Dt,U.width,U.height,U.depth),e.texSubImage3D(35866,0,0,0,0,U.width,U.height,U.depth,Ct,St,U.data)):e.texImage3D(35866,0,Dt,U.width,U.height,U.depth,0,Ct,St,U.data);else if(S.isData3DTexture)wt?(Ot&&e.texStorage3D(32879,D,Dt,U.width,U.height,U.depth),e.texSubImage3D(32879,0,0,0,0,U.width,U.height,U.depth,Ct,St,U.data)):e.texImage3D(32879,0,Dt,U.width,U.height,U.depth,0,Ct,St,U.data);else if(S.isFramebufferTexture){if(Ot)if(wt)e.texStorage2D(3553,D,Dt,U.width,U.height);else{let G=U.width,X=U.height;for(let ct=0;ct<D;ct++)e.texImage2D(3553,ct,Dt,G,X,0,Ct,St,null),G>>=1,X>>=1}}else if(lt.length>0&&yt){wt&&Ot&&e.texStorage2D(3553,D,Dt,lt[0].width,lt[0].height);for(let G=0,X=lt.length;G<X;G++)q=lt[G],wt?e.texSubImage2D(3553,G,0,0,Ct,St,q):e.texImage2D(3553,G,Dt,Ct,St,q);S.generateMipmaps=!1}else wt?(Ot&&e.texStorage2D(3553,D,Dt,U.width,U.height),e.texSubImage2D(3553,0,0,0,Ct,St,U)):e.texImage2D(3553,0,Dt,Ct,St,U);w(S,yt)&&A(ht),_t.__version=pt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Et(P,S,$){if(S.image.length!==6)return;const ht=At(P,S),dt=S.source;e.bindTexture(34067,P.__webglTexture,33984+$);const pt=n.get(dt);if(dt.version!==pt.__version||ht===!0){e.activeTexture(33984+$),s.pixelStorei(37440,S.flipY),s.pixelStorei(37441,S.premultiplyAlpha),s.pixelStorei(3317,S.unpackAlignment),s.pixelStorei(37443,0);const _t=S.isCompressedTexture||S.image[0].isCompressedTexture,L=S.image[0]&&S.image[0].isDataTexture,U=[];for(let G=0;G<6;G++)!_t&&!L?U[G]=v(S.image[G],!1,!0,c):U[G]=L?S.image[G].image:S.image[G],U[G]=Wt(S,U[G]);const yt=U[0],Ct=b(yt)||o,St=r.convert(S.format,S.encoding),Dt=r.convert(S.type),q=M(S.internalFormat,St,Dt,S.encoding),lt=o&&S.isVideoTexture!==!0,wt=pt.__version===void 0||ht===!0;let Ot=T(S,yt,Ct);Z(34067,S,Ct);let D;if(_t){lt&&wt&&e.texStorage2D(34067,Ot,q,yt.width,yt.height);for(let G=0;G<6;G++){D=U[G].mipmaps;for(let X=0;X<D.length;X++){const ct=D[X];S.format!==Ke?St!==null?lt?e.compressedTexSubImage2D(34069+G,X,0,0,ct.width,ct.height,St,ct.data):e.compressedTexImage2D(34069+G,X,q,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?e.texSubImage2D(34069+G,X,0,0,ct.width,ct.height,St,Dt,ct.data):e.texImage2D(34069+G,X,q,ct.width,ct.height,0,St,Dt,ct.data)}}}else{D=S.mipmaps,lt&&wt&&(D.length>0&&Ot++,e.texStorage2D(34067,Ot,q,U[0].width,U[0].height));for(let G=0;G<6;G++)if(L){lt?e.texSubImage2D(34069+G,0,0,0,U[G].width,U[G].height,St,Dt,U[G].data):e.texImage2D(34069+G,0,q,U[G].width,U[G].height,0,St,Dt,U[G].data);for(let X=0;X<D.length;X++){const Mt=D[X].image[G].image;lt?e.texSubImage2D(34069+G,X+1,0,0,Mt.width,Mt.height,St,Dt,Mt.data):e.texImage2D(34069+G,X+1,q,Mt.width,Mt.height,0,St,Dt,Mt.data)}}else{lt?e.texSubImage2D(34069+G,0,0,0,St,Dt,U[G]):e.texImage2D(34069+G,0,q,St,Dt,U[G]);for(let X=0;X<D.length;X++){const ct=D[X];lt?e.texSubImage2D(34069+G,X+1,0,0,St,Dt,ct.image[G]):e.texImage2D(34069+G,X+1,q,St,Dt,ct.image[G])}}}w(S,Ct)&&A(34067),pt.__version=dt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ut(P,S,$,ht,dt){const pt=r.convert($.format,$.encoding),_t=r.convert($.type),L=M($.internalFormat,pt,_t,$.encoding);n.get(S).__hasExternalTextures||(dt===32879||dt===35866?e.texImage3D(dt,0,L,S.width,S.height,S.depth,0,pt,_t,null):e.texImage2D(dt,0,L,S.width,S.height,0,pt,_t,null)),e.bindFramebuffer(36160,P),Pt(S)?f.framebufferTexture2DMultisampleEXT(36160,ht,dt,n.get($).__webglTexture,0,Rt(S)):(dt===3553||dt>=34069&&dt<=34074)&&s.framebufferTexture2D(36160,ht,dt,n.get($).__webglTexture,0),e.bindFramebuffer(36160,null)}function Ft(P,S,$){if(s.bindRenderbuffer(36161,P),S.depthBuffer&&!S.stencilBuffer){let ht=33189;if($||Pt(S)){const dt=S.depthTexture;dt&&dt.isDepthTexture&&(dt.type===Un?ht=36012:dt.type===kn&&(ht=33190));const pt=Rt(S);Pt(S)?f.renderbufferStorageMultisampleEXT(36161,pt,ht,S.width,S.height):s.renderbufferStorageMultisample(36161,pt,ht,S.width,S.height)}else s.renderbufferStorage(36161,ht,S.width,S.height);s.framebufferRenderbuffer(36160,36096,36161,P)}else if(S.depthBuffer&&S.stencilBuffer){const ht=Rt(S);$&&Pt(S)===!1?s.renderbufferStorageMultisample(36161,ht,35056,S.width,S.height):Pt(S)?f.renderbufferStorageMultisampleEXT(36161,ht,35056,S.width,S.height):s.renderbufferStorage(36161,34041,S.width,S.height),s.framebufferRenderbuffer(36160,33306,36161,P)}else{const ht=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let dt=0;dt<ht.length;dt++){const pt=ht[dt],_t=r.convert(pt.format,pt.encoding),L=r.convert(pt.type),U=M(pt.internalFormat,_t,L,pt.encoding),yt=Rt(S);$&&Pt(S)===!1?s.renderbufferStorageMultisample(36161,yt,U,S.width,S.height):Pt(S)?f.renderbufferStorageMultisampleEXT(36161,yt,U,S.width,S.height):s.renderbufferStorage(36161,U,S.width,S.height)}}s.bindRenderbuffer(36161,null)}function nt(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),z(S.depthTexture,0);const ht=n.get(S.depthTexture).__webglTexture,dt=Rt(S);if(S.depthTexture.format===Bn)Pt(S)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,ht,0,dt):s.framebufferTexture2D(36160,36096,3553,ht,0);else if(S.depthTexture.format===di)Pt(S)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,ht,0,dt):s.framebufferTexture2D(36160,33306,3553,ht,0);else throw new Error("Unknown depthTexture format")}function it(P){const S=n.get(P),$=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");nt(S.__webglFramebuffer,P)}else if($){S.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)e.bindFramebuffer(36160,S.__webglFramebuffer[ht]),S.__webglDepthbuffer[ht]=s.createRenderbuffer(),Ft(S.__webglDepthbuffer[ht],P,!1)}else e.bindFramebuffer(36160,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),Ft(S.__webglDepthbuffer,P,!1);e.bindFramebuffer(36160,null)}function ot(P,S,$){const ht=n.get(P);S!==void 0&&ut(ht.__webglFramebuffer,P,P.texture,36064,3553),$!==void 0&&it(P)}function bt(P){const S=P.texture,$=n.get(P),ht=n.get(S);P.addEventListener("dispose",K),P.isWebGLMultipleRenderTargets!==!0&&(ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture()),ht.__version=S.version,a.memory.textures++);const dt=P.isWebGLCubeRenderTarget===!0,pt=P.isWebGLMultipleRenderTargets===!0,_t=b(P)||o;if(dt){$.__webglFramebuffer=[];for(let L=0;L<6;L++)$.__webglFramebuffer[L]=s.createFramebuffer()}else{if($.__webglFramebuffer=s.createFramebuffer(),pt)if(i.drawBuffers){const L=P.texture;for(let U=0,yt=L.length;U<yt;U++){const Ct=n.get(L[U]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&P.samples>0&&Pt(P)===!1){const L=pt?S:[S];$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,$.__webglMultisampledFramebuffer);for(let U=0;U<L.length;U++){const yt=L[U];$.__webglColorRenderbuffer[U]=s.createRenderbuffer(),s.bindRenderbuffer(36161,$.__webglColorRenderbuffer[U]);const Ct=r.convert(yt.format,yt.encoding),St=r.convert(yt.type),Dt=M(yt.internalFormat,Ct,St,yt.encoding,P.isXRRenderTarget===!0),q=Rt(P);s.renderbufferStorageMultisample(36161,q,Dt,P.width,P.height),s.framebufferRenderbuffer(36160,36064+U,36161,$.__webglColorRenderbuffer[U])}s.bindRenderbuffer(36161,null),P.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),Ft($.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(36160,null)}}if(dt){e.bindTexture(34067,ht.__webglTexture),Z(34067,S,_t);for(let L=0;L<6;L++)ut($.__webglFramebuffer[L],P,S,36064,34069+L);w(S,_t)&&A(34067),e.unbindTexture()}else if(pt){const L=P.texture;for(let U=0,yt=L.length;U<yt;U++){const Ct=L[U],St=n.get(Ct);e.bindTexture(3553,St.__webglTexture),Z(3553,Ct,_t),ut($.__webglFramebuffer,P,Ct,36064+U,3553),w(Ct,_t)&&A(3553)}e.unbindTexture()}else{let L=3553;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(o?L=P.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(L,ht.__webglTexture),Z(L,S,_t),ut($.__webglFramebuffer,P,S,36064,L),w(S,_t)&&A(L),e.unbindTexture()}P.depthBuffer&&it(P)}function ft(P){const S=b(P)||o,$=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ht=0,dt=$.length;ht<dt;ht++){const pt=$[ht];if(w(pt,S)){const _t=P.isWebGLCubeRenderTarget?34067:3553,L=n.get(pt).__webglTexture;e.bindTexture(_t,L),A(_t),e.unbindTexture()}}}function It(P){if(o&&P.samples>0&&Pt(P)===!1){const S=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],$=P.width,ht=P.height;let dt=16384;const pt=[],_t=P.stencilBuffer?33306:36096,L=n.get(P),U=P.isWebGLMultipleRenderTargets===!0;if(U)for(let yt=0;yt<S.length;yt++)e.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+yt,36161,null),e.bindFramebuffer(36160,L.__webglFramebuffer),s.framebufferTexture2D(36009,36064+yt,3553,null,0);e.bindFramebuffer(36008,L.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,L.__webglFramebuffer);for(let yt=0;yt<S.length;yt++){pt.push(36064+yt),P.depthBuffer&&pt.push(_t);const Ct=L.__ignoreDepthValues!==void 0?L.__ignoreDepthValues:!1;if(Ct===!1&&(P.depthBuffer&&(dt|=256),P.stencilBuffer&&(dt|=1024)),U&&s.framebufferRenderbuffer(36008,36064,36161,L.__webglColorRenderbuffer[yt]),Ct===!0&&(s.invalidateFramebuffer(36008,[_t]),s.invalidateFramebuffer(36009,[_t])),U){const St=n.get(S[yt]).__webglTexture;s.framebufferTexture2D(36009,36064,3553,St,0)}s.blitFramebuffer(0,0,$,ht,0,0,$,ht,dt,9728),m&&s.invalidateFramebuffer(36008,pt)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),U)for(let yt=0;yt<S.length;yt++){e.bindFramebuffer(36160,L.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+yt,36161,L.__webglColorRenderbuffer[yt]);const Ct=n.get(S[yt]).__webglTexture;e.bindFramebuffer(36160,L.__webglFramebuffer),s.framebufferTexture2D(36009,36064+yt,3553,Ct,0)}e.bindFramebuffer(36009,L.__webglMultisampledFramebuffer)}}function Rt(P){return Math.min(u,P.samples)}function Pt(P){const S=n.get(P);return o&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function kt(P){const S=a.render.frame;g.get(P)!==S&&(g.set(P,S),P.update())}function Wt(P,S){const $=P.encoding,ht=P.format,dt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Cr||$!==Gn&&($===ie?o===!1?t.has("EXT_sRGB")===!0&&ht===Ke?(P.format=Cr,P.minFilter=He,P.generateMipmaps=!1):S=Aa.sRGBToLinear(S):(ht!==Ke||dt!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",$)),S}this.allocateTextureUnit=j,this.resetTextureUnits=tt,this.setTexture2D=z,this.setTexture2DArray=N,this.setTexture3D=k,this.setTextureCube=et,this.rebindTextures=ot,this.setupRenderTarget=bt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=Pt}function Rm(s,t,e){const n=e.isWebGL2;function i(r,a=null){let o;if(r===Nn)return 5121;if(r===Xh)return 32819;if(r===Yh)return 32820;if(r===Hh)return 5120;if(r===Vh)return 5122;if(r===ta)return 5123;if(r===Wh)return 5124;if(r===kn)return 5125;if(r===Un)return 5126;if(r===hi)return n?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===qh)return 6406;if(r===Ke)return 6408;if(r===Zh)return 6409;if(r===$h)return 6410;if(r===Bn)return 6402;if(r===di)return 34041;if(r===jh)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(r===Cr)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Jh)return 6403;if(r===Kh)return 36244;if(r===ea)return 33319;if(r===Qh)return 33320;if(r===tu)return 36249;if(r===yr||r===br||r===Mr||r===wr)if(a===ie)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===yr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===wr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===yr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===br)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===wr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===na||r===ia||r===sa||r===ra)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===na)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ia)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===sa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ra)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===eu)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===oa||r===aa)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===oa)return a===ie?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===aa)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===la||r===ca||r===ha||r===ua||r===da||r===fa||r===pa||r===ma||r===ga||r===xa||r===va||r===_a||r===ya||r===ba)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===la)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ca)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ha)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ua)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===da)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===fa)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===pa)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ma)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ga)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xa)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===va)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===_a)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ya)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ba)return a===ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ma)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Ma)return a===ie?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return r===ui?n?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Dm extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vt extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Im={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const p of t.hand.values()){const d=e.getJointPose(p,n),_=this._getHandJoint(c,p);d!==null&&(_.matrix.fromArray(d.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=d.radius),_.visible=d!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Vt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Fm extends Ie{constructor(t,e,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:Bn,h!==Bn&&h!==di)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bn&&(n=kn),n===void 0&&h===di&&(n=ui),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ce,this.minFilter=l!==void 0?l:Ce,this.flipY=!1,this.generateMipmaps=!1}}class Om extends Hn{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=null,c=null,h=null,u=null,f=null,m=null;const g=e.getContextAttributes();let p=null,d=null;const _=[],x=[],v=new Set,b=new Map,y=new $e;y.layers.enable(1),y.viewport=new Se;const w=new $e;w.layers.enable(2),w.viewport=new Se;const A=[y,w],M=new Dm;M.layers.enable(1),M.layers.enable(2);let T=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let k=_[N];return k===void 0&&(k=new oo,_[N]=k),k.getTargetRaySpace()},this.getControllerGrip=function(N){let k=_[N];return k===void 0&&(k=new oo,_[N]=k),k.getGripSpace()},this.getHand=function(N){let k=_[N];return k===void 0&&(k=new oo,_[N]=k),k.getHandSpace()};function V(N){const k=x.indexOf(N.inputSource);if(k===-1)return;const et=_[k];et!==void 0&&et.dispatchEvent({type:N.type,data:N.inputSource})}function K(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",H);for(let N=0;N<_.length;N++){const k=x[N];k!==null&&(x[N]=null,_[N].disconnect(k))}T=null,R=null,t.setRenderTarget(p),f=null,u=null,h=null,i=null,d=null,z.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){r=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",K),i.addEventListener("inputsourceschange",H),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const k={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,k),i.updateRenderState({baseLayer:f}),d=new tn(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:Nn,encoding:t.outputEncoding,stencilBuffer:g.stencil})}else{let k=null,et=null,J=null;g.depth&&(J=g.stencil?35056:33190,k=g.stencil?di:Bn,et=g.stencil?ui:kn);const at={colorFormat:32856,depthFormat:J,scaleFactor:r};h=new XRWebGLBinding(i,e),u=h.createProjectionLayer(at),i.updateRenderState({layers:[u]}),d=new tn(u.textureWidth,u.textureHeight,{format:Ke,type:Nn,depthTexture:new Fm(u.textureWidth,u.textureHeight,et,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});const Z=t.properties.get(d);Z.__ignoreDepthValues=u.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),l=null,a=await i.requestReferenceSpace(o),z.setContext(i),z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function H(N){for(let k=0;k<N.removed.length;k++){const et=N.removed[k],J=x.indexOf(et);J>=0&&(x[J]=null,_[J].disconnect(et))}for(let k=0;k<N.added.length;k++){const et=N.added[k];let J=x.indexOf(et);if(J===-1){for(let Z=0;Z<_.length;Z++)if(Z>=x.length){x.push(et),J=Z;break}else if(x[Z]===null){x[Z]=et,J=Z;break}if(J===-1)break}const at=_[J];at&&at.connect(et)}}const O=new E,F=new E;function Y(N,k,et){O.setFromMatrixPosition(k.matrixWorld),F.setFromMatrixPosition(et.matrixWorld);const J=O.distanceTo(F),at=k.projectionMatrix.elements,Z=et.projectionMatrix.elements,At=at[14]/(at[10]-1),vt=at[14]/(at[10]+1),Et=(at[9]+1)/at[5],ut=(at[9]-1)/at[5],Ft=(at[8]-1)/at[0],nt=(Z[8]+1)/Z[0],it=At*Ft,ot=At*nt,bt=J/(-Ft+nt),ft=bt*-Ft;k.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ft),N.translateZ(bt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const It=At+bt,Rt=vt+bt,Pt=it-ft,kt=ot+(J-ft),Wt=Et*vt/Rt*It,P=ut*vt/Rt*It;N.projectionMatrix.makePerspective(Pt,kt,Wt,P,It,Rt)}function tt(N,k){k===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(k.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;M.near=w.near=y.near=N.near,M.far=w.far=y.far=N.far,(T!==M.near||R!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,R=M.far);const k=N.parent,et=M.cameras;tt(M,k);for(let at=0;at<et.length;at++)tt(et[at],k);M.matrixWorld.decompose(M.position,M.quaternion,M.scale),N.matrix.copy(M.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale);const J=N.children;for(let at=0,Z=J.length;at<Z;at++)J[at].updateMatrixWorld(!0);et.length===2?Y(M,y,w):M.projectionMatrix.copy(y.projectionMatrix)},this.getCamera=function(){return M},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(N){u!==null&&(u.fixedFoveation=N),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=N)},this.getPlanes=function(){return v};let j=null;function I(N,k){if(c=k.getViewerPose(l||a),m=k,c!==null){const et=c.views;f!==null&&(t.setRenderTargetFramebuffer(d,f.framebuffer),t.setRenderTarget(d));let J=!1;et.length!==M.cameras.length&&(M.cameras.length=0,J=!0);for(let at=0;at<et.length;at++){const Z=et[at];let At=null;if(f!==null)At=f.getViewport(Z);else{const Et=h.getViewSubImage(u,Z);At=Et.viewport,at===0&&(t.setRenderTargetTextures(d,Et.colorTexture,u.ignoreDepthValues?void 0:Et.depthStencilTexture),t.setRenderTarget(d))}let vt=A[at];vt===void 0&&(vt=new $e,vt.layers.enable(at),vt.viewport=new Se,A[at]=vt),vt.matrix.fromArray(Z.transform.matrix),vt.projectionMatrix.fromArray(Z.projectionMatrix),vt.viewport.set(At.x,At.y,At.width,At.height),at===0&&M.matrix.copy(vt.matrix),J===!0&&M.cameras.push(vt)}}for(let et=0;et<_.length;et++){const J=x[et],at=_[et];J!==null&&at!==void 0&&at.update(J,k,l||a)}if(j&&j(N,k),k.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:k.detectedPlanes});let et=null;for(const J of v)k.detectedPlanes.has(J)||(et===null&&(et=[]),et.push(J));if(et!==null)for(const J of et)v.delete(J),b.delete(J),n.dispatchEvent({type:"planeremoved",data:J});for(const J of k.detectedPlanes)if(!v.has(J))v.add(J),b.set(J,k.lastChangedTime),n.dispatchEvent({type:"planeadded",data:J});else{const at=b.get(J);J.lastChangedTime>at&&(b.set(J,J.lastChangedTime),n.dispatchEvent({type:"planechanged",data:J}))}}m=null}const z=new qa;z.setAnimationLoop(I),this.setAnimationLoop=function(N){j=N},this.dispose=function(){}}}function zm(s,t){function e(p,d){d.color.getRGB(p.fogColor.value,Va(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function n(p,d,_,x,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?i(p,d):d.isMeshToonMaterial?(i(p,d),h(p,d)):d.isMeshPhongMaterial?(i(p,d),c(p,d)):d.isMeshStandardMaterial?(i(p,d),u(p,d),d.isMeshPhysicalMaterial&&f(p,d,v)):d.isMeshMatcapMaterial?(i(p,d),m(p,d)):d.isMeshDepthMaterial?i(p,d):d.isMeshDistanceMaterial?(i(p,d),g(p,d)):d.isMeshNormalMaterial?i(p,d):d.isLineBasicMaterial?(r(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?o(p,d,_,x):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function i(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.bumpMap&&(p.bumpMap.value=d.bumpMap,p.bumpScale.value=d.bumpScale,d.side===Ge&&(p.bumpScale.value*=-1)),d.displacementMap&&(p.displacementMap.value=d.displacementMap,p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap),d.normalMap&&(p.normalMap.value=d.normalMap,p.normalScale.value.copy(d.normalScale),d.side===Ge&&p.normalScale.value.negate()),d.specularMap&&(p.specularMap.value=d.specularMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const _=t.get(d).envMap;if(_&&(p.envMap.value=_,p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const b=s.physicallyCorrectLights!==!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*b}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity);let x;d.map?x=d.map:d.specularMap?x=d.specularMap:d.displacementMap?x=d.displacementMap:d.normalMap?x=d.normalMap:d.bumpMap?x=d.bumpMap:d.roughnessMap?x=d.roughnessMap:d.metalnessMap?x=d.metalnessMap:d.alphaMap?x=d.alphaMap:d.emissiveMap?x=d.emissiveMap:d.clearcoatMap?x=d.clearcoatMap:d.clearcoatNormalMap?x=d.clearcoatNormalMap:d.clearcoatRoughnessMap?x=d.clearcoatRoughnessMap:d.iridescenceMap?x=d.iridescenceMap:d.iridescenceThicknessMap?x=d.iridescenceThicknessMap:d.specularIntensityMap?x=d.specularIntensityMap:d.specularColorMap?x=d.specularColorMap:d.transmissionMap?x=d.transmissionMap:d.thicknessMap?x=d.thicknessMap:d.sheenColorMap?x=d.sheenColorMap:d.sheenRoughnessMap&&(x=d.sheenRoughnessMap),x!==void 0&&(x.isWebGLRenderTarget&&(x=x.texture),x.matrixAutoUpdate===!0&&x.updateMatrix(),p.uvTransform.value.copy(x.matrix));let v;d.aoMap?v=d.aoMap:d.lightMap&&(v=d.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uv2Transform.value.copy(v.matrix))}function r(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function o(p,d,_,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*_,p.scale.value=x*.5,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let v;d.map?v=d.map:d.alphaMap&&(v=d.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uvTransform.value.copy(v.matrix))}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let _;d.map?_=d.map:d.alphaMap&&(_=d.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),p.uvTransform.value.copy(_.matrix))}function c(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function h(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function u(p,d){p.roughness.value=d.roughness,p.metalness.value=d.metalness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap),t.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function f(p,d,_){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),p.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===Ge&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap)}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){p.referencePosition.value.copy(d.referencePosition),p.nearDistance.value=d.nearDistance,p.farDistance.value=d.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function Nm(s,t,e,n){let i={},r={},a=[];const o=e.isWebGL2?s.getParameter(35375):0;function l(x,v){const b=v.program;n.uniformBlockBinding(x,b)}function c(x,v){let b=i[x.id];b===void 0&&(g(x),b=h(x),i[x.id]=b,x.addEventListener("dispose",d));const y=v.program;n.updateUBOMapping(x,y);const w=t.render.frame;r[x.id]!==w&&(f(x),r[x.id]=w)}function h(x){const v=u();x.__bindingPointIndex=v;const b=s.createBuffer(),y=x.__size,w=x.usage;return s.bindBuffer(35345,b),s.bufferData(35345,y,w),s.bindBuffer(35345,null),s.bindBufferBase(35345,v,b),b}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],b=x.uniforms,y=x.__cache;s.bindBuffer(35345,v);for(let w=0,A=b.length;w<A;w++){const M=b[w];if(m(M,w,y)===!0){const T=M.value,R=M.__offset;typeof T=="number"?(M.__data[0]=T,s.bufferSubData(35345,R,M.__data)):(M.value.isMatrix3?(M.__data[0]=M.value.elements[0],M.__data[1]=M.value.elements[1],M.__data[2]=M.value.elements[2],M.__data[3]=M.value.elements[0],M.__data[4]=M.value.elements[3],M.__data[5]=M.value.elements[4],M.__data[6]=M.value.elements[5],M.__data[7]=M.value.elements[0],M.__data[8]=M.value.elements[6],M.__data[9]=M.value.elements[7],M.__data[10]=M.value.elements[8],M.__data[11]=M.value.elements[0]):T.toArray(M.__data),s.bufferSubData(35345,R,M.__data))}}s.bindBuffer(35345,null)}function m(x,v,b){const y=x.value;if(b[v]===void 0)return typeof y=="number"?b[v]=y:b[v]=y.clone(),!0;if(typeof y=="number"){if(b[v]!==y)return b[v]=y,!0}else{const w=b[v];if(w.equals(y)===!1)return w.copy(y),!0}return!1}function g(x){const v=x.uniforms;let b=0;const y=16;let w=0;for(let A=0,M=v.length;A<M;A++){const T=v[A],R=p(T);if(T.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),T.__offset=b,A>0){w=b%y;const V=y-w;w!==0&&V-R.boundary<0&&(b+=y-w,T.__offset=b)}b+=R.storage}return w=b%y,w>0&&(b+=y-w),x.__size=b,x.__cache={},this}function p(x){const v=x.value,b={boundary:0,storage:0};return typeof v=="number"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),b}function d(x){const v=x.target;v.removeEventListener("dispose",d);const b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function _(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:_}}function km(){const s=_s("canvas");return s.style.display="block",s}function yl(s={}){this.isWebGLRenderer=!0;const t=s.canvas!==void 0?s.canvas:km(),e=s.context!==void 0?s.context:null,n=s.depth!==void 0?s.depth:!0,i=s.stencil!==void 0?s.stencil:!0,r=s.antialias!==void 0?s.antialias:!1,a=s.premultipliedAlpha!==void 0?s.premultipliedAlpha:!0,o=s.preserveDrawingBuffer!==void 0?s.preserveDrawingBuffer:!1,l=s.powerPreference!==void 0?s.powerPreference:"default",c=s.failIfMajorPerformanceCaveat!==void 0?s.failIfMajorPerformanceCaveat:!1;let h;e!==null?h=e.getContextAttributes().alpha:h=s.alpha!==void 0?s.alpha:!1;let u=null,f=null;const m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Gn,this.physicallyCorrectLights=!1,this.toneMapping=hn,this.toneMappingExposure=1;const p=this;let d=!1,_=0,x=0,v=null,b=-1,y=null;const w=new Se,A=new Se;let M=null,T=t.width,R=t.height,V=1,K=null,H=null;const O=new Se(0,0,T,R),F=new Se(0,0,T,R);let Y=!1;const tt=new Ya;let j=!1,I=!1,z=null;const N=new Qt,k=new rt,et=new E,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function at(){return v===null?V:1}let Z=e;function At(C,W){for(let Q=0;Q<C.length;Q++){const B=C[Q],st=t.getContext(B,W);if(st!==null)return st}return null}try{const C={alpha:!0,depth:n,stencil:i,antialias:r,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r147"),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",lt,!1),Z===null){const W=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&W.shift(),Z=At(W,C),Z===null)throw At(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let vt,Et,ut,Ft,nt,it,ot,bt,ft,It,Rt,Pt,kt,Wt,P,S,$,ht,dt,pt,_t,L,U,yt;function Ct(){vt=new Zf(Z),Et=new Vf(Z,vt,s),vt.init(Et),L=new Rm(Z,vt,Et),ut=new Pm(Z,vt,Et),Ft=new Kf,nt=new mm,it=new Lm(Z,vt,ut,nt,Et,L,Ft),ot=new Xf(p),bt=new jf(p),ft=new Bu(Z,Et),U=new Gf(Z,vt,ft,Et),It=new $f(Z,ft,Ft,U),Rt=new np(Z,It,ft,Ft),dt=new ep(Z,Et,it),S=new Wf(nt),Pt=new pm(p,ot,bt,vt,Et,U,S),kt=new zm(p,nt),Wt=new xm,P=new wm(vt,Et),ht=new Bf(p,ot,bt,ut,Rt,h,a),$=new Am(p,Rt,Et),yt=new Nm(Z,Ft,Et,ut),pt=new Hf(Z,vt,Ft,Et),_t=new Jf(Z,vt,Ft,Et),Ft.programs=Pt.programs,p.capabilities=Et,p.extensions=vt,p.properties=nt,p.renderLists=Wt,p.shadowMap=$,p.state=ut,p.info=Ft}Ct();const St=new Om(p,Z);this.xr=St,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const C=vt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=vt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize(T,R,!1))},this.getSize=function(C){return C.set(T,R)},this.setSize=function(C,W,Q){if(St.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}T=C,R=W,t.width=Math.floor(C*V),t.height=Math.floor(W*V),Q!==!1&&(t.style.width=C+"px",t.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(T*V,R*V).floor()},this.setDrawingBufferSize=function(C,W,Q){T=C,R=W,V=Q,t.width=Math.floor(C*Q),t.height=Math.floor(W*Q),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(O)},this.setViewport=function(C,W,Q,B){C.isVector4?O.set(C.x,C.y,C.z,C.w):O.set(C,W,Q,B),ut.viewport(w.copy(O).multiplyScalar(V).floor())},this.getScissor=function(C){return C.copy(F)},this.setScissor=function(C,W,Q,B){C.isVector4?F.set(C.x,C.y,C.z,C.w):F.set(C,W,Q,B),ut.scissor(A.copy(F).multiplyScalar(V).floor())},this.getScissorTest=function(){return Y},this.setScissorTest=function(C){ut.setScissorTest(Y=C)},this.setOpaqueSort=function(C){K=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor.apply(ht,arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha.apply(ht,arguments)},this.clear=function(C=!0,W=!0,Q=!0){let B=0;C&&(B|=16384),W&&(B|=256),Q&&(B|=1024),Z.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",lt,!1),Wt.dispose(),P.dispose(),nt.dispose(),ot.dispose(),bt.dispose(),Rt.dispose(),U.dispose(),yt.dispose(),Pt.dispose(),St.dispose(),St.removeEventListener("sessionstart",ct),St.removeEventListener("sessionend",Mt),z&&(z.dispose(),z=null),Xt.stop()};function Dt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;const C=Ft.autoReset,W=$.enabled,Q=$.autoUpdate,B=$.needsUpdate,st=$.type;Ct(),Ft.autoReset=C,$.enabled=W,$.autoUpdate=Q,$.needsUpdate=B,$.type=st}function lt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function wt(C){const W=C.target;W.removeEventListener("dispose",wt),Ot(W)}function Ot(C){D(C),nt.remove(C)}function D(C){const W=nt.get(C).programs;W!==void 0&&(W.forEach(function(Q){Pt.releaseProgram(Q)}),C.isShaderMaterial&&Pt.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,Q,B,st,zt){W===null&&(W=J);const Ut=st.isMesh&&st.matrixWorld.determinant()<0,Gt=Gi(C,W,Q,B,st);ut.setMaterial(B,Ut);let Ht=Q.index,$t=1;B.wireframe===!0&&(Ht=It.getWireframeAttribute(Q),$t=2);const Yt=Q.drawRange,qt=Q.attributes.position;let pe=Yt.start*$t,Ye=(Yt.start+Yt.count)*$t;zt!==null&&(pe=Math.max(pe,zt.start*$t),Ye=Math.min(Ye,(zt.start+zt.count)*$t)),Ht!==null?(pe=Math.max(pe,0),Ye=Math.min(Ye,Ht.count)):qt!=null&&(pe=Math.max(pe,0),Ye=Math.min(Ye,qt.count));const yn=Ye-pe;if(yn<0||yn===1/0)return;U.setup(st,B,Gt,Q,Ht);let ei,me=pt;if(Ht!==null&&(ei=ft.get(Ht),me=_t,me.setIndex(ei)),st.isMesh)B.wireframe===!0?(ut.setLineWidth(B.wireframeLinewidth*at()),me.setMode(1)):me.setMode(4);else if(st.isLine){let jt=B.linewidth;jt===void 0&&(jt=1),ut.setLineWidth(jt*at()),st.isLineSegments?me.setMode(1):st.isLineLoop?me.setMode(2):me.setMode(3)}else st.isPoints?me.setMode(0):st.isSprite&&me.setMode(4);if(st.isInstancedMesh)me.renderInstances(pe,yn,st.count);else if(Q.isInstancedBufferGeometry){const jt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,ko=Math.min(Q.instanceCount,jt);me.renderInstances(pe,yn,ko)}else me.render(pe,yn)},this.compile=function(C,W){function Q(B,st,zt){B.transparent===!0&&B.side===ae?(B.side=Ge,B.needsUpdate=!0,Re(B,st,zt),B.side=ri,B.needsUpdate=!0,Re(B,st,zt),B.side=ae):Re(B,st,zt)}f=P.get(C),f.init(),g.push(f),C.traverseVisible(function(B){B.isLight&&B.layers.test(W.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),f.setupLights(p.physicallyCorrectLights),C.traverse(function(B){const st=B.material;if(st)if(Array.isArray(st))for(let zt=0;zt<st.length;zt++){const Ut=st[zt];Q(Ut,C,B)}else Q(st,C,B)}),g.pop(),f=null};let G=null;function X(C){G&&G(C)}function ct(){Xt.stop()}function Mt(){Xt.start()}const Xt=new qa;Xt.setAnimationLoop(X),typeof self!="undefined"&&Xt.setContext(self),this.setAnimationLoop=function(C){G=C,St.setAnimationLoop(C),C===null?Xt.stop():Xt.start()},St.addEventListener("sessionstart",ct),St.addEventListener("sessionend",Mt),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(St.cameraAutoUpdate===!0&&St.updateCamera(W),W=St.getCamera()),C.isScene===!0&&C.onBeforeRender(p,C,W,v),f=P.get(C,g.length),f.init(),g.push(f),N.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),tt.setFromProjectionMatrix(N),I=this.localClippingEnabled,j=S.init(this.clippingPlanes,I,W),u=Wt.get(C,m.length),u.init(),m.push(u),oe(C,W,0,p.sortObjects),u.finish(),p.sortObjects===!0&&u.sort(K,H),j===!0&&S.beginShadows();const Q=f.state.shadowsArray;if($.render(Q,C,W),j===!0&&S.endShadows(),this.info.autoReset===!0&&this.info.reset(),ht.render(u,C),f.setupLights(p.physicallyCorrectLights),W.isArrayCamera){const B=W.cameras;for(let st=0,zt=B.length;st<zt;st++){const Ut=B[st];fe(u,C,Ut,Ut.viewport)}}else fe(u,C,W);v!==null&&(it.updateMultisampleRenderTarget(v),it.updateRenderTargetMipmap(v)),C.isScene===!0&&C.onAfterRender(p,C,W),U.resetDefaultState(),b=-1,y=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function oe(C,W,Q,B){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)f.pushLight(C),C.castShadow&&f.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||tt.intersectsSprite(C)){B&&et.setFromMatrixPosition(C.matrixWorld).applyMatrix4(N);const Ut=Rt.update(C),Gt=C.material;Gt.visible&&u.push(C,Ut,Gt,Q,et.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(C.isSkinnedMesh&&C.skeleton.frame!==Ft.render.frame&&(C.skeleton.update(),C.skeleton.frame=Ft.render.frame),!C.frustumCulled||tt.intersectsObject(C))){B&&et.setFromMatrixPosition(C.matrixWorld).applyMatrix4(N);const Ut=Rt.update(C),Gt=C.material;if(Array.isArray(Gt)){const Ht=Ut.groups;for(let $t=0,Yt=Ht.length;$t<Yt;$t++){const qt=Ht[$t],pe=Gt[qt.materialIndex];pe&&pe.visible&&u.push(C,Ut,pe,Q,et.z,qt)}}else Gt.visible&&u.push(C,Ut,Gt,Q,et.z,null)}}const zt=C.children;for(let Ut=0,Gt=zt.length;Ut<Gt;Ut++)oe(zt[Ut],W,Q,B)}function fe(C,W,Q,B){const st=C.opaque,zt=C.transmissive,Ut=C.transparent;f.setupLightsView(Q),zt.length>0&&Je(st,W,Q),B&&ut.viewport(w.copy(B)),st.length>0&&te(st,W,Q),zt.length>0&&te(zt,W,Q),Ut.length>0&&te(Ut,W,Q),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Je(C,W,Q){const B=Et.isWebGL2;z===null&&(z=new tn(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")?hi:Nn,minFilter:gs,samples:B&&r===!0?4:0})),p.getDrawingBufferSize(k),B?z.setSize(k.x,k.y):z.setSize(vs(k.x),vs(k.y));const st=p.getRenderTarget();p.setRenderTarget(z),p.clear();const zt=p.toneMapping;p.toneMapping=hn,te(C,W,Q),p.toneMapping=zt,it.updateMultisampleRenderTarget(z),it.updateRenderTargetMipmap(z),p.setRenderTarget(st)}function te(C,W,Q){const B=W.isScene===!0?W.overrideMaterial:null;for(let st=0,zt=C.length;st<zt;st++){const Ut=C[st],Gt=Ut.object,Ht=Ut.geometry,$t=B===null?Ut.material:B,Yt=Ut.group;Gt.layers.test(Q.layers)&&Ee(Gt,W,Q,Ht,$t,Yt)}}function Ee(C,W,Q,B,st,zt){C.onBeforeRender(p,W,Q,B,st,zt),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),st.onBeforeRender(p,W,Q,B,C,zt),st.transparent===!0&&st.side===ae?(st.side=Ge,st.needsUpdate=!0,p.renderBufferDirect(Q,W,B,st,C,zt),st.side=ri,st.needsUpdate=!0,p.renderBufferDirect(Q,W,B,st,C,zt),st.side=ae):p.renderBufferDirect(Q,W,B,st,C,zt),C.onAfterRender(p,W,Q,B,st,zt)}function Re(C,W,Q){W.isScene!==!0&&(W=J);const B=nt.get(C),st=f.state.lights,zt=f.state.shadowsArray,Ut=st.state.version,Gt=Pt.getParameters(C,st.state,zt,W,Q),Ht=Pt.getProgramCacheKey(Gt);let $t=B.programs;B.environment=C.isMeshStandardMaterial?W.environment:null,B.fog=W.fog,B.envMap=(C.isMeshStandardMaterial?bt:ot).get(C.envMap||B.environment),$t===void 0&&(C.addEventListener("dispose",wt),$t=new Map,B.programs=$t);let Yt=$t.get(Ht);if(Yt!==void 0){if(B.currentProgram===Yt&&B.lightsStateVersion===Ut)return Qn(C,Gt),Yt}else Gt.uniforms=Pt.getUniforms(C),C.onBuild(Q,Gt,p),C.onBeforeCompile(Gt,p),Yt=Pt.acquireProgram(Gt,Ht),$t.set(Ht,Yt),B.uniforms=Gt.uniforms;const qt=B.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qt.clippingPlanes=S.uniform),Qn(C,Gt),B.needsLights=On(C),B.lightsStateVersion=Ut,B.needsLights&&(qt.ambientLightColor.value=st.state.ambient,qt.lightProbe.value=st.state.probe,qt.directionalLights.value=st.state.directional,qt.directionalLightShadows.value=st.state.directionalShadow,qt.spotLights.value=st.state.spot,qt.spotLightShadows.value=st.state.spotShadow,qt.rectAreaLights.value=st.state.rectArea,qt.ltc_1.value=st.state.rectAreaLTC1,qt.ltc_2.value=st.state.rectAreaLTC2,qt.pointLights.value=st.state.point,qt.pointLightShadows.value=st.state.pointShadow,qt.hemisphereLights.value=st.state.hemi,qt.directionalShadowMap.value=st.state.directionalShadowMap,qt.directionalShadowMatrix.value=st.state.directionalShadowMatrix,qt.spotShadowMap.value=st.state.spotShadowMap,qt.spotLightMatrix.value=st.state.spotLightMatrix,qt.spotLightMap.value=st.state.spotLightMap,qt.pointShadowMap.value=st.state.pointShadowMap,qt.pointShadowMatrix.value=st.state.pointShadowMatrix);const pe=Yt.getUniforms(),Ye=Ws.seqWithValue(pe.seq,qt);return B.currentProgram=Yt,B.uniformsList=Ye,Yt}function Qn(C,W){const Q=nt.get(C);Q.outputEncoding=W.outputEncoding,Q.instancing=W.instancing,Q.skinning=W.skinning,Q.morphTargets=W.morphTargets,Q.morphNormals=W.morphNormals,Q.morphColors=W.morphColors,Q.morphTargetsCount=W.morphTargetsCount,Q.numClippingPlanes=W.numClippingPlanes,Q.numIntersection=W.numClipIntersection,Q.vertexAlphas=W.vertexAlphas,Q.vertexTangents=W.vertexTangents,Q.toneMapping=W.toneMapping}function Gi(C,W,Q,B,st){W.isScene!==!0&&(W=J),it.resetTextureUnits();const zt=W.fog,Ut=B.isMeshStandardMaterial?W.environment:null,Gt=v===null?p.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:Gn,Ht=(B.isMeshStandardMaterial?bt:ot).get(B.envMap||Ut),$t=B.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Yt=!!B.normalMap&&!!Q.attributes.tangent,qt=!!Q.morphAttributes.position,pe=!!Q.morphAttributes.normal,Ye=!!Q.morphAttributes.color,yn=B.toneMapped?p.toneMapping:hn,ei=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,me=ei!==void 0?ei.length:0,jt=nt.get(B),ko=f.state.lights;if(j===!0&&(I===!0||C!==y)){const qe=C===y&&B.id===b;S.setState(B,C,qe)}let we=!1;B.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==ko.state.version||jt.outputEncoding!==Gt||st.isInstancedMesh&&jt.instancing===!1||!st.isInstancedMesh&&jt.instancing===!0||st.isSkinnedMesh&&jt.skinning===!1||!st.isSkinnedMesh&&jt.skinning===!0||jt.envMap!==Ht||B.fog===!0&&jt.fog!==zt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==S.numPlanes||jt.numIntersection!==S.numIntersection)||jt.vertexAlphas!==$t||jt.vertexTangents!==Yt||jt.morphTargets!==qt||jt.morphNormals!==pe||jt.morphColors!==Ye||jt.toneMapping!==yn||Et.isWebGL2===!0&&jt.morphTargetsCount!==me)&&(we=!0):(we=!0,jt.__version=B.version);let ni=jt.currentProgram;we===!0&&(ni=Re(B,W,st));let hh=!1,ps=!1,Uo=!1;const ze=ni.getUniforms(),ii=jt.uniforms;if(ut.useProgram(ni.program)&&(hh=!0,ps=!0,Uo=!0),B.id!==b&&(b=B.id,ps=!0),hh||y!==C){if(ze.setValue(Z,"projectionMatrix",C.projectionMatrix),Et.logarithmicDepthBuffer&&ze.setValue(Z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),y!==C&&(y=C,ps=!0,Uo=!0),B.isShaderMaterial||B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshStandardMaterial||B.envMap){const qe=ze.map.cameraPosition;qe!==void 0&&qe.setValue(Z,et.setFromMatrixPosition(C.matrixWorld))}(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ze.setValue(Z,"isOrthographic",C.isOrthographicCamera===!0),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial||B.isShadowMaterial||st.isSkinnedMesh)&&ze.setValue(Z,"viewMatrix",C.matrixWorldInverse)}if(st.isSkinnedMesh){ze.setOptional(Z,st,"bindMatrix"),ze.setOptional(Z,st,"bindMatrixInverse");const qe=st.skeleton;qe&&(Et.floatVertexTextures?(qe.boneTexture===null&&qe.computeBoneTexture(),ze.setValue(Z,"boneTexture",qe.boneTexture,it),ze.setValue(Z,"boneTextureSize",qe.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Bo=Q.morphAttributes;if((Bo.position!==void 0||Bo.normal!==void 0||Bo.color!==void 0&&Et.isWebGL2===!0)&&dt.update(st,Q,B,ni),(ps||jt.receiveShadow!==st.receiveShadow)&&(jt.receiveShadow=st.receiveShadow,ze.setValue(Z,"receiveShadow",st.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(ii.envMap.value=Ht,ii.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),ps&&(ze.setValue(Z,"toneMappingExposure",p.toneMappingExposure),jt.needsLights&&ti(ii,Uo),zt&&B.fog===!0&&kt.refreshFogUniforms(ii,zt),kt.refreshMaterialUniforms(ii,B,V,R,z),Ws.upload(Z,jt.uniformsList,ii,it)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ws.upload(Z,jt.uniformsList,ii,it),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ze.setValue(Z,"center",st.center),ze.setValue(Z,"modelViewMatrix",st.modelViewMatrix),ze.setValue(Z,"normalMatrix",st.normalMatrix),ze.setValue(Z,"modelMatrix",st.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const qe=B.uniformsGroups;for(let Go=0,Kv=qe.length;Go<Kv;Go++)if(Et.isWebGL2){const uh=qe[Go];yt.update(uh,ni),yt.bind(uh,ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ni}function ti(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function On(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(C,W,Q){nt.get(C.texture).__webglTexture=W,nt.get(C.depthTexture).__webglTexture=Q;const B=nt.get(C);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=Q===void 0,B.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,W){const Q=nt.get(C);Q.__webglFramebuffer=W,Q.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(C,W=0,Q=0){v=C,_=W,x=Q;let B=!0,st=null,zt=!1,Ut=!1;if(C){const Ht=nt.get(C);Ht.__useDefaultFramebuffer!==void 0?(ut.bindFramebuffer(36160,null),B=!1):Ht.__webglFramebuffer===void 0?it.setupRenderTarget(C):Ht.__hasExternalTextures&&it.rebindTextures(C,nt.get(C.texture).__webglTexture,nt.get(C.depthTexture).__webglTexture);const $t=C.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(Ut=!0);const Yt=nt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(st=Yt[W],zt=!0):Et.isWebGL2&&C.samples>0&&it.useMultisampledRTT(C)===!1?st=nt.get(C).__webglMultisampledFramebuffer:st=Yt,w.copy(C.viewport),A.copy(C.scissor),M=C.scissorTest}else w.copy(O).multiplyScalar(V).floor(),A.copy(F).multiplyScalar(V).floor(),M=Y;if(ut.bindFramebuffer(36160,st)&&Et.drawBuffers&&B&&ut.drawBuffers(C,st),ut.viewport(w),ut.scissor(A),ut.setScissorTest(M),zt){const Ht=nt.get(C.texture);Z.framebufferTexture2D(36160,36064,34069+W,Ht.__webglTexture,Q)}else if(Ut){const Ht=nt.get(C.texture),$t=W||0;Z.framebufferTextureLayer(36160,36064,Ht.__webglTexture,Q||0,$t)}b=-1},this.readRenderTargetPixels=function(C,W,Q,B,st,zt,Ut){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=nt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ut!==void 0&&(Gt=Gt[Ut]),Gt){ut.bindFramebuffer(36160,Gt);try{const Ht=C.texture,$t=Ht.format,Yt=Ht.type;if($t!==Ke&&L.convert($t)!==Z.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qt=Yt===hi&&(vt.has("EXT_color_buffer_half_float")||Et.isWebGL2&&vt.has("EXT_color_buffer_float"));if(Yt!==Nn&&L.convert(Yt)!==Z.getParameter(35738)&&!(Yt===Un&&(Et.isWebGL2||vt.has("OES_texture_float")||vt.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-B&&Q>=0&&Q<=C.height-st&&Z.readPixels(W,Q,B,st,L.convert($t),L.convert(Yt),zt)}finally{const Ht=v!==null?nt.get(v).__webglFramebuffer:null;ut.bindFramebuffer(36160,Ht)}}},this.copyFramebufferToTexture=function(C,W,Q=0){const B=Math.pow(2,-Q),st=Math.floor(W.image.width*B),zt=Math.floor(W.image.height*B);it.setTexture2D(W,0),Z.copyTexSubImage2D(3553,Q,0,0,C.x,C.y,st,zt),ut.unbindTexture()},this.copyTextureToTexture=function(C,W,Q,B=0){const st=W.image.width,zt=W.image.height,Ut=L.convert(Q.format),Gt=L.convert(Q.type);it.setTexture2D(Q,0),Z.pixelStorei(37440,Q.flipY),Z.pixelStorei(37441,Q.premultiplyAlpha),Z.pixelStorei(3317,Q.unpackAlignment),W.isDataTexture?Z.texSubImage2D(3553,B,C.x,C.y,st,zt,Ut,Gt,W.image.data):W.isCompressedTexture?Z.compressedTexSubImage2D(3553,B,C.x,C.y,W.mipmaps[0].width,W.mipmaps[0].height,Ut,W.mipmaps[0].data):Z.texSubImage2D(3553,B,C.x,C.y,Ut,Gt,W.image),B===0&&Q.generateMipmaps&&Z.generateMipmap(3553),ut.unbindTexture()},this.copyTextureToTexture3D=function(C,W,Q,B,st=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const zt=C.max.x-C.min.x+1,Ut=C.max.y-C.min.y+1,Gt=C.max.z-C.min.z+1,Ht=L.convert(B.format),$t=L.convert(B.type);let Yt;if(B.isData3DTexture)it.setTexture3D(B,0),Yt=32879;else if(B.isDataArrayTexture)it.setTexture2DArray(B,0),Yt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(37440,B.flipY),Z.pixelStorei(37441,B.premultiplyAlpha),Z.pixelStorei(3317,B.unpackAlignment);const qt=Z.getParameter(3314),pe=Z.getParameter(32878),Ye=Z.getParameter(3316),yn=Z.getParameter(3315),ei=Z.getParameter(32877),me=Q.isCompressedTexture?Q.mipmaps[0]:Q.image;Z.pixelStorei(3314,me.width),Z.pixelStorei(32878,me.height),Z.pixelStorei(3316,C.min.x),Z.pixelStorei(3315,C.min.y),Z.pixelStorei(32877,C.min.z),Q.isDataTexture||Q.isData3DTexture?Z.texSubImage3D(Yt,st,W.x,W.y,W.z,zt,Ut,Gt,Ht,$t,me.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(Yt,st,W.x,W.y,W.z,zt,Ut,Gt,Ht,me.data)):Z.texSubImage3D(Yt,st,W.x,W.y,W.z,zt,Ut,Gt,Ht,$t,me),Z.pixelStorei(3314,qt),Z.pixelStorei(32878,pe),Z.pixelStorei(3316,Ye),Z.pixelStorei(3315,yn),Z.pixelStorei(32877,ei),st===0&&B.generateMipmaps&&Z.generateMipmap(Yt),ut.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?it.setTextureCube(C,0):C.isData3DTexture?it.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?it.setTexture2DArray(C,0):it.setTexture2D(C,0),ut.unbindTexture()},this.resetState=function(){_=0,x=0,v=null,ut.reset(),U.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Um extends yl{}Um.prototype.isWebGL1Renderer=!0;class Xs{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new gt(t),this.density=e}clone(){return new Xs(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}}class Bm extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.backgroundIntensity=this.backgroundIntensity),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}}class Gm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Tr,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=rn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Oe=new E;class Ys{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ys(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bl extends Mi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Di;const Ki=new E,Ii=new E,Fi=new E,Oi=new rt,Qi=new rt,Ml=new Qt,qs=new E,ts=new E,js=new E,wl=new rt,ao=new rt,Sl=new rt;class Hm extends be{constructor(t){if(super(),this.isSprite=!0,this.type="Sprite",Di===void 0){Di=new Kt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gm(e,5);Di.setIndex([0,1,2,0,2,3]),Di.setAttribute("position",new Ys(n,3,0,!1)),Di.setAttribute("uv",new Ys(n,2,3,!1))}this.geometry=Di,this.material=t!==void 0?t:new bl,this.center=new rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ii.setFromMatrixScale(this.matrixWorld),Ml.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Fi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ii.multiplyScalar(-Fi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Zs(qs.set(-.5,-.5,0),Fi,a,Ii,i,r),Zs(ts.set(.5,-.5,0),Fi,a,Ii,i,r),Zs(js.set(.5,.5,0),Fi,a,Ii,i,r),wl.set(0,0),ao.set(1,0),Sl.set(1,1);let o=t.ray.intersectTriangle(qs,ts,js,!1,Ki);if(o===null&&(Zs(ts.set(-.5,.5,0),Fi,a,Ii,i,r),ao.set(0,1),o=t.ray.intersectTriangle(qs,js,ts,!1,Ki),o===null))return;const l=t.ray.origin.distanceTo(Ki);l<t.near||l>t.far||e.push({distance:l,point:Ki.clone(),uv:on.getUV(Ki,qs,ts,js,wl,ao,Sl,new rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Zs(s,t,e,n,i,r){Oi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Qi.x=r*Oi.x-i*Oi.y,Qi.y=i*Oi.x+r*Oi.y):Qi.copy(Oi),s.copy(t),s.x+=Qi.x,s.y+=Qi.y,s.applyMatrix4(Ml)}class Vm extends Ie{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ce,h=Ce,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tl extends ne{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const El=new Qt,Cl=new Qt,$s=[],Wm=new Qt,es=new mt;class zi extends mt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Tl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,Wm)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0)for(let r=0;r<i;r++){this.getMatrixAt(r,El),Cl.multiplyMatrices(n,El),es.matrixWorld=Cl,es.raycast(t,$s);for(let a=0,o=$s.length;a<o;a++){const l=$s[a];l.instanceId=r,l.object=this,e.push(l)}$s.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Tl(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Xm extends Mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Al=new Qt,lo=new Gr,Js=new Ts,Ks=new E;class Ym extends be{constructor(t=new Kt,e=new Xm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(i),Js.radius+=r,t.ray.intersectsSphere(Js)===!1)return;Al.copy(i).invert(),lo.copy(t.ray).applyMatrix4(Al);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,p=m;g<p;g++){const d=c.getX(g);Ks.fromBufferAttribute(u,d),Pl(Ks,d,l,i,t,e,this)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=f,p=m;g<p;g++)Ks.fromBufferAttribute(u,g),Pl(Ks,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Pl(s,t,e,n,i,r,a){const o=lo.distanceSqToPoint(s);if(o<e){const l=new E;lo.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class Ll extends Ie{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ln{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],f=n[i+1]-h,m=(a-h)/f;return(i+m)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new rt:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new E,i=[],r=[],a=[],o=new E,l=new Qt;for(let m=0;m<=t;m++){const g=m/t;i[m]=this.getTangentAt(g,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(i[m-1],i[m]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ye(i[m-1].dot(i[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(o,g))}a[m].crossVectors(i[m],r[m])}if(e===!0){let m=Math.acos(ye(r[0].dot(r[t]),-1,1));m/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(m=-m);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],m*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class co extends ln{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e){const n=e||new rt,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,m=c-this.aY;l=f*h-m*u+this.aX,c=f*u+m*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class qm extends co{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ho(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,m=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,m*=h,i(a,o,f,m)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Qs=new E,uo=new ho,fo=new ho,po=new ho;class jm extends ln{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new E){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Qs.subVectors(i[0],i[1]).add(i[0]),c=Qs);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Qs.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),m),p=Math.pow(u.distanceToSquared(f),m),d=Math.pow(f.distanceToSquared(h),m);p<1e-4&&(p=1),g<1e-4&&(g=p),d<1e-4&&(d=p),uo.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,p,d),fo.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,p,d),po.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,p,d)}else this.curveType==="catmullrom"&&(uo.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),fo.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),po.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(uo.calc(l),fo.calc(l),po.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new E().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Rl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Zm(s,t){const e=1-s;return e*e*t}function $m(s,t){return 2*(1-s)*s*t}function Jm(s,t){return s*s*t}function ns(s,t,e,n){return Zm(s,t)+$m(s,e)+Jm(s,n)}function Km(s,t){const e=1-s;return e*e*e*t}function Qm(s,t){const e=1-s;return 3*e*e*s*t}function t0(s,t){return 3*(1-s)*s*s*t}function e0(s,t){return s*s*s*t}function is(s,t,e,n,i){return Km(s,t)+Qm(s,e)+t0(s,n)+e0(s,i)}class Dl extends ln{constructor(t=new rt,e=new rt,n=new rt,i=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new rt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(t,i.x,r.x,a.x,o.x),is(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class n0 extends ln{constructor(t=new E,e=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new E){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(t,i.x,r.x,a.x,o.x),is(t,i.y,r.y,a.y,o.y),is(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class mo extends ln{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e){const n=e||new rt;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class i0 extends ln{constructor(t=new E,e=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new E){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Il extends ln{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ns(t,i.x,r.x,a.x),ns(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class s0 extends ln{constructor(t=new E,e=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new E){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ns(t,i.x,r.x,a.x),ns(t,i.y,r.y,a.y),ns(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fl extends ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Rl(o,l.x,c.x,h.x,u.x),Rl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new rt().fromArray(i))}return this}}var Ol=Object.freeze({__proto__:null,ArcCurve:qm,CatmullRomCurve3:jm,CubicBezierCurve:Dl,CubicBezierCurve3:n0,EllipseCurve:co,LineCurve:mo,LineCurve3:i0,QuadraticBezierCurve:Il,QuadraticBezierCurve3:s0,SplineCurve:Fl});class r0 extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);t.equals(e)||this.curves.push(new mo(e,t))}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ol[i.type]().fromJSON(i))}return this}}class zl extends r0{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new mo(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Il(this.currentPoint.clone(),new rt(t,e),new rt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Dl(this.currentPoint.clone(),new rt(t,e),new rt(n,i),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new co(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ss extends Kt{constructor(t=1,e=8,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new E,h=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const m=n+u/e*i;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Nt(a,3)),this.setAttribute("normal",new Nt(o,3)),this.setAttribute("uv",new Nt(l,2))}static fromJSON(t){return new ss(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class le extends Kt{constructor(t=1,e=1,n=1,i=8,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const p=[],d=n/2;let _=0;x(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Nt(u,3)),this.setAttribute("normal",new Nt(f,3)),this.setAttribute("uv",new Nt(m,2));function x(){const b=new E,y=new E;let w=0;const A=(e-t)/n;for(let M=0;M<=r;M++){const T=[],R=M/r,V=R*(e-t)+t;for(let K=0;K<=i;K++){const H=K/i,O=H*l+o,F=Math.sin(O),Y=Math.cos(O);y.x=V*F,y.y=-R*n+d,y.z=V*Y,u.push(y.x,y.y,y.z),b.set(F,A,Y).normalize(),f.push(b.x,b.y,b.z),m.push(H,1-R),T.push(g++)}p.push(T)}for(let M=0;M<i;M++)for(let T=0;T<r;T++){const R=p[T][M],V=p[T+1][M],K=p[T+1][M+1],H=p[T][M+1];h.push(R,V,H),h.push(V,K,H),w+=6}c.addGroup(_,w,0),_+=w}function v(b){const y=g,w=new rt,A=new E;let M=0;const T=b===!0?t:e,R=b===!0?1:-1;for(let K=1;K<=i;K++)u.push(0,d*R,0),f.push(0,R,0),m.push(.5,.5),g++;const V=g;for(let K=0;K<=i;K++){const O=K/i*l+o,F=Math.cos(O),Y=Math.sin(O);A.x=T*Y,A.y=d*R,A.z=T*F,u.push(A.x,A.y,A.z),f.push(0,R,0),w.x=F*.5+.5,w.y=Y*.5*R+.5,m.push(w.x,w.y),g++}for(let K=0;K<i;K++){const H=y+K,O=V+K;b===!0?h.push(O,O+1,H):h.push(O+1,O,H),M+=3}c.addGroup(_,M,b===!0?1:2),_+=M}}static fromJSON(t){return new le(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class tr extends le{constructor(t=1,e=1,n=8,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new tr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class er extends Kt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Nt(r,3)),this.setAttribute("normal",new Nt(r.slice(),3)),this.setAttribute("uv",new Nt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const v=new E,b=new E,y=new E;for(let w=0;w<e.length;w+=3)m(e[w+0],v),m(e[w+1],b),m(e[w+2],y),l(v,b,y,x)}function l(x,v,b,y){const w=y+1,A=[];for(let M=0;M<=w;M++){A[M]=[];const T=x.clone().lerp(b,M/w),R=v.clone().lerp(b,M/w),V=w-M;for(let K=0;K<=V;K++)K===0&&M===w?A[M][K]=T:A[M][K]=T.clone().lerp(R,K/V)}for(let M=0;M<w;M++)for(let T=0;T<2*(w-M)-1;T++){const R=Math.floor(T/2);T%2===0?(f(A[M][R+1]),f(A[M+1][R]),f(A[M][R])):(f(A[M][R+1]),f(A[M+1][R+1]),f(A[M+1][R]))}}function c(x){const v=new E;for(let b=0;b<r.length;b+=3)v.x=r[b+0],v.y=r[b+1],v.z=r[b+2],v.normalize().multiplyScalar(x),r[b+0]=v.x,r[b+1]=v.y,r[b+2]=v.z}function h(){const x=new E;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const b=d(x)/2/Math.PI+.5,y=_(x)/Math.PI+.5;a.push(b,1-y)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const v=a[x+0],b=a[x+2],y=a[x+4],w=Math.max(v,b,y),A=Math.min(v,b,y);w>.9&&A<.1&&(v<.2&&(a[x+0]+=1),b<.2&&(a[x+2]+=1),y<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function m(x,v){const b=x*3;v.x=t[b+0],v.y=t[b+1],v.z=t[b+2]}function g(){const x=new E,v=new E,b=new E,y=new E,w=new rt,A=new rt,M=new rt;for(let T=0,R=0;T<r.length;T+=9,R+=6){x.set(r[T+0],r[T+1],r[T+2]),v.set(r[T+3],r[T+4],r[T+5]),b.set(r[T+6],r[T+7],r[T+8]),w.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),M.set(a[R+4],a[R+5]),y.copy(x).add(v).add(b).divideScalar(3);const V=d(y);p(w,R+0,x,V),p(A,R+2,v,V),p(M,R+4,b,V)}}function p(x,v,b,y){y<0&&x.x===1&&(a[v]=x.x-1),b.x===0&&b.z===0&&(a[v]=y/2/Math.PI+.5)}function d(x){return Math.atan2(x.z,-x.x)}function _(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}static fromJSON(t){return new er(t.vertices,t.indices,t.radius,t.details)}}class nr extends er{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new nr(t.radius,t.detail)}}class ir extends zl{constructor(t){super(t),this.uuid=rn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new zl().fromJSON(i))}return this}}const o0={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Nl(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,f,m;if(n&&(r=u0(s,t,r,e)),s.length>80*e){o=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)u=s[g],f=s[g+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);m=Math.max(c-o,h-l),m=m!==0?32767/m:0}return rs(r,a,e,o,l,m,0),a}};function Nl(s,t,e,n,i){let r,a;if(i===M0(s,t,e,n)>0)for(r=t;r<e;r+=n)a=Bl(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=Bl(r,s[r],s[r+1],a);return a&&sr(a,a.next)&&(as(a),a=a.next),a}function Zn(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(sr(e,e.next)||se(e.prev,e,e.next)===0)){if(as(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function rs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&g0(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?l0(s,n,i,r):a0(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),as(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=c0(Zn(s),t,e),rs(s,t,e,n,i,r,2)):a===2&&h0(s,t,e,n,i,r):rs(Zn(s),t,e,n,i,r,1);break}}}function a0(s){const t=s.prev,e=s,n=s.next;if(se(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=i>r?i>a?i:a:r>a?r:a,m=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=m&&Ni(i,o,r,l,a,c,g.x,g.y)&&se(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function l0(s,t,e,n){const i=s.prev,r=s,a=s.next;if(se(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,m=o<l?o<c?o:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,p=o>l?o>c?o:c:l>c?l:c,d=h>u?h>f?h:f:u>f?u:f,_=go(m,g,t,e,n),x=go(p,d,t,e,n);let v=s.prevZ,b=s.nextZ;for(;v&&v.z>=_&&b&&b.z<=x;){if(v.x>=m&&v.x<=p&&v.y>=g&&v.y<=d&&v!==i&&v!==a&&Ni(o,h,l,u,c,f,v.x,v.y)&&se(v.prev,v,v.next)>=0||(v=v.prevZ,b.x>=m&&b.x<=p&&b.y>=g&&b.y<=d&&b!==i&&b!==a&&Ni(o,h,l,u,c,f,b.x,b.y)&&se(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;v&&v.z>=_;){if(v.x>=m&&v.x<=p&&v.y>=g&&v.y<=d&&v!==i&&v!==a&&Ni(o,h,l,u,c,f,v.x,v.y)&&se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;b&&b.z<=x;){if(b.x>=m&&b.x<=p&&b.y>=g&&b.y<=d&&b!==i&&b!==a&&Ni(o,h,l,u,c,f,b.x,b.y)&&se(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function c0(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!sr(i,r)&&kl(i,n,n.next,r)&&os(i,r)&&os(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),as(n),as(n.next),n=s=r),n=n.next}while(n!==s);return Zn(n)}function h0(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&_0(a,o)){let l=Ul(a,o);a=Zn(a,a.next),l=Zn(l,l.next),rs(a,t,e,n,i,r,0),rs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function u0(s,t,e,n){const i=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Nl(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(v0(c));for(i.sort(d0),r=0;r<i.length;r++)e=f0(i[r],e);return e}function d0(s,t){return s.x-t.x}function f0(s,t){const e=p0(s,t);if(!e)return t;const n=Ul(e,s);return Zn(n,n.next),Zn(e,e.next)}function p0(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Ni(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),os(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&m0(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function m0(s,t){return se(s.prev,s,t.prev)<0&&se(t.next,s,s.next)<0}function g0(s,t,e,n){let i=s;do i.z===0&&(i.z=go(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,x0(i)}function x0(s){let t,e,n,i,r,a,o,l,c=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(a>1);return s}function go(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function v0(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ni(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function _0(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!y0(s,t)&&(os(s,t)&&os(t,s)&&b0(s,t)&&(se(s.prev,s,t.prev)||se(s,t.prev,t))||sr(s,t)&&se(s.prev,s,s.next)>0&&se(t.prev,t,t.next)>0)}function se(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function sr(s,t){return s.x===t.x&&s.y===t.y}function kl(s,t,e,n){const i=or(se(s,t,e)),r=or(se(s,t,n)),a=or(se(e,n,s)),o=or(se(e,n,t));return!!(i!==r&&a!==o||i===0&&rr(s,e,t)||r===0&&rr(s,n,t)||a===0&&rr(e,s,n)||o===0&&rr(e,t,n))}function rr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function or(s){return s>0?1:s<0?-1:0}function y0(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&kl(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function os(s,t){return se(s.prev,s,s.next)<0?se(s,t,s.next)>=0&&se(s,s.prev,t)>=0:se(s,t,s.prev)<0||se(s,s.next,t)<0}function b0(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Ul(s,t){const e=new xo(s.i,s.x,s.y),n=new xo(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Bl(s,t,e,n){const i=new xo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function as(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function xo(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function M0(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class ke{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return ke.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Gl(t),Hl(n,t);let a=t.length;e.forEach(Gl);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Hl(n,e[l]);const o=o0.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Gl(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Hl(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class vo extends Kt{constructor(t=new ir([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new Nt(i,3)),this.setAttribute("uv",new Nt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:m-.1,p=e.bevelOffset!==void 0?e.bevelOffset:0,d=e.bevelSegments!==void 0?e.bevelSegments:3;const _=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:w0;let v,b=!1,y,w,A,M;_&&(v=_.getSpacedPoints(h),b=!0,f=!1,y=_.computeFrenetFrames(h,!1),w=new E,A=new E,M=new E),f||(d=0,m=0,g=0,p=0);const T=o.extractPoints(c);let R=T.shape;const V=T.holes;if(!ke.isClockWise(R)){R=R.reverse();for(let nt=0,it=V.length;nt<it;nt++){const ot=V[nt];ke.isClockWise(ot)&&(V[nt]=ot.reverse())}}const H=ke.triangulateShape(R,V),O=R;for(let nt=0,it=V.length;nt<it;nt++){const ot=V[nt];R=R.concat(ot)}function F(nt,it,ot){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().multiplyScalar(ot).add(nt)}const Y=R.length,tt=H.length;function j(nt,it,ot){let bt,ft,It;const Rt=nt.x-it.x,Pt=nt.y-it.y,kt=ot.x-nt.x,Wt=ot.y-nt.y,P=Rt*Rt+Pt*Pt,S=Rt*Wt-Pt*kt;if(Math.abs(S)>Number.EPSILON){const $=Math.sqrt(P),ht=Math.sqrt(kt*kt+Wt*Wt),dt=it.x-Pt/$,pt=it.y+Rt/$,_t=ot.x-Wt/ht,L=ot.y+kt/ht,U=((_t-dt)*Wt-(L-pt)*kt)/(Rt*Wt-Pt*kt);bt=dt+Rt*U-nt.x,ft=pt+Pt*U-nt.y;const yt=bt*bt+ft*ft;if(yt<=2)return new rt(bt,ft);It=Math.sqrt(yt/2)}else{let $=!1;Rt>Number.EPSILON?kt>Number.EPSILON&&($=!0):Rt<-Number.EPSILON?kt<-Number.EPSILON&&($=!0):Math.sign(Pt)===Math.sign(Wt)&&($=!0),$?(bt=-Pt,ft=Rt,It=Math.sqrt(P)):(bt=Rt,ft=Pt,It=Math.sqrt(P/2))}return new rt(bt/It,ft/It)}const I=[];for(let nt=0,it=O.length,ot=it-1,bt=nt+1;nt<it;nt++,ot++,bt++)ot===it&&(ot=0),bt===it&&(bt=0),I[nt]=j(O[nt],O[ot],O[bt]);const z=[];let N,k=I.concat();for(let nt=0,it=V.length;nt<it;nt++){const ot=V[nt];N=[];for(let bt=0,ft=ot.length,It=ft-1,Rt=bt+1;bt<ft;bt++,It++,Rt++)It===ft&&(It=0),Rt===ft&&(Rt=0),N[bt]=j(ot[bt],ot[It],ot[Rt]);z.push(N),k=k.concat(N)}for(let nt=0;nt<d;nt++){const it=nt/d,ot=m*Math.cos(it*Math.PI/2),bt=g*Math.sin(it*Math.PI/2)+p;for(let ft=0,It=O.length;ft<It;ft++){const Rt=F(O[ft],I[ft],bt);At(Rt.x,Rt.y,-ot)}for(let ft=0,It=V.length;ft<It;ft++){const Rt=V[ft];N=z[ft];for(let Pt=0,kt=Rt.length;Pt<kt;Pt++){const Wt=F(Rt[Pt],N[Pt],bt);At(Wt.x,Wt.y,-ot)}}}const et=g+p;for(let nt=0;nt<Y;nt++){const it=f?F(R[nt],k[nt],et):R[nt];b?(A.copy(y.normals[0]).multiplyScalar(it.x),w.copy(y.binormals[0]).multiplyScalar(it.y),M.copy(v[0]).add(A).add(w),At(M.x,M.y,M.z)):At(it.x,it.y,0)}for(let nt=1;nt<=h;nt++)for(let it=0;it<Y;it++){const ot=f?F(R[it],k[it],et):R[it];b?(A.copy(y.normals[nt]).multiplyScalar(ot.x),w.copy(y.binormals[nt]).multiplyScalar(ot.y),M.copy(v[nt]).add(A).add(w),At(M.x,M.y,M.z)):At(ot.x,ot.y,u/h*nt)}for(let nt=d-1;nt>=0;nt--){const it=nt/d,ot=m*Math.cos(it*Math.PI/2),bt=g*Math.sin(it*Math.PI/2)+p;for(let ft=0,It=O.length;ft<It;ft++){const Rt=F(O[ft],I[ft],bt);At(Rt.x,Rt.y,u+ot)}for(let ft=0,It=V.length;ft<It;ft++){const Rt=V[ft];N=z[ft];for(let Pt=0,kt=Rt.length;Pt<kt;Pt++){const Wt=F(Rt[Pt],N[Pt],bt);b?At(Wt.x,Wt.y+v[h-1].y,v[h-1].x+ot):At(Wt.x,Wt.y,u+ot)}}}J(),at();function J(){const nt=i.length/3;if(f){let it=0,ot=Y*it;for(let bt=0;bt<tt;bt++){const ft=H[bt];vt(ft[2]+ot,ft[1]+ot,ft[0]+ot)}it=h+d*2,ot=Y*it;for(let bt=0;bt<tt;bt++){const ft=H[bt];vt(ft[0]+ot,ft[1]+ot,ft[2]+ot)}}else{for(let it=0;it<tt;it++){const ot=H[it];vt(ot[2],ot[1],ot[0])}for(let it=0;it<tt;it++){const ot=H[it];vt(ot[0]+Y*h,ot[1]+Y*h,ot[2]+Y*h)}}n.addGroup(nt,i.length/3-nt,0)}function at(){const nt=i.length/3;let it=0;Z(O,it),it+=O.length;for(let ot=0,bt=V.length;ot<bt;ot++){const ft=V[ot];Z(ft,it),it+=ft.length}n.addGroup(nt,i.length/3-nt,1)}function Z(nt,it){let ot=nt.length;for(;--ot>=0;){const bt=ot;let ft=ot-1;ft<0&&(ft=nt.length-1);for(let It=0,Rt=h+d*2;It<Rt;It++){const Pt=Y*It,kt=Y*(It+1),Wt=it+bt+Pt,P=it+ft+Pt,S=it+ft+kt,$=it+bt+kt;Et(Wt,P,S,$)}}}function At(nt,it,ot){l.push(nt),l.push(it),l.push(ot)}function vt(nt,it,ot){ut(nt),ut(it),ut(ot);const bt=i.length/3,ft=x.generateTopUV(n,i,bt-3,bt-2,bt-1);Ft(ft[0]),Ft(ft[1]),Ft(ft[2])}function Et(nt,it,ot,bt){ut(nt),ut(it),ut(bt),ut(it),ut(ot),ut(bt);const ft=i.length/3,It=x.generateSideWallUV(n,i,ft-6,ft-3,ft-2,ft-1);Ft(It[0]),Ft(It[1]),Ft(It[3]),Ft(It[1]),Ft(It[2]),Ft(It[3])}function ut(nt){i.push(l[nt*3+0]),i.push(l[nt*3+1]),i.push(l[nt*3+2])}function Ft(nt){r.push(nt.x),r.push(nt.y)}}}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return S0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ol[i.type]().fromJSON(i)),new vo(n,t.options)}}const w0={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new rt(r,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],m=t[i*3+1],g=t[i*3+2],p=t[r*3],d=t[r*3+1],_=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-u),new rt(f,1-g),new rt(p,1-_)]:[new rt(o,1-l),new rt(h,1-u),new rt(m,1-g),new rt(d,1-_)]}};function S0(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Rn extends er{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Rn(t.radius,t.detail)}}class _o extends Kt{constructor(t=.5,e=1,n=8,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,m=new E,g=new rt;for(let p=0;p<=i;p++){for(let d=0;d<=n;d++){const _=r+d/n*a;m.x=u*Math.cos(_),m.y=u*Math.sin(_),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let p=0;p<i;p++){const d=p*(n+1);for(let _=0;_<n;_++){const x=_+d,v=x,b=x+n+1,y=x+n+2,w=x+1;o.push(v,b,w),o.push(b,y,w)}}this.setIndex(o),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(c,3)),this.setAttribute("uv",new Nt(h,2))}static fromJSON(t){return new _o(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class yo extends Kt{constructor(t=new ir([new rt(0,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Nt(i,3)),this.setAttribute("normal",new Nt(r,3)),this.setAttribute("uv",new Nt(a,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let m=f.shape;const g=f.holes;ke.isClockWise(m)===!1&&(m=m.reverse());for(let d=0,_=g.length;d<_;d++){const x=g[d];ke.isClockWise(x)===!0&&(g[d]=x.reverse())}const p=ke.triangulateShape(m,g);for(let d=0,_=g.length;d<_;d++){const x=g[d];m=m.concat(x)}for(let d=0,_=m.length;d<_;d++){const x=m[d];i.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let d=0,_=p.length;d<_;d++){const x=p[d],v=x[0]+u,b=x[1]+u,y=x[2]+u;n.push(v,b,y),l+=3}}}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return T0(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new yo(n,t.curveSegments)}}function T0(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class ce extends Kt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new E,f=new E,m=[],g=[],p=[],d=[];for(let _=0;_<=n;_++){const x=[],v=_/n;let b=0;_==0&&a==0?b=.5/e:_==n&&l==Math.PI&&(b=-.5/e);for(let y=0;y<=e;y++){const w=y/e;u.x=-t*Math.cos(i+w*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(i+w*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),p.push(f.x,f.y,f.z),d.push(w+b,1-v),x.push(c++)}h.push(x)}for(let _=0;_<n;_++)for(let x=0;x<e;x++){const v=h[_][x+1],b=h[_][x],y=h[_+1][x],w=h[_+1][x+1];(_!==0||a>0)&&m.push(v,b,w),(_!==n-1||l<Math.PI)&&m.push(b,y,w)}this.setIndex(m),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(p,3)),this.setAttribute("uv",new Nt(d,2))}static fromJSON(t){return new ce(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class bo extends Kt{constructor(t=1,e=.4,n=8,i=6,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new E,u=new E,f=new E;for(let m=0;m<=n;m++)for(let g=0;g<=i;g++){const p=g/i*r,d=m/n*Math.PI*2;u.x=(t+e*Math.cos(d))*Math.cos(p),u.y=(t+e*Math.cos(d))*Math.sin(p),u.z=e*Math.sin(d),o.push(u.x,u.y,u.z),h.x=t*Math.cos(p),h.y=t*Math.sin(p),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=i;g++){const p=(i+1)*m+g-1,d=(i+1)*(m-1)+g-1,_=(i+1)*(m-1)+g,x=(i+1)*m+g;a.push(p,d,x),a.push(d,_,x)}this.setIndex(a),this.setAttribute("position",new Nt(o,3)),this.setAttribute("normal",new Nt(l,3)),this.setAttribute("uv",new Nt(c,2))}static fromJSON(t){return new bo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Vl{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wl(){return(typeof performance=="undefined"?Date:performance).now()}class E0{constructor(t,e,n=0,i=1/0){this.ray=new Gr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Hr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return Mo(t,this,n,e),n.sort(Xl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Mo(t[i],this,n,e);return n.sort(Xl),n}}function Xl(s,t){return s.distance-t.distance}function Mo(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)Mo(i[r],t,e,!0)}}class Yl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const vn=C0();function C0(){const s=new ArrayBuffer(4),t=new Float32Array(s),e=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function A0(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=ye(s,-65504,65504),vn.floatView[0]=s;const t=vn.uint32View[0],e=t>>23&511;return vn.baseTable[e]+((t&8388607)>>vn.shiftTable[e])}function P0(s){const t=s>>10;return vn.uint32View[0]=vn.mantissaTable[vn.offsetTable[t]+(s&1023)]+vn.exponentTable[t],vn.floatView[0]}var L0=Object.freeze({__proto__:null,toHalfFloat:A0,fromHalfFloat:P0});typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"147"}})),typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="147");const ql={type:"change"},wo={type:"start"},jl={type:"end"};class R0 extends Hn{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ne.ROTATE,MIDDLE:Ne.DOLLY,RIGHT:Ne.PAN},this.touches={ONE:Be.ROTATE,TWO:Be.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",Wt),this._domElementKeyEvents=L},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ql),n.update(),r=i.NONE},this.update=(function(){const L=new E,U=new Mn().setFromUnitVectors(t.up,new E(0,1,0)),yt=U.clone().invert(),Ct=new E,St=new Mn,Dt=2*Math.PI;return function(){const lt=n.object.position;L.copy(lt).sub(n.target),L.applyQuaternion(U),o.setFromVector3(L),n.autoRotate&&r===i.NONE&&T(A()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let wt=n.minAzimuthAngle,Ot=n.maxAzimuthAngle;return isFinite(wt)&&isFinite(Ot)&&(wt<-Math.PI?wt+=Dt:wt>Math.PI&&(wt-=Dt),Ot<-Math.PI?Ot+=Dt:Ot>Math.PI&&(Ot-=Dt),wt<=Ot?o.theta=Math.max(wt,Math.min(Ot,o.theta)):o.theta=o.theta>(wt+Ot)/2?Math.max(wt,o.theta):Math.min(Ot,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),L.setFromSpherical(o),L.applyQuaternion(yt),lt.copy(n.target).add(L),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),c=1,u||Ct.distanceToSquared(n.object.position)>a||8*(1-St.dot(n.object.quaternion))>a?(n.dispatchEvent(ql),Ct.copy(n.object.position),St.copy(n.object.quaternion),u=!1,!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",$),n.domElement.removeEventListener("pointerdown",ot),n.domElement.removeEventListener("pointercancel",It),n.domElement.removeEventListener("wheel",kt),n.domElement.removeEventListener("pointermove",bt),n.domElement.removeEventListener("pointerup",ft),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Wt)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const a=1e-6,o=new Yl,l=new Yl;let c=1;const h=new E;let u=!1;const f=new rt,m=new rt,g=new rt,p=new rt,d=new rt,_=new rt,x=new rt,v=new rt,b=new rt,y=[],w={};function A(){return 2*Math.PI/60/60*n.autoRotateSpeed}function M(){return Math.pow(.95,n.zoomSpeed)}function T(L){l.theta-=L}function R(L){l.phi-=L}const V=(function(){const L=new E;return function(yt,Ct){L.setFromMatrixColumn(Ct,0),L.multiplyScalar(-yt),h.add(L)}})(),K=(function(){const L=new E;return function(yt,Ct){n.screenSpacePanning===!0?L.setFromMatrixColumn(Ct,1):(L.setFromMatrixColumn(Ct,0),L.crossVectors(n.object.up,L)),L.multiplyScalar(yt),h.add(L)}})(),H=(function(){const L=new E;return function(yt,Ct){const St=n.domElement;if(n.object.isPerspectiveCamera){const Dt=n.object.position;L.copy(Dt).sub(n.target);let q=L.length();q*=Math.tan(n.object.fov/2*Math.PI/180),V(2*yt*q/St.clientHeight,n.object.matrix),K(2*Ct*q/St.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(V(yt*(n.object.right-n.object.left)/n.object.zoom/St.clientWidth,n.object.matrix),K(Ct*(n.object.top-n.object.bottom)/n.object.zoom/St.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function O(L){n.object.isPerspectiveCamera?c/=L:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*L)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function F(L){n.object.isPerspectiveCamera?c*=L:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/L)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(L){f.set(L.clientX,L.clientY)}function tt(L){x.set(L.clientX,L.clientY)}function j(L){p.set(L.clientX,L.clientY)}function I(L){m.set(L.clientX,L.clientY),g.subVectors(m,f).multiplyScalar(n.rotateSpeed);const U=n.domElement;T(2*Math.PI*g.x/U.clientHeight),R(2*Math.PI*g.y/U.clientHeight),f.copy(m),n.update()}function z(L){v.set(L.clientX,L.clientY),b.subVectors(v,x),b.y>0?O(M()):b.y<0&&F(M()),x.copy(v),n.update()}function N(L){d.set(L.clientX,L.clientY),_.subVectors(d,p).multiplyScalar(n.panSpeed),H(_.x,_.y),p.copy(d),n.update()}function k(L){L.deltaY<0?F(M()):L.deltaY>0&&O(M()),n.update()}function et(L){let U=!1;switch(L.code){case n.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?R(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,n.keyPanSpeed),U=!0;break;case n.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?R(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,-n.keyPanSpeed),U=!0;break;case n.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?T(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(n.keyPanSpeed,0),U=!0;break;case n.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?T(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(-n.keyPanSpeed,0),U=!0;break}U&&(L.preventDefault(),n.update())}function J(){if(y.length===1)f.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),U=.5*(y[0].pageY+y[1].pageY);f.set(L,U)}}function at(){if(y.length===1)p.set(y[0].pageX,y[0].pageY);else{const L=.5*(y[0].pageX+y[1].pageX),U=.5*(y[0].pageY+y[1].pageY);p.set(L,U)}}function Z(){const L=y[0].pageX-y[1].pageX,U=y[0].pageY-y[1].pageY,yt=Math.sqrt(L*L+U*U);x.set(0,yt)}function At(){n.enableZoom&&Z(),n.enablePan&&at()}function vt(){n.enableZoom&&Z(),n.enableRotate&&J()}function Et(L){if(y.length==1)m.set(L.pageX,L.pageY);else{const yt=_t(L),Ct=.5*(L.pageX+yt.x),St=.5*(L.pageY+yt.y);m.set(Ct,St)}g.subVectors(m,f).multiplyScalar(n.rotateSpeed);const U=n.domElement;T(2*Math.PI*g.x/U.clientHeight),R(2*Math.PI*g.y/U.clientHeight),f.copy(m)}function ut(L){if(y.length===1)d.set(L.pageX,L.pageY);else{const U=_t(L),yt=.5*(L.pageX+U.x),Ct=.5*(L.pageY+U.y);d.set(yt,Ct)}_.subVectors(d,p).multiplyScalar(n.panSpeed),H(_.x,_.y),p.copy(d)}function Ft(L){const U=_t(L),yt=L.pageX-U.x,Ct=L.pageY-U.y,St=Math.sqrt(yt*yt+Ct*Ct);v.set(0,St),b.set(0,Math.pow(v.y/x.y,n.zoomSpeed)),O(b.y),x.copy(v)}function nt(L){n.enableZoom&&Ft(L),n.enablePan&&ut(L)}function it(L){n.enableZoom&&Ft(L),n.enableRotate&&Et(L)}function ot(L){n.enabled!==!1&&(y.length===0&&(n.domElement.setPointerCapture(L.pointerId),n.domElement.addEventListener("pointermove",bt),n.domElement.addEventListener("pointerup",ft)),ht(L),L.pointerType==="touch"?P(L):Rt(L))}function bt(L){n.enabled!==!1&&(L.pointerType==="touch"?S(L):Pt(L))}function ft(L){dt(L),y.length===0&&(n.domElement.releasePointerCapture(L.pointerId),n.domElement.removeEventListener("pointermove",bt),n.domElement.removeEventListener("pointerup",ft)),n.dispatchEvent(jl),r=i.NONE}function It(L){dt(L)}function Rt(L){let U;switch(L.button){case 0:U=n.mouseButtons.LEFT;break;case 1:U=n.mouseButtons.MIDDLE;break;case 2:U=n.mouseButtons.RIGHT;break;default:U=-1}switch(U){case Ne.DOLLY:if(n.enableZoom===!1)return;tt(L),r=i.DOLLY;break;case Ne.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enablePan===!1)return;j(L),r=i.PAN}else{if(n.enableRotate===!1)return;Y(L),r=i.ROTATE}break;case Ne.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(n.enableRotate===!1)return;Y(L),r=i.ROTATE}else{if(n.enablePan===!1)return;j(L),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(wo)}function Pt(L){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;I(L);break;case i.DOLLY:if(n.enableZoom===!1)return;z(L);break;case i.PAN:if(n.enablePan===!1)return;N(L);break}}function kt(L){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(L.preventDefault(),n.dispatchEvent(wo),k(L),n.dispatchEvent(jl))}function Wt(L){n.enabled===!1||n.enablePan===!1||et(L)}function P(L){switch(pt(L),y.length){case 1:switch(n.touches.ONE){case Be.ROTATE:if(n.enableRotate===!1)return;J(),r=i.TOUCH_ROTATE;break;case Be.PAN:if(n.enablePan===!1)return;at(),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case Be.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;At(),r=i.TOUCH_DOLLY_PAN;break;case Be.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;vt(),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(wo)}function S(L){switch(pt(L),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Et(L),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ut(L),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;nt(L),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;it(L),n.update();break;default:r=i.NONE}}function $(L){n.enabled!==!1&&L.preventDefault()}function ht(L){y.push(L)}function dt(L){delete w[L.pointerId];for(let U=0;U<y.length;U++)if(y[U].pointerId==L.pointerId){y.splice(U,1);return}}function pt(L){let U=w[L.pointerId];U===void 0&&(U=new rt,w[L.pointerId]=U),U.set(L.pageX,L.pageY)}function _t(L){const U=L.pointerId===y[0].pointerId?y[1]:y[0];return w[U.pointerId]}n.domElement.addEventListener("contextmenu",$),n.domElement.addEventListener("pointerdown",ot),n.domElement.addEventListener("pointercancel",It),n.domElement.addEventListener("wheel",kt,{passive:!1}),this.update()}}const Lt={SWEPT_SLICES:60,SWEPT_RINGS:48,TAIL_FORK_SCALE:.177,TAIL_THICKNESS:.06,TAIL_OPEN_ANGLE_DEG:76.95,TAIL_NOTCH_DX:.3,TAIL_NOTCH_DY:.5,TAIL_TILT_DEG:50,DORSAL_START_FRAC:.331,DORSAL_END_FRAC:.559,DORSAL_SAMPLES:40,DORSAL_THICKNESS:.06,DORSAL_HEIGHT_SCALE:.3186,DORSAL_SINK:0,PEC_START_FRAC:.38,PEC_END_FRAC:.48,PEC_SPAN:.924,PEC_SWEEP:.33,PEC_THICKNESS:.05,PEC_ANGLE_DEG:30,PEC_RADIAN:130,PEC_SINK:0,PEC_OUTWARD_OFFSET:-.025,PEC_BACKWARD_OFFSET:0,BODY_TARGET_HEIGHT:3.5,BROW_SCALE:.65,BROW_OFFSET_X:-35.4,BROW_OFFSET_Y:6,BROW_LIFT:.9,EYE_OFFSET_Y:10.5,EYE_RADIUS:2.8,EYE_CIRCLE_SEGMENTS:32,COLOR_BODY_BLUE:8173800,COLOR_WHITE:16777215},D0="M 144.00 80.00 C 144.67 84.83, 143.00 95.34, 141.00 102.00 C 139.00 108.66, 136.50 113.84, 132.00 120.00 C 127.50 126.16, 119.66 134.34, 114.00 139.00 C 108.34 143.66, 103.49 146.17, 98.00 148.00 C 92.51 149.83, 87.83 150.83, 81.00 150.00 C 74.17 149.17, 63.83 146.66, 57.00 143.00 C 50.17 139.34, 44.50 134.16, 40.00 128.00 C 35.50 121.84, 31.83 113.16, 30.00 106.00 C 28.17 98.84, 28.17 90.99, 29.00 85.00 C 29.83 79.01, 32.17 74.50, 35.00 70.00 C 37.83 65.50, 41.67 61.00, 46.00 58.00 C 50.33 55.00, 56.01 53.00, 61.00 52.00 C 66.00 51.00, 70.51 51.00, 76.00 52.00 C 81.49 53.00, 85.34 52.34, 94.00 58.00 C 102.66 63.66, 120.84 83.50, 128.00 86.00 C 135.16 88.50, 134.34 74.00, 137.00 73.00 C 139.66 72.00, 143.33 75.17, 144.00 80.00 Z",I0="M 146.00 127.00 C 144.34 128.00, 138.50 129.50, 136.00 129.00 C 133.50 128.50, 131.83 126.33, 131.00 124.00 C 130.17 121.67, 131.67 117.16, 131.00 115.00 C 130.33 112.84, 128.33 111.67, 127.00 111.00 C 125.67 110.33, 124.00 111.33, 123.00 111.00 C 122.00 110.67, 121.17 109.83, 121.00 109.00 C 120.83 108.17, 120.50 106.67, 122.00 106.00 C 123.50 105.33, 127.84 104.67, 130.00 105.00 C 132.16 105.33, 133.00 106.17, 135.00 108.00 C 137.00 109.83, 140.17 113.50, 142.00 116.00 C 143.83 118.50, 145.33 121.17, 146.00 123.00 C 146.67 124.83, 147.66 126.00, 146.00 127.00 Z",F0="M 17.902 4.103 L 22.379 9.998 C 22.435 9.614, 22.507 9.073, 22.499 8.762 C 22.494 8.572, 22.538 8.499, 22.755 8.477 C 23.354 8.408, 23.935 8.244, 24.469 7.950 C 26.019 7.104, 26.644 5.713, 26.791 4.047 C 26.813 3.792, 26.787 3.529, 26.517 3.395 C 26.235 3.257, 26.114 3.520, 25.949 3.653 C 25.892 3.697, 25.845 3.753, 25.797 3.805 C 25.385 4.245, 24.903 4.534, 24.274 4.500 C 23.354 4.448, 22.568 4.737, 21.873 5.441 C 21.726 4.573, 21.235 4.055, 20.489 3.723 C 20.099 3.551, 19.703 3.377, 19.430 3.002 C 19.239 2.735, 19.186 2.437, 19.091 2.143 C 19.030 1.966, 18.970 1.785, 18.766 1.754 C 18.544 1.720, 18.457 1.905, 18.370 2.061 C 18.023 2.695, 17.889 3.395, 17.902 4.103 Z",Zl={x:21.873,y:5.441},O0="M 10.436 2.993 L 13.852 4.746 C 12.758 3.684, 13.995 2.812, 14.282 2.708 C 14.581 2.600, 14.386 2.229, 13.418 2.233 C 12.450 2.237, 11.565 2.562, 10.436 2.993 Z",$l=10.436,z0=13.852,N0="M 16.747 19.267 L 20.614 19.565 C 20.093 19.673, 19.421 19.772, 18.722 19.707 C 17.815 19.630, 17.268 19.526, 16.747 19.267 Z",Jl=16.747,k0=20.614,U0=.288,B0=/[MLCZ]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi;function Kl(s,t,e,n,i){const r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function ls(s,t=40,e=!0){const n=s.match(B0);if(!n)return[];let i=0,r=0,a=0;const o=[],l=()=>parseFloat(n[i++]);for(;i<n.length;){const c=n[i++].toUpperCase();if(c==="M"||c==="L")r=l(),a=l(),o.push({x:r,y:a});else if(c==="C"){const h=l(),u=l(),f=l(),m=l(),g=l(),p=l();for(let d=1;d<=t;d++){const _=d/t;o.push({x:Kl(_,r,h,f,g),y:Kl(_,a,u,m,p)})}r=g,a=p}}if(e&&o.length>0){const c=o[0],h=o[o.length-1];(c.x!==h.x||c.y!==h.y)&&o.push({x:c.x,y:c.y})}return o}function G0(s,t=50,e=800){return H0(ls(s,t,!1),e,!0)}function H0(s,t,e=!0){if(s.length<2)return s;s.length;const n=e?[...s,s[0],s[1],s[2]]:s,i=[0];for(let o=1;o<n.length;o++){const l=n[o].x-n[o-1].x,c=n[o].y-n[o-1].y;i.push(i[o-1]+Math.sqrt(l*l+c*c))}const r=i[i.length-1],a=[];for(let o=0;o<t;o++){const l=o/t*r;let c=0;for(;c<i.length-2&&i[c+1]<l;)c++;const h=i[c],u=i[c+1],f=u-h>0?(l-h)/(u-h):0,m=n[Math.max(0,c-1)],g=n[c],p=n[c+1],d=n[Math.min(n.length-1,c+2)],_=f,x=_*_,v=x*_,b=.5*(2*g.x+(-m.x+p.x)*_+(2*m.x-5*g.x+4*p.x-d.x)*x+(-m.x+3*g.x-3*p.x+d.x)*v),y=.5*(2*g.y+(-m.y+p.y)*_+(2*m.y-5*g.y+4*p.y-d.y)*x+(-m.y+3*g.y-3*p.y+d.y)*v);a.push({x:b,y})}return a}function ar(s,t,e){const n=s.length,i=Math.ceil(t*3),r=[];let a=0;for(let l=-i;l<=i;l++){const c=Math.exp(-.5*(l/t)*(l/t));r.push(c),a+=c}for(let l=0;l<r.length;l++)r[l]/=a;const o=[...s];for(let l=0;l<e;l++){const c=[...o];for(let h=0;h<n;h++){let u=0;for(let f=-i;f<=i;f++){const m=Math.min(n-1,Math.max(0,h+f));u+=c[m]*r[f+i]}o[h]=u}}return o}function V0(s,t=10){const e=[...s];for(let n=1;n<e.length-1;n++){const i=Math.max(0,n-t),r=Math.min(e.length-1,n+t);let a=1/0;for(let o=i;o<=r;o++)o!==n&&e[o]<a&&(a=e[o]);e[n]<a&&(e[n]=a)}return e}function W0(s,t,e){const n=Math.min(1,Math.max(0,(e-s)/(t-s)));return n*n*(3-2*n)}function X0(s,t){const e=t.SWEPT_SLICES,n=t.SWEPT_RINGS;let i=1e9,r=-1e9,a=1/0,o=-1/0;for(const F of s)i=Math.min(i,F.x),r=Math.max(r,F.x),a=Math.min(a,F.y),o=Math.max(o,F.y);const l=r-i,c=l/e,u=.1*(o-a),f=[],m=[],g=[];let p=0;for(let F=0;F<=e;F++){const Y=i+F*c;let tt=-1/0,j=1/0;for(let N=0;N<s.length;N++){const k=s[N],et=s[(N+1)%s.length];if(Math.abs(k.x-et.x)<1e-9||(k.x-Y)*(et.x-Y)>0)continue;const J=k.y+(Y-k.x)/(et.x-k.x)*(et.y-k.y);J>tt&&(tt=J),J<j&&(j=J)}let I,z;Number.isFinite(tt)&&Number.isFinite(j)?(I=(tt+j)/2,z=(tt-j)/2,z<0&&(z=0),p=I):(I=p,z=0),f.push(Y),m.push(I),g.push(Math.max(0,z))}let d=ar(g,3,2),_=ar(m,2,1);d=V0(d,8),d=ar(d,1.5,1);let x=0,v=0;for(let F=0;F<d.length;F++)d[F]>v&&(v=d[F],x=F);for(let F=x-1;F>=0;F--)d[F]>d[F+1]&&(d[F]=d[F+1]);for(let F=x+1;F<d.length;F++)d[F]>d[F-1]&&(d[F]=d[F-1]);const b=.14,y=.11,w=l*b,A=l*y,M=f.findIndex(F=>F>=i+w);if(M>2){const F=d[M];for(let Y=0;Y<=M;Y++){const tt=(f[Y]-i)/w,j=1-Math.pow(1-Math.min(1,Math.max(0,tt)),3);d[Y]=Math.min(d[Y],F*j)}}const T=f.findIndex(F=>F>=r-A);if(T<e-2){const F=d[T];for(let Y=T;Y<=e;Y++){const tt=(r-f[Y])/A,j=1-Math.pow(1-Math.min(1,Math.max(0,tt)),3);d[Y]=Math.min(d[Y],F*j)}}d[0]=0,d[e]=0,d=ar(d,1.2,1),d[0]=0,d[e]=0;const R=.75;for(let F=0;F<=e;F++){const Y=(f[F]-i)/l;if(Y>R){const tt=W0(R,1,Y);_[F]+=u*tt}}const V=[];for(let F=0;F<=e;F++)for(let Y=0;Y<n;Y++){const tt=Y/n*Math.PI*2,j=Math.cos(tt),I=Math.sin(tt);V.push(f[F],_[F]+d[F]*j,d[F]*I)}const K=[];for(let F=0;F<e;F++)for(let Y=0;Y<n;Y++){const tt=(Y+1)%n,j=F*n+Y,I=F*n+tt,z=(F+1)*n+Y,N=(F+1)*n+tt;K.push(j,N,z,j,I,N)}const H=new Kt;H.setAttribute("position",new Nt(V,3)),H.setIndex(K);const O={xs:f,mid:_,rad:d};return H.userData.swept=O,{geometry:H,swept:O}}const Y0=new E(.45,.78,.44).normalize();function Ql(s,t={}){var d,_,x,v;const e=((d=t.lightDir)!=null?d:Y0).clone().normalize(),n=(_=t.strength)!=null?_:.42,i=Math.max(2,(x=t.steps)!=null?x:3),r=new gt((v=t.baseColor)!=null?v:16777215),a=s.index?s.toNonIndexed():s,o=a.getAttribute("position"),l=o.count,c=new Float32Array(l*3),h=new E,u=new E,f=new E,m=new E,g=new E,p=new E;for(let b=0;b<l;b+=3){h.fromBufferAttribute(o,b),u.fromBufferAttribute(o,b+1),f.fromBufferAttribute(o,b+2),m.subVectors(u,h),g.subVectors(f,h),p.crossVectors(m,g),p.lengthSq()<1e-12?p.set(0,1,0):p.normalize();const y=(p.dot(e)+1)*.5,w=Math.min(i-1,Math.floor(y*i))/(i-1),A=1-n*(1-w);for(let M=0;M<3;M++){const T=(b+M)*3;c[T]=r.r*A,c[T+1]=r.g*A,c[T+2]=r.b*A}}if(a.setAttribute("color",new ne(c,3)),a!==s){s.setIndex(null);for(const b of Object.keys(a.attributes))s.setAttribute(b,a.attributes[b]);return s}return a}function So(s,t=.05,e=1450030,n){const i={uOutlineWidth:{value:t},uColor:{value:new gt(e)}};let r=`
    uniform float uOutlineWidth;
    void main() {
      vec3 expanded = position + normal * uOutlineWidth;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(expanded, 1.0);
    }`;const a=new de({uniforms:i,vertexShader:r,fragmentShader:`
      uniform vec3 uColor;
      void main() { gl_FragColor = vec4(uColor, 1.0); }`,side:Ge}),o=new mt(s,a);return o.renderOrder=-1,o.userData.isOutline=!0,o}function cs(s,t={}){var o,l,c;const[e,n,i]=(o=t.lightDir)!=null?o:[.45,.78,.44],r=(l=t.strength)!=null?l:.42,a=(c=t.softness)!=null?c:.5;return s.onBeforeCompile=h=>{const u=h.uniforms;u.uCelLight={value:new E(e,n,i).normalize()},u.uCelStrength={value:r},u.uCelSoft={value:a},h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCelNrm;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vCelNrm = normal;`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vCelNrm;
uniform vec3 uCelLight;
uniform float uCelStrength;
uniform float uCelSoft;`).replace("#include <color_fragment>",`#include <color_fragment>
      {
        vec3 n = normalize(vCelNrm);
        if (!gl_FrontFacing) n = -n;
        float lambert = dot(n, normalize(uCelLight)) * 0.5 + 0.5;
        float ramp = smoothstep(0.5 - uCelSoft * 0.5, 0.5 + uCelSoft * 0.5, lambert);
        float shade = 1.0 - uCelStrength * (1.0 - ramp);
        diffuseColor.rgb *= shade;
      }`)},s}const tc=L0,ki={classic:{dark:5073918,white:16777215},night:{dark:2563865,white:16774627},pink:{dark:15227530,white:16771312},green:{dark:3055211,white:15269874},gold:{dark:13077280,white:16774358}},lr={idle:{speed:1.6,floatAmp:.06,floatSpeed:1.2,breath:.02,bodySway:.035,bodyYaw:.03,bodyPitch:.015,tailYaw:.08,tailPitch:.045,pecFlap:.18},working:{speed:3.4,floatAmp:.1,floatSpeed:2.4,breath:.05,bodySway:.06,bodyYaw:.055,bodyPitch:.028,tailYaw:.15,tailPitch:.085,pecFlap:.28},"needs-input":{speed:.8,floatAmp:.03,floatSpeed:.6,breath:.01,bodySway:.018,bodyYaw:.015,bodyPitch:.008,tailYaw:.04,tailPitch:.022,pecFlap:.1},ready:{speed:2.6,floatAmp:.14,floatSpeed:3,breath:.06,bodySway:.045,bodyYaw:.04,bodyPitch:.02,tailYaw:.12,tailPitch:.07,pecFlap:.24},blocked:{speed:.5,floatAmp:.04,floatSpeed:.8,breath:.015,bodySway:.01,bodyYaw:.008,bodyPitch:.005,tailYaw:.02,tailPitch:.012,pecFlap:.06}},q0=.9;function j0(s){if(s<.1)return 1-s/.1;if(s<.1+.42){const n=(s-.1)/.42;return n*n}return 1}function ec(s,t,e,n){const{xs:i,mid:r,rad:a}=n,o=(s.x-t)*Lt.BROW_SCALE+Lt.BROW_OFFSET_X,l=-(s.y-e)*Lt.BROW_SCALE+Lt.BROW_OFFSET_Y,c=i.length;let h;if(o<=i[0])h=0;else if(o>=i[c-1])h=c-1;else{let T=0;for(;T<c-1&&i[T+1]<o;)T++;h=T+(o-i[T])/Math.max(1e-9,i[T+1]-i[T])}const u=Math.min(Math.floor(h),c-1),f=Math.min(u+1,c-1),m=h-u,g=r[u]*(1-m)+r[f]*m,p=Math.max(0,a[u]*(1-m)+a[f]*m),d=p>1e-6?Math.max(-1,Math.min(1,(l-g)/p)):1,_=Math.sqrt(Math.max(0,1-d*d)),x=Math.max(1e-9,i[f]-i[u]),v=(a[f]-a[u])/x,b=(r[f]-r[u])/x,y=-(v+b*d),w=d,A=_,M=Math.hypot(y,w,A)||1;return{x:o+y/M*Lt.BROW_LIFT,y:g+p*d+w/M*Lt.BROW_LIFT,z:p*_+A/M*Lt.BROW_LIFT}}function cr(s,t,e){const{xs:n,mid:i,rad:r}=t,a=n[n.length-1]-n[0],o=n[0]+a*s;let l=0;for(;l<n.length-1&&n[l+1]<o;)l++;const c=(o-n[l])/(n[l+1]-n[l]||1),h=i[l]*(1-c)+i[l+1]*c,u=r[l]*(1-c)+r[l+1]*c;return{x:o*e,top:(h+u)*e,mid:h*e,rad:u*e}}function nc(s,t,e,n,i){const r=s.length,a=t/2,o=new E().crossVectors(n,i).normalize(),l=ke.triangulateShape(s.map(f=>new rt(f.x,f.y)),[]),c=[];for(const f of s){const m=new E().copy(e).addScaledVector(n,f.x).addScaledVector(i,f.y).addScaledVector(o,a);c.push(m.x,m.y,m.z)}for(const f of s){const m=new E().copy(e).addScaledVector(n,f.x).addScaledVector(i,f.y).addScaledVector(o,-a);c.push(m.x,m.y,m.z)}const h=[];for(const f of l)h.push(f[0],f[1],f[2]);for(const f of l)h.push(r+f[0],r+f[2],r+f[1]);for(let f=0;f<r;f++){const m=(f+1)%r;h.push(f,m,r+m,f,r+m,r+f)}const u=new Kt;return u.setAttribute("position",new Nt(c,3)),u.setIndex(h),u.computeVertexNormals(),u}function Z0(s,t){const e=s.length,n=t/2,i=ke.triangulateShape(s.map(l=>new rt(l.x,l.z)),[]),r=[];for(const l of s)r.push(l.x,n,l.z);for(const l of s)r.push(l.x,-n,l.z);const a=[];for(const l of i)a.push(l[0],l[1],l[2]);for(const l of i)a.push(e+l[0],e+l[2],e+l[1]);for(let l=0;l<e;l++){const c=l,h=(l+1)%e;a.push(c,h,e+h,c,e+h,e+c)}const o=new Kt;return o.setAttribute("position",new Nt(r,3)),o.setIndex(a),o.computeVertexNormals(),o}function $0(s){const t=s.length,e=[];for(let c=0;c<t;c++){const h=s[c],u=s[(c+1)%t];if(h.z<0&&u.z>=0||h.z>=0&&u.z<0){const f=h.z/(h.z-u.z),m=h.x+f*(u.x-h.x);e.push({index:c,point:{x:m,z:0}})}}if(e.length<2)return null;const n=e[0],i=e[1],r=n.index,a=i.index,o=[n.point];if(a>=r)for(let c=r+1;c<=a;c++)o.push(s[c%t]);else{for(let c=r+1;c<t;c++)o.push(s[c]);for(let c=0;c<=a;c++)o.push(s[c])}o.push(i.point);let l=0;for(const c of o)l+=c.z;if(l/=o.length,l>0){if(o.length=0,o.push(i.point),a+1<r)for(let c=a+1;c<=r;c++)o.push(s[c%t]);else{for(let c=a+1;c<t;c++)o.push(s[c]);for(let c=0;c<=r;c++)o.push(s[c])}o.push(n.point)}return o}function J0(){const s=new Vt;s.name="orca";const t=G0(D0,50,800);let e=0,n=0;for(const q of t)e+=q.x,n+=q.y;e/=t.length,n/=t.length;const i=t.map(q=>({x:(q.x-e)*1.1,y:-(q.y-n)}));ke.isClockWise(i.map(q=>new rt(q.x,q.y)))&&i.reverse();const{geometry:r,swept:a}=X0(i,Lt);r.computeVertexNormals(),r.computeBoundingBox();const l=r.boundingBox.getSize(new E),c=Lt.BODY_TARGET_HEIGHT/l.y;r.scale(c,c,c),r.computeBoundingBox();const h=r.boundingBox,u=a.mid.length,f=new Uint16Array(u*2);for(let q=0;q<u;q++)f[q*2]=tc.toHalfFloat(a.mid[q]*c),f[q*2+1]=tc.toHalfFloat(a.rad[q]*c);const m=new Vm(f,u,1,ea,hi);m.minFilter=m.magFilter=He,m.needsUpdate=!0;const g={uTime:{value:0},uSwimAmp:{value:.13},uSwimFreq:{value:2.6},uSwimSpeed:{value:2.8}},p=new re({side:ae});p.extensions={derivatives:!0};let d=null;p.onBeforeCompile=q=>{const lt=q.uniforms;lt.uMR={value:m},lt.uMin={value:h.min.x},lt.uMax={value:h.max.x},lt.uTime=g.uTime,lt.uSwimAmp=g.uSwimAmp,lt.uSwimFreq=g.uSwimFreq,lt.uSwimSpeed=g.uSwimSpeed,lt.uDark={value:new gt(ki.classic.dark)},lt.uWhite={value:new gt(ki.classic.white)},lt.uCelLight={value:new E(.45,.78,.44).normalize()},lt.uCelStrength={value:.3},lt.uCelSoft={value:.85},d=lt,q.vertexShader=q.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPos;
varying vec3 vNrm;
uniform float uTime;
uniform float uSwimAmp;
uniform float uSwimFreq;
uniform float uSwimSpeed;
uniform float uMin;
uniform float uMax;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vPos = position;
vNrm = normal;
{
  float along = (position.x - uMin) / max(uMax - uMin, 1e-4);
  float envelope = smoothstep(0.0, 0.55, along) * (1.0 - smoothstep(0.72, 1.0, along));
  float wave = sin(position.x * uSwimFreq - uTime * uSwimSpeed) * uSwimAmp;
  transformed.z += wave * envelope;
  transformed.y += wave * 0.28 * envelope;
}`),q.fragmentShader=q.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vPos;
varying vec3 vNrm;
uniform sampler2D uMR;
uniform float uMin, uMax;
uniform vec3 uDark;
uniform vec3 uWhite;
uniform vec3 uCelLight;
uniform float uCelStrength;
uniform float uCelSoft;`).replace("#include <color_fragment>",`#include <color_fragment>
      {
          float u = clamp((vPos.x - uMin) / (uMax - uMin), 0.0, 1.0);
          float midY = texture2D(uMR, vec2(u, 0.5)).r;
          float ang = 3.14159265 - abs(atan(vPos.z, vPos.y - midY));
          float baseScale = 0.77 * 1.1;
          float uCenter = 0.28, uHalf = 0.245 * baseScale, angMax = 0.84 * baseScale;
          float headFactor = 1.0 - smoothstep(0.18, 0.52, u);
          float angMaxAdjusted = angMax * (1.0 + 0.7 * headFactor);
          float uu = (0.16 + 0.49 * u - uCenter) / uHalf;
          float nn = ang / angMaxAdjusted;
          float rr = uu * uu + nn * nn;
          float tailZone = smoothstep(0.40, 0.58, u) * (1.0 - smoothstep(0.80, 0.86, u));
          float peak = 0.78, bumpWidth = 0.11, bumpStrength = 1.0;
          float d = nn - peak;
          float bump = tailZone * bumpStrength * exp(-d*d / (bumpWidth*bumpWidth));
          float threshold = 1.0 + bump;
          float aa = fwidth(rr) * 1.2 + 2e-4;
          float a = 1.0 - smoothstep(threshold - aa, threshold + aa, rr);
          diffuseColor.rgb = mix(uDark, uWhite, a);

          // Soft volumetric shade on top of the skin mask. An earlier build
          // rebuilt the normal from screen-space derivatives and quantised it
          // into hard bands — the flat per-triangle normal made the shading
          // follow the mesh facets, reading as blocky mosaic patches. The
          // geometry's SMOOTH vertex normal plus a wide smoothstep ramp gives
          // a gentle watercolour volume instead; the ink outline carries the
          // cartoon read on its own.
          vec3 n = normalize(vNrm);
          if (!gl_FrontFacing) n = -n;
          float lambert = dot(n, normalize(uCelLight)) * 0.5 + 0.5;
          float ramp = smoothstep(0.5 - uCelSoft * 0.5, 0.5 + uCelSoft * 0.5, lambert);
          float shade = 1.0 - uCelStrength * (1.0 - ramp);
          diffuseColor.rgb *= shade;
      }`)};const _=new mt(r,p);s.add(_);const x=1318958,v=.065,b=.025,y=[],w=(q,lt,wt,Ot=!1)=>{const D=So(lt,wt,x);Ot&&(D.scale.z=-1),D.visible=!1,q.add(D),y.push(D)};w(_,r,v);const A=ls(I0,40);function M(q){const lt=A.map(X=>new rt((X.x-e)*Lt.BROW_SCALE+Lt.BROW_OFFSET_X,-(X.y-n)*Lt.BROW_SCALE+Lt.BROW_OFFSET_Y)),wt=ke.triangulateShape(lt,[]),Ot=[],D=[];for(const X of A){const ct=ec(X,e,n,a);Ot.push(ct.x,ct.y,ct.z)}for(const X of wt)D.push(X[0],X[1],X[2]);const G=new Kt;if(G.setAttribute("position",new Nt(Ot,3)),G.setIndex(D),q){const X=G.attributes.position.array;for(let ct=2;ct<X.length;ct+=3)X[ct]=-X[ct]}return G.scale(c,c,c),G}const T=A.reduce((q,lt)=>lt.y<q.y?lt:q,A[0]),R=T.x-2,V=(q,lt,wt)=>{const Ot=new re({color:q,side:ae,polygonOffset:!0,polygonOffsetFactor:lt,polygonOffsetUnits:wt});return Ot.onBeforeCompile=D=>{const G=D.uniforms;G.uTime=g.uTime,G.uSwimAmp=g.uSwimAmp,G.uSwimFreq=g.uSwimFreq,G.uSwimSpeed=g.uSwimSpeed,G.uMin={value:h.min.x},G.uMax={value:h.max.x},D.vertexShader=D.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uSwimAmp;
uniform float uSwimFreq;
uniform float uSwimSpeed;
uniform float uMin;
uniform float uMax;`).replace("#include <begin_vertex>",`#include <begin_vertex>
{
  float along = (position.x - uMin) / max(uMax - uMin, 1e-4);
  float envelope = smoothstep(0.0, 0.55, along) * (1.0 - smoothstep(0.72, 1.0, along));
  float wave = sin(position.x * uSwimFreq - uTime * uSwimSpeed) * uSwimAmp;
  transformed.z += wave * envelope;
  transformed.y += wave * 0.28 * envelope;
}`)},Ot},K=V(Lt.COLOR_WHITE,-2,-2),H=new Vt;H.add(new mt(M(!1),K)),H.add(new mt(M(!0),K)),_.add(H);const O=T.y+Lt.EYE_OFFSET_Y,F=[];for(let q=0;q<Lt.EYE_CIRCLE_SEGMENTS;q++){const lt=q/Lt.EYE_CIRCLE_SEGMENTS*Math.PI*2;F.push({x:R+Lt.EYE_RADIUS*Math.cos(lt),y:O+Lt.EYE_RADIUS*Math.sin(lt)})}function Y(q){const lt=F.map(X=>new rt((X.x-e)*Lt.BROW_SCALE+Lt.BROW_OFFSET_X,-(X.y-n)*Lt.BROW_SCALE+Lt.BROW_OFFSET_Y)),wt=ke.triangulateShape(lt,[]),Ot=[],D=[];for(const X of F){const ct=ec(X,e,n,a);Ot.push(ct.x,ct.y,ct.z)}for(const X of wt)D.push(X[0],X[1],X[2]);const G=new Kt;if(G.setAttribute("position",new Nt(Ot,3)),G.setIndex(D),q){const X=G.attributes.position.array;for(let ct=2;ct<X.length;ct+=3)X[ct]=-X[ct]}return G.scale(c,c,c),G}const tt=V(Lt.COLOR_WHITE,-3,-3),j=new mt(Y(!1),tt),I=new mt(Y(!0),tt);_.add(j),_.add(I);const z=[j,I],N=ls(F0,60),k=a.xs[a.xs.length-1]*c,et=a.mid[a.mid.length-1]*c,J=Lt.TAIL_OPEN_ANGLE_DEG*Math.PI/180,at=Math.cos(J),Z=Math.sin(J),At=N.map(q=>{const lt=(q.x-Zl.x)*Lt.TAIL_FORK_SCALE,wt=-(q.y-Zl.y)*Lt.TAIL_FORK_SCALE;return{x:lt*at+wt*Z,z:-lt*Z+wt*at}}),vt=new re({color:Lt.COLOR_BODY_BLUE,side:ae});cs(vt,{strength:.32,softness:.7});const Et=new Vt,ut=$0(At);if(ut&&ut.length>2){const q=[...ut,{x:ut[0].x,z:ut[0].z}],lt=Z0(q,Lt.TAIL_THICKNESS);Et.add(new mt(lt,vt));const wt=new mt(lt.clone(),vt);wt.scale.z=-1,Et.add(wt),w(Et,lt,b),w(Et,lt,b,!0)}else{const q=At.length,lt=ke.triangulateShape(At.map(X=>new rt(X.x,X.z)),[]),wt=Lt.TAIL_THICKNESS/2,Ot=[];for(const X of At)Ot.push(X.x,wt,X.z);for(const X of At)Ot.push(X.x,-wt,X.z);const D=[];for(const X of lt)D.push(X[0],X[1],X[2]);for(const X of lt)D.push(q+X[0],q+X[2],q+X[1]);for(let X=0;X<q;X++){const ct=X,Mt=(X+1)%q;D.push(ct,Mt,q+Mt,ct,q+Mt,q+ct)}const G=new Kt;G.setAttribute("position",new Nt(Ot,3)),G.setIndex(D),G.computeVertexNormals(),Et.add(new mt(G,vt)),w(Et,G,b)}s.add(Et),Et.position.set(k+Lt.TAIL_NOTCH_DX,et+Lt.TAIL_NOTCH_DY,0),Et.rotation.z=Lt.TAIL_TILT_DEG*Math.PI/180;const Ft=ls(O0,Lt.DORSAL_SAMPLES),nt=cr(Lt.DORSAL_START_FRAC,a,c).top,it=cr(Lt.DORSAL_END_FRAC,a,c).top,ot=Ft.map(q=>{const lt=(q.x-$l)/(z0-$l),wt=2.993+lt*(4.746-2.993),Ot=Math.max(0,(wt-q.y)*Lt.DORSAL_HEIGHT_SCALE),D=Lt.DORSAL_START_FRAC+lt*(Lt.DORSAL_END_FRAC-Lt.DORSAL_START_FRAC),G=(a.xs[0]+(a.xs[a.xs.length-1]-a.xs[0])*D)*c,X=nt+lt*(it-nt)-Lt.DORSAL_SINK+Ot;return{x:G,y:X}}),bt=new re({color:Lt.COLOR_BODY_BLUE,side:ae});cs(bt,{strength:.32,softness:.7});const ft=nc(ot,Lt.DORSAL_THICKNESS,new E(0,0,0),new E(1,0,0),new E(0,1,0)),It=new mt(ft,bt);s.add(It),w(s,ft,b);const Rt=ls(N0,30),Pt=new re({color:Lt.COLOR_BODY_BLUE,side:ae});cs(Pt,{strength:.32,softness:.7});const kt=Lt.PEC_RADIAN*Math.PI/180,Wt=[];for(const q of[1,-1]){const lt=cr(Lt.PEC_START_FRAC,a,c),wt=cr(Lt.PEC_END_FRAC,a,c),Ot=lt.rad-Lt.PEC_SINK,D=wt.rad-Lt.PEC_SINK,G=new E(lt.x+Lt.PEC_BACKWARD_OFFSET,lt.mid+Ot*Math.cos(kt),q*(Ot*Math.sin(kt)+Lt.PEC_OUTWARD_OFFSET)),X=new E(wt.x+Lt.PEC_BACKWARD_OFFSET,wt.mid+D*Math.cos(kt),q*(D*Math.sin(kt)+Lt.PEC_OUTWARD_OFFSET)),ct=G.distanceTo(X),Mt=new E().subVectors(X,G).normalize(),Xt=new E(0,-Math.sin(Lt.PEC_ANGLE_DEG*Math.PI/180),q*Math.cos(Lt.PEC_ANGLE_DEG*Math.PI/180)),oe=Xt.clone().addScaledVector(Mt,-Xt.dot(Mt)).normalize(),fe=Rt.map(Re=>{const Qn=(Re.x-Jl)/(k0-Jl),Gi=19.267+Qn*(19.565-19.267),ti=Math.max(0,(Re.y-Gi)/U0);return{x:Qn*ct+ti*Lt.PEC_SWEEP,y:ti*Lt.PEC_SPAN}}),Je=nc(fe,Lt.PEC_THICKNESS,new E(0,0,0),Mt,oe),te=new mt(Je,Pt),Ee=new Vt;Ee.position.copy(G),Ee.add(te),w(Ee,Je,b),s.add(Ee),Wt.push(Ee)}const P=[],S=[];s.traverse(q=>{const lt=q;if(!lt.isMesh||!lt.material||lt.material===p)return;const wt=Array.isArray(lt.material)?lt.material[0]:lt.material,Ot=wt.color;Ot&&(Ot.getHex()===16777215?S.push(wt):P.push(wt))});function $(q,lt){d&&(d.uDark.value.set(q),d.uWhite.value.set(lt)),P.forEach(wt=>wt.color.set(q)),S.forEach(wt=>wt.color.set(lt))}const ht=q=>{var wt;const lt=(wt=ki[q])!=null?wt:ki.classic;$(lt.dark,lt.white)},dt=q=>{for(const lt of y)lt.visible=q};let pt=lr.idle;const _t={...lr.idle};let L=0,U=0,yt=!1,Ct=Math.random();return{group:s,bodyGeo:r,bodySwept:a,bodyScale:c,bodyTipX:k,bodyTipY:et,dentPoint:T,swimUniforms:g,setSkin:ht,setMood:q=>{lr[q]&&(pt=lr[q])},setOutlines:dt,setBoost:q=>{L=q},addClick:()=>{U=1},setSleeping:q=>{yt=q},update:(q,lt,wt={})=>{var Gi,ti;_t.speed+=(pt.speed-_t.speed)*.04,_t.floatAmp+=(pt.floatAmp-_t.floatAmp)*.04,_t.floatSpeed+=(pt.floatSpeed-_t.floatSpeed)*.04,_t.breath+=(pt.breath-_t.breath)*.04,_t.bodySway+=(pt.bodySway-_t.bodySway)*.04,_t.bodyYaw+=(pt.bodyYaw-_t.bodyYaw)*.04,_t.bodyPitch+=(pt.bodyPitch-_t.bodyPitch)*.04,_t.tailYaw+=(pt.tailYaw-_t.tailYaw)*.04,_t.tailPitch+=(pt.tailPitch-_t.tailPitch)*.04,_t.pecFlap+=(pt.pecFlap-_t.pecFlap)*.04,U+=(0-U)*.02;const D=Math.max(L,U),G=yt?.2:1,X=1+.4*D,ct=1+.45*D,Mt=q0*X*Math.PI*2,Xt=(Gi=wt.divePitch)!=null?Gi:0,oe=_t.bodySway*ct*G;s.rotation.z=Xt+oe*(Math.sin(q*Mt)+.4*Math.sin(q*Mt*2+1.3));const fe=_t.bodyPitch*ct*G;s.rotation.x=fe*(Math.sin(q*Mt+.8)+.4*Math.sin(q*Mt*2+.3));const Je=1+Math.sin(q*_t.floatSpeed*1.6)*_t.breath;Et.rotation.z=Lt.TAIL_TILT_DEG*Math.PI/180;const te=_t.tailYaw*ct*G;Et.rotation.y=te*(Math.sin(q*Mt+.7)+.5*Math.sin(q*Mt*2+1.9));const Ee=_t.tailPitch*ct*G;Et.rotation.x=Ee*(Math.sin(q*Mt+1.2)+.5*Math.sin(q*Mt*2+.5));const Qn=_t.pecFlap*ct*G*(Math.sin(q*Mt+.6)+.5*Math.sin(q*Mt*2+1.8));for(const On of Wt)On.rotation.x=Qn;if(yt)for(const On of z)On.scale.y=.1;else{const On=4.3/(1+.25*D),C=(q+Ct)%On/On,W=.06+.94*j0(C);for(const Q of z)Q.scale.y=W}return((ti=wt.baseScale)!=null?ti:1)*Je}}}const ic={iceberg:{id:"iceberg",label:"雾霭冰山",emoji:"❄️",background:7248556,fogColor:7248042,fogDensity:.009,column:[[0,4351612],[.15,5141642],[.3,6063256],[.45,6984870],[.6,7905970],[.75,8826556],[.88,9615556],[1,10404556]],sunColor:15399164,sunGlow:.3,sandColor:10796230,hillColor:15266036,skylineColor:14214892,shaftColor:14216436,shaftIntensity:.15,causticColor:14479092,causticIntensity:.34,causticScale:.21,causticRadius:32,ambient:.72,diffuse:.32,aoStrength:.45,rippleStrength:.09,surfaceTransmit:14085364,surfaceReflect:7182248,surfaceAlpha:.22,bubbleColor:15660792,bubbleOpacity:.5,planktonColor1:16052454,planktonColor2:11065576,coralHues:[12768480,12111064,11453652,13162722,11847892,12636892],spongeHues:[15259848,14207156,13688036],kelpHues:[12899548,11847890,13622754],starfishColor:1578e4,fishHues:[15249568,11061472,14205088]},tropical:{id:"tropical",label:"蜜桃暖阳",emoji:"☀️",background:1999004,fogColor:1999004,fogDensity:.009,column:[[0,1335418],[.15,1601676],[.3,1999004],[.45,2592938],[.6,3252406],[.75,3977410],[.88,4767434],[1,5556432]],sunColor:16773808,sunGlow:.35,sandColor:8177858,hillColor:15259832,skylineColor:13945e3,shaftColor:16773832,shaftIntensity:.17,causticColor:15135982,causticIntensity:.4,causticScale:.21,causticRadius:34,ambient:.62,diffuse:.42,aoStrength:.55,rippleStrength:.11,surfaceTransmit:14677748,surfaceReflect:1998748,surfaceAlpha:.3,bubbleColor:16512744,bubbleOpacity:.55,planktonColor1:16313556,planktonColor2:15780008,coralHues:[16033976,15780008,14448473,16046256,15251656,15771824],spongeHues:[14448473,15243904,15780008],kelpHues:[8566910,9618568,7645298],starfishColor:15773840,fishHues:[15769744,15777936,9486504]},deep:{id:"deep",label:"奶油暮海",emoji:"🌊",background:1129556,fogColor:930376,fogDensity:.011,column:[[0,532016],[.15,665660],[.3,864840],[.45,1129556],[.6,1394272],[.75,1658988],[.88,1923704],[1,2188420]],sunColor:10872565,sunGlow:.35,sandColor:2906224,hillColor:4747402,skylineColor:3824756,shaftColor:10868972,shaftIntensity:.17,causticColor:11064540,causticIntensity:.7,causticScale:.21,causticRadius:30,ambient:.44,diffuse:.6,aoStrength:.75,rippleStrength:.1,surfaceTransmit:6266040,surfaceReflect:664630,surfaceAlpha:.22,bubbleColor:13624552,bubbleOpacity:.5,planktonColor1:12375262,planktonColor2:10139852,coralHues:[9417940,11192544,8364992,12638442,9746640,12112100],spongeHues:[7312824,9086916,6127520],kelpHues:[11062484,10010826,12114140],starfishColor:15775896,fishHues:[12376296,14203048,11061456]}};function To(s){return ic[s]}const K0={iceberg:{fish:90,plankton:950},tropical:{fish:100,plankton:1e3},deep:{fish:105,plankton:1050}};function sc(s){return K0[s]}function Q0(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new Kt;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in u.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(u.attributes[m]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in u.morphAttributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(u.morphAttributes[m])}if(t){let m;if(e)m=u.index.count;else if(u.attributes.position!==void 0)m=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,m,h),c+=m}}if(e){let h=0;const u=[];for(let f=0;f<s.length;++f){const m=s[f].index;for(let g=0;g<m.count;++g)u.push(m.getX(g)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=rc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const m=[];for(let p=0;p<a[h].length;++p)m.push(a[h][p][f]);const g=rc(m);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function rc(s){let t,e,n,i=0;for(let o=0;o<s.length;++o){const l=s[o];if(l.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=l.itemSize),e!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;i+=l.array.length}const r=new t(i);let a=0;for(let o=0;o<s.length;++o)r.set(s[o].array,a),a+=s[o].array.length;return new ne(r,e,n)}const tg=new E(.34,.9,.22).normalize(),eg=.6,ng=.52;function ig(s){const t=s.getAttribute("position"),e=s.getAttribute("color");if(!t||!e)return;s.getAttribute("normal")||s.computeVertexNormals();const n=s.getAttribute("normal");for(let i=0;i<t.count;i++){const r=Math.max(0,n.getY(i)),a=eg+ng*r;e.setXYZ(i,e.getX(i)*a,e.getY(i)*a,e.getZ(i)*a)}e.needsUpdate=!0}function sg(s,t,e=2.4,n=2.6,i=.55){const r=s.getAttribute("position"),a=new Float32Array(r.count);for(let o=0;o<r.count;o++){const l=r.getX(o),c=r.getY(o),h=r.getZ(o),f=((t(l+e,h)+t(l-e,h)+t(l,h+e)+t(l,h-e))/4-c)/e;a[o]=Math.min(1,Math.max(i,1-Math.max(0,f)*n))}return a}const rg=`
float causticField(vec2 p, float t) {
  // The whole field drifts, so the pools never look pinned to the floor.
  p += vec2(t * 0.08, t * 0.055);

  // Three slow phase-shifted swells. Each one's phase is warped by the other
  // axis, which is what makes the crests wander instead of sliding like
  // venetian blinds.
  float a = sin(p.x * 1.6 + sin(p.y * 1.25 + t * 0.5) * 1.25 + t * 0.42)
          + sin(p.y * 1.4 + sin(p.x * 1.05 - t * 0.38) * 1.15 - t * 0.31)
          + sin((p.x + p.y) * 1.05 + t * 0.55);
  a /= 3.0;

  // Soft plateau-free bands: an S-curve, then a mild power so crests stay
  // billowy while troughs fall to zero.
  float c = smoothstep(0.08, 0.92, a);
  c = pow(c, 1.7);

  // Fine glitter on its own phase, cubed so only thin filaments survive. This
  // is the shimmer the broad layer alone lacks.
  vec2 q = p * 3.1;
  float fine = sin(q.x + sin(q.y + t * 0.9) * 1.4) * sin(q.y - sin(q.x - t * 0.7) * 1.4);
  c = c * 0.85 + pow(max(0.0, fine), 3.0) * 0.55;
  return c;
}
`,og=`
float rippleHeight(vec2 p) {
  // Rotate a copy so the second train crosses at ~25 degrees, not 90.
  vec2 q = vec2(p.x * 0.91 + p.y * 0.41, -p.x * 0.41 + p.y * 0.91);
  float a = sin(p.x * 1.35 + sin(p.y * 0.55) * 1.1);
  float b = sin(q.x * 1.9 + 1.7);
  float c = sin(q.y * 0.75 - 0.6);
  return a * 0.55 + b * 0.28 + c * 0.17;
}
`,ag=`
attribute float aAO;

varying vec3 vColor;
varying vec3 vNormalW;
varying vec3 vWorld;
varying float vAO;
varying float vFogDepth;

void main() {
  vColor = color;
  vNormalW = normalize(mat3(modelMatrix) * normal);

  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vAO = aAO;

  vec4 mv = viewMatrix * world;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,lg=`
precision highp float;

uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform float uAmbient;
uniform float uDiffuse;

uniform vec3 uCausticColor;
uniform float uCausticIntensity;
uniform float uCausticScale;
uniform float uCausticRadius;
uniform vec2 uCausticCenter;
uniform float uTime;

uniform float uRipple;
uniform float uAOStrength;

uniform vec3 uFogColor;
uniform float uFogDensity;

varying vec3 vColor;
varying vec3 vNormalW;
varying vec3 vWorld;
varying float vAO;
varying float vFogDepth;

${rg}
${og}

void main() {
  vec3 N = normalize(vNormalW);

  // Sand ripples. Finite-difference the analytic ripple height and fold the
  // result into the shading normal, so the floor picks up fine texture that
  // the 90x90 mesh could never carry as real geometry.
  vec2 rp = vWorld.xz * 1.35;
  float e = 0.14;
  float h0 = rippleHeight(rp);
  float hx = rippleHeight(rp + vec2(e, 0.0));
  float hz = rippleHeight(rp + vec2(0.0, e));
  vec3 rippleN = normalize(vec3((h0 - hx) / e * uRipple, 1.0, (h0 - hz) / e * uRipple));
  N = normalize(N + rippleN - vec3(0.0, 1.0, 0.0));

  float ndl = max(dot(N, uLightDir), 0.0);
  float ao = mix(1.0, vAO, uAOStrength);

  // Key light + hemisphere fill, then the baked crease occlusion.
  vec3 base = vColor * (uAmbient + uDiffuse * ndl) * ao;

  // Caustics, scaled by how much headroom the pixel has left. Bright sand gets
  // a shimmer, dark sand gets the full pool, and nothing can clip to white.
  // This is what the old build faked by switching the overlay between additive
  // and normal blending per theme; now there is one blend and it cannot blow
  // out, which also means the theme switch no longer recompiles a shader.
  vec2 d = vWorld.xz - uCausticCenter;
  float pool = 1.0 - smoothstep(uCausticRadius * 0.5, uCausticRadius, length(d));
  float ca = causticField(d * uCausticScale, uTime) * pool;
  float lum = dot(base, vec3(0.299, 0.587, 0.114));
  float headroom = clamp(1.0 - lum, 0.0, 1.0);
  base += uCausticColor * ca * uCausticIntensity * headroom;

  // Crests catch a little direct light too, otherwise the pattern reads as a
  // decal pasted over the shading rather than light lying on the ground.
  base += uLightColor * ca * 0.06 * ndl;

  // FogExp2 by hand: a raw ShaderMaterial does not inherit scene.fog, and
  // without it the sand's far edge would pop instead of dissolving.
  float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
  base = mix(base, uFogColor, clamp(fogFactor, 0.0, 1.0));

  // ...but tinting toward the fog colour is not enough to make the sand meet
  // the water. The water column behind it is a *different* colour — brighter
  // than uFogColor, and lifted again by the grade/bloom pass, which a
  // hand-written fog term never receives. So a fully fogged sand pixel lands
  // noticeably darker than the water right above it, and the horizon reads as
  // a ruled line across the frame. No fog colour or density fixes that: the
  // two are drawn by different pipelines.
  //
  // Fading the alpha out instead lets the real water show through, so the sand
  // genuinely dissolves rather than ending. Keyed to fogFactor rather than to
  // raw distance so the band moves with each theme's density: the sand stays
  // solid until the fog has mostly swallowed it, then hands over.
  //
  // 0.98 rather than 1.0 because the plane's rim (210 units) is reached while
  // the fog is at ~0.97 — ending the ramp at 0.98 leaves the rim at 0.2% alpha,
  // i.e. a step far below one 8-bit level, so the square can never reappear
  // even if a future theme fog gets thinner.
  float fade = 1.0 - smoothstep(0.70, 0.98, clamp(fogFactor, 0.0, 1.0));

  gl_FragColor = vec4(base, fade);
}
`;function cg(s){const t=new de({vertexShader:ag,fragmentShader:lg,vertexColors:!0,transparent:!0,depthWrite:!0,uniforms:{uLightDir:{value:tg.clone()},uLightColor:{value:new gt(s.sunColor)},uAmbient:{value:s.ambient},uDiffuse:{value:s.diffuse},uCausticColor:{value:new gt(s.causticColor)},uCausticIntensity:{value:s.causticIntensity},uCausticScale:{value:s.causticScale},uCausticRadius:{value:s.causticRadius},uCausticCenter:{value:new rt(0,0)},uTime:{value:0},uRipple:{value:s.rippleStrength},uAOStrength:{value:s.aoStrength},uFogColor:{value:new gt(s.fogColor)},uFogDensity:{value:s.fogDensity}}});return{material:t,setTheme:e=>{const n=t.uniforms;n.uLightColor.value.setHex(e.sunColor),n.uAmbient.value=e.ambient,n.uDiffuse.value=e.diffuse,n.uCausticColor.value.setHex(e.causticColor),n.uCausticIntensity.value=e.causticIntensity,n.uCausticScale.value=e.causticScale,n.uCausticRadius.value=e.causticRadius,n.uRipple.value=e.rippleStrength,n.uAOStrength.value=e.aoStrength},setFog:(e,n)=>{t.uniforms.uFogColor.value.setHex(e),t.uniforms.uFogDensity.value=n},update:e=>{t.uniforms.uTime.value=e},dispose:()=>t.dispose()}}const Dn=22,Eo=6,oc=4,ac=4,lc=4,cc=3,hc=3,In={hill:10,sponge:14,chest:2,coral:30,kelp:64,starfish:20,rock:26,skyline:20},hs=210,uc=90,dc=120;function fc(s){const t=Math.abs(s);return Math.sign(s)*(uc*t+(hs-uc)*t*t*t)}function Pe(s,t){const e=new gt(s);return e.r=Math.min(1,e.r*t),e.g=Math.min(1,e.g*t),e.b=Math.min(1,e.b*t),e.getHex()}function he(s){return new re({color:s,side:ae})}function $n(s,t,e){const n=Math.min(1,Math.max(0,(e-s)/(t-s)));return n*n*(3-2*n)}function Te(s,t){const e=Math.hypot(s,t),n=(1-$n(8,20,e))*.35,i=$n(22,34,Math.abs(s)),r=$n(17,28,Math.abs(t)),a=Math.max(i,r),o=Math.sin(s*.35+Math.sin(t*.28)*1.4)*Math.cos(t*.32+Math.sin(s*.31)*1.3)*.55+Math.sin(s*.85+1.7)*Math.cos(t*.9+.3)*.28+Math.sin(s*1.8+.5)*Math.cos(t*1.9+2.1)*.14;return n-a*1.6+o*(.05+.22*a)}function hg(s,t){return s.updateMatrixWorld(!0),new Qt().copy(s.matrixWorld).invert().multiply(t.matrixWorld)}function ug(s){const t=[];if(s.updateMatrixWorld(!0),s.traverse(n=>{const i=n;if(!i.isMesh||!i.geometry)return;const r=Array.isArray(i.material)?i.material[0]:i.material;if(!r)return;const a=i.geometry.index?i.geometry.toNonIndexed():i.geometry.clone();a.applyMatrix4(hg(s,i));const o=a.getAttribute("position"),l=o.count,c=new Float32Array(l*3),h=r.color,u=h.r>.995&&h.g>.995&&h.b>.995;for(let g=0;g<l;g++)c[g*3]=u?1:h.r,c[g*3+1]=u?1:h.g,c[g*3+2]=u?1:h.b;const f=new Kt;f.setAttribute("position",o.clone()),f.setAttribute("color",new ne(c,3));const m=a.getAttribute("normal");m&&f.setAttribute("normal",m.clone()),ig(f),f.deleteAttribute("normal"),t.push(f),a!==i.geometry&&a.dispose()}),t.length===0)return null;if(t.length===1)return{geometry:t[0],vertexColors:!0};const e=Q0(t,!1);return t.forEach(n=>n.dispose()),e?{geometry:e,vertexColors:!0}:null}class Jn{constructor(t,e,n){Tt(this,"group",new Vt);Tt(this,"meshes",[]);const i=[],r=Math.max(1,Math.min(e,n));for(let o=0;o<r;o++){const l=typeof t=="function"?t():t,c=ug(l);c&&i.push(c)}if(i.length===0)return;const a=new re({color:16777215,side:ae,vertexColors:!0});for(const o of i){const l=new zi(o.geometry,a,1);l.count=0,l.frustumCulled=!1,this.group.add(l),this.meshes.push(l)}}get size(){return this.meshes.length}reserve(t){const e=Math.max(t,this.meshes.length);for(let n=0;n<this.meshes.length;n++){const i=this.meshes[n];if(i.instanceMatrix.count>=e)continue;const r=new zi(i.geometry,i.material,e);r.count=i.count,r.frustumCulled=!1;const a=new Qt,o=new gt;for(let l=0;l<i.count;l++)i.getMatrixAt(l,a),r.setMatrixAt(l,a),i.getColorAt(l,o),r.setColorAt(l,o);this.group.remove(i),i.dispose(),this.group.add(r),this.meshes[n]=r}}add(t,e,n,i,r){const a=this.meshes[t%this.meshes.length];if(!a)return 0;const o=a.count;if(o>=a.instanceMatrix.count)return o;const l=new be;return l.position.copy(e),l.scale.copy(n),l.rotation.set(0,i,0),l.updateMatrix(),a.setMatrixAt(o,l.matrix),a.setColorAt(o,r),a.count=o+1,o}recolor(t,e,n){const i=this.meshes[t%this.meshes.length];!i||e>=i.count||i.setColorAt(e,n)}markDirty(){for(const t of this.meshes)t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0)}dispose(){const t=new Set,e=new Set;for(const n of this.meshes)t.add(n.geometry),e.add(n.material),n.dispose();t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose()),this.meshes.length=0}}function dg(){const s=new Vt,t=new mt(new ce(.42,10,6),he(Pe(16777215,.62)));t.scale.set(1,.3,1),s.add(t);const e=Math.random();if(e<.32){const n=3+Math.floor(Math.random()*3);for(let i=0;i<n;i++){const r=.4+Math.random()*.75,a=.09+Math.random()*.07,o=new mt(new le(a*.82,a,r,8),he(16777215));o.position.set((Math.random()-.5)*.42,r/2+.04,(Math.random()-.5)*.42),o.rotation.z=(Math.random()-.5)*.26,o.rotation.x=(Math.random()-.5)*.26;const l=new mt(new le(a,a*.82,.08,8),he(Pe(16777215,1.3)));l.position.set(o.position.x+o.rotation.z*r*.5,r+.06,o.position.z),s.add(o,l)}}else if(e<.62){const n=new E(0,1,0),i=(r,a,o,l,c)=>{const h=new mt(new le(l*.62,l,o,7),he(Pe(16777215,c<=0?1.3:.88+c*.06)));h.position.copy(r).addScaledVector(a,o/2),h.quaternion.setFromUnitVectors(n,a),s.add(h);const u=r.clone().addScaledVector(a,o);if(c<=0){const g=new mt(new ce(l*.95,8,8),he(Pe(16777215,1.35)));g.position.copy(u),s.add(g);return}let f=new E().crossVectors(a,n);f.lengthSq()<1e-6&&f.set(1,0,0),f.normalize();const m=c>=3?2:Math.random()<.4?3:2;for(let g=0;g<m;g++){const p=(g/Math.max(1,m-1)-.5)*1.5,d=a.clone().applyAxisAngle(f,p).applyAxisAngle(a,Math.random()*Math.PI*2);d.lerp(n,.18).normalize(),i(u,d,o*.72,l*.6,c-1)}};i(new E(0,.16,0),new E(0,1,0),.42,.08,3)}else if(e<.84){const n=new mt(new le(.04,.07,.3,7),he(Pe(16777215,.85)));n.position.y=.15,s.add(n);const i=new mt(new ss(.5,10,0,Math.PI),he(Pe(16777215,1.05)));i.position.y=.62,i.rotation.y=Math.random()*Math.PI,i.rotation.x=-.25-Math.random()*.3,s.add(i);const r=new mt(new bo(.5,.035,6,12,Math.PI),he(Pe(16777215,1.3)));r.position.copy(i.position),r.rotation.copy(i.rotation),s.add(r)}else{const n=new mt(new ce(.34,10,8),he(Pe(16777215,.9)));n.scale.y=.72,n.position.y=.2,s.add(n);for(let i=0;i<3;i++){const r=Math.random()*Math.PI*2,a=new mt(new ce(.14+Math.random()*.08,8,6),he(Pe(16777215,1.12)));a.position.set(Math.cos(r)*.16,.3+Math.random()*.06,Math.sin(r)*.16),s.add(a)}}return s}function fg(){const s=new Vt,t=2+Math.floor(Math.random()*3);for(let e=0;e<t;e++){const n=.5+Math.random()*1,i=.1+Math.random()*.05,r=(Math.random()-.5)*.5,a=(Math.random()-.5)*.5,o=(Math.random()-.5)*.3,l=(Math.random()-.5)*.3,c=new mt(new le(i*.8,i*1.35,n,8),he(Pe(16777215,.88+Math.random()*.2)));c.position.set(r,n/2,a),c.rotation.z=o,c.rotation.x=l;const h=new mt(new le(i*1.05,i*.8,.09,8),he(Pe(16777215,1.28)));h.position.set(r+o*n*.5,n+.05,a),s.add(c,h)}return s}function pg(){const s=new Vt,t=2+Math.floor(Math.random()*3);for(let e=0;e<t;e++){const n=.45+Math.random()*.75,i=new mt(new nr(n,0),he(Pe(16777215,.75+Math.random()*.3)));i.position.set((Math.random()-.5)*1.4,n*.35,(Math.random()-.5)*1.4),i.scale.y=.55+Math.random()*.35,i.rotation.set(Math.random()*.5,Math.random()*Math.PI,Math.random()*.5),s.add(i)}return s}function mg(){const s=.9+Math.random()*2.6,t=new xn(.3,s,1,12),e=t.attributes.position.array;for(let n=0;n<e.length;n+=3){const r=(e[n+1]+s/2)/s;e[n]*=.3+.7*Math.sin(r*Math.PI),e[n]+=Math.sin(r*2.2)*.05}return t.computeVertexNormals(),t.translate(0,s/2,0),t}function gg(){const s=new ir,t=5,e=.26,n=.11;for(let r=0;r<t*2;r++){const a=r%2===0?e:n,o=r/(t*2)*Math.PI*2-Math.PI/2,l=Math.cos(o)*a,c=Math.sin(o)*a;r===0?s.moveTo(l,c):s.lineTo(l,c)}s.closePath();const i=new vo(s,{depth:.06,bevelEnabled:!0,bevelThickness:.018,bevelSize:.018,bevelSegments:2});return i.rotateX(-Math.PI/2),i}function xg(s){return new nr(1,0)}function vg(){const s=new Vt,t=new mt(new xe(.7,.4,.5),he(6243378));t.position.y=.24,s.add(t);const e=new mt(new le(.26,.26,.5,10,1,!1,0,Math.PI),he(4862757));e.rotation.z=Math.PI/2,e.position.y=.47,s.add(e);const n=new mt(new xe(.74,.06,.54),he(13148746));n.position.y=.24,s.add(n);const i=[[.16,.2,0,.1],[-.2,.14,.4,.07]];for(const[r,a,o,l]of i){const c=new mt(new le(l,l,.04,12),he(14200912));c.rotation.x=Math.PI/2,c.rotation.y=o,c.position.set(r,.08,a),s.add(c)}return s}function pc(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function _g(s,t){const e=new Vt;e.name="open-sea-terrain";const n=new xn(hs*2,hs*2,dc,dc);n.rotateX(-Math.PI/2);{const I=n.attributes.position;for(let z=0;z<I.count;z++)I.setX(z,fc(I.getX(z)/hs)),I.setZ(z,fc(I.getZ(z)/hs))}{const I=n.attributes.position,z=new Float32Array(I.count*3),N=new gt(s.sandColor),k=new gt(s.skylineColor),et=new gt;for(let J=0;J<I.count;J++){const at=I.getX(J),Z=I.getZ(J);I.setY(J,Te(at,Z));const At=Math.hypot(at,Z),vt=1+.18*(1-$n(4,14,At)),Et=1-$n(20,48,At);et.copy(N).multiplyScalar(vt).lerp(k,1-Et);const ut=.94+pc(at,Z)*.12;z[J*3]=et.r*ut,z[J*3+1]=et.g*ut,z[J*3+2]=et.b*ut}n.setAttribute("color",new ne(z,3))}n.computeVertexNormals(),n.setAttribute("aAO",new ne(sg(n,Te),1));const i=cg(s),r=i.material,a=new mt(n,r);a.name="seafloor",a.frustumCulled=!1,a.renderOrder=-15,e.add(a);const o={hill:Math.round(In.hill*t.prop),sponge:Math.round(In.sponge*t.prop),chest:Math.round(In.chest*t.prop),coral:Math.round(In.coral*t.coral),kelp:Math.round(In.kelp*t.kelp),starfish:Math.round(In.starfish*t.starfish),rock:Math.round(In.rock*t.rock),skyline:Math.round(In.skyline*t.skyline)},l=new Jn(dg,oc,o.coral),c=new Jn(new mt(gg(),he(16777215)),1,o.starfish),h=new Jn(fg(),lc,o.sponge),u=new Jn(vg(),cc,o.chest),f=new Jn(pg(),ac,o.hill),m=new Jn(new mt(new Rn(1,0),he(16777215)),1,o.rock),g=new Jn(new mt(xg(),he(16777215)),hc,o.skyline),p=[l,c,h,u,f,m,g];p.forEach(I=>e.add(I.group));const d=(I,z)=>Math.ceil(I/z)+2;l.reserve(o.coral+1),c.reserve(o.starfish+1),h.reserve(d(o.sponge,h.size)),u.reserve(d(o.chest,u.size)),f.reserve(d(o.hill,f.size)),m.reserve(o.rock+1),g.reserve(d(o.skyline,g.size));const _=[],x=[];for(let I=0;I<Eo;I++){const z=he(s.kelpHues[I%s.kelpHues.length]),N=new zi(mg(),z,d(o.kelp,Eo));N.count=0,N.frustumCulled=!1,N.instanceMatrix.setUsage(Er),e.add(N),_.push(z),x.push(N)}const v=[],b=new Map,y=I=>{let z=b.get(I);return z||(z=[],b.set(I,z)),z},w=new gt(16777215),A=(I,z,N,k,et,J,at,Z=1)=>{const At=I.add(z,N,k,et,at);y(I).push({variant:z,index:At,colorSlot:J,brightness:Z})},M=new gt(s.hillColor);for(let I=0;I<o.hill;I++){const z=Math.random()*Math.PI*2,N=Dn+Math.random()*14,k=Math.cos(z)*N,et=Math.sin(z)*N,J=Math.min(1,Math.max(.28,(N-Dn)/14)),at=(1.2+Math.random()*1.6)*J;A(f,I%ac,new E(k,Te(k,et)-.05,et),new E(at,(.55+Math.random()*.7)*J,at),Math.random()*Math.PI,0,M)}const T=s.spongeHues.map(I=>new gt(I));for(let I=0;I<o.sponge;I++){const z=Math.random()*Math.PI*2,N=Dn-2+Math.random()*10,k=Math.cos(z)*N,et=Math.sin(z)*N,J=.8+Math.random()*.6,at=I%T.length;A(h,I%lc,new E(k,Te(k,et),et),new E(J,J,J),Math.random()*Math.PI,at,T[at])}for(let I=0;I<o.chest;I++){const z=Math.random()*Math.PI*2,N=Dn+Math.random()*8,k=Math.cos(z)*N,et=Math.sin(z)*N,J=.9+Math.random()*.4;A(u,I%cc,new E(k,Te(k,et),et),new E(J,J,J),Math.random()*Math.PI,0,w)}const R=s.coralHues.map(I=>new gt(I));for(let I=0;I<o.coral;I++){const z=I/Math.max(1,o.coral)*Math.PI*2+Math.random()*.5,N=Dn+1.5+Math.random()*8,k=Math.cos(z)*N,et=Math.sin(z)*N*.8,J=1.15+Math.random()*.85,at=I%R.length;A(l,I%oc,new E(k,Te(k,et),et),new E(J,J,J),Math.random()*Math.PI,at,R[at])}const V=new gt(s.starfishColor);for(let I=0;I<o.starfish;I++){const z=Math.random()*Math.PI*2,N=Dn+Math.random()*8,k=Math.cos(z)*N,et=Math.sin(z)*N*.72;A(c,0,new E(k,Te(k,et)+.03,et),new E(1,1,1),Math.random()*Math.PI,0,V)}const K=new gt(Pe(s.hillColor,1.35));let H=0,O=0;for(;H<o.rock&&O<o.rock*40;){O++;const I=(Math.random()-.5)*34,z=(Math.random()-.5)*24,N=Te(I,z);if(Math.hypot(I,z)<=Dn||N<=-1.1||N>=.3)continue;const k=.28+Math.random()*.28;A(m,0,new E(I,N+.05,z),new E(k,k*(.55+Math.random()*.35),k),Math.random()*Math.PI,0,K),H++}const F=[new gt(Pe(s.skylineColor,.85)),new gt(s.skylineColor)];for(let I=0;I<o.skyline;I++){const z=I/Math.max(1,o.skyline)*Math.PI*2+Math.random()*.22,N=24+Math.random()*16,k=Math.random()<.35,et=k?3.6+Math.random()*3:2+Math.random()*2.6,J=k?1.8+Math.random()*2:2.6+Math.random()*3.2,at=I%2;A(g,I%hc,new E(Math.cos(z)*N,Te(Math.cos(z)*N,Math.sin(z)*N)+et*.28,Math.sin(z)*N),new E(J,et,J),Math.random()*Math.PI,at,F[at])}{let I=0,z=0;const N=Math.ceil(o.kelp/3);for(;I<o.kelp&&z<N;){z++;const k=Math.random()*Math.PI*2,et=Dn+Math.random()*6,J=Math.cos(k)*et,at=Math.sin(k)*et*.75;for(let Z=0;Z<3&&I<o.kelp;Z++,I++){const At=J+(Math.random()-.5)*.5,vt=at+(Math.random()-.5)*.5,Et=I%Eo,ut=x[Et],Ft=ut.count;if(Ft>=ut.instanceMatrix.count)break;v.push({variant:Et,index:Ft,x:At,y:Te(At,vt),z:vt,yaw:Math.random()*Math.PI,phase:Math.random()*Math.PI*2}),ut.count=Ft+1}}}const Y=I=>{var nt,it;for(let ot=0;ot<_.length;ot++)_[ot].color.setHex(I.kelpHues[ot%I.kelpHues.length]);const z=(ot,bt,ft)=>{var Pt;const It=y(ot),Rt=new gt;for(const kt of It)Rt.copy(bt.length>1&&(Pt=bt[kt.colorSlot%bt.length])!=null?Pt:ft),kt.brightness!==1&&Rt.multiplyScalar(kt.brightness),ot.recolor(kt.variant,kt.index,Rt);ot.markDirty()},N=new gt(I.hillColor);z(f,[N],N);const k=I.spongeHues.map(ot=>new gt(ot));z(h,k,(nt=k[0])!=null?nt:w);const et=I.coralHues.map(ot=>new gt(ot));z(l,et,(it=et[0])!=null?it:w);const J=new gt(I.starfishColor);z(c,[J],J);const at=new gt(Pe(I.hillColor,1.35));z(m,[at],at);const Z=[new gt(Pe(I.skylineColor,.85)),new gt(I.skylineColor)];z(g,Z,Z[0]);const At=n.attributes.position,vt=n.attributes.color,Et=new gt(I.sandColor),ut=new gt(I.skylineColor),Ft=new gt;for(let ot=0;ot<At.count;ot++){const bt=At.getX(ot),ft=At.getZ(ot),It=Math.hypot(bt,ft),Rt=1+.18*(1-$n(4,14,It)),Pt=1-$n(20,48,It);Ft.copy(Et).multiplyScalar(Rt).lerp(ut,1-Pt);const kt=.94+pc(bt,ft)*.12;vt.setXYZ(ot,Ft.r*kt,Ft.g*kt,Ft.b*kt)}vt.needsUpdate=!0},tt=new be,j=I=>{for(const z of v)tt.position.set(z.x,z.y,z.z),tt.scale.setScalar(1),I===null?tt.rotation.set(0,z.yaw,0):tt.rotation.set(Math.cos(I*.7+z.phase)*.09,z.yaw,Math.sin(I*.9+z.phase)*.14),tt.updateMatrix(),x[z.variant].setMatrixAt(z.index,tt.matrix);for(const z of x)z.instanceMatrix.needsUpdate=!0};return Y(s),j(null),p.forEach(I=>I.markDirty()),{group:e,update:I=>{j(I),i.update(I)},setTheme:I=>{Y(I),i.setTheme(I),i.setFog(I.fogColor,I.fogDensity)},dispose:()=>{n.dispose(),i.dispose(),p.forEach(I=>I.dispose()),x.forEach(I=>{I.geometry.dispose(),I.dispose()}),_.forEach(I=>I.dispose()),e.clear()}}}const mc=15,yg=`
varying vec3 vWorld;
varying float vFogDepth;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vec4 mv = viewMatrix * world;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,bg=`
precision highp float;

uniform float uTime;
uniform vec3 uCamPos;
uniform float uSurfaceY;
uniform vec3 uTransmit;
uniform vec3 uReflect;
uniform float uAlpha;
uniform vec3 uFogColor;
uniform float uFogDensity;

varying vec3 vWorld;
varying float vFogDepth;

// Crossing swells at deliberately incommensurate frequencies. A handful of
// tidy ratios (1:2, 1:1.5) sum into visible strata near the horizon, where
// perspective compresses a whole wavelength into a few pixels; frequencies
// that share no common period instead read as shimmer.
float waveHeight(vec2 p, float t) {
  float h = 0.0;
  h += sin(p.x * 0.72 + t * 0.85) * 0.50;
  h += sin(p.y * 0.94 - t * 0.72) * 0.50;
  h += sin((p.x + p.y) * 0.51 + t * 1.05) * 0.34;
  h += sin((p.x - p.y) * 1.12 - t * 1.40) * 0.14;
  h += sin(p.x * 2.30 + p.y * 1.70 + t * 1.90) * 0.09;
  h += sin(p.y * 3.10 - p.x * 1.30 - t * 2.30) * 0.05;
  return h;
}

void main() {
  vec2 p = vWorld.xz;
  float e = 0.35;
  float h0 = waveHeight(p, uTime);
  float hx = waveHeight(p + vec2(e, 0.0), uTime);
  float hz = waveHeight(p + vec2(0.0, e), uTime);

  // Normal pointing DOWN, into the water, because we are underneath it.
  // The tilt is kept deliberately shallow: at a grazing view a strong normal
  // swings the facing term across its whole range over a few pixels, which
  // turns the ceiling into hard stripes. Water seen from below is a soft
  // sheet, so the shading has to stay soft too.
  vec3 N = normalize(vec3((hx - h0) / e * 0.08, -1.0, (hz - h0) / e * 0.08));
  vec3 V = normalize(uCamPos - vWorld);
  // 1.0 when the camera sits directly below this patch, 0.0 at grazing.
  float facing = clamp(dot(N, V), 0.0, 1.0);

  // Total internal reflection: the steeper the view, the more the surface
  // mirrors the deep instead of letting the sky through.
  float reflectivity = pow(1.0 - facing, 3.0);
  vec3 col = mix(uTransmit, uReflect, reflectivity);

  // Snell's window: the bright disc, with a soft rim rather than a hard circle.
  float window = smoothstep(0.56, 0.74, facing);
  col = mix(col, uTransmit, window * 0.5);
  col += uTransmit * pow(facing, 10.0) * 0.4;

  // Ripple shading, so the ceiling breathes instead of sitting still.
  float ripple = sin(p.x * 2.1 + uTime * 1.1) * sin(p.y * 1.9 - uTime * 0.9);
  col += vec3(0.02) * ripple * facing;

  float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
  col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

  // Dissolve toward the horizon.
  float dist = length(vWorld.xz - uCamPos.xz);
  float fade = 1.0 - smoothstep(45.0, 190.0, dist);

  // The orbit range lets the player climb above the waterline. From up there
  // this plane would sit between the lens and the whole scene and wash it out,
  // so it retires as the camera approaches the surface. Cheap, and it means the
  // ceiling never has to be reconciled with an above-water view.
  fade *= 1.0 - smoothstep(0.0, 6.0, uCamPos.y - uSurfaceY);

  gl_FragColor = vec4(col, uAlpha * fade);
}
`;function Mg(s){const t=new xn(420,420,1,1);t.rotateX(Math.PI/2);const e=new de({vertexShader:yg,fragmentShader:bg,uniforms:{uTime:{value:0},uCamPos:{value:new E},uSurfaceY:{value:mc},uTransmit:{value:new gt(s.surfaceTransmit)},uReflect:{value:new gt(s.surfaceReflect)},uAlpha:{value:s.surfaceAlpha},uFogColor:{value:new gt(s.fogColor)},uFogDensity:{value:s.fogDensity}},transparent:!0,depthWrite:!1,depthTest:!0,side:ae}),n=new mt(t,e);return n.name="water-surface",n.position.y=mc,n.frustumCulled=!1,n.renderOrder=-10,{mesh:n,update:(i,r)=>{e.uniforms.uTime.value=i,e.uniforms.uCamPos.value.copy(r.position)},setTheme:i=>{const r=e.uniforms;r.uTransmit.value.setHex(i.surfaceTransmit),r.uReflect.value.setHex(i.surfaceReflect),r.uAlpha.value=i.surfaceAlpha},setFog:(i,r)=>{e.uniforms.uFogColor.value.setHex(i),e.uniforms.uFogDensity.value=r},dispose:()=>{t.dispose(),e.dispose()}}}const gc=10,wg=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Sg=`
precision highp float;

uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  vec2 d = (vUv - 0.5) * 2.0;
  float r = length(d);
  // Wide soft shoulder, no hard rim.
  float a = 1.0 - smoothstep(0.25, 1.0, r);
  a = pow(a, 1.7);
  gl_FragColor = vec4(uColor, a * uOpacity);
}
`,Tg=(s,t,e)=>{const n=Math.min(1,Math.max(0,(e-s)/(t-s)));return n*n*(3-2*n)};function Eg(s){const t=new xn(1,1,gc,gc);t.rotateX(-Math.PI/2);const e=new de({vertexShader:wg,fragmentShader:Sg,uniforms:{uColor:{value:new gt(s.sandColor).multiplyScalar(.42)},uOpacity:{value:0}},transparent:!0,depthWrite:!1,depthTest:!0,side:ae}),n=new mt(t,e);n.name="contact-shadow",n.frustumCulled=!1,n.renderOrder=1;const i=t.getAttribute("position");let r=0;return{mesh:n,update:a=>{const o=Te(a.x,a.z),l=Math.max(0,a.y-o),c=4.6+l*.7,h=.44*(1-Tg(2,12,l));if(n.position.set(a.x,0,a.z),n.scale.set(c,1,c),e.uniforms.uOpacity.value=h,Math.abs(c-r)>.01||h>0){r=c;for(let u=0;u<i.count;u++){const f=a.x+i.getX(u)*c,m=a.z+i.getZ(u)*c;i.setY(u,Te(f,m)+.05)}i.needsUpdate=!0}},setTheme:a=>{const o=new gt(a.sandColor).multiplyScalar(.42);o.lerp(new gt(a.fogColor),.3),e.uniforms.uColor.value.copy(o)},dispose:()=>{t.dispose(),e.dispose()}}}const Cg=`
varying vec3 vView;
void main() {
  vView = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Ag=`
precision highp float;

uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;
uniform float uSeed;
uniform float uApexY;
uniform float uLength;
uniform float uHalfWidth;
uniform float uTilt;

varying vec3 vView;

void main() {
  // v goes 0 at the surface apex to 1 at the far end of the shaft.
  float v = clamp((uApexY - vView.y) / uLength, 0.0, 1.0);

  // Shear the beam axis with depth: the centreline is apexX + tan(tilt)*drop.
  // Doing it here rather than rotating the quad keeps the beam width uniform
  // along the shaft instead of fanning out.
  float drop = uApexY - vView.y;
  float centre = uTilt * drop;

  // Soft gaussian across the beam. exp(-ln2 * (d/hw)^2) gives a true FWHM of
  // 2*uHalfWidth, so beam width is expressed in real view units.
  float d = (vView.x - centre) / uHalfWidth;
  float core = exp(-0.6931 * d * d);

  // Bright just under the surface, then dissolving long before the seafloor.
  float along = smoothstep(0.0, 0.05, v) * (1.0 - smoothstep(0.30, 0.95, v));

  // Very gentle brightness breathing; no geometric sway, so the shafts stay
  // straight and only their intensity moves — which is what the reference
  // frames show.
  float pulse = 0.9 + 0.1 * sin(uTime * 0.31 + uSeed * 9.0);

  float a = core * along * uIntensity * pulse;
  if (a < 0.0025) discard;
  gl_FragColor = vec4(uColor * a, a);
}
`;function Pg(s){const o=new Vt;o.name="god-rays",o.renderOrder=-5;const l=new xn(1,1,1,1);l.translate(0,-.5,0);let c=20260815;const h=()=>(c=c*1664525+1013904223>>>0,c/4294967296),u=[],f=[],m=[];for(let p=0;p<15;p++){const d=p/14,_=(d-1)*26+(h()-.5)*(26*.4),x=h(),v=new de({vertexShader:Cg,fragmentShader:Ag,uniforms:{uColor:{value:new gt(s.shaftColor)},uIntensity:{value:s.shaftIntensity*(.35+.8*x)*(1.05-.5*Math.abs(d-.62))},uTime:{value:0},uSeed:{value:x},uApexY:{value:0},uLength:{value:1},uHalfWidth:{value:.1},uTilt:{value:0}},transparent:!0,blending:zn,depthWrite:!1,depthTest:!0,side:ae}),b=new mt(l,v);b.frustumCulled=!1,b.userData.tilt=_*Math.PI/180,b.userData.intensityK=(.35+.8*x)*(1.05-.5*Math.abs(d-.62)),b.userData.widthFactor=.012+.024*h(),b.userData.lengthFactor=.85+.95*x,b.userData.containerFactor=1.6+.9*x,m.push(b.userData.widthFactor),u.push(v),f.push(b),o.add(b)}return{group:o,layout:p=>{const d=Math.tan(p.fov*Math.PI/360)*34,_=d*p.aspect,x=.16*_,v=1.3*d,b=d*1.4;f.forEach((y,w)=>{const A=y.userData.containerFactor,M=y.userData.lengthFactor,T=b*M,R=y.userData.tilt,V=Math.abs(Math.tan(R))*T,K=m[w]*_,O=Math.max(_*.35,(V+K*4)*2)*A*.5;y.scale.set(O,T,1),y.position.set(x,v,-34);const F=u[w];F.uniforms.uApexY.value=v,F.uniforms.uLength.value=T,F.uniforms.uHalfWidth.value=K,F.uniforms.uTilt.value=Math.tan(R)})},update:p=>{for(const d of u)d.uniforms.uTime.value=p},setTheme:p=>{f.forEach((d,_)=>{const x=u[_];x.uniforms.uColor.value.setHex(p.shaftColor),x.uniforms.uIntensity.value=p.shaftIntensity*d.userData.intensityK})},dispose:()=>{l.dispose();for(const p of u)p.dispose()}}}const Lg=`
attribute float aSize;
attribute float aPhase;
attribute float aTier;

uniform float uTime;
uniform float uPixelRatio;

varying float vTier;
varying float vTwinkle;
varying float vFade;

void main() {
  vec3 p = position;

  // Slow settle + lateral sway. Marine snow sinks; it does not rise.
  float drift = mod(uTime * (0.05 + 0.09 * aTier) + aPhase * 12.0, 1.0);
  p.y -= drift * 26.0;
  p.x += sin(uTime * 0.19 + aPhase * 9.0) * 0.55;
  p.z += cos(uTime * 0.14 + aPhase * 7.0) * 0.35;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  vTier = aTier;
  // Gentle three-step twinkle.
  float t = fract(uTime * 0.31 + aPhase * 5.0);
  vTwinkle = 0.62 + 0.38 * smoothstep(0.0, 0.28, t) * (1.0 - smoothstep(0.72, 1.0, t));

  float size = mix(1.0, 2.2, aTier) * aSize;
  float perspective = 130.0 / max(0.1, -mv.z);
  gl_PointSize = clamp(size * uPixelRatio * perspective, 1.0, 5.0);

  // Fade motes out near the camera (no face-hugging blobs) and far away
  // (they dissolve into the fog instead of sparkling over the abyss).
  float d = max(0.1, -mv.z);
  vFade = smoothstep(2.0, 6.0, d) * (1.0 - smoothstep(46.0, 68.0, d));
}
`,Rg=`
precision highp float;

uniform vec3 uFineColor;
uniform vec3 uGlowColor;

varying float vTier;
varying float vTwinkle;
varying float vFade;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r2 = dot(c, c);
  if (r2 > 0.25) discard;

  // Soft round mote.
  float falloff = 1.0 - r2 * 4.0;
  falloff *= falloff;

  vec3 col = mix(uFineColor, uGlowColor, vTier);
  float a = falloff * vTwinkle * vFade * 0.6;
  if (a < 0.004) discard;
  gl_FragColor = vec4(col * a, a);
}
`,Dg=24,Ig=16,xc=-2,Fg=14;function Og(s,t){const e=new Float32Array(t*3),n=new Float32Array(t),i=new Float32Array(t),r=new Float32Array(t);for(let c=0;c<t;c++){e[c*3]=(Math.random()-.5)*Dg*2,e[c*3+1]=xc+Math.random()*(Fg-xc),e[c*3+2]=(Math.random()-.5)*Ig*2,n[c]=Math.random()*Math.PI*2;const h=Math.random()<.82?0:1;r[c]=h,i[c]=h===0?.5+Math.random()*.9:.9+Math.random()*1.3}const a=new Kt;a.setAttribute("position",new ne(e,3)),a.setAttribute("aPhase",new ne(n,1)),a.setAttribute("aSize",new ne(i,1)),a.setAttribute("aTier",new ne(r,1));const o=new de({vertexShader:Lg,fragmentShader:Rg,uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,1.5)},uFineColor:{value:new gt(s.planktonColor1)},uGlowColor:{value:new gt(s.planktonColor2)}},transparent:!0,depthWrite:!1,blending:zn}),l=new Ym(a,o);return l.name="marine-snow",l.frustumCulled=!1,{points:l,update:(c,h)=>{o.uniforms.uTime.value=c,o.uniforms.uPixelRatio.value=h},setTheme:c=>{o.uniforms.uFineColor.value.setHex(c.planktonColor1),o.uniforms.uGlowColor.value.setHex(c.planktonColor2)},dispose:()=>{a.dispose(),o.dispose()}}}const Co=24,Ao=.2,vc=11,zg=.45,Ng=.32;function _c(){if(Math.random()<zg){const e=(Math.random()-.5)*2*Co,n=(Math.random()-.5)*2*Co;return[e+(Math.random()-.5)*6,n+(Math.random()-.5)*6]}const s=Math.random()*Math.PI*2,t=Math.pow(Math.random(),1.3)*Co;return[Math.cos(s)*t,Math.sin(s)*t]}function kg(s,t){const e=new Vt;e.name="bubbles";const n=new _o(.62,1,20),i=new ss(.62,20),r=()=>new re({color:16777215,transparent:!0,opacity:1,side:ae,depthWrite:!1,blending:zn}),a=r(),o=r(),l=new zi(n,a,Math.max(1,t)),c=new zi(i,o,Math.max(1,t));l.name="bubble-rings",c.name="bubble-discs";for(const _ of[l,c])_.count=t,_.instanceMatrix.setUsage(Er),_.frustumCulled=!1,e.add(_);const h=[];for(let _=0;_<t;_++){const[x,v]=_c();h.push({baseX:x,baseZ:v,size:.035+Math.random()*.1,y:Ao+Math.random()*(vc-Ao),speed:.28+Math.random()*.55,phase:Math.random()*Math.PI*2,baseOpacity:s.bubbleOpacity*(.4+Math.random()*.6)})}const u=new gt(s.bubbleColor),f=new gt,m=new E,g=new E,p=new Qt;return{group:e,update:(_,x,v)=>{for(let b=0;b<t;b++){const y=h[b];if(y.y+=y.speed*x,y.y>vc){y.y=Ao;const A=_c();y.baseX=A[0],y.baseZ=A[1]}const w=.82+.18*Math.sin(_*2.2+y.phase*3);m.set(y.baseX+Math.sin(_*.9+y.phase)*.16,y.y,y.baseZ+Math.cos(_*.7+y.phase)*.16),p.compose(m,v.quaternion,g.setScalar(y.size)),l.setMatrixAt(b,p),c.setMatrixAt(b,p),f.copy(u).multiplyScalar(y.baseOpacity*w),l.setColorAt(b,f),f.copy(u).multiplyScalar(y.baseOpacity*Ng*w),c.setColorAt(b,f)}l.instanceMatrix.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),c.instanceColor&&(c.instanceColor.needsUpdate=!0)},setTheme:_=>{u.setHex(_.bubbleColor);for(const x of h)x.baseOpacity=_.bubbleOpacity*(.4+Math.random()*.6);l.instanceColor&&(l.instanceColor.needsUpdate=!0),c.instanceColor&&(c.instanceColor.needsUpdate=!0)},dispose:()=>{n.dispose(),i.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}}const cn=new be,Ug=76;function Bg(){const s=new ir;return s.moveTo(.9,0),s.quadraticCurveTo(.45,.3,-.2,.22),s.lineTo(-.38,.55),s.lineTo(-.6,.55),s.lineTo(-.3,.06),s.lineTo(-.6,-.55),s.lineTo(-.38,-.55),s.lineTo(-.2,-.22),s.quadraticCurveTo(.45,-.3,.9,0),s.closePath(),new yo(s,10)}function Gg(s,t){const e=new Vt;e.name="fish";const n=new gt,i=[],r=Bg(),a=[{cx:0,cz:10,a:24,b:17,y:3.4,count:20,speed:.16,scale:[.4,.7]},{cx:-12,cz:-8,a:19,b:14,y:4.2,count:17,speed:.13,scale:[.38,.65]},{cx:14,cz:-14,a:17,b:12,y:5,count:15,speed:.18,scale:[.35,.6]},{cx:0,cz:0,a:7.5,b:5,y:3,count:13,speed:.3,scale:[.25,.45]},{cx:6,cz:4,a:6,b:4.2,y:3.6,count:11,speed:.34,scale:[.22,.4]}],o=l=>{for(const h of i)h.mesh.material.dispose(),e.remove(h.mesh);i.length=0;const c=t/Ug;for(const h of a){const u=[],f=Math.max(4,Math.ceil(h.count*c)),m=new re({side:ae}),g=new zi(r,m,f);g.instanceMatrix.setUsage(Er),g.frustumCulled=!1;for(let p=0;p<f;p++){const d=Math.random()*Math.PI*2,_=Math.sqrt(Math.random())*2.4;u.push({dx:Math.cos(d)*_,dz:Math.sin(d)*_,dy:(Math.random()-.5)*.9,scale:h.scale[0]+Math.random()*(h.scale[1]-h.scale[0]),phase:Math.random()*Math.PI*2,wiggleAmp:.15+Math.random()*.28}),n.setHex(l.fishHues[p%l.fishHues.length]),n.offsetHSL(0,0,(Math.random()-.5)*.07),g.setColorAt(p,n),cn.position.set(0,-60,0),cn.scale.setScalar(.001),cn.updateMatrix(),g.setMatrixAt(p,cn.matrix)}g.instanceColor&&(g.instanceColor.needsUpdate=!0),g.instanceMatrix.needsUpdate=!0,e.add(g),i.push({mesh:g,cx:h.cx,cz:h.cz,orbitA:h.a,orbitB:h.b,speed:h.speed,phase:Math.random()*Math.PI*2,y:h.y,fishes:u})}};return o(s),{group:e,update:l=>{for(const c of i){const h=c.cx+Math.cos(l*.05+c.phase)*1.6,u=c.cz+Math.sin(l*.043+c.phase)*1.2,f=c.orbitA,m=c.orbitB;for(let g=0;g<c.fishes.length;g++){const p=c.fishes[g],d=l*c.speed+p.phase,_=h+Math.cos(d)*f,x=u+Math.sin(d)*m,v=Math.sin(l*.7+p.phase*2)*p.wiggleAmp,b=Math.sin(l*.9+p.phase)*.14;cn.position.set(_+p.dx+v,c.y+p.dy+b,x+p.dz),cn.scale.setScalar(p.scale),cn.rotation.y=Math.atan2(-Math.cos(d)*m*c.speed,-Math.sin(d)*f*c.speed)+Math.sin(l*.8+p.phase)*.12,cn.rotation.z=Math.sin(l*1.4+p.phase*3)*.1,cn.updateMatrix(),c.mesh.setMatrixAt(g,cn.matrix)}c.mesh.instanceMatrix.needsUpdate=!0}},setTheme:l=>{o(l)},dispose:()=>{for(const l of i)l.mesh.material.dispose();r.dispose()}}}const Hg={low:{maxPixelRatio:1,bloom:!1,colorGrade:!0,captureMaxWidth:1280,captureMaxHeight:1600,plankton:.35,fish:.45,bubble:.4,kelp:.35,coral:.45,starfish:.4,rock:.5,prop:.45,skyline:.4,idleFrameIntervalMs:1e3},medium:{maxPixelRatio:1.5,bloom:!0,colorGrade:!0,captureMaxWidth:1600,captureMaxHeight:1600,plankton:.7,fish:.75,bubble:.75,kelp:.7,coral:.8,starfish:.7,rock:.8,prop:.75,skyline:.7,idleFrameIntervalMs:500},high:{maxPixelRatio:1.5,bloom:!0,colorGrade:!0,captureMaxWidth:1920,captureMaxHeight:1600,plankton:1,fish:1,bubble:1,kelp:1,coral:1,starfish:1,rock:1,prop:1,skyline:1,idleFrameIntervalMs:250}};function Po(s,t,e=0){return Math.max(e,Math.round(s*t))}function Vg(){var s,t;try{const e=document.createElement("canvas"),n=(s=e.getContext("webgl2"))!=null?s:e.getContext("webgl");if(!n)return"";const i=n.getExtension("WEBGL_debug_renderer_info"),r=i?n.getParameter(i.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER);return(t=n.getExtension("WEBGL_lose_context"))==null||t.loseContext(),typeof r=="string"?r.toLowerCase():""}catch{return""}}function Wg(){var r,a,o;if(typeof window=="undefined")return"high";const s=(a=(r=window.matchMedia)==null?void 0:r.call(window,"(pointer: coarse)").matches)!=null?a:!1,t=navigator,e=t.hardwareConcurrency||4,n=(o=t.deviceMemory)!=null?o:4,i=Vg();return/swiftshader|llvmpipe|software|basic render/.test(i)||/mali-4|mali-t[0-6]|adreno \(tm\) [1-4]\d\d|powervr sgx/.test(i)?"low":s?e>=6&&n>=4?"medium":"low":e<=2||n<=2?"low":e>=8&&n>=8?"high":"medium"}function Xg(){if(typeof window=="undefined")return null;try{const s=new URLSearchParams(window.location.search).get("quality");if(s==="low"||s==="medium"||s==="high")return s}catch{}return null}let hr=null;function yc(){var t;if(hr)return hr;const s=(t=Xg())!=null?t:Wg();return hr={tier:s,...Hg[s]},hr}function bc(){var s,t;return typeof window=="undefined"?!1:((t=(s=window.matchMedia)==null?void 0:s.call(window,"(pointer: coarse)").matches)!=null?t:!1)||"ontouchstart"in window}const us=8,Yg=`
varying vec2 vUv;
void main() {
  vUv = uv;
  // Full-screen triangle: positions already in clip space.
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`,qg=`
precision highp float;

uniform vec3 uStops[${us}];
uniform float uTimes[${us}];
uniform vec3 uSunColor;
uniform float uSunGlow;

varying vec2 vUv;

void main() {
  // UV convention: v=1 is the TOP of the quad, so the surface end (t=0) is
  // t = 1 - vUv.y. Straight 1:1 mapping of the measured stops.
  float t = clamp(1.0 - vUv.y, 0.0, 1.0);

  // Find the containing segment and interpolate within it exactly once; the
  // final matching segment must win, so every match also overwrites.
  vec3 col = uStops[${us-1}];
  for (int i = 0; i < ${us-1}; i++) {
    float t0 = uTimes[i];
    float t1 = uTimes[i + 1];
    if (t >= t0 && t <= t1) {
      float f = clamp((t - t0) / max(t1 - t0, 1e-5), 0.0, 1.0);
      col = mix(uStops[i], uStops[i + 1], f);
    }
  }
  if (t < uTimes[0]) col = uStops[0];

  // Surface glint where the god rays converge, baked into the column so
  // photos carry it too.
  vec2 d = vUv - vec2(0.5, 1.0);
  col += uSunColor * exp(-dot(d, d) * 7.0) * uSunGlow;

  // A gentle vignette baked into the backdrop (the reference frame's corners
  // sit visibly darker).
  vec2 vd = vUv - vec2(0.5, 0.54);
  col *= 1.0 - 0.18 * smoothstep(0.6, 1.2, length(vd));

  gl_FragColor = vec4(col, 1.0);
}
`;function jg(s,t,e){let n=To(t);const i=new Vt;i.name="open-sea",s.add(i);const r=new Kt;r.setAttribute("position",new ne(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),r.setAttribute("uv",new ne(new Float32Array([0,0,2,0,0,2]),2));const a=new de({vertexShader:Yg,fragmentShader:qg,uniforms:{uStops:{value:n.column.map(([,x])=>new gt(x))},uTimes:{value:n.column.map(([x])=>x)},uSunColor:{value:new gt(n.sunColor)},uSunGlow:{value:n.sunGlow}},depthTest:!1,depthWrite:!1}),o=new mt(r,a);o.name="water-column",o.frustumCulled=!1,o.renderOrder=-100,s.add(o);const l=Pg(n);l.group.renderOrder=-5;let c=!1,h=_g(n,e);i.add(h.group);const u=Mg(n);i.add(u.mesh);const f=Eg(n);i.add(f.mesh);let m=Gg(n,Po(sc(n.id).fish,e.fish,6));i.add(m.group);let g=Og(n,Po(sc(n.id).plankton,e.plankton,120));i.add(g.points);let p=kg(n,Po(60,e.bubble,10));i.add(p.group);const d=x=>{n=x,s.background=new gt(x.background);const v=a.uniforms.uStops.value,b=a.uniforms.uTimes.value;x.column.forEach(([y,w],A)=>{A<us&&(v[A].setHex(w),b[A]=y)}),a.uniforms.uSunColor.value.setHex(x.sunColor),a.uniforms.uSunGlow.value=x.sunGlow,l.setTheme(x),h.setTheme(x),u.setTheme(x),u.setFog(x.fogColor,x.fogDensity),f.setTheme(x),g.setTheme(x),p.setTheme(x),m.setTheme(x)};return s.fog=new Xs(n.fogColor,n.fogDensity),d(n),{update:(x,v,b,y)=>{c||(c=!0,s.add(b),b.add(l.group)),l.layout(b),l.update(x),u.update(x,b),f.update(y),g.update(x,Math.min(window.devicePixelRatio,e.maxPixelRatio)),h.update(x),p.update(x,v,b),m.update(x)},setTheme:x=>{const v=To(x);s.fog=new Xs(v.fogColor,v.fogDensity),d(v)},getTheme:()=>n,dispose:()=>{h.dispose(),u.dispose(),f.dispose(),l.dispose(),g.dispose(),p.dispose(),m.dispose(),r.dispose(),a.dispose(),s.remove(o),s.remove(i)}}}const ur={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class ds{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Zg=new to(-1,1,1,-1,0,1),Lo=new Kt;Lo.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),Lo.setAttribute("uv",new Nt([0,2,0,0,2,0],2));class Mc{constructor(t){this._mesh=new mt(Lo,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Zg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ro extends ds{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof de?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Us.clone(t.uniforms),this.material=new de({defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Mc(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class wc extends ds{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class $g extends ds{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Jg{constructor(t,e){if(this.renderer=t,e===void 0){const n=t.getSize(new rt);this._pixelRatio=t.getPixelRatio(),this._width=n.width,this._height=n.height,e=new tn(this._width*this._pixelRatio,this._height*this._pixelRatio),e.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],ur===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),Ro===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new Ro(ur),this.clock=new Vl}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}wc!==void 0&&(a instanceof wc?n=!0:a instanceof $g&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}new to(-1,1,1,-1,0,1);const Sc=new Kt;Sc.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),Sc.setAttribute("uv",new Nt([0,2,0,0,2,0],2));class Kg extends ds{constructor(t,e,n,i,r){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r!==void 0?r:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new gt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(t.getClearColor(this._oldClearColor),r=t.getClearAlpha(),t.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor&&t.setClearColor(this._oldClearColor,r),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),t.autoClear=i}}const Tc={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new gt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ui extends ds{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new rt(t.x,t.y):new rt(256,256),this.clearColor=new gt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new tn(r,a),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new tn(r,a);f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const m=new tn(r,a);m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}Tc===void 0&&console.error("THREE.UnrealBloomPass relies on LuminosityHighPassShader");const o=Tc;this.highPassUniforms=Us.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new de({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.texSize.value=new rt(r,a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,ur===void 0&&console.error("THREE.UnrealBloomPass relies on CopyShader");const h=ur;this.copyUniforms=Us.clone(h.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new de({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:zn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new gt,this.oldClearAlpha=1,this.basic=new re,this.fsQuad=new Mc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.texSize.value=new rt(n,i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ui.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ui.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){return new de({defines:{KERNEL_RADIUS:t,SIGMA:t},uniforms:{colorTexture:{value:null},texSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new de({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ui.BlurDirectionX=new rt(1,0),Ui.BlurDirectionY=new rt(0,1);const Qg={uniforms:{tDiffuse:{value:null},uBrightness:{value:1.02},uContrast:{value:1.05},uSaturation:{value:1.22},uVignette:{value:.14},uTint:{value:new gt(2767466)},uTintAmount:{value:.04}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uBrightness;
    uniform float uContrast;
    uniform float uSaturation;
    uniform float uVignette;
    uniform vec3 uTint;
    uniform float uTintAmount;
    varying vec2 vUv;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec3 c = texel.rgb * uBrightness;
      c = (c - 0.5) * uContrast + 0.5;

      float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(luma), c, uSaturation);
      c = mix(c, uTint, uTintAmount);

      // Gentle AbyssRium vignette: darken the far corners slightly.
      vec2 d = vUv - 0.5;
      float vig = smoothstep(0.92, 0.42, length(d));
      c *= 1.0 - uVignette * (1.0 - vig);

      gl_FragColor = vec4(c, texel.a);
    }
  `};function tx(s,t,e,n,i){const r=document.createElement("canvas");r.width=t,r.height=e;const a=r.getContext("2d"),o=a.createImageData(t,e);o.data.set(s),a.putImageData(o,0,0);const l=document.createElement("canvas");l.width=n,l.height=i;const c=l.getContext("2d");return c.translate(0,i),c.scale(1,-1),c.drawImage(r,0,0,n,i),l}function ex(s,t,e,n){const i=new Jg(s);let r=Math.min(window.devicePixelRatio||1,n.maxPixelRatio);i.setPixelRatio(r);const a=s.getSize(new rt);i.setSize(a.x,a.y),i.addPass(new Kg(t,e));let o;n.bloom&&(o=new Ui(new rt(a.x*r,a.y*r),0,.6,.9),i.addPass(o));let l;return n.colorGrade&&(l=new Ro(Qg),i.addPass(l)),{composer:i,bloom:o,grade:l,render:()=>i.render(),setSize:(c,h)=>{i.setSize(c,h),o==null||o.setSize(c*r,h*r)},setPixelRatio:c=>{r=c,i.setPixelRatio(c);const h=s.getSize(new rt);i.setSize(h.x,h.y),o==null||o.setSize(h.x*c,h.y*c)},setStrength:c=>{o&&(o.strength=c)},capture:(c,h)=>{const u=i.readBuffer,f=u.width,m=u.height,g=Math.min(1,n.captureMaxWidth/f,n.captureMaxHeight/m),p=Math.max(1,Math.round(f*g)),d=Math.max(1,Math.round(m*g)),_=s.getRenderTarget();i.renderToScreen=!1,i.render();const x=new Uint8Array(f*m*4);return s.readRenderTargetPixels(u,0,0,f,m,x),i.renderToScreen=!0,s.setRenderTarget(_),tx(x,f,m,p,d)},dispose:()=>{i.dispose()}}}function Zt(s,t=!1,e=1){return new re({color:s,transparent:t,opacity:e,side:ae})}function nx(){const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.55,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new Ll(s);return n.wrapS=n.wrapT=je,n}const ix=nx();function Ec(s,t,e=.85){const n=new bl({map:ix,color:s,transparent:!0,opacity:e,blending:zn,depthWrite:!1}),i=new Hm(n);return i.scale.set(t,t,1),i}function sx(s,t,e,n,i=7){return new mt(new le(e,t,s,i),Zt(n))}function Kn(s){const t=new mt(new ce(s,12,8),Zt(3949696));return t.scale.set(1,.32,1),t.position.y=s*.06,t}const rx=15755922,ox=16756936,ax=4231532,lx=5420936,cx=9067068,hx=7226409,Bi=15909198,Cc=11561680,ux=15778047,Do=[{id:"rock-small",name:"小岩石",radius:.7,makeMesh:()=>{const s=new Vt;s.add(Kn(.62));const t=new mt(new Rn(.5,0),Zt(10135744));t.position.set(0,.3,0),t.rotation.set(.4,.2,0),t.scale.y=.82;const e=new mt(new Rn(.32,0),Zt(9083060));e.position.set(.46,.16,.2),e.rotation.set(.1,.9,.15);const n=new mt(new Rn(.2,0),Zt(11188432));n.position.set(-.4,.1,-.18),n.rotation.set(.7,.3,.45);const i=new mt(new Rn(.12,0),Zt(8293544));i.position.set(.18,.06,.5);const r=new mt(new Rn(.09,0),Zt(8293544));r.position.set(-.14,.05,.38);const a=new mt(new ce(.26,10,6),Zt(7653021));return a.scale.set(1,.4,1),a.position.set(0,.42,0),s.add(t,e,n,i,r,a),s}},{id:"coral",name:"珊瑚",radius:.8,makeMesh:()=>{const s=new Vt;s.add(Kn(.55));const t=new mt(new le(.2,.34,.28,9),Zt(12867710));t.position.y=.32,s.add(t);const e=new E(0,1,0),n=(r,a,o,l,c)=>{const h=new mt(new le(l*.62,l,o,7),Zt(rx));h.position.copy(r).addScaledVector(a,o/2),h.quaternion.setFromUnitVectors(e,a),s.add(h);const u=r.clone().addScaledVector(a,o);if(c<=0){const g=new mt(new ce(l*.95,8,8),Zt(ox));g.position.copy(u),s.add(g);return}let f=new E().crossVectors(a,e);f.lengthSq()<1e-6&&f.set(1,0,0),f.normalize();const m=c>=3?2:Math.random()<.4?3:2;for(let g=0;g<m;g++){const p=(g/Math.max(1,m-1)-.5)*1.5,d=a.clone().applyAxisAngle(f,p).applyAxisAngle(a,Math.random()*Math.PI*2);d.lerp(e,.18).normalize(),n(u,d,o*.72,l*.62,c-1)}},i=3+Math.floor(Math.random()*2);for(let r=0;r<i;r++){const a=r/i*Math.PI*2+Math.random()*.6,o=new E(Math.cos(a)*.32,1,Math.sin(a)*.32).normalize();n(new E(Math.cos(a)*.08,.42,Math.sin(a)*.08),o,.46,.085,4)}return s}},{id:"kelp",name:"海草",radius:.6,makeMesh:()=>{const s=new Vt;s.add(Kn(.42));const t=7;for(let e=0;e<t;e++){const n=e/t*Math.PI*2,r=e<3?1.5+e%2*.5:.7+e%3*.22,a=new xn(.16,r,1,10),o=a.attributes.position.array;for(let c=0;c<o.length;c+=3){const h=(o[c+1]+r/2)/r;o[c]*=.3+.7*Math.sin(h*Math.PI),o[c]+=Math.sin(h*2.4+e)*.035}a.computeVertexNormals();const l=new mt(a,Zt(e%2===0?ax:lx));l.position.set(Math.cos(n)*.14,r/2+.05,Math.sin(n)*.14),l.rotation.y=n,l.rotation.z=(Math.random()-.5)*.24,s.add(l)}return s}},{id:"treasure",name:"宝箱",radius:.7,makeMesh:()=>{const s=new Vt;s.add(Kn(.52));const t=new mt(new xe(.7,.42,.5),Zt(cx));t.position.y=.29,s.add(t);const e=new mt(new le(.26,.26,.5,12,1,!1,0,Math.PI),Zt(hx));e.rotation.z=Math.PI/2,e.position.y=.5,s.add(e);const n=new mt(new xe(.74,.06,.54),Zt(Bi));n.position.y=.24;const i=new mt(new xe(.74,.05,.54),Zt(Bi));i.position.y=.47;const r=new mt(new xe(.09,.44,.56),Zt(Bi));r.position.set(.18,.29,0);const a=new mt(new xe(.12,.14,.06),Zt(16769162));a.position.set(0,.4,.27),s.add(n,i,r,a);const o=[[.16,.2,0,.1],[-.2,.14,.4,.07],[.02,-.22,.9,.08]];for(const[c,h,u,f]of o){const m=new mt(new le(f,f,.04,12),Zt(Bi));m.rotation.x=Math.PI/2,m.rotation.y=u,m.position.set(c,.09,h),s.add(m)}const l=Ec(Bi,1.3,.4);return l.position.y=.62,s.add(l),s}},{id:"anemone",name:"海葵",radius:.6,makeMesh:()=>{const s=new Vt;s.add(Kn(.48));const t=new mt(new ce(.3,12,10),Zt(Cc));t.scale.set(1,.72,1),t.position.y=.26,s.add(t);const e=new mt(new le(.3,.26,.1,12),Zt(10115264));e.position.y=.42,s.add(e);const n=16;for(let i=0;i<n;i++){const r=i/n*Math.PI*2,a=.16+i%3*.05,o=.42+i%4*.09,l=.35+i%3*.12,c=new E(Math.cos(r)*Math.sin(l),Math.cos(l),Math.sin(r)*Math.sin(l)),h=new E(Math.cos(r)*a,.44,Math.sin(r)*a),u=h.clone().addScaledVector(c,o),f=sx(o,.045,.02,Cc,6);f.position.copy(h).add(u).multiplyScalar(.5),f.quaternion.setFromUnitVectors(new E(0,1,0),c);const m=new mt(new ce(.042,8,8),Zt(ux));m.position.copy(u),s.add(f,m)}return s}},{id:"lamp",name:"小灯",radius:.5,makeMesh:()=>{const s=new Vt;s.add(Kn(.4));const t=new mt(new le(.16,.24,.14,10),Zt(5923982));t.position.y=.12,s.add(t);const e=new mt(new le(.035,.05,.8,8),Zt(5397638));e.position.y=.56,s.add(e);const n=new mt(new le(.08,.1,.07,10),Zt(Bi));n.position.y=.97,s.add(n);const i=new mt(new ce(.15,14,14),Zt(16774352,!0,.82));i.position.y=1.12,s.add(i);const r=new mt(new ce(.06,10,10),Zt(16777215));r.position.y=1.1,s.add(r);const a=Ec(16771488,1.7,.65);return a.position.y=1.12,s.add(a),s}},{id:"shell",name:"贝壳",radius:.45,makeMesh:()=>{const s=new Vt;s.add(Kn(.34));const t=new mt(new ce(.09,10,8),Zt(15255728));t.position.set(0,.1,.12),s.add(t);const e=8;for(let i=0;i<e;i++){const r=(i/(e-1)-.5)*Math.PI*.8,a=new mt(new tr(.09,.42,6),Zt(15980992));a.position.set(Math.sin(r)*.16,.16+Math.cos(r)*.14,0),a.rotation.z=-r,s.add(a);const o=new mt(new ce(.03,6,6),Zt(16771284));o.position.set(Math.sin(r)*.3,.2+Math.cos(r)*.28,.02),s.add(o)}const n=new mt(new ce(.07,12,12),Zt(16774890));return n.position.set(.22,.07,.16),s.add(n),s}}];function Io(s){const t=Do.find(e=>e.id===s);if(!t){const e=new Vt;return e.add(new mt(new xe(.5,.5,.5),Zt(16711935))),e}return t.makeMesh()}function Fo(s){return Do.find(t=>t.id===s)}const Ac="orca-aquarium-shell:save:v1",Oo=.45,Pc=5,dx=["classic","night","pink","green","gold"];function Lc(){return{version:Pc,feedCount:0,growthFeeds:0,lastFeedAt:0,decor:[],bloomStrength:Oo,skin:"classic",music:!1,companion:!1,companionPets:0,companionSeal:!1,companionSealPets:0,outlines:!1}}function fx(){try{const s=localStorage.getItem(Ac);if(!s)return Lc();const t=JSON.parse(s),e=typeof t.version=="number"?t.version:1,n=typeof t.bloomStrength=="number"&&Number.isFinite(t.bloomStrength)?Math.min(1.5,Math.max(0,t.bloomStrength)):Oo,i=typeof t.feedCount=="number"?t.feedCount:typeof t.petCount=="number"?t.petCount:0,r=typeof t.growthFeeds=="number"?Math.min(i,Math.max(0,t.growthFeeds)):i;return{version:Pc,feedCount:i,growthFeeds:r,lastFeedAt:typeof t.lastFeedAt=="number"?t.lastFeedAt:typeof t.lastPetAt=="number"?t.lastPetAt:0,decor:Array.isArray(t.decor)?t.decor.filter(a=>a&&typeof a.kindId=="string"):[],bloomStrength:e<2&&n===0?Oo:n,skin:typeof t.skin=="string"&&dx.includes(t.skin)?t.skin:"classic",music:t.music===!0,companion:t.companion===!0,companionPets:typeof t.companionPets=="number"?t.companionPets:0,companionSeal:t.companionSeal===!0,companionSealPets:typeof t.companionSealPets=="number"?t.companionSealPets:0,outlines:t.outlines===!0}}catch{return Lc()}}function Ue(s){try{localStorage.setItem(Ac,JSON.stringify(s))}catch{}}const px=[[523.25,.4],[587.33,.4],[659.25,.4],[523.25,.4],[659.25,.4],[698.46,.8],[659.25,.4],[587.33,.4],[523.25,.8],[392,.4],[440,.4],[523.25,.8],[587.33,.4],[659.25,.4],[523.25,.8],[440,.4],[392,.4],[349.23,1.2]],mx=.9;function gx(){let s=null,t=null,e=!1,n=null;const i=()=>{var d;try{if(!s){const _=(d=window.AudioContext)!=null?d:window.webkitAudioContext;if(!_)return null;s=new _,t=s.createGain(),t.gain.value=.55,t.connect(s.destination)}return s.state==="suspended"&&s.resume(),s}catch{return null}},r=(d,_)=>{var y,w;const x=d.currentTime+((y=_.at)!=null?y:0),v=d.createOscillator(),b=d.createGain();v.type=_.type,v.frequency.setValueAtTime(_.from,x),_.to!==void 0&&v.frequency.exponentialRampToValueAtTime(Math.max(1,_.to),x+_.duration*.85),b.gain.setValueAtTime(_.peak,x),b.gain.exponentialRampToValueAtTime(1e-4,x+_.duration),v.connect(b),b.connect((w=_.destination)!=null?w:d.destination),v.start(x),v.stop(x+_.duration+.02)},a=()=>{const d=i();if(!d)return;const _=.45,x=d.createOscillator(),v=d.createGain();x.type="sine",x.frequency.setValueAtTime(2400+Math.random()*700,d.currentTime),x.frequency.exponentialRampToValueAtTime(1250+Math.random()*350,d.currentTime+_*.7),x.frequency.exponentialRampToValueAtTime(950,d.currentTime+_),v.gain.setValueAtTime(.16,d.currentTime),v.gain.exponentialRampToValueAtTime(1e-4,d.currentTime+_),x.connect(v),v.connect(d.destination),x.start(d.currentTime),x.stop(d.currentTime+_+.05)},o=()=>{const d=i();if(!d)return;const _=3+Math.floor(Math.random()*3);for(let x=0;x<_;x++)r(d,{type:"sine",from:2600+Math.random()*1600,duration:.05,peak:.13,at:x*.06})},l=()=>{const d=i();d&&r(d,{type:"sine",from:620,to:240,duration:.35,peak:.09})},c=()=>{const d=i();d&&r(d,{type:"sine",from:1318.5,to:1760,duration:.4,peak:.07})},h=()=>{const d=i();d&&(r(d,{type:"square",from:1900,duration:.03,peak:.07}),r(d,{type:"square",from:950,duration:.05,peak:.06,at:.06}))},u=()=>{const d=i();if(d)for(let _=0;_<3;_++)r(d,{type:"square",from:150+Math.random()*90,duration:.06,peak:.1,at:_*.1})},f=()=>{const d=i();d&&(r(d,{type:"triangle",from:1568,duration:.16,peak:.06}),r(d,{type:"sine",from:2349,duration:.22,peak:.04,at:.02}))},m=d=>{let _=0;for(const[x,v]of px)r(d,{type:"triangle",from:x,duration:v*.9,peak:.12,at:_,destination:t!=null?t:d.destination}),_+=v;return _},g=()=>{e=!1,n!==null&&(window.clearTimeout(n),n=null)},p=()=>{if(!i()||e)return;e=!0;const _=()=>{if(!e||!s)return;const x=m(s);n=window.setTimeout(_,(x+mx)*1e3)};_()};return{unlock:i,playWhistle:a,playClicks:o,playBubble:l,playChime:c,playShutter:h,playMunch:u,playCoin:f,setMusicEnabled:d=>{d?p():g()},isMusicEnabled:()=>e,dispose:()=>{g(),s&&s.close().catch(()=>{}),s=null,t=null}}}const xx="clawd-companion",vx=.97,dr=14448473,_x=4473924,yx=1318958,bx=.035;function Mx(s=.9){const t=new Vt;t.name=xx;const e=new re({color:16777215,vertexColors:!0}),n=new re({color:16777215,vertexColors:!0}),i=[],r=[],a=(m,g,p,d,_=!0)=>{Ql(g,{baseColor:d,strength:.38,steps:3});const x=new mt(g,p);if(m.add(x),_){const v=So(g,bx,yx);v.visible=!1,x.add(v),r.push(v),i.push(v.material)}return x};a(t,new xe(1.4,1,1.2),e,dr);for(const m of[-.85,.85])a(t,new xe(.3,.3,1.2),e,dr).position.set(m,0,0);const o=new Vt;o.position.set(0,-.5,.45);const l=new Vt;l.position.set(0,-.5,-.45);for(const m of[o,l]){for(const g of[-.5,.5])a(m,new xe(.15,.3,.2),e,dr).position.set(g,-.15,0);t.add(m)}for(const m of[-.4,.4])a(t,new xe(.06,.18,.05),n,_x).position.set(m,.1,.6);const c=new mt(new ss(.62,20),new re({color:4120,transparent:!0,opacity:.18,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.y=-.66,t.add(c),t.scale.setScalar(s/vx),t.position.y=0;let h=0;const u=new gt(dr);return{group:t,update:(m,g,p)=>{t.position.copy(p.position),t.rotation.y=p.yaw,h>0&&(h=Math.max(0,h-g));const d=1+h*2.2;t.rotation.z=Math.sin(m*2.4)*.06*d,t.rotation.x=Math.sin(m*1.7+.6)*.05*d;const _=m*6*d;o.rotation.x=Math.sin(_)*.5,l.rotation.x=Math.sin(_+1.1)*.5;const x=Math.sin(m*2.4+.4)*.04*d;t.position.y+=x},react:()=>{h=1},setColor:m=>{u.setHex(m),t.traverse(g=>{const p=g;!p.isMesh||p.userData.isOutline||Ql(p.geometry,{baseColor:m,strength:.38,steps:3})})},setOutlines:m=>{for(const g of r)g.visible=m},dispose:()=>{t.traverse(m=>{const g=m;g.isMesh&&g.geometry.dispose()}),e.dispose(),n.dispose();for(const m of i)m.dispose();c.material.dispose(),t.clear()}}}class wx extends Kt{constructor(t,e,n,i){super();const r=[],a=[],o=[],l=new E,c=new Qt;c.makeRotationFromEuler(n),c.setPosition(e);const h=new Qt;h.copy(c).invert(),u(),this.setAttribute("position",new Nt(r,3)),this.setAttribute("normal",new Nt(a,3)),this.setAttribute("uv",new Nt(o,2));function u(){let p=[];const d=new E,_=new E,x=t.geometry,v=x.attributes.position,b=x.attributes.normal;if(x.index!==null){const y=x.index;for(let w=0;w<y.count;w++)d.fromBufferAttribute(v,y.getX(w)),_.fromBufferAttribute(b,y.getX(w)),f(p,d,_)}else for(let y=0;y<v.count;y++)d.fromBufferAttribute(v,y),_.fromBufferAttribute(b,y),f(p,d,_);p=m(p,l.set(1,0,0)),p=m(p,l.set(-1,0,0)),p=m(p,l.set(0,1,0)),p=m(p,l.set(0,-1,0)),p=m(p,l.set(0,0,1)),p=m(p,l.set(0,0,-1));for(let y=0;y<p.length;y++){const w=p[y];o.push(.5+w.position.x/i.x,.5+w.position.y/i.y),w.position.applyMatrix4(c),r.push(w.position.x,w.position.y,w.position.z),a.push(w.normal.x,w.normal.y,w.normal.z)}}function f(p,d,_){d.applyMatrix4(t.matrixWorld),d.applyMatrix4(h),_.transformDirection(t.matrixWorld),p.push(new Rc(d.clone(),_.clone()))}function m(p,d){const _=[],x=.5*Math.abs(i.dot(d));for(let v=0;v<p.length;v+=3){let b=0,y,w,A,M;const T=p[v+0].position.dot(d)-x,R=p[v+1].position.dot(d)-x,V=p[v+2].position.dot(d)-x,K=T>0,H=R>0,O=V>0;switch(b=(K?1:0)+(H?1:0)+(O?1:0),b){case 0:{_.push(p[v]),_.push(p[v+1]),_.push(p[v+2]);break}case 1:{if(K&&(y=p[v+1],w=p[v+2],A=g(p[v],y,d,x),M=g(p[v],w,d,x)),H){y=p[v],w=p[v+2],A=g(p[v+1],y,d,x),M=g(p[v+1],w,d,x),_.push(A),_.push(w.clone()),_.push(y.clone()),_.push(w.clone()),_.push(A.clone()),_.push(M);break}O&&(y=p[v],w=p[v+1],A=g(p[v+2],y,d,x),M=g(p[v+2],w,d,x)),_.push(y.clone()),_.push(w.clone()),_.push(A),_.push(M),_.push(A.clone()),_.push(w.clone());break}case 2:{K||(y=p[v].clone(),w=g(y,p[v+1],d,x),A=g(y,p[v+2],d,x),_.push(y),_.push(w),_.push(A)),H||(y=p[v+1].clone(),w=g(y,p[v+2],d,x),A=g(y,p[v],d,x),_.push(y),_.push(w),_.push(A)),O||(y=p[v+2].clone(),w=g(y,p[v],d,x),A=g(y,p[v+1],d,x),_.push(y),_.push(w),_.push(A));break}}}return _}function g(p,d,_,x){const v=p.position.dot(_)-x,b=d.position.dot(_)-x,y=v/(v-b);return new Rc(new E(p.position.x+y*(d.position.x-p.position.x),p.position.y+y*(d.position.y-p.position.y),p.position.z+y*(d.position.z-p.position.z)),new E(p.normal.x+y*(d.normal.x-p.normal.x),p.normal.y+y*(d.normal.y-p.normal.y),p.normal.z+y*(d.normal.z-p.normal.z)))}}}class Rc{constructor(t,e){this.position=t,this.normal=e}clone(){return new this.constructor(this.position.clone(),this.normal.clone())}}const Sx="gpt-seal-companion",Tx=1.95,fr=9221332,Dc=15266040,Ex=3811882,Cx=1118498,Ic=16755404,Fc=14540253,Ax="#666666",Px=1318958,zo=.05,Oc=.025,_n=new E(1,.85,1.3),Lx=[{theta:35,phi:270,size:.55},{theta:55,phi:210,size:.3},{theta:55,phi:330,size:.42},{theta:75,phi:180,size:.25},{theta:75,phi:0,size:.5},{theta:85,phi:240,size:.35},{theta:85,phi:300,size:.22}],Rx="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";function zc(s,t){const e=s.getAttribute("position"),n=new gt(t),i=new Float32Array(e.count*3);for(let r=0;r<e.count;r++)i[r*3]=n.r,i[r*3+1]=n.g,i[r*3+2]=n.b;s.setAttribute("color",new ne(i,3))}function Dx(s,t){const e=Ta.degToRad(s),n=Ta.degToRad(t);return new E(Math.sin(e)*Math.cos(n),Math.cos(e),Math.sin(e)*Math.sin(n))}function Ix(s){const t=s.clone().normalize(),e=new E(0,1,0);Math.abs(t.dot(e))>.99&&e.set(0,0,-1);const n=new E().crossVectors(e,t).normalize(),i=new E().crossVectors(t,n).normalize(),r=new Qt().makeBasis(n,i,t);return new vi().setFromQuaternion(new Mn().setFromRotationMatrix(r))}function Fx(){const t=document.createElement("canvas");t.width=1024,t.height=1024;const e=t.getContext("2d");e.scale(1024/24,1024/24),e.fillStyle=Ax,e.fill(new Path2D(Rx));const n=new Ll(t);return n.anisotropy=4,n}function Ox(s=1.25){const t=new Vt;t.name=Sx;const e=[],n=[],i=[],r=cs(new re({color:16777215,vertexColors:!0}),{strength:.42,softness:.62}),a=new re({color:16777215}),o=new re({color:Ic,transparent:!0,opacity:.55,depthWrite:!1}),l=new re({color:Fc});n.push(r,a,o,l);const c=(y,w,A,M)=>{const T=new ce(y,w,A);return zc(T,M),e.push(T),T},h=[],u=y=>{var M,T;const w=new Vt;y.position&&w.position.fromArray(y.position),y.rotation&&w.rotation.fromArray(y.rotation),((M=y.parent)!=null?M:t).add(w);const A=new mt(y.geometry,(T=y.material)!=null?T:r);if(y.scale&&A.scale.fromArray(y.scale),w.add(A),y.outline!==void 0){const R=So(y.geometry,y.outline,Px);y.scale&&R.scale.fromArray(y.scale),R.visible=!1,w.add(R),h.push(R)}return{holder:w,mesh:A}},f=c(1,48,36,fr),m=u({geometry:f,scale:[_n.x,_n.y,_n.z],outline:zo});u({geometry:c(.82,24,18,Dc),position:[0,-.12,.1],scale:[.95,.75,1.15]}),u({geometry:c(.68,32,24,fr),position:[0,.45,.85],scale:[.95,.9,.95],outline:zo}),u({geometry:c(.38,24,18,Dc),position:[0,.3,1.25],scale:[.9,.7,1],outline:zo}),u({geometry:c(.1,16,12,Ex),position:[0,.38,1.58],scale:[1.1,.8,.9]});for(const y of[-.32,.32]){const w=y>0?.35:-.35,A=.145,M=u({geometry:c(.1,20,16,Cx),position:[y+Math.sin(w)*A,.57,1.25+Math.cos(w)*A],rotation:[0,w,0],scale:[1,1.12,.85]});u({parent:M.holder,geometry:c(.03,16,16,16777215),position:[-.03,.045,.07],scale:[1,1,.55],material:a})}for(const y of[-.52,.52])u({geometry:c(.19,28,20,Ic),position:[y,.43,1.19],scale:[1,.66,.28],material:o});const g=[];for(const y of[-1,1]){const w=u({geometry:c(.35,20,14,fr),position:[y*1.04,-.16,.6],scale:[.3,.72,1],rotation:[-.3,0,y*.62],outline:Oc});g.push(w.holder)}const p=[];for(const y of[-1,1]){const w=u({geometry:c(.4,20,14,fr),position:[y*.35,-.15,-1.25],scale:[.7,.15,.9],rotation:[.4,0,y*.7],outline:Oc});p.push(w.holder)}const d=()=>{const y=new le(.008,.012,.6,6);return zc(y,Fc),e.push(y),y};for(const[y,w,A,M]of[[-.36,.32,1.4,.2],[-.3,.22,1.45,.15],[.36,.32,1.4,-.2],[.3,.22,1.45,-.15]])u({geometry:d(),position:[y,w,A],rotation:[0,M,Math.PI/2+(y>0?-.3:.3)],material:l});t.updateMatrixWorld(!0);const _=Fx();i.push(_);const x=new re({map:_,transparent:!0,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4});n.push(x);for(const y of Lx){const w=Dx(y.theta,y.phi),A=new E(w.x*_n.x,w.y*_n.y,w.z*_n.z),M=new E(w.x/_n.x,w.y/_n.y,w.z/_n.z).normalize(),T=new wx(m.mesh,A,Ix(M),new E(y.size,y.size,.6));e.push(T),t.add(new mt(T,x))}t.scale.setScalar(s/Tx);let v=0;return{group:t,update:(y,w,A)=>{v>0&&(v=Math.max(0,v-w));const M=1+v*2;t.position.set(A.position.x+Math.sin(y*.62)*.16,A.position.y+Math.sin(y*1.3)*.11*M,A.position.z+Math.cos(y*.5)*.12),t.rotation.set(Math.sin(y*1.6)*.07*M,A.yaw+Math.sin(y*.7)*.2*M,Math.sin(y*.9)*.1*M);const[T,R]=g;T.rotation.z=-.62+Math.sin(y*2.4)*.4*M,R.rotation.z=.62+Math.sin(y*2.4+.6)*.4*M,T.rotation.x=-.3+Math.sin(y*2.4+.4)*.25*M,R.rotation.x=-.3+Math.sin(y*2.4+1)*.25*M;const[V,K]=p;V.rotation.x=.4+Math.sin(y*2)*.4*M,K.rotation.x=.4+Math.sin(y*2+.4)*.4*M,V.rotation.z=-.7+Math.sin(y*2+.2)*.2*M,K.rotation.z=.7+Math.sin(y*2+.5)*.2*M},react:()=>{v=1},setOutlines:y=>{for(const w of h)w.visible=y},dispose:()=>{for(const y of e)y.dispose();for(const y of n)y.dispose();for(const y of i)y.dispose();t.clear()}}}const Nc=15249507,zx=16312002,Nx=12876851,kx=3350543,kc=16642520,Uc=1.15,Ux=.62,Bx=6,Gx=2.6,Bc=.42,Gc=1.9,Hx=2.2,Vx=.16,Wx=1.35,Xx=14,Yx=1.15,qx=2;function jx(s,t,e,n){const i=new Vt;i.name="token-drop",i.userData.isFood=!0,i.userData.owner=n;const r=new Vt;r.rotation.y=e,i.add(r);const a=new Vt;a.rotation.x=Ux,r.add(a);const o=new Vt;a.add(o);const l=[],c=[],h=(y,w,A,M,T)=>{l.push(y);const R=cs(new re({color:w}),{strength:.3,softness:.7});c.push(R);const V=new mt(y,R);return A&&V.position.fromArray(A),M&&V.scale.fromArray(M),T&&V.rotation.fromArray(T),o.add(V),V};h(new ce(.5,18,12),Nc,void 0,[1,.3,.46]),h(new ce(.44,16,10),zx,[0,-.055,0],[.94,.17,.4]),h(new ce(.46,16,10),Nx,[0,.085,0],[.9,.12,.33]);for(const y of[-1,1])h(new tr(.17,.36,4),Nc,[-.54,0,y*.13],[1,1,.55],[0,y*.42,Math.PI/2]);for(const y of[-1,1])h(new ce(.055,10,8),kx,[.3,.05,y*.15]);h(new xe(.4,.035,.075),kc,[.04,.148,-.058]),h(new xe(.085,.035,.24),kc,[.04,.148,.062]),i.scale.setScalar(Uc);const u=new E((Math.random()-.5)*.7,-.4,(Math.random()-.5)*.7),f=Math.random()*Math.PI*2,m=Hx*(.85+Math.random()*.3);i.position.copy(s);let g=0,p=!1,d=!1,_=0,x=!1;const v=new E,b=(y,w)=>{if(g+=w,!d&&g>Xx&&(p=!0),_>0){_=Math.max(0,_-w*5),i.scale.setScalar(Uc*_),i.rotation.y+=w*12,_===0&&(p=!0),v.copy(i.position);return}if(o.rotation.y+=m*w,o.rotation.z=Math.sin(y*Wx+f)*Vx,x)i.position.y=t+Math.sin(y*1.6+f)*.07;else{u.y-=Bx*w;const A=Math.max(0,1-Gx*w);u.multiplyScalar(A),i.position.addScaledVector(u,w),i.position.x+=Math.sin(y*Gc+f)*Bc*w,i.position.z+=Math.cos(y*Gc*.8+f)*Bc*.6*w,i.position.y<=t&&(i.position.y=t,x=!0)}v.copy(i.position)};return v.copy(i.position),{group:i,position:v,owner:n,get consumed(){return d},get done(){return p},update:b,consume:()=>{d||(d=!0,_=1,u.set(0,0,0))},dispose:()=>{for(const y of l)y.dispose();for(const y of c)y.dispose();i.clear()}}}function Jt(s,t,e){const n=document.createElement(s);return t&&(n.className=t),e!==void 0&&(n.textContent=e),n}function Zx(s){const t=Jt("button","orca-shell-toggle","🐋 虎鲸海底");return t.type="button",t.title="打开虎鲸海底互动模式",t.addEventListener("click",e=>{e.stopPropagation(),s()}),t}function $x(s,t){const e=Jt("div","orca-toolbar"),n=Jt("button","orca-toolbar__btn","✕ 返回");n.type="button",n.title="退出互动模式",n.addEventListener("click",v=>{v.stopPropagation(),s.onClose()});const i=Jt("button","orca-toolbar__btn","🪙 投喂");i.type="button",i.title="进入投喂模式：按钮变成 ✓ 之后，点一下虎鲸 / Clawd / 海豹，把 token 喂给它",i.addEventListener("click",v=>{v.stopPropagation(),s.onFeed()});const r=Jt("button","orca-toolbar__btn","↩️ 复原");r.type="button",r.title="让小虎鲸回到原来的大小（累计吃掉多少 token 不会清零）",r.addEventListener("click",v=>{v.stopPropagation(),s.onResetGrowth()});const a=Jt("button","orca-toolbar__btn","🪸 布置");a.type="button",a.title="进入水族缸布置模式",a.addEventListener("click",v=>{v.stopPropagation(),s.onModeChange("decorating")});const o=Jt("button","orca-toolbar__btn","📷 拍照");o.type="button",o.title="给虎鲸拍一张水族馆照片",o.addEventListener("click",v=>{v.stopPropagation(),s.onPhoto()});const l=Jt("button","orca-toolbar__btn","♻️ 重置");l.type="button",l.title="清空海底布置",l.addEventListener("click",v=>{v.stopPropagation(),s.onReset()});const c=Jt("button","orca-toolbar__btn","🖊️ 描边");c.type="button",c.title="墨线描边开关：虎鲸 / Clawd / Seal-GPT 一起切换",c.addEventListener("click",v=>{v.stopPropagation(),s.onToggleOutlines()});const h=Jt("button","orca-toolbar__btn","🔇 音乐");h.type="button",h.title="开启/关闭背景音乐",h.addEventListener("click",v=>{v.stopPropagation(),s.onToggleMusic()});const u=Jt("button","orca-toolbar__btn","🦀 Clawd");u.type="button",u.title="召唤/送走 Clawd 小伙伴（只有一只）",u.addEventListener("click",v=>{v.stopPropagation(),s.onToggleCompanion()});const f=Jt("button","orca-toolbar__btn","🦭 Seal-GPT");f.type="button",f.title="召唤/送走 Seal-GPT 小伙伴（只有一只）",f.addEventListener("click",v=>{v.stopPropagation(),s.onToggleSeal()});const m=Jt("div","orca-toolbar__themes"),g=new Map;for(const v of t){const b=Jt("button","orca-toolbar__theme",`${v.emoji} ${v.label}`);b.type="button",b.dataset.theme=v.id,b.title=`切换到${v.label}场景`,b.addEventListener("click",y=>{y.stopPropagation(),s.onThemeChange(v.id)}),m.append(b),g.set(v.id,b)}e.append(n,i,r,a,o,l,u,f,c,h,m);const p=Jt("div","orca-menu"),d=Jt("button","orca-menu__trigger","☰");d.type="button",d.setAttribute("aria-label","菜单"),d.setAttribute("aria-expanded","false");const _=()=>{p.classList.remove("open"),d.setAttribute("aria-expanded","false"),document.removeEventListener("click",x,!0)},x=v=>{p.contains(v.target)||_()};return d.addEventListener("click",v=>{v.stopPropagation();const b=p.classList.toggle("open");d.setAttribute("aria-expanded",String(b)),b?document.addEventListener("click",x,!0):document.removeEventListener("click",x,!0)}),e.addEventListener("click",_,!0),p.append(d,e),{root:p,setActiveTheme:v=>{for(const[b,y]of g)y.dataset.active=String(b===v)},setMusicEnabled:v=>{h.textContent=v?"🎵 音乐":"🔇 音乐",h.dataset.active=String(v)},setCompanionEnabled:v=>{u.textContent=v?"🦀 Clawd ✓":"🦀 Clawd",u.dataset.active=String(v)},setSealEnabled:v=>{f.textContent=v?"🦭 Seal-GPT ✓":"🦭 Seal-GPT",f.dataset.active=String(v)},setOutlinesEnabled:v=>{c.textContent=v?"🖊️ 描边 ✓":"🖊️ 描边",c.dataset.active=String(v)},setFeedArmed:v=>{i.textContent=v?"🪙 投喂 ✓":"🪙 投喂",i.dataset.active=String(v)}}}function Jx(s,t,e,n,i,r){const a=bc(),o=Jt("div","orca-decor-picker"),l=Jt("div","orca-decor-picker__head"),c=Jt("div","orca-decor-picker__title",a?"选装饰 → 点海底放置 · 拖动旋转 · 双指缩放":"选择装饰后点击海底放置，滚轮旋转，右键删除"),h=Jt("button","orca-decor-picker__close","×");h.type="button",h.title="完成布置",h.setAttribute("aria-label","完成布置"),h.addEventListener("click",x=>{x.stopPropagation(),s.onClose()}),l.append(c,h),o.append(l);const u=Jt("div","orca-decor-picker__row");for(const x of t){const v=Jt("button","orca-decor-picker__chip",x.name);v.type="button",v.dataset.kind=x.id,v.addEventListener("click",b=>{b.stopPropagation(),s.onSelectDecor(x.id)}),u.append(v)}for(const[x,v,b]of[["↺",-.4,"向左旋转装饰"],["↻",.4,"向右旋转装饰"]]){const y=Jt("button","orca-decor-picker__chip orca-decor-picker__rotate",x);y.type="button",y.title=b,y.addEventListener("click",w=>{w.stopPropagation(),s.onRotateGhost(v)}),u.append(y)}o.append(u);const f=Jt("div","orca-decor-picker__glow");n||(f.style.display="none");const m=Jt("span","orca-decor-picker__glow-label","光效强度"),g=Jt("span","orca-decor-picker__glow-value",String(e.toFixed(2))),p=document.createElement("input");p.type="range",p.className="orca-decor-picker__glow-slider",p.min="0",p.max="1.5",p.step="0.05",p.value=String(e),p.addEventListener("input",x=>{const v=Number(x.target.value);g.textContent=v.toFixed(2),s.onBloomChange(v)}),f.append(m,p,g),o.append(f);const d=Jt("div","orca-decor-picker__skins"),_=Jt("span","orca-decor-picker__glow-label","虎鲸皮肤");d.append(_);for(const x of i){const v=Jt("button","orca-decor-picker__chip","");v.type="button",v.dataset.skin=x.id,v.dataset.active=String(x.id===r),v.title=`切换到${x.label}皮肤`;const b=Jt("span","orca-decor-picker__skin-swatch");b.style.background=`linear-gradient(135deg, ${x.dark} 0 50%, ${x.white} 50% 100%)`;const y=Jt("span","orca-decor-picker__skin-name",x.label);v.append(b,y),v.addEventListener("click",w=>{w.stopPropagation();for(const A of d.querySelectorAll("[data-skin]"))A.dataset.active=String(A.dataset.skin===x.id);s.onSkinChange(x.id)}),d.append(v)}return o.append(d),o}const Kx=`
:root {
  --orca-accent: #dc7759;
  --orca-accent-soft: #f4e3d8;
  --orca-panel: #f2eee9;
  --orca-panel-border: #e0d5c5;
  --orca-text: #444444;
  --orca-text-soft: #6f6a5e;
  --orca-paper: #faf7f2;
  --orca-shadow: 0 2px 6px rgba(70, 60, 45, 0.08);
  /* Zero unless the engine understands env(); see the note at the top. */
  --safe-top: 0px;
  --safe-right: 0px;
  --safe-bottom: 0px;
  --safe-left: 0px;
}
@supports (padding-top: env(safe-area-inset-top)) {
  :root {
    --safe-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));
    --safe-right: var(--safe-area-inset-right, env(safe-area-inset-right, 0px));
    --safe-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));
    --safe-left: var(--safe-area-inset-left, env(safe-area-inset-left, 0px));
  }
}
.orca-aquarium-root {
  font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.orca-shell-toggle {
  position: fixed;
  right: calc(18px + var(--safe-right));
  bottom: calc(18px + var(--safe-bottom));
  z-index: 9999;
  padding: 9px 14px; border: 1px solid var(--orca-panel-border);
  border-radius: 14px; background: var(--orca-panel); color: var(--orca-text);
  font-size: 13px; cursor: pointer; pointer-events: auto;
  box-shadow: var(--orca-shadow);
  min-height: var(--orca-tap);
  display: inline-flex; align-items: center; justify-content: center;
}
.orca-shell-toggle:hover {
  border-color: var(--orca-accent);
  background: var(--orca-paper);
  color: var(--orca-accent);
}
/* Minimum fingertip target, per Apple's and Google's 44px guidance. Declared as
   a variable so it can be raised for touch, and set on the base rules so no
   later plain rule can clobber it. */
:root { --orca-tap: 30px; }
/* The menu is a bottom-right ☰ FAB on every device (see createAquariumToolbar
   in ui/index.ts). Rationale: the bar is wider than a phone, and Chrome 61 —
   the minitool container's WebView — has no env(safe-area-inset-*) support, so
   a top-anchored bar collides with the status bar / notch. The Android nav bar
   already reserves the space below the screen, so anchoring to the bottom needs
   none of that math. The FAB shares the toolbar's visibility: hidden in ambient
   mode along with the rest of the bar. */
.orca-menu {
  position: fixed;
  right: calc(16px + var(--safe-right));
  bottom: calc(16px + var(--safe-bottom));
  z-index: 10001;
  display: flex; flex-direction: column; align-items: flex-end;
  pointer-events: none;
}
.orca-menu__trigger {
  pointer-events: auto;
  display: inline-flex; align-items: center; justify-content: center;
  min-width: var(--orca-tap); min-height: var(--orca-tap);
  padding: 0 14px; border: 1px solid var(--orca-panel-border);
  border-radius: 14px; background: var(--orca-panel); color: var(--orca-text);
  box-shadow: var(--orca-shadow); font-size: 18px; cursor: pointer;
}
.orca-toolbar {
  /* The floating panel the FAB reveals. Hidden until .open; it floats above the
     trigger and wraps into a card on narrow screens. */
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  z-index: 2;
  display: none;
  box-sizing: border-box;
  flex-wrap: wrap; align-items: center; justify-content: flex-start;
  --g: 6px; padding: 8px; max-width: min(92vw, 360px);
  border: 1px solid var(--orca-panel-border);
  border-radius: 18px; background: var(--orca-panel);
  box-shadow: var(--orca-shadow); pointer-events: auto;
}
.orca-menu.open .orca-toolbar { display: flex; }
/* margin-gutter spacing: a half-gutter on every child yields a full gutter
   between neighbours and is wrap-safe on Chrome 61 (which has no flex gap). */
.orca-toolbar > * { margin: calc(var(--g) / 2); }
.orca-toolbar__btn {
  border: 1px solid transparent; border-radius: 12px; padding: 8px 10px;
  background: transparent; color: var(--orca-text); font-size: 13px; cursor: pointer;
  white-space: nowrap; flex: 0 0 auto;
  min-height: var(--orca-tap);
  display: inline-flex; align-items: center; justify-content: center;
}
.orca-toolbar__btn:hover {
  background: var(--orca-accent-soft);
  color: var(--orca-accent);
}
.orca-toolbar__themes {
  display: flex; --g: 5px; flex-wrap: nowrap; padding-left: 6px;
  border-left: 1px solid var(--orca-panel-border); flex: 0 0 auto;
}
.orca-toolbar__themes > * + * { margin-left: var(--g); }
.orca-toolbar__theme {
  border: 1px solid var(--orca-panel-border); border-radius: 12px;
  padding: 7px 9px; background: var(--orca-paper); color: var(--orca-text-soft);
  font-size: 12px; cursor: pointer; white-space: nowrap; flex: 0 0 auto;
  min-height: var(--orca-tap);
  display: inline-flex; align-items: center; justify-content: center;
}
.orca-toolbar__theme:hover { color: var(--orca-text); border-color: var(--orca-accent); }
.orca-toolbar__theme[data-active='true'] {
  background: var(--orca-accent-soft);
  border-color: var(--orca-accent);
  color: var(--orca-accent);
  font-weight: 600;
}
.orca-decor-picker {
  position: fixed;
  bottom: calc(24px + var(--safe-bottom));
  left: 50%; transform: translateX(-50%);
  z-index: 10000; padding: 12px 14px; border: 1px solid var(--orca-panel-border);
  border-radius: 18px; background: var(--orca-panel);
  box-shadow: var(--orca-shadow); pointer-events: auto;
  /* min() is Chrome 79; the 720px cap only matters on a wide viewport, so it
     is applied by a media query instead of by the function. border-box so the
     padding and border stay inside the cap rather than adding 30px to it. */
  box-sizing: border-box;
  max-width: calc(100vw - 24px);
}
@media (min-width: 744px) {
  .orca-decor-picker { max-width: 720px; }
}
.orca-decor-picker__head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.orca-decor-picker__title { flex: 1 1 auto; min-width: 0; color: var(--orca-text-soft); font-size: 12px; }
.orca-decor-picker__close {
  flex: 0 0 auto; width: 30px; height: 30px; padding: 0; border-radius: 50%;
  border: 1px solid var(--orca-panel-border); background: var(--orca-paper);
  color: var(--orca-text); font-size: 18px; line-height: 1; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  min-height: var(--orca-tap);
}
.orca-decor-picker__close:hover { border-color: var(--orca-accent); color: var(--orca-accent); }
.orca-decor-picker__row { display: flex; --g: 8px; flex-wrap: wrap; }
.orca-decor-picker__row > * + * { margin-left: var(--g); }
.orca-decor-picker__chip {
  border: 1px solid var(--orca-panel-border); border-radius: 12px;
  padding: 7px 10px; background: var(--orca-paper); color: var(--orca-text);
  font-size: 12px; cursor: pointer;
  min-height: var(--orca-tap);
  display: inline-flex; align-items: center; justify-content: center;
}
.orca-decor-picker__chip:hover,
.orca-decor-picker__chip[data-active='true'] {
  border-color: var(--orca-accent);
  background: var(--orca-accent-soft);
  color: var(--orca-accent);
}
.orca-decor-picker__glow {
  display: flex; align-items: center; --g: 10px; margin-top: 10px;
  padding-top: 10px; border-top: 1px solid var(--orca-panel-border);
}
.orca-decor-picker__glow > * + * { margin-left: var(--g); }
.orca-decor-picker__skins {
  display: flex; align-items: center; --g: 8px; flex-wrap: wrap;
  margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--orca-panel-border);
}
.orca-decor-picker__skins > * + * { margin-left: var(--g); }
.orca-decor-picker__skin-swatch {
  display: inline-block; width: 18px; height: 18px; border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.14); margin-right: 6px; vertical-align: middle;
}
.orca-decor-picker__glow-label { color: var(--orca-text-soft); font-size: 12px; white-space: nowrap; }
.orca-decor-picker__glow-value {
  min-width: 36px; text-align: right; color: var(--orca-text);
  font-size: 12px; font-variant-numeric: tabular-nums;
}
.orca-decor-picker__glow-slider {
  flex: 1; min-width: 140px; accent-color: var(--orca-accent); cursor: pointer;
}
/* Rotation is a wheel gesture on desktop and these buttons on touch. */
.orca-decor-picker__rotate {
  min-width: 38px; font-size: 15px; line-height: 1.1;
  padding: 5px 10px; font-weight: 600;
}
/* Touch: raise the fingertip minimum to the 44px both Apple and Google
   recommend, and give the fixed bars a little more clearance.
   NOTE: keep this block FLAT. Chromium does not honour a @media nested inside
   another @media, so any nesting here silently does nothing. */
@media (pointer: coarse) {
  :root { --orca-tap: 44px; }
  .orca-toolbar { --g: 6px; padding: 6px; border-radius: 16px; }
  .orca-toolbar__btn { padding: 8px 12px; font-size: 13px; }
  .orca-toolbar__theme { padding: 8px 11px; }
  .orca-decor-picker { bottom: calc(10px + var(--safe-bottom)); padding: 10px 12px; }
  .orca-decor-picker__chip { padding: 8px 12px; font-size: 13px; }
  .orca-decor-picker__glow-slider { min-width: 96px; }
  .orca-decor-picker__row { --g: 6px; }
  .orca-photo-gallery { bottom: calc(10px + var(--safe-bottom)); }
  .orca-photo-modal__btn { padding: 10px 18px; font-size: 14px; min-height: var(--orca-tap); }
  .orca-photo-gallery__thumb { width: 58px; height: 68px; }
  /* No hover on touch, so the delete affordance must always be reachable. */
  .orca-photo-gallery__del { display: block; width: 22px; height: 22px; }
}

/* Short viewports (a phone in landscape). The toolbar and the decor picker
   together would otherwise eat most of the height, so they are slimmed and the
   photo strip is lifted out of the way. Kept flat for the same reason as above. */
@media (max-height: 460px) {
  .orca-toolbar { padding: 3px 6px; --g: 4px; }
  .orca-toolbar__btn { padding: 5px 9px; font-size: 12px; }
  .orca-toolbar__theme { padding: 5px 8px; font-size: 11px; }
  .orca-decor-picker { padding: 7px 9px; }
  .orca-decor-picker__title { display: none; }
  .orca-decor-picker__row { --g: 5px; }
  .orca-decor-picker__glow,
  .orca-decor-picker__skins { margin-top: 6px; padding-top: 6px; }
  .orca-photo-gallery { display: none !important; }
  .orca-decor-picker__skin-name { display: none; }
  .orca-decor-picker__skin-swatch { width: 22px; height: 22px; margin-right: 0; }
}

/* Narrow screens (a phone in portrait). The decor picker's flex-wrap turned
   into a ragged tower — orphaned rotate buttons, one skin chip per row — that
   covered half the screen. A 4-column grid pins the decor chips into three
   tidy rows, and the skin chips drop their text labels (the two-tone swatch
   is the identity) so five skins fit on one line. */
@media (max-width: 560px) {
  .orca-decor-picker { max-height: 52vh; overflow-y: auto; overscroll-behavior: contain; }
  /* Grid, not flex-wrap, at this width. grid-gap is Chrome 57, so this
     branch needs no margin baseline — but the flex one has to be cancelled or
     every cell after the first would be inset. */
  .orca-decor-picker__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    --g: 6px;
    gap: var(--g);
    grid-gap: var(--g);
  }
  .orca-decor-picker__row > * + * { margin-left: 0; }
  .orca-decor-picker__chip { padding: 8px 4px; font-size: 12px; }
  .orca-decor-picker__rotate { min-width: 0; }
  .orca-decor-picker__skin-name { display: none; }
  .orca-decor-picker__skin-swatch { width: 22px; height: 22px; margin-right: 0; }
  .orca-decor-picker__skins { --g: 6px; }
}
.orca-toast {
  position: fixed; left: 50%; bottom: 90px; transform: translateX(-50%);
  z-index: 10001; padding: 8px 14px; border-radius: 999px;
  border: 1px solid var(--orca-panel-border);
  background: var(--orca-panel); color: var(--orca-text); font-size: 13px;
  pointer-events: none; opacity: 0; transition: opacity 0.25s ease;
}
.orca-toast[data-show='true'] { opacity: 1; }

/* Photo flash overlay */
.orca-photo-flash {
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 9998;
  background: var(--orca-paper); opacity: 0; pointer-events: none;
  transition: opacity 0.09s ease-out;
}
.orca-photo-flash[data-active='true'] { opacity: 0.68; transition: opacity 0.03s ease-in; }
.orca-photo-flash[data-tone='gold'] { background: #ffe9a8; }

/* Thought bubble (paper-flat) */
.orca-thought {
  position: fixed; z-index: 10003; max-width: 228px;
  padding: 9px 14px; border-radius: 14px;
  background: var(--orca-paper); color: var(--orca-text);
  border: 1.5px solid var(--orca-panel-border);
  box-shadow: 0 4px 14px rgba(70, 60, 45, 0.18);
  font-size: 13px; line-height: 1.45; pointer-events: none;
  opacity: 0; transform: translateY(8px) scale(0.9);
  transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  white-space: nowrap;
}
.orca-thought::after {
  content: ''; position: absolute; bottom: -9px; left: 24px;
  border-left: 8px solid transparent; border-right: 8px solid transparent;
  border-top: 10px solid var(--orca-paper);
}
.orca-thought[data-show='true'] {
  opacity: 1; transform: translateY(0) scale(1);
}

/* DOM bubble burst (flat rings) */
.orca-dom-bubble {
  position: fixed; z-index: 10002; border-radius: 50%;
  border: 2px solid rgba(220, 240, 255, 0.9);
  background: transparent; pointer-events: none;
  animation: orca-bubble-rise 1.1s ease-out forwards;
}
@keyframes orca-bubble-rise {
  0% { transform: translateY(0) scale(0.6); opacity: 0.9; }
  100% { transform: translateY(-72px) scale(1.15); opacity: 0; }
}


/* Photo gallery */
.orca-photo-gallery {
  position: fixed;
  bottom: calc(16px + var(--safe-bottom));
  left: 50%; transform: translateX(-50%);
  z-index: 10000; display: flex; align-items: center; --g: 10px;
  padding: 8px 10px; border: 1px solid var(--orca-panel-border);
  border-radius: 18px; background: var(--orca-panel);
  box-shadow: var(--orca-shadow); pointer-events: auto;
  max-width: calc(100vw - 24px);
}
.orca-photo-gallery > * + * { margin-left: var(--g); }
.orca-photo-gallery__label {
  color: var(--orca-text-soft); font-size: 12px; white-space: nowrap;
  letter-spacing: 0.3px;
}
.orca-photo-gallery__scroll {
  display: flex; --g: 8px; overflow-x: auto; overflow-y: hidden;
  scroll-behavior: smooth; max-width: 56vw; padding: 4px 2px;
  -webkit-overflow-scrolling: touch;
}
.orca-photo-gallery__scroll > * + * { margin-left: var(--g); }
.orca-photo-gallery__scroll::-webkit-scrollbar { height: 4px; }
.orca-photo-gallery__scroll::-webkit-scrollbar-thumb {
  background: rgba(160, 140, 120, 0.45); border-radius: 4px;
}
.orca-photo-gallery__thumb {
  position: relative; flex-shrink: 0; width: 54px; height: 62px;
  border: 1.5px solid var(--orca-panel-border); border-radius: 10px;
  background: var(--orca-paper); cursor: pointer; overflow: hidden;
  padding: 0; box-shadow: 0 1px 4px rgba(70, 60, 45, 0.10);
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.orca-photo-gallery__thumb:hover {
  transform: translateY(-2px);
  border-color: var(--orca-accent);
}
.orca-photo-gallery__thumb[data-quality='perfect'],
.orca-photo-gallery__thumb[data-quality='closeup'] {
  border-color: #f2c14e;
}
/* A shaken shot: dashed border so it reads as spoiled even at thumbnail size. */
.orca-photo-gallery__thumb[data-blurry='true'] {
  border-style: dashed;
  border-color: #b9b2a4;
}
.orca-photo-gallery__thumb-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.orca-photo-gallery__badge {
  position: absolute; top: 2px; left: 2px; font-size: 11px;
  background: var(--orca-paper); border-radius: 5px; padding: 0 3px;
  line-height: 1.2; pointer-events: none;
}
.orca-photo-gallery__del {
  position: absolute; top: 2px; right: 2px; width: 16px; height: 16px;
  border: 1px solid var(--orca-panel-border); border-radius: 50%;
  background: var(--orca-paper); color: var(--orca-text-soft);
  font-size: 11px; line-height: 1; cursor: pointer; padding: 0;
  display: none;
}
.orca-photo-gallery__thumb:hover .orca-photo-gallery__del { display: block; }
.orca-photo-gallery__del:hover { color: var(--orca-accent); border-color: var(--orca-accent); }

/* Photo modal */
.orca-photo-modal {
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 10002;
  background: rgba(24, 22, 18, 0.48);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
}
.orca-photo-modal[data-active='true'] { opacity: 1; pointer-events: auto; }
.orca-photo-modal__panel {
  position: relative; background: var(--orca-panel);
  border: 1px solid var(--orca-panel-border); border-radius: 18px;
  padding: 16px 16px 18px; max-width: 84vw; max-height: 84vh;
  display: flex; flex-direction: column; align-items: center; --g: 10px;
  box-shadow: 0 12px 30px rgba(30, 25, 18, 0.22);
}
/* :not() keeps the close button out of the spacing baseline: it is absolutely
   positioned, so a margin-top would offset it away from its top: 8px. */
.orca-photo-modal__panel > * + *:not(.orca-photo-modal__close) { margin-top: var(--g); }
.orca-photo-modal__close {
  position: absolute; top: 8px; right: 12px; font-size: 22px;
  cursor: pointer; color: var(--orca-text-soft); background: none; border: none;
  line-height: 1;
}
.orca-photo-modal__close:hover { color: var(--orca-text); }
.orca-photo-modal__img {
  max-width: 72vw; max-height: 58vh; border-radius: 10px;
  border: 1px solid var(--orca-panel-border);
  /* Keep the long-press "save image" callout working on mobile webviews. */
  -webkit-touch-callout: default;
  -webkit-user-select: auto; user-select: auto;
}
.orca-photo-modal__caption { color: var(--orca-text-soft); font-size: 13px; }
.orca-photo-modal__hint {
  color: var(--orca-text-soft); font-size: 12px; opacity: 0.85; text-align: center;
}
.orca-photo-modal__actions { display: flex; --g: 8px; }
.orca-photo-modal__actions > * + * { margin-left: var(--g); }
.orca-photo-modal__btn {
  border: 1px solid var(--orca-panel-border); border-radius: 12px;
  padding: 7px 14px; background: var(--orca-paper); color: var(--orca-text);
  font-size: 13px; cursor: pointer;
}
.orca-photo-modal__btn:hover {
  border-color: var(--orca-accent);
  color: var(--orca-accent);
  background: var(--orca-accent-soft);
}

/* Fatal fallback: shown when WebGL is unavailable or was lost. */
.orca-fatal {
  position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 10010;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  --g: 14px; padding: 32px 24px; text-align: center;
  background: #0d3a50; color: #eaf4f8;
}
.orca-fatal > * + * { margin-top: var(--g); }
.orca-fatal__title { font-size: 18px; font-weight: 600; }
.orca-fatal__body { font-size: 14px; line-height: 1.7; max-width: 30em; opacity: 0.85; }
.orca-fatal__retry {
  margin-top: 6px; padding: 11px 26px; border: 0; border-radius: 999px;
  background: var(--orca-paper, #f2eee9); color: #0d3a50;
  font-size: 15px; font-weight: 600; cursor: pointer;
}
.orca-fatal__retry:hover { background: #ffffff; }

/* Enhancement layer. The boot script only adds this class after it has
   measured a real flex box, so gap below is known to work on flex.
   The ordering matters: the child margins above are the DEFAULT, not a
   fallback — gap is added here, never subtracted. If this class never lands
   (old WebView, or the boot script itself failed), spacing is still correct at
   the margin baseline rather than doubled. */
.supports-flex-gap .orca-toolbar,
.supports-flex-gap .orca-toolbar__themes,
.supports-flex-gap .orca-decor-picker__row,
.supports-flex-gap .orca-decor-picker__glow,
.supports-flex-gap .orca-decor-picker__skins,
.supports-flex-gap .orca-photo-gallery,
.supports-flex-gap .orca-photo-gallery__scroll,
.supports-flex-gap .orca-photo-modal__actions {
  column-gap: var(--g);
}
.supports-flex-gap .orca-photo-modal__panel,
.supports-flex-gap .orca-fatal {
  row-gap: var(--g);
}
.supports-flex-gap .orca-toolbar > * + *,
.supports-flex-gap .orca-toolbar__themes > * + *,
.supports-flex-gap .orca-decor-picker__row > * + *,
.supports-flex-gap .orca-decor-picker__glow > * + *,
.supports-flex-gap .orca-decor-picker__skins > * + *,
.supports-flex-gap .orca-photo-gallery > * + *,
.supports-flex-gap .orca-photo-gallery__scroll > * + *,
.supports-flex-gap .orca-photo-modal__actions > * + * {
  margin-left: 0;
}
.supports-flex-gap .orca-photo-modal__panel > * + *:not(.orca-photo-modal__close) {
  margin-top: 0;
}
.supports-flex-gap .orca-fatal > * + * {
  margin-top: 0;
}
`;let Hc=!1;function Qx(){if(Hc||typeof document=="undefined")return;const s=document.createElement("style");s.dataset.plugin="@elyoncat/orca-aquarium-shell",s.textContent=Kx,document.head.appendChild(s),Hc=!0}function tv(s){if(s)return"pose";const t=Math.random();return t<.12?"turnaway":t<.26?"wiggle":t<.38?"splash":"pose"}const Fn={closeup:{label:"贴贴特写",emoji:"💙",frame:"#9fc9e8",stamp:"CLOSE UP",tone:"gold"},perfect:{label:"完美瞬间",emoji:"✨",frame:"#f2c14e",stamp:"PERFECT",tone:"gold"},back:{label:"背影远眺",emoji:"🌊",frame:"#9fb4c8",stamp:"BACK VIEW",tone:"paper",grayscale:!0},daily:{label:"日常抓拍",emoji:"📷",frame:"#f0d9b8",stamp:"DAILY",tone:"paper"}},Vc={label:"哎呀糊了",emoji:"🌫️",frame:"#d8d2c6",stamp:"BLURRY",tone:"paper",blur:!0},Wc="orca-aquarium-shell:photos:v1",pr=8;function ev(s,t){const e=s.position.clone().project(t);if(e.z>1||e.z<-1)return"daily";const n=Math.hypot(e.x,e.y),i=s.position.distanceTo(t.position),r=new E(-Math.cos(s.rotation.y),0,Math.sin(s.rotation.y)),a=new E().subVectors(t.position,s.position).setY(0),o=a.lengthSq()>1e-6?r.angleTo(a.normalize()):0;return i<5.8&&n<.3&&o<.55?"closeup":n<.24&&o<.62?"perfect":o>2.35?"back":"daily"}function Xc(s){return new Promise((t,e)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>e(new Error("image load failed")),n.src=s})}function nv(s,t,e,n,i,r){const a=Math.min(r,n/2,i/2);s.beginPath(),s.moveTo(t+a,e),s.arcTo(t+n,e,t+n,e+i,a),s.arcTo(t+n,e+i,t,e+i,a),s.arcTo(t,e+i,t,e,a),s.arcTo(t,e,t+n,e,a),s.closePath()}function iv(s,t){const e=document.createElement("canvas");e.width=Math.max(1,Math.round(s.width/t)),e.height=Math.max(1,Math.round(s.height/t));const n=e.getContext("2d");n.imageSmoothingEnabled=!0,n.drawImage(s,0,0,e.width,e.height);const i=document.createElement("canvas");i.width=s.width,i.height=s.height;const r=i.getContext("2d");return r.imageSmoothingEnabled=!0,r.drawImage(e,0,0,i.width,i.height),i}function sv(s){const t=document.createElement("canvas");t.width=s.width,t.height=s.height;const e=t.getContext("2d");e.drawImage(s,0,0);const n=e.getImageData(0,0,t.width,t.height),i=n.data;for(let r=0;r<i.length;r+=4){const a=i[r]*.299+i[r+1]*.587+i[r+2]*.114|0;i[r]=a,i[r+1]=a,i[r+2]=a}return e.putImageData(n,0,0),t}const Yc=["😜","🤪","😝","🐟","💦","🫧"];async function rv(s,t,e,n=!1){const i=await Xc(s),r=n?{...Fn[t],...Vc}:Fn[t],a=To(e),l=Math.min(1,960/i.width),c=Math.max(1,Math.round(i.width*l)),h=Math.max(1,Math.round(i.height*l)),u=8,f=22,m=22,g=78,p=c+f*2,d=h+m+g,_=document.createElement("canvas");_.width=p,_.height=d;const x=_.getContext("2d");x.fillStyle=r.frame,x.fillRect(0,0,p,d),x.fillStyle="rgba(70, 60, 45, 0.16)",x.fillRect(f+5,m+7,c+u*2,h+u*2),x.fillStyle="#fffdf8",x.fillRect(f,m,c+u*2,h+u*2);const v=document.createElement("canvas");v.width=c,v.height=h,v.getContext("2d").drawImage(i,0,0,c,h);let b=v;if(r.blur&&(b=iv(v,12)),r.grayscale&&(b=sv(b)),x.drawImage(b,f+u,m+u),r.stampEmoji){const T=Math.max(36,Math.round(c*.22));x.font=`${T}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`,x.textAlign="center",x.textBaseline="middle",x.fillText(Yc[Math.floor(Math.random()*Yc.length)],f+u+c/2,m+u+h/2),x.textBaseline="alphabetic"}t==="perfect"?(x.fillStyle="#fffdf8",x.fillRect(f,m,22,5),x.fillRect(f+c+u*2-22,m,22,5),x.fillRect(f,m+h+u*2-5,22,5),x.fillRect(f+c+u*2-22,m+h+u*2-5,22,5),x.strokeStyle="rgba(255,255,255,0.9)",x.lineWidth=2,x.strokeRect(f+2.5,m+2.5,c+u*2-5,h+u*2-5)):t==="closeup"?(x.fillStyle="#fffdf8",x.fillRect(f,m,22,5),x.fillRect(f+c+u*2-22,m,22,5),x.fillRect(f,m+h+u*2-5,22,5),x.fillRect(f+c+u*2-22,m+h+u*2-5,22,5)):t==="back"&&(x.setLineDash([6,5]),x.strokeStyle="rgba(255,255,255,0.85)",x.lineWidth=1.5,x.strokeRect(f+3,m+3,c+u*2-6,h+u*2-6),x.setLineDash([]));const y=`${a.emoji} ${a.label}`;x.font='12px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';const w=x.measureText(y).width+20;nv(x,f+10,m+h+u+8,w,22,11),x.fillStyle="rgba(255,253,248,0.92)",x.fill(),x.fillStyle="#3d392f",x.textAlign="left",x.textBaseline="middle",x.fillText(y,f+20,m+h+u+19);const A=m+h+u*2;x.fillStyle="rgba(255,255,255,0.85)",x.fillRect(f,A+12,10,10),x.fillStyle="#3d392f",x.font='600 16px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',x.textAlign="left",x.textBaseline="alphabetic",x.fillText(`${r.emoji} ${r.label}`,f+18,A+23);const M=new Date().toLocaleString("zh-CN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return x.fillStyle="#6f6a5e",x.font='12px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',x.textAlign="right",x.fillText(M,p-f,A+23),x.fillStyle="#9a9486",x.font='11px "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',x.textAlign="left",x.fillText("虎鲸水族馆",f,A+46),x.textAlign="right",x.fillText(`#${r.stamp}`,p-f,A+46),_.toDataURL("image/jpeg",.88)}async function ov(s,t=220){const e=await Xc(s),n=t/e.width,i=document.createElement("canvas");return i.width=t,i.height=Math.max(1,Math.round(e.height*n)),i.getContext("2d").drawImage(e,0,0,i.width,i.height),i.toDataURL("image/jpeg",.72)}function av(){try{const s=localStorage.getItem(Wc);if(!s)return[];const t=JSON.parse(s);return Array.isArray(t)?t.filter(e=>e&&typeof e.id=="string"&&typeof e.dataURL=="string").slice(-pr):[]}catch{return[]}}function qc(s){try{localStorage.setItem(Wc,JSON.stringify(s.slice(-pr)))}catch{}}function lv(){const s=document.createElement("div");return s.className="orca-photo-flash",s}function Le(s,t,e){const n=document.createElement(s);return t&&(n.className=t),e!==void 0&&(n.textContent=e),n}async function cv(s){const t=window.xhs,e=t&&t.miniTool;if(!e||typeof e.saveImageToPhotosAlbum!="function")return"unsupported";try{let n=s;if(typeof e.writeTempFile=="function")try{const i=await e.writeTempFile({data:s});i&&typeof i.filePath=="string"&&i.filePath&&(n=i.filePath)}catch{}return await e.saveImageToPhotosAlbum({filePath:n}),"saved"}catch{return"failed"}}function hv(s){const t=Le("div","orca-photo-gallery");t.append(Le("div","orca-photo-gallery__label","📷 照片集"));const e=Le("div","orca-photo-gallery__scroll");t.append(e);const n=Le("div","orca-photo-modal"),i=Le("div","orca-photo-modal__panel"),r=Le("button","orca-photo-modal__close","×");r.type="button";const a=Le("img","orca-photo-modal__img");a.alt="水族馆照片",a.draggable=!1;const o=Le("div","orca-photo-modal__caption"),l=Le("div","orca-photo-modal__actions"),c=Le("button","orca-photo-modal__btn","保存到相册");c.type="button";const h=Le("button","orca-photo-modal__btn","删除");h.type="button",l.append(c,h);const u=Le("div","orca-photo-modal__hint","长按图片即可保存到相册，分享给朋友");i.append(r,a,o,l,u),n.append(i),document.body.appendChild(n);let f=null;const m=()=>{n.dataset.active="false",f=null};r.addEventListener("click",m),n.addEventListener("click",v=>{v.target===n&&m()});const g="长按图片即可保存到相册，分享给朋友";let p=0;const d=v=>{u.textContent=v,window.clearTimeout(p),p=window.setTimeout(()=>{u.textContent=g},2600)};c.addEventListener("click",()=>{if(!f)return;cv(f.dataURL).then(b=>{d(b==="saved"?"已保存到相册":b==="failed"?"保存失败，长按图片也能保存":"长按图片即可保存到相册")})}),h.addEventListener("click",()=>{f&&(s.onDelete(f.id),m())});const _=v=>{f=v,a.src=v.dataURL;const b=Fn[v.quality];o.textContent=`${v.dateLabel} · ${b.emoji} ${b.label}`,n.dataset.active="true"};return{root:t,setVisible:v=>{t.style.display=v?"flex":"none"},render:v=>{e.innerHTML="";for(const b of v){const y=Fn[b.quality],w=Le("button","orca-photo-gallery__thumb");w.type="button",w.dataset.quality=b.quality,b.blurry&&(w.dataset.blurry="true"),w.title=`${y.emoji} ${y.label}`;const A=Le("img","orca-photo-gallery__thumb-img");A.src=b.thumbURL,A.alt=y.label,A.draggable=!1,w.append(A);const M=Le("span","orca-photo-gallery__badge",y.emoji);w.append(M);const T=Le("button","orca-photo-gallery__del","×");T.type="button",T.title="删除这张照片",T.addEventListener("click",R=>{R.stopPropagation(),s.onDelete(b.id)}),w.append(T),w.addEventListener("click",()=>_(b)),e.append(w)}setTimeout(()=>{e.scrollLeft=e.scrollWidth},60)},dispose:()=>{t.remove(),n.remove()}}}const uv=22,dv=15,fv=3.8,jc=.24,Zc=.48,pv=.4,fs=1,$c=.4,mv=.55,Jc=.85,gv=.5,xv=.9,vv=1,_v=.42,Kc=1.3,yv=-.15,bv=1.15,Mv=1.5,wv=-.5,Sv=.5,Tv=1.6,Ev=.3,Cv=.95,Av=1.2,Pv=1/24,Lv=48,Rv=2.5,Dv=5,Qc=1.2,Iv=6,Fv=.55,Ov=9,zv=2,Nv=.45,No=26,kv=4.5,Uv=16,Bv=72,Gv=1.4,th=.85,Hv={classic:"经典蓝",night:"星夜黑",pink:"草莓粉",green:"薄荷绿",gold:"土豪金"},Vv=Object.entries(ki).map(([s,t])=>{var e;return{id:s,label:(e=Hv[s])!=null?e:s,dark:"#"+t.dark.toString(16).padStart(6,"0"),white:"#"+t.white.toString(16).padStart(6,"0")}}),eh=["咔嚓！","就这样，别动～","抓拍一张 📸","嗯？在拍我吗","这个角度怎么样","灯光正好…"],nh=["耶！这张超好看！✨","我是最靓的崽~","完美出片！","好喜欢这张 💙"],ih=["哎呀，转过去啦~","尾巴也算出镜了吧","哼，不给看正面"],sh=["晃了一下，糊了糊了","嘻嘻，动感模糊","没稳住！再来一张？"],rh=["日常抓拍成功 📸","已存入相册~","咔嚓，下一张！"],Wv=["这枚 token 有点甜","token 到账，谢谢老板！","嗝，这枚是几 k 的？","我的上下文又长了一点","再来一枚，我还能吃","吃掉 token，变聪明了","谢谢你投喂我 token 💙","一枚 token，一次心跳","我记住你了，存进上下文了","这味道……是 128k 的吧"],oh=["这枚 token 沉底了…","没人吃？浪费 token 了","掉了一枚 token，心疼"],Xv=["我好像变大了一圈…","再喂下去，这个缸就装不下我了","参数变多了，游起来更带劲"],ah=["咕噜～","再摸一下嘛","好舒服…","尾巴别碰，痒！","今天也很可爱吧","我在这里呢 💙","摸摸头，长高高","要不要一起游一会儿"],Yv=["token！我正需要这个","谢谢，我的上下文又长了","这枚是给我写的吗","咔嚓咔嚓（方方的咀嚼声）","吃饱了好帮你干活"],qv=["呜～谢谢投喂","这枚 token 很新鲜","吃饱了就能好好回答了","啪叽啪叽（拍鳍）","下次还给我留一枚呀"],lh=["你好！有什么可以帮你的吗","让我想想……嗯，想不出来","这个问题的上下文有点长","我的 token 快用完了","我很有帮助！大概吧","作为一只小螃蟹，我还挺方的","嘘——我在思考","别捏我，我又不是橡皮鸭","需要我帮你写点什么吗","我同意！……我同意什么来着","这个提示词写得不错","咕噜咕噜（气泡音）","虎鲸说得对","我只是一段程序，但我很快乐"],ch=["咕噜咕噜～","我是海豹，不是海豚","斑纹是天生的，不是我画的","浮上来换口气先","这条思路，我接得住","让我帮你总结一下……汪？","别摸尾巴，痒！","权重全长在背上了","正在为你生成一段浪花…","我在很努力地当一只可爱海豹","要不要我帮你写点什么","虎鲸刚才顶了我一下","海里的上下文有点长","啪叽（拍鳍）"];class jv{constructor(t,e={}){Tt(this,"domElement");Tt(this,"quality");Tt(this,"renderer");Tt(this,"scene");Tt(this,"camera");Tt(this,"controls");Tt(this,"container");Tt(this,"toolbar");Tt(this,"shellToggle");Tt(this,"decorPicker");Tt(this,"toast");Tt(this,"photoFlash");Tt(this,"photoGallery");Tt(this,"photos",[]);Tt(this,"photoBusy",!1);Tt(this,"aquarium");Tt(this,"postfx");Tt(this,"orca");Tt(this,"decorGroup",new Vt);Tt(this,"raycaster",new E0);Tt(this,"pointer",new rt);Tt(this,"clock",new Vl);Tt(this,"elapsed",0);Tt(this,"save");Tt(this,"mode");Tt(this,"focusOpen");Tt(this,"background");Tt(this,"theme");Tt(this,"selectedDecor",null);Tt(this,"ghost",null);Tt(this,"feedItems",[]);Tt(this,"feedArmed",!1);Tt(this,"growth",1);Tt(this,"nosePoint",new E);Tt(this,"disposed",!1);Tt(this,"resizeObserver");Tt(this,"onContainerResize",()=>this.resize());Tt(this,"toastTimer",0);Tt(this,"ghostDragging",!1);Tt(this,"lastPointer",null);Tt(this,"pointerDownAt",null);Tt(this,"pointerDragged",!1);Tt(this,"orbitX",4.5);Tt(this,"orbitZ",3);Tt(this,"companionSideOffset",2.5);Tt(this,"sealSideOffset",2.5);Tt(this,"clawdFoodPull",0);Tt(this,"sealFoodPull",0);Tt(this,"frameSamples",0);Tt(this,"frameTimeSum",0);Tt(this,"degradeStep",0);Tt(this,"poseTimer",0);Tt(this,"poseTargetYaw",null);Tt(this,"poseAnchor",new E);Tt(this,"shakeTimer",0);Tt(this,"happyTimer",0);Tt(this,"thoughtEl",null);Tt(this,"thoughtUntil",0);Tt(this,"audio",gx());Tt(this,"clawd",null);Tt(this,"seal",null);Tt(this,"trail",[]);Tt(this,"followPoint",new E);Tt(this,"foodPoint",new E);Tt(this,"onKeyDown");Tt(this,"onVisibilityChange");Tt(this,"stopLoop");var i,r,a,o;Qx(),this.container=t,this.quality=(i=e.quality)!=null?i:yc(),this.save=fx(),this.growth=this.growthFor(this.save.growthFeeds),this.mode=e.focus===!1?"ambient":"interactive",this.focusOpen=(r=e.focus)!=null?r:!0,this.background=(a=e.background)!=null?a:e.focus===!1,this.theme=(o=e.theme)!=null?o:"deep",t.classList.add("orca-aquarium-root"),t.style.position="fixed",t.style.top="0",t.style.right="0",t.style.bottom="0",t.style.left="0",t.style.overflow="hidden",t.style.pointerEvents="none",t.style.touchAction="none",this.renderer=new yl({antialias:this.quality.tier!=="low",alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.quality.maxPixelRatio)),this.renderer.setSize(t.clientWidth||window.innerWidth,t.clientHeight||window.innerHeight),this.renderer.domElement.style.display="block",this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.renderer.domElement.style.pointerEvents="auto",this.renderer.domElement.style.touchAction="none",this.domElement=this.renderer.domElement,t.appendChild(this.domElement),this.scene=new Bm,this.camera=new $e(this.quality.tier==="low"?58:48,(t.clientWidth||window.innerWidth)/(t.clientHeight||window.innerHeight),.1,600),this.camera.position.set(0,3.9,13.5),this.controls=new R0(this.camera,this.renderer.domElement),this.controls.target.set(0,1.5,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.autoRotate=!0,this.controls.autoRotateSpeed=.6,this.controls.minDistance=11,this.controls.maxDistance=36,this.controls.maxPolarAngle=Math.PI*.55,this.controls.minPolarAngle=Math.PI*.15,this.controls.enablePan=!1,this.controls.touches={ONE:Be.ROTATE,TWO:Be.DOLLY_ROTATE},this.controls.update(),this.applyViewFit(),this.aquarium=jg(this.scene,this.theme,this.quality),this.postfx=ex(this.renderer,this.scene,this.camera,this.quality),this.postfx.setStrength(this.quality.bloom?this.save.bloomStrength:0),this.orca=J0(),this.orca.setSkin(this.save.skin),this.orca.group.position.set(0,this.orcaRestY(),0),this.orca.group.rotation.y=-.35,this.scene.add(this.orca.group),this.renderer.domElement.addEventListener("pointerenter",()=>{this.mode!=="ambient"&&this.orca.setBoost(.25)}),this.renderer.domElement.addEventListener("pointerleave",()=>this.orca.setBoost(0)),window.addEventListener("click",()=>{this.mode!=="ambient"&&this.orca.addClick()}),this.decorGroup.name="decor",this.scene.add(this.decorGroup),this.applyDecorPlacements(),this.toolbar=$x({onModeChange:l=>this.setMode(l),onThemeChange:l=>this.setTheme(l),onReset:()=>this.resetDecor(),onClose:()=>this.goBack(),onSelectDecor:l=>this.selectDecor(l),onPhoto:()=>{this.takePhoto()},onToggleMusic:()=>this.toggleMusic(),onFeed:()=>this.toggleFeedArmed(),onResetGrowth:()=>this.resetGrowth(),onToggleCompanion:()=>this.toggleCompanion(),onToggleSeal:()=>this.toggleSealCompanion(),onToggleOutlines:()=>this.toggleOutlines()},Object.values(ic).map(l=>({id:l.id,label:l.label,emoji:l.emoji}))),this.decorPicker=Jx({onSelectDecor:l=>this.selectDecor(l),onBloomChange:l=>this.setBloomStrength(l),onSkinChange:l=>this.setSkin(l),onRotateGhost:l=>this.rotateGhost(l),onClose:()=>this.setMode("interactive")},Do,this.save.bloomStrength,this.quality.bloom,Vv,this.save.skin),this.toast=document.createElement("div"),this.toast.className="orca-toast",t.appendChild(this.toolbar.root),t.appendChild(this.decorPicker),t.appendChild(this.toast),this.photoFlash=lv(),this.photoGallery=hv({onDelete:l=>this.deletePhoto(l)}),this.photos=av(),t.appendChild(this.photoFlash),t.appendChild(this.photoGallery.root),this.photoGallery.render(this.photos),this.shellToggle=Zx(()=>this.openFocus()),t.appendChild(this.shellToggle),this.toolbar.setActiveTheme(this.theme),this.onKeyDown=l=>{if(this.mode!=="ambient"){if(l.key==="Escape"&&this.feedArmed){this.setFeedArmed(!1),this.showToast("🪙 投喂已关闭，可以正常互动");return}(l.key===" "||l.key.toLowerCase()==="p")&&(l.preventDefault(),this.takePhoto())}},this.onVisibilityChange=()=>{this.clock.getDelta()},document.addEventListener("visibilitychange",this.onVisibilityChange);const n=()=>{this.audio.unlock(),this.save.music&&this.audio.setMusicEnabled(!0),window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)};window.addEventListener("pointerdown",n,{once:!0}),window.addEventListener("keydown",n,{once:!0}),this.toolbar.setMusicEnabled(this.save.music),this.save.companion&&this.setCompanion(!0),this.toolbar.setCompanionEnabled(this.save.companion),this.save.companionSeal&&this.setSealCompanion(!0),this.toolbar.setSealEnabled(this.save.companionSeal),this.setOutlines(this.save.outlines),this.bindEvents(),this.applyModeToDom(),this.startLoop()}setMode(t){this.mode=t,t!=="decorating"&&this.clearGhost(),t!=="interactive"&&this.setFeedArmed(!1),t==="ambient"&&this.orca.setBoost(0),this.applyModeToDom()}setTheme(t){this.theme=t,this.aquarium.setTheme(t),this.toolbar.setActiveTheme(t)}setBloomStrength(t){this.save.bloomStrength=Math.min(1.5,Math.max(0,t)),Ue(this.save),this.postfx.setStrength(this.save.bloomStrength)}setSkin(t){ki[t]&&(this.save.skin=t,Ue(this.save),this.orca.setSkin(t))}toggleMusic(){const t=!this.audio.isMusicEnabled();this.save.music=t,Ue(this.save),this.audio.setMusicEnabled(t),this.toolbar.setMusicEnabled(t),this.showToast(t?"🎵 音乐已开启":"🔇 音乐已关闭")}setCompanion(t){t&&!this.clawd&&(this.clawd=Mx(bv),this.clawd.setOutlines(this.save.outlines),this.scene.add(this.clawd.group),this.clawd.group.position.copy(this.orca.group.position),this.clawd.group.position.z-=Kc),this.clawd&&(this.clawd.group.visible=t),this.resetTrailIfIdle(),this.save.companion=t,Ue(this.save),this.toolbar.setCompanionEnabled(t),this.showToast(t?"🦀 Clawd 来啦":"🦀 Clawd 先回家了")}toggleCompanion(){this.setCompanion(!this.save.companion)}setSealCompanion(t){t&&!this.seal&&(this.seal=Ox(Mv),this.seal.setOutlines(this.save.outlines),this.scene.add(this.seal.group),this.seal.group.position.copy(this.orca.group.position),this.seal.group.position.z-=Kc),this.seal&&(this.seal.group.visible=t),this.resetTrailIfIdle(),this.save.companionSeal=t,Ue(this.save),this.toolbar.setSealEnabled(t),this.showToast(t?"🦭 Seal-GPT 来啦":"🦭 Seal-GPT 回海里啦")}toggleSealCompanion(){this.setSealCompanion(!this.save.companionSeal)}setOutlines(t){this.save.outlines=t,Ue(this.save),this.toolbar.setOutlinesEnabled(t),this.orca.setOutlines(t),this.clawd&&this.clawd.setOutlines(t),this.seal&&this.seal.setOutlines(t)}toggleOutlines(){this.setOutlines(!this.save.outlines),this.showToast(this.save.outlines?"🖊️ 描边开":"🖊️ 描边关")}resetTrailIfIdle(){var e,n;((e=this.clawd)==null?void 0:e.group.visible)===!0||((n=this.seal)==null?void 0:n.group.visible)===!0||(this.trail.length=0)}openFocus(){this.focusOpen=!0,this.setMode("interactive")}goBack(){if(this.mode==="decorating"){this.setMode("interactive");return}this.closeFocus()}closeFocus(){this.focusOpen=!1,this.setMode("ambient")}applyModeToDom(){const t=this.focusOpen||this.mode!=="ambient",e=this.mode==="ambient"&&this.background;this.domElement.style.pointerEvents=e?"none":"auto",this.controls.enabled=!e,this.controls.autoRotate=this.mode==="ambient",this.toolbar.root.style.display=t&&this.mode!=="decorating"?"flex":"none",this.photoGallery.setVisible(t&&this.mode!=="decorating"),this.decorPicker.style.display=this.mode==="decorating"?"block":"none",this.shellToggle&&(this.shellToggle.style.display=t||this.background?"none":"block"),t||this.clearGhost()}showToast(t){this.toast.textContent=t,this.toast.dataset.show="true",window.clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{this.toast.dataset.show="false"},1800)}bindEvents(){typeof ResizeObserver=="function"?(this.resizeObserver=new ResizeObserver(this.onContainerResize),this.resizeObserver.observe(this.container)):window.addEventListener("resize",this.onContainerResize),window.addEventListener("keydown",this.onKeyDown),this.renderer.domElement.addEventListener("pointerdown",e=>{if(this.mode!=="ambient"&&(this.pointerFromEvent(e),this.pointerDownAt={x:e.clientX,y:e.clientY},this.pointerDragged=!1,this.mode==="decorating")){if(this.ghostDragging=!0,this.lastPointer={x:e.clientX,y:e.clientY},this.updateGhost(),e.button===2){this.removeDecorAtPointer();return}if(this.selectedDecor){this.placeSelectedDecor(e);return}return}}),this.renderer.domElement.addEventListener("pointerup",e=>{if(this.mode!=="interactive"||this.pointerDragged||!this.pointerDownAt)return;const n=Math.hypot(e.clientX-this.pointerDownAt.x,e.clientY-this.pointerDownAt.y);if(this.pointerDownAt=null,!(n>6)){if(this.pointerFromEvent(e),this.feedArmed){if(this.feedAtPointer())return;this.showToast("🪙 点一下虎鲸、Clawd 或海豹才能投喂");return}this.petCompanion()||this.petSeal()||this.petOrca()}}),this.renderer.domElement.addEventListener("pointermove",e=>{this.pointerDownAt&&Math.hypot(e.clientX-this.pointerDownAt.x,e.clientY-this.pointerDownAt.y)>6&&(this.pointerDragged=!0),this.mode==="decorating"&&(this.pointerFromEvent(e),this.ghostDragging&&this.lastPointer&&e.pointerType!=="mouse"&&this.rotateGhost((e.clientX-this.lastPointer.x)*.006),this.lastPointer&&(this.lastPointer={x:e.clientX,y:e.clientY}),this.updateGhost())});const t=()=>{this.ghostDragging=!1,this.lastPointer=null,this.pointerDownAt=null};this.renderer.domElement.addEventListener("pointerup",t),this.renderer.domElement.addEventListener("pointercancel",t),this.renderer.domElement.addEventListener("wheel",e=>{this.mode!=="decorating"||!this.ghost||(e.preventDefault(),this.rotateGhost(e.deltaY>0?-.35:.35))},{passive:!1}),this.renderer.domElement.addEventListener("contextmenu",e=>{this.mode==="decorating"&&e.preventDefault()})}rotateGhost(t){this.ghost&&(this.ghost.rotation.y+=t)}pointerFromEvent(t){const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1}resize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.applyViewFit(),this.renderer.setSize(t,e),this.postfx.setSize(t,e)}noteFrame(t){if(this.degradeStep>=2||this.elapsed<Rv||!(t>0)||t>.5||(this.frameSamples+=1,this.frameTimeSum+=t,this.frameSamples<Lv))return;const e=this.frameTimeSum/this.frameSamples;this.frameSamples=0,this.frameTimeSum=0,!(e<=Pv)&&this.degrade()}degrade(){this.degradeStep+=1,this.degradeStep===1?(this.renderer.setPixelRatio(1),this.postfx.setPixelRatio(1),this.resize()):this.postfx.bloom&&(this.postfx.bloom.enabled=!1),document.documentElement.dataset.perf=`degraded-${this.degradeStep}`}applyViewFit(){const t=this.camera.aspect;if(!Number.isFinite(t)||t<=0)return;const e=Math.atan2(kv,No),n=this.controls.target;let i=No*.4,r=No*.3;const a=m=>{this.camera.position.set(n.x,n.y+Math.sin(e)*m,n.z+Math.cos(e)*m),this.camera.updateMatrixWorld(!0);const g=i+2.4,p=r+2;for(const[d,_]of[[-g,-p],[g,-p],[-g,p],[g,p]]){const x=new E(n.x+d,this.orcaRestY()+fs+1.8,n.z+_).project(this.camera);if(Math.abs(x.x)>1/th||Math.abs(x.y)>1/th)return!1}return!0};let o=Uv,l=Bv;if(a(o))l=o;else for(let m=0;m<24;m++){const g=(o+l)/2;a(g)?l=g:o=g}this.camera.position.set(n.x,n.y+Math.sin(e)*l+Gv,n.z+Math.cos(e)*l);const c=Math.max(1,l-r),h=this.camera.fov*Math.PI/180,u=Math.tan(h/2)*c,f=u*t;i=Math.min(12,Math.max(4,f*.7)),r=Math.min(9,Math.max(2.5,u*.38)),this.orbitX=i,this.orbitZ=r,this.companionSideOffset=Math.max(1.5,f*_v),this.sealSideOffset=Math.max(1.5,f*Sv),this.controls.minDistance=Math.max(10,l*.55),this.controls.maxDistance=Math.max(34,l*1.4),this.controls.update()}sampleTrail(t,e){const n=t-e;let i=this.trail[0];for(const r of this.trail)if(r.t<=n)i=r;else break;return i}growthFor(t){return 1+Fv*(1-Math.exp(-Math.max(0,t)/Ov))}orcaRestY(){return fv+(this.growth-1)*zv}noseReach(){return Math.abs(this.orca.bodySwept.xs[0]*this.orca.bodyScale)*this.growth}updateNosePoint(){const t=this.orca.bodySwept.xs[0]*this.orca.bodyScale*this.growth,e=this.orca.group.rotation.y,n=this.orca.group.position;return this.nosePoint.set(n.x+Math.cos(e)*t,n.y,n.z-Math.sin(e)*t),this.nosePoint}feed(t,e="orca"){if(this.mode==="ambient")return;this.mode==="decorating"&&this.setMode("interactive");const n=t!=null?t:this.orca.group.position,i=new E(n.x+(Math.random()-.5)*Qc,Math.max(n.y,this.orcaRestY())+Dv,n.z+(Math.random()-.5)*Qc),r=Math.max(Te(i.x,i.z)+.7,this.orcaRestY()-fs),a=Math.atan2(this.camera.position.x-i.x,this.camera.position.z-i.z),o=jx(i,r,a,e);for(this.scene.add(o.group),this.feedItems.push(o);this.feedItems.length>Iv;)this.removeToken(this.feedItems[0]);this.audio.playCoin(),this.audio.playBubble(),this.spawnBubbleBurst(5)}toggleFeedArmed(){this.mode!=="ambient"&&(this.mode==="decorating"&&this.setMode("interactive"),this.setFeedArmed(!this.feedArmed),this.showToast(this.feedArmed?"🪙 点一下虎鲸 / Clawd / 海豹，把 token 喂给它":"🪙 投喂已关闭，可以正常互动"),this.feedArmed&&this.audio.playClicks())}setFeedArmed(t){this.feedArmed!==t&&(this.feedArmed=t,this.toolbar.setFeedArmed(t),this.domElement.style.cursor=t?"crosshair":"")}feedAtPointer(){if(this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObject(this.orca.group,!0).length>0)return this.feed(void 0,"orca"),!0;for(const[t,e]of[[this.clawd,"clawd"],[this.seal,"seal"]])if(!(!t||!t.group.visible)&&this.raycaster.intersectObject(t.group,!0).length>0)return this.feed(t.group.position.clone(),e),!0;return!1}removeToken(t){const e=this.feedItems.indexOf(t);e>=0&&this.feedItems.splice(e,1),this.scene.remove(t.group),t.dispose()}tokenCompanion(t){var e,n;return t.owner==="clawd"?(e=this.clawd)!=null&&e.group.visible?this.clawd:null:t.owner==="seal"&&(n=this.seal)!=null&&n.group.visible?this.seal:null}nearestToken(){let t=null,e=1/0;for(const n of this.feedItems){if(n.done||n.owner!=="orca"&&this.tokenCompanion(n))continue;const i=n.position.distanceToSquared(this.orca.group.position);i<e&&(e=i,t=n)}return t}companionFood(t,e){let n=null,i=1/0;for(const r of this.feedItems){if(r.done||r.consumed||r.owner!==t)continue;const a=r.position.distanceToSquared(e);a<i&&(i=a,n=r)}return n}pullFood(t,e,n,i){const r=this.companionFood(e,n),a=t+((r?1:0)-t)*this.expLerp(Ev,i);return r&&a>.001&&(this.foodPoint.set(r.position.x,Math.min(r.position.y,n.y+Av),r.position.z),n.lerp(this.foodPoint,a*Cv)),a}tokenReaches(t,e){const n=this.tokenCompanion(t);return n?n.group.position.distanceTo(t.position)<qx:e.distanceTo(t.position)<Yx}updateFeeding(t,e){if(this.feedItems.length===0)return;const n=this.updateNosePoint();let i=null,r=null;for(const a of this.feedItems)a.update(t,e),i===null&&!a.consumed&&this.tokenReaches(a,n)&&(a.consume(),i=a),r===null&&a.done&&!a.consumed&&(r=a);for(const a of[...this.feedItems])a.done&&this.removeToken(a);i?this.onTokenEaten(i):r&&this.showThought(oh[Math.floor(Math.random()*oh.length)],1400)}onTokenEaten(t){var r,a;this.save.lastFeedAt=Date.now(),this.audio.playMunch(),this.audio.playChime(),this.spawnBubbleBurst(6);const e=this.tokenCompanion(t);if(e){e.react(),t.owner==="clawd"?this.save.companionPets+=1:this.save.companionSealPets+=1,Ue(this.save);const o=t.owner==="clawd"?Yv:qv;this.showThought(o[Math.floor(Math.random()*o.length)],1600,e.group.position),this.showToast(t.owner==="clawd"?"🦀 Clawd 吃掉一枚 token":"🦭 Seal-GPT 吃掉一枚 token");return}this.save.feedCount+=1,this.save.growthFeeds+=1,Ue(this.save),this.happyTimer=.9,this.showToast(`🪙 吃掉一枚 token · 体型 ×${this.growthFor(this.save.growthFeeds).toFixed(2)}`);const i=this.save.growthFeeds%5===0?Xv:Wv;this.showThought(i[Math.floor(Math.random()*i.length)],1600),(r=this.clawd)==null||r.react(),(a=this.seal)==null||a.react()}resetGrowth(){if(this.save.growthFeeds===0){this.showToast("🐋 它已经是原来的大小啦");return}this.save.growthFeeds=0,Ue(this.save),this.audio.playChime(),this.showToast(`🐋 回到原来的大小（累计吃掉 ${this.save.feedCount} 枚 token）`),this.showThought("诶？我怎么变小了",1500)}petCompanion(){return!this.clawd||!this.clawd.group.visible||(this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObject(this.clawd.group,!0).length===0)?!1:(this.clawd.react(),this.save.companionPets+=1,Ue(this.save),this.audio.playClicks(),this.showThought(lh[Math.floor(Math.random()*lh.length)],1400,this.clawd.group.position),!0)}petSeal(){return!this.seal||!this.seal.group.visible||(this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObject(this.seal.group,!0).length===0)?!1:(this.seal.react(),this.save.companionSealPets+=1,Ue(this.save),this.audio.playClicks(),this.showThought(ch[Math.floor(Math.random()*ch.length)],1400,this.seal.group.position),!0)}petOrca(){this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObject(this.orca.group,!0).length!==0&&(this.happyTimer=.7,this.audio.playChime(),this.spawnBubbleBurst(4),this.showThought(ah[Math.floor(Math.random()*ah.length)],1400))}applyDecorPlacements(){for(const t of[...this.decorGroup.children])this.decorGroup.remove(t);for(const t of this.save.decor){if(!Fo(t.kindId))continue;const n=Io(t.kindId);n.position.set(t.x,Te(t.x,t.z),t.z),n.rotation.y=t.rotationY,n.userData.placement=t,this.decorGroup.add(n)}}selectDecor(t){this.clearGhost(),this.selectedDecor=t,this.ghost=Io(t),this.ghost.traverse(e=>{if(e.isMesh){const n=e;n.material=n.material.clone(),n.material.transparent=!0,n.material.opacity=.45,n.material.depthWrite=!1}}),this.ghost.visible=!1,this.scene.add(this.ghost),this.updatePickerActive()}clearGhost(){this.ghost&&(this.scene.remove(this.ghost),this.ghost=null),this.selectedDecor=null,this.updatePickerActive()}updatePickerActive(){for(const t of this.decorPicker.querySelectorAll("[data-kind]"))t.dataset.active=String(t.dataset.kind===this.selectedDecor)}groundPointFromPointer(){this.raycaster.setFromCamera(this.pointer,this.camera);const t=new Ln(new E(0,1,0),-Te(0,0)),e=new E;return!this.raycaster.ray.intersectPlane(t,e)||Math.abs(e.x)>uv||Math.abs(e.z)>dv?null:e}updateGhost(){if(!this.ghost)return;const t=this.groundPointFromPointer();if(!t){this.ghost.visible=!1;return}this.ghost.visible=!0,this.ghost.position.set(t.x,Te(t.x,t.z),t.z),this.collidesWithDecor(t.x,t.z)?this.ghost.traverse(e=>{e.isMesh&&e.material.color.setHex(16733542)}):this.ghost.traverse(e=>{e.isMesh&&e.material.color.setHex(16777215)})}collidesWithDecor(t,e){var r,a,o,l;const n=this.selectedDecor?Fo(this.selectedDecor):void 0,i=(r=n==null?void 0:n.radius)!=null?r:.6;for(const c of this.decorGroup.children){const h=c.position.x-t,u=c.position.z-e,f=Fo((o=(a=c.userData.placement)==null?void 0:a.kindId)!=null?o:""),m=(l=f==null?void 0:f.radius)!=null?l:.6;if(Math.hypot(h,u)<(i+m)*.75)return!0}return!1}placeSelectedDecor(t){if(!this.selectedDecor||!this.ghost)return;const e=this.groundPointFromPointer();if(!e)return;if(this.collidesWithDecor(e.x,e.z)){this.showToast("这里放不下，换一个位置试试");return}const n={kindId:this.selectedDecor,x:e.x,z:e.z,rotationY:this.ghost.rotation.y};this.save.decor.push(n),Ue(this.save);const i=Io(n.kindId);i.position.set(n.x,Te(n.x,n.z),n.z),i.rotation.y=n.rotationY,i.userData.placement=n,this.decorGroup.add(i),this.audio.playBubble(),this.showToast("已放置"),t.stopPropagation()}removeDecorAtPointer(){this.raycaster.setFromCamera(this.pointer,this.camera);const t=this.raycaster.intersectObject(this.decorGroup,!0);if(t.length===0)return;let e=t[0].object;for(;e.parent&&e.parent!==this.decorGroup;)e=e.parent;const n=e.userData.placement;n&&(this.decorGroup.remove(e),this.save.decor=this.save.decor.filter(i=>i!==n),Ue(this.save),this.showToast("已移除装饰"))}getSave(){return this.save}resetDecor(){this.save.decor=[],Ue(this.save),this.applyDecorPlacements(),this.clearGhost(),this.showToast("海底布置已清空")}delay(t){return new Promise(e=>window.setTimeout(e,t))}flashPhoto(t){this.photoFlash.dataset.tone=t,this.photoFlash.dataset.active="true",window.setTimeout(()=>{this.photoFlash.dataset.active="false"},180)}async takePhoto(){if(!this.photoBusy){this.photoBusy=!0;try{const t=tv(this.photos.length===0);if(this.poseAnchor.copy(this.orca.group.position),this.poseTimer=1,this.poseTargetYaw=this.orca.group.rotation.y,this.showThought(eh[Math.floor(Math.random()*eh.length)],900),await this.delay(330),this.flashPhoto("paper"),this.playShutter(),t==="turnaway"){const h=Math.atan2(this.camera.position.x-this.orca.group.position.x,this.camera.position.z-this.orca.group.position.z);this.poseTargetYaw=h+(Math.random()<.5?2.9:-2.9)}else t==="wiggle"?this.shakeTimer=.62:t==="splash"&&(this.spawnBubbleBurst(9),this.audio.playBubble());await this.delay(240);const n=this.postfx.capture(this.scene,this.camera).toDataURL("image/jpeg",.92),i=ev(this.orca.group,this.camera),r=t==="wiggle",a=await rv(n,i,this.theme,r),o=await ov(a),l=new Date,c={id:`${l.getTime()}-${Math.random().toString(36).slice(2,7)}`,dataURL:a,thumbURL:o,quality:i,theme:this.theme,label:r?`${Fn[i].label} · ${Vc.label}`:Fn[i].label,dateLabel:l.toLocaleString("zh-CN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),timestamp:l.getTime(),blurry:r};this.photos.push(c),this.photos.length>pr&&(this.photos=this.photos.slice(-pr)),qc(this.photos),this.photoGallery.render(this.photos),i==="perfect"||i==="closeup"?(this.happyTimer=.9,this.spawnBubbleBurst(5),this.playDing(),this.flashPhoto("gold"),this.showThought(nh[Math.floor(Math.random()*nh.length)],1600)):i==="back"?this.showThought(ih[Math.floor(Math.random()*ih.length)],1500):t==="wiggle"?this.showThought(sh[Math.floor(Math.random()*sh.length)],1500):this.showThought(rh[Math.floor(Math.random()*rh.length)],1400),this.showToast(`${Fn[i].emoji} 已存入照片集 · ${Fn[i].label}`)}catch{this.showToast("拍照失败，请重试")}finally{this.photoBusy=!1,this.poseTargetYaw=null,this.poseTimer=Math.min(this.poseTimer,.35)}}}deletePhoto(t){this.photos=this.photos.filter(e=>e.id!==t),qc(this.photos),this.photoGallery.render(this.photos),this.showToast("照片已删除")}showThought(t,e=1500,n){this.thoughtEl||(this.thoughtEl=document.createElement("div"),this.thoughtEl.className="orca-thought",this.container.appendChild(this.thoughtEl));const i=(n!=null?n:this.orca.group.position).clone().project(this.camera),r=window.innerWidth,a=window.innerHeight,o=(i.x*.5+.5)*r,l=(-i.y*.5+.5)*a-(n?90:150);this.thoughtEl.textContent=t,this.thoughtEl.style.left=`${Math.max(12,Math.min(r-240,o))}px`,this.thoughtEl.style.top=`${Math.max(12,Math.min(a-160,l))}px`,this.thoughtEl.dataset.show="true",this.thoughtUntil=performance.now()+e}spawnBubbleBurst(t=7){const e=this.orca.group.position.clone().project(this.camera);if(e.z>1||e.z<-1)return;const n=window.innerWidth,i=window.innerHeight,r=(e.x*.5+.5)*n,a=(-e.y*.5+.5)*i;for(let o=0;o<t;o++){const l=document.createElement("span");l.className="orca-dom-bubble";const c=8+Math.random()*14;l.style.width=`${c}px`,l.style.height=`${c}px`,l.style.left=`${r+(Math.random()-.5)*70}px`,l.style.top=`${a+(Math.random()-.5)*40}px`,this.container.appendChild(l),window.setTimeout(()=>l.remove(),1300)}}playShutter(){this.audio.playShutter()}playDing(){this.audio.playChime()}expLerp(t,e){return 1-Math.exp(-e/t)}lerpAngle(t,e,n){let i=(e-t)%(Math.PI*2);return i>Math.PI&&(i-=Math.PI*2),i<-Math.PI&&(i+=Math.PI*2),t+i*n}startLoop(){let t=0,e=0;const n=this.quality.idleFrameIntervalMs,i=r=>{var p,d,_;if(this.disposed)return;t=requestAnimationFrame(i);const a=document.hidden;if(a&&r-e<n)return;e=r;const o=this.clock.getDelta(),l=Math.min(o,.05);a||this.noteFrame(o),this.elapsed+=l;const c=this.elapsed,h=this.poseTimer>0;let u=0;if(h){this.poseTimer-=l;const x=Math.atan2(this.camera.position.z-this.orca.group.position.z,-(this.camera.position.x-this.orca.group.position.x)),v=(p=this.poseTargetYaw)!=null?p:x,b=this.expLerp(.12,l);this.orca.group.rotation.y=this.lerpAngle(this.orca.group.rotation.y,v,b),this.orca.group.position.lerp(this.poseAnchor,b),this.orca.group.position.y=this.poseAnchor.y+Math.sin(c*9)*.05,this.orca.group.rotation.z=Math.sin(c*12)*.04}else{const x=this.nearestToken(),v=this.orcaRestY(),b=1/this.growth,y=this.orbitX*Jc*b,w=this.orbitZ*Jc*b,A=x?Math.max(v-fs,Math.min(x.position.y,v+fs+1)):v+Math.sin(c*pv)*fs,M=this.followPoint;if(x){const K=x.position.x-this.orca.group.position.x,H=x.position.z-this.orca.group.position.z,O=Math.hypot(K,H)||1,F=this.noseReach();M.set(x.position.x-K/O*F,A,x.position.z-H/O*F)}else M.set(Math.sin(c*jc)*y,A,Math.cos(c*Zc)*w);this.orca.group.position.lerp(M,this.expLerp(mv,l));const T=x?x.position.x:Math.sin((c+$c)*jc)*y,R=x?x.position.z:Math.cos((c+$c)*Zc)*w,V=Math.atan2(R-this.orca.group.position.z,-(T-this.orca.group.position.x));this.orca.group.rotation.y=this.lerpAngle(this.orca.group.rotation.y,V,this.expLerp(gv,l)),u=Math.max(-.35,Math.min(.35,(this.orca.group.position.y-A)*xv))}h||this.controls.target.lerp(this.orca.group.position,this.expLerp(1.1,l));const f=((d=this.clawd)==null?void 0:d.group.visible)===!0,m=((_=this.seal)==null?void 0:_.group.visible)===!0;if(f||m){for(this.trail.push({x:this.orca.group.position.x,y:this.orca.group.position.y,z:this.orca.group.position.z,yaw:this.orca.group.rotation.y-Math.PI/2,t:c});this.trail.length>2&&c-this.trail[0].t>2;)this.trail.shift();const x=this.camera.position.x-this.controls.target.x,v=this.camera.position.z-this.controls.target.z,b=Math.hypot(x,v)||1,y=-v/b,w=x/b;if(this.clawd&&f){const A=this.sampleTrail(c,vv),M=this.companionSideOffset;this.followPoint.set(A.x+y*M,A.y+yv,A.z+w*M),this.clawdFoodPull=this.pullFood(this.clawdFoodPull,"clawd",this.followPoint,l),this.clawd.update(c,l,{position:this.followPoint,yaw:A.yaw})}if(this.seal&&m){const A=this.sampleTrail(c,Tv),M=this.sealSideOffset;this.followPoint.set(A.x-y*M,A.y+wv,A.z-w*M),this.sealFoodPull=this.pullFood(this.sealFoodPull,"seal",this.followPoint,l),this.seal.update(c,l,{position:this.followPoint,yaw:A.yaw})}}this.updateFeeding(c,l),this.shakeTimer>0&&(this.shakeTimer-=l,this.orca.group.rotation.y+=Math.sin(this.shakeTimer*36)*.85*Math.min(1,this.shakeTimer/.62)),this.growth+=(this.growthFor(this.save.growthFeeds)-this.growth)*this.expLerp(Nv,l);let g=this.growth;if(this.happyTimer>0){this.happyTimer-=l;const x=Math.sin(Math.min(1,1-this.happyTimer/.9)*Math.PI);g*=1+.05*x,this.orca.group.rotation.z+=Math.sin(c*16)*.07*x}this.orca.group.scale.setScalar(this.orca.update(c,l,{baseScale:g,divePitch:u})),this.orca.swimUniforms.uTime.value=c,this.thoughtEl&&this.thoughtUntil>0&&performance.now()>this.thoughtUntil&&(this.thoughtEl.dataset.show="false",this.thoughtUntil=0),this.aquarium.update(c,l,this.camera,this.orca.group.position),this.controls.update(),this.postfx.render(this.scene,this.camera)};t=requestAnimationFrame(i),this.stopLoop=()=>cancelAnimationFrame(t)}dispose(){var t,e,n,i,r;this.disposed=!0,(t=this.stopLoop)==null||t.call(this),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onContainerResize),document.removeEventListener("visibilitychange",this.onVisibilityChange),(e=this.resizeObserver)==null||e.disconnect(),this.aquarium.dispose(),this.postfx.dispose(),this.audio.dispose(),this.renderer.dispose(),this.toolbar.root.remove(),this.decorPicker.remove(),this.toast.remove(),this.photoGallery.dispose(),this.photoFlash.remove(),(n=this.thoughtEl)==null||n.remove(),this.shellToggle.remove(),(i=this.clawd)==null||i.dispose(),(r=this.seal)==null||r.dispose();for(const a of[...this.feedItems])this.removeToken(a);this.domElement.remove(),this.container.classList.remove("orca-aquarium-root")}}function Zv(){var s,t;try{const e=document.createElement("canvas"),n=(s=e.getContext("webgl2"))!=null?s:e.getContext("webgl");return n?((t=n.getExtension("WEBGL_lose_context"))==null||t.loseContext(),!0):!1}catch{return!1}}function $v(s,t={}){var i,r;const e=yc(),n=new jv(s,{focus:!1,background:!0,theme:(i=t.theme)!=null?i:"deep",quality:(r=t.quality)!=null?r:e});return document.documentElement.dataset.quality=e.tier,document.documentElement.dataset.touch=String(bc()),{app:n,dispose:()=>{try{n.dispose()}catch(a){console.error("[orca-backdrop] dispose failed",a)}}}}const Jv={mountOrca:$v,hasWebGL:Zv};typeof globalThis!="undefined"&&(globalThis.__OrcaAquarium=Jv)})();

    }).call(globalThis);
    // ---- end vendored orca-aquarium embed ----

    const API_KEY = '__OrcaAquarium';
    const SLOT = 'shell.overlay';
    const ENTRY_ID = 'orca-aquarium-backdrop';

    const BACKDROP_CLASS = 'orca-sea-backdrop';
    const SCENE_CLASS = 'orca-sea-scene';
    const INK_CLASS = 'orca-sea-ink';
    /** The drifting maple leaves — the references' warm counterpoint. */
    const LEAF_CLASS = 'orca-sea-leaf';
    /** The fine sparkle over the whole frame. */
    const MOTE_CLASS = 'orca-sea-mote';
    /** The corner warmth (warm bottom-right, cool top-left). */
    const GLOW_CLASS = 'orca-sea-glow';
    const FRAME_ATTR = 'data-orca-glass-frame';
    const PART_ATTR = 'data-orca-plate';
    /** The sidebar's inner root, which paints its own fill over the column. */
    const SIDEBAR_ROOT_ATTR = 'data-orca-sidebar-plate';
    const STYLE_ATTR = 'data-orca-skin-style';

    /**
     * The sea renders at the top tier.
     *
     * This must be a complete QualitySettings object, NOT the tier name. The
     * vendor's `mountOrca` does `options.quality ?? resolveQuality()`, so a
     * string silently replaces the whole resolved settings object, and then:
     *
     *   Math.min(devicePixelRatio, undefined) -> NaN
     *   Math.floor(cssWidth * NaN)            -> NaN
     *   canvas.width = NaN                    -> 0   (WebIDL unsigned long)
     *
     * i.e. a zero-pixel drawing buffer, so the scene never renders at all — and
     * because `quality.bloom` / `quality.colorGrade` are also undefined, the
     * bloom and colour-grade passes are skipped too. Every field below is
     * copied from the vendor's own `high` tier (src/client/quality.ts) so the
     * scene gets exactly the settings a standalone high-tier mount would.
     */
    const QUALITY = {
      tier: 'high',
      maxPixelRatio: 1.5,
      bloom: true,
      colorGrade: true,
      captureMaxWidth: 1920,
      captureMaxHeight: 1600,
      plankton: 1,
      fish: 1,
      bubble: 1,
      kelp: 1,
      coral: 1,
      starfish: 1,
      rock: 1,
      prop: 1,
      skyline: 1,
      idleFrameIntervalMs: 250,
    };

    /**
     * The followed camera, as an offset from the orca rather than an absolute
     * point: the animal patrols a path, so a fixed camera loses it. The eye sits
     * above and in front of it, at a distance that keeps the whole body in frame
     * on a wide canvas.
     */
    const CAMERA_Y = 3.2;
    const CAMERA_DISTANCE = 13.5;
    const CONTROLS_TARGET_Y = 1.6;

    /**
     * Ink artwork in the water, as a mask rather than a colour: one shape serves
     * both palettes and the tint stays in CSS. They sit in the sea layer, under
     * the plates, so they read as artwork in the water and never land on top of
     * text.
     *
     * The shapes are measured off the references, which do not draw fish: they
     * draw *carp and koi silhouettes* — a teardrop body, a forked twin-lobed
     * tail, two long barbels at the head, and paired fins — as flat dark shapes
     * over the gradient (夜间参考1 / c5 both carry them on the right half, and
     * 日间参考1 carries them in its wave band). A generic fish glyph would read
     * as clip-art next to those, so the tile carries the same anatomy at three
     * sizes and rotations, plus one lily pad and a reed cluster for variety.
     */
    const INK_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420' viewBox='0 0 420 420'><g fill='%23fff'>" +
      /* Large koi, angled up-right, with barbels and a forked tail. */
      "<g transform='translate(96 118) rotate(-18) scale(1.5)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 -8 C2 -18 8 -24 16 -22 L18 -8 Z'/>" +
      "<path d='M6 8 C2 18 8 24 16 22 L18 8 Z'/>" +
      "<path d='M-1 -3 C-9 -6 -14 -4 -16 0 C-14 4 -9 6 -1 3 Z'/>" +
      "</g>" +
      /* Small koi, mirrored, lower left. */
      "<g transform='translate(58 296) rotate(24) scale(.78)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 -8 C2 -18 8 -24 16 -22 L18 -8 Z'/>" +
      "</g>" +
      /* Mid koi, nearly level, upper right. */
      "<g transform='translate(236 52) rotate(8) scale(1.05)'>" +
      "<path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/>" +
      "<path d='M84 5 L104 -8 L100 5 L104 18 Z'/>" +
      "<path d='M6 8 C2 18 8 24 16 22 L18 8 Z'/>" +
      "<path d='M-1 -3 C-9 -6 -14 -4 -16 0 C-14 4 -9 6 -1 3 Z'/>" +
      "</g>" +
      /* Tiny fish pair, faint, mid right. */
      "<g transform='translate(300 226) rotate(-32) scale(.5)' opacity='.55'><path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/><path d='M84 5 L104 -8 L100 5 L104 18 Z'/></g>" +
      "<g transform='translate(348 286) rotate(16) scale(.42)' opacity='.45'><path d='M0 0 C14 -11 44 -13 66 -4 L74 -12 L71 -1 C84 3 84 9 71 11 L74 21 L66 12 C44 19 14 16 0 0 Z'/><path d='M84 5 L104 -8 L100 5 L104 18 Z'/></g>" +
      /* Lily pad with a notch, bottom centre — the 日间 reference's motif. */
      "<g transform='translate(168 344)' opacity='.7'><path d='M0 0 A34 34 0 1 1 34 -34 L10 -10 A24 24 0 1 0 -14 14 Z'/></g>" +
      /* Reed cluster, bottom right. */
      "<g transform='translate(246 356) rotate(-12)' opacity='.5'>" +
      "<path d='M0 40 C-2 20 2 6 10 -6 L14 -4 C6 8 4 22 6 40 Z'/>" +
      "<path d='M14 40 C12 24 18 12 28 2 L32 6 C22 14 18 26 20 40 Z'/>" +
      "<path d='M28 40 C26 28 34 18 46 12 L48 17 C38 22 32 30 34 40 Z'/>" +
      "</g>" +
      "</g></svg>\")";

    /**
     * Maple leaves, as a mask for the same reason the koi are: one shape serves
     * both palettes and the tint stays in CSS.
     *
     * This is the reference's loudest single effect. 夜间参考1 carries four big
     * amber maple leaves in its corners — the only warm thing in an otherwise
     * all-blue frame — and c5 repeats them down the left edge. They are what
     * stops the composition reading as "blue filter over a screenshot": warm
     * against cool is the whole colour idea, and the corners are where it lives.
     *
     * Drawn as a five-lobed maple with a stem, at four sizes/rotations. The
     * lobes are asymmetric on purpose (a symmetric star reads as clip-art; the
     * references' leaves are all slightly swept).
     */
    const LEAF_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='680' height='680' viewBox='0 0 680 680'><g fill='%23fff'>" +
      /* Big leaf, upper left, swept. */
      "<g transform='translate(64 96) rotate(-22) scale(2.6)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Mid leaf, right edge. */
      "<g transform='translate(596 196) rotate(38) scale(1.9)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Small leaf, lower left. */
      "<g transform='translate(126 566) rotate(14) scale(1.35)'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* Tiny leaf, lower right, faint. */
      "<g transform='translate(520 604) rotate(-48) scale(.95)' opacity='.6'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "<path d='M0 0 L0 14 L1.6 14 L1.2 0 Z'/>" +
      "</g>" +
      /* One drifting mid-frame, faint — the references have leaves over the art, not just at the rim. */
      "<g transform='translate(348 402) rotate(8) scale(.7)' opacity='.45'>" +
      "<path d='M0 0 L-3 -11 L-13 -9 L-8 -17 L-18 -21 L-8 -24 L-11 -33 L-2 -28 L0 -40 L2 -28 L11 -33 L8 -24 L18 -21 L8 -17 L13 -9 L3 -11 Z'/>" +
      "</g>" +
      "</g></svg>\")";

    /**
     * Drifting motes: the references' fine sparkle, which sits over everything
     * and is what makes the frame feel like air rather than a flat gradient.
     * Deliberately tiny and sparse — a dense field reads as noise.
     */
    const MOTE_TILE =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><g fill='%23fff'>" +
      "<circle cx='38' cy='52' r='1.5'/><circle cx='132' cy='26' r='1'/>" +
      "<circle cx='214' cy='88' r='1.8'/><circle cx='286' cy='44' r='1.1'/>" +
      "<circle cx='72' cy='148' r='1.2'/><circle cx='176' cy='126' r='1.6'/>" +
      "<circle cx='258' cy='182' r='1'/><circle cx='24' cy='226' r='1.7'/>" +
      "<circle cx='118' cy='248' r='1.1'/><circle cx='204' cy='286' r='1.4'/>" +
      "<circle cx='292' cy='244' r='1.2'/><circle cx='156' cy='196' r='.9'/>" +
      "</g></svg>\")";

    /**
     * The sidebar's wave damask — 水波纹.
     *
     * Generated rather than hand-drawn, because a tiling wave has two hard
     * constraints that are easy to get wrong by eye:
     *
     *   - The wave's period (60px) must divide the tile width (120px), or the
     *     left and right edges will not meet. Phase offsets are free: any phase
     *     still repeats as long as the period divides the width.
     *   - Rows must be spaced by a divisor of the tile height, AND the row at
     *     y=0 has to be drawn again at y=height. A crest that overshoots the
     *     tile's top edge is clipped, and only the duplicate at the bottom edge
     *     of the tile above puts the missing half back. Draw y=0 alone and you
     *     get a visible horizontal seam every 96px.
     *
     * Ripples alternate a firm crest against a faint, phase-inverted one, so
     * the pattern reads as overlapping water rather than six identical stripes.
     * Paths are drawn well outside the tile in x so the seam falls mid-wave
     * instead of on a path endpoint.
     *
     * @param {string} stroke Line colour, `#` percent-encoded.
     * @param {string} alpha  Stroke opacity; this is what makes it a 暗纹.
     * @returns {string} a CSS url() value.
     */
    function waveTile(stroke, alpha) {
      const TILE_W = 120;
      const TILE_H = 96;
      const HALF = 30;
      // 0 and 96 are the same row, seen from the two tiles that meet there.
      const rows = [0, 16, 32, 48, 64, 80, 96];
      let paths = '';
      for (let i = 0; i < rows.length; i++) {
        const y = rows[i];
        const firm = i % 2 === 0;
        const amp = firm ? 6 : 4.5;
        // The phase must key off the row's SLOT, not its index: y=0 and y=96
        // are the same ripple seen from two tiles, so if they disagreed the
        // join would show as a horizontal seam every 96px.
        const slot = i % 6;
        const x0 = (firm ? -70 : -40) + (slot * 8) % 30;
        let d = 'M' + x0 + ' ' + y +
          ' Q' + (x0 + HALF / 2) + ' ' + (y - amp) + ' ' + (x0 + HALF) + ' ' + y;
        // `T` mirrors the previous control point, so each segment flips the crest.
        for (let x = x0 + HALF * 2; x <= TILE_W + HALF * 2; x += HALF) {
          d += ' T' + x + ' ' + y;
        }
        paths += "<path d='" + d + "' stroke-width='" + (firm ? '1.15' : '.7') +
          "' opacity='" + (firm ? '1' : '.5') + "'/>";
      }
      return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='" +
        TILE_W + "' height='" + TILE_H + "'><g fill='none' stroke='" + stroke +
        "' stroke-opacity='" + alpha + "' stroke-linecap='round'>" + paths +
        "</g></svg>\")";
    }

    // Night: a faint light line engraved into a dark plate.
    const WAVE_TILE_NIGHT = waveTile('%23dceaf8', '.085');
    // Day: the same shape inverted — a faint dark line on a pale plate.
    const WAVE_TILE_DAY = waveTile('%232f5f7a', '.09');

    /**
     * The palette, as theme-service override tokens.
     *
     * `theme.overrideTokens` takes `token -> { light, dark }`, so the shell
     * resolves the scheme for us and no `!important` selector war is needed.
     *
     * Every value is SOLVED from the reference frames, and the alphas are
     * deliberately HIGH — this is the important part.
     *
     * The aquarium behind the app is a moving three.js scene whose water column
     * runs from #081e30 to #216484 across the frame and over time. A translucent
     * plate therefore does not paint its own colour; it paints `plate over
     * whatever the sea is doing right now`. Measured: a #4c648c wash at .30
     * lands anywhere from #1a4059 to #61859b depending on the moment, so the
     * app's colour drifted with the fish — that was the real reason the first
     * attempt still looked wrong.
     *
     * So the plates are near-opaque (they ARE the skin), and only `bg-base`
     * stays a translucent window onto the aquarium. Verified against the
     * reference fills: worst error 10/255 across all six plate surfaces.
     *
     *   night references:  row plate #4c648c · chip #455d7b · rail #3f4b63
     *                      text #eaf3fb · accent #5b9bc1
     *   day references  :  card #cfe7ed · chip #b1d5e1 · text #1d3348
     *                      accent #2f7d99
     */
    const SKIN_TOKENS = {
      /* ---- night: the ink-blue of 夜间参考1 / c5 ---- */
      // The window. Stays translucent on purpose: this is where the aquarium
      // shows through, and the only surface allowed to move with it.
      '--dsw-alias-bg-base': { dark: 'rgba(76,97,129,.30)', light: 'rgba(207,231,237,.34)' },
      // The skin proper: opaque enough to hold the reference plate colour
      // whatever the sea is doing.
      '--dsw-alias-bg-layer-1': { dark: 'rgba(76,100,140,.88)', light: 'rgba(215,238,243,.94)' },
      '--dsw-alias-bg-layer-2': { dark: 'rgba(69,93,123,.88)', light: 'rgba(180,216,228,.93)' },
      // Popovers stay dense: a menu must be read, not looked through.
      '--dsw-alias-bg-overlay': { dark: 'rgba(34,44,64,.97)', light: 'rgba(232,244,247,.96)' },
      '--dsw-specific-sidebar-fill': { dark: 'rgba(63,75,99,.90)', light: 'rgba(201,225,232,.94)' },
      '--dsw-alias-label-primary': { dark: '#eaf3fb', light: '#1d3348' },
      '--dsw-alias-label-secondary': { dark: '#c2d6ea', light: '#33566e' },
      '--dsw-alias-label-tertiary': { dark: '#93aecb', light: '#5b7789' },
      '--dsw-alias-label-caption': { dark: '#8aa5c2', light: '#6d8598' },
      '--dsw-alias-border-l1': { dark: 'rgba(176,208,240,.13)', light: 'rgba(29,51,72,.12)' },
      '--dsw-alias-border-l2': { dark: 'rgba(176,208,240,.20)', light: 'rgba(29,51,72,.18)' },
      '--dsw-alias-border-l3': { dark: 'rgba(176,208,240,.26)', light: 'rgba(29,51,72,.24)' },
      '--dsw-alias-interactive-bg-hover': { dark: 'rgba(160,186,207,.20)', light: 'rgba(29,51,72,.07)' },
      // The night reference's own cyan glow, measured off its centre-line
      // caption; the day reference's deeper teal from its rail circles.
      '--dsw-alias-brand-primary': { dark: '#5b9bc1', light: '#2f7d99' },
      '--dsw-alias-state-business-primary': { dark: '#5b9bc1', light: '#2f7d99' },

      /* ---- the `--dsw-specific-*` family ---- *
       *
       * These are the surfaces the *components* paint with, and they are not
       * part of the alias layer: the user bubble uses `--dsw-specific-bubble`,
       * menus use `--dsw-specific-menu`, the composer uses
       * `--dsw-specific-input-major`. Leaving them at the shell default was why
       * the chat bubbles and menus still looked like the stock app on top of a
       * recoloured shell — the skin simply did not reach them.
       *
       * The bubble is the important one. In the references every raised surface
       * is a *lighter* plate over the water (the selected row is #a6bfd3 over a
       * #4b658a field), so the bubble takes the reference's selected-plate value
       * rather than the stock pale-deepseek tint.
       */
      '--dsw-specific-bubble': { dark: 'rgba(88,114,152,.92)', light: 'rgba(196,220,227,.92)' },
      // The composer and composer-attached cards: one step deeper than a bubble
      // so an input reads as recessed while a sent message reads as raised.
      '--dsw-specific-input-major': { dark: 'rgba(58,78,108,.90)', light: 'rgba(207,231,237,.92)' },
      // Menus and the command palette: opaque enough to read over the aquarium.
      '--dsw-specific-menu': { dark: 'rgba(34,44,64,.97)', light: 'rgba(232,244,247,.97)' },
      // Combo/mode selectors: the reference's chip colour.
      '--dsw-specific-selector': { dark: 'rgba(69,93,123,.92)', light: 'rgba(177,213,225,.92)' },
      // Tooltip/tip surfaces: dense, and slightly warm-neutral so a tip does not
      // read as another card.
      '--dsw-specific-tip': { dark: 'rgba(28,38,56,.96)', light: 'rgba(45,64,84,.94)' },
      // Sidebar navigation states: the reference's rail highlight is a *sky*
      // wash, not a grey one, which is what makes the rail feel lit.
      '--dsw-specific-sidebar-nav-item-active': { dark: 'rgba(96,140,178,.34)', light: 'rgba(126,186,212,.34)' },
      '--dsw-specific-sidebar-nav-item-active-accent': { dark: '#7fc4e0', light: '#2f7d99' },
      '--dsw-specific-sidebar-nav-item-hover': { dark: 'rgba(150,190,222,.12)', light: 'rgba(29,51,72,.06)' },
    };

    /**
     * The structural half of the skin: the frame veil, the plate frost, the
     * sidebar art and the sea layer. These are not theme tokens, so they are
     * plain rules rather than `overrideTokens` entries.
     */
    const STYLE_TEXT = [
      // `html` keeps a base fill for the instant before the scene mounts; `body`
      // steps aside so the plates are the only layer over the water.
      'html{background:var(--dsw-alias-bg-base);}',
      'body{background:transparent!important;}',
      // The frame is the WINDOW onto the aquarium, and it is deliberately
      // almost bare. Two things drove the numbers:
      //
      //   1. The plates now carry the skin at ~.90 alpha, so the frame no
      //      longer needs to do any of the colour work.
      //   2. The frame spans the whole viewport, so every percent of veil here
      //      is a percent of the aquarium the user cannot see. Measured, the
      //      veil only ever *reduces* the orca-vs-water luminance delta (the
      //      vendor's `deep` theme starts at 11.9/255, which is already low;
      //      .30 takes it to 8.3 and the animal disappears into the water).
      //      So the veil is held to the lightest value that still tints.
      //
      // No backdrop-filter: that would blur the entire tank (see the header).
      '[', FRAME_ATTR, ']{',
      'background-color:rgba(52,74,102,.08)!important;',
      'background-image:',
      'linear-gradient(180deg,rgba(214,236,248,.08),rgba(214,236,248,0) 38%),',
      'linear-gradient(0deg,rgba(24,40,62,.10),rgba(24,40,62,0) 50%)!important;',
      '}',
      'body:not([data-ds-dark-theme]) [', FRAME_ATTR, ']{',
      'background-color:rgba(198,224,232,.14)!important;',
      '}',
      // Frost: deliberately NONE, and this is a fix, not an omission.
      //
      // `backdrop-filter` is not just a visual effect — it makes the element a
      // containing block for `position: fixed` descendants AND starts a new
      // stacking context. The sidebar and the bottom row both contain fixed
      // descendants (ui-primitives' Tooltip bubble is `position: fixed`), so
      // putting a backdrop-filter on those columns re-anchored every tooltip
      // from the viewport to the column's own padding box: the bubble's
      // `left`/`top` (computed in viewport coordinates) then painted offset by
      // the column's own origin and clipped by its `overflow: hidden`, which
      // lands a bubble on top of the brand row instead of beside its button.
      //
      // It also bought almost nothing visually: the plates are now .88–.94
      // opaque, so there is no see-through left to blur. Removing it keeps the
      // skin's colour work and drops a whole class of paint/positioning
      // hazards, so the shell's own chrome (brand mark, collapse toggle,
      // tooltips) lays out exactly as it does with no skin installed.
      //
      // Two glows, both measured: the top-left cyan the references use on their
      // brand corner, and a faint warm one from the lower right — the maple-leaf
      // and lantern light in 夜间参考1's corners.
      //
      // Under the glows sits the wave damask. It is the FIRST layer in the list
      // on purpose: `background-image` paints first-listed on top, so the ripples
      // stay crisp instead of being veiled by the two glows — an engraved line
      // that a wash has passed over just looks like a smudge. Faintness is
      // carried by the tile's own stroke-opacity, not by stacking it lower.
      // `background-size` and `background-repeat` are spelled out per layer
      // because a bare `repeat` would also tile the three gradients — and a tiled
      // radial glow is instantly visible as a grid.
      '[', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
      WAVE_TILE_NIGHT + ',',
      'radial-gradient(130% 34% at 0% 0%,rgba(120,205,235,.22),rgba(120,205,235,0) 62%),',
      'radial-gradient(90% 40% at 100% 100%,rgba(216,138,92,.10),rgba(216,138,92,0) 60%),',
      'linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0) 52%)!important;',
      'background-size:120px 96px,auto,auto,auto!important;',
      'background-repeat:repeat,no-repeat,no-repeat,no-repeat!important;',
      'background-position:0 0,0 0,0 0,0 0!important;',
      '}',
      'body:not([data-ds-dark-theme]) [', SIDEBAR_ROOT_ATTR, ']{',
      'background-image:',
      WAVE_TILE_DAY + ',',
      'radial-gradient(130% 34% at 0% 0%,rgba(94,186,214,.28),rgba(94,186,214,0) 62%),',
      'radial-gradient(90% 40% at 100% 100%,rgba(214,150,104,.12),rgba(214,150,104,0) 60%),',
      'linear-gradient(180deg,rgba(255,255,255,.30),rgba(255,255,255,0) 52%)!important;',
      '}',
      // The sea layer: the vendor's scene, plus the ink artwork over it.
      //
      // There is deliberately NO colour wash and NO light-shaft layer here.
      //  - A wash on top of the scene is a second veil on top of the frame's,
      //    and the two together washed the orca into the water (measured: orca
      //    vs water luminance delta 8/255 at the combined alpha). The vendor's
      //    own theme already decides the water's colour; the skin's job is the
      //    plates, not a tint on the artwork.
      //  - The vendor already draws a 15-beam god-ray fan in the water column
      //    (godRays.ts). Painting a second fan would double it.
      //
      // So the sea is left alone, and the only thing the skin adds over it is
      // the faint ink artwork — which sits under the plates and never on text.
      '.', BACKDROP_CLASS, '{',
      'position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;',
      '--orca-ink:rgba(214,236,248,.16);',
      // The leaves are the one warm thing in the frame, so they stay saturated
      // and sit above the water's own blue. Sampled from 夜间参考1's corners
      // (#e08c3c..#f5a44e), not invented.
      '--orca-leaf:rgba(228,140,72,.30);',
      '--orca-mote:rgba(226,242,255,.55);',
      '--orca-glow-warm:rgba(238,164,88,.16);',
      '--orca-glow-cool:rgba(120,196,232,.13);',
      '}',
      'body:not([data-ds-dark-theme]) .', BACKDROP_CLASS, '{',
      '--orca-ink:rgba(22,58,84,.11);',
      // Daylight: leaves stay warm but thin out, and the glow turns into haze.
      '--orca-leaf:rgba(214,132,68,.22);',
      '--orca-mote:rgba(255,255,255,.70);',
      '--orca-glow-warm:rgba(246,196,132,.20);',
      '--orca-glow-cool:rgba(150,214,238,.20);',
      '}',
      '.', SCENE_CLASS, '{position:absolute;inset:0;}',
      '.', INK_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-ink);',
      '-webkit-mask-image:', INK_TILE, ';mask-image:', INK_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:420px 420px;mask-size:420px 420px;',
      '}',
      // The maple leaves: the references' warm counterpoint to an all-blue
      // frame, and the single strongest thing the stock app does not have.
      // Painted above the ink so a leaf reads as nearer than a koi, and under
      // the plates so it never lands on text. `screen`-free: a plain mask keeps
      // it cheap and lets the two palettes pick their own tint.
      '.', LEAF_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-leaf);',
      '-webkit-mask-image:', LEAF_TILE, ';mask-image:', LEAF_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:680px 680px;mask-size:680px 680px;',
      // A very slow drift, so the frame is alive without ever being busy. The
      // 0.001 x-shift is deliberate: leaves fall, they do not travel sideways.
      'animation:orca-leaf-drift 64s linear infinite;',
      'will-change:transform;',
      '}',
      '@keyframes orca-leaf-drift{',
      'from{transform:translate3d(0,-680px,0);}',
      'to{transform:translate3d(38px,0,0);}',
      '}',
      // The sparkle. Two layers at different phases so the twinkle never
      // pulses in lockstep, which is what makes a plain loop read as a loop.
      '.', MOTE_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-color:var(--orca-mote);',
      '-webkit-mask-image:', MOTE_TILE, ';mask-image:', MOTE_TILE, ';',
      '-webkit-mask-repeat:repeat;mask-repeat:repeat;',
      '-webkit-mask-size:320px 320px;mask-size:320px 320px;',
      'animation:orca-mote-drift 38s linear infinite,orca-mote-twinkle 5.5s ease-in-out infinite alternate;',
      '}',
      '@keyframes orca-mote-drift{',
      'from{transform:translate3d(0,0,0);}',
      'to{transform:translate3d(-320px,-320px,0);}',
      '}',
      '@keyframes orca-mote-twinkle{',
      'from{opacity:.45;}to{opacity:1;}',
      '}',
      // The corner warmth. The references are lit from a warm bottom-right
      // corner (夜间参考1's lantern glow, c3's cyan pool); this is that light
      // as a paint layer rather than a filter, so it costs nothing per frame.
      '.', GLOW_CLASS, '{',
      'position:absolute;inset:0;pointer-events:none;',
      'background-image:',
      'radial-gradient(58% 46% at 100% 100%,var(--orca-glow-warm),transparent 68%),',
      'radial-gradient(46% 40% at 0% 0%,var(--orca-glow-cool),transparent 66%);',
      '}',
      // Reduced motion: the whole point of these layers is slow ambient drift,
      // so honouring the preference means freezing them rather than removing
      // them — the colour stays, the movement stops.
      '@media (prefers-reduced-motion:reduce){',
      '.', LEAF_CLASS, ',', '.', MOTE_CLASS, '{animation:none;}',
      '}',
    ].join('');

    /** The vendor IIFE installed on the page by the inline block above. */
    function vendorApi() {
      const api = globalThis[API_KEY];
      if (api === null || typeof api !== 'object') return null;
      return typeof api.mountOrca === 'function' ? api : null;
    }

    /** Snapshot one `<html>` data attribute the vendor rewrites while mounted. */
    function snapshotDataAttribute(element, key) {
      return { key: key, value: element.dataset[key] };
    }

    function restoreDataAttribute(element, snapshot) {
      if (snapshot.value === undefined) delete element.dataset[snapshot.key];
      else element.dataset[snapshot.key] = snapshot.value;
    }

    /**
     * The frame is found through the stable hook the layout owns — `data-shell-overlay`
     * is one of the frame's own children — instead of its hashed class name, so
     * tagging survives rebuilds. Children are tagged by position: the layout renders
     * the sidebar first, and the bottom row carries its own stable hook. Tagging
     * adds attributes and changes no structure; the cleanup removes them again.
     *
     * The sidebar's *inner* root is tagged too: it paints its own fill, so it is
     * the element the sidebar art belongs to.
     *
     * @returns {Element[]} the tagged elements, for cleanup.
     */
    function tagPlates() {
      const overlay = document.querySelector('[data-shell-overlay]');
      const frame = overlay === null ? null : overlay.parentElement;
      if (frame === null) return [];

      frame.setAttribute(FRAME_ATTR, '');
      const tagged = [];
      const children = Array.prototype.slice.call(frame.children);
      children.forEach(function (child, index) {
        if (child.hasAttribute('data-shell-overlay')) return;
        if (child.hasAttribute('data-shell-bottom')) {
          child.setAttribute(PART_ATTR, 'bottom');
          tagged.push(child);
          return;
        }
        if (index === 0) {
          child.setAttribute(PART_ATTR, 'sidebar');
          tagged.push(child);
          // The sidebar's inner root is the first descendant that fills the column.
          const inner = child.firstElementChild;
          if (inner !== null) {
            inner.setAttribute(SIDEBAR_ROOT_ATTR, '');
            tagged.push(inner);
          }
        }
      });
      return tagged;
    }

    /**
     * Frame the orca for a wide window — and keep framing it.
     *
     * The vendor's `applyViewFit()` solves a camera distance for the window aspect,
     * then leaves `autoRotate` running and clamps `orbitX` at 12 — on a wide canvas
     * the animal drifts to the edge and shrinks to a few pixels. Worse, every
     * `resize()` re-runs the fit and resets the camera, so pinning once is not
     * enough.
     *
     * The orca also swims: it patrols a path, so a fixed camera loses it. The shot
     * therefore *follows* the animal — camera kept at a fixed offset ahead of it —
     * which reads as a composed backdrop rather than a moving target, and survives
     * the vendor's own resize refits.
     *
     * @param {object} app the vendor instance returned by `mountOrca`.
     * @returns {() => void} stop the follow loop.
     */
    function frameOrca(app) {
      const camera = app.camera;
      const controls = app.controls;
      const orca = app.orca;
      if (camera === undefined || controls === undefined) return function () {};

      // Damping makes OrbitControls recompute the position from its own internal
      // spherical state every `update()`, which fights a followed camera and shows
      // up as a jittering backdrop. Off, so the position set below is the truth.
      controls.enableDamping = false;
      controls.autoRotate = false;
      let raf = 0;

      /** The animal's world position, or null while it does not exist yet. */
      function orcaPosition() {
        if (orca === undefined || orca === null || orca.group === undefined) return null;
        const position = orca.group.position;
        if (position === undefined) return null;
        return position;
      }

      function follow() {
        const animal = orcaPosition();
        if (animal !== null) {
          // Offset ahead of and above the animal: close enough to read its shape,
          // far enough to keep the whole body in frame on a wide canvas.
          camera.position.set(animal.x, animal.y + CAMERA_Y, animal.z + CAMERA_DISTANCE);
          controls.target.set(animal.x, animal.y + CONTROLS_TARGET_Y, animal.z);
          if (typeof camera.lookAt === 'function') {
            camera.lookAt(controls.target.x, controls.target.y, controls.target.z);
          }
        } else {
          camera.position.set(0, CAMERA_Y, CAMERA_DISTANCE);
          controls.target.set(0, CONTROLS_TARGET_Y, 0);
          if (typeof camera.lookAt === 'function') camera.lookAt(0, CONTROLS_TARGET_Y, 0);
        }
        raf = requestAnimationFrame(follow);
      }

      follow();

      return function stop() {
        if (raf !== 0) cancelAnimationFrame(raf);
        raf = 0;
      };
    }

    /**
     * The vendor theme that matches the shell's current colour scheme.
     *
     * `ui-theme` writes the scheme as `document.body[data-ds-dark-theme]`
     * (boot-theme.ts, then ThemePresenter), so this reads the same attribute
     * the stylesheet keys off — one source of truth for both halves of the skin.
     */
    function seaThemeForScheme() {
      return document.body.hasAttribute('data-ds-dark-theme') ? 'deep' : 'tropical';
    }

    /**
     * Keep the sea's theme following the shell's scheme.
     *
     * The scheme is a user preference, not a boot constant: `ui-theme` toggles
     * the attribute on `<body>` while the app is running. Without this, flipping
     * to light leaves a night ocean behind a day UI (and vice versa), which is
     * exactly the kind of mismatch a "skin" must not have.
     *
     * `app.setTheme` re-derives the water column, fog, god rays, seabed, fish,
     * plankton and bubbles from the theme record, so one call is the whole
     * swap — no scene rebuild.
     *
     * @param {object} app the vendor instance returned by `mountOrca`.
     * @returns {() => void} stop watching.
     */
    function watchScheme(app) {
      let current = seaThemeForScheme();
      if (typeof MutationObserver !== 'function') return function () {};
      const observer = new MutationObserver(function () {
        const next = seaThemeForScheme();
        if (next === current) return;
        current = next;
        try {
          app.setTheme(next);
        } catch (error) {
          console.error('[orca-aquarium-backdrop] could not switch the sea theme', error);
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-ds-dark-theme'],
      });
      return function stop() {
        observer.disconnect();
      };
    }

    /**
     * Own the sea layer behind the app: the scene inside it, the ink artwork, the
     * plate tags and the two `<html>` quality attributes the vendor writes.
     *
     * The layer is a body child on purpose. The one frame-wide seat the slot
     * system offers (`shell.overlay`) renders *above* every column, so a scene
     * mounted there can only tint the UI — it can never be looked through.
     *
     * @returns {{ cleanup: () => void, state: object }} cleanup plus the runtime
     * facts the diagnostics entry reports.
     */
    function mountBackdrop() {
      const state = {
        webgl: false,
        mounted: false,
        canvases: 0,
        frame: false,
        sidebarRoot: false,
        bodyBg: '',
        rootBg: '',
        frameBg: '',
        sidebarBg: '',
        sidebarRootBg: '',
        cameraZ: '',
        cameraToOrca: '',
        quality: '',
        canvasBox: '',
      };
      const api = vendorApi();
      if (api === null) return { cleanup: function () {}, state: state };

      state.webgl = api.hasWebGL();
      if (!state.webgl) return { cleanup: function () {}, state: state };

      const documentElement = document.documentElement;
      const previous = ['quality', 'touch'].map(function (key) {
        return snapshotDataAttribute(documentElement, key);
      });

      const layer = document.createElement('div');
      layer.className = BACKDROP_CLASS;
      layer.setAttribute('data-orca-backdrop', '');
      layer.setAttribute('aria-hidden', 'true');

      const sceneHost = document.createElement('div');
      sceneHost.className = SCENE_CLASS;

      const ink = document.createElement('div');
      ink.className = INK_CLASS;

      const glow = document.createElement('div');
      glow.className = GLOW_CLASS;

      const leaf = document.createElement('div');
      leaf.className = LEAF_CLASS;

      const mote = document.createElement('div');
      mote.className = MOTE_CLASS;

      // Bottom to top, and the order is the depth order the references use:
      //   scene  — the aquarium
      //   glow   — the corner light that sits *in* the water
      //   ink    — the koi silhouettes, which read as far away
      //   leaf   — the leaves, which read as near (they drift across the art)
      //   mote   — the fine sparkle, which is the closest thing of all
      // No colour wash: the vendor's theme owns the water, and a second veil
      // over it washed the orca out. Every child is inside the same
      // click-through layer, so the app above is untouched.
      layer.append(sceneHost, glow, ink, leaf, mote);
      document.body.appendChild(layer);

      let scene = null;
      let unpinCamera = null;
      let stopThemeWatch = function () {};
      try {
        // Ambient background mode. `QUALITY` is a full settings object: the
        // vendor substitutes whatever it is given for its own resolved tier,
        // so a bare tier name would zero the drawing buffer (see QUALITY).
        //
        // The theme is the *shell's* scheme's theme. The vendor ships three:
        // `iceberg` (bright overcast column, light top to light bottom),
        // `tropical` (clear teal lagoon, dark top and bright bottom) and `deep`
        // (night column, dark top and only slightly lighter at the bottom).
        // The night reference is a dark desaturated ink-blue, so `deep` is its
        // match; the day reference is a bright pale-cyan lagoon with the bright
        // band low in the frame, which is `tropical`.
        scene = api.mountOrca(sceneHost, {
          quality: QUALITY,
          theme: seaThemeForScheme(),
        });
        state.mounted = scene !== null;
        if (scene !== null && scene.app !== undefined) {
          unpinCamera = frameOrca(scene.app);
          // The scheme is a user preference the shell writes to
          // `body[data-ds-dark-theme]` at runtime, so the sea has to follow it
          // or a light/dark switch leaves a night ocean under a day UI.
          stopThemeWatch = watchScheme(scene.app);
        }
      } catch (error) {
        console.error('[orca-aquarium-backdrop] could not start the backdrop', error);
      }

      const plates = tagPlates();
      state.frame = document.querySelector('[' + FRAME_ATTR + ']') !== null;
      state.sidebarRoot = document.querySelector('[' + SIDEBAR_ROOT_ATTR + ']') !== null;
      state.canvases = layer.querySelectorAll('canvas').length;

      // Computed colours, not variables: these are what actually paint, and they
      // are what tells a stacked fill apart from a real compositing bug.
      try {
        const frame = document.querySelector('[' + FRAME_ATTR + ']');
        const sidebar = frame === null ? null : frame.querySelector('[' + PART_ATTR + '=sidebar]');
        const sidebarRoot = document.querySelector('[' + SIDEBAR_ROOT_ATTR + ']');
        const root = document.getElementById('root');
        const canvas = layer.querySelector('canvas');
        const camera = scene !== null && scene.app !== undefined ? scene.app.camera : undefined;
        const animal =
          scene !== null && scene.app !== undefined && scene.app.orca !== undefined
            ? scene.app.orca.group.position
            : null;
        state.bodyBg = getComputedStyle(document.body).backgroundColor;
        state.rootBg = root === null ? 'no-root' : getComputedStyle(root).backgroundColor;
        state.frameBg = frame === null ? 'no-frame' : getComputedStyle(frame).backgroundColor;
        state.sidebarBg = sidebar === null ? 'no-sidebar' : getComputedStyle(sidebar).backgroundColor;
        state.sidebarRootBg =
          sidebarRoot === null ? 'no-sidebar-root' : getComputedStyle(sidebarRoot).backgroundImage;
        state.cameraZ = camera === undefined ? 'no-camera' : String(Math.round(camera.position.z * 10) / 10);
        state.cameraToOrca =
          camera === undefined || animal === null
            ? 'no-orca'
            : String(
                Math.round(
                  Math.hypot(camera.position.x - animal.x, camera.position.z - animal.z) * 10,
                ) / 10,
              );
        state.quality = documentElement.dataset.quality || 'unset';
        // The canvas's *drawing buffer* size, not its CSS box. These diverge
        // exactly when the pixel ratio is bad, and a zero here is what a
        // mistyped quality option looks like: the CSS box can be a healthy
        // 1280x800 while the buffer is 0 and nothing renders.
        state.canvasBox =
          canvas === null
            ? 'no-canvas'
            : canvas.width + 'x' + canvas.height;
      } catch (error) {
        state.bodyBg = 'unreadable';
      }

      return {
        state: state,
        cleanup: function cleanup() {
          // The observer first: it holds a reference to `app`, and it must stop
          // firing before the scene it drives is torn down.
          if (typeof stopThemeWatch === 'function') {
            try {
              stopThemeWatch();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] could not stop the theme watch', error);
            }
            stopThemeWatch = function () {};
          }
          if (typeof unpinCamera === 'function') {
            try {
              unpinCamera();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] could not stop the camera loop', error);
            }
            unpinCamera = null;
          }
          if (scene !== null) {
            try {
              scene.dispose();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] dispose failed', error);
            }
            scene = null;
          }
          plates.forEach(function (plate) {
            plate.removeAttribute(PART_ATTR);
          });
          const frame = document.querySelector('[' + FRAME_ATTR + ']');
          if (frame !== null) frame.removeAttribute(FRAME_ATTR);
          layer.remove();
          previous.forEach(function (snapshot) {
            restoreDataAttribute(documentElement, snapshot);
          });
        },
      };
    }

    /** Collapse a computed colour to a short, readable token. */
    function colorSlug(value) {
      if (typeof value !== 'string') return 'x';
      if (value.indexOf('rgba') === 0) {
        const parts = value.replace(/[^0-9.,]/g, '').split(',');
        const alpha = parts.length === 4 ? Number(parts[3]) : 1;
        return 'a' + Math.round((Number.isFinite(alpha) ? alpha : 1) * 100);
      }
      if (value.indexOf('rgb') === 0) return 'a100';
      return value === 'transparent' ? 'a0' : 'z';
    }

    /** Encode the runtime facts as a short, readable slot id. */
    function diagnosticId(state) {
      return [
        'orca-diag',
        'w' + (state.webgl ? 1 : 0),
        'm' + (state.mounted ? 1 : 0),
        'c' + (state.canvases > 0 ? 1 : 0),
        'f' + (state.frame ? 1 : 0),
        'S' + (state.sidebarRoot ? 1 : 0),
        'c' + (state.cameraZ === String(CAMERA_DISTANCE) ? 'pinned' : state.cameraZ),
        'D' + state.cameraToOrca,
        'b' + colorSlug(state.bodyBg),
        'r' + colorSlug(state.rootBg),
        'g' + colorSlug(state.frameBg),
        's' + colorSlug(state.sidebarBg),
        'G' + (state.sidebarRootBg.indexOf('gradient') >= 0 ? 1 : 0),
        'q' + state.quality,
      ].join('-');
    }

    /** The slot cell: owns the sea layer's lifetime and reports its state. */
    function OrcaBackdropEntry(props) {
      React.useEffect(function () {
        let mounted = { cleanup: function () {}, state: null };
        try {
          mounted = mountBackdrop();
        } catch (error) {
          console.error('[orca-aquarium-backdrop] mount threw', error);
        }

        // Report through a slot id so the state is readable with
        // cordis_inspect_query(Slots) instead of needing a screenshot.
        let unregister = null;
        try {
          if (mounted.state !== null) {
            unregister = props.ctx.slots.register({
              name: SLOT,
              id: diagnosticId(mounted.state),
              order: -999,
            }, function Diagnostics() {
              return null;
            });
          }
        } catch (error) {
          console.error('[orca-aquarium-backdrop] diagnostics failed', error);
        }

        return function cleanup() {
          if (typeof unregister === 'function') {
            try {
              unregister();
            } catch (error) {
              console.error('[orca-aquarium-backdrop] diagnostics cleanup failed', error);
            }
          }
          mounted.cleanup();
        };
      }, []);

      return null;
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // The palette goes through the theme service, not a `!important`
        // stylesheet. `overrideTokens` stacks a token layer over the active
        // theme and picks the right value for the current colour scheme, so the
        // skin never fights the shell's own declarations and light/dark is
        // resolved by the shell rather than by our selector.
        ctx.effect(function () {
          const theme = ctx.get('theme');
          if (theme === undefined || typeof theme.overrideTokens !== 'function') {
            console.error('[orca-aquarium-backdrop] the theme service is unavailable');
            return function () {};
          }
          return theme.overrideTokens('@local/orca-aquarium-backdrop', SKIN_TOKENS);
        });

        // Only the structural rules stay a stylesheet: the frame/plate tagging
        // and the sea layer are not theme tokens.
        ctx.effect(function () {
          const tag = document.createElement('style');
          tag.setAttribute(STYLE_ATTR, '');
          tag.textContent = STYLE_TEXT;
          document.head.appendChild(tag);
          return function () {
            tag.remove();
          };
        });

        function Entry() {
          return React.createElement(OrcaBackdropEntry, { ctx: ctx });
        }

        ctx.slots.inject(SLOT, function () {
          return ctx.slots.register({
            name: SLOT,
            id: ENTRY_ID,
            order: -1000,
          }, Entry);
        });
      },
    };
  },
});
