import * as notificador from "./notificadorWindows.js";
import { pegaHoraAgora } from "./getTime.js";
import { consoleLogaPangaré, consoleLogaTarefas } from "./consoleLoggers.js";
import { mandaMsgComTarefas, mandaMsgSemTarefas } from "./mensageiroSlack.js";
import express from 'express';
import cron from 'node-cron';
import Request from 'request';
import dotenv from 'dotenv/config';

//dotenv.config();

var app = express();

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

app.get("/", function (req, res) {
  res.send("<center><h1>Pai ta on!!!!</h1></center>");
});


setInterval(async function () {

  var horaAgora = pegaHoraAgora();
 
  Request.get(
  {
    auth: {
      bearer: process.env.BEARERTOKEN,
    },
      url: `https://gitlab.com/api/v4/projects/${process.env.PROJECTID}/issues?labels=9-homologation&state=opened`,
    },
    (error, response, body) => {
    if (error) {
      return console.dir(error);
    }

    var tarefas = JSON.parse(body);

    if (tarefas.length === 0) 
    {
      notificador.notificaSemTarefas();
      consoleLogaPangaré(horaAgora);
    } 
    else 
    {
      tarefas.forEach(tarefa => {
        notificador.notificaTarefas(tarefa);
        consoleLogaTarefas(tarefa, horaAgora);
      });
    }
  });
}, 900000); //30min - 1800000 ---------- 15min - 900000


//*/5 * * * *  ------ every 5 minutos
cron.schedule("22 9,11,13,15,17 * * *", function () {

  var horaAgora = pegaHoraAgora();

  Request.get(
  {
    auth: {
      bearer: process.env.BEARERTOKEN,
    },
      url: `https://gitlab.com/api/v4/projects/${process.env.PROJECTID}/issues?labels=9-homologation&state=opened`,
    },
    (error, response, body) => {
    if (error) {
      return console.dir(error);
    }

    var tarefas = JSON.parse(body);

    if (tarefas.length === 0) 
    {
      mandaMsgSemTarefas();
      consoleLogaPangaré(horaAgora);
    } 
    else 
    {
      tarefas.forEach(tarefa => {
        mandaMsgComTarefas(tarefa);
        consoleLogaTarefas(tarefa, horaAgora);
      });
    }
  });
});
