let inputName = document.querySelector(".nome");
let inputData = document.querySelector(".Data");
let submit = document.querySelector(".submit");
let modalNome = document.querySelector(".nome-modal");
let modalData = document.querySelector(".data-modal");
let decisao = false;
let corpo = document.querySelector(".lista-corpo");
let banco = {
    usuario: [
        {
            id: Date.now(),
            nome: "Amarildo",
            Data: "31/08/1970",
        }
    ],
    //CREATE
    criarHTML(nome, data, htmli = false) {
        let idnovo = Date.now();
        let lista = document.querySelector(".lista-corpo");
        if (!htmli) {
            banco.usuario.push({
                id: idnovo,
                nome: nome,
                Data: data,
            });
        }
        lista.insertAdjacentHTML("afterbegin", `<div class="item" id="${idnovo}">
        <p>Id:${idnovo}</p>
        <p>Nome: ${nome}</p>
        <p>Data de nascimento: ${data}</p>
        <i name="editar" class="fa-solid fa-pen-to-square"></i>
        <i name="deletar" class="fa-solid fa-xmark"></i>
    </div>`);
        console.log(banco.usuario)
    },
    //READ
    Ler() {
        banco.usuario.forEach((elemento) => {
            banco.criarHTML(elemento.nome, elemento.Data, true);
        })
    },
    // DELETE
    deletar(evento) {
        let click = evento.target;
        let botao = click.getAttribute("name");
        let filtrado;
        if (botao === "deletar") {
            let pai = click.parentNode;
            let idpai = pai.getAttribute("id");
            pai.remove();
            filtrado = banco.usuario.filter((elemento) => {
                return elemento.id != Number(idpai);
            })
            banco.usuario = filtrado;
            console.log(banco.usuario);
        }
    },
    //UPDATE
    update(evento) {
        let click = evento.target;
        let botao = click.getAttribute("name");
        let filtrado;
        if (botao === "editar") {
            let editar = document.querySelector(".modal");
            editar.style.display = "flex"
            let sai = document.querySelector("#sair");
            sai.addEventListener("click", function () {
                editar.style.display = "none"
            })
            let modalSubmit = document.querySelector(".submit-modal");
            let pai = click.parentNode;
            let idpai = pai.getAttribute("id");
            modalSubmit.addEventListener("click", function (e) {
                e.preventDefault();
                data(modalData, "modal-form sucess", "modal-form error");
                nome(modalNome, "modal-form sucess", "modal-form error");
                if (data(modalData, "modal-form sucess", "modal-form error") == true && nome(modalNome, "modal-form sucess", "modal-form error") == true) {
                    filtrado = banco.usuario.find((elemento) => {
                        if (elemento.id === Number(idpai)) {
                            pai.innerHTML = `<div class="item" id="${elemento.id}">
                    <p>Id:${elemento.id}</p>
                    <p>Nome: ${modalNome.value}</p>
                    <p>Data de nascimento: ${modalData.value}</p>
                    <i name="editar" class="fa-solid fa-pen-to-square"></i>
                    <i name="deletar" class="fa-solid fa-xmark"></i>
                </div>`
                            elemento.nome = modalNome.value;
                            elemento.Data = modalData.value;
                        }
                    });
                    console.log(banco.usuario);
                    editar.style.display = "none"
                }
            });
        }
    }

}
banco.Ler();

modalData.addEventListener("keyup", function (evento) {
    evento.preventDefault();
    data(modalData, "modal-form sucess", "modal-form error");
});
modalNome.addEventListener("keyup", function (evento) {
    evento.preventDefault();
    nome(modalNome, "modal-form sucess", "modal-form error");
})

inputName.addEventListener("keyup", function () {
    nome(inputName, "input-form sucess", "input-form error");
});

inputData.addEventListener("keyup", function () {
    data(inputData, "input-form sucess", "input-form error");
})

submit.addEventListener("click", function (evento) {
    evento.preventDefault();
    data(inputData, "input-form sucess", "input-form error");
    nome(inputName, "input-form sucess", "input-form error");
    if (data(inputData, "input-form sucess", "input-form error") && nome(inputName, "input-form sucess", "input-form error") == true) {
        banco.criarHTML(inputName.value, inputData.value, false);
    }
})
function data(data, classeC, classeE) {
    let dataValor = data.value;
    let regexData = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
    if (regexData.test(dataValor)) {
        correto(data, classeC);
        return true;
    } else {
        errado(data, "Digite somente a cada no estilo DD/MM/YYYY", classeE);
        return false;
    }
}
function nome(nome, classeC, classeE) {
    let nomeValor = nome.value;
    let regexName = /^([a-zA-Zà-úÀ-Ú]|-|_|\s)+$/;
    let nomes
    for (let i of banco.usuario) {
        nomes = i.nome;
    }
    if (nomeValor.length <= 3) {
        errado(nome, "Você precisa digitar no minimo 4 letras", classeE);
        return false;
    } else if (regexName.test(nomeValor) === false) {
        errado(nome, "Você pode escrever somente letras", classeE);
        return false;
    } else if (nomeValor.length >= 120) {
        errado(nome, "Você pode digitar no maximo 120 caracteres", classeE);
        return false;
    } else if (nomeValor === nomes) {
        errado(nome, "Este nome ja existe", classeE);
        return false
    } else {
        correto(nome, classeC);
        return true;
    }
}
function errado(input, mensage, classe) {
    let pai = input.parentNode;
    let mensagem = pai.querySelector("small");
    mensagem.innerHTML = mensage;
    pai.className = classe;
}
function correto(input, classe) {
    let pai = input.parentNode;
    pai.className = classe
}
corpo.addEventListener("click", function (evento) {
    banco.deletar(evento)
    banco.update(evento)
});
