const SHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Заявки';

const TELEGRAM_BOT_TOKEN = 'PASTE_TELEGRAM_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'PASTE_TELEGRAM_CHAT_ID_HERE';

function doPost(e) {
  try {
    const data = e.parameter || {};

    const date = new Date();
    const name = data.name || '—';
    const phone = data.phone || '—';
    const pageUrl = data.page_url || '—';
    const referrer = data.referrer || '—';
    const utmSource = data.utm_source || '—';
    const utmMedium = data.utm_medium || '—';
    const utmCampaign = data.utm_campaign || '—';
    const utmContent = data.utm_content || '—';
    const utmTerm = data.utm_term || '—';

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Дата',
        'Имя',
        'Телефон',
        'Страница',
        'Referrer',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term'
      ]);
    }

    sheet.appendRow([
      date,
      name,
      phone,
      pageUrl,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm
    ]);

    const message =
      '🔥 Новая заявка с сайта Лимина\n\n' +
      'Имя: ' + name + '\n' +
      'Телефон: ' + phone + '\n' +
      'Страница: ' + pageUrl + '\n' +
      'Источник: ' + referrer + '\n' +
      'UTM source: ' + utmSource + '\n' +
      'UTM medium: ' + utmMedium + '\n' +
      'UTM campaign: ' + utmCampaign + '\n' +
      'Время: ' + date;

    sendTelegram(message);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    try {
      sendTelegram('⚠️ Ошибка при обработке заявки с сайта Лимина: ' + error.message);
    } catch (telegramError) {}

    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTelegram(text) {
  const url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';

  UrlFetchApp.fetch(url, {
    method: 'post',
    payload: {
      chat_id: TELEGRAM_CHAT_ID,
      text: text
    }
  });
}

function doGet() {
  return ContentService.createTextOutput('OK');
}
