import { Component, OnInit } from '@angular/core';
import users from '../assets/users.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Table of Users';
  userList: any = users;
  userSearchList = this.userList;

  constructor() { }

  ngOnInit() {
    this.userList.forEach((user: any, index: string | number) => {
      user.registered = user.registered.replace(" ", "");
      user.balance = parseFloat(user.balance.replace(/,/g, "")).toFixed(2);
    });

    /* sorted by “Name” ascending by default */
    this.userList.sort((a: any, b: any) => {
      if (a['name'] < b['name']) {
        return -1;
      } else if (a['name'] > b['name']) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.userList;
  }

  /* Typing in the search input filters the table results by “Name” */
  onSearch(event: any) {
    let value = event.target.value;
    this.userSearchList = this.userList.filter((data: { [x: string]: string; }) => data['name'].toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

  /* A button named “Reset Balance” that sets all of users balances to zero and reflects this in the view. */
  onClickResetBalance() {
    this.userSearchList.forEach((user: any) => {
      user.balance = 0;
    });
  }
}
