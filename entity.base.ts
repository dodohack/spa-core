import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

import { Channel }           from './models';
import { Category }          from './models';
import { Entity }            from './models';
import * as fromEntities     from './reducers';

export abstract class EntityBase implements OnInit, OnDestroy
{
    channel$:    Observable<Channel>;
    categories$: Observable<Category[]>;
    // TODO: Should we provide a specific type 'Topic[]' or just 'Entity[]'?
    topics$:     Observable<Entity[]>;
    entity$:     Observable<Entity>;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>) {
        this.entity$ = store.select(fromEntities.getCurEntity(this.etype));
    }

    ngOnInit() {

    }
}