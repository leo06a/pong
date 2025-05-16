import { status } from './constants.js';

export function display_status(msg) {
    status.textContent = msg;
    status.style.display = 'block';
}

export function hide_status() {
    status.textContent = '';
    status.style.display = 'none';
}