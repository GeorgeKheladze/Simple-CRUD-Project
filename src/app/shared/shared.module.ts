import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSpinnerComponent } from './loading/loading-spinner/loading-spinner.component';
import { ButtonComponent } from './button/button.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { TextReducerPipe } from './pipe/text-reducer.pipe';
import { PhoneNumberFormatterPipe } from './pipe/phone-number-formatter.pipe';
import { LettersOnlyDirective } from './directives/letters-only.directive';



@NgModule({
  declarations: [
    LoadingComponent,
    LoadingSpinnerComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    TextReducerPipe,
    PhoneNumberFormatterPipe,
    LettersOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    LoadingSpinnerComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    LettersOnlyDirective,
    TextReducerPipe,
    PhoneNumberFormatterPipe
  ]
})
export class SharedModule { }
