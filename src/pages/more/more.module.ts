import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { MorePage } from './more';

@NgModule({
  declarations: [
    MorePage,
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
  ],
})
export class MorePageModule {}
