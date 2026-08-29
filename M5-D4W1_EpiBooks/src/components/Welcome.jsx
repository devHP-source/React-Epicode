import {useLayoutEffect, useRef, useState} from "react"
import { Alert, Container } from "bootstrap"
import { Flame } from "lucide-react"

const Welcome = () => {
    const [showNotice, setShowNotice] = useState(true)
    const noticeRef = useRef(null)

    useLayoutEffect(() => {
        noticeRef.current?.setAttribute('role', 'note')
    }, [])

    return (
        <section className="hero">
            <Container>
                <Alert
                ref={noticeRef}
                show={showNotice}
                onClose={() => setShowNotice(false)}
                dismissible
                className="hero-notice"
                >
                    <Flame aria-hidden="true" className="hero-notice-mark" />
                    <span>New books just landed in the collection!</span>
                </Alert>

                <p className="hero-eyebrow">EpiBooks</p>
                <h1 className="hero-title">Every story in the gorgeous shelf</h1>
                <p className="hero-subtitle">
                    A catalogue of covers worth knowing.
                    Browse, discover and find your next book
                </p>
            </Container>
        </section>
    )
}

export default Welcome