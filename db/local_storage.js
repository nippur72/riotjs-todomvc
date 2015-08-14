var DB = (function () {
    function DB(key) {
        this._store = window.localStorage;
        this.key = key;
    }
    DB.prototype.read = function () {
        var data = this._store[this.key];
        if (data === undefined)
            return undefined;
        else
            return JSON.parse(this._store[this.key]);
    };
    DB.prototype.write = function (value) {
        this._store[this.key] = JSON.stringify(value);
    };
    return DB;
})();
//# sourceMappingURL=local_storage.js.map