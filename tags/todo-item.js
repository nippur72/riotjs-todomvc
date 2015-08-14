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
    function TodoItem(opts) {
        var _this = this;
        _super.call(this);
        this.item = opts.item;
        store.on("update", function () {
            _this.item = opts.item;
            _this.editing = _this.item !== undefined && store.data.editing_id == _this.item.id; // TODO investigate undef
            _this.update();
            if (_this.editing)
                _this["inputfield"].focus();
        });
    }
    TodoItem.prototype.handleRemoveItem = function (e) {
        store.removeItem(this.item);
    };
    TodoItem.prototype.handleStartEdit = function () {
        store.startEditItem(this.item);
    };
    TodoItem.prototype.handleEditKeydown = function (e) {
        switch (e.which) {
            case ENTER_KEY:
                this["inputfield"].blur();
                break;
            case ESC_KEY:
                store.cancelEditItem();
                break;
        }
        return true;
    };
    TodoItem.prototype.handleEditBlur = function () {
        this.editing = false;
        var val = this["inputfield"].value.trim();
        store.endEditItem({ name: val, id: this.item.id });
    };
    TodoItem.prototype.handleToggleItem = function () {
        store.toggleItem(this.item.id);
    };
    TodoItem = __decorate([
        template("tags/todo-item.html")
    ], TodoItem);
    return TodoItem;
})(Riot.Element);
//# sourceMappingURL=todo-item.js.map