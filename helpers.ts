import { format } from "date-fns";
export function dateFormatLong(str:string | undefined){
    return format(new Date(str || ''),'EEEE, LLLL do, yyyy')
}
export function dateFormat(str:string | undefined){
    return format(new Date(str || ''),'M/d/y')
}
export function debounce(func:Function,wait:number){
    let timeout: NodeJS.Timeout;
    return function executed(...args:any){
      const later = () =>{
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later,wait);
    }
  }
  
  
//consolidate conditional classnames
export function classNames(...classes: Array<string | boolean | undefined>): string {
    return classes.filter(Boolean).join(' ');
} 
//get column value for individual navitems (1-12)
export function getColumnCount(nav:Array<NavItem>): ColumnCount {
    let result = Math.ceil(12 / nav.length) || 1;
    return result as ColumnCount;
}
//retrieve values from localstorage
export function getSavedState<T>(key:string,type: T) {
    //unable to run if window  isnt  defined
    if(typeof window !== "undefined") {
        //get value
        let saved;
        saved = localStorage.getItem(key);
        if(saved){
            try {
                    switch(typeof type){
                        case 'boolean':
                            saved = ['true','True','T','Yes','Y'].indexOf(saved) >= 0;
                            break;
                        case 'number':
                            saved = Number(saved);
                            break;
                        default:
                            //objects and arrays
                            saved = JSON.parse(saved);
                            break;    
                    }
                
            } catch(e){ }
        }
        return saved;
    }
}
export function saveToStorage(key:string,data:StorageItem){
    if(typeof window !== "undefined") {
        if (
            data === null || 
            typeof data === 'string' || 
            Array.isArray(data) ||
            typeof data === 'boolean' ||
            typeof data === 'number'
            ) {
                return localStorage.setItem(key,data as string);
            }
            //if saving an object, check for existing data and merge
            let update = data;
            const existing = localStorage.getItem(key);
            if(existing){
                const json = JSON.parse(existing);
                update = Object.assign(json,data);
            }
            localStorage.setItem(key,JSON.stringify(update));
           
    }
}

export function random(start?:number,end?:number,amount?:number):number | Array<number>{
    
    function d(){          
        return (start ? start : 0) + Math.round(Math.random() * (end ? (end - (start||0)) : 1))
    }
    return amount ? (function(){
        var t=[];
        while(t.length<amount) t.push(d());
        return t;
    })()
    : d();
}