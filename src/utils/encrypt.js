import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('2020081720200817') // 十六位十六进制数作为密钥
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (word) => {
    let encrypted = CryptoJS.AES.encrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
};
/**
 * 解密
 */
export const decrypt = (word) => {
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
};