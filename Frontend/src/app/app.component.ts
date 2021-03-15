import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private socket: Socket,
              private fb: FormBuilder) {
    this.getIsPrimeReponse().subscribe(data => {
      this.currentIt++;

      const enc = new TextDecoder('utf-8');
      try {
        this.isPrimeReponse = JSON.parse(enc.decode(data)).response;
      } catch (error) {
        console.log(' — Error is handled gracefully: ', error.name);
      }
      if (this.currentIt === this.getIterations()){
        this.ex2 = performance.now();
      }
    });

    this.getCountPrimeReponse().subscribe(data => {
      this.currentIt++;

      const enc = new TextDecoder('utf-8');
      try {
        this.countResponse = JSON.parse(enc.decode(data)).response;
      } catch (error) {
        console.log(' — Error is handled gracefully: ', error.name);
      }
      if (this.currentIt === this.getIterations()){
        this.ex2 = performance.now();
      }
    });
  }

  get f(): any { return this.isPrimeForm.controls; }

  get g(): any { return this.countPrimeForm.controls; }
  title = 'Frontend';

  // Control iterations to determine speed of round robin
  selectedIterations = 'default';

  errorMsg: string;
  isPrimeForm: FormGroup;

  submitted = false;

  countPrimeForm: FormGroup;

  submittedCount = false;

  isPrimeReponse = 'awaiting';
  countResponse = 'awaiting';

  ex1 = 0;
  ex2 = 0;
  currentIt = 0;

  public precisionRound(numbers: number, precision: number): any
  {
    if (precision < 0)
    {
      const factor = Math.pow(10, precision);
      return Math.round(numbers * factor) / factor;
    }
    else {
      return +(Math.round(Number(numbers + 'e+' + precision)) +
        'e-' + precision);
    }
  }

  getIsPrimeReponse(): any {
    // @ts-ignore
    return this.socket.fromEvent('isPrime').pipe(map((data) => {
      return data;
    }));
  }

  getCountPrimeReponse(): any {
    // @ts-ignore
    return this.socket.fromEvent('countPrime').pipe(map((data) => {
      return data;
    }));
  }

  ngOnInit(): void {
    this.isPrimeForm = this.fb.group({
      isPrimeContrl : ['', Validators.compose([Validators.required, Validators.maxLength(4)])]
    });
    this.countPrimeForm = this.fb.group({
      countPrimeContrl : ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      countPrimeContrl2 : ['', Validators.compose([Validators.required, Validators.maxLength(4)])]
    });
  }

  isPrime(): any{
    this.submitted = true;
    if (this.isPrimeForm.invalid) {
      return;
    }
    const iterate = this.getIterations();
    this.ex1 = performance.now();
    this.currentIt = 0;
    for (let i = 0; i < iterate; i++) {
      this.socket.emit('isPrime', this.isPrimeForm.value.isPrimeContrl);
    }
  }

  countPrime(): any{
    this.submittedCount = true;
    if (this.countPrimeForm.invalid) {
      return;
    }
    const iterate = this.getIterations();
    this.ex1 = performance.now();
    this.currentIt = 0;
    for (let i = 0; i < iterate; i++) {
      this.socket.emit('countPrime', {before: this.countPrimeForm.value.countPrimeContrl,
        after: this.countPrimeForm.value.countPrimeContrl2});
    }
 }
  private getIterations(): any{
    let iterate = 1 ;
    if (this.selectedIterations !== 'default'){
      iterate = Number(this.selectedIterations);
    }
    return iterate;
  }

  public msToTime(duration): string {
    const milliseconds = Number((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const nhours = (hours < 10) ? '0' + hours : hours;
    const nminutes = (minutes < 10) ? '0' + minutes : minutes;
    const nseconds = (seconds < 10) ? '0' + seconds : seconds;

    return nhours + ':' + nminutes + ':' + nseconds + '.' + this.precisionRound(milliseconds, 0);
  }

}
