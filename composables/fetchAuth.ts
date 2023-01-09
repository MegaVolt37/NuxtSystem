import { FetchOptions } from "ohmyfetch";
import { storeError } from '~/store/Error';
import { storeAuth } from '~/store/Auth';
export const fetchAuth = (url: string, opts?: FetchOptions) => {
  const config = useRuntimeConfig()
  const err = storeError()
  const auth = storeAuth()
  const baseUrl = config.public.baseURL
  const tokenState = useState('token')
  const headers: HeadersInit = {
    ...(opts?.headers || {}),
    ...(tokenState && { Authorization: `Bearer ${tokenState.value}` }),
  };
  return $fetch(baseUrl + url, { ...opts, headers })
    .catch((e) => {
      if (e.status === 403) {
        auth.logout();
      } else {
        err.setError(e)
        setTimeout(() => {
          err.setError("")
        }, 3000);
      }
    });
};