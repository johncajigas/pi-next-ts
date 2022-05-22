import useSWR from 'swr';
import {getAccessToken} from '@auth0/nextjs-auth0';

const useRequest = ({uri}:RequestProps) => useSWR(`http://localhost:3000${uri}`,(args:RequestInfo) => fetch(args).then(res=>res.json())
);
const useTaskRequest = ({uri}:RequestProps):object => useSWR(`http://localhost:8001/task-invoicer${uri}`,(args:RequestInfo) => fetch(args).then(res=>res.json())
);
const apiGet = ({uri,onError,onSuccess}:RequestProps) => useSWR(uri ? `http://localhost:8001${uri}` : null,(args:RequestInfo)=> fetch(args).then(res=>res.json()),{
    onSuccess:(data)=>onSuccess && onSuccess(data),
    onError:(error)=>onError && onError(error),
    revalidateOnFocus:false,
});

const apiMutate = ({uri,method,body}:RequestProps) => fetch(`http://localhost:8001${uri}`,{method,body}).then(res=>res.json())
export {useRequest,useTaskRequest,apiGet,apiMutate};
