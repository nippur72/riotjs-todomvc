
class DB
{
   private _store = window.localStorage;
   private key;

   constructor(key)
   {
      this.key = key;
   }

   read()
   {
      var data = this._store[this.key]         
      if(data===undefined) return undefined;
      else return JSON.parse(this._store[this.key]);
   }

   write(value)
   {     
      this._store[this.key] = JSON.stringify(value);
   }
}
