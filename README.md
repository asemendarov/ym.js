# Ym.js
Библиотека-обертка над Yandex Metrika с возможностью подключения нескольких счетчиков.

Библиотека экспериментальная, поэтому не рекомендуются использовать в продакшене.

# Пример использования

```ts
import { defineYmCounters } from 'ym.js';

const ym = defineYmCounters({
  global: {
    id: 100001,
    enabled: true,
  },
  iam: {
    id: 100002,
    enabled: true,
  },
  lms: {
    id: 100003,
    enabled: true,
    ymOptions: {
      accurateTrackBounce: true,
      childIframe: false,
      defer: false,
      
      // ...
    }
  },
})

ym.global.hit('/example1', { params: { 'level-1': { 'level-2': 'level-3' } }})
ym.lms.reachGoal('target-name-1', { 'level-1': { 'level-2': 'level-3' } })
ym.iam.setUserID('xxxxx-xxxxxx-xxxxxx-xxxxxx')
```