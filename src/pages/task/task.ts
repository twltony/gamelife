import { Task } from './../../models/task.model';
import { CreateTaskPage } from './create-task/create-task';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SlideModel } from '../../models/slide.model';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';


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
  slides: any;
  text;
  isReorder: boolean = false;
  items = [];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    public modalCtrl: ModalController
  ) {
    
    this.selectedSegment = 'day';
    
    this.platform.ready().then(() => {
      //this.nativeStorage.setItem('slidePageData', { slideList: [] });
      // this.nativeStorage.getItem('slidePageData').then(
        
      // )
      debugger
      nativeStorage.getItem('slidePageData').then(
        (data) => {
          if(Object.keys(data.slideList).length >0){
            this.slides = data.slideList;
          }else{
            //初始化
            let list = [];
            let slideList = [];
            let slideDayModel = new SlideModel("day", "每日任务", []);
            let slideWeekModel = new SlideModel("week", "每周任务", []);
            let slideCommonModel = new SlideModel("common", "日常任务", []);
            let slideDungeonModel = new SlideModel("dungeon", "副本任务", []);
            slideList.push(slideDayModel);
            slideList.push(slideWeekModel);
            slideList.push(slideCommonModel);
            slideList.push(slideDungeonModel);
            this.slides = slideList;
            this.nativeStorage.setItem('slidePageData', { slideList: slideList })
          }
        }
      )
    })

  }

  clickButton(){
    this.nativeStorage.setItem('test', { test: "test" }).then(
      () => console.log('Stored item!')
    )
  }

  /**
   * @description 区块按钮点击事件
   * @author 汤伟亮
   * @param {*} segmentButton
   * @memberof TaskPage
   */
  onSegmentChanged(segmentButton: any) {
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }


  /**
   * @description 滑动监听事件
   * @author 汤伟亮
   * @param {*} slider
   * @memberof TaskPage
   */
  onSlideChanged(slider: any) {
    const currentSlide = this.slides[slider.getActiveIndex()];
    if (currentSlide) {
      this.selectedSegment = currentSlide.id;
    }
    try {
      this.slidesMoving = false;
      let element = this.slider._slides[slider.getActiveIndex()].firstChild as any;
      this.slidesHeight = element.clientHeight
    } catch (e) { }
  }

  /**
   * @description 显示动作按钮
   * @author 汤伟亮
   * @memberof TaskPage
   */
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
    this.nativeStorage.setItem('slidePageData', { slideList: this.slides })
    this.isReorder = false;
  }

  /**
   * @description 显示创建任务界面
   * @author 汤伟亮
   * @memberof TaskPage
   */
  presentModal() {
    const modal = this.modalCtrl.create(CreateTaskPage, { taskType: this.selectedSegment });
    modal.onDidDismiss(data => {
      let dataList = this.slides;
      if (Object.keys(dataList).length > 0) {
        for (let i in dataList) {
          debugger
          if (dataList[i].id == data.type) {
            console.log('写data')
            dataList[i].tasks.push(data)
          }
        }
      }
      console.log(dataList)
      this.nativeStorage.setItem('slidePageData', { slideList: dataList })
    });
    modal.present();
  }

  public slideWillChange(): void {
    this.slidesMoving = true;
  }

}

