import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  params: {} = {};
  messages: Message[];
  disableInfiniteScroll: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.params = Object.assign({}, params);

      if (this.params.hasOwnProperty('id') && !!this.params['id']) {
        this.messageService.getFolderMessagesById(this.params['id']).then(
          messages => {
            this.messages = messages;
            console.log(this.messages)
          }
        );
      }
    });
  };

  openMessage(folderId: number, id: number) {

    this.router.navigate(['message/'+folderId+'/read', id]);
  };

  delete(id: number): void {
    this.messageService.delete(id).then(
      async (response) => {
        this.messages = this.messages.filter(message => message.id != id);
        const toast = await this.toastController.create({
          message: 'La lista è stata aggiornata.',
          duration: 2000
        });
        toast.present();
      }
    );
  };

  loadData(event) {
    if (this.disableInfiniteScroll) {
      event.target.disabled = true;
      return;
    }
    event.target.complete();

    let messagesCount = this.messages.length;

    this.messageService.getFolderMessagesById(
      this.params['id'],
      messagesCount-1
    ).then(
      messages => {
        this.messages = [...this.messages, ...messages];
        this.disableInfiniteScroll = messagesCount === this.messages.length;
      }
    );
  };

  async doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(async () => {
      const toast = await this.toastController.create({
        message: 'La lista è stata aggiornata.',
        duration: 2000
      });
      toast.present();
      event.target.complete();
    }, 2000);
  };

}
