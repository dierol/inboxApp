import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedImage = null;

  constructor(
    private scanner: BarcodeScanner,
    private camera: Camera,
    private gyroscope: Gyroscope
  ) { };



  ngOnInit() {
    this.gyroscope.watch().subscribe((orientation: GyroscopeOrientation) => {
      console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
    });
  };

  openScanner() {
    this.scanner.scan().then(barcodeData => {
     console.log('Barcode data', barcodeData);
     alert(barcodeData);
    }).catch(err => {
        console.log('Error', err);
    });
  };

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.selectedImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
   });
 };

  // logGyroscope() {
  //   let options: GyroscopeOptions = {
  //     frequency: 1000
  //   }
  //
  //   this.gyroscope.getCurrent(options)
  //     .then((orientation: GyroscopeOrientation) => {
  //        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
  //      })
  //     .catch()
  // };
}
