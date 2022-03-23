import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Redux Thunk es un middleware que le permite invocar creadores de acciones que devuelven una función en vez de un objeto de acción. 
// Esa función recibe el método de envío de la tienda,
//  que luego se utiliza para enviar acciones síncronas regulares dentro del cuerpo de 
//  la función una vez que se completaron las operaciones asíncronas.

//  Redux Thunk se usa con mayor frecuencia para comunicarse de manera asíncrona con una API externa y,
//   así, recuperar o guardar datos. Redux Thunk facilita el envío de acciones que siguen el ciclo de vida de una solicitud a una API externa.

// Normalmente, crear un nuevo elemento de tarea implica enviar primero una acción para indicar que se inició la creación de un elemento de tarea.
//  Luego, si el elemento de tarea se crea correctamente y el servidor externo lo devuelve, se envía otra acción con el nuevo elemento de tarea.
//  En el caso de que se produzca un error y la tarea no se guarde en el servidor, se puede enviar una acción con el error.