'use strict';

class Todo extends Riot.Observable 
{
    db = DB('riot-todo');
    items = this.db.get();

    constructor()
    {
       super();       

       // sync database
       this.on('add remove toggle edit', function() {
           this.db.put(this.items);
       });
    }

    add(name, done) {
        var item = {
          id: this.generateId(), name: name, done: done
        };

        this.items[item.id] = item;
        this.trigger('add', item);
    }

    edit(item) {
        if (!item.name) {
          return this.remove(item.id);
        }

        this.items[item.id] = item;
        this.trigger('edit', item);
    }

    remove(filter) {
        var removedItems = this.items(filter).map(function(item) {
            delete this.items[item.id];
            return item;
        });
        this.trigger('remove', removedItems);
    }

    toggle(id) {
        this.items[id].done = !this.items[id].done;
        this.trigger('toggle', this.items[id]);
    }

    toggleAll() {
        var filter = this.isDone() ? 'completed' : 'active';
        this.items(filter).forEach(function(item) {
          this.toggle(item.id);
        });
    }

    // @param filter: <empty>, id, 'active', 'completed'
    _items(filter) {
        return Object.keys(this.items).filter(function(id) {
            return this.matchFilter(this.items[id], filter);
        }).map(function(id) {
            return this.items[id];
        });
    }

    isDone() {
        return this.items('active').length == 0;
    }

    // Private methods
    private generateId() {
        var keys = Object.keys(this.items), i = keys.length;
        return (i ? this.items[keys[i - 1]].id + 1 : i + 1);
    }

    private matchFilter(item, filter) {
        return !filter ||
            filter.toString() === item.id.toString() ||
            filter === (item.done ? 'completed' : 'active');
    }
}
