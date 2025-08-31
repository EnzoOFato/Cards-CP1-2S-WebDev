let dadosBase = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/1000x1000/1_andressa_alves-28517463.png?20230718122116?20230718122116",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://ds-images.bolavip.com/news/image/800/800/?src=https://images.bolavip.com/webp/br/full/BBR_20241120_BBR_1044804_Dayana-Rodriguez-Gremio-1-e1732064611820.webp",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://www.ogol.com.br/img/jogadores/new/64/05/526405_mariza_20250418225822.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://conteudo.imguol.com.br/c/esporte/48/2020/01/02/thais-regina-zagueira-do-time-profissional-feminino-do-sao-paulo-1577988540825_v2_3x4.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://esportenewsmundo.com.br/wp-content/uploads/2023/04/photo_5028456485507672716_y.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

dicPosicoes = {
    "Goleira": "Gol",
    "Zagueira": "Zag",
    "Meio-campo": "Mei",
    "Atacante": "Ata"
}

window.onload = function(){
  displayJogadoras()
  document.querySelector('.card-container').addEventListener('click', favoritar);
}

function displayJogadoras(){
    const listaJogadoras = document.querySelector(".card-container")
    listaJogadoras.innerHTML = ""
    dadosBase.forEach((jogadora, index) => {
        const card = document.createElement("div")
        card.classList.add("card-jogadora")
        
        jogadora.foto ? card.style.backgroundImage = `url("${jogadora.foto}")`:  card.style.backgroundImage = "linear-gradient(red,white,black)"
        card.style.backgroundSize = "cover"
        card.style.backgroundPosition = "center"
        
        let posicaoAbreviada = dicPosicoes[jogadora.posicao] || "?"
        
        card.innerHTML = `
        <div class='stats'>
          <h1>${jogadora.nome}</h1>
          <h2>${jogadora.clube}</h2>
          <div class='stats-campo'>
            <p>Gols: ${jogadora.gols}</p>
            <p>Asst: ${jogadora.assistencias}</p>
            <p>Jogs: ${jogadora.jogos}</p>
          </div>
          <div class='extra'>
            <p>${posicaoAbreviada}</p>
            <button data-action='favoritar' data-index='${index}'>${jogadora.favorita ? `<img src='src/assets/favorito.png'>` : `<img src='src/assets/neutro.png'>`}</button>
          </div>
        </div>
        `
        listaJogadoras.append(card)
    })
}

function favoritar(e){
  const jogadoraFavoritada = e.target.closest("button")
  index = jogadoraFavoritada.dataset.index
  if(dadosBase[index].favorita){
    dadosBase[index].favorita = false
  }
  else{
    dadosBase[index].favorita = true
  }
  displayJogadoras()
}