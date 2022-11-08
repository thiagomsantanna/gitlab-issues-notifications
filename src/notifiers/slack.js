import { App } from "@slack/bolt";
const app = new App({
  token: process.env.SLACKTOKENTEST,
  signingSecret: process.env.SIGNINGSECRET,
});

const msgsTexts = {
  none: () => "Nenhuma tarefa para ser testada!  :pray:",
  new: ({ iid, title }) =>
    `:hot-desking: Nova Tarefa em Homologation!!\n\n #${iid} - ${title} \n https://gitlab.com/sale-soft/consigvendas/-/issues/${iid}`,
};

export async function sendSlackAlert(task = undefined) {
  const msg = {
    token: process.env.SLACKTOKEN,
    channel: process.env.USERID,
    text: task ? msgsTexts.new(task) : msgsTexts.none(),
  };

  return await app.client.chat.postMessage(msg);
}
