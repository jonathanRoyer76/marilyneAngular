import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http'
import { UsersDbService } from './users-db.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public userDb: UsersDbService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        request = request.clone({
            // headers: request.headers.append('Authorization', 'Bearer')
            // headers: request.headers.append('Content-Type', 'application/x-www-form-urlencoded')
            // setHeaders: {
                // Content-Type: 'application/x-www-form-urlencoded'
                // Authorization: 'Bearer ' + this.userDb.getToken()
            // }
        })
        console.log('DANS L\'INTERCEPTEUR')
        return next.handle(request)
    }
}