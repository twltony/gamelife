import { Component } from '@angular/core';

import { TaskPage } from '../task/task';
import { WishPage } from '../wish/wish';
import { MorePage } from '../more/more';
import { StatisticsPage } from '../statistics/statistics';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TaskPage;
  tab2Root = WishPage;
  tab3Root = StatisticsPage;
  tab4Root = MorePage;

  constructor() {

  }
}
