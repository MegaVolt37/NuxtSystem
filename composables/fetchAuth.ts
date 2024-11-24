import { FetchOptions } from "ohmyfetch";

export const fetchAuth = (url: string, opts?: FetchOptions): Promise<unknown> => {
  const config = useRuntimeConfig()
  const {setError} = useStoreError()
  const { logout } = useStoreAuth()
  const {getToken} = storeToRefs(useStoreAuth())
  const baseUrl = config.public.baseURL || 'http://localhost:5000'
  const headers: HeadersInit = {
    ...(opts?.headers || {}),
    ...(getToken.value && { Authorization: `Bearer ${getToken.value}` }),
  };
  return $fetch(baseUrl + url, { ...opts, headers })
    .catch((e) => {
      if (e.status === 403) {
        logout();
      } else {
        setError(e)

        setTimeout(() => {
          setError("")
        }, 3000);
      }
    });
};