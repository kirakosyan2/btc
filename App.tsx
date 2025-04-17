import { Provider } from 'react-redux';
import { AppRoutes } from './AppRoutes';
import store from '@redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { ErrorBoundary } from '@components/ErrorBoundary';

function App() {
    return (
        <>
            <ErrorBoundary>
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token
                            colorPrimary: '#1549AB',
                        },
                    }}
                >
                    <Provider store={store}>
                        <BrowserRouter future={{ v7_startTransition: true }}>
                            <AppRoutes />
                        </BrowserRouter>
                    </Provider>
                </ConfigProvider>
            </ErrorBoundary>
        </>
    );
}

export default App;
