import fetch from "node-fetch";
import dotenv from "dotenv/config";

const baseURL = "https://gitlab.com/api/v4";

const defaultHeaders = {
    authorization: `Bearer ${process.env.BEARERTOKEN}`,
};
const queryParams = new URLSearchParams({ 
    labels: "4-doing",
    state: "opened"
}).toString();

export async function getIssues() {
  const path = `/projects/${process.env.PROJECTID}/issues?${queryParams}`;

  const res = (await fetch(`${baseURL}${path}`, defaultHeaders)).json();

  return res;
}
