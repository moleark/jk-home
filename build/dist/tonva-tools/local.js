var Data = /** @class */ (function () {
    function Data(name) {
        this.name = name;
    }
    Data.prototype.get = function () {
        if (this.value !== undefined)
            return this.value;
        var v = localStorage.getItem(this.name);
        return this.value = v === null ? undefined : JSON.parse(v);
    };
    Data.prototype.set = function (value) {
        if (!value) {
            this.clear();
            return;
        }
        this.value = value;
        localStorage.setItem(this.name, JSON.stringify(value));
    };
    Data.prototype.clear = function () {
        this.value = undefined;
        localStorage.removeItem(this.name);
    };
    return Data;
}());
export { Data };
var LocalData = /** @class */ (function () {
    function LocalData() {
        this.user = new Data('user');
        this.guest = new Data('guest');
        this.unit = new Data('unit');
        this.homeTabCur = new Data('homeTabCur');
    }
    LocalData.prototype.logoutClear = function () {
        [
            this.user,
            this.homeTabCur
        ].map(function (d) { return d.clear(); });
    };
    return LocalData;
}());
export { LocalData };
//# sourceMappingURL=local.js.map