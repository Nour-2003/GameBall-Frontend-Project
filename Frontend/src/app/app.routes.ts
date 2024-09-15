import { Routes, Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { inject } from "@angular/core";
import { HomepageComponent } from "./homepage/homepage.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FriendsComponent } from "./friends/friends.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserService } from "./user.service"; // Import UserService

const authGuard = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getUser().pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

const authReverseGuard = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getUser().pipe(
    map(user => {
      if (user) {
        router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    })
  );
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
