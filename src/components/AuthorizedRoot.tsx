import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {ReactElement} from 'react';
import UserInfo from './pages/UserInfo';
import UserRepos from './pages/UserRepos';

interface PathType {
  path: string,
  title: string,
  render: ReactElement|undefined
}

const navigationItems : PathType[] = [
  {
    path: '/repos',
    title: 'Репозитории',
    render: <UserRepos />,
  },
  {
    path: '/',
    title: 'Информация о пользователе',
    render: <UserInfo />,
  },
];

const AuthorizedRoot = () => {
  const currentUrl = useLocation().pathname;
  return (
    <div>
      <nav>
        <ul className="nav nav-pills px-2 py-3">
          {[...navigationItems].reverse().map(({path, title}) => (
            <li className="nav-item" key={path}>
              <Link to={path} className={`nav-link ${currentUrl===path?'active':''}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Switch>
        {navigationItems.map(({path, render}) => (
          <Route path={path} key={path}>{render}</Route>
        ))}
      </Switch>
    </div>
  );
};

const WrappedRoot = () => {
  return (<Router>
    <AuthorizedRoot />
  </Router>)
}

export default WrappedRoot;
