const BASE_URL = 'https://striveschool-api.herokuapp.com/api'

// Personal Strive/Epicode token. Set it in .env.local (see .env.example) and
// restart the dev server. It is read at build time, so a running `npm run dev`
// will NOT pick up a new value until restarted.
const TOKEN = import.meta.env.VITE_STRIVE_TOKEN

if (!TOKEN) {
    console.error(
        '[commentsApi] VITE_STRIVE_TOKEN is not set. Add it to .env.local ' +
        '(VITE_STRIVE_TOKEN=your_token) and restart `npm run dev`.'
    )
}

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
