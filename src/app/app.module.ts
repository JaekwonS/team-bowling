import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { GamesScoresPage } from "../pages/games-scores/games-scores";
import { TeamsPage } from "../pages/teams/teams";
import { BowlerProfilePage } from "../pages/bowler-profile/bowler-profile";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { InformationPage } from "../pages/information/information";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// firebase imports
<<<<<<< HEAD
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireAuthModule } from "angularfire2/auth"; // authentication
import { AngularFirestoreModule } from "angularfire2/firestore"; // user info, data dictionary
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database"; // database
import { AngularFireStorageModule } from "angularfire2/storage";
<<<<<<< HEAD
=======
// import { AngularFireModule } from "angularfire2";
// import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFireAuthModule } from "angularfire2/auth"; // authentication
// import { AngularFirestoreModule } from "angularfire2/firestore"; // user info, data dictionary
// import {
//   AngularFireDatabaseModule,
//   AngularFireDatabase
// } from "angularfire2/database"; // database
// import { AngularFireStorageModule } from "angularfire2/storage";
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
import { SQLite } from "@ionic-native/sqlite";
import { DatabaseProvider } from "../providers/database/database";
import { HttpModule } from "@angular/http";
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
=======
>>>>>>> SQL adding Table working
import { SQLite } from "@ionic-native/sqlite";
import { DatabaseProvider } from "../providers/database/database";
import { HttpModule } from "@angular/http";
>>>>>>> no message
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30

@NgModule({
  declarations: [
    MyApp,
    GamesScoresPage,
    TeamsPage,
    BowlerProfilePage,
    EditProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    InformationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
    AngularFireModule.initializeApp(firebaseConfig),
=======
>>>>>>> no message
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(), //.enablePersistence() used for offline storage
    AngularFireDatabaseModule,
=======
    // AngularFireAuthModule,
    // AngularFirestoreModule.enablePersistence(), //.enablePersistence() used for offline storage
    // AngularFireDatabaseModule,
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesScoresPage,
    TeamsPage,
    BowlerProfilePage,
    EditProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    AngularFireDatabase,
<<<<<<< HEAD
=======
<<<<<<< HEAD
    { provide: ErrorHandler, useClass: IonicErrorHandler }
=======
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
=======
    // AngularFireDatabase,
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // AngularFireAuth,
    SQLite,
    DatabaseProvider
<<<<<<< HEAD
=======
>>>>>>> no message
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
  ]
})
export class AppModule {}
