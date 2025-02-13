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
  reachGoal(
    target: string,
    params?: YmRequestParams,
    callback?: Pick<YmRequestOptions, 'callback'>,
    ctx?: Pick<YmRequestOptions, 'ctx'>,
  ): void;

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

export class YmCounter implements YmCore {
  public readonly id: number;
  public readonly options?: YmOptions;
  
  private _enabled: boolean;
  private _ymCounter?: YmCore;
  private _queue: YmQueueItem[] = [];

  constructor(id: number, options?: YmOptions, enabled = true) {
    this.id = id;
    this.options = options;
    this._enabled = enabled;
  }

  get enabled() {
    return this._enabled;
  }

  public addFileExtension(extensions: string | string[]) {
    this._ymCounter
      ? this._ymCounter.addFileExtension(extensions)
      : this._queue.push({ event: 'addFileExtension', args: [extensions] });
  }

  public extLink(url: string, options?: Omit<YmRequestOptions, 'referer'>) {
    this._ymCounter
      ? this._ymCounter.extLink(url, options)
      : this._queue.push({ event: 'extLink', args: [url, options] });
  }

  public file(url: string, options?: YmRequestOptions) {
    this._ymCounter
      ? this._ymCounter.file(url, options)
      : this._queue.push({ event: 'file', args: [url, options] });
  }

  public firstPartyParams(parameters: YmFirstPartyParams) {
    this._ymCounter
      ? this._ymCounter.firstPartyParams(parameters)
      : this._queue.push({ event: 'firstPartyParams', args: [parameters] });    
  }

  public firstPartyParamsHashed(parameters: YmFirstPartyParams) {
    this._ymCounter
      ? this._ymCounter.firstPartyParamsHashed(parameters)
      : this._queue.push({ event: 'firstPartyParamsHashed', args: [parameters] });
  }

  public getClientID(callback: (clientID: string) => void) {
    this._ymCounter
      ? this._ymCounter.getClientID(callback)
      : this._queue.push({ event: 'getClientID', args: [callback] });
  }

  public hit(url: string, options?: YmRequestOptions) {
    this._ymCounter
      ? this._ymCounter.hit(url, options)
      : this._queue.push({ event: 'hit', args: [url, options] });
  }

  public notBounce(options?: Pick<YmRequestOptions, 'callback' | 'ctx'>) {
    this._ymCounter
      ? this._ymCounter.notBounce(options)
      : this._queue.push({ event: 'notBounce', args: [options] });
  }

  public params(parameters: unknown[] | YmRequestParams) {
    this._ymCounter
      ? this._ymCounter.params(parameters)
      : this._queue.push({ event: 'params', args: [parameters] });
  }

  public reachGoal(
    target: string,
    params?: YmRequestParams,
    callback?: Pick<YmRequestOptions, 'callback'>,
    ctx?: Pick<YmRequestOptions, 'ctx'>,
  ) {
    this._ymCounter
      ? this._ymCounter.reachGoal(target, params, callback, ctx)
      : this._queue.push({ event: 'reachGoal', args: [target, params, callback, ctx] });
  }

  public setUserID(userID: string) {
    this._ymCounter
      ? this._ymCounter.setUserID(userID)
      :  this._queue.push({ event: 'setUserID', args: [userID] });
  }

  public userParams(parameters: YmUserParams) {
    this._ymCounter
      ? this._ymCounter.userParams(parameters)
      : this._queue.push({ event: 'userParams', args: [parameters] })
  }

  public enable() {
    this._enabled = true;

    if (this._ymCounter) {
      console.warn(`Yandex metrika with id=${this.id} has already been created`);
      return;
    }

    this._ymCounter = new window.Ya.Metrika2(this.id, 'init', this.options);
    this.execQueue();
  }

  private execQueue() {
    if (!this._ymCounter) throw new Error('Yandex Metrika counter is not defined');

    this._queue.forEach((item) => {
      const methodname = item.event;
      const method = this._ymCounter[methodname] ;
      method(...item.args);
    });

    this._queue = [];
  }
}
