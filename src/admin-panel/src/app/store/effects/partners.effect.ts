import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../AppState";
import { PartnersService } from "src/app/services/partners.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createPartner, createPartnerSuccess, deletePartner, deletePartnerSuccess, fetchPartners, fetchPartnersSuccess, updatePartner, updatePartnerSuccess } from "../actions/partners.action";
import { exhaustMap, map, mergeMap, of } from "rxjs";
import { Partner } from "src/app/models/Partners";

@Injectable()
export class PartnersEffect {
	constructor(
		private store: Store<AppState>,
		private service: PartnersService,
		private actions$: Actions
	) { }

	fetchPartners$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchPartners),
			exhaustMap(() =>
				this.service
					.get()
					.pipe(
						map((partners) =>
							fetchPartnersSuccess({ partners }),
						),
					),
			),
		),
	)

	createPartner$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createPartner),
			mergeMap(({ partner }) =>
				this.service.create(partner).pipe(
					map((partner: Partner) => createPartnerSuccess({ partner }))
				)
			)
		)
	);

	updatePartner$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updatePartner),
			exhaustMap(({ partner }) =>
				this.service.update(partner).pipe(
					map((partner) => updatePartnerSuccess({ partner }))
				)
			)
		)
	)

	deletePartner$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deletePartner),
			exhaustMap(({ id }) => this.service.delete(id).pipe(
				map(() => deletePartnerSuccess({ id }))
			))
		)
	)
}