import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { Vibration } from '@ionic-enterprise/vibration/ngx';
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
  // 休息状态
  public isRest = false;
  // 未开始时，未播放, 未开始计时
  public playStatus = false;
  // 学习休息时间
  public totalStudy = 0;
  public totalRest = 0;
  // 打卡记录
  public record: string;
  // 是否停止震动
  public isStopVibration = true;
  // 震动定时器
  public ctrlVibration: any;

  constructor(public alertController: AlertController) { }
  /* 播放 */
  play() {
    this.ctrl = setInterval(() => {
      this.total--;
      if (!this.isRest) {
        // 学习
        if (this.counterMin !== Math.floor(this.total / 60) && this.counterMin !== 25) {
          this.totalStudy += 1;
        }
      } else {
        // 休息
        if (this.counterMin !== Math.floor(this.total / 60) && this.counterMin !== 5) {
          this.totalRest += 1;
        }
      }
      this.counterMin = Math.floor(this.total / 60);
      this.counterSec = Math.floor(this.total % 60);
      if (this.total <= 0) {
        this.isRest = false;
        this.playStatus = false;
        this.counterMin = 25;
        this.counterSec = 0;
        this.total = this.counterMin * 60 + this.counterSec;
        clearInterval(this.ctrl);
        this.alertFun();
      }
    }, 1000);
  }
  /* 改变状态 */
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
  /* 停止 */
  stopPlay() {
    this.alertFun();
    clearInterval(this.ctrl);
  }

  /* 打卡 */
  async countAll() {
    clearInterval(this.ctrl);
    const alert = await this.alertController.create({
      header: '确定要打卡吗？',
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
          text: '确定打卡',
          handler: () => {
            this.counterMin = 25;
            this.counterSec = 0;
            this.total = this.counterMin * 60 + this.counterSec;
            this.playStatus = false;
            this.record = `本次学习时间 ${this.totalStudy} 分钟`;
            this.totalStudy = 0;
            this.totalRest = 0;
            console.log('确定打卡');
          }
        }
      ]
    });
    await alert.present();
  }

  async alertFun() {
    this.isStopVibration = false;
    this.ctrlVibration = setInterval(() => {
      // this.vibration.vibrate(1000);
      // if (this.isStopVibration) {
      //   clearInterval(this.vibration);
      // }
    }, 1000);
    const alert = await this.alertController.create({
      header: '完成学习目标！',
      subHeader: '',
      message: '',
      backdropDismiss: false,
      buttons: [
        {
          text: '继续学习',
          handler: () => {
            this.isStopVibration = true;
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
            this.isStopVibration = true;
            this.isRest = true;
            this.counterMin = 5;
            this.counterSec = 0;
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
