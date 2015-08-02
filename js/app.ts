/// <reference path="../bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

'use strict';

(function ($) {
    var todo = new Todo();
    routes({todo: todo});

    // Binds the Todo Presenter
    todoPresenter($("#todoapp"), {
        model: todo,
        template: $('#task-template').html(),
    });

    // Binds the Footer Presenter
    var el = FooterPresenter.createElement({model: todo});
    var root = document.getElementById("footer");
    root.appendChild(el);
    
})(jQuery);

riot.mount("*");