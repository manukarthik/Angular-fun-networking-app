import { Component } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute } from "@angular/router"


@Component({
  selector: 'login',
  templateUrl: './profile.component.html',
  styles: [
    `.example-card {
          max-width: 600px;
          margin:auto
      }`
  ]
})

export class ProfileComponent {


  constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  profile
  ngOnInit() {
    var id = this.route.snapshot.params.id
    //console.log(id)
    this.apiService.getProfile(id).subscribe(data => this.profile = data)
    //console.log(profile)



  }
}
