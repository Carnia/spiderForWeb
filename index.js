 var express = require('express');
 var superagent = require("superagent")
 var async = require("async")

 var {
   List,
   Handle,
   handleDone
 } = require('./11.js')//自己写的各种handle和界面数据处理

 var curCount1 = 0

 function reptileMove(url, callback, fn) {
   curCount1++;
   console.time(url)
   setTimeout(() => {
     superagent.get(url)
       .end(function (err, sres) {
         console.log('并发', curCount1);
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
 if (E === "start") {
   async.mapLimit(List, 5, function (url, cb) {
     reptileMove(url, cb, Handle)
   }, handleDone);
 }
