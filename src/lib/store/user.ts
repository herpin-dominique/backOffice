/**
 * créer un store (setContext et getContext) pour gérer la session d'un utilisateur
 * - JSON.stringify: transformation d'un objet en string / JSON.parse l'inverse
 * - localStorage: persistance de la donnée dans le browser
 * - browser de '$app/environment' permet d'avoir un code exécuter uniquement dans le navigateur
 */
import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
export interface UserSession {
  isLogged: boolean;
  role?: string;
}
// valeur par défaut
export let userSession: Writable<UserSession | undefined> = writable(undefined);
// persister chaque nouvel valeur
userSession.subscribe((value) => {
  if (browser && value)
    localStorage.setItem("userSession", JSON.stringify(value));
});
// récupère la valeur stocker dans le local storage
if (browser) {
  const storageValue = localStorage.getItem("userSession");
  if (storageValue) userSession.set(JSON.parse(storageValue));
  else userSession.set({ isLogged: false });
}
