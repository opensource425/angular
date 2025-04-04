import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Admin
import { AdminLoginComponent } from "./admin/auth/login/login.component";
import { ForgotpassComponent } from "./admin/auth/forgotpass/forgotpass.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { DefaultLayoutComponent } from './admin/shared/default-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ModelComponent } from './admin/model/model.component';
import { MediaComponent } from './admin/media/media.component';
import { EditHtmComponent } from './admin/edit-htm/edit-htm.component'; 
import { CmsComponent } from './admin/cms/cms.component'; 
import { FormComponent } from './admin/cms/form/form.component'; 
import { EditcmsformComponent } from './admin/cms/editcmsform/editcmsform.component'; 
import { AddmodelComponent } from './admin/model/addmodel/addmodel.component'; 
import { Addmodel1Component } from './admin/model/addmodel1/addmodel1.component'; 
import { Addmodel2Component } from './admin/model/addmodel2/addmodel2.component'; 
import { Addmodel3Component } from './admin/model/addmodel3/addmodel3.component'; 
import { EditmodelComponent } from './admin/model/editmodel/editmodel.component'; 
import { ViewmodelComponent } from './admin/model/viewmodel/viewmodel.component'; 
import { MaphtmlComponent } from './admin/model/maphtml/maphtml.component';
import { RemapComponent } from './admin/model/maphtml/remap/remap.component';
import { AddmediaComponent } from './admin/media/addmedia/addmedia.component'; 
import { UserComponent } from './admin/user/user.component'; 
import { AdduserComponent } from './admin/user/adduser/adduser.component'; 
import { ChangepasswordComponent } from './admin/user/changepassword/changepassword.component'; 
import { ResetpassComponent } from './admin/auth/resetpass/resetpass.component'; 
//Model Viewer app
import { ModelViewComponent } from "./imanual-view/modelviewer/modelview.component";
import { AppLayoutComponent } from './imanual-view/app-layout/app-layout.component';
import { CmsPagesComponent } from './imanual-view/cmspages/cmspages.component';
import { SubadminGuard } from './guards/subadmin.guard';
export const routes: Routes = [
  {  
     
    path: 'admin',    
    children: [
      { path: '', redirectTo: 'model', pathMatch: 'full' },
      {   
        path: 'login', // child route path
        component: AdminLoginComponent, // child route component that the router renders
      },
      {   
        path: 'forgot', // child route path
        component: ForgotpassComponent, // child route component that the router renders
      },
      {   
        path: 'reset-password/:token', // child route path
        component: ResetpassComponent, // child route component that the router renders
      },
      {
        path: '',
        component: DefaultLayoutComponent,
        data: {
          title: '',
          breadcrumb: [
            {
              label: 'Devices',
              url: ''
            }
          ]
        },
        children: [
            {
              path: 'model',
              component: ModelComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/addmodel',
              component: AddmodelComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices/Model',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Add',
                    url: ''
                  }
                ]
              }
            },
            {
              path: 'model/edit-htm',
              component: EditHtmComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'HTML',
                    url: ''
                  }
                ]
              }
            },
            {
              path: 'model/add/step2/:id',
              component: Addmodel1Component,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Model',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/add/step3/:id',
              component: Addmodel2Component,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'HTML',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/add/step4/:id',
              component: Addmodel3Component,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Video Upload',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/edit/:id',
              component: EditmodelComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Details',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/map/:id',
              component: MaphtmlComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Device HTML Mapping',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'model/remap/:main_id/:model_id/:id',
              component: RemapComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                breadcrumb: [
                  {
                    label: 'Devices',
                    url: '/admin/model'
                  },
                  {
                    label: 'Device HTML Mapping',
                    url: ''
                  }
                ]
              }
            },
            {
              path: 'model/:id',
              component: ViewmodelComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Devices',
                
              }
            },
            
            {
              path: 'media',
              component: MediaComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Media',
                breadcrumb: [
                  {
                    label: 'Media',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'cms',
              component: CmsComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Pages',
                breadcrumb: [
                  {
                    label: 'Pages',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'media/add',
              component: AddmediaComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Add Media',
                breadcrumb: [
                  {
                    label: 'Media',
                    url: '/admin/media'
                  },
                  {
                    label: 'Add',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'cms/form',
              component: FormComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Add Page',
                breadcrumb: [
                  {
                    label: 'Pages',
                    url: '/admin/cms'
                  },
                  {
                    label: 'Add',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'cms/edit/:id',
              component: EditcmsformComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Edit CMS',
                breadcrumb: [
                  {
                    label: 'Pages',
                    url: '/admin/cms'
                  },
                  {
                    label: 'Edit',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'users',
              component: UserComponent,
              canActivate: [AuthGuard, AdminGuard, SubadminGuard],
              data: {
                title: 'Sub Admin',
                breadcrumb: [
                  {
                    label: 'Sub Admins',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'users/add',
              component: AdduserComponent,
              canActivate: [AuthGuard, AdminGuard, SubadminGuard],
              data: {
                title: 'Add Sub Admin',
                breadcrumb: [
                  {
                    label: 'Sub Admins',
                    url: '/admin/users'
                  },
                  {
                    label: 'Add',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'users/:id',
              component: AdduserComponent,
              canActivate: [AuthGuard, AdminGuard, SubadminGuard],
              data: {
                title: 'Edit Users',
                breadcrumb: [
                  {
                    label: 'Sub Admins',
                    url: '/admin/users'
                  },
                  {
                    label: 'Edit',
                    url: ''
                  }
                ]
                
              }
            },
            {
              path: 'change_password',
              component: ChangepasswordComponent,
              canActivate: [AuthGuard, AdminGuard],
              data: {
                title: 'Change Password',
                breadcrumb: [
                  {
                    label: 'Change Password',
                    url: ''
                  }
                ]
                
              }
            },
            
            {
              path: 'logout',
              component: DashboardComponent,
              canActivate: [AuthGuard, AdminGuard],
            }
        ]
      }]
  },
  {
    path: 'imanual',
    children: [
      { path: '', component: AppLayoutComponent, 
       children: [        
          { 
            path: 'modelviewer', component: ModelViewComponent,  
              data: {
                title: 'Imanual Model Viewer'
              }
          }, 
                
          { 
            path: ':modelID', component: ModelViewComponent,  
            data: {
              title: 'Imanual Model Viewer'
            }
          },        
        ]
      },    
     
      { 
        path: 'cms/:pageId', component: CmsPagesComponent,  
          data: {
            title: 'Imanual CMS'
          }
      },
      
    ],  
  },
 
  {
    path: "**",
    redirectTo: "/imanual"
  }]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
