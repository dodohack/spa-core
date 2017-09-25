/**
 * Side effects of entity
 */

import { Action }           from '@ngrx/store';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Rx';
import { Effect, Actions, toPayload }  from '@ngrx/effects';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

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

    /**
     * Load single entity
     */
    @Effect() loadEntity$: Observable<Action> =
        this.actions$.ofType(Entity.LOAD_ENTITY)
            .switchMap((action: Entity.LoadEntity) =>
            this.getEntity(action.payload.etype, action.payload.data)
                .filter(ret => ret.entity != null)
                .map(ret => new Entity.LoadEntitySuccess({etype: ret.etype, data: ret.entity}))
                /*
                .mergeMap(ret => {
                    let actions: Action[] = [];
                    actions[0] = new Entity.LoadEntitySuccess({etype: ret.etype, data: ret.entity});
                    // The second action is just an indicator of the finish status
                    //action[1] = AlertActions.loadCompleted();
                    return Observable.from(actions);
                })
                */
                .catch(() => Observable.of(new Entity.LoadEntityFail()))
            );


    // TODO: Ref https://github.com/vsavkin/state_management_ngrx4/blob/master/clientapp/src/app/model.ts
    /*
    @Effect() navToEntity$ =
        this.actions$.ofType(ROUTER_NAVIGATION)
            .map(this.firstSegment)
            //.filter(s => s.urlseg[0].path == 'deal')
            .map(s => {
                console.log("PAYLOAD OF ROUTER_NAVIGATION: ", s);
                return new Entity.LoadEntity({etype: 'topic', data: 'vitabiotics' });
            });
    */

    /************************************************************************
     * Helper functions
     ************************************************************************/

    /*
    private firstSegment(r: RouterNavigationAction) {
        return r.payload.routerState.root.firstChild;
    }
    */

    /**
     * Get API base by given entity type
     */
    private getApi(t: string, group = false) {
        switch (t) {
            case ENTITY.TOPIC:
                return API('topics');
            case ENTITY.POST:
                return API('posts');
            case ENTITY.OFFER:
                return API('offers');
            case ENTITY.PAGE:
                return API('pages');
            case ENTITY.ADVERTISE:
                return API('advertises');
            case ENTITY.COMMENT:
                return API('comments');
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
        console.log("SIDE EFFECT: getEntity()");
        let api = this.getApi(etype, false) + '/' + id + '?etype=' + etype;
        return this.http.get(api).map(res => res.json());
    }

    /**
     * Request a group of entities with the same entity type from API server
     */
    protected getEntities(etype: string, filters: any): Observable<any> {
        let api = this.getApi(etype, false)
            + '?etype=' + etype + this.buildSingleGroupFilters(filters);

        return this.http.get(api).map(res => res.json());
    }

    /**
     * Get multiple group of entities, return multiple group of entities
     *
     * URL pattern:
     * ?group=[{"params": "key=<string>;etype=<etypt>;..."}, {...}, ...]
     *
     * E.g:
     * ?group=[{"params": "key=latest_post;etype=cms-post;channel=shopping;per_page=6"},
     *         {"params": "key=featured_deal;etype=deal-topic;channel=shopping;per_page=10;type=brand;order_by=ranking;order=desc"}
     *        ]
     *
     * Any parameters used in common entities queries can be used in the group
     * query.
     */
    protected getGroupEntities(paramGroups: any): Observable<any> {
        let api = API('batch') + '?group=' + this.buildMultiGroupFilters(paramGroups);
        return this.http.get(api).map(res => res.json());
    }

}