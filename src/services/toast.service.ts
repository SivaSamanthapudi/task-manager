import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_API_URL } from '../utils/constants/url.constants';
import { Route, Router } from '@angular/router';
import { SharedService } from './shared.service';
import { UserService } from './user.service';
import { ERRORS } from '../utils/constants/errors.constants';
import { IError } from '../utils/interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  errorCode: string;

  showToasterMessage = signal<boolean>(false);
  timer: NodeJS.Timeout;

  closeToaster() {
    this.showToasterMessage.set(false);
    this.errorCode = null;
  }

  setErrorCode(code) {
    this.errorCode = code;
  }

  getErrorInfo(errorCode): IError {
    return ERRORS.find((item) => item.code == errorCode) || null;
  }

  showToaster() {
    this.showToasterMessage.set(true);
    this.timer = setTimeout(() => {
      if (this.showToasterMessage) {
        this.closeToaster();
        clearTimeout(this.timer);
      }
    }, 5000);
  }
}
