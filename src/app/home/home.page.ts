import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonText,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/angular/standalone';
import {QrGeneratorComponent} from "../components/qr-generator/qr-generator.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, QrGeneratorComponent, IonFooter, IonText, IonCardTitle, IonCardSubtitle, QrGeneratorComponent, QrGeneratorComponent],
})
export class HomePage {
  constructor() {}
}
