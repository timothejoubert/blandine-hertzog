export function mapRange(value: number, a: number, b: number, c: number, d: number) {
    value = (value - a) / (b - a)
    return c + value * (d - c)
}
