defmodule Start.MixProject do
  use Mix.Project

  def project do
    [
      aliases: aliases(),
      app: :start,
      version: "0.1.0",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      compilers: Mix.compilers ++ [:elixir_script],
      elixir_script: [
        input: Start.Main,
        output: "js/app"
      ]
    ]
  end

  # task 组合
  defp aliases do
    [
      dep: "do deps.get, deps.clean --unused --unlock, compile"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
      # {:elixir_script, "~> x.x"}
      # {:elixir_script, "~>"}
      # {:elixir_script, "*"}
      {:elixir_script, ">= 0.0.0"}
    ]
  end
end
