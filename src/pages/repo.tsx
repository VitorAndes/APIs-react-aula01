import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./repos";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryCliente = useQueryClient();

  async function handleChangeRepositoryDescription() {
    const previousRepos = queryCliente.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.name === currentRepository) {
          return { ...repo, description: "testando" };
        } else {
          return repo;
        }
      });
      queryCliente.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-600 text-slate-200 h-screen ">
      <div className="flex flex-col items-center justify-center gap-4 bg-slate-950 w-72 h-72 rounded-md">
        <h1 className="text-2xl font-bold">{currentRepository}</h1>
        <button
          onClick={handleChangeRepositoryDescription}
          className="bg-slate-200 rounded-md text-slate-950 p-2 font-semibold"
        >
          Alterar descrição
        </button>
      </div>
    </div>
  );
}
