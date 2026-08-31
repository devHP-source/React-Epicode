import {Col, Container, Row} from 'react-bootstrap'
import {ArrowUpRight} from 'lucide-react'
import epicodeLogo from '../assets/epicode-logo.png'

const siteMap = [
    {
        heading: 'Catalogue',
        entries: [ 'Fantasy', 'History', 'Horror', 'Romance', 'Sci-fi' ] 
    },
    {
        heading: 'EpiBooks',
        entries: ['About', 'Careers', 'Press', 'Contact']
    },
    {
        heading: 'Support',
        entries: ['Shipping', 'Returns', 'Gift cards', 'Help centre']
    },
]

const socials = [
    {
        label: 'Github',
        href: 'https://github.com/devHP-source?tab=repositories'
    },
    {
        label: 'Instagram',
        href: '#'
    },
    {
        label: 'LinkedIn',
        href: '#'
    },
]

const MyFooter = () => (
    <footer className="footer">
        <Container>
            <Row className="g-4">
                {siteMap.map(column => (
                    <Col key={column.heading} xs={6} md={3}>
                        <h3 className="footer-heading">{column.heading}</h3>
                        <ul className="footer-list">
                            {column.entries.map(entry => (
                                <li key={entry}>
                                    <a href="#" className="footer-link">{entry}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                ))}

                <Col xs={6} md={3}>
                    <h3 className="footer-heading">Socials</h3>
                    <ul className="footer-list">
                        {socials.map(destination => {
                            const isExternal = destination.href !== '#'
                            return (
                                <li key={destination.label}>
                                    <a
                                    href={destination.href}
                                    className="footer-link footer-link-external"
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    >
                                    {destination.label}
                                    <ArrowUpRight aria-hidden="true" className="footer-link-mark" />
                                    </a> 
                                </li>
                                )
                            })}
                    </ul>
                </Col>
            </Row>

            <div className="footer-baseline">
                <p className="footer-copy">
                    <img src={epicodeLogo} alt="Epicode Logo" className="footer-mark"/>
                    &copy;Copyright {new Date().getFullYear()} EpiBooks by devByPau
                </p>
                <p className="footer-copy">Built with React & Bootstrap</p>
            </div>
        </Container>
    </footer>
)

export default MyFooter