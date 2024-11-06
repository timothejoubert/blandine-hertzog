import { isObject } from '~/utils/object/is-object'

export function getSelfObjectOrFirstMapObject<T>(obj: T | T[]): T | undefined {
    if (Array.isArray(obj)) return obj[0]
    else if (isObject(obj)) return obj as T
}
