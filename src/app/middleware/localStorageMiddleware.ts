import { Middleware } from "@reduxjs/toolkit";
import { UserActions } from "@/features/user/userSlice";

export const localStorageMiddleware: Middleware = store => next => (action: UserActions) => {
    console.log(action);
    const result = next(action);
  
    // Проверка logIn
    if (action.type === 'user/logIn') {
      const { username, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem(username) || '{}')
  
      if (storedUser.username === username && storedUser.password === password) {
        store.dispatch({ type: 'user/loginSuccess', payload: storedUser.username })
      } else {
        store.dispatch({ type: 'user/loginFail', payload: 'Invalid username or password' })
      }
    }

    // Регистрация пользователя
    if (action.type === 'user/signup') {
      const { username } = action.payload;
      // Проверить нет ли пользователя с таким именем
      const storedUser = JSON.parse(localStorage.getItem(username) || '{}')
      if (storedUser.username === username) {
        store.dispatch({ type: 'user/signupFail', payload: 'Registration fail: Username is already taken!'})
        return result;
      }

      try {
        localStorage.setItem(username, JSON.stringify(action.payload))
      } catch(err) {
        store.dispatch({ type: 'user/signupFail', payload: 'Registration fail: check if storage is disabled or if it is full!'})
        return result;
      }

      store.dispatch({ type: 'user/signupSuccess', payload: username})
    }
  
    return result
  }
  