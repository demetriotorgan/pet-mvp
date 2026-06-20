import { video,canvas, cameraContainer } from "./dom.js";
import {streamAtual, setStreamAtual, setFotoBlob} from './estado.js'

//---Abrir Camera
export async function abrirCamera(){     
    try {
         const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        setStreamAtual(stream);
        video.srcObject = stream;

        mostrarVideo();

    } catch (error) {
         alert('Erro ao iniciar camera');
        console.log("Erro ao acessar a câmera", error);
    }
};

//---Capturar Imagem
export function capturarFoto(){
    const contexto = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    contexto.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
        setFotoBlob(blob);

        mostrarPreview();

        console.log("Foto Capturada: ", blob);
    }, "image/jpeg", 0.9);
}

//-----Reset Cam
export function resetarCaptura(){
    //limpa o blob
    setFotoBlob(null);

    //limpa o canva
    const contexto = canvas.getContext("2d");
    contexto.clearRect(0,0, canvas.width, canvas.height);

    canvas.width = 0;
    canvas.height=0;

      // esconde canvas e vídeo
    esconderTudo();

    //fecha o stream atual
    if(streamAtual){
        streamAtual.getTracks().forEach(track =>{
            track.stop();
        });
        setStreamAtual(null);
    }
    //remove video
    video.srcObject = null;
    cameraContainer.style.display = "none";
};

export function mostrarVideo() {
    cameraContainer.style.display = "block";
    video.style.display = "block";
    canvas.style.display = "none";
};

export function mostrarPreview() {
    cameraContainer.style.display = "block";
    video.style.display = "none";
    canvas.style.display = "block";
};

export function esconderTudo() {
    video.style.display = "none";
    canvas.style.display = "none";
    cameraContainer.style.display = "none";
};