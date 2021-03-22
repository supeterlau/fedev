'use strict';
import ElixirScript from './ElixirScript.Core.js';
function __info__(kind) {
    const __info__map__ = new Map([[Symbol.for('functions'), [new ElixirScript.Core.Tuple(Symbol.for('add'), 2), new ElixirScript.Core.Tuple(Symbol.for('hello'), 0)]], [Symbol.for('macros'), []], [Symbol.for('attributes'), [new ElixirScript.Core.Tuple(Symbol.for('vsn'), [228440941123524785496408776530106858049])]], [Symbol.for('compile'), [new ElixirScript.Core.Tuple(Symbol.for('version'), [55, 46, 54, 46, 54]), new ElixirScript.Core.Tuple(Symbol.for('options'), [Symbol.for('no_spawn_compiler_process'), Symbol.for('from_core'), Symbol.for('no_core_prepare'), Symbol.for('no_auto_import')]), new ElixirScript.Core.Tuple(Symbol.for('source'), '/Users/quantum/HQ/Space/peterlau/fedev/elixirscript/start/lib/main.ex')]], [Symbol.for('md5'), new ElixirScript.Core.BitString(ElixirScript.Core.BitString.integer(171), ElixirScript.Core.BitString.integer(220), ElixirScript.Core.BitString.integer(31), ElixirScript.Core.BitString.integer(249), ElixirScript.Core.BitString.integer(170), ElixirScript.Core.BitString.integer(251), ElixirScript.Core.BitString.integer(92), ElixirScript.Core.BitString.integer(183), ElixirScript.Core.BitString.integer(196), ElixirScript.Core.BitString.integer(113), ElixirScript.Core.BitString.integer(217), ElixirScript.Core.BitString.integer(16), ElixirScript.Core.BitString.integer(219), ElixirScript.Core.BitString.integer(233), ElixirScript.Core.BitString.integer(58), ElixirScript.Core.BitString.integer(65))], [Symbol.for('module'), Symbol.for('Elixir.Start.Main')]]);

    const value = __info__map__.get(kind);

    if (value !== null) {
        return value;
    }

    throw new ElixirScript.Core.Patterns.MatchError(kind);
}

function add(...__function_args__) {
    function recur(...__function_args__) {
        let __arg_matches__ = null;

        let __intermediate__ = null;

        if ((__arg_matches__ = ElixirScript.Core.Patterns.match_or_default([ElixirScript.Core.Patterns.variable('a'), ElixirScript.Core.Patterns.variable('b')], __function_args__, (a0, b0) => {
            return true;
        })) !== null) {
            let [a0, b0] = __arg_matches__;

            return a0 + b0;
        }

        throw new ElixirScript.Core.Patterns.MatchError(__function_args__);
    }

    return ElixirScript.Core.Functions.trampoline(new ElixirScript.Core.Functions.Recurse(recur.bind(null, ...__function_args__)));
}

function hello(...__function_args__) {
    function recur(...__function_args__) {
        let __arg_matches__ = null;

        let __intermediate__ = null;

        if ((__arg_matches__ = ElixirScript.Core.Patterns.match_or_default([], __function_args__, () => {
            return true;
        })) !== null) {
            let [] = __arg_matches__;

            return 'Hello ElixirScript';
        }

        throw new ElixirScript.Core.Patterns.MatchError(__function_args__);
    }

    return ElixirScript.Core.Functions.trampoline(new ElixirScript.Core.Functions.Recurse(recur.bind(null, ...__function_args__)));
}

export default {
    add,
    hello,
    __MODULE__: Symbol.for('Elixir.Start.Main'),
    __info__
};
