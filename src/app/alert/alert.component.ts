import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  closeAlert() {
    const alert = document.getElementById('alert');
    if (alert) {
      alert.classList.add('hidden');
    } else {
      console.log('no alert');
    }
  }
}
