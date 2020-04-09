import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private messagetestservice: MessageService
  ) { }

  ngOnInit() {
    this.messagetestservice.get('1').then(
      message => {
        console.log(message);
      }
    )

  }

}
