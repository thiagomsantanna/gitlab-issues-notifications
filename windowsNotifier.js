//const notifier = require("node-notifier");
import notifier from 'node-notifier';

export function notifyNoIssues() {
    notifier.notify({
        title: "#PAS",
        message: "Nenhuma tarefa para ser testada!",
        icon: "./imgs/sapo.gif",
        appID: "GitLab Notifier",
    });
}

export function notifyIssues(issue) {
    notifier.notify({
        title: issue.title,
        message: "Nova Tarefa em Homologation!!",
        icon: "./imgs/imgNotific.png",
        appID: "GitLab Notifier",
    });
}
