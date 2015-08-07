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
        // the store
        this.todo = TodoStore.instance; //= new TodoStore();
        // filter: "", "active", "completed"
        this.filterState = null;
        riot.route(function (hash, filter) {
            _this.todo.trigger('load', filter);
        });
        // Reload the list
        this.todo.on('load', function (filter) { return _this.load(filter); });
        this.todo.on('add remove toggle', function () { return _this.reload(); });
    }
    TodoApp.prototype.newtodo_keyup = function (e) {
        var inputElement = this["new-todo"];
        var val = $.trim(inputElement.value);
        if (val && e.which === 13) {
            inputElement.value = '';
            this.todo.add(val);
        }
    };
    TodoApp.prototype.allTasksDone = function () {
        return this.todo.isDone();
    };
    TodoApp.prototype.toggleAll = function () {
        this.todo.toggleAll();
    };
    TodoApp.prototype.load = function (filter) {
        this.filterState = filter;
        this.items = this.todo.getItems(this.filterState);
        this.update();
    };
    TodoApp.prototype.reload = function () {
        this.load(this.filterState);
    };
    TodoApp = __decorate([
        template("js/tags/todo-app.html")
    ], TodoApp);
    return TodoApp;
})(Riot.Element);
//# sourceMappingURL=todo-app.js.map