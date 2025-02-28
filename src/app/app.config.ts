import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "crud-produto-a5714", appId: "1:22032419683:web:6ba2fbf494023335fa2156", storageBucket: "crud-produto-a5714.firebasestorage.app", apiKey: "AIzaSyB3U371QgYmxMUKS_SwHZ9fwZHLUEflCiw", authDomain: "crud-produto-a5714.firebaseapp.com", messagingSenderId: "22032419683", measurementId: "G-F8P7H3JQFJ" })), provideFirestore(() => getFirestore())]
};
