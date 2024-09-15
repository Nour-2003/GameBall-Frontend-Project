import { Routes, Router } from "@angular/router";
import { inject } from "@angular/core";
import { HomepageComponent } from "./homepage/homepage.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FriendsComponent } from "./friends/friends.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { getUser } from "./util/app.constants"; // Import the getUser function

// Guard to protect routes if user is not logged in
const authGuard = () => {
  const router = inject(Router);
  const user = getUser(); // Use the getUser function

  if (user) {
    return true; // Allow access if user exists
  } else {
    router.navigate(['/login']); // Redirect to login if user is null
    return false;
  }
};

// Guard to prevent access to login/register if user is already logged in
const authReverseGuard = () => {
  const router = inject(Router);
  const user = getUser(); // Use the getUser function

  if (user) {
    router.navigate(['/home']); // Redirect to home if user is already logged in
    return false;
  } else {
    return true; // Allow access if no user is logged in
  }
};

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomepageComponent, canActivate: [authGuard] }, // Protect this route
  { path: "friends", component: FriendsComponent, canActivate: [authGuard] }, // Protect this route
  { path: "profile", component: ProfileComponent, canActivate: [authGuard] }, // Protect this route
  { path: "login", component: LoginComponent, canActivate: [authReverseGuard] }, // Prevent access if logged in
  { path: "register", component: RegisterComponent, canActivate: [authReverseGuard] }, // Prevent access if logged in
  { path: "**", component: PageNotFoundComponent },
];
