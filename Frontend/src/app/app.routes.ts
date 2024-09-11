import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FriendsComponent } from "./friends/friends.component";
import { LoginComponent } from "./login/login.component"; // Add import for LoginComponent
import { RegisterComponent } from "./register/register.component"; // Add import for RegisterComponent

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "friends", component: FriendsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent }, // Add route for LoginComponent
  { path: "register", component: RegisterComponent }, // Add route for RegisterComponent
  { path: "**", component: PageNotFoundComponent },
];
