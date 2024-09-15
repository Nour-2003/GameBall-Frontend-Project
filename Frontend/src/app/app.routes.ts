import { Routes, Router } from "@angular/router";
import { inject } from "@angular/core";
import { HomepageComponent } from "./homepage/homepage.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FriendsComponent } from "./friends/friends.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { getUser } from "./util/app.constants"; 

const authGuard = () => {
  const router = inject(Router);
  const user = getUser(); 

  if (user) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

const authReverseGuard = () => {
  const router = inject(Router);
  const user = getUser();

  if (user) {
    router.navigate(['/home']); 
    return false;
  } else {
    return true; 
  }
};

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomepageComponent, canActivate: [authGuard] }, 
  { path: "friends", component: FriendsComponent, canActivate: [authGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent, canActivate: [authReverseGuard] }, 
  { path: "register", component: RegisterComponent, canActivate: [authReverseGuard] }, 
  { path: "**", component: PageNotFoundComponent },
];
