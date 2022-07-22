import { HTTPClient } from "@mygym/specs";

export class WebHttpClient implements HTTPClient {
    private severEndpoint: string;
    myHeaders: { [key: string]: string };
    constructor(baseURL: string) {
        this.severEndpoint =
            baseURL.slice(-1)[0] === "/"
                ? baseURL.slice(0, baseURL.length - 1)
                : baseURL;
        this.myHeaders = {};
    }

    async get<T>(path: string, query: { [key: string]: any }): Promise<T> {
        const res = await fetch(
            this.severEndpoint + path + this.formatQueryString(query),
            {
                headers: {
                    ...this.myHeaders,
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*"
                }
            }
        );
        return await this.unserializeResponse(res);
    }
    async post<T>(
        path: string,
        body: any,
        query: { [key: string]: any }
    ): Promise<T> {
        const res = await fetch(
            this.severEndpoint + path + this.formatQueryString(query),
            {
                method: "post",
                body: JSON.stringify(body),
                headers: this.createHeaders()
            }
        );
        return await this.unserializeResponse(res);
    }
    async patch<T>(
        path: string,
        body: any,
        query: { [key: string]: any }
    ): Promise<T> {
        const res = await fetch(
            this.severEndpoint + path + this.formatQueryString(query),
            {
                method: "patch",
                body: JSON.stringify(body),
                headers: this.createHeaders()
            }
        );
        return await this.unserializeResponse(res);
    }
    async put<T>(
        path: string,
        body: any,
        query: { [key: string]: any }
    ): Promise<T> {
        const res = await fetch(
            this.severEndpoint + path + this.formatQueryString(query),
            {
                method: "put",
                body: JSON.stringify(body),
                headers: this.createHeaders()
            }
        );
        return await this.unserializeResponse(res);
    }
    async delete<T>(path: string, query: { [key: string]: any }): Promise<T> {
        const res = await fetch(
            this.severEndpoint + path + this.formatQueryString(query),
            {
                method: "delete",
                headers: this.createHeaders()
            }
        );
        return await this.unserializeResponse(res);
    }

    setHeaders(headers: { [key: string]: string }): void {
        Object.keys(headers).forEach((k) => {
            this.myHeaders[k] = headers[k];
        });
    }

    private formatQueryString(q: {
        [key: string]:
            | string
            | number
            | boolean
            | string[]
            | boolean[]
            | number[];
    }): string {
        const keys = Object.keys(q);
        if (!keys.length) return "";
        const parts = keys.map((k) => {
            const value = q[k];
            if (Array.isArray(value)) {
                return (value as string[]).map((v) => `${k}[]=${v}`).join("&");
            } else {
                return `${k}=${q[k]}`;
            }
        });
        return "?" + parts.join("&");
    }
    private async unserializeResponse(res: Response) {
        const contentType = res.headers.get("Content-Type");
        if (!contentType) {
            return null;
        }
        const types = contentType.split(";");
        const resData = await (async () => {
            if (types.includes("application/json")) {
                return await res.json();
            }
            if (types.includes("text/html")) {
                return await res.text();
            }
            return null;
        })();
        if (res.status >= 400) {
            throw new Error(resData);
        }
        return resData;
    }

    private createHeaders() {
        return {
            ...this.myHeaders,
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*"
        };
    }
}
