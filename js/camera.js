import { video, canvas, cameraContainer } from "./dom.js";
import { streamAtual, setStreamAtual, setFotoBlob } from './estado.js'

export async function abrirCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        setStreamAtual(stream);

        video.srcObject = stream;

        // garante que o vídeo carregou metadata (CRÍTICO no mobile)
        await new Promise(resolve => {
            video.onloadedmetadata = () => resolve();
        });

        // inicia playback do vídeo
        await video.play();

        // só depois libera UI
        mostrarVideo();

    } catch (error) {
        console.error("Erro câmera:", error);
        alert(error.name + ": " + error.message);
    }
}
//---Capturar Imagem
export function capturarFoto() {
    const contexto = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
        if (!blob) {
            console.error("Falha ao gerar blob");
            return;
        }

        setFotoBlob(blob);
        mostrarPreview();
    }, "image/jpeg", 0.9);
}

//-----Reset Cam
export function resetarCaptura() {
    //limpa o blob
    setFotoBlob(null);

    //limpa o canva
    const contexto = canvas.getContext("2d");
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 0;
    canvas.height = 0;

    //fecha o stream atual
    if (streamAtual) {
        streamAtual.getTracks().forEach(track => {
            track.stop();
        });
        setStreamAtual(null);
    }
    //remove video
    video.srcObject = null;
    cameraContainer.style.display = "none";
};

function mostrarVideo() {
    cameraContainer.style.display = "block";
    video.style.display = "block";
    canvas.style.display = "none";
}
export function mostrarPreview() {
    video.style.display = "none";
    canvas.style.display = "block";
}

