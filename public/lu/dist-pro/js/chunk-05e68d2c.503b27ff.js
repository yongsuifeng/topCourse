(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05e68d2c"],{d2c3:function(a,t,e){},f4d8:function(a,t,e){"use strict";var n=e("d2c3"),o=e.n(n);o.a},f89b:function(a,t,e){"use strict";e.r(t);var n=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("h1",[a._v("一、参数说明")]),e("Row",[e("Col",{attrs:{span:"12"}},[e("Table",{attrs:{columns:a.tableColumns,data:a.tableData},scopedSlots:a._u([{key:"default",fn:function(t){var n=t.row;t.index;return[e("div",{staticStyle:{overflow:"auto"},domProps:{innerHTML:a._s(n.default)}})]}}])}),e("h3",[a._v("其它说明：")]),e("pre",[a._v("        可以传入初始位置、支持搜索、支持定位\n      ")])],1)],1),e("h1",[a._v("二、示例")]),e("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"info",size:"small"},on:{click:function(t){return a.showMapModal()}}},[a._v("地图选点")]),a.formdataFinished&&a.mapModal.show?e("ucer-map",{attrs:{width:600,height:300,amapData:a.formData.amapData},on:{"on-map-modal-hide":a.mapModalHide},model:{value:a.formData.amapData,callback:function(t){a.$set(a.formData,"amapData",t)},expression:"formData.amapData"}}):a._e(),e("span",[a._v("选择位置：lng "+a._s(a.formData.amapData.lng)+", lat "+a._s(a.formData.amapData.lat)+","+a._s(a.formData.amapData.address))])],1)},o=[],s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{},[e("Modal",{attrs:{"mask-closable":!1,width:a.width},on:{"on-cancel":a.cancel},model:{value:a.modalShow,callback:function(t){a.modalShow=t},expression:"modalShow"}},[e("div",{staticClass:"amap-page-container"},[e("el-amap-search-box",{staticClass:"search-box",attrs:{"search-option":a.mapData.searchOption,"on-search-result":a.onSearchResult}}),e("el-amap",{staticClass:"amap-demo",style:"height:"+a.height+"px",attrs:{vid:"amapDemo",center:a.mapData.center,zoom:a.mapData.zoom,plugin:a.mapData.plugins,events:a.mapData.events}},a._l(a.mapData.markers,(function(a,t){return e("el-amap-marker",{key:t,attrs:{position:a.position,events:a.events,visible:a.visible,draggable:a.draggable,vid:t}})})),1),e("div",{staticClass:"toolbar"},[a._v("\n        position: ["+a._s(a.mapData.lng)+", "+a._s(a.mapData.lat)+"] address: "+a._s(a.mapData.address)+"\n      ")])],1),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("Button",{attrs:{type:"text"},on:{click:a.cancel}},[a._v("取消")]),e("Button",{attrs:{type:"primary"},on:{click:a.choseBtn}},[a._v("选择")])],1)])],1)},i=[],r=(e("6d57"),{props:{width:0,height:0,amapData:{lng:0,lat:0}},data:function(){var a=this,t=this;return{modalShow:!0,mapData:{zoom:12,center:[121.59996,31.197646],address:"",lng:0,lat:0,citycode:"",adcode:"",province:"",city:"",district:"",township:"",street:"",streetNumber:"",searchOption:{city:"昆明",citylimit:!1},markers:[{position:[121.5273285,31.21515044],events:{click:function(){},dragend:function(t){console.log("---event---: dragend"),a.markers[0].position=[t.lnglat.lng,t.lnglat.lat]}},visible:!0,draggable:!1,template:"<span>1</span>"}],events:{click:function(a){var e=a.lnglat,n=e.lng,o=e.lat;t.mapData.lng=n,t.mapData.lat=o;var s=new AMap.Geocoder({radius:1e3,extensions:"all"});s.getAddress([n,o],(function(a,e){"complete"===a&&"OK"===e.info&&e&&e.regeocode&&(t.mapData.address=e.regeocode.formattedAddress,t.$nextTick())})),t.addMarker(t.mapData.lng,t.mapData.lat)}},plugins:[{pName:"Geolocation",events:{init:function(a){a.getCurrentPosition((function(a,e){e&&e.position&&(t.amapData.lng?(t.mapData.lng=t.amapData.lng,t.mapData.lat=t.amapData.lat):(t.mapData.lng=e.position.lng,t.mapData.lat=e.position.lat),t.mapData.center=[t.mapData.lng,t.mapData.lat],t.addMarker(t.mapData.lng,t.mapData.lat),t.getAddressDetail())}))}}}]}}},methods:{cancel:function(){this.modalShow=!1,this.$emit("on-map-modal-hide")},onSearchResult:function(a){var t=0,e=0;if(a.length>0){a.forEach((function(a){var n=a.lng,o=a.lat;e+=n,t+=o}));var n={lng:e/a.length,lat:t/a.length};this.mapData.lng=n.lng,this.mapData.lat=n.lat,this.mapData.center=[n.lng,n.lat],this.addMarker(n.lng,n.lat),this.getAddressDetail()}},addMarker:function(a,t){this.mapData.markers[0]["position"]=[a,t]},choseBtn:function(){this.$emit("input",this.mapData),this.cancel()},getAddressDetail:function(){var a=this,t=new AMap.Geocoder({radius:1e3,extensions:"all"});t.getAddress([a.mapData.lng,a.mapData.lat],(function(t,e){"complete"===t&&"OK"===e.info&&e&&e.regeocode&&(a.mapData.address=e.regeocode.formattedAddress,a.mapData.citycode=e.regeocode.addressComponent.citycode,a.mapData.adcode=e.regeocode.addressComponent.adcode,a.mapData.province=e.regeocode.addressComponent.province,a.mapData.city=e.regeocode.addressComponent.city,a.mapData.district=e.regeocode.addressComponent.district,a.mapData.township=e.regeocode.addressComponent.township,a.mapData.street=e.regeocode.addressComponent.street,a.mapData.streetNumber=e.regeocode.addressComponent.streetNumber,a.$nextTick())}))}}}),l=r,d=(e("f4d8"),e("5511")),p=Object(d["a"])(l,s,i,!1,null,null,null),c=p.exports,m={components:{UcerMap:c},data:function(){return{formdataFinished:!1,formData:{amapData:{lng:0,lat:0}},mapModal:{show:!1},tableColumns:[{title:"名称",key:"name",minWidth:100},{title:"类型",key:"type",minWidth:80},{title:"描述",key:"description",tooltip:!0,minWidth:100},{title:"示例",key:"default",slot:"default",minWidth:300}],tableData:[{name:"width",type:"Integer",description:"地图宽度(px)",default:':width="600"'},{name:"height",type:"Integer",description:"地图高度(px)",default:':height="400"'},{name:"amapData",type:"Object",description:"地图经度纬度等信息",default:'<pre>{<br/>"lng":102.74335,<br/>"lat":25.06558,<br/>"address":"云南省昆明市盘龙区青云街道保利玺樾1期"<br/>}</pre>'}]}},mounted:function(){this.getInfoByIdExcute()},methods:{getInfoByIdExcute:function(){var a=this;a.formData.amapData={lng:0,lat:0},a.formdataFinished=!0},mapModalHide:function(){this.mapModal.show=!1},showMapModal:function(){this.mapModal.show=!0}}},h=m,u=Object(d["a"])(h,n,o,!1,null,null,null);t["default"]=u.exports}}]);