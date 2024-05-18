export function selector(selectorValue: any) {
    return function (taget: any) {
        taget.selectorValue = selectorValue;
    }
}