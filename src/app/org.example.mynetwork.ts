import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export enum GOOD_TYPE {
      MILK,
      BANANA,
      TOMATO,
      POTATO,
   }
   export class Commodity extends Asset {
      tradingSymbol: string;
      description: string;
      mainExchange: string;
      type: GOOD_TYPE;
      quantity: number;
      owner: User;
   }
   export class CreditApplication extends Asset {
      creditSymbol: string;
      description: string;
      date: string;
      amount: number;
      reciverBank: Bank;
      owner: Producer;
      bill_list: Bill[];
   }
   export class Bill extends Asset {
      billSymbol: string;
      description: string;
      date: string;
      amount: number;
      good: Commodity;
      transaction_id: number;
      banklist: Bank[];
      owner: User;
   }
   export class Bank extends Participant {
      bankId: string;
      BankName: string;
   }
   export abstract class User extends Participant {
      id: string;
      balance: number;
   }
   export class Producer extends User {
      producerName: string;
      producerSurname: string;
   }
   export class Company extends User {
      companyName: string;
   }
   export class giveCredit extends Transaction {
      creditReq: CreditApplication;
      bank: Bank;
   }
   export class giveBill extends Transaction {
      bill_req: Bill;
      newowner: Company;
   }
   export class createBills extends Event {
      bill_req: Bill;
      producer: Producer;
   }
// }
