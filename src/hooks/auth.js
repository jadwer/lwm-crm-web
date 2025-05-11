import useSWR from "swr";
import axios from "@/lib/axiosClient";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

let csrfFetched = false;

// Encapsula la obtención del token CSRF para evitar peticiones repetidas
const csrf = async () => {
  if (!csrfFetched) {
    await axios.get("/sanctum/csrf-cookie");
    csrfFetched = true;
  }
};

// Hook principal de autenticación
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  // Carga inicial del usuario con manejo de errores
  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/user",
    (url) =>
      axios
        .get(url)
        .then((res) => res.data)
        .catch((error) => {
          if (error.response?.status === 409) {
            router.push("/verify-email");
          } else {
            throw error;
          }
        }),
    {
      shouldRetryOnError: false,
    }
  );

  // Función para registrar nuevo usuario
  const register = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (!error.response) return;

        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          throw error;
        }
      });
  };

  // Función de inicio de sesión
  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (!error.response) return;

        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          throw error;
        }
      });
  };

  // Solicitud de recuperación de contraseña
  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (!error.response) return;

        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          throw error;
        }
      });
  };

  // Restablecer contraseña con token
  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) => {
        router.push("/login?reset=" + btoa(response.data.status));
      })
      .catch((error) => {
        if (!error.response) return;

        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          throw error;
        }
      });
  };

  // Reenvío de correo de verificación
  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  // Cerrar sesión del usuario actual
  const logout = async () => {
    try {
      if (!error) {
        await axios.post("/logout");
        await mutate();
      }
    } catch (err) {
      console.error("Error cerrando sesión", err);
    } finally {
      router.push("/login");
    }
  };

  // Redirección encapsulada
  const redirect = (path) => {
    if (typeof window !== "undefined") {
      router.push(path);
    }
  };

  // Manejo de lógica para middleware (guest/auth)
  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      redirect(redirectIfAuthenticated);

    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      redirect(redirectIfAuthenticated);

    if (middleware === "auth" && error) logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  // Permite forzar la recarga del usuario
  const me = () => mutate();

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    me,
  };
};

/* import useSWR from 'swr'
//import axios from '@/lib/axios'
import axios from '@/lib/axiosClient'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => {
                return res.data
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
                console.log(error)
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                console.log(error)
                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                console.log(error)
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
                console.log(error)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
*/
