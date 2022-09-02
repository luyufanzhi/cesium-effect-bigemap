/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./Matrix2-73789715","./AxisAlignedBoundingBox-b1c095aa","./Transforms-d3d3b2a9","./defaultValue-97284df2","./RuntimeError-4f8ec8a2","./TerrainEncoding-080f16eb","./ComponentDatatype-e7fbe225","./OrientedBoundingBox-ee3011f6","./WebMercatorProjection-04ef6bc3","./_commonjsHelpers-3aae1032-65601a27","./createTaskProcessorWorker","./combine-d11b1f00","./AttributeCompression-5744d52e","./WebGLConstants-6da700a2","./EllipsoidTangentPlane-7ae496b2","./IntersectionTests-33ace2d6","./Plane-e916220d"],(function(e,t,i,a,n,r,s,l,o,f,u,c,d,h,m,g,p){"use strict";var x=Object.freeze({NONE:0,LERC:1});const w={};w.DEFAULT_STRUCTURE=Object.freeze({heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1});const k=new e.Cartesian3,y=new e.Matrix4,I=new e.Cartesian3,b=new e.Cartesian3;w.computeVertices=function(n){const f=Math.cos,u=Math.sin,c=Math.sqrt,d=Math.atan,h=Math.exp,m=s.CesiumMath.PI_OVER_TWO,g=s.CesiumMath.toRadians,p=n.heightmap,x=n.width,U=n.height,T=n.skirtHeight,M=T>0,V=a.defaultValue(n.isGeographic,!0),v=a.defaultValue(n.ellipsoid,e.Ellipsoid.WGS84),A=1/v.maximumRadius,B=e.Rectangle.clone(n.nativeRectangle),D=e.Rectangle.clone(n.rectangle);let S,P,E,C;a.defined(D)?(S=D.west,P=D.south,E=D.east,C=D.north):V?(S=g(B.west),P=g(B.south),E=g(B.east),C=g(B.north)):(S=B.west*A,P=m-2*d(h(-B.south*A)),E=B.east*A,C=m-2*d(h(-B.north*A)));let F=n.relativeToCenter;const N=a.defined(F);F=N?F:e.Cartesian3.ZERO;const O=a.defaultValue(n.includeWebMercatorT,!1),R=a.defaultValue(n.exaggeration,1),L=a.defaultValue(n.exaggerationRelativeHeight,0),z=1!==R,H=a.defaultValue(n.structure,w.DEFAULT_STRUCTURE),_=a.defaultValue(H.heightScale,w.DEFAULT_STRUCTURE.heightScale),Y=a.defaultValue(H.heightOffset,w.DEFAULT_STRUCTURE.heightOffset),W=a.defaultValue(H.elementsPerHeight,w.DEFAULT_STRUCTURE.elementsPerHeight),X=a.defaultValue(H.stride,w.DEFAULT_STRUCTURE.stride),Z=a.defaultValue(H.elementMultiplier,w.DEFAULT_STRUCTURE.elementMultiplier),j=a.defaultValue(H.isBigEndian,w.DEFAULT_STRUCTURE.isBigEndian);let G=e.Rectangle.computeWidth(B),q=e.Rectangle.computeHeight(B);const Q=G/(x-1),J=q/(U-1);V||(G*=A,q*=A);const K=v.radiiSquared,$=K.x,ee=K.y,te=K.z;let ie=65536,ae=-65536;const ne=i.Transforms.eastNorthUpToFixedFrame(F,v),re=e.Matrix4.inverseTransformation(ne,y);let se,le;O&&(se=o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(P),le=1/(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(C)-se));const oe=I;oe.x=Number.POSITIVE_INFINITY,oe.y=Number.POSITIVE_INFINITY,oe.z=Number.POSITIVE_INFINITY;const fe=b;fe.x=Number.NEGATIVE_INFINITY,fe.y=Number.NEGATIVE_INFINITY,fe.z=Number.NEGATIVE_INFINITY;let ue=Number.POSITIVE_INFINITY;const ce=x*U,de=ce+(T>0?2*x+2*U:0),he=new Array(de),me=new Array(de),ge=new Array(de),pe=O?new Array(de):[],xe=z?new Array(de):[];let we=0,ke=U,ye=0,Ie=x;M&&(--we,++ke,--ye,++Ie);const be=1e-5;for(let t=we;t<ke;++t){let i=t;i<0&&(i=0),i>=U&&(i=U-1);let a=B.north-J*i;a=V?g(a):m-2*d(h(-a*A));let n=(a-P)/(C-P);n=s.CesiumMath.clamp(n,0,1);const r=t===we,l=t===ke-1;T>0&&(r?a+=be*q:l&&(a-=be*q));const w=f(a),y=u(a),I=te*y;let b;O&&(b=(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(a)-se)*le);for(let t=ye;t<Ie;++t){let a=t;a<0&&(a=0),a>=x&&(a=x-1);const o=i*(x*X)+a*X;let d;if(1===W)d=p[o];else{let e;if(d=0,j)for(e=0;e<W;++e)d=d*Z+p[o+e];else for(e=W-1;e>=0;--e)d=d*Z+p[o+e]}d=d*_+Y,ae=Math.max(ae,d),ie=Math.min(ie,d);let h=B.west+Q*a;V?h=g(h):h*=A;let m=(h-S)/(E-S);m=s.CesiumMath.clamp(m,0,1);let M=i*x+a;if(T>0){const e=t===ye,n=t===Ie-1,s=r||l||e||n;if((r||l)&&(e||n))continue;s&&(d-=T,e?(M=ce+(U-i-1),h-=be*G):l?M=ce+U+(x-a-1):n?(M=ce+U+x+i,h+=be*G):r&&(M=ce+U+x+U+a))}const D=w*f(h),P=w*u(h),C=$*D,F=ee*P,N=1/c(C*D+F*P+I*y),R=C*N,L=F*N,H=I*N,q=new e.Cartesian3;q.x=R+D*d,q.y=L+P*d,q.z=H+y*d,e.Matrix4.multiplyByPoint(re,q,k),e.Cartesian3.minimumByComponent(k,oe,oe),e.Cartesian3.maximumByComponent(k,fe,fe),ue=Math.min(ue,d),he[M]=q,ge[M]=new e.Cartesian2(m,n),me[M]=d,O&&(pe[M]=b),z&&(xe[M]=v.geodeticSurfaceNormal(q))}}const Ue=i.BoundingSphere.fromPoints(he);let Te,Me;if(a.defined(D)&&(Te=l.OrientedBoundingBox.fromRectangle(D,ie,ae,v)),N){Me=new r.EllipsoidalOccluder(v).computeHorizonCullingPointPossiblyUnderEllipsoid(F,he,ie)}const Ve=new t.AxisAlignedBoundingBox(oe,fe,F),ve=new r.TerrainEncoding(F,Ve,ue,ae,ne,!1,O,z,R,L),Ae=new Float32Array(de*ve.stride);let Be=0;for(let e=0;e<de;++e)Be=ve.encode(Ae,Be,he[e],ge[e],me[e],void 0,pe[e],xe[e]);return{vertices:Ae,maximumHeight:ae,minimumHeight:ie,encoding:ve,boundingSphere3D:Ue,orientedBoundingBox:Te,occludeePointInScaledSpace:Me}};var U=f.createCommonjsModule((function(e){
/* Copyright 2015-2018 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */
!function(){var t,i,a,n,r,s,l,o,f,u,c,d,h,m,g,p,x=(t={defaultNoDataValue:-34027999387901484e22,decode:function(e,s){var l=(s=s||{}).encodedMaskData||null===s.encodedMaskData,o=r(e,s.inputOffset||0,l),f=null!==s.noDataValue?s.noDataValue:t.defaultNoDataValue,u=i(o,s.pixelType||Float32Array,s.encodedMaskData,f,s.returnMask),c={width:o.width,height:o.height,pixelData:u.resultPixels,minValue:u.minValue,maxValue:o.pixels.maxValue,noDataValue:f};return u.resultMask&&(c.maskData=u.resultMask),s.returnEncodedMask&&o.mask&&(c.encodedMaskData=o.mask.bitset?o.mask.bitset:null),s.returnFileInfo&&(c.fileInfo=a(o),s.computeUsedBitDepths&&(c.fileInfo.bitDepths=n(o))),c}},i=function(e,t,i,a,n){var r,l,o,f=0,u=e.pixels.numBlocksX,c=e.pixels.numBlocksY,d=Math.floor(e.width/u),h=Math.floor(e.height/c),m=2*e.maxZError,g=Number.MAX_VALUE;i=i||(e.mask?e.mask.bitset:null),l=new t(e.width*e.height),n&&i&&(o=new Uint8Array(e.width*e.height));for(var p,x,w=new Float32Array(d*h),k=0;k<=c;k++){var y=k!==c?h:e.height%c;if(0!==y)for(var I=0;I<=u;I++){var b=I!==u?d:e.width%u;if(0!==b){var U,T,M,V,v=k*e.width*h+I*d,A=e.width-b,B=e.pixels.blocks[f];if(B.encoding<2?(0===B.encoding?U=B.rawData:(s(B.stuffedData,B.bitsPerPixel,B.numValidPixels,B.offset,m,w,e.pixels.maxValue),U=w),T=0):M=2===B.encoding?0:B.offset,i)for(x=0;x<y;x++){for(7&v&&(V=i[v>>3],V<<=7&v),p=0;p<b;p++)7&v||(V=i[v>>3]),128&V?(o&&(o[v]=1),g=g>(r=B.encoding<2?U[T++]:M)?r:g,l[v++]=r):(o&&(o[v]=0),l[v++]=a),V<<=1;v+=A}else if(B.encoding<2)for(x=0;x<y;x++){for(p=0;p<b;p++)g=g>(r=U[T++])?r:g,l[v++]=r;v+=A}else for(g=g>M?M:g,x=0;x<y;x++){for(p=0;p<b;p++)l[v++]=M;v+=A}if(1===B.encoding&&T!==B.numValidPixels)throw"Block and Mask do not match";f++}}}return{resultPixels:l,resultMask:o,minValue:g}},a=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},n=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,i={},a=0;a<t;a++){var n=e.pixels.blocks[a];0===n.encoding?i.float32=!0:1===n.encoding?i[n.bitsPerPixel]=!0:i[0]=!0}return Object.keys(i)},r=function(e,t,i){var a={},n=new Uint8Array(e,t,10);if(a.fileIdentifierString=String.fromCharCode.apply(null,n),"CntZImage"!==a.fileIdentifierString.trim())throw"Unexpected file identifier string: "+a.fileIdentifierString;t+=10;var r=new DataView(e,t,24);if(a.fileVersion=r.getInt32(0,!0),a.imageType=r.getInt32(4,!0),a.height=r.getUint32(8,!0),a.width=r.getUint32(12,!0),a.maxZError=r.getFloat64(16,!0),t+=24,!i)if(r=new DataView(e,t,16),a.mask={},a.mask.numBlocksY=r.getUint32(0,!0),a.mask.numBlocksX=r.getUint32(4,!0),a.mask.numBytes=r.getUint32(8,!0),a.mask.maxValue=r.getFloat32(12,!0),t+=16,a.mask.numBytes>0){var s=new Uint8Array(Math.ceil(a.width*a.height/8)),l=(r=new DataView(e,t,a.mask.numBytes)).getInt16(0,!0),o=2,f=0;do{if(l>0)for(;l--;)s[f++]=r.getUint8(o++);else{var u=r.getUint8(o++);for(l=-l;l--;)s[f++]=u}l=r.getInt16(o,!0),o+=2}while(o<a.mask.numBytes);if(-32768!==l||f<s.length)throw"Unexpected end of mask RLE encoding";a.mask.bitset=s,t+=a.mask.numBytes}else 0==(a.mask.numBytes|a.mask.numBlocksY|a.mask.maxValue)&&(a.mask.bitset=new Uint8Array(Math.ceil(a.width*a.height/8)));r=new DataView(e,t,16),a.pixels={},a.pixels.numBlocksY=r.getUint32(0,!0),a.pixels.numBlocksX=r.getUint32(4,!0),a.pixels.numBytes=r.getUint32(8,!0),a.pixels.maxValue=r.getFloat32(12,!0),t+=16;var c=a.pixels.numBlocksX,d=a.pixels.numBlocksY,h=c+(a.width%c>0?1:0),m=d+(a.height%d>0?1:0);a.pixels.blocks=new Array(h*m);for(var g=0,p=0;p<m;p++)for(var x=0;x<h;x++){var w=0,k=e.byteLength-t;r=new DataView(e,t,Math.min(10,k));var y={};a.pixels.blocks[g++]=y;var I=r.getUint8(0);if(w++,y.encoding=63&I,y.encoding>3)throw"Invalid block encoding ("+y.encoding+")";if(2!==y.encoding){if(0!==I&&2!==I){if(I>>=6,y.offsetType=I,2===I)y.offset=r.getInt8(1),w++;else if(1===I)y.offset=r.getInt16(1,!0),w+=2;else{if(0!==I)throw"Invalid block offset type";y.offset=r.getFloat32(1,!0),w+=4}if(1===y.encoding)if(I=r.getUint8(w),w++,y.bitsPerPixel=63&I,I>>=6,y.numValidPixelsType=I,2===I)y.numValidPixels=r.getUint8(w),w++;else if(1===I)y.numValidPixels=r.getUint16(w,!0),w+=2;else{if(0!==I)throw"Invalid valid pixel count type";y.numValidPixels=r.getUint32(w,!0),w+=4}}var b;if(t+=w,3!==y.encoding)if(0===y.encoding){var U=(a.pixels.numBytes-1)/4;if(U!==Math.floor(U))throw"uncompressed block has invalid length";b=new ArrayBuffer(4*U),new Uint8Array(b).set(new Uint8Array(e,t,4*U));var T=new Float32Array(b);y.rawData=T,t+=4*U}else if(1===y.encoding){var M=Math.ceil(y.numValidPixels*y.bitsPerPixel/8),V=Math.ceil(M/4);b=new ArrayBuffer(4*V),new Uint8Array(b).set(new Uint8Array(e,t,M)),y.stuffedData=new Uint32Array(b),t+=M}}else t++}return a.eofOffset=t,a},s=function(e,t,i,a,n,r,s){var l,o,f,u=(1<<t)-1,c=0,d=0,h=Math.ceil((s-a)/n),m=4*e.length-Math.ceil(t*i/8);for(e[e.length-1]<<=8*m,l=0;l<i;l++){if(0===d&&(f=e[c++],d=32),d>=t)o=f>>>d-t&u,d-=t;else{var g=t-d;o=(f&u)<<g&u,o+=(f=e[c++])>>>(d=32-g)}r[l]=o<h?a+o*n:s}return r},t),w=(l=function(e,t,i,a,n,r,s,l){var o,f,u,c,d,h=(1<<i)-1,m=0,g=0,p=4*e.length-Math.ceil(i*a/8);if(e[e.length-1]<<=8*p,n)for(o=0;o<a;o++)0===g&&(u=e[m++],g=32),g>=i?(f=u>>>g-i&h,g-=i):(f=(u&h)<<(c=i-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=n[f];else for(d=Math.ceil((l-r)/s),o=0;o<a;o++)0===g&&(u=e[m++],g=32),g>=i?(f=u>>>g-i&h,g-=i):(f=(u&h)<<(c=i-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=f<d?r+f*s:l},o=function(e,t,i,a,n,r){var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=[],m=4*e.length-Math.ceil(t*i/8);e[e.length-1]<<=8*m;var g=Math.ceil((r-a)/n);for(f=0;f<i;f++)0===c&&(s=e[o++],c=32),c>=t?(d=s>>>c-t&l,c-=t):(d=(s&l)<<(u=t-c)&l,d+=(s=e[o++])>>>(c=32-u)),h[f]=d<g?a+d*n:r;return h.unshift(a),h},f=function(e,t,i,a,n,r,s,l){var o,f,u,c,d=(1<<i)-1,h=0,m=0,g=0;if(n)for(o=0;o<a;o++)0===m&&(u=e[h++],m=32,g=0),m>=i?(f=u>>>g&d,m-=i,g+=i):(f=u>>>g&d,m=32-(c=i-m),f|=((u=e[h++])&(1<<c)-1)<<i-c,g=c),t[o]=n[f];else{var p=Math.ceil((l-r)/s);for(o=0;o<a;o++)0===m&&(u=e[h++],m=32,g=0),m>=i?(f=u>>>g&d,m-=i,g+=i):(f=u>>>g&d,m=32-(c=i-m),f|=((u=e[h++])&(1<<c)-1)<<i-c,g=c),t[o]=f<p?r+f*s:l}return t},u=function(e,t,i,a,n,r){var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=0,m=[],g=Math.ceil((r-a)/n);for(f=0;f<i;f++)0===c&&(s=e[o++],c=32,h=0),c>=t?(d=s>>>h&l,c-=t,h+=t):(d=s>>>h&l,c=32-(u=t-c),d|=((s=e[o++])&(1<<u)-1)<<t-u,h=u),m[f]=d<g?a+d*n:r;return m.unshift(a),m},c=function(e,t,i,a){var n,r,s,l,o=(1<<i)-1,f=0,u=0,c=4*e.length-Math.ceil(i*a/8);for(e[e.length-1]<<=8*c,n=0;n<a;n++)0===u&&(s=e[f++],u=32),u>=i?(r=s>>>u-i&o,u-=i):(r=(s&o)<<(l=i-u)&o,r+=(s=e[f++])>>>(u=32-l)),t[n]=r;return t},d=function(e,t,i,a){var n,r,s,l,o=(1<<i)-1,f=0,u=0,c=0;for(n=0;n<a;n++)0===u&&(s=e[f++],u=32,c=0),u>=i?(r=s>>>c&o,u-=i,c+=i):(r=s>>>c&o,u=32-(l=i-u),r|=((s=e[f++])&(1<<l)-1)<<i-l,c=l),t[n]=r;return t},h={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,i=65535,a=e.length,n=Math.floor(a/2),r=0;n;){var s=n>=359?359:n;n-=s;do{t+=e[r++]<<8,i+=t+=e[r++]}while(--s);t=(65535&t)+(t>>>16),i=(65535&i)+(i>>>16)}return 1&a&&(i+=t+=e[r]<<8),((i=(65535&i)+(i>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var i=t.ptr,a=new Uint8Array(e,i,6),n={};if(n.fileIdentifierString=String.fromCharCode.apply(null,a),0!==n.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+n.fileIdentifierString;i+=6;var r,s=new DataView(e,i,8),l=s.getInt32(0,!0);if(n.fileVersion=l,i+=4,l>=3&&(n.checksum=s.getUint32(4,!0),i+=4),s=new DataView(e,i,12),n.height=s.getUint32(0,!0),n.width=s.getUint32(4,!0),i+=8,l>=4?(n.numDims=s.getUint32(8,!0),i+=4):n.numDims=1,s=new DataView(e,i,40),n.numValidPixel=s.getUint32(0,!0),n.microBlockSize=s.getInt32(4,!0),n.blobSize=s.getInt32(8,!0),n.imageType=s.getInt32(12,!0),n.maxZError=s.getFloat64(16,!0),n.zMin=s.getFloat64(24,!0),n.zMax=s.getFloat64(32,!0),i+=40,t.headerInfo=n,t.ptr=i,l>=3&&(r=l>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(e,i-r,n.blobSize-14))!==n.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,t){var i=t.headerInfo,a=this.getDataTypeArray(i.imageType),n=i.numDims*this.getDataTypeSize(i.imageType),r=this.readSubArray(e,t.ptr,a,n),s=this.readSubArray(e,t.ptr+n,a,n);t.ptr+=2*n;var l,o=!0;for(l=0;l<i.numDims;l++)if(r[l]!==s[l]){o=!1;break}return i.minValues=r,i.maxValues=s,o},readSubArray:function(e,t,i,a){var n;if(i===Uint8Array)n=new Uint8Array(e,t,a);else{var r=new ArrayBuffer(a);new Uint8Array(r).set(new Uint8Array(e,t,a)),n=new i(r)}return n},readMask:function(e,t){var i,a,n=t.ptr,r=t.headerInfo,s=r.width*r.height,l=r.numValidPixel,o=new DataView(e,n,4),f={};if(f.numBytes=o.getUint32(0,!0),n+=4,(0===l||s===l)&&0!==f.numBytes)throw"invalid mask";if(0===l)i=new Uint8Array(Math.ceil(s/8)),f.bitset=i,a=new Uint8Array(s),t.pixels.resultMask=a,n+=f.numBytes;else if(f.numBytes>0){i=new Uint8Array(Math.ceil(s/8));var u=(o=new DataView(e,n,f.numBytes)).getInt16(0,!0),c=2,d=0,h=0;do{if(u>0)for(;u--;)i[d++]=o.getUint8(c++);else for(h=o.getUint8(c++),u=-u;u--;)i[d++]=h;u=o.getInt16(c,!0),c+=2}while(c<f.numBytes);if(-32768!==u||d<i.length)throw"Unexpected end of mask RLE encoding";a=new Uint8Array(s);var m=0,g=0;for(g=0;g<s;g++)7&g?(m=i[g>>3],m<<=7&g):m=i[g>>3],128&m&&(a[g]=1);t.pixels.resultMask=a,f.bitset=i,n+=f.numBytes}return t.ptr=n,t.mask=f,!0},readDataOneSweep:function(e,t,i){var a,n=t.ptr,r=t.headerInfo,s=r.numDims,l=r.width*r.height,o=r.imageType,f=r.numValidPixel*h.getDataTypeSize(o)*s,u=t.pixels.resultMask;if(i===Uint8Array)a=new Uint8Array(e,n,f);else{var c=new ArrayBuffer(f);new Uint8Array(c).set(new Uint8Array(e,n,f)),a=new i(c)}if(a.length===l*s)t.pixels.resultPixels=a;else{t.pixels.resultPixels=new i(l*s);var d=0,m=0,g=0,p=0;if(s>1)for(g=0;g<s;g++)for(p=g*l,m=0;m<l;m++)u[m]&&(t.pixels.resultPixels[p+m]=a[d++]);else for(m=0;m<l;m++)u[m]&&(t.pixels.resultPixels[m]=a[d++])}return n+=f,t.ptr=n,!0},readHuffmanTree:function(e,t){var i=this.HUFFMAN_LUT_BITS_MAX,a=new DataView(e,t.ptr,16);if(t.ptr+=16,a.getInt32(0,!0)<2)throw"unsupported Huffman version";var n=a.getInt32(4,!0),r=a.getInt32(8,!0),s=a.getInt32(12,!0);if(r>=s)return!1;var l=new Uint32Array(s-r);h.decodeBits(e,t,l);var o,f,u,c,d=[];for(o=r;o<s;o++)d[f=o-(o<n?0:n)]={first:l[o-r],second:null};var g=e.byteLength-t.ptr,p=Math.ceil(g/4),x=new ArrayBuffer(4*p);new Uint8Array(x).set(new Uint8Array(e,t.ptr,g));var w,k=new Uint32Array(x),y=0,I=0;for(w=k[0],o=r;o<s;o++)(c=d[f=o-(o<n?0:n)].first)>0&&(d[f].second=w<<y>>>32-c,32-y>=c?32===(y+=c)&&(y=0,w=k[++I]):(y+=c-32,w=k[++I],d[f].second|=w>>>32-y));var b=0,U=0,T=new m;for(o=0;o<d.length;o++)void 0!==d[o]&&(b=Math.max(b,d[o].first));U=b>=i?i:b,b>=30&&console.log("WARning, large NUM LUT BITS IS "+b);var M,V,v,A,B,D=[];for(o=r;o<s;o++)if((c=d[f=o-(o<n?0:n)].first)>0)if(M=[c,f],c<=U)for(V=d[f].second<<U-c,v=1<<U-c,u=0;u<v;u++)D[V|u]=M;else for(V=d[f].second,B=T,A=c-1;A>=0;A--)V>>>A&1?(B.right||(B.right=new m),B=B.right):(B.left||(B.left=new m),B=B.left),0!==A||B.val||(B.val=M[1]);return{decodeLut:D,numBitsLUTQick:U,numBitsLUT:b,tree:T,stuffedData:k,srcPtr:I,bitPos:y}},readHuffman:function(e,t,i){var a,n,r,s,l,o,f,u,c,d=t.headerInfo,h=d.numDims,m=t.headerInfo.height,g=t.headerInfo.width,p=g*m,x=this.readHuffmanTree(e,t),w=x.decodeLut,k=x.tree,y=x.stuffedData,I=x.srcPtr,b=x.bitPos,U=x.numBitsLUTQick,T=x.numBitsLUT,M=0===t.headerInfo.imageType?128:0,V=t.pixels.resultMask,v=0;b>0&&(I++,b=0);var A,B=y[I],D=1===t.encodeMode,S=new i(p*h),P=S;for(A=0;A<d.numDims;A++){if(h>1&&(P=new i(S.buffer,p*A,p),v=0),t.headerInfo.numValidPixel===g*m)for(u=0,o=0;o<m;o++)for(f=0;f<g;f++,u++){if(n=0,l=s=B<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),w[l])n=w[l][1],b+=w[l][0];else for(l=s=B<<b>>>32-T,32-b<T&&(l=s|=y[I+1]>>>64-b-T),a=k,c=0;c<T;c++)if(!(a=s>>>T-c-1&1?a.right:a.left).left&&!a.right){n=a.val,b=b+c+1;break}b>=32&&(b-=32,B=y[++I]),r=n-M,D?(r+=f>0?v:o>0?P[u-g]:v,r&=255,P[u]=r,v=r):P[u]=r}else for(u=0,o=0;o<m;o++)for(f=0;f<g;f++,u++)if(V[u]){if(n=0,l=s=B<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),w[l])n=w[l][1],b+=w[l][0];else for(l=s=B<<b>>>32-T,32-b<T&&(l=s|=y[I+1]>>>64-b-T),a=k,c=0;c<T;c++)if(!(a=s>>>T-c-1&1?a.right:a.left).left&&!a.right){n=a.val,b=b+c+1;break}b>=32&&(b-=32,B=y[++I]),r=n-M,D?(f>0&&V[u-1]?r+=v:o>0&&V[u-g]?r+=P[u-g]:r+=v,r&=255,P[u]=r,v=r):P[u]=r}t.ptr=t.ptr+4*(I+1)+(b>0?4:0)}t.pixels.resultPixels=S},decodeBits:function(e,t,i,a,n){var r=t.headerInfo,s=r.fileVersion,h=0,m=new DataView(e,t.ptr,5),g=m.getUint8(0);h++;var p=g>>6,x=0===p?4:3-p,w=(32&g)>0,k=31&g,y=0;if(1===x)y=m.getUint8(h),h++;else if(2===x)y=m.getUint16(h,!0),h+=2;else{if(4!==x)throw"Invalid valid pixel count type";y=m.getUint32(h,!0),h+=4}var I,b,U,T,M,V,v,A,B,D=2*r.maxZError,S=r.numDims>1?r.maxValues[n]:r.zMax;if(w){for(t.counter.lut++,A=m.getUint8(h),h++,T=Math.ceil((A-1)*k/8),M=Math.ceil(T/4),b=new ArrayBuffer(4*M),U=new Uint8Array(b),t.ptr+=h,U.set(new Uint8Array(e,t.ptr,T)),v=new Uint32Array(b),t.ptr+=T,B=0;A-1>>>B;)B++;T=Math.ceil(y*B/8),M=Math.ceil(T/4),b=new ArrayBuffer(4*M),(U=new Uint8Array(b)).set(new Uint8Array(e,t.ptr,T)),I=new Uint32Array(b),t.ptr+=T,V=s>=3?u(v,k,A-1,a,D,S):o(v,k,A-1,a,D,S),s>=3?f(I,i,B,y,V):l(I,i,B,y,V)}else t.counter.bitstuffer++,B=k,t.ptr+=h,B>0&&(T=Math.ceil(y*B/8),M=Math.ceil(T/4),b=new ArrayBuffer(4*M),(U=new Uint8Array(b)).set(new Uint8Array(e,t.ptr,T)),I=new Uint32Array(b),t.ptr+=T,s>=3?null==a?d(I,i,B,y):f(I,i,B,y,!1,a,D,S):null==a?c(I,i,B,y):l(I,i,B,y,!1,a,D,S))},readTiles:function(e,t,i){var a=t.headerInfo,n=a.width,r=a.height,s=a.microBlockSize,l=a.imageType,o=h.getDataTypeSize(l),f=Math.ceil(n/s),u=Math.ceil(r/s);t.pixels.numBlocksY=u,t.pixels.numBlocksX=f,t.pixels.ptr=0;var c,d,m,g,p,x,w,k,y=0,I=0,b=0,U=0,T=0,M=0,V=0,v=0,A=0,B=0,D=0,S=0,P=0,E=0,C=0,F=new i(s*s),N=r%s||s,O=n%s||s,R=a.numDims,L=t.pixels.resultMask,z=t.pixels.resultPixels;for(b=0;b<u;b++)for(T=b!==u-1?s:N,U=0;U<f;U++)for(B=b*n*s+U*s,D=n-(M=U!==f-1?s:O),k=0;k<R;k++){if(R>1&&(z=new i(t.pixels.resultPixels.buffer,n*r*k*o,n*r)),V=e.byteLength-t.ptr,d={},C=0,C++,A=(v=(c=new DataView(e,t.ptr,Math.min(10,V))).getUint8(0))>>6&255,(v>>2&15)!=(U*s>>3&15))throw"integrity issue";if((p=3&v)>3)throw t.ptr+=C,"Invalid block encoding ("+p+")";if(2!==p)if(0===p){if(t.counter.uncompressed++,t.ptr+=C,S=(S=T*M*o)<(P=e.byteLength-t.ptr)?S:P,m=new ArrayBuffer(S%o==0?S:S+o-S%o),new Uint8Array(m).set(new Uint8Array(e,t.ptr,S)),g=new i(m),E=0,L)for(y=0;y<T;y++){for(I=0;I<M;I++)L[B]&&(z[B]=g[E++]),B++;B+=D}else for(y=0;y<T;y++){for(I=0;I<M;I++)z[B++]=g[E++];B+=D}t.ptr+=E*o}else if(x=h.getDataTypeUsed(l,A),w=h.getOnePixel(d,C,x,c),C+=h.getDataTypeSize(x),3===p)if(t.ptr+=C,t.counter.constantoffset++,L)for(y=0;y<T;y++){for(I=0;I<M;I++)L[B]&&(z[B]=w),B++;B+=D}else for(y=0;y<T;y++){for(I=0;I<M;I++)z[B++]=w;B+=D}else if(t.ptr+=C,h.decodeBits(e,t,F,w,k),C=0,L)for(y=0;y<T;y++){for(I=0;I<M;I++)L[B]&&(z[B]=F[C++]),B++;B+=D}else for(y=0;y<T;y++){for(I=0;I<M;I++)z[B++]=F[C++];B+=D}else t.counter.constant++,t.ptr+=C}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:h.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,i=e.headerInfo.numDims,a=e.headerInfo.height*e.headerInfo.width,n=a*i,r=0,s=0,l=0,o=e.pixels.resultMask;if(o)if(i>1)for(r=0;r<i;r++)for(l=r*a,s=0;s<a;s++)o[s]&&(e.pixels.resultPixels[l+s]=t);else for(s=0;s<a;s++)o[s]&&(e.pixels.resultPixels[s]=t);else if(e.pixels.resultPixels.fill)e.pixels.resultPixels.fill(t);else for(s=0;s<n;s++)e.pixels.resultPixels[s]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:default:t=Float32Array;break;case 7:t=Float64Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:default:t="F32";break;case 7:t="F64"}return t},isValidPixelValue:function(e,t){if(null==t)return!1;var i;switch(e){case 0:i=t>=-128&&t<=127;break;case 1:i=t>=0&&t<=255;break;case 2:i=t>=-32768&&t<=32767;break;case 3:i=t>=0&&t<=65536;break;case 4:i=t>=-2147483648&&t<=2147483647;break;case 5:i=t>=0&&t<=4294967296;break;case 6:i=t>=-34027999387901484e22&&t<=34027999387901484e22;break;case 7:i=t>=5e-324&&t<=17976931348623157e292;break;default:i=!1}return i},getDataTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var i=e;switch(e){case 2:case 4:i=e-t;break;case 3:case 5:i=e-2*t;break;case 6:i=0===t?e:1===t?2:1;break;case 7:i=0===t?e:e-2*t+1;break;default:i=e}return i},getOnePixel:function(e,t,i,a){var n=0;switch(i){case 0:n=a.getInt8(t);break;case 1:n=a.getUint8(t);break;case 2:n=a.getInt16(t,!0);break;case 3:n=a.getUint16(t,!0);break;case 4:n=a.getInt32(t,!0);break;case 5:n=a.getUInt32(t,!0);break;case 6:n=a.getFloat32(t,!0);break;case 7:n=a.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return n}},m=function(e,t,i){this.val=e,this.left=t,this.right=i},{decode:function(e,t){var i=(t=t||{}).noDataValue,a=0,n={};n.ptr=t.inputOffset||0,n.pixels={},h.readHeaderInfo(e,n);var r=n.headerInfo,s=r.fileVersion,l=h.getDataTypeArray(r.imageType);h.readMask(e,n),r.numValidPixel===r.width*r.height||n.pixels.resultMask||(n.pixels.resultMask=t.maskData);var o,f=r.width*r.height;if(n.pixels.resultPixels=new l(f*r.numDims),n.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==r.numValidPixel)if(r.zMax===r.zMin)h.constructConstantSurface(n);else if(s>=4&&h.checkMinMaxRanges(e,n))h.constructConstantSurface(n);else{var u=new DataView(e,n.ptr,2),c=u.getUint8(0);if(n.ptr++,c)h.readDataOneSweep(e,n,l);else if(s>1&&r.imageType<=1&&Math.abs(r.maxZError-.5)<1e-5){var d=u.getUint8(1);if(n.ptr++,n.encodeMode=d,d>2||s<4&&d>1)throw"Invalid Huffman flag "+d;d?h.readHuffman(e,n,l):h.readTiles(e,n,l)}else h.readTiles(e,n,l)}n.eofOffset=n.ptr,t.inputOffset?(o=n.headerInfo.blobSize+t.inputOffset-n.ptr,Math.abs(o)>=1&&(n.eofOffset=t.inputOffset+n.headerInfo.blobSize)):(o=n.headerInfo.blobSize-n.ptr,Math.abs(o)>=1&&(n.eofOffset=n.headerInfo.blobSize));var m={width:r.width,height:r.height,pixelData:n.pixels.resultPixels,minValue:r.zMin,maxValue:r.zMax,validPixelCount:r.numValidPixel,dimCount:r.numDims,dimStats:{minValues:r.minValues,maxValues:r.maxValues},maskData:n.pixels.resultMask};if(n.pixels.resultMask&&h.isValidPixelValue(r.imageType,i)){var g=n.pixels.resultMask;for(a=0;a<f;a++)g[a]||(m.pixelData[a]=i);m.noDataValue=i}return n.noDataValue=i,t.returnFileInfo&&(m.fileInfo=h.formatFileInfo(n)),m},getBandCount:function(e){for(var t=0,i=0,a={ptr:0,pixels:{}};i<e.byteLength-58;)h.readHeaderInfo(e,a),i+=a.headerInfo.blobSize,t++,a.ptr=i;return t}}),k=(g=new ArrayBuffer(4),p=new Uint8Array(g),new Uint32Array(g)[0]=1,1===p[0]),y={decode:function(e,t){if(!k)throw"Big endian system is not supported.";var i,a,n=(t=t||{}).inputOffset||0,r=new Uint8Array(e,n,10),s=String.fromCharCode.apply(null,r);if("CntZImage"===s.trim())i=x,a=1;else{if("Lerc2"!==s.substring(0,5))throw"Unexpected file identifier string: "+s;i=w,a=2}for(var l,o,f,u,c,d,h=0,m=e.byteLength-10,g=[],p={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};n<m;){var y=i.decode(e,{inputOffset:n,encodedMaskData:l,maskData:f,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null});n=y.fileInfo.eofOffset,0===h&&(l=y.encodedMaskData,f=y.maskData,p.width=y.width,p.height=y.height,p.dimCount=y.dimCount||1,p.pixelType=y.pixelType||y.fileInfo.pixelType,p.mask=y.maskData),a>1&&y.fileInfo.mask&&y.fileInfo.mask.numBytes>0&&g.push(y.maskData),h++,p.pixels.push(y.pixelData),p.statistics.push({minValue:y.minValue,maxValue:y.maxValue,noDataValue:y.noDataValue,dimStats:y.dimStats})}if(a>1&&g.length>1){for(d=p.width*p.height,p.bandMasks=g,(f=new Uint8Array(d)).set(g[0]),u=1;u<g.length;u++)for(o=g[u],c=0;c<d;c++)f[c]=f[c]&o[c];p.maskData=f}return p}};e.exports?e.exports=y:this.Lerc=y}()}));return u((function(t,i){if(t.encoding===x.LERC){let e;try{e=U.decode(t.heightmap)}catch(e){throw new n.RuntimeError(e)}if(e.statistics[0].minValue===Number.MAX_VALUE)throw new n.RuntimeError("Invalid tile data");t.heightmap=e.pixels[0],t.width=e.width,t.height=e.height}t.ellipsoid=e.Ellipsoid.clone(t.ellipsoid),t.rectangle=e.Rectangle.clone(t.rectangle);const a=w.computeVertices(t),r=a.vertices;return i.push(r.buffer),{vertices:r.buffer,numberOfAttributes:a.encoding.stride,minimumHeight:a.minimumHeight,maximumHeight:a.maximumHeight,gridWidth:t.width,gridHeight:t.height,boundingSphere3D:a.boundingSphere3D,orientedBoundingBox:a.orientedBoundingBox,occludeePointInScaledSpace:a.occludeePointInScaledSpace,encoding:a.encoding,westIndicesSouthToNorth:a.westIndicesSouthToNorth,southIndicesEastToWest:a.southIndicesEastToWest,eastIndicesNorthToSouth:a.eastIndicesNorthToSouth,northIndicesWestToEast:a.northIndicesWestToEast}}))}));
