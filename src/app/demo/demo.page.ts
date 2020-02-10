import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocationService } from '../location.service';
import {Plugins, Capacitor, CameraSource, CameraResultType} from '@capacitor/core'
@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {

    ad : string;
    selectedImage : string;
  constructor(private service : LocationService) {
    this.ad = this.service.address;

    console.log(this.ad);
   }

  ngOnInit() {
  }
  productForm = new FormGroup({
     address : new FormControl(this.service.address),
     b : new FormControl(),
     c :new FormControl()
  });

PickImage()
{
if(!Capacitor.isPluginAvailable('Camera'))
{
  return;
}
Plugins.Camera.getPhoto({
  quality : 50,
  source : CameraSource.Prompt,
  correctOrientation : true,
  height : 200,
  width : 200,
  resultType : CameraResultType.Base64
}).then(image => {
   this.selectedImage = image.base64String;
}).catch(error => {
  console.log(error);
  return false;
});



}
}