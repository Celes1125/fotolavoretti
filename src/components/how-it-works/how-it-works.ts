import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  id: number;
  title: string;
  description: string;
  details?: string[]; // Opcional: para las listas de opciones (puntos 2 y 4)
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.css']
})
export class HowItWorksComponent {
  
  steps: Step[] = [
    {
      id: 1,
      title: 'Scegli il tuo pacchetto',
      description: 'Classico, completo o premium. Puoi anche scegliere animazioni individuali o richiedere un lavoro di design personalizzato.'
    },
    {
      id: 2,
      title: 'Decidi come inviarmi le creazioni',
      description: '',
      details: [
        'Consegna a domicilio (solo a Cuveglio)',
        'Consegna davanti a scuola (solo a Cuveglio)',
        'Invia le foto se sei lontano'
      ]
    },
    {
      id: 3,
      title: 'Prenota l’appuntamento',
      description: 'Se scegli la consegna di persona (a domicilio o a scuola), seleziona l’orario che preferisci.'
    },
    {
      id: 4,
      title: 'Decidi cosa fare con i lavoretti originali',
      description: '',
      details: [
        'Smaltimento responsabile senza costi aggiuntivi',
        'Restituzione dei lavoretti'
      ]
    },
    {
      id: 5,
      title: 'Produzione digitale',
      description: 'Trasformiamo i lavoretti in PDF, galleria HD, video con musica e animazione personalizzata secondo il pacchetto scelto.'
    },
    {
      id: 6,
      title: 'Consegna dei ricordi digitali',
      description: 'Ricevi il tuo ricordo digitale in 7–10 giorni. Se hai scelto la restituzione dei lavoretti, ti contatterò per concordare data e orario.'
    }
  ];
}
