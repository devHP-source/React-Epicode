import fantasy from '../json/fantasy.json'
import history from '../json/history.json'
import horror from '../json/horror.json'
import romance from '../json/romance.json'
import scifi from '../json/scifi.json'

const seen = Object.create(null)

export const books = [fantasy, history, horror, romance, scifi]
    .flat().filter(book => {
        if (seen[book.asin]) return false
        seen[book.asin] = true
    return true
    })