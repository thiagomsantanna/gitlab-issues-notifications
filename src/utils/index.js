const logMsg = {
  none: "Nenhuma tarefa não pangaré fica dboa",
  new: (iid, title) => `${iid} - ${title}`,
};

export const LOGGER = {
  info: (now, task = undefined) => {
    let msg = logMsg.none;

    if (task) {
      msg = logMsg.new(task.iid, task.title);
    }

    console.log(msg + now);
  },
};

export function getNowTime() {
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();

  return `${hour}h : ${minutes}min`;
}
