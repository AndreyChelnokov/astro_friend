export function validateDayField (valueField) {
    const value = Number(valueField);

    if (value > 31) {
        return 31;
    }

    if (value < 1) {
        return 1
    }
}
