import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@src/redux/store';

import { fetchEventSource } from '@microsoft/fetch-event-source';

const useSSE = <T>(url: string): T | null => {
    const { access_token } = useAppSelector((store) => store.auth);

    const [message, setMessage] = useState<T | null>(null);
    const timer = useRef<NodeJS.Timeout>();

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
        try {
            await fetchEventSource(`${url}/`, {
                headers: {
                    Accept: 'text/event-stream',
                    Authorization: `Bearer ${access_token}`,
                },
                onmessage(event) {
                    try {
                        const parsedData = JSON.parse(event.data);
                        setMessage(parsedData as T);
                    } catch (error) {
                        console.error('useSse parsing error');
                    }
                },
                signal,
            });
        } catch (error) {
            timer.current = setTimeout(() => fetchData(), 10000);
        }
    };

    useEffect(() => {
        if (!access_token) return;

        // fetchData();
        return () => {
            controller.abort();
            clearTimeout(timer.current);
        };
    }, [access_token]);

    return message;
};

export default useSSE;