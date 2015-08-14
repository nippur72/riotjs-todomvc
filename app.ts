/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />

'use strict';

var store = new TodoStore();

riot.settings.brackets = "{{ }}";

TodoItem.register();
TodoFooter.register();
TodoApp.register();

riot.mount("*");
riot.route.start();            
riot.route("#/");     


