# Quiz

На странице подключается только `import.js` и прописывается *обработчик* кнопки, по нажатию на которую должен встраиваться квиз на страницу.

В `import.js` подключается файл стилей и добавляется структура для модального окна квиза. Добавлен ifame со ссылкой на input.html

`input.html` - страница, к которой подключается файл со структурой вопросов `str.js`, стилей `input.css` и файл логики квиза `input.js`.

`quiz.php` - файл-обработчик, который принимает xhr запрос из квиза и отправляет письмо с данными на почту.

import.js
|---index.html
|---index.css
|---|---input.html
|---|---input.js
|---|---input.css
|---|---str.js
quiz.php

Остальные не нужны в продакшене.

## Добавить
- [x] маску для телефона
- [x] валидация JSON в php - как?
- [X] выровнять поля по центру
- [x] добавить страницу результата
- [ ] минификация JS и CSS, в репозитории оставляем понятную
- [ ] JS валидация  полей
- [ ] адаптив