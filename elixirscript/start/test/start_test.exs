defmodule StartTest do
  use ExUnit.Case
  doctest Start

  test "greets the world" do
    assert Start.hello() == :world
  end
end
