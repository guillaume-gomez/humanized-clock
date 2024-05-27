import { MutableRefObject, useEffect, useState, useRef } from "react";

function useDate() {
  const [date, setDate] = useState<Date>(new Date());
  const animationRef : MutableRefObject<number | undefined> = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number|undefined>(undefined);
 
  function animate(time: number) {
    if (previousTimeRef.current != undefined) {
      setDate(new Date(Date.now()));
    }
    previousTimeRef.current = time;
    animationRef.current = requestAnimationFrame(animate);
  }

   useEffect(() => {
    requestAnimationFrame(animate);
    return () => {
      if(animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { date }
}

export default useDate;