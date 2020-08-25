import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

class MainApp extends StatelessWidget {
 @override
 Widget build(BuildContext context) {
  // final wordPair = WordPair.random();
  return MaterialApp(
    title: 'Name Generator',
    // theme: ThemeData(
    //     primaryColor: Colors.white
    // ),
    theme: ThemeData.dark(),
    home: RandomWords(),
  );
 }
}

class RandomWords extends StatefulWidget {
 @override
 _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
 final List<WordPair> _suggestions = <WordPair>[];
 final TextStyle _biggerFont = const TextStyle(fontSize: 18.0);
 final Set<WordPair> _saved = Set<WordPair>();

 @override
 Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Name Generator'),
      actions: <Widget>[
        IconButton(
            icon: const Icon(Icons.list),
            onPressed: _pushSaved
        )
      ],
    ),
    body: _buildSuggestions(),
  );
 }

 Widget _buildSuggestions() {
  return ListView.builder(
    padding: EdgeInsets.all(16.0),
    itemBuilder: (context, i) {
     if (i.isOdd) return Divider();

     final index = i ~/ 2;  // 计算减去分隔线后实际数量
     if (index >= _suggestions.length) {
       _suggestions.addAll(generateWordPairs().take(10));
     }
     return _buildRow(_suggestions[index]);
    }
  );
 }

 Widget _buildRow(WordPair pair) {
   final bool alreadySaved = _saved.contains(pair);

  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
    ),
    onTap: () {
      setState(() {
        if (alreadySaved) {
          _saved.remove(pair);
        } else {
          _saved.add(pair);
        }
      });
    }
  );
 }

 void _pushSaved() {
   Navigator.of(context).push(
       MaterialPageRoute<void>(
           builder: (BuildContext context) {
             final Iterable<ListTile> tiles = _saved.map(
                 (WordPair pair) {
                   return ListTile(
                       title: Text(
                           pair.asPascalCase,
                           style: _biggerFont,
                       )
                   );
                 }
             );
             final List<Widget> divided = ListTile.divideTiles(
                 context: context,
                 tiles: tiles,
             ).toList();

             return Scaffold(
                 appBar: AppBar(
                     title: const Text('Saved Suggestions'),
                 ),
                 body: ListView(children: divided),
             );
           }
       )
   );
 }
}
