
@template("js/tags/todo-footer.html")

class TodoFooter extends Riot.Element
{
   private todo;   
   private filterState = null;

   num_active: number;
   num_completed: number;
   word_items: string;
   showFooter: boolean;
   showClear: boolean;

   constructor(options)
   {
      super();      

      this.todo = TodoStore.instance; //options.model;   

      // Bind model events
      this.todo.on('load', (filter)=>this.load(filter));
      this.todo.on('add remove toggle load', ()=>this.counts());
   }

   load(filter) {
      this.filterState = filter;      
   }

   counts() {
      this.num_active    = this.todo.getItems('active').length,
      this.num_completed = this.todo.getItems('completed').length,
      this.word_items    = (this.num_active === 1 ? 'item' : 'items');
      this.showFooter    = (this.num_active + this.num_completed > 0);
      this.showClear     = (this.num_completed > 0);

      this.update();
   }

   clearcompleted()
   {
      this.todo.remove('completed');
   }   
}


