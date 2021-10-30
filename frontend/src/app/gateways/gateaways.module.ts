import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GateawaysRoutingModule } from './gateaways-routing.module';
import { GatewayDetailsComponent } from './components/containers/gateway-details/gateway-details.component';
import { CreateGatewayDialogComponent } from './components/presentational/create-gateway-dialog/create-gateway-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
;
import { CreateDeviceDialogComponent } from './components/presentational/create-device-dialog/create-device-dialog.component';

@NgModule({
  declarations: [GatewayDetailsComponent, CreateGatewayDialogComponent, CreateDeviceDialogComponent],
  imports: [
    CommonModule,
    GateawaysRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
})
export class GateawaysModule {}
