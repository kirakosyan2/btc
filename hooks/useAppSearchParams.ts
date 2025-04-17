import { useSearchParams } from 'react-router-dom';

type ReturnValue<T> = {
    getAllValuesForParams: <Value>(field: keyof T) => Value[];
    getValuesForParams: <Value>(field: keyof T) => Value;
};

export const useAppSearchParams = <T>(value = window.location.search): ReturnValue<T> => {
    const [params] = useSearchParams(value);

    const getAllValuesForParams = <Value>(field: keyof T): Value[] => {
        const paramsFromUrl = params.getAll(field as string);
        return paramsFromUrl as Value[];
    };

    const getValuesForParams = <Value>(field: keyof T): Value =>
        params.get(field as string) as Value;

    return {
        getAllValuesForParams,
        getValuesForParams,
    };
};
