node-red-contrib-thingsboard-pe-rest-api
================

Node-RED node for thingsboard-pe-rest-api

 ThingsBoard Professional Edition IoT platform REST API documentation.

## Install

To install the stable version use the `Menu - Manage palette - Install` 
option and search for node-red-contrib-thingsboard-pe-rest-api, or run the following 
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-thingsboard-pe-rest-api

## Usage

### Methods

#### GET /api/admin/securitySettings

Get the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

     
    Accept : 'application/json'

#### POST /api/admin/securitySettings

Updates the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings

Creates or Updates the Administration Settings. Platform generates random Administration Settings Id during settings creation. The Administration Settings Id will be present in the response. Specify the Administration Settings Id when you would like to update the Administration Settings. Referencing non-existing Administration Settings Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings/testMail

Attempts to send test email using Mail Settings provided as a parameter. Email is sent to the address specified in the profile of user who is performing the requestYou may change the 'To' email in the user profile of the System/Tenant Administrator. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings/testSms

Attempts to send test sms to the System Administrator User using SMS Settings and phone number provided as a parameters of the request. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/admin/settings/{key}{?systemByDefault}

Get the Administration Settings object using specified string key. Referencing non-existing key will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the 'ADMIN_SETTINGS' (for 'SYS_ADMIN' authority) or 'WHITE_LABELING' (for 'TENANT_ADMIN' authority) resource.

    key : string
    systemByDefault : boolean
     
    Accept : 'application/json'

#### GET /api/admin/updates

Check notifications about new platform releases. 

Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'

#### POST /api/auth/login

Login method used to authenticate user and get JWT token data.

Value of the response **token** field can be used as **X-Authorization** header value:

`X-Authorization: Bearer $JWT_TOKEN_VALUE`.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/alarm

Creates or Updates the Alarm. When creating alarm, platform generates Alarm Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Alarm id will be present in the response. Specify existing Alarm id to update the alarm. Referencing non-existing Alarm Id will cause 'Not Found' error. 

Platform also deduplicate the alarms based on the entity id of originator and alarm 'type'. For example, if the user or system component create the alarm with the type 'HighTemperature' for device 'Device A' the new active alarm is created. If the user tries to create 'HighTemperature' alarm for the same device again, the previous alarm will be updated (the 'end_ts' will be set to current timestamp). If the user clears the alarm (see 'Clear Alarm(clearAlarm)'), than new alarm with the same type and same device may be created. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/alarm/highestSeverity/{entityType}/{entityId}{?searchStatus,status}

Search the alarms by originator ('entityType' and entityId') and optional 'status' or 'searchStatus' filters and returns the highest AlarmSeverity(CRITICAL, MAJOR, MINOR, WARNING or INDETERMINATE). Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityType : string
    entityId : string
    searchStatus : string
    status : string
     
    Accept : 'application/json'

#### GET /api/alarm/info/{alarmId}

Fetch the Alarm Info object based on the provided Alarm Id. Alarm Info is an extension of the default Alarm object that also contains name of the alarm originator.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    alarmId : string
     
    Accept : 'application/json'

#### GET /api/alarm/{alarmId}

Fetch the Alarm object based on the provided Alarm Id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    alarmId : string
     
    Accept : 'application/json'

#### DELETE /api/alarm/{alarmId}

Deletes the Alarm. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    alarmId : string
     
    Accept : 'application/json'

#### POST /api/alarm/{alarmId}/ack

Acknowledge the Alarm. Once acknowledged, the 'ack_ts' field will be set to current timestamp and special rule chain event 'ALARM_ACK' will be generated. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    alarmId : string
     
    Accept : 'application/json'

#### POST /api/alarm/{alarmId}/clear

Clear the Alarm. Once cleared, the 'clear_ts' field will be set to current timestamp and special rule chain event 'ALARM_CLEAR' will be generated. Referencing non-existing Alarm Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    alarmId : string
     
    Accept : 'application/json'

#### GET /api/alarm/{entityType}/{entityId}{?endTime,fetchOriginator,page,pageSize,searchStatus,sortOrder,sortProperty,startTime,status,textSearch}

Returns a page of alarms for the selected entity. Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityType : string
    entityId : string
    searchStatus : string
    status : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    fetchOriginator : boolean
     
    Accept : 'application/json'

#### GET /api/alarms{?endTime,fetchOriginator,page,pageSize,searchStatus,sortOrder,sortProperty,startTime,status,textSearch}

Returns a page of alarms that belongs to the current user owner. If the user has the authority of 'Tenant Administrator', the server returns alarms that belongs to the tenant of current user. If the user has the authority of 'Customer User', the server returns alarms that belongs to the customer of current user. Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    searchStatus : string
    status : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    fetchOriginator : boolean
     
    Accept : 'application/json'

#### POST /api/asset/bulk_import

There's an ability to import the bulk of assets using the only .csv file.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/asset/types

Returns a set of unique asset types based on assets that are either owned by the tenant or assigned to the customer which user is performing the request.

     
    Accept : 'application/json'

#### GET /api/asset/{assetId}

Fetch the Asset object based on the provided Asset Id. If the user has the authority of 'Tenant Administrator', the server checks that the asset is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the asset is assigned to the same customer.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    assetId : string
     
    Accept : 'application/json'

#### DELETE /api/asset/{assetId}

Deletes the asset and all the relations (from and to the asset). Referencing non-existing asset Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    assetId : string
     
    Accept : 'application/json'

#### POST /api/assets

Returns all assets that are related to the specific entity. The entity id, relation type, asset types, depth of the search, and other query parameters defined using complex 'AssetSearchQuery' object. See 'Model' tab of the Parameters for more info. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/assets{?assetIds}

Requested assets must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    assetIds : string
     
    Accept : 'application/json'

#### POST /api/asset{?entityGroupId}

Creates or Updates the Asset. When creating asset, platform generates Asset Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Asset id will be present in the response. Specify existing Asset id to update the asset. Referencing non-existing Asset Id will cause 'Not Found' error.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/customer/{customerId}/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of assets objects owned by customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/assets{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of asset objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/assets{?assetName}

Requested asset must be owned by tenant that the user belongs to. Asset name is an unique property of asset. So it can be used to identify the asset.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    assetName : string
     
    Accept : 'application/json'

#### GET /api/tenant/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of assets owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/user/assets{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of assets objects available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Asset Info is an extension of the default Asset object that contains information about the assigned customer name. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/audit/logs/customer/{customerId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}

Returns a page of audit logs related to the targeted customer entities (devices, assets, etc.), and users actions (login, logout, etc.) that belong to this customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.

    customerId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    actionTypes : string
     
    Accept : 'application/json'

#### GET /api/audit/logs/entity/{entityType}/{entityId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}

Returns a page of audit logs related to the actions on the targeted entity. Basically, this API call is used to get the full lifecycle of some specific entity. For example to see when a device was created, updated, assigned to some customer, or even deleted from the system. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.

    entityType : string
    entityId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    actionTypes : string
     
    Accept : 'application/json'

#### GET /api/audit/logs/user/{userId}{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}

Returns a page of audit logs related to the actions of targeted user. For example, RPC call to a particular device, or alarm acknowledgment for a specific device, etc. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.

    userId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    actionTypes : string
     
    Accept : 'application/json'

#### GET /api/audit/logs{?actionTypes,endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}

Returns a page of audit logs related to all entities in the scope of the current user's Tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the audit logs.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    actionTypes : string
     
    Accept : 'application/json'

#### POST /api/auth/changePassword

Change the password for the User which credentials are used to perform this REST API call. Be aware that previously generated [JWT](https://jwt.io/) tokens will be still valid until they expire.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/auth/logout

Special API call to record the 'logout' of the user to the Audit Logs. Since platform uses [JWT](https://jwt.io/), the actual logout is the procedure of clearing the [JWT](https://jwt.io/) token on the client side. 

     
    Accept : 'application/json'

#### GET /api/auth/user

Get the information about the User which credentials are used to perform this REST API call.

     
    Accept : 'application/json'

#### GET /api/noauth/activate{?activateToken}

Checks the activation token and forwards user to 'Create Password' page. If token is valid, returns '303 See Other' (redirect) response code with the correct address of 'Create Password' page and same 'activateToken' specified in the URL parameters. If token is not valid, returns '409 Conflict'.

    activateToken : string
     
    Accept : 'application/json'

#### POST /api/noauth/activate{?sendActivationMail}

Checks the activation token and updates corresponding user password in the database. Now the user may start using his password to login. The response already contains the [JWT](https://jwt.io) activation and refresh tokens, to simplify the user activation flow and avoid asking user to input password again after activation. If token is valid, returns the object that contains [JWT](https://jwt.io/) access and refresh tokens. If token is not valid, returns '404 Bad Request'.

    sendActivationMail : boolean
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/noauth/resetPassword

Checks the password reset token and updates the password. If token is valid, returns the object that contains [JWT](https://jwt.io/) access and refresh tokens. If token is not valid, returns '404 Bad Request'.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/noauth/resetPasswordByEmail

Request to send the reset password email if the user with specified email address is present in the database. Always return '200 OK' status for security purposes.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/noauth/resetPassword{?resetToken}

Checks the password reset token and forwards user to 'Reset Password' page. If token is valid, returns '303 See Other' (redirect) response code with the correct address of 'Reset Password' page and same 'resetToken' specified in the URL parameters. If token is not valid, returns '409 Conflict'.

    resetToken : string
     
    Accept : 'application/json'

#### GET /api/noauth/userPasswordPolicy

API call to get the password policy for the password validation form(s).

     
    Accept : 'application/json'

#### GET /api/blobEntities{?blobEntityIds}

Requested blob entities must be owned by tenant or assigned to customer which user is performing the request. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.). See the 'Model' tab of the Response Class for more details.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    blobEntityIds : string
     
    Accept : 'application/json'

#### GET /api/blobEntities{?endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch,type}

Returns a page of BlobEntityWithCustomerInfo object that are available for the current user. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityWithCustomerInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.) and info about the customer(customerTitle, customerIsPublic) of the user that scheduled generation of the dashboard report. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
     
    Accept : 'application/json'

#### GET /api/blobEntity/info/{blobEntityId}

Fetch the BlobEntityWithCustomerInfo object based on the provided Blob entity Id. The platform uses Blob(binary large object) entities in the reporting feature, in order to store Dashboard states snapshots of different content types in base64 format. BlobEntityWithCustomerInfo represents an object that contains base info about the blob entity(name, type, contentType, etc.) and info about the customer(customerTitle, customerIsPublic) of the user that scheduled generation of the dashboard report. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    blobEntityId : string
     
    Accept : 'application/json'

#### DELETE /api/blobEntity/{blobEntityId}

Delete Blob entity based on the provided Blob entity Id. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    blobEntityId : string
     
    Accept : 'application/json'

#### GET /api/blobEntity/{blobEntityId}/download

Download report file based on the provided Blob entity Id. Referencing non-existing Blob entity Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    blobEntityId : string
     
    Accept : 'application/json'

#### GET /api/component/{componentDescriptorClazz}

Gets the Component Descriptor object using class name from the path parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    componentDescriptorClazz : string
     
    Accept : 'application/json'

#### GET /api/components/{componentType}{?ruleChainType}

Gets the Component Descriptors using rule node type and optional rule chain type request parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    componentType : string
    ruleChainType : string
     
    Accept : 'application/json'

#### GET /api/components{?componentTypes,ruleChainType}

Gets the Component Descriptors using coma separated list of rule node types and optional rule chain type request parameters. Each Component Descriptor represents configuration of specific rule node (e.g. 'Save Timeseries' or 'Send Email'.). The Component Descriptors are used by the rule chain Web UI to build the configuration forms for the rule nodes. The Component Descriptors are discovered at runtime by scanning the class path and searching for @RuleNode annotation. Once discovered, the up to date list of descriptors is persisted to the database.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    componentTypes : string
    ruleChainType : string
     
    Accept : 'application/json'

#### POST /api/converter

Create or update the Converter. When creating converter, platform generates Converter Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created converter id will be present in the response. Specify existing Converter id to update the converter. Referencing non-existing converter Id will cause 'Not Found' error. Converter name is unique in the scope of tenant. 

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/converter/testDownLink

Returns a JSON object representing the result of the processed incoming message. 

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


    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/converter/testUpLink

Returns a JSON object representing the result of the processed incoming message. 

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


    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/converter/{converterId}

Fetch the Converter object based on the provided Converter Id. The server checks that the converter is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    converterId : string
     
    Accept : 'application/json'

#### DELETE /api/converter/{converterId}

Deletes the converter and all the relations (from and to the converter). Referencing non-existing converter Id will cause an error. If the converter is associated with the integration, it will not be allowed for deletion.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    converterId : string
     
    Accept : 'application/json'

#### GET /api/converter/{converterId}/debugIn

Returns a JSON object of the latest debug event representing the input message the converter processed. 

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

    converterId : string
     
    Accept : 'application/json'

#### GET /api/converters{?converterIds}

Requested converters must be owned by tenant which is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    converterIds : string
     
    Accept : 'application/json'

#### GET /api/converters{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of converters owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/customMenu/currentCustomMenu

Fetch the Custom Menu object that corresponds to the authority of the user. The API call is designed to load the custom menu items for edition. So, the result is NOT merged with the parent level configuration. Let's assume there is a custom menu configured on a system level. And there is no custom menu items configured on a tenant level. In such a case, the API call will return empty object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### GET /api/customMenu/customMenu

Fetch the Custom Menu object for the end user. The custom menu is configured in the white labeling parameters. If custom menu configuration on the tenant level is present, it overrides the menu configuration of the system level. Similar, if the custom menu configuration on the customer level is present, it overrides the menu configuration of the tenant level.

     
    Accept : 'application/json'

#### POST /api/customMenu/customMenu

Creates or Updates the Custom Menu configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/customTranslation/currentCustomTranslation

Fetch the Custom Translation map that corresponds to the authority of the user. The API call is designed to load the custom translation items for edition. So, the result is NOT merged with the parent level configuration. Let's assume there is a custom translation configured on a system level. And there is no custom translation items configured on a tenant level. In such a case, the API call will return empty object for the tenant administrator. 

 Response example: 

```json
{"translationMap":{"es_ES":"{\"home\":\"MyHome\"}"}}
```

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### GET /api/customTranslation/customTranslation

Fetch the Custom Translation map for the end user. The custom translation is configured in the white labeling parameters. If custom translation translation is defined on the tenant level, it overrides the custom translation of the system level. Similar, if the custom translation is defined on the customer level, it overrides the translation configuration of the tenant level.

     
    Accept : 'application/json'

#### POST /api/customTranslation/customTranslation

Creates or Updates the Custom Translation map.

 Request example: 

```json
{"translationMap":{"es_ES":"{\"home\":\"MyHome\"}"}}
```

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/customer/{customerId}

Get the Customer object based on the provided Customer Id. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
     
    Accept : 'application/json'

#### DELETE /api/customer/{customerId}

Deletes the Customer and all customer Users. All assigned Dashboards, Assets, Devices, etc. will be unassigned but not deleted. Referencing non-existing Customer Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    customerId : string
     
    Accept : 'application/json'

#### GET /api/customer/{customerId}/shortInfo

Get the short customer object that contains only the title and 'isPublic' flag. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
     
    Accept : 'application/json'

#### GET /api/customer/{customerId}/title

Get the title of the customer. If the user has the authority of 'Tenant Administrator', the server checks that the customer is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the user belongs to the customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
     
    Accept : 'application/json'

#### GET /api/customers{?customerIds}

Returns a list of Customer objects based on the provided ids. Filters the list based on the user permissions. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerIds : string
     
    Accept : 'application/json'

#### GET /api/customers{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of customers owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/customer{?entityGroupId}

Creates or Updates the Customer. When creating customer, platform generates Customer Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Customer Id will be present in the response. Specify existing Customer Id to update the Customer. Referencing non-existing Customer Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/customers{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Customer objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/customers{?customerTitle}

Get the Customer using Customer Title. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerTitle : string
     
    Accept : 'application/json'

#### GET /api/user/customers{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of customers available for the user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/customer/dashboard/home/info

Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the corresponding customer. 

Available for users with 'CUSTOMER_USER' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### POST /api/customer/dashboard/home/info

Update the home dashboard assignment for the current customer. 

Available for users with 'CUSTOMER_USER' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/dashboard/home

Returns the home dashboard object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User. If 'homeDashboardId' parameter is not set on the User level and the User has authority 'CUSTOMER_USER', check the same parameter for the corresponding Customer. If 'homeDashboardId' parameter is not set on the User and Customer levels then checks the same parameter for the Tenant that owns the user. The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/dashboard/home/info

Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User. If 'homeDashboardId' parameter is not set on the User level and the User has authority 'CUSTOMER_USER', check the same parameter for the corresponding Customer. If 'homeDashboardId' parameter is not set on the User and Customer levels then checks the same parameter for the Tenant that owns the user. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/dashboard/info/{dashboardId}

Get the information about the dashboard based on 'dashboardId' parameter. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON.

    dashboardId : string
     
    Accept : 'application/json'

#### GET /api/dashboard/maxDatapointsLimit

Get the maximum number of data points that dashboard may request from the server per in a single subscription command. This value impacts the time window behavior. It impacts 'Max values' parameter in case user selects 'None' as 'Data aggregation function'. It also impacts the 'Grouping interval' in case of any other 'Data aggregation function' is selected. The actual value of the limit is configurable in the system configuration file.

     
    Accept : 'application/json'

#### GET /api/dashboard/serverTime

Get the server time (milliseconds since January 1, 1970 UTC). Used to adjust view of the dashboards according to the difference between browser and server time.

     
    Accept : 'application/json'

#### GET /api/dashboard/{dashboardId}

Get the dashboard based on 'dashboardId' parameter. The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    dashboardId : string
     
    Accept : 'application/json'

#### DELETE /api/dashboard/{dashboardId}

Delete the Dashboard. Only users with 'TENANT_ADMIN') authority may delete the dashboards.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    dashboardId : string
     
    Accept : 'application/json'

#### GET /api/dashboards{?dashboardIds}

Returns a list of DashboardInfo objects based on the provided ids. Filters the list based on the user permissions. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    dashboardIds : string
     
    Accept : 'application/json'

#### POST /api/dashboard{?entityGroupId}

Create or update the Dashboard. When creating dashboard, platform generates Dashboard Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Dashboard id will be present in the response. Specify existing Dashboard id to update the dashboard. Referencing non-existing dashboard Id will cause 'Not Found' error. Only users with 'TENANT_ADMIN') authority may create the dashboards.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/dashboards/export{?limit}

Export the dashboards that belong to specified group id.The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    limit : integer
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/dashboards/import{?overwrite}

Import the dashboards to specified group.The Dashboard object is a heavyweight object that contains information about the dashboard (e.g. title, image, assigned customers) and also configuration JSON (e.g. layouts, widgets, entity aliases).

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    entityGroupId : string
    overwrite : boolean
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/dashboards{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Dashboard objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/dashboard/home/info

Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the corresponding tenant. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### POST /api/tenant/dashboard/home/info

Update the home dashboard assignment for the current tenant. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/tenant/dashboards{?mobile,page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of dashboard info objects owned by the tenant of a current user. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    mobile : boolean
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/{tenantId}/dashboards{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of dashboard info objects owned by tenant. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.

    tenantId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/user/dashboards{?mobile,operation,page,pageSize,sortOrder,sortProperty,textSearch,userId}

Returns a page of Dashboard Info objects available for specified or current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. The Dashboard Info object contains lightweight information about the dashboard (e.g. title, image, assigned customers) but does not contain the heavyweight configuration JSON.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    mobile : boolean
    textSearch : string
    sortProperty : string
    sortOrder : string
    operation : string
    userId : string
     
    Accept : 'application/json'

#### DELETE /api/customer/device/{deviceName}/claim

Reclaiming means the device will be unassigned from the customer and the device will be available for claiming again.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'CLAIM_DEVICES' permission for the entity (entities).

    deviceName : string
     
    Accept : 'application/json'

#### POST /api/customer/device/{deviceName}/claim{?subCustomerId}

Claiming makes it possible to assign a device to the specific customer using device/server side claiming data (in the form of secret key).To make this happen you have to provide unique device name and optional claiming data (it is needed only for device-side claiming).Once device is claimed, the customer becomes its owner and customer users may access device data as well as control the device. 
In order to enable claiming devices feature a system parameter security.claim.allowClaimingByDefault should be set to true, otherwise a server-side claimingAllowed attribute with the value true is obligatory for provisioned devices. 
See official documentation for more details regarding claiming.

Available for users with 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'CLAIM_DEVICES' permission for the entity (entities).

    deviceName : string
    subCustomerId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/customer/{customerId}/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of devices objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/device-with-credentials{?entityGroupId}

Create or update the Device. When creating device, platform generates Device Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Requires to provide the Device Credentials object as well. Useful to create device and credentials in one request. You may find the example of LwM2M device and RPK credentials below: 

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

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/device/bulk_import

There's an ability to import the bulk of devices using the only .csv file. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/device/credentials

During device creation, platform generates random 'ACCESS_TOKEN' credentials. Use this method to update the device credentials. First use 'getDeviceCredentialsByDeviceId' to get the credentials id and value. Then use current method to update the credentials type and value. It is not possible to create multiple device credentials for the same device. The structure of device credentials id and value is simple for the 'ACCESS_TOKEN' but is much more complex for the 'MQTT_BASIC' or 'LWM2M_CREDENTIALS'.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE_CREDENTIALS' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/device/types

Returns a set of unique device profile names based on devices that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/device/{deviceId}

Fetch the Device object based on the provided Device Id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    deviceId : string
     
    Accept : 'application/json'

#### DELETE /api/device/{deviceId}

Deletes the device, it's credentials and all the relations (from and to the device). Referencing non-existing device Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    deviceId : string
     
    Accept : 'application/json'

#### GET /api/device/{deviceId}/credentials

If during device creation there wasn't specified any credentials, platform generates random 'ACCESS_TOKEN' credentials.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ_CREDENTIALS' permission for the entity (entities).

    deviceId : string
     
    Accept : 'application/json'

#### POST /api/devices

Returns all devices that are related to the specific entity. The entity id, relation type, device types, depth of the search, and other query parameters defined using complex 'DeviceSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/devices/count/{otaPackageType}/{deviceProfileId}

The platform gives an ability to load OTA (over-the-air) packages to devices. It can be done in two different ways: device scope or device profile scope.In the response you will find the number of devices with specified device profile, but without previously defined device scope OTA package. It can be useful when you want to define number of devices that will be affected with future OTA package

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    otaPackageType : string
    deviceProfileId : string
     
    Accept : 'application/json'

#### GET /api/devices/count/{otaPackageType}/{otaPackageId}/{entityGroupId}

The platform gives an ability to load OTA (over-the-air) packages to devices. It can be done in two different ways: device scope or device profile scope.In the response you will find the number of devices with specified device profile, but without previously defined device scope OTA package. It can be useful when you want to define number of devices that will be affected with future OTA package

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    otaPackageType : string
    otaPackageId : string
    entityGroupId : string
     
    Accept : 'application/json'

#### GET /api/devices{?deviceIds}

Requested devices must be owned by tenant or assigned to customer which user is performing the request. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    deviceIds : string
     
    Accept : 'application/json'

#### POST /api/device{?accessToken,entityGroupId}

Create or update the Device. When creating device, platform generates Device Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Device credentials are also generated if not provided in the 'accessToken' request parameter. The newly created device id will be present in the response. Specify existing Device id to update the device. Referencing non-existing device Id will cause 'Not Found' error.

Device name is unique in the scope of tenant. Use unique identifiers like MAC or IMEI for the device names and non-unique 'label' field for user-friendly visualization purposes.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    accessToken : string
    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/devices{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Device objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/devices{?deviceName}

Requested device must be owned by tenant that the user belongs to. Device name is an unique property of device. So it can be used to identify the device.

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    deviceName : string
     
    Accept : 'application/json'

#### GET /api/tenant/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of devices owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/tenant/{tenantId}/device/{deviceId}

Creates assignment of the device to tenant. Thereafter tenant will be able to reassign the device to a customer.

Available for users with 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'ASSIGN_TO_TENANT' permission for the entity (entities).

    tenantId : string
    deviceId : string
     
    Accept : 'application/json'

#### GET /api/user/devices{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of devices that are available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/deviceGroupOtaPackage

saveDeviceGroupOtaPackage

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/deviceGroupOtaPackage/{groupId}/{firmwareType}

getFirmwareById

    groupId : string
    firmwareType : string
     
    Accept : 'application/json'

#### DELETE /api/deviceGroupOtaPackage/{id}

deleteDeviceGroupOtaPackage

    id : string
     
    Accept : 'application/json'

#### POST /api/deviceProfile

Create or update the Device Profile. When creating device profile, platform generates device profile id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created device profile id will be present in the response. Specify existing device profile id to update the device profile. Referencing non-existing device profile Id will cause 'Not Found' error. 

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/deviceProfile/devices/keys/attributes{?deviceProfileId}

Get a set of unique attribute keys used by devices that belong to specified profile. If profile is not set returns a list of unique keys among all profiles. The call is used for auto-complete in the UI forms. The implementation limits the number of devices that participate in search to 100 as a trade of between accurate results and time-consuming queries. 

Available for users with 'TENANT_ADMIN' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### GET /api/deviceProfile/devices/keys/timeseries{?deviceProfileId}

Get a set of unique time-series keys used by devices that belong to specified profile. If profile is not set returns a list of unique keys among all profiles. The call is used for auto-complete in the UI forms. The implementation limits the number of devices that participate in search to 100 as a trade of between accurate results and time-consuming queries. 

Available for users with 'TENANT_ADMIN' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### GET /api/deviceProfile/{deviceProfileId}

Fetch the Device Profile object based on the provided Device Profile Id. The server checks that the device profile is owned by the same tenant. 

Available for users with 'TENANT_ADMIN' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### DELETE /api/deviceProfile/{deviceProfileId}

Deletes the device profile. Referencing non-existing device profile Id will cause an error. Can't delete the device profile if it is referenced by existing devices.

Available for users with 'TENANT_ADMIN' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### POST /api/deviceProfile/{deviceProfileId}/default

Marks device profile as default within a tenant scope.

Available for users with 'TENANT_ADMIN' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### GET /api/deviceProfileInfo/default

Fetch the Default Device Profile Info object. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/deviceProfileInfo/{deviceProfileId}

Fetch the Device Profile Info object based on the provided Device Profile Id. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceProfileId : string
     
    Accept : 'application/json'

#### GET /api/deviceProfileInfos{?page,pageSize,sortOrder,sortProperty,textSearch,transportType}

Returns a page of devices profile info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Device Profile Info is a lightweight object that includes main information about Device Profile excluding the heavyweight configuration object. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    transportType : string
     
    Accept : 'application/json'

#### GET /api/deviceProfiles{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of devices profile objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/customer/{customerId}/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of edges objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    customerId : string
    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/edge/bulk_import

There's an ability to import the bulk of edges using the only .csv file.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/edge/missingToRelatedRuleChains/{edgeId}

Returns list of rule chains ids that are not assigned to particular edge, but these rule chains are present in the already assigned rule chains to edge.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
     
    Accept : 'application/json'

#### POST /api/edge/sync/{edgeId}

Starts synchronization process between edge and cloud. 
All entities that are assigned to particular edge are going to be send to remote edge service.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
     
    Accept : 'application/json'

#### GET /api/edge/types

Returns a set of unique edge types based on edges that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/edge/{edgeId}

Get the Edge object based on the provided Edge Id. If the user has the authority of 'Tenant Administrator', the server checks that the edge is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the edge is assigned to the same customer.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    edgeId : string
     
    Accept : 'application/json'

#### DELETE /api/edge/{edgeId}

Deletes the edge. Referencing non-existing edge Id will cause an error.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
     
    Accept : 'application/json'

#### POST /api/edge/{edgeId}/{ruleChainId}/root

Change root rule chain of the edge to the new provided rule chain. 
This operation will send a notification to update root rule chain on remote edge service.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
    ruleChainId : string
     
    Accept : 'application/json'

#### POST /api/edges

Returns all edges that are related to the specific entity. The entity id, relation type, edge types, depth of the search, and other query parameters defined using complex 'EdgeSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/edges/enabled

Returns 'true' if edges support enabled on server, 'false' - otherwise.

     
    Accept : 'application/json'

#### GET /api/edges{?edgeIds}

Requested edges must be owned by tenant or assigned to customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    edgeIds : string
     
    Accept : 'application/json'

#### GET /api/edges{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of edges owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/edge{?entityGroupId}

Create or update the Edge. When creating edge, platform generates Edge Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created edge id will be present in the response. Specify existing Edge id to update the edge. Referencing non-existing Edge Id will cause 'Not Found' error.

Edge name is unique in the scope of tenant. Use unique identifiers like MAC or IMEI for the edge names and non-unique 'label' field for user-friendly visualization purposes.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/edges{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Edge objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/license/activateInstance{?licenseSecret,releaseDate}

Activates edge license on license portal.

    licenseSecret : string
    releaseDate : string
     
    Accept : 'application/json'

#### POST /api/license/checkInstance

Checks license request from edge service by forwarding request to license portal.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/tenant/edges{?edgeName}

Requested edge must be owned by tenant or customer that the user belongs to. Edge name is an unique property of edge. So it can be used to identify the edge.

Available for users with 'TENANT_ADMIN' authority.

    edgeName : string
     
    Accept : 'application/json'

#### GET /api/tenant/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of edges owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/user/edges{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of edges available for current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/edge/{edgeId}/events{?endTime,page,pageSize,sortOrder,sortProperty,startTime,textSearch}

Returns a page of edge events for the requested edge. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

    edgeId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
     
    Accept : 'application/json'

#### GET /api/allEntityGroups/edge/{edgeId}/{groupType}

Fetch the list of Entity Group Info objects based on the provided Entity Type and assigned to the provided Edge entity. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    edgeId : string
    groupType : string
     
    Accept : 'application/json'

#### POST /api/edge/{edgeId}/entityGroup/{entityGroupId}/{groupType}

Creates assignment of an existing entity group to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once entity group will be delivered to edge service, edge will request entities of this group to be send to edge. Once entities will be delivered to edge service, they are going to be available for usage on remote edge instance.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    edgeId : string
    groupType : string
    entityGroupId : string
     
    Accept : 'application/json'

#### DELETE /api/edge/{edgeId}/entityGroup/{entityGroupId}/{groupType}

Clears assignment of the entity group to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove entity group and entities inside this group locally.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    edgeId : string
    groupType : string
    entityGroupId : string
     
    Accept : 'application/json'

#### POST /api/entityGroup

Create or update the Entity Group. When creating Entity Group, platform generates Entity Group Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Entity Group Id will be present in the response. Specify existing Entity Group Id to update the group. Referencing non-existing Entity Group Id will cause 'Not Found' error.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/all/{ownerType}/{ownerId}/{groupType}

Fetch reserved group 'All' based on the provided Owner Id and Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    ownerType : string
    ownerId : string
    groupType : string
     
    Accept : 'application/json'

#### GET /api/entityGroup/{entityGroupId}

Fetch the Entity Group object based on the provided Entity Group Id. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
     
    Accept : 'application/json'

#### DELETE /api/entityGroup/{entityGroupId}

Deletes the entity group but does not delete the entities in the group, since they are also present in reserved group 'All'. Referencing non-existing Entity Group Id will cause an error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'DELETE' permission for specified group.

    entityGroupId : string
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/addEntities

Add entities to the specified entity group. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'ADD_TO_GROUP' permission for specified group.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/deleteEntities

Removes entities from the specified entity group. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'REMOVE_FROM_GROUP' permission for specified group.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/entities{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Short Entity View objects that belongs to specified Entity Group Id. Short Entity View object contains the entity id and number of fields (attributes, telemetry, etc). List of those fields is configurable and defined in the group configuration.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/makePrivate

Make the entity group not available for non authorized users. Every group is private by default. This call is useful to hide the group that was previously made public.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    entityGroupId : string
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/makePublic

Make the entity group available for non authorized users. Useful for public dashboards that will be embedded into the public websites. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    entityGroupId : string
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/share

Share the entity group with certain user group based on the provided Share Group Request. The request is quite flexible and processing of the request involves multiple security checks using platform RBAC feature.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/{entityId}

Fetch the Short Entity View object based on the group and entity id. Short Entity View object contains the entity id and number of fields (attributes, telemetry, etc). List of those fields is configurable and defined in the group configuration.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    entityId : string
     
    Accept : 'application/json'

#### POST /api/entityGroup/{entityGroupId}/{userGroupId}/{roleId}/share

Share the entity group with specified user group using specified role. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for specified group.

    entityGroupId : string
    userGroupId : string
    roleId : string
     
    Accept : 'application/json'

#### GET /api/entityGroup/{ownerType}/{ownerId}/{groupType}/{groupName}

Fetch the Entity Group object based on the provided Entity Group Id. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Entity group name is unique in the scope of owner and entity type. For example, you can't create two tenant device groups called 'Water meters'. However, you may create device and asset group with the same name. And also you may create groups with the same name for two different customers of the same tenant. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    ownerType : string
    ownerId : string
    groupType : string
    groupName : string
     
    Accept : 'application/json'

#### GET /api/entityGroups/edge/{edgeId}/{groupType}{?page,pageSize,sortOrder,sortProperty}

Returns a page of Entity Group Info objects based on the provided Entity Type and assigned to the provided Edge entity. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    edgeId : string
    groupType : string
    pageSize : integer
    page : integer
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/entityGroups/{entityType}/{entityId}

Returns a list of groups that contain the specified Entity Id. For example, all device groups that contain specific device. The list always contain at least one element - special group 'All'.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityType : string
    entityId : string
     
    Accept : 'application/json'

#### GET /api/entityGroups/{groupType}

Fetch the list of Entity Group Info objects based on the provided Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    groupType : string
     
    Accept : 'application/json'

#### GET /api/entityGroups/{ownerType}/{ownerId}/{groupType}

Fetch the list of Entity Group Info objects based on the provided Owner Id and Entity Type. Entity group allows you to group multiple entities of the same entity type (Device, Asset, Customer, User, Dashboard, etc). Entity Group always have an owner - particular Tenant or Customer. Each entity may belong to multiple groups simultaneously.Entity Group Info extends Entity Group object and adds 'ownerIds' - a list of owner ids.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    ownerType : string
    ownerId : string
    groupType : string
     
    Accept : 'application/json'

#### GET /api/entityGroups{?entityGroupIds}

Requested devices must be owned by tenant or assigned to customer which user is performing the request. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityGroupIds : string
     
    Accept : 'application/json'

#### GET /api/owners{?page,pageSize,sortOrder,sortProperty,textSearch}

Provides a rage view of Customers that the current user has READ access to. If the current user is Tenant administrator, the result set also contains the tenant. The call is designed for the UI auto-complete component to show tenant and all possible Customers that the user may select to change the owner of the particular entity or entity group.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/alarmsQuery/find

This method description defines how Alarm Data Query extends the Entity Data Query. See method 'Find Entity Data by Query' first to get the info about 'Entity Data Query'.

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/entitiesQuery/count

Allows to run complex queries to search the count of platform entities (devices, assets, customers, etc) based on the combination of main entity filter and multiple key filters. Returns the number of entities that match the query definition.

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/entitiesQuery/find

Allows to run complex queries over platform entities (devices, assets, customers, etc) based on the combination of main entity filter and multiple key filters. Returns the paginated result of the query that contains requested entity fields and latest values of requested attributes and time-series data.

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/entitiesQuery/find/keys{?attributes,timeseries}

Uses entity data query (see 'Find Entity Data by Query') to find first 100 entities. Then fetch and return all unique time-series and/or attribute keys. Used mostly for UI hints.

    timeseries : boolean
    attributes : boolean
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/relation

Creates or updates a relation between two entities in the platform. Relations unique key is a combination of from/to entity id and relation type group and relation type. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/relations

Returns all entities that are related to the specific entity. The entity id, relation type, entity types, depth of the search, and other query parameters defined using complex 'EntityRelationsQuery' object. See 'Model' tab of the Parameters for more info.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/relations/info

Returns all entity infos that are related to the specific entity. The entity id, relation type, entity types, depth of the search, and other query parameters defined using complex 'EntityRelationsQuery' object. See 'Model' tab of the Parameters for more info. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/relations/info{?fromId,fromType,relationTypeGroup}

Returns list of relation info objects for the specified entity by the 'from' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 

    fromId : string
    fromType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### GET /api/relations/info{?relationTypeGroup,toId,toType}

Returns list of relation info objects for the specified entity by the 'to' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer. Relation Info is an extension of the default Relation object that contains information about the 'from' and 'to' entity names. 

    toId : string
    toType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### DELETE /api/relations{?entityId,entityType}

Deletes all the relation (both 'from' and 'to' direction) for the specified entity. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.

    entityId : string
    entityType : string
     
    Accept : 'application/json'

#### GET /api/relations{?fromId,fromType,relationType,relationTypeGroup}

Returns list of relation objects for the specified entity by the 'from' direction and relation type. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.

    fromId : string
    fromType : string
    relationType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### GET /api/relations{?fromId,fromType,relationTypeGroup}

Returns list of relation objects for the specified entity by the 'from' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.

    fromId : string
    fromType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### GET /api/relations{?relationType,relationTypeGroup,toId,toType}

Returns list of relation objects for the specified entity by the 'to' direction and relation type. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.

    toId : string
    toType : string
    relationType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### GET /api/relations{?relationTypeGroup,toId,toType}

Returns list of relation objects for the specified entity by the 'to' direction. 

If the user has the authority of 'System Administrator', the server checks that the entity is owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that the entity is owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the entity is assigned to the same customer.

    toId : string
    toType : string
    relationTypeGroup : string
     
    Accept : 'application/json'

#### GET /api/relation{?fromId,fromType,relationType,relationTypeGroup,toId,toType}

Returns relation object between two specified entities if present. Otherwise throws exception. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.

    fromId : string
    fromType : string
    relationType : string
    relationTypeGroup : string
    toId : string
    toType : string
     
    Accept : 'application/json'

#### DELETE /api/relation{?fromId,fromType,relationType,relationTypeGroup,toId,toType}

Deletes a relation between two entities in the platform. 

If the user has the authority of 'System Administrator', the server checks that 'from' and 'to' entities are owned by the sysadmin. If the user has the authority of 'Tenant Administrator', the server checks that 'from' and 'to' entities are owned by the same tenant. If the user has the authority of 'Customer User', the server checks that the 'from' and 'to' entities are assigned to the same customer.

    fromId : string
    fromType : string
    relationType : string
    relationTypeGroup : string
    toId : string
    toType : string
     
    Accept : 'application/json'

#### GET /api/customer/{customerId}/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of Entity View objects assigned to customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    customerId : string
    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Entity View objects that belongs to specified Entity View Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/entityView/types

Returns a set of unique entity view types based on entity views that are either owned by the tenant or assigned to the customer which user is performing the request.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### GET /api/entityView/{entityViewId}

Fetch the EntityView object based on the provided entity view id. Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. See the 'Model' tab for more details.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityViewId : string
     
    Accept : 'application/json'

#### DELETE /api/entityView/{entityViewId}

Delete the EntityView object based on the provided entity view id. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityViewId : string
     
    Accept : 'application/json'

#### POST /api/entityViews

Returns all entity views that are related to the specific entity. The entity id, relation type, entity view types, depth of the search, and other query parameters defined using complex 'EntityViewSearchQuery' object. See 'Model' tab of the Parameters for more info.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityViews{?entityViewIds}

Requested entity views must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityViewIds : string
     
    Accept : 'application/json'

#### POST /api/entityView{?entityGroupId}

Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. See the 'Model' tab for more details.

    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/tenant/entityViews{?entityViewName}

Fetch the Entity View object based on the tenant id and entity view name. 

Available for users with 'TENANT_ADMIN' authority.

    entityViewName : string
     
    Accept : 'application/json'

#### GET /api/tenant/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of entity views owned by tenant. Entity Views limit the degree of exposure of the Device or Asset telemetry and attributes to the Customers. Every Entity View references exactly one entity (device or asset) and defines telemetry and attribute keys that will be visible to the assigned Customer. As a Tenant Administrator you are able to create multiple EVs per Device or Asset and assign them to different Customers. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/user/entityViews{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of entity views that are available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/events/{entityType}/{entityId}/clear{?endTime,startTime}

Clears events by filter for specified entity.

    entityType : string
    entityId : string
    startTime : integer
    endTime : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/events/{entityType}/{entityId}/{eventType}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}

Returns a page of events for specified entity by specifying event type. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

    entityType : string
    entityId : string
    eventType : string
    tenantId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
     
    Accept : 'application/json'

#### GET /api/events/{entityType}/{entityId}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}

Returns a page of events for specified entity. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

    entityType : string
    entityId : string
    tenantId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
     
    Accept : 'application/json'

#### POST /api/events/{entityType}/{entityId}{?endTime,page,pageSize,sortOrder,sortProperty,startTime,tenantId,textSearch}

Returns a page of events for the chosen entity by specifying the event filter. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

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



    entityType : string
    entityId : string
    tenantId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
    startTime : integer
    endTime : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/groupPermissions

Returns a list of group permission objects that is assigned for the specified Entity Group Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    entityGroupId : string
     
    Accept : 'application/json'

#### POST /api/groupPermission

Creates or Updates the Group Permission. When creating group permission, platform generates Group Permission Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Group Permission id will be present in the response. Specify existing Group Permission id to update the permission. Referencing non-existing Group Permission Id will cause 'Not Found' error.

Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/groupPermission/info/{groupPermissionId}{?isUserGroup}

Fetch the Group Permission Info object based on the provided Group Permission Id and the flag that controls what additional information to load: User or Entity Group. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups.  Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    groupPermissionId : string
    isUserGroup : boolean
     
    Accept : 'application/json'

#### GET /api/groupPermission/{groupPermissionId}

Fetch the Group Permission object based on the provided Group Permission Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    groupPermissionId : string
     
    Accept : 'application/json'

#### DELETE /api/groupPermission/{groupPermissionId}

Deletes the group permission. Referencing non-existing group permission Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    groupPermissionId : string
     
    Accept : 'application/json'

#### POST /api/userGroup/groupPermissions/info

Enrich a list of group permission objects with the information about Role, User and Entity Groups. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/userGroup/{userGroupId}/groupPermissions

Returns a list of group permission objects that belongs to specified User Group Id. Group permission entity represents list of allowed operations for certain User Group to perform against certain Entity Group. Basically, this entity wires three other entities: 

 * Role that defines set of allowed operations;
 * User Group that defines set of users who may perform the operations; 
 * Entity Group that defines set of entities which will be accessible to users;

 Group Permission Info object extends the Group Permissions with the full information about Role and User and/or Entity Groups. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    userGroupId : string
     
    Accept : 'application/json'

#### POST /api/integration

Create or update the Integration. When creating integration, platform generates Integration Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created integration id will be present in the response. Specify existing Integration id to update the integration. Referencing non-existing integration Id will cause 'Not Found' error. Integration configuration is validated for each type of the integration before it can be created. 

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/integration/check

Checks if the connection to the integration is established. Throws an error if the connection is not established. Example: Failed to connect to MQTT broker at host:port.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/integration/routingKey/{routingKey}

Fetch the Integration object based on the provided routing key. The server checks that the integration is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    routingKey : string
     
    Accept : 'application/json'

#### GET /api/integration/{integrationId}

Fetch the Integration object based on the provided Integration Id. The server checks that the integration is owned by the same tenant. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    integrationId : string
     
    Accept : 'application/json'

#### DELETE /api/integration/{integrationId}

Deletes the integration and all the relations (from and to the integration). Referencing non-existing integration Id will cause an error. 

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    integrationId : string
     
    Accept : 'application/json'

#### GET /api/integrations{?integrationIds}

Requested integrations must be owned by tenant which is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    integrationIds : string
     
    Accept : 'application/json'

#### GET /api/integrations{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of integrations owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/lwm2m/deviceProfile/bootstrap/{isBootstrapServer}

Get the Lwm2m Bootstrap SecurityInfo object (of the current server) based on the provided isBootstrapServer parameter. If isBootstrapServer == true, get the parameters of the current Bootstrap Server. If isBootstrapServer == false, get the parameters of the current Lwm2m Server. Used for client settings when starting the client in Bootstrap mode. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    isBootstrapServer : boolean
     
    Accept : 'application/json'

#### GET /api/oauth2/config/template

Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients

     
    Accept : 'application/json'

#### POST /api/oauth2/config/template

Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /api/oauth2/config/template/{clientRegistrationTemplateId}

Client registration template is OAuth2 provider configuration template with default settings for registering new OAuth2 clients

    clientRegistrationTemplateId : string
     
    Accept : 'application/json'

#### POST /api/noauth/oauth2Clients{?pkgName,platform}

Get the list of OAuth2 clients to log in with, available for such domain scheme (HTTP or HTTPS) (if x-forwarded-proto request header is present - the scheme is known from it) and domain name and port (port may be known from x-forwarded-port header)

    pkgName : string
    platform : string
     
    Accept : 'application/json'

#### GET /api/oauth2/config



Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'

#### POST /api/oauth2/config



Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/oauth2/loginProcessingUrl

Returns the URL enclosed in double quotes. After successful authentication with OAuth2 provider, it makes a redirect to this path so that the platform can do further log in processing. This URL may be configured as 'security.oauth2.loginProcessingUrl' property in yml configuration file, or as 'SECURITY_OAUTH2_LOGIN_PROCESSING_URL' env variable. By default it is '/login/oauth2/code/'

Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'

#### POST /api/otaPackage

Create or update the OTA Package Info. When creating OTA Package Info, platform generates OTA Package id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created OTA Package id will be present in the response. Specify existing OTA Package id to update the OTA Package Info. Referencing non-existing OTA Package Id will cause 'Not Found' error. 

OTA Package combination of the title with the version is unique in the scope of tenant. 

Available for users with 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/otaPackage/info/{otaPackageId}

Fetch the OTA Package Info object based on the provided OTA Package Id. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    otaPackageId : string
     
    Accept : 'application/json'

#### GET /api/otaPackage/{otaPackageId}

Fetch the OTA Package object based on the provided OTA Package Id. The server checks that the OTA Package is owned by the same tenant. OTA Package is a heavyweight object that includes main information about the OTA Package and also data. 

Available for users with 'TENANT_ADMIN' authority.

    otaPackageId : string
     
    Accept : 'application/json'

#### DELETE /api/otaPackage/{otaPackageId}

Deletes the OTA Package. Referencing non-existing OTA Package Id will cause an error. Can't delete the OTA Package if it is referenced by existing devices or device profile.

Available for users with 'TENANT_ADMIN' authority.

    otaPackageId : string
     
    Accept : 'application/json'

#### GET /api/otaPackage/{otaPackageId}/download

Download OTA Package based on the provided OTA Package Id.

Available for users with 'TENANT_ADMIN' authority.

    otaPackageId : string
     
    Accept : 'application/json'

#### POST /api/otaPackage/{otaPackageId}{?checksum,checksumAlgorithm}

Update the OTA Package. Adds the date to the existing OTA Package Info

Available for users with 'TENANT_ADMIN' authority.

    otaPackageId : string
    checksum : string
    checksumAlgorithm : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/otaPackages/group/{groupId}/{type}{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of OTA Package Info objects owned by tenant, and by entity group. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    groupId : string
    type : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/otaPackages/{deviceProfileId}/{type}{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of OTA Package Info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceProfileId : string
    type : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/otaPackages{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of OTA Package Info objects owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. OTA Package Info is a lightweight object that includes main information about the OTA Package excluding the heavyweight data. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/owner/CUSTOMER/{ownerId}/{entityType}/{entityId}

Tenant/Customer changes Owner to Customer or sub-Customer. Sub-Customer can`t perform this operation! 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    ownerId : string
    entityType : string
    entityId : string
     
    Accept : 'application/json'

#### POST /api/owner/TENANT/{ownerId}/{entityType}/{entityId}

Tenant changes Owner from Customer or sub-Customer to Tenant. 

Available for users with 'TENANT_ADMIN' authority.

    ownerId : string
    entityType : string
    entityId : string
     
    Accept : 'application/json'

#### GET /api/tenant/queues{?serviceType}

Returns a set of unique queue names based on service type. 

Available for users with 'TENANT_ADMIN' authority.

    serviceType : string
     
    Accept : 'application/json'

#### POST /api/report/test{?reportsServerEndpointUrl}

downloadTestReport

    reportsServerEndpointUrl : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/report/{dashboardId}/download

downloadDashboardReport

    dashboardId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/role

Creates or Updates the Role. When creating Role, platform generates Role Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Role id will be present in the response. Specify existing Role id to update the permission. Referencing non-existing Group Permission Id will cause 'Not Found' error.

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/role/{roleId}

Fetch the Role object based on the provided Role Id. Role Contains a set of permissions. Role has two types. Generic Role may be assigned to the user group and will provide permissions for all entities of a certain type. Group Role may be assigned to both user and entity group and will provides permissions only for the entities that belong to specified entity group. The assignment of the Role to the User Group is done using [Group Permission Controller](/swagger-ui.html#/group-permission-controller). Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    roleId : string
     
    Accept : 'application/json'

#### DELETE /api/role/{roleId}

Deletes the role. Referencing non-existing role Id will cause an error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    roleId : string
     
    Accept : 'application/json'

#### GET /api/roles{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of roles that are available for the current user. Role Contains a set of permissions. Role has two types. Generic Role may be assigned to the user group and will provide permissions for all entities of a certain type. Group Role may be assigned to both user and entity group and will provides permissions only for the entities that belong to specified entity group. The assignment of the Role to the User Group is done using [Group Permission Controller](/swagger-ui.html#/group-permission-controller).You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/roles{?roleIds}

Returns the list of rows based on their ids. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    roleIds : string
     
    Accept : 'application/json'

#### POST /api/plugins/rpc/oneway/{deviceId}

Deprecated. See 'Rpc V 2 Controller' instead.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/plugins/rpc/twoway/{deviceId}

Deprecated. See 'Rpc V 2 Controller' instead.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/rpc/oneway/{deviceId}

Sends the one-way remote-procedure call (RPC) request to device. Sends the one-way remote-procedure call (RPC) request to device. The RPC call is A JSON that contains the method name ('method'), parameters ('params') and multiple optional fields. See example below. We will review the properties of the RPC call one-by-one below. 

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

    deviceId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/rpc/persistent/device/{deviceId}{?page,pageSize,rpcStatus,sortOrder,sortProperty,textSearch}

Allows to query RPC calls for specific device using pagination.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceId : string
    pageSize : integer
    page : integer
    rpcStatus : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/rpc/persistent/{rpcId}

Get information about the status of the RPC call.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    rpcId : string
     
    Accept : 'application/json'

#### DELETE /api/rpc/persistent/{rpcId}

Deletes the persistent RPC request.

Available for users with 'TENANT_ADMIN' authority.

    rpcId : string
     
    Accept : 'application/json'

#### POST /api/rpc/twoway/{deviceId}

Sends the two-way remote-procedure call (RPC) request to device. Sends the one-way remote-procedure call (RPC) request to device. The RPC call is A JSON that contains the method name ('method'), parameters ('params') and multiple optional fields. See example below. We will review the properties of the RPC call one-by-one below. 

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

    deviceId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/edge/{edgeId}/ruleChain/{ruleChainId}

Creates assignment of an existing rule chain to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment rule chain (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once rule chain will be delivered to edge service, it's going to start processing messages locally. 

Only rule chain with type 'EDGE' can be assigned to edge.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
    ruleChainId : string
     
    Accept : 'application/json'

#### DELETE /api/edge/{edgeId}/ruleChain/{ruleChainId}

Clears assignment of the rule chain to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove rule chain (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove rule chain locally.

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
    ruleChainId : string
     
    Accept : 'application/json'

#### GET /api/edge/{edgeId}/ruleChains{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Rule Chains assigned to the specified edge. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    edgeId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/ruleChain

Create or update the Rule Chain. When creating Rule Chain, platform generates Rule Chain Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Rule Chain Id will be present in the response. Specify existing Rule Chain id to update the rule chain. Referencing non-existing rule chain Id will cause 'Not Found' error.

The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/ruleChain/autoAssignToEdgeRuleChains

Returns a list of Rule Chains that will be assigned to a newly created edge. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.

     
    Accept : 'application/json'

#### POST /api/ruleChain/device/default

Create rule chain from template, based on the specified name in the request. Creates the rule chain based on the template that is used to create root rule chain. 

Available for users with 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/ruleChain/metadata{?updateRelated}

Updates the rule chain metadata. The metadata object contains information about the rule nodes and their connections.

Available for users with 'TENANT_ADMIN' authority.

    updateRelated : boolean
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/ruleChain/testScript

Execute the JavaScript function and return the result. The format of request: 

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/ruleChain/{ruleChainId}

Fetch the Rule Chain object based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### DELETE /api/ruleChain/{ruleChainId}

Deletes the rule chain. Referencing non-existing rule chain Id will cause an error. Referencing rule chain that is used in the device profiles will cause an error.

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### POST /api/ruleChain/{ruleChainId}/autoAssignToEdge

Makes the rule chain to be automatically assigned for any new edge that will be created. Does not assign this rule chain for already created edges. 

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### DELETE /api/ruleChain/{ruleChainId}/autoAssignToEdge

Removes the rule chain from the list of rule chains that are going to be automatically assigned for any new edge that will be created. Does not unassign this rule chain for already assigned edges. 

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### POST /api/ruleChain/{ruleChainId}/edgeTemplateRoot

Makes the rule chain to be root rule chain for any new edge that will be created. Does not update root rule chain for already created edges. 

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### GET /api/ruleChain/{ruleChainId}/metadata

Fetch the Rule Chain Metadata object based on the provided Rule Chain Id. The metadata object contains information about the rule nodes and their connections.

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### GET /api/ruleChain/{ruleChainId}/output/labels

Fetch the unique labels for the "output" Rule Nodes that belong to the Rule Chain based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### GET /api/ruleChain/{ruleChainId}/output/labels/usage

Fetch the list of rule chains and the relation types (labels) they use to process output of the current rule chain based on the provided Rule Chain Id. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### POST /api/ruleChain/{ruleChainId}/root

Makes the rule chain to be root rule chain. Updates previous root rule chain as well. 

Available for users with 'TENANT_ADMIN' authority.

    ruleChainId : string
     
    Accept : 'application/json'

#### GET /api/ruleChains/export{?limit}

Exports all tenant rule chains as one JSON.

Available for users with 'TENANT_ADMIN' authority.

    limit : integer
     
    Accept : 'application/json'

#### POST /api/ruleChains/import{?overwrite}

Imports all tenant rule chains as one JSON.

Available for users with 'TENANT_ADMIN' authority.

    overwrite : boolean
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/ruleChains{?page,pageSize,sortOrder,sortProperty,textSearch,type}

Returns a page of Rule Chains owned by tenant. The rule chain object is lightweight and contains general information about the rule chain. List of rule nodes and their connection is stored in a separate 'metadata' object.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    type : string
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/ruleNode/{ruleNodeId}/debugIn

Gets the input message from the debug events for specified Rule Chain Id. Referencing non-existing rule chain Id will cause an error. 

Available for users with 'TENANT_ADMIN' authority.

    ruleNodeId : string
     
    Accept : 'application/json'

#### POST /api/rule-engine/

Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses current User Id ( the one which credentials is used to perform the request) as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The default timeout of the request processing is 10 seconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/rule-engine/{entityType}/{entityId}

Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses specified Entity Id as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The default timeout of the request processing is 10 seconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    entityType : string
    entityId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/rule-engine/{entityType}/{entityId}/{timeout}

Creates the Message with type 'REST_API_REQUEST' and payload taken from the request body. Uses specified Entity Id as the Rule Engine message originator. This method allows you to extend the regular platform API with the power of Rule Engine. You may use default and custom rule nodes to handle the message. The generated message contains two important metadata fields:

 * **'serviceId'** to identify the platform server that received the request;
 * **'requestUUID'** to identify the request and route possible response from the Rule Engine;

Use **'rest call reply'** rule node to push the reply from rule engine back as a REST API call response. The platform expects the timeout value in milliseconds.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    entityType : string
    entityId : string
    timeout : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/edge/{edgeId}/allSchedulerEvents

Fetch the list of Scheduler Event Info objects based on the provided Edge entity. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    edgeId : string
     
    Accept : 'application/json'

#### POST /api/edge/{edgeId}/schedulerEvent/{schedulerEventId}

Creates assignment of an existing scheduler event to an instance of The Edge. Assignment works in async way - first, notification event pushed to edge service queue on platform. Second, remote edge service will receive a copy of assignment scheduler event (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once scheduler event will be delivered to edge service, it is going to be available for usage on remote edge instance. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    edgeId : string
    schedulerEventId : string
     
    Accept : 'application/json'

#### DELETE /api/edge/{edgeId}/schedulerEvent/{schedulerEventId}

Clears assignment of the scheduler event to the edge. Unassignment works in async way - first, 'unassign' notification event pushed to edge queue on platform. Second, remote edge service will receive an 'unassign' command to remove entity group (Edge will receive this instantly, if it's currently connected, or once it's going to be connected to platform). Third, once 'unassign' command will be delivered to edge service, it's going to remove entity group and entities inside this group locally.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    edgeId : string
    schedulerEventId : string
     
    Accept : 'application/json'

#### GET /api/edge/{edgeId}/schedulerEvents{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of  Scheduler Events Info objects based on the provided Edge entity. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    edgeId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/schedulerEvent

Creates or Updates scheduler event. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. When creating scheduler event, platform generates scheduler event Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created scheduler event id will be present in the response. Specify existing scheduler event id to update the scheduler event. Referencing non-existing scheduler event Id will cause 'Not Found' error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/schedulerEvent/info/{schedulerEventId}

Fetch the SchedulerEventWithCustomerInfo object based on the provided scheduler event Id. Scheduler Event With Customer Info extends Scheduler Event Info object and adds 'customerTitle' - a String value representing the title of the customer which user created a Scheduler Event and 'customerIsPublic' - a boolean parameter that specifies if customer is public. See the 'Model' tab of the Response Class for more details. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    schedulerEventId : string
     
    Accept : 'application/json'

#### GET /api/schedulerEvent/{schedulerEventId}

Fetch the SchedulerEvent object based on the provided scheduler event Id. Scheduler Event extends Scheduler Event Info object and adds 'configuration' - a JSON structure of scheduler event configuration. See the 'Model' tab of the Response Class for more details. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    schedulerEventId : string
     
    Accept : 'application/json'

#### DELETE /api/schedulerEvent/{schedulerEventId}

Deletes the scheduler event. Referencing non-existing Scheduler Event Id will cause 'Not Found' error.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    schedulerEventId : string
     
    Accept : 'application/json'

#### GET /api/schedulerEvents{?schedulerEventIds}

Requested scheduler events must be owned by tenant or assigned to customer which user is performing the request. Scheduler Events allows you to schedule various types of events with flexible schedule configuration. Scheduler fires configured scheduler events according to their schedule. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    schedulerEventIds : string
     
    Accept : 'application/json'

#### GET /api/schedulerEvents{?type}

Requested scheduler events must be owned by tenant or assigned to customer which user is performing the request. Scheduler Event With Customer Info extends Scheduler Event Info object and adds 'customerTitle' - a String value representing the title of the customer which user created a Scheduler Event and 'customerIsPublic' - a boolean parameter that specifies if customer is public. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    type : string
     
    Accept : 'application/json'

#### GET /api/noauth/selfRegistration/privacyPolicy

Fetch the Privacy Policy based on the domain name from the request. Available for non-authorized users. 

     
    Accept : 'application/json'

#### GET /api/noauth/selfRegistration/signUpSelfRegistrationParams{?pkgName}

Fetch the Self Registration parameters based on the domain name from the request. Available for non-authorized users. Contains the information to customize the sign-up form.

    pkgName : string
     
    Accept : 'application/json'

#### GET /api/noauth/selfRegistration/termsOfUse

Fetch the Terms of Use based on the domain name from the request. Available for non-authorized users. 

     
    Accept : 'application/json'

#### GET /api/selfRegistration/selfRegistrationParams

Fetch the Self Registration parameters object for the tenant of the current user. 

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### POST /api/selfRegistration/selfRegistrationParams

Creates or Updates the Self Registration parameters. When creating, platform generates Admin Settings Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Admin Settings Id will be present in the response. Specify existing Admin Settings Id to update the Self Registration parameters. Referencing non-existing Admin Settings Id will cause 'Not Found' error.

Self Registration allows users to signup for using the platform and automatically create a Customer account for them. You may configure default dashboard and user roles that will be assigned for this Customer. This allows you to build out-of-the-box solutions for customers. Ability to white-label the login and main pages helps to brand the platform.

Available for users with 'TENANT_ADMIN' authority.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /api/selfRegistration/selfRegistrationParams/{domainName}

deleteSelfRegistrationParams

    domainName : string
     
    Accept : 'application/json'

#### POST /api/noauth/activateByEmailCode{?emailCode,pkgName}

Activate the user using code(link) from the activation email and return the JWT Token. Sends the notification and email about user activation. Checks that user was not activated yet.

    emailCode : string
    pkgName : string
     
    Accept : 'application/json'

#### GET /api/noauth/activateEmail{?emailCode,pkgName}

Activate the user using code(link) from the activation email. Validates the code an redirects according to the signup flow. Checks that user was not activated yet.

    emailCode : string
    pkgName : string
     
    Accept : 'application/json'

#### POST /api/noauth/cloud/activateByEmailCode{?emailCode}

activateCloudUserByEmailCode

    emailCode : string
     
    Accept : 'application/json'

#### GET /api/noauth/cloud/activateEmail{?emailCode}

activateCloudEmail

    emailCode : string
     
    Accept : 'application/json'

#### POST /api/noauth/cloud/resendEmailActivation{?email}

resendCloudEmailActivation

    email : string
     
    Accept : 'application/json'

#### GET /api/noauth/login{?pkgName}

This method generates redirect to the special link that is handled by mobile application. Useful for email verification flow on mobile app.

    pkgName : string
     
    Accept : 'application/json'

#### POST /api/noauth/resendEmailActivation{?email,pkgName}

Request to resend the activation email for the user. Checks that user was not activated yet.

    email : string
    pkgName : string
     
    Accept : 'application/json'

#### POST /api/noauth/signup

Process user sign up request. Creates the Customer and corresponding User based on self Registration parameters for the domain. See [Self Registration Controller](/swagger-ui.html#/self-registration-controller) for more details.  The result is either 'SUCCESS' or 'INACTIVE_USER_EXISTS'. If Success, the user will receive an email with instruction to activate the account. The content of the email is customizable via the mail templates.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/noauth/signup/recaptchaPublicKey

getRecaptchaPublicKey

     
    Accept : 'application/json'

#### POST /api/signup/acceptPrivacyPolicy

Accept privacy policy by the current user.

     
    Accept : 'application/json'

#### POST /api/signup/acceptPrivacyPolicyAndTermsOfUse

acceptPrivacyPolicyAndTermsOfUse

     
    Accept : 'application/json'

#### POST /api/signup/acceptTermsOfUse

Accept Terms of Use by the current user.

     
    Accept : 'application/json'

#### GET /api/signup/displayWelcome

isDisplayWelcome

     
    Accept : 'application/json'

#### POST /api/signup/notDisplayWelcome

setNotDisplayWelcome

     
    Accept : 'application/json'

#### GET /api/signup/privacyPolicyAccepted

Checks that current user accepted the privacy policy.

     
    Accept : 'application/json'

#### POST /api/signup/tenantAccount

deleteTenantAccount

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/signup/termsOfUseAccepted

Checks that current user accepted the privacy policy.

     
    Accept : 'application/json'

#### GET /api/solutions/templates/details/{solutionTemplateId}

Get a solution template details based on the provided id

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    solutionTemplateId : string
     
    Accept : 'application/json'

#### GET /api/solutions/templates/infos

Get a list of solution template descriptors

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

     
    Accept : 'application/json'

#### GET /api/solutions/templates/instructions/{solutionTemplateId}

Get a solution template instructions based on the provided id

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    solutionTemplateId : string
     
    Accept : 'application/json'

#### DELETE /api/solutions/templates/{solutionTemplateId}/delete

Uninstall solution template based on the provided id

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    solutionTemplateId : string
     
    Accept : 'application/json'

#### POST /api/solutions/templates/{solutionTemplateId}/install

Install solution template based on the provided id

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    solutionTemplateId : string
     
    Accept : 'application/json'

#### GET /api/tenant/subscription/data

getTenantProfileData

     
    Accept : 'application/json'

#### GET /api/tenant/subscription/usage

getTenantSubscriptionUsage

     
    Accept : 'application/json'

#### GET /api/tenantProfile/{tenantProfileId}/data

getTenantProfileDataById

    tenantProfileId : string
     
    Accept : 'application/json'

#### POST /api/resource

Create or update the Resource. When creating the Resource, platform generates Resource id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Resource id will be present in the response. Specify existing Resource id to update the Resource. Referencing non-existing Resource Id will cause 'Not Found' error. 

Resource combination of the title with the key is unique in the scope of tenant. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/resource/info/{resourceId}

Fetch the Resource Info object based on the provided Resource Id. Resource Info is a lightweight object that includes main information about the Resource excluding the heavyweight data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    resourceId : string
     
    Accept : 'application/json'

#### GET /api/resource/lwm2m/page{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. LwM2M Object is a object that includes information about the LwM2M model which can be used in transport configuration for the LwM2M device profile. 

Available for users with 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/resource/lwm2m{?objectIds,sortOrder,sortProperty}

Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin. You can specify parameters to filter the results. LwM2M Object is a object that includes information about the LwM2M model which can be used in transport configuration for the LwM2M device profile. 

Available for users with 'TENANT_ADMIN' authority.

    sortOrder : string
    sortProperty : string
    objectIds : string
     
    Accept : 'application/json'

#### GET /api/resource/{resourceId}

Fetch the Resource object based on the provided Resource Id. Resource is a heavyweight object that includes main information about the Resource and also data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    resourceId : string
     
    Accept : 'application/json'

#### DELETE /api/resource/{resourceId}

Deletes the Resource. Referencing non-existing Resource Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    resourceId : string
     
    Accept : 'application/json'

#### GET /api/resource/{resourceId}/download

Download Resource based on the provided Resource Id.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    resourceId : string
     
    Accept : 'application/json'

#### GET /api/resource{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Resource Info objects owned by tenant or sysadmin. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. Resource Info is a lightweight object that includes main information about the Resource excluding the heavyweight data. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/plugins/telemetry/{deviceId}/{scope}

Creates or updates the device attributes based on device id and specified attribute scope. The request payload is a JSON object with key-value format of attributes to create or update. For example:

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

    deviceId : string
    scope : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /api/plugins/telemetry/{deviceId}/{scope}{?keys}

Delete device attributes using provided Device Id, scope and a list of keys. Referencing a non-existing Device Id will cause an error

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    deviceId : string
    scope : string
    keys : string
     
    Accept : 'application/json'

#### POST /api/plugins/telemetry/{entityType}/{entityId}/attributes/{scope}

Creates or updates the entity attributes based on Entity Id and the specified attribute scope.  List of possible attribute scopes depends on the entity type: 

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

    entityType : string
    entityId : string
    scope : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/keys/attributes

Returns a set of unique attribute key names for the selected entity. The response will include merged key names set for all attribute scopes:

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityType : string
    entityId : string
     
    Accept : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/keys/attributes/{scope}

Returns a set of unique attribute key names for the selected entity and attributes scope: 

 * SERVER_SCOPE - supported for all entity types;
 * CLIENT_SCOPE - supported for devices;
 * SHARED_SCOPE - supported for devices. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityType : string
    entityId : string
    scope : string
     
    Accept : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/keys/timeseries

Returns a set of unique time-series key names for the selected entity. 

Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityType : string
    entityId : string
     
    Accept : 'application/json'

#### DELETE /api/plugins/telemetry/{entityType}/{entityId}/timeseries/delete{?deleteAllDataForKeys,endTs,keys,rewriteLatestIfDeleted,startTs}

Delete time-series for selected entity based on entity id, entity type and keys. Use 'deleteAllDataForKeys' to delete all time-series data. Use 'startTs' and 'endTs' to specify time-range instead.  Use 'rewriteLatestIfDeleted' to rewrite latest value (stored in separate table for performance) after deletion of the time range. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityType : string
    entityId : string
    keys : string
    deleteAllDataForKeys : boolean
    startTs : integer
    endTs : integer
    rewriteLatestIfDeleted : boolean
     
    Accept : 'application/json'

#### POST /api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}/{ttl}?scope=ANY

Creates or updates the entity time-series data based on the Entity Id and request payload.The request payload is a JSON document with three possible formats:

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

    entityType : string
    entityId : string
    scope : string
    ttl : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}?scope=ANY

Creates or updates the entity time-series data based on the Entity Id and request payload.The request payload is a JSON document with three possible formats:

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

    entityType : string
    entityId : string
    scope : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/values/attributes/{scope}{?keys}

Returns all attributes of a specified scope that belong to specified entity. List of possible attribute scopes depends on the entity type: 

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

    entityType : string
    entityId : string
    scope : string
    keys : string
     
    Accept : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/values/attributes{?keys}

Returns all attributes that belong to specified entity. Use optional 'keys' parameter to return specific attributes.
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

    entityType : string
    entityId : string
    keys : string
     
    Accept : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/values/timeseries{?agg,endTs,interval,keys,limit,orderBy,startTs,useStrictDataTypes}

Returns a range of time-series values for specified entity. Returns not aggregated data by default. Use aggregation function ('agg') and aggregation interval ('interval') to enable aggregation of the results on the database / server side. The aggregation is generally more efficient then fetching all records. 

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

    entityType : string
    entityId : string
    keys : string
    startTs : integer
    endTs : integer
    interval : integer
    limit : integer
    agg : string
    orderBy : string
    useStrictDataTypes : boolean
     
    Accept : 'application/json'

#### GET /api/plugins/telemetry/{entityType}/{entityId}/values/timeseries{?keys,useStrictDataTypes}

Returns all time-series that belong to specified entity. Use optional 'keys' parameter to return specific time-series. The result is a JSON object. The format of the values depends on the 'useStrictDataTypes' parameter. By default, all time-series values are converted to strings: 

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

    entityType : string
    entityId : string
    keys : string
    useStrictDataTypes : boolean
     
    Accept : 'application/json'

#### POST /api/plugins/telemetry/{entityType}/{entityId}/{scope}

Creates or updates the entity attributes based on Entity Id and the specified attribute scope.  List of possible attribute scopes depends on the entity type: 

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

    entityType : string
    entityId : string
    scope : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /api/plugins/telemetry/{entityType}/{entityId}/{scope}{?keys}

Delete entity attributes using provided Entity Id, scope and a list of keys. Referencing a non-existing entity Id or invalid entity type will cause an error. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

    entityType : string
    entityId : string
    scope : string
    keys : string
     
    Accept : 'application/json'

#### POST /api/tenant

Create or update the Tenant. When creating tenant, platform generates Tenant Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). Default Rule Chain and Device profile are also generated for the new tenants automatically. The newly created Tenant Id will be present in the response. Specify existing Tenant Id id to update the Tenant. Referencing non-existing Tenant Id will cause 'Not Found' error.

Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/tenant/info/{tenantId}

Fetch the Tenant Info object based on the provided Tenant Id. The Tenant Info object extends regular Tenant object and includes Tenant Profile name. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    tenantId : string
     
    Accept : 'application/json'

#### GET /api/tenant/{tenantId}

Fetch the Tenant object based on the provided Tenant Id. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    tenantId : string
     
    Accept : 'application/json'

#### DELETE /api/tenant/{tenantId}

Deletes the tenant, it's customers, rule chains, devices and all other related entities. Referencing non-existing tenant Id will cause an error.

Available for users with 'SYS_ADMIN' authority.

    tenantId : string
     
    Accept : 'application/json'

#### GET /api/tenantInfos{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of tenant info objects registered in the platform. The Tenant Info object extends regular Tenant object and includes Tenant Profile name. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenants{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of tenants registered in the platform. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenants{?tenantIds}

getTenantsByIds

    tenantIds : string
     
    Accept : 'application/json'

#### POST /api/tenantProfile

Create or update the Tenant Profile. When creating tenant profile, platform generates Tenant Profile Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Tenant Profile Id will be present in the response. Specify existing Tenant Profile Id id to update the Tenant Profile. Referencing non-existing Tenant Profile Id will cause 'Not Found' error. 

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

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/tenantProfile/{tenantProfileId}

Fetch the Tenant Profile object based on the provided Tenant Profile Id. 

Available for users with 'SYS_ADMIN' authority.

    tenantProfileId : string
     
    Accept : 'application/json'

#### DELETE /api/tenantProfile/{tenantProfileId}

Deletes the tenant profile. Referencing non-existing tenant profile Id will cause an error. Referencing profile that is used by the tenants will cause an error. 

Available for users with 'SYS_ADMIN' authority.

    tenantProfileId : string
     
    Accept : 'application/json'

#### POST /api/tenantProfile/{tenantProfileId}/default

Makes specified tenant profile to be default. Referencing non-existing tenant profile Id will cause an error. 

Available for users with 'SYS_ADMIN' authority.

    tenantProfileId : string
     
    Accept : 'application/json'

#### GET /api/tenantProfileInfo/default

Fetch the default Tenant Profile Info object based. Tenant Profile Info is a lightweight object that contains only id and name of the profile. 

Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'

#### GET /api/tenantProfileInfo/{tenantProfileId}

Fetch the Tenant Profile Info object based on the provided Tenant Profile Id. Tenant Profile Info is a lightweight object that contains only id and name of the profile. 

Available for users with 'SYS_ADMIN' authority.

    tenantProfileId : string
     
    Accept : 'application/json'

#### GET /api/tenantProfileInfos{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of tenant profile info objects registered in the platform. Tenant Profile Info is a lightweight object that contains only id and name of the profile. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenantProfiles{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of tenant profiles registered in the platform. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority.

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/uiSettings/helpBaseUrl

Get UI help base url used to fetch help assets. The actual value of the base url is configurable in the system configuration file.

     
    Accept : 'application/json'

#### GET /api/customer/users{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of users for the current tenant with authority 'CUSTOMER_USER'. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/customer/{customerId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of users owned by customer. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    customerId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/entityGroup/{entityGroupId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of user objects that belongs to specified Entity Group Id. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for specified group.

    entityGroupId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/tenant/{tenantId}/users{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of users owned by tenant. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    tenantId : string
    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### POST /api/user/sendActivationMail{?email}

Force send the activation email to the user. Useful to resend the email if user has accidentally deleted it.

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    email : string
     
    Accept : 'application/json'

#### GET /api/user/tokenAccessEnabled

Checks that the system is configured to allow administrators to impersonate themself as other users. If the user who performs the request has the authority of 'SYS_ADMIN', it is possible to login as any tenant administrator. If the user who performs the request has the authority of 'TENANT_ADMIN', it is possible to login as any customer user.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

     
    Accept : 'application/json'

#### GET /api/user/users{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of user objects available for the current user. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority. Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'

#### GET /api/user/{userId}

Fetch the User object based on the provided User Id. If the user has the authority of 'SYS_ADMIN', the server does not perform additional checks. If the user has the authority of 'TENANT_ADMIN', the server checks that the requested user is owned by the same tenant. If the user has the authority of 'CUSTOMER_USER', the server checks that the requested user is owned by the same customer.

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    userId : string
     
    Accept : 'application/json'

#### DELETE /api/user/{userId}

Deletes the User, it's credentials and all the relations (from and to the User). Referencing non-existing User Id will cause an error. 

 Security check is performed to verify that the user has 'DELETE' permission for the entity (entities).

    userId : string
     
    Accept : 'application/json'

#### GET /api/user/{userId}/activationLink

Get the activation link for the user. The base url for activation link is configurable in the general settings of system administrator. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    userId : string
     
    Accept : 'application/json'

#### GET /api/user/{userId}/token

Returns the token of the User based on the provided User Id. If the user who performs the request has the authority of 'SYS_ADMIN', it is possible to get the token of any tenant administrator. If the user who performs the request has the authority of 'TENANT_ADMIN', it is possible to get the token of any customer user that belongs to the same tenant. 

    userId : string
     
    Accept : 'application/json'

#### POST /api/user/{userId}/userCredentialsEnabled{?userCredentialsEnabled}

Enables or Disables user credentials. Useful when you would like to block user account without deleting it. You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority. Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    userId : string
    userCredentialsEnabled : boolean
     
    Accept : 'application/json'

#### GET /api/users{?userIds}

Requested users must be owned by tenant or assigned to customer which user is performing the request. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

    userIds : string
     
    Accept : 'application/json'

#### POST /api/user{?entityGroupId,sendActivationMail}

Create or update the User. When creating user, platform generates User Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created User Id will be present in the response. Specify existing User Id to update the device. Referencing non-existing User Id will cause 'Not Found' error.

Device email is unique for entire platform setup.

 Security check is performed to verify that the user has 'WRITE' permission for the entity (entities).

    sendActivationMail : boolean
    entityGroupId : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/permissions/allowedPermissions

Returns a complex object that describes:

 * all possible (both granted and not granted) permissions for the authority of the user (Tenant or Customer);
 * all granted permissions for the user;

 The result impacts UI behavior and hides certain UI elements if user has no permissions to invoke the related operations. Nevertheless, all API calls check the permissions each time they are executed on the server side.You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

 Security check is performed to verify that the user has 'READ' permission for the entity (entities).

     
    Accept : 'application/json'

#### GET /api/noauth/whiteLabel/loginWhiteLabelParams{?faviconChecksum,logoImageChecksum}

Returns login white-labeling parameters based on the hostname from request.

    logoImageChecksum : string
    faviconChecksum : string
     
    Accept : 'application/json'

#### GET /api/tenant/whiteLabelingAllowed

tenantWhiteLabelingAllowed

     
    Accept : 'application/json'

#### GET /api/whiteLabel/currentLoginWhiteLabelParams

Fetch the Login  White Labeling configuration that corresponds to the authority of the user. The API call is designed to load the Login White Labeling configuration for edition. So, the result is NOT merged with the parent level White Labeling configuration. Let's assume there is a custom White Labeling  configured on a system level. And there is no custom White Labeling  items configured on a tenant level. In such a case, the API call will return default object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### GET /api/whiteLabel/currentWhiteLabelParams

Fetch the White Labeling configuration that corresponds to the authority of the user. The API call is designed to load the White Labeling configuration for edition. So, the result is NOT merged with the parent level White Labeling configuration. Let's assume there is a custom White Labeling  configured on a system level. And there is no custom White Labeling  items configured on a tenant level. In such a case, the API call will return default object for the tenant administrator. 

Security check is performed to verify that the user has 'READ' permission for the white labeling resource.

     
    Accept : 'application/json'

#### GET /api/whiteLabel/isCustomerWhiteLabelingAllowed

Check if the White Labeling is enabled for the customers of the current tenant

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

Available for users with 'TENANT_ADMIN' authority.

     
    Accept : 'application/json'

#### GET /api/whiteLabel/isWhiteLabelingAllowed

Check if the White Labeling is enabled for the current user owner (tenant or customer)

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

Available for users with 'TENANT_ADMIN' or 'CUSTOMER_USER' authority.

     
    Accept : 'application/json'

#### POST /api/whiteLabel/loginWhiteLabelParams

Creates or Updates the White Labeling configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/whiteLabel/previewWhiteLabelParams

Merge the White Labeling configuration with the parent configuration and return the result.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/whiteLabel/whiteLabelParams

Creates or Updates the White Labeling configuration.

Security check is performed to verify that the user has 'WRITE' permission for the white labeling resource.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/whiteLabel/whiteLabelParams{?faviconChecksum,logoImageChecksum}

Returns white-labeling parameters for the current user.

    logoImageChecksum : string
    faviconChecksum : string
     
    Accept : 'application/json'

#### POST /api/widgetType

Create or update the Widget Type. Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory. When creating the Widget Type, platform generates Widget Type Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Widget Type Id will be present in the response. Specify existing Widget Type id to update the Widget Type. Referencing non-existing Widget Type Id will cause 'Not Found' error.

Widget Type alias is unique in the scope of Widget Bundle. Special Tenant Id '13814000-1dd2-11b2-8080-808080808080' is automatically used if the create request is sent by user with 'SYS_ADMIN' authority.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/widgetType/{widgetTypeId}

Get the Widget Type Details based on the provided Widget Type Id. Widget Type Details extend Widget Type and add image and description properties. Those properties are useful to edit the Widget Type but they are not required for Dashboard rendering. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    widgetTypeId : string
     
    Accept : 'application/json'

#### DELETE /api/widgetType/{widgetTypeId}

Deletes the  Widget Type. Referencing non-existing Widget Type Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    widgetTypeId : string
     
    Accept : 'application/json'

#### GET /api/widgetTypesDetails{?bundleAlias,isSystem}

Returns an array of Widget Type Details objects that belong to specified Widget Bundle.Widget Type Details extend Widget Type and add image and description properties. Those properties are useful to edit the Widget Type but they are not required for Dashboard rendering.  

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    isSystem : boolean
    bundleAlias : string
     
    Accept : 'application/json'

#### GET /api/widgetTypesInfos{?bundleAlias,isSystem}

Get the Widget Type Info objects based on the provided parameters. Widget Type Info is a lightweight object that represents Widget Type but does not contain the heavyweight widget descriptor JSON

Available for any authorized user. 

    isSystem : boolean
    bundleAlias : string
     
    Accept : 'application/json'

#### GET /api/widgetTypes{?bundleAlias,isSystem}

Returns an array of Widget Type objects that belong to specified Widget Bundle.Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory. 

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    isSystem : boolean
    bundleAlias : string
     
    Accept : 'application/json'

#### GET /api/widgetType{?alias,bundleAlias,isSystem}

Get the Widget Type based on the provided parameters. Widget Type represents the template for widget creation. Widget Type and Widget are similar to class and object in OOP theory.

Available for any authorized user. 

    isSystem : boolean
    bundleAlias : string
    alias : string
     
    Accept : 'application/json'

#### POST /api/widgetsBundle

Create or update the Widget Bundle. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  When creating the bundle, platform generates Widget Bundle Id as [time-based UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address)). The newly created Widget Bundle Id will be present in the response. Specify existing Widget Bundle id to update the Widget Bundle. Referencing non-existing Widget Bundle Id will cause 'Not Found' error.

Widget Bundle alias is unique in the scope of tenant. Special Tenant Id '13814000-1dd2-11b2-8080-808080808080' is automatically used if the create bundle request is sent by user with 'SYS_ADMIN' authority.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/widgetsBundle/{widgetsBundleId}

Get the Widget Bundle based on the provided Widget Bundle Id. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case. 

Available for any authorized user. 

    widgetsBundleId : string
     
    Accept : 'application/json'

#### DELETE /api/widgetsBundle/{widgetsBundleId}

Deletes the widget bundle. Referencing non-existing Widget Bundle Id will cause an error.

Available for users with 'SYS_ADMIN' or 'TENANT_ADMIN' authority.

    widgetsBundleId : string
     
    Accept : 'application/json'

#### GET /api/widgetsBundles

Returns an array of Widget Bundle objects that are available for current user.Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  

Available for any authorized user. 

     
    Accept : 'application/json'

#### GET /api/widgetsBundles{?page,pageSize,sortOrder,sortProperty,textSearch}

Returns a page of Widget Bundle objects available for current user. Widget Bundle represents a group(bundle) of widgets. Widgets are grouped into bundle by type or use case.  You can specify parameters to filter the results. The result is wrapped with PageData object that allows you to iterate over result set using pagination. See the 'Model' tab of the Response Class for more details. 

Available for any authorized user. 

    pageSize : integer
    page : integer
    textSearch : string
    sortProperty : string
    sortOrder : string
     
    Accept : 'application/json'


## License

#### Apache License Version 2.0

https://github.com/thingsboard/thingsboard/blob/master/LICENSE