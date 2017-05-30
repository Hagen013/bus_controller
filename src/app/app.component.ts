import { Component, OnInit } from '@angular/core';

import { Command } from './command';
import { index_variable } from './constants';
import { CommandsService } from './commands-service';
import { LineChartComponent } from "./app.chart.component"

@Component({
  selector: 'app',
  template: `
    <div class="app-header shadow-3">
        <button>Старт</button>
        <button>Значения переменных</button>
        <button>История комманд</button>
        <button>Настройки</button>
        <button>Стоп</button>
        <button>Очистить</button>
    </div>
    <div class="manager-content">
        <div class="left-content">
            <table>
                <tr>
                    <th class="number-column">No</th>
                    <th class="index-column">Index</th>
                    <th class="cycle-column">Cycle</th>
                    <th class="data-column">Data</th>
                </tr>
                <tr *ngFor="let variable of index_variables">
                    <td>{{variable.num}}</td>
                    <td>{{variable.index}}</td>
                    <td>{{variable.cycle}}</td>
                    <td>{{variable.data}}</td>
                </tr>
            </table>
            <div class="app-monitor">
                <div class="app-monitor__caption">Монитор</div>
                <li>
                </li>
            </div>
        </div>
        <div class="right-content">
            <ul class="commands">
                <li *ngFor="let command of commands" (click)="setCurrentCommand(command)">
                {{command.id}} {{command.index}} {{command.name}}  
                </li>
            </ul>
            <div class="current-command">
                <span *ngIf="current_command">
                {{current_command.id}} {{current_command.index}}  {{current_command.name}}
                </span>
            </div>
            <div class="command-button-wrapper">
            <button class="process-command-button shadow-1" (click)="processCommand(current_command)">КОМАНДА</button>
            </div>
        </div>
        <div class="clearfix"></div>
        <line-chart></line-chart>
    </div>
  `,
  providers: [CommandsService]
})
export class AppComponent implements OnInit {
    commands: Command[];
    current_command: Command;
    index_variables: index_variable[];

    constructor(private CommandsService: CommandsService) { }
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
    }
    processCommand(command: Command): void {
        if (typeof command != 'undefined') {
            console.log(command);
        };
    }
}