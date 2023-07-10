declare global {
    interface Window {
        Ya: {
            Metrika2: YmCore2;
        };
    }
}
export interface YmOptions {
    /**
     * @param {(boolean | number)} [accurateTrackBounce=true]
     * Точный показатель отказов. Параметр может принимать значения:
     * - `true` — включить точный показатель отказов, событие о неотказе засчитывается через 15000 мс (15 с);
     * - `false` — не включать точный показатель отказов.
     * - `<N>` (целое число) — включить точный показатель отказов, событие о неотказе засчитывается через `<N>` мс.
     *
     * @default true
     */
    accurateTrackBounce?: boolean | number;
    /**
     * @param  {boolean} [childIframe=false]
     * Признак записи содержимого iframe без счетчика в дочернем окне
     *
     * @default false
     */
    childIframe?: boolean;
    /**
     * @param {boolean} [clickmap=true]
     * Признак сбора данных для карты кликов.
     *
     * @default true
     */
    clickmap?: boolean;
    /**
     * @param {boolean}  [defer=false]
     * Признак отключения автоматической отправки данных при инициализации счетчика
     *
     * @default false
    */
    defer?: boolean;
    /**
     * @param {(boolean | string | [])} [ecommerce=false]
     * Сбор данных электронной коммерции.
     * - `true` — включить сбор данных электронной коммерции. Равносильно значению `dataLayer` (если опция включена в интерфейсе Метрики). Передача данных производится через JavaScript-массив с именем `dataLayer` в глобальном пространстве имен (`window.dataLayer`).
     * - `false` — отключить сбор данных электронной коммерции Ecommerce;
     * - `<objectName>` (String) — включить сбор данных электронной коммерции Ecommerce. Передача данных производится через JavaScript-массив с именем `<objectName>` в глобальном пространстве имен (`window.<objectName>`).
     *
     * @default false
     */
    ecommerce?: boolean | string | unknown[];
    /**
     * @param {[] | object} [params=undefined]
     * Параметры визита, передаваемые во время инициализации счетчика.
     *
     * Для передачи параметров визита в произвольный момент времени используется метод params
     *
     * @default undefined
     */
    params?: unknown[] | YmRequestParams;
    /**
     * @param {object} [userParams=undefined]
     * Параметры посетителей сайта, передаваемые во время инициализации счетчика.
     *
     * Для передачи параметров посетителей в произвольный момент времени используется метод userParams
     *
     * @default undefined
     */
    userParams?: YmUserParams;
    /**
     * @param {boolean} [trackHash=false]
     *  Признак отслеживания хеша в адресной строке браузера.
     *
     * @default false
     */
    trackHash?: boolean;
    /**
     * @param {boolean} [trackLinks=true]
     * Признак отслеживания переходов по внешним ссылкам
     *
     * @default true
     */
    trackLinks?: boolean;
    /**
     * @param {string[]} [trustedDomains=undefined]
     * Признак доверенного домена для записи содержимого дочернего окна iframe. Содержит адрес домена родительского окна.
     *
     * @default undefined
     */
    trustedDomains?: string[];
    /**
     * @param {number} [type=0]
     * Тип счетчика. Для РСЯ равен 1.
     *
     * @default 0
     */
    type?: number;
    /**
     * @param {boolean} [webvisor=false]
     * Признак использования Вебвизора
     *
     * @default false
     */
    webvisor?: boolean;
    /**
     * @param  {boolean} [triggerEvent=false]
     * Признак проверки готовности счетчика
     *
     * @default false
     */
    triggerEvent?: boolean;
}
export interface YmRequestParams extends Record<string, unknown> {
    order_price?: number;
    currency?: string;
}
export interface YmRequestOptions {
    /** Callback-функция, вызываемая после отправки данных о загрузке файла/запроса */
    callback?: () => void;
    /** Контекст, доступный в callback-функции по ключевому слову `this` */
    ctx?: unknown;
    /** Параметры визита */
    params?: YmRequestParams;
    /** URL с которого посетитель загрузил файл/содержимое страницы  */
    referer?: string;
    /**
     * Заголовок текущей страницы
     *
     * @default document.title
     * */
    title?: string;
}
export interface YmFirstPartyParams {
    email?: string;
    /** Номер телефона без пробелов в формате 70123456789. */
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    home_address?: {
        street?: string;
        city?: string;
        region?: string;
        postal_code?: number;
        country?: string;
    };
    /** Уникальный идентификатор пользователя Яндекса (id). Передавайте, если на вашем сайте есть авторизация Яндекс ID. */
    yandex_cid?: number;
}
export interface YmUserParams extends Record<string, unknown> {
    /** Для передачи собственного идентификатора посетителя используйте параметр UserID. Для других параметров посетителей вы можете выбрать произвольные имена. */
    UserID: number;
}
export interface YmCore {
    /**
     * Отслеживание загрузки файлов с заданными расширениями.
     * @param extensions Расширение имени файла, заданное в виде строки или список расширений, указанный в виде массива строк
     */
    addFileExtension(extensions: string | string[]): void;
    /**
     * Отправка информации о переходе по внешней ссылке.
     * @param url URL страницы, на которую произошел переход
     * @param options Дополнительные опции
     */
    extLink(url: string, options?: Omit<YmRequestOptions, 'referer'>): void;
    /**
     * Отправка информации о загрузке файла.
     * @param url URL загруженного файла.
     * @param options Дополнительные опции
     */
    file(url: string, options?: YmRequestOptions): void;
    /**
     * Отправка информации о посетителях сайта для улучшения работы рекламных алгоритмов.
     *
     * Данные не нужно хешировать. При передаче информация захешируются автоматически и поступит в Метрику в обезличенном виде.
     * @param parameters Информация о посетителе, которую он оставил на сайте, например через форму обратной связи.
     */
    firstPartyParams(parameters: YmFirstPartyParams): void;
    /**
     * Метод для самостоятельно хеширования данных.
     *
     * !yandex_cid не надо хешировать!
     * @param parameters Информация о посетителе, которую он оставил на сайте, например через форму обратной связи.
     */
    firstPartyParamsHashed(parameters: YmFirstPartyParams): void;
    /** Получение идентификатора посетителя сайта, заданного Яндекс Метрикой. */
    getClientID(callback: (clientID: string) => void): void;
    /**
     * Отправка данных о просмотре. Обычно используется на страницах, реализованных с использованием AJAX или и Flash.
     * @param url URL текущей страницы
     * @param options Дополнительные опции
     */
    hit(url: string, options?: YmRequestOptions): void;
    /** Передача информации о том, что визит пользователя не является отказом. */
    notBounce(options?: Pick<YmRequestOptions, 'callback' | 'ctx'>): void;
    /**
     * Передача произвольных параметров визита.
     * @param parameters Параметры визита
     */
    params(parameters: unknown[] | YmRequestParams): void;
    /**
     * Передача информации о достижении цели.
     * @param target Идентификатор цели. Задается на странице редактирования счетчика при создании или изменении цели типа «JavaScript-событие».
     * @param params Параметры визита
     */
    reachGoal(target: string, params?: YmRequestParams, callback?: Pick<YmRequestOptions, 'callback'>, ctx?: Pick<YmRequestOptions, 'ctx'>): void;
    /** Передача идентификатора посетителя сайта, заданного владельцем сайта. */
    setUserID(userID: string): void;
    /** Передача произвольных параметров посетителей сайта. */
    userParams(parameters: YmUserParams): void;
}
export interface YmCore2 {
    new (id: number, event: 'init', options?: YmOptions): YmCore;
}
export type YmQueueItem = {
    event: string;
    args: unknown[];
};
export declare class YmCounter implements YmCore {
    readonly id: number;
    readonly options?: YmOptions;
    private _enabled;
    private _ymCounter?;
    private _queue;
    constructor(id: number, options?: YmOptions, enabled?: boolean);
    get enabled(): boolean;
    addFileExtension(extensions: string | string[]): void;
    extLink(url: string, options?: Omit<YmRequestOptions, 'referer'>): void;
    file(url: string, options?: YmRequestOptions): void;
    firstPartyParams(parameters: YmFirstPartyParams): void;
    firstPartyParamsHashed(parameters: YmFirstPartyParams): void;
    getClientID(callback: (clientID: string) => void): void;
    hit(url: string, options?: YmRequestOptions): void;
    notBounce(options?: Pick<YmRequestOptions, 'callback' | 'ctx'>): void;
    params(parameters: unknown[] | YmRequestParams): void;
    reachGoal(target: string, params?: YmRequestParams, callback?: Pick<YmRequestOptions, 'callback'>, ctx?: Pick<YmRequestOptions, 'ctx'>): void;
    setUserID(userID: string): void;
    userParams(parameters: YmUserParams): void;
    enable(): void;
    private execQueue;
}
