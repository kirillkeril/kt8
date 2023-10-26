import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/auth_controller.dart';

class AuthView extends GetView<AuthController> {
  const AuthView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AuthView'),
        centerTitle: true,
      ),
      body: Center(
          child: Center(
        child: Column(
          children: [
            const Text("Введите логин и пароль"),
            TextField(
              controller: controller.emailController,
              decoration: const InputDecoration(hintText: "Логин"),
            ),
            TextField(
              controller: controller.passwordController,
              obscureText: true,
              decoration: const InputDecoration(hintText: "Пароль"),
            ),
            Obx(() {
              if (controller.isLogin) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    children: [
                      ElevatedButton(
                          onPressed: () {
                            controller.login();
                          },
                          child: const Text("Войти")),
                      Row(
                        children: [
                          const Text("Еще нет аккаунта?"),
                          TextButton(
                              onPressed: () {
                                controller.setIsLogin(false);
                              },
                              child: const Text("Зарегистрироваться"))
                        ],
                      )
                    ],
                  ),
                );
              } else {
                return Column(
                  children: [
                    ElevatedButton(
                        onPressed: () {
                          controller.register();
                        },
                        child: const Text("Зарегистрироваться")),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text("Уже есть аккаунт?"),
                        TextButton(
                            onPressed: () {
                              controller.setIsLogin(true);
                            },
                            child: const Text("Войти"))
                      ],
                    )
                  ],
                );
              }
            }),
          ],
        ),
      )),
    );
  }
}
