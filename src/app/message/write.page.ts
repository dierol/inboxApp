import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-write',
  templateUrl: './write.page.html',
  styleUrls: ['./write.page.scss'],
})
export class WritePage implements OnInit {

  @Input() message: Message;
  model: Message = {
    id: 0,
    folder_id: 0,
    title: '',
    text: '',
    from_name: '',
    from_email: ''
  };
  isLoading: boolean = false;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.model.folder_id = this.message.folder_id;
    this.model.from_name = this.message.from_name;
    this.model.from_email = this.message.from_email;
  }

  send() {
    this.isLoading = true;
    setTimeout(async () => {
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'Il messaggio è stato inviato.',
        duration: 2000
      });
      toast.present();
      setTimeout(() => {
        this.modalController.dismiss();
      }, 2000);
    }, 2000);
  }

}
