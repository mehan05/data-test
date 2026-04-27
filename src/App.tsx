import { useAnalytics } from './useAnalytics';
import { Dashboard } from './Dashboard';
import './index.css';

function App() {
  const { data } = useAnalytics();

  return (
    <Dashboard data={data} />
  );
}

export default App;
