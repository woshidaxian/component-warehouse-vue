const crypto = require('crypto-js')
class Encryption {
  type = null
  params = { iv: '1234567899876543', salt: null, key: '1234567899876543' }
  /**
   * @description 初始化，赋值加密方法，加密参数
   * @param {String} type
   * @param {Object} args
   */
  constructor(type, args) {
    if (!type) {
      return
    }
    if (args) {
      Object.keys(args).forEach(i => {
        this.params[i] = args[i]
      })
    }
    this.type = type
  }

  /**
   * @description 加密
   * @param {String} str
   */
  getCrypto(str) {
    const notDeCryptoTypes = ['MD5', 'SHA1', 'SHA256', 'SHA512', 'RIPEMD160', 'Base64']
    if (notDeCryptoTypes.indexOf(this.type) !== -1) {
      // 不可解密
      return crypto[this.type](str).toString()
    }
    if (this.type == 'AES') {
      let key = crypto.enc.Utf8.parse(this.params.key)
      let iv = crypto.enc.Utf8.parse(this.params.iv)
      return crypto.AES.encrypt(str, key, { iv: iv }).toString()
    }
  }

  /**
   * @description 解密
   * @param {String} str
   */
  deCrypto(str) {
    if (this.type == 'AES') {
      let key = crypto.enc.Utf8.parse(this.params.key)
      let iv = crypto.enc.Utf8.parse(this.params.iv)
      return crypto.AES.decrypt(str, key, { iv: iv }).toString(crypto.enc.Utf8)
    }
  }

}

module.exports = {
  Encryption
}