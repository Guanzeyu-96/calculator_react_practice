export function eraseZero(screenNumber: string) {

    if (screenNumber.includes(".")) {
        for (let i = 0; i < screenNumber.length; i++) {
            if (screenNumber[i] === ".") {
                const beforePoint = screenNumber.slice(0, i);
                const afterPoint = screenNumber.slice(i);

                return parseInt(beforePoint).toString() + afterPoint;
            }
        }
    } else {
        return parseInt(screenNumber).toString();
    }
}