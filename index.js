import * as notifier from "./windowsNotifier.js";
import { getNowTime } from "./getTime.js";
import { consoleLogPangare, consoleLogIssues } from "./consoleLoggers.js";
import { sendIssuesMsgToSlack, sendNOIssuesMsgToSlack } from "./slackMessenger.js";
import { getIssues } from "./gitLabAPIConsumer.js";
import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv/config';


var app = express();

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

app.get("/", function (req, res) {
  res.send("<center><h1>Pai ta on!!!!</h1></center>");
});


setInterval(async function () {

    var nowTime = getNowTime();
 
    var issues = await getIssues();

    if (issues.length === 0) 
    {
      notifier.notifyNoIssues();
      consoleLogPangare(nowTime);
    } 
    else 
    {
      issues.forEach(issue => {
        notifier.notifyIssues(issue);
        consoleLogIssues(issue, nowTime);
      });
    }
  ;
}, 5000); //30min - 1800000 ---------- 15min - 900000


//*/5 * * * *  ------ every 5 minutos
cron.schedule("56 9,11,13,15,17,21 * * *", async function () {

    var nowTime = getNowTime();

    var issues = await getIssues();

    if (issues.length === 0) 
    {
      sendNOIssuesMsgToSlack();
      consoleLogPangare(nowTime);
    } 
    else 
    {
      issues.forEach(issue => {
        sendIssuesMsgToSlack(issue);
        consoleLogIssues(issue, nowTime);
      });
    }
  
});
