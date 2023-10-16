import { Pipe, PipeTransform } from '@angular/core';
import {IPenalty, PENALTY_CATEGORY} from "../../../../common/model/model";
import {TranslatePenaltyCategoryPipe} from "./translate-penalty-category.pipe";

@Pipe({
  name: 'translatePenaltyList'
})
export class TranslatePenaltyListPipe implements PipeTransform {
    transform(value: IPenalty[]): string {
      let outputString: string= '';
      value.forEach((p, i) => {
          const penalty = p.title;
          i > 0 ? outputString += ` <br> ${penalty}` : outputString += penalty
      })
      return outputString;
  }

}
