import { MainService } from './../main.service';
import { setMainOnlineStatus } from './../reducers/main/main.actions';
import { switchMap, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './../reducers/index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss']
})
export class PollingComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription;
  private numbersSubscription: Subscription;
  onlineStatus = false;
  nowNumber: number;
  allNumbers: Array<Number> = [];
  messages: Array<string> = ['Hello', 'World', 'Sweet city', '2021 years', 'Forever now', 'mr.Freedom'];
  allMessages: Array<string> = ['Hello', 'World', 'Sweet city', '2021 years', 'Forever now', 'mr.Freedom'];

  constructor(private store: Store<AppState>, private mainService: MainService) {}

  ngOnInit(): void {
    // Subscribe to online status
    this.statusSubscription = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.mainService.getOnlineStatus())
      )
      .subscribe(
        (res: boolean) => this.onlineStatus = res,
        (error: any) => console.log('STATUS ERROR', error)
      )
    // Subscribe to numbers
    this.numbersSubscription = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.mainService.getAllNumbers())
      )
      .subscribe(
        (res: Array<Number>) => this.allNumbers = res,
        (error: any) => console.log('NUMBERS ERROR', error)
      )
  }

  search(value: string):void {
    this.messages = this.allMessages.filter(message => !message.indexOf(value))
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.numbersSubscription) {
      this.numbersSubscription.unsubscribe();
    }
  }

  startPolling(): void {
    this.mainService.startPolling(500).subscribe(num => {
      this.nowNumber = num;
    });
  }

  stopPolling(): void {
    this.mainService.pollingStop();
    this.nowNumber = null;
  }

  changeOnlineStatus(onlineStatus: boolean): void {
    this.store.dispatch(setMainOnlineStatus({ payload: onlineStatus }));
  }
}
