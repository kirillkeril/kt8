import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:taxi_app/app/data/services/auth/auth_service.dart';
import 'package:taxi_app/app/data/services/storage/storage_service.dart';
import 'package:taxi_app/app/routes/app_pages.dart';

import '../../../data/models/user/user.dart';

class AuthController extends GetxController {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final _authService = Get.find<AuthService>();
  final _storageService = Get.find<StorageService>();

  final _isLogin = false.obs;
  bool get isLogin => _isLogin.value;

  void setIsLogin(bool value) {
    _isLogin.value = value;
  }

  @override
  void onReady() {
    tryLogin();

    super.onReady();
  }

  Future tryLogin() async{
    var tokens = await _storageService.readTokens();
    if(tokens != null) {
      Get.toNamed(Routes.HOME);
    }
  }

  Future login() async {
    var user =
        User(email: emailController.text, password: passwordController.text);
    try {
      await _authService.login(user);
      Get.toNamed(Routes.HOME);
    } catch (e) {
      var err = e as DioException;
      Get.snackbar("Ошибка", "Проверьте введенные логин и пароль");
    }
  }

  Future register() async {
    var user =
        User(email: emailController.text, password: passwordController.text);
    try {
      await _authService.register(user);
      Get.toNamed(Routes.HOME);
    } catch (e) {
      Get.snackbar("Ошибка", "Проверьте введенные логин и пароль");
    }
  }
}
