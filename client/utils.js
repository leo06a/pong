import { status, vote_button } from './constants.js';

export function display_status(msg) {
    status.textContent = msg;
    status.style.display = 'block';
}

export function hide_status() {
    status.textContent = '';
    status.style.display = 'none';
}

export function display_vote_button() {
    vote_button.style.display = 'block';
    vote_button.disabled = false;
}

export function hide_vote_button() {
    vote_button.style.display = 'none';
}