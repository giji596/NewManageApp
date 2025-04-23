import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_aywlos } from './work-log/categories/options';
import type { Methods as Methods_1mf7n5w } from './work-log/daily/_date';
import type { Methods as Methods_1diwgzt } from './work-log/daily/summary';
import type { Methods as Methods_1v3f3ur } from './work-log/daily/summary/detail';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/work-log/categories/options';
  const PATH1 = '/work-log/daily';
  const PATH2 = '/work-log/daily/summary';
  const PATH3 = '/work-log/daily/summary/detail';
  const GET = 'GET';

  return {
    work_log: {
      categories: {
        options: {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH0, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
      },
      daily: {
        _date: (val2: number | string) => {
          const prefix2 = `${PATH1}/${val2}`;

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1mf7n5w['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1mf7n5w['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        summary: {
          detail: {
            get: (option: { query: Methods_1v3f3ur['get']['query'], config?: T | undefined }) =>
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH3, GET, option).json(),
            $get: (option: { query: Methods_1v3f3ur['get']['query'], config?: T | undefined }) =>
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1v3f3ur['get']['query'] } | undefined) =>
              `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH2, GET, option).json(),
          $get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1diwgzt['get']['query'] } | undefined) =>
            `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
