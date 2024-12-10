import { ApplicationRef, ComponentRef, EmbeddedViewRef, inject, Injectable } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root', // Ensures it's available globally
})
export class MessaggiService {

  private opened = false;
  private componentRef?: ComponentRef<SnackbarComponent>;
  private closeTimeout?: any;

  appRef = inject(ApplicationRef);

  mostraMessaggioErrore(errore: string): void {
    this.open(errore, 3000, undefined, 'var(--bs-danger)');
  }

  mostraMessaggioInformazioni(messaggio: string): void {
    this.open(messaggio, 3000, undefined, 'var(--bs-success)');
  }

  private open(message: string, timeout: number = 5000, selector?: string, backgroundColor?: string) {
    this.openSnackBar(timeout, { message }, selector, backgroundColor);
  }

  private openSnackBar(timeout: number, { message }: { message: string }, selector: string = 'app-root',
    backgroundColor?: string, textColor?: string) {
    if (this.opened) {
      this.closeSnackbar(0, { message, timeout, selector, backgroundColor });
      return;
    }

    this.componentRef = this.appRef.components[0].instance.vcr?.createComponent(SnackbarComponent)!;
    if (this.componentRef) {
      this.componentRef.instance.message = message;
      this.componentRef.instance.bgColor = backgroundColor ?? getComputedStyle(document.body).getPropertyValue('--bg-snackbar');
      this.componentRef.instance.textColor = textColor ?? getComputedStyle(document.body).getPropertyValue('--text-snackbar');
      const element = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.querySelector(selector)?.appendChild(element);
      this.opened = true;

      this.closeSnackbar(timeout);
    }
  }

  private closeSnackbar(timeout: number, reopenSnackBarParams?: { message: string, timeout: number, selector: string, backgroundColor?: string }) {
    if (!!reopenSnackBarParams) {
      clearTimeout(this.closeTimeout);
    }

    this.closeTimeout = setTimeout(() => {
      if (!this.componentRef) return;
      this.componentRef.destroy();
      this.opened = false;

      if (!!reopenSnackBarParams) {
        const { message, timeout, selector, backgroundColor } = reopenSnackBarParams;
        this.open(message, timeout, selector, backgroundColor);
      }
    }, timeout);
  }

}
