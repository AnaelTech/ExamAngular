import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from '../entitys';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  selectedProducts: Product[] = [];

  constructor(public CartService: CartService) {}

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.returnSelectedProducts();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
  }

  returnSelectedProducts() {
    return this.CartService.returnSelectedProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((products) => (this.selectedProducts = products));
  }

  removeProduct(id: number) {
    this.CartService.removeSelectedProduct(id);
  }

  getTotalHT() {
    return this.CartService.getTotalHT();
  }

  getTotalTTC() {
    return this.CartService.getTotalTTC();
  }

  getTotalProduct(id: number) {
    return this.CartService.getTotalProduct(id);
  }

  getIncrementQuantity(id: number) {
    return this.CartService.incrementQuantity(id);
  }

  getDecrementQuantity(id: number) {
    return this.CartService.decrementQuantity(id);
  }
}
