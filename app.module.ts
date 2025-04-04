import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ckeditor4-angular';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";
import { ToastrModule } from 'ngx-toastr';

import { ProgressBarModule } from "angular-progress-bar"

import { BsModalService } from 'ngx-bootstrap/modal';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';


// Import containers
//Admin
import { AdminLoginComponent } from './admin/auth/login/login.component';
import { DefaultLayoutComponent } from './admin/shared/default-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

//model viewer
//import { CmsLayoutModule } from './imanual-view/cmspages/cms-layout.module';
import { AppLayoutModule } from './imanual-view/app-layout/app-layout.module';


const APP_CONTAINERS = [
  AdminLoginComponent,
  DefaultLayoutComponent,
  ModelComponent,
  EditHtmComponent,
  MediaComponent,
  CmsComponent,
  FormComponent,
  AddmodelComponent, 
  AddmediaComponent, EditcmsformComponent, Addmodel1Component, Addmodel2Component,Addmodel3Component, EditmodelComponent,    ViewmodelComponent, UserComponent, AdduserComponent, ForgotpassComponent, ChangepasswordComponent, ResetpassComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { EditHtmComponent } from './admin/edit-htm/edit-htm.component';
import { MediaComponent } from './admin/media/media.component';
import { CmsComponent } from './admin/cms/cms.component';
import { FormComponent } from './admin/cms/form/form.component';
import { ModelComponent } from './admin/model/model.component';
import { AddmodelComponent } from './admin/model/addmodel/addmodel.component';
import { AddmediaComponent } from './admin/media/addmedia/addmedia.component';
import { EditcmsformComponent } from './admin/cms/editcmsform/editcmsform.component';
import { Addmodel1Component } from './admin/model/addmodel1/addmodel1.component';
import { Addmodel2Component } from './admin/model/addmodel2/addmodel2.component';
import { Addmodel3Component } from './admin/model/addmodel3/addmodel3.component';
import { EditmodelComponent } from './admin/model/editmodel/editmodel.component';
import { ViewmodelComponent } from './admin/model/viewmodel/viewmodel.component';
import { UserComponent } from './admin/user/user.component';
import { AdduserComponent } from './admin/user/adduser/adduser.component';
import { ForgotpassComponent } from './admin/auth/forgotpass/forgotpass.component';
import { ChangepasswordComponent } from './admin/user/changepassword/changepassword.component';
import { ResetpassComponent } from './admin/auth/resetpass/resetpass.component';
import { MaphtmlComponent } from './admin/model/maphtml/maphtml.component';
import { RemapComponent } from './admin/model/maphtml/remap/remap.component';
import * as Sentry from "@sentry/angular";


Sentry.init({
  dsn: ""
});


@NgModule({
  imports: [
    CKEditorModule,
    AngularEditorModule,
    ProgressbarModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    HttpClientModule, 
    FormsModule,
    IconModule,
    AppLayoutModule,
    
    ModalModule,
    IconSetModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgDynamicBreadcrumbModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    ReactiveFormsModule,
    ProgressBarModule,
  //  SelectDropDownModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MaphtmlComponent,
    RemapComponent,
    // ModelComponent,
    // FormComponent,
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    IconSetService,
    BsModalService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

