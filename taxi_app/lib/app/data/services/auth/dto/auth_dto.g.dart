// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AuthDtoImpl _$$AuthDtoImplFromJson(Map<String, dynamic> json) =>
    _$AuthDtoImpl(
      access: json['access'] as String,
      refresh: json['refresh'] as String,
    );

Map<String, dynamic> _$$AuthDtoImplToJson(_$AuthDtoImpl instance) =>
    <String, dynamic>{
      'access': instance.access,
      'refresh': instance.refresh,
    };
