import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http'
import { UsersDbService } from './services/users-db.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public userDb: UsersDbService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let tempToken = localStorage.getItem('authorization');
        if (tempToken!=undefined && tempToken!=''){
            request = request.clone({setHeaders: {
                authorization: tempToken 
            }
            });
        }
        // console.log('INTERCEPTEUR '+'authorization: '+ request.headers.get('authorization'))

        return next.handle(request)
    }
}