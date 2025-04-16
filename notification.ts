import notifier from 'node-notifier';
import path from 'path';

export function sendNotification(title: string, message: string) {
  notifier.notify({
    title,
    message,
    appID: (() => { const d = new Date(); return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`; })(),
    icon: path.join(__dirname, 'icon.png'),
    sound: true,
    wait: true,
    open: 'https://stockbit.com/screener',
  });
}
