const TEN = 10;
const ONE_HUNDRED = 100;

const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

export function generateWords(number: number): string {
    if (number === 0 || number < 0) {
        return 'zero';
    }else if (number < 20) {
        return LESS_THAN_TWENTY[number];

    } else if (number < ONE_HUNDRED) {
        const remainder = number % TEN;
        const word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            return word + ' ' + LESS_THAN_TWENTY[remainder];
        } else {
            return word;
        }
    }
    else {
        return 'zero';
    }
}