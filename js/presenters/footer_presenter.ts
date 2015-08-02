'use strict';

@template(`
    <footer>
      <span id="todo-count"><strong>{active}</strong> {items} left</span>
      <ul id="filters">
        <li><a href="#/">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button id="clear-completed">Clear completed ({completed})</button>
    </footer>
`)

@component("footer-presenter")

class FooterPresenter extends Riot.Element
{
   private todo;   
   private filterState;

   active;
   completed;
   items;

   constructor(options)
   {
      super();

      var element = this.root;

      this.todo = options.model;   
      this.filterState = null;

      // Bind model events
      this.todo.on('load', this.load);
      this.todo.on('add remove toggle load', this.counts);
   }

   load(filter) {
      this.filterState = filter;
   }

   counts() {
      this.getData();
      //element.html(riot.render(template, data));
      //$('a[href="#/'+ filterState +'"]', element).addClass('selected');
      this.toggle();
      this.update();
   }

   toggle() {
      var showClear = (this.completed > 0),
      showFooter = (this.active + this.completed > 0);

      //element.toggle(showFooter);
      //$('#clear-completed', element).toggle(showClear);
   }

   getData() {
      this.active    = this.todo.items('active').length,
      this.completed = this.todo.items('completed').length,
      this.items     = (this.active === 1 ? 'item' : 'items');
   }    
}

    }).on('click', '#clear-completed', function() {
        todo.remove('completed');


FooterPresenter.register();
