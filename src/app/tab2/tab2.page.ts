import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public counterMin = 0;
  public counterSec = 10;
  public total = this.counterMin * 60 + this.counterSec;
  public ctrl: any;
  // 未开始时，停止状态
  public isEnd = true;
  // 未开始时，未播放, 未开始计时
  public playStatus = false;

  constructor(public alertController: AlertController) { }
  play() {
    this.ctrl = setInterval(() => {
      this.total--;
      this.counterMin = Math.floor(this.total / 60);
      this.counterSec = Math.floor(this.total % 60);
      if (this.total <= 0) {
        this.playStatus = false;
        this.counterMin = 25;
        this.counterSec = 0;
        this.total = this.counterMin * 60 + this.counterSec;
        clearInterval(this.ctrl);
        this.alertFun();
      }
    }, 1000);
  }
  changePlayStatus() {
    this.playStatus = !this.playStatus;

    // 开始播放
    if (this.playStatus) {
      this.play();
    } else {
      // 暂停
      clearInterval(this.ctrl);
    }
  }

  stopPlay() {
    this.alertFun();
    clearInterval(this.ctrl);
  }

  async alertFun() {
    const alert = await this.alertController.create({
      header: '完成学习目标！',
      subHeader: '',
      message: '',
      backdropDismiss: false,
      buttons: [
        {
          text: '继续学习',
          handler: () => {
            if (this.total > 0) {
              clearInterval(this.ctrl);
              if (!this.playStatus) {
                return;
              } else {
                this.playStatus = true;
                this.play();
              }
            }
            console.log('继续学习');
          }
        },
        {
          text: '休息一下',
          handler: () => {
            this.counterMin = 0;
            this.counterSec = 5;
            this.total = this.counterMin * 60 + this.counterSec;
            this.playStatus = true;
            this.play();
            console.log('休息一下');
          }
        }
      ]
    });
    await alert.present();
  }

}
