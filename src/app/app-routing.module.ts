import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:"home", loadComponent:()=>import('./landpage/landpage.component').then((m)=>m.LandpageComponent)},
  {path:"chart/:id", loadComponent:()=>import('./chart/chart.component').then((m)=>m.ChartComponent)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
