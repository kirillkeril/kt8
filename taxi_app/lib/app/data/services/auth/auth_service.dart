import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:taxi_app/app/data/services/storage/storage_service.dart';

import '../../models/tokens/token.dart';
import '../../models/user/user.dart';

class AuthService {
  final _httpClient = Dio(BaseOptions(
      contentType: "application/json",
      baseUrl: 'https://1cce-82-179-118-132.ngrok-free.app/api/users',
      headers: {"ngrok-skip-browser-warning": '1'}));
  final _storageService = Get.find<StorageService>();

  AuthService() {
    _httpClient.interceptors.add(InterceptorsWrapper(
      onError: (e, handler) {
        if (e.response?.statusCode == 400) {
          throw ArgumentError.value(e.response!.data);
        }
      },
    ));
  }

  Future login(User user) async {
    var res = await _httpClient.post('/login', data: user);
    print(res);
    if (res.statusCode == 200) {
      var data = Tokens.fromJson(res.data);
      _storageService.writeTokens(data);
    }
  }

  Future register(User user) async {
    var res = await _httpClient.post('/register', data: user);
    if (res.statusCode == 200) {
      var data = Tokens.fromJson(res.data);
      _storageService.writeTokens(data);
    }
  }

  Future<bool> refresh() async {
    var tokens = await _storageService.readTokens();
    if (tokens != null) {
      var res = await _httpClient
          .post('/refresh', data: {"refreshToken": tokens.refreshToken});
      if (res.statusCode == 200) {
        var data = Tokens.fromJson(res.data);
        _storageService.writeTokens(data);
        return true;
      }
    }
    return false;
  }
}
