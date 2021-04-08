import 'package:flutter/material.dart';

class Main extends StatelessWidget {
  final title = "UI demo";

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(10,10,10,10),
      height: 220,
      width: double.maxFinite,
      child: Card(
         elevation: 5,
      )
    );
  }
}
