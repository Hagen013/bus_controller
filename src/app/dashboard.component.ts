import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';

import { Command } from './command';
import { index_variable } from './constants';
import { CommandsService } from './commands-service';


@Component({
  selector: 'app',
  template: `
    <div class="manager-content">
        <div class="left-content">
            <table class="data-table">
                <tr>
                    <th class="number-column">№</th>
                    <th class="index-column">Переменная</th>
                    <th class="data-column">Данные</th>
                </tr>
                <tr *ngFor="let variable of index_variables">
                    <td>{{variable.num}}</td>
                    <td>{{variable.index}}</td>
                    <td>{{variable.data}}</td>
                </tr>
            </table>
            <div class="app-monitor">
                <div class="app-monitor__caption">МОНИТОР</div>
                <div class="app-monitor__list">
                  <ul>
                    <li *ngFor="let command of processed_commands">
                      <span class="app-monitor__message-type">Отправка:</span> {{command.id}} {{command.index}} {{command.name}}  <div class="status success">  успешно</div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
        <div class="right-content">
          <div class="right-content__commands">
            <ul class="commands-list">
                <li *ngFor="let command of commands" (click)="setCurrentCommand(command)">
                {{command.id}} {{command.index}} {{command.name}}  
                </li>
            </ul>
            <div class="current-command">
                <span *ngIf="current_command; else noCommand">
                {{current_command.id}} {{current_command.index}}  {{current_command.name}}
                </span>
                <template #noCommand>
                  <span class="noCommand">команда не выбрана</span>
                </template>
            </div>
            <div class="command-button-wrapper">
            <button class="process-command-button shadow-1" (click)="processCommand(current_command)">Отправить команду</button>
            </div>
        </div>
          </div>
        <div class="clearfix"></div>
    </div>
  `,
  providers: [CommandsService]
})
export class DashboardComponent implements OnInit {
    displayMenu: boolean;
    commands: Command[];
    processed_commands: Command[];
    current_command: Command;
    index_variables: index_variable[];
    constructor(
      private CommandsService: CommandsService,
        private route: ActivatedRoute,
        private location: Location
    ) { }
    getCommands(): void {
        this.commands = this.CommandsService.getCommands();
    }
    getIndexVariables():void {
        this.index_variables = this.CommandsService.getIncludeVariables();
    }
    setCurrentCommand(command: Command): void {
        this.current_command = command;
    }
    ngOnInit(): void {
        this.getCommands();
        this.getIndexVariables();
        this.displayMenu = false;
        this.processed_commands = [];
    }
    toggleMenu(): void {
        console.log('Toggled');
        if (this.displayMenu) {
            this.displayMenu = false;
        }
        else {
            this.displayMenu = true;
        }
    }
    processCommand(command: Command): void {
        if (typeof command != 'undefined') {
            this.processed_commands.push(command);
        };
    }

    goBack(): void {
        this.location.back();
    }
}