import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

//import { Channel }           from './models';
//import { Category }          from './models';
import { ENTITY, Entity }    from './models';
import * as fromEntities     from './reducers';

import * as entity from '../core/actions/entity';

export abstract class EntityBase implements OnInit, OnDestroy
{
    subParams:  any;
    //channel$:    Observable<Channel>;
    //categories$: Observable<Category[]>;
    // TODO: Should we provide a specific type 'Topic[]' or just 'Entity[]'?
    topics$:     Observable<Entity[]>;
    entity$:     Observable<Entity>;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>) {
        switch (etype) {
            case ENTITY.TOPIC:
                this.entity$ = store.select(fromEntities.getCurTopic);
                break;
            case ENTITY.OFFER:
                this.entity$ = store.select(fromEntities.getCurOffer);
                break;
            case ENTITY.POST:
                this.entity$ = store.select(fromEntities.getCurPost);
                break;
            default:
                console.error("ERROR: Unhandled entity type!");
                break;
        }
    }

    ngOnInit() {
        this.dispatchLoadEntity();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
    }

    // FIXME: We should utilize ngrx/router-store as single truth of source.
    // FIXME: So we can listen to url changes in effects and dispatch actions
    // FIXME: from effects as well.
    // REF: https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
    dispatchLoadEntity() {
        this.subParams = this.route.params.distinctUntilChanged()
            .filter(params =>
            params.hasOwnProperty('id') || params.hasOwnProperty('guid'))
            .subscribe(params => {
                let id = params['id'] || params['guid'];
                let payload = { etype: this.etype, data: id };
                this.store.dispatch(new entity.LoadEntity(payload));
            });
    }
}
