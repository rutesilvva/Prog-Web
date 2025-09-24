import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div class="toast" *ngIf="toast" [ngClass]="toast.type">
      {{ toast.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: #fff;
      font-weight: 200;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: fadein 0.3s, fadeout 0.3s 2.7s;
    }
    .success { background: #4caf50; }
    .error { background: #f44336; }
    .info { background: #2196f3; }

    @keyframes fadein { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
    @keyframes fadeout { from {opacity: 1;} to {opacity: 0;} }
  `]
})
export class ToastComponent {
  toast: Toast | null = null;
  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(t => this.toast = t);
  }
}
