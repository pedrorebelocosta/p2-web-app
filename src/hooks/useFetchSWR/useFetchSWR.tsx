import useSWR, { Fetcher } from "swr"

const fetcher = <T,>(...args: Array<T>) => fetch(...args).then(res => res.json());

export const useFetchSWR = (url: string) => {
    return useSWR(url, fetcher);
}