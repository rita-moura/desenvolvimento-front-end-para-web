const video = document.getElementById('meuVideo');

// Métodos principais
video.play();        // Iniciar reprodução
video.pause();       // Pausar reprodução
video.load();        // Recarregar vídeo

// Propriedades úteis
video.currentTime = 30;     // Pular para 30 segundos
video.volume = 0.5;         // Volume 50%
video.playbackRate = 1.5;   // Velocidade 1.5x

video.addEventListener('loadstart', () => console.log('Iniciou carregamento'));
video.addEventListener('canplay', () => console.log('Pronto para reproduzir'));
video.addEventListener('ended', () => console.log('Reprodução finalizada'));
video.addEventListener('error', () => console.log('Erro na reprodução'));