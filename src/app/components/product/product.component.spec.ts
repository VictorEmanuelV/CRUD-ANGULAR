import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productServiceSpy: any;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'addProduct', 'updateProduct', 'deleteProduct']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ProductComponent],
      declarations: [],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        FormBuilder,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    const products = [{ id: '1', nomeDoProduto: 'Teste', descricaoDoProduto: 'Descricao', codigo: '123', quantidade: 1 }];
    productServiceSpy.getProducts.and.returnValue(Promise.resolve(products));
    await component.ngOnInit();
    expect(component.products).toEqual(products);
  });

  it('should add a product', () => {
    productServiceSpy.addProduct.and.returnValue(Promise.resolve());
    component.productForm.setValue({ nomeDoProduto: 'Novo Produto', descricaoDoProduto: 'Descricao', codigo: '123', quantidade: 1 });
    component.addProduct();
    expect(productServiceSpy.addProduct).toHaveBeenCalled();
  });

  it('should update a product', () => {
    productServiceSpy.updateProduct.and.returnValue(Promise.resolve());
    component.products = [{ id: '1', nomeDoProduto: 'Teste', descricaoDoProduto: 'Descricao', codigo: '123', quantidade: 1 }];
    component.startEditing(component.products[0]);
    component.productForm.setValue({ nomeDoProduto: 'Produto Editado', descricaoDoProduto: 'Descricao Editada', codigo: '456', quantidade: 2 });
    component.updateProduct();
    expect(productServiceSpy.updateProduct).toHaveBeenCalled();
  });

  it('should delete a product', () => {
    productServiceSpy.deleteProduct.and.returnValue(Promise.resolve());
    component.deleteProduct('1');
    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('1');
  });

  it('should start editing a product', () => {
    const product = { id: '1', nomeDoProduto: 'Teste', descricaoDoProduto: 'Descricao', codigo: '123', quantidade: 1 };
    component.startEditing(product);
    expect(component.editingProduct).toEqual(product);
    expect(component.productForm.value).toEqual(product);
  });

  it('should cancel editing a product', () => {
    component.cancelEdit();
    expect(component.editingProduct).toBeNull();
    expect(component.productForm.pristine).toBeTrue();
  });

  it('should disable add button when form is invalid', () => {
    const addButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    component.productForm.setValue({ nomeDoProduto: '', descricaoDoProduto: '', codigo: '', quantidade: 0 });
    fixture.detectChanges();
    expect(addButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable add button when form is valid', () => {
    const addButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    component.productForm.setValue({ nomeDoProduto: 'Teste', descricaoDoProduto: 'Descricao', codigo: '123', quantidade: 1 });
    fixture.detectChanges();
    expect(addButton.nativeElement.disabled).toBeFalse();
  });
});
