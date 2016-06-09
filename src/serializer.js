"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _map2 = require('babel-runtime/core-js/map');

var _map3 = _interopRequireDefault(_map2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Serializer = (_class = (_temp = _class2 = function () {
  function Serializer(jsonc) {
    (0, _classCallCheck3.default)(this, Serializer);
    this._instancesMap = new _map3.default();
    this._instances = [];

    this.jsonc = jsonc;
  }

  (0, _createClass3.default)(Serializer, [{
    key: 'serialize',
    value: function serialize(data) {
      this.data = data;
      return {
        instances: this._instances,
        root: this._map(this.data)
      };
    }
  }, {
    key: 'convertRegisteredTypeToDto',
    value: function convertRegisteredTypeToDto(obj) {
      var reference = this._getInstance(obj);
      if (reference) return reference;

      var instance = {
        __type__: obj.constructor.__type__
      };

      reference = this._addInstance(obj, instance);

      var data = Serializer.Symbols.Serialize in obj ? obj[Serializer.Symbols.Serialize]() : obj;

      var options = this.jsonc.getOptions(instance.__type__);
      instance.__value__ = this._map(data, options);

      return reference;
    }
  }, {
    key: 'convertPlainObjectToDto',
    value: function convertPlainObjectToDto(obj) {
      var reference = this._getInstance(obj);
      if (reference) return reference;

      var instance = {
        __type__: "__object__"
      };
      reference = this._addInstance(obj, instance);

      var data = Serializer.Symbols.Serialize in obj ? obj[Serializer.Symbols.Serialize]() : obj;

      instance.__value__ = this._map(data);

      return reference;
    }
  }, {
    key: 'convertNativeTypeToDto',
    value: function convertNativeTypeToDto(obj) {
      var reference = this._getInstance(obj);
      if (reference) return reference;

      var instance = {
        __type__: "__array__"
      };
      reference = this._addInstance(obj, instance);

      instance.__value__ = this._map(obj);

      return reference;
    }
  }, {
    key: 'isSerializableObject',
    value: function isSerializableObject(obj) {
      if (obj === null || obj === undefined) return false;

      var constructor = obj.constructor;
      return this.jsonc.hasType(constructor) || constructor === Object || constructor === Array;
    }
  }, {
    key: '_addInstance',
    value: function _addInstance(originalObject, instance) {
      if (this._instancesMap.get(originalObject)) return;
      var reference = { __index__: this._instances.length };
      this._instances.push(instance);
      this._instancesMap.set(originalObject, reference);
      return reference;
    }
  }, {
    key: '_map',
    value: function _map(obj, options) {
      if (obj instanceof Array) return _lodash2.default.map(obj, this._mapValue);else {
        if (options) {
          if (options.exclude) obj = _lodash2.default.omit(obj, options.exclude);
          if (options.include) obj = _lodash2.default.pick(obj, options.include);
        }
        return _lodash2.default.mapValues(obj, this._mapValue);
      }
    }
  }, {
    key: '_mapValue',
    value: function _mapValue(value) {
      var typeCategory = getTypeCategory(value);
      if (typeCategory === "primitive") return value;
      if (typeCategory === "object") return this._mapObject(value);

      function getTypeCategory(value) {
        var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
        if (type === "function" || value !== null && type === "object") return type;
        return "primitive";
      }
    }
  }, {
    key: '_mapObject',
    value: function _mapObject(obj) {
      if (!this.isSerializableObject(obj)) {
        console.warn('Object ' + (0, _stringify2.default)(obj) + ' of constructor ' + obj.constructor.toString() + ' is not a serializable object and will NOT be recorded!');
        return null;
      }

      if (obj.constructor.__type__) return this.convertRegisteredTypeToDto(obj);

      if (obj.constructor === Object) return this.convertPlainObjectToDto(obj);

      return this.convertNativeTypeToDto(obj);
    }
  }, {
    key: '_getInstance',
    value: function _getInstance(instance) {
      return this._instancesMap.get(instance);
    }
  }]);
  return Serializer;
}(), _class2.Symbols = { Serialize: (0, _symbol2.default)() }, _temp), (_applyDecoratedDescriptor(_class.prototype, '_addInstance', [_autobindDecorator2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_addInstance'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_map', [_autobindDecorator2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_map'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_mapValue', [_autobindDecorator2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_mapValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_mapObject', [_autobindDecorator2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_mapObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getInstance', [_autobindDecorator2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_getInstance'), _class.prototype)), _class);
exports.default = Serializer;

//# sourceMappingURL=serializer.js.map