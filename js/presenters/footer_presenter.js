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
        _super.call(this);
        var element = this.root;
        this.todo = options.model;
        this.filterState = null;
        // Bind model events
        this.todo.on('load', this.load);
        this.todo.on('add remove toggle load', this.counts);
    }
    FooterPresenter.prototype.load = function (filter) {
        this.filterState = filter;
    };
    FooterPresenter.prototype.counts = function () {
        this.getData();
        //element.html(riot.render(template, data));
        //$('a[href="#/'+ filterState +'"]', element).addClass('selected');
        this.toggle();
        this.update();
    };
    FooterPresenter.prototype.toggle = function () {
        var showClear = (this.completed > 0), showFooter = (this.active + this.completed > 0);
        //element.toggle(showFooter);
        //$('#clear-completed', element).toggle(showClear);
    };
    FooterPresenter.prototype.getData = function () {
        this.active = this.todo.items('active').length,
            this.completed = this.todo.items('completed').length,
            this.items = (this.active === 1 ? 'item' : 'items');
    };
    FooterPresenter = __decorate([
        template("\n    <footer>\n      <span id=\"todo-count\"><strong>{active}</strong> {items} left</span>\n      <ul id=\"filters\">\n        <li><a href=\"#/\">All</a></li>\n        <li><a href=\"#/active\">Active</a></li>\n        <li><a href=\"#/completed\">Completed</a></li>\n      </ul>\n      <button id=\"clear-completed\">Clear completed ({completed})</button>\n    </footer>\n"),
        component("footer-presenter")
    ], FooterPresenter);
    return FooterPresenter;
})(Riot.Element);
on('click', '#clear-completed', function () {
    todo.remove('completed');
    FooterPresenter.register();
});
//# sourceMappingURL=footer_presenter.js.map