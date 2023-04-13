import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import MainScreen from '../../pages/main/main-screen';
import SignInScreen from '../../pages/sign-in/sign-in-screen';
import FilmScreen from '../../pages/film/film-screen';
import MyListScreen from '../../pages/my-list/my-list-screen';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root} element={<MainScreen/>}/>
    <Route path={AppRoute.Login} element={<SignInScreen/>}/>
    <Route path={AppRoute.Film} element={<FilmScreen/>}/>
    <Route path={AppRoute.Favorites} element={<MyListScreen/>}/>
  </Routes>);

export default App;
