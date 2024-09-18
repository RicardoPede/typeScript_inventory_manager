import AppRouters from './routers/AppRouters';
import { AxiosProvider } from './contexts/AxiosContext.tsx';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <Provider store={store}>
        <AxiosProvider>
          <AppRouters />
        </AxiosProvider>
    </Provider>
  )
}

export default App
