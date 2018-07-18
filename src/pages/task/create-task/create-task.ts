import { Task } from './../../../models/task.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CreateTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  public task: Task = new Task(); 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.task.type = this.navParams.get('taskType');
  }

  /**
   * @description 创建任务
   * @author 汤伟亮
   * @memberof CreateTaskPage
   */
  createTask(){
    if(Object.keys(this.task).length>0){
      let newTaskJson = JSON.stringify(this.task)
      localStorage.newTask = newTaskJson;
      let data = JSON.parse(localStorage.data)
      if(Object.keys(data).length>0){
        for(let i in data){
          if(data[i].id == this.task.type){
            console.log('写data')
            data[i].tasks.push(this.task)
          }
        }
      }
      this.viewCtrl.dismiss(data);
    }
    // 
    
  }

}
