import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {map, tap} from "rxjs";
import {USER_TYPE} from "../../../../common/model/model";
import {MessageService} from "primeng/api";
import {SUCCESS_TOAST} from "../const/toast";

export const authGuard: CanActivateFn = (activatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  let hasPermission: boolean = false;

    return authService.user$.pipe(
      tap((u) => {
          const isLoggedIn: boolean = !!u;
          const userTypes: [USER_TYPE] = activatedRouteSnapshot.data['userTypes'];

          if(userTypes && u) {
              console.log(u);
              hasPermission = userTypes.some((uT) => u?.userType.includes(uT));
          }

          if(!hasPermission) {
              messageService.add({...SUCCESS_TOAST, summary: `Dir fehlt die entsprechende Rolle um diesen Bereich zu betreten.`});
              router.navigate(['']);
          }

          if(!isLoggedIn) {
              router.navigate(['']);
          }

      }),
      map((user) => {
        return !!user && hasPermission;
      })
  )
};
