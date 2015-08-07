class Task
{
   id: number;
   name: string;
   done: boolean;
}
    
class TodoStore extends Riot.Observable 
{
    private static _instance:TodoStore = new TodoStore();

    static get instance() { return TodoStore._instance; };

    db = DB('riot-todo');
    items: Array<Task> = this.db.get();

    constructor()
    {
       super();       

       if(TodoStore._instance!=null) throw "do not use new, use .instance";

       // sync database
       this.on('add remove toggle edit', ()=> {
           this.db.put(this.items);
       });
    }

    on(a,b){ return "k"; }    

    add(name, done?) {
        var item: Task = {
          id:   this.generateId(), 
          name: name, 
          done: done===undefined?false:done
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
        var removedItems = this.getItems(filter).map((item)=> 
        {
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
        this.getItems(filter).forEach((item)=> 
        {
           this.toggle(item.id);
        });
    }

    // @param filter: <empty>, id, 'active', 'completed'
    getItems(filter) {
       return Object.keys(this.items).filter((id)=> {
            return this.matchFilter(this.items[id], filter);
        }).map((id)=> {
            return this.items[id];
        });
    }

    isDone() {
        return this.getItems('active').length == 0;
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
