/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CommodityComponent } from './Commodity/Commodity.component';
import { CreditApplicationComponent } from './CreditApplication/CreditApplication.component';
import { BillComponent } from './Bill/Bill.component';

import { BankComponent } from './Bank/Bank.component';
import { ProducerComponent } from './Producer/Producer.component';
import { CompanyComponent } from './Company/Company.component';

import { giveCreditComponent } from './giveCredit/giveCredit.component';
import { giveBillComponent } from './giveBill/giveBill.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Commodity', component: CommodityComponent },
  { path: 'CreditApplication', component: CreditApplicationComponent },
  { path: 'Bill', component: BillComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'Producer', component: ProducerComponent },
  { path: 'Company', component: CompanyComponent },
  { path: 'giveCredit', component: giveCreditComponent },
  { path: 'giveBill', component: giveBillComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
