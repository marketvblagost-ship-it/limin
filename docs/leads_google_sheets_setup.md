# Настройка заявок: сайт → Google Таблица → Telegram

## Что уже подготовлено

В `index.html` форма больше не открывает Telegram у клиента. Она отправляет заявку на Google Apps Script Web App endpoint.

В `apps_script/Code.gs` лежит готовый код обработчика:
- записывает заявку в Google Таблицу;
- отправляет уведомление в Telegram через `@Liddd_sait_bot`;
- принимает UTM-метки и referrer.

## Что нужно вставить вручную

В Google Apps Script в `Code.gs` заменить:

```js
const SHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const TELEGRAM_BOT_TOKEN = 'PASTE_TELEGRAM_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'PASTE_TELEGRAM_CHAT_ID_HERE';
```

В `index.html` заменить:

```js
const LEADS_ENDPOINT = 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

на ссылку Web App после деплоя Apps Script.

## Как получить SHEET_ID

1. Создать Google Таблицу.
2. Назвать лист `Заявки`.
3. Скопировать ID из URL таблицы:

```text
https://docs.google.com/spreadsheets/d/ЭТО_И_ЕСТЬ_SHEET_ID/edit
```

## Как получить token бота

1. Открыть Telegram.
2. Написать `@BotFather`.
3. Если бот `@Liddd_sait_bot` уже создан — открыть настройки бота и получить token.
4. Если token потерян — сгенерировать новый.

Важно: token нельзя вставлять в `index.html`. Только в Google Apps Script.

## Как получить CHAT_ID

1. Написать боту `@Liddd_sait_bot` сообщение `/start`.
2. Открыть в браузере:

```text
https://api.telegram.org/botTOKEN/getUpdates
```

3. Найти:

```json
"chat":{"id":123456789}
```

Это число и есть `TELEGRAM_CHAT_ID`.

Если уведомления должны приходить в группу:
1. Добавить бота в группу.
2. Написать в группе любое сообщение.
3. Открыть `getUpdates`.
4. Взять `chat.id` группы. Обычно он отрицательный.

## Как задеплоить Apps Script

1. Google Таблица → Расширения → Apps Script.
2. Вставить код из `apps_script/Code.gs`.
3. Deploy → New deployment.
4. Type: Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Нажать Deploy.
8. Скопировать Web App URL.
9. Вставить этот URL в `index.html` вместо `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`.

## Проверка

1. Загрузить обновлённый `index.html` на GitHub.
2. Открыть сайт с параметром кэша:

```text
https://marketvblagost-ship-it.github.io/limin/?v=160
```

3. Отправить тестовую заявку.
4. Проверить:
- заявка появилась в Google Таблице;
- уведомление пришло в Telegram;
- на сайте появилось сообщение `Заявка принята`;
- в Метрике сработала цель `form_submit`.

## Важный риск

Если в `index.html` остался placeholder `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`, форма не будет отправлять заявки автоматически.
