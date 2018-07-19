import { Core }  from '../database/core';

let DatabaseCore = new Core("localhost", "root", "root", "node", "3307");

export { DatabaseCore };