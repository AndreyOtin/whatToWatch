import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import MainScreen from '../../pages/main/main-screen';
import SignInScreen from '../../pages/sign-in/sign-in-screen';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root} element={<MainScreen/>}/>
    <Route path={AppRoute.Login} element={<SignInScreen/>}/>
  </Routes>);

export default App;
