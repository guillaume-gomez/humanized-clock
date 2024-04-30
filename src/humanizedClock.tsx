
function fromHourToFrench(hour: number) : string {
  switch(hour) {
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

export function humanizedClockInFrench(date: Datetime) : [string, string] {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if(minutes > 30) {
    const hourString = (hour + 1) > 1 ? "heures" : "heure";
    return `${fromHourToFrench(hour + 1)} ${hourString} ${fronMinuteToFrench(minutes)}`;
  }

  const hourString = (hour + 1) > 1 ? "heures" : "heure";
  return `${fromHourToFrench(hour)} ${hourString} ${fronMinuteToFrench(minutes)}`;
}




export function humanizedClock(date: Datetime, locale: string = "fr") : [string, string] {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if(minutes > 30) {
    return [fromHourToFrench(hour + 1), fronMinuteToFrench(minutes)];
  }

  return [fromHourToFrench(hour), fronMinuteToFrench(minutes)];
}


