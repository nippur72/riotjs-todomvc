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
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp(options) {
        var _this = this;
        _super.call(this);
        store.initDb();
        riot.route(function (hash, filter) {
            store.setFilter(filter);
        });
        store.on("update", function () {
            _this.items = store.getItems(store.data.filter);
            _this.update();
        });
    }
    TodoApp.prototype.handleKeyup = function (e) {
        var inputElement = this["new-todo"];
        var val = inputElement.value.trim();
        if (val && e.which === 13) {
            inputElement.value = ''; // TODO
            store.addItem(val);
        }
    };
    TodoApp.prototype.handleToggleAll = function () {
        store.toggleAll();
    };
    TodoApp.prototype.allTasksDone = function () {
        return store.isDone;
    };
    TodoApp = __decorate([
        template("tags/todo-app.html")
    ], TodoApp);
    return TodoApp;
})(Riot.Element);
//# sourceMappingURL=todo-app.js.map