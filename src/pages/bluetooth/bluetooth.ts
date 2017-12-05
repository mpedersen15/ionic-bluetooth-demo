import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
  scanSubscription: Subscription;
  connectSubscription: Subscription;
  devices = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ble: BLE) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

  startScan() {
    this.scanSubscription = this.ble.startScanWithOptions([], { reportDuplicates: false })
      .subscribe( device => {
        console.log('Found a BLE device', device);
        this.devices.push(device);
      });

      setTimeout(() => {
        this.ble.stopScan()
          .then(() => console.log('Scan stopped successfully'))
          .catch(err => console.log('Scan stopped error', err));
      }, 3000);
    
  }

  connectToDevice(id: string) {
    console.log('Connect to device with id:', id);
    this.connectSubscription = this.ble.connect(id)
      .subscribe((data) => { 
        console.log('Connect data', data);
      });
  }

}
