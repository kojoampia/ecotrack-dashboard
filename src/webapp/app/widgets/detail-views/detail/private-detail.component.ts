import { Component, Input, OnInit } from '@angular/core';
import { PrivateDetail } from 'app/shared/model/customer-service/private-detail.model';

@Component({
  selector: 'eco-private-detail',
  templateUrl: './private-detail.component.html',
  styleUrls: ['./private-detail.component.scss'],
})
export class PrivateDetailComponent implements OnInit {
  @Input() personalDetail?: PrivateDetail;

  constructor() {}

  ngOnInit(): void {}
}
