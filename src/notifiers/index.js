import { sendSlackAlert } from './slack.js';
import { notify} from './windows.js';

export const notifier = {
    notify,
    sendSlackAlert
}