@template("js/tags/todo-app.html")

class TodoApp extends Riot.Element
{
   // the store
   todo: TodoStore = TodoStore.instance; //= new TodoStore();

   // array of todo-items to display
   items: Array<Task>;

   // filter: "", "active", "completed"
   filterState: string = null;

   constructor(options)
   {        
      super();

      riot.route((hash,filter)=> 
      {                  
         this.todo.trigger('load', filter);
      });     

      // Reload the list
      this.todo.on('load', (filter)=>this.load(filter));
      this.todo.on('add remove toggle', ()=>this.reload());                 
   }
    
   newtodo_keyup(e)
   {
      var inputElement = this["new-todo"] as HTMLInputElement;
      var val = $.trim(inputElement.value);
      if (val && e.which === 13) {
         inputElement.value = ''; 
         this.todo.add(val);            
      }
   }
  
   allTasksDone()
   {               
      return this.todo.isDone();
   }

   toggleAll()
   {
      this.todo.toggleAll();
   }
   
   load(filter) {
      this.filterState = filter;
      this.items = this.todo.getItems(this.filterState);     

      this.update();
   }

   reload() {
      this.load(this.filterState);       
   }    
}


