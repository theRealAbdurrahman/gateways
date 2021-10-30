import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-gateway-dialog',
  templateUrl: './create-gateway-dialog.component.html',
  styleUrls: ['./create-gateway-dialog.component.scss'],
})
export class CreateGatewayDialogComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  gatewayForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gatewayForm = this.fb.group({
      name: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      ip: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
          ),
        ],
      ],
    });
  }
  onSubmit() {
    this.formSubmitted.emit(this.gatewayForm.value);
  }
}
