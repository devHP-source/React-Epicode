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

/*
const TOKEN = import.meta.env.VITE_STRIVE_TOKEN

if (!TOKEN) {
    console.error(
        '[commentsApi] VITE_STRIVE_TOKEN is not set. Add it to .env.local ' +
        '(VITE_STRIVE_TOKEN=your_token) and restart `npm run dev`.'
    )
}
*/

/*
const authHeaders = () => ({ Authorization: `Bearer ${TOKEN}` })
const jsonHeaders = () => ({ ...authHeaders(), 'Content-Type': 'application/json' })

const handle = async response => {
    if (!response.ok) {
        throw new Error(`Strive comments API error: ${response.status} ${response.statusText}`)
    }
    // DELETE and some responses can have an empty body.
    const text = await response.text()
    return text ? JSON.parse(text) : null
}

// GET every comment for one book. elementId is the book's asin.
// NOTE: if your Epicode materials use a different URL for this, it's this line.
export const getComments = async elementId => {
    const response = await fetch(`${BASE_URL}/books/${elementId}/comments/`, {
        headers: authHeaders(),
    })
    return handle(response)
}

// POST a new comment. payload: { comment, rate, elementId }
export const createComment = async payload => {
    const response = await fetch(`${BASE_URL}/comments/`, {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify(payload),
    })
    return handle(response)
}

// PUT (edit) an existing comment by its _id.
export const updateComment = async (commentId, payload) => {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: jsonHeaders(),
        body: JSON.stringify(payload),
    })
    return handle(response)
}

// DELETE a comment by its _id.
export const deleteComment = async commentId => {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handle(response)
}
*/