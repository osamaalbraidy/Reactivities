import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
    createActivity: () => void
}

const Navbar = ({ createActivity }: Props) => {
    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="Logo" style={{ marginRight: '10px' }} />
                        Reactivies
                    </Menu.Item>
                    <Menu.Item name='Activities' />
                    <Menu.Item>
                        <Button positive content='Create Avtivity' onClick={() => createActivity()} />
                    </Menu.Item>
                </Container>
            </Menu>
        </>
    )
}

export default Navbar
