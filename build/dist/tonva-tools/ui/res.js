import _ from 'lodash';
export var resOptions = {
    lang: undefined,
    district: undefined,
};
export function setResOptions(lang, district) {
    resOptions.lang = lang;
    resOptions.district = district;
}
(function () {
    var lang, district;
    var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
        navigator.language; // ||   // All browsers
    //navigator.userLanguage; // IE <= 10
    if (!language) {
        lang = 'zh';
        district = 'CN';
    }
    else {
        var parts = language.split('-');
        lang = parts[0];
        if (parts.length > 1)
            district = parts[1];
    }
    setResOptions(lang, district);
}());
export function resLang(res) {
    var lang = resOptions.lang, district = resOptions.district;
    var ret = {};
    if (res === undefined)
        return ret;
    _.merge(ret, res._);
    var l = res[lang];
    if (l === undefined)
        return ret;
    _.merge(ret, l._);
    var d = l[district];
    if (d === undefined)
        return ret;
    _.merge(ret, d);
    var entity = ret.entity;
    if (entity !== undefined) {
        for (var i in entity) {
            entity[i.toLowerCase()] = entity[i];
        }
    }
    return ret;
}
//# sourceMappingURL=res.js.map