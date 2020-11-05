import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZipcodeValidator]'
})
export class ZipcodeValidatorDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keypress') onKeyPressEnter(): void {
    console.log(this.el);
  }

}
