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
var ENTER_KEY = 13;
var ESC_KEY = 27;
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem(options) {
        var _this = this;
        _super.call(this);
        this.editing = false;
        this.item = options.item;
        this.todo = TodoStore.instance; //options.todo;    
        // Listen to model events      
        this.todo.on('edit toggle remove', function () { return _this.update(); });
        this.todo.on('edit', function (item) { return _this.editedItem(item); });
    }
    TodoItem.prototype.removeItem = function (e) {
        this.todo.remove(this.item.id);
    };
    TodoItem.prototype.startEdit = function () {
        this.editing = true;
        this.update();
        this["inputfield"].focus();
    };
    TodoItem.prototype.editkeydown = function (e) {
        switch (e.which) {
            case ENTER_KEY:
                this["inputfield"].blur();
                break;
            case ESC_KEY:
                this.editing = false;
                this.update();
                break;
        }
        return true;
    };
    TodoItem.prototype.editBlur = function () {
        this.editing = false;
        var val = $.trim(this["inputfield"].value);
        this.todo.edit({ name: val, id: this.item.id });
    };
    TodoItem.prototype.editedItem = function (item) {
        if (this.item.id == item.id) {
            this.item = item;
            this.update();
        }
    };
    TodoItem.prototype.toggleItem = function () {
        this.todo.toggle(this.item.id);
    };
    TodoItem = __decorate([
        template("js/tags/todo-item.html")
    ], TodoItem);
    return TodoItem;
})(Riot.Element);
//# sourceMappingURL=todo-item.js.map