const AMAZON_IMAGE_HOST = /(^|\.)(images-amazon|ssl-images-amazon|media-amazon)\.com$/i

export const coverUrl = (rawUrl, edgePx = 318) => {
    try {
        const url = new URL(rawUrl)
        if (!AMAZON_IMAGE_HOST.test(url.hostname)) return rawUrl

        const fileName = url.pathname.split('/').pop()
            if (fileName.split('.').length !== 2) return rawUrl

            url.pathname = url.pathname.replace(/(\.[^.]+)$/, `._SX${edgePx}_$1`)
            return url.toString()
    } catch {
        return rawUrl
    }
}