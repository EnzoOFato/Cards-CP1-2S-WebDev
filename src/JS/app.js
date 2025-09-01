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
  carregaDados()
  salvaDados()
  displayJogadoras()

  document.querySelector(".card-container").addEventListener("click", ClickCard)
  document.querySelector("#adicionar").addEventListener("click", abrirModal)
  document.querySelector("#fecha-modal").addEventListener("click", fecharModal)
  document.querySelector("#salva-jogadora").addEventListener("click", adicionaJogadora)
  document.querySelector("#atualiza-jogadora").addEventListener("click", atualizaInfo)
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
          <div class='btns-UD'>
            <button class='ud-btn' data-action='atualizar' data-index='${index}'>Upd</button>
            <button class='ud-btn' data-action='deletar' data-index='${index}'>Del</button>
          </div>
        </div>
        `
        listaJogadoras.append(card)
    })
}

function ClickCard(e){
  const clicked = e.target.closest("button")
  if(!clicked) return

  index = clicked.dataset.index
  acao = clicked.dataset.action

  if(acao === "favoritar") favoritar(index)

  if(acao === "atualizar") atualizaCard(index)

  if(acao === "deletar") deletarCard(index)

}

function salvaDados() {
    localStorage.setItem("dadosBase", JSON.stringify(dadosBase));
}

function carregaDados() {
    const dadosArmazenados = localStorage.getItem("dadosBase");
    if (dadosArmazenados) {
        dadosBase = JSON.parse(dadosArmazenados);
    }
}

function abrirModal(){
  const modal = document.querySelector("#form-modal")
  if(!modal.open){
    modal.showModal()
  }
}

function fecharModal(){
  const modal = document.querySelector("#form-modal")
  if(modal.open){
    modal.close()
  }
  resetAdicao()
}

function resetAdicao(){
  document.querySelector("#formulario").reset()
  document.querySelector("#modal-titulo").innerHTML = "Adicionar Jogadora"

  document.querySelector("#salva-jogadora").style.display = "inline-block"
  document.querySelector("#atualiza-jogadora").style.display = "none"
}

function adicionaJogadora(e){
  e.preventDefault()

  const nome = document.querySelector("#nome-input").value
  const clube = document.querySelector("#clube-input").value
  const imagem = document.querySelector("#imagem-input").value
  const posicao = document.querySelector("#posicao-select").value
  const gols = document.querySelector("#gol-input").value
  const assintencias = document.querySelector("#ass-input").value
  const jogos = document.querySelector("#jogos-input").value

  if(!nome || !clube || !posicao || isNaN(gols) || isNaN(assintencias) || isNaN(jogos)){
    alert("Preencha todos os campos do formulário (imagem não é obrigatório)")
    return
  }

  novaJogadora = {
    "nome": nome,
    "posicao": posicao,
    "clube": clube,
    "foto": imagem,
    "gols": gols,
    "assistencias": assintencias,
    "jogos": jogos,
    "favorita": false
  }

  dadosBase.push(novaJogadora)
  salvaDados()

  document.querySelector("#formulario").reset()
  displayJogadoras()

  fecharModal()

  alert(`Jogadora ${nome} cadastrada com sucesso!`)
}

function favoritar(){
  if(dadosBase[index].favorita){
    dadosBase[index].favorita = false
  }
  else{
    dadosBase[index].favorita = true
  }
  salvaDados()
  displayJogadoras()
}

function deletarCard(index){
  const escolha = confirm(`Tem certeza que deseja excluir a jogadora ${dadosBase[index].nome}`)
  if(escolha){
    dadosBase.splice(index, 1)
    alert("Jogadora excluída com sucesso!")
  }
  salvaDados()
  displayJogadoras()
}

let indexEdicao = undefined

function atualizaCard(index){
  tituloModal = document.querySelector("#modal-titulo")
  tituloModal.innerHTML = `Atualizar dados ${dadosBase[index].nome}`
  abrirModal()
  document.querySelector("#nome-input").value = dadosBase[index].nome
  document.querySelector("#clube-input").value = dadosBase[index].clube
  document.querySelector("#imagem-input").value = dadosBase[index].foto
  document.querySelector("#gol-input").value = dadosBase[index].gols
  document.querySelector("#ass-input").value = dadosBase[index].assistencias
  document.querySelector("#jogos-input").value = dadosBase[index].jogos
  document.querySelector("#posicao-select").value = dadosBase[index].posicao

  document.querySelector("#salva-jogadora").style.display = "none"
  document.querySelector("#atualiza-jogadora").style.display = "inline-block"

  indexEdicao = index
}

function atualizaInfo(e){
  e.preventDefault()

  const nome = document.querySelector("#nome-input").value
  const clube = document.querySelector("#clube-input").value
  const imagem = document.querySelector("#imagem-input").value
  const posicao = document.querySelector("#posicao-select").value
  const gols = document.querySelector("#gol-input").value
  const assintencias = document.querySelector("#ass-input").value
  const jogos = document.querySelector("#jogos-input").value

  if(!nome || !clube || !posicao || isNaN(gols) || isNaN(assintencias) || isNaN(jogos)){
    alert("Preencha todos os campos do formulário (imagem não é obrigatório)")
    return
  }

  const escolha = confirm(`Tem certeza que deseja atualizar os dados dessa jogadora?`)
  if(escolha){
    dadosBase[indexEdicao].nome = nome
    dadosBase[indexEdicao].clube = clube
    dadosBase[indexEdicao].foto = imagem
    dadosBase[indexEdicao].posicao = posicao
    dadosBase[indexEdicao].gols = gols
    dadosBase[indexEdicao].jogos = jogos
    dadosBase[indexEdicao].assistencias = assintencias

    alert(`${nome} atualizada com sucesso`)
    indexEdicao = undefined

    salvaDados()
    displayJogadoras()
    resetAdicao()
    fecharModal()
  }
}