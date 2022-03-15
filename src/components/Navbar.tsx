import {Navbar, Nav, NavDropdown, Container, Spinner} from 'react-bootstrap';
import {useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {appStateAtom, BlockState, userDetailsAtom} from '../store/store';
import {UrlAvatarMissing} from '../utils';

export const FullNavbar = () => {

  const [appState] = useRecoilState(appStateAtom);
  const [userDetails] = useRecoilState(userDetailsAtom);

  const userBlock = useMemo(() => {
    switch (appState) {
      case BlockState.Loading:
        return <Spinner animation="border" variant="light" />;
      case BlockState.Unauthorized:
        return <Nav.Link href="#">Login</Nav.Link>
      case BlockState.UserUnknown:
        return <Nav.Link href="#">Logout</Nav.Link>
      case BlockState.UserSpecific:
        return (
          <NavDropdown title={<span className="pe-1">
              <img src={userDetails?.avatar || UrlAvatarMissing} className="avatar-img me-2" height="48" width="48" alt=""/>
              <span>{userDetails?.username}</span>
            </span>}>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        );
      default:
        throw new Error(`Invalid state: ${appState}`);
    }
  }, [appState, userDetails]);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>GitHub Example</Navbar.Brand>
        <Nav>{userBlock}</Nav>
      </Container>
    </Navbar>
  )
}

export default FullNavbar;
