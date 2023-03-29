import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSpinnerComponent } from './loading/loading-spinner/loading-spinner.component';
import { ButtonComponent } from './button/button.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { TextReducerPipe } from './pipe/text-reducer.pipe';



@NgModule({
  declarations: [
    LoadingComponent,
    LoadingSpinnerComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    TextReducerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    LoadingSpinnerComponent,
    ButtonComponent,
    NumbersOnlyDirective,
    TextReducerPipe
  ]
})
export class SharedModule { }
