"use strict";(self["webpackChunkfrontend_nts"]=self["webpackChunkfrontend_nts"]||[]).push([[376],{8376:function(t,s,a){a.r(s),a.d(s,{default:function(){return c}});var o=function(){var t=this,s=t._self._c;return s("div",{staticClass:"card h-100 border-0 py-2"},[t._m(0),s("div",{staticClass:"card-body border-0 p-2"},[s("div",{staticClass:"shadow-lg rounded"},[t._v(" "+t._s(t.position.lat)+" | "+t._s(t.position.lng)+" ")])]),t._m(1),s("div",{staticClass:"card-body h-100 border-0"},[s("button",{staticClass:"btn",class:t.status?"btn-success":"btn-secondary",on:{click:t.culcheck}},[t._v(" 출석체크 ")])])])},e=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"card-header border-0 row m-0 px-0 py-3 bg-transparent"},[s("div",{staticClass:"col-10 text-start"},[s("h5",[s("strong",[t._v("김지각")]),t._v("님"),s("br"),t._v("환영합니다.")])]),s("div",{staticClass:"col-2 h-100"},[s("button",{staticClass:"btn shadow-lg h-100 border rounded-circle"},[s("i",{staticClass:"bi-person h-100"})])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"card-body border-0"},[s("div",{attrs:{id:"map"}})])}],i=(a(1703),{data(){return{interval:null,time:null,map:null,marker:null,position:{lat:37.51082,lng:127.02928},compLoc:[{lat:37.501957186941915,lng:127.03731489385599},{lat:37.275884784729506,lng:127.10868871356905}],circle:[],status:!1}},components:{},created(){console.log("[created]"),"geolocation"in navigator&&this.getCurPos()},mounted(){if(console.log("[mounted]"),window.kakao&&window.kakao.maps)this.initMap();else{const t=document.createElement("script");t.src="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8425cb2bc152a90c5eae2c00e29f04dc",t.addEventListener("load",(()=>{kakao.maps.load(this.initMap)})),document.head.appendChild(t)}},watch:{position:{handler:function(){if(console.log("watch call"),this.map){var t=new kakao.maps.LatLng(this.position.lat,this.position.lng);this.map.setCenter(t),this.marker.setPosition(t),this.posCheck()}},deep:!0}},beforeDestroy(){console.log("[beforedestroy]"),navigator.geolocation.clearWatch(this.interval)},destroyed(){console.log(this.interval)},methods:{initMap(){console.log("[methods]-[initmap]");var t=document.getElementById("map"),s={center:new kakao.maps.LatLng(this.position.lat,this.position.lng),level:4};this.map=new kakao.maps.Map(t,s),this.marker=new kakao.maps.Marker({position:this.map.getCenter()}),this.marker.setMap(this.map),this.compLoc.forEach((t=>{this.circle.push(new kakao.maps.Circle({center:new kakao.maps.LatLng(t.lat,t.lng)}))})),this.circle.forEach((t=>{t.setMap(this.map)})),kakao.maps.event.addListener(this.map,"click",(t=>{var s=t.latLng;this.marker.setPosition(s),this.position.lat=s.getLat(),this.position.lng=s.getLng()}))},getCurPos(){console.log("call getCurPos"),navigator.geolocation&&(this.interval=navigator.geolocation.watchPosition((t=>{this.position.lat=t.coords.latitude,this.position.lng=t.coords.longitude}),(t=>{console.log("error! ",t.message)}),{enableHighAccuracy:!1}))},posCheck(){try{this.circle.forEach((t=>{if(this.position.lng>t.getBounds().ha&&this.position.lat>t.getBounds().qa&&this.position.lng<t.getBounds().oa&&this.position.lat<t.getBounds().pa)throw this.status=!0,new Error("stop loop");this.status=!1}))}catch(t){}},culcheck(){this.status?alert("반경 안에 있음!"):alert("반경 안에 있지 않음")}}}),n=i,l=a(3736),r=(0,l.Z)(n,o,e,!1,null,null,null),c=r.exports}}]);
//# sourceMappingURL=376.8744835c.js.map