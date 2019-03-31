import { HttpClient } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ApiService {
  private selectedMessage = new Subject<any>();
  messageSelected = this.selectedMessage.asObservable();
    constructor(private http:HttpClient) {}
        messages=[]
        users=[]

    path = environment.path
   getMessages(userId) {
       this.http.get<any>(this.path + '/posts/' + userId).subscribe(res =>{
           this.messages=res
       })
    }


    postMessage(message) {
        this.http.post(this.path + '/post', message).subscribe(res => {

        })
    }

    getUsers() {
        this.http.get<any>(this.path + '/users').subscribe(res => {
            this.users = res
        })
    }
    getProfile(id) {
        return this.http.get(this.path  + '/profile/' + id)
    }

  putMessage(message) {
    console.log(message._id)
    this.http
      .put(this.path + '/update/' + message._id, message)
      .subscribe(res => {
        console.log('***',res);
      });
  }
  selectMessage(message) {
    this.selectedMessage.next(message);
  }
}
