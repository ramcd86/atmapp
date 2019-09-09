import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'atm-app';

  public screenText: string;
  public classList: string;
  public timeInfo: string;
  public isLoginPage: boolean;
  public pin: string [];
  public secretPin: number;
  public pinInput: number[];
  public enteredItems: number;
  
  constructor() {

    this.enteredItems = 0;

    this.pinInput = [-1, -1, -1, -1];

    this.secretPin = 1111;

    this.pin = [' _ ',' _ ',' _ ',' _ '];

    this.isLoginPage = true;

    this.screenText = "Welcome to ATMBank.";

    this.classList = "prelog-text text-center";

    const timeUpdater = () => {
      const date = new Date();
      this.timeInfo = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      setTimeout(() => {
        timeUpdater();
      }, 1000)
    }
    timeUpdater();

  }

  public clickHandler(input: any): void {
    switch (this.isLoginPage) {
      case true: 
        this.pinPageHandler(input);
      break;
      case false:
        this.atmPageHandler(input);
      break;
    }

  }

  public pinPageHandler(input: any): void {
    if (typeof input === 'number') {
      if ((this.pinInput[this.enteredItems] === -1) && (this.enteredItems <= 3)) {
        this.pinInput[this.enteredItems] = input;
        this.enteredItems = this.enteredItems + 1;
        console.log(this.pinInput);
      }
    } else {
      switch (input) {
        case 'CANCEL'
      }
    }
    console.log('pinPageHandler', input);
  }

  public atmPageHandler(input: any): void {
    console.log('atmPageHandler', input);
  }

}
