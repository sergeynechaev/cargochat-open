# Cargo.chat api docs

# request_format

формат запроса

* основной URI: `http://cargo.chat/api` (в релизе схема будет только `https`)
* метод: `POST` или `GET` (в релизе будет только `POST`)
* параметры: `cm=<json объект>` (в релизе будет просто `<json объект>`)
* возвращаемые данные: `<json объект>`
* наличие в ответе ключа `err` означает наличие ошибки, его значение (number) содержит код ошибки
* ключ `err` идет сопровождается ключем `msg`, его значение (string) содержит краткое пояснение ошибки

# request_example

пример авторизации

`http://cargo.chat/api?cm={"cm":"user_login","email":"client@gmail.com","passw":"123456"}`

где:

* `cm` (object) объект запроса
* `cm.cm` (string) имя запроса
* `cm.email` (string) email
* `cm.passw` (string) пароль

ответ при успешной авторизации

```
{
 "sid": "abcdefg123456789",
 "user_id": 12345
}
```

где:

* `sid` (string) идентификатор сессии
* `user_id` (number) идентификатор пользователя

ответ при возникновении ошибки

```
{
 "err": -1,
 "msg": "invalid email or password"
}
```

общие ошибки

* `-1010` - неверный формат входных данных
* `-1011` - неверный/недействительный sid
* `-2000` - неопределенная ошибка

# requests_index

список запросов

* user
  * [user_passw_recovery](#user_passw_recovery)
  * [user_get_key_a](#user_get_key_a) (deprecated)
  * [user_change_passw](#user_change_passw) (deprecated)
  * [user_get_key_b](#user_get_key_b) (deprecated)
  * [user_change_email](#user_change_email) (deprecated)
  * [user_login](#user_login)
  * [user_sessions](#user_sessions)
  * [user_logout](#user_logout)
  * [user_state](#user_state)
  * [user_contact_add](#user_contact_add)
  * [user_contact_rem](#user_contact_rem)
  * [user_update](#user_update)
  * [user_auths](#user_auths)
  * [user_auth_new](#user_auth_new)
  * [user_auth_delete](#user_auth_delete)
  * [user_info](#user_info)
  * [user_invite_create](#user_invite_create)
  * [user_invite_delete](#user_invite_delete)
  * [user_invite_get](#user_invite_get)
  * [user_invite_sms](#user_invite_sms)
  * [user_invite_accept](#user_invite_accept)
  * [user_position_change](#user_position_change)
* social
  * [social_facebook_login](#social_facebook_login)
  * [social_facebook_bind](#social_facebook_bind)
  * [social_facebook_unbind](#social_facebook_unbind)
  * [social_linkedin_login](#social_linkedin_login)
  * [social_linkedin_bind](#social_linkedin_bind)
  * [social_linkedin_unbind](#social_linkedin_unbind)
* [check_unique](#check_unique)
* comp
  * [comp_create2](#comp_create2)
  * [comp_suggest](#comp_suggest)
  * [comp_check](#comp_check)
  * [comp_invite_create](#comp_invite_create)
  * [comp_invite_get](#comp_invite_get)
  * [comp_invite_sms](#comp_invite_sms)
  * [comp_invite_accept](#comp_invite_accept)
  * [comp_logo_delete](#comp_logo_delete)
  * [comp_logo_upsert](#comp_logo_upsert)
  * [comp_user_move](#comp_user_move)
  * [comp_state](#comp_state)
  * [comp_update](#comp_update)
  * [comp_delete](#comp_delete)
  * [comp_relation_create](#comp_relation_create)
  * [comp_relation_delete](#comp_relation_delete)
  * [comp_relation_request_delete](#comp_relation_request_delete)
  * [comp_relation_request_accept](#comp_relation_request_accept)
  * [comp_relation_request_refuse](#comp_relation_request_refuse)
  * [comp_user_delete](#comp_user_delete)
  * [comp_user_perm_change](#comp_user_perm_change)
  * [comp_rel_summary](#comp_rel_summary)
* vehicle
  * [vehicle_manage](#vehicle_manage)
* roadtrain
  * [roadtrain_manage](#roadtrain_manage)
* price_requests
  * [price_request_bet_create](#price_request_bet_create)
  * [price_request_bookmark_create](#price_request_bookmark_create)
  * [price_request_bookmark_delete](#price_request_bookmark_delete)
  * [price_request_create](#price_request_create)
  * [price_request_delete](#price_request_delete)
  * [price_request_received_delete](#price_request_received_delete)
* tender
  * [tender_create](#tender_create)
  * [tender_update](#tender_update)
  * [tender_delete](#tender_delete)
  * [tender_invite_create](#tender_invite_create)
  * [tender_invite_delete](#tender_invite_delete)
  * [tender_invite_accept](#tender_invite_accept)
  * [tender_invite_refuse](#tender_invite_refuse)
  * [tender_join_request_create](#tender_join_request_create)
  * [tender_join_request_delete](#tender_join_request_delete)
  * [tender_join_request_accept](#tender_join_request_accept)
  * [tender_join_request_refuse](#tender_join_request_refuse)
* [ping](#ping)
* [dadata](#dadata)
* [temp_file_create](#temp_file_create)
* [lead_reg](#lead_reg)
* msg
  * msg_private
    * [msg_private_send](#msg_private_send)
    * [msg_private_readed](#msg_private_readed)
  * msg_channel
    * [msg_channel_create](#msg_channel_create)
    * [msg_channel_delete](#msg_channel_delete)
    * [msg_channel_invite](#msg_channel_invite)
    * [msg_channel_join](#msg_channel_join)
    * [msg_channel_leave](#msg_channel_leave)
    * [msg_channel_users](#msg_channel_users)
    * [msg_channel_send](#msg_channel_send)
    * [msg_channel_readed](#msg_channel_readed)
    * [msg_channel_erase](#msg_channel_erase)
    * [msg_channel_correct](#msg_channel_correct)
* load_places
  * [lplace_manage](#lplace_manage)
* orders
  * [order_manage](#order_manage)
  * [order_state_flow](#order_state_flow)
  * [order_state_close](#order_state_close)
  * [order_offer_create](#order_offer_create)
  * [order_offer_bid](#order_offer_bid)
  * [order_memo](#order_memo)
  * [order_export](#order_export)
  * [order_import](#order_import)
* [events](#events)
  * [event__msg_private_new](#event__msg_private_new)
  * [event__msg_private_unreaded](#event__msg_private_unreaded)
  * [event__msg_private_interlocutor_lrm](#event__msg_private_interlocutor_lrm)
  * [event__msg_channel_invite](#event__msg_channel_invite)
  * [event__msg_channel_user_upsert](#event__msg_channel_user_upsert)
  * [event__msg_channel_user_leave](#event__msg_channel_user_leave)
  * [event__msg_channel_deleted](#event__msg_channel_deleted)
  * [event__msg_channel_new](#event__msg_channel_new)
  * [event__msg_channel_unreaded](#event__msg_channel_unreaded)
  * [event__msg_channel_erase](#events__msg_channel_erase)
  * [event__msg_channel_correct](#events__msg_channel_correct)
  * [event__msg_channel_orders](#event__msg_channel_orders)
  * [event__order_flow](#event__order_flow)
  * [event__order_offer_flow](#event__order_offer_flow)
* [Lists](#lists)
  * [comps_list](#comps_list)
  * [tenders_list](#tenders_list)
  * [price_requests_list](#price_requests_list)
  * [users_list](#users_list)
  * [drivers_list](#drivers_list)
  * [vehicles_list](#vehicles_list)
  * [roadtrains_list](#roadtrains_list)
  * [msg_channels_list](#msg_channels_list)
  * [msg_privates_list](#msg_privates_list)
  * [lead_list](#lead_list)
  * [comp_rel_list](#comp_rel_list)
  * [comp_rel_req_list](#comp_rel_req_list)
  * [comp_invites_list](#comp_invites_list)
  * [msg_channel_hist_list](#msg_channel_hist_list)
  * [msg_private_hist_list](#msg_private_hist_list)
  * [user_contacts_list](#user_contacts_list)
  * [lplaces_list](#lplaces_list)
  * [orders_list](#orders_list)
  * [order_offers_list](#order_offers_list)
* [file](#file)
* [websocket](#websocket)
  * [ws_ping](#ws_ping)
  * [ws_reg](#ws_reg)
  * [ws_watch](#ws_watch)


## user_passw_recovery

восстановление пароля

```
{
 "cm":"user_passw_recovery",
 "email":   <(string) (опция) email>,
 "token":   <(string) (опция) токен>,
 "smscode": <(number) (опция) код из смс>,
 "passw":   <(string) (опция) новый пароль>
}
```

* если указан `email`, то на него будет выслен `token`
* если указан `token`, то на телефон будет выслан `smscode`
* если указан `token`, `smscode` и `passw`, то пароль будет изменен

ответ

```
{
 "token_ttl":    <(number) (опция) сколько секунд token будет действителен>,
 "phone":        <(string) (опция) телефон (открыты последние 4 цыфры) на который был отправлен smscode>,
 "cooldown":     <(number) (опция) через сколько секунд можно будет перезапросить smscode>,
 "smscode_ttl":  <(number) (опция) сколько секунд smscode будет действителен>
}
```

* алгоритм смены пароля:
  * пользователь осознает что забыл `пароль`, но помнит `email`
  * делаем `user_passw_recovery` с указанием `email` - на указанный `email` выстывалется `token`
  * пользователь имея доступ к `email` получает `token`
  * делаем `user_passw_recovery` c указанием `token` - на `phone` аккаунта связанного с `email` высылается `smscode`
  * пользователь имея доступ к `phone` получает `smscode`
  * делаем `user_passw_recovery` c указанием `token`, `smscode` и `passw` - меняем пароль аккаунта



## user_get_key_a

Получение на мыло `key_a` для изменения юзера

```
{
 "cm":"user_get_key_a",
 "email":"мыло"
}

{
}
```

* на `email` будет отправлен `key_a`
* `key_a` можно использовать для изменения пароля и активации
* `key_a` можно использовать для получения `key_b`

ошибки

* `-1` - неверное мыло

## user_change_passw

Изменение пароля юзера используя `key_a`

```
{
 "cm":"user_change_passw",
 "key_a":"ключ",
 "new_passw":"новый пароль"
}

{
}
```

* если юзер не был активирован, то он активируется
* у юзера получавшего `key_a` будет изменен пароль на `new_passw`

ошибки

* `-1` - недействительный ключ

## user_get_key_b

Получение на мыло `key_b` используя `key_a`

```
{
 "cm":"user_get_key_b",
 "key_a":"ключ",
 "new_email":"новое мыло"
}

{
}
```

* на `new_email` будет отправлен `key_b`
* `key_b` можно использовать для изменения мыла юзера на `new_mail`

ошибки

* `-1` - недействительный ключ

## user_change_email

Изменение email юзера используя `key_b`

```
{
 "cm":"user_change_email",
 "key_b":"ключ"
}

{
}
```

* мыло юзера который получал `key_b` изменено на то, которое было указано при получении `key_b`

ошибки

* `-1` - недействительный ключ



## user_login

авторизация пользователя

```
{
 "cm":      "user_login",
 "email":   <(string) email>,
 "passw":   <(string) пароль>,
 "smscode": <(number) код из СМС (если включена опция двухэтапной авторизаци)>
}
```

ответ при необходимости ввести `smscode`:

```
{
 "phone":    <(string) телефон на который выслан смс код (если отсутствет, то smscode выслан не был)>,
 "cooldown": <(number) кол-во секунд через которое можно повторить операцию при которой smscode будет выслан>
}
```

ответ при выполнении входа:

```
{
 "sid":     <(string) id сессии>,
 "user_id": <(number) id пользователя>,
 "comp_id": <(number) id компании пользователя>
}
```

* полученный `sid` можно использовать для подписи следующих запросов
* подписанные запросы будут выполняться от имени пользователя получившего `sid`

* тестовые пользователи в разных компаниях (`email` / `passw` / `компания` / `тип`)

| email                 | passw       | компания (id)      | тип                                           |
|-----------------------|-------------|--------------------|-----------------------------------------------|
| t1@t.t                | 123         |                    |                                               |
| t2@t.t                | 123         |                    |                                               |
| t3@t.t                | 123         |                    |                                               |
| t4@t.t                | 123         |                    |                                               | 
| t5@t.t                | 123         |                    |                                               |
| decart@cargo.chat     | 123         | декарт (396)       | грузовладелец(shipper)                        |
| subvect@cargo.chat    | 123         | сабвект (386)      | грузовладелец(shipper)                        |
| bumtrans@cargo.chat   | 123         | бумтранс (283)     | экспедитор,перевозчик(expeditor)              |
| kozlov@cargo.chat     | 123         | ип козлов (341)    | перевозчик(carrier)                           |
| mondi@cargo.chat      | 123         | Монди (350)        |                                               |
| t10@t.t               | 123         | Логос Терминал     |                                               |
| t11@t.t               | 123         | Логос Терминал     |                                               |
| t12@t.t               | 123         | Логос Терминал     |                                               |
| admin@cargo.chat      | b74aea88ca  | Евразия(id=343)    | это пользователь с правами админа системы     |



## user_sessions

список активных сессий

```
{
 "cm":  "user_sessions",
 "sid": <(string) sid>
}
{
 "sessions":[
  {
   "sid":   <(string) sid>,
   "ctime": <(number) время создания>,
   "mtime": <(number) время последнего запроса>,
   "ip":    <(string) ip клиента последнего запроса>
  }, ...
 ]
}
```

* все сессии действительны и могут быть использованы в следующих запросах



## user_logout

выход пользовтаеля

```
{
 "cm":  "user_logout",
 "sid": <(string) sid>
}
{
}
```

* переданный `sid` становится недействительным



## check_unique

проверка уникальности значения

```
{
 "cm":    "check_unique",
 "field": <(string) тип>,
 "value": <(string|number) значение>
}
```

типы `field`:

* `user_email`
* `user_mobile`
* `user_icq`
* `user_skype`
* `comp_inn`
* `comp_ogrn`

ответ

```
{
 "unique":    <true|false>,
 "holder_id": <(number|null) id пользователя или компании которой занято это значение (null - не занято)>
}
```



## user_state

состояние текущего пользователя

```
{
 "cm":  "user_state",
 "sid": <(string) sid>
}

{
 "id":         <(number) id пользователя>,
 "flags":      <(number) флаги см user_flags>,
 "first_name": <(string) имя>,
 "last_name":  <(string) фамилия>,
 "pat_name":   <(string) отчество>,
 "birthday":   <(string) день рождения YYYY-MM-DD>,
 "gender":     <(string) пол>,
 "email":      <(string) email>,
 "icq":        <(string) icq>,
 "mobile":     <(string) mobile>,
 "skype":      <(string) skype>,
 "workspace":  <(string) carrier|expeditor|shipper>
 "comp_id":    <(number) id компании>,
 "comp_flags": <(number) флаги прав в компании>,
 "role":       <(string) роль>,
 "comp":{
  "id":   <(number) id компании>,
  "inn":  <(string) ИНН компании>,
  "name": <(string) имя компании>
 },
 "accounts":[
  {
   "provider": <(string) провайдер "facebook", "linkedin", ...>,
   "key":      <(string) идентификатор (скорее всего user_id по версии провайдера аккаунта)>,
   "j_doc":    <(object) json объект с данными профиля полученный от провайдера аккаунта>
  }, ...
 ],
 "version": <(number) (deprecated) текущая версия клиента (для синхронизации запросом events)>,
 "j_doc":   <(object) объект произвольных данных>
}
```

### comp_flags

флаги прав пользователя в его компании

* `0x0001` - все права (если есть этот флаг, то другие флаги не обязательны, пользователь может делать в компании всё)
* `0x0002` - право управления правами сотрудников в компании
* `0x0004` - право управления тендерами
* `0x0010` - право управления связями
* `0x0020` - право изменения данных компании
* `0x0040` - право управлять приглашениями сотрудников в компанию


### msg_channel_user_flags

флаги пользователя в канале

* `0x0001` - приглашен (должен сделать join или leave)
* `0x0002` - создатель этого канала (может удалить этот канал)



## user_contact_add

добавить контакт

```
{
 "cm":      "user_contact_add",
 "sid":     <(string) sid>,
 "user_id": <(number) id пользователя>
}
```



## user_contact_rem

удалить контакт

```
{
 "cm":      "user_contact_rem",
 "sid":     <(string) sid>,
 "user_id": <(number) id пользователя>
}
```



## user_update

изменение данных пользователя

```
{
 "cm":         "user_update",
 "sid":        <(string) sid>,
 "flags":      <(number) (опция) флаги (см user_flags)>,
 "first_name": <(string) (опция) имя>,
 "last_name":  <(string) (опция) фамилия>,
 "pat_name":   <(string) (опция) отчество>,
 "birthday":   <(string) (опция) день рождения по маске YYYY-MM-DD>,
 "gender":     <(string) (опция) пол>,
 "icq":        <(string) (опция) icq>,
 "mobile":     <(string) (опция) телефон>,
 "skype":      <(string) (опция) скайп>,
 "position":   <(string) (опция) должность>,
 "workspace":  <(string) (опция) (см user_workspace)>,
 "role":       <(string) (опция) (см user_role)>,
 "j_doc":      <(object) (опция) объект произвольных данных>
}
```

ошибки

* `-1` - `icq` занят
* `-2` - `mobile` занят
* `-3` - `skype` занят



### user_flags

* приватные сообщения:
  * `0x00000001` - не получать ни от кого
  * `0x00000002` - получать от всех
  * `0x00000004` - получать от контактов
  * `0x00000008` - получать от пользователей связанных компаний (кроме blacklist)

* приглашения в каналы:
  * `0x00000010` - не получать ни от кого
  * `0x00000020` - получать от всех
  * `0x00000040` - получать от контактов
  * `0x00000080` - получать от пользователей связанных компаний (кроме blacklist)

* `0x00000100` - включена двух этапная авторизация (через СМС)

* моя контактная информация доступна:
  * `0x00000200` - всем подряд
  * `0x00000400` - пользователям связанных компаний
  * `0x00000800` - пользователям по переписке
  * `0x00001000` - пользователям из списка моих контактов

* мой профиль видят:
  * `0x00002000` - все подряд
  * `0x00004000` - пользователи связанных компаний
  * `0x00008000` - пользователи по переписке
  * `0x00010000` - пользователи из списка моих контактов

* контактная информация это:
  * `email`
  * `phone`
  * `skype`
  * `icq`

* профиль это:
  * контактная информация
  * `ln`
  * `fn`
  * `pn`
  * `birthday`
  * `comp_id`
  * `comp_name`
  * `position`



### user_workspace

предназначено для постоения адаптивного интерфейса на клиенте

* `carrier` - перевозчик
* `expeditor` - эеспедитор
* `shipper` - грузовледелец
 


### user_role

роли пользователей

* `null` - роль не определена
* `driver` - водитель
  * позволяет юзеру быть водителем АП



## user_auths

авторизационные данные пользовтаеля

```
{
 "cm":  "user_auths",
 "sid": <(string) sid>
}

{
 "auths":[
  {
   "type":   <(string) тип>,
   "key":    <(string) ключ>,
   "secret": <(string) секрет>
  }, ...
 ]
}
```

* вернет список возможных методов авторизации
* должен быть хотя бы один метод
* не может быть два метода с одинаковыми типами

типы auths

* `email_passw` стандартная учетная запись
  * `key` - email
  * `secret` - пароль
* `facebook` - OAuth через facebook
  * `key` - id пользователя в facebook
  * `secret` - токен
* `linkedin` - OAuth через linkedin
  * `key` - id пользователя в linkedin
  * `secret` - токен



## user_auth_new

добавление метода авторизации

```
{
 "cm":   "user_auth_new",
 "sid":  <(string) sid>,
 "type": <(string) тип>,
 "code": <(string) код OAuth>
}
{
}
```



## user_auth_delete

удаление метода авторизации

```
{
 "cm":   "user_auth_delete",
 "sid":  <(string) sid>,
 "type": <(string) тип>
}
{
}
```



## user_info

информация о пользователях по списку user_id

```
{
 "cm":    "user_info",
 "sid":   <(string) sid>,
 "users":[
  <(number) id пользователя>,
  ...
 ]
}
{
 "users":[
  {
   "id":         <(number) id пользователя>,
   "first_name": <(string) имя>,
   "last_name":  <(string) фамилия>,
   "pat_name":   <(string) отчество>,
   "birthday":   <(string) день рождения>,
   "gender":     <(string) пол>,
   "email":      <(string) email>,
   "icq":        <(string) icq>,
   "comp_id":    <(number) id компании пользователя>,
   "j_doc":      <(object) объект произвольных данных>
  },
  ...
 ]
}
```

* возвращает информацию о пользователях по их `id`
* `id` несуществующих пользователей будут проигнорированы
* максимальное количество пользователей в одном запросе 500 шт



## user_invite_create

приглашение нового пользователя как сотрудника компании

    {
     "cm":         "user_invite_create",
     "sid":        <(string) sid>,
     "email":      <(string) email приглашаемого>,
     "position":   <(string) должность>,
     "phone":      <(string) телефон приглашаемого (не обязательно)>,
     "first_name": <(string) имя приглашаемого (не обязательно)>,
     "pat_name":   <(string) отчество приглашаемого (не обязательно)>,
     "last_name":  <(string) фамилия приглашаемого (не обязательно)>
    }

ответ

    {
     "created_invite_id": <(number) id созданного приглашения>
    }

* на `email` будет отправлено письмо с токеном для `user_invite_accept`
* принятие приглашения создаст нового пользователя с указанными в приглашении ФИО, мылом, должностью


## user_invite_delete

удаление приглашения нового пользователя как сотрудника компании

    {
     "cm":        "user_invite_delete",
     "sid":       <(string) sid>,
     "invite_id": <(number) id удаляемого приглашения>
    }

ответ

    {
     "deleted_invite_id": <(number) id удаленного приглашения>
    }

* указанное приглашение будет удалено


## user_invite_get

зпрос данных приглашения пользователя

    {
     "cm":    "user_invite_get",
     "token": <(string) токен из письма приглашения>
    }

ответ

    {
     "invite_id":  <id приглашения>,
     "ctime":      <(number) время создания приглшения>,
     "comp_id":    <(number) id приглашающей компании>,
     "comp_name":  <(string) название приглашающей компании>,
     "email":      <(string) email>,
     "position":   <(string) указанная в приглашении должность>,
     "phone":      <(string) указанный в приглашении телефон>,
     "last_name":  <(string) указанная в приглашении фамилия>,
     "first_name": <(string) указанное в приглашении имя>,
     "pat_name":   <(string) указанное в приглашении отчество>
    }


## user_invite_sms

Запрос кода на телефон перед принятием преглашения

    {
     "cm":    "user_invite_sms",
     "token": <(string) токен из письма приглашения>,
     "phone": <(string) телефон (может отличаться от указанного при создании приглашения)>
    }

ответ в случае таймаута между отправками

    {
     "cooldown": <(number) кол-во секунд через которое будет возможен повторный запрос>
    }

ответ в случае отправки смс

    {
     "cooldown": <(number) кол-во секунд через которое будет возможен повторный запрос>,
     "phone":    <(string) номер телефона на который было отправлено СМС>
    }

* телефон приглашения заменяется на указанный


## user_invite_accept

принятие приглашения нового пользователя как сотрудника компании

```
{
 "cm":         "user_invite_accept",
 "token":      <(string) токен из письма приглашения>,
 "last_name":  <(string) имя>,
 "first_name": <(string) фамилия>,
 "pat_name":   <(string) отчество>,
 "sms_code":   <(number) код созданный запросом user_invite_sms>,
 "passw":      <(string) пароль>
}
{
 "user_id":    <(number) id пользователя>,
 "comp_id":    <(number) id компании пользователя>
 "sid":        <(string) sid>
}
```

* создается новый пользователь
* пользователь становится сотрудником компании
* производится вход пользователя, выделяется `sid`


## user_position_change

изменение должности

```c++
Запрос.
{
 user_id: int             // у какого пользователя меняется должность.
 position: str            // название должности.
}

Ответ.
{
}

Ошибки.
-1 - системная ошибка.
-2 - не хватает прав.
-3 - user_id из другой компании.
```


## social_facebook_login

вход через facebook

* приложения `https://developers.facebook.com/apps/`
* документация `https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.3#exchangecode`
* client_id=1593971670882893
* redirect_uri=http://cargo.chat/?provider=facebook
* client_secret=<секретно>

```
{
 "cm":   "social_facebook_login",
 "code": <(string) код oauth>
}
{
 "sid":     <(string) sid>,
 "user_id": <(number) id пользователя>,
 "comp_id": <(number) id компании пользователя>
}
```


## social_facebook_bind

привязать аккаунт facebook к своему аккаунту

```
{
 "cm":   "social_facebook_bind",
 "sid":  <(string) sid>,
 "code": <(string) код oauth>
}
{
}
```


## social_facebook_unbind

отвязать аккаунт facebook от своего аккаунта

```
{
 "cm":  "social_facebook_unbind",
 "sid": <(string) sid>
}
{
}
```


## social_linkedin_login

вход пользователя через linkedin

* приложения `https://www.linkedin.com/developer/apps`)
* документация `https://developer.linkedin.com/docs/oauth2`
* client_id=7535z2f08cvusf
* redirect_uri=http://cargo.chat/?provider=linkedin
* client_secret=<секретно>

```
{
 "cm":   "social_linkedin_login",
 "code": <(ыекштп) код oauth>
}
{
 "sid":     <(string) sid>,
 "user_id": <(number) id пользователя>,
 "comp_id": <(number) id компании пользователя>
}
```


## social_linkedin_bind

привязать аккаунт linkedin к своему аккаунту

```
{
 "cm":   "social_linkedin_bind",
 "sid":  <(string) sid>,
 "code": <(string) код oauth>
}
{
}
```

## social_linkedin_unbind

отвязать аккаунт linkedin от своего аккаунта

```
{
 "cm":  "social_linkedin_unbind",
 "sid": <(string) sid>
}
{
}
```


## comp_create2

создание компании (новая версия)

```
{
 "cm":       "comp_create2",
 "sid":      <(string) sid>,
 "inn":      <(string) ИНН>,
 "kpp":      <(string) КПП>,
 "addr":     <(string) Адрес: не форматированная строка>,
 "x":        <(number) долгота>,
 "y":        <(number) широта>,
 "tags":     <(array of strings) список признаков>,
 "phone":    <(string) телефон в любом формате, главное чтобы содержал 11 чисел>,
 "email":    <(string) email>,
 "web_site": <(string) адрес веб сайта>,
 "j_doc":    <(object) объект произвольных данных>
}
{
 "comp_id":  <(number) id созданной компании>
}
```

* будет создана компания
* сочетание `inn`+`kpp`+`addr` должно быть уникальным для нашего списка компаний
* в сервисе `dadata` будет проверено существование компании с сочетанием `inn`+`kpp`+`addr`
* название, ОПФ, ОГРН будет взят из сервиса `dadata`
* `status` компании будет равен `0` (новый)

ошибки

* `-1` - не указан `inn`
* `-3` - не указан `addr`
* `-4` - не уникальное сочетание `inn`+`kpp`+`addr`
* `-5` - не указан `ogrn` (берется из `dadata`)
* `-9` - указаны недопустимые `tags`
* `-10` - неверный формат `phone`
* `-11` - нет прав
* `-100` - ошибка обращения в сервис `dadata`
* `-101` - в сервисе `dadata` не существует сочетания `inn`+`kpp`+`addr`

права

* `10` - Удаление этой компании
* `20` - Удаление пользователей из списка пользователей этой компании
* `30` - Изменение данных этой компании
* `40` - Создание/удаление связей от этой компании
* `50` - Создание/удаление тендеров в этой компании
* `60` - Принять/отклонять заявки на добавление пользователей в компанию
* `70` - Добавление прав пользователям в этой компании
* `1000` - Все возможные права в этой компании
* 



## comp_suggest

```
{
 "cm":    "comp_suggest",
 "query": <(string) ИНН или название компании>,
 "count": <(number) сколько компаний вернуть: [1..20]>
}
{
 "suggestions":[
  "dadata": <(object) объект из сервиса dadata>,
  <дополнительные данные>
 ]
}
```

* В сервисе `dadata` будет запрошена инфа о компаниях
* Для уже имеющихся в нашей БД компаний будут добавлены дополнительные данные



## comp_check

```
{
 "cm":   "comp_check",
 "inn":  <(string) ИНН>,
 "kpp":  <(string) КПП>,
 "addr": <(string) адрес, не форматированная строка>
}
{
 <данные аналогичные запросу {"query":{"comps":{"filters":[["id","eq",<id компании>]],"sub":{"comp_tags":{}}}}}>
}
```

* Если в нашей БД будет компания с такими `inn`+`kpp`+`addr` то сразу вернутся ее данные
* Если в нашей БД не будет компании с такими `inn`+`kpp`+`addr` то:
  * В сервисе `dadata` будет проверено наличие компании с указанными `inn`+`kpp`+`addr`
  * В сервисе `ymaps` будет проведена геолокация `addr`
  * Если в нашей БД этой компании еще нет, то она будет создана
  * Вернутся данные компании

ошибки

* `-1` - не указан `inn`
* `-3` - не указан `addr`
* `-5` - не указан `ogrn` (берется из `dadata`)
* `-100` - ошибка обращения в сервис `dadata`
* `-101` - в сервисе `dadata` не существует сочетания `inn`+`kpp`+`addr`
* `-200` - ошибка геокодирования



## comp_invite_create

приглашение нового пользователя в качестве владельца "новой" компании

```
{
 "cm":"comp_invite_create",
 "sid":<sid>,
 "comp_id":<id компании>,
 "last_name":<фамили>,
 "first_name":<имя>,
 "pat_name":<отчество>,
 "email":<email получателя>,
 "phone":<телефон получателя>
}

{
 "invite_id":<id созданной приглашения>
}
```

* Статус указанной компании должен быть `new`
* На указанный `email` будет отправлено письмо с токеном для получения контроля над компанией

ошибки

* `-1` - не указан `comp_id`
* `-2` - компания не существует
* `-3` - статус компании должен быть `новая`
* `-4` - не указано `ФИО`
* `-5` - не указан `email`
* `-6` - не указан `phone`
* `-7` - `email` занят
* `-10` - нет парв


## comp_invite_get

зпрос данных приглашения владельца компании

```
{
 "cm":"comp_invite_get",
 "token":<токен из письма приглашения>
}

{
 "invite_id":<id приглашения>,
 "ctime":<время создания приглшения>,
 "comp_id":<id компании>,
 "comp_name":<название компании>,
 "email":<мыло>,
 "phone":<телефон>,
 "last_name":<фамилия>,
 "first_name":<имя>,
 "pat_name":<отчество>
}
```


## comp_invite_sms

запрос кода на телефон перед принятием преглашения владельца компании

```
{
 "cm":"user_invite_sms",
 "token":<токен из письма приглашения>,
 "phone":<телефон (может отличаться от указанного при создании приглашения)>
}
```

ответ в случае таймаута между отправками

```
{
 "cooldown":<кол-во секунд через которое будет возможен повторный запрос>
}
```

ответ в случае отправки смс

```
{
 "cooldown":<кол-во секунд через которое будет возможен повторный запрос>,
 "phone":<номер телефона на который было отправлено СМС>
}
```

* телефон приглашения заменяется на указанный


## comp_invite_accept

принять приглашение, стать владельцем компании

```
{
 "cm":         "comp_invite_accept",
 "token":      <(string) токен инвайта>,
 "last_name":  <(string) фамилия>,
 "first_name": <(string) имя>,
 "pat_name":   <(string) отчество>,
 "sms_code":   <(number) код созданный запросом comp_invite_sms>,
 "passw":      <(string) пароль для нового пользователя>
}

{
 "sid":       <(string) id сессии>,
 "user_id":   <(number) id созданного пользователя>,
 "comp_id":   <(number) id компании пользователя>
}
```

* Создается новый пользователь
* Пользователь будет связан с компанией приглашения
* Пользователю будут выданы все права в этой компании
* Если приглашение было создано через `comp_relation_create` то будет создана соответствующая связь

ошибки

* `-1` - не указан `token`
* `-2` - не указан `passw`
* `-3` - `token` недействителен



## comp_logo_delete

Удаление лого своей комании

```
{
 "cm":  "comp_logo_delete",
 "sid": <(string) sid>
}
```



## comp_logo_upsert

Добавление/изменение лого своей компании

```
{
 "cm":  "comp_logo_upsert",
 "sid": <(string) sid>
}
```

* Метод запроса должнен быть `POST`
* Должен быть приаттачен файл `compLogoImage`
* Возможные типы файла: `jpeg`, `gif`, `png`
* Максимальный размер: 2560x1600px, 1MB



## comp_user_move

удаление пользователя из пердыдущей(их) компании(ий) и перемещение в новую компанию

```
{
 "cm":      "comp_user_move",
 "sid":     <(string) sid>,
 "user_id": <(number) id юзера>,
 "comp_id": <(number) id компании назначения>
}
{
}
```

* Пользователь будет удален из всех компаний в которых состоял прежде
* Пользователь будет добавлен в указанную компанию

ошибки

* `-1` - юзер не найден
* `-2` - компания не найдена
* `-3` - нет прав



## comp_state

Состояние компании

```
{
 "cm":      "comp_state",
 "sid":     <(string) sid>,
 "comp_id": <(string) (опция) id компании>,
 "inn":     <(string) (опция) ИНН>
}
```

* нужно указать либо `comp_id` либо `inn`, либо ни то ни другое, тогда вернется своя компания пользователя

```
{
 "id":                  <(number) id компании>,
 "name":                <(string) название>,
 "opf":                 <(string) id организационно правовой формы>,
 "inn":                 <(string) ИНН>,
 "ogrn":                <(string) ОГРН>,
 "kpp":                 <(string) КПП>,
 "taxation":            <(string) система налогообложения>,
 "addr":                <(string) Адрес: не форматированная строка>,
 "x":                   <(number) долгота>,
 "y":                   <(number) широта>,
 "email":               <(string) email>,
 "phone":               <(string) phone>,
 "web_site":            <(string) веб сайт>,
 "work_hours":          <(string) часы работы>,
 "rel_trade_from":      <(string) none|any|request>,
 "rel_trade_to":        <(string) none|any|request>,
 "rel_transport_from":  <(string) none|any|request>,
 "rel_transport_to":    <(string) none|any|request>,
 "hard_tag_trade_from": <(boolean) поставщик товаров>,
 "rel_social":          <(boolean) компания в списке social запрашивающего>,
 "rel_blacklist":       <(boolean) компания в черном списке запрашивающего>,
 "rel_expeditor":       <(boolean) компания является экспедитором запрашивающего>,
 "rel_carrier":         <(boolean) компания является перевозчиком запрашивающего>,
 "rel_shipper":         <(boolean) компания является грузовладельцем запрашивающего>,
 "logo":                <(string) относительный путь к файлу лого>,
 "ymap":                <(object) геообъект yandex>,
 "dadata":              <(object) объект dadata>,
 "tags":                <(array of strings) список признаков>,
 "state":               <(string) new|penging|owned>,
 "info":                <(string) описание>,
 "users":[
  {
   "id":<id пользователя>,
   "first_name":<имя>,
   "last_name":<фамилия>,
   "pat_name":<отчество>,
   "icq":<icq>,
   "j_doc":<объект произвольных данных>
  }, ...
 ],
 "tenders":[
  {
   "id":<id тендера>,
   "ctime":<время создания>,
   "owner_comp_id":<id компании создателя>,
   "name":<Название тендера: не форматированная строка>,
   "stime":<Дата начала приема заявок>,
   "etime":<Дата окончания приема заявок>,
   "organizer":<Организатор тендера: не форматированная строка>,
   "requests":<Требования: не форматированная строка>,
   "contestants":[<Список id компаний-участников>],
   "invites": [  // приглашения отправленные другим компаниям
    {
     "id":<id приглашения>,
     "comp_id":<id приглашенной компании>,
     "state":<состояние приглашения>
    }, ...
   ],
   "requests": [  // ожидающие запросы от других компаний, которые хотят участвовать в этом тендере
    {
     "id":<id запроса>,
     "comp_id":<id компании>
    }, ...
   ],
   "j_doc":<объект произвольных данных>
  }, ...
 ],
 "invites_to_tenders":[  // ожидающие приглашения для этой компании поступившие от других компаний
  {
   "id":<id приглашения>,
   "tender_id":<id тендера>
  }, ...
 ],
 "requests_for_tenders":[  // запросы от этой компании на участие в тендерах других компаний
  {
   "id":<id запроса>,
   "tender_id":<id тендера>,
   "state":<состояние запроса>
  }, ...
 ],
 "j_doc":<объект произвольных данных>
}
```

* длина `inn` для `opf`=`1` равна 12 знаков, для всех остальных - 10 знаков

ошибки

* `-1` - компания не существует



## comp_update

Изменение данных своей компании

```
{
 "cm":                  "comp_update",
 "sid":                 <(string) sid>,
 "name":                <(string) название>,
 "taxation":            <(string) система налогообложения: 'ОС', 'УСН', 'ЕНВД', 'ПСН', 'ЕСХН'>,
 "email":               <(string) email>,
 "phone":               <(string) телефон>,
 "web_site":            <(string) веб сайт>,
 "work_hours":          <(string) часы работы>,
 "rel_trade_from":      <(string) кто может указывать компанию как from в связи trade:     any|request|none>,
 "rel_trade_to":        <(string) кто может указывать компанию как to   в связи trade:     any|request|none>,
 "rel_transport_from":  <(string) кто может указывать компанию как from в связи transport: any|request|none>,
 "rel_transport_to":    <(string) кто может указывать компанию как to   в связи transport: any|request|none>,
 "hard_tag_trade_from": <(boolean) держать тег trade_from включенным всегда: true|false>,
 "info":                <(string) информация о компании>
 "j_doc":               <(object) объект произвольных данных>
}
{
}
```

ошибки

* `-1` - компании не существует
* `-2` - неверные признаки компании
* `-3` - нет прав на изменение
* `-4` - `inn` занят
* `-5` - `ogrn` занят
* `-6` - неверный `opf`
* `-7` - не указан `inn`
* `-8` - не указан `ogrn`
* `-9` - неверная длина `inn`
* `-10` - неверный формат данных (настройки)



## comp_delete

Удаление компании

    {
     "cm":"comp_delete", "sid":<sid>,
     "comp_id":<id компании>
    }

ответ

    {}

* все связи с этой компанией будут удалены
* все пользователи будут исключены из этой компании
* компания будет удалена

ошибки

* `-1` - компании не существует
* `-2` - нет прав на удаление



## comp_relation_create

Создание связи между компаниями

    {
        "cm":"comp_relation_create", "sid":<sid>,
        "relation_type":<тип связи>,
        "comp_from":<id компании>,
        "comp_to":<id компании>,
        "owner_invite":{
            "fio":<ФИО получателя>,
            "email":<email получателя>,
            "phone":<телефон получателя>
        }
    }

* типы `relation_type`

    * `transport` - Купля-продажа транспортных услуг
    * `expedition` - связь между грузовледельцем и экспедиором (создается только компаниями с tag:shipper и указанием своей компании в to)
    * `social` - Социальная связь (для общения)
    * `blacklist` - черный список

* если компания со статусом `new` и создается связь требующая подтверждения, то требуется указать блок `owner_invite` по данным которого будет создано приглашение владельцу компании, а статус компании станет `pending`

ответ в случае создния связи

    {
        "relation_id": <id созданной связи>
    }

ответ в случае приглашения владельца

    {
        "request_id": <id созданного запроса>,
        "invite_id": <id созданного приглашения>
    }

ответ в случае запроса связи

    {
        "request_id": <id созданного запроса>
    }

ошибки

* `-1` - такая связь или запрос создания такой связи уже существует
* `-2` - недопустимый `relation_type`
* `-3` - нет прав
* `-4` - указана(ы) несуществующие компании
* `-5` - создание такой связи запрещено настройками компании(ий)



## comp_relation_delete

Удаление связи между компаниями

    {
     "cm":"comp_relation_delete", "sid":<sid>,
     "relation_id":<id связи>
    }

ответ

    {<пусто>}

* связь `relation_id` будет удалена

ошибки

* `-1` - связи не существует
* `-2` - нет прав для удаления этой связи



## comp_relation_request_delete

удаление запроса на создание связи (доступно только для создавшей компании)

    {
     "cm":"comp_relation_request_accept",
     "sid":<sid>,
     "request_id":<id принимаемого запроса>
    }

ответ

    {
     "accepted_request_id":<id принятого запроса>
    }


## comp_relation_request_accept

принятие запроса на создание связи (доступно только для запрашиваемой компании)

    {
     "cm":"comp_relation_request_accept",
     "sid":<sid>,
     "request_id":<id принимаемого запроса>
    }

ответ

    {
     "accepted_request_id":<id принятого запроса>,
     "relation_id":<id созданной связи>
    }



## comp_relation_request_refuse

отклонение запроса на создание связи (доступно только для запрашиваемой компании)

    {
     "cm":"comp_relation_request_accept",
     "sid":<sid>,
     "request_id":<id отклоняемого запроса>
    }

ответ

    {
     "refused_request_id":<id принятого запроса>
    }



## comp_user_delete

удаление пользователя из компании

    {
     "cm":"comp_user_delete", "sid":<sid>,
     "comp_id":<id компании>,
     "user_id":<id пользователя>
    }

ответ

    {}

* пользователь `user_id` будет исключен из списка юзеров компании `comp_id`

ошибки

* `-1` - не существует такого юзера в такой компании
* `-2` - нет прав



## comp_user_perm_change

добавить или удалить право пользователя в компании

    {
     "cm":"comp_user_perm_change", "sid":<sid>,
     "user_id":<id юзера>,
     "perm_flags":<флаги прав>
    }

* У выполняющего запрос пользователя должно быть право "менять права" в компании в которой находится указанный `user_id`



## comp_rel_summary

количество связанных компаний

    {
     "cm":"comp_rel_summary",
     "sid":<sid>,
     "comp_id":<id компании>,
     "types":[<список типов на выбор carriers|expeditors|shippers|social|blacklist>]
    }

в ответе будут указны толкьо запрошенные типы

    {
     <тип>:<кол-во связаных компаний>,
     ...
    }

* типы `social` и `blacklist` доступны только самой компании



## vehicle_manage

Добавление/изменение/удаление ТС

```
{
 "cm":         "vehicle_manage",
 "sid":        <(string) sid>,
 "action":     <(string) действие: create|update|delete>,
 "vehicle_id": <(number) id ТС>,
 "model":      <(string) марка>,
 "num":        <(string) госномер>,
 "type":       <(string) тип truck|lorry|trailer|semitrailer (ТС считается только truck и lorry)>,
 "sts":        <(string) token файла СТС>,
 "pts":        <(string) token файла ПТС>
}
{
 "vehicle_id": <(number) id затронутого ТС>
}
```

* варианты поля `action`:
  * `create` - создание нового ТС
    * обязательны все поля кроме `vehicle_id`
  * `update` - изменение существующего ТС
    * поле `vehicle_id` обязательно
    * останые поля не обязательны
    * неуказанные поля не будут изменены
    * изменять можно только созданные своей компанией ТС
  * `delete` - удаление существующего ТС
    * поле `vehicle_id` обязательно
    * остальные поля будут проигнорированы
    * удалить можно только созданные своей компанией ТС



## roadtrain_manage

Добавление/изменение/удаление автопоезда

```
{
 "cm":               "roadtrain_manage",
 "sid":              <(string) sid>,
 "action":           <(string) действие: create|update|delete>,
 "roadtrain_id":     <(number) id автопоезда>,
 "responsible_id":   <(number) id ответсвенного>,
 "driver_id":        <(number) id водителя>,
 "vehicle_main_id":  <(string) id основного ТС>,
 "vehicle_add_id":   <(string) id дополнительного ТС>
}
{
 "roadtrain_id":     <(number) id затронутого автопоезда>
}
```

* варианты поля `action`:
  * `create` - создание нового автопоезда
    * обязательны все поля кроме `roadtrain_id`
  * `update` - изменение существующего автопоезда
    * поле `roadtrain_id` обязательно
    * останые поля не обязательны
    * неуказанные поля не будут изменены
    * изменять можно только созданные своей компанией автопоезда
  * `delete` - удаление существующего ТС
    * поле `roadtrain_id` обязательно
    * остальные поля будут проигнорированы
    * удалить можно только созданные своей компанией автопоезда
* водитель дожен иметь роль `driver`



## price_request_bet_create

Создание "ставки" в "запросе ставок"

    {
     "cm":"price_request_bet_create",
     "sid":<sid>,
     "price_request_id":<id запроса ставок>,
     "bet":<значение ставки (float)>,
     "flags":<флаги ставки>
    }

ответ

    {
     "created_price_request_bet_id":<id созданной ставки>
    }

### price_request_bet_flags

* `1` - с НДС (иначе без НДС)

## price_request_bookmark_create

Создание закладки "запроса ставок"

    {
     "cm":"price_request_bookmark_create",
     "sid":<sid>,.
     "price_request_id":<id запроса ставок>
    }

ответ

    {
     "created_price_request_bookmark_id":<id созданной закладки>
    }

## price_request_bookmark_delete

Удаление закладки "запроса ставок"

    {
     "cm":"price_request_bookmark_delete",
     "sid":<sid>,.
     "price_request_id":<id запроса ставок>
    }

ответ

    {
     "deleted_price_request_bookmark_id":<id запроса ставок закладка на которй была удалена>
    }

## price_request_create

Создание запроса ставки

    {
     "cm":"price_request_create", "sid":<sid>,
     "shipment_time":<Ориентировочные даты отгрузки (в свободной форме)>,
     "from_addr":<откуда (текст)>,
     "from_x":<широта>,
     "from_y":<долгота>,
     "to_addr":<куда (текст)>,
     "to_x":<гирота>,
     "to_y":<долгота>,
     "cargo_name":<Наименование груза>,
     "volume":<объем>,
     "mass":<масса>,
     "unit":<Единица измерения>,
     "note":<Заметка>,
     "flags":<флаги>
    }
    
ответ

    {
     "created_price_request_id":<id созданного запроса>
    }

### price_request_flags

* `1` - только для перевозчиков моей компании (иначе для всех перевозчиков) (шаринговый флаг)

## price_request_delete

Удаление запроса ставки

    {
     "cm":"price_request_delete", "sid":<sid>,
     "price_request_id":<id удаляемого запроса>
    }
    
ответ

    {
     "deleted_price_request_id":<id удаленного запроса>
    }


## price_request_received_delete

Удление полученного запроса ставки

    {
     "cm":"price_request_received_delete", "sid":<sid>,
     "price_request_id":<id удаляемого запроса>
    }

ответ

    {
     "deleted_price_request_received_id":<id удаленного запроса>
    }


## tender_create

Создание тендера (временно отключено)

    {
     "cm":"tender_create", "sid":<sid>,
     "comp_id":<id компании>,
     "name":<Название тендера: не форматированная строка>,
     "stime":<Дата начала приема заявок>,
     "etime":<Дата окончания приема заявок>,
     "organizer":<Организатор тендера: не форматированная строка>,
     "requests":<Требования: не форматированная строка>,
     "j_doc":<объект произвольных данных>
    }

формат дат `YYYY-MM-DD[ HH:MM:SS]`, примеры: `2015-06-25`, `2015-06-28 10:00:00`

ответ

    {"tender_id":<id созданного тендера>}

ошибки

* `-1` - компании не существует
* `-2` - нет прав

## tender_update

Изменение тендера

    {
     "cm":"tender_update", "sid":<sid>,
     "tender_id":<id тендера>,
     "name":<Название тендера: не форматированная строка>,
     "stime":<Дата начала приема заявок>,
     "etime":<Дата окончания приема заявок>,
     "organizer":<Организатор тендера: не форматированная строка>,
     "requests":<Требования: не форматированная строка>,
     "j_doc":<объект произвольных данных>
    }

ответ

    {}

ошибки

* `-1` - тендера не существует
* `-2` - нет прав

## tender_delete

Удаление тендера

    {
     "cm":"tender_delete", "sid":<sid>,
     "tender_id":<id тендера>
    }

ответ

    {}

ошибки

* `-1` - тендера не существует
* `-2` - нет прав

## tender_invite_create

Приглашения в тендер

    {
     "cm":"tender_invite_create", "sid":<sid>,
     "tender_id":<id тендера>,
     "comps":[<список id приглашаемых компаний>]
    }

* У указанных компаний будут созданы приглашения
* Может быть выполнено пользователем с правами "управления тендерами" компании-создателя указанного тендера
* Указанные но несуществующие компании будут проигнорированы
* Указанные и уже приглашенные в этот тендер компании будут проигнорированы

ответ

    {"invites_created":[
      {"id":<id приглашения>, "comp_id":<id приглашенной компании>},
      ...
    ]}

ошибки

* `-1` - тендера не существует
* `-2` - нет прав

## tender_invite_delete

Удаление приглашений на участие в тендере

    {
     "cm":"tender_invite_delete", "sid":<sid>,
     "invites":[<список id приглашений>]
    }

* Указанные приглашения будут удалены
* Пользователь должен иметь право "управления тендерами" в компаниях-создателях тендеров
* Указанные но несуществующие приглашения будут проигнорированы
* Приглашения для удаления которых у пользователя нет прав будут проигнорированы

ответ

    {"invites_deleted":[<список id удаленных приглашений>]}

## tender_invite_accept

Принятие приглашения в тендер (положительный ответ на приглашение)

    {
     "cm":"tender_invite_accept", "sid":<sid>,
     "invites":[<список id приглашений>]
    }

* Статусы указанных приглашений должны быть "ожидает"
* Статусы указанных приглашений будут изменены на "принят"
* У пользователя должно быть право "управления тендерами" в соответствующих приглашаемых компаниях
* Приглашаемые компании добавятся в списки участников соответствующих тендеров
* Успешно принятые приглашения будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"invites_accepted":[<список id принятых приглашений>]}

## tender_invite_refuse

Отклонение приглашения на участие в тендере(отрицательный ответ на приглашение)

    {
     "cm":"tender_invite_refuse", "sid":<sid>,
     "invites":[<список id приглашений>]
    }

* Статусы указанных приглашений должны быть "ожидает"
* Статусы указанных приглашений будут изменены на "отклонен"
* У пользователя должно быть право "управления тендерами" в соответствующих приглашаемых компаниях
* Успешно отклоненные приглашения будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"invites_refused":[<список id отклоненных приглашений>]}

## tender_join_request_create

Запрос на участие в тендере

    {
     "cm":"tender_join_request_create", "sid":<sid>,
     "comp_id":<id запрашивающей компании>,
     "tenders":[<список id тендеров>]
    }

* В компаниях-создателях указанных тендеров создаются запросы на участие
* У пользователя должно быть право "управления тендерами" в запрашивающей компании
* Указанные тендеры не могут быть созданными указанной компанией
* Успешно созданные запросы будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"tender_join_requests_created":[
      {"id":<id запроса>, "tender_id":<id тендера>},
      ...
    ]}

## tender_join_request_delete

Удаление запроса на участие в тендере

    {
     "cm":"tender_join_request_delete", "sid":<sid>,
     "requests":[<список id удаляемых запросов>]
    }

* Указанные запросы будут удалены
* У пользователя должно быть право "управления тендерами" в компаниях-создателях этих запросов
* Успешно созданные запросы будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"tender_join_requests_deleted":[<список id удаленных запросов>]}

## tender_join_request_accept

Одобрение запроса на участие в тендере (положительный ответ на запрос)

    {
     "cm":"tender_join_request_accept", "sid":<sid>,
     "requests":[<список id одобряемых запросов>]
    }

* Статусы указанных запросов должны быть "ожидает"
* Статусы указанных запросов будут измены на "принят"
* У пользователя должно быть право "управления тендерами" в компаниях-создателях тендеров
* Успешно принятые запросы будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"tender_join_requests_accepted":[<список id одобренных запросов>]}



## tender_join_request_refuse

Отклонение запроса на участие в тендере(отрицательный ответ на запрос)

    {
     "cm":"tender_join_request_refuse", "sid":<sid>,
     "requests":[<список id отклоняемых запросов>]
    }

* Статусы указанных запросов должны быть "ожидает"
* Статусы указанных запросов будут измены на "отклонен"
* У пользователя должно быть право "управления тендерами" в компаниях-создателях тендеров
* Успешно отклоненные запросы будут возвращены в ответе, а ошибки проигнорированы

ответ

    {"tender_join_requests_refused":[<список id отклоненных запросов>]}



## ping

запрос

    {
     "cm":"ping"
    }

ответ

    {
     "pong":1,
     "time":<текущее время>
    }



## dadata

Использование сервиса "dadata"

(документация `https://confluence.hflabs.ru/display/SGTDOC156/API`)

    {
     "cm":"dadata",у
     "type":"<тип запроса>",
     "data":<данные запроса (формат зависит от типа)>
    }

* Будет выполнен запрос к сервису dadata с использованием спец. аккаунта

Варианты `type`:

* `clean/(address|phone|passport|name|email|birthdate|vehicle)` - стандартизатор

    * `data` - строка
    * см документацию `https://dadata.ru/api/clean/`

* `suggest/party` - подсказчик

    * `data` - объект `{"query":"<название организации или ИНН>"}`
    * см документацию `https://confluence.hflabs.ru/pages/viewpage.action?pageId=304185404`

ответ

    {
      "dadata":<объект полученный от dadata>
    }

ошибки

* `-801` - неверный `type`
* `-802` - не указана `data`
* `-803` - ошибка обращения к сервису dadata
* `-804` - сервису dadata вернул не json объект

пример стандартизации адреса

    {
     "cm":"dadata",
     "type":"clean/address",
     "data":["москва 3-я парковая 25"]
    }
    
    {"dadata":[
     {
      "source":"москва 3-я парковая 25",
      "result":"Россия, г Москва, ул Парковая 3-я, д 25",
      "postal_code":"105037",
      "country":"Россия",
      ... <много прочих данных>
     }
    ]}

пример поиска данных компании (по названию или ИНН)

    {
     "cm":"dadata",
     "type":"suggest/party",
     "data":{
       "query":"сбербанк",
       "count":1
     }
    }
    
    {"dadata":{
        "suggestions": [
            {
                "value": "ОАО Сбербанк России",
                "data": {
                    "kpp": "775001001",
                    "opf": { "code": "12247", "full": "Открытое акционерное общество", "short": "ОАО"},
                    "inn": "7707083893",
                    "ogrn": "1027700132195",
                    "okpo": null,
                    "okved": null,
                    "address": {"value": "г Москва, ул Вавилова, д 19", "unrestricted_value": "г Москва, ул Вавилова, д 19"}
                }
            }
        ]
    }}



## temp_file_create

Загрузка временного файла

    {
     "cm":"temp_file_create",
     "sid":<sid>
    }

* Метод запроса должнен быть `POST`
* Должен быть приаттачен файл `TempFile`
* Возможные типы файла: без ограничений

ответ

    {
     "token":<token файла>
    }

* полученный `token` может быть использован:
  * в других запросах в качестве параметра (например в качетсве прикрепленного документа)
  * для загрузки на клиент через веб cервис `/file/token`



## lead_reg

Регистрация "лида"

```
{
 "cm":      "lead_reg",
 "email":   <(string) мыло>,
 "phone":   <(string) телефон (11 цифр)>,
 "name":    <(string) имя>,
 "comp_id": <(number) id компании>,
 "flags":   <(number) 0x01 - экспедитор, 0x02 - перевозчик, 0x04 - грузовладелец>
}
{
 "lead_id": <(number) сериный номер лида>
}
```



## msg_private_send

Отправка личного сообщения

```
{
 "cm":         "msg_private_send",
 "sid":        <(numbr) sid>,
 "user_id":    <(number) id собеседника>,
 "body":       <(string) тест сообщения>
}
{
 "message_id": <(number) id созданного сообщения>
}
```


## msg_private_readed

Отметка личных сообщений как прочитанных

```
{
 "cm":         "msg_private_readed",
 "sid":        <(string) sid>,
 "user_id":    <(number) id пользователя-собеседника>,
 "message_id": <(number) id последнего прочитанного сообщения (null - прочитанных нет)>
}
{
 "user_id":  <(number) id собеседника>
 "unreaded": <(number) всего непрочитанных>
 "lrm_id":   <(number) id последнего непрочитанного сообщения>
}
```

* сообщение `message_id` и все предыдущие будет считаться прочитанными



## msg_channel_create

Создание канала

    {
     "cm":    "msg_channel_create",
     "sid":   <(string) sid>,
     "type":  <(string) тип канала: group|channel>
     "title": <название канала>
    }

ответ

    {
     "created_channel_id": <(number) id созданного канала>
    }



## msg_channel_delete

Удаление канала

    {
     "cm":         "msg_channel_delete",
     "sid":        <(string) sid>,
     "channel_id": <(number) id канала>
    }

ответ

    {
     "deleted_channel_id": <(number) id созданного канала>
    }



## msg_channel_invite

приглашение пользователя в канал

    {
     "cm":         "msg_channel_invite",
     "sid":        <(string) sid>,
     "channel_id": <(number) id канала>,
     "user_id":    <(number) id пользователя>
    }

* Пользователь будет добавлен в список пользователей канала
* В флагах пользователя будет взведен флаг `приглашен`
* Для получения доступа к каналу пользователь должен погасить флаг `приглашен` (см [msg_channel_join](#msg_channel_join))
* Приглашенный пользователь может выйти из канала



## msg_channel_join

* Вход в канал
* Принятие приглашения в в канал (снятие флага `приглашен`)

```
{
 "cm":         "msg_channel_join",
 "sid":        <(string) sid>,
 "channel_id": <(number) id канала>
}
```

* Вход в каналы (`type`=`channel`) свободный и по приглашениям (см [msg_channel_invite](#msg_channel_invite))
* Вход в группы (`type`=`group`) только по приглашениям (см [msg_channel_invite](#msg_channel_invite))
* В случае свободного входа:
  * Пользователь будет добавлен в список участников канала
  * Пользователь получит доступ с истории, добавлению сообщений и прочим функциям этого канала
  * Другим участникам канала будет разослано сообщение о изменении состояния этого пользователя
* В случае входа по приглашению:
  * Флаг `приглашен` у пользователя в этом канале будет погашен
  * Пользователь получит доступ с истории, добавлению сообщений и прочим функциям этого канала
  * Другим участникам канала будет разослано сообщение о изменении состояния этого пользователя



## msg_channel_leave

Выход из канала

    {
     "cm":         "msg_channel_leave",
     "sid":        <(string) sid>,
     "channel_id": <(number) id канала>
    }



## msg_channel_users

список пользователей в канале

    {
     "cm":         "msg_channel_users",
     "sid":        <(string) sid>,
     "channel_id": <(number) id канала>
    }

ответ

    {
     "users":[
      {
       "user_id":    <(number) id пользователя>,
       "first_name": <(string) имя автора>,
       "last_name":  <(string) фамилия автора>,
       "comp_id":    <(number) id компании автора>,
       "comp_name":  <(string) название компании автора>,
       "flags":      <(number) флаги этого пользователя в этом канале (msg_channel_user_flags)>
      }, ...
     ]
    }



## msg_channel_send

сообщение в канал

```
{
 "cm":         "msg_channel_send",
 "sid":        <(string) sid>,
 "channel_id": <(number) id канала>,
 "body":       <(string) тест сообщения>
}
{
 "message_id": <(number) id добавленного сообщения>
}
```



## msg_channel_erase

* стирание сообщения из канала
* сообщение должно быть наипсано собой
* сообщение должно быть не сарше 10 минут
* при стирании `body` сообщения становился `null`

```
{
 "cm":         "msg_channel_erase",
 "sid":        <(string) sid>,
 "channel_id": <(number) id канала>,
 "message_id": <(number) id сообщения>
}
{
 "erased_message_id": <(number) id удаленного сообщения>
}
```



## msg_channel_correct

* измененеие сообщения в канале
* изменять можно сообщения не старше 10 минут

```
{
 "cm":         "msg_channel_correct",
 "sid":        <(string) sid>,
 "channel_id": <(number) id канала>,
 "message_id": <(number) id сообщения>,
 "body":       <(string) измененное сообщение>
}
 {
 "corrected_message_id": <(number) id измененного сообщения>
}
```



## lplace_manage

* Создание/изменение/удаление места погрузки

```
{
 "cm":        "lplace_manage",
 "sid":       <(string) sid>,
 "action":    <(string) действие create|update|delete>
 "lplace_id": <(number) id места погрузки>,
 "flags":     <(number) флаги (см lplace_flags)>,
 "name":      <(string) название>,
 "addr":      <(string) адрес>,
 "x":         <(number) долгота>,
 "y":         <(number) широта>
}
{
 "lplace_id":  <(number) id затронутого места погрузки>,
 "channel_id": <(number) (опция) id созданного канала>
}
```

* варианты поля `action`
  * `create` - создание места погрузки
    * обязательны все поля кроме `lplace_id`
    * доступно только `грузовладельцам`
    * будет создан канал `channel_id`
  * `update` - изменение данных места погрузки
    * обязательное поле `lplace_id`
    * остальные поля не обязательны
    * изменены будут только переданные поле поля
    * доступно только создателям
  * `delete` - удаление места погрузки
    * обязательное поле `lplace_id`
    * доступно только создателям



### lplace_flags

* Флаги мета погрузки:
  * `0x0001` - экспедиторам разрешено размещать заказы от лица грузовладельца



## order_manage

* Создание/изменение/удаление заказа

```
{
 "cm":        "order_manage",
 "sid":       <(string) sid>,
 "action":    <(string) действие create|delete|update|template>,
 "tname":     <(string) название шаблона>,
 "order_id":  <(number) id заказа>,
 "shipper":   <(number) id компании грузовладельца>,
 "cargo":     <(string) наименование груза>,
 "lplace_id": <(number) id места погрузки>,
 "ltype":     <(string) тип загрузки/погрузки: back|side|top>,
 "mass":      <(number) масса>,
 "vol":       <(number) объем>,
 "vtype":     <(string) требуемый тип ТС: tent|refrigerator|thermos|container|tank>,
 "ltime":     <(number) дата отгрузки>,
 "utime":     <(number) дата доставки>,
 "receiver":  <(string) получатель>,
 "addr":      <(string) адрес места доставки>,
 "x":         <(number) долгота места доставки>,
 "y":         <(number) широта места доставки>,
 "note":      <(string) примечание>,
 "expeditor": <(number) id назначенной компании экспедитора>
}
{
 "order_id":  <(number) id затронутого заказа>
}
```

* варианты поля `action`
  * `create` - создание заказа
    * обязательны все поля кроме `order_id`, `tname`, `note`
    * доступно создателю указанного места погрузки
    * доступно экспедитору создателя, если это разрешено в указанном месте погрузки
  * `delete` - удаление заказа
    * поле `order_id` обязательно
    * доступно только создателям заказов
  * `update` - обновление заказа или шаблона
    * поле `order_id` обязательно
    * остальные поля опицональны
    * обновлены будут только указанные поля
    * доступно только создателям заказа или шаблона
  * `template` - создание шаблона заказа
    * поле `tname` обязательно
    * остальные поля опциональны
    * доступно всем



## order_state_flow

изменение состояния заказа

```
{
 "cm":       "order_flow",
 "sid":      <(string) sid>,
 "order_id": <(number) id заказа>,
 "state":    <(string) новое состояние заказа>,
 "time":     <(number) (опция) время изменения состояния (по умолчанию будет взято текущее время) (только если state=shipping|done)>,
 "reason":   <(string) причина отмены (требуется если state=canceled)>
}
{
 "order_id": <(number) id затронутого заказа>
}
```

* права на смену состояний имеют:
  * `created` -> `opened`: создатель
  * `opened` -> `created`: создатель
  * `closed` -> `canceled`: создатель, экспедитор, перевозчик
  * `closed` -> `shipping`: экспедитор, перевозчик
  * `shipping` -> `done`: экспедитор, перевозчик



## order_state_close

* закрытие заказа без торгов
* доступно только `экспедитору` заказа
* текущий `state` должен быть `created`|`opened`
* новый `state` станет `closed`

```
{
 "cm":       "order_state_close",
 "sid":      <(string) sid>,
 "order_id": <(number) id заказа>,
 "vehicle":  <(string) данные ТС>,
 "trailer":  <(string) данные прицепа (опция)>,
 "dfio":     <(string) ФИО водителя>,
 "ddoc":     <(string) документы водителя>,
 "price":    <(number) сумма сделки (опция)>
}
{
 "order_id": <(number) id измененного заказа>
}
```



## order_offer_create

создать предложение на заказ

```
{
 "cm":           "order_offer_create",
 "sid":          <(string) sid>,
 "order_id":     <(number) id заказа>,
 "roadtrain_id": <(number) id автопоезда>,
 "price":        <(number) цена>
}
{
 "offer_id":   <(number) id созданного предложения>
}
```



## order_offer_bid

указание цены в предложении заказа

```
{
 "cm":         "order_offer_bid",
 "sid":        <(string) sid>,
 "offer_id":   <(number) id предложения>,
 "price":      <(number) цена>
}
{
 "offer_id":   <(number) id предложения>
}
```

* доступно только `экспедитору` и `перевозчику` которые участвуют в этом предложении
* когда цены станут равны, заказ перейдет в стсояние `closed`



## order_memo

заметка в заказе

```
{
 "cm":         "order_memo",
 "sid":        <(string) sid>,
 "order_id":   <(number) id заказа>,
 "memo":       <(number) заметка>
}
{
 "memo_id":    <(number) id заметки>
}
```

* доступна только грузовладельцу, перевозчику и экспедитору участвующим в этом заказе
* заметки друг друга никто видить не может



## order_export

deprecated (будет реализовано на стороне клента)

экспорт заказа

```
{
 "cm":         "order_export",
 "sid":        <(string) sid>,
 "order_id":   <(number) id заказа>
}
{
}
```

* в случае успеха в приложении к ответу будет выдан файл `order<id>.xlsx` содержащий данные заказа



## order_import

deprecated (будет реализовано на стороне клента)

импорт заказа

```
{
 "cm":  "order_import",
 "sid": <(string) sid>
}
```

* Метод запроса должнен быть `POST`
* Должен быть приаттачен файл `orderXLSX`



## order_archive

архивация заказа

```
{
 "cm":         "order_archive",
 "sid":        <(string) sid>,
 "order_id":   <(number) id заказа>
}
{
 "archive_id": <(number) id архива>
}
```

* достуно только когда заказ в состоянии `done`
* доступна только грузовладельцу, перевозчику и экспедитору участвующим в этом заказе



## msg_channel_readed

Отметка сообщений в канале как прочитанные

```
 {
 "cm":          "msg_channel_readed",
 "sid":         <(string) sid>,
 "channel_id":  <(number) id канала>,
 "message_id":  <(number) id последнего прочитанного сообщения (null - прочитанных нет)>
}
{
 "channel_id":  <(number) id канала>
 "unreaded":    <(number) всего непрочитанных>
 "lrm_id":      <(number) последнее непрочитанное>
}
```



## events

depreated

Запрос событий

    {
     "cm":"events",
     "sid":<sid>,
     "delay":<сколько секунд ждать до того как появится хотя бы одно событие: 0 - не ждать, максимум 30>,
     "version":<текущая версия событий у клиента>
    }

ответ

    {
     "events":[
      <список событий между версиями клиента>
     ],
     "version":<последняя версия клиента>
    }

* события хранятся `5 минут` после чего удаляются



### event__msg_private_new

Событие получения нового ЛС

```
 {
 "type":       "msg_private_new",
 "id":         <(number) id сообщения>,
 "ts":         <(number) вемя написания>,
 "user_id":    <(number) id пользователя-автора>,
 "first_name": <(string) имя автора>,
 "last_name":  <(string) фамилия автора>,
 "comp_id":    <(number) id компании автора>,
 "comp_name":  <(string) название компании автора>,
 "to_user_id": <(number) id пользователя-получателя>,
 "body":       <(string) текст>,
 "received":   <(number) сколько раз это событие уже было получено прежде>
}
```

* поля `first_name`, `last_name`, `comp_id` и `comp_name` будут только в случае первого сообщения в только что созданный дилог



### event__msg_private_unreaded

Событие изменения непрочитанных ЛС

```
{
 "type":     "msg_private_unreaded",
 "user_id":  <(number) id собеседника>,
 "unreaded": <(number) новое кол-во непрочитанных ЛС>,
 "lrm_id":   <(number) id последнего прочитанного сообщения (null - прочитанных нет)>
}
```


### event__msg_private_interlocutor_lrm

Событие изменения последнего прочитанного сообщения собеседником в привате

    {
     "type":"msg_private_interlocutor_lrm",
     "user_id":<id собеседника>,
     "interlocutor_lrm_id":<id последнего прочитанного сообщения (null - прочитанных нет)>,
     "interlocutor_lrm_ts":<utc_ts прочтения собеседником последнего прочитанного сообщения>
    }



### event__msg_channel_invite

событие приглашения в канал: рассылается пользователям приглашенным в канал

  * Приглашенный пользователь добавляется в канал с флагом `приглашен`
  * Пользователям находящимся в канале рассылается событие изменения пользователя `msg_channel_user_upsert`

Событие

```
{
 "type":       "msg_channel_invite",
 "channel_id": <(number) id канала>,
 "title":      <(string) название канала>,
 "ctype":      <(string) тип канала channel|group>
 "flags":      <(number) флаги самого пользователя в этом канале>,
 "users":      <(number) кол-во пользователей в канале>
}
```


### event__msg_channel_user_upsert

Событие изменения пользователя в канале: рассылается участникам канала в случаях:

  * В этом канале не было пользователя, и он добавился в этот канал
  * В этом канале был пользователь и его состояние изменилось

Событие

    {
     "type":"msg_channel_user_upsert",
     "channel_id": <id канала>,
     "user_id":<id пользователя>,
     "first_name":<имя>,
     "last_name":<фамилия>,
     "comp_id":<id компании>,
     "comp_name":<название компании>,
     "flags":<флаги пользователя в этом канале>
    }



### event__msg_channel_user_leave

Событие ухода пользователя из канала рассылается участникам этого канала

    {
     "type":"msg_channel_user_leave",
     "channel_id": <id канала>,
     "user_id":<id пользователя>
    }



### event__msg_channel_deleted

Событие удаления канала

    {
     "type":"msg_channel_deleted",
     "channel_id": <id канала>
    }



### event__msg_channel_new

Событие нового сообщения в канал

    {
     "type":"msg_channel_new",
     "id": <id сообщения>,
     "channel_id": <id канала>,
     "ts": <utc_ts написания>,
     "user_id": <id автора>,
     "first_name":<имя автора>,
     "last_name":<фамилия автора>,
     "comp_id":<id компании автора>,
     "comp_name":<название компании автора>,
     "body": <текст>
    }



### event__msg_channel_unreaded

Событие изменения непрочитанных сообщений в канале (не готово)

    {
     "type":"msg_channel_unreaded",
     "channel_id": <id канала>,
     "unreaded":<новое кол-во непрочитанных сообщений в канале>,
     "lrm_id":<id последнего прочитанного сообщения (если ничего не прочитано то NULL)>
    }



### events__msg_channel_erase

Событие удаления сообщения в канале

    {
     "type":"msg_channel_erase",
     "channel_id": <id канала>,
     "id":<id удаленного сообщения>
    }



### events__msg_channel_correct

Событие изменения сообщения в канале

    {
     "type":"msg_channel_correct",
     "channel_id": <id канала>,
     "id":<id измененного сообщения>,
     "body":<измененное сообщение>
    }



### event__msg_channel_orders

* изменилось количество открытых заказов

```
{
 "type":       "msg_channel_orders",
 "channel_id": <(number) id канала>,
 "orders":     <(number) количество открытых заказов>,
}
```



### event__order_flow

соыбытие изменения состояния заказа

```
{
 "type":      "order_flow",
 "order_id":  <(number) id заказа>,
 "state":     <(string) новое состояние>
}
```

* рассылается:
  * при создании: пользователям компании-создателя заказа
  * при изменении: пользователям компании-создателя заказа
  * при удалении: пользователям компании-создателя заказа
  * при размещении: всем
  * при снятии: всем
  * при закрытии: всем



### event__order_offer_flow

```
{
 "type":      "order_offer_flow",
 "order_id":  <(number) id заказа>,
 "offer_id":  <(number) id предложения>
}
```

* рассылается:
  * при создании: создателю заказа, назанчаенному экспедитору заказа, создателю предложения
  * при изменении цен: создателю заказа, назанчаенному экспедитору заказа, создателю предложения



## Lists

Списки

Общие параметры для всех списков:

* `orderBy` (string) поле сортировки (умлочание `id`)
* `dir` (string) направление сортировки `ASC` или `DESC` (умолчание `ASC`)
* `offset` (number) сколько записей пропустить от начала совпадений (умолчание `0`)
* `limit` (number) склько записей включить в ответ после `offset`, от `1` до `500` (умолчание `50`)
* `filters` (array) список фильтров, где фильтр `{"col":<поле>,"val":<значение>, "op":<операция>}`
    * `col` (string) поле фильтрации
    * `val` (string|number) значение для операции фильтрации
    * `op` (string) операция фильтрации
        * `eq` равенство
        * `lt` менее чем
        * `gt` более чем
    * для строковых полей выполняется операция вхождения `val`
    * примеры:
        * `[{"col":"name","val":"тэц"}]` name содержит "тэц"
        * `[{"col":"x","op":"gt":"val":"60.5"}]` x > 60.5
        * `[{"col":"y","op":"lt":"val":"67.2"}]` y < 67.2
        * `[{"col":"name","val":"тэц"},{"col":"x","op":"lt":"val":"50"},{"col":"y","op":"gt":"val":"60"}]` name содержит "тэц", x < 50, y > 60
* `fields` (array of strings) список возвращаемых полей

Общий формат ответа списков:

```
{
 "total": <(number) кол-во записей удовлетворяющих условиям запроса>,
 "data":  <(array of objects) список записей согласно порядку и ограничениям запроса>
}
```


### comps_list

список компаний

```
{
 "cm":  "comps_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id компании
  * `name` (string) название компании
  * `inn` (string) ИНН
  * `ogrn` (string) ОГРН
  * `kpp` (string) КПП
  * `addr` (string) адрес
  * `x` (number) долгота
  * `y` (number) широта

* пример запроса

```
{
 "cm":      "comps_list",
 "sid":     "...",
 "orderBy": "name",
 "dir":     "ASC",
 "offset":  10,
 "limit":   3,
 "filters": [
  {"col":"name","val":"тэц"}
 ],
 "fields": ["id", "name", "inn", "x", "y"]
}
```

* пояснение запроса:
  * запрос компаний содержащих в названии `"тэц"`
  * отсортированные по названию в порядке убвывания
  * первые `10` шт пропустить
  * в ответе вернуть `3` шт

* пример ответа

```
{
 "total":100,
 "data":[
  {"id":1202137, "name":"Архангельская ТЭЦ", "inn":null, "x":37.618174, "y":55.754998},
  {"id":1209275, "name":"Кировская ТЭЦ-4", "inn":null, "x":37.782153, "y":55.793181},
  {"id":1213950, "name":"Кировская ТЭЦ-5", "inn":null, "x":37.782153, "y":55.793181}
 ]
}
```

* пояснение ответа:
  * всего было найдено `100` компаний удовлетворяющих условиям запроса
  * `3` шт начиная с `10`-ой содержатся в списке `data`



### tenders_list

список тендеров

    {"cm":"tenders_list", "sid":<sid>, <... параметры списка>}

* поля
  * `id`
  * `owner_comp_id`
  * `name`
  * `ctime`
  * `stime`
  * `etime`
  * `organizer`
  * `requests`
  * `j_doc`



### price_requests_list

cписок `запросов ставок`

```
{
 "cm":   "price_requests_list",
 "sid":  <(string) sid>,
 "type": <(string) regular|received|bookmarks>,
 <... параметры списка>
}
```

* `type`:
  * `regular` все доступные запосы
  * `received` только полученные моей компанией
  * `bookmarks` только те что в закладках
* учитываются флаги [price_request_flags](#price_request_flags)
* запрашивающая компания может видеть свои же запросы без учета флагов [price_request_flags](#price_request_flags)
* поля
  * `price_request_id` (number) id запроса
  * `ctime` (number) время создания запроса
  * `comp_id` (number) id компании создателя запроса
  * `inn` (string) ИНН компании создателя
  * `name` (string) название компании создателя
  * `addr` (string) адрес компании создателя
  * `shipment_time` (string) приверное время
  * `from_addr` (string) адрес отгрузки
  * `from_x` (number) долгота
  * `from_y` (number) широта
  * `to_addr` (string) адрес доставки
  * `to_x` (number) долгота
  * `to_y` (number) широта
  * `cargo_name` (string) наименование груза
  * `volume` (number) объем
  * `mass` (number) масса
  * `unit` (string) еденицы
  * `note` (string) записка
  * `flags` (number) флаги, см [price_request_bet_flags](#price_request_bet_flags)
  * `bets`(number) общее кол-во ставок
  * `bet` (number) ставка компании которая делает запрос (null - ставки нет)



### users_list

список пользователей с учетом их настроек приватности

```
{
 "cm":  "users_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `uid` (number) id юзера
  * `rts` (number) время регистрации
  * `flg` (number) флаги
  * `ln` (string) фаимлия
  * `fn` (string) имя
  * `pn` (string) отчество
  * `icq` (string) ICQ
  * `phone` (string) телефон
  * `skype` (string) кайп
  * `email` (string) email
  * `gender` (string) пол
  * `birthday` (string) день рождения по маске YYYY-MM-DD
  * `cid` (number) id компании
  * `cflg` (number) флаги компании
  * `position` (string) должность
  * `role` (string) роль
* фильтры упрощенные



### drivers_list

* список водителей
* для диалогов упраления АП

```
{
 "cm":  "drivers_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `uid` (number) id юзера
  * `ln` (string) фаимлия
  * `fn` (string) имя
  * `pn` (string) отчество
  * `rtid` (number) id АП
* видимость:
  * пользователи только своей кмпании
  * только пользователи имеющие роль `driver`
* фильтры упрощенные



### price_request_bets_list

список `ставок` сделанных в `запросах ставок` этой компании

```
{
 "cm":  "price_request_bets_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `price_request_bet_id` (number) id ставки
  * `price_request_id` (number) id запроса ставки
  * `ctime` (number) время создания ствки
  * `comp_id` (number) компания сделавшая ставку
  * `tags` (array of strings) тэги у `comp_id`
  * `cnt_customers` (number) количество закачиков у `comp_id`
  * `cnt_carriers` (number) количество перевозчиков у `comp_id`
  * `cnt_vehicles` (number) количество ТС у `comp_id`
  * `bet` (number) ставка
  * `flags` (number) флаги ставки
  * `contact` (object) контактное лицо (json документ)



## vehicles_list

cписок ТС компании / список версий ТС

```
{
 "cm":         "vehicles_list",
 "sid":        <(string) sid>,
 "comp_id":    <(number) id компании>,
 "vehicle_id": <(number) (опиция) id ТС>,
 <... параметры списка>
}
```

* если параметр `vehicle_id` указан, то будет возврашен список версий этого ТС
* если параметр `vehicle_id` не указан, то будет возвращен список последних версий ТС компании `comp_id`
* поля
  * `id` (number) id ТС (в случае просморта версий: id версии)
  * `ctime` (number) время создания ТС (в случае просморта версий: время создания версии)
  * `etime` (number) время удаления ТС (в случае просморта версий: время создания следующей версии)
  * `model` (string) модель
  * `num` (string) госномер
  * `type` (string) марка
  * `sts` (number) id файла СТС
  * `sts_name` (string) имя файла СТС
  * `sts_size` (string) размер файла СТС
  * `sts_token` (string) `token` для получения файла СТС через [file](#file)
  * `pts` (number) id файла ПТС
  * `pts_name` (string) имя файла ПТС
  * `pts_size` (string) размер файла ПТС
  * `pts_token` (string) `token` для получения файла ПТС через [file](#file)
  * `version` (number) порядковый номер версии (начиная с 1)
* фильтры
  * упрощенные (так же как в `msg_channels_list`)



## roadtrains_list

cписок автопоездов (АП) компании / список версий автопоезда

```
{
 "cm":           "roadtrains_list",
 "sid":          <(string) sid>,
 "comp_id":      <(number) id компании>,
 "roadtrain_id": <(number) (опиция) id АП>,
 <... параметры списка>
}
```

* если параметр `roadtrain_id` указан, то будет возврашен список версий этого АП
* если параметр `roadtrain_id` не указан, то будет возвращен список последних версий АП компании `comp_id`
* поля
  * `id` (number) id автопоезда (в случае просморта версий: id версии)
  * `ctime` (number) время создания АП (в случае просморта версий: время создания версии)
  * `etime` (number) время удаления АП (в случае просморта версий: время создания следующей версии)
  * `rid` (number) id ответственного
  * `rln` (string) фамилия ответсвенного
  * `rfn` (string) имя ответсвенного
  * `did` (number) id водителя
  * `dln` (string) фамилия водителя
  * `dfn` (string) имя водителя
  * `vmid` (number) id основного ТС
  * `vmnum` (string) госномер основного ТС
  * `vaid` (number) id дополнеительного ТС
  * `vanum` (string) госномер дополнительного ТС
  * `version` (number) порядковый номер версии (начиная с 1)
* фильтры
  * упрощенные (так же как в `msg_channels_list`)



## msg_channels_list

список каналов

```
{
 "cm":   "msg_channels_list",
 "sid":  <(string) sid>,
 "type": <(string) тип канала group|channel>,
 "self": <(boolean) true - только те в которых участвует пользователь, false - все>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id канала
  * `title` (string) название канала
  * `unreaded` (number) кол-во непрочитанных сообщений
  * `lrm` (number) id последнего прочитанного сообщения
  * `flags` (number) флаги самого пользователя в этом канале
  * `users` (number) кол-во пользователей
  * `comp_id` (number) id создавшей компании
  * `comp_name` (string) название создавшей компании
  * `vehicles` (number) количество свободных машин
  * `orders` (number) количество открытых заказов
* параметр `self`=`false` только при `type`=`channel`
* при `type`=`group` будут возвращены только те группы, в которых участвует пользователь
* фильтры
  * тут формат фильтров упрощен
  * вместо "списка объектов с клчами col, op, val" - тут "список списков из трех элементов col, op, val"
  * пример:
    * вместо `[{"col":"x","op":"lt","val":30},{"col":"x","op":"gt","val":10}]`
    * тут просто `[["id","lt",30],["id","gt",10]]`
  * в релизе все фильтры будуту упрощенными



## msg_privates_list

список приватов

```
{
 "cm":  "msg_privates_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id привата
  * `ts` (number) время создания привата
  * `opp_id` (number) user_id собеседника
  * `fn` (string) фамилия собеседника
  * `ln` (string) имя собеседника
  * `cid` (number) id компании собеседника
  * `cname` (number) название компании собеседника
  * `unreaded` (number) количество непрочтанных сообщений
  * `lrm` (number) id последнего прочитанного сообщения



## lead_list

cписок зарегестрированных "лидов" (доступно только администраторам системы)

```
{
 "cm":  "lead_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id регистрации
  * `ctime` (number) время регистрации
  * `ipaddr` (string) ip адрес клиента
  * `email`  (string) email
  * `phone`  (string) телефон (11 символов)
  * `name`  (string) имя
  * `cid` (number) id компании
  * `cname` (string) название компании
  * `flags` (number) флаги
* фильтры - упрощенные


## comp_rel_list

список связанных компаний

```
{
 "cm":       "comp_rel_list",
 "sid":      <(string) sid>,
 "comp_id":  <(number) id компании>,
 "relation": <(string) тип связи carriers|expeditors|shippers|social|blacklist>,
 <... параметры списка>
}
```

* будут показаны компании свзанные с `comp_id` по типу `relation`
* `social` и `blacklist` можно смотреть только у своей компании
* поля
  * `relation_id` (number) id связи
  * `comp_id` (number) id копании
  * `name` (string) название компании
  * `addr` (string) адрес компании
  * `inn` (string) ИНН
  * `kpp` (string) КПП
  * `ogrn` (string) ОГРН
  * `opf` (string) ОПФ
  * `phone` (string) телефон
  * `email` (string) email
  * `taxation` (string) форма налогооблажения
  * `web_site` (string) uri
  * `x` (number) долгота
  * `y` (number) широта
  * `tags` (array of strings) спиок тэгов
* фильтры - упрощенные


## comp_rel_req_list

список запросов на создание связей

```
{
 "cm":   "comp_rel_req_list",
 "sid":  <(string) sid>,
 "type": <(string) в какую группу просятся к нам: in_carriers|in_expeditors|in_shippers или в какую группу просимся мы: out_carriers|out_expeditors|out_shippers>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id запроса
  * `ctime` (number) время создания запроса
  * `type` (string) тип связи
  * `comp_to` (number) id компании от которой исходит связь
  * `comp_from` (number) id компании к которой направлена связь
  * `requester_id` (number) id запрашивающей компании
  * `requester_name` (string) название запрашивающей компании
  * `requested_id` (number) id запрашиваемой компании
  * `requested_name` (string) название запрашиваемой компании



## comp_invites_list

список пользователей приглашенных в компанию

```
{
 "cm":  "comp_invites_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id приглашения
  * `ctime` (number) время создания приглашения
  * `email` (string) куда отправлено приглашение
  * `last_name` (string) фамилия
  * `first_name` (string) имя
  * `pat_name` (string) отчество
  * `position` (string) должность
  * `phone` (string) телефон


## msg_channel_hist_list

список ообщений в канале

```
{
 "cm":         "msg_channel_hist_list",
 "sid":        <(string) sid>,
 "channel_id": <(number) id канала>,
 <... параметры списка>
}
```

* доступны только те каналы в которых состоит пользователь
* поля
  * `id` (number) id сообщения
  * `ts` (number) время создания сообщения
  * `uid` (number) user_id автора собщения
  * `ln` (string) фамилия автора сообщения
  * `fn` (string) имя автора сообщения
  * `body` (string) текст сообщения

* ответ содержит дополнения
  * `lrm_id` (number) id последнего прочитанного сообщения


## msg_private_hist_list

список ообщений в привате

```
{
 "cm":          "msg_private_hist_list",
 "sid":         <(string) sid>,
 "opp_user_id": <(number) user_id собеседника>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id сообщения
  * `ts` (number) время создания сообщения
  * `uid` (number) user_id автора собщения
  * `body` (string) текст сообщения

* ответ содержит дополнения
  * `private_id` (number) id привата (null - приват не существует)
  * `self_lrm_id` (number) id последнего прочитанного сообщения пользователем (null - нет прочитанных)
  * `opp_lrm_id` (number) id последнего прочитанного сообщения собеседником (null - нет прочитанных)
  * `opp_lrm_ts` (number) время прочтения собеседником сообщения `opp_lrm_id` (null - нет прочитанных)



## user_contacts_list

список контактов текущего пользователя

```
{
 "cm":  "user_contacts_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `uid` (number) id пользователя
  * `ts` (number) время создания контакта
  * `ln` (string) фамилия
  * `fn` (string) имя
  * `pn` (string) отчество
  * `icq` (string) icq
  * `phone` (string) телефон
  * `email` (string) email
  * `skype` (string) скайп
  * `position` (string) должность
  * `birthday` (string) день рождения YYY-MM-DD
  * `flags` (string) флаги [user_flags](#user_flags)
  * `cid` (number) id компании
  * `cname` (string) название компании



## lplaces_list

список мест погрузки

```
{
 "cm":  "lplaces_list",
 "sid": <(string) sid>,
 <... параметры списка>
}
```

* поля
  * `id` (number) id мста погрузки
  * `flags` (number) флаги [lplace_flags](#lplace_flags)
  * `name` (string) название
  * `addr` (string) адрес
  * `x` (number) долгота
  * `y` (number) широта
  * `cid` (number) id компании
  * `cname` (string) название компании
  * `chid` (number) id канала



## orders_list

список заказов

```
{
 "cm":      "orders_list",
 "sid":     "(string) sid",
 "archive": <(boolean) архив>,
 <... параметры списка>
}
```

* видимость:
  * заказы где `state`=`created`|`template` могут видеть:
    * создатели
  * заказы где `state`=`opened` могут видеть:
    * все
  * заказы где `state`=`closed`|`shipping`|`canceled`|`done` могут видеть:
    * создатели
    * грузовладельцы
    * назначенные экспедиторы
    * перевозчики чье предложение было выбранно назначенным экспедитором

* поля
  * `id` (number) id заказа
  * `tname` (string) название шаблона
  * `state` (string) состояние заказа [order_state](#order_state)
  * `createts` (number) время создания заказа
  * `opents` (number) время размещения
  * `closets` (number) время закрытия
  * `cancelts` (number) время отмены
  * `shipts` (number) время начала доставки
  * `donets` (number) время окончания доставки
  * `arhts` (number) время архивации
  * `cargo` (string) наименование груза
  * `cid` (number) id компании создателя
  * `cname` (string) название компании создателя
  * `cinn` (string) ИНН компании создателя
  * `caddr` (string) адрес компании создателя
  * `shid` (number) id компании грузовладельца
  * `shname` (string) название компании грузовладельца
  * `lpid` (number) id места погрузки
  * `lpname` (string) название места погрузки
  * `lpaddr` (string) адрес места погрузки
  * `lpx` (number) долгота места погрузки
  * `lpy` (number) широта места погрузки
  * `ltype` (string) тип загрузки/погрузки: back|side|top
  * `mass` (number) масса
  * `vol` (number) объем
  * `vtype` (string) требуемый тип ТС: tent|refrigerator|thermos|container|tank
  * `ltime` (number) дата отгрузки
  * `utime` (number) дата доставки
  * `receiver` (string) получатель
  * `addr` (string) адрес места доставки
  * `x` (number) долгота места доставки
  * `y` (number) широта места доставки
  * `note` (string) примечание
  * `expid` (number) id назначенной компании экспедитора
  * `expname` (string) название назначенной компании экспедитора
  * `oid` (number) id предлоджения от моей компании (как перевозчика)
  * `ort` (number) id АП предложения
  * `omv` (number) id основного ТС АП предложения
  * `oav` (number) id дополнительного ТС АП предложения
  * `odriver` (string) id водителя предложения
  * `ocprice` (number) цена предложения перевозчика
  * `oeprice` (number) цена предложения экспедитора
  * `crid` (number) id выбранной компании перевозчика
  * `crname` (string) название выбранной компании перевозчика
  * `rtid` (number) id выбранного АП
  * `vid` (number) id основного ТС выранного АП
  * `vmodel` (string) модель основного ТС выбранного АП
  * `vnum` (string) гос.номер основного ТС выбранного АП
  * `did` (number) id пользователя-водителя выбранного АП
  * `dfn` (string) имя водителя выбранного АП
  * `dln` (string) фамилия водителя выбранного АП
  * `price` (number) сумма сделки (для грузовладельца всегда null)
  * `memo` (string) заметка
  * `creason` (string) причина отмены
  * `ecveh` (string) указанные вручную экспедитором данные ТС
  * `ectr` (string) указанные вручную экспедитором данные прицепа
  * `ecdfio` (string) указанные вручную экспедитором ФИО водителя
  * `ecddoc` (string) указанные вручную экспедитором данные документа водителя



### order_state

* `created` - создана
* `opened` - открыта/размещена (торги экспедитора с перевозчиками)
* `closed` - закрыта (перевозчик выбран)
* `shipping` - дотавка
* `canceled` - отменена
* `done` - готова/доставлена



## order_offers_list

список предложений по заказу

```
{
 "cm":   "order_offers_list",
 "sid":  "(string) sid",
 <... параметры списка>
}
```

* видимость:
  * преддожение видно тому перевозчику который его делал
  * предложение видно экспедитору назначенному в заказе

* поля:
  * `id` (number) id предложения
  * `ts` (number) время создания предложений
  * `oid` (number) id заказа
  * `cid` (number) id компании перевозчика
  * `cname` (string) название компании перевозчика
  * `rtid` (number) id АП
  * `vid` (number) id основного ТС АП
  * `vmodel` (string) модель основного ТС АП
  * `vnum` (string) гос.номер основного ТС АП
  * `did` (number) id пользователя-водителя
  * `dfn` (string) имя водителя
  * `dln` (string) фамилия водителя
  * `cprice` (number) цена перевозчика
  * `eprice` (number) цена экспедитора




## custom_carriers_list

* черновик

* список данных перевозчиков
* доступно только компаниям-создателям

```
{
 "cm":   "custom_carriers_list",
 "sid":  "(string) sid",
 <... параметры списка>
}
```

* поля:
  * `vmodel` (string) модель ТС
  * `vnum` (string) гос.номер ТС
  * `dfn` (string) имя водителя
  * `dln` (string) фамилия водителя
  * `pln` (string) отчество водителя



# file

* URI `http://cargo.chat/file/token`
* если указать вмсто `token` действительный токен, то будет выдан соответствующий файл



# websocket

* URI `ws://cargochat/apiws` (стата `http://cargo.chat/apiwsstat`)
* запросы в формете `{"cm":<запрос>, ...}`
* ответы в виде json объектов
* клиент всегда должен быть подключен: загрузился - подключись, отвалился - подключиь снова



## ws_ping

```
{
 "cm":  "ping"
}
{
 "pong": 1,
 "time": <(number) текущее время>
}
```



## ws_reg

запрос регистарции соединения, выполняется для каждого нового подключения если известен `sid` (или сразу после получения `sid`)

```
{
 "cm":      "reg",
 "sid":     <(string) sid>
}
{
 "type":    "reg",
 "user_id": <(number) id пользователя>
}
```

после регистрации клиенту будут приходить события:

```
{
 "type": <(string) тип события>,
 <... данные события>
}
```



## ws_watch

запрос слежения за статусом пользователей

```
{
 "cm":     "watch",
 "users":  <(array of numbers) список id пользователей>
}
{
 "type":   "watch",
 "online": <(array of numbers) список id пользователей которе были запрошены и на данный момент online>
}
```

после этого запроса, пока существует соединение, клиент будет получать события изменения статуса у подписанных пользователей:

```
{
 "type":    "user_offline",
 "user_id": <(number) id отключившегося пользователя>
}
```

и

```
{
 "type":    "user_online",
 "user_id": <(number) id подключившегося пользователя>
}
```



# спецзапросы

## sms

запрос актуальных телефонов и смс кодов

```
{
 "cm":"sms",
 "secret":"kriblekrablebooms"
}

{
 "user_logins":<авторизации>,
 "user_invites":<инвайты сотрудников>,
 "comp_invites":<инвайты партнеров>
}
```