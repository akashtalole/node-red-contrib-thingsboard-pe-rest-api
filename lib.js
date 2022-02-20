/*jshint -W069 */
/**
 *  ThingsBoard Professional Edition IoT platform REST API documentation.
 * @class ThingsboardPeRestApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var ThingsboardPeRestApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function ThingsboardPeRestApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://thingsboard.cloud:443';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name ThingsboardPeRestApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    ThingsboardPeRestApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

        /**
        * Set Auth headers
        * @method
        * @name ThingsboardPeRestApi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        ThingsboardPeRestApi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            return headers;
        };

/**
 * Get the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#getSecuritySettingsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getSecuritySettingsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/securitySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#saveSecuritySettingsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveSecuritySettingsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/securitySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Administration Settings. Platform generates random Administration Settings Id during settings creation. The Administration Settings Id will be present in the response. Specify the Administration Settings Id when you would like to update the Administration Settings. Referencing non-existing Administration Settings Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#saveAdminSettingsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveAdminSettingsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Attempts to send test email using Mail Settings provided as a parameter. Email is sent to the address specified in the profile of user who is performing the requestYou may change the 'To' email in the user profile of the System/Tenant Administrator. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#sendTestMailUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.sendTestMailUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/testMail';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Attempts to send test sms to the System Administrator User using SMS Settings and phone number provided as a parameters of the request. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#sendTestSmsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.sendTestSmsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/testSms';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Administration Settings object using specified string key. Referencing non-existing key will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.
 * @method
 * @name ThingsboardPeRestApi#getAdminSettingsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.key - A string value of the key (e.g. 'general' or 'mail').
     * @param {boolean} parameters.systemByDefault - Use system settings if settings are not defined on tenant level.
 */
 ThingsboardPeRestApi.prototype.getAdminSettingsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/{key}{?systemByDefault}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{key}', parameters['key']);
        
        


        if(parameters['key'] === undefined){
            deferred.reject(new Error('Missing required  parameter: key'));
            return deferred.promise;
        }
 

                if(parameters['systemByDefault'] !== undefined){
                    queryParameters['systemByDefault'] = parameters['systemByDefault'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Check notifications about new platform releases. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#checkUpdatesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.checkUpdatesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/updates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Login method used to authenticate user and get JWT token data.

Value of the response **token** field can be used as **X-Authorization** header value:

`X-Authorization: Bearer $JWT_TOKEN_VALUE`.
 * @method
 * @name ThingsboardPeRestApi#loginPost
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.loginPost = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/auth/login';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Alarm. When creating alarm, platform generates Alarm Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Alarm id will be present in the response. Specify existing Alarm id to update the alarm. Referencing non-existing Alarm Id will cause 'Not Found' error. 

Platform also deduplicate the alarms based on the entity id of originator and alarm 'type'. For example, if the user or system component create the alarm with the type 'HighTemperature' for device 'Device A' the new active alarm is created. If the user tries to create 'HighTemperature' alarm for the same device again, the previous alarm will be updated (the 'end_ts' will be set to current timestamp). If the user clears the alarm (see 'Clear Alarm(clearAlarm)'), than new alarm with the same type and same device may be created. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveAlarmUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveAlarmUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Search the alarms by originator ('entityType' and entityId') and optional 'status' or 'searchStatus' filters and returns the highest AlarmSeverity(CRITICAL, MAJOR, MINOR, WARNING or INDETERMINATE). Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getHighestAlarmSeverityUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.searchStatus - A string value representing one of the AlarmSearchStatus enumeration value
     * @param {string} parameters.status - A string value representing one of the AlarmStatus enumeration value
 */
 ThingsboardPeRestApi.prototype.getHighestAlarmSeverityUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/highestSeverity/{entityType}/{entityId}{?searchStatus,status}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['searchStatus'] !== undefined){
                    queryParameters['searchStatus'] = parameters['searchStatus'];
                }
        
        
        


 

                if(parameters['status'] !== undefined){
                    queryParameters['status'] = parameters['status'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Alarm Info object based on the provided Alarm Id. Alarm Info is an extension of the default Alarm object that also contains name of the alarm originator.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAlarmInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.alarmId - A string value representing the alarm id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAlarmInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/info/{alarmId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{alarmId}', parameters['alarmId']);
        
        


        if(parameters['alarmId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alarmId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Alarm object based on the provided Alarm Id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAlarmByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.alarmId - A string value representing the alarm id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAlarmByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/{alarmId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{alarmId}', parameters['alarmId']);
        
        


        if(parameters['alarmId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alarmId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the Alarm. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteAlarmUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.alarmId - A string value representing the alarm id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteAlarmUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/{alarmId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{alarmId}', parameters['alarmId']);
        
        


        if(parameters['alarmId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alarmId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Acknowledge the Alarm. Once acknowledged, the 'ack_ts' field will be set to current timestamp and special rule chain event 'ALARM_ACK' will be generated. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#ackAlarmUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.alarmId - A string value representing the alarm id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.ackAlarmUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/{alarmId}/ack';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{alarmId}', parameters['alarmId']);
        
        


        if(parameters['alarmId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alarmId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Clear the Alarm. Once cleared, the 'clear_ts' field will be set to current timestamp and special rule chain event 'ALARM_CLEAR' will be generated. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#clearAlarmUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.alarmId - A string value representing the alarm id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.clearAlarmUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/{alarmId}/clear';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{alarmId}', parameters['alarmId']);
        
        


        if(parameters['alarmId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alarmId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of alarms for the selected entity. Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAlarmsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.searchStatus - A string value representing one of the AlarmSearchStatus enumeration value
     * @param {string} parameters.status - A string value representing one of the AlarmStatus enumeration value
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on of next alarm fields: type, severity or status
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the Alarm class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the Alarm class field: 'createdTime'.
     * @param {boolean} parameters.fetchOriginator - A boolean value to specify if the alarm originator name will be filled in the AlarmInfo object  field: 'originatorName' or will returns as null.
 */
 ThingsboardPeRestApi.prototype.getAlarmsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarm/{entityType}/{entityId}{?endTime,fetchOriginator,page,pageSize,searchStatus,sortOrder,sortProperty,startTime,status,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['searchStatus'] !== undefined){
                    queryParameters['searchStatus'] = parameters['searchStatus'];
                }
        
        
        


 

                if(parameters['status'] !== undefined){
                    queryParameters['status'] = parameters['status'];
                }
        
        
        


 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['fetchOriginator'] !== undefined){
                    queryParameters['fetchOriginator'] = parameters['fetchOriginator'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of alarms that belongs to the current user owner. If the user has the authority of 'Tenant Administrator', the server returns alarms that belongs to the tenant of current user. If the user has the authority of 'Customer User', the server returns alarms that belongs to the customer of current user. Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAllAlarmsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.searchStatus - A string value representing one of the AlarmSearchStatus enumeration value
     * @param {string} parameters.status - A string value representing one of the AlarmStatus enumeration value
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on of next alarm fields: type, severity or status
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the Alarm class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the Alarm class field: 'createdTime'.
     * @param {boolean} parameters.fetchOriginator - A boolean value to specify if the alarm originator name will be filled in the AlarmInfo object  field: 'originatorName' or will returns as null.
 */
 ThingsboardPeRestApi.prototype.getAllAlarmsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarms{?endTime,fetchOriginator,page,pageSize,searchStatus,sortOrder,sortProperty,startTime,status,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['searchStatus'] !== undefined){
                    queryParameters['searchStatus'] = parameters['searchStatus'];
                }
        
        
        


 

                if(parameters['status'] !== undefined){
                    queryParameters['status'] = parameters['status'];
                }
        
        
        


 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['fetchOriginator'] !== undefined){
                    queryParameters['fetchOriginator'] = parameters['fetchOriginator'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * There's an ability to import the bulk of assets using the only .csv file.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#processAssetBulkImportUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.processAssetBulkImportUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/asset/bulk_import';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique asset types based on assets that are either owned by the tenant or assigned to the customer which user is performing the request.
 * @method
 * @name ThingsboardPeRestApi#getAssetTypesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getAssetTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/asset/types';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Asset object based on the provided Asset Id. If the user has the authority of 'Tenant Administrator', the server checks that the asset is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the asset is assigned to the same customer.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAssetByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.assetId - A string value representing the asset id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAssetByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/asset/{assetId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{assetId}', parameters['assetId']);
        
        


        if(parameters['assetId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: assetId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the asset and all the relations (from and to the asset). Referencing non-existing asset Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteAssetUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.assetId - A string value representing the asset id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteAssetUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/asset/{assetId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{assetId}', parameters['assetId']);
        
        


        if(parameters['assetId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: assetId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all assets that are related to the specific entity. The entity id, relation type, asset types, depth of the search, and other query parameters defined using complex 'AssetSearchQuery' object. See 'Model' tab of the Parameters for more info. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#findByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/assets';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested assets must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAssetsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.assetIds - A list of asset ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getAssetsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/assets{?assetIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['assetIds'] !== undefined){
                    queryParameters['assetIds'] = parameters['assetIds'];
                }
        
        
        


        if(parameters['assetIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: assetIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Asset. When creating asset, platform generates Asset Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Asset id will be present in the response. Specify existing Asset id to update the asset. Referencing non-existing Asset Id will cause 'Not Found' error.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveAssetUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'. If specified, the entity will be added to the corresponding entity group.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveAssetUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/asset{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of assets objects owned by customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomerAssetsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Asset type
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the asset name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomerAssetsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of asset objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getAssetsByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the asset name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getAssetsByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/assets{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested asset must be owned by tenant that the user belongs to. Asset name is an unique property of asset. So it can be used to identify the asset.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantAssetUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.assetName - A string value representing the Asset name.
 */
 ThingsboardPeRestApi.prototype.getTenantAssetUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/assets{?assetName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['assetName'] !== undefined){
                    queryParameters['assetName'] = parameters['assetName'];
                }
        
        
        


        if(parameters['assetName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: assetName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of assets owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantAssetsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Asset type
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the asset name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantAssetsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of assets objects available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Asset Info is an extension of the default Asset object that contains information about the assigned customer name. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserAssetsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Asset type
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the asset name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserAssetsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of audit logs related to the targeted customer entities (devices, assets, etc.), and users actions (login, logout, etc.) that belong to this customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.
 * @method
 * @name ThingsboardPeRestApi#getAuditLogsByCustomerIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on one of the next properties: entityType, entityName, userName, actionType, actionStatus.
     * @param {string} parameters.sortProperty - Property of audit log to sort by. See the 'Model' tab of the Response Class for more details. Note: entityType sort property is not defined in the AuditLog class, however, it can be used to sort audit logs by types of entities that were logged.
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {string} parameters.actionTypes - A String value representing comma-separated list of action types. This parameter is optional, but it can be used to filter results to fetch only audit logs of specific action types. For example, 'LOGIN', 'LOGOUT'. See the 'Model' tab of the Response Class for more details.
 */
 ThingsboardPeRestApi.prototype.getAuditLogsByCustomerIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/audit/logs/customer/{customerId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['actionTypes'] !== undefined){
                    queryParameters['actionTypes'] = parameters['actionTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of audit logs related to the actions on the targeted entity. Basically, this API call is used to get the full lifecycle of some specific entity. For example to see when a device was created, updated, assigned to some customer, or even deleted from the system. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.
 * @method
 * @name ThingsboardPeRestApi#getAuditLogsByEntityIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on one of the next properties: entityType, entityName, userName, actionType, actionStatus.
     * @param {string} parameters.sortProperty - Property of audit log to sort by. See the 'Model' tab of the Response Class for more details. Note: entityType sort property is not defined in the AuditLog class, however, it can be used to sort audit logs by types of entities that were logged.
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {string} parameters.actionTypes - A String value representing comma-separated list of action types. This parameter is optional, but it can be used to filter results to fetch only audit logs of specific action types. For example, 'LOGIN', 'LOGOUT'. See the 'Model' tab of the Response Class for more details.
 */
 ThingsboardPeRestApi.prototype.getAuditLogsByEntityIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/audit/logs/entity/{entityType}/{entityId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['actionTypes'] !== undefined){
                    queryParameters['actionTypes'] = parameters['actionTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of audit logs related to the actions of targeted user. For example, RPC call to a particular device, or alarm acknowledgment for a specific device, etc. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.
 * @method
 * @name ThingsboardPeRestApi#getAuditLogsByUserIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on one of the next properties: entityType, entityName, userName, actionType, actionStatus.
     * @param {string} parameters.sortProperty - Property of audit log to sort by. See the 'Model' tab of the Response Class for more details. Note: entityType sort property is not defined in the AuditLog class, however, it can be used to sort audit logs by types of entities that were logged.
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {string} parameters.actionTypes - A String value representing comma-separated list of action types. This parameter is optional, but it can be used to filter results to fetch only audit logs of specific action types. For example, 'LOGIN', 'LOGOUT'. See the 'Model' tab of the Response Class for more details.
 */
 ThingsboardPeRestApi.prototype.getAuditLogsByUserIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/audit/logs/user/{userId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['actionTypes'] !== undefined){
                    queryParameters['actionTypes'] = parameters['actionTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of audit logs related to all entities in the scope of the current user's Tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.
 * @method
 * @name ThingsboardPeRestApi#getAuditLogsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on one of the next properties: entityType, entityName, userName, actionType, actionStatus.
     * @param {string} parameters.sortProperty - Property of audit log to sort by. See the 'Model' tab of the Response Class for more details. Note: entityType sort property is not defined in the AuditLog class, however, it can be used to sort audit logs by types of entities that were logged.
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the AuditLog class field: 'createdTime'.
     * @param {string} parameters.actionTypes - A String value representing comma-separated list of action types. This parameter is optional, but it can be used to filter results to fetch only audit logs of specific action types. For example, 'LOGIN', 'LOGOUT'. See the 'Model' tab of the Response Class for more details.
 */
 ThingsboardPeRestApi.prototype.getAuditLogsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/audit/logs{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 

                if(parameters['actionTypes'] !== undefined){
                    queryParameters['actionTypes'] = parameters['actionTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Change the password for the User which credentials are used to perform this REST API call. Be aware that previously generated [JWT](https://jwt.io/) tokens will be still valid until they expire.
 * @method
 * @name ThingsboardPeRestApi#changePasswordUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.changePasswordUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/auth/changePassword';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Special API call to record the 'logout' of the user to the Audit Logs. Since platform uses [JWT](https://jwt.io/), the actual logout is the procedure of clearing the [JWT](https://jwt.io/) token on the client side. 
 * @method
 * @name ThingsboardPeRestApi#logoutUsingPOST
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.logoutUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/auth/logout';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the information about the User which credentials are used to perform this REST API call.
 * @method
 * @name ThingsboardPeRestApi#getUserUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getUserUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/auth/user';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks the activation token and forwards user to 'Create Password' page. If token is valid, returns '303 See Other' (redirect) response code with the correct address of 'Create Password' page and same 'activateToken' specified in the URL parameters. If token is not valid, returns '409 Conflict'.
 * @method
 * @name ThingsboardPeRestApi#checkActivateTokenUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.activateToken - The activate token string.
 */
 ThingsboardPeRestApi.prototype.checkActivateTokenUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/activate{?activateToken}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['activateToken'] !== undefined){
                    queryParameters['activateToken'] = parameters['activateToken'];
                }
        
        
        


        if(parameters['activateToken'] === undefined){
            deferred.reject(new Error('Missing required  parameter: activateToken'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks the activation token and updates corresponding user password in the database. Now the user may start using his password to login. The response already contains the [JWT](https://jwt.io) activation and refresh tokens, to simplify the user activation flow and avoid asking user to input password again after activation. If token is valid, returns the object that contains [JWT](https://jwt.io/) access and refresh tokens. If token is not valid, returns '404 Bad Request'.
 * @method
 * @name ThingsboardPeRestApi#activateUserUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.sendActivationMail - sendActivationMail
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.activateUserUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/activate{?sendActivationMail}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['sendActivationMail'] !== undefined){
                    queryParameters['sendActivationMail'] = parameters['sendActivationMail'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks the password reset token and updates the password. If token is valid, returns the object that contains [JWT](https://jwt.io/) access and refresh tokens. If token is not valid, returns '404 Bad Request'.
 * @method
 * @name ThingsboardPeRestApi#resetPasswordUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.resetPasswordUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/resetPassword';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Request to send the reset password email if the user with specified email address is present in the database. Always return '200 OK' status for security purposes.
 * @method
 * @name ThingsboardPeRestApi#requestResetPasswordByEmailUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.requestResetPasswordByEmailUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/resetPasswordByEmail';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks the password reset token and forwards user to 'Reset Password' page. If token is valid, returns '303 See Other' (redirect) response code with the correct address of 'Reset Password' page and same 'resetToken' specified in the URL parameters. If token is not valid, returns '409 Conflict'.
 * @method
 * @name ThingsboardPeRestApi#checkResetTokenUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resetToken - The reset token string.
 */
 ThingsboardPeRestApi.prototype.checkResetTokenUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/resetPassword{?resetToken}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['resetToken'] !== undefined){
                    queryParameters['resetToken'] = parameters['resetToken'];
                }
        
        
        


        if(parameters['resetToken'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resetToken'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * API call to get the password policy for the password validation form(s).
 * @method
 * @name ThingsboardPeRestApi#getUserPasswordPolicyUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getUserPasswordPolicyUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/userPasswordPolicy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested blob entities must be owned by tenant or assigned to customer which user is performing the request. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.). See the 'Model' tab of the Response Class for more details.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getBlobEntitiesByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.blobEntityIds - A list of blob entity ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getBlobEntitiesByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/blobEntities{?blobEntityIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['blobEntityIds'] !== undefined){
                    queryParameters['blobEntityIds'] = parameters['blobEntityIds'];
                }
        
        
        


        if(parameters['blobEntityIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: blobEntityIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of BlobEntityWithCustomerInfo object that are available for the current user. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityWithCustomerInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.) and info about the customer(customerTitle, customerIsPublic) of the user that scheduled generation of the dashboard report. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getBlobEntitiesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - A string value representing the blob entity type. For example, 'report'
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the blob entity name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - The start timestamp in milliseconds of the search time range over the BlobEntityWithCustomerInfo class field: 'createdTime'.
     * @param {integer} parameters.endTime - The end timestamp in milliseconds of the search time range over the BlobEntityWithCustomerInfo class field: 'createdTime'.
 */
 ThingsboardPeRestApi.prototype.getBlobEntitiesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/blobEntities{?endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the BlobEntityWithCustomerInfo object based on the provided Blob entity Id. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityWithCustomerInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.) and info about the customer(customerTitle, customerIsPublic) of the user that scheduled generation of the dashboard report. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getBlobEntityInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.blobEntityId - A string value representing the blob entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getBlobEntityInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/blobEntity/info/{blobEntityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{blobEntityId}', parameters['blobEntityId']);
        
        


        if(parameters['blobEntityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: blobEntityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete Blob entity based on the provided Blob entity Id. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteBlobEntityUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.blobEntityId - A string value representing the blob entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteBlobEntityUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/blobEntity/{blobEntityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{blobEntityId}', parameters['blobEntityId']);
        
        


        if(parameters['blobEntityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: blobEntityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Download report file based on the provided Blob entity Id. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#downloadBlobEntityUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.blobEntityId - A string value representing the blob entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.downloadBlobEntityUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/blobEntity/{blobEntityId}/download';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{blobEntityId}', parameters['blobEntityId']);
        
        


        if(parameters['blobEntityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: blobEntityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Gets the Component Descriptor object using class name from the path parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getComponentDescriptorByClazzUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.componentDescriptorClazz - Component Descriptor class name
 */
 ThingsboardPeRestApi.prototype.getComponentDescriptorByClazzUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/component/{componentDescriptorClazz}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{componentDescriptorClazz}', parameters['componentDescriptorClazz']);
        
        


        if(parameters['componentDescriptorClazz'] === undefined){
            deferred.reject(new Error('Missing required  parameter: componentDescriptorClazz'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Gets the Component Descriptors using rule node type and optional rule chain type request parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getComponentDescriptorsByTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.componentType - Type of the Rule Node
     * @param {string} parameters.ruleChainType - Type of the Rule Chain
 */
 ThingsboardPeRestApi.prototype.getComponentDescriptorsByTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/components/{componentType}{?ruleChainType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{componentType}', parameters['componentType']);
        
        


        if(parameters['componentType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: componentType'));
            return deferred.promise;
        }
 

                if(parameters['ruleChainType'] !== undefined){
                    queryParameters['ruleChainType'] = parameters['ruleChainType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Gets the Component Descriptors using coma separated list of rule node types and optional rule chain type request parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getComponentDescriptorsByTypesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.componentTypes - List of types of the Rule Nodes, (ENRICHMENT, FILTER, TRANSFORMATION, ACTION or EXTERNAL)
     * @param {string} parameters.ruleChainType - Type of the Rule Chain
 */
 ThingsboardPeRestApi.prototype.getComponentDescriptorsByTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/components{?componentTypes,ruleChainType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['componentTypes'] !== undefined){
                    queryParameters['componentTypes'] = parameters['componentTypes'];
                }
        
        
        


        if(parameters['componentTypes'] === undefined){
            deferred.reject(new Error('Missing required  parameter: componentTypes'));
            return deferred.promise;
        }
 

                if(parameters['ruleChainType'] !== undefined){
                    queryParameters['ruleChainType'] = parameters['ruleChainType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Converter. When creating converter, platform generates Converter Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created converter id will be present in the response. Specify existing Converter id to update the converter. Referencing non-existing converter Id will cause 'Not Found' error. Converter name is unique in the scope of tenant. 

# Converter Configuration

Converter configuration (**'configuration'** field) is the JSON object that should contain one of two possible fields: **'decoder'** or **'encoder'**. The former is used when the converter has UPLINK type, the latter is used - when DOWNLINK type. It can contain both 'decoder' and 'encoder' fields, when the correct one is specified for the appropriate converter type, another one can be set to 'null'. See the examples of each one below. 

## Uplink Converter Configuration

```json
{
   "decoder":"// Decode an uplink message from a buffer\n// payload - array of bytes\n// metadata - key/value object\n\n/** Decoder **/\n\n// decode payload to string\nvar payloadStr = decodeToString(payload);\n\n// decode payload to JSON\n// var data = decodeToJson(payload);\n\nvar deviceName = 'Device A';\nvar deviceType = 'thermostat';\nvar customerName = 'customer';\nvar groupName = 'thermostat devices';\n// use assetName and assetType instead of deviceName and deviceType\n// to automatically create assets instead of devices.\n// var assetName = 'Asset A';\n// var assetType = 'building';\n\n// Result object with device/asset attributes/telemetry data\nvar result = {\n// Use deviceName and deviceType or assetName and assetType, but not both.\n   deviceName: deviceName,\n   deviceType: deviceType,\n// assetName: assetName,\n// assetType: assetType,\n   customerName: customerName,\n   groupName: groupName,\n   attributes: {\n       model: 'Model A',\n       serialNumber: 'SN111',\n       integrationName: metadata['integrationName']\n   },\n   telemetry: {\n       temperature: 42,\n       humidity: 80,\n       rawData: payloadStr\n   }\n};\n\n/** Helper functions **/\n\nfunction decodeToString(payload) {\n   return String.fromCharCode.apply(String, payload);\n}\n\nfunction decodeToJson(payload) {\n   // covert payload to string.\n   var str = decodeToString(payload);\n\n   // parse string to JSON\n   var data = JSON.parse(str);\n   return data;\n}\n\nreturn result;",
   "encoder":null
}
```

Decoder field in the more readable form:

```text
// Decode an uplink message from a buffer
// payload - array of bytes
// metadata - key/value object

/** Decoder **/

// decode payload to string
var payloadStr = decodeToString(payload);

// decode payload to JSON
// var data = decodeToJson(payload);

var deviceName = 'Device A';
var deviceType = 'thermostat';
var customerName = 'customer';
var groupName = 'thermostat devices';
// use assetName and assetType instead of deviceName and deviceType
// to automatically create assets instead of devices.
// var assetName = 'Asset A';
// var assetType = 'building';

// Result object with device/asset attributes/telemetry data
var result = {
// Use deviceName and deviceType or assetName and assetType, but not both.
   deviceName: deviceName,
   deviceType: deviceType,
// assetName: assetName,
// assetType: assetType,
   customerName: customerName,
   groupName: groupName,
   attributes: {
       model: 'Model A',
       serialNumber: 'SN111',
       integrationName: metadata['integrationName']
   },
   telemetry: {
       temperature: 42,
       humidity: 80,
       rawData: payloadStr
   }
};

/** Helper functions **/

function decodeToString(payload) {
   return String.fromCharCode.apply(String, payload);
}

function decodeToJson(payload) {
   // covert payload to string.
   var str = decodeToString(payload);

   // parse string to JSON
   var data = JSON.parse(str);
   return data;
}

return result;
```

## Downlink Converter Configuration

```json
{
   "decoder":null,
   "encoder":"// Encode downlink data from incoming Rule Engine message\n\n// msg - JSON message payload downlink message json\n// msgType - type of message, for ex. 'ATTRIBUTES_UPDATED', 'POST_TELEMETRY_REQUEST', etc.\n// metadata - list of key-value pairs with additional data about the message\n// integrationMetadata - list of key-value pairs with additional data defined in Integration executing this converter\n\n/** Encoder **/\n\nvar data = {};\n\n// Process data from incoming message and metadata\n\ndata.tempFreq = msg.temperatureUploadFrequency;\ndata.humFreq = msg.humidityUploadFrequency;\n\ndata.devSerialNumber = metadata['ss_serialNumber'];\n\n// Result object with encoded downlink payload\nvar result = {\n\n    // downlink data content type: JSON, TEXT or BINARY (base64 format)\n    contentType: \"JSON\",\n\n    // downlink data\n    data: JSON.stringify(data),\n\n    // Optional metadata object presented in key/value format\n    metadata: {\n            topic: metadata['deviceType']+'/'+metadata['deviceName']+'/upload'\n    }\n\n};\n\nreturn result;"
}
```

Encoder field in the more readable form:

```text
// Encode downlink data from incoming Rule Engine message

// msg - JSON message payload downlink message json
// msgType - type of message, for ex. 'ATTRIBUTES_UPDATED', 'POST_TELEMETRY_REQUEST', etc.
// metadata - list of key-value pairs with additional data about the message
// integrationMetadata - list of key-value pairs with additional data defined in Integration executing this converter

/** Encoder **/

var data = {};

// Process data from incoming message and metadata

data.tempFreq = msg.temperatureUploadFrequency;
data.humFreq = msg.humidityUploadFrequency;

data.devSerialNumber = metadata['ss_serialNumber'];

// Result object with encoded downlink payload
var result = {

    // downlink data content type: JSON, TEXT or BINARY (base64 format)
    contentType: "JSON",

    // downlink data
    data: JSON.stringify(data),

    // Optional metadata object presented in key/value format
    metadata: {
            topic: metadata['deviceType']+'/'+metadata['deviceName']+'/upload'
    }

};

return result;
```



Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveConverterUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveConverterUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a JSON object representing the result of the processed incoming message. 

## Request Body Example

```json
{
   "metadata":{
      "data":"40"
   },
   "msg":"{\n    \"temp\": 42,\n    \"humidity\": 77\n}",
   "msgType":"POST_TELEMETRY_REQUEST",
   "integrationMetadata":{
      "integrationName":"Integration"
   },
   "encoder":"// Encode downlink data from incoming Rule Engine message\n\n// msg - JSON message payload downlink message json\n// msgType - type of message, for ex. 'ATTRIBUTES_UPDATED', 'POST_TELEMETRY_REQUEST', etc.\n// metadata - list of key-value pairs with additional data about the message\n// integrationMetadata - list of key-value pairs with additional data defined in Integration executing this converter\n\n/** Encoder **/\n\nvar data = {};\n\n// Process data from incoming message and metadata\n\ndata.tempValue = msg.temp;\ndata.humValue = msg.humidity;\n\ndata.devSerialNumber = metadata['ss_serialNumber'];\n\n// Result object with encoded downlink payload\nvar result = {\n\n    // downlink data content type: JSON, TEXT or BINARY (base64 format)\n    contentType: \"JSON\",\n\n    // downlink data\n    data: JSON.stringify(data),\n\n    // Optional metadata object presented in key/value format\n    metadata: {\n            topic: metadata['deviceType']+'/'+metadata['deviceName']+'/upload'\n    }\n\n};\n\nreturn result;"
}
```

 * 'metadata' - message metadata pushed from the rule engine; 
 * 'msg' - message data pushed from the rule engine; 
 * 'msgType' - type of the message pushed from the rule engine; 
 * 'integrationMetadata' - integration metadata object; 
 * 'encoder' - string representation of the encoder configuration.

## Response Body Example

```json
{
   "contentType":"JSON",
   "data":"{\"tempValue\":42,\"humValue\":77}",
   "metadata":{
      "topic":"sensor/Temp Sensor/upload"
   }
}
```

 * 'contentType' - downlink data content type; 
 * 'data' - downlink data; 
 * 'metadata' - optional metadata object. 

 * @method
 * @name ThingsboardPeRestApi#testDownLinkConverterUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.testDownLinkConverterUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter/testDownLink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a JSON object representing the result of the processed incoming message. 

## Request Body Example

```json
{
   "metadata":{
   },
   "payload":"ewogICAgImRhdGEiOiAiZGF0YSIKfQ==",
   "decoder":"// Decode an uplink message from a buffer\n// payload - array of bytes\n// metadata - key/value object\n\n/** Decoder **/\n\n// decode payload to string\nvar payloadStr = decodeToString(payload);\n\n// decode payload to JSON\n// var data = decodeToJson(payload);\n\nvar deviceName = 'Device A';\nvar deviceType = 'thermostat';\nvar customerName = 'customer';\nvar groupName = 'thermostat devices';\n// use assetName and assetType instead of deviceName and deviceType\n// to automatically create assets instead of devices.\n// var assetName = 'Asset A';\n// var assetType = 'building';\n\n// Result object with device/asset attributes/telemetry data\nvar result = {\n// Use deviceName and deviceType or assetName and assetType, but not both.\n   deviceName: deviceName,\n   deviceType: deviceType,\n// assetName: assetName,\n// assetType: assetType,\n   customerName: customerName,\n   groupName: groupName,\n   attributes: {\n       model: 'Model A',\n       serialNumber: 'SN111',\n       integrationName: metadata['integrationName']\n   },\n   telemetry: {\n       temperature: 42,\n       humidity: 80,\n       rawData: payloadStr\n   }\n};\n\n/** Helper functions **/\n\nfunction decodeToString(payload) {\n   return String.fromCharCode.apply(String, payload);\n}\n\nfunction decodeToJson(payload) {\n   // covert payload to string.\n   var str = decodeToString(payload);\n\n   // parse string to JSON\n   var data = JSON.parse(str);\n   return data;\n}\n\nreturn result;"
}
```

 * 'metadata' - integration metadata; 
 * 'payload' - base64 string representation of the data; 
 * 'decoder' - string representation of the decoder configuration.

## Response Body Example

```json
{
   "output":"{\"deviceName\":\"Device A\",\"deviceType\":\"thermostat\",\"customerName\":\"customer\",\"groupName\":\"thermostat devices\",\"attributes\":{\"model\":\"Model A\",\"serialNumber\":\"SN111\"},\"telemetry\":{\"temperature\":42,\"humidity\":80,\"rawData\":\"{\\n    \\\"data\\\": \\\"data\\\"\\n}\"}}",
   "error":""
}
```

 * 'output' - string representation of the output message; 
 * 'error' - string representation of the error message. 

 * @method
 * @name ThingsboardPeRestApi#testUpLinkConverterUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.testUpLinkConverterUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter/testUpLink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Converter object based on the provided Converter Id. The server checks that the converter is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getConverterByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.converterId - A string value representing the converter id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getConverterByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter/{converterId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{converterId}', parameters['converterId']);
        
        


        if(parameters['converterId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: converterId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the converter and all the relations (from and to the converter). Referencing non-existing converter Id will cause an error. If the converter is associated with the integration, it will not be allowed for deletion.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteConverterUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.converterId - A string value representing the converter id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteConverterUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter/{converterId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{converterId}', parameters['converterId']);
        
        


        if(parameters['converterId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: converterId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a JSON object of the latest debug event representing the input message the converter processed. 

## Uplink Converter Debug Input Event Example

```json
{
   "inContentType":"JSON",
   "inContent":"{\"temp\":40}",
   "inMetadata":"{\"Header:sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"94\\\", \\\"Google Chrome\\\";v=\\\"94\\\", \\\";Not A Brand\\\";v=\\\"99\\\"\",\"Header:user-agent\":\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36\",\"integrationName\":\"Integration\",\"Header:cookie\":\"GUID=zYSs8hymSwZKv8kHALKY; redirect_to=%2F; JSESSIONID=B0A7C8E481409CE7924E738DB04F62F9\",\"Header:sec-ch-ua-platform\":\"\\\"Linux\\\"\",\"Header:accept\":\"*/*\",\"Header:origin\":\"http://localhost:8080\",\"Header:sec-fetch-site\":\"same-origin\",\"Header:connection\":\"keep-alive\",\"Header:accept-encoding\":\"gzip, deflate, br\",\"Header:content-type\":\"application/json\",\"Header:content-length\":\"16\",\"Header:sec-fetch-mode\":\"cors\",\"Header:sec-ch-ua-mobile\":\"?0\",\"Header:sec-fetch-dest\":\"empty\",\"Header:host\":\"localhost:8080\",\"Header:referer\":\"http://localhost:8080/swagger-ui.html\",\"Header:accept-language\":\"en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk;q=0.6,und;q=0.5\"}"
}
```

 * 'inContentType' - content type of the message received by the integration; 
 * 'inContent' - message data received; 
 * 'inMetadata' - integration metadata (e.g. headers).

## Downlink Converter Debug Input Event Example

```json
{
   "inContentType":"JSON",
   "inContent":"{\"temp\":42,\"humidity\":77}",
   "inMsgType":"POST_TELEMETRY_REQUEST",
   "inMetadata":"{\"data\":\"40\"}",
   "inIntegrationMetadata":"{\"integrationName\":\"Integration\"}"
}
```

 * 'inContentType' - content type of the message received by the integration; 
 * 'inContent' - content of the message pushed from the rule engine; 
 * 'inMsgType' - type of the message pushed from the rule engine; 
 * 'inMetadata' - content of the message metadata pushed from the rule engine; 
 * 'inIntegrationMetadata' - integration metadata. 


 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getLatestConverterDebugInputUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.converterId - A string value representing the converter id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getLatestConverterDebugInputUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converter/{converterId}/debugIn';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{converterId}', parameters['converterId']);
        
        


        if(parameters['converterId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: converterId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested converters must be owned by tenant which is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getConvertersByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.converterIds - A list of converter ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getConvertersByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converters{?converterIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['converterIds'] !== undefined){
                    queryParameters['converterIds'] = parameters['converterIds'];
                }
        
        
        


        if(parameters['converterIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: converterIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of converters owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getConvertersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the converter name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getConvertersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/converters{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Custom Menu object that corresponds to the authority of the user. The API call is designed to load the custom menu items for edition. So, the result is NOT merged with the parent level configuration. Let's assume there is a custom menu configured on a system level. And there is no custom menu items configured on a tenant level. In such a case, the API call will return empty object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getCurrentCustomMenuUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCurrentCustomMenuUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customMenu/currentCustomMenu';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Custom Menu object for the end user. The custom menu is configured in the white labeling parameters. If custom menu configuration on the tenant level is present, it overrides the menu configuration of the system level. Similar, if the custom menu configuration on the customer level is present, it overrides the menu configuration of the tenant level.
 * @method
 * @name ThingsboardPeRestApi#getCustomMenuUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCustomMenuUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customMenu/customMenu';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Custom Menu configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#saveCustomMenuUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveCustomMenuUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customMenu/customMenu';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Custom Translation map that corresponds to the authority of the user. The API call is designed to load the custom translation items for edition. So, the result is NOT merged with the parent level configuration. Let's assume there is a custom translation configured on a system level. And there is no custom translation items configured on a tenant level. In such a case, the API call will return empty object for the tenant administrator. 

 Response example: 

```json
{"translationMap":{"es_ES":"{\"home\":\"MyHome\"}"}}
```

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getCurrentCustomTranslationUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCurrentCustomTranslationUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customTranslation/currentCustomTranslation';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Custom Translation map for the end user. The custom translation is configured in the white labeling parameters. If custom translation translation is defined on the tenant level, it overrides the custom translation of the system level. Similar, if the custom translation is defined on the customer level, it overrides the translation configuration of the tenant level.
 * @method
 * @name ThingsboardPeRestApi#getCustomTranslationUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCustomTranslationUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customTranslation/customTranslation';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Custom Translation map.

 Request example: 

```json
{"translationMap":{"es_ES":"{\"home\":\"MyHome\"}"}}
```

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#saveCustomTranslationUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveCustomTranslationUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customTranslation/customTranslation';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Customer object based on the provided Customer Id. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomerByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getCustomerByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the Customer and all customer Users. All assigned Dashboards, Assets, Devices, etc. will be unassigned but not deleted. Referencing non-existing Customer Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteCustomerUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteCustomerUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the short customer object that contains only the title and 'isPublic' flag. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getShortCustomerInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getShortCustomerInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/shortInfo';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the title of the customer. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomerTitleByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getCustomerTitleByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/title';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of Customer objects based on the provided ids. Filters the list based on the user permissions. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomersByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerIds - A list of customer ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getCustomersByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customers{?customerIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['customerIds'] !== undefined){
                    queryParameters['customerIds'] = parameters['customerIds'];
                }
        
        
        


        if(parameters['customerIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of customers owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the customer title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customers{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Customer. When creating customer, platform generates Customer Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Customer Id will be present in the response. Specify existing Customer Id to update the Customer. Referencing non-existing Customer Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveCustomerUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'. If specified, the entity will be added to the corresponding entity group.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveCustomerUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Customer objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getCustomersByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the customer title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomersByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/customers{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Customer using Customer Title. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantCustomerUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerTitle - A string value representing the Customer title.
 */
 ThingsboardPeRestApi.prototype.getTenantCustomerUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/customers{?customerTitle}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['customerTitle'] !== undefined){
                    queryParameters['customerTitle'] = parameters['customerTitle'];
                }
        
        
        


        if(parameters['customerTitle'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerTitle'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of customers available for the user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserCustomersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the customer title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserCustomersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/customers{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the corresponding customer. 

Available for users with 'CUSTOMER_USER' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getCustomerHomeDashboardInfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCustomerHomeDashboardInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/dashboard/home/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the home dashboard assignment for the current customer. 

Available for users with 'CUSTOMER_USER' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#setCustomerHomeDashboardInfoUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.setCustomerHomeDashboardInfoUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/dashboard/home/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the home dashboard object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User. If 'homeDashboardId' parameter is not set on the User level and the User has authority 'CUSTOMER_USER', check the same parameter for the corresponding Customer. If 'homeDashboardId' parameter is not set on the User and Customer levels then checks the same parameter for the Tenant that owns the user. The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getHomeDashboardUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getHomeDashboardUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/home';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User. If 'homeDashboardId' parameter is not set on the User level and the User has authority 'CUSTOMER_USER', check the same parameter for the corresponding Customer. If 'homeDashboardId' parameter is not set on the User and Customer levels then checks the same parameter for the Tenant that owns the user. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getHomeDashboardInfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getHomeDashboardInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/home/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the information about the dashboard based on 'dashboardId' parameter. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON.
 * @method
 * @name ThingsboardPeRestApi#getDashboardInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dashboardId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDashboardInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/info/{dashboardId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{dashboardId}', parameters['dashboardId']);
        
        


        if(parameters['dashboardId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dashboardId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the maximum number of data points that dashboard may request from the server per in a single subscription command. This value impacts the time window behavior. It impacts 'Max values' parameter in case user selects 'None' as 'Data aggregation function'. It also impacts the 'Grouping interval' in case of any other 'Data aggregation function' is selected. The actual value of the limit is configurable in the system configuration file.
 * @method
 * @name ThingsboardPeRestApi#getMaxDatapointsLimitUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getMaxDatapointsLimitUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/maxDatapointsLimit';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the server time (milliseconds since January 1, 1970 UTC). Used to adjust view of the dashboards according to the difference between browser and server time.
 * @method
 * @name ThingsboardPeRestApi#getServerTimeUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getServerTimeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/serverTime';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the dashboard based on 'dashboardId' parameter. The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getDashboardByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dashboardId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDashboardByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/{dashboardId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{dashboardId}', parameters['dashboardId']);
        
        


        if(parameters['dashboardId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dashboardId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete the Dashboard. Only users with 'TENANT_ADMIN') authority may delete the dashboards.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteDashboardUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dashboardId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteDashboardUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard/{dashboardId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{dashboardId}', parameters['dashboardId']);
        
        


        if(parameters['dashboardId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dashboardId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of DashboardInfo objects based on the provided ids. Filters the list based on the user permissions. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getDashboardsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dashboardIds - A list of dashboard ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getDashboardsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboards{?dashboardIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['dashboardIds'] !== undefined){
                    queryParameters['dashboardIds'] = parameters['dashboardIds'];
                }
        
        
        


        if(parameters['dashboardIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dashboardIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Dashboard. When creating dashboard, platform generates Dashboard Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Dashboard id will be present in the response. Specify existing Dashboard id to update the dashboard. Referencing non-existing dashboard Id will cause 'Not Found' error. Only users with 'TENANT_ADMIN') authority may create the dashboards.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveDashboardUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDashboardUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/dashboard{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Export the dashboards that belong to specified group id.The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#exportGroupDashboardsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.limit - Limit of the entities to export
 */
 ThingsboardPeRestApi.prototype.exportGroupDashboardsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/dashboards/export{?limit}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['limit'] !== undefined){
                    queryParameters['limit'] = parameters['limit'];
                }
        
        
        


        if(parameters['limit'] === undefined){
            deferred.reject(new Error('Missing required  parameter: limit'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Import the dashboards to specified group.The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#importGroupDashboardsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {boolean} parameters.overwrite - Overwrite dashboards with the same name
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.importGroupDashboardsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/dashboards/import{?overwrite}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['overwrite'] !== undefined){
                    queryParameters['overwrite'] = parameters['overwrite'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Dashboard objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getDashboardsByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the dashboard title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getDashboardsByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/dashboards{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the corresponding tenant. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getTenantHomeDashboardInfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getTenantHomeDashboardInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/dashboard/home/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the home dashboard assignment for the current tenant. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#setTenantHomeDashboardInfoUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.setTenantHomeDashboardInfoUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/dashboard/home/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of dashboard info objects owned by the tenant of a current user. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantDashboardsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {boolean} parameters.mobile - Exclude dashboards that are hidden for mobile
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the dashboard title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantDashboardsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/dashboards{?mobile,page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['mobile'] !== undefined){
                    queryParameters['mobile'] = parameters['mobile'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of dashboard info objects owned by tenant. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantDashboardsUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the dashboard title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantDashboardsUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/{tenantId}/dashboards{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Dashboard Info objects available for specified or current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserDashboardsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {boolean} parameters.mobile - Exclude dashboards that are hidden for mobile
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the dashboard title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {string} parameters.operation - Filter by allowed operations for the current user
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getUserDashboardsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/dashboards{?mobile,operation,page,pageSize,sortOrder,sortProperty,textSearch,userId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['mobile'] !== undefined){
                    queryParameters['mobile'] = parameters['mobile'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['operation'] !== undefined){
                    queryParameters['operation'] = parameters['operation'];
                }
        
        
        


 

                if(parameters['userId'] !== undefined){
                    queryParameters['userId'] = parameters['userId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Reclaiming means the device will be unassigned from the customer and the device will be available for claiming again.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'CLAIM_DEVICES' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#reClaimDeviceUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceName - Unique name of the device which is going to be reclaimed
 */
 ThingsboardPeRestApi.prototype.reClaimDeviceUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/device/{deviceName}/claim';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceName}', parameters['deviceName']);
        
        


        if(parameters['deviceName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Claiming makes it possible to assign a device to the specific customer using device/server side claiming data (in the form of secret key).To make this happen you have to provide unique device name and optional claiming data (it is needed only for device-side claiming).Once device is claimed, the customer becomes its owner and customer users may access device data as well as control the device. 
In order to enable claiming devices feature a system parameter security.claim.allowClaimingByDefault should be set to true, otherwise a server-side claimingAllowed attribute with the value true is obligatory for provisioned devices. 
See official documentation for more details regarding claiming.

Available for users with 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'CLAIM_DEVICES' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#claimDeviceUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceName - Unique name of the device which is going to be claimed
     * @param {string} parameters.subCustomerId - subCustomerId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.claimDeviceUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/device/{deviceName}/claim{?subCustomerId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceName}', parameters['deviceName']);
        
        


        if(parameters['deviceName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceName'));
            return deferred.promise;
        }
 

                if(parameters['subCustomerId'] !== undefined){
                    queryParameters['subCustomerId'] = parameters['subCustomerId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of devices objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomerDevicesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Device type as the name of the device profile
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomerDevicesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Device. When creating device, platform generates Device Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Requires to provide the Device Credentials object as well. Useful to create device and credentials in one request. You may find the example of LwM2M device and RPK credentials below: 

```json
{
  "device": {
    "name": "LwRpk00000000",
    "type": "lwm2mProfileRpk"
  },
  "credentials": {
    "id": "null",
    "createdTime": 0,
    "deviceId": "null",
    "credentialsType": "LWM2M_CREDENTIALS",
    "credentialsId": "LwRpk00000000",
    "credentialsValue": {
      "client": {
        "endpoint": "LwRpk00000000",
        "securityConfigClientMode": "RPK",
        "key": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEUEBxNl/RcYJNm8mk91CyVXoIJiROYDlXcSSqK6e5bDHwOW4ZiN2lNnXalyF0Jxw8MbAytnDMERXyAja5VEMeVQ=="
      },
      "bootstrap": {
        "bootstrapServer": {
          "securityMode": "RPK",
          "clientPublicKeyOrId": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEUEBxNl/RcYJNm8mk91CyVXoIJiROYDlXcSSqK6e5bDHwOW4ZiN2lNnXalyF0Jxw8MbAytnDMERXyAja5VEMeVQ==",
          "clientSecretKey": "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgd9GAx7yZW37autew5KZykn4IgRpge/tZSjnudnZJnMahRANCAARQQHE2X9Fxgk2byaT3ULJVeggmJE5gOVdxJKorp7lsMfA5bhmI3aU2ddqXIXQnHDwxsDK2cMwRFfICNrlUQx5V"
        },
        "lwm2mServer": {
          "securityMode": "RPK",
          "clientPublicKeyOrId": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEUEBxNl/RcYJNm8mk91CyVXoIJiROYDlXcSSqK6e5bDHwOW4ZiN2lNnXalyF0Jxw8MbAytnDMERXyAja5VEMeVQ==",
          "clientSecretKey": "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgd9GAx7yZW37autew5KZykn4IgRpge/tZSjnudnZJnMahRANCAARQQHE2X9Fxgk2byaT3ULJVeggmJE5gOVdxJKorp7lsMfA5bhmI3aU2ddqXIXQnHDwxsDK2cMwRFfICNrlUQx5V"
        }
      }
    }
  }
}
```

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveDeviceWithCredentialsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDeviceWithCredentialsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device-with-credentials{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * There's an ability to import the bulk of devices using the only .csv file. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#processDevicesBulkImportUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.processDevicesBulkImportUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/bulk_import';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * During device creation, platform generates random 'ACCESS_TOKEN' credentials. Use this method to update the device credentials. First use 'getDeviceCredentialsByDeviceId' to get the credentials id and value. Then use current method to update the credentials type and value. It is not possible to create multiple device credentials for the same device. The structure of device credentials id and value is simple for the 'ACCESS_TOKEN' but is much more complex for the 'MQTT_BASIC' or 'LWM2M_CREDENTIALS'.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE_CREDENTIALS' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#updateDeviceCredentialsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.updateDeviceCredentialsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/credentials';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique device profile names based on devices that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getDeviceTypesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getDeviceTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/types';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Device object based on the provided Device Id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getDeviceByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDeviceByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the device, it's credentials and all the relations (from and to the device). Referencing non-existing device Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteDeviceUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteDeviceUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * If during device creation there wasn't specified any credentials, platform generates random 'ACCESS_TOKEN' credentials.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ_CREDENTIALS' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getDeviceCredentialsByDeviceIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDeviceCredentialsByDeviceIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device/{deviceId}/credentials';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all devices that are related to the specific entity. The entity id, relation type, device types, depth of the search, and other query parameters defined using complex 'DeviceSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#findByQueryUsingPOST_1
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findByQueryUsingPOST_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * The platform gives an ability to load OTA (over-the-air) packages to devices. It can be done in two different ways: device scope or device profile scope.In the response you will find the number of devices with specified device profile, but without previously defined device scope OTA package. It can be useful when you want to define number of devices that will be affected with future OTA package

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#countByDeviceProfileAndEmptyOtaPackageUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageType - OTA package type
     * @param {string} parameters.deviceProfileId - Device Profile Id. I.g. '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.countByDeviceProfileAndEmptyOtaPackageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/devices/count/{otaPackageType}/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageType}', parameters['otaPackageType']);
        
        


        if(parameters['otaPackageType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * The platform gives an ability to load OTA (over-the-air) packages to devices. It can be done in two different ways: device scope or device profile scope.In the response you will find the number of devices with specified device profile, but without previously defined device scope OTA package. It can be useful when you want to define number of devices that will be affected with future OTA package

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#countByDeviceGroupAndEmptyOtaPackageUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageType - OTA package type
     * @param {string} parameters.otaPackageId - otaPackageId
     * @param {string} parameters.entityGroupId - entityGroupId
 */
 ThingsboardPeRestApi.prototype.countByDeviceGroupAndEmptyOtaPackageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/devices/count/{otaPackageType}/{otaPackageId}/{entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageType}', parameters['otaPackageType']);
        
        


        if(parameters['otaPackageType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested devices must be owned by tenant or assigned to customer which user is performing the request. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getDevicesByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceIds - A list of devices ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getDevicesByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/devices{?deviceIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['deviceIds'] !== undefined){
                    queryParameters['deviceIds'] = parameters['deviceIds'];
                }
        
        
        


        if(parameters['deviceIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Device. When creating device, platform generates Device Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Device credentials are also generated if not provided in the 'accessToken' request parameter. The newly created device id will be present in the response. Specify existing Device id to update the device. Referencing non-existing device Id will cause 'Not Found' error.

Device name is unique in the scope of tenant. Use unique identifiers like MAC or IMEI for the device names and non-unique 'label' field for user-friendly visualization purposes.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveDeviceUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.accessToken - Optional value of the device credentials to be used during device creation. If omitted, access token will be auto-generated.
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDeviceUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/device{?accessToken,entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['accessToken'] !== undefined){
                    queryParameters['accessToken'] = parameters['accessToken'];
                }
        
        
        


 

                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Device objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getDevicesByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getDevicesByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/devices{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested device must be owned by tenant that the user belongs to. Device name is an unique property of device. So it can be used to identify the device.

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantDeviceUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceName - A string value representing the Device name.
 */
 ThingsboardPeRestApi.prototype.getTenantDeviceUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/devices{?deviceName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['deviceName'] !== undefined){
                    queryParameters['deviceName'] = parameters['deviceName'];
                }
        
        
        


        if(parameters['deviceName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of devices owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantDevicesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Device type as the name of the device profile
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantDevicesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates assignment of the device to tenant. Thereafter tenant will be able to reassign the device to a customer.

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'ASSIGN_TO_TENANT' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#assignDeviceToTenantUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.assignDeviceToTenantUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/{tenantId}/device/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of devices that are available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserDevicesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Device type as the name of the device profile
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserDevicesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * saveDeviceGroupOtaPackage
 * @method
 * @name ThingsboardPeRestApi#saveDeviceGroupOtaPackageUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDeviceGroupOtaPackageUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceGroupOtaPackage';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getFirmwareById
 * @method
 * @name ThingsboardPeRestApi#getFirmwareByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupId - groupId
     * @param {string} parameters.firmwareType - firmwareType
 */
 ThingsboardPeRestApi.prototype.getFirmwareByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceGroupOtaPackage/{groupId}/{firmwareType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupId}', parameters['groupId']);
        
        


        if(parameters['groupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{firmwareType}', parameters['firmwareType']);
        
        


        if(parameters['firmwareType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: firmwareType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * deleteDeviceGroupOtaPackage
 * @method
 * @name ThingsboardPeRestApi#deleteDeviceGroupOtaPackageUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - id
 */
 ThingsboardPeRestApi.prototype.deleteDeviceGroupOtaPackageUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceGroupOtaPackage/{id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Device Profile. When creating device profile, platform generates device profile id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created device profile id will be present in the response. Specify existing device profile id to update the device profile. Referencing non-existing device profile Id will cause 'Not Found' error. 

Device profile name is unique in the scope of tenant. Only one 'default' device profile may exist in scope of tenant.

# Device profile data definition

Device profile data object contains alarm rules configuration, device provision strategy and transport type configuration for device connectivity. Let's review some examples. First one is the default device profile data configuration and second one - the custom one. 

```json
{
   "alarms":[
   ],
   "configuration":{
      "type":"DEFAULT"
   },
   "provisionConfiguration":{
      "type":"DISABLED",
      "provisionDeviceSecret":null
   },
   "transportConfiguration":{
      "type":"DEFAULT"
   }
}
```

```json
{
   "alarms":[
      {
         "id":"2492b935-1226-59e9-8615-17d8978a4f93",
         "alarmType":"Temperature Alarm",
         "clearRule":{
            "schedule":null,
            "condition":{
               "spec":{
                  "type":"SIMPLE"
               },
               "condition":[
                  {
                     "key":{
                        "key":"temperature",
                        "type":"TIME_SERIES"
                     },
                     "value":null,
                     "predicate":{
                        "type":"NUMERIC",
                        "value":{
                           "userValue":null,
                           "defaultValue":30.0,
                           "dynamicValue":null
                        },
                        "operation":"LESS"
                     },
                     "valueType":"NUMERIC"
                  }
               ]
            },
            "dashboardId":null,
            "alarmDetails":null
         },
         "propagate":false,
         "createRules":{
            "MAJOR":{
               "schedule":{
                  "type":"SPECIFIC_TIME",
                  "endsOn":64800000,
                  "startsOn":43200000,
                  "timezone":"Europe/Kiev",
                  "daysOfWeek":[
                     1,
                     3,
                     5
                  ]
               },
               "condition":{
                  "spec":{
                     "type":"DURATION",
                     "unit":"MINUTES",
                     "predicate":{
                        "userValue":null,
                        "defaultValue":30,
                        "dynamicValue":null
                     }
                  },
                  "condition":[
                     {
                        "key":{
                           "key":"temperature",
                           "type":"TIME_SERIES"
                        },
                        "value":null,
                        "predicate":{
                           "type":"COMPLEX",
                           "operation":"OR",
                           "predicates":[
                              {
                                 "type":"NUMERIC",
                                 "value":{
                                    "userValue":null,
                                    "defaultValue":50.0,
                                    "dynamicValue":null
                                 },
                                 "operation":"LESS_OR_EQUAL"
                              },
                              {
                                 "type":"NUMERIC",
                                 "value":{
                                    "userValue":null,
                                    "defaultValue":30.0,
                                    "dynamicValue":null
                                 },
                                 "operation":"GREATER"
                              }
                           ]
                        },
                        "valueType":"NUMERIC"
                     }
                  ]
               },
               "dashboardId":null,
               "alarmDetails":null
            },
            "WARNING":{
               "schedule":{
                  "type":"CUSTOM",
                  "items":[
                     {
                        "endsOn":0,
                        "enabled":false,
                        "startsOn":0,
                        "dayOfWeek":1
                     },
                     {
                        "endsOn":64800000,
                        "enabled":true,
                        "startsOn":43200000,
                        "dayOfWeek":2
                     },
                     {
                        "endsOn":0,
                        "enabled":false,
                        "startsOn":0,
                        "dayOfWeek":3
                     },
                     {
                        "endsOn":57600000,
                        "enabled":true,
                        "startsOn":36000000,
                        "dayOfWeek":4
                     },
                     {
                        "endsOn":0,
                        "enabled":false,
                        "startsOn":0,
                        "dayOfWeek":5
                     },
                     {
                        "endsOn":0,
                        "enabled":false,
                        "startsOn":0,
                        "dayOfWeek":6
                     },
                     {
                        "endsOn":0,
                        "enabled":false,
                        "startsOn":0,
                        "dayOfWeek":7
                     }
                  ],
                  "timezone":"Europe/Kiev"
               },
               "condition":{
                  "spec":{
                     "type":"REPEATING",
                     "predicate":{
                        "userValue":null,
                        "defaultValue":5,
                        "dynamicValue":null
                     }
                  },
                  "condition":[
                     {
                        "key":{
                           "key":"tempConstant",
                           "type":"CONSTANT"
                        },
                        "value":30,
                        "predicate":{
                           "type":"NUMERIC",
                           "value":{
                              "userValue":null,
                              "defaultValue":0.0,
                              "dynamicValue":{
                                 "inherit":false,
                                 "sourceType":"CURRENT_DEVICE",
                                 "sourceAttribute":"tempThreshold"
                              }
                           },
                           "operation":"EQUAL"
                        },
                        "valueType":"NUMERIC"
                     }
                  ]
               },
               "dashboardId":null,
               "alarmDetails":null
            },
            "CRITICAL":{
               "schedule":null,
               "condition":{
                  "spec":{
                     "type":"SIMPLE"
                  },
                  "condition":[
                     {
                        "key":{
                           "key":"temperature",
                           "type":"TIME_SERIES"
                        },
                        "value":null,
                        "predicate":{
                           "type":"NUMERIC",
                           "value":{
                              "userValue":null,
                              "defaultValue":50.0,
                              "dynamicValue":null
                           },
                           "operation":"GREATER"
                        },
                        "valueType":"NUMERIC"
                     }
                  ]
               },
               "dashboardId":null,
               "alarmDetails":null
            }
         },
         "propagateRelationTypes":null
      }
   ],
   "configuration":{
      "type":"DEFAULT"
   },
   "provisionConfiguration":{
      "type":"ALLOW_CREATE_NEW_DEVICES",
      "provisionDeviceSecret":"vaxb9hzqdbz3oqukvomg"
   },
   "transportConfiguration":{
      "type":"MQTT",
      "deviceTelemetryTopic":"v1/devices/me/telemetry",
      "deviceAttributesTopic":"v1/devices/me/attributes",
      "transportPayloadTypeConfiguration":{
         "transportPayloadType":"PROTOBUF",
         "deviceTelemetryProtoSchema":"syntax =\"proto3\";\npackage telemetry;\n\nmessage SensorDataReading {\n\n  optional double temperature = 1;\n  optional double humidity = 2;\n  InnerObject innerObject = 3;\n\n  message InnerObject {\n    optional string key1 = 1;\n    optional bool key2 = 2;\n    optional double key3 = 3;\n    optional int32 key4 = 4;\n    optional string key5 = 5;\n  }\n}",
         "deviceAttributesProtoSchema":"syntax =\"proto3\";\npackage attributes;\n\nmessage SensorConfiguration {\n  optional string firmwareVersion = 1;\n  optional string serialNumber = 2;\n}",
         "deviceRpcRequestProtoSchema":"syntax =\"proto3\";\npackage rpc;\n\nmessage RpcRequestMsg {\n  optional string method = 1;\n  optional int32 requestId = 2;\n  optional string params = 3;\n}",
         "deviceRpcResponseProtoSchema":"syntax =\"proto3\";\npackage rpc;\n\nmessage RpcResponseMsg {\n  optional string payload = 1;\n}"
      }
   }
}
```

Let's review some specific objects examples related to the device profile configuration:

# Alarm Schedule

Alarm Schedule JSON object represents the time interval during which the alarm rule is active. Note, 

```json
"schedule": null
```

means alarm rule is active all the time. **'daysOfWeek'** field represents Monday as 1, Tuesday as 2 and so on. **'startsOn'** and **'endsOn'** fields represent hours in millis (e.g. 64800000 = 18:00 or 6pm). **'enabled'** flag specifies if item in a custom rule is active for specific day of the week:

## Specific Time Schedule

```json
{
   "schedule":{
      "type":"SPECIFIC_TIME",
      "endsOn":64800000,
      "startsOn":43200000,
      "timezone":"Europe/Kiev",
      "daysOfWeek":[
         1,
         3,
         5
      ]
   }
}
```

## Custom Schedule

```json
{
   "schedule":{
      "type":"CUSTOM",
      "items":[
         {
            "endsOn":0,
            "enabled":false,
            "startsOn":0,
            "dayOfWeek":1
         },
         {
            "endsOn":64800000,
            "enabled":true,
            "startsOn":43200000,
            "dayOfWeek":2
         },
         {
            "endsOn":0,
            "enabled":false,
            "startsOn":0,
            "dayOfWeek":3
         },
         {
            "endsOn":57600000,
            "enabled":true,
            "startsOn":36000000,
            "dayOfWeek":4
         },
         {
            "endsOn":0,
            "enabled":false,
            "startsOn":0,
            "dayOfWeek":5
         },
         {
            "endsOn":0,
            "enabled":false,
            "startsOn":0,
            "dayOfWeek":6
         },
         {
            "endsOn":0,
            "enabled":false,
            "startsOn":0,
            "dayOfWeek":7
         }
      ],
      "timezone":"Europe/Kiev"
   }
}
```

# Alarm condition type (**'spec'**)

Alarm condition type can be either simple, duration, or repeating. For example, 5 times in a row or during 5 minutes.

Note, **'userValue'** field is not used and reserved for future usage, **'dynamicValue'** is used for condition appliance by using the value of the **'sourceAttribute'** or else **'defaultValue'** is used (if **'sourceAttribute'** is absent).

**'sourceType'** of the **'sourceAttribute'** can be: 
 * 'CURRENT_DEVICE';
 * 'CURRENT_CUSTOMER';
 * 'CURRENT_TENANT'.

**'sourceAttribute'** can be inherited from the owner if **'inherit'** is set to true (for CURRENT_DEVICE and CURRENT_CUSTOMER).

## Repeating alarm condition

```json
{
   "spec":{
      "type":"REPEATING",
      "predicate":{
         "userValue":null,
         "defaultValue":5,
         "dynamicValue":{
            "inherit":true,
            "sourceType":"CURRENT_DEVICE",
            "sourceAttribute":"tempAttr"
         }
      }
   }
}
```

## Duration alarm condition

```json
{
   "spec":{
      "type":"DURATION",
      "unit":"MINUTES",
      "predicate":{
         "userValue":null,
         "defaultValue":30,
         "dynamicValue":null
      }
   }
}
```

**'unit'** can be: 
 * 'SECONDS';
 * 'MINUTES';
 * 'HOURS';
 * 'DAYS'.

# Key Filters

Key filter objects are created under the **'condition'** array. They allow you to define complex logical expressions over entity field, attribute, latest time-series value or constant. The filter is defined using 'key', 'valueType', 'value' (refers to the value of the 'CONSTANT' alarm filter key type) and 'predicate' objects. Let's review each object:

## Alarm Filter Key

Filter Key defines either entity field, attribute, telemetry or constant. It is a JSON object that consists the key name and type. The following filter key types are supported:
 * 'ATTRIBUTE' - used for attributes values;
 * 'TIME_SERIES' - used for time-series values;
 * 'ENTITY_FIELD' - used for accessing entity fields like 'name', 'label', etc. The list of available fields depends on the entity type;
 * 'CONSTANT' - constant value specified.

Let's review the example:

```json
{
  "type": "TIME_SERIES",
  "key": "temperature"
}
```

## Value Type and Operations

Provides a hint about the data type of the entity field that is defined in the filter key. The value type impacts the list of possible operations that you may use in the corresponding predicate. For example, you may use 'STARTS_WITH' or 'END_WITH', but you can't use 'GREATER_OR_EQUAL' for string values.The following filter value types and corresponding predicate operations are supported: 

 * 'STRING' - used to filter any 'String' or 'JSON' values. Operations: EQUAL, NOT_EQUAL, STARTS_WITH, ENDS_WITH, CONTAINS, NOT_CONTAINS; 
 * 'NUMERIC' - used for 'Long' and 'Double' values. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 
 * 'BOOLEAN' - used for boolean values. Operations: EQUAL, NOT_EQUAL;
 * 'DATE_TIME' - similar to numeric, transforms value to milliseconds since epoch. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 




## Filter Predicate

Filter Predicate defines the logical expression to evaluate. The list of available operations depends on the filter value type, see above. Platform supports 4 predicate types: 'STRING', 'NUMERIC', 'BOOLEAN' and 'COMPLEX'. The last one allows to combine multiple operations over one filter key.

Simple predicate example to check 'value < 100': 

```json
{
  "operation": "LESS",
  "value": {
    "userValue": null,
    "defaultValue": 100,
    "dynamicValue": null
  },
  "type": "NUMERIC"
}
```

Complex predicate example, to check 'value < 10 or value > 20': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "userValue": null,
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "operation": "GREATER",
      "value": {
        "userValue": null,
        "defaultValue": 20,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    }
  ]
}
```

More complex predicate example, to check 'value < 10 or (value > 50 && value < 60)': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "userValue": null,
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "type": "COMPLEX",
      "operation": "AND",
      "predicates": [
        {
          "operation": "GREATER",
          "value": {
            "userValue": null,
            "defaultValue": 50,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        },
        {
          "operation": "LESS",
          "value": {
            "userValue": null,
            "defaultValue": 60,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        }
      ]
    }
  ]
}
```

You may also want to replace hardcoded values (for example, temperature > 20) with the more dynamic expression (for example, temperature > value of the tenant attribute with key 'temperatureThreshold'). It is possible to use 'dynamicValue' to define attribute of the tenant, customer or device. See example below:

```json
{
  "operation": "GREATER",
  "value": {
    "userValue": null,
    "defaultValue": 0,
    "dynamicValue": {
      "inherit": false,
      "sourceType": "CURRENT_TENANT",
      "sourceAttribute": "temperatureThreshold"
    }
  },
  "type": "NUMERIC"
}
```

Note that you may use 'CURRENT_DEVICE', 'CURRENT_CUSTOMER' and 'CURRENT_TENANT' as a 'sourceType'. The 'defaultValue' is used when the attribute with such a name is not defined for the chosen source. The 'sourceAttribute' can be inherited from the owner of the specified 'sourceType' if 'inherit' is set to true.

# Provision Configuration

There are 3 types of device provision configuration for the device profile: 
 * 'DISABLED';
 * 'ALLOW_CREATE_NEW_DEVICES';
 * 'CHECK_PRE_PROVISIONED_DEVICES'.

Please refer to the [docs](https://thingsboard.io/docs/user-guide/device-provisioning/) for more details.

# Transport Configuration

5 transport configuration types are available:
 * 'DEFAULT';
 * 'MQTT';
 * 'LWM2M';
 * 'COAP';
 * 'SNMP'.

Default type supports basic MQTT, HTTP, CoAP and LwM2M transports. Please refer to the [docs](https://thingsboard.io/docs/user-guide/device-profiles/#transport-configuration) for more details about other types.

See another example of COAP transport configuration below:

```json
{
   "type":"COAP",
   "clientSettings":{
      "edrxCycle":null,
      "powerMode":"DRX",
      "psmActivityTimer":null,
      "pagingTransmissionWindow":null
   },
   "coapDeviceTypeConfiguration":{
      "coapDeviceType":"DEFAULT",
      "transportPayloadTypeConfiguration":{
         "transportPayloadType":"JSON"
      }
   }
}
```

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveDeviceProfileUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDeviceProfileUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a set of unique attribute keys used by devices that belong to specified profile. If profile is not set returns a list of unique keys among all profiles. The call is used for auto-complete in the UI forms. The implementation limits the number of devices that participate in search to 100 as a trade of between accurate results and time-consuming queries. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getAttributesKeysUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAttributesKeysUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile/devices/keys/attributes{?deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['deviceProfileId'] !== undefined){
                    queryParameters['deviceProfileId'] = parameters['deviceProfileId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a set of unique time-series keys used by devices that belong to specified profile. If profile is not set returns a list of unique keys among all profiles. The call is used for auto-complete in the UI forms. The implementation limits the number of devices that participate in search to 100 as a trade of between accurate results and time-consuming queries. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTimeseriesKeysUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTimeseriesKeysUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile/devices/keys/timeseries{?deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['deviceProfileId'] !== undefined){
                    queryParameters['deviceProfileId'] = parameters['deviceProfileId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Device Profile object based on the provided Device Profile Id. The server checks that the device profile is owned by the same tenant. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getDeviceProfileByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDeviceProfileByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the device profile. Referencing non-existing device profile Id will cause an error. Can't delete the device profile if it is referenced by existing devices.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteDeviceProfileUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteDeviceProfileUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Marks device profile as default within a tenant scope.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setDefaultDeviceProfileUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setDefaultDeviceProfileUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfile/{deviceProfileId}/default';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Default Device Profile Info object. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getDefaultDeviceProfileInfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getDefaultDeviceProfileInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfileInfo/default';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Device Profile Info object based on the provided Device Profile Id. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getDeviceProfileInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getDeviceProfileInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfileInfo/{deviceProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of devices profile info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getDeviceProfileInfosUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device profile name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {string} parameters.transportType - Type of the transport
 */
 ThingsboardPeRestApi.prototype.getDeviceProfileInfosUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfileInfos{?page,pageSize,sortOrder,sortProperty,textSearch,transportType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['transportType'] !== undefined){
                    queryParameters['transportType'] = parameters['transportType'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of devices profile objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getDeviceProfilesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the device profile name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getDeviceProfilesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/deviceProfiles{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of edges objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getCustomerEdgesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - A string value representing the edge type. For example, 'default'
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomerEdgesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * There's an ability to import the bulk of edges using the only .csv file.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#processEdgesBulkImportUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.processEdgesBulkImportUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/bulk_import';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of rule chains ids that are not assigned to particular edge, but these rule chains are present in the already assigned rule chains to edge.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#findMissingToRelatedRuleChainsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.findMissingToRelatedRuleChainsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/missingToRelatedRuleChains/{edgeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Starts synchronization process between edge and cloud. 
All entities that are assigned to particular edge are going to be send to remote edge service.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#syncEdgeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.syncEdgeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/sync/{edgeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique edge types based on edges that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getEdgeTypesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getEdgeTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/types';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Edge object based on the provided Edge Id. If the user has the authority of 'Tenant Administrator', the server checks that the edge is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the edge is assigned to the same customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getEdgeByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getEdgeByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the edge. Referencing non-existing edge Id will cause an error.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteEdgeUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteEdgeUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Change root rule chain of the edge to the new provided rule chain. 
This operation will send a notification to update root rule chain on remote edge service.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setEdgeRootRuleChainUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setEdgeRootRuleChainUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/{ruleChainId}/root';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all edges that are related to the specific entity. The entity id, relation type, edge types, depth of the search, and other query parameters defined using complex 'EdgeSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#findByQueryUsingPOST_2
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findByQueryUsingPOST_2 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edges';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns 'true' if edges support enabled on server, 'false' - otherwise.
 * @method
 * @name ThingsboardPeRestApi#isEdgesSupportEnabledUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.isEdgesSupportEnabledUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edges/enabled';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested edges must be owned by tenant or assigned to customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getEdgesByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeIds - A list of edges ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getEdgesByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edges{?edgeIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['edgeIds'] !== undefined){
                    queryParameters['edgeIds'] = parameters['edgeIds'];
                }
        
        
        


        if(parameters['edgeIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of edges owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getEdgesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEdgesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edges{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Edge. When creating edge, platform generates Edge Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created edge id will be present in the response. Specify existing Edge id to update the edge. Referencing non-existing Edge Id will cause 'Not Found' error.

Edge name is unique in the scope of tenant. Use unique identifiers like MAC or IMEI for the edge names and non-unique 'label' field for user-friendly visualization purposes.
 * @method
 * @name ThingsboardPeRestApi#saveEdgeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEdgeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Edge objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEdgesByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEdgesByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/edges{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Activates edge license on license portal.
 * @method
 * @name ThingsboardPeRestApi#activateInstanceUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.licenseSecret - licenseSecret
     * @param {string} parameters.releaseDate - releaseDate
 */
 ThingsboardPeRestApi.prototype.activateInstanceUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/license/activateInstance{?licenseSecret,releaseDate}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['licenseSecret'] !== undefined){
                    queryParameters['licenseSecret'] = parameters['licenseSecret'];
                }
        
        
        


        if(parameters['licenseSecret'] === undefined){
            deferred.reject(new Error('Missing required  parameter: licenseSecret'));
            return deferred.promise;
        }
 

                if(parameters['releaseDate'] !== undefined){
                    queryParameters['releaseDate'] = parameters['releaseDate'];
                }
        
        
        


        if(parameters['releaseDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: releaseDate'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks license request from edge service by forwarding request to license portal.
 * @method
 * @name ThingsboardPeRestApi#checkInstanceUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.checkInstanceUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/license/checkInstance';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested edge must be owned by tenant or customer that the user belongs to. Edge name is an unique property of edge. So it can be used to identify the edge.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantEdgeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeName - Unique name of the edge
 */
 ThingsboardPeRestApi.prototype.getTenantEdgeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/edges{?edgeName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['edgeName'] !== undefined){
                    queryParameters['edgeName'] = parameters['edgeName'];
                }
        
        
        


        if(parameters['edgeName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of edges owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantEdgesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - A string value representing the edge type. For example, 'default'
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantEdgesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of edges available for current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserEdgesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - A string value representing the edge type. For example, 'default'
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserEdgesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of edge events for the requested edge. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 
 * @method
 * @name ThingsboardPeRestApi#getEdgeEventsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the edge event type name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - Timestamp. Edge events with creation time before it won't be queried
     * @param {integer} parameters.endTime - Timestamp. Edge events with creation time after it won't be queried
 */
 ThingsboardPeRestApi.prototype.getEdgeEventsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/events{?endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the list of Entity Group Info objects based on the provided Entity Type and assigned to the provided Edge entity. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAllEdgeEntityGroupsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.groupType - EntityGroup type
 */
 ThingsboardPeRestApi.prototype.getAllEdgeEntityGroupsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/allEntityGroups/edge/{edgeId}/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates assignment of an existing entity group to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once entity group will be delivered to edge service, edge will request entities of this group to be send to edge. Once entities will be delivered to edge service, they are going to be available for usage on remote edge instance.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#assignEntityGroupToEdgeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.groupType - EntityGroup type
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.assignEntityGroupToEdgeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/entityGroup/{entityGroupId}/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Clears assignment of the entity group to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove entity group and entities inside this group locally.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#unassignEntityGroupFromEdgeUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.groupType - EntityGroup type
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.unassignEntityGroupFromEdgeUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/entityGroup/{entityGroupId}/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Entity Group. When creating Entity Group, platform generates Entity Group Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Entity Group Id will be present in the response. Specify existing Entity Group Id to update the group. Referencing non-existing Entity Group Id will cause 'Not Found' error.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#saveEntityGroupUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityGroupUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch reserved group 'All' based on the provided Owner Id and Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupAllByOwnerAndTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ownerType - Tenant or Customer
     * @param {string} parameters.ownerId - A string value representing the Tenant or Customer id
     * @param {string} parameters.groupType - Entity Group type
 */
 ThingsboardPeRestApi.prototype.getEntityGroupAllByOwnerAndTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/all/{ownerType}/{ownerId}/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ownerType}', parameters['ownerType']);
        
        


        if(parameters['ownerType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ownerId}', parameters['ownerId']);
        
        


        if(parameters['ownerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Entity Group object based on the provided Entity Group Id. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getEntityGroupByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the entity group but does not delete the entities in the group, since they are also present in reserved group 'All'. Referencing non-existing Entity Group Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#deleteEntityGroupUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteEntityGroupUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add entities to the specified entity group. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'ADD_TO_GROUP' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#addEntitiesToEntityGroupUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.addEntitiesToEntityGroupUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/addEntities';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Removes entities from the specified entity group. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'REMOVE_FROM_GROUP' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#removeEntitiesFromEntityGroupUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.removeEntitiesFromEntityGroupUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/deleteEntities';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Short Entity View objects that belongs to specified Entity Group Id. Short Entity View object contains the entity id and number of fields (attributes, telemetry, etc). List of those fields is configurable and defined in the group configuration.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntitiesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the entity group name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEntitiesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/entities{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Make the entity group not available for non authorized users. Every group is private by default. This call is useful to hide the group that was previously made public.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#makeEntityGroupPrivateUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.makeEntityGroupPrivateUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/makePrivate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Make the entity group available for non authorized users. Useful for public dashboards that will be embedded into the public websites. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#makeEntityGroupPublicUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.makeEntityGroupPublicUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/makePublic';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Share the entity group with certain user group based on the provided Share Group Request. The request is quite flexible and processing of the request involves multiple security checks using platform RBAC feature.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#shareEntityGroupUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.shareEntityGroupUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/share';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Short Entity View object based on the group and entity id. Short Entity View object contains the entity id and number of fields (attributes, telemetry, etc). List of those fields is configurable and defined in the group configuration.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getGroupEntityUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getGroupEntityUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/{entityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Share the entity group with specified user group using specified role. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#shareEntityGroupToChildOwnerUserGroupUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id that you would like to share. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.userGroupId - A string value representing the Entity(User) Group Id that you would like to share with. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.roleId - A string value representing the Role Id that describes set of permissions you would like to share (read, write, etc). For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.shareEntityGroupToChildOwnerUserGroupUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/{userGroupId}/{roleId}/share';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{userGroupId}', parameters['userGroupId']);
        
        


        if(parameters['userGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userGroupId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{roleId}', parameters['roleId']);
        
        


        if(parameters['roleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: roleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Entity Group object based on the provided Entity Group Id. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupByOwnerAndNameAndTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ownerType - Tenant or Customer
     * @param {string} parameters.ownerId - A string value representing the Tenant or Customer id
     * @param {string} parameters.groupType - Entity Group type
     * @param {string} parameters.groupName - Entity Group name
 */
 ThingsboardPeRestApi.prototype.getEntityGroupByOwnerAndNameAndTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{ownerType}/{ownerId}/{groupType}/{groupName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ownerType}', parameters['ownerType']);
        
        


        if(parameters['ownerType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ownerId}', parameters['ownerId']);
        
        


        if(parameters['ownerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupName}', parameters['groupName']);
        
        


        if(parameters['groupName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Entity Group Info objects based on the provided Entity Type and assigned to the provided Edge entity. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEdgeEntityGroupsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.groupType - EntityGroup type
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEdgeEntityGroupsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroups/edge/{edgeId}/{groupType}{?page,pageSize,sortOrder,sortProperty}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of groups that contain the specified Entity Id. For example, all device groups that contain specific device. The list always contain at least one element - special group 'All'.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupsForEntityUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - Entity Group type
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getEntityGroupsForEntityUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroups/{entityType}/{entityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the list of Entity Group Info objects based on the provided Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupsByTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupType - Entity Group type
 */
 ThingsboardPeRestApi.prototype.getEntityGroupsByTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroups/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the list of Entity Group Info objects based on the provided Owner Id and Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupsByOwnerAndTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ownerType - Tenant or Customer
     * @param {string} parameters.ownerId - A string value representing the Tenant or Customer id
     * @param {string} parameters.groupType - Entity Group type
 */
 ThingsboardPeRestApi.prototype.getEntityGroupsByOwnerAndTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroups/{ownerType}/{ownerId}/{groupType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ownerType}', parameters['ownerType']);
        
        


        if(parameters['ownerType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ownerId}', parameters['ownerId']);
        
        


        if(parameters['ownerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupType}', parameters['groupType']);
        
        


        if(parameters['groupType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested devices must be owned by tenant or assigned to customer which user is performing the request. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupIds - A list of group ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getEntityGroupsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroups{?entityGroupIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['entityGroupIds'] !== undefined){
                    queryParameters['entityGroupIds'] = parameters['entityGroupIds'];
                }
        
        
        


        if(parameters['entityGroupIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Provides a rage view of Customers that the current user has READ access to. If the current user is Tenant administrator, the result set also contains the tenant. The call is designed for the UI auto-complete component to show tenant and all possible Customers that the user may select to change the owner of the particular entity or entity group.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getOwnersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the entity group name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getOwnersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/owners{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * This method description defines how Alarm Data Query extends the Entity Data Query. See method 'Find Entity Data by Query' first to get the info about 'Entity Data Query'.

 The platform will first search the entities that match the entity and key filters. Then, the platform will use 'Alarm Page Link' to filter the alarms related to those entities. Finally, platform fetch the properties of alarm that are defined in the **'alarmFields'** and combine them with the other entity, attribute and latest time-series fields to return the result. 

 See example of the alarm query below. The query will search first 100 active alarms with type 'Temperature Alarm' or 'Fire Alarm' for any device with current temperature > 0. The query will return combination of the entity fields: name of the device, device model and latest temperature reading and alarms fields: createdTime, type, severity and status: 

```json
{
  "entityFilter": {
    "type": "entityType",
    "resolveMultiple": true,
    "entityType": "DEVICE"
  },
  "pageLink": {
    "page": 0,
    "pageSize": 100,
    "textSearch": null,
    "searchPropagatedAlarms": false,
    "statusList": [
      "ACTIVE"
    ],
    "severityList": [
      "CRITICAL",
      "MAJOR"
    ],
    "typeList": [
      "Temperature Alarm",
      "Fire Alarm"
    ],
    "sortOrder": {
      "key": {
        "key": "createdTime",
        "type": "ALARM_FIELD"
      },
      "direction": "DESC"
    },
    "timeWindow": 86400000
  },
  "keyFilters": [
    {
      "key": {
        "type": "TIME_SERIES",
        "key": "temperature"
      },
      "valueType": "NUMERIC",
      "predicate": {
        "operation": "GREATER",
        "value": {
          "defaultValue": 0,
          "dynamicValue": null
        },
        "type": "NUMERIC"
      }
    }
  ],
  "alarmFields": [
    {
      "type": "ALARM_FIELD",
      "key": "createdTime"
    },
    {
      "type": "ALARM_FIELD",
      "key": "type"
    },
    {
      "type": "ALARM_FIELD",
      "key": "severity"
    },
    {
      "type": "ALARM_FIELD",
      "key": "status"
    }
  ],
  "entityFields": [
    {
      "type": "ENTITY_FIELD",
      "key": "name"
    }
  ],
  "latestValues": [
    {
      "type": "ATTRIBUTE",
      "key": "model"
    },
    {
      "type": "TIME_SERIES",
      "key": "temperature"
    }
  ]
}
```
 * @method
 * @name ThingsboardPeRestApi#findAlarmDataByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findAlarmDataByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/alarmsQuery/find';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Allows to run complex queries to search the count of platform entities (devices, assets, customers, etc) based on the combination of main entity filter and multiple key filters. Returns the number of entities that match the query definition.

# Query Definition



Main **entity filter** is mandatory and defines generic search criteria. For example, "find all devices with profile 'Moisture Sensor'" or "Find all devices related to asset 'Building A'"

Optional **key filters** allow to filter results of the entity filter by complex criteria against main entity fields (name, label, type, etc), attributes and telemetry. For example, "temperature > 20 or temperature< 10" or "name starts with 'T', and attribute 'model' is 'T1000', and timeseries field 'batteryLevel' > 40".

Let's review the example:

```json
{
  "entityFilter": {
    "type": "entityType",
    "entityType": "DEVICE"
  },
  "keyFilters": [
    {
      "key": {
        "type": "ATTRIBUTE",
        "key": "active"
      },
      "valueType": "BOOLEAN",
      "predicate": {
        "operation": "EQUAL",
        "value": {
          "defaultValue": true,
          "dynamicValue": null
        },
        "type": "BOOLEAN"
      }
    }
  ]
}
```

 Example mentioned above search all devices which have attribute 'active' set to 'true'. Now let's review available entity filters and key filters syntax:

 # Entity Filters
Entity Filter body depends on the 'type' parameter. Let's review available entity filter types. In fact, they do correspond to available dashboard aliases.

## Single Entity

Allows to filter only one entity based on the id. For example, this entity filter selects certain device:

```json
{
  "type": "singleEntity",
  "singleEntity": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "DEVICE"
  }
}
```

## Group Entities Filter

Allows to filter multiple entities of the same type using the entity group type and id. For example, this entity filter selects all devices that belong to the group 'e52b0020-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "entityGroup",
  "groupType": "DEVICE",
  "entityGroup": "e52b0020-2a7a-11ec-94eb-213c95f54092"
}
```

## Entity List Filter

Allows to filter entities of the same type using their ids. For example, this entity filter selects two devices:

```json
{
  "type": "entityList",
  "entityType": "DEVICE",
  "entityList": [
    "e6501f30-2a7a-11ec-94eb-213c95f54092",
    "e6657bf0-2a7a-11ec-94eb-213c95f54092"
  ]
}
```

## Entity Name Filter

Allows to filter entities of the same type using the **'starts with'** expression over entity name. For example, this entity filter selects all devices which name starts with 'Air Quality':

```json
{
  "type": "entityName",
  "entityType": "DEVICE",
  "entityNameFilter": "Air Quality"
}
```

## Entity Type Filter

Allows to filter entities based on their type (CUSTOMER, USER, DASHBOARD, ASSET, DEVICE, etc)For example, this entity filter selects all tenant customers:

```json
{
  "type": "entityType",
  "entityType": "CUSTOMER"
}
```

## Group List Filter

Return multiple groups of the same type using specified ids. For example, this entity filter selects 2 device groups (if they are present in the system) with ids 'e52b0020-2a7a-11ec-94eb-213c95f54092' and 'e52b0020-2a7a-11ec-94eb-213c95f54093':

```json
{
  "type": "entityGroupList",
  "groupType": "DEVICE",
  "entityGroupList": ["e52b0020-2a7a-11ec-94eb-213c95f54092", "e52b0020-2a7a-11ec-94eb-213c95f54093"]
}
```

## Group Name Filter

Allows to filter entity groups based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all devices which name starts with 'CAT':

```json
{
  "type": "entityGroupName",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "CAT"
}
```

## Entities by Group Name Filter

Allows to filter entities that belong to group based on the entity type and the group name. Optional parameter 'ownerId' allows you to specify the owner of the group (Tenant or Customer, current user owner by default).For example, this entity filter selects all devices which belong to group 'Water Meters':

```json
{
  "type": "entitiesByGroupName",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "Water Meters"
}
```

 Other example, this entity filter selects all devices which belong to group 'Water Meters' which in turn belongs to (sub-)Customer with id 'e52b0020-2a7a-11ec-94eb-213c95f54093': 

```json
{
  "type": "entitiesByGroupName",
  "ownerId": "e52b0020-2a7a-11ec-94eb-213c95f54093",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "Water Meters"
}
```

## Entity owner Filter

Allows to fetch owner (Tenant or Customer) of the specified entity. For example, this entity filter selects owner of the device with id 'e52b0020-2a7a-11ec-94eb-213c95f54093':

```json
{
  "type": "stateEntityOwner",
  "singleEntity": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "DEVICE"
  }
}
```

## Asset Type Filter

Allows to filter assets based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'charging station' assets which name starts with 'Tesla':

```json
{
  "type": "assetType",
  "assetType": "charging station",
  "assetNameFilter": "Tesla"
}
```

## Device Type Filter

Allows to filter devices based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Temperature Sensor' devices which name starts with 'ABC':

```json
{
  "type": "deviceType",
  "deviceType": "Temperature Sensor",
  "deviceNameFilter": "ABC"
}
```

## Edge Type Filter

Allows to filter edge instances based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Factory' edge instances which name starts with 'Nevada':

```json
{
  "type": "edgeType",
  "edgeType": "Factory",
  "edgeNameFilter": "Nevada"
}
```

## Entity View Filter

Allows to filter entity views based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Concrete Mixer' entity views which name starts with 'CAT':

```json
{
  "type": "entityViewType",
  "entityViewType": "Concrete Mixer",
  "entityViewNameFilter": "CAT"
}
```

## Api Usage Filter

Allows to query for Api Usage based on optional customer id. If the customer id is not set, returns current tenant API usage.For example, this entity filter selects the 'Api Usage' entity for customer with id 'e6501f30-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "apiUsageState",
  "customerId": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "CUSTOMER"
  }
}
```

## Relations Query Filter

Allows to filter entities that are related to the provided root entity. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'filter' object allows you to define the relation type and set of acceptable entity types to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only those who match the 'filters'.

For example, this entity filter selects all devices and assets which are related to the asset with id 'e51de0c0-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "relationsQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e51de0c0-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "filters": [
    {
      "relationType": "Contains",
      "entityTypes": [
        "DEVICE",
        "ASSET"
      ]
    }
  ]
}
```

## Asset Search Query

Allows to filter assets that are related to the provided root entity. Filters related assets based on the relation type and set of asset types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'assetTypes' defines the type of the asset to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only assets that match 'relationType' and 'assetTypes' conditions.

For example, this entity filter selects 'charging station' assets which are related to the asset with id 'e51de0c0-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "assetSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e51de0c0-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "relationType": "Contains",
  "assetTypes": [
    "charging station"
  ]
}
```

## Device Search Query

Allows to filter devices that are related to the provided root entity. Filters related devices based on the relation type and set of device types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'deviceTypes' defines the type of the device to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Charging port' and 'Air Quality Sensor' devices which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "deviceSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 2,
  "fetchLastLevelOnly": true,
  "relationType": "Contains",
  "deviceTypes": [
    "Air Quality Sensor",
    "Charging port"
  ]
}
```

## Entity View Query

Allows to filter entity views that are related to the provided root entity. Filters related entity views based on the relation type and set of entity view types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'entityViewTypes' defines the type of the entity view to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Concrete mixer' entity views which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "entityViewSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "relationType": "Contains",
  "entityViewTypes": [
    "Concrete mixer"
  ]
}
```

## Edge Search Query

Allows to filter edge instances that are related to the provided root entity. Filters related edge instances based on the relation type and set of edge types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'deviceTypes' defines the type of the device to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Factory' edge instances which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "deviceSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 2,
  "fetchLastLevelOnly": true,
  "relationType": "Contains",
  "edgeTypes": [
    "Factory"
  ]
}
```

 # Key Filters
Key Filter allows you to define complex logical expressions over entity field, attribute or latest time-series value. The filter is defined using 'key', 'valueType' and 'predicate' objects. Single Entity Query may have zero, one or multiple predicates. If multiple filters are defined, they are evaluated using logical 'AND'. The example below checks that temperature of the entity is above 20 degrees:

```json
{
  "key": {
    "type": "TIME_SERIES",
    "key": "temperature"
  },
  "valueType": "NUMERIC",
  "predicate": {
    "operation": "GREATER",
    "value": {
      "defaultValue": 20,
      "dynamicValue": null
    },
    "type": "NUMERIC"
  }
}
```

 Now let's review 'key', 'valueType' and 'predicate' objects in detail.

## Filter Key

Filter Key defines either entity field, attribute or telemetry. It is a JSON object that consists the key name and type. The following filter key types are supported: 

 * 'CLIENT_ATTRIBUTE' - used for client attributes; 
 * 'SHARED_ATTRIBUTE' - used for shared attributes; 
 * 'SERVER_ATTRIBUTE' - used for server attributes; 
 * 'ATTRIBUTE' - used for any of the above; 
 * 'TIME_SERIES' - used for time-series values; 
 * 'ENTITY_FIELD' - used for accessing entity fields like 'name', 'label', etc. The list of available fields depends on the entity type; 
 * 'ALARM_FIELD' - similar to entity field, but is used in alarm queries only; 


 Let's review the example:

```json
{
  "type": "TIME_SERIES",
  "key": "temperature"
}
```

## Value Type and Operations

Provides a hint about the data type of the entity field that is defined in the filter key. The value type impacts the list of possible operations that you may use in the corresponding predicate. For example, you may use 'STARTS_WITH' or 'END_WITH', but you can't use 'GREATER_OR_EQUAL' for string values.The following filter value types and corresponding predicate operations are supported: 

 * 'STRING' - used to filter any 'String' or 'JSON' values. Operations: EQUAL, NOT_EQUAL, STARTS_WITH, ENDS_WITH, CONTAINS, NOT_CONTAINS; 
 * 'NUMERIC' - used for 'Long' and 'Double' values. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 
 * 'BOOLEAN' - used for boolean values. Operations: EQUAL, NOT_EQUAL;
 * 'DATE_TIME' - similar to numeric, transforms value to milliseconds since epoch. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 


## Filter Predicate

Filter Predicate defines the logical expression to evaluate. The list of available operations depends on the filter value type, see above. Platform supports 4 predicate types: 'STRING', 'NUMERIC', 'BOOLEAN' and 'COMPLEX'. The last one allows to combine multiple operations over one filter key.

Simple predicate example to check 'value < 100': 

```json
{
  "operation": "LESS",
  "value": {
    "defaultValue": 100,
    "dynamicValue": null
  },
  "type": "NUMERIC"
}
```

Complex predicate example, to check 'value < 10 or value > 20': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "operation": "GREATER",
      "value": {
        "defaultValue": 20,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    }
  ]
}
```

More complex predicate example, to check 'value < 10 or (value > 50 && value < 60)': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "type": "COMPLEX",
      "operation": "AND",
      "predicates": [
        {
          "operation": "GREATER",
          "value": {
            "defaultValue": 50,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        },
        {
          "operation": "LESS",
          "value": {
            "defaultValue": 60,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        }
      ]
    }
  ]
}
```

 You may also want to replace hardcoded values (for example, temperature > 20) with the more dynamic expression (for example, temperature > 'value of the tenant attribute with key 'temperatureThreshold'). It is possible to use 'dynamicValue' to define attribute of the tenant, customer or user that is performing the API call. See example below: 

```json
{
  "operation": "GREATER",
  "value": {
    "defaultValue": 0,
    "dynamicValue": {
      "sourceType": "CURRENT_USER",
      "sourceAttribute": "temperatureThreshold"
    }
  },
  "type": "NUMERIC"
}
```

 Note that you may use 'CURRENT_USER', 'CURRENT_CUSTOMER' and 'CURRENT_TENANT' as a 'sourceType'. The 'defaultValue' is used when the attribute with such a name is not defined for the chosen source.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#countEntitiesByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.countEntitiesByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entitiesQuery/count';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Allows to run complex queries over platform entities (devices, assets, customers, etc) based on the combination of main entity filter and multiple key filters. Returns the paginated result of the query that contains requested entity fields and latest values of requested attributes and time-series data.

# Query Definition



Main **entity filter** is mandatory and defines generic search criteria. For example, "find all devices with profile 'Moisture Sensor'" or "Find all devices related to asset 'Building A'"

Optional **key filters** allow to filter results of the **entity filter** by complex criteria against main entity fields (name, label, type, etc), attributes and telemetry. For example, "temperature > 20 or temperature< 10" or "name starts with 'T', and attribute 'model' is 'T1000', and timeseries field 'batteryLevel' > 40".

The **entity fields** and **latest values** contains list of entity fields and latest attribute/telemetry fields to fetch for each entity.

The **page link** contains information about the page to fetch and the sort ordering.

Let's review the example:

```json
{
  "entityFilter": {
    "type": "entityType",
    "resolveMultiple": true,
    "entityType": "DEVICE"
  },
  "keyFilters": [
    {
      "key": {
        "type": "TIME_SERIES",
        "key": "temperature"
      },
      "valueType": "NUMERIC",
      "predicate": {
        "operation": "GREATER",
        "value": {
          "defaultValue": 0,
          "dynamicValue": {
            "sourceType": "CURRENT_USER",
            "sourceAttribute": "temperatureThreshold",
            "inherit": false
          }
        },
        "type": "NUMERIC"
      }
    }
  ],
  "entityFields": [
    {
      "type": "ENTITY_FIELD",
      "key": "name"
    },
    {
      "type": "ENTITY_FIELD",
      "key": "label"
    },
    {
      "type": "ENTITY_FIELD",
      "key": "additionalInfo"
    }
  ],
  "latestValues": [
    {
      "type": "ATTRIBUTE",
      "key": "model"
    },
    {
      "type": "TIME_SERIES",
      "key": "temperature"
    }
  ],
  "pageLink": {
    "page": 0,
    "pageSize": 10,
    "sortOrder": {
      "key": {
        "key": "name",
        "type": "ENTITY_FIELD"
      },
      "direction": "ASC"
    }
  }
}
```

 Example mentioned above search all devices which have attribute 'active' set to 'true'. Now let's review available entity filters and key filters syntax:

 # Entity Filters
Entity Filter body depends on the 'type' parameter. Let's review available entity filter types. In fact, they do correspond to available dashboard aliases.

## Single Entity

Allows to filter only one entity based on the id. For example, this entity filter selects certain device:

```json
{
  "type": "singleEntity",
  "singleEntity": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "DEVICE"
  }
}
```

## Group Entities Filter

Allows to filter multiple entities of the same type using the entity group type and id. For example, this entity filter selects all devices that belong to the group 'e52b0020-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "entityGroup",
  "groupType": "DEVICE",
  "entityGroup": "e52b0020-2a7a-11ec-94eb-213c95f54092"
}
```

## Entity List Filter

Allows to filter entities of the same type using their ids. For example, this entity filter selects two devices:

```json
{
  "type": "entityList",
  "entityType": "DEVICE",
  "entityList": [
    "e6501f30-2a7a-11ec-94eb-213c95f54092",
    "e6657bf0-2a7a-11ec-94eb-213c95f54092"
  ]
}
```

## Entity Name Filter

Allows to filter entities of the same type using the **'starts with'** expression over entity name. For example, this entity filter selects all devices which name starts with 'Air Quality':

```json
{
  "type": "entityName",
  "entityType": "DEVICE",
  "entityNameFilter": "Air Quality"
}
```

## Entity Type Filter

Allows to filter entities based on their type (CUSTOMER, USER, DASHBOARD, ASSET, DEVICE, etc)For example, this entity filter selects all tenant customers:

```json
{
  "type": "entityType",
  "entityType": "CUSTOMER"
}
```

## Group List Filter

Return multiple groups of the same type using specified ids. For example, this entity filter selects 2 device groups (if they are present in the system) with ids 'e52b0020-2a7a-11ec-94eb-213c95f54092' and 'e52b0020-2a7a-11ec-94eb-213c95f54093':

```json
{
  "type": "entityGroupList",
  "groupType": "DEVICE",
  "entityGroupList": ["e52b0020-2a7a-11ec-94eb-213c95f54092", "e52b0020-2a7a-11ec-94eb-213c95f54093"]
}
```

## Group Name Filter

Allows to filter entity groups based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all devices which name starts with 'CAT':

```json
{
  "type": "entityGroupName",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "CAT"
}
```

## Entities by Group Name Filter

Allows to filter entities that belong to group based on the entity type and the group name. Optional parameter 'ownerId' allows you to specify the owner of the group (Tenant or Customer, current user owner by default).For example, this entity filter selects all devices which belong to group 'Water Meters':

```json
{
  "type": "entitiesByGroupName",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "Water Meters"
}
```

 Other example, this entity filter selects all devices which belong to group 'Water Meters' which in turn belongs to (sub-)Customer with id 'e52b0020-2a7a-11ec-94eb-213c95f54093': 

```json
{
  "type": "entitiesByGroupName",
  "ownerId": "e52b0020-2a7a-11ec-94eb-213c95f54093",
  "groupType": "DEVICE",
  "entityGroupNameFilter": "Water Meters"
}
```

## Entity owner Filter

Allows to fetch owner (Tenant or Customer) of the specified entity. For example, this entity filter selects owner of the device with id 'e52b0020-2a7a-11ec-94eb-213c95f54093':

```json
{
  "type": "stateEntityOwner",
  "singleEntity": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "DEVICE"
  }
}
```

## Asset Type Filter

Allows to filter assets based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'charging station' assets which name starts with 'Tesla':

```json
{
  "type": "assetType",
  "assetType": "charging station",
  "assetNameFilter": "Tesla"
}
```

## Device Type Filter

Allows to filter devices based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Temperature Sensor' devices which name starts with 'ABC':

```json
{
  "type": "deviceType",
  "deviceType": "Temperature Sensor",
  "deviceNameFilter": "ABC"
}
```

## Edge Type Filter

Allows to filter edge instances based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Factory' edge instances which name starts with 'Nevada':

```json
{
  "type": "edgeType",
  "edgeType": "Factory",
  "edgeNameFilter": "Nevada"
}
```

## Entity View Filter

Allows to filter entity views based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Concrete Mixer' entity views which name starts with 'CAT':

```json
{
  "type": "entityViewType",
  "entityViewType": "Concrete Mixer",
  "entityViewNameFilter": "CAT"
}
```

## Api Usage Filter

Allows to query for Api Usage based on optional customer id. If the customer id is not set, returns current tenant API usage.For example, this entity filter selects the 'Api Usage' entity for customer with id 'e6501f30-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "apiUsageState",
  "customerId": {
    "id": "d521edb0-2a7a-11ec-94eb-213c95f54092",
    "entityType": "CUSTOMER"
  }
}
```

## Relations Query Filter

Allows to filter entities that are related to the provided root entity. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'filter' object allows you to define the relation type and set of acceptable entity types to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only those who match the 'filters'.

For example, this entity filter selects all devices and assets which are related to the asset with id 'e51de0c0-2a7a-11ec-94eb-213c95f54092':

```json
{
  "type": "relationsQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e51de0c0-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "filters": [
    {
      "relationType": "Contains",
      "entityTypes": [
        "DEVICE",
        "ASSET"
      ]
    }
  ]
}
```

## Asset Search Query

Allows to filter assets that are related to the provided root entity. Filters related assets based on the relation type and set of asset types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'assetTypes' defines the type of the asset to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only assets that match 'relationType' and 'assetTypes' conditions.

For example, this entity filter selects 'charging station' assets which are related to the asset with id 'e51de0c0-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "assetSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e51de0c0-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "relationType": "Contains",
  "assetTypes": [
    "charging station"
  ]
}
```

## Device Search Query

Allows to filter devices that are related to the provided root entity. Filters related devices based on the relation type and set of device types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'deviceTypes' defines the type of the device to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Charging port' and 'Air Quality Sensor' devices which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "deviceSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 2,
  "fetchLastLevelOnly": true,
  "relationType": "Contains",
  "deviceTypes": [
    "Air Quality Sensor",
    "Charging port"
  ]
}
```

## Entity View Query

Allows to filter entity views that are related to the provided root entity. Filters related entity views based on the relation type and set of entity view types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'entityViewTypes' defines the type of the entity view to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Concrete mixer' entity views which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "entityViewSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 1,
  "fetchLastLevelOnly": false,
  "relationType": "Contains",
  "entityViewTypes": [
    "Concrete mixer"
  ]
}
```

## Edge Search Query

Allows to filter edge instances that are related to the provided root entity. Filters related edge instances based on the relation type and set of edge types. Possible direction values are 'TO' and 'FROM'. The 'maxLevel' defines how many relation levels should the query search 'recursively'. Assuming the 'maxLevel' is > 1, the 'fetchLastLevelOnly' defines either to return all related entities or only entities that are on the last level of relations. The 'relationType' defines the type of the relation to search for. The 'deviceTypes' defines the type of the device to search for. The relation query calculates all related entities, even if they are filtered using different relation types, and then extracts only devices that match 'relationType' and 'deviceTypes' conditions.

For example, this entity filter selects 'Factory' edge instances which are related to the asset with id 'e52b0020-2a7a-11ec-94eb-213c95f54092' using 'Contains' relation:

```json
{
  "type": "deviceSearchQuery",
  "rootEntity": {
    "entityType": "ASSET",
    "id": "e52b0020-2a7a-11ec-94eb-213c95f54092"
  },
  "direction": "FROM",
  "maxLevel": 2,
  "fetchLastLevelOnly": true,
  "relationType": "Contains",
  "edgeTypes": [
    "Factory"
  ]
}
```

 # Key Filters
Key Filter allows you to define complex logical expressions over entity field, attribute or latest time-series value. The filter is defined using 'key', 'valueType' and 'predicate' objects. Single Entity Query may have zero, one or multiple predicates. If multiple filters are defined, they are evaluated using logical 'AND'. The example below checks that temperature of the entity is above 20 degrees:

```json
{
  "key": {
    "type": "TIME_SERIES",
    "key": "temperature"
  },
  "valueType": "NUMERIC",
  "predicate": {
    "operation": "GREATER",
    "value": {
      "defaultValue": 20,
      "dynamicValue": null
    },
    "type": "NUMERIC"
  }
}
```

 Now let's review 'key', 'valueType' and 'predicate' objects in detail.

## Filter Key

Filter Key defines either entity field, attribute or telemetry. It is a JSON object that consists the key name and type. The following filter key types are supported: 

 * 'CLIENT_ATTRIBUTE' - used for client attributes; 
 * 'SHARED_ATTRIBUTE' - used for shared attributes; 
 * 'SERVER_ATTRIBUTE' - used for server attributes; 
 * 'ATTRIBUTE' - used for any of the above; 
 * 'TIME_SERIES' - used for time-series values; 
 * 'ENTITY_FIELD' - used for accessing entity fields like 'name', 'label', etc. The list of available fields depends on the entity type; 
 * 'ALARM_FIELD' - similar to entity field, but is used in alarm queries only; 


 Let's review the example:

```json
{
  "type": "TIME_SERIES",
  "key": "temperature"
}
```

## Value Type and Operations

Provides a hint about the data type of the entity field that is defined in the filter key. The value type impacts the list of possible operations that you may use in the corresponding predicate. For example, you may use 'STARTS_WITH' or 'END_WITH', but you can't use 'GREATER_OR_EQUAL' for string values.The following filter value types and corresponding predicate operations are supported: 

 * 'STRING' - used to filter any 'String' or 'JSON' values. Operations: EQUAL, NOT_EQUAL, STARTS_WITH, ENDS_WITH, CONTAINS, NOT_CONTAINS; 
 * 'NUMERIC' - used for 'Long' and 'Double' values. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 
 * 'BOOLEAN' - used for boolean values. Operations: EQUAL, NOT_EQUAL;
 * 'DATE_TIME' - similar to numeric, transforms value to milliseconds since epoch. Operations: EQUAL, NOT_EQUAL, GREATER, LESS, GREATER_OR_EQUAL, LESS_OR_EQUAL; 


## Filter Predicate

Filter Predicate defines the logical expression to evaluate. The list of available operations depends on the filter value type, see above. Platform supports 4 predicate types: 'STRING', 'NUMERIC', 'BOOLEAN' and 'COMPLEX'. The last one allows to combine multiple operations over one filter key.

Simple predicate example to check 'value < 100': 

```json
{
  "operation": "LESS",
  "value": {
    "defaultValue": 100,
    "dynamicValue": null
  },
  "type": "NUMERIC"
}
```

Complex predicate example, to check 'value < 10 or value > 20': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "operation": "GREATER",
      "value": {
        "defaultValue": 20,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    }
  ]
}
```

More complex predicate example, to check 'value < 10 or (value > 50 && value < 60)': 

```json
{
  "type": "COMPLEX",
  "operation": "OR",
  "predicates": [
    {
      "operation": "LESS",
      "value": {
        "defaultValue": 10,
        "dynamicValue": null
      },
      "type": "NUMERIC"
    },
    {
      "type": "COMPLEX",
      "operation": "AND",
      "predicates": [
        {
          "operation": "GREATER",
          "value": {
            "defaultValue": 50,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        },
        {
          "operation": "LESS",
          "value": {
            "defaultValue": 60,
            "dynamicValue": null
          },
          "type": "NUMERIC"
        }
      ]
    }
  ]
}
```

 You may also want to replace hardcoded values (for example, temperature > 20) with the more dynamic expression (for example, temperature > 'value of the tenant attribute with key 'temperatureThreshold'). It is possible to use 'dynamicValue' to define attribute of the tenant, customer or user that is performing the API call. See example below: 

```json
{
  "operation": "GREATER",
  "value": {
    "defaultValue": 0,
    "dynamicValue": {
      "sourceType": "CURRENT_USER",
      "sourceAttribute": "temperatureThreshold"
    }
  },
  "type": "NUMERIC"
}
```

 Note that you may use 'CURRENT_USER', 'CURRENT_CUSTOMER' and 'CURRENT_TENANT' as a 'sourceType'. The 'defaultValue' is used when the attribute with such a name is not defined for the chosen source.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#findEntityDataByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findEntityDataByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entitiesQuery/find';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Uses entity data query (see 'Find Entity Data by Query') to find first 100 entities. Then fetch and return all unique time-series and/or attribute keys. Used mostly for UI hints.
 * @method
 * @name ThingsboardPeRestApi#findEntityTimeseriesAndAttributesKeysByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.timeseries - Include all unique time-series keys to the result.
     * @param {boolean} parameters.attributes - Include all unique attribute keys to the result.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entitiesQuery/find/keys{?attributes,timeseries}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['timeseries'] !== undefined){
                    queryParameters['timeseries'] = parameters['timeseries'];
                }
        
        
        


        if(parameters['timeseries'] === undefined){
            deferred.reject(new Error('Missing required  parameter: timeseries'));
            return deferred.promise;
        }
 

                if(parameters['attributes'] !== undefined){
                    queryParameters['attributes'] = parameters['attributes'];
                }
        
        
        


        if(parameters['attributes'] === undefined){
            deferred.reject(new Error('Missing required  parameter: attributes'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates a relation between two entities in the platform. Relations unique key is a combination of from/to entity id and relation type group and relation type. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#saveRelationUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveRelationUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relation';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all entities that are related to the specific entity. The entity id, relation type, entity types, depth of the search, and other query parameters defined using complex 'EntityRelationsQuery' object. See 'Model' tab of the Parameters for more info.
 * @method
 * @name ThingsboardPeRestApi#findByQueryUsingPOST_3
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findByQueryUsingPOST_3 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all entity infos that are related to the specific entity. The entity id, relation type, entity types, depth of the search, and other query parameters defined using complex 'EntityRelationsQuery' object. See 'Model' tab of the Parameters for more info. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 
 * @method
 * @name ThingsboardPeRestApi#findInfoByQueryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findInfoByQueryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation info objects for the specified entity by the 'from' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 
 * @method
 * @name ThingsboardPeRestApi#findInfoByFromUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fromId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.fromType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findInfoByFromUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations/info{?fromId,fromType,relationTypeGroup}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['fromId'] !== undefined){
                    queryParameters['fromId'] = parameters['fromId'];
                }
        
        
        


        if(parameters['fromId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromId'));
            return deferred.promise;
        }
 

                if(parameters['fromType'] !== undefined){
                    queryParameters['fromType'] = parameters['fromType'];
                }
        
        
        


        if(parameters['fromType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation info objects for the specified entity by the 'to' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 
 * @method
 * @name ThingsboardPeRestApi#findInfoByToUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.toId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.toType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findInfoByToUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations/info{?relationTypeGroup,toId,toType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['toId'] !== undefined){
                    queryParameters['toId'] = parameters['toId'];
                }
        
        
        


        if(parameters['toId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toId'));
            return deferred.promise;
        }
 

                if(parameters['toType'] !== undefined){
                    queryParameters['toType'] = parameters['toType'];
                }
        
        
        


        if(parameters['toType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes all the relation (both 'from' and 'to' direction) for the specified entity. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#deleteRelationsUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
 */
 ThingsboardPeRestApi.prototype.deleteRelationsUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations{?entityId,entityType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['entityId'] !== undefined){
                    queryParameters['entityId'] = parameters['entityId'];
                }
        
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['entityType'] !== undefined){
                    queryParameters['entityType'] = parameters['entityType'];
                }
        
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation objects for the specified entity by the 'from' direction and relation type. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#findByFromUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fromId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.fromType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationType - A string value representing relation type between entities. For example, 'Contains', 'Manages'. It can be any string value.
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findByFromUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations{?fromId,fromType,relationType,relationTypeGroup}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['fromId'] !== undefined){
                    queryParameters['fromId'] = parameters['fromId'];
                }
        
        
        


        if(parameters['fromId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromId'));
            return deferred.promise;
        }
 

                if(parameters['fromType'] !== undefined){
                    queryParameters['fromType'] = parameters['fromType'];
                }
        
        
        


        if(parameters['fromType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromType'));
            return deferred.promise;
        }
 

                if(parameters['relationType'] !== undefined){
                    queryParameters['relationType'] = parameters['relationType'];
                }
        
        
        


        if(parameters['relationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: relationType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation objects for the specified entity by the 'from' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#findByFromUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fromId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.fromType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findByFromUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations{?fromId,fromType,relationTypeGroup}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['fromId'] !== undefined){
                    queryParameters['fromId'] = parameters['fromId'];
                }
        
        
        


        if(parameters['fromId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromId'));
            return deferred.promise;
        }
 

                if(parameters['fromType'] !== undefined){
                    queryParameters['fromType'] = parameters['fromType'];
                }
        
        
        


        if(parameters['fromType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation objects for the specified entity by the 'to' direction and relation type. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#findByToUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.toId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.toType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationType - A string value representing relation type between entities. For example, 'Contains', 'Manages'. It can be any string value.
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findByToUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations{?relationType,relationTypeGroup,toId,toType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['toId'] !== undefined){
                    queryParameters['toId'] = parameters['toId'];
                }
        
        
        


        if(parameters['toId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toId'));
            return deferred.promise;
        }
 

                if(parameters['toType'] !== undefined){
                    queryParameters['toType'] = parameters['toType'];
                }
        
        
        


        if(parameters['toType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toType'));
            return deferred.promise;
        }
 

                if(parameters['relationType'] !== undefined){
                    queryParameters['relationType'] = parameters['relationType'];
                }
        
        
        


        if(parameters['relationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: relationType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns list of relation objects for the specified entity by the 'to' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#findByToUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.toId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.toType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
 */
 ThingsboardPeRestApi.prototype.findByToUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relations{?relationTypeGroup,toId,toType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['toId'] !== undefined){
                    queryParameters['toId'] = parameters['toId'];
                }
        
        
        


        if(parameters['toId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toId'));
            return deferred.promise;
        }
 

                if(parameters['toType'] !== undefined){
                    queryParameters['toType'] = parameters['toType'];
                }
        
        
        


        if(parameters['toType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns relation object between two specified entities if present. Otherwise throws exception. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#getRelationUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fromId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.fromType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationType - A string value representing relation type between entities. For example, 'Contains', 'Manages'. It can be any string value.
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
     * @param {string} parameters.toId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.toType - A string value representing the entity type. For example, 'DEVICE'
 */
 ThingsboardPeRestApi.prototype.getRelationUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relation{?fromId,fromType,relationType,relationTypeGroup,toId,toType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['fromId'] !== undefined){
                    queryParameters['fromId'] = parameters['fromId'];
                }
        
        
        


        if(parameters['fromId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromId'));
            return deferred.promise;
        }
 

                if(parameters['fromType'] !== undefined){
                    queryParameters['fromType'] = parameters['fromType'];
                }
        
        
        


        if(parameters['fromType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromType'));
            return deferred.promise;
        }
 

                if(parameters['relationType'] !== undefined){
                    queryParameters['relationType'] = parameters['relationType'];
                }
        
        
        


        if(parameters['relationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: relationType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 

                if(parameters['toId'] !== undefined){
                    queryParameters['toId'] = parameters['toId'];
                }
        
        
        


        if(parameters['toId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toId'));
            return deferred.promise;
        }
 

                if(parameters['toType'] !== undefined){
                    queryParameters['toType'] = parameters['toType'];
                }
        
        
        


        if(parameters['toType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes a relation between two entities in the platform. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.
 * @method
 * @name ThingsboardPeRestApi#deleteRelationUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fromId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.fromType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.relationType - A string value representing relation type between entities. For example, 'Contains', 'Manages'. It can be any string value.
     * @param {string} parameters.relationTypeGroup - A string value representing relation type group. For example, 'COMMON'
     * @param {string} parameters.toId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.toType - A string value representing the entity type. For example, 'DEVICE'
 */
 ThingsboardPeRestApi.prototype.deleteRelationUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/relation{?fromId,fromType,relationType,relationTypeGroup,toId,toType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['fromId'] !== undefined){
                    queryParameters['fromId'] = parameters['fromId'];
                }
        
        
        


        if(parameters['fromId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromId'));
            return deferred.promise;
        }
 

                if(parameters['fromType'] !== undefined){
                    queryParameters['fromType'] = parameters['fromType'];
                }
        
        
        


        if(parameters['fromType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fromType'));
            return deferred.promise;
        }
 

                if(parameters['relationType'] !== undefined){
                    queryParameters['relationType'] = parameters['relationType'];
                }
        
        
        


        if(parameters['relationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: relationType'));
            return deferred.promise;
        }
 

                if(parameters['relationTypeGroup'] !== undefined){
                    queryParameters['relationTypeGroup'] = parameters['relationTypeGroup'];
                }
        
        
        


 

                if(parameters['toId'] !== undefined){
                    queryParameters['toId'] = parameters['toId'];
                }
        
        
        


        if(parameters['toId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toId'));
            return deferred.promise;
        }
 

                if(parameters['toType'] !== undefined){
                    queryParameters['toType'] = parameters['toType'];
                }
        
        
        


        if(parameters['toType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: toType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Entity View objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getCustomerEntityViewsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - 

## Entity View Filter

Allows to filter entity views based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Concrete Mixer' entity views which name starts with 'CAT':

```json
{
  "type": "entityViewType",
  "entityViewType": "Concrete Mixer",
  "entityViewNameFilter": "CAT"
}
```
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the entity view name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomerEntityViewsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Entity View objects that belongs to specified Entity View Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getEntityViewsByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the entity view name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEntityViewsByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique entity view types based on entity views that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getEntityViewTypesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getEntityViewTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityView/types';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the EntityView object based on the provided entity view id. Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. See the 'Model' tab for more details.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getEntityViewByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityViewId - A string value representing the entity view id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getEntityViewByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityView/{entityViewId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityViewId}', parameters['entityViewId']);
        
        


        if(parameters['entityViewId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityViewId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete the EntityView object based on the provided entity view id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteEntityViewUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityViewId - A string value representing the entity view id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteEntityViewUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityView/{entityViewId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityViewId}', parameters['entityViewId']);
        
        


        if(parameters['entityViewId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityViewId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all entity views that are related to the specific entity. The entity id, relation type, entity view types, depth of the search, and other query parameters defined using complex 'EntityViewSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#findByQueryUsingPOST_4
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.findByQueryUsingPOST_4 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityViews';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested entity views must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEntityViewsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityViewIds - A list of entity view ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getEntityViewsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityViews{?entityViewIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['entityViewIds'] !== undefined){
                    queryParameters['entityViewIds'] = parameters['entityViewIds'];
                }
        
        
        


        if(parameters['entityViewIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityViewIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. See the 'Model' tab for more details.
 * @method
 * @name ThingsboardPeRestApi#saveEntityViewUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityViewUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityView{?entityGroupId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Entity View object based on the tenant id and entity view name. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantEntityViewUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityViewName - Entity View name
 */
 ThingsboardPeRestApi.prototype.getTenantEntityViewUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/entityViews{?entityViewName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['entityViewName'] !== undefined){
                    queryParameters['entityViewName'] = parameters['entityViewName'];
                }
        
        
        


        if(parameters['entityViewName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityViewName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of entity views owned by tenant. Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantEntityViewsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - 

## Entity View Filter

Allows to filter entity views based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Concrete Mixer' entity views which name starts with 'CAT':

```json
{
  "type": "entityViewType",
  "entityViewType": "Concrete Mixer",
  "entityViewNameFilter": "CAT"
}
```
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the entity view name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantEntityViewsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of entity views that are available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserEntityViewsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - 

## Entity View Filter

Allows to filter entity views based on their type and the **'starts with'** expression over their name. For example, this entity filter selects all 'Concrete Mixer' entity views which name starts with 'CAT':

```json
{
  "type": "entityViewType",
  "entityViewType": "Concrete Mixer",
  "entityViewNameFilter": "CAT"
}
```
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the entity view name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserEntityViewsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Clears events by filter for specified entity.
 * @method
 * @name ThingsboardPeRestApi#clearEventsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.startTime - Timestamp. Events with creation time before it won't be queried.
     * @param {integer} parameters.endTime - Timestamp. Events with creation time after it won't be queried.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.clearEventsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/events/{entityType}/{entityId}/clear{?endTime,startTime}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of events for specified entity by specifying event type. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 
 * @method
 * @name ThingsboardPeRestApi#getEventsUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.eventType - A string value representing event type
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The value is not used in searching.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - Timestamp. Events with creation time before it won't be queried.
     * @param {integer} parameters.endTime - Timestamp. Events with creation time after it won't be queried.
 */
 ThingsboardPeRestApi.prototype.getEventsUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/events/{entityType}/{entityId}/{eventType}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{eventType}', parameters['eventType']);
        
        


        if(parameters['eventType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: eventType'));
            return deferred.promise;
        }
 

                if(parameters['tenantId'] !== undefined){
                    queryParameters['tenantId'] = parameters['tenantId'];
                }
        
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of events for specified entity. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 
 * @method
 * @name ThingsboardPeRestApi#getEventsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The value is not used in searching.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - Timestamp. Events with creation time before it won't be queried.
     * @param {integer} parameters.endTime - Timestamp. Events with creation time after it won't be queried.
 */
 ThingsboardPeRestApi.prototype.getEventsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/events/{entityType}/{entityId}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['tenantId'] !== undefined){
                    queryParameters['tenantId'] = parameters['tenantId'];
                }
        
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of events for the chosen entity by specifying the event filter. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

# Event Filter Definition

5 different eventFilter objects could be set for different event types. The eventType field is required. Others are optional. If some of them are set, the filtering will be applied according to them. See the examples below for all the fields used for each event type filtering. 

Note,

 * 'server' - string value representing the server name, identifier or ip address where the platform is running;
 * 'errorStr' - the case insensitive 'contains' filter based on error message.

## Error Event Filter

```json
{
   "eventType":"ERROR",
   "server":"ip-172-31-24-152",
   "method":"onClusterEventMsg",
   "errorStr":"Error Message"
}
```

 * 'method' - string value representing the method name when the error happened.

## Lifecycle Event Filter

```json
{
   "eventType":"LC_EVENT",
   "server":"ip-172-31-24-152",
   "event":"STARTED",
   "status":"Success",
   "errorStr":"Error Message"
}
```

 * 'event' - string value representing the lifecycle event type;
 * 'status' - string value representing status of the lifecycle event.

## Statistics Event Filter

```json
{
   "eventType":"STATS",
   "server":"ip-172-31-24-152",
   "messagesProcessed":10,
   "errorsOccurred":5
}
```

 * 'messagesProcessed' - the minimum number of successfully processed messages;
 * 'errorsOccurred' - the minimum number of errors occurred during messages processing.

## Debug Rule Node Event Filter

```json
{
   "eventType":"DEBUG_RULE_NODE",
   "msgDirectionType":"IN",
   "server":"ip-172-31-24-152",
   "dataSearch":"humidity",
   "metadataSearch":"deviceName",
   "entityName":"DEVICE",
   "relationType":"Success",
   "entityId":"de9d54a0-2b7a-11ec-a3cc-23386423d98f",
   "msgType":"POST_TELEMETRY_REQUEST",
   "isError":"false",
   "errorStr":"Error Message"
}
```

## Debug Rule Chain Event Filter

```json
{
   "eventType":"DEBUG_RULE_CHAIN",
   "msgDirectionType":"IN",
   "server":"ip-172-31-24-152",
   "dataSearch":"humidity",
   "metadataSearch":"deviceName",
   "entityName":"DEVICE",
   "relationType":"Success",
   "entityId":"de9d54a0-2b7a-11ec-a3cc-23386423d98f",
   "msgType":"POST_TELEMETRY_REQUEST",
   "isError":"false",
   "errorStr":"Error Message"
}
```

 * 'msgDirectionType' - string value representing msg direction type (incoming to entity or outcoming from entity);
 * 'dataSearch' - the case insensitive 'contains' filter based on data (key and value) for the message;
 * 'metadataSearch' - the case insensitive 'contains' filter based on metadata (key and value) for the message;
 * 'entityName' - string value representing the entity type;
 * 'relationType' - string value representing the type of message routing;
 * 'entityId' - string value representing the entity id in the event body (originator of the message);
 * 'msgType' - string value representing the message type;
 * 'isError' - boolean value to filter the errors.


 * @method
 * @name ThingsboardPeRestApi#getEventsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The value is not used in searching.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {integer} parameters.startTime - Timestamp. Events with creation time before it won't be queried.
     * @param {integer} parameters.endTime - Timestamp. Events with creation time after it won't be queried.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.getEventsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/events/{entityType}/{entityId}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['tenantId'] !== undefined){
                    queryParameters['tenantId'] = parameters['tenantId'];
                }
        
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 

                if(parameters['startTime'] !== undefined){
                    queryParameters['startTime'] = parameters['startTime'];
                }
        
        
        


 

                if(parameters['endTime'] !== undefined){
                    queryParameters['endTime'] = parameters['endTime'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of group permission objects that is assigned for the specified Entity Group Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEntityGroupPermissionsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getEntityGroupPermissionsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/groupPermissions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Group Permission. When creating group permission, platform generates Group Permission Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Group Permission id will be present in the response. Specify existing Group Permission id to update the permission. Referencing non-existing Group Permission Id will cause 'Not Found' error.

Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveGroupPermissionUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveGroupPermissionUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/groupPermission';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Group Permission Info object based on the provided Group Permission Id and the flag that controls what additional information to load: User or Entity Group. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups.  Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getGroupPermissionInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupPermissionId - A string value representing the group permission id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {boolean} parameters.isUserGroup - Load additional information about User('true') or Entity Group('false).
 */
 ThingsboardPeRestApi.prototype.getGroupPermissionInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/groupPermission/info/{groupPermissionId}{?isUserGroup}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupPermissionId}', parameters['groupPermissionId']);
        
        


        if(parameters['groupPermissionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPermissionId'));
            return deferred.promise;
        }
 

                if(parameters['isUserGroup'] !== undefined){
                    queryParameters['isUserGroup'] = parameters['isUserGroup'];
                }
        
        
        


        if(parameters['isUserGroup'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isUserGroup'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Group Permission object based on the provided Group Permission Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getGroupPermissionByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupPermissionId - A string value representing the group permission id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getGroupPermissionByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/groupPermission/{groupPermissionId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupPermissionId}', parameters['groupPermissionId']);
        
        


        if(parameters['groupPermissionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPermissionId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the group permission. Referencing non-existing group permission Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteGroupPermissionUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupPermissionId - A string value representing the group permission id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteGroupPermissionUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/groupPermission/{groupPermissionId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupPermissionId}', parameters['groupPermissionId']);
        
        


        if(parameters['groupPermissionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupPermissionId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Enrich a list of group permission objects with the information about Role, User and Entity Groups. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#loadUserGroupPermissionInfosUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.loadUserGroupPermissionInfosUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/userGroup/groupPermissions/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of group permission objects that belongs to specified User Group Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserGroupPermissionsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getUserGroupPermissionsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/userGroup/{userGroupId}/groupPermissions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userGroupId}', parameters['userGroupId']);
        
        


        if(parameters['userGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userGroupId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Integration. When creating integration, platform generates Integration Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created integration id will be present in the response. Specify existing Integration id to update the integration. Referencing non-existing integration Id will cause 'Not Found' error. Integration configuration is validated for each type of the integration before it can be created. 

# Integration Configuration

Integration configuration (**'configuration'** field) is the JSON object representing the special configuration per integration type with the connectivity fields and other important parameters dependent on the specific integration type. Let's review the configuration object for the MQTT Integration type below. 

```json
{
   "clientConfiguration":{
      "host":"broker.hivemq.com",
      "port":1883,
      "cleanSession":false,
      "ssl":false,
      "connectTimeoutSec":10,
      "clientId":"",
      "maxBytesInMessage":32368,
      "credentials":{
         "type":"anonymous"
      }
   },
   "downlinkTopicPattern":"${topic}",
   "topicFilters":[
      {
         "filter":"tb/mqtt-integration-tutorial/sensors/+/temperature",
         "qos":0
      }
   ],
   "metadata":{
   }
}
```



Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveIntegrationUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveIntegrationUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks if the connection to the integration is established. Throws an error if the connection is not established. Example: Failed to connect to MQTT broker at host:port.
 * @method
 * @name ThingsboardPeRestApi#checkIntegrationConnectionUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.checkIntegrationConnectionUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integration/check';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Integration object based on the provided routing key. The server checks that the integration is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getIntegrationByRoutingKeyUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.routingKey - A string value representing the integration routing key. For example, '542047e6-c1b2-112e-a87e-e49247c09d4b'
 */
 ThingsboardPeRestApi.prototype.getIntegrationByRoutingKeyUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integration/routingKey/{routingKey}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{routingKey}', parameters['routingKey']);
        
        


        if(parameters['routingKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: routingKey'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Integration object based on the provided Integration Id. The server checks that the integration is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getIntegrationByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.integrationId - A string value representing the integration id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getIntegrationByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integration/{integrationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{integrationId}', parameters['integrationId']);
        
        


        if(parameters['integrationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: integrationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the integration and all the relations (from and to the integration). Referencing non-existing integration Id will cause an error. 

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteIntegrationUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.integrationId - A string value representing the integration id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteIntegrationUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integration/{integrationId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{integrationId}', parameters['integrationId']);
        
        


        if(parameters['integrationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: integrationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested integrations must be owned by tenant which is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getIntegrationsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.integrationIds - A list of integration ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getIntegrationsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integrations{?integrationIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['integrationIds'] !== undefined){
                    queryParameters['integrationIds'] = parameters['integrationIds'];
                }
        
        
        


        if(parameters['integrationIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: integrationIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of integrations owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getIntegrationsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the integration name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getIntegrationsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/integrations{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Lwm2m Bootstrap SecurityInfo object (of the current server) based on the provided isBootstrapServer parameter. If isBootstrapServer == true, get the parameters of the current Bootstrap Server. If isBootstrapServer == false, get the parameters of the current Lwm2m Server. Used for client settings when starting the client in Bootstrap mode. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getLwm2mBootstrapSecurityInfoUsingGET
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.isBootstrapServer - A Boolean value representing the Server SecurityInfo for future Bootstrap client mode settings. Values: 'true' for Bootstrap Server; 'false' for Lwm2m Server. 
 */
 ThingsboardPeRestApi.prototype.getLwm2mBootstrapSecurityInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/lwm2m/deviceProfile/bootstrap/{isBootstrapServer}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{isBootstrapServer}', parameters['isBootstrapServer']);
        
        


        if(parameters['isBootstrapServer'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isBootstrapServer'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients
 * @method
 * @name ThingsboardPeRestApi#getClientRegistrationTemplatesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getClientRegistrationTemplatesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/config/template';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients
 * @method
 * @name ThingsboardPeRestApi#saveClientRegistrationTemplateUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveClientRegistrationTemplateUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/config/template';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients
 * @method
 * @name ThingsboardPeRestApi#deleteClientRegistrationTemplateUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientRegistrationTemplateId - String representation of client registration template id to delete
 */
 ThingsboardPeRestApi.prototype.deleteClientRegistrationTemplateUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/config/template/{clientRegistrationTemplateId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientRegistrationTemplateId}', parameters['clientRegistrationTemplateId']);
        
        


        if(parameters['clientRegistrationTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientRegistrationTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the list of OAuth2 clients to log in with, available for such domain scheme (HTTP or HTTPS) (if x-forwarded-proto request header is present - the scheme is known from it) and domain name and port (port may be known from x-forwarded-port header)
 * @method
 * @name ThingsboardPeRestApi#getOAuth2ClientsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.pkgName - Mobile application package name, to find OAuth2 clients where there is configured mobile application with such package name
     * @param {string} parameters.platform - Platform type to search OAuth2 clients for which the usage with this platform type is allowed in the settings. If platform type is not one of allowable values - it will just be ignored
 */
 ThingsboardPeRestApi.prototype.getOAuth2ClientsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/oauth2Clients{?pkgName,platform}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


 

                if(parameters['platform'] !== undefined){
                    queryParameters['platform'] = parameters['platform'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getCurrentOAuth2InfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCurrentOAuth2InfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/config';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveOAuth2InfoUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveOAuth2InfoUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/config';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the URL enclosed in double quotes. After successful authentication with OAuth2 provider, it makes a redirect to this path so that the platform can do further log in processing. This URL may be configured as 'security.oauth2.loginProcessingUrl' property in yml configuration file, or as 'SECURITY_OAUTH2_LOGIN_PROCESSING_URL' env variable. By default it is '/login/oauth2/code/'

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getLoginProcessingUrlUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getLoginProcessingUrlUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/oauth2/loginProcessingUrl';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the OTA Package Info. When creating OTA Package Info, platform generates OTA Package id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created OTA Package id will be present in the response. Specify existing OTA Package id to update the OTA Package Info. Referencing non-existing OTA Package Id will cause 'Not Found' error. 

OTA Package combination of the title with the version is unique in the scope of tenant. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveOtaPackageInfoUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveOtaPackageInfoUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the OTA Package Info object based on the provided OTA Package Id. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getOtaPackageInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageId - A string value representing the ota package id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getOtaPackageInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage/info/{otaPackageId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the OTA Package object based on the provided OTA Package Id. The server checks that the OTA Package is owned by the same tenant. OTA Package is a heavyweight object that includes main information about the OTA Package and also data. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getOtaPackageByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageId - A string value representing the ota package id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getOtaPackageByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage/{otaPackageId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the OTA Package. Referencing non-existing OTA Package Id will cause an error. Can't delete the OTA Package if it is referenced by existing devices or device profile.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteOtaPackageUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageId - A string value representing the ota package id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteOtaPackageUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage/{otaPackageId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Download OTA Package based on the provided OTA Package Id.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#downloadOtaPackageUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageId - A string value representing the ota package id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.downloadOtaPackageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage/{otaPackageId}/download';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update the OTA Package. Adds the date to the existing OTA Package Info

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveOtaPackageDataUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.otaPackageId - A string value representing the ota package id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.checksum - OTA Package checksum. For example, '0xd87f7e0c'
     * @param {string} parameters.checksumAlgorithm - OTA Package checksum algorithm.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveOtaPackageDataUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackage/{otaPackageId}{?checksum,checksumAlgorithm}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{otaPackageId}', parameters['otaPackageId']);
        
        


        if(parameters['otaPackageId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: otaPackageId'));
            return deferred.promise;
        }
 

                if(parameters['checksum'] !== undefined){
                    queryParameters['checksum'] = parameters['checksum'];
                }
        
        
        


 

                if(parameters['checksumAlgorithm'] !== undefined){
                    queryParameters['checksumAlgorithm'] = parameters['checksumAlgorithm'];
                }
        
        
        


        if(parameters['checksumAlgorithm'] === undefined){
            deferred.reject(new Error('Missing required  parameter: checksumAlgorithm'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of OTA Package Info objects owned by tenant, and by entity group. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getGroupOtaPackagesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.type - OTA Package type.
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the ota package title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getGroupOtaPackagesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackages/group/{groupId}/{type}{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupId}', parameters['groupId']);
        
        


        if(parameters['groupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{type}', parameters['type']);
        
        


        if(parameters['type'] === undefined){
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of OTA Package Info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getOtaPackagesUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceProfileId - A string value representing the device profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.type - OTA Package type.
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the ota package title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getOtaPackagesUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackages/{deviceProfileId}/{type}{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceProfileId}', parameters['deviceProfileId']);
        
        


        if(parameters['deviceProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceProfileId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{type}', parameters['type']);
        
        


        if(parameters['type'] === undefined){
            deferred.reject(new Error('Missing required  parameter: type'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of OTA Package Info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getOtaPackagesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the ota package title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getOtaPackagesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/otaPackages{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Tenant/Customer changes Owner to Customer or sub-Customer. Sub-Customer can`t perform this operation! 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#changeOwnerToCustomerUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ownerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.changeOwnerToCustomerUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/owner/CUSTOMER/{ownerId}/{entityType}/{entityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ownerId}', parameters['ownerId']);
        
        


        if(parameters['ownerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Tenant changes Owner from Customer or sub-Customer to Tenant. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#changeOwnerToTenantUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ownerId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.changeOwnerToTenantUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/owner/TENANT/{ownerId}/{entityType}/{entityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ownerId}', parameters['ownerId']);
        
        


        if(parameters['ownerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ownerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique queue names based on service type. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantQueuesByServiceTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.serviceType - Service type (implemented only for the TB-RULE-ENGINE)
 */
 ThingsboardPeRestApi.prototype.getTenantQueuesByServiceTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/queues{?serviceType}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['serviceType'] !== undefined){
                    queryParameters['serviceType'] = parameters['serviceType'];
                }
        
        
        


        if(parameters['serviceType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: serviceType'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * downloadTestReport
 * @method
 * @name ThingsboardPeRestApi#downloadTestReportUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.reportsServerEndpointUrl - reportsServerEndpointUrl
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.downloadTestReportUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/report/test{?reportsServerEndpointUrl}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['reportsServerEndpointUrl'] !== undefined){
                    queryParameters['reportsServerEndpointUrl'] = parameters['reportsServerEndpointUrl'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * downloadDashboardReport
 * @method
 * @name ThingsboardPeRestApi#downloadDashboardReportUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dashboardId - dashboardId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.downloadDashboardReportUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/report/{dashboardId}/download';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{dashboardId}', parameters['dashboardId']);
        
        


        if(parameters['dashboardId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dashboardId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Role. When creating Role, platform generates Role Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Role id will be present in the response. Specify existing Role id to update the permission. Referencing non-existing Group Permission Id will cause 'Not Found' error.

Role Contains a set of permissions. Role has two types. Generic Role may be assigned to the user group and will provide permissions for all entities of a certain type. Group Role may be assigned to both user and entity group and will provides permissions only for the entities that belong to specified entity group. The assignment of the Role to the User Group is done using [Group Permission Controller](/swagger-ui.html#/group-permission-controller).

Example of Generic Role with read-only permissions for any resource and all permissions for the 'DEVICE' and 'PROFILE' resources is listed below: 

```json
{
  "name": "Read-Only User",
  "type": "GENERIC",
  "permissions": {
    "ALL": [
      "READ",
      "RPC_CALL",
      "READ_CREDENTIALS",
      "READ_ATTRIBUTES",
      "READ_TELEMETRY"
    ],
    "DEVICE": [
      "ALL"
    ]
    "PROFILE": [
      "ALL"
    ]
  },
  "additionalInfo": {
    "description": "Read-only permissions for everything, Write permissions for devices and own profile."
  }
}
```

Example of Group Role with read-only permissions. Note that the group role has no association with the resources. The type of the resource is taken from the entity group that this role is assigned to: 

```json
{
  "name": "Entity Group Read-only User",
  "type": "GROUP",
  "permissions": [
    "READ",
    "RPC_CALL",
    "READ_CREDENTIALS",
    "READ_ATTRIBUTES",
    "READ_TELEMETRY"
  ],
  "additionalInfo": {
    "description": "Read-only permissions."
  }
}
```

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveRoleUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveRoleUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/role';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Role object based on the provided Role Id. Role Contains a set of permissions. Role has two types. Generic Role may be assigned to the user group and will provide permissions for all entities of a certain type. Group Role may be assigned to both user and entity group and will provides permissions only for the entities that belong to specified entity group. The assignment of the Role to the User Group is done using [Group Permission Controller](/swagger-ui.html#/group-permission-controller). Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getRoleByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.roleId - A string value representing the role id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getRoleByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/role/{roleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{roleId}', parameters['roleId']);
        
        


        if(parameters['roleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: roleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the role. Referencing non-existing role Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteRoleUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.roleId - A string value representing the role id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteRoleUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/role/{roleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{roleId}', parameters['roleId']);
        
        


        if(parameters['roleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: roleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of roles that are available for the current user. Role Contains a set of permissions. Role has two types. Generic Role may be assigned to the user group and will provide permissions for all entities of a certain type. Group Role may be assigned to both user and entity group and will provides permissions only for the entities that belong to specified entity group. The assignment of the Role to the User Group is done using [Group Permission Controller](/swagger-ui.html#/group-permission-controller).You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getRolesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Type of the role
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the role name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getRolesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/roles{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the list of rows based on their ids. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getRolesByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.roleIds - A list of role ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getRolesByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/roles{?roleIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['roleIds'] !== undefined){
                    queryParameters['roleIds'] = parameters['roleIds'];
                }
        
        
        


        if(parameters['roleIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: roleIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deprecated. See 'Rpc V 2 Controller' instead.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#handleOneWayDeviceRPCRequestUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleOneWayDeviceRPCRequestUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/rpc/oneway/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deprecated. See 'Rpc V 2 Controller' instead.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#handleTwoWayDeviceRPCRequestUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleTwoWayDeviceRPCRequestUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/rpc/twoway/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Sends the one-way remote-procedure call (RPC) request to device. Sends the one-way remote-procedure call (RPC) request to device. The RPC call is A JSON that contains the method name ('method'), parameters ('params') and multiple optional fields. See example below. We will review the properties of the RPC call one-by-one below. 

```json
{
  "method": "setGpio",
  "params": {
    "pin": 7,
    "value": 1
  },
  "persistent": false,
  "timeout": 5000
}
```

### Server-side RPC structure

The body of server-side RPC request consists of multiple fields:

* **method** - mandatory, name of the method to distinct the RPC calls.
  For example, "getCurrentTime" or "getWeatherForecast". The value of the parameter is a string.
* **params** - mandatory, parameters used for processing of the request. The value is a JSON. Leave empty JSON "{}" if no parameters needed.
* **timeout** - optional, value of the processing timeout in milliseconds. The default value is 10000 (10 seconds). The minimum value is 5000 (5 seconds).
* **expirationTime** - optional, value of the epoch time (in milliseconds, UTC timezone). Overrides **timeout** if present.
* **persistent** - optional, indicates persistent RPC. The default value is "false".
* **retries** - optional, defines how many times persistent RPC will be re-sent in case of failures on the network and/or device side.
* **additionalInfo** - optional, defines metadata for the persistent RPC that will be added to the persistent RPC events.

### RPC Result
In case of persistent RPC, the result of this call is 'rpcId' UUID. In case of lightweight RPC, the result of this call is either 200 OK if the message was sent to device, or 504 Gateway Timeout if device is offline.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#handleOneWayDeviceRPCRequestUsingPOST_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleOneWayDeviceRPCRequestUsingPOST_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rpc/oneway/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Allows to query RPC calls for specific device using pagination.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getPersistedRpcByDeviceUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.rpcStatus - Status of the RPC
     * @param {string} parameters.textSearch - Not implemented. Leave empty.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getPersistedRpcByDeviceUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rpc/persistent/device/{deviceId}{?page,pageSize,rpcStatus,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['rpcStatus'] !== undefined){
                    queryParameters['rpcStatus'] = parameters['rpcStatus'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get information about the status of the RPC call.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getPersistedRpcUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.rpcId - A string value representing the rpc id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getPersistedRpcUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rpc/persistent/{rpcId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{rpcId}', parameters['rpcId']);
        
        


        if(parameters['rpcId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: rpcId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the persistent RPC request.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteRpcUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.rpcId - A string value representing the rpc id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteRpcUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rpc/persistent/{rpcId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{rpcId}', parameters['rpcId']);
        
        


        if(parameters['rpcId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: rpcId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Sends the two-way remote-procedure call (RPC) request to device. Sends the one-way remote-procedure call (RPC) request to device. The RPC call is A JSON that contains the method name ('method'), parameters ('params') and multiple optional fields. See example below. We will review the properties of the RPC call one-by-one below. 

```json
{
  "method": "setGpio",
  "params": {
    "pin": 7,
    "value": 1
  },
  "persistent": false,
  "timeout": 5000
}
```

### Server-side RPC structure

The body of server-side RPC request consists of multiple fields:

* **method** - mandatory, name of the method to distinct the RPC calls.
  For example, "getCurrentTime" or "getWeatherForecast". The value of the parameter is a string.
* **params** - mandatory, parameters used for processing of the request. The value is a JSON. Leave empty JSON "{}" if no parameters needed.
* **timeout** - optional, value of the processing timeout in milliseconds. The default value is 10000 (10 seconds). The minimum value is 5000 (5 seconds).
* **expirationTime** - optional, value of the epoch time (in milliseconds, UTC timezone). Overrides **timeout** if present.
* **persistent** - optional, indicates persistent RPC. The default value is "false".
* **retries** - optional, defines how many times persistent RPC will be re-sent in case of failures on the network and/or device side.
* **additionalInfo** - optional, defines metadata for the persistent RPC that will be added to the persistent RPC events.

### RPC Result
In case of persistent RPC, the result of this call is 'rpcId' UUID. In case of lightweight RPC, the result of this call is the response from device, or 504 Gateway Timeout if device is offline.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#handleTwoWayDeviceRPCRequestUsingPOST_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleTwoWayDeviceRPCRequestUsingPOST_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rpc/twoway/{deviceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates assignment of an existing rule chain to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment rule chain (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once rule chain will be delivered to edge service, it's going to start processing messages locally. 

Only rule chain with type 'EDGE' can be assigned to edge.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#assignRuleChainToEdgeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - edgeId
     * @param {string} parameters.ruleChainId - ruleChainId
 */
 ThingsboardPeRestApi.prototype.assignRuleChainToEdgeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/ruleChain/{ruleChainId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Clears assignment of the rule chain to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove rule chain (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove rule chain locally.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#unassignRuleChainFromEdgeUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - edgeId
     * @param {string} parameters.ruleChainId - ruleChainId
 */
 ThingsboardPeRestApi.prototype.unassignRuleChainFromEdgeUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/ruleChain/{ruleChainId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Rule Chains assigned to the specified edge. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getEdgeRuleChainsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the rule chain name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEdgeRuleChainsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/ruleChains{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Rule Chain. When creating Rule Chain, platform generates Rule Chain Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Rule Chain Id will be present in the response. Specify existing Rule Chain id to update the rule chain. Referencing non-existing rule chain Id will cause 'Not Found' error.

The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveRuleChainUsingPOST_1
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveRuleChainUsingPOST_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a list of Rule Chains that will be assigned to a newly created edge. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getAutoAssignToEdgeRuleChainsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getAutoAssignToEdgeRuleChainsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/autoAssignToEdgeRuleChains';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create rule chain from template, based on the specified name in the request. Creates the rule chain based on the template that is used to create root rule chain. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveRuleChainUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveRuleChainUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/device/default';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the rule chain metadata. The metadata object contains information about the rule nodes and their connections.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveRuleChainMetaDataUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.updateRelated - Update related rule nodes.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveRuleChainMetaDataUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/metadata{?updateRelated}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['updateRelated'] !== undefined){
                    queryParameters['updateRelated'] = parameters['updateRelated'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Execute the JavaScript function and return the result. The format of request: 

```json
{
  "script": "Your JS Function as String",
  "scriptType": "One of: update, generate, filter, switch, json, string",
  "argNames": ["msg", "metadata", "type"],
  "msg": "{\"temperature\": 42}", 
  "metadata": {
    "deviceName": "Device A",
    "deviceType": "Thermometer"
  },
  "msgType": "POST_TELEMETRY_REQUEST"
}
```

 Expected result JSON contains "output" and "error".

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#testScriptUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.testScriptUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/testScript';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Rule Chain object based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getRuleChainByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getRuleChainByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the rule chain. Referencing non-existing rule chain Id will cause an error. Referencing rule chain that is used in the device profiles will cause an error.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteRuleChainUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteRuleChainUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Makes the rule chain to be automatically assigned for any new edge that will be created. Does not assign this rule chain for already created edges. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setAutoAssignToEdgeRuleChainUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setAutoAssignToEdgeRuleChainUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/autoAssignToEdge';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Removes the rule chain from the list of rule chains that are going to be automatically assigned for any new edge that will be created. Does not unassign this rule chain for already assigned edges. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#unsetAutoAssignToEdgeRuleChainUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.unsetAutoAssignToEdgeRuleChainUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/autoAssignToEdge';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Makes the rule chain to be root rule chain for any new edge that will be created. Does not update root rule chain for already created edges. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setEdgeTemplateRootRuleChainUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setEdgeTemplateRootRuleChainUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/edgeTemplateRoot';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Rule Chain Metadata object based on the provided Rule Chain Id. The metadata object contains information about the rule nodes and their connections.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getRuleChainMetaDataUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getRuleChainMetaDataUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/metadata';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the unique labels for the "output" Rule Nodes that belong to the Rule Chain based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getRuleChainOutputLabelsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getRuleChainOutputLabelsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/output/labels';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the list of rule chains and the relation types (labels) they use to process output of the current rule chain based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getRuleChainOutputLabelsUsageUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getRuleChainOutputLabelsUsageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/output/labels/usage';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Makes the rule chain to be root rule chain. Updates previous root rule chain as well. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setRootRuleChainUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleChainId - A string value representing the rule chain id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setRootRuleChainUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChain/{ruleChainId}/root';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleChainId}', parameters['ruleChainId']);
        
        


        if(parameters['ruleChainId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleChainId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Exports all tenant rule chains as one JSON.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#exportRuleChainsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.limit - A limit of rule chains to export.
 */
 ThingsboardPeRestApi.prototype.exportRuleChainsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChains/export{?limit}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['limit'] !== undefined){
                    queryParameters['limit'] = parameters['limit'];
                }
        
        
        


        if(parameters['limit'] === undefined){
            deferred.reject(new Error('Missing required  parameter: limit'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Imports all tenant rule chains as one JSON.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#importRuleChainsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.overwrite - Enables overwrite for existing rule chains with the same name.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.importRuleChainsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChains/import{?overwrite}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['overwrite'] !== undefined){
                    queryParameters['overwrite'] = parameters['overwrite'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Rule Chains owned by tenant. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getRuleChainsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.type - Rule chain type (CORE or EDGE)
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the rule chain name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getRuleChainsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleChains{?page,pageSize,sortOrder,sortProperty,textSearch,type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Gets the input message from the debug events for specified Rule Chain Id. Referencing non-existing rule chain Id will cause an error. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getLatestRuleNodeDebugInputUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleNodeId - A string value representing the rule node id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getLatestRuleNodeDebugInputUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/ruleNode/{ruleNodeId}/debugIn';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{ruleNodeId}', parameters['ruleNodeId']);
        
        


        if(parameters['ruleNodeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleNodeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses current User Id ( the one which credentials is used to perform the request) as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The default timeout of the request processing is 10 seconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#handleRuleEngineRequestUsingPOST_2
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleRuleEngineRequestUsingPOST_2 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rule-engine/';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses specified Entity Id as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The default timeout of the request processing is 10 seconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#handleRuleEngineRequestUsingPOST_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleRuleEngineRequestUsingPOST_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rule-engine/{entityType}/{entityId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses specified Entity Id as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The platform expects the timeout value in milliseconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#handleRuleEngineRequestUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.timeout - Timeout to process the request in milliseconds
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.handleRuleEngineRequestUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/rule-engine/{entityType}/{entityId}/{timeout}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{timeout}', parameters['timeout']);
        
        


        if(parameters['timeout'] === undefined){
            deferred.reject(new Error('Missing required  parameter: timeout'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the list of Scheduler Event Info objects based on the provided Edge entity. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAllSchedulerEventsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAllSchedulerEventsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/allSchedulerEvents';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates assignment of an existing scheduler event to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment scheduler event (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once scheduler event will be delivered to edge service, it is going to be available for usage on remote edge instance. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#assignSchedulerEventToEdgeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.schedulerEventId - A string value representing the scheduler id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.assignSchedulerEventToEdgeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/schedulerEvent/{schedulerEventId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{schedulerEventId}', parameters['schedulerEventId']);
        
        


        if(parameters['schedulerEventId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Clears assignment of the scheduler event to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove entity group and entities inside this group locally.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#unassignSchedulerEventFromEdgeUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.schedulerEventId - A string value representing the scheduler id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.unassignSchedulerEventFromEdgeUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/schedulerEvent/{schedulerEventId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{schedulerEventId}', parameters['schedulerEventId']);
        
        


        if(parameters['schedulerEventId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of  Scheduler Events Info objects based on the provided Edge entity. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getEdgeSchedulerEventsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.edgeId - A string value representing the edge id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'startsWith' filter based on the scheduler event name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getEdgeSchedulerEventsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/edge/{edgeId}/schedulerEvents{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{edgeId}', parameters['edgeId']);
        
        


        if(parameters['edgeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: edgeId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates scheduler event. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. When creating scheduler event, platform generates scheduler event Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created scheduler event id will be present in the response. Specify existing scheduler event id to update the scheduler event. Referencing non-existing scheduler event Id will cause 'Not Found' error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveSchedulerEventUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveSchedulerEventUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the SchedulerEventWithCustomerInfo object based on the provided scheduler event Id. Scheduler Event With Customer Info extends Scheduler Event Info object and adds 'customerTitle' - a String value representing the title of the customer which user created a Scheduler Event and 'customerIsPublic' - a boolean parameter that specifies if customer is public. See the 'Model' tab of the Response Class for more details. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSchedulerEventInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.schedulerEventId - A string value representing the scheduler id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getSchedulerEventInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvent/info/{schedulerEventId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{schedulerEventId}', parameters['schedulerEventId']);
        
        


        if(parameters['schedulerEventId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the SchedulerEvent object based on the provided scheduler event Id. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSchedulerEventByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.schedulerEventId - A string value representing the scheduler id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getSchedulerEventByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvent/{schedulerEventId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{schedulerEventId}', parameters['schedulerEventId']);
        
        


        if(parameters['schedulerEventId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the scheduler event. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteSchedulerEventUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.schedulerEventId - A string value representing the scheduler id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteSchedulerEventUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvent/{schedulerEventId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{schedulerEventId}', parameters['schedulerEventId']);
        
        


        if(parameters['schedulerEventId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested scheduler events must be owned by tenant or assigned to customer which user is performing the request. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSchedulerEventsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.schedulerEventIds - A list of scheduler event ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getSchedulerEventsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvents{?schedulerEventIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['schedulerEventIds'] !== undefined){
                    queryParameters['schedulerEventIds'] = parameters['schedulerEventIds'];
                }
        
        
        


        if(parameters['schedulerEventIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: schedulerEventIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested scheduler events must be owned by tenant or assigned to customer which user is performing the request. Scheduler Event With Customer Info extends Scheduler Event Info object and adds 'customerTitle' - a String value representing the title of the customer which user created a Scheduler Event and 'customerIsPublic' - a boolean parameter that specifies if customer is public. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSchedulerEventsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.type - A string value representing the scheduler type. For example, 'generateReport'
 */
 ThingsboardPeRestApi.prototype.getSchedulerEventsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/schedulerEvents{?type}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['type'] !== undefined){
                    queryParameters['type'] = parameters['type'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Privacy Policy based on the domain name from the request. Available for non-authorized users. 
 * @method
 * @name ThingsboardPeRestApi#getPrivacyPolicyUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getPrivacyPolicyUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/selfRegistration/privacyPolicy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Self Registration parameters based on the domain name from the request. Available for non-authorized users. Contains the information to customize the sign-up form.
 * @method
 * @name ThingsboardPeRestApi#getSignUpSelfRegistrationParamsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.pkgName - pkgName
 */
 ThingsboardPeRestApi.prototype.getSignUpSelfRegistrationParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/selfRegistration/signUpSelfRegistrationParams{?pkgName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Terms of Use based on the domain name from the request. Available for non-authorized users. 
 * @method
 * @name ThingsboardPeRestApi#getTermsOfUseUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getTermsOfUseUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/selfRegistration/termsOfUse';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Self Registration parameters object for the tenant of the current user. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getSelfRegistrationParamsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getSelfRegistrationParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/selfRegistration/selfRegistrationParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Self Registration parameters. When creating, platform generates Admin Settings Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Admin Settings Id will be present in the response. Specify existing Admin Settings Id to update the Self Registration parameters. Referencing non-existing Admin Settings Id will cause 'Not Found' error.

Self Registration allows users to signup for using the platform and automatically create a Customer account for them. You may configure default dashboard and user roles that will be assigned for this Customer. This allows you to build out-of-the-box solutions for customers. Ability to white-label the login and main pages helps to brand the platform.

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#saveSelfRegistrationParamsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveSelfRegistrationParamsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/selfRegistration/selfRegistrationParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * deleteSelfRegistrationParams
 * @method
 * @name ThingsboardPeRestApi#deleteSelfRegistrationParamsUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.domainName - domainName
 */
 ThingsboardPeRestApi.prototype.deleteSelfRegistrationParamsUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/selfRegistration/selfRegistrationParams/{domainName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{domainName}', parameters['domainName']);
        
        


        if(parameters['domainName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: domainName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Activate the user using code(link) from the activation email and return the JWT Token. Sends the notification and email about user activation. Checks that user was not activated yet.
 * @method
 * @name ThingsboardPeRestApi#activateUserByEmailCodeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.emailCode - Activation token.
     * @param {string} parameters.pkgName - Optional package name of the mobile application.
 */
 ThingsboardPeRestApi.prototype.activateUserByEmailCodeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/activateByEmailCode{?emailCode,pkgName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['emailCode'] !== undefined){
                    queryParameters['emailCode'] = parameters['emailCode'];
                }
        
        
        


        if(parameters['emailCode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: emailCode'));
            return deferred.promise;
        }
 

                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Activate the user using code(link) from the activation email. Validates the code an redirects according to the signup flow. Checks that user was not activated yet.
 * @method
 * @name ThingsboardPeRestApi#activateEmailUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.emailCode - Activation token.
     * @param {string} parameters.pkgName - Optional package name of the mobile application.
 */
 ThingsboardPeRestApi.prototype.activateEmailUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/activateEmail{?emailCode,pkgName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['emailCode'] !== undefined){
                    queryParameters['emailCode'] = parameters['emailCode'];
                }
        
        
        


        if(parameters['emailCode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: emailCode'));
            return deferred.promise;
        }
 

                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * activateCloudUserByEmailCode
 * @method
 * @name ThingsboardPeRestApi#activateCloudUserByEmailCodeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.emailCode - emailCode
 */
 ThingsboardPeRestApi.prototype.activateCloudUserByEmailCodeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/cloud/activateByEmailCode{?emailCode}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['emailCode'] !== undefined){
                    queryParameters['emailCode'] = parameters['emailCode'];
                }
        
        
        


        if(parameters['emailCode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: emailCode'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * activateCloudEmail
 * @method
 * @name ThingsboardPeRestApi#activateCloudEmailUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.emailCode - emailCode
 */
 ThingsboardPeRestApi.prototype.activateCloudEmailUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/cloud/activateEmail{?emailCode}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['emailCode'] !== undefined){
                    queryParameters['emailCode'] = parameters['emailCode'];
                }
        
        
        


        if(parameters['emailCode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: emailCode'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * resendCloudEmailActivation
 * @method
 * @name ThingsboardPeRestApi#resendCloudEmailActivationUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.email - email
 */
 ThingsboardPeRestApi.prototype.resendCloudEmailActivationUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/cloud/resendEmailActivation{?email}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


        if(parameters['email'] === undefined){
            deferred.reject(new Error('Missing required  parameter: email'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * This method generates redirect to the special link that is handled by mobile application. Useful for email verification flow on mobile app.
 * @method
 * @name ThingsboardPeRestApi#mobileLoginUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.pkgName - Mobile app package name. Used to identify the application and build the redirect link.
 */
 ThingsboardPeRestApi.prototype.mobileLoginUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/login{?pkgName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


        if(parameters['pkgName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pkgName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Request to resend the activation email for the user. Checks that user was not activated yet.
 * @method
 * @name ThingsboardPeRestApi#resendEmailActivationUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.email - Email of the user.
     * @param {string} parameters.pkgName - Optional package name of the mobile application.
 */
 ThingsboardPeRestApi.prototype.resendEmailActivationUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/resendEmailActivation{?email,pkgName}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


        if(parameters['email'] === undefined){
            deferred.reject(new Error('Missing required  parameter: email'));
            return deferred.promise;
        }
 

                if(parameters['pkgName'] !== undefined){
                    queryParameters['pkgName'] = parameters['pkgName'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Process user sign up request. Creates the Customer and corresponding User based on self Registration parameters for the domain. See [Self Registration Controller](/swagger-ui.html#/self-registration-controller) for more details.  The result is either 'SUCCESS' or 'INACTIVE_USER_EXISTS'. If Success, the user will receive an email with instruction to activate the account. The content of the email is customizable via the mail templates.
 * @method
 * @name ThingsboardPeRestApi#signUpUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.signUpUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/signup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getRecaptchaPublicKey
 * @method
 * @name ThingsboardPeRestApi#getRecaptchaPublicKeyUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getRecaptchaPublicKeyUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/signup/recaptchaPublicKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Accept privacy policy by the current user.
 * @method
 * @name ThingsboardPeRestApi#acceptPrivacyPolicyUsingPOST
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.acceptPrivacyPolicyUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/acceptPrivacyPolicy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * acceptPrivacyPolicyAndTermsOfUse
 * @method
 * @name ThingsboardPeRestApi#acceptPrivacyPolicyAndTermsOfUseUsingPOST
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.acceptPrivacyPolicyAndTermsOfUseUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/acceptPrivacyPolicyAndTermsOfUse';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Accept Terms of Use by the current user.
 * @method
 * @name ThingsboardPeRestApi#acceptTermsOfUseUsingPOST
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.acceptTermsOfUseUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/acceptTermsOfUse';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * isDisplayWelcome
 * @method
 * @name ThingsboardPeRestApi#isDisplayWelcomeUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.isDisplayWelcomeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/displayWelcome';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * setNotDisplayWelcome
 * @method
 * @name ThingsboardPeRestApi#setNotDisplayWelcomeUsingPOST
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.setNotDisplayWelcomeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/notDisplayWelcome';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks that current user accepted the privacy policy.
 * @method
 * @name ThingsboardPeRestApi#privacyPolicyAcceptedUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.privacyPolicyAcceptedUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/privacyPolicyAccepted';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * deleteTenantAccount
 * @method
 * @name ThingsboardPeRestApi#deleteTenantAccountUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.deleteTenantAccountUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/tenantAccount';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks that current user accepted the privacy policy.
 * @method
 * @name ThingsboardPeRestApi#termsOfUseAcceptedUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.termsOfUseAcceptedUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/signup/termsOfUseAccepted';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a solution template details based on the provided id

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSolutionTemplateDetailsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.solutionTemplateId - A string value representing the solution template id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getSolutionTemplateDetailsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/solutions/templates/details/{solutionTemplateId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{solutionTemplateId}', parameters['solutionTemplateId']);
        
        


        if(parameters['solutionTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: solutionTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of solution template descriptors

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSolutionTemplateInfosUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getSolutionTemplateInfosUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/solutions/templates/infos';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a solution template instructions based on the provided id

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getSolutionTemplateInstructionsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.solutionTemplateId - A string value representing the solution template id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getSolutionTemplateInstructionsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/solutions/templates/instructions/{solutionTemplateId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{solutionTemplateId}', parameters['solutionTemplateId']);
        
        


        if(parameters['solutionTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: solutionTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Uninstall solution template based on the provided id

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#uninstallSolutionTemplateUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.solutionTemplateId - A string value representing the solution template id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.uninstallSolutionTemplateUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/solutions/templates/{solutionTemplateId}/delete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{solutionTemplateId}', parameters['solutionTemplateId']);
        
        


        if(parameters['solutionTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: solutionTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Install solution template based on the provided id

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#installSolutionTemplateUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.solutionTemplateId - A string value representing the solution template id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.installSolutionTemplateUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/solutions/templates/{solutionTemplateId}/install';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{solutionTemplateId}', parameters['solutionTemplateId']);
        
        


        if(parameters['solutionTemplateId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: solutionTemplateId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getTenantProfileData
 * @method
 * @name ThingsboardPeRestApi#getTenantProfileDataUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getTenantProfileDataUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/subscription/data';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getTenantSubscriptionUsage
 * @method
 * @name ThingsboardPeRestApi#getTenantSubscriptionUsageUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getTenantSubscriptionUsageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/subscription/usage';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getTenantProfileDataById
 * @method
 * @name ThingsboardPeRestApi#getTenantProfileDataByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantProfileId - tenantProfileId
 */
 ThingsboardPeRestApi.prototype.getTenantProfileDataByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfile/{tenantProfileId}/data';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantProfileId}', parameters['tenantProfileId']);
        
        


        if(parameters['tenantProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Resource. When creating the Resource, platform generates Resource id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Resource id will be present in the response. Specify existing Resource id to update the Resource. Referencing non-existing Resource Id will cause 'Not Found' error. 

Resource combination of the title with the key is unique in the scope of tenant. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveResourceUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveResourceUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Resource Info object based on the provided Resource Id. Resource Info is a lightweight object that includes main information about the Resource excluding the heavyweight data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getResourceInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resourceId - A string value representing the resource id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getResourceInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/info/{resourceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resourceId}', parameters['resourceId']);
        
        


        if(parameters['resourceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resourceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. LwM2M Object is a object that includes information about the LwM2M model which can be used in transport configuration for the LwM2M device profile. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getLwm2mListObjectsPageUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the resource title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getLwm2mListObjectsPageUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/lwm2m/page{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin. You can specify parameters to filter the results. LwM2M Object is a object that includes information about the LwM2M model which can be used in transport configuration for the LwM2M device profile. 

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getLwm2mListObjectsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.objectIds - LwM2M Object ids.
 */
 ThingsboardPeRestApi.prototype.getLwm2mListObjectsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/lwm2m{?objectIds,sortOrder,sortProperty}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


        if(parameters['sortOrder'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sortOrder'));
            return deferred.promise;
        }
 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


        if(parameters['sortProperty'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sortProperty'));
            return deferred.promise;
        }
 

                if(parameters['objectIds'] !== undefined){
                    queryParameters['objectIds'] = parameters['objectIds'];
                }
        
        
        


        if(parameters['objectIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: objectIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Resource object based on the provided Resource Id. Resource is a heavyweight object that includes main information about the Resource and also data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getResourceByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resourceId - A string value representing the resource id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getResourceByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/{resourceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resourceId}', parameters['resourceId']);
        
        


        if(parameters['resourceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resourceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the Resource. Referencing non-existing Resource Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteResourceUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resourceId - A string value representing the resource id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteResourceUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/{resourceId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resourceId}', parameters['resourceId']);
        
        


        if(parameters['resourceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resourceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Download Resource based on the provided Resource Id.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#downloadResourceUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resourceId - A string value representing the resource id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.downloadResourceUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource/{resourceId}/download';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resourceId}', parameters['resourceId']);
        
        


        if(parameters['resourceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resourceId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Resource Info objects owned by tenant or sysadmin. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Resource Info is a lightweight object that includes main information about the Resource excluding the heavyweight data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getResourcesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the resource title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getResourcesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/resource{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates the device attributes based on device id and specified attribute scope. The request payload is a JSON object with key-value format of attributes to create or update. For example:

```json
{
 "stringKey":"value1", 
 "booleanKey":true, 
 "doubleKey":42.0, 
 "longKey":73, 
 "jsonKey": {
    "someNumber": 42,
    "someArray": [1,2,3],
    "someNestedObject": {"key": "value"}
 }
}
```


Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveDeviceAttributesUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveDeviceAttributesUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{deviceId}/{scope}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete device attributes using provided Device Id, scope and a list of keys. Referencing a non-existing Device Id will cause an error

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteDeviceAttributesUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceId - A string value representing the device id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {string} parameters.keys - A string value representing the comma-separated list of attributes keys. For example, 'active,inactivityAlarmTime'.
 */
 ThingsboardPeRestApi.prototype.deleteDeviceAttributesUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{deviceId}/{scope}{?keys}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{deviceId}', parameters['deviceId']);
        
        


        if(parameters['deviceId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


        if(parameters['keys'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keys'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates the entity attributes based on Entity Id and the specified attribute scope.  List of possible attribute scopes depends on the entity type: 

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

The request payload is a JSON object with key-value format of attributes to create or update. For example:

```json
{
 "stringKey":"value1", 
 "booleanKey":true, 
 "doubleKey":42.0, 
 "longKey":73, 
 "jsonKey": {
    "someNumber": 42,
    "someArray": [1,2,3],
    "someNestedObject": {"key": "value"}
 }
}
```
Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveEntityAttributesV2UsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityAttributesV2UsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/attributes/{scope}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique attribute key names for the selected entity. The response will include merged key names set for all attribute scopes:

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getAttributeKeysUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getAttributeKeysUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/keys/attributes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique attribute key names for the selected entity and attributes scope: 

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getAttributeKeysByScopeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
 */
 ThingsboardPeRestApi.prototype.getAttributeKeysByScopeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/keys/attributes/{scope}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a set of unique time-series key names for the selected entity. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getTimeseriesKeysUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTimeseriesKeysUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/keys/timeseries';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete time-series for selected entity based on entity id, entity type and keys. Use 'deleteAllDataForKeys' to delete all time-series data. Use 'startTs' and 'endTs' to specify time-range instead.  Use 'rewriteLatestIfDeleted' to rewrite latest value (stored in separate table for performance) after deletion of the time range. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteEntityTimeseriesUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.keys - A string value representing the comma-separated list of telemetry keys. If keys are not selected, the result will return all latest timeseries. For example, 'temperature,humidity'.
     * @param {boolean} parameters.deleteAllDataForKeys - A boolean value to specify if should be deleted all data for selected keys or only data that are in the selected time range.
     * @param {integer} parameters.startTs - A long value representing the start timestamp of removal time range in milliseconds.
     * @param {integer} parameters.endTs - A long value representing the end timestamp of removal time range in milliseconds.
     * @param {boolean} parameters.rewriteLatestIfDeleted - If the parameter is set to true, the latest telemetry will be rewritten in case that current latest value was removed, otherwise, in case that parameter is set to false the new latest value will not set.
 */
 ThingsboardPeRestApi.prototype.deleteEntityTimeseriesUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/timeseries/delete{?deleteAllDataForKeys,endTs,keys,rewriteLatestIfDeleted,startTs}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


        if(parameters['keys'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keys'));
            return deferred.promise;
        }
 

                if(parameters['deleteAllDataForKeys'] !== undefined){
                    queryParameters['deleteAllDataForKeys'] = parameters['deleteAllDataForKeys'];
                }
        
        
        


 

                if(parameters['startTs'] !== undefined){
                    queryParameters['startTs'] = parameters['startTs'];
                }
        
        
        


 

                if(parameters['endTs'] !== undefined){
                    queryParameters['endTs'] = parameters['endTs'];
                }
        
        
        


 

                if(parameters['rewriteLatestIfDeleted'] !== undefined){
                    queryParameters['rewriteLatestIfDeleted'] = parameters['rewriteLatestIfDeleted'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates the entity time-series data based on the Entity Id and request payload.The request payload is a JSON document with three possible formats:

Simple format without timestamp. In such a case, current server time will be used: 

```json
{"temperature": 26}
```

 Single JSON object with timestamp: 

```json
{"ts":1634712287000,"values":{"temperature":26, "humidity":87}}
```

 JSON array with timestamps: 

```json
[{"ts":1634712287000,"values":{"temperature":26, "humidity":87}}, {"ts":1634712588000,"values":{"temperature":25, "humidity":88}}]
```

 The scope parameter is not used in the API call implementation but should be specified whatever value because it is used as a path variable. 

The ttl parameter takes affect only in case of Cassandra DB.Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveEntityTelemetryWithTTLUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
    
     * @param {integer} parameters.ttl - A long value representing TTL (Time to Live) parameter.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityTelemetryWithTTLUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}/{ttl}?scope=ANY';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ttl}', parameters['ttl']);
        
        


        if(parameters['ttl'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ttl'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates the entity time-series data based on the Entity Id and request payload.The request payload is a JSON document with three possible formats:

Simple format without timestamp. In such a case, current server time will be used: 

```json
{"temperature": 26}
```

 Single JSON object with timestamp: 

```json
{"ts":1634712287000,"values":{"temperature":26, "humidity":87}}
```

 JSON array with timestamps: 

```json
[{"ts":1634712287000,"values":{"temperature":26, "humidity":87}}, {"ts":1634712588000,"values":{"temperature":25, "humidity":88}}]
```

 The scope parameter is not used in the API call implementation but should be specified whatever value because it is used as a path variable. Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveEntityTelemetryUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
    
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityTelemetryUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}?scope=ANY';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all attributes of a specified scope that belong to specified entity. List of possible attribute scopes depends on the entity type: 

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

Use optional 'keys' parameter to return specific attributes.
 Example of the result: 

```json
[
  {"key": "stringAttributeKey", "value": "value", "lastUpdateTs": 1609459200000},
  {"key": "booleanAttributeKey", "value": false, "lastUpdateTs": 1609459200001},
  {"key": "doubleAttributeKey", "value": 42.2, "lastUpdateTs": 1609459200002},
  {"key": "longKeyExample", "value": 73, "lastUpdateTs": 1609459200003},
  {"key": "jsonKeyExample",
    "value": {
      "someNumber": 42,
      "someArray": [1,2,3],
      "someNestedObject": {"key": "value"}
    },
    "lastUpdateTs": 1609459200004
  }
]
```

 Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getAttributesByScopeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {string} parameters.keys - A string value representing the comma-separated list of attributes keys. For example, 'active,inactivityAlarmTime'.
 */
 ThingsboardPeRestApi.prototype.getAttributesByScopeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/values/attributes/{scope}{?keys}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all attributes that belong to specified entity. Use optional 'keys' parameter to return specific attributes.
 Example of the result: 

```json
[
  {"key": "stringAttributeKey", "value": "value", "lastUpdateTs": 1609459200000},
  {"key": "booleanAttributeKey", "value": false, "lastUpdateTs": 1609459200001},
  {"key": "doubleAttributeKey", "value": 42.2, "lastUpdateTs": 1609459200002},
  {"key": "longKeyExample", "value": 73, "lastUpdateTs": 1609459200003},
  {"key": "jsonKeyExample",
    "value": {
      "someNumber": 42,
      "someArray": [1,2,3],
      "someNestedObject": {"key": "value"}
    },
    "lastUpdateTs": 1609459200004
  }
]
```

 Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getAttributesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.keys - A string value representing the comma-separated list of attributes keys. For example, 'active,inactivityAlarmTime'.
 */
 ThingsboardPeRestApi.prototype.getAttributesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/values/attributes{?keys}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a range of time-series values for specified entity. Returns not aggregated data by default. Use aggregation function ('agg') and aggregation interval ('interval') to enable aggregation of the results on the database / server side. The aggregation is generally more efficient then fetching all records. 

```json
{
  "temperature": [
    {
      "value": 36.7,
      "ts": 1609459200000
    },
    {
      "value": 36.6,
      "ts": 1609459201000
    }
  ]
}
```

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getTimeseriesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.keys - A string value representing the comma-separated list of telemetry keys.
     * @param {integer} parameters.startTs - A long value representing the start timestamp of the time range in milliseconds, UTC.
     * @param {integer} parameters.endTs - A long value representing the end timestamp of the time range in milliseconds, UTC.
     * @param {integer} parameters.interval - A long value representing the aggregation interval range in milliseconds.
     * @param {integer} parameters.limit - An integer value that represents a max number of timeseries data points to fetch. This parameter is used only in the case if 'agg' parameter is set to 'NONE'.
     * @param {string} parameters.agg - A string value representing the aggregation function. If the interval is not specified, 'agg' parameter will use 'NONE' value.
     * @param {string} parameters.orderBy - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
     * @param {boolean} parameters.useStrictDataTypes - Enables/disables conversion of telemetry values to strings. Conversion is enabled by default. Set parameter to 'true' in order to disable the conversion.
 */
 ThingsboardPeRestApi.prototype.getTimeseriesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/values/timeseries{?agg,endTs,interval,keys,limit,orderBy,startTs,useStrictDataTypes}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


        if(parameters['keys'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keys'));
            return deferred.promise;
        }
 

                if(parameters['startTs'] !== undefined){
                    queryParameters['startTs'] = parameters['startTs'];
                }
        
        
        


        if(parameters['startTs'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startTs'));
            return deferred.promise;
        }
 

                if(parameters['endTs'] !== undefined){
                    queryParameters['endTs'] = parameters['endTs'];
                }
        
        
        


        if(parameters['endTs'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endTs'));
            return deferred.promise;
        }
 

                if(parameters['interval'] !== undefined){
                    queryParameters['interval'] = parameters['interval'];
                }
        
        
        


 

                if(parameters['limit'] !== undefined){
                    queryParameters['limit'] = parameters['limit'];
                }
        
        
        


 

                if(parameters['agg'] !== undefined){
                    queryParameters['agg'] = parameters['agg'];
                }
        
        
        


 

                if(parameters['orderBy'] !== undefined){
                    queryParameters['orderBy'] = parameters['orderBy'];
                }
        
        
        


 

                if(parameters['useStrictDataTypes'] !== undefined){
                    queryParameters['useStrictDataTypes'] = parameters['useStrictDataTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns all time-series that belong to specified entity. Use optional 'keys' parameter to return specific time-series. The result is a JSON object. The format of the values depends on the 'useStrictDataTypes' parameter. By default, all time-series values are converted to strings: 

```json
{
  "stringTsKey": [{ "value": "value", "ts": 1609459200000}],
  "booleanTsKey": [{ "value": "false", "ts": 1609459200000}],
  "doubleTsKey": [{ "value": "42.2", "ts": 1609459200000}],
  "longTsKey": [{ "value": "73", "ts": 1609459200000}],
  "jsonTsKey": [{ "value": "{\"someNumber\": 42,\"someArray\": [1,2,3],\"someNestedObject\": {\"key\": \"value\"}}", "ts": 1609459200000}]
}

```

 However, it is possible to request the values without conversion ('useStrictDataTypes'=true): 

```json
{
  "stringTsKey": [{ "value": "value", "ts": 1609459200000}],
  "booleanTsKey": [{ "value": false, "ts": 1609459200000}],
  "doubleTsKey": [{ "value": 42.2, "ts": 1609459200000}],
  "longTsKey": [{ "value": 73, "ts": 1609459200000}],
  "jsonTsKey": [{ 
    "value": {
      "someNumber": 42,
      "someArray": [1,2,3],
      "someNestedObject": {"key": "value"}
    }, 
    "ts": 1609459200000}]
}

```

 Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#getLatestTimeseriesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.keys - A string value representing the comma-separated list of telemetry keys. If keys are not selected, the result will return all latest timeseries. For example, 'temperature,humidity'.
     * @param {boolean} parameters.useStrictDataTypes - Enables/disables conversion of telemetry values to strings. Conversion is enabled by default. Set parameter to 'true' in order to disable the conversion.
 */
 ThingsboardPeRestApi.prototype.getLatestTimeseriesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/values/timeseries{?keys,useStrictDataTypes}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


 

                if(parameters['useStrictDataTypes'] !== undefined){
                    queryParameters['useStrictDataTypes'] = parameters['useStrictDataTypes'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or updates the entity attributes based on Entity Id and the specified attribute scope.  List of possible attribute scopes depends on the entity type: 

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

The request payload is a JSON object with key-value format of attributes to create or update. For example:

```json
{
 "stringKey":"value1", 
 "booleanKey":true, 
 "doubleKey":42.0, 
 "longKey":73, 
 "jsonKey": {
    "someNumber": 42,
    "someArray": [1,2,3],
    "someNestedObject": {"key": "value"}
 }
}
```
Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#saveEntityAttributesV1UsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveEntityAttributesV1UsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/{scope}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity attributes using provided Entity Id, scope and a list of keys. Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteEntityAttributesUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityType - A string value representing the entity type. For example, 'DEVICE'
     * @param {string} parameters.entityId - A string value representing the entity id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {string} parameters.scope - A string value representing the attributes scope. For example, 'SERVER_SCOPE'.
     * @param {string} parameters.keys - A string value representing the comma-separated list of attributes keys. For example, 'active,inactivityAlarmTime'.
 */
 ThingsboardPeRestApi.prototype.deleteEntityAttributesUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/plugins/telemetry/{entityType}/{entityId}/{scope}{?keys}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityType}', parameters['entityType']);
        
        


        if(parameters['entityType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{entityId}', parameters['entityId']);
        
        


        if(parameters['entityId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{scope}', parameters['scope']);
        
        


        if(parameters['scope'] === undefined){
            deferred.reject(new Error('Missing required  parameter: scope'));
            return deferred.promise;
        }
 

                if(parameters['keys'] !== undefined){
                    queryParameters['keys'] = parameters['keys'];
                }
        
        
        


        if(parameters['keys'] === undefined){
            deferred.reject(new Error('Missing required  parameter: keys'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Tenant. When creating tenant, platform generates Tenant Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Default Rule Chain and Device profile are also generated for the new tenants automatically. The newly created Tenant Id will be present in the response. Specify existing Tenant Id id to update the Tenant. Referencing non-existing Tenant Id will cause 'Not Found' error.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveTenantUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveTenantUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Tenant Info object based on the provided Tenant Id. The Tenant Info object extends regular Tenant object and includes Tenant Profile name. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTenantInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/info/{tenantId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Tenant object based on the provided Tenant Id. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTenantByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/{tenantId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the tenant, it's customers, rule chains, devices and all other related entities. Referencing non-existing tenant Id will cause an error.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteTenantUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteTenantUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/{tenantId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of tenant info objects registered in the platform. The Tenant Info object extends regular Tenant object and includes Tenant Profile name. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantInfosUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the tenant name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantInfosUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantInfos{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of tenants registered in the platform. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the tenant name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenants{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * getTenantsByIds
 * @method
 * @name ThingsboardPeRestApi#getTenantsByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantIds - tenantIds
 */
 ThingsboardPeRestApi.prototype.getTenantsByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenants{?tenantIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['tenantIds'] !== undefined){
                    queryParameters['tenantIds'] = parameters['tenantIds'];
                }
        
        
        


        if(parameters['tenantIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Tenant Profile. When creating tenant profile, platform generates Tenant Profile Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Tenant Profile Id will be present in the response. Specify existing Tenant Profile Id id to update the Tenant Profile. Referencing non-existing Tenant Profile Id will cause 'Not Found' error. 

Update of the tenant profile configuration will cause immediate recalculation of API limits for all affected Tenants. 

The **'profileData'** object is the part of Tenant Profile that defines API limits and Rate limits. 

You have an ability to define maximum number of devices ('maxDevice'), assets ('maxAssets') and other entities. You may also define maximum number of messages to be processed per month ('maxTransportMessages', 'maxREExecutions', etc). The '*RateLimit' defines the rate limits using simple syntax. For example, '1000:1,20000:60' means up to 1000 events per second but no more than 20000 event per minute. Let's review the example of tenant profile data below: 

```json
{
  "name": "Default",
  "description": "Default tenant profile",
  "isolatedTbCore": false,
  "isolatedTbRuleEngine": false,
  "profileData": {
    "configuration": {
      "type": "DEFAULT",
      "maxDevices": 0,
      "maxAssets": 0,
      "maxCustomers": 0,
      "maxUsers": 0,
      "maxDashboards": 0,
      "maxRuleChains": 0,
      "maxResourcesInBytes": 0,
      "maxOtaPackagesInBytes": 0,
      "transportTenantMsgRateLimit": "1000:1,20000:60",
      "transportTenantTelemetryMsgRateLimit": "1000:1,20000:60",
      "transportTenantTelemetryDataPointsRateLimit": "1000:1,20000:60",
      "transportDeviceMsgRateLimit": "20:1,600:60",
      "transportDeviceTelemetryMsgRateLimit": "20:1,600:60",
      "transportDeviceTelemetryDataPointsRateLimit": "20:1,600:60",
      "maxTransportMessages": 10000000,
      "maxTransportDataPoints": 10000000,
      "maxREExecutions": 4000000,
      "maxJSExecutions": 5000000,
      "maxDPStorageDays": 0,
      "maxRuleNodeExecutionsPerMessage": 50,
      "maxEmails": 0,
      "maxSms": 0,
      "maxCreatedAlarms": 1000,
      "defaultStorageTtlDays": 0,
      "alarmsTtlDays": 0,
      "rpcTtlDays": 0,
      "warnThreshold": 0
    }
  },
  "default": true
}
```

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveTenantProfileUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveTenantProfileUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfile';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Tenant Profile object based on the provided Tenant Profile Id. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantProfileByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantProfileId - A string value representing the tenant profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTenantProfileByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfile/{tenantProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantProfileId}', parameters['tenantProfileId']);
        
        


        if(parameters['tenantProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the tenant profile. Referencing non-existing tenant profile Id will cause an error. Referencing profile that is used by the tenants will cause an error. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteTenantProfileUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantProfileId - A string value representing the tenant profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteTenantProfileUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfile/{tenantProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantProfileId}', parameters['tenantProfileId']);
        
        


        if(parameters['tenantProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Makes specified tenant profile to be default. Referencing non-existing tenant profile Id will cause an error. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#setDefaultTenantProfileUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantProfileId - A string value representing the tenant profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.setDefaultTenantProfileUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfile/{tenantProfileId}/default';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantProfileId}', parameters['tenantProfileId']);
        
        


        if(parameters['tenantProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the default Tenant Profile Info object based. Tenant Profile Info is a lightweight object that contains only id and name of the profile. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getDefaultTenantProfileInfoUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getDefaultTenantProfileInfoUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfileInfo/default';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Tenant Profile Info object based on the provided Tenant Profile Id. Tenant Profile Info is a lightweight object that contains only id and name of the profile. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantProfileInfoByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantProfileId - A string value representing the tenant profile id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getTenantProfileInfoByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfileInfo/{tenantProfileId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantProfileId}', parameters['tenantProfileId']);
        
        


        if(parameters['tenantProfileId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantProfileId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of tenant profile info objects registered in the platform. Tenant Profile Info is a lightweight object that contains only id and name of the profile. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantProfileInfosUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the tenant profile name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantProfileInfosUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfileInfos{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of tenant profiles registered in the platform. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getTenantProfilesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the tenant profile name.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantProfilesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenantProfiles{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get UI help base url used to fetch help assets. The actual value of the base url is configurable in the system configuration file.
 * @method
 * @name ThingsboardPeRestApi#getHelpBaseUrlUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getHelpBaseUrlUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/uiSettings/helpBaseUrl';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of users for the current tenant with authority 'CUSTOMER_USER'. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAllCustomerUsersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the user email.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getAllCustomerUsersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/users{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of users owned by customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getCustomerUsersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.customerId - A string value representing the customer id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the user email.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getCustomerUsersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/customer/{customerId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{customerId}', parameters['customerId']);
        
        


        if(parameters['customerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: customerId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of user objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.
 * @method
 * @name ThingsboardPeRestApi#getUsersByEntityGroupIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.entityGroupId - A string value representing the Entity Group Id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the user email.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUsersByEntityGroupIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/entityGroup/{entityGroupId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{entityGroupId}', parameters['entityGroupId']);
        
        


        if(parameters['entityGroupId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: entityGroupId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of users owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getTenantAdminsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tenantId - A string value representing the tenant id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the user email.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getTenantAdminsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/{tenantId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tenantId}', parameters['tenantId']);
        
        


        if(parameters['tenantId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tenantId'));
            return deferred.promise;
        }
 

                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Force send the activation email to the user. Useful to resend the email if user has accidentally deleted it.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#sendActivationEmailUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.email - Email of the user
 */
 ThingsboardPeRestApi.prototype.sendActivationEmailUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/sendActivationMail{?email}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['email'] !== undefined){
                    queryParameters['email'] = parameters['email'];
                }
        
        
        


        if(parameters['email'] === undefined){
            deferred.reject(new Error('Missing required  parameter: email'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Checks that the system is configured to allow administrators to impersonate themself as other users. If the user who performs the request has the authority of 'SYS_ADMIN', it is possible to login as any tenant administrator. If the user who performs the request has the authority of 'TENANT_ADMIN', it is possible to login as any customer user.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#isUserTokenAccessEnabledUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.isUserTokenAccessEnabledUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/tokenAccessEnabled';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of user objects available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserUsersUsingGET
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the user email.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getUserUsersUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/users{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the User object based on the provided User Id. If the user has the authority of 'SYS_ADMIN', the server does not perform additional checks. If the user has the authority of 'TENANT_ADMIN', the server checks that the requested user is owned by the same tenant. If the user has the authority of 'CUSTOMER_USER', the server checks that the requested user is owned by the same customer.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUserByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getUserByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/{userId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the User, it's credentials and all the relations (from and to the User). Referencing non-existing User Id will cause an error. 

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#deleteUserUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteUserUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/{userId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the activation link for the user. The base url for activation link is configurable in the general settings of system administrator. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getActivationLinkUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getActivationLinkUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/{userId}/activationLink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns the token of the User based on the provided User Id. If the user who performs the request has the authority of 'SYS_ADMIN', it is possible to get the token of any tenant administrator. If the user who performs the request has the authority of 'TENANT_ADMIN', it is possible to get the token of any customer user that belongs to the same tenant. 
 * @method
 * @name ThingsboardPeRestApi#getUserTokenUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getUserTokenUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/{userId}/token';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Enables or Disables user credentials. Useful when you would like to block user account without deleting it. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#setUserCredentialsEnabledUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - A string value representing the user id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
     * @param {boolean} parameters.userCredentialsEnabled - Disable ("true") or enable ("false") the credentials.
 */
 ThingsboardPeRestApi.prototype.setUserCredentialsEnabledUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user/{userId}/userCredentialsEnabled{?userCredentialsEnabled}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 

                if(parameters['userCredentialsEnabled'] !== undefined){
                    queryParameters['userCredentialsEnabled'] = parameters['userCredentialsEnabled'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Requested users must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getUsersByIdsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userIds - A list of user ids, separated by comma ','
 */
 ThingsboardPeRestApi.prototype.getUsersByIdsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/users{?userIds}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['userIds'] !== undefined){
                    queryParameters['userIds'] = parameters['userIds'];
                }
        
        
        


        if(parameters['userIds'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userIds'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the User. When creating user, platform generates User Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created User Id will be present in the response. Specify existing User Id to update the device. Referencing non-existing User Id will cause 'Not Found' error.

Device email is unique for entire platform setup.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#saveUserUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.sendActivationMail - Send activation email (or use activation link)
     * @param {string} parameters.entityGroupId - entityGroupId
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveUserUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/user{?entityGroupId,sendActivationMail}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];


                if(parameters['sendActivationMail'] !== undefined){
                    queryParameters['sendActivationMail'] = parameters['sendActivationMail'];
                }
        
        
        


 

                if(parameters['entityGroupId'] !== undefined){
                    queryParameters['entityGroupId'] = parameters['entityGroupId'];
                }
        
        
        


 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a complex object that describes:

 * all possible (both granted and not granted) permissions for the authority of the user (Tenant or Customer);
 * all granted permissions for the user;

 The result impacts UI behavior and hides certain UI elements if user has no permissions to invoke the related operations. Nevertheless, all API calls check the permissions each time they are executed on the server side.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).
 * @method
 * @name ThingsboardPeRestApi#getAllowedPermissionsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getAllowedPermissionsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/permissions/allowedPermissions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns login white-labeling parameters based on the hostname from request.
 * @method
 * @name ThingsboardPeRestApi#getLoginWhiteLabelParamsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.logoImageChecksum - Logo image checksum. Expects value from the browser cache to compare it with the value from settings. If value matches, the 'logoImageUrl' will be null.
     * @param {string} parameters.faviconChecksum - Favicon image checksum. Expects value from the browser cache to compare it with the value from settings. If value matches, the 'faviconImageUrl' will be null.
 */
 ThingsboardPeRestApi.prototype.getLoginWhiteLabelParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/noauth/whiteLabel/loginWhiteLabelParams{?faviconChecksum,logoImageChecksum}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];


                if(parameters['logoImageChecksum'] !== undefined){
                    queryParameters['logoImageChecksum'] = parameters['logoImageChecksum'];
                }
        
        
        


        if(parameters['logoImageChecksum'] === undefined){
            deferred.reject(new Error('Missing required  parameter: logoImageChecksum'));
            return deferred.promise;
        }
 

                if(parameters['faviconChecksum'] !== undefined){
                    queryParameters['faviconChecksum'] = parameters['faviconChecksum'];
                }
        
        
        


        if(parameters['faviconChecksum'] === undefined){
            deferred.reject(new Error('Missing required  parameter: faviconChecksum'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * tenantWhiteLabelingAllowed
 * @method
 * @name ThingsboardPeRestApi#tenantWhiteLabelingAllowedUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.tenantWhiteLabelingAllowedUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/tenant/whiteLabelingAllowed';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the Login  White Labeling configuration that corresponds to the authority of the user. The API call is designed to load the Login White Labeling configuration for edition. So, the result is NOT merged with the parent level White Labeling configuration. Let's assume there is a custom White Labeling  configured on a system level. And there is no custom White Labeling  items configured on a tenant level. In such a case, the API call will return default object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getCurrentLoginWhiteLabelParamsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCurrentLoginWhiteLabelParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/currentLoginWhiteLabelParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Fetch the White Labeling configuration that corresponds to the authority of the user. The API call is designed to load the White Labeling configuration for edition. So, the result is NOT merged with the parent level White Labeling configuration. Let's assume there is a custom White Labeling  configured on a system level. And there is no custom White Labeling  items configured on a tenant level. In such a case, the API call will return default object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#getCurrentWhiteLabelParamsUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getCurrentWhiteLabelParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/currentWhiteLabelParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Check if the White Labeling is enabled for the customers of the current tenant

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

Available for users with 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#isCustomerWhiteLabelingAllowedUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.isCustomerWhiteLabelingAllowedUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/isCustomerWhiteLabelingAllowed';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Check if the White Labeling is enabled for the current user owner (tenant or customer)

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.
 * @method
 * @name ThingsboardPeRestApi#isWhiteLabelingAllowedUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.isWhiteLabelingAllowedUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/isWhiteLabelingAllowed';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the White Labeling configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#saveLoginWhiteLabelParamsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveLoginWhiteLabelParamsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/loginWhiteLabelParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Merge the White Labeling configuration with the parent configuration and return the result.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#previewWhiteLabelParamsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.previewWhiteLabelParamsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/previewWhiteLabelParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the White Labeling configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.
 * @method
 * @name ThingsboardPeRestApi#saveWhiteLabelParamsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveWhiteLabelParamsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/whiteLabelParams';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns white-labeling parameters for the current user.
 * @method
 * @name ThingsboardPeRestApi#getWhiteLabelParamsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.logoImageChecksum - Logo image checksum. Expects value from the browser cache to compare it with the value from settings. If value matches, the 'logoImageUrl' will be null.
     * @param {string} parameters.faviconChecksum - Favicon image checksum. Expects value from the browser cache to compare it with the value from settings. If value matches, the 'faviconImageUrl' will be null.
 */
 ThingsboardPeRestApi.prototype.getWhiteLabelParamsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/whiteLabel/whiteLabelParams{?faviconChecksum,logoImageChecksum}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['logoImageChecksum'] !== undefined){
                    queryParameters['logoImageChecksum'] = parameters['logoImageChecksum'];
                }
        
        
        


        if(parameters['logoImageChecksum'] === undefined){
            deferred.reject(new Error('Missing required  parameter: logoImageChecksum'));
            return deferred.promise;
        }
 

                if(parameters['faviconChecksum'] !== undefined){
                    queryParameters['faviconChecksum'] = parameters['faviconChecksum'];
                }
        
        
        


        if(parameters['faviconChecksum'] === undefined){
            deferred.reject(new Error('Missing required  parameter: faviconChecksum'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Widget Type. Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory. When creating the Widget Type, platform generates Widget Type Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Widget Type Id will be present in the response. Specify existing Widget Type id to update the Widget Type. Referencing non-existing Widget Type Id will cause 'Not Found' error.

Widget Type alias is unique in the scope of Widget Bundle. Special Tenant Id '13814000-1dd2-11b2-8080-808080808080' is automatically used if the create request is sent by user with 'SYS_ADMIN' authority.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveWidgetTypeUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveWidgetTypeUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetType';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Widget Type Details based on the provided Widget Type Id. Widget Type Details extend Widget Type and add image and description properties. Those properties are useful to edit the Widget Type but they are not required for Dashboard rendering. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getWidgetTypeByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.widgetTypeId - A string value representing the widget type id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getWidgetTypeByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetType/{widgetTypeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{widgetTypeId}', parameters['widgetTypeId']);
        
        


        if(parameters['widgetTypeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: widgetTypeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the  Widget Type. Referencing non-existing Widget Type Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteWidgetTypeUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.widgetTypeId - A string value representing the widget type id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteWidgetTypeUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetType/{widgetTypeId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{widgetTypeId}', parameters['widgetTypeId']);
        
        


        if(parameters['widgetTypeId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: widgetTypeId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns an array of Widget Type Details objects that belong to specified Widget Bundle.Widget Type Details extend Widget Type and add image and description properties. Those properties are useful to edit the Widget Type but they are not required for Dashboard rendering.  

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getBundleWidgetTypesDetailsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.isSystem - System or Tenant
     * @param {string} parameters.bundleAlias - Widget Bundle alias
 */
 ThingsboardPeRestApi.prototype.getBundleWidgetTypesDetailsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetTypesDetails{?bundleAlias,isSystem}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['isSystem'] !== undefined){
                    queryParameters['isSystem'] = parameters['isSystem'];
                }
        
        
        


        if(parameters['isSystem'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isSystem'));
            return deferred.promise;
        }
 

                if(parameters['bundleAlias'] !== undefined){
                    queryParameters['bundleAlias'] = parameters['bundleAlias'];
                }
        
        
        


        if(parameters['bundleAlias'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bundleAlias'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Widget Type Info objects based on the provided parameters. Widget Type Info is a lightweight object that represents Widget Type but does not contain the heavyweight widget descriptor JSON

Available for any authorized user. 
 * @method
 * @name ThingsboardPeRestApi#getBundleWidgetTypesInfosUsingGET
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.isSystem - System or Tenant
     * @param {string} parameters.bundleAlias - Widget Bundle alias
 */
 ThingsboardPeRestApi.prototype.getBundleWidgetTypesInfosUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetTypesInfos{?bundleAlias,isSystem}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['isSystem'] !== undefined){
                    queryParameters['isSystem'] = parameters['isSystem'];
                }
        
        
        


        if(parameters['isSystem'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isSystem'));
            return deferred.promise;
        }
 

                if(parameters['bundleAlias'] !== undefined){
                    queryParameters['bundleAlias'] = parameters['bundleAlias'];
                }
        
        
        


        if(parameters['bundleAlias'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bundleAlias'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns an array of Widget Type objects that belong to specified Widget Bundle.Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#getBundleWidgetTypesUsingGET
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.isSystem - System or Tenant
     * @param {string} parameters.bundleAlias - Widget Bundle alias
 */
 ThingsboardPeRestApi.prototype.getBundleWidgetTypesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetTypes{?bundleAlias,isSystem}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['isSystem'] !== undefined){
                    queryParameters['isSystem'] = parameters['isSystem'];
                }
        
        
        


        if(parameters['isSystem'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isSystem'));
            return deferred.promise;
        }
 

                if(parameters['bundleAlias'] !== undefined){
                    queryParameters['bundleAlias'] = parameters['bundleAlias'];
                }
        
        
        


        if(parameters['bundleAlias'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bundleAlias'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Widget Type based on the provided parameters. Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory.

Available for any authorized user. 
 * @method
 * @name ThingsboardPeRestApi#getWidgetTypeUsingGET
 * @param {object} parameters - method options and parameters
     * @param {boolean} parameters.isSystem - System or Tenant
     * @param {string} parameters.bundleAlias - Widget Bundle alias
     * @param {string} parameters.alias - Widget Type alias
 */
 ThingsboardPeRestApi.prototype.getWidgetTypeUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetType{?alias,bundleAlias,isSystem}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['isSystem'] !== undefined){
                    queryParameters['isSystem'] = parameters['isSystem'];
                }
        
        
        


        if(parameters['isSystem'] === undefined){
            deferred.reject(new Error('Missing required  parameter: isSystem'));
            return deferred.promise;
        }
 

                if(parameters['bundleAlias'] !== undefined){
                    queryParameters['bundleAlias'] = parameters['bundleAlias'];
                }
        
        
        


        if(parameters['bundleAlias'] === undefined){
            deferred.reject(new Error('Missing required  parameter: bundleAlias'));
            return deferred.promise;
        }
 

                if(parameters['alias'] !== undefined){
                    queryParameters['alias'] = parameters['alias'];
                }
        
        
        


        if(parameters['alias'] === undefined){
            deferred.reject(new Error('Missing required  parameter: alias'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create or update the Widget Bundle. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  When creating the bundle, platform generates Widget Bundle Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Widget Bundle Id will be present in the response. Specify existing Widget Bundle id to update the Widget Bundle. Referencing non-existing Widget Bundle Id will cause 'Not Found' error.

Widget Bundle alias is unique in the scope of tenant. Special Tenant Id '13814000-1dd2-11b2-8080-808080808080' is automatically used if the create bundle request is sent by user with 'SYS_ADMIN' authority.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#saveWidgetsBundleUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard Professional Edition IoT platform REST API documentation.
 */
 ThingsboardPeRestApi.prototype.saveWidgetsBundleUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetsBundle';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Widget Bundle based on the provided Widget Bundle Id. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case. 

Available for any authorized user. 
 * @method
 * @name ThingsboardPeRestApi#getWidgetsBundleByIdUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.widgetsBundleId - A string value representing the widget bundle id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.getWidgetsBundleByIdUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetsBundle/{widgetsBundleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{widgetsBundleId}', parameters['widgetsBundleId']);
        
        


        if(parameters['widgetsBundleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: widgetsBundleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Deletes the widget bundle. Referencing non-existing Widget Bundle Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.
 * @method
 * @name ThingsboardPeRestApi#deleteWidgetsBundleUsingDELETE
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.widgetsBundleId - A string value representing the widget bundle id. For example, '784f394c-42b6-435a-983c-b7beff2784f9'
 */
 ThingsboardPeRestApi.prototype.deleteWidgetsBundleUsingDELETE = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetsBundle/{widgetsBundleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{widgetsBundleId}', parameters['widgetsBundleId']);
        
        


        if(parameters['widgetsBundleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: widgetsBundleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns an array of Widget Bundle objects that are available for current user.Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  

Available for any authorized user. 
 * @method
 * @name ThingsboardPeRestApi#getWidgetsBundlesUsingGET
 * @param {object} parameters - method options and parameters
 */
 ThingsboardPeRestApi.prototype.getWidgetsBundlesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetsBundles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Returns a page of Widget Bundle objects available for current user. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for any authorized user. 
 * @method
 * @name ThingsboardPeRestApi#getWidgetsBundlesUsingGET_1
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.pageSize - Maximum amount of entities in a one page
     * @param {integer} parameters.page - Sequence number of page starting from 0
     * @param {string} parameters.textSearch - The case insensitive 'substring' filter based on the widget bundle title.
     * @param {string} parameters.sortProperty - Property of entity to sort by
     * @param {string} parameters.sortOrder - Sort order. ASC (ASCENDING) or DESC (DESCENDING)
 */
 ThingsboardPeRestApi.prototype.getWidgetsBundlesUsingGET_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/widgetsBundles{?page,pageSize,sortOrder,sortProperty,textSearch}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['pageSize'] !== undefined){
                    queryParameters['pageSize'] = parameters['pageSize'];
                }
        
        
        


        if(parameters['pageSize'] === undefined){
            deferred.reject(new Error('Missing required  parameter: pageSize'));
            return deferred.promise;
        }
 

                if(parameters['page'] !== undefined){
                    queryParameters['page'] = parameters['page'];
                }
        
        
        


        if(parameters['page'] === undefined){
            deferred.reject(new Error('Missing required  parameter: page'));
            return deferred.promise;
        }
 

                if(parameters['textSearch'] !== undefined){
                    queryParameters['textSearch'] = parameters['textSearch'];
                }
        
        
        


 

                if(parameters['sortProperty'] !== undefined){
                    queryParameters['sortProperty'] = parameters['sortProperty'];
                }
        
        
        


 

                if(parameters['sortOrder'] !== undefined){
                    queryParameters['sortOrder'] = parameters['sortOrder'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return ThingsboardPeRestApi;
})();

exports.ThingsboardPeRestApi = ThingsboardPeRestApi;
