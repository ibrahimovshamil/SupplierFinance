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
import { CreditApplicationService } from './CreditApplication.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-creditapplication',
  templateUrl: './CreditApplication.component.html',
  styleUrls: ['./CreditApplication.component.css'],
  providers: [CreditApplicationService]
})
export class CreditApplicationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  creditSymbol = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  reciverBank = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  bill_list = new FormControl('', Validators.required);

  constructor(public serviceCreditApplication: CreditApplicationService, fb: FormBuilder) {
    this.myForm = fb.group({
      creditSymbol: this.creditSymbol,
      description: this.description,
      date: this.date,
      amount: this.amount,
      reciverBank: this.reciverBank,
      owner: this.owner,
      bill_list: this.bill_list
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreditApplication.getAll()
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
      $class: 'org.example.mynetwork.CreditApplication',
      'creditSymbol': this.creditSymbol.value,
      'description': this.description.value,
      'date': this.date.value,
      'amount': this.amount.value,
      'reciverBank': this.reciverBank.value,
      'owner': this.owner.value,
      'bill_list': this.bill_list.value
    };

    this.myForm.setValue({
      'creditSymbol': null,
      'description': null,
      'date': null,
      'amount': null,
      'reciverBank': null,
      'owner': null,
      'bill_list': null
    });

    return this.serviceCreditApplication.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'creditSymbol': null,
        'description': null,
        'date': null,
        'amount': null,
        'reciverBank': null,
        'owner': null,
        'bill_list': null
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
      $class: 'org.example.mynetwork.CreditApplication',
      'description': this.description.value,
      'date': this.date.value,
      'amount': this.amount.value,
      'reciverBank': this.reciverBank.value,
      'owner': this.owner.value,
      'bill_list': this.bill_list.value
    };

    return this.serviceCreditApplication.updateAsset(form.get('creditSymbol').value, this.asset)
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

    return this.serviceCreditApplication.deleteAsset(this.currentId)
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

    return this.serviceCreditApplication.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'creditSymbol': null,
        'description': null,
        'date': null,
        'amount': null,
        'reciverBank': null,
        'owner': null,
        'bill_list': null
      };

      if (result.creditSymbol) {
        formObject.creditSymbol = result.creditSymbol;
      } else {
        formObject.creditSymbol = null;
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

      if (result.reciverBank) {
        formObject.reciverBank = result.reciverBank;
      } else {
        formObject.reciverBank = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.bill_list) {
        formObject.bill_list = result.bill_list;
      } else {
        formObject.bill_list = null;
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
      'creditSymbol': null,
      'description': null,
      'date': null,
      'amount': null,
      'reciverBank': null,
      'owner': null,
      'bill_list': null
      });
  }

}
