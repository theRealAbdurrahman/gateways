import { Component, OnInit } from '@angular/core';
import { GatewaysService } from '../../../services/gateaways.service';
import { Select, Store } from '@ngxs/store';
import { GatewaysState } from 'src/app/gateways/store/state/gateways.state';
import { Observable } from 'rxjs';
import { Gateway } from 'src/app/gateways/models/gateaway';
import {
  ListAllGateways,
  SetSelectedGateway,
} from 'src/app/gateways/store/state/gateways.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateGatewayDialogComponent } from '../../presentational/create-gateway-dialog/create-gateway-dialog.component';
import { concatMap } from 'rxjs/operators';
import { CreateGateways } from '../../../store/state/gateways.actions';

@Component({
  selector: 'app-gateaways-list',
  templateUrl: './gateaways-list.component.html',
  styleUrls: ['./gateaways-list.component.scss'],
})
export class GateawaysListComponent implements OnInit {
  @Select(GatewaysState.getAllGatewaysList) gateways$!: Observable<Gateway[]>;

  displayedColumns: string[] = ['name', 'serial', 'ip'];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new ListAllGateways());
  }
  navigateToGatewayDetails(gateway: Gateway) {
    this.store.dispatch(new SetSelectedGateway(gateway));
    this.router.navigate([gateway.serial], { relativeTo: this.route });
  }
  openCreateGatewayModal() {
    const dialog = this.dialog.open(CreateGatewayDialogComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialog.componentInstance.formSubmitted
      .pipe(
        concatMap((value) => this.store.dispatch(new CreateGateways(value)))
      )
      .subscribe({ next: () => dialog.close() });
  }
}
