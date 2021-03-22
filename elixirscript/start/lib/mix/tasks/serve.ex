defmodule Mix.Tasks.Serve do
  use Mix.Task

  @impl Mix.Task
  def run(_args) do
    web = Path.join([File.cwd!(), 'js']) |> IO.inspect()

    # Mix.shell().cmd("npx http-server #{web} -o")
    Mix.shell().cmd("npx hs #{web} -o")
  end
end
