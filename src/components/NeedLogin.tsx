import {getGithubUrl} from '../utils';

const NeedLogin = () => {
  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5>Требуется аутентификация</h5>
      </div>
      <div className="card-body">
        <p className="card-text">Дла начала работы с программой пожалуйста аутентификация!</p>
        <a href={getGithubUrl()} className="btn btn-primary">Войти через GitHub</a>
      </div>
    </div>
  )
}

export default NeedLogin;
