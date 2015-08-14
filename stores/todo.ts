interface Task
{
   id: number;
   name: string;
   done: boolean;
}

const NO_EDITING = -1;
    
class TodoStore extends Riot.Observable 
{    
   private _data =
   {
      items: { },
      filter: "", 
      editing_id: NO_EDITING     
   }
   
   public get data() 
   { 
      return this._data; 
   }

   private db = new DB('riot-todo');   

   constructor()
   {
      super();    
      
      // connects action to resolvers 
      this.on("initDb",         ()=>this._initDb());          
      this.on("setFilter",      (filter)=>this._setFilter(filter));          
      this.on("addItem",        (name,done)=>this._addItem(name,done));          
      this.on("startEditItem",  (item)=>this._startEditItem(item));          
      this.on("endEditItem",    (item)=>this._endEditItem(item));          
      this.on("cancelEditItem", ()=>this._cancelEditItem());          
      this.on("removeItem",     (item)=>this._removeItem(item));          
      this.on("clearCompleted", ()=>this._clearCompleted());          
      this.on("toggleItem",     (item)=>this._toggleItem(item));          
      this.on("toggleAll",      ()=>this._toggleAll());          

      // sync database
      this.on("update", ()=> 
      {
         this.db.write(this._data.items);
      });
   }  

   private update()
   {
      this.trigger("update");
   }
   
   // actions 
   public initDb()
   {
      this.trigger("initDb");
   }

   public setFilter(filter) 
   {    
      this.trigger("setFilter",filter);
   }

   public addItem(name, done?) 
   {    
      this.trigger("addItem",name,done);
   }

   public startEditItem(id) 
   {
      this.trigger("startEditItem", id);         
   }

   public endEditItem(item) 
   {
      this.trigger("endEditItem", item);         
   }

   public cancelEditItem() 
   {
      this.trigger("cancelEditItem");         
   }

   public removeItem(item) 
   {
      this.trigger("removeItem",item);         
   }

   public toggleItem(item) 
   {
      this.trigger("toggleItem",item);         
   }

   public toggleAll() 
   {
      this.trigger("toggleAll");         
   }

   public clearCompleted() 
   {
      this.trigger("clearCompleted");         
   }

   // =================== resolvers ===================

   private _initDb()
   {
      this._data.items = this.db.read() || {};      
      this.update();
   }

   private _setFilter(filter) 
   {
      this._data.filter = filter;
      this.update();          
   }

   private _addItem(name, done) 
   {    
      var item: Task = 
      {
         id:   this.generateId(), 
         name: name, 
         done: done === undefined ? false : done
      }

      this._data.items[item.id] = item;
      this.update();
   }   

   private _startEditItem(item) 
   {
      this._data.editing_id = item.id;
      this.update();
   }

   private _endEditItem(item) 
   {
      if(!item.name) 
      {
         this._removeItem(item.id);
         return;
      }
      else
      {
         this._data.items[item.id] = item;
      }
      this._data.editing_id = NO_EDITING;
      this.update();
   }

   private _cancelEditItem() 
   {
      this._data.editing_id = NO_EDITING;
      this.update();
   }

   private _removeItem(item) 
   {
      delete this._data.items[item.id];
      this.update();
   }

   private _clearCompleted() 
   {
      this.getItems("completed").map((item)=> 
      {
         delete this._data.items[item.id];         
      });

      this.update();
   }

   private _toggleItem(id) 
   {
      this._data.items[id].done = !this._data.items[id].done;
      this.update();
   }

   private _toggleAll() 
   {
      var filter = this.isDone ? 'completed' : 'active';
      this.getItems(filter).forEach((item)=> 
      {
         this._data.items[item.id].done = !this._data.items[item.id].done;
      });
      this.update();
   }

   // =============== business logic utils ===============
   
   public getItems(filter) 
   {
      return Object.keys(this._data.items).filter((id)=> {
         return this.matchFilter(this._data.items[id], filter);
      }).map((id)=> {
         return this._data.items[id];
      });
   }

   private matchFilter(item, filter) {
      return !filter ||
         filter.toString() === item.id.toString() ||
         filter === (item.done ? 'completed' : 'active');
   }

   private generateId() 
   {
      var keys = Object.keys(this._data.items), i = keys.length;
      return (i ? this._data.items[keys[i - 1]].id + 1 : i + 1);
   }

   get isDone()
   {
      return this.getItems('active').length == 0;
   }    
}
