import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AnimationOption {
  title: string;
  price: number;
  description: string;
  videoSrc: string;
  posterSrc?: string; // Opcional: imagen de portada del video antes de dar play
}

@Component({
  selector: 'app-pricing-animations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-animations.html',
  styleUrls: ['./pricing-animations.css']
})
export class PricingAnimationsComponent {
  
  animationOptions: AnimationOption[] = [
    {
      title: 'Animazione standard',
      price: 10,
      description: 'Messaggi e voci predefinite.',
      // Asegúrate de crear esta carpeta y poner tus videos ahí
      videoSrc: '/videos/animation-standard.mp4', 
      // Puedes poner una imagen .jpg si no quieres que se vea negro al inicio
      // posterSrc: '/videos/cover-standard.jpg' 
    },
    {
      title: 'Animazione personalizzata',
      price: 15,
      description: 'La voce racconta quello che desideri.',
      videoSrc: '/videos/animation-custom.mp4'
    }
  ];

}


