import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { InsertionSortComponent } from './insertion-sort/insertion-sort.component';
import { SelectionSortComponent } from './selection-sort/selection-sort.component';

const routes: Routes = [
  { path: 'selection-sort', component: SelectionSortComponent },
  { path: 'bubble-sort', component: BubbleSortComponent },
  { path: 'insertion-sort', component: InsertionSortComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
