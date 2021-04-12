import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {NzTableModule} from 'ng-zorro-antd/table';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzDividerModule,
    NzInputModule,
    NzLayoutModule,
    NzPopconfirmModule,
    NzTableModule,
    CommonModule,
    FormsModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
