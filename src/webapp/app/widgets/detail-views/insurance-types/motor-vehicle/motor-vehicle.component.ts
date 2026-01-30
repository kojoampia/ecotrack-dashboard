import { Component, Input, OnInit } from '@angular/core';
import { MotorVehicle } from 'app/shared/model/admin-service/motor-vehicle.model';

@Component({
  selector: 'eco-motor-vehicle',
  templateUrl: './motor-vehicle.component.html',
  styleUrls: ['./motor-vehicle.component.scss'],
})
export class MotorVehicleComponent implements OnInit {
  @Input() motorVehicle?: MotorVehicle;

  constructor() {}

  ngOnInit(): void {}
}
