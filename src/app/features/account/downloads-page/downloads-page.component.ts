import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-downloads-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downloads-page.component.html',
  styleUrls: ['./downloads-page.component.scss']
})
export class DownloadsPageComponent {
  downloads: { title: string; url: string }[] = [];

  constructor(private os: OrdersService) {
    this.os.orders$.subscribe(list => {
      const all = list.flatMap(o => o.downloads || []);
      const map = new Map(all.map(d => [d.title, d]));
      this.downloads = Array.from(map.values());
    });
  }
}
