import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:taxi_app/app/data/models/tokens/token.dart';

class StorageService {
  final _storage = const FlutterSecureStorage();

  Future writeTokens(Tokens tokens) async {
    await _storage.write(key: "JWT", value: jsonEncode(tokens));
  }

  Future<Tokens?> readTokens() async {
    var tokensString = await _storage.read(key: "JWT");
    if(tokensString != null) {
      return Tokens.fromJson(jsonDecode(tokensString));
    }
    else {
      return null;
    }
  }
}