'use strict';

@template(`
    <div>
      <li id="task_{id}" data-task="{id}">
        <div class="view todo-task">
          <input class="toggle" type="checkbox">
          <label click="{toggle}">{name}</label>
          <button onclick="{destroy}" class="destroy"></button>
        </div>
        <input id="inputfield" class="edit" value="{name}" onblur="{editBlur}">
      </li>
    </div>
`)

@component("todo-item")

class TodoItem extends Riot.Element
{
   id;
   name;
   todo;

   //}).on('click', '.destroy', function(e) {
   destroy(e) {
      this.todo.remove(this.id);
   }

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
   editBlur()
   {
      var el = $(e.target);
      var val = $.trim(this.value);
      if (!getTaskElement(el).hasClass('editing')) return;
      todo.edit({ name: val, id: getTaskId(el) });
      getTaskElement(el).removeClass('editing');
   }
   
   //.on('click', '.toggle', function(e) {
   toggle()
   {
      this.todo.toggle(this.id);
   }
}

//*************************************************************

@template(`
    <section id="todoapp">
      <header id="header">
        <h1>todos</h1>
        <input id="new-todo" placeholder="What needs to be done?" onkeyup="{keypressed}" autofocus>
      </header>

      <section id="main">
        <input id="toggle-all" type="checkbox" onclick="{toggleAll}">
        <label for="toggle-all">Mark all as complete</label>
        <ul id="todo-list"></ul>
      </section>

      <footer-presenter id="footer"></footer-presenter>
    </section>
`)

@component("todo-app")

class TodoApp extends Riot.Element
{
   todo;
   filterState;
   $list;
   ENTER_KEY = 13;
   ESC_KEY = 27;

   constructor(options)
   {        
      super();

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
    keypressed(e)
    {
        var val = $.trim(this["new-todo"].value);
        if (val && e.which === 13) {
            this.todo.add(val);
            this["new-todo"].value = '';
        }
    }

    /* Listen to user events */
    // .on('click', '#toggle-all'
    toggleAll()
    {
      this.todo.toggleAll();
    }

    /* Private functions */
    load(filter) {
        this.filterState = filter;
        var items = this.todo.items(this.filterState);
        $(this['main'], this.root).toggle(this.todo.items().length > 0);
        this.$list.empty() && items.forEach(this.add);
    }

    reload() {
        this.load(this.filterState);
    }

    toggle(item) {
        this.toggleTask($('#task_' + item.id, this.$list), !!item.done);
    }

    edit(item) {
        var el = $('#task_' + item.id, this.$list);
        el.removeClass('editing');
        $('label, .edit', el).text(item.name).val(item.name);
    }

    add(item) {
        $(this["main"], this.root).show();
        var task = TodoItem.createElement();
        this.$list.append(task);
        this.toggleTask(task, !!item.done);
    }

    toggleTask(task, flag) {
        task.toggleClass('completed', flag);
        task.find(':checkbox').prop('checked', flag);
        this['#toggle-all'].prop('checked', this.todo.isDone());
    }

    getTaskElement(element) {
        return $(element).closest('[data-task]');
    }
}



