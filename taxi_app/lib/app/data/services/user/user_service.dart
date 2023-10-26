import 'package:dio/dio.dart';
import 'package:taxi_app/app/data/services/auth/auth_service.dart';

import '../../models/tokens/token.dart';
import '../storage/storage_service.dart';
import 'package:get/get.dart' hide Response;

class UserService {
  final _httpClient = Dio(BaseOptions(
      contentType: "application/json",
      baseUrl: 'https://1cce-82-179-118-132.ngrok-free.app/api/users',
      headers: {"ngrok-skip-browser-warning": '1'}));
  final _storageService = Get.find<StorageService>();
  final _authService = Get.find<AuthService>();

  UserService() {
    _httpClient.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        if (!options.path.startsWith("http")) {
          options.path =
              'https://1cce-82-179-118-132.ngrok-free.app/api/users${options.path}';
        }
        Tokens? tokens = await _storageService.readTokens();
        var access = tokens?.accessToken;
        options.headers.addAll({"Authorization": "Bearer $access"});
        handler.next(options);
      },
      onError: (e, handler) async{
        print("a");
        if (e.response?.statusCode == 401) {
          if (await _authService.refresh()) {
            try {
              handler.resolve(await _retry(e.requestOptions));
            } on DioException {
              handler.next(e);
            }
          }
        }
        handler.next(e);
      },
    ));
  }

  Future<String> getMe() async {
    var res = await _httpClient.get("/");
    return res.data;
  }

  Future<Response<dynamic>> _retry(RequestOptions requestOptions) async {
    final options = Options(
      method: requestOptions.method,
      headers: requestOptions.headers,
    );
    return _httpClient.request<dynamic>(
      requestOptions.path,
      data: requestOptions.data,
      queryParameters: requestOptions.queryParameters,
      options: options,
    );
  }
}
