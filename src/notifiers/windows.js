import notifier from "node-notifier";

const notification = {
  none: () => {
    return {
      title: "#PAS",
      message: "Nenhuma tarefa para ser testada!",
      icon: "./imgs/sapo.gif",
      appID: "GitLab Notifier",
    };
  },
  new: ({ title }) => {
    return {
      title,
      message: "Nova Tarefa em Homologation!!",
      icon: "./imgs/imgNotific.png",
      appID: "GitLab Notifier",
    };
  },
};

export function notify(issue = undefined) {
  const config = issue ? notification.new(issue) : notification.none();

  return notifier.notify(config);
}
