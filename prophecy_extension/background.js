chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('dailyUpdate', { periodInMinutes: 1440 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyUpdate') {
    const target = new Date('2027-03-27T00:00:00');
    const days = Math.floor((target - new Date()) / 86400000);
    if (days >= 0) {
      chrome.action.setBadgeText({ text: String(days) });
      chrome.action.setBadgeBackgroundColor({ color: '#C9A84C' });
      chrome.action.setBadgeTextColor({ color: '#0D0A05' });
    }
  }
});

const target = new Date('2027-03-27T00:00:00');
const days = Math.floor((target - new Date()) / 86400000);
if (days >= 0) {
  chrome.action.setBadgeText({ text: String(days) });
  chrome.action.setBadgeBackgroundColor({ color: '#C9A84C' });
  chrome.action.setBadgeTextColor({ color: '#0D0A05' });
}
