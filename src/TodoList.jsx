import React, { useState, useEffect }from "react";
import './TodoList.css';
import Icone from './assets/icon.jpeg';


function TodoList() {
   
  const listaStorage = localStorage.getItem('Lista');
  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [novoItem, setNovoItem] = useState("");

  useEffect(()=>{
     localStorage.setItem('Lista', JSON.stringify(lista));
  }, [lista])
  function adicionaItem(form){
    form.preventDefault();
    if(!novoItem) {
      return;
    }

    setLista([...lista, {text: novoItem, isCompleteted: false,}])

    setNovoItem("");
    document.getElementById('input-entrada').focus();
}

function clicou(index){
  const listaAux = [...lista];
  listaAux[index].isCompleted = !listaAux[index].isCompleted;
  setLista(listaAux);
}

function deleta(index){
  const listaAux = [...lista];
  listaAux.splice(index, 1);
  setLista(listaAux);
}

function deletatudo(){
  setLista([]);
}
return (
  <div>
    <h1>Lista de Tarefas</h1>
    <form onSubmit={adicionaItem}>
      <input 
             id="input-entrada"
             type="text"
             value={novoItem}
             onChange={(e) => {setNovoItem(e.target.value)}}
             placeholder="Adicione uma Tarefa"/>
      <button className="add" type="Submit">Adicionar</button>       
    </form>

    <div className="ListaTarefas">
      <div style={{textAlign:"center"}}>
      {
        lista.length < 1
        ?
        <img class="icon-central" src={Icone}/>
        :
        lista.map((item, index) => (
          <div 
             key={index}
             className={item.isCompleted ? "item completo" : "item"}>
             <span onClick={()=>{ clicou(index) }}>{item.text}</span>
             <button onClick={()=>{ deleta(index)} } className="del">Deletar</button>
           </div>
        ))
        }
        {
        lista.length > 0 &&
       <button onClick={()=>{ deletatudo()} }className="deleteAll">Deletar</button>  }

       </div>
  </div>

 </div>
)
}
export default TodoList