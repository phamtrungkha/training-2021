import { formatDate } from "@angular/common";
import { of, Subject } from "rxjs";

export class Common {


  static delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  static titleTerms = new Subject<any>();
  static pageSwitch(status: any): void {
    Common.titleTerms.next(status);
  }

  static getYear(dateString: string): string {
    return `${dateString.slice(0,4)}`;
  }

  static getYearMonth(dateString: string): string {
    return `${dateString.slice(0,6)}`;
  }

  static saveDate(dateString: string): string {
    const format = "YYYYMMddHHmmss";
    return formatDate(dateString, format, 'en-US');
  }
}
