type Prev = [never, 0, 1, 2, 3]; // 深さ制限: 3まで a.b.cまで

/**
 * 任意のオブジェクト型のkeyをネストしている場合も含めて取得する(深さ3まで(a.b.cまで))
 * - {a:{b,c},d,e:{f,g}} -> "a.b" | "a.c" | "d" | "e.f" | "e.g"
 */

export type NestedKeys<T, D extends number = 3> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeys<T[K], Prev[D]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : "";
/**
 * ネストされたキーからデータ取得
 * @param obj ネストされたオブジェクト {foo:{id,name}...}
 * @param key ネストされたキー("foo.name" など)
 * @returns 値: string|number (obj.foo.nameの値)
 */
export function getValueByNestedKey<T extends object, D extends number = 3>(
  obj: T,
  key: NestedKeys<T, D>
) {
  // キーを分割 a.b=>[a,b]
  const keys = key.split(".");
  // 初期値としてオブジェクトを入れる
  let value: unknown = obj;
  // 掘り下げを行う
  for (const k of keys) {
    // オブジェクトである場合は掘り下げ
    if (typeof value === "object" && value !== null) {
      value = value[k as keyof typeof value];
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value instanceof Date
    ) {
      // オブジェクトでない場合はエラー
      throw Error("オブジェクトのキーを掘り下げることができません");
    }
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value instanceof Date
  )
    return value;
  throw new Error(
    "対象のオブジェクトの型はstring/number/booleanのみ許容します"
  );
}
