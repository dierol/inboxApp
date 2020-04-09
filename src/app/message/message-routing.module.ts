import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePage } from './message.page';
import { WritePage } from './write.page';
import { ReadPage } from './read.page';

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  },
  {
    path: 'write',
    component: WritePage
  },
  {
    path: 'read/:id',
    component: ReadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
