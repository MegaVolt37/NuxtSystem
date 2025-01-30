import { FetchOptions } from "ohmyfetch";
import { FetchError } from 'ofetch';

export const useAPI = async <T>(url: string, opts?: FetchOptions): Promise<T> => {
  const config = useRuntimeConfig();
  const { setError } = useStoreError();
  const { logout, setToken, setRefreshToken } = useStoreAuth();
  const { getToken, getRefreshToken } = storeToRefs(useStoreAuth());
  
  const baseUrl = config.public.baseURL;
  const versionAPI = config.public.versionAPI;

  const apiUrl = `${baseUrl}${versionAPI}/`;
  
  const headers: HeadersInit = {
    ...(opts?.headers || {}),
    ...(getToken.value && { Authorization: `Bearer ${getToken.value}` }),
  };

  try {
    const response = await $fetch<T>(apiUrl + url, { ...opts, headers });
    return response;
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status === 403) {
        logout();
      } else if (e.status === 401) {
        // Проверяем наличие refresh token
        const refreshToken = getRefreshToken.value;
        if (getToken && refreshToken) {
          try {
            // Запрос на обновление токена
            const refreshResponse = await $fetch<IRequestToken>(`${apiUrl}auth/jwt/refresh/`, {
              method: 'POST',
              body: { refresh: refreshToken },
            });

            // Перезаписываем токены
            setToken(refreshResponse.access);
            setRefreshToken(refreshResponse.refresh);

            // Повторяем исходный запрос с новым access token
            headers.Authorization = `Bearer ${refreshResponse.access}`;
            const retryResponse = await $fetch<T>(apiUrl + url, { ...opts, headers });
            return retryResponse; // Возвращаем повторный ответ
          } catch (refreshError) {
            // Обработка ошибок при обновлении токена
            console.error('Failed to refresh token:', refreshError);
            logout(); // Вызываем выход из системы, если не удалось обновить токен
          }
        }
      } else {
        setError(e);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      throw e; // Выбрасываем ошибку после обработки
    } else {
      throw e as FetchError; // Обработка других ошибок
    }
  }
};