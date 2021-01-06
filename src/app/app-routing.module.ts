import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

const routes: Routes = [
  {path: '', redirectTo: 'yoga-poses', pathMatch: 'full'},
  {path: '', outlet: 'sidebar', component: SidebarComponent},
  {path: '', outlet: 'footer', component: FooterComponent},
  {
    path: '',
    children: [
      {
        path: 'yoga-poses',
        loadChildren: () => import('./modules/yoga-poses/yoga-poses.module').then(m => m.YogaPosesModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'your-yoga-flow',
        loadChildren: () => import('./modules/user-yoga-flow/user-yoga-flow.module').then(m => m.UserYogaFlowModule)
      }
    ]
  },
  {path: '**', redirectTo: 'yoga-poses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
