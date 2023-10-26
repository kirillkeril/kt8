import 'package:freezed_annotation/freezed_annotation.dart';

part 'token.freezed.dart';
part 'token.g.dart';

@freezed
class Tokens with _$Tokens {
  const factory Tokens({
    required String refreshToken,
    required String accessToken,
  }) = _Tokens;

  factory Tokens.fromJson(Map<String, dynamic> json) => _$TokensFromJson(json);
}
