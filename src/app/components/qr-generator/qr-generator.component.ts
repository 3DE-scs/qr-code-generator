import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import QRCodeStyling, { DotType } from 'qr-code-styling';
import { ToastService } from "../../services/notifications/toast.service";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption
} from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, FormsModule, IonSelect, IonSelectOption, IonRange, IonButton],
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent implements AfterViewInit {
  private toast = inject(ToastService);

  url: string = 'https://eazyqrcode.3de-scs.be/'; // Set a default URL
  foregroundColor: string = '#000000';
  backgroundColor: string = '#ffffff';
  dotShape: DotType = 'classy'; // Explicitly type as DotType
  logoMargin: number = 10;
  selectedLogo: string | undefined = undefined; // Updated to string | undefined
  qrCode: QRCodeStyling;

  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

  constructor() {
    this.qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: this.url, // Use the initial URL here
      dotsOptions: { color: this.foregroundColor, type: this.dotShape },
      backgroundOptions: { color: this.backgroundColor },
      imageOptions: { crossOrigin: 'anonymous', margin: this.logoMargin },
    });
  }

  ngAfterViewInit() {
    this.qrCode.append(this.qrContainer.nativeElement);
    this.generateQRCode(); // Ensure QR code is generated with the current URL
  }

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedLogo = e.target.result as string;
        this.generateQRCode();
      };
      reader.readAsDataURL(file);
    }
  }

  generateQRCode() {
    this.qrCode.update({
      data: this.url, // Ensure the QR code uses the current URL
      dotsOptions: { color: this.foregroundColor, type: this.dotShape },
      backgroundOptions: { color: this.backgroundColor },
      image: this.selectedLogo, // Now compatible with string | undefined
      imageOptions: { margin: this.logoMargin },
    });
  }

  downloadQRCode() {
    this.qrCode.download({name: 'qr-code', extension: 'png'}).then();
  }

  async copyQRCode() {
    const canvas = this.qrContainer.nativeElement.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(async (blob: any) => {
        if (blob) {
          const clipboardItem = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([clipboardItem]);
          await this.toast.successToast('The QR code has been copied!', 'checkmark-circle');
        }
      });
    }
  }

  urlChecker(url: string) {
    return url === "";
  }
}
