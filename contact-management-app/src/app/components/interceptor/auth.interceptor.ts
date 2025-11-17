import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  console.log("[Interceptor] Outgoing request to:", request.url);
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  } else {
    return next(request);
  }
};
