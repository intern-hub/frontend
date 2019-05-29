export function myFetch(url, args) {
    return fetch(url, args).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.text().then((text) => {
            if (!text)
                return "";
            return JSON.parse(text);
        });
    });
}
