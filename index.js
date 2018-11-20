 var express = require('express');
 var superagent = require("superagent")
 var async = require("async")

 var {
   hosPageList,
   hosHandle,
   handleHosDone
 } = require('./_hos')
 var {
   docPageList,
   docHandle,
   handleDocDone
 } = require('./_doc')
 var {
   hosUrls,
   handleDoc2,
   handleDoc2Done
 } = require('./_hos_doc')

 var curCount1 = 0
 var count = 1710

 function reptileMove(url, callback, fn) {
   //延迟毫秒数
   //  var delay = parseInt((Math.random() * 30000000) % 1000, 10);
   curCount1++;
   console.time(url)
   setTimeout(() => {
     superagent.get(url)
       .end(function (err, sres) {
         console.log('任务1710个,还剩', count--, '个', '  并发', curCount1);
         console.timeEnd(url)
         // 常规的错误处理
         if (err) {
           console.log('err:' + url);
           curCount1--;
           callback(null, url + 'Call back content');
           return;
         }
         fn(sres, url)
         curCount1--;
         callback(null, url + 'Call back content');
       });
   }, 1000);
 };



 var E = process.env.NODE_ENV
 // 使用async控制异步抓取   执行顺序 _hos  ->  _hos_doc  ->  _doc
 if (E === 'hos' || E === "all") {
   //  console.log(hosPageList,hosResList,hosHandle,handleHosDone)
   //  async.mapLimit(hosPageList, 5, function (url, cb) {
   //    reptileMove(url, cb, hosHandle)
   //  }, handleHosDone);
 }
 if (E === 'docLink' || E === "all") {
   async.mapLimit(hosUrls, 5, function (url, cb) {
     reptileMove(url, cb, handleDoc2)
   }, handleDoc2Done);
 }
 if (E === 'doc' || E === "all") {
   //  console.log(docPageList.length,docResList,docHandle,handleDocDone)
   console.log('总任务',docPageList.length,'个')
   async.mapLimit(docPageList, 5, function (url, cb) {
     reptileMove(url, cb, docHandle)
   }, handleDocDone);
 }