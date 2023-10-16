import { Pipe, PipeTransform } from '@angular/core';
import {PENALTY_CATEGORY} from "../../../../common/model/model";

@Pipe({
  name: 'translatePenaltyCategory'
})
export class TranslatePenaltyCategoryPipe implements PipeTransform {

  transform(value: PENALTY_CATEGORY): string {
      switch (value) {
          case PENALTY_CATEGORY.NONE:
              return 'Nicht spezifiziert';
          case PENALTY_CATEGORY.NOT_ALLOWED_RETURN_TO_GARAGE:
              return 'Unerlaubtes „Return to Garage"'
          case PENALTY_CATEGORY.SPEEDING_IN_PIT:
              return 'Speeding in Pit'
          default:
              return 'Nicht spezifiziert';
      }
  }

}
