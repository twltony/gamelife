import { CreateTaskPage } from '../pages/task/create-task/create-task';
import { StatisticsPage } from '../pages/statistics/statistics';
import { MorePage } from '../pages/more/more';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WishPage } from '../pages/wish/wish';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TaskPage } from '../pages/task/task';

@NgModule({
  declarations: [
    MyApp,
    WishPage,
    StatisticsPage,
    TaskPage,
    MorePage,
    CreateTaskPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WishPage,
    StatisticsPage,
    TaskPage,
    MorePage,
    CreateTaskPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
