export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");
export let winner_div = document.getElementById('winner');
export const socket = io();