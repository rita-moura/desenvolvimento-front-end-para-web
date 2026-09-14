const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

// Retângulo preenchido
ctx.fillStyle = '#3498db';
ctx.fillRect(50, 50, 200, 100);

// Retângulo com borda
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = 3;
ctx.strokeRect(300, 50, 200, 100);

// Círculo
ctx.beginPath();
ctx.arc(150, 250, 50, 0, 2 * Math.PI);
ctx.fillStyle = '#2ecc71';
ctx.fill();

// Gradiente linear
const gradiente = ctx.createLinearGradient(0, 0, 200, 0);
gradiente.addColorStop(0, '#e26767');
gradiente.addColorStop(1, '#303799');
ctx.fillStyle = gradiente;
ctx.fillRect(50, 350, 200, 100);

// Texto estilizado
ctx.font = '30px Arial';
ctx.fillStyle = '#a01abb';
ctx.fillText('HTML5 Canvas', 300, 400);