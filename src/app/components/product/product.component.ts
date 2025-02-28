import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  editingProduct: any = null;
  currentYear = new Date().getFullYear();

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      nomeDoProduto: ['', [Validators.required, Validators.maxLength(20)]],
      descricaoDoProduto: ['', [Validators.required, Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      quantidade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  async addProduct() {
    if (this.productForm.valid) {
      await this.productService.addProduct(this.productForm.value);
      this.productForm.reset();
      this.loadProducts();
    }
  }

  startEditing(product: any) {
    this.editingProduct = { ...product };
    this.productForm.patchValue(product);
  }

  async updateProduct() {
    if (this.productForm.valid && this.editingProduct) {
      await this.productService.updateProduct(this.editingProduct.id, this.productForm.value);
      this.editingProduct = null;
      this.productForm.reset();
      this.loadProducts();
    }
  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
    this.loadProducts();
  }

  cancelEdit() {
    this.editingProduct = null;
    this.productForm.reset();
  }
}
