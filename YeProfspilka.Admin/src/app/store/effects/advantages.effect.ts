import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';

import { Advantage } from 'src/app/models/Advantage';
import { AdvantageService } from 'src/app/services/advantage.service';

import {
    createAdvantage,
    createAdvantageSuccess,
    deleteAdvantage,
    deleteAdvantageSuccess,
    fetchAdvantage,
    fetchAdvantageSuccess,
    updateAdvantage,
    updateAdvantageSuccess,
} from '../actions/advantage.action';

@Injectable()
export class AdvantagesEffect {
    constructor(private actions$: Actions, private service: AdvantageService, private toastrService: ToastrService) {}

    fetchAdvantages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAdvantage),
            exhaustMap(() => this.service.get().pipe(map((advantages) => fetchAdvantageSuccess({ advantages }))))
        )
    );

    createAdvantage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createAdvantage),
            switchMap(({ advantage }) =>
                this.service.create(advantage).pipe(
                    map((advantage: Advantage) => {
                        this.toastrService.success('Перевагу успішно створено!');
                        return createAdvantageSuccess({ advantage });
                    }),
                    catchError(() => {
                        this.toastrService.error('Шось пішло не так при створенні!');
                        return of(undefined);
                    })
                )
            )
        )
    );

    updateAdvantage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAdvantage),
            switchMap(({ advantage }) =>
                this.service.update(advantage).pipe(
                    map((advantage: Advantage) => {
                        this.toastrService.success('Успішно оновлено!');
                        return updateAdvantageSuccess({ advantage });
                    }),
                    catchError(() => {
                        this.toastrService.error('Шось пішло не так при оновленні!');
                        return of(undefined);
                    })
                )
            )
        )
    );

    deleteAdvantage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteAdvantage),
            switchMap(({ id }) =>
                this.service.delete(id).pipe(
                    map(() => {
                        this.toastrService.success('Успішно видалено!');
                        return deleteAdvantageSuccess({ id });
                    }),
                    catchError(() => {
                        this.toastrService.error('Шось пішло не так при видаленні!');
                        return of(undefined);
                    })
                )
            )
        )
    );
}
