# spiderForWeb
基于node，superagent，async的爬虫
# 安装
## 基于node 
```
  npm i cheerio //node版JQ 处理获得的html文件
  npm i superagent //http请求
  npm i async //node的异步并发控制
  npm i node-xlsx //数据生成xlsx
```

package.json
```
{
  "name": "express-test",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "cross-env NODE_ENV=hos node index.js",
  },
  "dependencies": {
    "async": "^2.6.1",
    "cheerio": "^1.0.0-rc.2",
    "cookie-parser": "~1.4.3",
    "cross-env": "^5.2.0",
    "debug": "~2.6.9",
    "ejs": "~2.5.7",
    "eventproxy": "^1.0.0",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "node-xlsx": "^0.12.1",
    "superagent": "^4.0.0"
  },
  "devDependencies": {}
}

```
#使用
```
async.mapLimit(list, 5, function (urlFromList, cb) {
   reptileMove(urlFromList, cb, handle)
 }, handleAllDone);
```
list是所有URL的集合，想办法弄到...(可以通过读取excel)
5是并发上限，list中的元素会依次当作urlFromList传入第三个参数
reptileMove是自定义的处理函数，里面负责处理界面数据获取，完毕后存入结果数组
handleAllDone是list遍历完毕后的回调，在这里处理结果数组，即输出excel

