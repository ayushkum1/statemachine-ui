import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkflowsComponent } from './pages/workflows/workflows.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { EditorComponent } from './pages/editor/editor.component';
import { HeaderComponent } from './layout/header/header.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import { ModalComponent } from './shared/modals/modal/modal.component';
import { GraphRendererComponent } from './shared/graph/graph-renderer/graph-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    WorkflowsComponent,
    ReportsComponent,
    EditorComponent,
    HeaderComponent,
    TabsComponent,
    ModalComponent,
    GraphRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
