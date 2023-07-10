import { YmCounter, YmOptions } from './core';

export interface YmConfig {
  /** Номер счетчика */
  id: number;
  /** Опции инициализации трекера */
  ymOptions?: YmOptions;
  /** Параметр включение трекера при инициализации */
  enabled?: boolean;
}

export type YmConfigs<T extends string> = Record<T, YmConfig>;
export type YmCounters<T extends string> = Record<T, YmCounter>;

function loadYmScript<T extends string>(counters: YmCounters<T>, scriptSrc: string) {
  const headEl = document.querySelector('head');
  const scriptEl = document.createElement('script');

  scriptEl.async = true;
  scriptEl.src = scriptSrc;
  scriptEl.onload = () => onLoadYmScript(counters);

  headEl.appendChild(scriptEl);
}

function onLoadYmScript<T extends string>(counters: YmCounters<T>) {
  Object.keys(counters).forEach((key: T) => {
    const counter: YmCounter = counters[key];

    if (counter.enabled) {
      counter.enable()
    }
  });
}

function createYmCounters<T extends string>(configs: YmConfigs<T>): YmCounters<T> {
  const keysCounters = Object.keys(configs);

  const counters = keysCounters.reduce((acc, key) => {
    const { id, ymOptions, enabled } = configs[key];

    acc[key] = new YmCounter(id, ymOptions, enabled);

    return acc;
  }, {} as YmCounters<T>)

  return counters;
}

export function defineYmCounters<T extends string>(configs: YmConfigs<T>, src = 'https://mc.yandex.ru/metrika/tag.js') {
  const counters = createYmCounters(configs);

  loadYmScript(counters, src);

  return counters;
}

export * from './core';
