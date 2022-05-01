import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {} from '@angular/forms';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit{

  constructor() {
    // this.runTimer.bind(this)
  }
  ngOnInit(): void {
    this.timerOptions = new FormGroup({
      hours: new FormControl(0),
      minutes: new FormControl(0),
      seconds: new FormControl(0),
    })   
  }

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  target_time: number = 0;
  timer_duration_left: number = 0;
  dateVar!: Date;

  timerOptions!: FormGroup

  timerRunning: boolean = false;
  timerExists: boolean = false;

  timerInit(initial_duration?: number) { 
    this.dateVar = new Date();   
    if (initial_duration) {
      let current_time = this.dateVar.getTime();
      this.target_time = current_time + initial_duration;
    } else {
      let current_time = this.dateVar.getTime();
      this.target_time = current_time + this.timer_duration_left
    }
    
    this.timerExists = true;
    this.timerRunning = true
    this.runTimer();
  }

  stopTimer() {
    this.timerRunning = false;
    this.timerExists = false;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.target_time = 0;
    this.timer_duration_left = 0;
  }

  pauseTimer() {
    this.timerRunning = false;
  }

  private runTimer(runTime?: number) {
    if (!this.timerRunning) return

    this.dateVar = new Date();
    let current_time = this.dateVar.getTime();
    if (current_time >= this.target_time) {
      this.stopTimer()
      return
    }

    let interval: number = 300
    let drift: number = 0
    if (runTime) {
      current_time > runTime + interval? drift = (current_time)-(runTime + interval) : drift = 0
    }
    let delta = this.target_time - current_time;

    this.timer_duration_left = delta
    this.hours = Math.floor(delta / 3600000)
    delta -= this.hours * 3600000
    this.minutes = Math.floor(delta  / 60000)
    delta -= this.minutes * 60000
    this.seconds = Math.floor(delta / 1000)   

    setTimeout(() => {
      this.runTimer(current_time)
    }, interval - drift);
  }

  private getFormHours(): FormControl {
    return this.timerOptions.get('hours') as FormControl
  }
  private getFormMinutes(): FormControl {
    return this.timerOptions.get('minutes') as FormControl
  }
  private getFormSeconds(): FormControl {
    return this.timerOptions.get('seconds') as FormControl
  }

  TimerFormValue():number {
    let hours = this.getFormHours().value
    let minutes = this.getFormMinutes().value
    let seconds = this.getFormSeconds().value

    let total_duration = ((hours * 3600) + (minutes * 60) + seconds) * 1000
    
    return total_duration
  }

}
