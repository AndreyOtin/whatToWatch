import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import MainScreen from '../../pages/main/main-screen';
import SignInScreen from '../../pages/sign-in/sign-in-screen';
import FilmScreen from '../../pages/film/film-screen';
import MyListScreen from '../../pages/my-list/my-list-screen';
import PlayerScreen from '../../pages/player/player-screen';
import AddReviewScreen from '../../pages/add-review/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root}>
      <Route index element={<MainScreen/>}/>
      <Route path={AppRoute.Login} element={<SignInScreen/>}/>
      <Route path={AppRoute.Film} element={<FilmScreen/>}/>
      <Route path={AppRoute.Favorites} element={<PrivateRoute><MyListScreen/></PrivateRoute>}/>
      <Route path={AppRoute.Player} element={<PlayerScreen/>}/>
      <Route path={AppRoute.Review} element={<PrivateRoute><AddReviewScreen/></PrivateRoute>}/>
      <Route path="*" element={<NotFoundScreen/>}/>
    </Route>
  </Routes>);

export default App;
