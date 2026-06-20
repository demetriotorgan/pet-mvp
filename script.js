import { botaoCamera, video, canvas, capturar, enviar, galeria, cancelar } from "./js/dom.js";
import { fotoBlob, streamAtual, setFotoBlob, setStreamAtual } from "./js/estado.js";
import { abrirCamera, resetarCaptura,capturarFoto } from "./js/camera.js";
import { postarFoto, listarFotos } from "./js/api.js";
import { criarCard } from "./js/card.js";
import { adicionarFotoGaleria, carregarGaleria } from "./js/galeria.js";
import { criarPayload } from "./js/payload.js";

//--------AbrirCamera
botaoCamera.addEventListener("click", abrirCamera);

//-----Fechar Camera
cancelar.addEventListener("click", resetarCaptura);

//----Capturar Imagem
capturar.addEventListener("click", capturarFoto);

//----Enviar foto
enviar.addEventListener("click", async () => {
   const formData = criarPayload("Jão SIX-SEVEN", 15);
   if(!formData){
        alert("Nenhuma foto capturada!");
        return;
   }

    try {
        const data = await postarFoto(formData);
        adicionarFotoGaleria(data);        
        resetarCaptura();

        console.log("Resposta do servidor: ", data);
            alert('Foto SIX-SEVEN postada com sucesso!');
    } catch (error) {
        console.error("Erro ao enviar para API:", error);
        alert('SIX-SEVEN com problemas!')
    }
});

//---Carregar Fotos
carregarGaleria();
