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
        this.filterState = null;
        this.todo = TodoStore.instance; //options.model;   
        // Bind model events
        this.todo.on('load', function (filter) { return _this.load(filter); });
        this.todo.on('add remove toggle load', function () { return _this.counts(); });
    }
    TodoFooter.prototype.load = function (filter) {
        this.filterState = filter;
    };
    TodoFooter.prototype.counts = function () {
        this.num_active = this.todo.getItems('active').length,
            this.num_completed = this.todo.getItems('completed').length,
            this.word_items = (this.num_active === 1 ? 'item' : 'items');
        this.showFooter = (this.num_active + this.num_completed > 0);
        this.showClear = (this.num_completed > 0);
        this.update();
    };
    TodoFooter.prototype.clearcompleted = function () {
        this.todo.remove('completed');
    };
    TodoFooter = __decorate([
        template("js/tags/todo-footer.html")
    ], TodoFooter);
    return TodoFooter;
})(Riot.Element);
//# sourceMappingURL=todo-footer.js.map