import { Task } from './../../models/task.model';
import { CreateTaskPage } from './create-task/create-task';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SlideModel } from '../../models/slide.model';

// const currentSlide = this.slides[this.slider.getActiveIndex()];
@Component({
  selector: 'page-task',
  templateUrl: 'task.html'
})

export class TaskPage {
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  public slidesHeight: string | number;
  public slidesMoving: boolean = true;

  //TODO: 数据处理
  slides: any = localStorage.data ? "" : localStorage.data;
  text;
  isReorder: boolean = false;
  items = [];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this.selectedSegment = 'day';
    let list = [];
    let slideList = [];
    let task = new Task();
    task.name = "1";
    task.points = 1;
    task.quantity =1;
    list.push(task);
    let slideDayModel = new SlideModel("day","每日任务", list);
    let slideWeekModel = new SlideModel("week","每周任务", list);
    let slideCommonModel = new SlideModel("common","日常任务", list);
    let slideDungeonModel = new SlideModel("dungeon","副本任务", list);
    slideList.push(slideDayModel);
    slideList.push(slideWeekModel);
    slideList.push(slideCommonModel);
    slideList.push(slideDungeonModel);

    this.slides = slideList;

    console.log(this.slides)

    // this.slides = [
    //   {
    //     id: "day",
    //     title: "每日任务",
    //     data: ["吃饭", "跑步", "游泳", "看书", "吃饭", "跑步", "游泳", "看书", "吃饭", "跑步", "游泳", "看书", "吃饭", "跑步", "游泳", "看书"]
    //   },
    //   {
    //     id: "week",
    //     title: "每周任务",
    //     data: [1, 2, 3, 4]
    //   },
    //   {
    //     id: "common",
    //     title: "日常任务",
    //     data: []
    //   },
    //   {
    //     id: "dungeon",
    //     title: "dungeon任务",
    //     data: [1, 2, 3, 4, 5]
    //   }
    // ];
    localStorage.data = JSON.stringify(this.slides);
  }
  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    const currentSlide = this.slides[slider.getActiveIndex()];
    if(currentSlide){
      this.selectedSegment = currentSlide.id;
    }

    try {
      this.slidesMoving = false;
      let element = this.slider._slides[slider.getActiveIndex()].firstChild as any;
      this.slidesHeight = element.clientHeight
    } catch (e) { }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '任务',
      buttons: [
        {
          text: '新建任务',
          role: 'new',
          handler: () => {
            this.presentModal()
          }
        },
        {
          text: '加入副本',
          handler: () => {
            this.text = '你刚刚点击了加入副本';
          }
        },
        {
          text: '排序',
          handler: () => {
            this.isReorder = true;
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.text = '你刚刚点击了取消';
          }
        }
      ]
    });

    actionSheet.present();
  }


  /**
   * @description 排序列表
   * @author 汤伟亮
   * @param {*} indexes
   * @param {*} id
   * @memberof TaskPage
   */
  reorderItems(indexes: any, id: any) {
    for (let i in this.slides) {
      if (this.slides[i].id == id) {
        let element = this.slides[i].data[indexes.from];
        this.slides[i].data.splice(indexes.from, 1);
        this.slides[i].data.splice(indexes.to, 0, element);
      }
    }
  }

  /**
   * @description 保存排序
   * @author 汤伟亮
   * @memberof TaskPage
   */
  doneReorder() {
    let jsonstr = JSON.stringify(this.slides);
    localStorage.setItem("data", jsonstr);
    this.isReorder = false;
  }

  /**
   * @description 显示创建任务界面
   * @author 汤伟亮
   * @memberof TaskPage
   */
  presentModal() {
    const modal = this.modalCtrl.create(CreateTaskPage,{ taskType: this.selectedSegment });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  public slideDidChange(): void {
    
  }

  public slideWillChange(): void {
    this.slidesMoving = true;
  }

  selectedDayTasks() {

  }

  selectedWeekTasks() {

  }

  selectedCommonTasks() {

  }

  selectedDungeonTasks() {

  }
}

