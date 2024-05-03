
function fromHourToFrench(hour: number) : string {
  switch(hour) {
    default:
    case 1:
    case 13:
      return "une";
    case 2:
    case 14:
      return "deux";
    case 3:
    case 15:
      return "trois";
    case 4:
    case 16:
      return "quatre";
    case 5:
    case 17:
      return "cinq";
    case 6:
    case 18:
      return "six";
    case 7:
    case 19:
      return "sept";
    case 8:
    case 20:
      return "huit";
    case 9:
    case 21:
      return "neuf";
    case 10:
    case 22:
      return "dix";
    case 11:
    case 23:
      return "onze";
    case 12:
      return "midi";
    case 0:
      return "minuit";
  }
}

function fronMinuteToFrench(minutes: number) : string {
  switch(minutes) {
    default:
    case 0:
    case 60:
      return "";
    case 1:
      return "une";
    case 2:
      return "deux";
    case 3:
      return "trois";
    case 4:
      return "quatre";
    case 5:
      return "cinq";
    case 6:
      return "six";
    case 7:
      return "sept";
    case 8:
      return "huit";
    case 9:
      return "neuf";
    case 10:
      return "dix";
    case 11:
      return "onze";
    case 12:
      return "douze";
    case 13:
      return "treize";
    case 14:
      return "quatorze";
    case 15:
      return "et quart";
    case 16:
      return "seize";
    case 17:
      return "dix sept";
    case 18:
      return "dix huit";
    case 19:
      return "dix neuf";
    case 20:
      return "vingt";
    case 21:
      return "vingt et un";
    case 22:
      return "vingt deux";
    case 23:
      return "vingt trois";
    case 24:
      return "vingt quatre";
    case 25:
      return "vingt cinq";
    case 26:
      return "vingt six";
    case 27:
      return "vingt sept";
    case 28:
      return "vingt huit";
    case 29:
      return "vingt neuf";
    case 30:
      return "et demie";
    case 31:
      return "moins vingt neuf";
    case 32:
      return "moins vingt huit";
    case 33:
      return "moins vingt sept";
    case 34:
      return "moins vingt six";
    case 35:
      return "moins vingt cinq";
    case 36:
      return "moins vingt quatre";
    case 37:
      return "moins vingt trois";
    case 38:
      return "moins vingt deux";
    case 39:
      return "moins vingt un";
    case 40:
      return "moins vingt";
    case 41:
      return "moins dix neuf";
    case 42:
      return "moins dix huit";
    case 43:
      return "moins dix sept";
    case 44:
      return "moins seize";
    case 45:
      return "moins le quart";
    case 46:
      return "moins quatorze";
    case 47:
      return "moins treize";
    case 48:
      return "moins douze";
    case 49:
      return "moins one";
    case 50:
      return "moins dix";
    case 51:
      return "moins neuf";
    case 52:
      return "moins huit";
    case 53:
      return "moins sept";
    case 54:
      return "moins six";
    case 55:
      return "moins cinq";
    case 56:
      return "moins quatre";
    case 57:
      return "moins trois";
    case 58:
      return "moins deux";
    case 59:
      return "moins un";
  }
}

export const Letters = [
    "ilnestodeux",
    "quatretrois",
    "neufunesept",
    "huitsixcinq",
    "midixminuit",
    "onzerheures",
    "moinsoledix",
    "etrquartpmd",
    "vingt cinqu",
    "etsdemiepam"
]

export function fromHumanizedWordToLetters(word: string) {
    switch(word) {
        case "il":
            return [{x:0, y:0}, {x:1, y:0}];
        case "est":
            return [{x:3, y:0}, {x:4, y:0}, {x:5, y:0}];
        case "deux":
            return [{x:7, y:0}, {x:8, y:0}, {x:9, y:0}, {x:10, y:0}];
        case "quatre":
            return [{x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1}, {x:5, y:1}];
        case "trois":
            return [{x:6, y:1}, {x:7, y:1}, {x:8, y:1}, {x:9, y:1}, {x:10, y:1}];
        case "neuf":
            return [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}];
        case "une":
            return [{x:4, y:2}, {x:5, y:2}, {x:6, y:2}];
        case "sept":
            return [{x:7, y:2}, {x:8, y:2}, {x:9, y:2}, {x:10, y:2}];
        case "huit":
            return [{x:0, y:3}, {x:1, y:3}, {x:2, y:3}, {x:3, y:3}];
        case "six":
            return [{x:4, y:3}, {x:5, y:3}, {x:6, y:3}];
        case "cinq":
            return [{x:7, y:3}, {x:8, y:3}, {x:9, y:3}, {x:10, y:3}];
        case "midi":
            return [{x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}];
        case "minuit":
            return [{x:5, y:4}, {x:6, y:4}, {x:7, y:4}, {x:8, y:4}, {x:9, y:4}, {x:10, y:4}];
        case "onze":
            return [{x:0, y:5}, {x:1, y:5}, {x:2, y:5}, {x:3, y:5}];
        case "heure":
            return [{x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5}, {x:9, y:5}];
        case "heures":
            return [{x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5}, {x:9, y:5}, {x:10, y:5}];
        case "moins":
            return [{x:0, y:6}, {x:1, y:6}, {x:2, y:6}, {x:3, y:6}, {x:4, y:6}];
        case "le":
            return [{x:6, y:6}, {x:7, y:6}];
        case "dix":
            return [{x:8, y:6}, {x:9, y:6}, {x:10, y:6}];
        case "et":
            return [{x:0, y:7}, {x:1, y:7}];
        case "quart":
            return [{x:3, y:7}, {x:4, y:7}, {x:5, y:7}, {x:6, y:7}, {x:7, y:7}];
        case "vingt":
            return [{x:0, y:8}, {x:1, y:8}, {x:2, y:8}, {x:3, y:8}, {x:4, y:8}];
        case "demie":
            return [{x:3, y:9}, {x:4, y:9}, {x:5, y:9}, {x:6, y:9}, {x:7, y:9}];
        default:
            return []
    }
}


export function humanizedClockInFrench(date: Date) : string {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if(minutes > 30) {
    const hourString = (hour + 1) > 1 ? "heures" : "heure";
    return `${fromHourToFrench(hour + 1)} ${hourString} ${fronMinuteToFrench(minutes)}`;
  }

  const hourString = (hour + 1) > 1 ? "heures" : "heure";
  return `${fromHourToFrench(hour)} ${hourString} ${fronMinuteToFrench(minutes)}`;
}



export function humanizedClock(date: Date) : [string, string] {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if(minutes > 30) {
    return [fromHourToFrench(hour + 1), fronMinuteToFrench(minutes)];
  }

  return [fromHourToFrench(hour), fronMinuteToFrench(minutes)];
}


