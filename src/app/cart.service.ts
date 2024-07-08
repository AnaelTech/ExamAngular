import { Injectable } from '@angular/core';
import { Cart, Product } from './entitys';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProduct: any[] = [];

  returnSelectedProducts(): Observable<Product[]> {
    return of(this.cartProduct);
  }

  addSelectedProduct(product: any): void {
    const existingProductIndex = this.cartProduct.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex === -1) {
      this.cartProduct.push({ ...product, quantity: 1 });
    } else {
      this.cartProduct[existingProductIndex].quantity++;
    }
  }

  removeSelectedProduct(id: number): void {
    const itemToRemove = this.cartProduct.find((x) => x.id === id);
    this.cartProduct.splice(this.cartProduct.indexOf(itemToRemove), 1);
  }

  incrementQuantity(id: number) {
    let product = this.cartProduct.find((i) => i.id === id);
    if (product) {
      product.quantity++;
    }
  }

  decrementQuantity(id: number) {
    let product = this.cartProduct.find((i) => i.id === id);
    if (product.quantity <= 0) {
      product.quantity == 0;
    } else {
      product.quantity--;
    }
  }

  findProductById(id: number) {
    return this.cartProduct.find((i) => i.id === id);
  }

  getTotalProduct(id: number) {
    const product = this.findProductById(id);
    if (product) {
      return product.price * product.quantity;
    }
    return 0;
  }

  getTotalTTC() {
    const totalHT = this.getTotalHT();
    const TVA = 0.2;
    return totalHT + totalHT * TVA;
  }

  getTotalHT() {
    return this.cartProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }
}
