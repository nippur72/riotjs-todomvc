var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var TodoFooter = (function (_super) {
    __extends(TodoFooter, _super);
    function TodoFooter(options) {
        var _this = this;
        _super.call(this);
        store.on("update", function () {
            _this.filter = store.data.filter;
            _this.num_active = store.getItems('active').length;
            _this.num_completed = store.getItems('completed').length;
            _this.word_items = (_this.num_active === 1 ? 'item' : 'items');
            _this.showFooter = (_this.num_active + _this.num_completed > 0);
            _this.showClear = (_this.num_completed > 0);
            _this.update();
        });
    }
    TodoFooter.prototype.handleClearCompleted = function () {
        store.clearCompleted();
    };
    TodoFooter = __decorate([
        template("js/tags/todo-footer.html")
    ], TodoFooter);
    return TodoFooter;
})(Riot.Element);
//# sourceMappingURL=todo-footer.js.map