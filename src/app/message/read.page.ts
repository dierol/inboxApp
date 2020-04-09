import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { MessageService } from './message.service';
import { WritePage } from './write.page';
import { Message } from './message';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  params: {} = {};
  message: Message;
  renderPage: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private modalController: ModalController
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.params = Object.assign({}, params);

      if (this.params.hasOwnProperty('id') && !!this.params['id']) {
        this.messageService.get(this.params['id']).then(
          message => {
            this.message = message;
            this.renderPage = true;
          }
        );
      }
    });
  }

  ngOnInit() {
  }

  async openWrite(message: Message) {
  const modal = await this.modalController.create({
    component: WritePage,
    componentProps: {
      'message': message
    }
  });
  return await modal.present();
}

}
