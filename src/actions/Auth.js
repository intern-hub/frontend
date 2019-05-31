// actions that need authenticating


import {myFetch} from "../utils/MyFetch";

export function updateIfExists(applicationId, applicationNotes) {
    const token = window.localStorage.getItem("token");
    if (!token)
        return;

    myFetch(`https://internhub.us.to/api/applications/${applicationId}`, {
        body: JSON.stringify({
            notes: applicationNotes
        }),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    }).catch(err => {
        console.error("Could not update application notes");
    })
}

export function updateIfNotExists(positionId, applicationNotes) {
    const token = window.localStorage.getItem("token");
    if (!token)
        return;

    myFetch(`https://internhub.us.to/api/applications/`, {
        body: JSON.stringify({
            position: {
                id: positionId
            },
            notes: applicationNotes
        }),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).catch(err => {
        console.error("Could not create application");
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

