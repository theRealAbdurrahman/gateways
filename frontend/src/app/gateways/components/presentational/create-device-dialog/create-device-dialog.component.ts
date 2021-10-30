import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-device-dialog',
  templateUrl: './create-device-dialog.component.html',
  styleUrls: ['./create-device-dialog.component.scss'],
})
export class CreateDeviceDialogComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  deviceForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      vendor: ['', [Validators.required]],
      status: [false, [Validators.required]],
      uid: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.formSubmitted.emit(this.deviceForm.value);
  }
}
