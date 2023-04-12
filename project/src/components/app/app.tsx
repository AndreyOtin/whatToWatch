import { useCheckAuthQuery, useGetCommentsQuery } from '../../api/api';

function App(): JSX.Element {
  const query = useCheckAuthQuery();
  console.log(query);
  return <p>Hello, world!</p>;
}

export default App;
