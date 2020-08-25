import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

class MainApp extends StatelessWidget {
 @override
 Widget build(BuildContext context) {
  // final wordPair = WordPair.random();
  return MaterialApp(
    title: 'Name Generator',
    home: RandomWords(),
  );
 }
}

class RandomWords extends StatefulWidget {
 @override
 _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
 final _suggestions = <WordPair>[];
 final _biggerFont = TextStyle(fontSize: 18.0);

 @override
 Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Name Generator'),
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
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    )
  );
 }
}
