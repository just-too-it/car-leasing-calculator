# Тестовое задание от Oxem Studio

Верстка калькулятора лизинга авто

## Описание

Кроссбраузерная адаптивная верстка по макетам из Figma. Значения в полях выводятся по заданным формулам. По кнопке "Оформить заявку" формируется запрос, который отправляет все данные калькулятора на бэкенд.
В каждое поле можно ввести значение как с клавиатуры, так и с помощью ползунка. В поле "Первоначальный взнос" ввод происходит в процентах от стоимости, значение в рублях высчитывается по формуле.
У каждого поля есть максимальное и минимальное значение — ползунок должен ограничивать пользователя в выборе данных, а при вводе некорректного значения с клавиатуры, оно должно сбрасываться к ближайшему корректному числу (максимуму или минимуму). 
Калькулятор инициализируется с указанными значениями по умолчанию.

## Стек  
* React
* TypeScript
* SCSS
* CSS Modules
* Formik

## Установка и запуск  
### Установка
`npm install`
Устанавливает зависимости в `package.json` файле.

### Запуск приложения  
`npm start`
Запускает приложение в режиме разработки.  
Чтобы просмотреть его в браузере, откройте <http://localhost:3000 >. Страница автоматически перезагрузится, если вы внесете изменения в код.


## Deploy  
https://car-leasing-calculator-one.vercel.app/

