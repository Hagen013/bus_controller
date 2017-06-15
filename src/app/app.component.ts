import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
    <div class="main-menu">
      <ul class="main-menu__list">
        <li>
          <a class="main-menu__link main-menu__telemetry" routerLink="/charts">Телеметрия</a>
        </li>
        <li>
          <a class="main-menu__link main-menu__commands" routerLink="/dashboard">Команды</a>
        </li>
        <li>
          <a class="main-menu__link main-menu__settings" routerLink="/#">Настройки</a>
        </li>
      </ul>
    </div>
    <div class="nav-top shadow-5">
      <div class="nav-top__item float-item start-button">
        <div class="nav-top__item-caption start-button__caption">
        СТАРТ
        </div>
      </div>
      <div class="nav-top__item float-item stop-button">
        <div class="nav-top__item-caption stop-button__caption">
        СТОП
        </div>
      </div>
      <div class="nav-top__item float-item stop-button">
        <div class="nav-top__item-caption stop-button__caption">
        ИСТОРИЯ
        </div>
      </div>
      <div class="nav-top__status float-item">
        ОСТАНОВЛЕН
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}




