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
var FooterPresenter = (function (_super) {
    __extends(FooterPresenter, _super);
    function FooterPresenter(options) {
        var _this = this;
        _super.call(this);
        this.filterState = null;
        this.todo = options.model;
        // Bind model events
        this.todo.on('load', function () { return _this.load(_this.filterState); });
        this.todo.on('add remove toggle load', function () { return _this.counts(); });
    }
    FooterPresenter.prototype.load = function (filter) {
        this.filterState = filter;
    };
    FooterPresenter.prototype.counts = function () {
        this.num_active = this.todo.getItems('active').length,
            this.num_completed = this.todo.getItems('completed').length,
            this.word_items = (this.num_active === 1 ? 'item' : 'items');
        this.showFooter = (this.num_active + this.num_completed > 0);
        this.showClear = (this.num_completed > 0);
        this.update();
    };
    FooterPresenter.prototype.clearcompleted = function () {
        this.todo.remove('completed');
    };
    FooterPresenter = __decorate([
        template("\n    <footer show=\"{showFooter}\">\n      <span id=\"todo-count\"><strong>{num_active}</strong> {word_items} left</span>\n      <ul id=\"filters\">\n        <li><a class=\"{filterState==''         ?'selected':''}\" href=\"#/\"         >All</a></li>\n        <li><a class=\"{filterState=='active'   ?'selected':''}\" href=\"#/active\"   >Active</a></li>\n        <li><a class=\"{filterState=='completed'?'selected':''}\" href=\"#/completed\">Completed</a></li>\n      </ul>\n      <button id=\"clear-completed\" onclick=\"{clearcompleted}\" show=\"{showClear}\">Clear completed ({num_completed})</button>\n    </footer>\n"),
        component("footer-presenter")
    ], FooterPresenter);
    return FooterPresenter;
})(Riot.Element);
FooterPresenter.register();
//# sourceMappingURL=footer_presenter.js.map