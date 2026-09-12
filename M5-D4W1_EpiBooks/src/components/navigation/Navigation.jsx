import {useEffect, useState} from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {Menu, X} from 'lucide-react'
import epicodeLogo from '../../assets/epicode-logo.png'
import './css/Navigation.css'

const links = ['Home', 'About', 'Browse']

const Navigation = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const trackScroll = () => setIsScrolled(window.scrollY > 8)
        trackScroll()
        window.addEventListener('scroll', trackScroll, {passive: true})
        return () => window.removeEventListener('scroll', trackScroll)
    }, [])

    const close = () => setIsExpanded(false)

    return (
        <Navbar
        expand="md"
        fixed="top"
        expanded={isExpanded}
        onToggle={setIsExpanded}
        className={isScrolled ? 'glass-nav glass-nav-solid' : 'glass-nav'}
        >
            <Container>
                <Navbar.Brand href='#' className='glass-brand' onClick={close}>
                    <img src={epicodeLogo} alt='Epicode Logo' className='glass-brand-mark' />
                    EpiBooks
                </Navbar.Brand>

                <Navbar.Toggle>
                    {isExpanded ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                </Navbar.Toggle>

                <Navbar.Collapse id='main-nav' className='glass-collapse'>
                    <Nav className='ms-auto glass-links'>
                        {links.map(label => (
                            <Nav.Link key={label} href='#' className='glass-link' onClick={close}>
                                {label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation