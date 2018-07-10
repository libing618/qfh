const URL_base = 'https://service-3c2g9yxt-1256932165.ap-beijing.apigateway.myqcloud.com/prepub/';
const md5 = require('MD5').hexMD5
const COS = require('cos-wx-sdk-v5')
const {b64_hmac_sha1} = require('SHA1')
var cos = new COS({
  getAuthorization: function (params, callback) {//获取签名 必填参数
    var authorization = COS.getAuthorization({
      SecretId: '',
      SecretKey: 'A',
      Method: params.Method,
      Key: params.Key
    });
    callback(authorization);
  }
});

function scfRequest(fUrl,method,parmart){
  return new Promise((resolve, reject) => {
    wx.request({      //service-ocoqdd0t-1254065455.ap-beijing.apigateway.myqcloud.com
      url: URL_base+fUrl,
      method: method,
      header: {"content-type": 'application/json'},
      data: parmart,
      success: function(res){     //这要注意返回的json名称有变化，要在控制台进行查看,千万不要用id这样的保留字作自定义的列名
        resolve(res);
      },
      fail: function(error){
        reject(error);
      }
    })
  })
}
module.exports = {
cosUploadFile: function(filePath){
  let Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
  cos.postObject({
    Bucket: 'lg-la2p7duw-1254249743',
    Region: 'ap-shanghai',
    Key: Key,
    FilePath: filePath,
    onProgress: function (info) { console.log(JSON.stringify(info)) }
  }, requestCallback);
},

scfRequest: scfRequest,

signRecognition: function(){
  return Promise.resolve(lcRequest('setRole',))
},

signApi: function(source){
  let nDate = new Date();
  let dateTime = nDate.toGMTString();
  let auth = 'hmac id="SecretId", algorithm="hmac-sha1", headers="date source", signature="'
  signStr = "date: " + dateTime + "\n" + "source: " + source
  sign = b64_hmac_sha1(SecretKey, signStr);
  sign = auth + sign + "\""
  return sign, dateTime
},

signAiQQ: function(params,appKey){
  let paramsKey = Object.keys(params).sort();  // 1. 字典升序排序
  let str = '';
  paramsKey.forEach(paramKey=>{    // 2. 拼按URL键值对
    if (params[paramKey] !== '') { str += paramKey+'='+encodeURI(params[paramKey])+'&'; }
  })
  str += 'app_key=' + appKey;    // 3. 拼接app_key
  return md5(str).toUpperCase();    // 4. MD5运算+转换大写，得到请求签名
}

}
