import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Package {
  name: string;
  price: number;
  features: string[];
  target: string;
  highlight?: boolean; // Para destacar una tarjeta si quieres
}

@Component({
  selector: 'app-pricing-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-packages.html',
  styleUrls: ['./pricing-packages.css']
})
export class PricingPackagesComponent {
  
  packages: Package[] = [
    {
      name: 'Classico',
      price: 35,
      features: [
        'Fotolavoretto in PDF (impaginato, pronto da condividere o stampare).',
        'Galleria completa in immagini HD (tutte le creazioni digitalizzate singolarmente).'
      ],
      target: 'Per le famiglie che vogliono preservare le creazioni senza occupare spazio a casa e averle sempre disponibili in qualità impeccabile.'
    },
    {
      name: 'Completo',
      price: 40,
      features: [
        'Fotolavoretto in PDF.',
        'Galleria HD.',
        'Video MP4 con musica a scelta (per compleanni, riunioni familiari o da inviare ai nonni).'
      ],
      target: 'Per chi desidera un’esperienza più emozionante e versatile, con formato pronto da condividere su qualsiasi schermo.',
      highlight: true // Destacamos este por ser la mejor relación calidad-precio
    },
    {
      name: 'Premium',
      price: 50,
      features: [
        'Fotolavoretto in PDF.',
        'Galleria HD.',
        'Video MP4 con musica e animazione personalizzata basata su un personaggio creato dal bambino.',
        'Reel Instagram pronto da pubblicare.'
      ],
      target: 'Per chi cerca il ricordo più completo, moderno e presentabile, con contenuti perfetti per social e eventi familiari.'
    }
  ];
}