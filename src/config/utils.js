import crypto from 'crypto-js'
import * as qiniu from 'qiniu-js'
import * as getData from './../api/server'
import { Message } from 'element-ui'
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,  //month
    "d+": this.getDate(),     //day
    "h+": this.getHours(),    //hour
    "m+": this.getMinutes(),  //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(format)) {
    format = format.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

export const upFile = async function (filePath, file, callback) {
  const key = filePath + new Date().getTime() + file.name
  let token = null
  const putExtra = {}
  const config = {
    region: qiniu.region.z0
  }
  const observer = {
    error(err){
      Message.error(err)
    },
    complete(res){
      callback(res)
    }
  }
  const res = await getData.getToken()
  if(res.data.code == 1){
    token = res.data.data
  }else{
    throw new Error("获取token失败")
  }
  const observable = qiniu.upload(file, key, token, putExtra, config)
  observable.subscribe(observer)
}

export const phoneRule = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//11位的电话号码
export const phoneRule2 = /(^(\d{3,4}-)?\d{7,8})$|((^(\d{3,4})?\d{7,8})$)|(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/;//8位固话+11位的电话号码
export const phoneRule3 = /(^([0-9]+(-?)[0-9]+)+)$/;//不限位数，只限制数字加-的电话号码 110等电话也可以输入
export const chinese = /^[\u4E00-\u9FA5]+$/;
export const number = /(^[1-9]([0-9]+)$)|(^[1-9]?$)/;
export const number0 = /(^[1-9]([0-9]+)$)|(^(0){1}$)|(^[1-9]?$)/;
export const price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
export const areaRule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
export const email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const bankCode = /^([1-9]{1})(\d{14}|\d{18})$/;
export const numberCode = /^(\w)+$/;
export const noChinese = /[^\u4E00-\u9FA5]+$/g;
export const contractCode = /^[\w\-_]+$/;

export const SHACrypto = function (str) {
  return crypto.SHA1(str).toString()
}