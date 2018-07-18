import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'page-wish',
  templateUrl: 'wish.html'
})
export class WishPage {

  text;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '编辑你的欲望',
      buttons: [
        {
          text: '新建',
          role: 'new',
          handler: () => {
            this.text = '你刚刚点击了新建';
          }
        },
        {
          text: '排序',
          handler: () => {
            this.text='你刚刚点击了排序';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.text ='你刚刚点击了取消';
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
