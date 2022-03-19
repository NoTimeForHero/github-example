import {Container, Nav, Navbar, NavDropdown, Spinner} from 'react-bootstrap';
import {useCallback, useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {appStateAtom, BlockState, userDetailsAtom} from '../store/store';
import {doLogout, getGithubUrl} from '../services/github/auth';
import {UrlAvatarMissing} from '../services/github/settings';

export const FullNavbar = () => {

  const [appState, setAppState] = useRecoilState(appStateAtom);
  const [userDetails] = useRecoilState(userDetailsAtom);

  const onLogoutClick = useCallback(() => {
    doLogout();
    setAppState(BlockState.Unauthorized);
  }, [setAppState]);

  const userBlock = useMemo(() => {
    switch (appState) {
      case BlockState.Loading:
        return <Spinner animation="border" variant="light" />;
      case BlockState.Unauthorized:
        return <Nav.Link href={getGithubUrl()}>Login</Nav.Link>
      case BlockState.UserUnknown:
        return <Nav.Link href="#" onClick={onLogoutClick}>Logout</Nav.Link>
      case BlockState.UserSpecific:
        return (
          <NavDropdown title={<span className="pe-1">
              <img src={userDetails?.avatar_url || UrlAvatarMissing} className="avatar-img me-2" height="48" width="48" alt=""/>
              <span>{userDetails?.login}</span>
            </span>}>
            <NavDropdown.Item href="#" onClick={onLogoutClick}>Logout</NavDropdown.Item>
          </NavDropdown>
        );
      default:
        throw new Error(`Invalid state: ${appState}`);
    }
  }, [appState, userDetails, onLogoutClick]);

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
