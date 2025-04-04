export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
export let winner_div = document.getElementById('winner');
export let join_button = document.getElementById('join_game');
export let title_screen = document.getElementById('title_screen');
export const socket = io();