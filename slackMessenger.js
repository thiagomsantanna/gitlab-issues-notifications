import { App } from '@slack/bolt';
import dotenv from 'dotenv/config';


const app = new App({
  token: process.env.SLACKTOKENTEST,
  signingSecret: process.env.SIGNINGSECRET,
});

export function sendNOIssuesMsgToSlack() {
    (async () => {
        const result = await app.client.chat.postMessage({
            token: process.env.SLACKTOKEN, 
            channel: process.env.USERID, 
            text: "Nenhuma tarefa para ser testada!  :pray:",
        });
    })();
}

export function sendIssuesMsgToSlack(tarefas) {
    (async () => {
        const result = await app.client.chat.postMessage({
            token: process.env.SLACKTOKEN, 
            //channel: "U01UP9X8K8F",
            channel: process.env.USERID, 
            text: `:hot-desking: Nova Tarefa em Homologation!!  \n\n #${tarefas.iid} - ${tarefas.title} \n https://gitlab.com/sale-soft/consigvendas/-/issues/${tarefas.iid}`,
        });
    })();
}
