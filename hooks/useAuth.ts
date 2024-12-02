import { AppDispatch, RootState } from "@/store";
import { clearAuth, setAuth } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const login = (accessToken: string, user: { id: string; email: string }) => {
    dispatch(
      setAuth({
        accessToken,
        user,
      })
    );
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return { accessToken, user, login, logout };
};
