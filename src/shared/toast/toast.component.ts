import { Component, signal } from '@angular/core';
import { ToasterService } from '../../services/toast.service';
import { ERRORS } from '../../utils/constants/errors.constants';
import { ERROR_TYPE } from '../../utils/enums/enums';
import { STATUS_CONFIG } from '../../utils/constants/constants';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  title: string;
  description: string;
  type: ERROR_TYPE;
  errorMessage = ERRORS;
  status: any;
  bgClass = signal<string>('');

  constructor(private toastService: ToasterService) {}

  ngOnInit() {
    const code = this.toastService.errorCode;
    const errorInfo = this.toastService.getErrorInfo(code);
    this.title = errorInfo.message;
    this.type = errorInfo.type;
    this.status = this.getStatusMessage(this.type);
    console.log('this.errorInfo', errorInfo);
  }

  getStatusMessage(type: ERROR_TYPE): string {
    const config = STATUS_CONFIG[type];

    if (config) {
      this.bgClass.set(config.class);
      return config.message;
    }

    // Fallback for safety
    return 'Unknown Status';
  }
  
  onClose() {
    this.toastService.closeToaster();
  }
}
