import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  sync(key: string, data: any) {
    this.set(key, data);
    return data;
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T {
    const response = localStorage.getItem(key);
    return response ? JSON.parse(response) : null;
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }

}

