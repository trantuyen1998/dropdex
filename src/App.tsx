import { ethers } from 'ethers';
import Layout from 'layout/Layout';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Subscribe from 'pages/Subscribe/Subscribe';
import SwapChart from 'pages/Swap/SwapChart';
import SwapCoin from 'pages/Swap/SwapCoin';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import { PersistGate } from 'zustand-persist';

const queryClient = new QueryClient();
(window as any).ethers = ethers;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/staking" element={<Subscribe />} />
            <Route path="/swap" element={<SwapCoin />} />
            <Route path="/swap/:pairAddress/pairs/:pairId/name/:name" element={<SwapChart />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </PersistGate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
