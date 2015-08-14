var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NO_EDITING = -1;
var TodoStore = (function (_super) {
    __extends(TodoStore, _super);
    function TodoStore() {
        var _this = this;
        _super.call(this);
        this._data = {
            items: {},
            filter: "",
            editing_id: NO_EDITING
        };
        this.db = new DB('riot-todo');
        // connects action to resolvers 
        this.on("initDb", function () { return _this._initDb(); });
        this.on("setFilter", function (filter) { return _this._setFilter(filter); });
        this.on("addItem", function (name, done) { return _this._addItem(name, done); });
        this.on("startEditItem", function (item) { return _this._startEditItem(item); });
        this.on("endEditItem", function (item) { return _this._endEditItem(item); });
        this.on("cancelEditItem", function () { return _this._cancelEditItem(); });
        this.on("removeItem", function (item) { return _this._removeItem(item); });
        this.on("clearCompleted", function () { return _this._clearCompleted(); });
        this.on("toggleItem", function (item) { return _this._toggleItem(item); });
        this.on("toggleAll", function () { return _this._toggleAll(); });
        // sync database
        this.on("update", function () {
            _this.db.write(_this._data.items);
        });
    }
    Object.defineProperty(TodoStore.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    TodoStore.prototype.update = function () {
        this.trigger("update");
    };
    // actions 
    TodoStore.prototype.initDb = function () {
        this.trigger("initDb");
    };
    TodoStore.prototype.setFilter = function (filter) {
        this.trigger("setFilter", filter);
    };
    TodoStore.prototype.addItem = function (name, done) {
        this.trigger("addItem", name, done);
    };
    TodoStore.prototype.startEditItem = function (id) {
        this.trigger("startEditItem", id);
    };
    TodoStore.prototype.endEditItem = function (item) {
        this.trigger("endEditItem", item);
    };
    TodoStore.prototype.cancelEditItem = function () {
        this.trigger("cancelEditItem");
    };
    TodoStore.prototype.removeItem = function (item) {
        this.trigger("removeItem", item);
    };
    TodoStore.prototype.toggleItem = function (item) {
        this.trigger("toggleItem", item);
    };
    TodoStore.prototype.toggleAll = function () {
        this.trigger("toggleAll");
    };
    TodoStore.prototype.clearCompleted = function () {
        this.trigger("clearCompleted");
    };
    // =================== resolvers ===================
    TodoStore.prototype._initDb = function () {
        this._data.items = this.db.read() || {};
        this.update();
    };
    TodoStore.prototype._setFilter = function (filter) {
        this._data.filter = filter;
        this.update();
    };
    TodoStore.prototype._addItem = function (name, done) {
        var item = {
            id: this.generateId(),
            name: name,
            done: done === undefined ? false : done
        };
        this._data.items[item.id] = item;
        this.update();
    };
    TodoStore.prototype._startEditItem = function (item) {
        this._data.editing_id = item.id;
        this.update();
    };
    TodoStore.prototype._endEditItem = function (item) {
        if (!item.name) {
            this._removeItem(item.id);
            return;
        }
        else {
            this._data.items[item.id] = item;
        }
        this._data.editing_id = NO_EDITING;
        this.update();
    };
    TodoStore.prototype._cancelEditItem = function () {
        this._data.editing_id = NO_EDITING;
        this.update();
    };
    TodoStore.prototype._removeItem = function (item) {
        delete this._data.items[item.id];
        this.update();
    };
    TodoStore.prototype._clearCompleted = function () {
        var _this = this;
        this.getItems("completed").map(function (item) {
            delete _this._data.items[item.id];
        });
        this.update();
    };
    TodoStore.prototype._toggleItem = function (id) {
        this._data.items[id].done = !this._data.items[id].done;
        this.update();
    };
    TodoStore.prototype._toggleAll = function () {
        var _this = this;
        var filter = this.isDone ? 'completed' : 'active';
        this.getItems(filter).forEach(function (item) {
            _this._data.items[item.id].done = !_this._data.items[item.id].done;
        });
        this.update();
    };
    // =============== business logic utils ===============
    TodoStore.prototype.getItems = function (filter) {
        var _this = this;
        return Object.keys(this._data.items).filter(function (id) {
            return _this.matchFilter(_this._data.items[id], filter);
        }).map(function (id) {
            return _this._data.items[id];
        });
    };
    TodoStore.prototype.matchFilter = function (item, filter) {
        return !filter ||
            filter.toString() === item.id.toString() ||
            filter === (item.done ? 'completed' : 'active');
    };
    TodoStore.prototype.generateId = function () {
        var keys = Object.keys(this._data.items), i = keys.length;
        return (i ? this._data.items[keys[i - 1]].id + 1 : i + 1);
    };
    Object.defineProperty(TodoStore.prototype, "isDone", {
        get: function () {
            return this.getItems('active').length == 0;
        },
        enumerable: true,
        configurable: true
    });
    return TodoStore;
})(Riot.Observable);
//# sourceMappingURL=todo.js.map