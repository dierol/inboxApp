import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Inbox',
      url: '/folder',
      icon: 'mail'
    },
    // {
    //   title: 'Outbox',
    //   url: '/folder/Outbox',
    //   icon: 'paper-plane'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.geolocation.getCurrentPosition().then(async (resp) => {
       // resp.coords.latitude
       // resp.coords.longitude message =
       let message = 'lat: '+ resp.coords.latitude || 'none' + ' / long: ' + resp.coords.longitude || 'none' ;
       console.log(message);
       const toast = await this.toastController.create({
         message: message,
         duration: 2000
       });
       toast.present();
      }).catch((error) => {
        console.log('Error getting location', error);
      });

    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }
}
