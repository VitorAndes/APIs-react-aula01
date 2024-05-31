import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export type Repository = {
  name: string;
  description: string;
};

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export function Repos() {
  const { data, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await api.get("users/vitorandes/repos");

      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minuto
    }
  );

  return (
    <div className="flex flex-wrap gap-4 min-h-screen justify-center content-center  bg-slate-600">
      {isFetching && <p>Carregando...</p>}
      {data?.map((repo) => {
        return (
          <div
            key={repo.name}
            className="flex flex-col justify-center text-center items-center gap-4 rounded-md bg-slate-950 text-slate-200 w-64 h-56 p-4"
          >
            <Link to={`repos/${repo.name}`} className="font-bold text-2xl">{repo.name}</Link>
            <p className="text-sm">{repo.description}</p>
          </div>
        );
      })}
    </div>
  );
}
