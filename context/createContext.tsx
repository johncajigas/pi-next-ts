import * as React from 'react';
import { getSavedState, saveToStorage } from '../helpers';

export default function createCtx<A>(defaultValue?: A, name?: string) {
    type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdate: UpdateType = () => defaultValue;
    const ctx = React.createContext({
        state: defaultValue,
        update: defaultUpdate
    });

    function Provider(props: React.PropsWithChildren<{}>) {
        const [state, _update] = React.useState(defaultValue);
    
        const update: UpdateType = (value) => {
            _update(value)
            if (name) saveToStorage(name,value as StorageItem);
            return value;
        }
        
        React.useEffect(()=>{
            //if name exists, saved to localstorage
            if(name) _update(getSavedState(name,defaultValue));
        },[])
        return <ctx.Provider value={{ state, update }} {...props} />
    }
    return [ctx, Provider] as const;
}
