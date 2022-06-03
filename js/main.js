/**
 * @name main.js
 * @file Add a small description for this file.
 * @author Esteban Padilla, ep@estebanpadilla.com
 * @version 1.0.0
 */

'use strict';

// import '../css/style.css';
// import '../index.html'
import { GameManager } from './managers/gameManager';

window.addEventListener('load', init, false);

function init() {
    console.log('App running!');
    //1. Declare variables
    //2. Initialize variables
    //3. Events
    //4. Program Logic
    let gameManager = new GameManager();
}