import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T |(()=> T)){
    const [storedValue, setStoredValue] = useState<T>(() => {
        const itemValue = localStorage.getItem(key)
        if (itemValue != null) {
            return JSON.parse(itemValue);
        }
        if(typeof initialValue === 'function'){
            return (initialValue as () => T)()
        }else{
            return initialValue
        }
    });
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(storedValue))
    }, [storedValue, key])

    return [storedValue, setStoredValue] as [typeof storedValue, typeof setStoredValue];
}