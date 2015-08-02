'use strict';
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
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        _super.apply(this, arguments);
    }
    //}).on('click', '.destroy', function(e) {
    TodoItem.prototype.destroy = function (e) {
        this.todo.remove(this.id);
    };
    /*
     }).on('dblclick', '.todo-task label', function(e) {
         var el = getTaskElement(e.target);
         el.addClass('editing').find('.edit').focus();
    */
    /*
     }).on('keydown', '.edit', function(e) {
         var el = $(e.target), val = $.trim(this.value);
         switch(e.which) {
           case ENTER_KEY:
             todo.edit({ name: val, id: getTaskId(el) });
             break;
 
           case ESC_KEY:
             getTaskElement(el).removeClass('editing');
             break;
         }
    */
    //}).on('blur', '.edit', function(e) {
    TodoItem.prototype.editBlur = function () {
        var el = $(e.target);
        var val = $.trim(this.value);
        if (!getTaskElement(el).hasClass('editing'))
            return;
        todo.edit({ name: val, id: getTaskId(el) });
        getTaskElement(el).removeClass('editing');
    };
    //.on('click', '.toggle', function(e) {
    TodoItem.prototype.toggle = function () {
        this.todo.toggle(this.id);
    };
    TodoItem = __decorate([
        template("\n    <div>\n      <li id=\"task_{id}\" data-task=\"{id}\">\n        <div class=\"view todo-task\">\n          <input class=\"toggle\" type=\"checkbox\">\n          <label click=\"{toggle}\">{name}</label>\n          <button onclick=\"{destroy}\" class=\"destroy\"></button>\n        </div>\n        <input id=\"inputfield\" class=\"edit\" value=\"{name}\" onblur=\"{editBlur}\">\n      </li>\n    </div>\n"),
        component("todo-item")
    ], TodoItem);
    return TodoItem;
})(Riot.Element);
//*************************************************************
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp(options) {
        _super.call(this);
        this.ENTER_KEY = 13;
        this.ESC_KEY = 27;
        this.todo = options.model;
        this.$list = this["#todo-list"];
        this.filterState = null;
        /* Listen to model events */
        this.todo.on('toggle', this.toggle);
        this.todo.on('edit', this.edit);
        // Reload the list
        this.todo.on('load', this.load);
        this.todo.on('add remove toggle', this.reload);
    }
    // element.on('keyup', '#new-todo'
    TodoApp.prototype.keypressed = function (e) {
        var val = $.trim(this["new-todo"].value);
        if (val && e.which === 13) {
            this.todo.add(val);
            this["new-todo"].value = '';
        }
    };
    /* Listen to user events */
    // .on('click', '#toggle-all'
    TodoApp.prototype.toggleAll = function () {
        this.todo.toggleAll();
    };
    /* Private functions */
    TodoApp.prototype.load = function (filter) {
        this.filterState = filter;
        var items = this.todo.items(this.filterState);
        $(this['main'], this.root).toggle(this.todo.items().length > 0);
        this.$list.empty() && items.forEach(this.add);
    };
    TodoApp.prototype.reload = function () {
        this.load(this.filterState);
    };
    TodoApp.prototype.toggle = function (item) {
        this.toggleTask($('#task_' + item.id, this.$list), !!item.done);
    };
    TodoApp.prototype.edit = function (item) {
        var el = $('#task_' + item.id, this.$list);
        el.removeClass('editing');
        $('label, .edit', el).text(item.name).val(item.name);
    };
    TodoApp.prototype.add = function (item) {
        $(this["main"], this.root).show();
        var task = TodoItem.createElement();
        this.$list.append(task);
        this.toggleTask(task, !!item.done);
    };
    TodoApp.prototype.toggleTask = function (task, flag) {
        task.toggleClass('completed', flag);
        task.find(':checkbox').prop('checked', flag);
        this['#toggle-all'].prop('checked', this.todo.isDone());
    };
    TodoApp.prototype.getTaskElement = function (element) {
        return $(element).closest('[data-task]');
    };
    TodoApp = __decorate([
        template("\n    <section id=\"todoapp\">\n      <header id=\"header\">\n        <h1>todos</h1>\n        <input id=\"new-todo\" placeholder=\"What needs to be done?\" onkeyup=\"{keypressed}\" autofocus>\n      </header>\n\n      <section id=\"main\">\n        <input id=\"toggle-all\" type=\"checkbox\" onclick=\"{toggleAll}\">\n        <label for=\"toggle-all\">Mark all as complete</label>\n        <ul id=\"todo-list\"></ul>\n      </section>\n\n      <footer-presenter id=\"footer\"></footer-presenter>\n    </section>\n"),
        component("todo-app")
    ], TodoApp);
    return TodoApp;
})(Riot.Element);
//# sourceMappingURL=todo_presenter.js.map