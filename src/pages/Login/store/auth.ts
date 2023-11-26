import { persist } from 'utils/persistZustand';
import create from 'zustand';

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const initialState: Pick<AuthState, 'isLoggedIn' | 'token'> = {
  token: '',
  isLoggedIn: false,
};

const useAuthStore = create<AuthState>(
  persist(
    {
      key: 'auth',
      allowlist: ['token'],
    },
    (set) => ({
      ...initialState,
      login: (token: string) => {
        return set((state) => ({
          ...state,
          token: token,
          isLoggedIn: true,
        }));
      },
      logout: () => {
        return set((state) => ({ ...state, ...initialState }));
      },
    }),
  ),
);

export default useAuthStore;
