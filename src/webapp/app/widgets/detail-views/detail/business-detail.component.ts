import { Component, Input, OnInit } from '@angular/core';
import { BusinessDetail } from 'app/shared/model/customer-service/customer-application.model';

@Component({
  selector: 'eco-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss'],
})
export class BusinessDetailComponent implements OnInit {
  @Input() businessDetail?: BusinessDetail;

  constructor() {}

  ngOnInit(): void {}
}
