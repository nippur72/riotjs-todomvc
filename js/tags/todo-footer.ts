
@template("js/tags/todo-footer.html")

class TodoFooter extends Riot.Element
{
   filter: string;
   num_active: number;
   num_completed: number;
   word_items: string;
   showFooter: boolean;
   showClear: boolean;
   
   constructor(options)
   {
      super();           
      store.on("update", ()=>              
      {
         this.filter        = store.data.filter;
         this.num_active    = store.getItems('active').length;
         this.num_completed = store.getItems('completed').length;
         this.word_items    = (this.num_active === 1 ? 'item' : 'items');
         this.showFooter    = (this.num_active + this.num_completed > 0);
         this.showClear     = (this.num_completed > 0);
         this.update();
      });
   }

   handleClearCompleted()
   {
      store.clearCompleted();
   }   
}

