import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({ providedIn: 'root' })
export class EmailService {
  sendOrderConfirmation(to: string, name: string, orderId: string, total: number) {
    return emailjs.send('SEU_SERVICE_ID','SEU_TEMPLATE_ID',{
      to_email: to,
      to_name: name,
      order_id: orderId,
      total
    }, { publicKey: 'SEU_PUBLIC_KEY' });
  }
}
