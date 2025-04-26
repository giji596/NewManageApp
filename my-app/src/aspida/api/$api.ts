import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_a4q315 } from './work-log/categories';
import type { Methods as Methods_aywlos } from './work-log/categories/options';
import type { Methods as Methods_1mf7n5w } from './work-log/daily/_date';
import type { Methods as Methods_1tcwjyk } from './work-log/daily/_date/task-logs';
import type { Methods as Methods_1diwgzt } from './work-log/daily/summary';
import type { Methods as Methods_1v3f3ur } from './work-log/daily/summary/detail';
import type { Methods as Methods_161gw75 } from './work-log/tasks';
import type { Methods as Methods_16ypfr8 } from './work-log/tasks/options';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/work-log/categories';
  const PATH1 = '/work-log/categories/options';
  const PATH2 = '/work-log/daily';
  const PATH3 = '/task-logs';
  const PATH4 = '/work-log/daily/summary';
  const PATH5 = '/work-log/daily/summary/detail';
  const PATH6 = '/work-log/tasks';
  const PATH7 = '/work-log/tasks/options';
  const GET = 'GET';
  const POST = 'POST';

  return {
    work_log: {
      categories: {
        options: {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
        post: (option: { body: Methods_a4q315['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_a4q315['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods_a4q315['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_a4q315['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      daily: {
        _date: (val2: number | string) => {
          const prefix2 = `${PATH2}/${val2}`;

          return {
            task_logs: {
              post: (option: { body: Methods_1tcwjyk['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_1tcwjyk['post']['resBody']>(prefix, `${prefix2}${PATH3}`, POST, option).json(),
              $post: (option: { body: Methods_1tcwjyk['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_1tcwjyk['post']['resBody']>(prefix, `${prefix2}${PATH3}`, POST, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH3}`,
            },
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
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH5, GET, option).json(),
            $get: (option: { query: Methods_1v3f3ur['get']['query'], config?: T | undefined }) =>
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH5, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1v3f3ur['get']['query'] } | undefined) =>
              `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH4, GET, option).json(),
          $get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1diwgzt['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
      tasks: {
        options: {
          get: (option: { query: Methods_16ypfr8['get']['query'], config?: T | undefined }) =>
            fetch<Methods_16ypfr8['get']['resBody']>(prefix, PATH7, GET, option).json(),
          $get: (option: { query: Methods_16ypfr8['get']['query'], config?: T | undefined }) =>
            fetch<Methods_16ypfr8['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_16ypfr8['get']['query'] } | undefined) =>
            `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        post: (option: { body: Methods_161gw75['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_161gw75['post']['resBody']>(prefix, PATH6, POST, option).json(),
        $post: (option: { body: Methods_161gw75['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_161gw75['post']['resBody']>(prefix, PATH6, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH6}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
