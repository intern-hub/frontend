// actions that need authenticating


import {myFetch} from "../utils/MyFetch";

export function updateIfExists(applicationId, update) {
    const token = window.localStorage.getItem("token");
    if (!token)
        return;

    const body = JSON.stringify({
        ...update
    });

    return myFetch(`https://internhub.us.to/api/applications/${applicationId}`, {
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    }).then(response => Promise.resolve(true))
        .catch(err => {
            console.error("Could not update application notes");
            return Promise.resolve(false);
        })
}

export function updateIfNotExists(positionId, update) {
    const token = window.localStorage.getItem("token");
    if (!token)
        return;

    return myFetch(`https://internhub.us.to/api/applications/`, {
        body: JSON.stringify({
            position: {
                id: positionId
            },
            ...update
        }),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then(response => Promise.resolve(true))
        .catch(err => {
            console.error("Could not create application");
            return Promise.resolve(false);
        })
}

export function getAllApplications(companyName) {
    const token = window.localStorage.getItem("token");
    if (!token)
        return Promise.resolve([]);

    return myFetch(`https://internhub.us.to/api/applications?coname=${companyName}`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        method: 'GET',
    }).then(response => {
        return response;
    }).catch(err => {
        console.error("Could not fetch applications for the given company");
        return [];
    })
}

