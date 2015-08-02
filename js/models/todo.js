'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        _super.call(this);
        this.db = DB('riot-todo');
        this.items = this.db.get();
        // sync database
        this.on('add remove toggle edit', function () {
            this.db.put(this.items);
        });
    }
    Todo.prototype.add = function (name, done) {
        var item = {
            id: this.generateId(), name: name, done: done
        };
        this.items[item.id] = item;
        this.trigger('add', item);
    };
    Todo.prototype.edit = function (item) {
        if (!item.name) {
            return this.remove(item.id);
        }
        this.items[item.id] = item;
        this.trigger('edit', item);
    };
    Todo.prototype.remove = function (filter) {
        var removedItems = this.items(filter).map(function (item) {
            delete this.items[item.id];
            return item;
        });
        this.trigger('remove', removedItems);
    };
    Todo.prototype.toggle = function (id) {
        this.items[id].done = !this.items[id].done;
        this.trigger('toggle', this.items[id]);
    };
    Todo.prototype.toggleAll = function () {
        var filter = this.isDone() ? 'completed' : 'active';
        this.items(filter).forEach(function (item) {
            this.toggle(item.id);
        });
    };
    // @param filter: <empty>, id, 'active', 'completed'
    Todo.prototype._items = function (filter) {
        return Object.keys(this.items).filter(function (id) {
            return this.matchFilter(this.items[id], filter);
        }).map(function (id) {
            return this.items[id];
        });
    };
    Todo.prototype.isDone = function () {
        return this.items('active').length == 0;
    };
    // Private methods
    Todo.prototype.generateId = function () {
        var keys = Object.keys(this.items), i = keys.length;
        return (i ? this.items[keys[i - 1]].id + 1 : i + 1);
    };
    Todo.prototype.matchFilter = function (item, filter) {
        return !filter ||
            filter.toString() === item.id.toString() ||
            filter === (item.done ? 'completed' : 'active');
    };
    return Todo;
})(Riot.Observable);
//# sourceMappingURL=todo.js.map