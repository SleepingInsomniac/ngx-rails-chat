import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HTTPService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CableService } from './services/cable.service';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { DateformatPipe } from './pipes/dateformat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    ChatroomComponent,
    SignupComponent,
    HeaderComponent,
    DateformatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    HTTPService,
    AuthService,
    UserService,
    CableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
