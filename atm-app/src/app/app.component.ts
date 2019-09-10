import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SECRET_KEY = [1,1,1,1];

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
  public pinInput: number[];
  public basePinState: number[];
  public enteredItems: number;
  public canBeAltered: boolean;
  public error: string;
  
  constructor(private http: HttpClient) {

    // this.error = "ERROR";

    this.enteredItems = 0;

    this.basePinState = [-1,-1,-1,-1];

    this.pinInput = [-1,-1,-1,-1];

    this.canBeAltered = true;



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

  public getData(pin: any): Observable<any> {
    return this.http.post<any>('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', pin)
      .pipe();
  }

  public pinPageHandler(input: any): void {

    this.error = "";

    const successfulAccess: any = (incomingPinString: string) => {
      const payLoad = {
        pin: incomingPinString
      }
      this.getData(payLoad).subscribe((response: any) => {
        console.log("TCL: AppComponent -> successfulAccess:any -> response", response)
      })
    }

    const clearNumber: any = (input: any) => {
      let numberOfNegatives: number = 0;
      this.pinInput.forEach((pin) => {
        if (pin === -1) {
          numberOfNegatives++;
        }
      })
      if (this.canBeAltered) {
        this.pinInput[((this.pinInput.length - 1) - numberOfNegatives)] = -1;
        this.pin[((this.pinInput.length - 1) - numberOfNegatives)] = " _ ";
        this.enteredItems = ((this.pinInput.length - 1) - numberOfNegatives);
      }            
      if (this.pinInput.toString() === this.basePinState.toString()) {
        this.canBeAltered = false;
      } else {
        this.canBeAltered = true;
      }
    }



    if ((typeof input === 'number') && this.isLoginPage) {
      if ((this.pinInput[this.enteredItems] === -1) && (this.enteredItems <= 3)) {
        this.pinInput[this.enteredItems] = input;
        this.enteredItems = this.enteredItems + 1;
        this.pin[(this.enteredItems - 1)] = " * ";
      }
    } else {
      switch (input) {
        case 'CLEAR':
          clearNumber();
        break;
        case 'CANCEL':
          if (this.isLoginPage) {
            this.enteredItems = 0;
            this.pin = [' _ ',' _ ',' _ ',' _ '];
            this.pinInput = [-1,-1,-1,-1];
            this.error = "";
          } else {
            this.isLoginPage = !this.isLoginPage;
            this.enteredItems = 0;
            this.pin = [' _ ',' _ ',' _ ',' _ '];
            this.pinInput = [-1,-1,-1,-1];
            this.error = "";
          }
        break;
        case '*':
          if (this.isLoginPage) {
            this.error = "OOPS, STAR DOESN'T DO MUCH.";
          }
        break;
        case '#':
            if (this.isLoginPage) {
              this.error = "YIPES!, THE POUND IS USELESS.";
            }
        break;
        case 'OK':
          if (this.isLoginPage) {
            if (this.pinInput.toString() === SECRET_KEY.toString()) {
              let concatElements: string = "";
              this.pinInput.forEach(i => concatElements += i.toString());
              successfulAccess(concatElements);
            } else {
              this.error = "INCORRECT PIN NUMBER!";
            }
          }
        break;
      }
    }
  }

  public atmPageHandler(input: any): void {
    console.log('atmPageHandler', input);
  }

}
