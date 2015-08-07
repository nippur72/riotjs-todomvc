const ENTER_KEY = 13;
const ESC_KEY = 27;

@template("js/tags/todo-item.html")

class TodoItem extends Riot.Element
{
   todo: TodoStore;
   item;

   editing = false;
   
   constructor(options)
   {
      super();

      this.item = options.item;
      this.todo = TodoStore.instance; //options.todo;    

      // Listen to model events      
      this.todo.on('edit toggle remove', ()=>this.update());        
      this.todo.on('edit', (item)=>this.editedItem(item) );        
   }
   
   removeItem(e) 
   {
      this.todo.remove(this.item.id);
   }
      
   startEdit()
   {      
      this.editing = true;
      this.update();      
      this["inputfield"].focus();
   }
   
   editkeydown(e: KeyboardEvent)
   { 
      switch(e.which) 
      {
         case ENTER_KEY:
            this["inputfield"].blur();            
            break;

         case ESC_KEY:
            this.editing = false;
            this.update();            
            break;
      }    

      return true;   
   }
  
   editBlur()
   {      
      this.editing = false;
      var val = $.trim(this["inputfield"].value);      
      this.todo.edit({ name: val, id: this.item.id });      
   }

   editedItem(item)
   {
      if(this.item.id==item.id)
      {
         this.item = item;
         this.update();
      }
   }
      
   toggleItem()
   {
      this.todo.toggle(this.item.id);
   }
}
