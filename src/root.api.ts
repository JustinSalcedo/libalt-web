import {getServerBaseUrl} from './utils/general'

export interface ReqOptions {
    /**
     * Authorize request
     */
    auth?: boolean
    afterRefresh?: boolean
    noRetry?: boolean
}

interface ApiRequest<T> {
    (options?: ReqOptions): Promise<T>
}

interface RootApiOptions {
    /**
     * Requests are authorized by default
     */
    auth?: boolean
}

interface RequestApiInit extends Omit<RequestInit, 'method'> {}

export class RootApi {
    baseURL: string
    baseConfig: Partial<RequestInit> = {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    /**
     * Requests are authorized by default
     */
    auth: boolean

    constructor(protected rootStore?: any, opts?: RootApiOptions) {
        this.baseURL = getServerBaseUrl()
        this.auth = typeof opts?.auth === 'boolean' ? opts.auth : true
    }

    get token() {
        // return this.rootStore.authStore.accessToken
        return ''
    }

    get authConfig(): Partial<RequestInit> | undefined {
        if (this.token)
            return {
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`,
                },
            }
    }

    protected async GET(
        endpoint: string,
        reqInit?: RequestApiInit,
        reqOpts?: ReqOptions,
    ) {
        return await this.httpMethod('GET', endpoint, reqInit, reqOpts)
    }

    protected async POST(
        endpoint: string,
        reqInit?: RequestApiInit,
        reqOpts?: ReqOptions,
    ) {
        return await this.httpMethod('POST', endpoint, reqInit, reqOpts)
    }

    protected async PUT(
        endpoint: string,
        reqInit?: RequestApiInit,
        reqOpts?: ReqOptions,
    ) {
        return await this.httpMethod('PUT', endpoint, reqInit, reqOpts)
    }

    protected async DELETE(
        endpoint: string,
        reqInit?: RequestApiInit,
        reqOpts?: ReqOptions,
    ) {
        return await this.httpMethod('DELETE', endpoint, reqInit, reqOpts)
    }

    private async httpMethod(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        reqInit?: RequestApiInit,
        reqOpts?: ReqOptions,
    ) {
        const mustAuth =
            typeof reqOpts?.auth === 'boolean' ? reqOpts.auth : this.auth
        const initObj = {
            ...(mustAuth ? this.authConfig : this.baseConfig),
            ...reqInit,
            method,
        }
        console.log('initObj', initObj)
        return await fetch(`${this.baseURL}${endpoint}`, initObj)
    }

    protected async retryRequest<T, F extends ApiRequest<T>>(
        req: F,
    ): Promise<T> {
        // await this.rootStore.authStore.refreshAndSetAuthenticated()
        return await req({afterRefresh: true})
    }
}
