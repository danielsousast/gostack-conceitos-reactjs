import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
      const repository = {
        title,
        url,
        techs,
      };
  
      const response = await api.post('/repositories', repository);
  
      setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
      <div className="container">
        <input
          type="text"
          placeholder="Título do repositório"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Url do repositório"
          value={url}
          required
          onChange={(event) => setUrl(event.target.value)}
        />

        <input
          type="text"
          placeholder="Tecnologias do repositório"
          value={techs}
          required={true}
          onChange={(event) => setTechs(event.target.value)}
        />

        <button onClick={handleAddRepository}>Adicionar</button>
        <ul data-testid="repository-list">
           {repositories.map((repository) => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))}
         
        </ul>
      </div>
  )}

export default App;
