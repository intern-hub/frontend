export function myFetch(url, args) {
    return fetch(url, args).then((response) => {
        if (!response.ok) {
            const status = `${response.status}`;
            return response.text().then((text) => {
                if (!text)
                    throw new Error(status);
                throw new Error(JSON.parse(text).error);
            });
        }

        return response.text().then((text) => {
            if (!text)
                return "";
            return JSON.parse(text);
        });
    });
}

export const cancellableFetch = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
            error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

