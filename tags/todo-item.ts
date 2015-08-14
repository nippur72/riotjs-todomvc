const ENTER_KEY = 13;
const ESC_KEY = 27;

@template("tags/todo-item.html")

class TodoItem extends Riot.Element
{  
   item;
   editing: boolean;
   
   constructor(opts)
   {
      super();

      this.item = opts.item;      

      store.on("update",()=>
      {
         this.item = opts.item;
         this.editing = this.item !==undefined && store.data.editing_id == this.item.id;  // TODO investigate undef
         this.update();

         if(this.editing) this["inputfield"].focus();
      });        
   }
   
   handleRemoveItem(e) 
   {
      store.removeItem(this.item);
   }
      
   handleStartEdit()
   {      
      store.startEditItem(this.item);      
   }
   
   handleEditKeydown(e: KeyboardEvent)
   { 
      switch(e.which) 
      {
         case ENTER_KEY:
            this["inputfield"].blur();            
            break;

         case ESC_KEY:
            store.cancelEditItem();     
            break;
      }    

      return true;   
   }
  
   handleEditBlur()
   {      
      this.editing = false;
      var val = this["inputfield"].value.trim();      
      store.endEditItem({ name: val, id: this.item.id });      
   }
      
   handleToggleItem()
   {
      store.toggleItem(this.item.id);
   }
}
