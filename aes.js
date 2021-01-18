const express = require('express')
const CryptoJS = require("crypto-js")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('')
})

app.listen(port, () => {
    let aes = new AES();
    let plainText = "{\n" +
        "  \"name\":\"Puthy\",\n" +
        "  \"gender\":\"M\",\n" +
        "}";
    let encrypted = aes.encrypt(plainText);
    console.log('encrypted <- ' + encrypted);
    let decrypted = aes.decrypt(encrypted);
    console.log('decrypted <- ' + decrypted);
})

let ENCRYPTION_KEY = "Asiwaw0AwRr1M7yARUA2GSERdiNNwkkf";
let ENCRYPTION_IV="UHIqAoGqqoeBIxTO";
let ENCRYPTION_SALT = "bWX3R1DB9WavFoTz";
let ITERATION_COUNT = 1024;
let KEY_SIZE = 256;

class AES {

    constructor() {
        this.key = this.generateKey();
    }

    generateKey() {
        return CryptoJS.PBKDF2(ENCRYPTION_KEY, CryptoJS.enc.Utf8.parse(ENCRYPTION_SALT), {
            keySize: KEY_SIZE / 32,
            hasher: CryptoJS.algo.SHA256,
            iterations: ITERATION_COUNT
        });
    }

    encrypt(plainText) {
        let encrypted = CryptoJS.AES.encrypt(plainText, this.key, {iv: CryptoJS.enc.Utf8.parse(ENCRYPTION_IV)});
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    decrypt(encrypted) {
        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(encrypted)
        });
        let decrypted = CryptoJS.AES.decrypt(cipherParams, this.key, {iv: CryptoJS.enc.Utf8.parse(ENCRYPTION_IV)});
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
