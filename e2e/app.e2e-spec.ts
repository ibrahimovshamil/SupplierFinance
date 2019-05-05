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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for SupplierFinance', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be SupplierFinance', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('SupplierFinance');
    })
  });

  it('network-name should be trade-network@0.2.6-deploy.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('trade-network@0.2.6-deploy.1.bna');
    });
  });

  it('navbar-brand should be SupplierFinance',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('SupplierFinance');
    });
  });

  
    it('Commodity component should be loadable',() => {
      page.navigateTo('/Commodity');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Commodity');
      });
    });

    it('Commodity table should have 7 columns',() => {
      page.navigateTo('/Commodity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('CreditApplication component should be loadable',() => {
      page.navigateTo('/CreditApplication');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreditApplication');
      });
    });

    it('CreditApplication table should have 8 columns',() => {
      page.navigateTo('/CreditApplication');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Bill component should be loadable',() => {
      page.navigateTo('/Bill');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Bill');
      });
    });

    it('Bill table should have 9 columns',() => {
      page.navigateTo('/Bill');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Bank component should be loadable',() => {
      page.navigateTo('/Bank');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Bank');
      });
    });

    it('Bank table should have 3 columns',() => {
      page.navigateTo('/Bank');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Producer component should be loadable',() => {
      page.navigateTo('/Producer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Producer');
      });
    });

    it('Producer table should have 5 columns',() => {
      page.navigateTo('/Producer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Company component should be loadable',() => {
      page.navigateTo('/Company');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Company');
      });
    });

    it('Company table should have 4 columns',() => {
      page.navigateTo('/Company');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('giveCredit component should be loadable',() => {
      page.navigateTo('/giveCredit');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('giveCredit');
      });
    });
  
    it('giveBill component should be loadable',() => {
      page.navigateTo('/giveBill');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('giveBill');
      });
    });
  

});