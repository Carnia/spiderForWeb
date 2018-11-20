/**
 * Created by 18468 on 2017/8/7.
 */
var fs = require('fs');
var xlsx = require('node-xlsx');
var data = [{
    name: 'sheet1',
    data: [
      [
        'ID',
        'Name',
        'Score'
      ],
      [
        '1',
        'Michael',
        '99'

      ],
      [
        '2',
        'Jordan',
        '98'
      ]
    ]
  },
  {
    name: 'sheet2',
    data: [
      [
        'AA',
        'BB'
      ],
      [
        '23',
        '24'
      ]
    ]
  }
]

function creatXls(name, data) {
  fs.unlink('./' + name + '.xlsx', function (params) {
    var buffer = xlsx.build(data);
    fs.writeFile('./' + name + '.xlsx', buffer, function (err) {
      if (err){
        creatXls(name+'(1)',data)
        throw err;
      }
      console.log('Write to xls has finished');
      // 读xlsx
      // var obj = xlsx.parse("./" + "resut.xls");
      // console.log(JSON.stringify(obj));
    });
  })
}
// creatXls('result', [{
//   name: '数据',
//   data: _data
// }])
// 写xlsx
exports.creatXls = creatXls
