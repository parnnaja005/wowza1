import { Injectable, IterableDiffers } from '@angular/core';

export interface Item {
  id: number,
  title: string,
  value: string,
  modefied: number
}

const ITEMS_KEY = 'my-item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  //Create
  addItem(item: Item):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(items){
        return this.storage.set(ITEMS_KEY, [item]);
      } else{
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  //Read
  getItem() : Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  //Update
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(!items || items.length ===0){
        return null;
      }

      let newItems: Item[] = [];
      for (let i of items){
        if (i.id ===item.id) {
          newItems.push(item);
        } else{
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });

  }

  //Delete
  deleteItem(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) =>{
      if(!items || items.length ===0){
        return null;
      }

      let toKeep: Item[] = [];
      
      for (let i of items){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
