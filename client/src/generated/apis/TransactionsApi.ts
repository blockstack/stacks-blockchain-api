/* tslint:disable */
/* eslint-disable */
/**
 * Stacks 2.0 Blockchain API
 * This is the documentation for the Stacks 2.0 Blockchain API.  It is comprised of two parts; the Stacks Blockchain API and the Stacks Core API.  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/614feab5c108d292bffa#?env%5BStacks%20Blockchain%20API%5D=W3sia2V5Ijoic3R4X2FkZHJlc3MiLCJ2YWx1ZSI6IlNUMlRKUkhESE1ZQlE0MTdIRkIwQkRYNDMwVFFBNVBYUlg2NDk1RzFWIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJibG9ja19pZCIsInZhbHVlIjoiMHgiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Im9mZnNldCIsInZhbHVlIjoiMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibGltaXRfdHgiLCJ2YWx1ZSI6IjIwMCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibGltaXRfYmxvY2siLCJ2YWx1ZSI6IjMwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ0eF9pZCIsInZhbHVlIjoiMHg1NDA5MGMxNmE3MDJiNzUzYjQzMTE0ZTg4NGJjMTlhODBhNzk2MzhmZDQ0OWE0MGY4MDY4Y2RmMDAzY2RlNmUwIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9pZCIsInZhbHVlIjoiU1RKVFhFSlBKUFBWRE5BOUIwNTJOU1JSQkdRQ0ZOS1ZTMTc4VkdIMS5oZWxsb193b3JsZFxuIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJidGNfYWRkcmVzcyIsInZhbHVlIjoiYWJjIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9hZGRyZXNzIiwidmFsdWUiOiJTVEpUWEVKUEpQUFZETkE5QjA1Mk5TUlJCR1FDRk5LVlMxNzhWR0gxIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJjb250cmFjdF9uYW1lIiwidmFsdWUiOiJoZWxsb193b3JsZCIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY29udHJhY3RfbWFwIiwidmFsdWUiOiJzdG9yZSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY29udHJhY3RfbWV0aG9kIiwidmFsdWUiOiJnZXQtdmFsdWUiLCJlbmFibGVkIjp0cnVlfV0=)  ## Design  ### Stacks Core API vs Stacks Blockchain API The blockchain\'s Rust implementation exposes a JSON RPC endpoint (\"Stacks Core API\"), which can be used to interface with the blockchain. It can be used directly. [See the documentation for the `stacks-blockchain` in its Github repository](https://github.com/blockstack/stacks-blockchain/)  All `/v2/` routes a proxied to a Blockstack PBC-hosted Stacks Node. For a trustless architecture, you should make these requests to a self-hosted node.  All `/extended/` routes are provided by the Stacks 2.0 Blockchain API directly. They extend the Stacks Core API capabilities to make it easier to integrate with.  ### Pagination To make API responses more compact, lists returned by the API are paginated. For lists, the response body includes:       - `limit`: the number of list items return per response   - `offset`: the number of elements to skip (starting from `0`)   - `total`: the number of all available list items   - `results`: the array of list items (length of array equals the set limit)  Using the `limit` and `offset` properties, you can paginate through the entire list by increasing the offset by the limit until you reach the total.  ## Client Library A generated JS Client is available for consumption of this API. The client enables typesafe REST and WebSocket communication. Please review the [client documentation](https://blockstack.github.io/stacks-blockchain-api/client/index.html) for more details. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    MempoolTransactionListResponse,
    MempoolTransactionListResponseFromJSON,
    MempoolTransactionListResponseToJSON,
    TransactionResults,
    TransactionResultsFromJSON,
    TransactionResultsToJSON,
} from '../models';

export interface GetTransactionByIdRequest {
    txId: string;
}

export interface PostCoreNodeTransactionsRequest {
    body?: string;
}

/**
 * 
 */
export class TransactionsApi extends runtime.BaseAPI {

    /**
     * Get all recently-broadcast mempool transactions
     * Get mempool transactions
     */
    async getMempoolTransactionListRaw(): Promise<runtime.ApiResponse<MempoolTransactionListResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/extended/v1/tx/mempool`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MempoolTransactionListResponseFromJSON(jsonValue));
    }

    /**
     * Get all recently-broadcast mempool transactions
     * Get mempool transactions
     */
    async getMempoolTransactionList(): Promise<MempoolTransactionListResponse> {
        const response = await this.getMempoolTransactionListRaw();
        return await response.value();
    }

    /**
     * Get a specific transaction by ID  `import type { Transaction } from \'@blockstack/stacks-blockchain-api-types\';` 
     * Get transaction
     */
    async getTransactionByIdRaw(requestParameters: GetTransactionByIdRequest): Promise<runtime.ApiResponse<object>> {
        if (requestParameters.txId === null || requestParameters.txId === undefined) {
            throw new runtime.RequiredError('txId','Required parameter requestParameters.txId was null or undefined when calling getTransactionById.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/extended/v1/tx/{tx_id}`.replace(`{${"tx_id"}}`, encodeURIComponent(String(requestParameters.txId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get a specific transaction by ID  `import type { Transaction } from \'@blockstack/stacks-blockchain-api-types\';` 
     * Get transaction
     */
    async getTransactionById(requestParameters: GetTransactionByIdRequest): Promise<object> {
        const response = await this.getTransactionByIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all recently mined transactions  If using TypeScript, import typings for this response from our types package:  `import type { TransactionResults } from \'@blockstack/stacks-blockchain-api-types\';` 
     * Get recent transactions
     */
    async getTransactionListRaw(): Promise<runtime.ApiResponse<TransactionResults>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/extended/v1/tx`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionResultsFromJSON(jsonValue));
    }

    /**
     * Get all recently mined transactions  If using TypeScript, import typings for this response from our types package:  `import type { TransactionResults } from \'@blockstack/stacks-blockchain-api-types\';` 
     * Get recent transactions
     */
    async getTransactionList(): Promise<TransactionResults> {
        const response = await this.getTransactionListRaw();
        return await response.value();
    }

    /**
     * Broadcast raw transactions on the network. You can use the [stacks-transactions-js](https://github.com/blockstack/stacks-transactions-js) project to generate a raw transaction payload.
     * Broadcast raw transaction
     */
    async postCoreNodeTransactionsRaw(requestParameters: PostCoreNodeTransactionsRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/plain';

        const response = await this.request({
            path: `/v2/transactions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Broadcast raw transactions on the network. You can use the [stacks-transactions-js](https://github.com/blockstack/stacks-transactions-js) project to generate a raw transaction payload.
     * Broadcast raw transaction
     */
    async postCoreNodeTransactions(requestParameters: PostCoreNodeTransactionsRequest): Promise<void> {
        await this.postCoreNodeTransactionsRaw(requestParameters);
    }

}
