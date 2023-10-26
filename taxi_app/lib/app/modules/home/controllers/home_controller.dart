import 'package:get/get.dart';
import 'package:taxi_app/app/data/services/user/user_service.dart';

class HomeController extends GetxController {
  final _usersService = Get.find<UserService>();

  final _str = "".obs;

  String get str => _str.value;

  Future getMe() async{
    _str.value = await _usersService.getMe();
  }

  @override
  void onInit() {
    getMe();
    super.onInit();
  }
}
