import APIAgent from "@mygym/specs";
import { WebHttpClient } from "./http-client";

let agent: APIAgent | null = null;

export function getApiAgent() {
    if (!agent) {
        const client = new WebHttpClient("http://localhost:1100")
        agent = new APIAgent(client);
    }
    return agent;
}
