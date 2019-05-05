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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillService } from './Bill.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-bill',
  templateUrl: './Bill.component.html',
  styleUrls: ['./Bill.component.css'],
  providers: [BillService]
})
export class BillComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  billSymbol = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  good = new FormControl('', Validators.required);
  transaction_id = new FormControl('', Validators.required);
  banklist = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceBill: BillService, fb: FormBuilder) {
    this.myForm = fb.group({
      billSymbol: this.billSymbol,
      description: this.description,
      date: this.date,
      amount: this.amount,
      good: this.good,
      transaction_id: this.transaction_id,
      banklist: this.banklist,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBill.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Bill',
      'billSymbol': this.billSymbol.value,
      'description': this.description.value,
      'date': this.date.value,
      'amount': this.amount.value,
      'good': this.good.value,
      'transaction_id': this.transaction_id.value,
      'banklist': this.banklist.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'billSymbol': null,
      'description': null,
      'date': null,
      'amount': null,
      'good': null,
      'transaction_id': null,
      'banklist': null,
      'owner': null
    });

    return this.serviceBill.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'billSymbol': null,
        'description': null,
        'date': null,
        'amount': null,
        'good': null,
        'transaction_id': null,
        'banklist': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Bill',
      'description': this.description.value,
      'date': this.date.value,
      'amount': this.amount.value,
      'good': this.good.value,
      'transaction_id': this.transaction_id.value,
      'banklist': this.banklist.value,
      'owner': this.owner.value
    };

    return this.serviceBill.updateAsset(form.get('billSymbol').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceBill.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBill.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'billSymbol': null,
        'description': null,
        'date': null,
        'amount': null,
        'good': null,
        'transaction_id': null,
        'banklist': null,
        'owner': null
      };

      if (result.billSymbol) {
        formObject.billSymbol = result.billSymbol;
      } else {
        formObject.billSymbol = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.good) {
        formObject.good = result.good;
      } else {
        formObject.good = null;
      }

      if (result.transaction_id) {
        formObject.transaction_id = result.transaction_id;
      } else {
        formObject.transaction_id = null;
      }

      if (result.banklist) {
        formObject.banklist = result.banklist;
      } else {
        formObject.banklist = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'billSymbol': null,
      'description': null,
      'date': null,
      'amount': null,
      'good': null,
      'transaction_id': null,
      'banklist': null,
      'owner': null
      });
  }

}
