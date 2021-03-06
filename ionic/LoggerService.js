app.service("LoggerService",
    /**
     * @class LoggerService
     *
     * @param $log {$log}
     * @param $q {$q}
     * @returns {*}
     */
    function ($log, $q) {

        var _this = this;
        var logCatPlugin = null;
        var PLUGIN_NAME = 'LogCatPlugin';
        var PLUGIN_NOT_LOADED = 'Plugin not loaded: ' + PLUGIN_NAME;
        window[PLUGIN_NAME] = this;

        document.addEventListener('deviceready', function () {
            if (window.cordova != null && window.cordova.plugins != null &&
                window.cordova.plugins[PLUGIN_NAME] != null) {
                logCatPlugin = window.cordova.plugins[PLUGIN_NAME];
                $log.info('Plugin loaded: ' + PLUGIN_NAME);
            } else {
                $log.info(PLUGIN_NOT_LOADED);
            }
        }, false);

        this.init = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.init(
                        {
                            success: resolve,
                            failure: reject,
                            jsLogFileName: 'jsLog.txt',
                            logCatFileName: 'catLog.txt',
                            maxFileSizeInKB: 1024,
                            filterBy: [
                                ' V/',
                                ' D/',
                                ' I/',
                                ' W/',
                                ' E/',
                                ' F/',
                                ' Fatal'
                            ],
                            filterOut: [
                                'I/InstantRun',      // Emulation
                                'EGL_emulation',     // Emulation
                                'E/emuglGLESv2_enc', // Emulation
                                'EGL_SWAP_BEHAVIOR', // Emulation
                                'eglCodecCommon',    // Emulation
                                'E/libEGL',          // Emulation
                                ':CONSOLE',          // Console-Logs
                                'I/System.out',      // Java output
                                '/LogCatPlugin',
                                'D/SystemWebChromeClient',
                                'javascript:cordova.plugins.LogCatPlugin'
                            ],
                            logCallBack: function (sHeader, sBody, sLevel) {
                                var sTitle = '%c' + PLUGIN_NAME + ': ' + sHeader;
                                if (sLevel === 'VERBOSE' || sLevel === 'DEBUG') {
                                    console.groupCollapsed(sTitle, 'color:grey');
                                    $log.debug(sBody);
                                } else if (sLevel === 'INFO') {
                                    console.groupCollapsed(sTitle, '');
                                    $log.info(sBody);
                                } else if (sLevel === 'WARNING') {
                                    console.groupCollapsed(sTitle, 'color:orange');
                                    $log.warn(sBody);
                                } else if (sLevel === 'ERROR' || sLevel === 'FATAL') {
                                    console.groupCollapsed(sTitle, 'color:red');
                                    $log.error(sBody);
                                }
                                console.groupEnd();
                            }
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.startLogger = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.startLogger(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.stopLogger = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.stopLogger(
                        {
                            success: resolve
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.jsLog = function (sLog) {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.jsLog(sLog);
                    resolve();
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.deleteLog = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.deleteLog(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.getJsLogPath = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.getJsLogPath(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.getLcLogPath = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.getLcLogPath(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.zipAll = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.zipAll(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.getLastLcEntries = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.getLastLcEntries(
                        {
                            success: resolve,
                            failure: reject,
                            filterBy: [
                                ' E/',
                                ' F/',
                                ' Fatal'
                            ],
                            filterOut: [],
                            maxEntries: 20
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.getLastJsEntries = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.getLastJsEntries(
                        {
                            success: resolve,
                            failure: reject,
                            filterBy: [],
                            filterOut: [],
                            maxEntries: 20
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.clearLogCatBuffer = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.clearLcBuffer(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.showInFileManager = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.showInFileManager(
                        {
                            success: resolve,
                            failure: reject
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.throwExampleError = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.throwExampleError(
                        {
                            success: resolve
                        }
                    );
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        this.throwExampleFatalError = function () {
            return new $q(function (resolve, reject) {
                if (logCatPlugin != null) {
                    logCatPlugin.throwExampleFatalError();
                    resolve();
                } else {
                    reject(PLUGIN_NOT_LOADED);
                }
            });
        };

        return _this;
    });
