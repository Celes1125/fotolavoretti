import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BookSheet {
  id: number; // Útil para el tracking
  frontImage: string;
  backImage: string;
  flipped: boolean;
}

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-description.html',
  styleUrls: ['./product-description.css'],
})
export class ProductDescriptionComponent implements OnInit {
  sheets: BookSheet[] = [];
  totalImages = 16;

  ngOnInit() {
    this.generateSheets();
  }

  generateSheets() {
    let idCounter = 0;
    for (let i = 1; i <= this.totalImages; i += 2) {
      this.sheets.push({
        id: idCounter++,
        frontImage: this.formatImageName(i),
        backImage: this.formatImageName(i + 1),
        flipped: false
      });
    }
  }

  formatImageName(num: number): string {
    // Asegúrate de que tus imágenes existen, si num > 16 podría dar error 404
    if (num > this.totalImages) return ''; 
    const padded = num.toString().padStart(3, '0');
    return `/gallery/${padded}.png`;
  }

  togglePage(index: number) {
    const sheet = this.sheets[index];

    if (!sheet.flipped) {
      // MOVER A LA IZQUIERDA:
      // Solo permitimos pasar si es la hoja superior actual del montón derecho.
      // Es decir, todas las anteriores (0 a index-1) deben estar ya flipped.
      const previousSheet = this.sheets[index - 1];
      if (index === 0 || (previousSheet && previousSheet.flipped)) {
        sheet.flipped = true;
      }
    } else {
      // MOVER A LA DERECHA (VOLVER):
      // Solo permitimos volver si es la hoja superior del montón izquierdo.
      // Es decir, todas las siguientes deben estar NO flipped.
      const nextSheet = this.sheets[index + 1];
      if (!nextSheet || !nextSheet.flipped) {
        sheet.flipped = false;
      }
    }
  }

  // Lógica corregida para el apilamiento (Z-Index)
  calculateZIndex(index: number, isFlipped: boolean): number {
    const total = this.sheets.length;
    
    if (isFlipped) {
      // Si está a la IZQUIERDA (pasada), queremos que la última pasada esté encima.
      // Hoja 0 flipped -> z: 1
      // Hoja 1 flipped -> z: 2 (tapa a la 0)
      return index + 1;
    } else {
      // Si está a la DERECHA (sin pasar), queremos que la primera esté encima.
      // Hoja 0 sin pasar -> z: 10 (encima de todos)
      // Hoja 1 sin pasar -> z: 9
      return total - index + 1;
    }
  }
}