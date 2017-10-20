/**
 * Load menu configurations
 */
import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { API }           from '../api';
import * as menu         from '../actions/menu';

@Injectable()
export class MenuEffects {
    constructor(private actions$: Actions,
                private http: Http) { }

    @Effect() loadAll$ = this.actions$.ofType(menu.LoadMenu)
        .switchMap(() => this.getAll()
            .map(menus => new menu.LoadMenuSuccess(menus))
            .catch(() => Observable.of(new menu.LoadMenuFail))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll() {
        return this.http.get(API('desktop_menus')).map(res => res.json());
    }
}
