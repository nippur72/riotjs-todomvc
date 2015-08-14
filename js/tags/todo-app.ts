@template("js/tags/todo-app.html")

class TodoApp extends Riot.Element
{   
   items: Array<Task>;     

   constructor(options)
   {        
      super();

      riot.route((hash,filter)=> 
      {                  
         store.setFilter(filter);            
      });     

      store.on("update", ()=>
      {
         this.items = store.getItems(store.data.filter);          
         this.update();
      });
   }
    
   handleKeyup(e)
   {
      var inputElement = this["new-todo"] as HTMLInputElement;
      var val = inputElement.value.trim();
      if (val && e.which === 13) {
         inputElement.value = '';  // TODO
         store.addItem(val);            
      }
   }
  
   handleToggleAll()
   {
      store.toggleAll();
   }

   allTasksDone()
   {               
      return store.isDone;
   }   
}


