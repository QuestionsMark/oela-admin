import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import axios, { Canceler, AxiosError } from 'axios';
import { HOST_ADDRESS } from '../config';
import { deleteLocalStorage, getLocalStorage } from '../utils/localStorageHelper';
import { useAuthorization } from '../contexts/authorizationContext';
import { usePopup } from '../contexts/popupContext';

export interface SearchResult<T> {
    data: T[];
    loading: boolean;
    hasMore: boolean;
    amount: number;
    page: number;
    searchPhrase: string;
    handleSearchPhraseChange: (text: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
    refresh: () => void;
}

export function useSearch<T>(collection: string, limit: number, withLoading: boolean = false): SearchResult<T> {

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const delayTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const { setAuthorization } = useAuthorization();
    const { setResponsePopup } = usePopup();

    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [search, setSearch] = useState('');
    const handleSearchPhraseChange = (text: string) => {
        setSearchPhrase(text);
    };

    const refresh = () => {
        setReload(state => !state);
        setPage(1);
    };

    useEffect(() => {
        setData([]);
    }, [reload, search]);

    useEffect(() => {
        if (debounceTimeoutId.current) {
            clearTimeout(debounceTimeoutId.current);
        }
        debounceTimeoutId.current = setTimeout(() => {
            setPage(1);
            setSearch(searchPhrase);
        }, 500);
    }, [searchPhrase]);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        const startTime = new Date().valueOf();
        if (delayTimeoutId.current) {
            clearTimeout(delayTimeoutId.current);
        }
        if (data.length === 0 || withLoading) {
            setLoading(true);
        }
        let cancel: Canceler;
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: search,
                page,
                limit
            },
            headers: { authorization: getLocalStorage('token') },
            cancelToken: new axios.CancelToken(c => cancel = c),
        })
            .then(res => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    setLoading(false);
                    setAmount(res.data.count);
                    setData(prev => [...prev, ...res.data.results]);
                    setHasMore(res.data.results.length > 0);
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            })
            .catch((e: AxiosError) => {
                const endTime = new Date().valueOf();
                delayTimeoutId.current = setTimeout(() => {
                    if (axios.isCancel(e)) return;
                    const errorObject = e.toJSON() as { status: number };
                    if (errorObject.status === 403) {
                        deleteLocalStorage('token');
                        setAuthorization(false);
                        return;
                    }
                    if (axios.isCancel(e)) return;
                    setResponsePopup({ message: 'Wystąpił błąd podczas pobierania danych.', status: false, open: true });
                }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
            });

        return () => {
            if (delayTimeoutId.current) {
                clearTimeout(delayTimeoutId.current);
            }
            cancel();
        }

    }, [search, page, collection, reload]);

    return { loading, data, hasMore, amount, page, searchPhrase, setPage, handleSearchPhraseChange, refresh };
}