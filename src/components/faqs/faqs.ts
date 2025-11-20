import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqDetail {
  label?: string; // Opcional: Para la parte en negrita (ej: "Email:")
  text: string;   // El contenido
}

interface FaqItem {
  question: string;
  details: FaqDetail[];
  isOpen: boolean;
}

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faqs.html',
  styleUrls: ['./faqs.css']
})
export class FaqsComponent {
  
  faqs: FaqItem[] = [
    {
      question: '1. Quali sono gli orari di risposta?',
      isOpen: false,
      details: [
        { label: 'Instagram DM:', text: 'tra le 09:00 e le 12:00.' },
        { label: 'Email:', text: 'risposta entro 24 ore.' }
      ]
    },
    {
      question: '2. Quali sono i tempi di consegna?',
      isOpen: false,
      details: [
        { label: 'Standard:', text: '7–10 giorni dal ricevimento dei lavoretti. Animazioni 2 giorni.' },
        { label: 'Alta richiesta:', text: 'in caso di picchi, avviso anticipato per un possibile prolungamento di 2–3 giorni.' }
      ]
    },
    {
      question: '3. Come funziona il ritiro e la restituzione dei lavoretti?',
      isOpen: false,
      details: [
        { label: 'Zona coperta:', text: 'solo all’interno del Comune di Cuveglio.' },
        { label: 'Ritiro:', text: 'su appuntamento, generalmente all’uscita della scuola o a domicilio se più comodo.' },
        { label: 'Restituzione:', text: 'Se vuoi conservarli, te li riconsegno subito. Se non vuoi tenerli, me ne occupo io in modo responsabile, senza costi aggiuntivi.' }
      ]
    },
    {
      question: '4. Posso inviare solo le foto dei lavoretti?',
      isOpen: false,
      details: [
        { label: 'Sì, è possibile.', text: 'La qualità finale può risultare leggermente inferiore rispetto agli originali.' },
        { text: 'Per chi si trova fuori da Cuveglio, questa è l’unica modalità disponibile.' }
      ]
    },
    {
      question: '5. Quali sono i metodi di pagamento?',
      isOpen: false,
      details: [
        { text: 'Contanti.' },
        { text: 'Pagamento elettronico tramite link.' }
      ]
    }
  ];

  toggleFaq(index: number) {
    // Opción A: Permitir solo uno abierto a la vez (estilo acordeón estricto)
    // this.faqs.forEach((faq, i) => {
    //   if (i !== index) faq.isOpen = false;
    // });

    // Opción B: Permitir abrir varios (más amigable)
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
