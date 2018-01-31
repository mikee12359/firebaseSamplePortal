import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { FlotModule } from '../../components/charts/flotChart';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";
import {TodoListComponent} from "./todolist.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    ChartsModule,
    FlotModule,
    IboxtoolsModule,
    ModalModule.forRoot()
  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    TodoListComponent
  ],
})

export class AppviewsModule {
}
