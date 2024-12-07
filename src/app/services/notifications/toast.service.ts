import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular/standalone";


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController = inject(ToastController);


  constructor() { }

  async successToast(message: string, icon: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: 'success',
      icon: icon,
    });

    await toast.present();
  }
  async dangerToast(message: string, icon: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: 'danger',
      icon: icon
    });

    await toast.present();
  }
  async warningToast(message: string, icon: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: 'warning',
      icon: icon
    });

    await toast.present();
  }
}
