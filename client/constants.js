export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
export let status = document.getElementById('status');
export let join_button = document.getElementById('join_game');
export const vote_button = document.getElementById('vote_button');
export let title_screen = document.getElementById('title_screen');
export const socket = io();