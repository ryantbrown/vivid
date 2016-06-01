(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vivid", [], factory);
	else if(typeof exports === 'object')
		exports["vivid"] = factory();
	else
		root["vivid"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Collection = exports.Model = undefined;
	
	var _model = __webpack_require__(1);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _collection = __webpack_require__(3);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Model = _model2.default;
	exports.Collection = _collection2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _errors = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = function () {
	    function Model(db) {
	        _classCallCheck(this, Model);
	
	        if (this.constructor === Model) {
	            throw new TypeError('"Model" cannot be instantiated directly');
	        }
	
	        this.db = db;
	        this.query = null;
	        this.timestamps = true;
	        this.primary_key = 'id';
	        this.hidden = [];
	        this.fillable = [];
	        this.guarded = ['*'];
	    }
	
	    _createClass(Model, [{
	        key: 'get',
	        value: function get() {
	            return this.query;
	        }
	    }, {
	        key: 'all',
	        value: function all() {
	            this.query = this.db(this.table);
	            return this;
	        }
	    }, {
	        key: 'find',
	        value: function find(id) {
	            this.query = this.db(this.table).where(this.primary_key, id).first();
	            return this;
	        }
	    }, {
	        key: 'where',
	        value: function where() {
	            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                params[_key] = arguments[_key];
	            }
	
	            if (params.length > 3) {
	                throw new _errors.QueryBuilderError('the "where" method takes a maximum of 3 parameters');
	            }
	
	            var table = this.db(this.table);
	
	            this.query = table.where.apply(table, params);
	            return this;
	        }
	    }, {
	        key: 'orWhere',
	        value: function orWhere() {
	            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                params[_key2] = arguments[_key2];
	            }
	
	            if (params.length > 3) {
	                throw new _errors.QueryBuilderError('the "orWhere" method takes a maximum of 3 parameters');
	            }
	
	            if (!this.query.toSQL().sql.includes('where')) {
	                throw new _errors.QueryBuilderError('"orWhere" must be preceeded by a where method');
	            }
	
	            this.query = this.query.orWhere.apply(this.query, params);
	            return this;
	        }
	    }, {
	        key: 'andWhere',
	        value: function andWhere() {}
	    }, {
	        key: 'whereIn',
	        value: function whereIn(column, data) {
	            if (typeof column !== 'string') {
	                throw new TypeError('the "whereIn" method expects a string as the first parameter');
	            }
	            if (data.constructor !== Array) {
	                throw new TypeError('the "whereIn" method expects as array as the second parameter');
	            }
	            this.query = this.db(this.table).whereIn(column, data);
	            return this;
	        }
	    }]);
	
	    return Model;
	}();
	
	exports.default = Model;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BaseError = function (_Error) {
	    _inherits(BaseError, _Error);
	
	    function BaseError(message) {
	        _classCallCheck(this, BaseError);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseError).call(this));
	
	        _this.message = message;
	        _this.stack = new Error(message).stack;
	        _this.name = _this.constructor.name;
	        return _this;
	    }
	
	    return BaseError;
	}(Error);
	
	var RelationError = function (_BaseError) {
	    _inherits(RelationError, _BaseError);
	
	    function RelationError(message) {
	        _classCallCheck(this, RelationError);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RelationError).call(this, message));
	    }
	
	    return RelationError;
	}(BaseError);
	
	var QueryBuilderError = function (_BaseError2) {
	    _inherits(QueryBuilderError, _BaseError2);
	
	    function QueryBuilderError(message) {
	        _classCallCheck(this, QueryBuilderError);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(QueryBuilderError).call(this, message));
	    }
	
	    return QueryBuilderError;
	}(BaseError);
	
	exports.RelationError = RelationError;
	exports.QueryBuilderError = QueryBuilderError;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Collection = function Collection() {
	    _classCallCheck(this, Collection);
	};
	
	exports.default = Collection;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vivid.js.map