import { Link } from 'react-router-dom';
import cl from './not-found.module.css';
import { FaSadTear } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../consts/enum';

type NotFoundScreenProps = {
  resetNotFound?: () => void;
}

const NotFoundScreen = ({ resetNotFound }: NotFoundScreenProps) => (
  <main className={cl.container}>
    <Helmet>
      <title>Not found</title>
    </Helmet>
    <FaSadTear className={cl.sadFace}/>
    <h1>404. Page not found</h1>
    <Link onClick={resetNotFound} className={cl.link} to={AppRoute.Root}>Вернуться на главную</Link>
  </main>
);

export default NotFoundScreen;
