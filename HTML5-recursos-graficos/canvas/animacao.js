function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar elementos animados
    const tempo = Date.now() * 0.002;
    const x = Math.cos(tempo) * 100 + 200;
    const y = Math.sin(tempo) * 50 + 150;
    
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    
    requestAnimationFrame(animar);
}
animar();