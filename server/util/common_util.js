const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

String.prototype.stripAccents = function() {
    var translate_re = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
    var translate = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
    return (this.replace(translate_re, function(match){
            return translate.substr(translate_re.source.indexOf(match)-1, 1); })
    );
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.trimWord = function(length, addEllipsis) {
    var target = this;
    if(target.length < length){
        return target;
    }

    var trimPosition = target.indexOf(' ', length);
    if(trimPosition > 0){
        target = target.substring(0, trimPosition);
    }

    if(addEllipsis) {
        target += '...';
    }
    return target.substr(0);
};

exports.getCtxtChannel = function() {
    return 'Phase_' + moment().format('YYYY_MM_DD');
};

exports.mergeOptions = function(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};


exports.token = function (userId, role) {
    return jwt.sign({userId: userId, role: role}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRE_TOKEN})
};

exports.comparePass = function (text, hash) {
    return new Promise(function (resolve, reject) {
        hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
        bcrypt.compare(text, hash, function(err, res) {
            resolve(res);
        });
    })
};

exports.hashPass = function(text){
    return new Promise(function (resolve, reject) {
        bcrypt.hash(text, 10, function(err, hash) {
            if (err) reject(err);
            hash = hash.replace(/^\$2a(.+)$/i, '$2y$1');
            resolve(hash)
        });
    })
};

exports.genCode = function(){
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};


exports.genSignature = function (path, wscApiKey, wscAccessKey) {
    let timestamp = Math.round(new Date().getTime()/1000);
    let hmacData = (timestamp+':'+path+':'+wscApiKey);
    let signature = crypto.createHmac('sha256',wscApiKey).update(hmacData).digest('hex');

    return {
        'wsc-access-key': wscAccessKey,
        'wsc-timestamp': timestamp,
        'wsc-signature': signature,
        'Content-Type': 'application/json'
    };
};

exports.genMoMoSignature = function (data_string, key) {
    return crypto.createHmac('sha256',key).update(data_string).digest('hex');
};

exports.slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};

exports.today = function (){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy
}
