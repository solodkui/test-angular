import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState, mainStateGetOnlineStatus, mainStateGetAllNumber } from './reducers/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, Subject, timer } from 'rxjs';
import { setAllNumber } from './reducers/main/main.actions';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private stopPolling = new Subject();
  numbers: Array<number> = [];

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  createNumber(): Array<number> {
    const newNumber = Math.floor(Math.random() * Math.floor(100));
    this.numbers = Object.assign([], this.numbers);
    this.numbers.push(newNumber);
    this.store.dispatch(setAllNumber({ payload: this.numbers }));
    return this.numbers;
  }

  getOnlineStatus(): Observable<boolean> | any {
    return this.store.pipe(select(mainStateGetOnlineStatus));
  }

  startPolling(interval: number = 2000): Observable<number> { 
    this.stopPolling = new Subject();
    this.store
      .pipe(
        select(mainStateGetAllNumber),
        take(1),
        tap((state) => {
          this.numbers = state;
        })
      );
    return timer(0, interval)
      .pipe(
        takeUntil(this.stopPolling),
        switchMap(() => this.createNumber())
      );
  }

  pollingStop(): void {
    this.stopPolling.next();
    this.stopPolling.complete();
  }

  getAllNumbers(): Observable<Number[]> {
    return this.store.pipe(select(mainStateGetAllNumber));
  }
  
  ngOnDestroy() {
    this.pollingStop();
  }
}
