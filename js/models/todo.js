var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Task = (function () {
    function Task() {
    }
    return Task;
})();
var TodoStore = (function (_super) {
    __extends(TodoStore, _super);
    function TodoStore() {
        var _this = this;
        _super.call(this);
        this.db = DB('riot-todo');
        this.items = this.db.get();
        if (TodoStore._instance != null)
            throw "do not use new, use .instance";
        // sync database
        this.on('add remove toggle edit', function () {
            _this.db.put(_this.items);
        });
    }
    Object.defineProperty(TodoStore, "instance", {
        get: function () { return TodoStore._instance; },
        enumerable: true,
        configurable: true
    });
    ;
    TodoStore.prototype.on = function (a, b) { return "k"; };
    TodoStore.prototype.add = function (name, done) {
        var item = {
            id: this.generateId(),
            name: name,
            done: done === undefined ? false : done
        };
        this.items[item.id] = item;
        this.trigger('add', item);
    };
    TodoStore.prototype.edit = function (item) {
        if (!item.name) {
            return this.remove(item.id);
        }
        this.items[item.id] = item;
        this.trigger('edit', item);
    };
    TodoStore.prototype.remove = function (filter) {
        var _this = this;
        var removedItems = this.getItems(filter).map(function (item) {
            delete _this.items[item.id];
            return item;
        });
        this.trigger('remove', removedItems);
    };
    TodoStore.prototype.toggle = function (id) {
        this.items[id].done = !this.items[id].done;
        this.trigger('toggle', this.items[id]);
    };
    TodoStore.prototype.toggleAll = function () {
        var _this = this;
        var filter = this.isDone() ? 'completed' : 'active';
        this.getItems(filter).forEach(function (item) {
            _this.toggle(item.id);
        });
    };
    // @param filter: <empty>, id, 'active', 'completed'
    TodoStore.prototype.getItems = function (filter) {
        var _this = this;
        return Object.keys(this.items).filter(function (id) {
            return _this.matchFilter(_this.items[id], filter);
        }).map(function (id) {
            return _this.items[id];
        });
    };
    TodoStore.prototype.isDone = function () {
        return this.getItems('active').length == 0;
    };
    // Private methods
    TodoStore.prototype.generateId = function () {
        var keys = Object.keys(this.items), i = keys.length;
        return (i ? this.items[keys[i - 1]].id + 1 : i + 1);
    };
    TodoStore.prototype.matchFilter = function (item, filter) {
        return !filter ||
            filter.toString() === item.id.toString() ||
            filter === (item.done ? 'completed' : 'active');
    };
    TodoStore._instance = new TodoStore();
    return TodoStore;
})(Riot.Observable);
//# sourceMappingURL=todo.js.map