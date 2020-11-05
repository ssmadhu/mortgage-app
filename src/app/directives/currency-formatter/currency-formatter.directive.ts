import { DecimalPipe } from '@angular/common';
import { ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective implements OnInit{
  currencyChars = new RegExp('[\.,]', 'g');
  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.format(this.el.nativeElement.value); // format any initial values
  }
  @HostListener('input', ['$event.target.value']) onInput(e: string): void {
    this.format(e);
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val: string): void {
    const numberFormat = parseInt(String(val).replace(this.currencyChars, ''), 10);
    const usd = this.decimalPipe.transform(numberFormat, '1.0', 'en-US');
    this.renderer.setProperty(this.el.nativeElement, 'value', usd);
  }
}
