import 'package:flutter/material.dart';
import "dart:math";

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final colors = [
      Colors.green, 
      Colors.red, 
      Colors.blueAccent,
      Colors.deepPurple,
    ];
    return MaterialApp(
      title: 'Name Generator',
      // theme: ThemeData.dark(),
      home: Scaffold(
        appBar: AppBar(
          title: Text("Exploring Widgets")
        ),
        body: widgetDemo()
      ),
    );
  }

  Widget widgetDemo() {
    // return Container(
    //   // color: ([Colors.green, Colors.red, Colors.blueAccent]).toList()..shuffle().first
    //   color: colors[Random().nextInt(colors.length)]
    // );
    
    /*
    return Text(
      "Try out Widgets",
      style: TextStyle(
        fontSize: 30.0
      )
    );
    */

    // Add padding
    /*
    return Padding(
      padding: EdgeInsets.all(16.0),
      // 嵌套 widget 使用 child 属性
      child: Text(
        'Hello use Padding'
      )
    );
    */

    /* Button Widget
    return RaisedButton(
      child: const Text('Click this Button'),
      color: Colors.blue,
      elevation: 4.0,
      splashColor: Colors.yellow,
      onPressed: () {
        print('--- Click ---');
      }
    );

    return FlatButton(
      child: const Text('Click flat Button'),
      color: Colors.blue,
      splashColor: Colors.yellow,
      onPressed: () {
        print('--- Click ---');
      }
    );
    */

    /* TextField widget (user input)
    return TextField(
      decoration: InputDecoration(
        // border: InputBorder.none,
        hintText: "What's going on"
      )
    );
    */

    /* ListView widget
    return ListView.builder(
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          title: Text('Row $index'),
          onTap: () {
            print('Tap on $index');
          }
        );
      }
    );
    */

    // Basic layout widgets single child

    /* Padding Center
    return Padding(
      padding: EdgeInsets.all(8.0),
      child: Center(
          child: Text(
              'Basic Layout',
              style: TextStyle(fontSize: 30),
          )
      )
    );
    */

    /* Align widget
    return Align(
      // alignment: Alignment.topCenter,
      alignment: Alignment(-0.5, 0.5),  // Alignment 的值相对于 parent widget 计算的
      child: Text('Hello', style: TextStyle(fontSize: 30)),
    );
    */

    /* More Container
    return Container(
        margin: EdgeInsets.all(30.0),
        padding: EdgeInsets.all(10.0),
        alignment: Alignment.topCenter,
        width: 200,
        height: 100,
        decoration: BoxDecoration(
            color: Colors.green,
            border: Border.all(),
        ),
        child: Text(
            'Container',
            style: TextStyle(fontSize: 30)
        )
    );
    */

    /* multiple
    // return Row(
    return Column(
        children: [
          Icon(Icons.home),
          Icon(Icons.home),
          Icon(Icons.home),
          Icon(Icons.home),
        ]
    );
    */
    
    /* 
       Expanded widget

       evenly spaced across the screen
    return Row(
        children: [
          // Expanded(child: Icon(Icons.home)),
          // Expanded(child: Icon(Icons.home)),
          // Expanded(child: Icon(Icons.home)),
          // Expanded(child: Icon(Icons.home)),
        Expanded(
            flex: 7,
            child: Container(
                color: Colors.green,
            )
        ),
        Expanded(
            flex: 3,
            child: Container(
                color: Colors.yellow,
            )
        ),
        ]
    );
    */

    /* Stack widget

       children 叠在一起

       use a stack to write text on an image
    return Stack(
        // 所有未定位的子组件会被放置到 bottomRight: 例如 text
        alignment: Alignment.bottomRight,
        children: [
          Image.asset('images/sheep.png'),
          Padding(
              padding: EdgeInsets.all(16.0),
              child: Text(
                  'Sheeeeeeep',
                  style: TextStyle(fontSize: 30),
              )
          )
          // Icon(Icons.home),
          // Icon(Icons.home),
          // Icon(Icons.home),
          // Icon(Icons.home),
        ]
    );
    */

    /*
       ListView

       GridView

       Scaffold: gives an easy way to add an AppBar, FloatingActionButton, Drawer, BottomNavigationBar, SnackBar, and more (来自 Material package)
    */

    /* complex layouts

       break the complex layout into smaller simple layouts

       1. correct structure

    return Column(
        // 分为三行
        children: [
          Row(
              children: [
                Icon(Icons.favorite),
                Text('BEAMS')
              ]
          ),
          Text('description ...'),
          Row(
              children: [
                Text('EXPLORE BEAMS'),
                Icon(Icons.arrow_forward)
              ]
          )
        ]
    );

       2. add padding, alignment, color
    */
    return Container(
        margin: EdgeInsets.all(16.0),
        padding: EdgeInsets.all(16.0),
        decoration: BoxDecoration(
            color: Colors.purple[900],
            border: Border.all(),
            borderRadius: BorderRadius.all(Radius.circular(3.0))
        ),

        child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                  children: [
                    Padding(
                        padding: EdgeInsets.only(right: 8.0),
                        child: Icon(Icons.favorite, color: Colors.blue),
                    ),
                    Text(
                        'BEAMS',
                        style: TextStyle(
                            color: Colors.white
                        )
                    )
                  ]
              ),
              Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: 16.0,
                      horizontal: 0,
                  ),
                  child: Text('Send programmable push notifications to iOS and Android devices with delivery and open rate tracking built in.',
                      style: TextStyle(
                          color: Colors.white,
                      )
                  )
              ),
              Row(
                  children: [
                    Text(
                      'EXPLORE BEAMS',
                      style: TextStyle(
                          color: Colors.white,
                      )
                    ),
                    Padding(
                        padding: EdgeInsets.only(left: 8.0),
                        child: Icon(Icons.arrow_forward, color: Colors.blue),
                    )
                  ]
              )
            ]
        )
    );

    /*
    */
  }
}
