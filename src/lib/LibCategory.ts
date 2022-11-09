import LibSqlite from './LibSqlite';

//
const LibCategory = {
  /**
  * getList
  * @param
  *
  * @return
  */  
   getList: async function(): Promise<any>
  {
    try{
      const db = await LibSqlite.getDb();
      const result = await LibSqlite.select(db, "SELECT id, name FROM Category;");
      if(result === null) {
        return [];
      }
      console.log(result);
      const items: any[] = [];
      result.forEach(function (item: any){
        let row = {id: 0, name: ""};
        console.log(item);
        if(item.length > 0) {
          row.id = item[0];
          row.name = item[1];
        }
        items.push(row);
      });
      console.log(items);
      return items;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getList');
    }   
  },

}
export default LibCategory;
