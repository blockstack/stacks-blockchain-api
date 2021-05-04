/* tslint:disable */
/* eslint-disable */
/**
 * Stacks 2.0 Blockchain API
 * This is the documentation for the Stacks 2.0 Blockchain API.  It is comprised of two parts; the Stacks Blockchain API and the Stacks Core API.  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/614feab5c108d292bffa#?env%5BStacks%20Blockchain%20API%5D=W3sia2V5Ijoic3R4X2FkZHJlc3MiLCJ2YWx1ZSI6IlNUMlRKUkhESE1ZQlE0MTdIRkIwQkRYNDMwVFFBNVBYUlg2NDk1RzFWIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJibG9ja19pZCIsInZhbHVlIjoiMHgiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Im9mZnNldCIsInZhbHVlIjoiMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibGltaXRfdHgiLCJ2YWx1ZSI6IjIwMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibGltaXRfYmxvY2siLCJ2YWx1ZSI6IjMwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0eF9pZCIsInZhbHVlIjoiMHg1NDA5MGMxNmE3MDJiNzUzYjQzMTE0ZTg4NGJjMTlhODBhNzk2MzhmZDQ0OWE0MGY4MDY4Y2RmMDAzY2RlNmUwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9pZCIsInZhbHVlIjoiU1RKVFhFSlBKUFBWRE5BOUIwNTJOU1JSQkdRQ0ZOS1ZTMTc4VkdIMS5oZWxsb193b3JsZFxuIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJidGNfYWRkcmVzcyIsInZhbHVlIjoiYWJjIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9hZGRyZXNzIiwidmFsdWUiOiJTVEpUWEVKUEpQUFZETkE5QjA1Mk5TUlJCR1FDRk5LVlMxNzhWR0gxIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9uYW1lIiwidmFsdWUiOiJoZWxsb193b3JsZCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY29udHJhY3RfbWFwIiwidmFsdWUiOiJzdG9yZSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY29udHJhY3RfbWV0aG9kIiwidmFsdWUiOiJnZXQtdmFsdWUiLCJlbmFibGVkIjp0cnVlfV0=) 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    BurnchainRewardSlotHolder,
    BurnchainRewardSlotHolderFromJSON,
    BurnchainRewardSlotHolderFromJSONTyped,
    BurnchainRewardSlotHolderToJSON,
} from './';

/**
 * GET request that returns reward slot holders
 * @export
 * @interface BurnchainRewardSlotHolderListResponse
 */
export interface BurnchainRewardSlotHolderListResponse {
    /**
     * The number of items to return
     * @type {number}
     * @memberof BurnchainRewardSlotHolderListResponse
     */
    limit: number;
    /**
     * The number of items to skip (starting at `0`)
     * @type {number}
     * @memberof BurnchainRewardSlotHolderListResponse
     */
    offset: number;
    /**
     * Total number of available items
     * @type {number}
     * @memberof BurnchainRewardSlotHolderListResponse
     */
    total: number;
    /**
     * 
     * @type {Array<BurnchainRewardSlotHolder>}
     * @memberof BurnchainRewardSlotHolderListResponse
     */
    results: Array<BurnchainRewardSlotHolder>;
}

export function BurnchainRewardSlotHolderListResponseFromJSON(json: any): BurnchainRewardSlotHolderListResponse {
    return BurnchainRewardSlotHolderListResponseFromJSONTyped(json, false);
}

export function BurnchainRewardSlotHolderListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BurnchainRewardSlotHolderListResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limit': json['limit'],
        'offset': json['offset'],
        'total': json['total'],
        'results': ((json['results'] as Array<any>).map(BurnchainRewardSlotHolderFromJSON)),
    };
}

export function BurnchainRewardSlotHolderListResponseToJSON(value?: BurnchainRewardSlotHolderListResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'limit': value.limit,
        'offset': value.offset,
        'total': value.total,
        'results': ((value.results as Array<any>).map(BurnchainRewardSlotHolderToJSON)),
    };
}


