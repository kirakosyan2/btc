export type RequestStatus = 'idle' | 'loading' | 'failed';

export const convertStrUnderscores = (str?: string): string | null => {
    if (!str?.length) return null;

    return (
        str
            .split(/(?=[A-Z])/)
            ?.join('_')
            .toLocaleLowerCase() ?? null
    );
};
