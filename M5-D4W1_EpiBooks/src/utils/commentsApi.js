const ENDPOINT = 'https://striveschool-api.herokuapp.com/api'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTYyNGVhODIxMDU5ZjAwMTVlMjNhMGQiLCJpYXQiOjE3ODkxMjg4NjYsImV4cCI6MTc5MDMzODQ2Nn0.OfmRdP4HMjodsQAEoM8YIC5yKlGhZTtnz5nnXE0jPLQ'

const authHeaders = {
    Authorization: `Bearer ${API_TOKEN}`
}

export const getComments = async asin => { // GET
    const response = await fetch(`${ENDPOINT}/books/${asin}/comments/`, {
        headers: authHeaders,
    })
    if (!response.ok) throw new Error(`Coult not LOAD reviews for (${response.status})`)
    const data = await response.json()
return Array.isArray(data) ? data : []
}

export const createComment = async ({ comment, rate, elementId }) => { // POST
    const response = await fetch(`${ENDPOINT}/comments/`, {
        method: 'POST',
        headers: { ...authHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, rate, elementId }),
    })
    if (!response.ok) throw new Error(`Could not POST review for (${response.status})`)
return response.json()
}


export const updateComment = async (commentId, { comment, rate, elementId }) => { // PUT
    const response = await fetch(`${ENDPOINT}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            ...authHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, rate, elementId }),
    })
    if (!response.ok) throw new Error(`Could not UPDATE review (${response.status})`)
return response.json()
}

export const deleteComment = async commentId => {
    const response = await fetch(`${ENDPOINT}/comments/${commentId}`, {
        method: 'DELETE',
        headers: authHeaders,
    })
    if (!response.ok) throw new Error(`Could not DELETE review (${response.status})`)
return response.json()
}
