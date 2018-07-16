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
