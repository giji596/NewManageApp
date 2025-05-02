
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DailyData
 * 
 */
export type DailyData = $Result.DefaultSelection<Prisma.$DailyDataPayload>
/**
 * Model TaskLog
 * 
 */
export type TaskLog = $Result.DefaultSelection<Prisma.$TaskLogPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Memo
 * 
 */
export type Memo = $Result.DefaultSelection<Prisma.$MemoPayload>
/**
 * Model MemoTag
 * 
 */
export type MemoTag = $Result.DefaultSelection<Prisma.$MemoTagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DailyData
 * const dailyData = await prisma.dailyData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DailyData
   * const dailyData = await prisma.dailyData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.dailyData`: Exposes CRUD operations for the **DailyData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyData
    * const dailyData = await prisma.dailyData.findMany()
    * ```
    */
  get dailyData(): Prisma.DailyDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskLog`: Exposes CRUD operations for the **TaskLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskLogs
    * const taskLogs = await prisma.taskLog.findMany()
    * ```
    */
  get taskLog(): Prisma.TaskLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memo`: Exposes CRUD operations for the **Memo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memos
    * const memos = await prisma.memo.findMany()
    * ```
    */
  get memo(): Prisma.MemoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memoTag`: Exposes CRUD operations for the **MemoTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemoTags
    * const memoTags = await prisma.memoTag.findMany()
    * ```
    */
  get memoTag(): Prisma.MemoTagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DailyData: 'DailyData',
    TaskLog: 'TaskLog',
    Task: 'Task',
    Category: 'Category',
    Memo: 'Memo',
    MemoTag: 'MemoTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "dailyData" | "taskLog" | "task" | "category" | "memo" | "memoTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DailyData: {
        payload: Prisma.$DailyDataPayload<ExtArgs>
        fields: Prisma.DailyDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          findFirst: {
            args: Prisma.DailyDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          findMany: {
            args: Prisma.DailyDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>[]
          }
          create: {
            args: Prisma.DailyDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          createMany: {
            args: Prisma.DailyDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>[]
          }
          delete: {
            args: Prisma.DailyDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          update: {
            args: Prisma.DailyDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          deleteMany: {
            args: Prisma.DailyDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>[]
          }
          upsert: {
            args: Prisma.DailyDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyDataPayload>
          }
          aggregate: {
            args: Prisma.DailyDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyData>
          }
          groupBy: {
            args: Prisma.DailyDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyDataCountArgs<ExtArgs>
            result: $Utils.Optional<DailyDataCountAggregateOutputType> | number
          }
        }
      }
      TaskLog: {
        payload: Prisma.$TaskLogPayload<ExtArgs>
        fields: Prisma.TaskLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findFirst: {
            args: Prisma.TaskLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findMany: {
            args: Prisma.TaskLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          create: {
            args: Prisma.TaskLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          createMany: {
            args: Prisma.TaskLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          delete: {
            args: Prisma.TaskLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          update: {
            args: Prisma.TaskLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          deleteMany: {
            args: Prisma.TaskLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          upsert: {
            args: Prisma.TaskLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          aggregate: {
            args: Prisma.TaskLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskLog>
          }
          groupBy: {
            args: Prisma.TaskLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskLogCountArgs<ExtArgs>
            result: $Utils.Optional<TaskLogCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Memo: {
        payload: Prisma.$MemoPayload<ExtArgs>
        fields: Prisma.MemoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          findFirst: {
            args: Prisma.MemoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          findMany: {
            args: Prisma.MemoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          create: {
            args: Prisma.MemoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          createMany: {
            args: Prisma.MemoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          delete: {
            args: Prisma.MemoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          update: {
            args: Prisma.MemoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          deleteMany: {
            args: Prisma.MemoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>[]
          }
          upsert: {
            args: Prisma.MemoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoPayload>
          }
          aggregate: {
            args: Prisma.MemoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemo>
          }
          groupBy: {
            args: Prisma.MemoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoCountArgs<ExtArgs>
            result: $Utils.Optional<MemoCountAggregateOutputType> | number
          }
        }
      }
      MemoTag: {
        payload: Prisma.$MemoTagPayload<ExtArgs>
        fields: Prisma.MemoTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          findFirst: {
            args: Prisma.MemoTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          findMany: {
            args: Prisma.MemoTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          create: {
            args: Prisma.MemoTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          createMany: {
            args: Prisma.MemoTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          delete: {
            args: Prisma.MemoTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          update: {
            args: Prisma.MemoTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          deleteMany: {
            args: Prisma.MemoTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>[]
          }
          upsert: {
            args: Prisma.MemoTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoTagPayload>
          }
          aggregate: {
            args: Prisma.MemoTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemoTag>
          }
          groupBy: {
            args: Prisma.MemoTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoTagCountArgs<ExtArgs>
            result: $Utils.Optional<MemoTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    dailyData?: DailyDataOmit
    taskLog?: TaskLogOmit
    task?: TaskOmit
    category?: CategoryOmit
    memo?: MemoOmit
    memoTag?: MemoTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DailyDataCountOutputType
   */

  export type DailyDataCountOutputType = {
    logs: number
  }

  export type DailyDataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | DailyDataCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * DailyDataCountOutputType without action
   */
  export type DailyDataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyDataCountOutputType
     */
    select?: DailyDataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DailyDataCountOutputType without action
   */
  export type DailyDataCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }


  /**
   * Count Type TaskLogCountOutputType
   */

  export type TaskLogCountOutputType = {
    memos: number
  }

  export type TaskLogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | TaskLogCountOutputTypeCountMemosArgs
  }

  // Custom InputTypes
  /**
   * TaskLogCountOutputType without action
   */
  export type TaskLogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLogCountOutputType
     */
    select?: TaskLogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskLogCountOutputType without action
   */
  export type TaskLogCountOutputTypeCountMemosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    tasks: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | TaskCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    tasks: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | CategoryCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type MemoTagCountOutputType
   */

  export type MemoTagCountOutputType = {
    memos: number
  }

  export type MemoTagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | MemoTagCountOutputTypeCountMemosArgs
  }

  // Custom InputTypes
  /**
   * MemoTagCountOutputType without action
   */
  export type MemoTagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTagCountOutputType
     */
    select?: MemoTagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemoTagCountOutputType without action
   */
  export type MemoTagCountOutputTypeCountMemosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DailyData
   */

  export type AggregateDailyData = {
    _count: DailyDataCountAggregateOutputType | null
    _min: DailyDataMinAggregateOutputType | null
    _max: DailyDataMaxAggregateOutputType | null
  }

  export type DailyDataMinAggregateOutputType = {
    date: Date | null
  }

  export type DailyDataMaxAggregateOutputType = {
    date: Date | null
  }

  export type DailyDataCountAggregateOutputType = {
    date: number
    _all: number
  }


  export type DailyDataMinAggregateInputType = {
    date?: true
  }

  export type DailyDataMaxAggregateInputType = {
    date?: true
  }

  export type DailyDataCountAggregateInputType = {
    date?: true
    _all?: true
  }

  export type DailyDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyData to aggregate.
     */
    where?: DailyDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyData to fetch.
     */
    orderBy?: DailyDataOrderByWithRelationInput | DailyDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyData
    **/
    _count?: true | DailyDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyDataMaxAggregateInputType
  }

  export type GetDailyDataAggregateType<T extends DailyDataAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyData[P]>
      : GetScalarType<T[P], AggregateDailyData[P]>
  }




  export type DailyDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyDataWhereInput
    orderBy?: DailyDataOrderByWithAggregationInput | DailyDataOrderByWithAggregationInput[]
    by: DailyDataScalarFieldEnum[] | DailyDataScalarFieldEnum
    having?: DailyDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyDataCountAggregateInputType | true
    _min?: DailyDataMinAggregateInputType
    _max?: DailyDataMaxAggregateInputType
  }

  export type DailyDataGroupByOutputType = {
    date: Date
    _count: DailyDataCountAggregateOutputType | null
    _min: DailyDataMinAggregateOutputType | null
    _max: DailyDataMaxAggregateOutputType | null
  }

  type GetDailyDataGroupByPayload<T extends DailyDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyDataGroupByOutputType[P]>
            : GetScalarType<T[P], DailyDataGroupByOutputType[P]>
        }
      >
    >


  export type DailyDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    logs?: boolean | DailyData$logsArgs<ExtArgs>
    _count?: boolean | DailyDataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyData"]>

  export type DailyDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
  }, ExtArgs["result"]["dailyData"]>

  export type DailyDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
  }, ExtArgs["result"]["dailyData"]>

  export type DailyDataSelectScalar = {
    date?: boolean
  }

  export type DailyDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"date", ExtArgs["result"]["dailyData"]>
  export type DailyDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | DailyData$logsArgs<ExtArgs>
    _count?: boolean | DailyDataCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DailyDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DailyDataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DailyDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyData"
    objects: {
      logs: Prisma.$TaskLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      date: Date
    }, ExtArgs["result"]["dailyData"]>
    composites: {}
  }

  type DailyDataGetPayload<S extends boolean | null | undefined | DailyDataDefaultArgs> = $Result.GetResult<Prisma.$DailyDataPayload, S>

  type DailyDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyDataCountAggregateInputType | true
    }

  export interface DailyDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyData'], meta: { name: 'DailyData' } }
    /**
     * Find zero or one DailyData that matches the filter.
     * @param {DailyDataFindUniqueArgs} args - Arguments to find a DailyData
     * @example
     * // Get one DailyData
     * const dailyData = await prisma.dailyData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyDataFindUniqueArgs>(args: SelectSubset<T, DailyDataFindUniqueArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyDataFindUniqueOrThrowArgs} args - Arguments to find a DailyData
     * @example
     * // Get one DailyData
     * const dailyData = await prisma.dailyData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyDataFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataFindFirstArgs} args - Arguments to find a DailyData
     * @example
     * // Get one DailyData
     * const dailyData = await prisma.dailyData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyDataFindFirstArgs>(args?: SelectSubset<T, DailyDataFindFirstArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataFindFirstOrThrowArgs} args - Arguments to find a DailyData
     * @example
     * // Get one DailyData
     * const dailyData = await prisma.dailyData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyDataFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyData
     * const dailyData = await prisma.dailyData.findMany()
     * 
     * // Get first 10 DailyData
     * const dailyData = await prisma.dailyData.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const dailyDataWithDateOnly = await prisma.dailyData.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends DailyDataFindManyArgs>(args?: SelectSubset<T, DailyDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyData.
     * @param {DailyDataCreateArgs} args - Arguments to create a DailyData.
     * @example
     * // Create one DailyData
     * const DailyData = await prisma.dailyData.create({
     *   data: {
     *     // ... data to create a DailyData
     *   }
     * })
     * 
     */
    create<T extends DailyDataCreateArgs>(args: SelectSubset<T, DailyDataCreateArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyData.
     * @param {DailyDataCreateManyArgs} args - Arguments to create many DailyData.
     * @example
     * // Create many DailyData
     * const dailyData = await prisma.dailyData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyDataCreateManyArgs>(args?: SelectSubset<T, DailyDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyData and returns the data saved in the database.
     * @param {DailyDataCreateManyAndReturnArgs} args - Arguments to create many DailyData.
     * @example
     * // Create many DailyData
     * const dailyData = await prisma.dailyData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyData and only return the `date`
     * const dailyDataWithDateOnly = await prisma.dailyData.createManyAndReturn({
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyDataCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyData.
     * @param {DailyDataDeleteArgs} args - Arguments to delete one DailyData.
     * @example
     * // Delete one DailyData
     * const DailyData = await prisma.dailyData.delete({
     *   where: {
     *     // ... filter to delete one DailyData
     *   }
     * })
     * 
     */
    delete<T extends DailyDataDeleteArgs>(args: SelectSubset<T, DailyDataDeleteArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyData.
     * @param {DailyDataUpdateArgs} args - Arguments to update one DailyData.
     * @example
     * // Update one DailyData
     * const dailyData = await prisma.dailyData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyDataUpdateArgs>(args: SelectSubset<T, DailyDataUpdateArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyData.
     * @param {DailyDataDeleteManyArgs} args - Arguments to filter DailyData to delete.
     * @example
     * // Delete a few DailyData
     * const { count } = await prisma.dailyData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyDataDeleteManyArgs>(args?: SelectSubset<T, DailyDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyData
     * const dailyData = await prisma.dailyData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyDataUpdateManyArgs>(args: SelectSubset<T, DailyDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyData and returns the data updated in the database.
     * @param {DailyDataUpdateManyAndReturnArgs} args - Arguments to update many DailyData.
     * @example
     * // Update many DailyData
     * const dailyData = await prisma.dailyData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyData and only return the `date`
     * const dailyDataWithDateOnly = await prisma.dailyData.updateManyAndReturn({
     *   select: { date: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyDataUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyData.
     * @param {DailyDataUpsertArgs} args - Arguments to update or create a DailyData.
     * @example
     * // Update or create a DailyData
     * const dailyData = await prisma.dailyData.upsert({
     *   create: {
     *     // ... data to create a DailyData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyData we want to update
     *   }
     * })
     */
    upsert<T extends DailyDataUpsertArgs>(args: SelectSubset<T, DailyDataUpsertArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataCountArgs} args - Arguments to filter DailyData to count.
     * @example
     * // Count the number of DailyData
     * const count = await prisma.dailyData.count({
     *   where: {
     *     // ... the filter for the DailyData we want to count
     *   }
     * })
    **/
    count<T extends DailyDataCountArgs>(
      args?: Subset<T, DailyDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyDataAggregateArgs>(args: Subset<T, DailyDataAggregateArgs>): Prisma.PrismaPromise<GetDailyDataAggregateType<T>>

    /**
     * Group by DailyData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyDataGroupByArgs['orderBy'] }
        : { orderBy?: DailyDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyData model
   */
  readonly fields: DailyDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends DailyData$logsArgs<ExtArgs> = {}>(args?: Subset<T, DailyData$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyData model
   */
  interface DailyDataFieldRefs {
    readonly date: FieldRef<"DailyData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyData findUnique
   */
  export type DailyDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter, which DailyData to fetch.
     */
    where: DailyDataWhereUniqueInput
  }

  /**
   * DailyData findUniqueOrThrow
   */
  export type DailyDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter, which DailyData to fetch.
     */
    where: DailyDataWhereUniqueInput
  }

  /**
   * DailyData findFirst
   */
  export type DailyDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter, which DailyData to fetch.
     */
    where?: DailyDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyData to fetch.
     */
    orderBy?: DailyDataOrderByWithRelationInput | DailyDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyData.
     */
    cursor?: DailyDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyData.
     */
    distinct?: DailyDataScalarFieldEnum | DailyDataScalarFieldEnum[]
  }

  /**
   * DailyData findFirstOrThrow
   */
  export type DailyDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter, which DailyData to fetch.
     */
    where?: DailyDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyData to fetch.
     */
    orderBy?: DailyDataOrderByWithRelationInput | DailyDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyData.
     */
    cursor?: DailyDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyData.
     */
    distinct?: DailyDataScalarFieldEnum | DailyDataScalarFieldEnum[]
  }

  /**
   * DailyData findMany
   */
  export type DailyDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter, which DailyData to fetch.
     */
    where?: DailyDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyData to fetch.
     */
    orderBy?: DailyDataOrderByWithRelationInput | DailyDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyData.
     */
    cursor?: DailyDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyData.
     */
    skip?: number
    distinct?: DailyDataScalarFieldEnum | DailyDataScalarFieldEnum[]
  }

  /**
   * DailyData create
   */
  export type DailyDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyData.
     */
    data: XOR<DailyDataCreateInput, DailyDataUncheckedCreateInput>
  }

  /**
   * DailyData createMany
   */
  export type DailyDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyData.
     */
    data: DailyDataCreateManyInput | DailyDataCreateManyInput[]
  }

  /**
   * DailyData createManyAndReturn
   */
  export type DailyDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * The data used to create many DailyData.
     */
    data: DailyDataCreateManyInput | DailyDataCreateManyInput[]
  }

  /**
   * DailyData update
   */
  export type DailyDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyData.
     */
    data: XOR<DailyDataUpdateInput, DailyDataUncheckedUpdateInput>
    /**
     * Choose, which DailyData to update.
     */
    where: DailyDataWhereUniqueInput
  }

  /**
   * DailyData updateMany
   */
  export type DailyDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyData.
     */
    data: XOR<DailyDataUpdateManyMutationInput, DailyDataUncheckedUpdateManyInput>
    /**
     * Filter which DailyData to update
     */
    where?: DailyDataWhereInput
    /**
     * Limit how many DailyData to update.
     */
    limit?: number
  }

  /**
   * DailyData updateManyAndReturn
   */
  export type DailyDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * The data used to update DailyData.
     */
    data: XOR<DailyDataUpdateManyMutationInput, DailyDataUncheckedUpdateManyInput>
    /**
     * Filter which DailyData to update
     */
    where?: DailyDataWhereInput
    /**
     * Limit how many DailyData to update.
     */
    limit?: number
  }

  /**
   * DailyData upsert
   */
  export type DailyDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyData to update in case it exists.
     */
    where: DailyDataWhereUniqueInput
    /**
     * In case the DailyData found by the `where` argument doesn't exist, create a new DailyData with this data.
     */
    create: XOR<DailyDataCreateInput, DailyDataUncheckedCreateInput>
    /**
     * In case the DailyData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyDataUpdateInput, DailyDataUncheckedUpdateInput>
  }

  /**
   * DailyData delete
   */
  export type DailyDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
    /**
     * Filter which DailyData to delete.
     */
    where: DailyDataWhereUniqueInput
  }

  /**
   * DailyData deleteMany
   */
  export type DailyDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyData to delete
     */
    where?: DailyDataWhereInput
    /**
     * Limit how many DailyData to delete.
     */
    limit?: number
  }

  /**
   * DailyData.logs
   */
  export type DailyData$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * DailyData without action
   */
  export type DailyDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyData
     */
    select?: DailyDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyData
     */
    omit?: DailyDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyDataInclude<ExtArgs> | null
  }


  /**
   * Model TaskLog
   */

  export type AggregateTaskLog = {
    _count: TaskLogCountAggregateOutputType | null
    _avg: TaskLogAvgAggregateOutputType | null
    _sum: TaskLogSumAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  export type TaskLogAvgAggregateOutputType = {
    id: number | null
    taskId: number | null
    workTime: number | null
  }

  export type TaskLogSumAggregateOutputType = {
    id: number | null
    taskId: number | null
    workTime: number | null
  }

  export type TaskLogMinAggregateOutputType = {
    id: number | null
    taskId: number | null
    date: Date | null
    workTime: number | null
  }

  export type TaskLogMaxAggregateOutputType = {
    id: number | null
    taskId: number | null
    date: Date | null
    workTime: number | null
  }

  export type TaskLogCountAggregateOutputType = {
    id: number
    taskId: number
    date: number
    workTime: number
    _all: number
  }


  export type TaskLogAvgAggregateInputType = {
    id?: true
    taskId?: true
    workTime?: true
  }

  export type TaskLogSumAggregateInputType = {
    id?: true
    taskId?: true
    workTime?: true
  }

  export type TaskLogMinAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    workTime?: true
  }

  export type TaskLogMaxAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    workTime?: true
  }

  export type TaskLogCountAggregateInputType = {
    id?: true
    taskId?: true
    date?: true
    workTime?: true
    _all?: true
  }

  export type TaskLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLog to aggregate.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskLogs
    **/
    _count?: true | TaskLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskLogMaxAggregateInputType
  }

  export type GetTaskLogAggregateType<T extends TaskLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskLog[P]>
      : GetScalarType<T[P], AggregateTaskLog[P]>
  }




  export type TaskLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithAggregationInput | TaskLogOrderByWithAggregationInput[]
    by: TaskLogScalarFieldEnum[] | TaskLogScalarFieldEnum
    having?: TaskLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskLogCountAggregateInputType | true
    _avg?: TaskLogAvgAggregateInputType
    _sum?: TaskLogSumAggregateInputType
    _min?: TaskLogMinAggregateInputType
    _max?: TaskLogMaxAggregateInputType
  }

  export type TaskLogGroupByOutputType = {
    id: number
    taskId: number
    date: Date
    workTime: number
    _count: TaskLogCountAggregateOutputType | null
    _avg: TaskLogAvgAggregateOutputType | null
    _sum: TaskLogSumAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  type GetTaskLogGroupByPayload<T extends TaskLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
            : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
        }
      >
    >


  export type TaskLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    workTime?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
    memos?: boolean | TaskLog$memosArgs<ExtArgs>
    _count?: boolean | TaskLogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    workTime?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    date?: boolean
    workTime?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectScalar = {
    id?: boolean
    taskId?: boolean
    date?: boolean
    workTime?: boolean
  }

  export type TaskLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "date" | "workTime", ExtArgs["result"]["taskLog"]>
  export type TaskLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
    memos?: boolean | TaskLog$memosArgs<ExtArgs>
    _count?: boolean | TaskLogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    dailyData?: boolean | DailyDataDefaultArgs<ExtArgs>
  }

  export type $TaskLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskLog"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      dailyData: Prisma.$DailyDataPayload<ExtArgs>
      memos: Prisma.$MemoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: number
      date: Date
      workTime: number
    }, ExtArgs["result"]["taskLog"]>
    composites: {}
  }

  type TaskLogGetPayload<S extends boolean | null | undefined | TaskLogDefaultArgs> = $Result.GetResult<Prisma.$TaskLogPayload, S>

  type TaskLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskLogCountAggregateInputType | true
    }

  export interface TaskLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskLog'], meta: { name: 'TaskLog' } }
    /**
     * Find zero or one TaskLog that matches the filter.
     * @param {TaskLogFindUniqueArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskLogFindUniqueArgs>(args: SelectSubset<T, TaskLogFindUniqueArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskLogFindUniqueOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskLogFindFirstArgs>(args?: SelectSubset<T, TaskLogFindFirstArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskLogs
     * const taskLogs = await prisma.taskLog.findMany()
     * 
     * // Get first 10 TaskLogs
     * const taskLogs = await prisma.taskLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskLogFindManyArgs>(args?: SelectSubset<T, TaskLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskLog.
     * @param {TaskLogCreateArgs} args - Arguments to create a TaskLog.
     * @example
     * // Create one TaskLog
     * const TaskLog = await prisma.taskLog.create({
     *   data: {
     *     // ... data to create a TaskLog
     *   }
     * })
     * 
     */
    create<T extends TaskLogCreateArgs>(args: SelectSubset<T, TaskLogCreateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskLogs.
     * @param {TaskLogCreateManyArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskLogCreateManyArgs>(args?: SelectSubset<T, TaskLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskLogs and returns the data saved in the database.
     * @param {TaskLogCreateManyAndReturnArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskLog.
     * @param {TaskLogDeleteArgs} args - Arguments to delete one TaskLog.
     * @example
     * // Delete one TaskLog
     * const TaskLog = await prisma.taskLog.delete({
     *   where: {
     *     // ... filter to delete one TaskLog
     *   }
     * })
     * 
     */
    delete<T extends TaskLogDeleteArgs>(args: SelectSubset<T, TaskLogDeleteArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskLog.
     * @param {TaskLogUpdateArgs} args - Arguments to update one TaskLog.
     * @example
     * // Update one TaskLog
     * const taskLog = await prisma.taskLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskLogUpdateArgs>(args: SelectSubset<T, TaskLogUpdateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskLogs.
     * @param {TaskLogDeleteManyArgs} args - Arguments to filter TaskLogs to delete.
     * @example
     * // Delete a few TaskLogs
     * const { count } = await prisma.taskLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskLogDeleteManyArgs>(args?: SelectSubset<T, TaskLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskLogUpdateManyArgs>(args: SelectSubset<T, TaskLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs and returns the data updated in the database.
     * @param {TaskLogUpdateManyAndReturnArgs} args - Arguments to update many TaskLogs.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskLogUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskLog.
     * @param {TaskLogUpsertArgs} args - Arguments to update or create a TaskLog.
     * @example
     * // Update or create a TaskLog
     * const taskLog = await prisma.taskLog.upsert({
     *   create: {
     *     // ... data to create a TaskLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskLog we want to update
     *   }
     * })
     */
    upsert<T extends TaskLogUpsertArgs>(args: SelectSubset<T, TaskLogUpsertArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogCountArgs} args - Arguments to filter TaskLogs to count.
     * @example
     * // Count the number of TaskLogs
     * const count = await prisma.taskLog.count({
     *   where: {
     *     // ... the filter for the TaskLogs we want to count
     *   }
     * })
    **/
    count<T extends TaskLogCountArgs>(
      args?: Subset<T, TaskLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskLogAggregateArgs>(args: Subset<T, TaskLogAggregateArgs>): Prisma.PrismaPromise<GetTaskLogAggregateType<T>>

    /**
     * Group by TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskLogGroupByArgs['orderBy'] }
        : { orderBy?: TaskLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskLog model
   */
  readonly fields: TaskLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dailyData<T extends DailyDataDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DailyDataDefaultArgs<ExtArgs>>): Prisma__DailyDataClient<$Result.GetResult<Prisma.$DailyDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memos<T extends TaskLog$memosArgs<ExtArgs> = {}>(args?: Subset<T, TaskLog$memosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskLog model
   */
  interface TaskLogFieldRefs {
    readonly id: FieldRef<"TaskLog", 'Int'>
    readonly taskId: FieldRef<"TaskLog", 'Int'>
    readonly date: FieldRef<"TaskLog", 'DateTime'>
    readonly workTime: FieldRef<"TaskLog", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * TaskLog findUnique
   */
  export type TaskLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findUniqueOrThrow
   */
  export type TaskLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findFirst
   */
  export type TaskLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findFirstOrThrow
   */
  export type TaskLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findMany
   */
  export type TaskLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLogs to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog create
   */
  export type TaskLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskLog.
     */
    data: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
  }

  /**
   * TaskLog createMany
   */
  export type TaskLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
  }

  /**
   * TaskLog createManyAndReturn
   */
  export type TaskLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog update
   */
  export type TaskLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskLog.
     */
    data: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
    /**
     * Choose, which TaskLog to update.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog updateMany
   */
  export type TaskLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to update.
     */
    limit?: number
  }

  /**
   * TaskLog updateManyAndReturn
   */
  export type TaskLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog upsert
   */
  export type TaskLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskLog to update in case it exists.
     */
    where: TaskLogWhereUniqueInput
    /**
     * In case the TaskLog found by the `where` argument doesn't exist, create a new TaskLog with this data.
     */
    create: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
    /**
     * In case the TaskLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
  }

  /**
   * TaskLog delete
   */
  export type TaskLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter which TaskLog to delete.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog deleteMany
   */
  export type TaskLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLogs to delete
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to delete.
     */
    limit?: number
  }

  /**
   * TaskLog.memos
   */
  export type TaskLog$memosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    where?: MemoWhereInput
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    cursor?: MemoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * TaskLog without action
   */
  export type TaskLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    progress: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    progress: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    name: string | null
    categoryId: number | null
    progress: number | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    name: string | null
    categoryId: number | null
    progress: number | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    name: number
    categoryId: number
    progress: number
    isFavorite: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    categoryId?: true
    progress?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    categoryId?: true
    progress?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    progress?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    progress?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    name?: true
    categoryId?: true
    progress?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    name: string
    categoryId: number
    progress: number
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    categoryId?: boolean
    progress?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    tasks?: boolean | Task$tasksArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    categoryId?: boolean
    progress?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    categoryId?: boolean
    progress?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    name?: boolean
    categoryId?: boolean
    progress?: boolean
    isFavorite?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "categoryId" | "progress" | "isFavorite" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    tasks?: boolean | Task$tasksArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      tasks: Prisma.$TaskLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      categoryId: number
      progress: number
      isFavorite: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Task$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly name: FieldRef<"Task", 'String'>
    readonly categoryId: FieldRef<"Task", 'Int'>
    readonly progress: FieldRef<"Task", 'Int'>
    readonly isFavorite: FieldRef<"Task", 'Boolean'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.tasks
   */
  export type Task$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tasks?: boolean | Category$tasksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Category$tasksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Category$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Category$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.tasks
   */
  export type Category$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Memo
   */

  export type AggregateMemo = {
    _count: MemoCountAggregateOutputType | null
    _avg: MemoAvgAggregateOutputType | null
    _sum: MemoSumAggregateOutputType | null
    _min: MemoMinAggregateOutputType | null
    _max: MemoMaxAggregateOutputType | null
  }

  export type MemoAvgAggregateOutputType = {
    id: number | null
    taskLogId: number | null
    tagId: number | null
  }

  export type MemoSumAggregateOutputType = {
    id: number | null
    taskLogId: number | null
    tagId: number | null
  }

  export type MemoMinAggregateOutputType = {
    id: number | null
    title: string | null
    text: string | null
    taskLogId: number | null
    tagId: number | null
  }

  export type MemoMaxAggregateOutputType = {
    id: number | null
    title: string | null
    text: string | null
    taskLogId: number | null
    tagId: number | null
  }

  export type MemoCountAggregateOutputType = {
    id: number
    title: number
    text: number
    taskLogId: number
    tagId: number
    _all: number
  }


  export type MemoAvgAggregateInputType = {
    id?: true
    taskLogId?: true
    tagId?: true
  }

  export type MemoSumAggregateInputType = {
    id?: true
    taskLogId?: true
    tagId?: true
  }

  export type MemoMinAggregateInputType = {
    id?: true
    title?: true
    text?: true
    taskLogId?: true
    tagId?: true
  }

  export type MemoMaxAggregateInputType = {
    id?: true
    title?: true
    text?: true
    taskLogId?: true
    tagId?: true
  }

  export type MemoCountAggregateInputType = {
    id?: true
    title?: true
    text?: true
    taskLogId?: true
    tagId?: true
    _all?: true
  }

  export type MemoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memo to aggregate.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memos
    **/
    _count?: true | MemoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoMaxAggregateInputType
  }

  export type GetMemoAggregateType<T extends MemoAggregateArgs> = {
        [P in keyof T & keyof AggregateMemo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemo[P]>
      : GetScalarType<T[P], AggregateMemo[P]>
  }




  export type MemoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoWhereInput
    orderBy?: MemoOrderByWithAggregationInput | MemoOrderByWithAggregationInput[]
    by: MemoScalarFieldEnum[] | MemoScalarFieldEnum
    having?: MemoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoCountAggregateInputType | true
    _avg?: MemoAvgAggregateInputType
    _sum?: MemoSumAggregateInputType
    _min?: MemoMinAggregateInputType
    _max?: MemoMaxAggregateInputType
  }

  export type MemoGroupByOutputType = {
    id: number
    title: string
    text: string
    taskLogId: number
    tagId: number | null
    _count: MemoCountAggregateOutputType | null
    _avg: MemoAvgAggregateOutputType | null
    _sum: MemoSumAggregateOutputType | null
    _min: MemoMinAggregateOutputType | null
    _max: MemoMaxAggregateOutputType | null
  }

  type GetMemoGroupByPayload<T extends MemoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoGroupByOutputType[P]>
            : GetScalarType<T[P], MemoGroupByOutputType[P]>
        }
      >
    >


  export type MemoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    text?: boolean
    taskLogId?: boolean
    tagId?: boolean
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    text?: boolean
    taskLogId?: boolean
    tagId?: boolean
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    text?: boolean
    taskLogId?: boolean
    tagId?: boolean
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }, ExtArgs["result"]["memo"]>

  export type MemoSelectScalar = {
    id?: boolean
    title?: boolean
    text?: boolean
    taskLogId?: boolean
    tagId?: boolean
  }

  export type MemoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "text" | "taskLogId" | "tagId", ExtArgs["result"]["memo"]>
  export type MemoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }
  export type MemoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }
  export type MemoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskLog?: boolean | TaskLogDefaultArgs<ExtArgs>
    tag?: boolean | Memo$tagArgs<ExtArgs>
  }

  export type $MemoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Memo"
    objects: {
      taskLog: Prisma.$TaskLogPayload<ExtArgs>
      tag: Prisma.$MemoTagPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      text: string
      taskLogId: number
      tagId: number | null
    }, ExtArgs["result"]["memo"]>
    composites: {}
  }

  type MemoGetPayload<S extends boolean | null | undefined | MemoDefaultArgs> = $Result.GetResult<Prisma.$MemoPayload, S>

  type MemoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoCountAggregateInputType | true
    }

  export interface MemoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Memo'], meta: { name: 'Memo' } }
    /**
     * Find zero or one Memo that matches the filter.
     * @param {MemoFindUniqueArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoFindUniqueArgs>(args: SelectSubset<T, MemoFindUniqueArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Memo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoFindUniqueOrThrowArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindFirstArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoFindFirstArgs>(args?: SelectSubset<T, MemoFindFirstArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindFirstOrThrowArgs} args - Arguments to find a Memo
     * @example
     * // Get one Memo
     * const memo = await prisma.memo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memos
     * const memos = await prisma.memo.findMany()
     * 
     * // Get first 10 Memos
     * const memos = await prisma.memo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoWithIdOnly = await prisma.memo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoFindManyArgs>(args?: SelectSubset<T, MemoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Memo.
     * @param {MemoCreateArgs} args - Arguments to create a Memo.
     * @example
     * // Create one Memo
     * const Memo = await prisma.memo.create({
     *   data: {
     *     // ... data to create a Memo
     *   }
     * })
     * 
     */
    create<T extends MemoCreateArgs>(args: SelectSubset<T, MemoCreateArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memos.
     * @param {MemoCreateManyArgs} args - Arguments to create many Memos.
     * @example
     * // Create many Memos
     * const memo = await prisma.memo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoCreateManyArgs>(args?: SelectSubset<T, MemoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memos and returns the data saved in the database.
     * @param {MemoCreateManyAndReturnArgs} args - Arguments to create many Memos.
     * @example
     * // Create many Memos
     * const memo = await prisma.memo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memos and only return the `id`
     * const memoWithIdOnly = await prisma.memo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Memo.
     * @param {MemoDeleteArgs} args - Arguments to delete one Memo.
     * @example
     * // Delete one Memo
     * const Memo = await prisma.memo.delete({
     *   where: {
     *     // ... filter to delete one Memo
     *   }
     * })
     * 
     */
    delete<T extends MemoDeleteArgs>(args: SelectSubset<T, MemoDeleteArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Memo.
     * @param {MemoUpdateArgs} args - Arguments to update one Memo.
     * @example
     * // Update one Memo
     * const memo = await prisma.memo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoUpdateArgs>(args: SelectSubset<T, MemoUpdateArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memos.
     * @param {MemoDeleteManyArgs} args - Arguments to filter Memos to delete.
     * @example
     * // Delete a few Memos
     * const { count } = await prisma.memo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoDeleteManyArgs>(args?: SelectSubset<T, MemoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memos
     * const memo = await prisma.memo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoUpdateManyArgs>(args: SelectSubset<T, MemoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memos and returns the data updated in the database.
     * @param {MemoUpdateManyAndReturnArgs} args - Arguments to update many Memos.
     * @example
     * // Update many Memos
     * const memo = await prisma.memo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memos and only return the `id`
     * const memoWithIdOnly = await prisma.memo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Memo.
     * @param {MemoUpsertArgs} args - Arguments to update or create a Memo.
     * @example
     * // Update or create a Memo
     * const memo = await prisma.memo.upsert({
     *   create: {
     *     // ... data to create a Memo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Memo we want to update
     *   }
     * })
     */
    upsert<T extends MemoUpsertArgs>(args: SelectSubset<T, MemoUpsertArgs<ExtArgs>>): Prisma__MemoClient<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoCountArgs} args - Arguments to filter Memos to count.
     * @example
     * // Count the number of Memos
     * const count = await prisma.memo.count({
     *   where: {
     *     // ... the filter for the Memos we want to count
     *   }
     * })
    **/
    count<T extends MemoCountArgs>(
      args?: Subset<T, MemoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Memo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoAggregateArgs>(args: Subset<T, MemoAggregateArgs>): Prisma.PrismaPromise<GetMemoAggregateType<T>>

    /**
     * Group by Memo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoGroupByArgs['orderBy'] }
        : { orderBy?: MemoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Memo model
   */
  readonly fields: MemoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Memo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    taskLog<T extends TaskLogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskLogDefaultArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends Memo$tagArgs<ExtArgs> = {}>(args?: Subset<T, Memo$tagArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Memo model
   */
  interface MemoFieldRefs {
    readonly id: FieldRef<"Memo", 'Int'>
    readonly title: FieldRef<"Memo", 'String'>
    readonly text: FieldRef<"Memo", 'String'>
    readonly taskLogId: FieldRef<"Memo", 'Int'>
    readonly tagId: FieldRef<"Memo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Memo findUnique
   */
  export type MemoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo findUniqueOrThrow
   */
  export type MemoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo findFirst
   */
  export type MemoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memos.
     */
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo findFirstOrThrow
   */
  export type MemoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memo to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memos.
     */
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo findMany
   */
  export type MemoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter, which Memos to fetch.
     */
    where?: MemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memos to fetch.
     */
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memos.
     */
    cursor?: MemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memos.
     */
    skip?: number
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * Memo create
   */
  export type MemoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The data needed to create a Memo.
     */
    data: XOR<MemoCreateInput, MemoUncheckedCreateInput>
  }

  /**
   * Memo createMany
   */
  export type MemoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memos.
     */
    data: MemoCreateManyInput | MemoCreateManyInput[]
  }

  /**
   * Memo createManyAndReturn
   */
  export type MemoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * The data used to create many Memos.
     */
    data: MemoCreateManyInput | MemoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memo update
   */
  export type MemoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The data needed to update a Memo.
     */
    data: XOR<MemoUpdateInput, MemoUncheckedUpdateInput>
    /**
     * Choose, which Memo to update.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo updateMany
   */
  export type MemoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memos.
     */
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyInput>
    /**
     * Filter which Memos to update
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to update.
     */
    limit?: number
  }

  /**
   * Memo updateManyAndReturn
   */
  export type MemoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * The data used to update Memos.
     */
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyInput>
    /**
     * Filter which Memos to update
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Memo upsert
   */
  export type MemoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * The filter to search for the Memo to update in case it exists.
     */
    where: MemoWhereUniqueInput
    /**
     * In case the Memo found by the `where` argument doesn't exist, create a new Memo with this data.
     */
    create: XOR<MemoCreateInput, MemoUncheckedCreateInput>
    /**
     * In case the Memo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoUpdateInput, MemoUncheckedUpdateInput>
  }

  /**
   * Memo delete
   */
  export type MemoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    /**
     * Filter which Memo to delete.
     */
    where: MemoWhereUniqueInput
  }

  /**
   * Memo deleteMany
   */
  export type MemoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memos to delete
     */
    where?: MemoWhereInput
    /**
     * Limit how many Memos to delete.
     */
    limit?: number
  }

  /**
   * Memo.tag
   */
  export type Memo$tagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    where?: MemoTagWhereInput
  }

  /**
   * Memo without action
   */
  export type MemoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
  }


  /**
   * Model MemoTag
   */

  export type AggregateMemoTag = {
    _count: MemoTagCountAggregateOutputType | null
    _avg: MemoTagAvgAggregateOutputType | null
    _sum: MemoTagSumAggregateOutputType | null
    _min: MemoTagMinAggregateOutputType | null
    _max: MemoTagMaxAggregateOutputType | null
  }

  export type MemoTagAvgAggregateOutputType = {
    id: number | null
  }

  export type MemoTagSumAggregateOutputType = {
    id: number | null
  }

  export type MemoTagMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type MemoTagMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type MemoTagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type MemoTagAvgAggregateInputType = {
    id?: true
  }

  export type MemoTagSumAggregateInputType = {
    id?: true
  }

  export type MemoTagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type MemoTagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type MemoTagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type MemoTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoTag to aggregate.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemoTags
    **/
    _count?: true | MemoTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemoTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemoTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoTagMaxAggregateInputType
  }

  export type GetMemoTagAggregateType<T extends MemoTagAggregateArgs> = {
        [P in keyof T & keyof AggregateMemoTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemoTag[P]>
      : GetScalarType<T[P], AggregateMemoTag[P]>
  }




  export type MemoTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoTagWhereInput
    orderBy?: MemoTagOrderByWithAggregationInput | MemoTagOrderByWithAggregationInput[]
    by: MemoTagScalarFieldEnum[] | MemoTagScalarFieldEnum
    having?: MemoTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoTagCountAggregateInputType | true
    _avg?: MemoTagAvgAggregateInputType
    _sum?: MemoTagSumAggregateInputType
    _min?: MemoTagMinAggregateInputType
    _max?: MemoTagMaxAggregateInputType
  }

  export type MemoTagGroupByOutputType = {
    id: number
    name: string
    _count: MemoTagCountAggregateOutputType | null
    _avg: MemoTagAvgAggregateOutputType | null
    _sum: MemoTagSumAggregateOutputType | null
    _min: MemoTagMinAggregateOutputType | null
    _max: MemoTagMaxAggregateOutputType | null
  }

  type GetMemoTagGroupByPayload<T extends MemoTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoTagGroupByOutputType[P]>
            : GetScalarType<T[P], MemoTagGroupByOutputType[P]>
        }
      >
    >


  export type MemoTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    memos?: boolean | MemoTag$memosArgs<ExtArgs>
    _count?: boolean | MemoTagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["memoTag"]>

  export type MemoTagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type MemoTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["memoTag"]>
  export type MemoTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memos?: boolean | MemoTag$memosArgs<ExtArgs>
    _count?: boolean | MemoTagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemoTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MemoTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemoTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemoTag"
    objects: {
      memos: Prisma.$MemoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["memoTag"]>
    composites: {}
  }

  type MemoTagGetPayload<S extends boolean | null | undefined | MemoTagDefaultArgs> = $Result.GetResult<Prisma.$MemoTagPayload, S>

  type MemoTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoTagCountAggregateInputType | true
    }

  export interface MemoTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemoTag'], meta: { name: 'MemoTag' } }
    /**
     * Find zero or one MemoTag that matches the filter.
     * @param {MemoTagFindUniqueArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoTagFindUniqueArgs>(args: SelectSubset<T, MemoTagFindUniqueArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemoTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoTagFindUniqueOrThrowArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoTagFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindFirstArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoTagFindFirstArgs>(args?: SelectSubset<T, MemoTagFindFirstArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemoTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindFirstOrThrowArgs} args - Arguments to find a MemoTag
     * @example
     * // Get one MemoTag
     * const memoTag = await prisma.memoTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoTagFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemoTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemoTags
     * const memoTags = await prisma.memoTag.findMany()
     * 
     * // Get first 10 MemoTags
     * const memoTags = await prisma.memoTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoTagWithIdOnly = await prisma.memoTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoTagFindManyArgs>(args?: SelectSubset<T, MemoTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemoTag.
     * @param {MemoTagCreateArgs} args - Arguments to create a MemoTag.
     * @example
     * // Create one MemoTag
     * const MemoTag = await prisma.memoTag.create({
     *   data: {
     *     // ... data to create a MemoTag
     *   }
     * })
     * 
     */
    create<T extends MemoTagCreateArgs>(args: SelectSubset<T, MemoTagCreateArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemoTags.
     * @param {MemoTagCreateManyArgs} args - Arguments to create many MemoTags.
     * @example
     * // Create many MemoTags
     * const memoTag = await prisma.memoTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoTagCreateManyArgs>(args?: SelectSubset<T, MemoTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemoTags and returns the data saved in the database.
     * @param {MemoTagCreateManyAndReturnArgs} args - Arguments to create many MemoTags.
     * @example
     * // Create many MemoTags
     * const memoTag = await prisma.memoTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemoTags and only return the `id`
     * const memoTagWithIdOnly = await prisma.memoTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoTagCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemoTag.
     * @param {MemoTagDeleteArgs} args - Arguments to delete one MemoTag.
     * @example
     * // Delete one MemoTag
     * const MemoTag = await prisma.memoTag.delete({
     *   where: {
     *     // ... filter to delete one MemoTag
     *   }
     * })
     * 
     */
    delete<T extends MemoTagDeleteArgs>(args: SelectSubset<T, MemoTagDeleteArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemoTag.
     * @param {MemoTagUpdateArgs} args - Arguments to update one MemoTag.
     * @example
     * // Update one MemoTag
     * const memoTag = await prisma.memoTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoTagUpdateArgs>(args: SelectSubset<T, MemoTagUpdateArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemoTags.
     * @param {MemoTagDeleteManyArgs} args - Arguments to filter MemoTags to delete.
     * @example
     * // Delete a few MemoTags
     * const { count } = await prisma.memoTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoTagDeleteManyArgs>(args?: SelectSubset<T, MemoTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemoTags
     * const memoTag = await prisma.memoTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoTagUpdateManyArgs>(args: SelectSubset<T, MemoTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemoTags and returns the data updated in the database.
     * @param {MemoTagUpdateManyAndReturnArgs} args - Arguments to update many MemoTags.
     * @example
     * // Update many MemoTags
     * const memoTag = await prisma.memoTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemoTags and only return the `id`
     * const memoTagWithIdOnly = await prisma.memoTag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoTagUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemoTag.
     * @param {MemoTagUpsertArgs} args - Arguments to update or create a MemoTag.
     * @example
     * // Update or create a MemoTag
     * const memoTag = await prisma.memoTag.upsert({
     *   create: {
     *     // ... data to create a MemoTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemoTag we want to update
     *   }
     * })
     */
    upsert<T extends MemoTagUpsertArgs>(args: SelectSubset<T, MemoTagUpsertArgs<ExtArgs>>): Prisma__MemoTagClient<$Result.GetResult<Prisma.$MemoTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemoTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagCountArgs} args - Arguments to filter MemoTags to count.
     * @example
     * // Count the number of MemoTags
     * const count = await prisma.memoTag.count({
     *   where: {
     *     // ... the filter for the MemoTags we want to count
     *   }
     * })
    **/
    count<T extends MemoTagCountArgs>(
      args?: Subset<T, MemoTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoTagAggregateArgs>(args: Subset<T, MemoTagAggregateArgs>): Prisma.PrismaPromise<GetMemoTagAggregateType<T>>

    /**
     * Group by MemoTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoTagGroupByArgs['orderBy'] }
        : { orderBy?: MemoTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemoTag model
   */
  readonly fields: MemoTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemoTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memos<T extends MemoTag$memosArgs<ExtArgs> = {}>(args?: Subset<T, MemoTag$memosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemoTag model
   */
  interface MemoTagFieldRefs {
    readonly id: FieldRef<"MemoTag", 'Int'>
    readonly name: FieldRef<"MemoTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MemoTag findUnique
   */
  export type MemoTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag findUniqueOrThrow
   */
  export type MemoTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag findFirst
   */
  export type MemoTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoTags.
     */
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag findFirstOrThrow
   */
  export type MemoTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTag to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemoTags.
     */
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag findMany
   */
  export type MemoTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter, which MemoTags to fetch.
     */
    where?: MemoTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemoTags to fetch.
     */
    orderBy?: MemoTagOrderByWithRelationInput | MemoTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemoTags.
     */
    cursor?: MemoTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemoTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemoTags.
     */
    skip?: number
    distinct?: MemoTagScalarFieldEnum | MemoTagScalarFieldEnum[]
  }

  /**
   * MemoTag create
   */
  export type MemoTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The data needed to create a MemoTag.
     */
    data: XOR<MemoTagCreateInput, MemoTagUncheckedCreateInput>
  }

  /**
   * MemoTag createMany
   */
  export type MemoTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemoTags.
     */
    data: MemoTagCreateManyInput | MemoTagCreateManyInput[]
  }

  /**
   * MemoTag createManyAndReturn
   */
  export type MemoTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * The data used to create many MemoTags.
     */
    data: MemoTagCreateManyInput | MemoTagCreateManyInput[]
  }

  /**
   * MemoTag update
   */
  export type MemoTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The data needed to update a MemoTag.
     */
    data: XOR<MemoTagUpdateInput, MemoTagUncheckedUpdateInput>
    /**
     * Choose, which MemoTag to update.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag updateMany
   */
  export type MemoTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemoTags.
     */
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoTags to update
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to update.
     */
    limit?: number
  }

  /**
   * MemoTag updateManyAndReturn
   */
  export type MemoTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * The data used to update MemoTags.
     */
    data: XOR<MemoTagUpdateManyMutationInput, MemoTagUncheckedUpdateManyInput>
    /**
     * Filter which MemoTags to update
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to update.
     */
    limit?: number
  }

  /**
   * MemoTag upsert
   */
  export type MemoTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * The filter to search for the MemoTag to update in case it exists.
     */
    where: MemoTagWhereUniqueInput
    /**
     * In case the MemoTag found by the `where` argument doesn't exist, create a new MemoTag with this data.
     */
    create: XOR<MemoTagCreateInput, MemoTagUncheckedCreateInput>
    /**
     * In case the MemoTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoTagUpdateInput, MemoTagUncheckedUpdateInput>
  }

  /**
   * MemoTag delete
   */
  export type MemoTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
    /**
     * Filter which MemoTag to delete.
     */
    where: MemoTagWhereUniqueInput
  }

  /**
   * MemoTag deleteMany
   */
  export type MemoTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemoTags to delete
     */
    where?: MemoTagWhereInput
    /**
     * Limit how many MemoTags to delete.
     */
    limit?: number
  }

  /**
   * MemoTag.memos
   */
  export type MemoTag$memosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memo
     */
    select?: MemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memo
     */
    omit?: MemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoInclude<ExtArgs> | null
    where?: MemoWhereInput
    orderBy?: MemoOrderByWithRelationInput | MemoOrderByWithRelationInput[]
    cursor?: MemoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemoScalarFieldEnum | MemoScalarFieldEnum[]
  }

  /**
   * MemoTag without action
   */
  export type MemoTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemoTag
     */
    select?: MemoTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemoTag
     */
    omit?: MemoTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemoTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DailyDataScalarFieldEnum: {
    date: 'date'
  };

  export type DailyDataScalarFieldEnum = (typeof DailyDataScalarFieldEnum)[keyof typeof DailyDataScalarFieldEnum]


  export const TaskLogScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    date: 'date',
    workTime: 'workTime'
  };

  export type TaskLogScalarFieldEnum = (typeof TaskLogScalarFieldEnum)[keyof typeof TaskLogScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    name: 'name',
    categoryId: 'categoryId',
    progress: 'progress',
    isFavorite: 'isFavorite',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const MemoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    text: 'text',
    taskLogId: 'taskLogId',
    tagId: 'tagId'
  };

  export type MemoScalarFieldEnum = (typeof MemoScalarFieldEnum)[keyof typeof MemoScalarFieldEnum]


  export const MemoTagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type MemoTagScalarFieldEnum = (typeof MemoTagScalarFieldEnum)[keyof typeof MemoTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type DailyDataWhereInput = {
    AND?: DailyDataWhereInput | DailyDataWhereInput[]
    OR?: DailyDataWhereInput[]
    NOT?: DailyDataWhereInput | DailyDataWhereInput[]
    date?: DateTimeFilter<"DailyData"> | Date | string
    logs?: TaskLogListRelationFilter
  }

  export type DailyDataOrderByWithRelationInput = {
    date?: SortOrder
    logs?: TaskLogOrderByRelationAggregateInput
  }

  export type DailyDataWhereUniqueInput = Prisma.AtLeast<{
    date?: Date | string
    AND?: DailyDataWhereInput | DailyDataWhereInput[]
    OR?: DailyDataWhereInput[]
    NOT?: DailyDataWhereInput | DailyDataWhereInput[]
    logs?: TaskLogListRelationFilter
  }, "date">

  export type DailyDataOrderByWithAggregationInput = {
    date?: SortOrder
    _count?: DailyDataCountOrderByAggregateInput
    _max?: DailyDataMaxOrderByAggregateInput
    _min?: DailyDataMinOrderByAggregateInput
  }

  export type DailyDataScalarWhereWithAggregatesInput = {
    AND?: DailyDataScalarWhereWithAggregatesInput | DailyDataScalarWhereWithAggregatesInput[]
    OR?: DailyDataScalarWhereWithAggregatesInput[]
    NOT?: DailyDataScalarWhereWithAggregatesInput | DailyDataScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"DailyData"> | Date | string
  }

  export type TaskLogWhereInput = {
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    id?: IntFilter<"TaskLog"> | number
    taskId?: IntFilter<"TaskLog"> | number
    date?: DateTimeFilter<"TaskLog"> | Date | string
    workTime?: FloatFilter<"TaskLog"> | number
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    dailyData?: XOR<DailyDataScalarRelationFilter, DailyDataWhereInput>
    memos?: MemoListRelationFilter
  }

  export type TaskLogOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    workTime?: SortOrder
    task?: TaskOrderByWithRelationInput
    dailyData?: DailyDataOrderByWithRelationInput
    memos?: MemoOrderByRelationAggregateInput
  }

  export type TaskLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    taskId?: IntFilter<"TaskLog"> | number
    date?: DateTimeFilter<"TaskLog"> | Date | string
    workTime?: FloatFilter<"TaskLog"> | number
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    dailyData?: XOR<DailyDataScalarRelationFilter, DailyDataWhereInput>
    memos?: MemoListRelationFilter
  }, "id">

  export type TaskLogOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    workTime?: SortOrder
    _count?: TaskLogCountOrderByAggregateInput
    _avg?: TaskLogAvgOrderByAggregateInput
    _max?: TaskLogMaxOrderByAggregateInput
    _min?: TaskLogMinOrderByAggregateInput
    _sum?: TaskLogSumOrderByAggregateInput
  }

  export type TaskLogScalarWhereWithAggregatesInput = {
    AND?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    OR?: TaskLogScalarWhereWithAggregatesInput[]
    NOT?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TaskLog"> | number
    taskId?: IntWithAggregatesFilter<"TaskLog"> | number
    date?: DateTimeWithAggregatesFilter<"TaskLog"> | Date | string
    workTime?: FloatWithAggregatesFilter<"TaskLog"> | number
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    name?: StringFilter<"Task"> | string
    categoryId?: IntFilter<"Task"> | number
    progress?: IntFilter<"Task"> | number
    isFavorite?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    tasks?: TaskLogListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    tasks?: TaskLogOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    name?: StringFilter<"Task"> | string
    categoryId?: IntFilter<"Task"> | number
    progress?: IntFilter<"Task"> | number
    isFavorite?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    tasks?: TaskLogListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    name?: StringWithAggregatesFilter<"Task"> | string
    categoryId?: IntWithAggregatesFilter<"Task"> | number
    progress?: IntWithAggregatesFilter<"Task"> | number
    isFavorite?: BoolWithAggregatesFilter<"Task"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    tasks?: TaskListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    tasks?: TaskListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type MemoWhereInput = {
    AND?: MemoWhereInput | MemoWhereInput[]
    OR?: MemoWhereInput[]
    NOT?: MemoWhereInput | MemoWhereInput[]
    id?: IntFilter<"Memo"> | number
    title?: StringFilter<"Memo"> | string
    text?: StringFilter<"Memo"> | string
    taskLogId?: IntFilter<"Memo"> | number
    tagId?: IntNullableFilter<"Memo"> | number | null
    taskLog?: XOR<TaskLogScalarRelationFilter, TaskLogWhereInput>
    tag?: XOR<MemoTagNullableScalarRelationFilter, MemoTagWhereInput> | null
  }

  export type MemoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    text?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrderInput | SortOrder
    taskLog?: TaskLogOrderByWithRelationInput
    tag?: MemoTagOrderByWithRelationInput
  }

  export type MemoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MemoWhereInput | MemoWhereInput[]
    OR?: MemoWhereInput[]
    NOT?: MemoWhereInput | MemoWhereInput[]
    title?: StringFilter<"Memo"> | string
    text?: StringFilter<"Memo"> | string
    taskLogId?: IntFilter<"Memo"> | number
    tagId?: IntNullableFilter<"Memo"> | number | null
    taskLog?: XOR<TaskLogScalarRelationFilter, TaskLogWhereInput>
    tag?: XOR<MemoTagNullableScalarRelationFilter, MemoTagWhereInput> | null
  }, "id">

  export type MemoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    text?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrderInput | SortOrder
    _count?: MemoCountOrderByAggregateInput
    _avg?: MemoAvgOrderByAggregateInput
    _max?: MemoMaxOrderByAggregateInput
    _min?: MemoMinOrderByAggregateInput
    _sum?: MemoSumOrderByAggregateInput
  }

  export type MemoScalarWhereWithAggregatesInput = {
    AND?: MemoScalarWhereWithAggregatesInput | MemoScalarWhereWithAggregatesInput[]
    OR?: MemoScalarWhereWithAggregatesInput[]
    NOT?: MemoScalarWhereWithAggregatesInput | MemoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Memo"> | number
    title?: StringWithAggregatesFilter<"Memo"> | string
    text?: StringWithAggregatesFilter<"Memo"> | string
    taskLogId?: IntWithAggregatesFilter<"Memo"> | number
    tagId?: IntNullableWithAggregatesFilter<"Memo"> | number | null
  }

  export type MemoTagWhereInput = {
    AND?: MemoTagWhereInput | MemoTagWhereInput[]
    OR?: MemoTagWhereInput[]
    NOT?: MemoTagWhereInput | MemoTagWhereInput[]
    id?: IntFilter<"MemoTag"> | number
    name?: StringFilter<"MemoTag"> | string
    memos?: MemoListRelationFilter
  }

  export type MemoTagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    memos?: MemoOrderByRelationAggregateInput
  }

  export type MemoTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: MemoTagWhereInput | MemoTagWhereInput[]
    OR?: MemoTagWhereInput[]
    NOT?: MemoTagWhereInput | MemoTagWhereInput[]
    memos?: MemoListRelationFilter
  }, "id" | "name">

  export type MemoTagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: MemoTagCountOrderByAggregateInput
    _avg?: MemoTagAvgOrderByAggregateInput
    _max?: MemoTagMaxOrderByAggregateInput
    _min?: MemoTagMinOrderByAggregateInput
    _sum?: MemoTagSumOrderByAggregateInput
  }

  export type MemoTagScalarWhereWithAggregatesInput = {
    AND?: MemoTagScalarWhereWithAggregatesInput | MemoTagScalarWhereWithAggregatesInput[]
    OR?: MemoTagScalarWhereWithAggregatesInput[]
    NOT?: MemoTagScalarWhereWithAggregatesInput | MemoTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MemoTag"> | number
    name?: StringWithAggregatesFilter<"MemoTag"> | string
  }

  export type DailyDataCreateInput = {
    date: Date | string
    logs?: TaskLogCreateNestedManyWithoutDailyDataInput
  }

  export type DailyDataUncheckedCreateInput = {
    date: Date | string
    logs?: TaskLogUncheckedCreateNestedManyWithoutDailyDataInput
  }

  export type DailyDataUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: TaskLogUpdateManyWithoutDailyDataNestedInput
  }

  export type DailyDataUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: TaskLogUncheckedUpdateManyWithoutDailyDataNestedInput
  }

  export type DailyDataCreateManyInput = {
    date: Date | string
  }

  export type DailyDataUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDataUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateInput = {
    workTime: number
    task: TaskCreateNestedOneWithoutTasksInput
    dailyData: DailyDataCreateNestedOneWithoutLogsInput
    memos?: MemoCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogUncheckedCreateInput = {
    id?: number
    taskId: number
    date: Date | string
    workTime: number
    memos?: MemoUncheckedCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogUpdateInput = {
    workTime?: FloatFieldUpdateOperationsInput | number
    task?: TaskUpdateOneRequiredWithoutTasksNestedInput
    dailyData?: DailyDataUpdateOneRequiredWithoutLogsNestedInput
    memos?: MemoUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    workTime?: FloatFieldUpdateOperationsInput | number
    memos?: MemoUncheckedUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogCreateManyInput = {
    id?: number
    taskId: number
    date: Date | string
    workTime: number
  }

  export type TaskLogUpdateManyMutationInput = {
    workTime?: FloatFieldUpdateOperationsInput | number
  }

  export type TaskLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    workTime?: FloatFieldUpdateOperationsInput | number
  }

  export type TaskCreateInput = {
    name: string
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutTasksInput
    tasks?: TaskLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    name: string
    categoryId: number
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    tasks?: TaskLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutTasksNestedInput
    tasks?: TaskLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: number
    name: string
    categoryId: number
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    tasks?: TaskCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    tasks?: TaskUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoCreateInput = {
    title: string
    text: string
    taskLog: TaskLogCreateNestedOneWithoutMemosInput
    tag?: MemoTagCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateInput = {
    id?: number
    title: string
    text: string
    taskLogId: number
    tagId?: number | null
  }

  export type MemoUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLog?: TaskLogUpdateOneRequiredWithoutMemosNestedInput
    tag?: MemoTagUpdateOneWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLogId?: IntFieldUpdateOperationsInput | number
    tagId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MemoCreateManyInput = {
    id?: number
    title: string
    text: string
    taskLogId: number
    tagId?: number | null
  }

  export type MemoUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type MemoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLogId?: IntFieldUpdateOperationsInput | number
    tagId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MemoTagCreateInput = {
    name: string
    memos?: MemoCreateNestedManyWithoutTagInput
  }

  export type MemoTagUncheckedCreateInput = {
    id?: number
    name: string
    memos?: MemoUncheckedCreateNestedManyWithoutTagInput
  }

  export type MemoTagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    memos?: MemoUpdateManyWithoutTagNestedInput
  }

  export type MemoTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    memos?: MemoUncheckedUpdateManyWithoutTagNestedInput
  }

  export type MemoTagCreateManyInput = {
    id?: number
    name: string
  }

  export type MemoTagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TaskLogListRelationFilter = {
    every?: TaskLogWhereInput
    some?: TaskLogWhereInput
    none?: TaskLogWhereInput
  }

  export type TaskLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyDataCountOrderByAggregateInput = {
    date?: SortOrder
  }

  export type DailyDataMaxOrderByAggregateInput = {
    date?: SortOrder
  }

  export type DailyDataMinOrderByAggregateInput = {
    date?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type DailyDataScalarRelationFilter = {
    is?: DailyDataWhereInput
    isNot?: DailyDataWhereInput
  }

  export type MemoListRelationFilter = {
    every?: MemoWhereInput
    some?: MemoWhereInput
    none?: MemoWhereInput
  }

  export type MemoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskLogCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    workTime?: SortOrder
  }

  export type TaskLogAvgOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    workTime?: SortOrder
  }

  export type TaskLogMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    workTime?: SortOrder
  }

  export type TaskLogMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    date?: SortOrder
    workTime?: SortOrder
  }

  export type TaskLogSumOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    workTime?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    progress?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TaskLogScalarRelationFilter = {
    is?: TaskLogWhereInput
    isNot?: TaskLogWhereInput
  }

  export type MemoTagNullableScalarRelationFilter = {
    is?: MemoTagWhereInput | null
    isNot?: MemoTagWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MemoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    text?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoAvgOrderByAggregateInput = {
    id?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    text?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    text?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrder
  }

  export type MemoSumOrderByAggregateInput = {
    id?: SortOrder
    taskLogId?: SortOrder
    tagId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type MemoTagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MemoTagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MemoTagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MemoTagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MemoTagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskLogCreateNestedManyWithoutDailyDataInput = {
    create?: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput> | TaskLogCreateWithoutDailyDataInput[] | TaskLogUncheckedCreateWithoutDailyDataInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutDailyDataInput | TaskLogCreateOrConnectWithoutDailyDataInput[]
    createMany?: TaskLogCreateManyDailyDataInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutDailyDataInput = {
    create?: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput> | TaskLogCreateWithoutDailyDataInput[] | TaskLogUncheckedCreateWithoutDailyDataInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutDailyDataInput | TaskLogCreateOrConnectWithoutDailyDataInput[]
    createMany?: TaskLogCreateManyDailyDataInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TaskLogUpdateManyWithoutDailyDataNestedInput = {
    create?: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput> | TaskLogCreateWithoutDailyDataInput[] | TaskLogUncheckedCreateWithoutDailyDataInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutDailyDataInput | TaskLogCreateOrConnectWithoutDailyDataInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutDailyDataInput | TaskLogUpsertWithWhereUniqueWithoutDailyDataInput[]
    createMany?: TaskLogCreateManyDailyDataInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutDailyDataInput | TaskLogUpdateWithWhereUniqueWithoutDailyDataInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutDailyDataInput | TaskLogUpdateManyWithWhereWithoutDailyDataInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutDailyDataNestedInput = {
    create?: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput> | TaskLogCreateWithoutDailyDataInput[] | TaskLogUncheckedCreateWithoutDailyDataInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutDailyDataInput | TaskLogCreateOrConnectWithoutDailyDataInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutDailyDataInput | TaskLogUpsertWithWhereUniqueWithoutDailyDataInput[]
    createMany?: TaskLogCreateManyDailyDataInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutDailyDataInput | TaskLogUpdateWithWhereUniqueWithoutDailyDataInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutDailyDataInput | TaskLogUpdateManyWithWhereWithoutDailyDataInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutTasksInput = {
    create?: XOR<TaskCreateWithoutTasksInput, TaskUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTasksInput
    connect?: TaskWhereUniqueInput
  }

  export type DailyDataCreateNestedOneWithoutLogsInput = {
    create?: XOR<DailyDataCreateWithoutLogsInput, DailyDataUncheckedCreateWithoutLogsInput>
    connectOrCreate?: DailyDataCreateOrConnectWithoutLogsInput
    connect?: DailyDataWhereUniqueInput
  }

  export type MemoCreateNestedManyWithoutTaskLogInput = {
    create?: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput> | MemoCreateWithoutTaskLogInput[] | MemoUncheckedCreateWithoutTaskLogInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTaskLogInput | MemoCreateOrConnectWithoutTaskLogInput[]
    createMany?: MemoCreateManyTaskLogInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type MemoUncheckedCreateNestedManyWithoutTaskLogInput = {
    create?: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput> | MemoCreateWithoutTaskLogInput[] | MemoUncheckedCreateWithoutTaskLogInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTaskLogInput | MemoCreateOrConnectWithoutTaskLogInput[]
    createMany?: MemoCreateManyTaskLogInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<TaskCreateWithoutTasksInput, TaskUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTasksInput
    upsert?: TaskUpsertWithoutTasksInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutTasksInput, TaskUpdateWithoutTasksInput>, TaskUncheckedUpdateWithoutTasksInput>
  }

  export type DailyDataUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<DailyDataCreateWithoutLogsInput, DailyDataUncheckedCreateWithoutLogsInput>
    connectOrCreate?: DailyDataCreateOrConnectWithoutLogsInput
    upsert?: DailyDataUpsertWithoutLogsInput
    connect?: DailyDataWhereUniqueInput
    update?: XOR<XOR<DailyDataUpdateToOneWithWhereWithoutLogsInput, DailyDataUpdateWithoutLogsInput>, DailyDataUncheckedUpdateWithoutLogsInput>
  }

  export type MemoUpdateManyWithoutTaskLogNestedInput = {
    create?: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput> | MemoCreateWithoutTaskLogInput[] | MemoUncheckedCreateWithoutTaskLogInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTaskLogInput | MemoCreateOrConnectWithoutTaskLogInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutTaskLogInput | MemoUpsertWithWhereUniqueWithoutTaskLogInput[]
    createMany?: MemoCreateManyTaskLogInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutTaskLogInput | MemoUpdateWithWhereUniqueWithoutTaskLogInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutTaskLogInput | MemoUpdateManyWithWhereWithoutTaskLogInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MemoUncheckedUpdateManyWithoutTaskLogNestedInput = {
    create?: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput> | MemoCreateWithoutTaskLogInput[] | MemoUncheckedCreateWithoutTaskLogInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTaskLogInput | MemoCreateOrConnectWithoutTaskLogInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutTaskLogInput | MemoUpsertWithWhereUniqueWithoutTaskLogInput[]
    createMany?: MemoCreateManyTaskLogInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutTaskLogInput | MemoUpdateWithWhereUniqueWithoutTaskLogInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutTaskLogInput | MemoUpdateManyWithWhereWithoutTaskLogInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutTasksInput = {
    create?: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTasksInput
    connect?: CategoryWhereUniqueInput
  }

  export type TaskLogCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CategoryUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTasksInput
    upsert?: CategoryUpsertWithoutTasksInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTasksInput, CategoryUpdateWithoutTasksInput>, CategoryUncheckedUpdateWithoutTasksInput>
  }

  export type TaskLogUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskInput | TaskLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskInput | TaskLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskInput | TaskLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskInput | TaskLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskInput | TaskLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskInput | TaskLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCategoryInput | TaskUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCategoryInput | TaskUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCategoryInput | TaskUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCategoryInput | TaskUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCategoryInput | TaskUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCategoryInput | TaskUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskLogCreateNestedOneWithoutMemosInput = {
    create?: XOR<TaskLogCreateWithoutMemosInput, TaskLogUncheckedCreateWithoutMemosInput>
    connectOrCreate?: TaskLogCreateOrConnectWithoutMemosInput
    connect?: TaskLogWhereUniqueInput
  }

  export type MemoTagCreateNestedOneWithoutMemosInput = {
    create?: XOR<MemoTagCreateWithoutMemosInput, MemoTagUncheckedCreateWithoutMemosInput>
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemosInput
    connect?: MemoTagWhereUniqueInput
  }

  export type TaskLogUpdateOneRequiredWithoutMemosNestedInput = {
    create?: XOR<TaskLogCreateWithoutMemosInput, TaskLogUncheckedCreateWithoutMemosInput>
    connectOrCreate?: TaskLogCreateOrConnectWithoutMemosInput
    upsert?: TaskLogUpsertWithoutMemosInput
    connect?: TaskLogWhereUniqueInput
    update?: XOR<XOR<TaskLogUpdateToOneWithWhereWithoutMemosInput, TaskLogUpdateWithoutMemosInput>, TaskLogUncheckedUpdateWithoutMemosInput>
  }

  export type MemoTagUpdateOneWithoutMemosNestedInput = {
    create?: XOR<MemoTagCreateWithoutMemosInput, MemoTagUncheckedCreateWithoutMemosInput>
    connectOrCreate?: MemoTagCreateOrConnectWithoutMemosInput
    upsert?: MemoTagUpsertWithoutMemosInput
    disconnect?: MemoTagWhereInput | boolean
    delete?: MemoTagWhereInput | boolean
    connect?: MemoTagWhereUniqueInput
    update?: XOR<XOR<MemoTagUpdateToOneWithWhereWithoutMemosInput, MemoTagUpdateWithoutMemosInput>, MemoTagUncheckedUpdateWithoutMemosInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MemoCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput> | MemoCreateWithoutTagInput[] | MemoUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTagInput | MemoCreateOrConnectWithoutTagInput[]
    createMany?: MemoCreateManyTagInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type MemoUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput> | MemoCreateWithoutTagInput[] | MemoUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTagInput | MemoCreateOrConnectWithoutTagInput[]
    createMany?: MemoCreateManyTagInputEnvelope
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
  }

  export type MemoUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput> | MemoCreateWithoutTagInput[] | MemoUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTagInput | MemoCreateOrConnectWithoutTagInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutTagInput | MemoUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoCreateManyTagInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutTagInput | MemoUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutTagInput | MemoUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type MemoUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput> | MemoCreateWithoutTagInput[] | MemoUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MemoCreateOrConnectWithoutTagInput | MemoCreateOrConnectWithoutTagInput[]
    upsert?: MemoUpsertWithWhereUniqueWithoutTagInput | MemoUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MemoCreateManyTagInputEnvelope
    set?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    disconnect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    delete?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    connect?: MemoWhereUniqueInput | MemoWhereUniqueInput[]
    update?: MemoUpdateWithWhereUniqueWithoutTagInput | MemoUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MemoUpdateManyWithWhereWithoutTagInput | MemoUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MemoScalarWhereInput | MemoScalarWhereInput[]
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TaskLogCreateWithoutDailyDataInput = {
    workTime: number
    task: TaskCreateNestedOneWithoutTasksInput
    memos?: MemoCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogUncheckedCreateWithoutDailyDataInput = {
    id?: number
    taskId: number
    workTime: number
    memos?: MemoUncheckedCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogCreateOrConnectWithoutDailyDataInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput>
  }

  export type TaskLogCreateManyDailyDataInputEnvelope = {
    data: TaskLogCreateManyDailyDataInput | TaskLogCreateManyDailyDataInput[]
  }

  export type TaskLogUpsertWithWhereUniqueWithoutDailyDataInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutDailyDataInput, TaskLogUncheckedUpdateWithoutDailyDataInput>
    create: XOR<TaskLogCreateWithoutDailyDataInput, TaskLogUncheckedCreateWithoutDailyDataInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutDailyDataInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutDailyDataInput, TaskLogUncheckedUpdateWithoutDailyDataInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutDailyDataInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutDailyDataInput>
  }

  export type TaskLogScalarWhereInput = {
    AND?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    OR?: TaskLogScalarWhereInput[]
    NOT?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    id?: IntFilter<"TaskLog"> | number
    taskId?: IntFilter<"TaskLog"> | number
    date?: DateTimeFilter<"TaskLog"> | Date | string
    workTime?: FloatFilter<"TaskLog"> | number
  }

  export type TaskCreateWithoutTasksInput = {
    name: string
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
    categoryId: number
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutTasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTasksInput, TaskUncheckedCreateWithoutTasksInput>
  }

  export type DailyDataCreateWithoutLogsInput = {
    date: Date | string
  }

  export type DailyDataUncheckedCreateWithoutLogsInput = {
    date: Date | string
  }

  export type DailyDataCreateOrConnectWithoutLogsInput = {
    where: DailyDataWhereUniqueInput
    create: XOR<DailyDataCreateWithoutLogsInput, DailyDataUncheckedCreateWithoutLogsInput>
  }

  export type MemoCreateWithoutTaskLogInput = {
    title: string
    text: string
    tag?: MemoTagCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateWithoutTaskLogInput = {
    id?: number
    title: string
    text: string
    tagId?: number | null
  }

  export type MemoCreateOrConnectWithoutTaskLogInput = {
    where: MemoWhereUniqueInput
    create: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput>
  }

  export type MemoCreateManyTaskLogInputEnvelope = {
    data: MemoCreateManyTaskLogInput | MemoCreateManyTaskLogInput[]
  }

  export type TaskUpsertWithoutTasksInput = {
    update: XOR<TaskUpdateWithoutTasksInput, TaskUncheckedUpdateWithoutTasksInput>
    create: XOR<TaskCreateWithoutTasksInput, TaskUncheckedCreateWithoutTasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutTasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutTasksInput, TaskUncheckedUpdateWithoutTasksInput>
  }

  export type TaskUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDataUpsertWithoutLogsInput = {
    update: XOR<DailyDataUpdateWithoutLogsInput, DailyDataUncheckedUpdateWithoutLogsInput>
    create: XOR<DailyDataCreateWithoutLogsInput, DailyDataUncheckedCreateWithoutLogsInput>
    where?: DailyDataWhereInput
  }

  export type DailyDataUpdateToOneWithWhereWithoutLogsInput = {
    where?: DailyDataWhereInput
    data: XOR<DailyDataUpdateWithoutLogsInput, DailyDataUncheckedUpdateWithoutLogsInput>
  }

  export type DailyDataUpdateWithoutLogsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyDataUncheckedUpdateWithoutLogsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoUpsertWithWhereUniqueWithoutTaskLogInput = {
    where: MemoWhereUniqueInput
    update: XOR<MemoUpdateWithoutTaskLogInput, MemoUncheckedUpdateWithoutTaskLogInput>
    create: XOR<MemoCreateWithoutTaskLogInput, MemoUncheckedCreateWithoutTaskLogInput>
  }

  export type MemoUpdateWithWhereUniqueWithoutTaskLogInput = {
    where: MemoWhereUniqueInput
    data: XOR<MemoUpdateWithoutTaskLogInput, MemoUncheckedUpdateWithoutTaskLogInput>
  }

  export type MemoUpdateManyWithWhereWithoutTaskLogInput = {
    where: MemoScalarWhereInput
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyWithoutTaskLogInput>
  }

  export type MemoScalarWhereInput = {
    AND?: MemoScalarWhereInput | MemoScalarWhereInput[]
    OR?: MemoScalarWhereInput[]
    NOT?: MemoScalarWhereInput | MemoScalarWhereInput[]
    id?: IntFilter<"Memo"> | number
    title?: StringFilter<"Memo"> | string
    text?: StringFilter<"Memo"> | string
    taskLogId?: IntFilter<"Memo"> | number
    tagId?: IntNullableFilter<"Memo"> | number | null
  }

  export type CategoryCreateWithoutTasksInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutTasksInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutTasksInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
  }

  export type TaskLogCreateWithoutTaskInput = {
    workTime: number
    dailyData: DailyDataCreateNestedOneWithoutLogsInput
    memos?: MemoCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogUncheckedCreateWithoutTaskInput = {
    id?: number
    date: Date | string
    workTime: number
    memos?: MemoUncheckedCreateNestedManyWithoutTaskLogInput
  }

  export type TaskLogCreateOrConnectWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput>
  }

  export type TaskLogCreateManyTaskInputEnvelope = {
    data: TaskLogCreateManyTaskInput | TaskLogCreateManyTaskInput[]
  }

  export type CategoryUpsertWithoutTasksInput = {
    update: XOR<CategoryUpdateWithoutTasksInput, CategoryUncheckedUpdateWithoutTasksInput>
    create: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTasksInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTasksInput, CategoryUncheckedUpdateWithoutTasksInput>
  }

  export type CategoryUpdateWithoutTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TaskLogUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutTaskInput, TaskLogUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutTaskInput, TaskLogUncheckedUpdateWithoutTaskInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutTaskInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutCategoryInput = {
    name: string
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    tasks?: TaskLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    tasks?: TaskLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput>
  }

  export type TaskCreateManyCategoryInputEnvelope = {
    data: TaskCreateManyCategoryInput | TaskCreateManyCategoryInput[]
  }

  export type TaskUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCategoryInput, TaskUncheckedUpdateWithoutCategoryInput>
    create: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCategoryInput, TaskUncheckedUpdateWithoutCategoryInput>
  }

  export type TaskUpdateManyWithWhereWithoutCategoryInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCategoryInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    name?: StringFilter<"Task"> | string
    categoryId?: IntFilter<"Task"> | number
    progress?: IntFilter<"Task"> | number
    isFavorite?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type TaskLogCreateWithoutMemosInput = {
    workTime: number
    task: TaskCreateNestedOneWithoutTasksInput
    dailyData: DailyDataCreateNestedOneWithoutLogsInput
  }

  export type TaskLogUncheckedCreateWithoutMemosInput = {
    id?: number
    taskId: number
    date: Date | string
    workTime: number
  }

  export type TaskLogCreateOrConnectWithoutMemosInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutMemosInput, TaskLogUncheckedCreateWithoutMemosInput>
  }

  export type MemoTagCreateWithoutMemosInput = {
    name: string
  }

  export type MemoTagUncheckedCreateWithoutMemosInput = {
    id?: number
    name: string
  }

  export type MemoTagCreateOrConnectWithoutMemosInput = {
    where: MemoTagWhereUniqueInput
    create: XOR<MemoTagCreateWithoutMemosInput, MemoTagUncheckedCreateWithoutMemosInput>
  }

  export type TaskLogUpsertWithoutMemosInput = {
    update: XOR<TaskLogUpdateWithoutMemosInput, TaskLogUncheckedUpdateWithoutMemosInput>
    create: XOR<TaskLogCreateWithoutMemosInput, TaskLogUncheckedCreateWithoutMemosInput>
    where?: TaskLogWhereInput
  }

  export type TaskLogUpdateToOneWithWhereWithoutMemosInput = {
    where?: TaskLogWhereInput
    data: XOR<TaskLogUpdateWithoutMemosInput, TaskLogUncheckedUpdateWithoutMemosInput>
  }

  export type TaskLogUpdateWithoutMemosInput = {
    workTime?: FloatFieldUpdateOperationsInput | number
    task?: TaskUpdateOneRequiredWithoutTasksNestedInput
    dailyData?: DailyDataUpdateOneRequiredWithoutLogsNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutMemosInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    workTime?: FloatFieldUpdateOperationsInput | number
  }

  export type MemoTagUpsertWithoutMemosInput = {
    update: XOR<MemoTagUpdateWithoutMemosInput, MemoTagUncheckedUpdateWithoutMemosInput>
    create: XOR<MemoTagCreateWithoutMemosInput, MemoTagUncheckedCreateWithoutMemosInput>
    where?: MemoTagWhereInput
  }

  export type MemoTagUpdateToOneWithWhereWithoutMemosInput = {
    where?: MemoTagWhereInput
    data: XOR<MemoTagUpdateWithoutMemosInput, MemoTagUncheckedUpdateWithoutMemosInput>
  }

  export type MemoTagUpdateWithoutMemosInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoTagUncheckedUpdateWithoutMemosInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MemoCreateWithoutTagInput = {
    title: string
    text: string
    taskLog: TaskLogCreateNestedOneWithoutMemosInput
  }

  export type MemoUncheckedCreateWithoutTagInput = {
    id?: number
    title: string
    text: string
    taskLogId: number
  }

  export type MemoCreateOrConnectWithoutTagInput = {
    where: MemoWhereUniqueInput
    create: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput>
  }

  export type MemoCreateManyTagInputEnvelope = {
    data: MemoCreateManyTagInput | MemoCreateManyTagInput[]
  }

  export type MemoUpsertWithWhereUniqueWithoutTagInput = {
    where: MemoWhereUniqueInput
    update: XOR<MemoUpdateWithoutTagInput, MemoUncheckedUpdateWithoutTagInput>
    create: XOR<MemoCreateWithoutTagInput, MemoUncheckedCreateWithoutTagInput>
  }

  export type MemoUpdateWithWhereUniqueWithoutTagInput = {
    where: MemoWhereUniqueInput
    data: XOR<MemoUpdateWithoutTagInput, MemoUncheckedUpdateWithoutTagInput>
  }

  export type MemoUpdateManyWithWhereWithoutTagInput = {
    where: MemoScalarWhereInput
    data: XOR<MemoUpdateManyMutationInput, MemoUncheckedUpdateManyWithoutTagInput>
  }

  export type TaskLogCreateManyDailyDataInput = {
    id?: number
    taskId: number
    workTime: number
  }

  export type TaskLogUpdateWithoutDailyDataInput = {
    workTime?: FloatFieldUpdateOperationsInput | number
    task?: TaskUpdateOneRequiredWithoutTasksNestedInput
    memos?: MemoUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutDailyDataInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    workTime?: FloatFieldUpdateOperationsInput | number
    memos?: MemoUncheckedUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogUncheckedUpdateManyWithoutDailyDataInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: IntFieldUpdateOperationsInput | number
    workTime?: FloatFieldUpdateOperationsInput | number
  }

  export type MemoCreateManyTaskLogInput = {
    id?: number
    title: string
    text: string
    tagId?: number | null
  }

  export type MemoUpdateWithoutTaskLogInput = {
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    tag?: MemoTagUpdateOneWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateWithoutTaskLogInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    tagId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MemoUncheckedUpdateManyWithoutTaskLogInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    tagId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TaskLogCreateManyTaskInput = {
    id?: number
    date: Date | string
    workTime: number
  }

  export type TaskLogUpdateWithoutTaskInput = {
    workTime?: FloatFieldUpdateOperationsInput | number
    dailyData?: DailyDataUpdateOneRequiredWithoutLogsNestedInput
    memos?: MemoUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    workTime?: FloatFieldUpdateOperationsInput | number
    memos?: MemoUncheckedUpdateManyWithoutTaskLogNestedInput
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    workTime?: FloatFieldUpdateOperationsInput | number
  }

  export type TaskCreateManyCategoryInput = {
    id?: number
    name: string
    progress: number
    isFavorite: boolean
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoCreateManyTagInput = {
    id?: number
    title: string
    text: string
    taskLogId: number
  }

  export type MemoUpdateWithoutTagInput = {
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLog?: TaskLogUpdateOneRequiredWithoutMemosNestedInput
  }

  export type MemoUncheckedUpdateWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLogId?: IntFieldUpdateOperationsInput | number
  }

  export type MemoUncheckedUpdateManyWithoutTagInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    taskLogId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}