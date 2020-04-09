import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LaddaModule } from 'angular2-ladda';

import { MessagePageRoutingModule } from './message-routing.module';

import { MessagePage } from './message.page';
import { WritePage } from './write.page';
import { ReadPage } from './read.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule,
    LaddaModule.forRoot({})
  ],
  entryComponents: [
    WritePage
  ],
  declarations: [MessagePage, ReadPage, WritePage]
})
export class MessagePageModule {}
