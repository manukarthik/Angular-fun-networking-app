import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html"
})
export class MessagesComponent {
 message:{}

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

 private edit_clicked = false;
edit() {
  this.edit_clicked = true;
}
  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessages(userId);

    this.apiService.messageSelected.subscribe(message => {
      this.message = message;
      console.log(message);
    });
  }
}
