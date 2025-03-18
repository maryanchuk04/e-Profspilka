import { Observable } from 'rxjs';
import { Partner } from 'src/app/models/Partners';
import AppState from 'src/app/store';
import {
    selectPartnersData, selectPartnersLoading
} from 'src/app/store/selectors/partners.selector';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
    ModerationHeaderComponent
} from '../../../../shared/moderation-header/moderation-header.component';
import { LoaderComponent } from '../../../loader/loader.component';

@Component({
  selector: 'app-partners-view',
  imports: [ModerationHeaderComponent, LoaderComponent, NgIf, AsyncPipe, NgFor],
  templateUrl: './partners-view.component.html',
})
export class PartnersViewComponent {
    loading$: Observable<boolean>;
    partners$: Observable<Partner[]>;

    constructor(private router: Router, private store: Store<AppState>) {
        this.partners$ = this.store.select(selectPartnersData);
        this.loading$ = this.store.select(selectPartnersLoading);
    }

    addNewPartner() {
        this.router.navigate(['/moderation/partners/create']);
    }
}
