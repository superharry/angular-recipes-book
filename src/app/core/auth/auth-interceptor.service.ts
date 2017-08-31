import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().switchMap((token: string) => {
      const authReq = req.clone({
        params: req.params.set("auth", token)
      });
      if (token) {
        console.log(
          "Interceptor injected token: " + token.substring(0, 13) + "..."
        );
      } else {
        console.log("Token is null or empty.")
      }
      return next.handle(authReq);
    });
  }
}