import { useRef, useEffect, useContext, useState, RefObject } from 'react';
import useSWR from 'swr';
import { AlertContext } from 'context/context';
import ErrorDisplay from '@components/ErrorDisplay';
import { nanoid } from 'nanoid';

export function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);
  return isMounted;
}

export const useNanoid = () => {
  const [id,set] = useState<string | undefined>();
  useEffect(()=>{
    set(nanoid())
  },[])

  return id;
}

export const useRequest = ({ uri }: RequestProps) => useSWR(`http://localhost:3000${uri}`, (args: RequestInfo) => fetch(args).then(async res => {
 
  const response = await res.json();
    if(res.ok){
      console.log(res.ok)
      return response;
    } else {
     
    }
      return {
        error:response.error || 'Something went wrong with your request!',
        status:res.status
      }
    }


)
);

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{width:number,height:number} | undefined>();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}



interface Args extends IntersectionObserverInit {

  freezeOnceVisible?: boolean

}


export function useIntersectionObserver(

  elementRef: RefObject<Element>,

  {

    threshold = 0,

    root = null,

    rootMargin = '0%',

    freezeOnceVisible = false,

  }: Args,

): IntersectionObserverEntry | undefined {

  const [entry, setEntry] = useState<IntersectionObserverEntry>()


  const frozen = entry?.isIntersecting && freezeOnceVisible


  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {

    setEntry(entry)

  }


  useEffect(() => {

    const node = elementRef?.current // DOM Ref

    const hasIOSupport = !!window.IntersectionObserver


    if (!hasIOSupport || frozen || !node) return


    const observerParams = { threshold, root, rootMargin }

    const observer = new IntersectionObserver(updateEntry, observerParams)


    observer.observe(node)


    return () => observer.disconnect()


    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen])


  return entry

}
