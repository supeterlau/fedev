const { log } = console;

type Parser<T> = (ctx: Context) => Result<T>;

type Context = Readonly<{
  text: string; // the whole input string
  index: number; // current position
}>;

type Result<T> = Success<T> | Failure;

type Success<T> = Readonly<{
  success: true;
  value: T;
  ctx: Context;
}>;

type Failure = Readonly<{
  success: false;
  expected: string;
  ctx: Context;
}>;

function success<T>(ctx: Context, value: T): Success<T> {
  return { success: true, value, ctx };
}

function failure(ctx: Context, expected: string): Failure {
  return { success: false, expected, ctx };
}

// example: cow

/*
function parseCow(ctx: Context): Result<string> {
  const match = "cow";
  const endIdx = ctx.index + match.length;
  // substring 截取 match.length 长
  if (ctx.text.substring(ctx.index, endIdx) === match) {
    return success({ ...ctx, index: endIdx }, match);
  } else {
    return failure(ctx, match);
  }
}
*/

// matcher: 匹配特定字符串
function str(match: string): Parser<string> {
  return (ctx) => {
    const endIdx = ctx.index + match.length;
    if (ctx.text.substring(ctx.index, endIdx) === match) {
      return success({ ...ctx, index: endIdx }, match);
    } else {
      return failure(ctx, match);
    }
  };
}

// 根据 str 生成 parser
// const parseCow = str("cow");
const cow = str("cow");
const says = str("says");
const moo = str("moo");
const space = str(" ");

const parseCowSentenceLong = function (ctx: Context) {
  const cowRes = cow(ctx);
  if (!cowRes.success) return cowRes;

  // 必须传入前一个 result 的 context
  const space1Res = space(cowRes.ctx);
  if (!space1Res.success) return space1Res;

  const saysRes = says(space1Res.ctx);
  if (!saysRes.success) return saysRes;

  const space2Res = cow(saysRes.ctx);
  if (!space2Res.success) return space2Res;

  const mooRes = moo(space2Res.ctx);
  if (!mooRes.success) return mooRes;

  return success(mooRes.ctx, [
    cowRes.value,
    space1Res.value,
    saysRes.value,
    space2Res.value,
    mooRes.value,
  ]);
};

// 简化 ctx 传递操作

function seq<T>(parsers: Parser<T>[]): Parser<T[]> {
  return (ctx) => {
    let values: T[] = [];
    let nextCtx = ctx;
    for (const parser of parsers) {
      const res = parser(nextCtx);
      // 如果出现错误
      // if (!res.success) return failure(res.ctx, "");
      if (!res.success) return res as Failure;
      values.push(res.value);
      nextCtx = res.ctx;
    }
    return success(nextCtx, values);
  };
}

const parseCowSentence = seq([cow, space, says, space, moo]);

const ctx = { text: "cow says moo", index: 0 };
const result = parseCowSentence(ctx);
// { success: true, value: 'cow', ctx: {text: 'cow say moo', index: 3} }

// log(result);

// matcher 匹配正则规则
function regex(re: RegExp, expected: string): Parser<string> {
  return (ctx) => {
    // lastIndex: The index at which to start the next match.
    re.lastIndex = ctx.index;
    const res = re.exec(ctx.text);
    if (res && res.index === ctx.index) {
      return success({ ...ctx, index: ctx.index + res[0].length }, res[0]);
    } else {
      return failure(ctx, expected);
    }
  };
}

// try each matcher
// 失败时 返回匹配最长的结果
function any<T>(parsers: Parser<T>[]): Parser<T> {
  return (ctx) => {
    let furthestRes: Result<T> | null = null;
    for (const parser of parsers) {
      const res = parser(ctx);
      if (res.success) return res;
      // 最长匹配不存在或，最长匹配比匹配到长度短
      if (!furthestRes || furthestRes.ctx.index < res.ctx.index)
        furthestRes = res;
    }
    return furthestRes as Failure;
  };
}

// matcher: match a parser 匹配时返回 null
function optional<T>(parser: Parser<T>): Parser<T | null> {
  return any([parser, (ctx) => success(ctx, null)]);
}

// matcher: 匹配 0 或 多个模式
function many<T>(parser: Parser<T>): Parser<T[]> {
  return (ctx) => {
    let values: T[] = [];
    let nextCtx = ctx;
    while (true) {
      const res = parser(nextCtx);
      if (!res.success) break;
      values.push(res.value);
      nextCtx = res.ctx;
    }
    return success(nextCtx, values);
  };
}

// build AST from input
function map<A, B>(parser: Parser<A>, fn: (val: A) => B): Parser<B> {
  return (ctx) => {
    const res = parser(ctx);
    return res.success ? success(res.ctx, fn(res.value)) : (res as Failure);
  };
}

// Language specific
// Parse tiny language

// PROGRAM = EXPR
// EXPR = CALL | NUMBER
// CALL = IDENT '('[ARGLIST]')'
// ARGLIST = ARG(','ARG)
// NUMBER =
// IDENT = /[A-ZA-Z][A-ZA-Z0-9]+/

// EXPR = CALL | NUMBER
type Expr = Call | number;

// CALL = IDENT '('[ARGLIST]')'

// interface Call {

// type Call = {
//   target: string;
//   args: Expr[];
// };

type Call = Readonly<{
  target: string;
  args: Expr[];
}>;

// ARGLIST = ARG(','ARG)
// NUMBER =
// IDENT = /[A-ZA-Z][A-ZA-Z0-9]+/

// top level parsing
function parse(text: string): Expr {
  const res = exprParser({ text, index: 0 });
  if (res.success) return res.value;
  throw `Parse error, expected ${(res as Failure).expected} at char ${
    res.ctx.index
  }`;
}

// EXPR = CALL | NUMBER
function exprParser(ctx: Context): Result<Expr> {
  return any<Expr>([callParser, numberParser])(ctx);
}

const identParser = regex(/[a-zA-Z][a-zA-Z0-9]*/g, "identifier");

// parse: number string
const numberParser = map(
  // + - 小数
  regex(/[+\-]?[0-9]+(\.[0-9]*)?/g, "number"),
  // convert via parseFloat
  parseFloat
);

// 匹配解析最后的参数 ',' arg
const trailingArgParser = map(
  seq<any>([str(","), exprParser]),
  ([_comma, argExpr]): Expr[] => argExpr
);

// args = expr ( trailingArg ) *
// 匹配一个 trailingArg 再反复匹配 expr
const argsParser = map(
  seq<any>([exprParser, many(trailingArgParser)]),
  ([arg1, rest]): Expr[] => [arg1, ...rest]
);

// CALL = IDENT '('[ARGLIST]')'
const callParser = map(
  seq<any>([identParser, str("("), optional(argsParser), str(")")]),
  ([fnName, _lh, argList, _rh]): Call => ({
    target: fnName,
    args: argList || [],
  })
);

function read(code: string) {
  log(JSON.stringify(parse(code), null, 2));
}

read("1");
read("Foo(Bar(1,2,3,-1.01))");
