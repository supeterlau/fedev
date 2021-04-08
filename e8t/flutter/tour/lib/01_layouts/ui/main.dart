import 'package:flutter/material.dart';
// import './card.dart' as view;
// import './intro_01.dart' as view;
import './appbar_01.dart' as view;

class MainApp extends StatelessWidget {
  final title = "UI demo";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: title,
      // theme: ThemeData.dark(),
      home: Scaffold(
        // appBar: AppBar(
        //   title: Text(title)
        // ),
        body: view.Main()
      ),
    );
  }
}
