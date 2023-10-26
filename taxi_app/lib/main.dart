import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:taxi_app/app/data/services/auth/auth_service.dart';
import 'package:taxi_app/app/data/services/storage/storage_service.dart';
import 'package:taxi_app/app/data/services/user/user_service.dart';

import 'app/routes/app_pages.dart';

void main() async{
  await initServices();
  runApp(
    GetMaterialApp(
      title: "Application",
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
    ),
  );
}

Future initServices() async{
  await Get.putAsync(() async=> StorageService());
  await Get.putAsync(() async=> AuthService());
  await Get.putAsync(() async=> UserService());
}
