import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.page.html',
  styleUrls: ['./personal-list.page.scss'],
})
export class PersonalListPage implements OnInit {
  mode: string = 'md'

  constructor() { }

  ngOnInit() {
  }

}
