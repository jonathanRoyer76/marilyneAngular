import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http'
import { UsersDbService } from './users-db.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public userDb: UsersDbService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let tempToken = localStorage.getItem('authorization');
        if (tempToken!=undefined){
            request = request.clone({setHeaders: {
                authorization: tempToken 
            }
            });
        }
        console.log('content : '+ request.headers.get('Content-Type'))
        console.log('authorization: '+ request.headers.get('authorization'))

        return next.handle(request)
    }
}