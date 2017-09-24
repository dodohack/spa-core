
/**
 * Entity type constant
 */
export const ENTITY = {
    INVALID: 'invalid',
    OFFER:   'offer',
    PAGE:    'page',
    TOPIC:   'topic',
    POST:    'post',
    ADVERTISE: 'advertise',
    COMMENT: 'comment',
};

/**
 * Entity name, reducer selector and its url
 */
export const ENTITY_INFO = {
    'topic':     { selector: 'topics',     name: '专题', slug: 'topic' },
    'post':      { selector: 'posts',      name: '文章', slug: 'post'  },
    'offer':     { selector: 'offers',     name: '优惠', slug: 'offer' },
    'page':      { selector: 'pages',      name: '页面', slug: 'page'  },
    'advertise': { selector: 'advertises', name: '广告', slug: 'ads'   },
    'comment':   { selector: 'comments',   name: '评论', slug: 'comment' },
};

/**
 * Entity model of topic
 */
export class Entity {
    id: string;
    guid: string;
    channel_id: number;
    type_id: number;
    editor_id: number;
    author_id: number;
    image_id: number;
    images: any;
    type: number | string;
    status: string;
    // FIXME
    locations: any; //GeoLocation[]; // This array only contains 0 or 1 element
    title: string;
    // FIXME
    categoreis: any; //Category[];
    // FIXME
    topics: any; //Topic[];
    content: string;
    updated_at: string;
    offers: any; // FIXME: Replace 'any' with proper type
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

