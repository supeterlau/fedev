import 'package:flutter/material.dart';

class MainAppBar extends StatelessWidget {
  MainAppBar({this.title});

  final Widget title;

  @override
  Widget build(BuildContext context) {
    double statusBarHeight = MediaQuery.of(context).padding.top;
    return Container(
      height: 56.0,  // pixels
      margin: EdgeInsets.only(top: statusBarHeight),
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      child: Row(
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null,
          ),
          Expanded(
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null
          )
        ]
      )
    );
  }
}
class Main extends StatelessWidget {
  // MyScaffold
  @override
  Widget build(BuildContext context) {
    // Material 是概念上显示 UI 的一片纸
    return Material(
      child: Column(
        children: <Widget>[
          MainAppBar(
            title: Text(
              'Example Title',
              style: Theme.of(context).primaryTextTheme.headline
            )
          ),
          Expanded(
            child: Center(
              child: Text('Material World')
            )
          )
        ]
      )
    );
  }
}
