import {APIS} from "../.config";
/**
 * API endpoint where all the data comes from.
 */

const ENDPOINT = {

    // Batch(group) entities
    batch:    '/batch',

    // Cms topics
    topics:   '/topics',

    // Cms posts
    posts:    '/posts',

    // Affiliate advertisers' offers
    offers:   '/offers',

    pages:    '/pages',

    comments: '/comments',

    advertises: '/advertises',
}

export function API(ep: string) {
    // FIXME: We may only need 1 API server!
    // FIXME: hardcode endpoint
    return APIS['bangli_uk'] + ENDPOINT[ep];
}
