/**
 * Side effects of entity
 */

import { Action }           from '@ngrx/store';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Rx';
import { Effect, Actions, toPayload }  from '@ngrx/effects';
import { Http, Headers, RequestOptions } from '@angular/http';

import { API }                   from '../api';
import { ENTITY, EntityParams }  from '../models';
import * as Entity               from '../actions/entity';

@Injectable()
export class EntityEffects {

    constructor (private actions$: Actions,
                 private http: Http) {}

    get headers() {
        return new Headers({'Content-Type': 'application/json'});
    }

    /************************************************************************
     * Entity
     ************************************************************************/

    /**
     * Load group of entities with same entity type
     */
    @Effect() loadEntities$: Observable<Action> =
        this.actions$.ofType(Entity.LOAD_ENTITIES)
            .switchMap((action: Entity.LoadEntities) =>
                    this.getEntities(action.payload.etype, action.payload.data)
                    .mergeMap(ret => {
                        let actions: Action[] = [];
                        actions[0] = new Entity.LoadEntitiesSuccess({etype: ret.etype, data: ret});
                        //actions[1] = AlertActions.loadCompleted();
                        return Observable.from(actions);
                    })
                    .catch(() => Observable.of(new Entity.LoadEntitiesFail()))
            );


    /************************************************************************
     * Helper functions
     ************************************************************************/

    /**
     * Get API base by given entity type
     */
    private getApi(t: string, group = false) {
        switch (t) {
            case ENTITY.OFFER:
                return API('offers');
            default:
                return null;
        }
    }

    /**
     * Convert an array of entity filters into a url string.
     * Single group entity version
     */
    private buildSingleGroupFilters(filters: any): string {
        let ret = '&key' + filters.key;

        for(let f of filters) {
            ret + '&' + f.key + '=' + f.value;
        }

        return ret;
    }

    /**
     * Convert an array of entities filters into a url string.
     * Multi group entity version
     */
    private buildMultiGroupFilters(filterGroups: EntityParams[]): string {
        let ret = '[';
        let length = filterGroups.length;
        for(let i = 0; i < length; i++) {
            ret += '{"params":"' + EntityParams.toBatchQueryString(filterGroups[i]) + '"}';
            if (i + 1 != length) ret += ',';
        }
        ret += ']';
        return ret;
    }

    /************************************************************************
     * Network functions
     ************************************************************************/

    /**
     * Request a entity from API server
     */
    protected getEntity(etype: string, id: string): Observable<any> {
        let api = this.getApi(etype, false) + '/' + id + '?etype=' + etype;
        return this.http.get(api).map(res => res.json);
    }

    /**
     * Request a group of entities with the same entity type from API server
     */
    protected getEntities(etype: string, filters: any): Observable<any> {
        let api = this.getApi(etype, false)
            + '?etype=' + etype + this.buildSingleGroupFilters(filters);

        return this.http.get(api).map(res => res.json());
    }
}