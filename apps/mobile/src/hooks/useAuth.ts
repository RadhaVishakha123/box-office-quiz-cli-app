import useAuthStore from '../stores/auth.store';
export const useAuth = () => {
  const { user, setUser } = useAuthStore();
  return { user, setUser };
};
