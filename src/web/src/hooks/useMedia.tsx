import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
    if (typeof window !== "undefined") {
        const media = window.matchMedia(`(max-width: 768px)`);
        media.addEventListener("change", callback);
        return () => media.removeEventListener("change", callback);
    }
    return () => {};
};

const getSnapshot = (width: number) => {
    return typeof window !== "undefined"
        ? window.matchMedia(`(max-width: ${width}px)`).matches
        : false;
};

const useMediaQuery = (width: number) => {
    return useSyncExternalStore(
        subscribe,
        () => getSnapshot(width),
        () => false
    );
};

export default useMediaQuery;
