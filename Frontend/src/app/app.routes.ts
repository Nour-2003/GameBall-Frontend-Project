import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { FreindsComponent } from "./freinds/freinds.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomepageComponent },
  { path: "friends", component: FreindsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "**", component: PageNotFoundComponent },
];
