import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_a4q315 } from './work-log/categories';
import type { Methods as Methods_1jq9xvi } from './work-log/categories/_id/activity';
import type { Methods as Methods_occ1ll } from './work-log/categories/_id/summary';
import type { Methods as Methods_8n8n9b } from './work-log/categories/_id/tasks';
import type { Methods as Methods_aywlos } from './work-log/categories/options';
import type { Methods as Methods_1mf7n5w } from './work-log/daily/_date';
import type { Methods as Methods_1tcwjyk } from './work-log/daily/_date/task-logs';
import type { Methods as Methods_1aphmwv } from './work-log/daily/_date/task-logs/_id';
import type { Methods as Methods_phisw8 } from './work-log/daily/monthly-work-time';
import type { Methods as Methods_1diwgzt } from './work-log/daily/summary';
import type { Methods as Methods_1v3f3ur } from './work-log/daily/summary/detail';
import type { Methods as Methods_y7y0f0 } from './work-log/memos';
import type { Methods as Methods_14he14f } from './work-log/memos/_id';
import type { Methods as Methods_17g6bd8 } from './work-log/memos/_id/body';
import type { Methods as Methods_qs49n8 } from './work-log/memos/tags';
import type { Methods as Methods_161gw75 } from './work-log/tasks';
import type { Methods as Methods_1pplcpu } from './work-log/tasks/_id';
import type { Methods as Methods_272j0j } from './work-log/tasks/activities/last-month';
import type { Methods as Methods_oqgfc } from './work-log/tasks/bulk-update';
import type { Methods as Methods_16ypfr8 } from './work-log/tasks/options';
import type { Methods as Methods_wq17vx } from './work-log/tasks/progress/last-month';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/work-log/categories';
  const PATH1 = '/activity';
  const PATH2 = '/summary';
  const PATH3 = '/tasks';
  const PATH4 = '/work-log/categories/options';
  const PATH5 = '/work-log/daily';
  const PATH6 = '/task-logs';
  const PATH7 = '/work-log/daily/monthly-work-time';
  const PATH8 = '/work-log/daily/summary';
  const PATH9 = '/work-log/daily/summary/detail';
  const PATH10 = '/work-log/memos';
  const PATH11 = '/body';
  const PATH12 = '/work-log/memos/tags';
  const PATH13 = '/work-log/tasks';
  const PATH14 = '/work-log/tasks/activities/last-month';
  const PATH15 = '/work-log/tasks/bulk-update';
  const PATH16 = '/work-log/tasks/options';
  const PATH17 = '/work-log/tasks/progress/last-month';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    work_log: {
      categories: {
        _id: (val2: number | string) => {
          const prefix2 = `${PATH0}/${val2}`;

          return {
            activity: {
              get: (option: { query: Methods_1jq9xvi['get']['query'], config?: T | undefined }) =>
                fetch<Methods_1jq9xvi['get']['resBody']>(prefix, `${prefix2}${PATH1}`, GET, option).json(),
              $get: (option: { query: Methods_1jq9xvi['get']['query'], config?: T | undefined }) =>
                fetch<Methods_1jq9xvi['get']['resBody']>(prefix, `${prefix2}${PATH1}`, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get' | undefined; query: Methods_1jq9xvi['get']['query'] } | undefined) =>
                `${prefix}${prefix2}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            },
            summary: {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_occ1ll['get']['resBody']>(prefix, `${prefix2}${PATH2}`, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_occ1ll['get']['resBody']>(prefix, `${prefix2}${PATH2}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH2}`,
            },
            tasks: {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_8n8n9b['get']['resBody']>(prefix, `${prefix2}${PATH3}`, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_8n8n9b['get']['resBody']>(prefix, `${prefix2}${PATH3}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH3}`,
            },
          };
        },
        options: {
          get: (option?: { query?: Methods_aywlos['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH4, GET, option).json(),
          $get: (option?: { query?: Methods_aywlos['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_aywlos['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_aywlos['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        post: (option: { body: Methods_a4q315['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_a4q315['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods_a4q315['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_a4q315['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      daily: {
        _date: (val2: number | string) => {
          const prefix2 = `${PATH5}/${val2}`;

          return {
            task_logs: {
              _id: (val4: number | string) => {
                const prefix4 = `${prefix2}${PATH6}/${val4}`;

                return {
                  patch: (option: { body: Methods_1aphmwv['patch']['reqBody'], config?: T | undefined }) =>
                    fetch<Methods_1aphmwv['patch']['resBody']>(prefix, prefix4, PATCH, option).json(),
                  $patch: (option: { body: Methods_1aphmwv['patch']['reqBody'], config?: T | undefined }) =>
                    fetch<Methods_1aphmwv['patch']['resBody']>(prefix, prefix4, PATCH, option).json().then(r => r.body),
                  delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods_1aphmwv['delete']['resBody']>(prefix, prefix4, DELETE, option).json(),
                  $delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods_1aphmwv['delete']['resBody']>(prefix, prefix4, DELETE, option).json().then(r => r.body),
                  $path: () => `${prefix}${prefix4}`,
                };
              },
              post: (option: { body: Methods_1tcwjyk['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_1tcwjyk['post']['resBody']>(prefix, `${prefix2}${PATH6}`, POST, option).json(),
              $post: (option: { body: Methods_1tcwjyk['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_1tcwjyk['post']['resBody']>(prefix, `${prefix2}${PATH6}`, POST, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH6}`,
            },
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1mf7n5w['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1mf7n5w['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        monthly_work_time: {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_phisw8['get']['resBody']>(prefix, PATH7, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_phisw8['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH7}`,
        },
        summary: {
          detail: {
            get: (option: { query: Methods_1v3f3ur['get']['query'], config?: T | undefined }) =>
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH9, GET, option).json(),
            $get: (option: { query: Methods_1v3f3ur['get']['query'], config?: T | undefined }) =>
              fetch<Methods_1v3f3ur['get']['resBody']>(prefix, PATH9, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1v3f3ur['get']['query'] } | undefined) =>
              `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH8, GET, option).json(),
          $get: (option?: { query?: Methods_1diwgzt['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1diwgzt['get']['resBody']>(prefix, PATH8, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1diwgzt['get']['query'] } | undefined) =>
            `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
      memos: {
        _id: (val2: number | string) => {
          const prefix2 = `${PATH10}/${val2}`;

          return {
            body: {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17g6bd8['get']['resBody']>(prefix, `${prefix2}${PATH11}`, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17g6bd8['get']['resBody']>(prefix, `${prefix2}${PATH11}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH11}`,
            },
            patch: (option: { body: Methods_14he14f['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_14he14f['patch']['resBody']>(prefix, prefix2, PATCH, option).json(),
            $patch: (option: { body: Methods_14he14f['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_14he14f['patch']['resBody']>(prefix, prefix2, PATCH, option).json().then(r => r.body),
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_14he14f['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_14he14f['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        tags: {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_qs49n8['get']['resBody']>(prefix, PATH12, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_qs49n8['get']['resBody']>(prefix, PATH12, GET, option).json().then(r => r.body),
          post: (option: { body: Methods_qs49n8['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_qs49n8['post']['resBody']>(prefix, PATH12, POST, option).json(),
          $post: (option: { body: Methods_qs49n8['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_qs49n8['post']['resBody']>(prefix, PATH12, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH12}`,
        },
        post: (option: { body: Methods_y7y0f0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_y7y0f0['post']['resBody']>(prefix, PATH10, POST, option).json(),
        $post: (option: { body: Methods_y7y0f0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_y7y0f0['post']['resBody']>(prefix, PATH10, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH10}`,
      },
      tasks: {
        _id: (val2: number | string) => {
          const prefix2 = `${PATH13}/${val2}`;

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1pplcpu['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1pplcpu['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            patch: (option: { body: Methods_1pplcpu['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1pplcpu['patch']['resBody']>(prefix, prefix2, PATCH, option).json(),
            $patch: (option: { body: Methods_1pplcpu['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1pplcpu['patch']['resBody']>(prefix, prefix2, PATCH, option).json().then(r => r.body),
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1pplcpu['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1pplcpu['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        activities: {
          last_month: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_272j0j['get']['resBody']>(prefix, PATH14, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_272j0j['get']['resBody']>(prefix, PATH14, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH14}`,
          },
        },
        bulk_update: {
          patch: (option: { body: Methods_oqgfc['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_oqgfc['patch']['resBody']>(prefix, PATH15, PATCH, option).json(),
          $patch: (option: { body: Methods_oqgfc['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_oqgfc['patch']['resBody']>(prefix, PATH15, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH15}`,
        },
        options: {
          get: (option: { query: Methods_16ypfr8['get']['query'], config?: T | undefined }) =>
            fetch<Methods_16ypfr8['get']['resBody']>(prefix, PATH16, GET, option).json(),
          $get: (option: { query: Methods_16ypfr8['get']['query'], config?: T | undefined }) =>
            fetch<Methods_16ypfr8['get']['resBody']>(prefix, PATH16, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_16ypfr8['get']['query'] } | undefined) =>
            `${prefix}${PATH16}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        progress: {
          last_month: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_wq17vx['get']['resBody']>(prefix, PATH17, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_wq17vx['get']['resBody']>(prefix, PATH17, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH17}`,
          },
        },
        get: (option: { query: Methods_161gw75['get']['query'], config?: T | undefined }) =>
          fetch<Methods_161gw75['get']['resBody']>(prefix, PATH13, GET, option).json(),
        $get: (option: { query: Methods_161gw75['get']['query'], config?: T | undefined }) =>
          fetch<Methods_161gw75['get']['resBody']>(prefix, PATH13, GET, option).json().then(r => r.body),
        post: (option: { body: Methods_161gw75['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_161gw75['post']['resBody']>(prefix, PATH13, POST, option).json(),
        $post: (option: { body: Methods_161gw75['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_161gw75['post']['resBody']>(prefix, PATH13, POST, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_161gw75['get']['query'] } | undefined) =>
          `${prefix}${PATH13}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
