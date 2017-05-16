import { Injectable } from '@angular/core';

import { Command } from './command';
import { COMMANDS } from './commands';
import { index_variables, index_variable } from './constants';

@Injectable()
export class CommandsService {
  getCommands(): Command[] {
    return COMMANDS;
  }
  getIncludeVariables(): index_variable[] {
      return index_variables;
  }
}