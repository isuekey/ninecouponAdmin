import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AreaComponent } from "../pages/area/area";
import { ShopareaComponent } from "../pages/shoparea/shoparea";
import { ShoplistComponent } from "../pages/shoplist/shoplist";
import { TemplatelistComponent }  from "../pages/templatelist/templatelist";
import { TemplateaccessComponent } from "../pages/templateaccess/templateaccess";
import { Resource } from "../providers/resource";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AreaComponent,ShopareaComponent,ShoplistComponent,
    TemplatelistComponent,TemplateaccessComponent
    ],
    imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AreaComponent,ShopareaComponent,ShoplistComponent,
    TemplatelistComponent,TemplateaccessComponent
    ],
    providers: [
    StatusBar,
    SplashScreen,
    Resource,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
