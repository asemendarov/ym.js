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
export declare function defineYmCounters<T extends string>(configs: YmConfigs<T>, src?: string): YmCounters<T>;
export * from './core';
