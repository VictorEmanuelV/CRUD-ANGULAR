import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private collectionRef: CollectionReference;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'products'); 
  }

  async addProduct(product: any) {
    return addDoc(this.collectionRef, product);
  }

  async getProducts() {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateProduct(id: string, product: any) {
    const productDoc = doc(this.firestore, 'products', id);
    return updateDoc(productDoc, product);
  }

  async deleteProduct(id: string) {
    const productDoc = doc(this.firestore, 'products', id);
    return deleteDoc(productDoc);
  }
}
