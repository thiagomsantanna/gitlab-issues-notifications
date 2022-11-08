import { notifier } from "./src/notifiers";
import { getNowTime, LOGGER } from "./src/utils";
import { getIssues } from "./src/consumers/gitlab-api.js";
import cron from "node-cron";
import dotenv from "dotenv/config";

setInterval(async function () {
  const nowTime = getNowTime();
  const issues = await getIssues();

  if (issues.length !== 0) {
    for (const issue of issues) {
      notifier.notify(issue);

      LOGGER.info(nowTime, issue);
    }
  } else {
    notifier.notify();

    LOGGER.info(nowTime);
  }
}, 5000); //30min - 1800000 ---------- 15min - 900000

//*/5 * * * *  ------ every 5 minutos
cron.schedule("56 9,11,13,15,17,21 * * *", async function () {
  const nowTime = getNowTime();
  const issues = await getIssues();

  if (issues.length !== 0) {
    for (const issue of issues) {
      await notifier.sendSlackAlert(issue);

      LOGGER.info(nowTime, issue);
    }
  } else {
    await notifier.sendSlackAlert();

    LOGGER.info(nowTime);
  }
});
