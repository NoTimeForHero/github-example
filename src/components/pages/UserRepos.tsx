import {useRecoilState} from 'recoil';
import {userReposAtom} from '../../store/store';
import {useMemo, useState} from 'react';
import formatDate from '../../utils/date';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

enum FilterVisibility {
  All,
  Public,
  Private
}

const FilterVisibilityTitles : [FilterVisibility,string][] = [
  [FilterVisibility.All, 'Все'],
  [FilterVisibility.Public, 'Публичные'],
  [FilterVisibility.Private, 'Приватные']
];

const UserRepos = () => {

  const [filter, setFilter] = useState<FilterVisibility>(FilterVisibility.All);
  const [userRepos] = useRecoilState(userReposAtom);

  const filteredRepos = useMemo(() => userRepos.filter((repo) => {
    switch (filter) {
      case FilterVisibility.All:
        return true;
      case FilterVisibility.Private:
        return repo.private;
      case FilterVisibility.Public:
        return !repo.private;
      default:
        throw new Error(`Unknown filter type: ${filter}`);
    }
  }), [userRepos, filter]);

  return (
    <div>

      <ul className="nav nav-pills px-2 pb-3">
        {FilterVisibilityTitles.map(([filterType, title]) => (
          <li className="nav-item" key={filterType}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href='#'
               className={`nav-link ${filter===filterType?'active':''}`}
               onClick={() => setFilter(filterType)}>
              {title}
            </a>
          </li>
        ))}
      </ul>

      <table className="table table-bordered">
        <thead>
          <tr className="table-primary">
            <th>Автор</th>
            <th>Название</th>
            <th>Язык</th>
            <th>Последний коммит</th>
          </tr>
        </thead>
        <tbody>
        {filteredRepos.map((repo) => (
          <tr key={repo.id}>
            <td>
              <img src={repo.owner.avatar_url} className="rounded-circle me-3" width="32" height="32" alt="" />
              <a href={repo.owner.html_url}>{repo.owner.login}</a>
            </td>
            <td>
              <FontAwesomeIcon icon={['fas', repo.private ? 'lock' : 'user-group']} className="me-2 text-muted" />
              <a href={repo.html_url}>{repo.name}</a>
            </td>
            <td>
              <span className="fw-bold">{repo.language}</span>
            </td>
            <td>
              {formatDate(repo.updated_at)}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserRepos;
