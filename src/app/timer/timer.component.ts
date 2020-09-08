import { Component, OnInit } from '@angular/core';
import { timer, fromEvent } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer: any;
  public seconds: number = 0;
  public minutes: number = 0;
  public hours: number = 0;
  private subscription: any;

  constructor() { }

  ngOnInit() {
    // initialize timer it works all the time
    this.timer = timer(0, 1000);
    
    // initialize double click event
    fromEvent(document.getElementById('resetButton'), 'click')
      .pipe(timeInterval())
      .subscribe(i => {
        console.log(`interval ${i.interval}`);
        if (i.interval < 300) { // wait only when interval less then 300 ms
          this.wait();
        }
      });
  }

  // start stop event for button
  startStop(): void {
    if (!this.subscription) {
      this.runTimer();
    }
    else {
      this.stopTimer();
      this.clearTimer();
    }
  }

  reset(): void {
    this.clearTimer();  
  }

  // makes subscription for timer
  runTimer(): void {
    this.subscription = this.timer.subscribe(() => { // makes stopwatch logic
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.seconds = 0;
        if (this.minutes < 59) {
          this.minutes++;
        } else {
          this.minutes = 0;
          this.hours++;
        }
      }
      console.log(this.hours, this.minutes, this.seconds);
    });
  }

  wait(): void {
    // eventHandler for WaitButton works all the time it is initialized in ngOnInit(), so check if subscription exists
    if (this.subscription) {
      this.stopTimer();
    }
  }

  stopTimer(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  clearTimer(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

}
