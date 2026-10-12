import { Routes } from '@angular/router';
import { canAvtivaleLogin } from './services/login/access.guard';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./home/home").then((m) => m.Home)
        }
    },
    {
        path: "todos",
        loadComponent: () => {
            return import("./todos/todos").then((m) => m.Todos)
        }
    },
    {
        path: "products",
        loadComponent: () => {
            return import("./products/products").then((m) => m.Products)
        }
    },
    {
        path: "profiles",
        loadComponent: () => {
            return import("./profiles/profiles").then((m) => m.Profiles)
        },
        canActivate: [canAvtivaleLogin]
    },
    {
        path: "login",
        loadComponent: () => {
            return import("./login/login").then((m) => m.LoginComponent)
        }
    },
    {
        path: "my-profile",
        loadComponent: () => {
            return import("./my-profile/my-profile").then((m) => m.MyProfile)
        }
    },
     {
        path: "chats",
        loadComponent: () => {
            return import("./chats/chats").then((m) => m.Chats)
        }
    },
     {
        path: "search",
        loadComponent: () => {
            return import("./search/search").then((m) => m.Search)
        }
    }
];
