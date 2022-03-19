import {useRecoilState} from 'recoil';
import {userDetailsAtom} from '../../store/store';
import styles from './UserInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useMemo} from 'react';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

interface DetailRow {
  field: string,
  title: string,
  icon: IconProp|IconDefinition
}

const UserInfo = () => {

  const [userDetails] = useRecoilState(userDetailsAtom);

  const targets = useMemo<DetailRow[]>(() => {
    if (!userDetails) return [];
    return [
      {field: userDetails.company, title: 'Компания', icon: ['far','building']},
      {field: userDetails.email, title: 'Электронная почта', icon: ['far','envelope']},
      {field: userDetails.location, title: 'Местоположение', icon: ['fas','location-dot']},
      {field: userDetails.blog, title: 'Ссылка', icon: ['fas','link']},
      {field: userDetails.twitter_username, title: 'Twitter', icon: faTwitter},
    ];
  }, [userDetails]);

  return (
    <div className="container">

      {userDetails &&
          <div className={styles.userCard}>
              <div className={styles.portrait}>
                  <img src={userDetails.avatar_url} className={styles.avatar} alt="" />
                  <a href={userDetails.url} className={styles.username}>{userDetails.login}</a>
              </div>
              <div className={styles.details}>
                <div className="mt-2 mb-3">
                  Биография:
                  <pre>{userDetails.bio}</pre>
                </div>
                { targets.map(({field, title, icon}, index) => (
                  <div className={styles.row} title={title} key={index}>
                    <FontAwesomeIcon icon={icon} className={styles.icon} />
                    {field}
                  </div>
                ))}
              </div>
          </div>
      }

      <div className="row">
        <pre>{false && JSON.stringify(userDetails, null, 2)}</pre>
      </div>
    </div>
  )
}

export default UserInfo;
