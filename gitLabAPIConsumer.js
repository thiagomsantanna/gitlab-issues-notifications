import fetch from 'node-fetch';
import dotenv from 'dotenv/config';

export async function getIssues(){
  const gitLabResponse = await fetch(`https://gitlab.com/api/v4/projects/${process.env.PROJECTID}/issues?labels=4-doing&state=opened`, {headers: { authorization: `Bearer ${process.env.BEARERTOKEN}`}});
  const gitLabJSON = await gitLabResponse.json();

  return gitLabJSON;
}
