import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
public footer_time:string='';
  constructor() { }

  ngOnInit(): void {
    this.footer_time=new Date().toUTCString();+" Designed by: Panchathi Balaji"
  }


}
