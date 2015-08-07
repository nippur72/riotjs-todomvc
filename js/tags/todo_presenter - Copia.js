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
var ENTER_KEY = 13;
var ESC_KEY = 27;
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        _super.apply(this, arguments);
    }
    //}).on('click', '.destroy', function(e) {
    TodoItem.prototype.destroy = function (e) {
        this.todo.remove(this.id);
    };
    // }).on('dblclick', '.todo-task label', function(e) {
    TodoItem.prototype.labeldoubleclick = function () {
        //var el = getTaskElement(e.target);
        //el.addClass('editing').find('.edit').focus();
    };
    // }).on('keydown', '.edit', function(e) {
    TodoItem.prototype.editkeydown = function (e) {
        var el = $(this["inputfield"]);
        var val = $.trim(this["inputfield"].value);
        switch (e.which) {
            case ENTER_KEY:
                this.todo.edit({ name: val, id: this.id });
                break;
            case ESC_KEY:
                //this.getTaskElement(el).removeClass('editing');
                break;
        }
    };
    //}).on('blur', '.edit', function(e) {
    TodoItem.prototype.editBlur = function () {
        /*
        var el = $(e.target);
        var val = $.trim(this.value);
        if (!getTaskElement(el).hasClass('editing')) return;
        todo.edit({ name: val, id: getTaskId(el) });
        getTaskElement(el).removeClass('editing');
        */
    };
    //.on('click', '.toggle', function(e) {
    TodoItem.prototype.toggle = function () {
        this.todo.toggle(this.id);
    };
    TodoItem = __decorate([
        template("\n    <div>\n      <li id=\"task_{id}\" data-task=\"{id}\">\n        <div class=\"view todo-task\">\n          <input class=\"toggle\" type=\"checkbox\">\n          <label click=\"{toggle}\" on dblclick={labeldoubleclick}>{name}</label>\n          <button onclick=\"{destroy}\" class=\"destroy\"></button>\n        </div>\n        <input id=\"inputfield\" class=\"edit\" value=\"{name}\" onblur=\"{editBlur} onkeydown={editkeydown}\">\n      </li>\n    </div>\n"),
        component("todo-item")
    ], TodoItem);
    return TodoItem;
})(Riot.Element);
TodoItem.register();
//# sourceMappingURL=todo_presenter - Copia.js.map