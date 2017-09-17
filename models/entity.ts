
/**
 * Entity type constant
 */
export const ENTITY = {
    INVALID: 'invalid',
    OFFER:   'offer',
    PAGE:    'page',
    TOPIC:   'topic',
};

/**
 * Entity name, reducer selector and its url
 */
export const ENTITY_INFO = {
    'topic': { selector: 'topics', name: '专题', slug: 'topic' },
    'offer': { selector: 'offers', name: '优惠', slug: 'offer' },
    'page':  { selector: 'pages',  name: '页面', slug: 'page'  },
};

/**
 * Entity model
 */
export class Entity {
    id: number;
    // TODO: ...
}


export class EntityParams {
    key: string;    // Ngrx reducer key
    etype: string;  // Entity type
    per_page:  number;
    cur_page?: number;
    // TODO: more attributes

    static toQueryString(e: EntityParams): string {
        return this._toString(e, '&');
    }

    static toBatchQueryString(e: EntityParams): string {
        return this._toString(e, ';');
    }

    static _toString(e: EntityParams, delimiter: string) {
        let s = 'key=' + e.key + delimiter + 'etype=' + e.etype;
        if (e.per_page) s += delimiter + 'per_page=' + e.per_page;
        if (e.cur_page) s += delimiter + 'cur_page=' + e.cur_page;
        // TODO:
        return s;
    }
}

