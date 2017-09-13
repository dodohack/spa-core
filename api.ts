import {APIS} from "../.config";
/**
 * API endpoint where all the data comes from.
 */

const ENDPOINT = {

    // Affiliates' offers
    offers:   '/offers',

}

export function API(ep: string) {
    // FIXME: We may only need 1 API server!
    // FIXME: hardcode endpoint
    return APIS['bangli_uk'] + ENDPOINT[ep];
}
