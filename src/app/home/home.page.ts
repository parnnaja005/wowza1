import { Component, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist')mylist: IonList;
  
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems ();
  });
  }

  //CRATE
  addItem(){
    this.newItem.modefied = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item =>{
      this.newItem = <Item>{};
      this.showToast('Item added!')
      this.loadItems(); //Or add it to the array directly
    });
  }

  //READ
  loadItems() {
    this.storageService.getItem().then(items =>{
      this.items = items;
    });
  }

  //UPDATE
  updateItem(item: Item) {
    item.title = `Update: ${item.title}`;
    item.modefied = Date.now();

    this.storageService.updateItem(item).then(item =>{
      this.showToast('Item updated!');
      this.mylist.closeSlidingItems(); //fix or sliding is stuck adterwards
      this.loadItems(); // or update it inside the array diretly
    });
  }
  //DELETE
  deleteItem(item: Item){
    this.storageService.deleteItem(item.id).then(item =>{
      this.showToast('Item removed!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  //HELPER
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}