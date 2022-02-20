'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function ThingsboardPeRestApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.saveSecuritySettingsUsingPOST_body = config.saveSecuritySettingsUsingPOST_body;
        this.saveSecuritySettingsUsingPOST_bodyType = config.saveSecuritySettingsUsingPOST_bodyType || 'str';
        this.saveAdminSettingsUsingPOST_body = config.saveAdminSettingsUsingPOST_body;
        this.saveAdminSettingsUsingPOST_bodyType = config.saveAdminSettingsUsingPOST_bodyType || 'str';
        this.sendTestMailUsingPOST_body = config.sendTestMailUsingPOST_body;
        this.sendTestMailUsingPOST_bodyType = config.sendTestMailUsingPOST_bodyType || 'str';
        this.sendTestSmsUsingPOST_body = config.sendTestSmsUsingPOST_body;
        this.sendTestSmsUsingPOST_bodyType = config.sendTestSmsUsingPOST_bodyType || 'str';
        this.getAdminSettingsUsingGET_key = config.getAdminSettingsUsingGET_key;
        this.getAdminSettingsUsingGET_keyType = config.getAdminSettingsUsingGET_keyType || 'str';
        this.getAdminSettingsUsingGET_systemByDefault = config.getAdminSettingsUsingGET_systemByDefault;
        this.getAdminSettingsUsingGET_systemByDefaultType = config.getAdminSettingsUsingGET_systemByDefaultType || 'str';
        this.loginPost_body = config.loginPost_body;
        this.loginPost_bodyType = config.loginPost_bodyType || 'str';
        this.saveAlarmUsingPOST_body = config.saveAlarmUsingPOST_body;
        this.saveAlarmUsingPOST_bodyType = config.saveAlarmUsingPOST_bodyType || 'str';
        this.getHighestAlarmSeverityUsingGET_entityType = config.getHighestAlarmSeverityUsingGET_entityType;
        this.getHighestAlarmSeverityUsingGET_entityTypeType = config.getHighestAlarmSeverityUsingGET_entityTypeType || 'str';
        this.getHighestAlarmSeverityUsingGET_entityId = config.getHighestAlarmSeverityUsingGET_entityId;
        this.getHighestAlarmSeverityUsingGET_entityIdType = config.getHighestAlarmSeverityUsingGET_entityIdType || 'str';
        this.getHighestAlarmSeverityUsingGET_searchStatus = config.getHighestAlarmSeverityUsingGET_searchStatus;
        this.getHighestAlarmSeverityUsingGET_searchStatusType = config.getHighestAlarmSeverityUsingGET_searchStatusType || 'str';
        this.getHighestAlarmSeverityUsingGET_status = config.getHighestAlarmSeverityUsingGET_status;
        this.getHighestAlarmSeverityUsingGET_statusType = config.getHighestAlarmSeverityUsingGET_statusType || 'str';
        this.getAlarmInfoByIdUsingGET_alarmId = config.getAlarmInfoByIdUsingGET_alarmId;
        this.getAlarmInfoByIdUsingGET_alarmIdType = config.getAlarmInfoByIdUsingGET_alarmIdType || 'str';
        this.getAlarmByIdUsingGET_alarmId = config.getAlarmByIdUsingGET_alarmId;
        this.getAlarmByIdUsingGET_alarmIdType = config.getAlarmByIdUsingGET_alarmIdType || 'str';
        this.deleteAlarmUsingDELETE_alarmId = config.deleteAlarmUsingDELETE_alarmId;
        this.deleteAlarmUsingDELETE_alarmIdType = config.deleteAlarmUsingDELETE_alarmIdType || 'str';
        this.ackAlarmUsingPOST_alarmId = config.ackAlarmUsingPOST_alarmId;
        this.ackAlarmUsingPOST_alarmIdType = config.ackAlarmUsingPOST_alarmIdType || 'str';
        this.clearAlarmUsingPOST_alarmId = config.clearAlarmUsingPOST_alarmId;
        this.clearAlarmUsingPOST_alarmIdType = config.clearAlarmUsingPOST_alarmIdType || 'str';
        this.getAlarmsUsingGET_entityType = config.getAlarmsUsingGET_entityType;
        this.getAlarmsUsingGET_entityTypeType = config.getAlarmsUsingGET_entityTypeType || 'str';
        this.getAlarmsUsingGET_entityId = config.getAlarmsUsingGET_entityId;
        this.getAlarmsUsingGET_entityIdType = config.getAlarmsUsingGET_entityIdType || 'str';
        this.getAlarmsUsingGET_searchStatus = config.getAlarmsUsingGET_searchStatus;
        this.getAlarmsUsingGET_searchStatusType = config.getAlarmsUsingGET_searchStatusType || 'str';
        this.getAlarmsUsingGET_status = config.getAlarmsUsingGET_status;
        this.getAlarmsUsingGET_statusType = config.getAlarmsUsingGET_statusType || 'str';
        this.getAlarmsUsingGET_pageSize = config.getAlarmsUsingGET_pageSize;
        this.getAlarmsUsingGET_pageSizeType = config.getAlarmsUsingGET_pageSizeType || 'str';
        this.getAlarmsUsingGET_page = config.getAlarmsUsingGET_page;
        this.getAlarmsUsingGET_pageType = config.getAlarmsUsingGET_pageType || 'str';
        this.getAlarmsUsingGET_textSearch = config.getAlarmsUsingGET_textSearch;
        this.getAlarmsUsingGET_textSearchType = config.getAlarmsUsingGET_textSearchType || 'str';
        this.getAlarmsUsingGET_sortProperty = config.getAlarmsUsingGET_sortProperty;
        this.getAlarmsUsingGET_sortPropertyType = config.getAlarmsUsingGET_sortPropertyType || 'str';
        this.getAlarmsUsingGET_sortOrder = config.getAlarmsUsingGET_sortOrder;
        this.getAlarmsUsingGET_sortOrderType = config.getAlarmsUsingGET_sortOrderType || 'str';
        this.getAlarmsUsingGET_startTime = config.getAlarmsUsingGET_startTime;
        this.getAlarmsUsingGET_startTimeType = config.getAlarmsUsingGET_startTimeType || 'str';
        this.getAlarmsUsingGET_endTime = config.getAlarmsUsingGET_endTime;
        this.getAlarmsUsingGET_endTimeType = config.getAlarmsUsingGET_endTimeType || 'str';
        this.getAlarmsUsingGET_fetchOriginator = config.getAlarmsUsingGET_fetchOriginator;
        this.getAlarmsUsingGET_fetchOriginatorType = config.getAlarmsUsingGET_fetchOriginatorType || 'str';
        this.getAllAlarmsUsingGET_searchStatus = config.getAllAlarmsUsingGET_searchStatus;
        this.getAllAlarmsUsingGET_searchStatusType = config.getAllAlarmsUsingGET_searchStatusType || 'str';
        this.getAllAlarmsUsingGET_status = config.getAllAlarmsUsingGET_status;
        this.getAllAlarmsUsingGET_statusType = config.getAllAlarmsUsingGET_statusType || 'str';
        this.getAllAlarmsUsingGET_pageSize = config.getAllAlarmsUsingGET_pageSize;
        this.getAllAlarmsUsingGET_pageSizeType = config.getAllAlarmsUsingGET_pageSizeType || 'str';
        this.getAllAlarmsUsingGET_page = config.getAllAlarmsUsingGET_page;
        this.getAllAlarmsUsingGET_pageType = config.getAllAlarmsUsingGET_pageType || 'str';
        this.getAllAlarmsUsingGET_textSearch = config.getAllAlarmsUsingGET_textSearch;
        this.getAllAlarmsUsingGET_textSearchType = config.getAllAlarmsUsingGET_textSearchType || 'str';
        this.getAllAlarmsUsingGET_sortProperty = config.getAllAlarmsUsingGET_sortProperty;
        this.getAllAlarmsUsingGET_sortPropertyType = config.getAllAlarmsUsingGET_sortPropertyType || 'str';
        this.getAllAlarmsUsingGET_sortOrder = config.getAllAlarmsUsingGET_sortOrder;
        this.getAllAlarmsUsingGET_sortOrderType = config.getAllAlarmsUsingGET_sortOrderType || 'str';
        this.getAllAlarmsUsingGET_startTime = config.getAllAlarmsUsingGET_startTime;
        this.getAllAlarmsUsingGET_startTimeType = config.getAllAlarmsUsingGET_startTimeType || 'str';
        this.getAllAlarmsUsingGET_endTime = config.getAllAlarmsUsingGET_endTime;
        this.getAllAlarmsUsingGET_endTimeType = config.getAllAlarmsUsingGET_endTimeType || 'str';
        this.getAllAlarmsUsingGET_fetchOriginator = config.getAllAlarmsUsingGET_fetchOriginator;
        this.getAllAlarmsUsingGET_fetchOriginatorType = config.getAllAlarmsUsingGET_fetchOriginatorType || 'str';
        this.processAssetBulkImportUsingPOST_body = config.processAssetBulkImportUsingPOST_body;
        this.processAssetBulkImportUsingPOST_bodyType = config.processAssetBulkImportUsingPOST_bodyType || 'str';
        this.getAssetByIdUsingGET_assetId = config.getAssetByIdUsingGET_assetId;
        this.getAssetByIdUsingGET_assetIdType = config.getAssetByIdUsingGET_assetIdType || 'str';
        this.deleteAssetUsingDELETE_assetId = config.deleteAssetUsingDELETE_assetId;
        this.deleteAssetUsingDELETE_assetIdType = config.deleteAssetUsingDELETE_assetIdType || 'str';
        this.findByQueryUsingPOST_body = config.findByQueryUsingPOST_body;
        this.findByQueryUsingPOST_bodyType = config.findByQueryUsingPOST_bodyType || 'str';
        this.getAssetsByIdsUsingGET_assetIds = config.getAssetsByIdsUsingGET_assetIds;
        this.getAssetsByIdsUsingGET_assetIdsType = config.getAssetsByIdsUsingGET_assetIdsType || 'str';
        this.saveAssetUsingPOST_entityGroupId = config.saveAssetUsingPOST_entityGroupId;
        this.saveAssetUsingPOST_entityGroupIdType = config.saveAssetUsingPOST_entityGroupIdType || 'str';
        this.saveAssetUsingPOST_body = config.saveAssetUsingPOST_body;
        this.saveAssetUsingPOST_bodyType = config.saveAssetUsingPOST_bodyType || 'str';
        this.getCustomerAssetsUsingGET_customerId = config.getCustomerAssetsUsingGET_customerId;
        this.getCustomerAssetsUsingGET_customerIdType = config.getCustomerAssetsUsingGET_customerIdType || 'str';
        this.getCustomerAssetsUsingGET_pageSize = config.getCustomerAssetsUsingGET_pageSize;
        this.getCustomerAssetsUsingGET_pageSizeType = config.getCustomerAssetsUsingGET_pageSizeType || 'str';
        this.getCustomerAssetsUsingGET_page = config.getCustomerAssetsUsingGET_page;
        this.getCustomerAssetsUsingGET_pageType = config.getCustomerAssetsUsingGET_pageType || 'str';
        this.getCustomerAssetsUsingGET_type = config.getCustomerAssetsUsingGET_type;
        this.getCustomerAssetsUsingGET_typeType = config.getCustomerAssetsUsingGET_typeType || 'str';
        this.getCustomerAssetsUsingGET_textSearch = config.getCustomerAssetsUsingGET_textSearch;
        this.getCustomerAssetsUsingGET_textSearchType = config.getCustomerAssetsUsingGET_textSearchType || 'str';
        this.getCustomerAssetsUsingGET_sortProperty = config.getCustomerAssetsUsingGET_sortProperty;
        this.getCustomerAssetsUsingGET_sortPropertyType = config.getCustomerAssetsUsingGET_sortPropertyType || 'str';
        this.getCustomerAssetsUsingGET_sortOrder = config.getCustomerAssetsUsingGET_sortOrder;
        this.getCustomerAssetsUsingGET_sortOrderType = config.getCustomerAssetsUsingGET_sortOrderType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_entityGroupId = config.getAssetsByEntityGroupIdUsingGET_entityGroupId;
        this.getAssetsByEntityGroupIdUsingGET_entityGroupIdType = config.getAssetsByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_pageSize = config.getAssetsByEntityGroupIdUsingGET_pageSize;
        this.getAssetsByEntityGroupIdUsingGET_pageSizeType = config.getAssetsByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_page = config.getAssetsByEntityGroupIdUsingGET_page;
        this.getAssetsByEntityGroupIdUsingGET_pageType = config.getAssetsByEntityGroupIdUsingGET_pageType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_textSearch = config.getAssetsByEntityGroupIdUsingGET_textSearch;
        this.getAssetsByEntityGroupIdUsingGET_textSearchType = config.getAssetsByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_sortProperty = config.getAssetsByEntityGroupIdUsingGET_sortProperty;
        this.getAssetsByEntityGroupIdUsingGET_sortPropertyType = config.getAssetsByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getAssetsByEntityGroupIdUsingGET_sortOrder = config.getAssetsByEntityGroupIdUsingGET_sortOrder;
        this.getAssetsByEntityGroupIdUsingGET_sortOrderType = config.getAssetsByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.getTenantAssetUsingGET_assetName = config.getTenantAssetUsingGET_assetName;
        this.getTenantAssetUsingGET_assetNameType = config.getTenantAssetUsingGET_assetNameType || 'str';
        this.getTenantAssetsUsingGET_pageSize = config.getTenantAssetsUsingGET_pageSize;
        this.getTenantAssetsUsingGET_pageSizeType = config.getTenantAssetsUsingGET_pageSizeType || 'str';
        this.getTenantAssetsUsingGET_page = config.getTenantAssetsUsingGET_page;
        this.getTenantAssetsUsingGET_pageType = config.getTenantAssetsUsingGET_pageType || 'str';
        this.getTenantAssetsUsingGET_type = config.getTenantAssetsUsingGET_type;
        this.getTenantAssetsUsingGET_typeType = config.getTenantAssetsUsingGET_typeType || 'str';
        this.getTenantAssetsUsingGET_textSearch = config.getTenantAssetsUsingGET_textSearch;
        this.getTenantAssetsUsingGET_textSearchType = config.getTenantAssetsUsingGET_textSearchType || 'str';
        this.getTenantAssetsUsingGET_sortProperty = config.getTenantAssetsUsingGET_sortProperty;
        this.getTenantAssetsUsingGET_sortPropertyType = config.getTenantAssetsUsingGET_sortPropertyType || 'str';
        this.getTenantAssetsUsingGET_sortOrder = config.getTenantAssetsUsingGET_sortOrder;
        this.getTenantAssetsUsingGET_sortOrderType = config.getTenantAssetsUsingGET_sortOrderType || 'str';
        this.getUserAssetsUsingGET_pageSize = config.getUserAssetsUsingGET_pageSize;
        this.getUserAssetsUsingGET_pageSizeType = config.getUserAssetsUsingGET_pageSizeType || 'str';
        this.getUserAssetsUsingGET_page = config.getUserAssetsUsingGET_page;
        this.getUserAssetsUsingGET_pageType = config.getUserAssetsUsingGET_pageType || 'str';
        this.getUserAssetsUsingGET_type = config.getUserAssetsUsingGET_type;
        this.getUserAssetsUsingGET_typeType = config.getUserAssetsUsingGET_typeType || 'str';
        this.getUserAssetsUsingGET_textSearch = config.getUserAssetsUsingGET_textSearch;
        this.getUserAssetsUsingGET_textSearchType = config.getUserAssetsUsingGET_textSearchType || 'str';
        this.getUserAssetsUsingGET_sortProperty = config.getUserAssetsUsingGET_sortProperty;
        this.getUserAssetsUsingGET_sortPropertyType = config.getUserAssetsUsingGET_sortPropertyType || 'str';
        this.getUserAssetsUsingGET_sortOrder = config.getUserAssetsUsingGET_sortOrder;
        this.getUserAssetsUsingGET_sortOrderType = config.getUserAssetsUsingGET_sortOrderType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_customerId = config.getAuditLogsByCustomerIdUsingGET_customerId;
        this.getAuditLogsByCustomerIdUsingGET_customerIdType = config.getAuditLogsByCustomerIdUsingGET_customerIdType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_pageSize = config.getAuditLogsByCustomerIdUsingGET_pageSize;
        this.getAuditLogsByCustomerIdUsingGET_pageSizeType = config.getAuditLogsByCustomerIdUsingGET_pageSizeType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_page = config.getAuditLogsByCustomerIdUsingGET_page;
        this.getAuditLogsByCustomerIdUsingGET_pageType = config.getAuditLogsByCustomerIdUsingGET_pageType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_textSearch = config.getAuditLogsByCustomerIdUsingGET_textSearch;
        this.getAuditLogsByCustomerIdUsingGET_textSearchType = config.getAuditLogsByCustomerIdUsingGET_textSearchType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_sortProperty = config.getAuditLogsByCustomerIdUsingGET_sortProperty;
        this.getAuditLogsByCustomerIdUsingGET_sortPropertyType = config.getAuditLogsByCustomerIdUsingGET_sortPropertyType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_sortOrder = config.getAuditLogsByCustomerIdUsingGET_sortOrder;
        this.getAuditLogsByCustomerIdUsingGET_sortOrderType = config.getAuditLogsByCustomerIdUsingGET_sortOrderType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_startTime = config.getAuditLogsByCustomerIdUsingGET_startTime;
        this.getAuditLogsByCustomerIdUsingGET_startTimeType = config.getAuditLogsByCustomerIdUsingGET_startTimeType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_endTime = config.getAuditLogsByCustomerIdUsingGET_endTime;
        this.getAuditLogsByCustomerIdUsingGET_endTimeType = config.getAuditLogsByCustomerIdUsingGET_endTimeType || 'str';
        this.getAuditLogsByCustomerIdUsingGET_actionTypes = config.getAuditLogsByCustomerIdUsingGET_actionTypes;
        this.getAuditLogsByCustomerIdUsingGET_actionTypesType = config.getAuditLogsByCustomerIdUsingGET_actionTypesType || 'str';
        this.getAuditLogsByEntityIdUsingGET_entityType = config.getAuditLogsByEntityIdUsingGET_entityType;
        this.getAuditLogsByEntityIdUsingGET_entityTypeType = config.getAuditLogsByEntityIdUsingGET_entityTypeType || 'str';
        this.getAuditLogsByEntityIdUsingGET_entityId = config.getAuditLogsByEntityIdUsingGET_entityId;
        this.getAuditLogsByEntityIdUsingGET_entityIdType = config.getAuditLogsByEntityIdUsingGET_entityIdType || 'str';
        this.getAuditLogsByEntityIdUsingGET_pageSize = config.getAuditLogsByEntityIdUsingGET_pageSize;
        this.getAuditLogsByEntityIdUsingGET_pageSizeType = config.getAuditLogsByEntityIdUsingGET_pageSizeType || 'str';
        this.getAuditLogsByEntityIdUsingGET_page = config.getAuditLogsByEntityIdUsingGET_page;
        this.getAuditLogsByEntityIdUsingGET_pageType = config.getAuditLogsByEntityIdUsingGET_pageType || 'str';
        this.getAuditLogsByEntityIdUsingGET_textSearch = config.getAuditLogsByEntityIdUsingGET_textSearch;
        this.getAuditLogsByEntityIdUsingGET_textSearchType = config.getAuditLogsByEntityIdUsingGET_textSearchType || 'str';
        this.getAuditLogsByEntityIdUsingGET_sortProperty = config.getAuditLogsByEntityIdUsingGET_sortProperty;
        this.getAuditLogsByEntityIdUsingGET_sortPropertyType = config.getAuditLogsByEntityIdUsingGET_sortPropertyType || 'str';
        this.getAuditLogsByEntityIdUsingGET_sortOrder = config.getAuditLogsByEntityIdUsingGET_sortOrder;
        this.getAuditLogsByEntityIdUsingGET_sortOrderType = config.getAuditLogsByEntityIdUsingGET_sortOrderType || 'str';
        this.getAuditLogsByEntityIdUsingGET_startTime = config.getAuditLogsByEntityIdUsingGET_startTime;
        this.getAuditLogsByEntityIdUsingGET_startTimeType = config.getAuditLogsByEntityIdUsingGET_startTimeType || 'str';
        this.getAuditLogsByEntityIdUsingGET_endTime = config.getAuditLogsByEntityIdUsingGET_endTime;
        this.getAuditLogsByEntityIdUsingGET_endTimeType = config.getAuditLogsByEntityIdUsingGET_endTimeType || 'str';
        this.getAuditLogsByEntityIdUsingGET_actionTypes = config.getAuditLogsByEntityIdUsingGET_actionTypes;
        this.getAuditLogsByEntityIdUsingGET_actionTypesType = config.getAuditLogsByEntityIdUsingGET_actionTypesType || 'str';
        this.getAuditLogsByUserIdUsingGET_userId = config.getAuditLogsByUserIdUsingGET_userId;
        this.getAuditLogsByUserIdUsingGET_userIdType = config.getAuditLogsByUserIdUsingGET_userIdType || 'str';
        this.getAuditLogsByUserIdUsingGET_pageSize = config.getAuditLogsByUserIdUsingGET_pageSize;
        this.getAuditLogsByUserIdUsingGET_pageSizeType = config.getAuditLogsByUserIdUsingGET_pageSizeType || 'str';
        this.getAuditLogsByUserIdUsingGET_page = config.getAuditLogsByUserIdUsingGET_page;
        this.getAuditLogsByUserIdUsingGET_pageType = config.getAuditLogsByUserIdUsingGET_pageType || 'str';
        this.getAuditLogsByUserIdUsingGET_textSearch = config.getAuditLogsByUserIdUsingGET_textSearch;
        this.getAuditLogsByUserIdUsingGET_textSearchType = config.getAuditLogsByUserIdUsingGET_textSearchType || 'str';
        this.getAuditLogsByUserIdUsingGET_sortProperty = config.getAuditLogsByUserIdUsingGET_sortProperty;
        this.getAuditLogsByUserIdUsingGET_sortPropertyType = config.getAuditLogsByUserIdUsingGET_sortPropertyType || 'str';
        this.getAuditLogsByUserIdUsingGET_sortOrder = config.getAuditLogsByUserIdUsingGET_sortOrder;
        this.getAuditLogsByUserIdUsingGET_sortOrderType = config.getAuditLogsByUserIdUsingGET_sortOrderType || 'str';
        this.getAuditLogsByUserIdUsingGET_startTime = config.getAuditLogsByUserIdUsingGET_startTime;
        this.getAuditLogsByUserIdUsingGET_startTimeType = config.getAuditLogsByUserIdUsingGET_startTimeType || 'str';
        this.getAuditLogsByUserIdUsingGET_endTime = config.getAuditLogsByUserIdUsingGET_endTime;
        this.getAuditLogsByUserIdUsingGET_endTimeType = config.getAuditLogsByUserIdUsingGET_endTimeType || 'str';
        this.getAuditLogsByUserIdUsingGET_actionTypes = config.getAuditLogsByUserIdUsingGET_actionTypes;
        this.getAuditLogsByUserIdUsingGET_actionTypesType = config.getAuditLogsByUserIdUsingGET_actionTypesType || 'str';
        this.getAuditLogsUsingGET_pageSize = config.getAuditLogsUsingGET_pageSize;
        this.getAuditLogsUsingGET_pageSizeType = config.getAuditLogsUsingGET_pageSizeType || 'str';
        this.getAuditLogsUsingGET_page = config.getAuditLogsUsingGET_page;
        this.getAuditLogsUsingGET_pageType = config.getAuditLogsUsingGET_pageType || 'str';
        this.getAuditLogsUsingGET_textSearch = config.getAuditLogsUsingGET_textSearch;
        this.getAuditLogsUsingGET_textSearchType = config.getAuditLogsUsingGET_textSearchType || 'str';
        this.getAuditLogsUsingGET_sortProperty = config.getAuditLogsUsingGET_sortProperty;
        this.getAuditLogsUsingGET_sortPropertyType = config.getAuditLogsUsingGET_sortPropertyType || 'str';
        this.getAuditLogsUsingGET_sortOrder = config.getAuditLogsUsingGET_sortOrder;
        this.getAuditLogsUsingGET_sortOrderType = config.getAuditLogsUsingGET_sortOrderType || 'str';
        this.getAuditLogsUsingGET_startTime = config.getAuditLogsUsingGET_startTime;
        this.getAuditLogsUsingGET_startTimeType = config.getAuditLogsUsingGET_startTimeType || 'str';
        this.getAuditLogsUsingGET_endTime = config.getAuditLogsUsingGET_endTime;
        this.getAuditLogsUsingGET_endTimeType = config.getAuditLogsUsingGET_endTimeType || 'str';
        this.getAuditLogsUsingGET_actionTypes = config.getAuditLogsUsingGET_actionTypes;
        this.getAuditLogsUsingGET_actionTypesType = config.getAuditLogsUsingGET_actionTypesType || 'str';
        this.changePasswordUsingPOST_body = config.changePasswordUsingPOST_body;
        this.changePasswordUsingPOST_bodyType = config.changePasswordUsingPOST_bodyType || 'str';
        this.checkActivateTokenUsingGET_activateToken = config.checkActivateTokenUsingGET_activateToken;
        this.checkActivateTokenUsingGET_activateTokenType = config.checkActivateTokenUsingGET_activateTokenType || 'str';
        this.activateUserUsingPOST_sendActivationMail = config.activateUserUsingPOST_sendActivationMail;
        this.activateUserUsingPOST_sendActivationMailType = config.activateUserUsingPOST_sendActivationMailType || 'str';
        this.activateUserUsingPOST_body = config.activateUserUsingPOST_body;
        this.activateUserUsingPOST_bodyType = config.activateUserUsingPOST_bodyType || 'str';
        this.resetPasswordUsingPOST_body = config.resetPasswordUsingPOST_body;
        this.resetPasswordUsingPOST_bodyType = config.resetPasswordUsingPOST_bodyType || 'str';
        this.requestResetPasswordByEmailUsingPOST_body = config.requestResetPasswordByEmailUsingPOST_body;
        this.requestResetPasswordByEmailUsingPOST_bodyType = config.requestResetPasswordByEmailUsingPOST_bodyType || 'str';
        this.checkResetTokenUsingGET_resetToken = config.checkResetTokenUsingGET_resetToken;
        this.checkResetTokenUsingGET_resetTokenType = config.checkResetTokenUsingGET_resetTokenType || 'str';
        this.getBlobEntitiesByIdsUsingGET_blobEntityIds = config.getBlobEntitiesByIdsUsingGET_blobEntityIds;
        this.getBlobEntitiesByIdsUsingGET_blobEntityIdsType = config.getBlobEntitiesByIdsUsingGET_blobEntityIdsType || 'str';
        this.getBlobEntitiesUsingGET_pageSize = config.getBlobEntitiesUsingGET_pageSize;
        this.getBlobEntitiesUsingGET_pageSizeType = config.getBlobEntitiesUsingGET_pageSizeType || 'str';
        this.getBlobEntitiesUsingGET_page = config.getBlobEntitiesUsingGET_page;
        this.getBlobEntitiesUsingGET_pageType = config.getBlobEntitiesUsingGET_pageType || 'str';
        this.getBlobEntitiesUsingGET_type = config.getBlobEntitiesUsingGET_type;
        this.getBlobEntitiesUsingGET_typeType = config.getBlobEntitiesUsingGET_typeType || 'str';
        this.getBlobEntitiesUsingGET_textSearch = config.getBlobEntitiesUsingGET_textSearch;
        this.getBlobEntitiesUsingGET_textSearchType = config.getBlobEntitiesUsingGET_textSearchType || 'str';
        this.getBlobEntitiesUsingGET_sortProperty = config.getBlobEntitiesUsingGET_sortProperty;
        this.getBlobEntitiesUsingGET_sortPropertyType = config.getBlobEntitiesUsingGET_sortPropertyType || 'str';
        this.getBlobEntitiesUsingGET_sortOrder = config.getBlobEntitiesUsingGET_sortOrder;
        this.getBlobEntitiesUsingGET_sortOrderType = config.getBlobEntitiesUsingGET_sortOrderType || 'str';
        this.getBlobEntitiesUsingGET_startTime = config.getBlobEntitiesUsingGET_startTime;
        this.getBlobEntitiesUsingGET_startTimeType = config.getBlobEntitiesUsingGET_startTimeType || 'str';
        this.getBlobEntitiesUsingGET_endTime = config.getBlobEntitiesUsingGET_endTime;
        this.getBlobEntitiesUsingGET_endTimeType = config.getBlobEntitiesUsingGET_endTimeType || 'str';
        this.getBlobEntityInfoByIdUsingGET_blobEntityId = config.getBlobEntityInfoByIdUsingGET_blobEntityId;
        this.getBlobEntityInfoByIdUsingGET_blobEntityIdType = config.getBlobEntityInfoByIdUsingGET_blobEntityIdType || 'str';
        this.deleteBlobEntityUsingDELETE_blobEntityId = config.deleteBlobEntityUsingDELETE_blobEntityId;
        this.deleteBlobEntityUsingDELETE_blobEntityIdType = config.deleteBlobEntityUsingDELETE_blobEntityIdType || 'str';
        this.downloadBlobEntityUsingGET_blobEntityId = config.downloadBlobEntityUsingGET_blobEntityId;
        this.downloadBlobEntityUsingGET_blobEntityIdType = config.downloadBlobEntityUsingGET_blobEntityIdType || 'str';
        this.getComponentDescriptorByClazzUsingGET_componentDescriptorClazz = config.getComponentDescriptorByClazzUsingGET_componentDescriptorClazz;
        this.getComponentDescriptorByClazzUsingGET_componentDescriptorClazzType = config.getComponentDescriptorByClazzUsingGET_componentDescriptorClazzType || 'str';
        this.getComponentDescriptorsByTypeUsingGET_componentType = config.getComponentDescriptorsByTypeUsingGET_componentType;
        this.getComponentDescriptorsByTypeUsingGET_componentTypeType = config.getComponentDescriptorsByTypeUsingGET_componentTypeType || 'str';
        this.getComponentDescriptorsByTypeUsingGET_ruleChainType = config.getComponentDescriptorsByTypeUsingGET_ruleChainType;
        this.getComponentDescriptorsByTypeUsingGET_ruleChainTypeType = config.getComponentDescriptorsByTypeUsingGET_ruleChainTypeType || 'str';
        this.getComponentDescriptorsByTypesUsingGET_componentTypes = config.getComponentDescriptorsByTypesUsingGET_componentTypes;
        this.getComponentDescriptorsByTypesUsingGET_componentTypesType = config.getComponentDescriptorsByTypesUsingGET_componentTypesType || 'str';
        this.getComponentDescriptorsByTypesUsingGET_ruleChainType = config.getComponentDescriptorsByTypesUsingGET_ruleChainType;
        this.getComponentDescriptorsByTypesUsingGET_ruleChainTypeType = config.getComponentDescriptorsByTypesUsingGET_ruleChainTypeType || 'str';
        this.saveConverterUsingPOST_body = config.saveConverterUsingPOST_body;
        this.saveConverterUsingPOST_bodyType = config.saveConverterUsingPOST_bodyType || 'str';
        this.testDownLinkConverterUsingPOST_body = config.testDownLinkConverterUsingPOST_body;
        this.testDownLinkConverterUsingPOST_bodyType = config.testDownLinkConverterUsingPOST_bodyType || 'str';
        this.testUpLinkConverterUsingPOST_body = config.testUpLinkConverterUsingPOST_body;
        this.testUpLinkConverterUsingPOST_bodyType = config.testUpLinkConverterUsingPOST_bodyType || 'str';
        this.getConverterByIdUsingGET_converterId = config.getConverterByIdUsingGET_converterId;
        this.getConverterByIdUsingGET_converterIdType = config.getConverterByIdUsingGET_converterIdType || 'str';
        this.deleteConverterUsingDELETE_converterId = config.deleteConverterUsingDELETE_converterId;
        this.deleteConverterUsingDELETE_converterIdType = config.deleteConverterUsingDELETE_converterIdType || 'str';
        this.getLatestConverterDebugInputUsingGET_converterId = config.getLatestConverterDebugInputUsingGET_converterId;
        this.getLatestConverterDebugInputUsingGET_converterIdType = config.getLatestConverterDebugInputUsingGET_converterIdType || 'str';
        this.getConvertersByIdsUsingGET_converterIds = config.getConvertersByIdsUsingGET_converterIds;
        this.getConvertersByIdsUsingGET_converterIdsType = config.getConvertersByIdsUsingGET_converterIdsType || 'str';
        this.getConvertersUsingGET_pageSize = config.getConvertersUsingGET_pageSize;
        this.getConvertersUsingGET_pageSizeType = config.getConvertersUsingGET_pageSizeType || 'str';
        this.getConvertersUsingGET_page = config.getConvertersUsingGET_page;
        this.getConvertersUsingGET_pageType = config.getConvertersUsingGET_pageType || 'str';
        this.getConvertersUsingGET_textSearch = config.getConvertersUsingGET_textSearch;
        this.getConvertersUsingGET_textSearchType = config.getConvertersUsingGET_textSearchType || 'str';
        this.getConvertersUsingGET_sortProperty = config.getConvertersUsingGET_sortProperty;
        this.getConvertersUsingGET_sortPropertyType = config.getConvertersUsingGET_sortPropertyType || 'str';
        this.getConvertersUsingGET_sortOrder = config.getConvertersUsingGET_sortOrder;
        this.getConvertersUsingGET_sortOrderType = config.getConvertersUsingGET_sortOrderType || 'str';
        this.saveCustomMenuUsingPOST_body = config.saveCustomMenuUsingPOST_body;
        this.saveCustomMenuUsingPOST_bodyType = config.saveCustomMenuUsingPOST_bodyType || 'str';
        this.saveCustomTranslationUsingPOST_body = config.saveCustomTranslationUsingPOST_body;
        this.saveCustomTranslationUsingPOST_bodyType = config.saveCustomTranslationUsingPOST_bodyType || 'str';
        this.getCustomerByIdUsingGET_customerId = config.getCustomerByIdUsingGET_customerId;
        this.getCustomerByIdUsingGET_customerIdType = config.getCustomerByIdUsingGET_customerIdType || 'str';
        this.deleteCustomerUsingDELETE_customerId = config.deleteCustomerUsingDELETE_customerId;
        this.deleteCustomerUsingDELETE_customerIdType = config.deleteCustomerUsingDELETE_customerIdType || 'str';
        this.getShortCustomerInfoByIdUsingGET_customerId = config.getShortCustomerInfoByIdUsingGET_customerId;
        this.getShortCustomerInfoByIdUsingGET_customerIdType = config.getShortCustomerInfoByIdUsingGET_customerIdType || 'str';
        this.getCustomerTitleByIdUsingGET_customerId = config.getCustomerTitleByIdUsingGET_customerId;
        this.getCustomerTitleByIdUsingGET_customerIdType = config.getCustomerTitleByIdUsingGET_customerIdType || 'str';
        this.getCustomersByIdsUsingGET_customerIds = config.getCustomersByIdsUsingGET_customerIds;
        this.getCustomersByIdsUsingGET_customerIdsType = config.getCustomersByIdsUsingGET_customerIdsType || 'str';
        this.getCustomersUsingGET_pageSize = config.getCustomersUsingGET_pageSize;
        this.getCustomersUsingGET_pageSizeType = config.getCustomersUsingGET_pageSizeType || 'str';
        this.getCustomersUsingGET_page = config.getCustomersUsingGET_page;
        this.getCustomersUsingGET_pageType = config.getCustomersUsingGET_pageType || 'str';
        this.getCustomersUsingGET_textSearch = config.getCustomersUsingGET_textSearch;
        this.getCustomersUsingGET_textSearchType = config.getCustomersUsingGET_textSearchType || 'str';
        this.getCustomersUsingGET_sortProperty = config.getCustomersUsingGET_sortProperty;
        this.getCustomersUsingGET_sortPropertyType = config.getCustomersUsingGET_sortPropertyType || 'str';
        this.getCustomersUsingGET_sortOrder = config.getCustomersUsingGET_sortOrder;
        this.getCustomersUsingGET_sortOrderType = config.getCustomersUsingGET_sortOrderType || 'str';
        this.saveCustomerUsingPOST_entityGroupId = config.saveCustomerUsingPOST_entityGroupId;
        this.saveCustomerUsingPOST_entityGroupIdType = config.saveCustomerUsingPOST_entityGroupIdType || 'str';
        this.saveCustomerUsingPOST_body = config.saveCustomerUsingPOST_body;
        this.saveCustomerUsingPOST_bodyType = config.saveCustomerUsingPOST_bodyType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_entityGroupId = config.getCustomersByEntityGroupIdUsingGET_entityGroupId;
        this.getCustomersByEntityGroupIdUsingGET_entityGroupIdType = config.getCustomersByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_pageSize = config.getCustomersByEntityGroupIdUsingGET_pageSize;
        this.getCustomersByEntityGroupIdUsingGET_pageSizeType = config.getCustomersByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_page = config.getCustomersByEntityGroupIdUsingGET_page;
        this.getCustomersByEntityGroupIdUsingGET_pageType = config.getCustomersByEntityGroupIdUsingGET_pageType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_textSearch = config.getCustomersByEntityGroupIdUsingGET_textSearch;
        this.getCustomersByEntityGroupIdUsingGET_textSearchType = config.getCustomersByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_sortProperty = config.getCustomersByEntityGroupIdUsingGET_sortProperty;
        this.getCustomersByEntityGroupIdUsingGET_sortPropertyType = config.getCustomersByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getCustomersByEntityGroupIdUsingGET_sortOrder = config.getCustomersByEntityGroupIdUsingGET_sortOrder;
        this.getCustomersByEntityGroupIdUsingGET_sortOrderType = config.getCustomersByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.getTenantCustomerUsingGET_customerTitle = config.getTenantCustomerUsingGET_customerTitle;
        this.getTenantCustomerUsingGET_customerTitleType = config.getTenantCustomerUsingGET_customerTitleType || 'str';
        this.getUserCustomersUsingGET_pageSize = config.getUserCustomersUsingGET_pageSize;
        this.getUserCustomersUsingGET_pageSizeType = config.getUserCustomersUsingGET_pageSizeType || 'str';
        this.getUserCustomersUsingGET_page = config.getUserCustomersUsingGET_page;
        this.getUserCustomersUsingGET_pageType = config.getUserCustomersUsingGET_pageType || 'str';
        this.getUserCustomersUsingGET_textSearch = config.getUserCustomersUsingGET_textSearch;
        this.getUserCustomersUsingGET_textSearchType = config.getUserCustomersUsingGET_textSearchType || 'str';
        this.getUserCustomersUsingGET_sortProperty = config.getUserCustomersUsingGET_sortProperty;
        this.getUserCustomersUsingGET_sortPropertyType = config.getUserCustomersUsingGET_sortPropertyType || 'str';
        this.getUserCustomersUsingGET_sortOrder = config.getUserCustomersUsingGET_sortOrder;
        this.getUserCustomersUsingGET_sortOrderType = config.getUserCustomersUsingGET_sortOrderType || 'str';
        this.setCustomerHomeDashboardInfoUsingPOST_body = config.setCustomerHomeDashboardInfoUsingPOST_body;
        this.setCustomerHomeDashboardInfoUsingPOST_bodyType = config.setCustomerHomeDashboardInfoUsingPOST_bodyType || 'str';
        this.getDashboardInfoByIdUsingGET_dashboardId = config.getDashboardInfoByIdUsingGET_dashboardId;
        this.getDashboardInfoByIdUsingGET_dashboardIdType = config.getDashboardInfoByIdUsingGET_dashboardIdType || 'str';
        this.getDashboardByIdUsingGET_dashboardId = config.getDashboardByIdUsingGET_dashboardId;
        this.getDashboardByIdUsingGET_dashboardIdType = config.getDashboardByIdUsingGET_dashboardIdType || 'str';
        this.deleteDashboardUsingDELETE_dashboardId = config.deleteDashboardUsingDELETE_dashboardId;
        this.deleteDashboardUsingDELETE_dashboardIdType = config.deleteDashboardUsingDELETE_dashboardIdType || 'str';
        this.getDashboardsByIdsUsingGET_dashboardIds = config.getDashboardsByIdsUsingGET_dashboardIds;
        this.getDashboardsByIdsUsingGET_dashboardIdsType = config.getDashboardsByIdsUsingGET_dashboardIdsType || 'str';
        this.saveDashboardUsingPOST_entityGroupId = config.saveDashboardUsingPOST_entityGroupId;
        this.saveDashboardUsingPOST_entityGroupIdType = config.saveDashboardUsingPOST_entityGroupIdType || 'str';
        this.saveDashboardUsingPOST_body = config.saveDashboardUsingPOST_body;
        this.saveDashboardUsingPOST_bodyType = config.saveDashboardUsingPOST_bodyType || 'str';
        this.exportGroupDashboardsUsingGET_entityGroupId = config.exportGroupDashboardsUsingGET_entityGroupId;
        this.exportGroupDashboardsUsingGET_entityGroupIdType = config.exportGroupDashboardsUsingGET_entityGroupIdType || 'str';
        this.exportGroupDashboardsUsingGET_limit = config.exportGroupDashboardsUsingGET_limit;
        this.exportGroupDashboardsUsingGET_limitType = config.exportGroupDashboardsUsingGET_limitType || 'str';
        this.importGroupDashboardsUsingPOST_entityGroupId = config.importGroupDashboardsUsingPOST_entityGroupId;
        this.importGroupDashboardsUsingPOST_entityGroupIdType = config.importGroupDashboardsUsingPOST_entityGroupIdType || 'str';
        this.importGroupDashboardsUsingPOST_overwrite = config.importGroupDashboardsUsingPOST_overwrite;
        this.importGroupDashboardsUsingPOST_overwriteType = config.importGroupDashboardsUsingPOST_overwriteType || 'str';
        this.importGroupDashboardsUsingPOST_body = config.importGroupDashboardsUsingPOST_body;
        this.importGroupDashboardsUsingPOST_bodyType = config.importGroupDashboardsUsingPOST_bodyType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_entityGroupId = config.getDashboardsByEntityGroupIdUsingGET_entityGroupId;
        this.getDashboardsByEntityGroupIdUsingGET_entityGroupIdType = config.getDashboardsByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_pageSize = config.getDashboardsByEntityGroupIdUsingGET_pageSize;
        this.getDashboardsByEntityGroupIdUsingGET_pageSizeType = config.getDashboardsByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_page = config.getDashboardsByEntityGroupIdUsingGET_page;
        this.getDashboardsByEntityGroupIdUsingGET_pageType = config.getDashboardsByEntityGroupIdUsingGET_pageType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_textSearch = config.getDashboardsByEntityGroupIdUsingGET_textSearch;
        this.getDashboardsByEntityGroupIdUsingGET_textSearchType = config.getDashboardsByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_sortProperty = config.getDashboardsByEntityGroupIdUsingGET_sortProperty;
        this.getDashboardsByEntityGroupIdUsingGET_sortPropertyType = config.getDashboardsByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getDashboardsByEntityGroupIdUsingGET_sortOrder = config.getDashboardsByEntityGroupIdUsingGET_sortOrder;
        this.getDashboardsByEntityGroupIdUsingGET_sortOrderType = config.getDashboardsByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.setTenantHomeDashboardInfoUsingPOST_body = config.setTenantHomeDashboardInfoUsingPOST_body;
        this.setTenantHomeDashboardInfoUsingPOST_bodyType = config.setTenantHomeDashboardInfoUsingPOST_bodyType || 'str';
        this.getTenantDashboardsUsingGET_pageSize = config.getTenantDashboardsUsingGET_pageSize;
        this.getTenantDashboardsUsingGET_pageSizeType = config.getTenantDashboardsUsingGET_pageSizeType || 'str';
        this.getTenantDashboardsUsingGET_page = config.getTenantDashboardsUsingGET_page;
        this.getTenantDashboardsUsingGET_pageType = config.getTenantDashboardsUsingGET_pageType || 'str';
        this.getTenantDashboardsUsingGET_mobile = config.getTenantDashboardsUsingGET_mobile;
        this.getTenantDashboardsUsingGET_mobileType = config.getTenantDashboardsUsingGET_mobileType || 'str';
        this.getTenantDashboardsUsingGET_textSearch = config.getTenantDashboardsUsingGET_textSearch;
        this.getTenantDashboardsUsingGET_textSearchType = config.getTenantDashboardsUsingGET_textSearchType || 'str';
        this.getTenantDashboardsUsingGET_sortProperty = config.getTenantDashboardsUsingGET_sortProperty;
        this.getTenantDashboardsUsingGET_sortPropertyType = config.getTenantDashboardsUsingGET_sortPropertyType || 'str';
        this.getTenantDashboardsUsingGET_sortOrder = config.getTenantDashboardsUsingGET_sortOrder;
        this.getTenantDashboardsUsingGET_sortOrderType = config.getTenantDashboardsUsingGET_sortOrderType || 'str';
        this.getTenantDashboardsUsingGET_1_tenantId = config.getTenantDashboardsUsingGET_1_tenantId;
        this.getTenantDashboardsUsingGET_1_tenantIdType = config.getTenantDashboardsUsingGET_1_tenantIdType || 'str';
        this.getTenantDashboardsUsingGET_1_pageSize = config.getTenantDashboardsUsingGET_1_pageSize;
        this.getTenantDashboardsUsingGET_1_pageSizeType = config.getTenantDashboardsUsingGET_1_pageSizeType || 'str';
        this.getTenantDashboardsUsingGET_1_page = config.getTenantDashboardsUsingGET_1_page;
        this.getTenantDashboardsUsingGET_1_pageType = config.getTenantDashboardsUsingGET_1_pageType || 'str';
        this.getTenantDashboardsUsingGET_1_textSearch = config.getTenantDashboardsUsingGET_1_textSearch;
        this.getTenantDashboardsUsingGET_1_textSearchType = config.getTenantDashboardsUsingGET_1_textSearchType || 'str';
        this.getTenantDashboardsUsingGET_1_sortProperty = config.getTenantDashboardsUsingGET_1_sortProperty;
        this.getTenantDashboardsUsingGET_1_sortPropertyType = config.getTenantDashboardsUsingGET_1_sortPropertyType || 'str';
        this.getTenantDashboardsUsingGET_1_sortOrder = config.getTenantDashboardsUsingGET_1_sortOrder;
        this.getTenantDashboardsUsingGET_1_sortOrderType = config.getTenantDashboardsUsingGET_1_sortOrderType || 'str';
        this.getUserDashboardsUsingGET_pageSize = config.getUserDashboardsUsingGET_pageSize;
        this.getUserDashboardsUsingGET_pageSizeType = config.getUserDashboardsUsingGET_pageSizeType || 'str';
        this.getUserDashboardsUsingGET_page = config.getUserDashboardsUsingGET_page;
        this.getUserDashboardsUsingGET_pageType = config.getUserDashboardsUsingGET_pageType || 'str';
        this.getUserDashboardsUsingGET_mobile = config.getUserDashboardsUsingGET_mobile;
        this.getUserDashboardsUsingGET_mobileType = config.getUserDashboardsUsingGET_mobileType || 'str';
        this.getUserDashboardsUsingGET_textSearch = config.getUserDashboardsUsingGET_textSearch;
        this.getUserDashboardsUsingGET_textSearchType = config.getUserDashboardsUsingGET_textSearchType || 'str';
        this.getUserDashboardsUsingGET_sortProperty = config.getUserDashboardsUsingGET_sortProperty;
        this.getUserDashboardsUsingGET_sortPropertyType = config.getUserDashboardsUsingGET_sortPropertyType || 'str';
        this.getUserDashboardsUsingGET_sortOrder = config.getUserDashboardsUsingGET_sortOrder;
        this.getUserDashboardsUsingGET_sortOrderType = config.getUserDashboardsUsingGET_sortOrderType || 'str';
        this.getUserDashboardsUsingGET_operation = config.getUserDashboardsUsingGET_operation;
        this.getUserDashboardsUsingGET_operationType = config.getUserDashboardsUsingGET_operationType || 'str';
        this.getUserDashboardsUsingGET_userId = config.getUserDashboardsUsingGET_userId;
        this.getUserDashboardsUsingGET_userIdType = config.getUserDashboardsUsingGET_userIdType || 'str';
        this.reClaimDeviceUsingDELETE_deviceName = config.reClaimDeviceUsingDELETE_deviceName;
        this.reClaimDeviceUsingDELETE_deviceNameType = config.reClaimDeviceUsingDELETE_deviceNameType || 'str';
        this.claimDeviceUsingPOST_deviceName = config.claimDeviceUsingPOST_deviceName;
        this.claimDeviceUsingPOST_deviceNameType = config.claimDeviceUsingPOST_deviceNameType || 'str';
        this.claimDeviceUsingPOST_subCustomerId = config.claimDeviceUsingPOST_subCustomerId;
        this.claimDeviceUsingPOST_subCustomerIdType = config.claimDeviceUsingPOST_subCustomerIdType || 'str';
        this.claimDeviceUsingPOST_body = config.claimDeviceUsingPOST_body;
        this.claimDeviceUsingPOST_bodyType = config.claimDeviceUsingPOST_bodyType || 'str';
        this.getCustomerDevicesUsingGET_customerId = config.getCustomerDevicesUsingGET_customerId;
        this.getCustomerDevicesUsingGET_customerIdType = config.getCustomerDevicesUsingGET_customerIdType || 'str';
        this.getCustomerDevicesUsingGET_pageSize = config.getCustomerDevicesUsingGET_pageSize;
        this.getCustomerDevicesUsingGET_pageSizeType = config.getCustomerDevicesUsingGET_pageSizeType || 'str';
        this.getCustomerDevicesUsingGET_page = config.getCustomerDevicesUsingGET_page;
        this.getCustomerDevicesUsingGET_pageType = config.getCustomerDevicesUsingGET_pageType || 'str';
        this.getCustomerDevicesUsingGET_type = config.getCustomerDevicesUsingGET_type;
        this.getCustomerDevicesUsingGET_typeType = config.getCustomerDevicesUsingGET_typeType || 'str';
        this.getCustomerDevicesUsingGET_textSearch = config.getCustomerDevicesUsingGET_textSearch;
        this.getCustomerDevicesUsingGET_textSearchType = config.getCustomerDevicesUsingGET_textSearchType || 'str';
        this.getCustomerDevicesUsingGET_sortProperty = config.getCustomerDevicesUsingGET_sortProperty;
        this.getCustomerDevicesUsingGET_sortPropertyType = config.getCustomerDevicesUsingGET_sortPropertyType || 'str';
        this.getCustomerDevicesUsingGET_sortOrder = config.getCustomerDevicesUsingGET_sortOrder;
        this.getCustomerDevicesUsingGET_sortOrderType = config.getCustomerDevicesUsingGET_sortOrderType || 'str';
        this.saveDeviceWithCredentialsUsingPOST_entityGroupId = config.saveDeviceWithCredentialsUsingPOST_entityGroupId;
        this.saveDeviceWithCredentialsUsingPOST_entityGroupIdType = config.saveDeviceWithCredentialsUsingPOST_entityGroupIdType || 'str';
        this.saveDeviceWithCredentialsUsingPOST_body = config.saveDeviceWithCredentialsUsingPOST_body;
        this.saveDeviceWithCredentialsUsingPOST_bodyType = config.saveDeviceWithCredentialsUsingPOST_bodyType || 'str';
        this.processDevicesBulkImportUsingPOST_body = config.processDevicesBulkImportUsingPOST_body;
        this.processDevicesBulkImportUsingPOST_bodyType = config.processDevicesBulkImportUsingPOST_bodyType || 'str';
        this.updateDeviceCredentialsUsingPOST_body = config.updateDeviceCredentialsUsingPOST_body;
        this.updateDeviceCredentialsUsingPOST_bodyType = config.updateDeviceCredentialsUsingPOST_bodyType || 'str';
        this.getDeviceByIdUsingGET_deviceId = config.getDeviceByIdUsingGET_deviceId;
        this.getDeviceByIdUsingGET_deviceIdType = config.getDeviceByIdUsingGET_deviceIdType || 'str';
        this.deleteDeviceUsingDELETE_deviceId = config.deleteDeviceUsingDELETE_deviceId;
        this.deleteDeviceUsingDELETE_deviceIdType = config.deleteDeviceUsingDELETE_deviceIdType || 'str';
        this.getDeviceCredentialsByDeviceIdUsingGET_deviceId = config.getDeviceCredentialsByDeviceIdUsingGET_deviceId;
        this.getDeviceCredentialsByDeviceIdUsingGET_deviceIdType = config.getDeviceCredentialsByDeviceIdUsingGET_deviceIdType || 'str';
        this.findByQueryUsingPOST_1_body = config.findByQueryUsingPOST_1_body;
        this.findByQueryUsingPOST_1_bodyType = config.findByQueryUsingPOST_1_bodyType || 'str';
        this.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageType = config.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageType;
        this.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageTypeType = config.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageTypeType || 'str';
        this.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileId = config.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileId;
        this.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileIdType = config.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileIdType || 'str';
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageType = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageType;
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageTypeType = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageTypeType || 'str';
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageId = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageId;
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageIdType = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageIdType || 'str';
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupId = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupId;
        this.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupIdType = config.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupIdType || 'str';
        this.getDevicesByIdsUsingGET_deviceIds = config.getDevicesByIdsUsingGET_deviceIds;
        this.getDevicesByIdsUsingGET_deviceIdsType = config.getDevicesByIdsUsingGET_deviceIdsType || 'str';
        this.saveDeviceUsingPOST_accessToken = config.saveDeviceUsingPOST_accessToken;
        this.saveDeviceUsingPOST_accessTokenType = config.saveDeviceUsingPOST_accessTokenType || 'str';
        this.saveDeviceUsingPOST_entityGroupId = config.saveDeviceUsingPOST_entityGroupId;
        this.saveDeviceUsingPOST_entityGroupIdType = config.saveDeviceUsingPOST_entityGroupIdType || 'str';
        this.saveDeviceUsingPOST_body = config.saveDeviceUsingPOST_body;
        this.saveDeviceUsingPOST_bodyType = config.saveDeviceUsingPOST_bodyType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_entityGroupId = config.getDevicesByEntityGroupIdUsingGET_entityGroupId;
        this.getDevicesByEntityGroupIdUsingGET_entityGroupIdType = config.getDevicesByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_pageSize = config.getDevicesByEntityGroupIdUsingGET_pageSize;
        this.getDevicesByEntityGroupIdUsingGET_pageSizeType = config.getDevicesByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_page = config.getDevicesByEntityGroupIdUsingGET_page;
        this.getDevicesByEntityGroupIdUsingGET_pageType = config.getDevicesByEntityGroupIdUsingGET_pageType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_textSearch = config.getDevicesByEntityGroupIdUsingGET_textSearch;
        this.getDevicesByEntityGroupIdUsingGET_textSearchType = config.getDevicesByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_sortProperty = config.getDevicesByEntityGroupIdUsingGET_sortProperty;
        this.getDevicesByEntityGroupIdUsingGET_sortPropertyType = config.getDevicesByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getDevicesByEntityGroupIdUsingGET_sortOrder = config.getDevicesByEntityGroupIdUsingGET_sortOrder;
        this.getDevicesByEntityGroupIdUsingGET_sortOrderType = config.getDevicesByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.getTenantDeviceUsingGET_deviceName = config.getTenantDeviceUsingGET_deviceName;
        this.getTenantDeviceUsingGET_deviceNameType = config.getTenantDeviceUsingGET_deviceNameType || 'str';
        this.getTenantDevicesUsingGET_pageSize = config.getTenantDevicesUsingGET_pageSize;
        this.getTenantDevicesUsingGET_pageSizeType = config.getTenantDevicesUsingGET_pageSizeType || 'str';
        this.getTenantDevicesUsingGET_page = config.getTenantDevicesUsingGET_page;
        this.getTenantDevicesUsingGET_pageType = config.getTenantDevicesUsingGET_pageType || 'str';
        this.getTenantDevicesUsingGET_type = config.getTenantDevicesUsingGET_type;
        this.getTenantDevicesUsingGET_typeType = config.getTenantDevicesUsingGET_typeType || 'str';
        this.getTenantDevicesUsingGET_textSearch = config.getTenantDevicesUsingGET_textSearch;
        this.getTenantDevicesUsingGET_textSearchType = config.getTenantDevicesUsingGET_textSearchType || 'str';
        this.getTenantDevicesUsingGET_sortProperty = config.getTenantDevicesUsingGET_sortProperty;
        this.getTenantDevicesUsingGET_sortPropertyType = config.getTenantDevicesUsingGET_sortPropertyType || 'str';
        this.getTenantDevicesUsingGET_sortOrder = config.getTenantDevicesUsingGET_sortOrder;
        this.getTenantDevicesUsingGET_sortOrderType = config.getTenantDevicesUsingGET_sortOrderType || 'str';
        this.assignDeviceToTenantUsingPOST_tenantId = config.assignDeviceToTenantUsingPOST_tenantId;
        this.assignDeviceToTenantUsingPOST_tenantIdType = config.assignDeviceToTenantUsingPOST_tenantIdType || 'str';
        this.assignDeviceToTenantUsingPOST_deviceId = config.assignDeviceToTenantUsingPOST_deviceId;
        this.assignDeviceToTenantUsingPOST_deviceIdType = config.assignDeviceToTenantUsingPOST_deviceIdType || 'str';
        this.getUserDevicesUsingGET_pageSize = config.getUserDevicesUsingGET_pageSize;
        this.getUserDevicesUsingGET_pageSizeType = config.getUserDevicesUsingGET_pageSizeType || 'str';
        this.getUserDevicesUsingGET_page = config.getUserDevicesUsingGET_page;
        this.getUserDevicesUsingGET_pageType = config.getUserDevicesUsingGET_pageType || 'str';
        this.getUserDevicesUsingGET_type = config.getUserDevicesUsingGET_type;
        this.getUserDevicesUsingGET_typeType = config.getUserDevicesUsingGET_typeType || 'str';
        this.getUserDevicesUsingGET_textSearch = config.getUserDevicesUsingGET_textSearch;
        this.getUserDevicesUsingGET_textSearchType = config.getUserDevicesUsingGET_textSearchType || 'str';
        this.getUserDevicesUsingGET_sortProperty = config.getUserDevicesUsingGET_sortProperty;
        this.getUserDevicesUsingGET_sortPropertyType = config.getUserDevicesUsingGET_sortPropertyType || 'str';
        this.getUserDevicesUsingGET_sortOrder = config.getUserDevicesUsingGET_sortOrder;
        this.getUserDevicesUsingGET_sortOrderType = config.getUserDevicesUsingGET_sortOrderType || 'str';
        this.saveDeviceGroupOtaPackageUsingPOST_body = config.saveDeviceGroupOtaPackageUsingPOST_body;
        this.saveDeviceGroupOtaPackageUsingPOST_bodyType = config.saveDeviceGroupOtaPackageUsingPOST_bodyType || 'str';
        this.getFirmwareByIdUsingGET_groupId = config.getFirmwareByIdUsingGET_groupId;
        this.getFirmwareByIdUsingGET_groupIdType = config.getFirmwareByIdUsingGET_groupIdType || 'str';
        this.getFirmwareByIdUsingGET_firmwareType = config.getFirmwareByIdUsingGET_firmwareType;
        this.getFirmwareByIdUsingGET_firmwareTypeType = config.getFirmwareByIdUsingGET_firmwareTypeType || 'str';
        this.deleteDeviceGroupOtaPackageUsingDELETE_id = config.deleteDeviceGroupOtaPackageUsingDELETE_id;
        this.deleteDeviceGroupOtaPackageUsingDELETE_idType = config.deleteDeviceGroupOtaPackageUsingDELETE_idType || 'str';
        this.saveDeviceProfileUsingPOST_body = config.saveDeviceProfileUsingPOST_body;
        this.saveDeviceProfileUsingPOST_bodyType = config.saveDeviceProfileUsingPOST_bodyType || 'str';
        this.getAttributesKeysUsingGET_deviceProfileId = config.getAttributesKeysUsingGET_deviceProfileId;
        this.getAttributesKeysUsingGET_deviceProfileIdType = config.getAttributesKeysUsingGET_deviceProfileIdType || 'str';
        this.getTimeseriesKeysUsingGET_deviceProfileId = config.getTimeseriesKeysUsingGET_deviceProfileId;
        this.getTimeseriesKeysUsingGET_deviceProfileIdType = config.getTimeseriesKeysUsingGET_deviceProfileIdType || 'str';
        this.getDeviceProfileByIdUsingGET_deviceProfileId = config.getDeviceProfileByIdUsingGET_deviceProfileId;
        this.getDeviceProfileByIdUsingGET_deviceProfileIdType = config.getDeviceProfileByIdUsingGET_deviceProfileIdType || 'str';
        this.deleteDeviceProfileUsingDELETE_deviceProfileId = config.deleteDeviceProfileUsingDELETE_deviceProfileId;
        this.deleteDeviceProfileUsingDELETE_deviceProfileIdType = config.deleteDeviceProfileUsingDELETE_deviceProfileIdType || 'str';
        this.setDefaultDeviceProfileUsingPOST_deviceProfileId = config.setDefaultDeviceProfileUsingPOST_deviceProfileId;
        this.setDefaultDeviceProfileUsingPOST_deviceProfileIdType = config.setDefaultDeviceProfileUsingPOST_deviceProfileIdType || 'str';
        this.getDeviceProfileInfoByIdUsingGET_deviceProfileId = config.getDeviceProfileInfoByIdUsingGET_deviceProfileId;
        this.getDeviceProfileInfoByIdUsingGET_deviceProfileIdType = config.getDeviceProfileInfoByIdUsingGET_deviceProfileIdType || 'str';
        this.getDeviceProfileInfosUsingGET_pageSize = config.getDeviceProfileInfosUsingGET_pageSize;
        this.getDeviceProfileInfosUsingGET_pageSizeType = config.getDeviceProfileInfosUsingGET_pageSizeType || 'str';
        this.getDeviceProfileInfosUsingGET_page = config.getDeviceProfileInfosUsingGET_page;
        this.getDeviceProfileInfosUsingGET_pageType = config.getDeviceProfileInfosUsingGET_pageType || 'str';
        this.getDeviceProfileInfosUsingGET_textSearch = config.getDeviceProfileInfosUsingGET_textSearch;
        this.getDeviceProfileInfosUsingGET_textSearchType = config.getDeviceProfileInfosUsingGET_textSearchType || 'str';
        this.getDeviceProfileInfosUsingGET_sortProperty = config.getDeviceProfileInfosUsingGET_sortProperty;
        this.getDeviceProfileInfosUsingGET_sortPropertyType = config.getDeviceProfileInfosUsingGET_sortPropertyType || 'str';
        this.getDeviceProfileInfosUsingGET_sortOrder = config.getDeviceProfileInfosUsingGET_sortOrder;
        this.getDeviceProfileInfosUsingGET_sortOrderType = config.getDeviceProfileInfosUsingGET_sortOrderType || 'str';
        this.getDeviceProfileInfosUsingGET_transportType = config.getDeviceProfileInfosUsingGET_transportType;
        this.getDeviceProfileInfosUsingGET_transportTypeType = config.getDeviceProfileInfosUsingGET_transportTypeType || 'str';
        this.getDeviceProfilesUsingGET_pageSize = config.getDeviceProfilesUsingGET_pageSize;
        this.getDeviceProfilesUsingGET_pageSizeType = config.getDeviceProfilesUsingGET_pageSizeType || 'str';
        this.getDeviceProfilesUsingGET_page = config.getDeviceProfilesUsingGET_page;
        this.getDeviceProfilesUsingGET_pageType = config.getDeviceProfilesUsingGET_pageType || 'str';
        this.getDeviceProfilesUsingGET_textSearch = config.getDeviceProfilesUsingGET_textSearch;
        this.getDeviceProfilesUsingGET_textSearchType = config.getDeviceProfilesUsingGET_textSearchType || 'str';
        this.getDeviceProfilesUsingGET_sortProperty = config.getDeviceProfilesUsingGET_sortProperty;
        this.getDeviceProfilesUsingGET_sortPropertyType = config.getDeviceProfilesUsingGET_sortPropertyType || 'str';
        this.getDeviceProfilesUsingGET_sortOrder = config.getDeviceProfilesUsingGET_sortOrder;
        this.getDeviceProfilesUsingGET_sortOrderType = config.getDeviceProfilesUsingGET_sortOrderType || 'str';
        this.getCustomerEdgesUsingGET_customerId = config.getCustomerEdgesUsingGET_customerId;
        this.getCustomerEdgesUsingGET_customerIdType = config.getCustomerEdgesUsingGET_customerIdType || 'str';
        this.getCustomerEdgesUsingGET_pageSize = config.getCustomerEdgesUsingGET_pageSize;
        this.getCustomerEdgesUsingGET_pageSizeType = config.getCustomerEdgesUsingGET_pageSizeType || 'str';
        this.getCustomerEdgesUsingGET_page = config.getCustomerEdgesUsingGET_page;
        this.getCustomerEdgesUsingGET_pageType = config.getCustomerEdgesUsingGET_pageType || 'str';
        this.getCustomerEdgesUsingGET_type = config.getCustomerEdgesUsingGET_type;
        this.getCustomerEdgesUsingGET_typeType = config.getCustomerEdgesUsingGET_typeType || 'str';
        this.getCustomerEdgesUsingGET_textSearch = config.getCustomerEdgesUsingGET_textSearch;
        this.getCustomerEdgesUsingGET_textSearchType = config.getCustomerEdgesUsingGET_textSearchType || 'str';
        this.getCustomerEdgesUsingGET_sortProperty = config.getCustomerEdgesUsingGET_sortProperty;
        this.getCustomerEdgesUsingGET_sortPropertyType = config.getCustomerEdgesUsingGET_sortPropertyType || 'str';
        this.getCustomerEdgesUsingGET_sortOrder = config.getCustomerEdgesUsingGET_sortOrder;
        this.getCustomerEdgesUsingGET_sortOrderType = config.getCustomerEdgesUsingGET_sortOrderType || 'str';
        this.processEdgesBulkImportUsingPOST_body = config.processEdgesBulkImportUsingPOST_body;
        this.processEdgesBulkImportUsingPOST_bodyType = config.processEdgesBulkImportUsingPOST_bodyType || 'str';
        this.findMissingToRelatedRuleChainsUsingGET_edgeId = config.findMissingToRelatedRuleChainsUsingGET_edgeId;
        this.findMissingToRelatedRuleChainsUsingGET_edgeIdType = config.findMissingToRelatedRuleChainsUsingGET_edgeIdType || 'str';
        this.syncEdgeUsingPOST_edgeId = config.syncEdgeUsingPOST_edgeId;
        this.syncEdgeUsingPOST_edgeIdType = config.syncEdgeUsingPOST_edgeIdType || 'str';
        this.getEdgeByIdUsingGET_edgeId = config.getEdgeByIdUsingGET_edgeId;
        this.getEdgeByIdUsingGET_edgeIdType = config.getEdgeByIdUsingGET_edgeIdType || 'str';
        this.deleteEdgeUsingDELETE_edgeId = config.deleteEdgeUsingDELETE_edgeId;
        this.deleteEdgeUsingDELETE_edgeIdType = config.deleteEdgeUsingDELETE_edgeIdType || 'str';
        this.setEdgeRootRuleChainUsingPOST_edgeId = config.setEdgeRootRuleChainUsingPOST_edgeId;
        this.setEdgeRootRuleChainUsingPOST_edgeIdType = config.setEdgeRootRuleChainUsingPOST_edgeIdType || 'str';
        this.setEdgeRootRuleChainUsingPOST_ruleChainId = config.setEdgeRootRuleChainUsingPOST_ruleChainId;
        this.setEdgeRootRuleChainUsingPOST_ruleChainIdType = config.setEdgeRootRuleChainUsingPOST_ruleChainIdType || 'str';
        this.findByQueryUsingPOST_2_body = config.findByQueryUsingPOST_2_body;
        this.findByQueryUsingPOST_2_bodyType = config.findByQueryUsingPOST_2_bodyType || 'str';
        this.getEdgesByIdsUsingGET_edgeIds = config.getEdgesByIdsUsingGET_edgeIds;
        this.getEdgesByIdsUsingGET_edgeIdsType = config.getEdgesByIdsUsingGET_edgeIdsType || 'str';
        this.getEdgesUsingGET_pageSize = config.getEdgesUsingGET_pageSize;
        this.getEdgesUsingGET_pageSizeType = config.getEdgesUsingGET_pageSizeType || 'str';
        this.getEdgesUsingGET_page = config.getEdgesUsingGET_page;
        this.getEdgesUsingGET_pageType = config.getEdgesUsingGET_pageType || 'str';
        this.getEdgesUsingGET_textSearch = config.getEdgesUsingGET_textSearch;
        this.getEdgesUsingGET_textSearchType = config.getEdgesUsingGET_textSearchType || 'str';
        this.getEdgesUsingGET_sortProperty = config.getEdgesUsingGET_sortProperty;
        this.getEdgesUsingGET_sortPropertyType = config.getEdgesUsingGET_sortPropertyType || 'str';
        this.getEdgesUsingGET_sortOrder = config.getEdgesUsingGET_sortOrder;
        this.getEdgesUsingGET_sortOrderType = config.getEdgesUsingGET_sortOrderType || 'str';
        this.saveEdgeUsingPOST_entityGroupId = config.saveEdgeUsingPOST_entityGroupId;
        this.saveEdgeUsingPOST_entityGroupIdType = config.saveEdgeUsingPOST_entityGroupIdType || 'str';
        this.saveEdgeUsingPOST_body = config.saveEdgeUsingPOST_body;
        this.saveEdgeUsingPOST_bodyType = config.saveEdgeUsingPOST_bodyType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_entityGroupId = config.getEdgesByEntityGroupIdUsingGET_entityGroupId;
        this.getEdgesByEntityGroupIdUsingGET_entityGroupIdType = config.getEdgesByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_pageSize = config.getEdgesByEntityGroupIdUsingGET_pageSize;
        this.getEdgesByEntityGroupIdUsingGET_pageSizeType = config.getEdgesByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_page = config.getEdgesByEntityGroupIdUsingGET_page;
        this.getEdgesByEntityGroupIdUsingGET_pageType = config.getEdgesByEntityGroupIdUsingGET_pageType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_textSearch = config.getEdgesByEntityGroupIdUsingGET_textSearch;
        this.getEdgesByEntityGroupIdUsingGET_textSearchType = config.getEdgesByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_sortProperty = config.getEdgesByEntityGroupIdUsingGET_sortProperty;
        this.getEdgesByEntityGroupIdUsingGET_sortPropertyType = config.getEdgesByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getEdgesByEntityGroupIdUsingGET_sortOrder = config.getEdgesByEntityGroupIdUsingGET_sortOrder;
        this.getEdgesByEntityGroupIdUsingGET_sortOrderType = config.getEdgesByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.activateInstanceUsingPOST_licenseSecret = config.activateInstanceUsingPOST_licenseSecret;
        this.activateInstanceUsingPOST_licenseSecretType = config.activateInstanceUsingPOST_licenseSecretType || 'str';
        this.activateInstanceUsingPOST_releaseDate = config.activateInstanceUsingPOST_releaseDate;
        this.activateInstanceUsingPOST_releaseDateType = config.activateInstanceUsingPOST_releaseDateType || 'str';
        this.checkInstanceUsingPOST_body = config.checkInstanceUsingPOST_body;
        this.checkInstanceUsingPOST_bodyType = config.checkInstanceUsingPOST_bodyType || 'str';
        this.getTenantEdgeUsingGET_edgeName = config.getTenantEdgeUsingGET_edgeName;
        this.getTenantEdgeUsingGET_edgeNameType = config.getTenantEdgeUsingGET_edgeNameType || 'str';
        this.getTenantEdgesUsingGET_pageSize = config.getTenantEdgesUsingGET_pageSize;
        this.getTenantEdgesUsingGET_pageSizeType = config.getTenantEdgesUsingGET_pageSizeType || 'str';
        this.getTenantEdgesUsingGET_page = config.getTenantEdgesUsingGET_page;
        this.getTenantEdgesUsingGET_pageType = config.getTenantEdgesUsingGET_pageType || 'str';
        this.getTenantEdgesUsingGET_type = config.getTenantEdgesUsingGET_type;
        this.getTenantEdgesUsingGET_typeType = config.getTenantEdgesUsingGET_typeType || 'str';
        this.getTenantEdgesUsingGET_textSearch = config.getTenantEdgesUsingGET_textSearch;
        this.getTenantEdgesUsingGET_textSearchType = config.getTenantEdgesUsingGET_textSearchType || 'str';
        this.getTenantEdgesUsingGET_sortProperty = config.getTenantEdgesUsingGET_sortProperty;
        this.getTenantEdgesUsingGET_sortPropertyType = config.getTenantEdgesUsingGET_sortPropertyType || 'str';
        this.getTenantEdgesUsingGET_sortOrder = config.getTenantEdgesUsingGET_sortOrder;
        this.getTenantEdgesUsingGET_sortOrderType = config.getTenantEdgesUsingGET_sortOrderType || 'str';
        this.getUserEdgesUsingGET_pageSize = config.getUserEdgesUsingGET_pageSize;
        this.getUserEdgesUsingGET_pageSizeType = config.getUserEdgesUsingGET_pageSizeType || 'str';
        this.getUserEdgesUsingGET_page = config.getUserEdgesUsingGET_page;
        this.getUserEdgesUsingGET_pageType = config.getUserEdgesUsingGET_pageType || 'str';
        this.getUserEdgesUsingGET_type = config.getUserEdgesUsingGET_type;
        this.getUserEdgesUsingGET_typeType = config.getUserEdgesUsingGET_typeType || 'str';
        this.getUserEdgesUsingGET_textSearch = config.getUserEdgesUsingGET_textSearch;
        this.getUserEdgesUsingGET_textSearchType = config.getUserEdgesUsingGET_textSearchType || 'str';
        this.getUserEdgesUsingGET_sortProperty = config.getUserEdgesUsingGET_sortProperty;
        this.getUserEdgesUsingGET_sortPropertyType = config.getUserEdgesUsingGET_sortPropertyType || 'str';
        this.getUserEdgesUsingGET_sortOrder = config.getUserEdgesUsingGET_sortOrder;
        this.getUserEdgesUsingGET_sortOrderType = config.getUserEdgesUsingGET_sortOrderType || 'str';
        this.getEdgeEventsUsingGET_edgeId = config.getEdgeEventsUsingGET_edgeId;
        this.getEdgeEventsUsingGET_edgeIdType = config.getEdgeEventsUsingGET_edgeIdType || 'str';
        this.getEdgeEventsUsingGET_pageSize = config.getEdgeEventsUsingGET_pageSize;
        this.getEdgeEventsUsingGET_pageSizeType = config.getEdgeEventsUsingGET_pageSizeType || 'str';
        this.getEdgeEventsUsingGET_page = config.getEdgeEventsUsingGET_page;
        this.getEdgeEventsUsingGET_pageType = config.getEdgeEventsUsingGET_pageType || 'str';
        this.getEdgeEventsUsingGET_textSearch = config.getEdgeEventsUsingGET_textSearch;
        this.getEdgeEventsUsingGET_textSearchType = config.getEdgeEventsUsingGET_textSearchType || 'str';
        this.getEdgeEventsUsingGET_sortProperty = config.getEdgeEventsUsingGET_sortProperty;
        this.getEdgeEventsUsingGET_sortPropertyType = config.getEdgeEventsUsingGET_sortPropertyType || 'str';
        this.getEdgeEventsUsingGET_sortOrder = config.getEdgeEventsUsingGET_sortOrder;
        this.getEdgeEventsUsingGET_sortOrderType = config.getEdgeEventsUsingGET_sortOrderType || 'str';
        this.getEdgeEventsUsingGET_startTime = config.getEdgeEventsUsingGET_startTime;
        this.getEdgeEventsUsingGET_startTimeType = config.getEdgeEventsUsingGET_startTimeType || 'str';
        this.getEdgeEventsUsingGET_endTime = config.getEdgeEventsUsingGET_endTime;
        this.getEdgeEventsUsingGET_endTimeType = config.getEdgeEventsUsingGET_endTimeType || 'str';
        this.getAllEdgeEntityGroupsUsingGET_edgeId = config.getAllEdgeEntityGroupsUsingGET_edgeId;
        this.getAllEdgeEntityGroupsUsingGET_edgeIdType = config.getAllEdgeEntityGroupsUsingGET_edgeIdType || 'str';
        this.getAllEdgeEntityGroupsUsingGET_groupType = config.getAllEdgeEntityGroupsUsingGET_groupType;
        this.getAllEdgeEntityGroupsUsingGET_groupTypeType = config.getAllEdgeEntityGroupsUsingGET_groupTypeType || 'str';
        this.assignEntityGroupToEdgeUsingPOST_edgeId = config.assignEntityGroupToEdgeUsingPOST_edgeId;
        this.assignEntityGroupToEdgeUsingPOST_edgeIdType = config.assignEntityGroupToEdgeUsingPOST_edgeIdType || 'str';
        this.assignEntityGroupToEdgeUsingPOST_groupType = config.assignEntityGroupToEdgeUsingPOST_groupType;
        this.assignEntityGroupToEdgeUsingPOST_groupTypeType = config.assignEntityGroupToEdgeUsingPOST_groupTypeType || 'str';
        this.assignEntityGroupToEdgeUsingPOST_entityGroupId = config.assignEntityGroupToEdgeUsingPOST_entityGroupId;
        this.assignEntityGroupToEdgeUsingPOST_entityGroupIdType = config.assignEntityGroupToEdgeUsingPOST_entityGroupIdType || 'str';
        this.unassignEntityGroupFromEdgeUsingDELETE_edgeId = config.unassignEntityGroupFromEdgeUsingDELETE_edgeId;
        this.unassignEntityGroupFromEdgeUsingDELETE_edgeIdType = config.unassignEntityGroupFromEdgeUsingDELETE_edgeIdType || 'str';
        this.unassignEntityGroupFromEdgeUsingDELETE_groupType = config.unassignEntityGroupFromEdgeUsingDELETE_groupType;
        this.unassignEntityGroupFromEdgeUsingDELETE_groupTypeType = config.unassignEntityGroupFromEdgeUsingDELETE_groupTypeType || 'str';
        this.unassignEntityGroupFromEdgeUsingDELETE_entityGroupId = config.unassignEntityGroupFromEdgeUsingDELETE_entityGroupId;
        this.unassignEntityGroupFromEdgeUsingDELETE_entityGroupIdType = config.unassignEntityGroupFromEdgeUsingDELETE_entityGroupIdType || 'str';
        this.saveEntityGroupUsingPOST_body = config.saveEntityGroupUsingPOST_body;
        this.saveEntityGroupUsingPOST_bodyType = config.saveEntityGroupUsingPOST_bodyType || 'str';
        this.getEntityGroupAllByOwnerAndTypeUsingGET_ownerType = config.getEntityGroupAllByOwnerAndTypeUsingGET_ownerType;
        this.getEntityGroupAllByOwnerAndTypeUsingGET_ownerTypeType = config.getEntityGroupAllByOwnerAndTypeUsingGET_ownerTypeType || 'str';
        this.getEntityGroupAllByOwnerAndTypeUsingGET_ownerId = config.getEntityGroupAllByOwnerAndTypeUsingGET_ownerId;
        this.getEntityGroupAllByOwnerAndTypeUsingGET_ownerIdType = config.getEntityGroupAllByOwnerAndTypeUsingGET_ownerIdType || 'str';
        this.getEntityGroupAllByOwnerAndTypeUsingGET_groupType = config.getEntityGroupAllByOwnerAndTypeUsingGET_groupType;
        this.getEntityGroupAllByOwnerAndTypeUsingGET_groupTypeType = config.getEntityGroupAllByOwnerAndTypeUsingGET_groupTypeType || 'str';
        this.getEntityGroupByIdUsingGET_entityGroupId = config.getEntityGroupByIdUsingGET_entityGroupId;
        this.getEntityGroupByIdUsingGET_entityGroupIdType = config.getEntityGroupByIdUsingGET_entityGroupIdType || 'str';
        this.deleteEntityGroupUsingDELETE_entityGroupId = config.deleteEntityGroupUsingDELETE_entityGroupId;
        this.deleteEntityGroupUsingDELETE_entityGroupIdType = config.deleteEntityGroupUsingDELETE_entityGroupIdType || 'str';
        this.addEntitiesToEntityGroupUsingPOST_entityGroupId = config.addEntitiesToEntityGroupUsingPOST_entityGroupId;
        this.addEntitiesToEntityGroupUsingPOST_entityGroupIdType = config.addEntitiesToEntityGroupUsingPOST_entityGroupIdType || 'str';
        this.addEntitiesToEntityGroupUsingPOST_body = config.addEntitiesToEntityGroupUsingPOST_body;
        this.addEntitiesToEntityGroupUsingPOST_bodyType = config.addEntitiesToEntityGroupUsingPOST_bodyType || 'str';
        this.removeEntitiesFromEntityGroupUsingPOST_entityGroupId = config.removeEntitiesFromEntityGroupUsingPOST_entityGroupId;
        this.removeEntitiesFromEntityGroupUsingPOST_entityGroupIdType = config.removeEntitiesFromEntityGroupUsingPOST_entityGroupIdType || 'str';
        this.removeEntitiesFromEntityGroupUsingPOST_body = config.removeEntitiesFromEntityGroupUsingPOST_body;
        this.removeEntitiesFromEntityGroupUsingPOST_bodyType = config.removeEntitiesFromEntityGroupUsingPOST_bodyType || 'str';
        this.getEntitiesUsingGET_entityGroupId = config.getEntitiesUsingGET_entityGroupId;
        this.getEntitiesUsingGET_entityGroupIdType = config.getEntitiesUsingGET_entityGroupIdType || 'str';
        this.getEntitiesUsingGET_pageSize = config.getEntitiesUsingGET_pageSize;
        this.getEntitiesUsingGET_pageSizeType = config.getEntitiesUsingGET_pageSizeType || 'str';
        this.getEntitiesUsingGET_page = config.getEntitiesUsingGET_page;
        this.getEntitiesUsingGET_pageType = config.getEntitiesUsingGET_pageType || 'str';
        this.getEntitiesUsingGET_textSearch = config.getEntitiesUsingGET_textSearch;
        this.getEntitiesUsingGET_textSearchType = config.getEntitiesUsingGET_textSearchType || 'str';
        this.getEntitiesUsingGET_sortProperty = config.getEntitiesUsingGET_sortProperty;
        this.getEntitiesUsingGET_sortPropertyType = config.getEntitiesUsingGET_sortPropertyType || 'str';
        this.getEntitiesUsingGET_sortOrder = config.getEntitiesUsingGET_sortOrder;
        this.getEntitiesUsingGET_sortOrderType = config.getEntitiesUsingGET_sortOrderType || 'str';
        this.makeEntityGroupPrivateUsingPOST_entityGroupId = config.makeEntityGroupPrivateUsingPOST_entityGroupId;
        this.makeEntityGroupPrivateUsingPOST_entityGroupIdType = config.makeEntityGroupPrivateUsingPOST_entityGroupIdType || 'str';
        this.makeEntityGroupPublicUsingPOST_entityGroupId = config.makeEntityGroupPublicUsingPOST_entityGroupId;
        this.makeEntityGroupPublicUsingPOST_entityGroupIdType = config.makeEntityGroupPublicUsingPOST_entityGroupIdType || 'str';
        this.shareEntityGroupUsingPOST_entityGroupId = config.shareEntityGroupUsingPOST_entityGroupId;
        this.shareEntityGroupUsingPOST_entityGroupIdType = config.shareEntityGroupUsingPOST_entityGroupIdType || 'str';
        this.shareEntityGroupUsingPOST_body = config.shareEntityGroupUsingPOST_body;
        this.shareEntityGroupUsingPOST_bodyType = config.shareEntityGroupUsingPOST_bodyType || 'str';
        this.getGroupEntityUsingGET_entityGroupId = config.getGroupEntityUsingGET_entityGroupId;
        this.getGroupEntityUsingGET_entityGroupIdType = config.getGroupEntityUsingGET_entityGroupIdType || 'str';
        this.getGroupEntityUsingGET_entityId = config.getGroupEntityUsingGET_entityId;
        this.getGroupEntityUsingGET_entityIdType = config.getGroupEntityUsingGET_entityIdType || 'str';
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupId = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupId;
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupIdType = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupIdType || 'str';
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupId = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupId;
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupIdType = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupIdType || 'str';
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleId = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleId;
        this.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleIdType = config.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleIdType || 'str';
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerType;
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerTypeType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerTypeType || 'str';
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerId = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerId;
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerIdType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerIdType || 'str';
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupType;
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupTypeType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupTypeType || 'str';
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupName = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupName;
        this.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupNameType = config.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupNameType || 'str';
        this.getEdgeEntityGroupsUsingGET_edgeId = config.getEdgeEntityGroupsUsingGET_edgeId;
        this.getEdgeEntityGroupsUsingGET_edgeIdType = config.getEdgeEntityGroupsUsingGET_edgeIdType || 'str';
        this.getEdgeEntityGroupsUsingGET_groupType = config.getEdgeEntityGroupsUsingGET_groupType;
        this.getEdgeEntityGroupsUsingGET_groupTypeType = config.getEdgeEntityGroupsUsingGET_groupTypeType || 'str';
        this.getEdgeEntityGroupsUsingGET_pageSize = config.getEdgeEntityGroupsUsingGET_pageSize;
        this.getEdgeEntityGroupsUsingGET_pageSizeType = config.getEdgeEntityGroupsUsingGET_pageSizeType || 'str';
        this.getEdgeEntityGroupsUsingGET_page = config.getEdgeEntityGroupsUsingGET_page;
        this.getEdgeEntityGroupsUsingGET_pageType = config.getEdgeEntityGroupsUsingGET_pageType || 'str';
        this.getEdgeEntityGroupsUsingGET_sortProperty = config.getEdgeEntityGroupsUsingGET_sortProperty;
        this.getEdgeEntityGroupsUsingGET_sortPropertyType = config.getEdgeEntityGroupsUsingGET_sortPropertyType || 'str';
        this.getEdgeEntityGroupsUsingGET_sortOrder = config.getEdgeEntityGroupsUsingGET_sortOrder;
        this.getEdgeEntityGroupsUsingGET_sortOrderType = config.getEdgeEntityGroupsUsingGET_sortOrderType || 'str';
        this.getEntityGroupsForEntityUsingGET_entityType = config.getEntityGroupsForEntityUsingGET_entityType;
        this.getEntityGroupsForEntityUsingGET_entityTypeType = config.getEntityGroupsForEntityUsingGET_entityTypeType || 'str';
        this.getEntityGroupsForEntityUsingGET_entityId = config.getEntityGroupsForEntityUsingGET_entityId;
        this.getEntityGroupsForEntityUsingGET_entityIdType = config.getEntityGroupsForEntityUsingGET_entityIdType || 'str';
        this.getEntityGroupsByTypeUsingGET_groupType = config.getEntityGroupsByTypeUsingGET_groupType;
        this.getEntityGroupsByTypeUsingGET_groupTypeType = config.getEntityGroupsByTypeUsingGET_groupTypeType || 'str';
        this.getEntityGroupsByOwnerAndTypeUsingGET_ownerType = config.getEntityGroupsByOwnerAndTypeUsingGET_ownerType;
        this.getEntityGroupsByOwnerAndTypeUsingGET_ownerTypeType = config.getEntityGroupsByOwnerAndTypeUsingGET_ownerTypeType || 'str';
        this.getEntityGroupsByOwnerAndTypeUsingGET_ownerId = config.getEntityGroupsByOwnerAndTypeUsingGET_ownerId;
        this.getEntityGroupsByOwnerAndTypeUsingGET_ownerIdType = config.getEntityGroupsByOwnerAndTypeUsingGET_ownerIdType || 'str';
        this.getEntityGroupsByOwnerAndTypeUsingGET_groupType = config.getEntityGroupsByOwnerAndTypeUsingGET_groupType;
        this.getEntityGroupsByOwnerAndTypeUsingGET_groupTypeType = config.getEntityGroupsByOwnerAndTypeUsingGET_groupTypeType || 'str';
        this.getEntityGroupsByIdsUsingGET_entityGroupIds = config.getEntityGroupsByIdsUsingGET_entityGroupIds;
        this.getEntityGroupsByIdsUsingGET_entityGroupIdsType = config.getEntityGroupsByIdsUsingGET_entityGroupIdsType || 'str';
        this.getOwnersUsingGET_pageSize = config.getOwnersUsingGET_pageSize;
        this.getOwnersUsingGET_pageSizeType = config.getOwnersUsingGET_pageSizeType || 'str';
        this.getOwnersUsingGET_page = config.getOwnersUsingGET_page;
        this.getOwnersUsingGET_pageType = config.getOwnersUsingGET_pageType || 'str';
        this.getOwnersUsingGET_textSearch = config.getOwnersUsingGET_textSearch;
        this.getOwnersUsingGET_textSearchType = config.getOwnersUsingGET_textSearchType || 'str';
        this.getOwnersUsingGET_sortProperty = config.getOwnersUsingGET_sortProperty;
        this.getOwnersUsingGET_sortPropertyType = config.getOwnersUsingGET_sortPropertyType || 'str';
        this.getOwnersUsingGET_sortOrder = config.getOwnersUsingGET_sortOrder;
        this.getOwnersUsingGET_sortOrderType = config.getOwnersUsingGET_sortOrderType || 'str';
        this.findAlarmDataByQueryUsingPOST_body = config.findAlarmDataByQueryUsingPOST_body;
        this.findAlarmDataByQueryUsingPOST_bodyType = config.findAlarmDataByQueryUsingPOST_bodyType || 'str';
        this.countEntitiesByQueryUsingPOST_body = config.countEntitiesByQueryUsingPOST_body;
        this.countEntitiesByQueryUsingPOST_bodyType = config.countEntitiesByQueryUsingPOST_bodyType || 'str';
        this.findEntityDataByQueryUsingPOST_body = config.findEntityDataByQueryUsingPOST_body;
        this.findEntityDataByQueryUsingPOST_bodyType = config.findEntityDataByQueryUsingPOST_bodyType || 'str';
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseries = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseries;
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseriesType = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseriesType || 'str';
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributes = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributes;
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributesType = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributesType || 'str';
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_body = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_body;
        this.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_bodyType = config.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_bodyType || 'str';
        this.saveRelationUsingPOST_body = config.saveRelationUsingPOST_body;
        this.saveRelationUsingPOST_bodyType = config.saveRelationUsingPOST_bodyType || 'str';
        this.findByQueryUsingPOST_3_body = config.findByQueryUsingPOST_3_body;
        this.findByQueryUsingPOST_3_bodyType = config.findByQueryUsingPOST_3_bodyType || 'str';
        this.findInfoByQueryUsingPOST_body = config.findInfoByQueryUsingPOST_body;
        this.findInfoByQueryUsingPOST_bodyType = config.findInfoByQueryUsingPOST_bodyType || 'str';
        this.findInfoByFromUsingGET_fromId = config.findInfoByFromUsingGET_fromId;
        this.findInfoByFromUsingGET_fromIdType = config.findInfoByFromUsingGET_fromIdType || 'str';
        this.findInfoByFromUsingGET_fromType = config.findInfoByFromUsingGET_fromType;
        this.findInfoByFromUsingGET_fromTypeType = config.findInfoByFromUsingGET_fromTypeType || 'str';
        this.findInfoByFromUsingGET_relationTypeGroup = config.findInfoByFromUsingGET_relationTypeGroup;
        this.findInfoByFromUsingGET_relationTypeGroupType = config.findInfoByFromUsingGET_relationTypeGroupType || 'str';
        this.findInfoByToUsingGET_toId = config.findInfoByToUsingGET_toId;
        this.findInfoByToUsingGET_toIdType = config.findInfoByToUsingGET_toIdType || 'str';
        this.findInfoByToUsingGET_toType = config.findInfoByToUsingGET_toType;
        this.findInfoByToUsingGET_toTypeType = config.findInfoByToUsingGET_toTypeType || 'str';
        this.findInfoByToUsingGET_relationTypeGroup = config.findInfoByToUsingGET_relationTypeGroup;
        this.findInfoByToUsingGET_relationTypeGroupType = config.findInfoByToUsingGET_relationTypeGroupType || 'str';
        this.deleteRelationsUsingDELETE_entityId = config.deleteRelationsUsingDELETE_entityId;
        this.deleteRelationsUsingDELETE_entityIdType = config.deleteRelationsUsingDELETE_entityIdType || 'str';
        this.deleteRelationsUsingDELETE_entityType = config.deleteRelationsUsingDELETE_entityType;
        this.deleteRelationsUsingDELETE_entityTypeType = config.deleteRelationsUsingDELETE_entityTypeType || 'str';
        this.findByFromUsingGET_fromId = config.findByFromUsingGET_fromId;
        this.findByFromUsingGET_fromIdType = config.findByFromUsingGET_fromIdType || 'str';
        this.findByFromUsingGET_fromType = config.findByFromUsingGET_fromType;
        this.findByFromUsingGET_fromTypeType = config.findByFromUsingGET_fromTypeType || 'str';
        this.findByFromUsingGET_relationType = config.findByFromUsingGET_relationType;
        this.findByFromUsingGET_relationTypeType = config.findByFromUsingGET_relationTypeType || 'str';
        this.findByFromUsingGET_relationTypeGroup = config.findByFromUsingGET_relationTypeGroup;
        this.findByFromUsingGET_relationTypeGroupType = config.findByFromUsingGET_relationTypeGroupType || 'str';
        this.findByFromUsingGET_1_fromId = config.findByFromUsingGET_1_fromId;
        this.findByFromUsingGET_1_fromIdType = config.findByFromUsingGET_1_fromIdType || 'str';
        this.findByFromUsingGET_1_fromType = config.findByFromUsingGET_1_fromType;
        this.findByFromUsingGET_1_fromTypeType = config.findByFromUsingGET_1_fromTypeType || 'str';
        this.findByFromUsingGET_1_relationTypeGroup = config.findByFromUsingGET_1_relationTypeGroup;
        this.findByFromUsingGET_1_relationTypeGroupType = config.findByFromUsingGET_1_relationTypeGroupType || 'str';
        this.findByToUsingGET_toId = config.findByToUsingGET_toId;
        this.findByToUsingGET_toIdType = config.findByToUsingGET_toIdType || 'str';
        this.findByToUsingGET_toType = config.findByToUsingGET_toType;
        this.findByToUsingGET_toTypeType = config.findByToUsingGET_toTypeType || 'str';
        this.findByToUsingGET_relationType = config.findByToUsingGET_relationType;
        this.findByToUsingGET_relationTypeType = config.findByToUsingGET_relationTypeType || 'str';
        this.findByToUsingGET_relationTypeGroup = config.findByToUsingGET_relationTypeGroup;
        this.findByToUsingGET_relationTypeGroupType = config.findByToUsingGET_relationTypeGroupType || 'str';
        this.findByToUsingGET_1_toId = config.findByToUsingGET_1_toId;
        this.findByToUsingGET_1_toIdType = config.findByToUsingGET_1_toIdType || 'str';
        this.findByToUsingGET_1_toType = config.findByToUsingGET_1_toType;
        this.findByToUsingGET_1_toTypeType = config.findByToUsingGET_1_toTypeType || 'str';
        this.findByToUsingGET_1_relationTypeGroup = config.findByToUsingGET_1_relationTypeGroup;
        this.findByToUsingGET_1_relationTypeGroupType = config.findByToUsingGET_1_relationTypeGroupType || 'str';
        this.getRelationUsingGET_fromId = config.getRelationUsingGET_fromId;
        this.getRelationUsingGET_fromIdType = config.getRelationUsingGET_fromIdType || 'str';
        this.getRelationUsingGET_fromType = config.getRelationUsingGET_fromType;
        this.getRelationUsingGET_fromTypeType = config.getRelationUsingGET_fromTypeType || 'str';
        this.getRelationUsingGET_relationType = config.getRelationUsingGET_relationType;
        this.getRelationUsingGET_relationTypeType = config.getRelationUsingGET_relationTypeType || 'str';
        this.getRelationUsingGET_relationTypeGroup = config.getRelationUsingGET_relationTypeGroup;
        this.getRelationUsingGET_relationTypeGroupType = config.getRelationUsingGET_relationTypeGroupType || 'str';
        this.getRelationUsingGET_toId = config.getRelationUsingGET_toId;
        this.getRelationUsingGET_toIdType = config.getRelationUsingGET_toIdType || 'str';
        this.getRelationUsingGET_toType = config.getRelationUsingGET_toType;
        this.getRelationUsingGET_toTypeType = config.getRelationUsingGET_toTypeType || 'str';
        this.deleteRelationUsingDELETE_fromId = config.deleteRelationUsingDELETE_fromId;
        this.deleteRelationUsingDELETE_fromIdType = config.deleteRelationUsingDELETE_fromIdType || 'str';
        this.deleteRelationUsingDELETE_fromType = config.deleteRelationUsingDELETE_fromType;
        this.deleteRelationUsingDELETE_fromTypeType = config.deleteRelationUsingDELETE_fromTypeType || 'str';
        this.deleteRelationUsingDELETE_relationType = config.deleteRelationUsingDELETE_relationType;
        this.deleteRelationUsingDELETE_relationTypeType = config.deleteRelationUsingDELETE_relationTypeType || 'str';
        this.deleteRelationUsingDELETE_relationTypeGroup = config.deleteRelationUsingDELETE_relationTypeGroup;
        this.deleteRelationUsingDELETE_relationTypeGroupType = config.deleteRelationUsingDELETE_relationTypeGroupType || 'str';
        this.deleteRelationUsingDELETE_toId = config.deleteRelationUsingDELETE_toId;
        this.deleteRelationUsingDELETE_toIdType = config.deleteRelationUsingDELETE_toIdType || 'str';
        this.deleteRelationUsingDELETE_toType = config.deleteRelationUsingDELETE_toType;
        this.deleteRelationUsingDELETE_toTypeType = config.deleteRelationUsingDELETE_toTypeType || 'str';
        this.getCustomerEntityViewsUsingGET_customerId = config.getCustomerEntityViewsUsingGET_customerId;
        this.getCustomerEntityViewsUsingGET_customerIdType = config.getCustomerEntityViewsUsingGET_customerIdType || 'str';
        this.getCustomerEntityViewsUsingGET_pageSize = config.getCustomerEntityViewsUsingGET_pageSize;
        this.getCustomerEntityViewsUsingGET_pageSizeType = config.getCustomerEntityViewsUsingGET_pageSizeType || 'str';
        this.getCustomerEntityViewsUsingGET_page = config.getCustomerEntityViewsUsingGET_page;
        this.getCustomerEntityViewsUsingGET_pageType = config.getCustomerEntityViewsUsingGET_pageType || 'str';
        this.getCustomerEntityViewsUsingGET_type = config.getCustomerEntityViewsUsingGET_type;
        this.getCustomerEntityViewsUsingGET_typeType = config.getCustomerEntityViewsUsingGET_typeType || 'str';
        this.getCustomerEntityViewsUsingGET_textSearch = config.getCustomerEntityViewsUsingGET_textSearch;
        this.getCustomerEntityViewsUsingGET_textSearchType = config.getCustomerEntityViewsUsingGET_textSearchType || 'str';
        this.getCustomerEntityViewsUsingGET_sortProperty = config.getCustomerEntityViewsUsingGET_sortProperty;
        this.getCustomerEntityViewsUsingGET_sortPropertyType = config.getCustomerEntityViewsUsingGET_sortPropertyType || 'str';
        this.getCustomerEntityViewsUsingGET_sortOrder = config.getCustomerEntityViewsUsingGET_sortOrder;
        this.getCustomerEntityViewsUsingGET_sortOrderType = config.getCustomerEntityViewsUsingGET_sortOrderType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_entityGroupId = config.getEntityViewsByEntityGroupIdUsingGET_entityGroupId;
        this.getEntityViewsByEntityGroupIdUsingGET_entityGroupIdType = config.getEntityViewsByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_pageSize = config.getEntityViewsByEntityGroupIdUsingGET_pageSize;
        this.getEntityViewsByEntityGroupIdUsingGET_pageSizeType = config.getEntityViewsByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_page = config.getEntityViewsByEntityGroupIdUsingGET_page;
        this.getEntityViewsByEntityGroupIdUsingGET_pageType = config.getEntityViewsByEntityGroupIdUsingGET_pageType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_textSearch = config.getEntityViewsByEntityGroupIdUsingGET_textSearch;
        this.getEntityViewsByEntityGroupIdUsingGET_textSearchType = config.getEntityViewsByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_sortProperty = config.getEntityViewsByEntityGroupIdUsingGET_sortProperty;
        this.getEntityViewsByEntityGroupIdUsingGET_sortPropertyType = config.getEntityViewsByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getEntityViewsByEntityGroupIdUsingGET_sortOrder = config.getEntityViewsByEntityGroupIdUsingGET_sortOrder;
        this.getEntityViewsByEntityGroupIdUsingGET_sortOrderType = config.getEntityViewsByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.getEntityViewByIdUsingGET_entityViewId = config.getEntityViewByIdUsingGET_entityViewId;
        this.getEntityViewByIdUsingGET_entityViewIdType = config.getEntityViewByIdUsingGET_entityViewIdType || 'str';
        this.deleteEntityViewUsingDELETE_entityViewId = config.deleteEntityViewUsingDELETE_entityViewId;
        this.deleteEntityViewUsingDELETE_entityViewIdType = config.deleteEntityViewUsingDELETE_entityViewIdType || 'str';
        this.findByQueryUsingPOST_4_body = config.findByQueryUsingPOST_4_body;
        this.findByQueryUsingPOST_4_bodyType = config.findByQueryUsingPOST_4_bodyType || 'str';
        this.getEntityViewsByIdsUsingGET_entityViewIds = config.getEntityViewsByIdsUsingGET_entityViewIds;
        this.getEntityViewsByIdsUsingGET_entityViewIdsType = config.getEntityViewsByIdsUsingGET_entityViewIdsType || 'str';
        this.saveEntityViewUsingPOST_entityGroupId = config.saveEntityViewUsingPOST_entityGroupId;
        this.saveEntityViewUsingPOST_entityGroupIdType = config.saveEntityViewUsingPOST_entityGroupIdType || 'str';
        this.saveEntityViewUsingPOST_body = config.saveEntityViewUsingPOST_body;
        this.saveEntityViewUsingPOST_bodyType = config.saveEntityViewUsingPOST_bodyType || 'str';
        this.getTenantEntityViewUsingGET_entityViewName = config.getTenantEntityViewUsingGET_entityViewName;
        this.getTenantEntityViewUsingGET_entityViewNameType = config.getTenantEntityViewUsingGET_entityViewNameType || 'str';
        this.getTenantEntityViewsUsingGET_pageSize = config.getTenantEntityViewsUsingGET_pageSize;
        this.getTenantEntityViewsUsingGET_pageSizeType = config.getTenantEntityViewsUsingGET_pageSizeType || 'str';
        this.getTenantEntityViewsUsingGET_page = config.getTenantEntityViewsUsingGET_page;
        this.getTenantEntityViewsUsingGET_pageType = config.getTenantEntityViewsUsingGET_pageType || 'str';
        this.getTenantEntityViewsUsingGET_type = config.getTenantEntityViewsUsingGET_type;
        this.getTenantEntityViewsUsingGET_typeType = config.getTenantEntityViewsUsingGET_typeType || 'str';
        this.getTenantEntityViewsUsingGET_textSearch = config.getTenantEntityViewsUsingGET_textSearch;
        this.getTenantEntityViewsUsingGET_textSearchType = config.getTenantEntityViewsUsingGET_textSearchType || 'str';
        this.getTenantEntityViewsUsingGET_sortProperty = config.getTenantEntityViewsUsingGET_sortProperty;
        this.getTenantEntityViewsUsingGET_sortPropertyType = config.getTenantEntityViewsUsingGET_sortPropertyType || 'str';
        this.getTenantEntityViewsUsingGET_sortOrder = config.getTenantEntityViewsUsingGET_sortOrder;
        this.getTenantEntityViewsUsingGET_sortOrderType = config.getTenantEntityViewsUsingGET_sortOrderType || 'str';
        this.getUserEntityViewsUsingGET_pageSize = config.getUserEntityViewsUsingGET_pageSize;
        this.getUserEntityViewsUsingGET_pageSizeType = config.getUserEntityViewsUsingGET_pageSizeType || 'str';
        this.getUserEntityViewsUsingGET_page = config.getUserEntityViewsUsingGET_page;
        this.getUserEntityViewsUsingGET_pageType = config.getUserEntityViewsUsingGET_pageType || 'str';
        this.getUserEntityViewsUsingGET_type = config.getUserEntityViewsUsingGET_type;
        this.getUserEntityViewsUsingGET_typeType = config.getUserEntityViewsUsingGET_typeType || 'str';
        this.getUserEntityViewsUsingGET_textSearch = config.getUserEntityViewsUsingGET_textSearch;
        this.getUserEntityViewsUsingGET_textSearchType = config.getUserEntityViewsUsingGET_textSearchType || 'str';
        this.getUserEntityViewsUsingGET_sortProperty = config.getUserEntityViewsUsingGET_sortProperty;
        this.getUserEntityViewsUsingGET_sortPropertyType = config.getUserEntityViewsUsingGET_sortPropertyType || 'str';
        this.getUserEntityViewsUsingGET_sortOrder = config.getUserEntityViewsUsingGET_sortOrder;
        this.getUserEntityViewsUsingGET_sortOrderType = config.getUserEntityViewsUsingGET_sortOrderType || 'str';
        this.clearEventsUsingPOST_entityType = config.clearEventsUsingPOST_entityType;
        this.clearEventsUsingPOST_entityTypeType = config.clearEventsUsingPOST_entityTypeType || 'str';
        this.clearEventsUsingPOST_entityId = config.clearEventsUsingPOST_entityId;
        this.clearEventsUsingPOST_entityIdType = config.clearEventsUsingPOST_entityIdType || 'str';
        this.clearEventsUsingPOST_startTime = config.clearEventsUsingPOST_startTime;
        this.clearEventsUsingPOST_startTimeType = config.clearEventsUsingPOST_startTimeType || 'str';
        this.clearEventsUsingPOST_endTime = config.clearEventsUsingPOST_endTime;
        this.clearEventsUsingPOST_endTimeType = config.clearEventsUsingPOST_endTimeType || 'str';
        this.clearEventsUsingPOST_body = config.clearEventsUsingPOST_body;
        this.clearEventsUsingPOST_bodyType = config.clearEventsUsingPOST_bodyType || 'str';
        this.getEventsUsingGET_1_entityType = config.getEventsUsingGET_1_entityType;
        this.getEventsUsingGET_1_entityTypeType = config.getEventsUsingGET_1_entityTypeType || 'str';
        this.getEventsUsingGET_1_entityId = config.getEventsUsingGET_1_entityId;
        this.getEventsUsingGET_1_entityIdType = config.getEventsUsingGET_1_entityIdType || 'str';
        this.getEventsUsingGET_1_eventType = config.getEventsUsingGET_1_eventType;
        this.getEventsUsingGET_1_eventTypeType = config.getEventsUsingGET_1_eventTypeType || 'str';
        this.getEventsUsingGET_1_tenantId = config.getEventsUsingGET_1_tenantId;
        this.getEventsUsingGET_1_tenantIdType = config.getEventsUsingGET_1_tenantIdType || 'str';
        this.getEventsUsingGET_1_pageSize = config.getEventsUsingGET_1_pageSize;
        this.getEventsUsingGET_1_pageSizeType = config.getEventsUsingGET_1_pageSizeType || 'str';
        this.getEventsUsingGET_1_page = config.getEventsUsingGET_1_page;
        this.getEventsUsingGET_1_pageType = config.getEventsUsingGET_1_pageType || 'str';
        this.getEventsUsingGET_1_textSearch = config.getEventsUsingGET_1_textSearch;
        this.getEventsUsingGET_1_textSearchType = config.getEventsUsingGET_1_textSearchType || 'str';
        this.getEventsUsingGET_1_sortProperty = config.getEventsUsingGET_1_sortProperty;
        this.getEventsUsingGET_1_sortPropertyType = config.getEventsUsingGET_1_sortPropertyType || 'str';
        this.getEventsUsingGET_1_sortOrder = config.getEventsUsingGET_1_sortOrder;
        this.getEventsUsingGET_1_sortOrderType = config.getEventsUsingGET_1_sortOrderType || 'str';
        this.getEventsUsingGET_1_startTime = config.getEventsUsingGET_1_startTime;
        this.getEventsUsingGET_1_startTimeType = config.getEventsUsingGET_1_startTimeType || 'str';
        this.getEventsUsingGET_1_endTime = config.getEventsUsingGET_1_endTime;
        this.getEventsUsingGET_1_endTimeType = config.getEventsUsingGET_1_endTimeType || 'str';
        this.getEventsUsingGET_entityType = config.getEventsUsingGET_entityType;
        this.getEventsUsingGET_entityTypeType = config.getEventsUsingGET_entityTypeType || 'str';
        this.getEventsUsingGET_entityId = config.getEventsUsingGET_entityId;
        this.getEventsUsingGET_entityIdType = config.getEventsUsingGET_entityIdType || 'str';
        this.getEventsUsingGET_tenantId = config.getEventsUsingGET_tenantId;
        this.getEventsUsingGET_tenantIdType = config.getEventsUsingGET_tenantIdType || 'str';
        this.getEventsUsingGET_pageSize = config.getEventsUsingGET_pageSize;
        this.getEventsUsingGET_pageSizeType = config.getEventsUsingGET_pageSizeType || 'str';
        this.getEventsUsingGET_page = config.getEventsUsingGET_page;
        this.getEventsUsingGET_pageType = config.getEventsUsingGET_pageType || 'str';
        this.getEventsUsingGET_textSearch = config.getEventsUsingGET_textSearch;
        this.getEventsUsingGET_textSearchType = config.getEventsUsingGET_textSearchType || 'str';
        this.getEventsUsingGET_sortProperty = config.getEventsUsingGET_sortProperty;
        this.getEventsUsingGET_sortPropertyType = config.getEventsUsingGET_sortPropertyType || 'str';
        this.getEventsUsingGET_sortOrder = config.getEventsUsingGET_sortOrder;
        this.getEventsUsingGET_sortOrderType = config.getEventsUsingGET_sortOrderType || 'str';
        this.getEventsUsingGET_startTime = config.getEventsUsingGET_startTime;
        this.getEventsUsingGET_startTimeType = config.getEventsUsingGET_startTimeType || 'str';
        this.getEventsUsingGET_endTime = config.getEventsUsingGET_endTime;
        this.getEventsUsingGET_endTimeType = config.getEventsUsingGET_endTimeType || 'str';
        this.getEventsUsingPOST_entityType = config.getEventsUsingPOST_entityType;
        this.getEventsUsingPOST_entityTypeType = config.getEventsUsingPOST_entityTypeType || 'str';
        this.getEventsUsingPOST_entityId = config.getEventsUsingPOST_entityId;
        this.getEventsUsingPOST_entityIdType = config.getEventsUsingPOST_entityIdType || 'str';
        this.getEventsUsingPOST_tenantId = config.getEventsUsingPOST_tenantId;
        this.getEventsUsingPOST_tenantIdType = config.getEventsUsingPOST_tenantIdType || 'str';
        this.getEventsUsingPOST_pageSize = config.getEventsUsingPOST_pageSize;
        this.getEventsUsingPOST_pageSizeType = config.getEventsUsingPOST_pageSizeType || 'str';
        this.getEventsUsingPOST_page = config.getEventsUsingPOST_page;
        this.getEventsUsingPOST_pageType = config.getEventsUsingPOST_pageType || 'str';
        this.getEventsUsingPOST_textSearch = config.getEventsUsingPOST_textSearch;
        this.getEventsUsingPOST_textSearchType = config.getEventsUsingPOST_textSearchType || 'str';
        this.getEventsUsingPOST_sortProperty = config.getEventsUsingPOST_sortProperty;
        this.getEventsUsingPOST_sortPropertyType = config.getEventsUsingPOST_sortPropertyType || 'str';
        this.getEventsUsingPOST_sortOrder = config.getEventsUsingPOST_sortOrder;
        this.getEventsUsingPOST_sortOrderType = config.getEventsUsingPOST_sortOrderType || 'str';
        this.getEventsUsingPOST_startTime = config.getEventsUsingPOST_startTime;
        this.getEventsUsingPOST_startTimeType = config.getEventsUsingPOST_startTimeType || 'str';
        this.getEventsUsingPOST_endTime = config.getEventsUsingPOST_endTime;
        this.getEventsUsingPOST_endTimeType = config.getEventsUsingPOST_endTimeType || 'str';
        this.getEventsUsingPOST_body = config.getEventsUsingPOST_body;
        this.getEventsUsingPOST_bodyType = config.getEventsUsingPOST_bodyType || 'str';
        this.getEntityGroupPermissionsUsingGET_entityGroupId = config.getEntityGroupPermissionsUsingGET_entityGroupId;
        this.getEntityGroupPermissionsUsingGET_entityGroupIdType = config.getEntityGroupPermissionsUsingGET_entityGroupIdType || 'str';
        this.saveGroupPermissionUsingPOST_body = config.saveGroupPermissionUsingPOST_body;
        this.saveGroupPermissionUsingPOST_bodyType = config.saveGroupPermissionUsingPOST_bodyType || 'str';
        this.getGroupPermissionInfoByIdUsingGET_groupPermissionId = config.getGroupPermissionInfoByIdUsingGET_groupPermissionId;
        this.getGroupPermissionInfoByIdUsingGET_groupPermissionIdType = config.getGroupPermissionInfoByIdUsingGET_groupPermissionIdType || 'str';
        this.getGroupPermissionInfoByIdUsingGET_isUserGroup = config.getGroupPermissionInfoByIdUsingGET_isUserGroup;
        this.getGroupPermissionInfoByIdUsingGET_isUserGroupType = config.getGroupPermissionInfoByIdUsingGET_isUserGroupType || 'str';
        this.getGroupPermissionByIdUsingGET_groupPermissionId = config.getGroupPermissionByIdUsingGET_groupPermissionId;
        this.getGroupPermissionByIdUsingGET_groupPermissionIdType = config.getGroupPermissionByIdUsingGET_groupPermissionIdType || 'str';
        this.deleteGroupPermissionUsingDELETE_groupPermissionId = config.deleteGroupPermissionUsingDELETE_groupPermissionId;
        this.deleteGroupPermissionUsingDELETE_groupPermissionIdType = config.deleteGroupPermissionUsingDELETE_groupPermissionIdType || 'str';
        this.loadUserGroupPermissionInfosUsingPOST_body = config.loadUserGroupPermissionInfosUsingPOST_body;
        this.loadUserGroupPermissionInfosUsingPOST_bodyType = config.loadUserGroupPermissionInfosUsingPOST_bodyType || 'str';
        this.getUserGroupPermissionsUsingGET_userGroupId = config.getUserGroupPermissionsUsingGET_userGroupId;
        this.getUserGroupPermissionsUsingGET_userGroupIdType = config.getUserGroupPermissionsUsingGET_userGroupIdType || 'str';
        this.saveIntegrationUsingPOST_body = config.saveIntegrationUsingPOST_body;
        this.saveIntegrationUsingPOST_bodyType = config.saveIntegrationUsingPOST_bodyType || 'str';
        this.checkIntegrationConnectionUsingPOST_body = config.checkIntegrationConnectionUsingPOST_body;
        this.checkIntegrationConnectionUsingPOST_bodyType = config.checkIntegrationConnectionUsingPOST_bodyType || 'str';
        this.getIntegrationByRoutingKeyUsingGET_routingKey = config.getIntegrationByRoutingKeyUsingGET_routingKey;
        this.getIntegrationByRoutingKeyUsingGET_routingKeyType = config.getIntegrationByRoutingKeyUsingGET_routingKeyType || 'str';
        this.getIntegrationByIdUsingGET_integrationId = config.getIntegrationByIdUsingGET_integrationId;
        this.getIntegrationByIdUsingGET_integrationIdType = config.getIntegrationByIdUsingGET_integrationIdType || 'str';
        this.deleteIntegrationUsingDELETE_integrationId = config.deleteIntegrationUsingDELETE_integrationId;
        this.deleteIntegrationUsingDELETE_integrationIdType = config.deleteIntegrationUsingDELETE_integrationIdType || 'str';
        this.getIntegrationsByIdsUsingGET_integrationIds = config.getIntegrationsByIdsUsingGET_integrationIds;
        this.getIntegrationsByIdsUsingGET_integrationIdsType = config.getIntegrationsByIdsUsingGET_integrationIdsType || 'str';
        this.getIntegrationsUsingGET_pageSize = config.getIntegrationsUsingGET_pageSize;
        this.getIntegrationsUsingGET_pageSizeType = config.getIntegrationsUsingGET_pageSizeType || 'str';
        this.getIntegrationsUsingGET_page = config.getIntegrationsUsingGET_page;
        this.getIntegrationsUsingGET_pageType = config.getIntegrationsUsingGET_pageType || 'str';
        this.getIntegrationsUsingGET_textSearch = config.getIntegrationsUsingGET_textSearch;
        this.getIntegrationsUsingGET_textSearchType = config.getIntegrationsUsingGET_textSearchType || 'str';
        this.getIntegrationsUsingGET_sortProperty = config.getIntegrationsUsingGET_sortProperty;
        this.getIntegrationsUsingGET_sortPropertyType = config.getIntegrationsUsingGET_sortPropertyType || 'str';
        this.getIntegrationsUsingGET_sortOrder = config.getIntegrationsUsingGET_sortOrder;
        this.getIntegrationsUsingGET_sortOrderType = config.getIntegrationsUsingGET_sortOrderType || 'str';
        this.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServer = config.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServer;
        this.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServerType = config.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServerType || 'str';
        this.saveClientRegistrationTemplateUsingPOST_body = config.saveClientRegistrationTemplateUsingPOST_body;
        this.saveClientRegistrationTemplateUsingPOST_bodyType = config.saveClientRegistrationTemplateUsingPOST_bodyType || 'str';
        this.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateId = config.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateId;
        this.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateIdType = config.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateIdType || 'str';
        this.getOAuth2ClientsUsingPOST_pkgName = config.getOAuth2ClientsUsingPOST_pkgName;
        this.getOAuth2ClientsUsingPOST_pkgNameType = config.getOAuth2ClientsUsingPOST_pkgNameType || 'str';
        this.getOAuth2ClientsUsingPOST_platform = config.getOAuth2ClientsUsingPOST_platform;
        this.getOAuth2ClientsUsingPOST_platformType = config.getOAuth2ClientsUsingPOST_platformType || 'str';
        this.saveOAuth2InfoUsingPOST_body = config.saveOAuth2InfoUsingPOST_body;
        this.saveOAuth2InfoUsingPOST_bodyType = config.saveOAuth2InfoUsingPOST_bodyType || 'str';
        this.saveOtaPackageInfoUsingPOST_body = config.saveOtaPackageInfoUsingPOST_body;
        this.saveOtaPackageInfoUsingPOST_bodyType = config.saveOtaPackageInfoUsingPOST_bodyType || 'str';
        this.getOtaPackageInfoByIdUsingGET_otaPackageId = config.getOtaPackageInfoByIdUsingGET_otaPackageId;
        this.getOtaPackageInfoByIdUsingGET_otaPackageIdType = config.getOtaPackageInfoByIdUsingGET_otaPackageIdType || 'str';
        this.getOtaPackageByIdUsingGET_otaPackageId = config.getOtaPackageByIdUsingGET_otaPackageId;
        this.getOtaPackageByIdUsingGET_otaPackageIdType = config.getOtaPackageByIdUsingGET_otaPackageIdType || 'str';
        this.deleteOtaPackageUsingDELETE_otaPackageId = config.deleteOtaPackageUsingDELETE_otaPackageId;
        this.deleteOtaPackageUsingDELETE_otaPackageIdType = config.deleteOtaPackageUsingDELETE_otaPackageIdType || 'str';
        this.downloadOtaPackageUsingGET_otaPackageId = config.downloadOtaPackageUsingGET_otaPackageId;
        this.downloadOtaPackageUsingGET_otaPackageIdType = config.downloadOtaPackageUsingGET_otaPackageIdType || 'str';
        this.saveOtaPackageDataUsingPOST_otaPackageId = config.saveOtaPackageDataUsingPOST_otaPackageId;
        this.saveOtaPackageDataUsingPOST_otaPackageIdType = config.saveOtaPackageDataUsingPOST_otaPackageIdType || 'str';
        this.saveOtaPackageDataUsingPOST_checksum = config.saveOtaPackageDataUsingPOST_checksum;
        this.saveOtaPackageDataUsingPOST_checksumType = config.saveOtaPackageDataUsingPOST_checksumType || 'str';
        this.saveOtaPackageDataUsingPOST_checksumAlgorithm = config.saveOtaPackageDataUsingPOST_checksumAlgorithm;
        this.saveOtaPackageDataUsingPOST_checksumAlgorithmType = config.saveOtaPackageDataUsingPOST_checksumAlgorithmType || 'str';
        this.saveOtaPackageDataUsingPOST_body = config.saveOtaPackageDataUsingPOST_body;
        this.saveOtaPackageDataUsingPOST_bodyType = config.saveOtaPackageDataUsingPOST_bodyType || 'str';
        this.getGroupOtaPackagesUsingGET_groupId = config.getGroupOtaPackagesUsingGET_groupId;
        this.getGroupOtaPackagesUsingGET_groupIdType = config.getGroupOtaPackagesUsingGET_groupIdType || 'str';
        this.getGroupOtaPackagesUsingGET_type = config.getGroupOtaPackagesUsingGET_type;
        this.getGroupOtaPackagesUsingGET_typeType = config.getGroupOtaPackagesUsingGET_typeType || 'str';
        this.getGroupOtaPackagesUsingGET_pageSize = config.getGroupOtaPackagesUsingGET_pageSize;
        this.getGroupOtaPackagesUsingGET_pageSizeType = config.getGroupOtaPackagesUsingGET_pageSizeType || 'str';
        this.getGroupOtaPackagesUsingGET_page = config.getGroupOtaPackagesUsingGET_page;
        this.getGroupOtaPackagesUsingGET_pageType = config.getGroupOtaPackagesUsingGET_pageType || 'str';
        this.getGroupOtaPackagesUsingGET_textSearch = config.getGroupOtaPackagesUsingGET_textSearch;
        this.getGroupOtaPackagesUsingGET_textSearchType = config.getGroupOtaPackagesUsingGET_textSearchType || 'str';
        this.getGroupOtaPackagesUsingGET_sortProperty = config.getGroupOtaPackagesUsingGET_sortProperty;
        this.getGroupOtaPackagesUsingGET_sortPropertyType = config.getGroupOtaPackagesUsingGET_sortPropertyType || 'str';
        this.getGroupOtaPackagesUsingGET_sortOrder = config.getGroupOtaPackagesUsingGET_sortOrder;
        this.getGroupOtaPackagesUsingGET_sortOrderType = config.getGroupOtaPackagesUsingGET_sortOrderType || 'str';
        this.getOtaPackagesUsingGET_1_deviceProfileId = config.getOtaPackagesUsingGET_1_deviceProfileId;
        this.getOtaPackagesUsingGET_1_deviceProfileIdType = config.getOtaPackagesUsingGET_1_deviceProfileIdType || 'str';
        this.getOtaPackagesUsingGET_1_type = config.getOtaPackagesUsingGET_1_type;
        this.getOtaPackagesUsingGET_1_typeType = config.getOtaPackagesUsingGET_1_typeType || 'str';
        this.getOtaPackagesUsingGET_1_pageSize = config.getOtaPackagesUsingGET_1_pageSize;
        this.getOtaPackagesUsingGET_1_pageSizeType = config.getOtaPackagesUsingGET_1_pageSizeType || 'str';
        this.getOtaPackagesUsingGET_1_page = config.getOtaPackagesUsingGET_1_page;
        this.getOtaPackagesUsingGET_1_pageType = config.getOtaPackagesUsingGET_1_pageType || 'str';
        this.getOtaPackagesUsingGET_1_textSearch = config.getOtaPackagesUsingGET_1_textSearch;
        this.getOtaPackagesUsingGET_1_textSearchType = config.getOtaPackagesUsingGET_1_textSearchType || 'str';
        this.getOtaPackagesUsingGET_1_sortProperty = config.getOtaPackagesUsingGET_1_sortProperty;
        this.getOtaPackagesUsingGET_1_sortPropertyType = config.getOtaPackagesUsingGET_1_sortPropertyType || 'str';
        this.getOtaPackagesUsingGET_1_sortOrder = config.getOtaPackagesUsingGET_1_sortOrder;
        this.getOtaPackagesUsingGET_1_sortOrderType = config.getOtaPackagesUsingGET_1_sortOrderType || 'str';
        this.getOtaPackagesUsingGET_pageSize = config.getOtaPackagesUsingGET_pageSize;
        this.getOtaPackagesUsingGET_pageSizeType = config.getOtaPackagesUsingGET_pageSizeType || 'str';
        this.getOtaPackagesUsingGET_page = config.getOtaPackagesUsingGET_page;
        this.getOtaPackagesUsingGET_pageType = config.getOtaPackagesUsingGET_pageType || 'str';
        this.getOtaPackagesUsingGET_textSearch = config.getOtaPackagesUsingGET_textSearch;
        this.getOtaPackagesUsingGET_textSearchType = config.getOtaPackagesUsingGET_textSearchType || 'str';
        this.getOtaPackagesUsingGET_sortProperty = config.getOtaPackagesUsingGET_sortProperty;
        this.getOtaPackagesUsingGET_sortPropertyType = config.getOtaPackagesUsingGET_sortPropertyType || 'str';
        this.getOtaPackagesUsingGET_sortOrder = config.getOtaPackagesUsingGET_sortOrder;
        this.getOtaPackagesUsingGET_sortOrderType = config.getOtaPackagesUsingGET_sortOrderType || 'str';
        this.changeOwnerToCustomerUsingPOST_ownerId = config.changeOwnerToCustomerUsingPOST_ownerId;
        this.changeOwnerToCustomerUsingPOST_ownerIdType = config.changeOwnerToCustomerUsingPOST_ownerIdType || 'str';
        this.changeOwnerToCustomerUsingPOST_entityType = config.changeOwnerToCustomerUsingPOST_entityType;
        this.changeOwnerToCustomerUsingPOST_entityTypeType = config.changeOwnerToCustomerUsingPOST_entityTypeType || 'str';
        this.changeOwnerToCustomerUsingPOST_entityId = config.changeOwnerToCustomerUsingPOST_entityId;
        this.changeOwnerToCustomerUsingPOST_entityIdType = config.changeOwnerToCustomerUsingPOST_entityIdType || 'str';
        this.changeOwnerToTenantUsingPOST_ownerId = config.changeOwnerToTenantUsingPOST_ownerId;
        this.changeOwnerToTenantUsingPOST_ownerIdType = config.changeOwnerToTenantUsingPOST_ownerIdType || 'str';
        this.changeOwnerToTenantUsingPOST_entityType = config.changeOwnerToTenantUsingPOST_entityType;
        this.changeOwnerToTenantUsingPOST_entityTypeType = config.changeOwnerToTenantUsingPOST_entityTypeType || 'str';
        this.changeOwnerToTenantUsingPOST_entityId = config.changeOwnerToTenantUsingPOST_entityId;
        this.changeOwnerToTenantUsingPOST_entityIdType = config.changeOwnerToTenantUsingPOST_entityIdType || 'str';
        this.getTenantQueuesByServiceTypeUsingGET_serviceType = config.getTenantQueuesByServiceTypeUsingGET_serviceType;
        this.getTenantQueuesByServiceTypeUsingGET_serviceTypeType = config.getTenantQueuesByServiceTypeUsingGET_serviceTypeType || 'str';
        this.downloadTestReportUsingPOST_reportsServerEndpointUrl = config.downloadTestReportUsingPOST_reportsServerEndpointUrl;
        this.downloadTestReportUsingPOST_reportsServerEndpointUrlType = config.downloadTestReportUsingPOST_reportsServerEndpointUrlType || 'str';
        this.downloadTestReportUsingPOST_body = config.downloadTestReportUsingPOST_body;
        this.downloadTestReportUsingPOST_bodyType = config.downloadTestReportUsingPOST_bodyType || 'str';
        this.downloadDashboardReportUsingPOST_dashboardId = config.downloadDashboardReportUsingPOST_dashboardId;
        this.downloadDashboardReportUsingPOST_dashboardIdType = config.downloadDashboardReportUsingPOST_dashboardIdType || 'str';
        this.downloadDashboardReportUsingPOST_body = config.downloadDashboardReportUsingPOST_body;
        this.downloadDashboardReportUsingPOST_bodyType = config.downloadDashboardReportUsingPOST_bodyType || 'str';
        this.saveRoleUsingPOST_body = config.saveRoleUsingPOST_body;
        this.saveRoleUsingPOST_bodyType = config.saveRoleUsingPOST_bodyType || 'str';
        this.getRoleByIdUsingGET_roleId = config.getRoleByIdUsingGET_roleId;
        this.getRoleByIdUsingGET_roleIdType = config.getRoleByIdUsingGET_roleIdType || 'str';
        this.deleteRoleUsingDELETE_roleId = config.deleteRoleUsingDELETE_roleId;
        this.deleteRoleUsingDELETE_roleIdType = config.deleteRoleUsingDELETE_roleIdType || 'str';
        this.getRolesUsingGET_pageSize = config.getRolesUsingGET_pageSize;
        this.getRolesUsingGET_pageSizeType = config.getRolesUsingGET_pageSizeType || 'str';
        this.getRolesUsingGET_page = config.getRolesUsingGET_page;
        this.getRolesUsingGET_pageType = config.getRolesUsingGET_pageType || 'str';
        this.getRolesUsingGET_type = config.getRolesUsingGET_type;
        this.getRolesUsingGET_typeType = config.getRolesUsingGET_typeType || 'str';
        this.getRolesUsingGET_textSearch = config.getRolesUsingGET_textSearch;
        this.getRolesUsingGET_textSearchType = config.getRolesUsingGET_textSearchType || 'str';
        this.getRolesUsingGET_sortProperty = config.getRolesUsingGET_sortProperty;
        this.getRolesUsingGET_sortPropertyType = config.getRolesUsingGET_sortPropertyType || 'str';
        this.getRolesUsingGET_sortOrder = config.getRolesUsingGET_sortOrder;
        this.getRolesUsingGET_sortOrderType = config.getRolesUsingGET_sortOrderType || 'str';
        this.getRolesByIdsUsingGET_roleIds = config.getRolesByIdsUsingGET_roleIds;
        this.getRolesByIdsUsingGET_roleIdsType = config.getRolesByIdsUsingGET_roleIdsType || 'str';
        this.handleOneWayDeviceRPCRequestUsingPOST_deviceId = config.handleOneWayDeviceRPCRequestUsingPOST_deviceId;
        this.handleOneWayDeviceRPCRequestUsingPOST_deviceIdType = config.handleOneWayDeviceRPCRequestUsingPOST_deviceIdType || 'str';
        this.handleOneWayDeviceRPCRequestUsingPOST_body = config.handleOneWayDeviceRPCRequestUsingPOST_body;
        this.handleOneWayDeviceRPCRequestUsingPOST_bodyType = config.handleOneWayDeviceRPCRequestUsingPOST_bodyType || 'str';
        this.handleTwoWayDeviceRPCRequestUsingPOST_deviceId = config.handleTwoWayDeviceRPCRequestUsingPOST_deviceId;
        this.handleTwoWayDeviceRPCRequestUsingPOST_deviceIdType = config.handleTwoWayDeviceRPCRequestUsingPOST_deviceIdType || 'str';
        this.handleTwoWayDeviceRPCRequestUsingPOST_body = config.handleTwoWayDeviceRPCRequestUsingPOST_body;
        this.handleTwoWayDeviceRPCRequestUsingPOST_bodyType = config.handleTwoWayDeviceRPCRequestUsingPOST_bodyType || 'str';
        this.handleOneWayDeviceRPCRequestUsingPOST_1_deviceId = config.handleOneWayDeviceRPCRequestUsingPOST_1_deviceId;
        this.handleOneWayDeviceRPCRequestUsingPOST_1_deviceIdType = config.handleOneWayDeviceRPCRequestUsingPOST_1_deviceIdType || 'str';
        this.handleOneWayDeviceRPCRequestUsingPOST_1_body = config.handleOneWayDeviceRPCRequestUsingPOST_1_body;
        this.handleOneWayDeviceRPCRequestUsingPOST_1_bodyType = config.handleOneWayDeviceRPCRequestUsingPOST_1_bodyType || 'str';
        this.getPersistedRpcByDeviceUsingGET_deviceId = config.getPersistedRpcByDeviceUsingGET_deviceId;
        this.getPersistedRpcByDeviceUsingGET_deviceIdType = config.getPersistedRpcByDeviceUsingGET_deviceIdType || 'str';
        this.getPersistedRpcByDeviceUsingGET_pageSize = config.getPersistedRpcByDeviceUsingGET_pageSize;
        this.getPersistedRpcByDeviceUsingGET_pageSizeType = config.getPersistedRpcByDeviceUsingGET_pageSizeType || 'str';
        this.getPersistedRpcByDeviceUsingGET_page = config.getPersistedRpcByDeviceUsingGET_page;
        this.getPersistedRpcByDeviceUsingGET_pageType = config.getPersistedRpcByDeviceUsingGET_pageType || 'str';
        this.getPersistedRpcByDeviceUsingGET_rpcStatus = config.getPersistedRpcByDeviceUsingGET_rpcStatus;
        this.getPersistedRpcByDeviceUsingGET_rpcStatusType = config.getPersistedRpcByDeviceUsingGET_rpcStatusType || 'str';
        this.getPersistedRpcByDeviceUsingGET_textSearch = config.getPersistedRpcByDeviceUsingGET_textSearch;
        this.getPersistedRpcByDeviceUsingGET_textSearchType = config.getPersistedRpcByDeviceUsingGET_textSearchType || 'str';
        this.getPersistedRpcByDeviceUsingGET_sortProperty = config.getPersistedRpcByDeviceUsingGET_sortProperty;
        this.getPersistedRpcByDeviceUsingGET_sortPropertyType = config.getPersistedRpcByDeviceUsingGET_sortPropertyType || 'str';
        this.getPersistedRpcByDeviceUsingGET_sortOrder = config.getPersistedRpcByDeviceUsingGET_sortOrder;
        this.getPersistedRpcByDeviceUsingGET_sortOrderType = config.getPersistedRpcByDeviceUsingGET_sortOrderType || 'str';
        this.getPersistedRpcUsingGET_rpcId = config.getPersistedRpcUsingGET_rpcId;
        this.getPersistedRpcUsingGET_rpcIdType = config.getPersistedRpcUsingGET_rpcIdType || 'str';
        this.deleteRpcUsingDELETE_rpcId = config.deleteRpcUsingDELETE_rpcId;
        this.deleteRpcUsingDELETE_rpcIdType = config.deleteRpcUsingDELETE_rpcIdType || 'str';
        this.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceId = config.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceId;
        this.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceIdType = config.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceIdType || 'str';
        this.handleTwoWayDeviceRPCRequestUsingPOST_1_body = config.handleTwoWayDeviceRPCRequestUsingPOST_1_body;
        this.handleTwoWayDeviceRPCRequestUsingPOST_1_bodyType = config.handleTwoWayDeviceRPCRequestUsingPOST_1_bodyType || 'str';
        this.assignRuleChainToEdgeUsingPOST_edgeId = config.assignRuleChainToEdgeUsingPOST_edgeId;
        this.assignRuleChainToEdgeUsingPOST_edgeIdType = config.assignRuleChainToEdgeUsingPOST_edgeIdType || 'str';
        this.assignRuleChainToEdgeUsingPOST_ruleChainId = config.assignRuleChainToEdgeUsingPOST_ruleChainId;
        this.assignRuleChainToEdgeUsingPOST_ruleChainIdType = config.assignRuleChainToEdgeUsingPOST_ruleChainIdType || 'str';
        this.unassignRuleChainFromEdgeUsingDELETE_edgeId = config.unassignRuleChainFromEdgeUsingDELETE_edgeId;
        this.unassignRuleChainFromEdgeUsingDELETE_edgeIdType = config.unassignRuleChainFromEdgeUsingDELETE_edgeIdType || 'str';
        this.unassignRuleChainFromEdgeUsingDELETE_ruleChainId = config.unassignRuleChainFromEdgeUsingDELETE_ruleChainId;
        this.unassignRuleChainFromEdgeUsingDELETE_ruleChainIdType = config.unassignRuleChainFromEdgeUsingDELETE_ruleChainIdType || 'str';
        this.getEdgeRuleChainsUsingGET_edgeId = config.getEdgeRuleChainsUsingGET_edgeId;
        this.getEdgeRuleChainsUsingGET_edgeIdType = config.getEdgeRuleChainsUsingGET_edgeIdType || 'str';
        this.getEdgeRuleChainsUsingGET_pageSize = config.getEdgeRuleChainsUsingGET_pageSize;
        this.getEdgeRuleChainsUsingGET_pageSizeType = config.getEdgeRuleChainsUsingGET_pageSizeType || 'str';
        this.getEdgeRuleChainsUsingGET_page = config.getEdgeRuleChainsUsingGET_page;
        this.getEdgeRuleChainsUsingGET_pageType = config.getEdgeRuleChainsUsingGET_pageType || 'str';
        this.getEdgeRuleChainsUsingGET_textSearch = config.getEdgeRuleChainsUsingGET_textSearch;
        this.getEdgeRuleChainsUsingGET_textSearchType = config.getEdgeRuleChainsUsingGET_textSearchType || 'str';
        this.getEdgeRuleChainsUsingGET_sortProperty = config.getEdgeRuleChainsUsingGET_sortProperty;
        this.getEdgeRuleChainsUsingGET_sortPropertyType = config.getEdgeRuleChainsUsingGET_sortPropertyType || 'str';
        this.getEdgeRuleChainsUsingGET_sortOrder = config.getEdgeRuleChainsUsingGET_sortOrder;
        this.getEdgeRuleChainsUsingGET_sortOrderType = config.getEdgeRuleChainsUsingGET_sortOrderType || 'str';
        this.saveRuleChainUsingPOST_1_body = config.saveRuleChainUsingPOST_1_body;
        this.saveRuleChainUsingPOST_1_bodyType = config.saveRuleChainUsingPOST_1_bodyType || 'str';
        this.saveRuleChainUsingPOST_body = config.saveRuleChainUsingPOST_body;
        this.saveRuleChainUsingPOST_bodyType = config.saveRuleChainUsingPOST_bodyType || 'str';
        this.saveRuleChainMetaDataUsingPOST_updateRelated = config.saveRuleChainMetaDataUsingPOST_updateRelated;
        this.saveRuleChainMetaDataUsingPOST_updateRelatedType = config.saveRuleChainMetaDataUsingPOST_updateRelatedType || 'str';
        this.saveRuleChainMetaDataUsingPOST_body = config.saveRuleChainMetaDataUsingPOST_body;
        this.saveRuleChainMetaDataUsingPOST_bodyType = config.saveRuleChainMetaDataUsingPOST_bodyType || 'str';
        this.testScriptUsingPOST_body = config.testScriptUsingPOST_body;
        this.testScriptUsingPOST_bodyType = config.testScriptUsingPOST_bodyType || 'str';
        this.getRuleChainByIdUsingGET_ruleChainId = config.getRuleChainByIdUsingGET_ruleChainId;
        this.getRuleChainByIdUsingGET_ruleChainIdType = config.getRuleChainByIdUsingGET_ruleChainIdType || 'str';
        this.deleteRuleChainUsingDELETE_ruleChainId = config.deleteRuleChainUsingDELETE_ruleChainId;
        this.deleteRuleChainUsingDELETE_ruleChainIdType = config.deleteRuleChainUsingDELETE_ruleChainIdType || 'str';
        this.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainId = config.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainId;
        this.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainIdType = config.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainIdType || 'str';
        this.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainId = config.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainId;
        this.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainIdType = config.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainIdType || 'str';
        this.setEdgeTemplateRootRuleChainUsingPOST_ruleChainId = config.setEdgeTemplateRootRuleChainUsingPOST_ruleChainId;
        this.setEdgeTemplateRootRuleChainUsingPOST_ruleChainIdType = config.setEdgeTemplateRootRuleChainUsingPOST_ruleChainIdType || 'str';
        this.getRuleChainMetaDataUsingGET_ruleChainId = config.getRuleChainMetaDataUsingGET_ruleChainId;
        this.getRuleChainMetaDataUsingGET_ruleChainIdType = config.getRuleChainMetaDataUsingGET_ruleChainIdType || 'str';
        this.getRuleChainOutputLabelsUsingGET_ruleChainId = config.getRuleChainOutputLabelsUsingGET_ruleChainId;
        this.getRuleChainOutputLabelsUsingGET_ruleChainIdType = config.getRuleChainOutputLabelsUsingGET_ruleChainIdType || 'str';
        this.getRuleChainOutputLabelsUsageUsingGET_ruleChainId = config.getRuleChainOutputLabelsUsageUsingGET_ruleChainId;
        this.getRuleChainOutputLabelsUsageUsingGET_ruleChainIdType = config.getRuleChainOutputLabelsUsageUsingGET_ruleChainIdType || 'str';
        this.setRootRuleChainUsingPOST_ruleChainId = config.setRootRuleChainUsingPOST_ruleChainId;
        this.setRootRuleChainUsingPOST_ruleChainIdType = config.setRootRuleChainUsingPOST_ruleChainIdType || 'str';
        this.exportRuleChainsUsingGET_limit = config.exportRuleChainsUsingGET_limit;
        this.exportRuleChainsUsingGET_limitType = config.exportRuleChainsUsingGET_limitType || 'str';
        this.importRuleChainsUsingPOST_overwrite = config.importRuleChainsUsingPOST_overwrite;
        this.importRuleChainsUsingPOST_overwriteType = config.importRuleChainsUsingPOST_overwriteType || 'str';
        this.importRuleChainsUsingPOST_body = config.importRuleChainsUsingPOST_body;
        this.importRuleChainsUsingPOST_bodyType = config.importRuleChainsUsingPOST_bodyType || 'str';
        this.getRuleChainsUsingGET_pageSize = config.getRuleChainsUsingGET_pageSize;
        this.getRuleChainsUsingGET_pageSizeType = config.getRuleChainsUsingGET_pageSizeType || 'str';
        this.getRuleChainsUsingGET_page = config.getRuleChainsUsingGET_page;
        this.getRuleChainsUsingGET_pageType = config.getRuleChainsUsingGET_pageType || 'str';
        this.getRuleChainsUsingGET_type = config.getRuleChainsUsingGET_type;
        this.getRuleChainsUsingGET_typeType = config.getRuleChainsUsingGET_typeType || 'str';
        this.getRuleChainsUsingGET_textSearch = config.getRuleChainsUsingGET_textSearch;
        this.getRuleChainsUsingGET_textSearchType = config.getRuleChainsUsingGET_textSearchType || 'str';
        this.getRuleChainsUsingGET_sortProperty = config.getRuleChainsUsingGET_sortProperty;
        this.getRuleChainsUsingGET_sortPropertyType = config.getRuleChainsUsingGET_sortPropertyType || 'str';
        this.getRuleChainsUsingGET_sortOrder = config.getRuleChainsUsingGET_sortOrder;
        this.getRuleChainsUsingGET_sortOrderType = config.getRuleChainsUsingGET_sortOrderType || 'str';
        this.getLatestRuleNodeDebugInputUsingGET_ruleNodeId = config.getLatestRuleNodeDebugInputUsingGET_ruleNodeId;
        this.getLatestRuleNodeDebugInputUsingGET_ruleNodeIdType = config.getLatestRuleNodeDebugInputUsingGET_ruleNodeIdType || 'str';
        this.handleRuleEngineRequestUsingPOST_2_body = config.handleRuleEngineRequestUsingPOST_2_body;
        this.handleRuleEngineRequestUsingPOST_2_bodyType = config.handleRuleEngineRequestUsingPOST_2_bodyType || 'str';
        this.handleRuleEngineRequestUsingPOST_1_entityType = config.handleRuleEngineRequestUsingPOST_1_entityType;
        this.handleRuleEngineRequestUsingPOST_1_entityTypeType = config.handleRuleEngineRequestUsingPOST_1_entityTypeType || 'str';
        this.handleRuleEngineRequestUsingPOST_1_entityId = config.handleRuleEngineRequestUsingPOST_1_entityId;
        this.handleRuleEngineRequestUsingPOST_1_entityIdType = config.handleRuleEngineRequestUsingPOST_1_entityIdType || 'str';
        this.handleRuleEngineRequestUsingPOST_1_body = config.handleRuleEngineRequestUsingPOST_1_body;
        this.handleRuleEngineRequestUsingPOST_1_bodyType = config.handleRuleEngineRequestUsingPOST_1_bodyType || 'str';
        this.handleRuleEngineRequestUsingPOST_entityType = config.handleRuleEngineRequestUsingPOST_entityType;
        this.handleRuleEngineRequestUsingPOST_entityTypeType = config.handleRuleEngineRequestUsingPOST_entityTypeType || 'str';
        this.handleRuleEngineRequestUsingPOST_entityId = config.handleRuleEngineRequestUsingPOST_entityId;
        this.handleRuleEngineRequestUsingPOST_entityIdType = config.handleRuleEngineRequestUsingPOST_entityIdType || 'str';
        this.handleRuleEngineRequestUsingPOST_timeout = config.handleRuleEngineRequestUsingPOST_timeout;
        this.handleRuleEngineRequestUsingPOST_timeoutType = config.handleRuleEngineRequestUsingPOST_timeoutType || 'str';
        this.handleRuleEngineRequestUsingPOST_body = config.handleRuleEngineRequestUsingPOST_body;
        this.handleRuleEngineRequestUsingPOST_bodyType = config.handleRuleEngineRequestUsingPOST_bodyType || 'str';
        this.getAllSchedulerEventsUsingGET_edgeId = config.getAllSchedulerEventsUsingGET_edgeId;
        this.getAllSchedulerEventsUsingGET_edgeIdType = config.getAllSchedulerEventsUsingGET_edgeIdType || 'str';
        this.assignSchedulerEventToEdgeUsingPOST_edgeId = config.assignSchedulerEventToEdgeUsingPOST_edgeId;
        this.assignSchedulerEventToEdgeUsingPOST_edgeIdType = config.assignSchedulerEventToEdgeUsingPOST_edgeIdType || 'str';
        this.assignSchedulerEventToEdgeUsingPOST_schedulerEventId = config.assignSchedulerEventToEdgeUsingPOST_schedulerEventId;
        this.assignSchedulerEventToEdgeUsingPOST_schedulerEventIdType = config.assignSchedulerEventToEdgeUsingPOST_schedulerEventIdType || 'str';
        this.unassignSchedulerEventFromEdgeUsingDELETE_edgeId = config.unassignSchedulerEventFromEdgeUsingDELETE_edgeId;
        this.unassignSchedulerEventFromEdgeUsingDELETE_edgeIdType = config.unassignSchedulerEventFromEdgeUsingDELETE_edgeIdType || 'str';
        this.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventId = config.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventId;
        this.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventIdType = config.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventIdType || 'str';
        this.getEdgeSchedulerEventsUsingGET_edgeId = config.getEdgeSchedulerEventsUsingGET_edgeId;
        this.getEdgeSchedulerEventsUsingGET_edgeIdType = config.getEdgeSchedulerEventsUsingGET_edgeIdType || 'str';
        this.getEdgeSchedulerEventsUsingGET_pageSize = config.getEdgeSchedulerEventsUsingGET_pageSize;
        this.getEdgeSchedulerEventsUsingGET_pageSizeType = config.getEdgeSchedulerEventsUsingGET_pageSizeType || 'str';
        this.getEdgeSchedulerEventsUsingGET_page = config.getEdgeSchedulerEventsUsingGET_page;
        this.getEdgeSchedulerEventsUsingGET_pageType = config.getEdgeSchedulerEventsUsingGET_pageType || 'str';
        this.getEdgeSchedulerEventsUsingGET_textSearch = config.getEdgeSchedulerEventsUsingGET_textSearch;
        this.getEdgeSchedulerEventsUsingGET_textSearchType = config.getEdgeSchedulerEventsUsingGET_textSearchType || 'str';
        this.getEdgeSchedulerEventsUsingGET_sortProperty = config.getEdgeSchedulerEventsUsingGET_sortProperty;
        this.getEdgeSchedulerEventsUsingGET_sortPropertyType = config.getEdgeSchedulerEventsUsingGET_sortPropertyType || 'str';
        this.getEdgeSchedulerEventsUsingGET_sortOrder = config.getEdgeSchedulerEventsUsingGET_sortOrder;
        this.getEdgeSchedulerEventsUsingGET_sortOrderType = config.getEdgeSchedulerEventsUsingGET_sortOrderType || 'str';
        this.saveSchedulerEventUsingPOST_body = config.saveSchedulerEventUsingPOST_body;
        this.saveSchedulerEventUsingPOST_bodyType = config.saveSchedulerEventUsingPOST_bodyType || 'str';
        this.getSchedulerEventInfoByIdUsingGET_schedulerEventId = config.getSchedulerEventInfoByIdUsingGET_schedulerEventId;
        this.getSchedulerEventInfoByIdUsingGET_schedulerEventIdType = config.getSchedulerEventInfoByIdUsingGET_schedulerEventIdType || 'str';
        this.getSchedulerEventByIdUsingGET_schedulerEventId = config.getSchedulerEventByIdUsingGET_schedulerEventId;
        this.getSchedulerEventByIdUsingGET_schedulerEventIdType = config.getSchedulerEventByIdUsingGET_schedulerEventIdType || 'str';
        this.deleteSchedulerEventUsingDELETE_schedulerEventId = config.deleteSchedulerEventUsingDELETE_schedulerEventId;
        this.deleteSchedulerEventUsingDELETE_schedulerEventIdType = config.deleteSchedulerEventUsingDELETE_schedulerEventIdType || 'str';
        this.getSchedulerEventsByIdsUsingGET_schedulerEventIds = config.getSchedulerEventsByIdsUsingGET_schedulerEventIds;
        this.getSchedulerEventsByIdsUsingGET_schedulerEventIdsType = config.getSchedulerEventsByIdsUsingGET_schedulerEventIdsType || 'str';
        this.getSchedulerEventsUsingGET_type = config.getSchedulerEventsUsingGET_type;
        this.getSchedulerEventsUsingGET_typeType = config.getSchedulerEventsUsingGET_typeType || 'str';
        this.getSignUpSelfRegistrationParamsUsingGET_pkgName = config.getSignUpSelfRegistrationParamsUsingGET_pkgName;
        this.getSignUpSelfRegistrationParamsUsingGET_pkgNameType = config.getSignUpSelfRegistrationParamsUsingGET_pkgNameType || 'str';
        this.saveSelfRegistrationParamsUsingPOST_body = config.saveSelfRegistrationParamsUsingPOST_body;
        this.saveSelfRegistrationParamsUsingPOST_bodyType = config.saveSelfRegistrationParamsUsingPOST_bodyType || 'str';
        this.deleteSelfRegistrationParamsUsingDELETE_domainName = config.deleteSelfRegistrationParamsUsingDELETE_domainName;
        this.deleteSelfRegistrationParamsUsingDELETE_domainNameType = config.deleteSelfRegistrationParamsUsingDELETE_domainNameType || 'str';
        this.activateUserByEmailCodeUsingPOST_emailCode = config.activateUserByEmailCodeUsingPOST_emailCode;
        this.activateUserByEmailCodeUsingPOST_emailCodeType = config.activateUserByEmailCodeUsingPOST_emailCodeType || 'str';
        this.activateUserByEmailCodeUsingPOST_pkgName = config.activateUserByEmailCodeUsingPOST_pkgName;
        this.activateUserByEmailCodeUsingPOST_pkgNameType = config.activateUserByEmailCodeUsingPOST_pkgNameType || 'str';
        this.activateEmailUsingGET_emailCode = config.activateEmailUsingGET_emailCode;
        this.activateEmailUsingGET_emailCodeType = config.activateEmailUsingGET_emailCodeType || 'str';
        this.activateEmailUsingGET_pkgName = config.activateEmailUsingGET_pkgName;
        this.activateEmailUsingGET_pkgNameType = config.activateEmailUsingGET_pkgNameType || 'str';
        this.activateCloudUserByEmailCodeUsingPOST_emailCode = config.activateCloudUserByEmailCodeUsingPOST_emailCode;
        this.activateCloudUserByEmailCodeUsingPOST_emailCodeType = config.activateCloudUserByEmailCodeUsingPOST_emailCodeType || 'str';
        this.activateCloudEmailUsingGET_emailCode = config.activateCloudEmailUsingGET_emailCode;
        this.activateCloudEmailUsingGET_emailCodeType = config.activateCloudEmailUsingGET_emailCodeType || 'str';
        this.resendCloudEmailActivationUsingPOST_email = config.resendCloudEmailActivationUsingPOST_email;
        this.resendCloudEmailActivationUsingPOST_emailType = config.resendCloudEmailActivationUsingPOST_emailType || 'str';
        this.mobileLoginUsingGET_pkgName = config.mobileLoginUsingGET_pkgName;
        this.mobileLoginUsingGET_pkgNameType = config.mobileLoginUsingGET_pkgNameType || 'str';
        this.resendEmailActivationUsingPOST_email = config.resendEmailActivationUsingPOST_email;
        this.resendEmailActivationUsingPOST_emailType = config.resendEmailActivationUsingPOST_emailType || 'str';
        this.resendEmailActivationUsingPOST_pkgName = config.resendEmailActivationUsingPOST_pkgName;
        this.resendEmailActivationUsingPOST_pkgNameType = config.resendEmailActivationUsingPOST_pkgNameType || 'str';
        this.signUpUsingPOST_body = config.signUpUsingPOST_body;
        this.signUpUsingPOST_bodyType = config.signUpUsingPOST_bodyType || 'str';
        this.deleteTenantAccountUsingPOST_body = config.deleteTenantAccountUsingPOST_body;
        this.deleteTenantAccountUsingPOST_bodyType = config.deleteTenantAccountUsingPOST_bodyType || 'str';
        this.getSolutionTemplateDetailsUsingGET_solutionTemplateId = config.getSolutionTemplateDetailsUsingGET_solutionTemplateId;
        this.getSolutionTemplateDetailsUsingGET_solutionTemplateIdType = config.getSolutionTemplateDetailsUsingGET_solutionTemplateIdType || 'str';
        this.getSolutionTemplateInstructionsUsingGET_solutionTemplateId = config.getSolutionTemplateInstructionsUsingGET_solutionTemplateId;
        this.getSolutionTemplateInstructionsUsingGET_solutionTemplateIdType = config.getSolutionTemplateInstructionsUsingGET_solutionTemplateIdType || 'str';
        this.uninstallSolutionTemplateUsingDELETE_solutionTemplateId = config.uninstallSolutionTemplateUsingDELETE_solutionTemplateId;
        this.uninstallSolutionTemplateUsingDELETE_solutionTemplateIdType = config.uninstallSolutionTemplateUsingDELETE_solutionTemplateIdType || 'str';
        this.installSolutionTemplateUsingPOST_solutionTemplateId = config.installSolutionTemplateUsingPOST_solutionTemplateId;
        this.installSolutionTemplateUsingPOST_solutionTemplateIdType = config.installSolutionTemplateUsingPOST_solutionTemplateIdType || 'str';
        this.getTenantProfileDataByIdUsingGET_tenantProfileId = config.getTenantProfileDataByIdUsingGET_tenantProfileId;
        this.getTenantProfileDataByIdUsingGET_tenantProfileIdType = config.getTenantProfileDataByIdUsingGET_tenantProfileIdType || 'str';
        this.saveResourceUsingPOST_body = config.saveResourceUsingPOST_body;
        this.saveResourceUsingPOST_bodyType = config.saveResourceUsingPOST_bodyType || 'str';
        this.getResourceInfoByIdUsingGET_resourceId = config.getResourceInfoByIdUsingGET_resourceId;
        this.getResourceInfoByIdUsingGET_resourceIdType = config.getResourceInfoByIdUsingGET_resourceIdType || 'str';
        this.getLwm2mListObjectsPageUsingGET_pageSize = config.getLwm2mListObjectsPageUsingGET_pageSize;
        this.getLwm2mListObjectsPageUsingGET_pageSizeType = config.getLwm2mListObjectsPageUsingGET_pageSizeType || 'str';
        this.getLwm2mListObjectsPageUsingGET_page = config.getLwm2mListObjectsPageUsingGET_page;
        this.getLwm2mListObjectsPageUsingGET_pageType = config.getLwm2mListObjectsPageUsingGET_pageType || 'str';
        this.getLwm2mListObjectsPageUsingGET_textSearch = config.getLwm2mListObjectsPageUsingGET_textSearch;
        this.getLwm2mListObjectsPageUsingGET_textSearchType = config.getLwm2mListObjectsPageUsingGET_textSearchType || 'str';
        this.getLwm2mListObjectsPageUsingGET_sortProperty = config.getLwm2mListObjectsPageUsingGET_sortProperty;
        this.getLwm2mListObjectsPageUsingGET_sortPropertyType = config.getLwm2mListObjectsPageUsingGET_sortPropertyType || 'str';
        this.getLwm2mListObjectsPageUsingGET_sortOrder = config.getLwm2mListObjectsPageUsingGET_sortOrder;
        this.getLwm2mListObjectsPageUsingGET_sortOrderType = config.getLwm2mListObjectsPageUsingGET_sortOrderType || 'str';
        this.getLwm2mListObjectsUsingGET_sortOrder = config.getLwm2mListObjectsUsingGET_sortOrder;
        this.getLwm2mListObjectsUsingGET_sortOrderType = config.getLwm2mListObjectsUsingGET_sortOrderType || 'str';
        this.getLwm2mListObjectsUsingGET_sortProperty = config.getLwm2mListObjectsUsingGET_sortProperty;
        this.getLwm2mListObjectsUsingGET_sortPropertyType = config.getLwm2mListObjectsUsingGET_sortPropertyType || 'str';
        this.getLwm2mListObjectsUsingGET_objectIds = config.getLwm2mListObjectsUsingGET_objectIds;
        this.getLwm2mListObjectsUsingGET_objectIdsType = config.getLwm2mListObjectsUsingGET_objectIdsType || 'str';
        this.getResourceByIdUsingGET_resourceId = config.getResourceByIdUsingGET_resourceId;
        this.getResourceByIdUsingGET_resourceIdType = config.getResourceByIdUsingGET_resourceIdType || 'str';
        this.deleteResourceUsingDELETE_resourceId = config.deleteResourceUsingDELETE_resourceId;
        this.deleteResourceUsingDELETE_resourceIdType = config.deleteResourceUsingDELETE_resourceIdType || 'str';
        this.downloadResourceUsingGET_resourceId = config.downloadResourceUsingGET_resourceId;
        this.downloadResourceUsingGET_resourceIdType = config.downloadResourceUsingGET_resourceIdType || 'str';
        this.getResourcesUsingGET_pageSize = config.getResourcesUsingGET_pageSize;
        this.getResourcesUsingGET_pageSizeType = config.getResourcesUsingGET_pageSizeType || 'str';
        this.getResourcesUsingGET_page = config.getResourcesUsingGET_page;
        this.getResourcesUsingGET_pageType = config.getResourcesUsingGET_pageType || 'str';
        this.getResourcesUsingGET_textSearch = config.getResourcesUsingGET_textSearch;
        this.getResourcesUsingGET_textSearchType = config.getResourcesUsingGET_textSearchType || 'str';
        this.getResourcesUsingGET_sortProperty = config.getResourcesUsingGET_sortProperty;
        this.getResourcesUsingGET_sortPropertyType = config.getResourcesUsingGET_sortPropertyType || 'str';
        this.getResourcesUsingGET_sortOrder = config.getResourcesUsingGET_sortOrder;
        this.getResourcesUsingGET_sortOrderType = config.getResourcesUsingGET_sortOrderType || 'str';
        this.saveDeviceAttributesUsingPOST_deviceId = config.saveDeviceAttributesUsingPOST_deviceId;
        this.saveDeviceAttributesUsingPOST_deviceIdType = config.saveDeviceAttributesUsingPOST_deviceIdType || 'str';
        this.saveDeviceAttributesUsingPOST_scope = config.saveDeviceAttributesUsingPOST_scope;
        this.saveDeviceAttributesUsingPOST_scopeType = config.saveDeviceAttributesUsingPOST_scopeType || 'str';
        this.saveDeviceAttributesUsingPOST_body = config.saveDeviceAttributesUsingPOST_body;
        this.saveDeviceAttributesUsingPOST_bodyType = config.saveDeviceAttributesUsingPOST_bodyType || 'str';
        this.deleteDeviceAttributesUsingDELETE_deviceId = config.deleteDeviceAttributesUsingDELETE_deviceId;
        this.deleteDeviceAttributesUsingDELETE_deviceIdType = config.deleteDeviceAttributesUsingDELETE_deviceIdType || 'str';
        this.deleteDeviceAttributesUsingDELETE_scope = config.deleteDeviceAttributesUsingDELETE_scope;
        this.deleteDeviceAttributesUsingDELETE_scopeType = config.deleteDeviceAttributesUsingDELETE_scopeType || 'str';
        this.deleteDeviceAttributesUsingDELETE_keys = config.deleteDeviceAttributesUsingDELETE_keys;
        this.deleteDeviceAttributesUsingDELETE_keysType = config.deleteDeviceAttributesUsingDELETE_keysType || 'str';
        this.saveEntityAttributesV2UsingPOST_entityType = config.saveEntityAttributesV2UsingPOST_entityType;
        this.saveEntityAttributesV2UsingPOST_entityTypeType = config.saveEntityAttributesV2UsingPOST_entityTypeType || 'str';
        this.saveEntityAttributesV2UsingPOST_entityId = config.saveEntityAttributesV2UsingPOST_entityId;
        this.saveEntityAttributesV2UsingPOST_entityIdType = config.saveEntityAttributesV2UsingPOST_entityIdType || 'str';
        this.saveEntityAttributesV2UsingPOST_scope = config.saveEntityAttributesV2UsingPOST_scope;
        this.saveEntityAttributesV2UsingPOST_scopeType = config.saveEntityAttributesV2UsingPOST_scopeType || 'str';
        this.saveEntityAttributesV2UsingPOST_body = config.saveEntityAttributesV2UsingPOST_body;
        this.saveEntityAttributesV2UsingPOST_bodyType = config.saveEntityAttributesV2UsingPOST_bodyType || 'str';
        this.getAttributeKeysUsingGET_entityType = config.getAttributeKeysUsingGET_entityType;
        this.getAttributeKeysUsingGET_entityTypeType = config.getAttributeKeysUsingGET_entityTypeType || 'str';
        this.getAttributeKeysUsingGET_entityId = config.getAttributeKeysUsingGET_entityId;
        this.getAttributeKeysUsingGET_entityIdType = config.getAttributeKeysUsingGET_entityIdType || 'str';
        this.getAttributeKeysByScopeUsingGET_entityType = config.getAttributeKeysByScopeUsingGET_entityType;
        this.getAttributeKeysByScopeUsingGET_entityTypeType = config.getAttributeKeysByScopeUsingGET_entityTypeType || 'str';
        this.getAttributeKeysByScopeUsingGET_entityId = config.getAttributeKeysByScopeUsingGET_entityId;
        this.getAttributeKeysByScopeUsingGET_entityIdType = config.getAttributeKeysByScopeUsingGET_entityIdType || 'str';
        this.getAttributeKeysByScopeUsingGET_scope = config.getAttributeKeysByScopeUsingGET_scope;
        this.getAttributeKeysByScopeUsingGET_scopeType = config.getAttributeKeysByScopeUsingGET_scopeType || 'str';
        this.getTimeseriesKeysUsingGET_1_entityType = config.getTimeseriesKeysUsingGET_1_entityType;
        this.getTimeseriesKeysUsingGET_1_entityTypeType = config.getTimeseriesKeysUsingGET_1_entityTypeType || 'str';
        this.getTimeseriesKeysUsingGET_1_entityId = config.getTimeseriesKeysUsingGET_1_entityId;
        this.getTimeseriesKeysUsingGET_1_entityIdType = config.getTimeseriesKeysUsingGET_1_entityIdType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_entityType = config.deleteEntityTimeseriesUsingDELETE_entityType;
        this.deleteEntityTimeseriesUsingDELETE_entityTypeType = config.deleteEntityTimeseriesUsingDELETE_entityTypeType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_entityId = config.deleteEntityTimeseriesUsingDELETE_entityId;
        this.deleteEntityTimeseriesUsingDELETE_entityIdType = config.deleteEntityTimeseriesUsingDELETE_entityIdType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_keys = config.deleteEntityTimeseriesUsingDELETE_keys;
        this.deleteEntityTimeseriesUsingDELETE_keysType = config.deleteEntityTimeseriesUsingDELETE_keysType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeys = config.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeys;
        this.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeysType = config.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeysType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_startTs = config.deleteEntityTimeseriesUsingDELETE_startTs;
        this.deleteEntityTimeseriesUsingDELETE_startTsType = config.deleteEntityTimeseriesUsingDELETE_startTsType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_endTs = config.deleteEntityTimeseriesUsingDELETE_endTs;
        this.deleteEntityTimeseriesUsingDELETE_endTsType = config.deleteEntityTimeseriesUsingDELETE_endTsType || 'str';
        this.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeleted = config.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeleted;
        this.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeletedType = config.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeletedType || 'str';
        this.saveEntityTelemetryWithTTLUsingPOST_entityType = config.saveEntityTelemetryWithTTLUsingPOST_entityType;
        this.saveEntityTelemetryWithTTLUsingPOST_entityTypeType = config.saveEntityTelemetryWithTTLUsingPOST_entityTypeType || 'str';
        this.saveEntityTelemetryWithTTLUsingPOST_entityId = config.saveEntityTelemetryWithTTLUsingPOST_entityId;
        this.saveEntityTelemetryWithTTLUsingPOST_entityIdType = config.saveEntityTelemetryWithTTLUsingPOST_entityIdType || 'str';
        this.saveEntityTelemetryWithTTLUsingPOST_scope = config.saveEntityTelemetryWithTTLUsingPOST_scope;
        this.saveEntityTelemetryWithTTLUsingPOST_scopeType = config.saveEntityTelemetryWithTTLUsingPOST_scopeType || 'str';
        this.saveEntityTelemetryWithTTLUsingPOST_ttl = config.saveEntityTelemetryWithTTLUsingPOST_ttl;
        this.saveEntityTelemetryWithTTLUsingPOST_ttlType = config.saveEntityTelemetryWithTTLUsingPOST_ttlType || 'str';
        this.saveEntityTelemetryWithTTLUsingPOST_body = config.saveEntityTelemetryWithTTLUsingPOST_body;
        this.saveEntityTelemetryWithTTLUsingPOST_bodyType = config.saveEntityTelemetryWithTTLUsingPOST_bodyType || 'str';
        this.saveEntityTelemetryUsingPOST_entityType = config.saveEntityTelemetryUsingPOST_entityType;
        this.saveEntityTelemetryUsingPOST_entityTypeType = config.saveEntityTelemetryUsingPOST_entityTypeType || 'str';
        this.saveEntityTelemetryUsingPOST_entityId = config.saveEntityTelemetryUsingPOST_entityId;
        this.saveEntityTelemetryUsingPOST_entityIdType = config.saveEntityTelemetryUsingPOST_entityIdType || 'str';
        this.saveEntityTelemetryUsingPOST_scope = config.saveEntityTelemetryUsingPOST_scope;
        this.saveEntityTelemetryUsingPOST_scopeType = config.saveEntityTelemetryUsingPOST_scopeType || 'str';
        this.saveEntityTelemetryUsingPOST_body = config.saveEntityTelemetryUsingPOST_body;
        this.saveEntityTelemetryUsingPOST_bodyType = config.saveEntityTelemetryUsingPOST_bodyType || 'str';
        this.getAttributesByScopeUsingGET_entityType = config.getAttributesByScopeUsingGET_entityType;
        this.getAttributesByScopeUsingGET_entityTypeType = config.getAttributesByScopeUsingGET_entityTypeType || 'str';
        this.getAttributesByScopeUsingGET_entityId = config.getAttributesByScopeUsingGET_entityId;
        this.getAttributesByScopeUsingGET_entityIdType = config.getAttributesByScopeUsingGET_entityIdType || 'str';
        this.getAttributesByScopeUsingGET_scope = config.getAttributesByScopeUsingGET_scope;
        this.getAttributesByScopeUsingGET_scopeType = config.getAttributesByScopeUsingGET_scopeType || 'str';
        this.getAttributesByScopeUsingGET_keys = config.getAttributesByScopeUsingGET_keys;
        this.getAttributesByScopeUsingGET_keysType = config.getAttributesByScopeUsingGET_keysType || 'str';
        this.getAttributesUsingGET_entityType = config.getAttributesUsingGET_entityType;
        this.getAttributesUsingGET_entityTypeType = config.getAttributesUsingGET_entityTypeType || 'str';
        this.getAttributesUsingGET_entityId = config.getAttributesUsingGET_entityId;
        this.getAttributesUsingGET_entityIdType = config.getAttributesUsingGET_entityIdType || 'str';
        this.getAttributesUsingGET_keys = config.getAttributesUsingGET_keys;
        this.getAttributesUsingGET_keysType = config.getAttributesUsingGET_keysType || 'str';
        this.getTimeseriesUsingGET_entityType = config.getTimeseriesUsingGET_entityType;
        this.getTimeseriesUsingGET_entityTypeType = config.getTimeseriesUsingGET_entityTypeType || 'str';
        this.getTimeseriesUsingGET_entityId = config.getTimeseriesUsingGET_entityId;
        this.getTimeseriesUsingGET_entityIdType = config.getTimeseriesUsingGET_entityIdType || 'str';
        this.getTimeseriesUsingGET_keys = config.getTimeseriesUsingGET_keys;
        this.getTimeseriesUsingGET_keysType = config.getTimeseriesUsingGET_keysType || 'str';
        this.getTimeseriesUsingGET_startTs = config.getTimeseriesUsingGET_startTs;
        this.getTimeseriesUsingGET_startTsType = config.getTimeseriesUsingGET_startTsType || 'str';
        this.getTimeseriesUsingGET_endTs = config.getTimeseriesUsingGET_endTs;
        this.getTimeseriesUsingGET_endTsType = config.getTimeseriesUsingGET_endTsType || 'str';
        this.getTimeseriesUsingGET_interval = config.getTimeseriesUsingGET_interval;
        this.getTimeseriesUsingGET_intervalType = config.getTimeseriesUsingGET_intervalType || 'str';
        this.getTimeseriesUsingGET_limit = config.getTimeseriesUsingGET_limit;
        this.getTimeseriesUsingGET_limitType = config.getTimeseriesUsingGET_limitType || 'str';
        this.getTimeseriesUsingGET_agg = config.getTimeseriesUsingGET_agg;
        this.getTimeseriesUsingGET_aggType = config.getTimeseriesUsingGET_aggType || 'str';
        this.getTimeseriesUsingGET_orderBy = config.getTimeseriesUsingGET_orderBy;
        this.getTimeseriesUsingGET_orderByType = config.getTimeseriesUsingGET_orderByType || 'str';
        this.getTimeseriesUsingGET_useStrictDataTypes = config.getTimeseriesUsingGET_useStrictDataTypes;
        this.getTimeseriesUsingGET_useStrictDataTypesType = config.getTimeseriesUsingGET_useStrictDataTypesType || 'str';
        this.getLatestTimeseriesUsingGET_entityType = config.getLatestTimeseriesUsingGET_entityType;
        this.getLatestTimeseriesUsingGET_entityTypeType = config.getLatestTimeseriesUsingGET_entityTypeType || 'str';
        this.getLatestTimeseriesUsingGET_entityId = config.getLatestTimeseriesUsingGET_entityId;
        this.getLatestTimeseriesUsingGET_entityIdType = config.getLatestTimeseriesUsingGET_entityIdType || 'str';
        this.getLatestTimeseriesUsingGET_keys = config.getLatestTimeseriesUsingGET_keys;
        this.getLatestTimeseriesUsingGET_keysType = config.getLatestTimeseriesUsingGET_keysType || 'str';
        this.getLatestTimeseriesUsingGET_useStrictDataTypes = config.getLatestTimeseriesUsingGET_useStrictDataTypes;
        this.getLatestTimeseriesUsingGET_useStrictDataTypesType = config.getLatestTimeseriesUsingGET_useStrictDataTypesType || 'str';
        this.saveEntityAttributesV1UsingPOST_entityType = config.saveEntityAttributesV1UsingPOST_entityType;
        this.saveEntityAttributesV1UsingPOST_entityTypeType = config.saveEntityAttributesV1UsingPOST_entityTypeType || 'str';
        this.saveEntityAttributesV1UsingPOST_entityId = config.saveEntityAttributesV1UsingPOST_entityId;
        this.saveEntityAttributesV1UsingPOST_entityIdType = config.saveEntityAttributesV1UsingPOST_entityIdType || 'str';
        this.saveEntityAttributesV1UsingPOST_scope = config.saveEntityAttributesV1UsingPOST_scope;
        this.saveEntityAttributesV1UsingPOST_scopeType = config.saveEntityAttributesV1UsingPOST_scopeType || 'str';
        this.saveEntityAttributesV1UsingPOST_body = config.saveEntityAttributesV1UsingPOST_body;
        this.saveEntityAttributesV1UsingPOST_bodyType = config.saveEntityAttributesV1UsingPOST_bodyType || 'str';
        this.deleteEntityAttributesUsingDELETE_entityType = config.deleteEntityAttributesUsingDELETE_entityType;
        this.deleteEntityAttributesUsingDELETE_entityTypeType = config.deleteEntityAttributesUsingDELETE_entityTypeType || 'str';
        this.deleteEntityAttributesUsingDELETE_entityId = config.deleteEntityAttributesUsingDELETE_entityId;
        this.deleteEntityAttributesUsingDELETE_entityIdType = config.deleteEntityAttributesUsingDELETE_entityIdType || 'str';
        this.deleteEntityAttributesUsingDELETE_scope = config.deleteEntityAttributesUsingDELETE_scope;
        this.deleteEntityAttributesUsingDELETE_scopeType = config.deleteEntityAttributesUsingDELETE_scopeType || 'str';
        this.deleteEntityAttributesUsingDELETE_keys = config.deleteEntityAttributesUsingDELETE_keys;
        this.deleteEntityAttributesUsingDELETE_keysType = config.deleteEntityAttributesUsingDELETE_keysType || 'str';
        this.saveTenantUsingPOST_body = config.saveTenantUsingPOST_body;
        this.saveTenantUsingPOST_bodyType = config.saveTenantUsingPOST_bodyType || 'str';
        this.getTenantInfoByIdUsingGET_tenantId = config.getTenantInfoByIdUsingGET_tenantId;
        this.getTenantInfoByIdUsingGET_tenantIdType = config.getTenantInfoByIdUsingGET_tenantIdType || 'str';
        this.getTenantByIdUsingGET_tenantId = config.getTenantByIdUsingGET_tenantId;
        this.getTenantByIdUsingGET_tenantIdType = config.getTenantByIdUsingGET_tenantIdType || 'str';
        this.deleteTenantUsingDELETE_tenantId = config.deleteTenantUsingDELETE_tenantId;
        this.deleteTenantUsingDELETE_tenantIdType = config.deleteTenantUsingDELETE_tenantIdType || 'str';
        this.getTenantInfosUsingGET_pageSize = config.getTenantInfosUsingGET_pageSize;
        this.getTenantInfosUsingGET_pageSizeType = config.getTenantInfosUsingGET_pageSizeType || 'str';
        this.getTenantInfosUsingGET_page = config.getTenantInfosUsingGET_page;
        this.getTenantInfosUsingGET_pageType = config.getTenantInfosUsingGET_pageType || 'str';
        this.getTenantInfosUsingGET_textSearch = config.getTenantInfosUsingGET_textSearch;
        this.getTenantInfosUsingGET_textSearchType = config.getTenantInfosUsingGET_textSearchType || 'str';
        this.getTenantInfosUsingGET_sortProperty = config.getTenantInfosUsingGET_sortProperty;
        this.getTenantInfosUsingGET_sortPropertyType = config.getTenantInfosUsingGET_sortPropertyType || 'str';
        this.getTenantInfosUsingGET_sortOrder = config.getTenantInfosUsingGET_sortOrder;
        this.getTenantInfosUsingGET_sortOrderType = config.getTenantInfosUsingGET_sortOrderType || 'str';
        this.getTenantsUsingGET_pageSize = config.getTenantsUsingGET_pageSize;
        this.getTenantsUsingGET_pageSizeType = config.getTenantsUsingGET_pageSizeType || 'str';
        this.getTenantsUsingGET_page = config.getTenantsUsingGET_page;
        this.getTenantsUsingGET_pageType = config.getTenantsUsingGET_pageType || 'str';
        this.getTenantsUsingGET_textSearch = config.getTenantsUsingGET_textSearch;
        this.getTenantsUsingGET_textSearchType = config.getTenantsUsingGET_textSearchType || 'str';
        this.getTenantsUsingGET_sortProperty = config.getTenantsUsingGET_sortProperty;
        this.getTenantsUsingGET_sortPropertyType = config.getTenantsUsingGET_sortPropertyType || 'str';
        this.getTenantsUsingGET_sortOrder = config.getTenantsUsingGET_sortOrder;
        this.getTenantsUsingGET_sortOrderType = config.getTenantsUsingGET_sortOrderType || 'str';
        this.getTenantsByIdsUsingGET_tenantIds = config.getTenantsByIdsUsingGET_tenantIds;
        this.getTenantsByIdsUsingGET_tenantIdsType = config.getTenantsByIdsUsingGET_tenantIdsType || 'str';
        this.saveTenantProfileUsingPOST_body = config.saveTenantProfileUsingPOST_body;
        this.saveTenantProfileUsingPOST_bodyType = config.saveTenantProfileUsingPOST_bodyType || 'str';
        this.getTenantProfileByIdUsingGET_tenantProfileId = config.getTenantProfileByIdUsingGET_tenantProfileId;
        this.getTenantProfileByIdUsingGET_tenantProfileIdType = config.getTenantProfileByIdUsingGET_tenantProfileIdType || 'str';
        this.deleteTenantProfileUsingDELETE_tenantProfileId = config.deleteTenantProfileUsingDELETE_tenantProfileId;
        this.deleteTenantProfileUsingDELETE_tenantProfileIdType = config.deleteTenantProfileUsingDELETE_tenantProfileIdType || 'str';
        this.setDefaultTenantProfileUsingPOST_tenantProfileId = config.setDefaultTenantProfileUsingPOST_tenantProfileId;
        this.setDefaultTenantProfileUsingPOST_tenantProfileIdType = config.setDefaultTenantProfileUsingPOST_tenantProfileIdType || 'str';
        this.getTenantProfileInfoByIdUsingGET_tenantProfileId = config.getTenantProfileInfoByIdUsingGET_tenantProfileId;
        this.getTenantProfileInfoByIdUsingGET_tenantProfileIdType = config.getTenantProfileInfoByIdUsingGET_tenantProfileIdType || 'str';
        this.getTenantProfileInfosUsingGET_pageSize = config.getTenantProfileInfosUsingGET_pageSize;
        this.getTenantProfileInfosUsingGET_pageSizeType = config.getTenantProfileInfosUsingGET_pageSizeType || 'str';
        this.getTenantProfileInfosUsingGET_page = config.getTenantProfileInfosUsingGET_page;
        this.getTenantProfileInfosUsingGET_pageType = config.getTenantProfileInfosUsingGET_pageType || 'str';
        this.getTenantProfileInfosUsingGET_textSearch = config.getTenantProfileInfosUsingGET_textSearch;
        this.getTenantProfileInfosUsingGET_textSearchType = config.getTenantProfileInfosUsingGET_textSearchType || 'str';
        this.getTenantProfileInfosUsingGET_sortProperty = config.getTenantProfileInfosUsingGET_sortProperty;
        this.getTenantProfileInfosUsingGET_sortPropertyType = config.getTenantProfileInfosUsingGET_sortPropertyType || 'str';
        this.getTenantProfileInfosUsingGET_sortOrder = config.getTenantProfileInfosUsingGET_sortOrder;
        this.getTenantProfileInfosUsingGET_sortOrderType = config.getTenantProfileInfosUsingGET_sortOrderType || 'str';
        this.getTenantProfilesUsingGET_pageSize = config.getTenantProfilesUsingGET_pageSize;
        this.getTenantProfilesUsingGET_pageSizeType = config.getTenantProfilesUsingGET_pageSizeType || 'str';
        this.getTenantProfilesUsingGET_page = config.getTenantProfilesUsingGET_page;
        this.getTenantProfilesUsingGET_pageType = config.getTenantProfilesUsingGET_pageType || 'str';
        this.getTenantProfilesUsingGET_textSearch = config.getTenantProfilesUsingGET_textSearch;
        this.getTenantProfilesUsingGET_textSearchType = config.getTenantProfilesUsingGET_textSearchType || 'str';
        this.getTenantProfilesUsingGET_sortProperty = config.getTenantProfilesUsingGET_sortProperty;
        this.getTenantProfilesUsingGET_sortPropertyType = config.getTenantProfilesUsingGET_sortPropertyType || 'str';
        this.getTenantProfilesUsingGET_sortOrder = config.getTenantProfilesUsingGET_sortOrder;
        this.getTenantProfilesUsingGET_sortOrderType = config.getTenantProfilesUsingGET_sortOrderType || 'str';
        this.getAllCustomerUsersUsingGET_pageSize = config.getAllCustomerUsersUsingGET_pageSize;
        this.getAllCustomerUsersUsingGET_pageSizeType = config.getAllCustomerUsersUsingGET_pageSizeType || 'str';
        this.getAllCustomerUsersUsingGET_page = config.getAllCustomerUsersUsingGET_page;
        this.getAllCustomerUsersUsingGET_pageType = config.getAllCustomerUsersUsingGET_pageType || 'str';
        this.getAllCustomerUsersUsingGET_textSearch = config.getAllCustomerUsersUsingGET_textSearch;
        this.getAllCustomerUsersUsingGET_textSearchType = config.getAllCustomerUsersUsingGET_textSearchType || 'str';
        this.getAllCustomerUsersUsingGET_sortProperty = config.getAllCustomerUsersUsingGET_sortProperty;
        this.getAllCustomerUsersUsingGET_sortPropertyType = config.getAllCustomerUsersUsingGET_sortPropertyType || 'str';
        this.getAllCustomerUsersUsingGET_sortOrder = config.getAllCustomerUsersUsingGET_sortOrder;
        this.getAllCustomerUsersUsingGET_sortOrderType = config.getAllCustomerUsersUsingGET_sortOrderType || 'str';
        this.getCustomerUsersUsingGET_customerId = config.getCustomerUsersUsingGET_customerId;
        this.getCustomerUsersUsingGET_customerIdType = config.getCustomerUsersUsingGET_customerIdType || 'str';
        this.getCustomerUsersUsingGET_pageSize = config.getCustomerUsersUsingGET_pageSize;
        this.getCustomerUsersUsingGET_pageSizeType = config.getCustomerUsersUsingGET_pageSizeType || 'str';
        this.getCustomerUsersUsingGET_page = config.getCustomerUsersUsingGET_page;
        this.getCustomerUsersUsingGET_pageType = config.getCustomerUsersUsingGET_pageType || 'str';
        this.getCustomerUsersUsingGET_textSearch = config.getCustomerUsersUsingGET_textSearch;
        this.getCustomerUsersUsingGET_textSearchType = config.getCustomerUsersUsingGET_textSearchType || 'str';
        this.getCustomerUsersUsingGET_sortProperty = config.getCustomerUsersUsingGET_sortProperty;
        this.getCustomerUsersUsingGET_sortPropertyType = config.getCustomerUsersUsingGET_sortPropertyType || 'str';
        this.getCustomerUsersUsingGET_sortOrder = config.getCustomerUsersUsingGET_sortOrder;
        this.getCustomerUsersUsingGET_sortOrderType = config.getCustomerUsersUsingGET_sortOrderType || 'str';
        this.getUsersByEntityGroupIdUsingGET_entityGroupId = config.getUsersByEntityGroupIdUsingGET_entityGroupId;
        this.getUsersByEntityGroupIdUsingGET_entityGroupIdType = config.getUsersByEntityGroupIdUsingGET_entityGroupIdType || 'str';
        this.getUsersByEntityGroupIdUsingGET_pageSize = config.getUsersByEntityGroupIdUsingGET_pageSize;
        this.getUsersByEntityGroupIdUsingGET_pageSizeType = config.getUsersByEntityGroupIdUsingGET_pageSizeType || 'str';
        this.getUsersByEntityGroupIdUsingGET_page = config.getUsersByEntityGroupIdUsingGET_page;
        this.getUsersByEntityGroupIdUsingGET_pageType = config.getUsersByEntityGroupIdUsingGET_pageType || 'str';
        this.getUsersByEntityGroupIdUsingGET_textSearch = config.getUsersByEntityGroupIdUsingGET_textSearch;
        this.getUsersByEntityGroupIdUsingGET_textSearchType = config.getUsersByEntityGroupIdUsingGET_textSearchType || 'str';
        this.getUsersByEntityGroupIdUsingGET_sortProperty = config.getUsersByEntityGroupIdUsingGET_sortProperty;
        this.getUsersByEntityGroupIdUsingGET_sortPropertyType = config.getUsersByEntityGroupIdUsingGET_sortPropertyType || 'str';
        this.getUsersByEntityGroupIdUsingGET_sortOrder = config.getUsersByEntityGroupIdUsingGET_sortOrder;
        this.getUsersByEntityGroupIdUsingGET_sortOrderType = config.getUsersByEntityGroupIdUsingGET_sortOrderType || 'str';
        this.getTenantAdminsUsingGET_tenantId = config.getTenantAdminsUsingGET_tenantId;
        this.getTenantAdminsUsingGET_tenantIdType = config.getTenantAdminsUsingGET_tenantIdType || 'str';
        this.getTenantAdminsUsingGET_pageSize = config.getTenantAdminsUsingGET_pageSize;
        this.getTenantAdminsUsingGET_pageSizeType = config.getTenantAdminsUsingGET_pageSizeType || 'str';
        this.getTenantAdminsUsingGET_page = config.getTenantAdminsUsingGET_page;
        this.getTenantAdminsUsingGET_pageType = config.getTenantAdminsUsingGET_pageType || 'str';
        this.getTenantAdminsUsingGET_textSearch = config.getTenantAdminsUsingGET_textSearch;
        this.getTenantAdminsUsingGET_textSearchType = config.getTenantAdminsUsingGET_textSearchType || 'str';
        this.getTenantAdminsUsingGET_sortProperty = config.getTenantAdminsUsingGET_sortProperty;
        this.getTenantAdminsUsingGET_sortPropertyType = config.getTenantAdminsUsingGET_sortPropertyType || 'str';
        this.getTenantAdminsUsingGET_sortOrder = config.getTenantAdminsUsingGET_sortOrder;
        this.getTenantAdminsUsingGET_sortOrderType = config.getTenantAdminsUsingGET_sortOrderType || 'str';
        this.sendActivationEmailUsingPOST_email = config.sendActivationEmailUsingPOST_email;
        this.sendActivationEmailUsingPOST_emailType = config.sendActivationEmailUsingPOST_emailType || 'str';
        this.getUserUsersUsingGET_pageSize = config.getUserUsersUsingGET_pageSize;
        this.getUserUsersUsingGET_pageSizeType = config.getUserUsersUsingGET_pageSizeType || 'str';
        this.getUserUsersUsingGET_page = config.getUserUsersUsingGET_page;
        this.getUserUsersUsingGET_pageType = config.getUserUsersUsingGET_pageType || 'str';
        this.getUserUsersUsingGET_textSearch = config.getUserUsersUsingGET_textSearch;
        this.getUserUsersUsingGET_textSearchType = config.getUserUsersUsingGET_textSearchType || 'str';
        this.getUserUsersUsingGET_sortProperty = config.getUserUsersUsingGET_sortProperty;
        this.getUserUsersUsingGET_sortPropertyType = config.getUserUsersUsingGET_sortPropertyType || 'str';
        this.getUserUsersUsingGET_sortOrder = config.getUserUsersUsingGET_sortOrder;
        this.getUserUsersUsingGET_sortOrderType = config.getUserUsersUsingGET_sortOrderType || 'str';
        this.getUserByIdUsingGET_userId = config.getUserByIdUsingGET_userId;
        this.getUserByIdUsingGET_userIdType = config.getUserByIdUsingGET_userIdType || 'str';
        this.deleteUserUsingDELETE_userId = config.deleteUserUsingDELETE_userId;
        this.deleteUserUsingDELETE_userIdType = config.deleteUserUsingDELETE_userIdType || 'str';
        this.getActivationLinkUsingGET_userId = config.getActivationLinkUsingGET_userId;
        this.getActivationLinkUsingGET_userIdType = config.getActivationLinkUsingGET_userIdType || 'str';
        this.getUserTokenUsingGET_userId = config.getUserTokenUsingGET_userId;
        this.getUserTokenUsingGET_userIdType = config.getUserTokenUsingGET_userIdType || 'str';
        this.setUserCredentialsEnabledUsingPOST_userId = config.setUserCredentialsEnabledUsingPOST_userId;
        this.setUserCredentialsEnabledUsingPOST_userIdType = config.setUserCredentialsEnabledUsingPOST_userIdType || 'str';
        this.setUserCredentialsEnabledUsingPOST_userCredentialsEnabled = config.setUserCredentialsEnabledUsingPOST_userCredentialsEnabled;
        this.setUserCredentialsEnabledUsingPOST_userCredentialsEnabledType = config.setUserCredentialsEnabledUsingPOST_userCredentialsEnabledType || 'str';
        this.getUsersByIdsUsingGET_userIds = config.getUsersByIdsUsingGET_userIds;
        this.getUsersByIdsUsingGET_userIdsType = config.getUsersByIdsUsingGET_userIdsType || 'str';
        this.saveUserUsingPOST_sendActivationMail = config.saveUserUsingPOST_sendActivationMail;
        this.saveUserUsingPOST_sendActivationMailType = config.saveUserUsingPOST_sendActivationMailType || 'str';
        this.saveUserUsingPOST_entityGroupId = config.saveUserUsingPOST_entityGroupId;
        this.saveUserUsingPOST_entityGroupIdType = config.saveUserUsingPOST_entityGroupIdType || 'str';
        this.saveUserUsingPOST_body = config.saveUserUsingPOST_body;
        this.saveUserUsingPOST_bodyType = config.saveUserUsingPOST_bodyType || 'str';
        this.getLoginWhiteLabelParamsUsingGET_logoImageChecksum = config.getLoginWhiteLabelParamsUsingGET_logoImageChecksum;
        this.getLoginWhiteLabelParamsUsingGET_logoImageChecksumType = config.getLoginWhiteLabelParamsUsingGET_logoImageChecksumType || 'str';
        this.getLoginWhiteLabelParamsUsingGET_faviconChecksum = config.getLoginWhiteLabelParamsUsingGET_faviconChecksum;
        this.getLoginWhiteLabelParamsUsingGET_faviconChecksumType = config.getLoginWhiteLabelParamsUsingGET_faviconChecksumType || 'str';
        this.saveLoginWhiteLabelParamsUsingPOST_body = config.saveLoginWhiteLabelParamsUsingPOST_body;
        this.saveLoginWhiteLabelParamsUsingPOST_bodyType = config.saveLoginWhiteLabelParamsUsingPOST_bodyType || 'str';
        this.previewWhiteLabelParamsUsingPOST_body = config.previewWhiteLabelParamsUsingPOST_body;
        this.previewWhiteLabelParamsUsingPOST_bodyType = config.previewWhiteLabelParamsUsingPOST_bodyType || 'str';
        this.saveWhiteLabelParamsUsingPOST_body = config.saveWhiteLabelParamsUsingPOST_body;
        this.saveWhiteLabelParamsUsingPOST_bodyType = config.saveWhiteLabelParamsUsingPOST_bodyType || 'str';
        this.getWhiteLabelParamsUsingGET_logoImageChecksum = config.getWhiteLabelParamsUsingGET_logoImageChecksum;
        this.getWhiteLabelParamsUsingGET_logoImageChecksumType = config.getWhiteLabelParamsUsingGET_logoImageChecksumType || 'str';
        this.getWhiteLabelParamsUsingGET_faviconChecksum = config.getWhiteLabelParamsUsingGET_faviconChecksum;
        this.getWhiteLabelParamsUsingGET_faviconChecksumType = config.getWhiteLabelParamsUsingGET_faviconChecksumType || 'str';
        this.saveWidgetTypeUsingPOST_body = config.saveWidgetTypeUsingPOST_body;
        this.saveWidgetTypeUsingPOST_bodyType = config.saveWidgetTypeUsingPOST_bodyType || 'str';
        this.getWidgetTypeByIdUsingGET_widgetTypeId = config.getWidgetTypeByIdUsingGET_widgetTypeId;
        this.getWidgetTypeByIdUsingGET_widgetTypeIdType = config.getWidgetTypeByIdUsingGET_widgetTypeIdType || 'str';
        this.deleteWidgetTypeUsingDELETE_widgetTypeId = config.deleteWidgetTypeUsingDELETE_widgetTypeId;
        this.deleteWidgetTypeUsingDELETE_widgetTypeIdType = config.deleteWidgetTypeUsingDELETE_widgetTypeIdType || 'str';
        this.getBundleWidgetTypesDetailsUsingGET_isSystem = config.getBundleWidgetTypesDetailsUsingGET_isSystem;
        this.getBundleWidgetTypesDetailsUsingGET_isSystemType = config.getBundleWidgetTypesDetailsUsingGET_isSystemType || 'str';
        this.getBundleWidgetTypesDetailsUsingGET_bundleAlias = config.getBundleWidgetTypesDetailsUsingGET_bundleAlias;
        this.getBundleWidgetTypesDetailsUsingGET_bundleAliasType = config.getBundleWidgetTypesDetailsUsingGET_bundleAliasType || 'str';
        this.getBundleWidgetTypesInfosUsingGET_isSystem = config.getBundleWidgetTypesInfosUsingGET_isSystem;
        this.getBundleWidgetTypesInfosUsingGET_isSystemType = config.getBundleWidgetTypesInfosUsingGET_isSystemType || 'str';
        this.getBundleWidgetTypesInfosUsingGET_bundleAlias = config.getBundleWidgetTypesInfosUsingGET_bundleAlias;
        this.getBundleWidgetTypesInfosUsingGET_bundleAliasType = config.getBundleWidgetTypesInfosUsingGET_bundleAliasType || 'str';
        this.getBundleWidgetTypesUsingGET_isSystem = config.getBundleWidgetTypesUsingGET_isSystem;
        this.getBundleWidgetTypesUsingGET_isSystemType = config.getBundleWidgetTypesUsingGET_isSystemType || 'str';
        this.getBundleWidgetTypesUsingGET_bundleAlias = config.getBundleWidgetTypesUsingGET_bundleAlias;
        this.getBundleWidgetTypesUsingGET_bundleAliasType = config.getBundleWidgetTypesUsingGET_bundleAliasType || 'str';
        this.getWidgetTypeUsingGET_isSystem = config.getWidgetTypeUsingGET_isSystem;
        this.getWidgetTypeUsingGET_isSystemType = config.getWidgetTypeUsingGET_isSystemType || 'str';
        this.getWidgetTypeUsingGET_bundleAlias = config.getWidgetTypeUsingGET_bundleAlias;
        this.getWidgetTypeUsingGET_bundleAliasType = config.getWidgetTypeUsingGET_bundleAliasType || 'str';
        this.getWidgetTypeUsingGET_alias = config.getWidgetTypeUsingGET_alias;
        this.getWidgetTypeUsingGET_aliasType = config.getWidgetTypeUsingGET_aliasType || 'str';
        this.saveWidgetsBundleUsingPOST_body = config.saveWidgetsBundleUsingPOST_body;
        this.saveWidgetsBundleUsingPOST_bodyType = config.saveWidgetsBundleUsingPOST_bodyType || 'str';
        this.getWidgetsBundleByIdUsingGET_widgetsBundleId = config.getWidgetsBundleByIdUsingGET_widgetsBundleId;
        this.getWidgetsBundleByIdUsingGET_widgetsBundleIdType = config.getWidgetsBundleByIdUsingGET_widgetsBundleIdType || 'str';
        this.deleteWidgetsBundleUsingDELETE_widgetsBundleId = config.deleteWidgetsBundleUsingDELETE_widgetsBundleId;
        this.deleteWidgetsBundleUsingDELETE_widgetsBundleIdType = config.deleteWidgetsBundleUsingDELETE_widgetsBundleIdType || 'str';
        this.getWidgetsBundlesUsingGET_1_pageSize = config.getWidgetsBundlesUsingGET_1_pageSize;
        this.getWidgetsBundlesUsingGET_1_pageSizeType = config.getWidgetsBundlesUsingGET_1_pageSizeType || 'str';
        this.getWidgetsBundlesUsingGET_1_page = config.getWidgetsBundlesUsingGET_1_page;
        this.getWidgetsBundlesUsingGET_1_pageType = config.getWidgetsBundlesUsingGET_1_pageType || 'str';
        this.getWidgetsBundlesUsingGET_1_textSearch = config.getWidgetsBundlesUsingGET_1_textSearch;
        this.getWidgetsBundlesUsingGET_1_textSearchType = config.getWidgetsBundlesUsingGET_1_textSearchType || 'str';
        this.getWidgetsBundlesUsingGET_1_sortProperty = config.getWidgetsBundlesUsingGET_1_sortProperty;
        this.getWidgetsBundlesUsingGET_1_sortPropertyType = config.getWidgetsBundlesUsingGET_1_sortPropertyType || 'str';
        this.getWidgetsBundlesUsingGET_1_sortOrder = config.getWidgetsBundlesUsingGET_1_sortOrder;
        this.getWidgetsBundlesUsingGET_1_sortOrderType = config.getWidgetsBundlesUsingGET_1_sortOrderType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.ThingsboardPeRestApi();
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'getSecuritySettingsUsingGET') {
                var getSecuritySettingsUsingGET_parameters = [];
                var getSecuritySettingsUsingGET_nodeParam;
                var getSecuritySettingsUsingGET_nodeParamType;
                result = client.getSecuritySettingsUsingGET(getSecuritySettingsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveSecuritySettingsUsingPOST') {
                var saveSecuritySettingsUsingPOST_parameters = [];
                var saveSecuritySettingsUsingPOST_nodeParam;
                var saveSecuritySettingsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveSecuritySettingsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveSecuritySettingsUsingPOST(saveSecuritySettingsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveAdminSettingsUsingPOST') {
                var saveAdminSettingsUsingPOST_parameters = [];
                var saveAdminSettingsUsingPOST_nodeParam;
                var saveAdminSettingsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveAdminSettingsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveAdminSettingsUsingPOST(saveAdminSettingsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'sendTestMailUsingPOST') {
                var sendTestMailUsingPOST_parameters = [];
                var sendTestMailUsingPOST_nodeParam;
                var sendTestMailUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    sendTestMailUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.sendTestMailUsingPOST(sendTestMailUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'sendTestSmsUsingPOST') {
                var sendTestSmsUsingPOST_parameters = [];
                var sendTestSmsUsingPOST_nodeParam;
                var sendTestSmsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    sendTestSmsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.sendTestSmsUsingPOST(sendTestSmsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAdminSettingsUsingGET') {
                var getAdminSettingsUsingGET_parameters = [];
                var getAdminSettingsUsingGET_nodeParam;
                var getAdminSettingsUsingGET_nodeParamType;

                getAdminSettingsUsingGET_nodeParam = node.getAdminSettingsUsingGET_key;
                getAdminSettingsUsingGET_nodeParamType = node.getAdminSettingsUsingGET_keyType;
                if (getAdminSettingsUsingGET_nodeParamType === 'str') {
                    getAdminSettingsUsingGET_parameters.key = getAdminSettingsUsingGET_nodeParam || '';
                } else {
                    getAdminSettingsUsingGET_parameters.key = RED.util.getMessageProperty(msg, getAdminSettingsUsingGET_nodeParam);
                }
                getAdminSettingsUsingGET_parameters.key = !!getAdminSettingsUsingGET_parameters.key ? getAdminSettingsUsingGET_parameters.key : msg.payload;
                
                getAdminSettingsUsingGET_nodeParam = node.getAdminSettingsUsingGET_systemByDefault;
                getAdminSettingsUsingGET_nodeParamType = node.getAdminSettingsUsingGET_systemByDefaultType;
                if (getAdminSettingsUsingGET_nodeParamType === 'str') {
                    getAdminSettingsUsingGET_parameters.systemByDefault = getAdminSettingsUsingGET_nodeParam || '';
                } else {
                    getAdminSettingsUsingGET_parameters.systemByDefault = RED.util.getMessageProperty(msg, getAdminSettingsUsingGET_nodeParam);
                }
                getAdminSettingsUsingGET_parameters.systemByDefault = !!getAdminSettingsUsingGET_parameters.systemByDefault ? getAdminSettingsUsingGET_parameters.systemByDefault : msg.payload;
                                result = client.getAdminSettingsUsingGET(getAdminSettingsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'checkUpdatesUsingGET') {
                var checkUpdatesUsingGET_parameters = [];
                var checkUpdatesUsingGET_nodeParam;
                var checkUpdatesUsingGET_nodeParamType;
                result = client.checkUpdatesUsingGET(checkUpdatesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'loginPost') {
                var loginPost_parameters = [];
                var loginPost_nodeParam;
                var loginPost_nodeParamType;

                if (typeof msg.payload === 'object') {
                    loginPost_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.loginPost(loginPost_parameters);
            }
            if (!errorFlag && node.method === 'saveAlarmUsingPOST') {
                var saveAlarmUsingPOST_parameters = [];
                var saveAlarmUsingPOST_nodeParam;
                var saveAlarmUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveAlarmUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveAlarmUsingPOST(saveAlarmUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getHighestAlarmSeverityUsingGET') {
                var getHighestAlarmSeverityUsingGET_parameters = [];
                var getHighestAlarmSeverityUsingGET_nodeParam;
                var getHighestAlarmSeverityUsingGET_nodeParamType;

                getHighestAlarmSeverityUsingGET_nodeParam = node.getHighestAlarmSeverityUsingGET_entityType;
                getHighestAlarmSeverityUsingGET_nodeParamType = node.getHighestAlarmSeverityUsingGET_entityTypeType;
                if (getHighestAlarmSeverityUsingGET_nodeParamType === 'str') {
                    getHighestAlarmSeverityUsingGET_parameters.entityType = getHighestAlarmSeverityUsingGET_nodeParam || '';
                } else {
                    getHighestAlarmSeverityUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getHighestAlarmSeverityUsingGET_nodeParam);
                }
                getHighestAlarmSeverityUsingGET_parameters.entityType = !!getHighestAlarmSeverityUsingGET_parameters.entityType ? getHighestAlarmSeverityUsingGET_parameters.entityType : msg.payload;
                
                getHighestAlarmSeverityUsingGET_nodeParam = node.getHighestAlarmSeverityUsingGET_entityId;
                getHighestAlarmSeverityUsingGET_nodeParamType = node.getHighestAlarmSeverityUsingGET_entityIdType;
                if (getHighestAlarmSeverityUsingGET_nodeParamType === 'str') {
                    getHighestAlarmSeverityUsingGET_parameters.entityId = getHighestAlarmSeverityUsingGET_nodeParam || '';
                } else {
                    getHighestAlarmSeverityUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getHighestAlarmSeverityUsingGET_nodeParam);
                }
                getHighestAlarmSeverityUsingGET_parameters.entityId = !!getHighestAlarmSeverityUsingGET_parameters.entityId ? getHighestAlarmSeverityUsingGET_parameters.entityId : msg.payload;
                
                getHighestAlarmSeverityUsingGET_nodeParam = node.getHighestAlarmSeverityUsingGET_searchStatus;
                getHighestAlarmSeverityUsingGET_nodeParamType = node.getHighestAlarmSeverityUsingGET_searchStatusType;
                if (getHighestAlarmSeverityUsingGET_nodeParamType === 'str') {
                    getHighestAlarmSeverityUsingGET_parameters.searchStatus = getHighestAlarmSeverityUsingGET_nodeParam || '';
                } else {
                    getHighestAlarmSeverityUsingGET_parameters.searchStatus = RED.util.getMessageProperty(msg, getHighestAlarmSeverityUsingGET_nodeParam);
                }
                getHighestAlarmSeverityUsingGET_parameters.searchStatus = !!getHighestAlarmSeverityUsingGET_parameters.searchStatus ? getHighestAlarmSeverityUsingGET_parameters.searchStatus : msg.payload;
                
                getHighestAlarmSeverityUsingGET_nodeParam = node.getHighestAlarmSeverityUsingGET_status;
                getHighestAlarmSeverityUsingGET_nodeParamType = node.getHighestAlarmSeverityUsingGET_statusType;
                if (getHighestAlarmSeverityUsingGET_nodeParamType === 'str') {
                    getHighestAlarmSeverityUsingGET_parameters.status = getHighestAlarmSeverityUsingGET_nodeParam || '';
                } else {
                    getHighestAlarmSeverityUsingGET_parameters.status = RED.util.getMessageProperty(msg, getHighestAlarmSeverityUsingGET_nodeParam);
                }
                getHighestAlarmSeverityUsingGET_parameters.status = !!getHighestAlarmSeverityUsingGET_parameters.status ? getHighestAlarmSeverityUsingGET_parameters.status : msg.payload;
                                result = client.getHighestAlarmSeverityUsingGET(getHighestAlarmSeverityUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAlarmInfoByIdUsingGET') {
                var getAlarmInfoByIdUsingGET_parameters = [];
                var getAlarmInfoByIdUsingGET_nodeParam;
                var getAlarmInfoByIdUsingGET_nodeParamType;

                getAlarmInfoByIdUsingGET_nodeParam = node.getAlarmInfoByIdUsingGET_alarmId;
                getAlarmInfoByIdUsingGET_nodeParamType = node.getAlarmInfoByIdUsingGET_alarmIdType;
                if (getAlarmInfoByIdUsingGET_nodeParamType === 'str') {
                    getAlarmInfoByIdUsingGET_parameters.alarmId = getAlarmInfoByIdUsingGET_nodeParam || '';
                } else {
                    getAlarmInfoByIdUsingGET_parameters.alarmId = RED.util.getMessageProperty(msg, getAlarmInfoByIdUsingGET_nodeParam);
                }
                getAlarmInfoByIdUsingGET_parameters.alarmId = !!getAlarmInfoByIdUsingGET_parameters.alarmId ? getAlarmInfoByIdUsingGET_parameters.alarmId : msg.payload;
                                result = client.getAlarmInfoByIdUsingGET(getAlarmInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAlarmByIdUsingGET') {
                var getAlarmByIdUsingGET_parameters = [];
                var getAlarmByIdUsingGET_nodeParam;
                var getAlarmByIdUsingGET_nodeParamType;

                getAlarmByIdUsingGET_nodeParam = node.getAlarmByIdUsingGET_alarmId;
                getAlarmByIdUsingGET_nodeParamType = node.getAlarmByIdUsingGET_alarmIdType;
                if (getAlarmByIdUsingGET_nodeParamType === 'str') {
                    getAlarmByIdUsingGET_parameters.alarmId = getAlarmByIdUsingGET_nodeParam || '';
                } else {
                    getAlarmByIdUsingGET_parameters.alarmId = RED.util.getMessageProperty(msg, getAlarmByIdUsingGET_nodeParam);
                }
                getAlarmByIdUsingGET_parameters.alarmId = !!getAlarmByIdUsingGET_parameters.alarmId ? getAlarmByIdUsingGET_parameters.alarmId : msg.payload;
                                result = client.getAlarmByIdUsingGET(getAlarmByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteAlarmUsingDELETE') {
                var deleteAlarmUsingDELETE_parameters = [];
                var deleteAlarmUsingDELETE_nodeParam;
                var deleteAlarmUsingDELETE_nodeParamType;

                deleteAlarmUsingDELETE_nodeParam = node.deleteAlarmUsingDELETE_alarmId;
                deleteAlarmUsingDELETE_nodeParamType = node.deleteAlarmUsingDELETE_alarmIdType;
                if (deleteAlarmUsingDELETE_nodeParamType === 'str') {
                    deleteAlarmUsingDELETE_parameters.alarmId = deleteAlarmUsingDELETE_nodeParam || '';
                } else {
                    deleteAlarmUsingDELETE_parameters.alarmId = RED.util.getMessageProperty(msg, deleteAlarmUsingDELETE_nodeParam);
                }
                deleteAlarmUsingDELETE_parameters.alarmId = !!deleteAlarmUsingDELETE_parameters.alarmId ? deleteAlarmUsingDELETE_parameters.alarmId : msg.payload;
                                result = client.deleteAlarmUsingDELETE(deleteAlarmUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'ackAlarmUsingPOST') {
                var ackAlarmUsingPOST_parameters = [];
                var ackAlarmUsingPOST_nodeParam;
                var ackAlarmUsingPOST_nodeParamType;

                ackAlarmUsingPOST_nodeParam = node.ackAlarmUsingPOST_alarmId;
                ackAlarmUsingPOST_nodeParamType = node.ackAlarmUsingPOST_alarmIdType;
                if (ackAlarmUsingPOST_nodeParamType === 'str') {
                    ackAlarmUsingPOST_parameters.alarmId = ackAlarmUsingPOST_nodeParam || '';
                } else {
                    ackAlarmUsingPOST_parameters.alarmId = RED.util.getMessageProperty(msg, ackAlarmUsingPOST_nodeParam);
                }
                ackAlarmUsingPOST_parameters.alarmId = !!ackAlarmUsingPOST_parameters.alarmId ? ackAlarmUsingPOST_parameters.alarmId : msg.payload;
                                result = client.ackAlarmUsingPOST(ackAlarmUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'clearAlarmUsingPOST') {
                var clearAlarmUsingPOST_parameters = [];
                var clearAlarmUsingPOST_nodeParam;
                var clearAlarmUsingPOST_nodeParamType;

                clearAlarmUsingPOST_nodeParam = node.clearAlarmUsingPOST_alarmId;
                clearAlarmUsingPOST_nodeParamType = node.clearAlarmUsingPOST_alarmIdType;
                if (clearAlarmUsingPOST_nodeParamType === 'str') {
                    clearAlarmUsingPOST_parameters.alarmId = clearAlarmUsingPOST_nodeParam || '';
                } else {
                    clearAlarmUsingPOST_parameters.alarmId = RED.util.getMessageProperty(msg, clearAlarmUsingPOST_nodeParam);
                }
                clearAlarmUsingPOST_parameters.alarmId = !!clearAlarmUsingPOST_parameters.alarmId ? clearAlarmUsingPOST_parameters.alarmId : msg.payload;
                                result = client.clearAlarmUsingPOST(clearAlarmUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAlarmsUsingGET') {
                var getAlarmsUsingGET_parameters = [];
                var getAlarmsUsingGET_nodeParam;
                var getAlarmsUsingGET_nodeParamType;

                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_entityType;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_entityTypeType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.entityType = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.entityType = !!getAlarmsUsingGET_parameters.entityType ? getAlarmsUsingGET_parameters.entityType : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_entityId;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_entityIdType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.entityId = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.entityId = !!getAlarmsUsingGET_parameters.entityId ? getAlarmsUsingGET_parameters.entityId : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_searchStatus;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_searchStatusType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.searchStatus = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.searchStatus = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.searchStatus = !!getAlarmsUsingGET_parameters.searchStatus ? getAlarmsUsingGET_parameters.searchStatus : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_status;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_statusType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.status = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.status = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.status = !!getAlarmsUsingGET_parameters.status ? getAlarmsUsingGET_parameters.status : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_pageSize;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_pageSizeType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.pageSize = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.pageSize = !!getAlarmsUsingGET_parameters.pageSize ? getAlarmsUsingGET_parameters.pageSize : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_page;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_pageType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.page = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.page = !!getAlarmsUsingGET_parameters.page ? getAlarmsUsingGET_parameters.page : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_textSearch;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_textSearchType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.textSearch = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.textSearch = !!getAlarmsUsingGET_parameters.textSearch ? getAlarmsUsingGET_parameters.textSearch : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_sortProperty;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_sortPropertyType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.sortProperty = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.sortProperty = !!getAlarmsUsingGET_parameters.sortProperty ? getAlarmsUsingGET_parameters.sortProperty : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_sortOrder;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_sortOrderType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.sortOrder = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.sortOrder = !!getAlarmsUsingGET_parameters.sortOrder ? getAlarmsUsingGET_parameters.sortOrder : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_startTime;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_startTimeType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.startTime = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.startTime = !!getAlarmsUsingGET_parameters.startTime ? getAlarmsUsingGET_parameters.startTime : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_endTime;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_endTimeType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.endTime = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.endTime = !!getAlarmsUsingGET_parameters.endTime ? getAlarmsUsingGET_parameters.endTime : msg.payload;
                
                getAlarmsUsingGET_nodeParam = node.getAlarmsUsingGET_fetchOriginator;
                getAlarmsUsingGET_nodeParamType = node.getAlarmsUsingGET_fetchOriginatorType;
                if (getAlarmsUsingGET_nodeParamType === 'str') {
                    getAlarmsUsingGET_parameters.fetchOriginator = getAlarmsUsingGET_nodeParam || '';
                } else {
                    getAlarmsUsingGET_parameters.fetchOriginator = RED.util.getMessageProperty(msg, getAlarmsUsingGET_nodeParam);
                }
                getAlarmsUsingGET_parameters.fetchOriginator = !!getAlarmsUsingGET_parameters.fetchOriginator ? getAlarmsUsingGET_parameters.fetchOriginator : msg.payload;
                                result = client.getAlarmsUsingGET(getAlarmsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAllAlarmsUsingGET') {
                var getAllAlarmsUsingGET_parameters = [];
                var getAllAlarmsUsingGET_nodeParam;
                var getAllAlarmsUsingGET_nodeParamType;

                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_searchStatus;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_searchStatusType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.searchStatus = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.searchStatus = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.searchStatus = !!getAllAlarmsUsingGET_parameters.searchStatus ? getAllAlarmsUsingGET_parameters.searchStatus : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_status;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_statusType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.status = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.status = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.status = !!getAllAlarmsUsingGET_parameters.status ? getAllAlarmsUsingGET_parameters.status : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_pageSize;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_pageSizeType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.pageSize = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.pageSize = !!getAllAlarmsUsingGET_parameters.pageSize ? getAllAlarmsUsingGET_parameters.pageSize : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_page;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_pageType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.page = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.page = !!getAllAlarmsUsingGET_parameters.page ? getAllAlarmsUsingGET_parameters.page : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_textSearch;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_textSearchType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.textSearch = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.textSearch = !!getAllAlarmsUsingGET_parameters.textSearch ? getAllAlarmsUsingGET_parameters.textSearch : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_sortProperty;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_sortPropertyType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.sortProperty = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.sortProperty = !!getAllAlarmsUsingGET_parameters.sortProperty ? getAllAlarmsUsingGET_parameters.sortProperty : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_sortOrder;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_sortOrderType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.sortOrder = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.sortOrder = !!getAllAlarmsUsingGET_parameters.sortOrder ? getAllAlarmsUsingGET_parameters.sortOrder : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_startTime;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_startTimeType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.startTime = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.startTime = !!getAllAlarmsUsingGET_parameters.startTime ? getAllAlarmsUsingGET_parameters.startTime : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_endTime;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_endTimeType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.endTime = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.endTime = !!getAllAlarmsUsingGET_parameters.endTime ? getAllAlarmsUsingGET_parameters.endTime : msg.payload;
                
                getAllAlarmsUsingGET_nodeParam = node.getAllAlarmsUsingGET_fetchOriginator;
                getAllAlarmsUsingGET_nodeParamType = node.getAllAlarmsUsingGET_fetchOriginatorType;
                if (getAllAlarmsUsingGET_nodeParamType === 'str') {
                    getAllAlarmsUsingGET_parameters.fetchOriginator = getAllAlarmsUsingGET_nodeParam || '';
                } else {
                    getAllAlarmsUsingGET_parameters.fetchOriginator = RED.util.getMessageProperty(msg, getAllAlarmsUsingGET_nodeParam);
                }
                getAllAlarmsUsingGET_parameters.fetchOriginator = !!getAllAlarmsUsingGET_parameters.fetchOriginator ? getAllAlarmsUsingGET_parameters.fetchOriginator : msg.payload;
                                result = client.getAllAlarmsUsingGET(getAllAlarmsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'processAssetBulkImportUsingPOST') {
                var processAssetBulkImportUsingPOST_parameters = [];
                var processAssetBulkImportUsingPOST_nodeParam;
                var processAssetBulkImportUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    processAssetBulkImportUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.processAssetBulkImportUsingPOST(processAssetBulkImportUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAssetTypesUsingGET') {
                var getAssetTypesUsingGET_parameters = [];
                var getAssetTypesUsingGET_nodeParam;
                var getAssetTypesUsingGET_nodeParamType;
                result = client.getAssetTypesUsingGET(getAssetTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAssetByIdUsingGET') {
                var getAssetByIdUsingGET_parameters = [];
                var getAssetByIdUsingGET_nodeParam;
                var getAssetByIdUsingGET_nodeParamType;

                getAssetByIdUsingGET_nodeParam = node.getAssetByIdUsingGET_assetId;
                getAssetByIdUsingGET_nodeParamType = node.getAssetByIdUsingGET_assetIdType;
                if (getAssetByIdUsingGET_nodeParamType === 'str') {
                    getAssetByIdUsingGET_parameters.assetId = getAssetByIdUsingGET_nodeParam || '';
                } else {
                    getAssetByIdUsingGET_parameters.assetId = RED.util.getMessageProperty(msg, getAssetByIdUsingGET_nodeParam);
                }
                getAssetByIdUsingGET_parameters.assetId = !!getAssetByIdUsingGET_parameters.assetId ? getAssetByIdUsingGET_parameters.assetId : msg.payload;
                                result = client.getAssetByIdUsingGET(getAssetByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteAssetUsingDELETE') {
                var deleteAssetUsingDELETE_parameters = [];
                var deleteAssetUsingDELETE_nodeParam;
                var deleteAssetUsingDELETE_nodeParamType;

                deleteAssetUsingDELETE_nodeParam = node.deleteAssetUsingDELETE_assetId;
                deleteAssetUsingDELETE_nodeParamType = node.deleteAssetUsingDELETE_assetIdType;
                if (deleteAssetUsingDELETE_nodeParamType === 'str') {
                    deleteAssetUsingDELETE_parameters.assetId = deleteAssetUsingDELETE_nodeParam || '';
                } else {
                    deleteAssetUsingDELETE_parameters.assetId = RED.util.getMessageProperty(msg, deleteAssetUsingDELETE_nodeParam);
                }
                deleteAssetUsingDELETE_parameters.assetId = !!deleteAssetUsingDELETE_parameters.assetId ? deleteAssetUsingDELETE_parameters.assetId : msg.payload;
                                result = client.deleteAssetUsingDELETE(deleteAssetUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'findByQueryUsingPOST') {
                var findByQueryUsingPOST_parameters = [];
                var findByQueryUsingPOST_nodeParam;
                var findByQueryUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findByQueryUsingPOST(findByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAssetsByIdsUsingGET') {
                var getAssetsByIdsUsingGET_parameters = [];
                var getAssetsByIdsUsingGET_nodeParam;
                var getAssetsByIdsUsingGET_nodeParamType;

                getAssetsByIdsUsingGET_nodeParam = node.getAssetsByIdsUsingGET_assetIds;
                getAssetsByIdsUsingGET_nodeParamType = node.getAssetsByIdsUsingGET_assetIdsType;
                if (getAssetsByIdsUsingGET_nodeParamType === 'str') {
                    getAssetsByIdsUsingGET_parameters.assetIds = getAssetsByIdsUsingGET_nodeParam || '';
                } else {
                    getAssetsByIdsUsingGET_parameters.assetIds = RED.util.getMessageProperty(msg, getAssetsByIdsUsingGET_nodeParam);
                }
                getAssetsByIdsUsingGET_parameters.assetIds = !!getAssetsByIdsUsingGET_parameters.assetIds ? getAssetsByIdsUsingGET_parameters.assetIds : msg.payload;
                                result = client.getAssetsByIdsUsingGET(getAssetsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveAssetUsingPOST') {
                var saveAssetUsingPOST_parameters = [];
                var saveAssetUsingPOST_nodeParam;
                var saveAssetUsingPOST_nodeParamType;

                saveAssetUsingPOST_nodeParam = node.saveAssetUsingPOST_entityGroupId;
                saveAssetUsingPOST_nodeParamType = node.saveAssetUsingPOST_entityGroupIdType;
                if (saveAssetUsingPOST_nodeParamType === 'str') {
                    saveAssetUsingPOST_parameters.entityGroupId = saveAssetUsingPOST_nodeParam || '';
                } else {
                    saveAssetUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveAssetUsingPOST_nodeParam);
                }
                saveAssetUsingPOST_parameters.entityGroupId = !!saveAssetUsingPOST_parameters.entityGroupId ? saveAssetUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveAssetUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveAssetUsingPOST(saveAssetUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerAssetsUsingGET') {
                var getCustomerAssetsUsingGET_parameters = [];
                var getCustomerAssetsUsingGET_nodeParam;
                var getCustomerAssetsUsingGET_nodeParamType;

                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_customerId;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_customerIdType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.customerId = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.customerId = !!getCustomerAssetsUsingGET_parameters.customerId ? getCustomerAssetsUsingGET_parameters.customerId : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_pageSize;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_pageSizeType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.pageSize = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.pageSize = !!getCustomerAssetsUsingGET_parameters.pageSize ? getCustomerAssetsUsingGET_parameters.pageSize : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_page;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_pageType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.page = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.page = !!getCustomerAssetsUsingGET_parameters.page ? getCustomerAssetsUsingGET_parameters.page : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_type;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_typeType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.type = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.type = !!getCustomerAssetsUsingGET_parameters.type ? getCustomerAssetsUsingGET_parameters.type : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_textSearch;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_textSearchType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.textSearch = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.textSearch = !!getCustomerAssetsUsingGET_parameters.textSearch ? getCustomerAssetsUsingGET_parameters.textSearch : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_sortProperty;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_sortPropertyType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.sortProperty = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.sortProperty = !!getCustomerAssetsUsingGET_parameters.sortProperty ? getCustomerAssetsUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomerAssetsUsingGET_nodeParam = node.getCustomerAssetsUsingGET_sortOrder;
                getCustomerAssetsUsingGET_nodeParamType = node.getCustomerAssetsUsingGET_sortOrderType;
                if (getCustomerAssetsUsingGET_nodeParamType === 'str') {
                    getCustomerAssetsUsingGET_parameters.sortOrder = getCustomerAssetsUsingGET_nodeParam || '';
                } else {
                    getCustomerAssetsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomerAssetsUsingGET_nodeParam);
                }
                getCustomerAssetsUsingGET_parameters.sortOrder = !!getCustomerAssetsUsingGET_parameters.sortOrder ? getCustomerAssetsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomerAssetsUsingGET(getCustomerAssetsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAssetsByEntityGroupIdUsingGET') {
                var getAssetsByEntityGroupIdUsingGET_parameters = [];
                var getAssetsByEntityGroupIdUsingGET_nodeParam;
                var getAssetsByEntityGroupIdUsingGET_nodeParamType;

                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_entityGroupId;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_entityGroupIdType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.entityGroupId = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.entityGroupId = !!getAssetsByEntityGroupIdUsingGET_parameters.entityGroupId ? getAssetsByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_pageSize;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_pageSizeType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.pageSize = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.pageSize = !!getAssetsByEntityGroupIdUsingGET_parameters.pageSize ? getAssetsByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_page;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_pageType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.page = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.page = !!getAssetsByEntityGroupIdUsingGET_parameters.page ? getAssetsByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_textSearch;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_textSearchType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.textSearch = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.textSearch = !!getAssetsByEntityGroupIdUsingGET_parameters.textSearch ? getAssetsByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_sortProperty;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_sortPropertyType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.sortProperty = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.sortProperty = !!getAssetsByEntityGroupIdUsingGET_parameters.sortProperty ? getAssetsByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getAssetsByEntityGroupIdUsingGET_nodeParam = node.getAssetsByEntityGroupIdUsingGET_sortOrder;
                getAssetsByEntityGroupIdUsingGET_nodeParamType = node.getAssetsByEntityGroupIdUsingGET_sortOrderType;
                if (getAssetsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getAssetsByEntityGroupIdUsingGET_parameters.sortOrder = getAssetsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getAssetsByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAssetsByEntityGroupIdUsingGET_nodeParam);
                }
                getAssetsByEntityGroupIdUsingGET_parameters.sortOrder = !!getAssetsByEntityGroupIdUsingGET_parameters.sortOrder ? getAssetsByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getAssetsByEntityGroupIdUsingGET(getAssetsByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantAssetUsingGET') {
                var getTenantAssetUsingGET_parameters = [];
                var getTenantAssetUsingGET_nodeParam;
                var getTenantAssetUsingGET_nodeParamType;

                getTenantAssetUsingGET_nodeParam = node.getTenantAssetUsingGET_assetName;
                getTenantAssetUsingGET_nodeParamType = node.getTenantAssetUsingGET_assetNameType;
                if (getTenantAssetUsingGET_nodeParamType === 'str') {
                    getTenantAssetUsingGET_parameters.assetName = getTenantAssetUsingGET_nodeParam || '';
                } else {
                    getTenantAssetUsingGET_parameters.assetName = RED.util.getMessageProperty(msg, getTenantAssetUsingGET_nodeParam);
                }
                getTenantAssetUsingGET_parameters.assetName = !!getTenantAssetUsingGET_parameters.assetName ? getTenantAssetUsingGET_parameters.assetName : msg.payload;
                                result = client.getTenantAssetUsingGET(getTenantAssetUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantAssetsUsingGET') {
                var getTenantAssetsUsingGET_parameters = [];
                var getTenantAssetsUsingGET_nodeParam;
                var getTenantAssetsUsingGET_nodeParamType;

                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_pageSize;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_pageSizeType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.pageSize = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.pageSize = !!getTenantAssetsUsingGET_parameters.pageSize ? getTenantAssetsUsingGET_parameters.pageSize : msg.payload;
                
                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_page;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_pageType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.page = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.page = !!getTenantAssetsUsingGET_parameters.page ? getTenantAssetsUsingGET_parameters.page : msg.payload;
                
                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_type;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_typeType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.type = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.type = !!getTenantAssetsUsingGET_parameters.type ? getTenantAssetsUsingGET_parameters.type : msg.payload;
                
                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_textSearch;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_textSearchType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.textSearch = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.textSearch = !!getTenantAssetsUsingGET_parameters.textSearch ? getTenantAssetsUsingGET_parameters.textSearch : msg.payload;
                
                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_sortProperty;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_sortPropertyType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.sortProperty = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.sortProperty = !!getTenantAssetsUsingGET_parameters.sortProperty ? getTenantAssetsUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantAssetsUsingGET_nodeParam = node.getTenantAssetsUsingGET_sortOrder;
                getTenantAssetsUsingGET_nodeParamType = node.getTenantAssetsUsingGET_sortOrderType;
                if (getTenantAssetsUsingGET_nodeParamType === 'str') {
                    getTenantAssetsUsingGET_parameters.sortOrder = getTenantAssetsUsingGET_nodeParam || '';
                } else {
                    getTenantAssetsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantAssetsUsingGET_nodeParam);
                }
                getTenantAssetsUsingGET_parameters.sortOrder = !!getTenantAssetsUsingGET_parameters.sortOrder ? getTenantAssetsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantAssetsUsingGET(getTenantAssetsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserAssetsUsingGET') {
                var getUserAssetsUsingGET_parameters = [];
                var getUserAssetsUsingGET_nodeParam;
                var getUserAssetsUsingGET_nodeParamType;

                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_pageSize;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_pageSizeType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.pageSize = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.pageSize = !!getUserAssetsUsingGET_parameters.pageSize ? getUserAssetsUsingGET_parameters.pageSize : msg.payload;
                
                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_page;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_pageType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.page = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.page = !!getUserAssetsUsingGET_parameters.page ? getUserAssetsUsingGET_parameters.page : msg.payload;
                
                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_type;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_typeType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.type = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.type = !!getUserAssetsUsingGET_parameters.type ? getUserAssetsUsingGET_parameters.type : msg.payload;
                
                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_textSearch;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_textSearchType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.textSearch = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.textSearch = !!getUserAssetsUsingGET_parameters.textSearch ? getUserAssetsUsingGET_parameters.textSearch : msg.payload;
                
                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_sortProperty;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_sortPropertyType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.sortProperty = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.sortProperty = !!getUserAssetsUsingGET_parameters.sortProperty ? getUserAssetsUsingGET_parameters.sortProperty : msg.payload;
                
                getUserAssetsUsingGET_nodeParam = node.getUserAssetsUsingGET_sortOrder;
                getUserAssetsUsingGET_nodeParamType = node.getUserAssetsUsingGET_sortOrderType;
                if (getUserAssetsUsingGET_nodeParamType === 'str') {
                    getUserAssetsUsingGET_parameters.sortOrder = getUserAssetsUsingGET_nodeParam || '';
                } else {
                    getUserAssetsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserAssetsUsingGET_nodeParam);
                }
                getUserAssetsUsingGET_parameters.sortOrder = !!getUserAssetsUsingGET_parameters.sortOrder ? getUserAssetsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserAssetsUsingGET(getUserAssetsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAuditLogsByCustomerIdUsingGET') {
                var getAuditLogsByCustomerIdUsingGET_parameters = [];
                var getAuditLogsByCustomerIdUsingGET_nodeParam;
                var getAuditLogsByCustomerIdUsingGET_nodeParamType;

                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_customerId;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_customerIdType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.customerId = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.customerId = !!getAuditLogsByCustomerIdUsingGET_parameters.customerId ? getAuditLogsByCustomerIdUsingGET_parameters.customerId : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_pageSize;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_pageSizeType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.pageSize = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.pageSize = !!getAuditLogsByCustomerIdUsingGET_parameters.pageSize ? getAuditLogsByCustomerIdUsingGET_parameters.pageSize : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_page;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_pageType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.page = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.page = !!getAuditLogsByCustomerIdUsingGET_parameters.page ? getAuditLogsByCustomerIdUsingGET_parameters.page : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_textSearch;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_textSearchType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.textSearch = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.textSearch = !!getAuditLogsByCustomerIdUsingGET_parameters.textSearch ? getAuditLogsByCustomerIdUsingGET_parameters.textSearch : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_sortProperty;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_sortPropertyType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.sortProperty = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.sortProperty = !!getAuditLogsByCustomerIdUsingGET_parameters.sortProperty ? getAuditLogsByCustomerIdUsingGET_parameters.sortProperty : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_sortOrder;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_sortOrderType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.sortOrder = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.sortOrder = !!getAuditLogsByCustomerIdUsingGET_parameters.sortOrder ? getAuditLogsByCustomerIdUsingGET_parameters.sortOrder : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_startTime;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_startTimeType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.startTime = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.startTime = !!getAuditLogsByCustomerIdUsingGET_parameters.startTime ? getAuditLogsByCustomerIdUsingGET_parameters.startTime : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_endTime;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_endTimeType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.endTime = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.endTime = !!getAuditLogsByCustomerIdUsingGET_parameters.endTime ? getAuditLogsByCustomerIdUsingGET_parameters.endTime : msg.payload;
                
                getAuditLogsByCustomerIdUsingGET_nodeParam = node.getAuditLogsByCustomerIdUsingGET_actionTypes;
                getAuditLogsByCustomerIdUsingGET_nodeParamType = node.getAuditLogsByCustomerIdUsingGET_actionTypesType;
                if (getAuditLogsByCustomerIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByCustomerIdUsingGET_parameters.actionTypes = getAuditLogsByCustomerIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByCustomerIdUsingGET_parameters.actionTypes = RED.util.getMessageProperty(msg, getAuditLogsByCustomerIdUsingGET_nodeParam);
                }
                getAuditLogsByCustomerIdUsingGET_parameters.actionTypes = !!getAuditLogsByCustomerIdUsingGET_parameters.actionTypes ? getAuditLogsByCustomerIdUsingGET_parameters.actionTypes : msg.payload;
                                result = client.getAuditLogsByCustomerIdUsingGET(getAuditLogsByCustomerIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAuditLogsByEntityIdUsingGET') {
                var getAuditLogsByEntityIdUsingGET_parameters = [];
                var getAuditLogsByEntityIdUsingGET_nodeParam;
                var getAuditLogsByEntityIdUsingGET_nodeParamType;

                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_entityType;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_entityTypeType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.entityType = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.entityType = !!getAuditLogsByEntityIdUsingGET_parameters.entityType ? getAuditLogsByEntityIdUsingGET_parameters.entityType : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_entityId;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_entityIdType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.entityId = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.entityId = !!getAuditLogsByEntityIdUsingGET_parameters.entityId ? getAuditLogsByEntityIdUsingGET_parameters.entityId : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_pageSize;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_pageSizeType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.pageSize = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.pageSize = !!getAuditLogsByEntityIdUsingGET_parameters.pageSize ? getAuditLogsByEntityIdUsingGET_parameters.pageSize : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_page;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_pageType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.page = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.page = !!getAuditLogsByEntityIdUsingGET_parameters.page ? getAuditLogsByEntityIdUsingGET_parameters.page : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_textSearch;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_textSearchType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.textSearch = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.textSearch = !!getAuditLogsByEntityIdUsingGET_parameters.textSearch ? getAuditLogsByEntityIdUsingGET_parameters.textSearch : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_sortProperty;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_sortPropertyType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.sortProperty = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.sortProperty = !!getAuditLogsByEntityIdUsingGET_parameters.sortProperty ? getAuditLogsByEntityIdUsingGET_parameters.sortProperty : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_sortOrder;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_sortOrderType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.sortOrder = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.sortOrder = !!getAuditLogsByEntityIdUsingGET_parameters.sortOrder ? getAuditLogsByEntityIdUsingGET_parameters.sortOrder : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_startTime;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_startTimeType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.startTime = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.startTime = !!getAuditLogsByEntityIdUsingGET_parameters.startTime ? getAuditLogsByEntityIdUsingGET_parameters.startTime : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_endTime;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_endTimeType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.endTime = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.endTime = !!getAuditLogsByEntityIdUsingGET_parameters.endTime ? getAuditLogsByEntityIdUsingGET_parameters.endTime : msg.payload;
                
                getAuditLogsByEntityIdUsingGET_nodeParam = node.getAuditLogsByEntityIdUsingGET_actionTypes;
                getAuditLogsByEntityIdUsingGET_nodeParamType = node.getAuditLogsByEntityIdUsingGET_actionTypesType;
                if (getAuditLogsByEntityIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByEntityIdUsingGET_parameters.actionTypes = getAuditLogsByEntityIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByEntityIdUsingGET_parameters.actionTypes = RED.util.getMessageProperty(msg, getAuditLogsByEntityIdUsingGET_nodeParam);
                }
                getAuditLogsByEntityIdUsingGET_parameters.actionTypes = !!getAuditLogsByEntityIdUsingGET_parameters.actionTypes ? getAuditLogsByEntityIdUsingGET_parameters.actionTypes : msg.payload;
                                result = client.getAuditLogsByEntityIdUsingGET(getAuditLogsByEntityIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAuditLogsByUserIdUsingGET') {
                var getAuditLogsByUserIdUsingGET_parameters = [];
                var getAuditLogsByUserIdUsingGET_nodeParam;
                var getAuditLogsByUserIdUsingGET_nodeParamType;

                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_userId;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_userIdType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.userId = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.userId = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.userId = !!getAuditLogsByUserIdUsingGET_parameters.userId ? getAuditLogsByUserIdUsingGET_parameters.userId : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_pageSize;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_pageSizeType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.pageSize = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.pageSize = !!getAuditLogsByUserIdUsingGET_parameters.pageSize ? getAuditLogsByUserIdUsingGET_parameters.pageSize : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_page;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_pageType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.page = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.page = !!getAuditLogsByUserIdUsingGET_parameters.page ? getAuditLogsByUserIdUsingGET_parameters.page : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_textSearch;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_textSearchType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.textSearch = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.textSearch = !!getAuditLogsByUserIdUsingGET_parameters.textSearch ? getAuditLogsByUserIdUsingGET_parameters.textSearch : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_sortProperty;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_sortPropertyType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.sortProperty = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.sortProperty = !!getAuditLogsByUserIdUsingGET_parameters.sortProperty ? getAuditLogsByUserIdUsingGET_parameters.sortProperty : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_sortOrder;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_sortOrderType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.sortOrder = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.sortOrder = !!getAuditLogsByUserIdUsingGET_parameters.sortOrder ? getAuditLogsByUserIdUsingGET_parameters.sortOrder : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_startTime;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_startTimeType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.startTime = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.startTime = !!getAuditLogsByUserIdUsingGET_parameters.startTime ? getAuditLogsByUserIdUsingGET_parameters.startTime : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_endTime;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_endTimeType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.endTime = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.endTime = !!getAuditLogsByUserIdUsingGET_parameters.endTime ? getAuditLogsByUserIdUsingGET_parameters.endTime : msg.payload;
                
                getAuditLogsByUserIdUsingGET_nodeParam = node.getAuditLogsByUserIdUsingGET_actionTypes;
                getAuditLogsByUserIdUsingGET_nodeParamType = node.getAuditLogsByUserIdUsingGET_actionTypesType;
                if (getAuditLogsByUserIdUsingGET_nodeParamType === 'str') {
                    getAuditLogsByUserIdUsingGET_parameters.actionTypes = getAuditLogsByUserIdUsingGET_nodeParam || '';
                } else {
                    getAuditLogsByUserIdUsingGET_parameters.actionTypes = RED.util.getMessageProperty(msg, getAuditLogsByUserIdUsingGET_nodeParam);
                }
                getAuditLogsByUserIdUsingGET_parameters.actionTypes = !!getAuditLogsByUserIdUsingGET_parameters.actionTypes ? getAuditLogsByUserIdUsingGET_parameters.actionTypes : msg.payload;
                                result = client.getAuditLogsByUserIdUsingGET(getAuditLogsByUserIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAuditLogsUsingGET') {
                var getAuditLogsUsingGET_parameters = [];
                var getAuditLogsUsingGET_nodeParam;
                var getAuditLogsUsingGET_nodeParamType;

                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_pageSize;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_pageSizeType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.pageSize = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.pageSize = !!getAuditLogsUsingGET_parameters.pageSize ? getAuditLogsUsingGET_parameters.pageSize : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_page;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_pageType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.page = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.page = !!getAuditLogsUsingGET_parameters.page ? getAuditLogsUsingGET_parameters.page : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_textSearch;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_textSearchType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.textSearch = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.textSearch = !!getAuditLogsUsingGET_parameters.textSearch ? getAuditLogsUsingGET_parameters.textSearch : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_sortProperty;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_sortPropertyType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.sortProperty = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.sortProperty = !!getAuditLogsUsingGET_parameters.sortProperty ? getAuditLogsUsingGET_parameters.sortProperty : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_sortOrder;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_sortOrderType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.sortOrder = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.sortOrder = !!getAuditLogsUsingGET_parameters.sortOrder ? getAuditLogsUsingGET_parameters.sortOrder : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_startTime;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_startTimeType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.startTime = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.startTime = !!getAuditLogsUsingGET_parameters.startTime ? getAuditLogsUsingGET_parameters.startTime : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_endTime;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_endTimeType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.endTime = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.endTime = !!getAuditLogsUsingGET_parameters.endTime ? getAuditLogsUsingGET_parameters.endTime : msg.payload;
                
                getAuditLogsUsingGET_nodeParam = node.getAuditLogsUsingGET_actionTypes;
                getAuditLogsUsingGET_nodeParamType = node.getAuditLogsUsingGET_actionTypesType;
                if (getAuditLogsUsingGET_nodeParamType === 'str') {
                    getAuditLogsUsingGET_parameters.actionTypes = getAuditLogsUsingGET_nodeParam || '';
                } else {
                    getAuditLogsUsingGET_parameters.actionTypes = RED.util.getMessageProperty(msg, getAuditLogsUsingGET_nodeParam);
                }
                getAuditLogsUsingGET_parameters.actionTypes = !!getAuditLogsUsingGET_parameters.actionTypes ? getAuditLogsUsingGET_parameters.actionTypes : msg.payload;
                                result = client.getAuditLogsUsingGET(getAuditLogsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'changePasswordUsingPOST') {
                var changePasswordUsingPOST_parameters = [];
                var changePasswordUsingPOST_nodeParam;
                var changePasswordUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    changePasswordUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.changePasswordUsingPOST(changePasswordUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'logoutUsingPOST') {
                var logoutUsingPOST_parameters = [];
                var logoutUsingPOST_nodeParam;
                var logoutUsingPOST_nodeParamType;
                result = client.logoutUsingPOST(logoutUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getUserUsingGET') {
                var getUserUsingGET_parameters = [];
                var getUserUsingGET_nodeParam;
                var getUserUsingGET_nodeParamType;
                result = client.getUserUsingGET(getUserUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'checkActivateTokenUsingGET') {
                var checkActivateTokenUsingGET_parameters = [];
                var checkActivateTokenUsingGET_nodeParam;
                var checkActivateTokenUsingGET_nodeParamType;

                checkActivateTokenUsingGET_nodeParam = node.checkActivateTokenUsingGET_activateToken;
                checkActivateTokenUsingGET_nodeParamType = node.checkActivateTokenUsingGET_activateTokenType;
                if (checkActivateTokenUsingGET_nodeParamType === 'str') {
                    checkActivateTokenUsingGET_parameters.activateToken = checkActivateTokenUsingGET_nodeParam || '';
                } else {
                    checkActivateTokenUsingGET_parameters.activateToken = RED.util.getMessageProperty(msg, checkActivateTokenUsingGET_nodeParam);
                }
                checkActivateTokenUsingGET_parameters.activateToken = !!checkActivateTokenUsingGET_parameters.activateToken ? checkActivateTokenUsingGET_parameters.activateToken : msg.payload;
                                result = client.checkActivateTokenUsingGET(checkActivateTokenUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'activateUserUsingPOST') {
                var activateUserUsingPOST_parameters = [];
                var activateUserUsingPOST_nodeParam;
                var activateUserUsingPOST_nodeParamType;

                activateUserUsingPOST_nodeParam = node.activateUserUsingPOST_sendActivationMail;
                activateUserUsingPOST_nodeParamType = node.activateUserUsingPOST_sendActivationMailType;
                if (activateUserUsingPOST_nodeParamType === 'str') {
                    activateUserUsingPOST_parameters.sendActivationMail = activateUserUsingPOST_nodeParam || '';
                } else {
                    activateUserUsingPOST_parameters.sendActivationMail = RED.util.getMessageProperty(msg, activateUserUsingPOST_nodeParam);
                }
                activateUserUsingPOST_parameters.sendActivationMail = !!activateUserUsingPOST_parameters.sendActivationMail ? activateUserUsingPOST_parameters.sendActivationMail : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    activateUserUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.activateUserUsingPOST(activateUserUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'resetPasswordUsingPOST') {
                var resetPasswordUsingPOST_parameters = [];
                var resetPasswordUsingPOST_nodeParam;
                var resetPasswordUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    resetPasswordUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.resetPasswordUsingPOST(resetPasswordUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'requestResetPasswordByEmailUsingPOST') {
                var requestResetPasswordByEmailUsingPOST_parameters = [];
                var requestResetPasswordByEmailUsingPOST_nodeParam;
                var requestResetPasswordByEmailUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    requestResetPasswordByEmailUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.requestResetPasswordByEmailUsingPOST(requestResetPasswordByEmailUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'checkResetTokenUsingGET') {
                var checkResetTokenUsingGET_parameters = [];
                var checkResetTokenUsingGET_nodeParam;
                var checkResetTokenUsingGET_nodeParamType;

                checkResetTokenUsingGET_nodeParam = node.checkResetTokenUsingGET_resetToken;
                checkResetTokenUsingGET_nodeParamType = node.checkResetTokenUsingGET_resetTokenType;
                if (checkResetTokenUsingGET_nodeParamType === 'str') {
                    checkResetTokenUsingGET_parameters.resetToken = checkResetTokenUsingGET_nodeParam || '';
                } else {
                    checkResetTokenUsingGET_parameters.resetToken = RED.util.getMessageProperty(msg, checkResetTokenUsingGET_nodeParam);
                }
                checkResetTokenUsingGET_parameters.resetToken = !!checkResetTokenUsingGET_parameters.resetToken ? checkResetTokenUsingGET_parameters.resetToken : msg.payload;
                                result = client.checkResetTokenUsingGET(checkResetTokenUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserPasswordPolicyUsingGET') {
                var getUserPasswordPolicyUsingGET_parameters = [];
                var getUserPasswordPolicyUsingGET_nodeParam;
                var getUserPasswordPolicyUsingGET_nodeParamType;
                result = client.getUserPasswordPolicyUsingGET(getUserPasswordPolicyUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getBlobEntitiesByIdsUsingGET') {
                var getBlobEntitiesByIdsUsingGET_parameters = [];
                var getBlobEntitiesByIdsUsingGET_nodeParam;
                var getBlobEntitiesByIdsUsingGET_nodeParamType;

                getBlobEntitiesByIdsUsingGET_nodeParam = node.getBlobEntitiesByIdsUsingGET_blobEntityIds;
                getBlobEntitiesByIdsUsingGET_nodeParamType = node.getBlobEntitiesByIdsUsingGET_blobEntityIdsType;
                if (getBlobEntitiesByIdsUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesByIdsUsingGET_parameters.blobEntityIds = getBlobEntitiesByIdsUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesByIdsUsingGET_parameters.blobEntityIds = RED.util.getMessageProperty(msg, getBlobEntitiesByIdsUsingGET_nodeParam);
                }
                getBlobEntitiesByIdsUsingGET_parameters.blobEntityIds = !!getBlobEntitiesByIdsUsingGET_parameters.blobEntityIds ? getBlobEntitiesByIdsUsingGET_parameters.blobEntityIds : msg.payload;
                                result = client.getBlobEntitiesByIdsUsingGET(getBlobEntitiesByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getBlobEntitiesUsingGET') {
                var getBlobEntitiesUsingGET_parameters = [];
                var getBlobEntitiesUsingGET_nodeParam;
                var getBlobEntitiesUsingGET_nodeParamType;

                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_pageSize;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_pageSizeType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.pageSize = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.pageSize = !!getBlobEntitiesUsingGET_parameters.pageSize ? getBlobEntitiesUsingGET_parameters.pageSize : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_page;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_pageType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.page = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.page = !!getBlobEntitiesUsingGET_parameters.page ? getBlobEntitiesUsingGET_parameters.page : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_type;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_typeType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.type = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.type = !!getBlobEntitiesUsingGET_parameters.type ? getBlobEntitiesUsingGET_parameters.type : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_textSearch;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_textSearchType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.textSearch = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.textSearch = !!getBlobEntitiesUsingGET_parameters.textSearch ? getBlobEntitiesUsingGET_parameters.textSearch : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_sortProperty;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_sortPropertyType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.sortProperty = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.sortProperty = !!getBlobEntitiesUsingGET_parameters.sortProperty ? getBlobEntitiesUsingGET_parameters.sortProperty : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_sortOrder;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_sortOrderType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.sortOrder = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.sortOrder = !!getBlobEntitiesUsingGET_parameters.sortOrder ? getBlobEntitiesUsingGET_parameters.sortOrder : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_startTime;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_startTimeType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.startTime = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.startTime = !!getBlobEntitiesUsingGET_parameters.startTime ? getBlobEntitiesUsingGET_parameters.startTime : msg.payload;
                
                getBlobEntitiesUsingGET_nodeParam = node.getBlobEntitiesUsingGET_endTime;
                getBlobEntitiesUsingGET_nodeParamType = node.getBlobEntitiesUsingGET_endTimeType;
                if (getBlobEntitiesUsingGET_nodeParamType === 'str') {
                    getBlobEntitiesUsingGET_parameters.endTime = getBlobEntitiesUsingGET_nodeParam || '';
                } else {
                    getBlobEntitiesUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getBlobEntitiesUsingGET_nodeParam);
                }
                getBlobEntitiesUsingGET_parameters.endTime = !!getBlobEntitiesUsingGET_parameters.endTime ? getBlobEntitiesUsingGET_parameters.endTime : msg.payload;
                                result = client.getBlobEntitiesUsingGET(getBlobEntitiesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getBlobEntityInfoByIdUsingGET') {
                var getBlobEntityInfoByIdUsingGET_parameters = [];
                var getBlobEntityInfoByIdUsingGET_nodeParam;
                var getBlobEntityInfoByIdUsingGET_nodeParamType;

                getBlobEntityInfoByIdUsingGET_nodeParam = node.getBlobEntityInfoByIdUsingGET_blobEntityId;
                getBlobEntityInfoByIdUsingGET_nodeParamType = node.getBlobEntityInfoByIdUsingGET_blobEntityIdType;
                if (getBlobEntityInfoByIdUsingGET_nodeParamType === 'str') {
                    getBlobEntityInfoByIdUsingGET_parameters.blobEntityId = getBlobEntityInfoByIdUsingGET_nodeParam || '';
                } else {
                    getBlobEntityInfoByIdUsingGET_parameters.blobEntityId = RED.util.getMessageProperty(msg, getBlobEntityInfoByIdUsingGET_nodeParam);
                }
                getBlobEntityInfoByIdUsingGET_parameters.blobEntityId = !!getBlobEntityInfoByIdUsingGET_parameters.blobEntityId ? getBlobEntityInfoByIdUsingGET_parameters.blobEntityId : msg.payload;
                                result = client.getBlobEntityInfoByIdUsingGET(getBlobEntityInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteBlobEntityUsingDELETE') {
                var deleteBlobEntityUsingDELETE_parameters = [];
                var deleteBlobEntityUsingDELETE_nodeParam;
                var deleteBlobEntityUsingDELETE_nodeParamType;

                deleteBlobEntityUsingDELETE_nodeParam = node.deleteBlobEntityUsingDELETE_blobEntityId;
                deleteBlobEntityUsingDELETE_nodeParamType = node.deleteBlobEntityUsingDELETE_blobEntityIdType;
                if (deleteBlobEntityUsingDELETE_nodeParamType === 'str') {
                    deleteBlobEntityUsingDELETE_parameters.blobEntityId = deleteBlobEntityUsingDELETE_nodeParam || '';
                } else {
                    deleteBlobEntityUsingDELETE_parameters.blobEntityId = RED.util.getMessageProperty(msg, deleteBlobEntityUsingDELETE_nodeParam);
                }
                deleteBlobEntityUsingDELETE_parameters.blobEntityId = !!deleteBlobEntityUsingDELETE_parameters.blobEntityId ? deleteBlobEntityUsingDELETE_parameters.blobEntityId : msg.payload;
                                result = client.deleteBlobEntityUsingDELETE(deleteBlobEntityUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'downloadBlobEntityUsingGET') {
                var downloadBlobEntityUsingGET_parameters = [];
                var downloadBlobEntityUsingGET_nodeParam;
                var downloadBlobEntityUsingGET_nodeParamType;

                downloadBlobEntityUsingGET_nodeParam = node.downloadBlobEntityUsingGET_blobEntityId;
                downloadBlobEntityUsingGET_nodeParamType = node.downloadBlobEntityUsingGET_blobEntityIdType;
                if (downloadBlobEntityUsingGET_nodeParamType === 'str') {
                    downloadBlobEntityUsingGET_parameters.blobEntityId = downloadBlobEntityUsingGET_nodeParam || '';
                } else {
                    downloadBlobEntityUsingGET_parameters.blobEntityId = RED.util.getMessageProperty(msg, downloadBlobEntityUsingGET_nodeParam);
                }
                downloadBlobEntityUsingGET_parameters.blobEntityId = !!downloadBlobEntityUsingGET_parameters.blobEntityId ? downloadBlobEntityUsingGET_parameters.blobEntityId : msg.payload;
                                result = client.downloadBlobEntityUsingGET(downloadBlobEntityUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getComponentDescriptorByClazzUsingGET') {
                var getComponentDescriptorByClazzUsingGET_parameters = [];
                var getComponentDescriptorByClazzUsingGET_nodeParam;
                var getComponentDescriptorByClazzUsingGET_nodeParamType;

                getComponentDescriptorByClazzUsingGET_nodeParam = node.getComponentDescriptorByClazzUsingGET_componentDescriptorClazz;
                getComponentDescriptorByClazzUsingGET_nodeParamType = node.getComponentDescriptorByClazzUsingGET_componentDescriptorClazzType;
                if (getComponentDescriptorByClazzUsingGET_nodeParamType === 'str') {
                    getComponentDescriptorByClazzUsingGET_parameters.componentDescriptorClazz = getComponentDescriptorByClazzUsingGET_nodeParam || '';
                } else {
                    getComponentDescriptorByClazzUsingGET_parameters.componentDescriptorClazz = RED.util.getMessageProperty(msg, getComponentDescriptorByClazzUsingGET_nodeParam);
                }
                getComponentDescriptorByClazzUsingGET_parameters.componentDescriptorClazz = !!getComponentDescriptorByClazzUsingGET_parameters.componentDescriptorClazz ? getComponentDescriptorByClazzUsingGET_parameters.componentDescriptorClazz : msg.payload;
                                result = client.getComponentDescriptorByClazzUsingGET(getComponentDescriptorByClazzUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getComponentDescriptorsByTypeUsingGET') {
                var getComponentDescriptorsByTypeUsingGET_parameters = [];
                var getComponentDescriptorsByTypeUsingGET_nodeParam;
                var getComponentDescriptorsByTypeUsingGET_nodeParamType;

                getComponentDescriptorsByTypeUsingGET_nodeParam = node.getComponentDescriptorsByTypeUsingGET_componentType;
                getComponentDescriptorsByTypeUsingGET_nodeParamType = node.getComponentDescriptorsByTypeUsingGET_componentTypeType;
                if (getComponentDescriptorsByTypeUsingGET_nodeParamType === 'str') {
                    getComponentDescriptorsByTypeUsingGET_parameters.componentType = getComponentDescriptorsByTypeUsingGET_nodeParam || '';
                } else {
                    getComponentDescriptorsByTypeUsingGET_parameters.componentType = RED.util.getMessageProperty(msg, getComponentDescriptorsByTypeUsingGET_nodeParam);
                }
                getComponentDescriptorsByTypeUsingGET_parameters.componentType = !!getComponentDescriptorsByTypeUsingGET_parameters.componentType ? getComponentDescriptorsByTypeUsingGET_parameters.componentType : msg.payload;
                
                getComponentDescriptorsByTypeUsingGET_nodeParam = node.getComponentDescriptorsByTypeUsingGET_ruleChainType;
                getComponentDescriptorsByTypeUsingGET_nodeParamType = node.getComponentDescriptorsByTypeUsingGET_ruleChainTypeType;
                if (getComponentDescriptorsByTypeUsingGET_nodeParamType === 'str') {
                    getComponentDescriptorsByTypeUsingGET_parameters.ruleChainType = getComponentDescriptorsByTypeUsingGET_nodeParam || '';
                } else {
                    getComponentDescriptorsByTypeUsingGET_parameters.ruleChainType = RED.util.getMessageProperty(msg, getComponentDescriptorsByTypeUsingGET_nodeParam);
                }
                getComponentDescriptorsByTypeUsingGET_parameters.ruleChainType = !!getComponentDescriptorsByTypeUsingGET_parameters.ruleChainType ? getComponentDescriptorsByTypeUsingGET_parameters.ruleChainType : msg.payload;
                                result = client.getComponentDescriptorsByTypeUsingGET(getComponentDescriptorsByTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getComponentDescriptorsByTypesUsingGET') {
                var getComponentDescriptorsByTypesUsingGET_parameters = [];
                var getComponentDescriptorsByTypesUsingGET_nodeParam;
                var getComponentDescriptorsByTypesUsingGET_nodeParamType;

                getComponentDescriptorsByTypesUsingGET_nodeParam = node.getComponentDescriptorsByTypesUsingGET_componentTypes;
                getComponentDescriptorsByTypesUsingGET_nodeParamType = node.getComponentDescriptorsByTypesUsingGET_componentTypesType;
                if (getComponentDescriptorsByTypesUsingGET_nodeParamType === 'str') {
                    getComponentDescriptorsByTypesUsingGET_parameters.componentTypes = getComponentDescriptorsByTypesUsingGET_nodeParam || '';
                } else {
                    getComponentDescriptorsByTypesUsingGET_parameters.componentTypes = RED.util.getMessageProperty(msg, getComponentDescriptorsByTypesUsingGET_nodeParam);
                }
                getComponentDescriptorsByTypesUsingGET_parameters.componentTypes = !!getComponentDescriptorsByTypesUsingGET_parameters.componentTypes ? getComponentDescriptorsByTypesUsingGET_parameters.componentTypes : msg.payload;
                
                getComponentDescriptorsByTypesUsingGET_nodeParam = node.getComponentDescriptorsByTypesUsingGET_ruleChainType;
                getComponentDescriptorsByTypesUsingGET_nodeParamType = node.getComponentDescriptorsByTypesUsingGET_ruleChainTypeType;
                if (getComponentDescriptorsByTypesUsingGET_nodeParamType === 'str') {
                    getComponentDescriptorsByTypesUsingGET_parameters.ruleChainType = getComponentDescriptorsByTypesUsingGET_nodeParam || '';
                } else {
                    getComponentDescriptorsByTypesUsingGET_parameters.ruleChainType = RED.util.getMessageProperty(msg, getComponentDescriptorsByTypesUsingGET_nodeParam);
                }
                getComponentDescriptorsByTypesUsingGET_parameters.ruleChainType = !!getComponentDescriptorsByTypesUsingGET_parameters.ruleChainType ? getComponentDescriptorsByTypesUsingGET_parameters.ruleChainType : msg.payload;
                                result = client.getComponentDescriptorsByTypesUsingGET(getComponentDescriptorsByTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveConverterUsingPOST') {
                var saveConverterUsingPOST_parameters = [];
                var saveConverterUsingPOST_nodeParam;
                var saveConverterUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveConverterUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveConverterUsingPOST(saveConverterUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'testDownLinkConverterUsingPOST') {
                var testDownLinkConverterUsingPOST_parameters = [];
                var testDownLinkConverterUsingPOST_nodeParam;
                var testDownLinkConverterUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    testDownLinkConverterUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.testDownLinkConverterUsingPOST(testDownLinkConverterUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'testUpLinkConverterUsingPOST') {
                var testUpLinkConverterUsingPOST_parameters = [];
                var testUpLinkConverterUsingPOST_nodeParam;
                var testUpLinkConverterUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    testUpLinkConverterUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.testUpLinkConverterUsingPOST(testUpLinkConverterUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getConverterByIdUsingGET') {
                var getConverterByIdUsingGET_parameters = [];
                var getConverterByIdUsingGET_nodeParam;
                var getConverterByIdUsingGET_nodeParamType;

                getConverterByIdUsingGET_nodeParam = node.getConverterByIdUsingGET_converterId;
                getConverterByIdUsingGET_nodeParamType = node.getConverterByIdUsingGET_converterIdType;
                if (getConverterByIdUsingGET_nodeParamType === 'str') {
                    getConverterByIdUsingGET_parameters.converterId = getConverterByIdUsingGET_nodeParam || '';
                } else {
                    getConverterByIdUsingGET_parameters.converterId = RED.util.getMessageProperty(msg, getConverterByIdUsingGET_nodeParam);
                }
                getConverterByIdUsingGET_parameters.converterId = !!getConverterByIdUsingGET_parameters.converterId ? getConverterByIdUsingGET_parameters.converterId : msg.payload;
                                result = client.getConverterByIdUsingGET(getConverterByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteConverterUsingDELETE') {
                var deleteConverterUsingDELETE_parameters = [];
                var deleteConverterUsingDELETE_nodeParam;
                var deleteConverterUsingDELETE_nodeParamType;

                deleteConverterUsingDELETE_nodeParam = node.deleteConverterUsingDELETE_converterId;
                deleteConverterUsingDELETE_nodeParamType = node.deleteConverterUsingDELETE_converterIdType;
                if (deleteConverterUsingDELETE_nodeParamType === 'str') {
                    deleteConverterUsingDELETE_parameters.converterId = deleteConverterUsingDELETE_nodeParam || '';
                } else {
                    deleteConverterUsingDELETE_parameters.converterId = RED.util.getMessageProperty(msg, deleteConverterUsingDELETE_nodeParam);
                }
                deleteConverterUsingDELETE_parameters.converterId = !!deleteConverterUsingDELETE_parameters.converterId ? deleteConverterUsingDELETE_parameters.converterId : msg.payload;
                                result = client.deleteConverterUsingDELETE(deleteConverterUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getLatestConverterDebugInputUsingGET') {
                var getLatestConverterDebugInputUsingGET_parameters = [];
                var getLatestConverterDebugInputUsingGET_nodeParam;
                var getLatestConverterDebugInputUsingGET_nodeParamType;

                getLatestConverterDebugInputUsingGET_nodeParam = node.getLatestConverterDebugInputUsingGET_converterId;
                getLatestConverterDebugInputUsingGET_nodeParamType = node.getLatestConverterDebugInputUsingGET_converterIdType;
                if (getLatestConverterDebugInputUsingGET_nodeParamType === 'str') {
                    getLatestConverterDebugInputUsingGET_parameters.converterId = getLatestConverterDebugInputUsingGET_nodeParam || '';
                } else {
                    getLatestConverterDebugInputUsingGET_parameters.converterId = RED.util.getMessageProperty(msg, getLatestConverterDebugInputUsingGET_nodeParam);
                }
                getLatestConverterDebugInputUsingGET_parameters.converterId = !!getLatestConverterDebugInputUsingGET_parameters.converterId ? getLatestConverterDebugInputUsingGET_parameters.converterId : msg.payload;
                                result = client.getLatestConverterDebugInputUsingGET(getLatestConverterDebugInputUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getConvertersByIdsUsingGET') {
                var getConvertersByIdsUsingGET_parameters = [];
                var getConvertersByIdsUsingGET_nodeParam;
                var getConvertersByIdsUsingGET_nodeParamType;

                getConvertersByIdsUsingGET_nodeParam = node.getConvertersByIdsUsingGET_converterIds;
                getConvertersByIdsUsingGET_nodeParamType = node.getConvertersByIdsUsingGET_converterIdsType;
                if (getConvertersByIdsUsingGET_nodeParamType === 'str') {
                    getConvertersByIdsUsingGET_parameters.converterIds = getConvertersByIdsUsingGET_nodeParam || '';
                } else {
                    getConvertersByIdsUsingGET_parameters.converterIds = RED.util.getMessageProperty(msg, getConvertersByIdsUsingGET_nodeParam);
                }
                getConvertersByIdsUsingGET_parameters.converterIds = !!getConvertersByIdsUsingGET_parameters.converterIds ? getConvertersByIdsUsingGET_parameters.converterIds : msg.payload;
                                result = client.getConvertersByIdsUsingGET(getConvertersByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getConvertersUsingGET') {
                var getConvertersUsingGET_parameters = [];
                var getConvertersUsingGET_nodeParam;
                var getConvertersUsingGET_nodeParamType;

                getConvertersUsingGET_nodeParam = node.getConvertersUsingGET_pageSize;
                getConvertersUsingGET_nodeParamType = node.getConvertersUsingGET_pageSizeType;
                if (getConvertersUsingGET_nodeParamType === 'str') {
                    getConvertersUsingGET_parameters.pageSize = getConvertersUsingGET_nodeParam || '';
                } else {
                    getConvertersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getConvertersUsingGET_nodeParam);
                }
                getConvertersUsingGET_parameters.pageSize = !!getConvertersUsingGET_parameters.pageSize ? getConvertersUsingGET_parameters.pageSize : msg.payload;
                
                getConvertersUsingGET_nodeParam = node.getConvertersUsingGET_page;
                getConvertersUsingGET_nodeParamType = node.getConvertersUsingGET_pageType;
                if (getConvertersUsingGET_nodeParamType === 'str') {
                    getConvertersUsingGET_parameters.page = getConvertersUsingGET_nodeParam || '';
                } else {
                    getConvertersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getConvertersUsingGET_nodeParam);
                }
                getConvertersUsingGET_parameters.page = !!getConvertersUsingGET_parameters.page ? getConvertersUsingGET_parameters.page : msg.payload;
                
                getConvertersUsingGET_nodeParam = node.getConvertersUsingGET_textSearch;
                getConvertersUsingGET_nodeParamType = node.getConvertersUsingGET_textSearchType;
                if (getConvertersUsingGET_nodeParamType === 'str') {
                    getConvertersUsingGET_parameters.textSearch = getConvertersUsingGET_nodeParam || '';
                } else {
                    getConvertersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getConvertersUsingGET_nodeParam);
                }
                getConvertersUsingGET_parameters.textSearch = !!getConvertersUsingGET_parameters.textSearch ? getConvertersUsingGET_parameters.textSearch : msg.payload;
                
                getConvertersUsingGET_nodeParam = node.getConvertersUsingGET_sortProperty;
                getConvertersUsingGET_nodeParamType = node.getConvertersUsingGET_sortPropertyType;
                if (getConvertersUsingGET_nodeParamType === 'str') {
                    getConvertersUsingGET_parameters.sortProperty = getConvertersUsingGET_nodeParam || '';
                } else {
                    getConvertersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getConvertersUsingGET_nodeParam);
                }
                getConvertersUsingGET_parameters.sortProperty = !!getConvertersUsingGET_parameters.sortProperty ? getConvertersUsingGET_parameters.sortProperty : msg.payload;
                
                getConvertersUsingGET_nodeParam = node.getConvertersUsingGET_sortOrder;
                getConvertersUsingGET_nodeParamType = node.getConvertersUsingGET_sortOrderType;
                if (getConvertersUsingGET_nodeParamType === 'str') {
                    getConvertersUsingGET_parameters.sortOrder = getConvertersUsingGET_nodeParam || '';
                } else {
                    getConvertersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getConvertersUsingGET_nodeParam);
                }
                getConvertersUsingGET_parameters.sortOrder = !!getConvertersUsingGET_parameters.sortOrder ? getConvertersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getConvertersUsingGET(getConvertersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCurrentCustomMenuUsingGET') {
                var getCurrentCustomMenuUsingGET_parameters = [];
                var getCurrentCustomMenuUsingGET_nodeParam;
                var getCurrentCustomMenuUsingGET_nodeParamType;
                result = client.getCurrentCustomMenuUsingGET(getCurrentCustomMenuUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomMenuUsingGET') {
                var getCustomMenuUsingGET_parameters = [];
                var getCustomMenuUsingGET_nodeParam;
                var getCustomMenuUsingGET_nodeParamType;
                result = client.getCustomMenuUsingGET(getCustomMenuUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveCustomMenuUsingPOST') {
                var saveCustomMenuUsingPOST_parameters = [];
                var saveCustomMenuUsingPOST_nodeParam;
                var saveCustomMenuUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveCustomMenuUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveCustomMenuUsingPOST(saveCustomMenuUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCurrentCustomTranslationUsingGET') {
                var getCurrentCustomTranslationUsingGET_parameters = [];
                var getCurrentCustomTranslationUsingGET_nodeParam;
                var getCurrentCustomTranslationUsingGET_nodeParamType;
                result = client.getCurrentCustomTranslationUsingGET(getCurrentCustomTranslationUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomTranslationUsingGET') {
                var getCustomTranslationUsingGET_parameters = [];
                var getCustomTranslationUsingGET_nodeParam;
                var getCustomTranslationUsingGET_nodeParamType;
                result = client.getCustomTranslationUsingGET(getCustomTranslationUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveCustomTranslationUsingPOST') {
                var saveCustomTranslationUsingPOST_parameters = [];
                var saveCustomTranslationUsingPOST_nodeParam;
                var saveCustomTranslationUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveCustomTranslationUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveCustomTranslationUsingPOST(saveCustomTranslationUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerByIdUsingGET') {
                var getCustomerByIdUsingGET_parameters = [];
                var getCustomerByIdUsingGET_nodeParam;
                var getCustomerByIdUsingGET_nodeParamType;

                getCustomerByIdUsingGET_nodeParam = node.getCustomerByIdUsingGET_customerId;
                getCustomerByIdUsingGET_nodeParamType = node.getCustomerByIdUsingGET_customerIdType;
                if (getCustomerByIdUsingGET_nodeParamType === 'str') {
                    getCustomerByIdUsingGET_parameters.customerId = getCustomerByIdUsingGET_nodeParam || '';
                } else {
                    getCustomerByIdUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerByIdUsingGET_nodeParam);
                }
                getCustomerByIdUsingGET_parameters.customerId = !!getCustomerByIdUsingGET_parameters.customerId ? getCustomerByIdUsingGET_parameters.customerId : msg.payload;
                                result = client.getCustomerByIdUsingGET(getCustomerByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteCustomerUsingDELETE') {
                var deleteCustomerUsingDELETE_parameters = [];
                var deleteCustomerUsingDELETE_nodeParam;
                var deleteCustomerUsingDELETE_nodeParamType;

                deleteCustomerUsingDELETE_nodeParam = node.deleteCustomerUsingDELETE_customerId;
                deleteCustomerUsingDELETE_nodeParamType = node.deleteCustomerUsingDELETE_customerIdType;
                if (deleteCustomerUsingDELETE_nodeParamType === 'str') {
                    deleteCustomerUsingDELETE_parameters.customerId = deleteCustomerUsingDELETE_nodeParam || '';
                } else {
                    deleteCustomerUsingDELETE_parameters.customerId = RED.util.getMessageProperty(msg, deleteCustomerUsingDELETE_nodeParam);
                }
                deleteCustomerUsingDELETE_parameters.customerId = !!deleteCustomerUsingDELETE_parameters.customerId ? deleteCustomerUsingDELETE_parameters.customerId : msg.payload;
                                result = client.deleteCustomerUsingDELETE(deleteCustomerUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getShortCustomerInfoByIdUsingGET') {
                var getShortCustomerInfoByIdUsingGET_parameters = [];
                var getShortCustomerInfoByIdUsingGET_nodeParam;
                var getShortCustomerInfoByIdUsingGET_nodeParamType;

                getShortCustomerInfoByIdUsingGET_nodeParam = node.getShortCustomerInfoByIdUsingGET_customerId;
                getShortCustomerInfoByIdUsingGET_nodeParamType = node.getShortCustomerInfoByIdUsingGET_customerIdType;
                if (getShortCustomerInfoByIdUsingGET_nodeParamType === 'str') {
                    getShortCustomerInfoByIdUsingGET_parameters.customerId = getShortCustomerInfoByIdUsingGET_nodeParam || '';
                } else {
                    getShortCustomerInfoByIdUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getShortCustomerInfoByIdUsingGET_nodeParam);
                }
                getShortCustomerInfoByIdUsingGET_parameters.customerId = !!getShortCustomerInfoByIdUsingGET_parameters.customerId ? getShortCustomerInfoByIdUsingGET_parameters.customerId : msg.payload;
                                result = client.getShortCustomerInfoByIdUsingGET(getShortCustomerInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerTitleByIdUsingGET') {
                var getCustomerTitleByIdUsingGET_parameters = [];
                var getCustomerTitleByIdUsingGET_nodeParam;
                var getCustomerTitleByIdUsingGET_nodeParamType;

                getCustomerTitleByIdUsingGET_nodeParam = node.getCustomerTitleByIdUsingGET_customerId;
                getCustomerTitleByIdUsingGET_nodeParamType = node.getCustomerTitleByIdUsingGET_customerIdType;
                if (getCustomerTitleByIdUsingGET_nodeParamType === 'str') {
                    getCustomerTitleByIdUsingGET_parameters.customerId = getCustomerTitleByIdUsingGET_nodeParam || '';
                } else {
                    getCustomerTitleByIdUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerTitleByIdUsingGET_nodeParam);
                }
                getCustomerTitleByIdUsingGET_parameters.customerId = !!getCustomerTitleByIdUsingGET_parameters.customerId ? getCustomerTitleByIdUsingGET_parameters.customerId : msg.payload;
                                result = client.getCustomerTitleByIdUsingGET(getCustomerTitleByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomersByIdsUsingGET') {
                var getCustomersByIdsUsingGET_parameters = [];
                var getCustomersByIdsUsingGET_nodeParam;
                var getCustomersByIdsUsingGET_nodeParamType;

                getCustomersByIdsUsingGET_nodeParam = node.getCustomersByIdsUsingGET_customerIds;
                getCustomersByIdsUsingGET_nodeParamType = node.getCustomersByIdsUsingGET_customerIdsType;
                if (getCustomersByIdsUsingGET_nodeParamType === 'str') {
                    getCustomersByIdsUsingGET_parameters.customerIds = getCustomersByIdsUsingGET_nodeParam || '';
                } else {
                    getCustomersByIdsUsingGET_parameters.customerIds = RED.util.getMessageProperty(msg, getCustomersByIdsUsingGET_nodeParam);
                }
                getCustomersByIdsUsingGET_parameters.customerIds = !!getCustomersByIdsUsingGET_parameters.customerIds ? getCustomersByIdsUsingGET_parameters.customerIds : msg.payload;
                                result = client.getCustomersByIdsUsingGET(getCustomersByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomersUsingGET') {
                var getCustomersUsingGET_parameters = [];
                var getCustomersUsingGET_nodeParam;
                var getCustomersUsingGET_nodeParamType;

                getCustomersUsingGET_nodeParam = node.getCustomersUsingGET_pageSize;
                getCustomersUsingGET_nodeParamType = node.getCustomersUsingGET_pageSizeType;
                if (getCustomersUsingGET_nodeParamType === 'str') {
                    getCustomersUsingGET_parameters.pageSize = getCustomersUsingGET_nodeParam || '';
                } else {
                    getCustomersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomersUsingGET_nodeParam);
                }
                getCustomersUsingGET_parameters.pageSize = !!getCustomersUsingGET_parameters.pageSize ? getCustomersUsingGET_parameters.pageSize : msg.payload;
                
                getCustomersUsingGET_nodeParam = node.getCustomersUsingGET_page;
                getCustomersUsingGET_nodeParamType = node.getCustomersUsingGET_pageType;
                if (getCustomersUsingGET_nodeParamType === 'str') {
                    getCustomersUsingGET_parameters.page = getCustomersUsingGET_nodeParam || '';
                } else {
                    getCustomersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomersUsingGET_nodeParam);
                }
                getCustomersUsingGET_parameters.page = !!getCustomersUsingGET_parameters.page ? getCustomersUsingGET_parameters.page : msg.payload;
                
                getCustomersUsingGET_nodeParam = node.getCustomersUsingGET_textSearch;
                getCustomersUsingGET_nodeParamType = node.getCustomersUsingGET_textSearchType;
                if (getCustomersUsingGET_nodeParamType === 'str') {
                    getCustomersUsingGET_parameters.textSearch = getCustomersUsingGET_nodeParam || '';
                } else {
                    getCustomersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomersUsingGET_nodeParam);
                }
                getCustomersUsingGET_parameters.textSearch = !!getCustomersUsingGET_parameters.textSearch ? getCustomersUsingGET_parameters.textSearch : msg.payload;
                
                getCustomersUsingGET_nodeParam = node.getCustomersUsingGET_sortProperty;
                getCustomersUsingGET_nodeParamType = node.getCustomersUsingGET_sortPropertyType;
                if (getCustomersUsingGET_nodeParamType === 'str') {
                    getCustomersUsingGET_parameters.sortProperty = getCustomersUsingGET_nodeParam || '';
                } else {
                    getCustomersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomersUsingGET_nodeParam);
                }
                getCustomersUsingGET_parameters.sortProperty = !!getCustomersUsingGET_parameters.sortProperty ? getCustomersUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomersUsingGET_nodeParam = node.getCustomersUsingGET_sortOrder;
                getCustomersUsingGET_nodeParamType = node.getCustomersUsingGET_sortOrderType;
                if (getCustomersUsingGET_nodeParamType === 'str') {
                    getCustomersUsingGET_parameters.sortOrder = getCustomersUsingGET_nodeParam || '';
                } else {
                    getCustomersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomersUsingGET_nodeParam);
                }
                getCustomersUsingGET_parameters.sortOrder = !!getCustomersUsingGET_parameters.sortOrder ? getCustomersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomersUsingGET(getCustomersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveCustomerUsingPOST') {
                var saveCustomerUsingPOST_parameters = [];
                var saveCustomerUsingPOST_nodeParam;
                var saveCustomerUsingPOST_nodeParamType;

                saveCustomerUsingPOST_nodeParam = node.saveCustomerUsingPOST_entityGroupId;
                saveCustomerUsingPOST_nodeParamType = node.saveCustomerUsingPOST_entityGroupIdType;
                if (saveCustomerUsingPOST_nodeParamType === 'str') {
                    saveCustomerUsingPOST_parameters.entityGroupId = saveCustomerUsingPOST_nodeParam || '';
                } else {
                    saveCustomerUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveCustomerUsingPOST_nodeParam);
                }
                saveCustomerUsingPOST_parameters.entityGroupId = !!saveCustomerUsingPOST_parameters.entityGroupId ? saveCustomerUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveCustomerUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveCustomerUsingPOST(saveCustomerUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCustomersByEntityGroupIdUsingGET') {
                var getCustomersByEntityGroupIdUsingGET_parameters = [];
                var getCustomersByEntityGroupIdUsingGET_nodeParam;
                var getCustomersByEntityGroupIdUsingGET_nodeParamType;

                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_entityGroupId;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_entityGroupIdType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.entityGroupId = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.entityGroupId = !!getCustomersByEntityGroupIdUsingGET_parameters.entityGroupId ? getCustomersByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_pageSize;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_pageSizeType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.pageSize = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.pageSize = !!getCustomersByEntityGroupIdUsingGET_parameters.pageSize ? getCustomersByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_page;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_pageType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.page = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.page = !!getCustomersByEntityGroupIdUsingGET_parameters.page ? getCustomersByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_textSearch;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_textSearchType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.textSearch = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.textSearch = !!getCustomersByEntityGroupIdUsingGET_parameters.textSearch ? getCustomersByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_sortProperty;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_sortPropertyType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.sortProperty = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.sortProperty = !!getCustomersByEntityGroupIdUsingGET_parameters.sortProperty ? getCustomersByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomersByEntityGroupIdUsingGET_nodeParam = node.getCustomersByEntityGroupIdUsingGET_sortOrder;
                getCustomersByEntityGroupIdUsingGET_nodeParamType = node.getCustomersByEntityGroupIdUsingGET_sortOrderType;
                if (getCustomersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getCustomersByEntityGroupIdUsingGET_parameters.sortOrder = getCustomersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getCustomersByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomersByEntityGroupIdUsingGET_nodeParam);
                }
                getCustomersByEntityGroupIdUsingGET_parameters.sortOrder = !!getCustomersByEntityGroupIdUsingGET_parameters.sortOrder ? getCustomersByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomersByEntityGroupIdUsingGET(getCustomersByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantCustomerUsingGET') {
                var getTenantCustomerUsingGET_parameters = [];
                var getTenantCustomerUsingGET_nodeParam;
                var getTenantCustomerUsingGET_nodeParamType;

                getTenantCustomerUsingGET_nodeParam = node.getTenantCustomerUsingGET_customerTitle;
                getTenantCustomerUsingGET_nodeParamType = node.getTenantCustomerUsingGET_customerTitleType;
                if (getTenantCustomerUsingGET_nodeParamType === 'str') {
                    getTenantCustomerUsingGET_parameters.customerTitle = getTenantCustomerUsingGET_nodeParam || '';
                } else {
                    getTenantCustomerUsingGET_parameters.customerTitle = RED.util.getMessageProperty(msg, getTenantCustomerUsingGET_nodeParam);
                }
                getTenantCustomerUsingGET_parameters.customerTitle = !!getTenantCustomerUsingGET_parameters.customerTitle ? getTenantCustomerUsingGET_parameters.customerTitle : msg.payload;
                                result = client.getTenantCustomerUsingGET(getTenantCustomerUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserCustomersUsingGET') {
                var getUserCustomersUsingGET_parameters = [];
                var getUserCustomersUsingGET_nodeParam;
                var getUserCustomersUsingGET_nodeParamType;

                getUserCustomersUsingGET_nodeParam = node.getUserCustomersUsingGET_pageSize;
                getUserCustomersUsingGET_nodeParamType = node.getUserCustomersUsingGET_pageSizeType;
                if (getUserCustomersUsingGET_nodeParamType === 'str') {
                    getUserCustomersUsingGET_parameters.pageSize = getUserCustomersUsingGET_nodeParam || '';
                } else {
                    getUserCustomersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserCustomersUsingGET_nodeParam);
                }
                getUserCustomersUsingGET_parameters.pageSize = !!getUserCustomersUsingGET_parameters.pageSize ? getUserCustomersUsingGET_parameters.pageSize : msg.payload;
                
                getUserCustomersUsingGET_nodeParam = node.getUserCustomersUsingGET_page;
                getUserCustomersUsingGET_nodeParamType = node.getUserCustomersUsingGET_pageType;
                if (getUserCustomersUsingGET_nodeParamType === 'str') {
                    getUserCustomersUsingGET_parameters.page = getUserCustomersUsingGET_nodeParam || '';
                } else {
                    getUserCustomersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserCustomersUsingGET_nodeParam);
                }
                getUserCustomersUsingGET_parameters.page = !!getUserCustomersUsingGET_parameters.page ? getUserCustomersUsingGET_parameters.page : msg.payload;
                
                getUserCustomersUsingGET_nodeParam = node.getUserCustomersUsingGET_textSearch;
                getUserCustomersUsingGET_nodeParamType = node.getUserCustomersUsingGET_textSearchType;
                if (getUserCustomersUsingGET_nodeParamType === 'str') {
                    getUserCustomersUsingGET_parameters.textSearch = getUserCustomersUsingGET_nodeParam || '';
                } else {
                    getUserCustomersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserCustomersUsingGET_nodeParam);
                }
                getUserCustomersUsingGET_parameters.textSearch = !!getUserCustomersUsingGET_parameters.textSearch ? getUserCustomersUsingGET_parameters.textSearch : msg.payload;
                
                getUserCustomersUsingGET_nodeParam = node.getUserCustomersUsingGET_sortProperty;
                getUserCustomersUsingGET_nodeParamType = node.getUserCustomersUsingGET_sortPropertyType;
                if (getUserCustomersUsingGET_nodeParamType === 'str') {
                    getUserCustomersUsingGET_parameters.sortProperty = getUserCustomersUsingGET_nodeParam || '';
                } else {
                    getUserCustomersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserCustomersUsingGET_nodeParam);
                }
                getUserCustomersUsingGET_parameters.sortProperty = !!getUserCustomersUsingGET_parameters.sortProperty ? getUserCustomersUsingGET_parameters.sortProperty : msg.payload;
                
                getUserCustomersUsingGET_nodeParam = node.getUserCustomersUsingGET_sortOrder;
                getUserCustomersUsingGET_nodeParamType = node.getUserCustomersUsingGET_sortOrderType;
                if (getUserCustomersUsingGET_nodeParamType === 'str') {
                    getUserCustomersUsingGET_parameters.sortOrder = getUserCustomersUsingGET_nodeParam || '';
                } else {
                    getUserCustomersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserCustomersUsingGET_nodeParam);
                }
                getUserCustomersUsingGET_parameters.sortOrder = !!getUserCustomersUsingGET_parameters.sortOrder ? getUserCustomersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserCustomersUsingGET(getUserCustomersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerHomeDashboardInfoUsingGET') {
                var getCustomerHomeDashboardInfoUsingGET_parameters = [];
                var getCustomerHomeDashboardInfoUsingGET_nodeParam;
                var getCustomerHomeDashboardInfoUsingGET_nodeParamType;
                result = client.getCustomerHomeDashboardInfoUsingGET(getCustomerHomeDashboardInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'setCustomerHomeDashboardInfoUsingPOST') {
                var setCustomerHomeDashboardInfoUsingPOST_parameters = [];
                var setCustomerHomeDashboardInfoUsingPOST_nodeParam;
                var setCustomerHomeDashboardInfoUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    setCustomerHomeDashboardInfoUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.setCustomerHomeDashboardInfoUsingPOST(setCustomerHomeDashboardInfoUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getHomeDashboardUsingGET') {
                var getHomeDashboardUsingGET_parameters = [];
                var getHomeDashboardUsingGET_nodeParam;
                var getHomeDashboardUsingGET_nodeParamType;
                result = client.getHomeDashboardUsingGET(getHomeDashboardUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getHomeDashboardInfoUsingGET') {
                var getHomeDashboardInfoUsingGET_parameters = [];
                var getHomeDashboardInfoUsingGET_nodeParam;
                var getHomeDashboardInfoUsingGET_nodeParamType;
                result = client.getHomeDashboardInfoUsingGET(getHomeDashboardInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDashboardInfoByIdUsingGET') {
                var getDashboardInfoByIdUsingGET_parameters = [];
                var getDashboardInfoByIdUsingGET_nodeParam;
                var getDashboardInfoByIdUsingGET_nodeParamType;

                getDashboardInfoByIdUsingGET_nodeParam = node.getDashboardInfoByIdUsingGET_dashboardId;
                getDashboardInfoByIdUsingGET_nodeParamType = node.getDashboardInfoByIdUsingGET_dashboardIdType;
                if (getDashboardInfoByIdUsingGET_nodeParamType === 'str') {
                    getDashboardInfoByIdUsingGET_parameters.dashboardId = getDashboardInfoByIdUsingGET_nodeParam || '';
                } else {
                    getDashboardInfoByIdUsingGET_parameters.dashboardId = RED.util.getMessageProperty(msg, getDashboardInfoByIdUsingGET_nodeParam);
                }
                getDashboardInfoByIdUsingGET_parameters.dashboardId = !!getDashboardInfoByIdUsingGET_parameters.dashboardId ? getDashboardInfoByIdUsingGET_parameters.dashboardId : msg.payload;
                                result = client.getDashboardInfoByIdUsingGET(getDashboardInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getMaxDatapointsLimitUsingGET') {
                var getMaxDatapointsLimitUsingGET_parameters = [];
                var getMaxDatapointsLimitUsingGET_nodeParam;
                var getMaxDatapointsLimitUsingGET_nodeParamType;
                result = client.getMaxDatapointsLimitUsingGET(getMaxDatapointsLimitUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getServerTimeUsingGET') {
                var getServerTimeUsingGET_parameters = [];
                var getServerTimeUsingGET_nodeParam;
                var getServerTimeUsingGET_nodeParamType;
                result = client.getServerTimeUsingGET(getServerTimeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDashboardByIdUsingGET') {
                var getDashboardByIdUsingGET_parameters = [];
                var getDashboardByIdUsingGET_nodeParam;
                var getDashboardByIdUsingGET_nodeParamType;

                getDashboardByIdUsingGET_nodeParam = node.getDashboardByIdUsingGET_dashboardId;
                getDashboardByIdUsingGET_nodeParamType = node.getDashboardByIdUsingGET_dashboardIdType;
                if (getDashboardByIdUsingGET_nodeParamType === 'str') {
                    getDashboardByIdUsingGET_parameters.dashboardId = getDashboardByIdUsingGET_nodeParam || '';
                } else {
                    getDashboardByIdUsingGET_parameters.dashboardId = RED.util.getMessageProperty(msg, getDashboardByIdUsingGET_nodeParam);
                }
                getDashboardByIdUsingGET_parameters.dashboardId = !!getDashboardByIdUsingGET_parameters.dashboardId ? getDashboardByIdUsingGET_parameters.dashboardId : msg.payload;
                                result = client.getDashboardByIdUsingGET(getDashboardByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteDashboardUsingDELETE') {
                var deleteDashboardUsingDELETE_parameters = [];
                var deleteDashboardUsingDELETE_nodeParam;
                var deleteDashboardUsingDELETE_nodeParamType;

                deleteDashboardUsingDELETE_nodeParam = node.deleteDashboardUsingDELETE_dashboardId;
                deleteDashboardUsingDELETE_nodeParamType = node.deleteDashboardUsingDELETE_dashboardIdType;
                if (deleteDashboardUsingDELETE_nodeParamType === 'str') {
                    deleteDashboardUsingDELETE_parameters.dashboardId = deleteDashboardUsingDELETE_nodeParam || '';
                } else {
                    deleteDashboardUsingDELETE_parameters.dashboardId = RED.util.getMessageProperty(msg, deleteDashboardUsingDELETE_nodeParam);
                }
                deleteDashboardUsingDELETE_parameters.dashboardId = !!deleteDashboardUsingDELETE_parameters.dashboardId ? deleteDashboardUsingDELETE_parameters.dashboardId : msg.payload;
                                result = client.deleteDashboardUsingDELETE(deleteDashboardUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getDashboardsByIdsUsingGET') {
                var getDashboardsByIdsUsingGET_parameters = [];
                var getDashboardsByIdsUsingGET_nodeParam;
                var getDashboardsByIdsUsingGET_nodeParamType;

                getDashboardsByIdsUsingGET_nodeParam = node.getDashboardsByIdsUsingGET_dashboardIds;
                getDashboardsByIdsUsingGET_nodeParamType = node.getDashboardsByIdsUsingGET_dashboardIdsType;
                if (getDashboardsByIdsUsingGET_nodeParamType === 'str') {
                    getDashboardsByIdsUsingGET_parameters.dashboardIds = getDashboardsByIdsUsingGET_nodeParam || '';
                } else {
                    getDashboardsByIdsUsingGET_parameters.dashboardIds = RED.util.getMessageProperty(msg, getDashboardsByIdsUsingGET_nodeParam);
                }
                getDashboardsByIdsUsingGET_parameters.dashboardIds = !!getDashboardsByIdsUsingGET_parameters.dashboardIds ? getDashboardsByIdsUsingGET_parameters.dashboardIds : msg.payload;
                                result = client.getDashboardsByIdsUsingGET(getDashboardsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveDashboardUsingPOST') {
                var saveDashboardUsingPOST_parameters = [];
                var saveDashboardUsingPOST_nodeParam;
                var saveDashboardUsingPOST_nodeParamType;

                saveDashboardUsingPOST_nodeParam = node.saveDashboardUsingPOST_entityGroupId;
                saveDashboardUsingPOST_nodeParamType = node.saveDashboardUsingPOST_entityGroupIdType;
                if (saveDashboardUsingPOST_nodeParamType === 'str') {
                    saveDashboardUsingPOST_parameters.entityGroupId = saveDashboardUsingPOST_nodeParam || '';
                } else {
                    saveDashboardUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveDashboardUsingPOST_nodeParam);
                }
                saveDashboardUsingPOST_parameters.entityGroupId = !!saveDashboardUsingPOST_parameters.entityGroupId ? saveDashboardUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveDashboardUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDashboardUsingPOST(saveDashboardUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'exportGroupDashboardsUsingGET') {
                var exportGroupDashboardsUsingGET_parameters = [];
                var exportGroupDashboardsUsingGET_nodeParam;
                var exportGroupDashboardsUsingGET_nodeParamType;

                exportGroupDashboardsUsingGET_nodeParam = node.exportGroupDashboardsUsingGET_entityGroupId;
                exportGroupDashboardsUsingGET_nodeParamType = node.exportGroupDashboardsUsingGET_entityGroupIdType;
                if (exportGroupDashboardsUsingGET_nodeParamType === 'str') {
                    exportGroupDashboardsUsingGET_parameters.entityGroupId = exportGroupDashboardsUsingGET_nodeParam || '';
                } else {
                    exportGroupDashboardsUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, exportGroupDashboardsUsingGET_nodeParam);
                }
                exportGroupDashboardsUsingGET_parameters.entityGroupId = !!exportGroupDashboardsUsingGET_parameters.entityGroupId ? exportGroupDashboardsUsingGET_parameters.entityGroupId : msg.payload;
                
                exportGroupDashboardsUsingGET_nodeParam = node.exportGroupDashboardsUsingGET_limit;
                exportGroupDashboardsUsingGET_nodeParamType = node.exportGroupDashboardsUsingGET_limitType;
                if (exportGroupDashboardsUsingGET_nodeParamType === 'str') {
                    exportGroupDashboardsUsingGET_parameters.limit = exportGroupDashboardsUsingGET_nodeParam || '';
                } else {
                    exportGroupDashboardsUsingGET_parameters.limit = RED.util.getMessageProperty(msg, exportGroupDashboardsUsingGET_nodeParam);
                }
                exportGroupDashboardsUsingGET_parameters.limit = !!exportGroupDashboardsUsingGET_parameters.limit ? exportGroupDashboardsUsingGET_parameters.limit : msg.payload;
                                result = client.exportGroupDashboardsUsingGET(exportGroupDashboardsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'importGroupDashboardsUsingPOST') {
                var importGroupDashboardsUsingPOST_parameters = [];
                var importGroupDashboardsUsingPOST_nodeParam;
                var importGroupDashboardsUsingPOST_nodeParamType;

                importGroupDashboardsUsingPOST_nodeParam = node.importGroupDashboardsUsingPOST_entityGroupId;
                importGroupDashboardsUsingPOST_nodeParamType = node.importGroupDashboardsUsingPOST_entityGroupIdType;
                if (importGroupDashboardsUsingPOST_nodeParamType === 'str') {
                    importGroupDashboardsUsingPOST_parameters.entityGroupId = importGroupDashboardsUsingPOST_nodeParam || '';
                } else {
                    importGroupDashboardsUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, importGroupDashboardsUsingPOST_nodeParam);
                }
                importGroupDashboardsUsingPOST_parameters.entityGroupId = !!importGroupDashboardsUsingPOST_parameters.entityGroupId ? importGroupDashboardsUsingPOST_parameters.entityGroupId : msg.payload;
                
                importGroupDashboardsUsingPOST_nodeParam = node.importGroupDashboardsUsingPOST_overwrite;
                importGroupDashboardsUsingPOST_nodeParamType = node.importGroupDashboardsUsingPOST_overwriteType;
                if (importGroupDashboardsUsingPOST_nodeParamType === 'str') {
                    importGroupDashboardsUsingPOST_parameters.overwrite = importGroupDashboardsUsingPOST_nodeParam || '';
                } else {
                    importGroupDashboardsUsingPOST_parameters.overwrite = RED.util.getMessageProperty(msg, importGroupDashboardsUsingPOST_nodeParam);
                }
                importGroupDashboardsUsingPOST_parameters.overwrite = !!importGroupDashboardsUsingPOST_parameters.overwrite ? importGroupDashboardsUsingPOST_parameters.overwrite : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    importGroupDashboardsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.importGroupDashboardsUsingPOST(importGroupDashboardsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getDashboardsByEntityGroupIdUsingGET') {
                var getDashboardsByEntityGroupIdUsingGET_parameters = [];
                var getDashboardsByEntityGroupIdUsingGET_nodeParam;
                var getDashboardsByEntityGroupIdUsingGET_nodeParamType;

                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_entityGroupId;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_entityGroupIdType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.entityGroupId = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.entityGroupId = !!getDashboardsByEntityGroupIdUsingGET_parameters.entityGroupId ? getDashboardsByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_pageSize;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_pageSizeType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.pageSize = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.pageSize = !!getDashboardsByEntityGroupIdUsingGET_parameters.pageSize ? getDashboardsByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_page;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_pageType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.page = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.page = !!getDashboardsByEntityGroupIdUsingGET_parameters.page ? getDashboardsByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_textSearch;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_textSearchType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.textSearch = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.textSearch = !!getDashboardsByEntityGroupIdUsingGET_parameters.textSearch ? getDashboardsByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_sortProperty;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_sortPropertyType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.sortProperty = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.sortProperty = !!getDashboardsByEntityGroupIdUsingGET_parameters.sortProperty ? getDashboardsByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getDashboardsByEntityGroupIdUsingGET_nodeParam = node.getDashboardsByEntityGroupIdUsingGET_sortOrder;
                getDashboardsByEntityGroupIdUsingGET_nodeParamType = node.getDashboardsByEntityGroupIdUsingGET_sortOrderType;
                if (getDashboardsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDashboardsByEntityGroupIdUsingGET_parameters.sortOrder = getDashboardsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDashboardsByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getDashboardsByEntityGroupIdUsingGET_nodeParam);
                }
                getDashboardsByEntityGroupIdUsingGET_parameters.sortOrder = !!getDashboardsByEntityGroupIdUsingGET_parameters.sortOrder ? getDashboardsByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getDashboardsByEntityGroupIdUsingGET(getDashboardsByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantHomeDashboardInfoUsingGET') {
                var getTenantHomeDashboardInfoUsingGET_parameters = [];
                var getTenantHomeDashboardInfoUsingGET_nodeParam;
                var getTenantHomeDashboardInfoUsingGET_nodeParamType;
                result = client.getTenantHomeDashboardInfoUsingGET(getTenantHomeDashboardInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'setTenantHomeDashboardInfoUsingPOST') {
                var setTenantHomeDashboardInfoUsingPOST_parameters = [];
                var setTenantHomeDashboardInfoUsingPOST_nodeParam;
                var setTenantHomeDashboardInfoUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    setTenantHomeDashboardInfoUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.setTenantHomeDashboardInfoUsingPOST(setTenantHomeDashboardInfoUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantDashboardsUsingGET') {
                var getTenantDashboardsUsingGET_parameters = [];
                var getTenantDashboardsUsingGET_nodeParam;
                var getTenantDashboardsUsingGET_nodeParamType;

                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_pageSize;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_pageSizeType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.pageSize = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.pageSize = !!getTenantDashboardsUsingGET_parameters.pageSize ? getTenantDashboardsUsingGET_parameters.pageSize : msg.payload;
                
                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_page;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_pageType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.page = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.page = !!getTenantDashboardsUsingGET_parameters.page ? getTenantDashboardsUsingGET_parameters.page : msg.payload;
                
                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_mobile;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_mobileType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.mobile = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.mobile = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.mobile = !!getTenantDashboardsUsingGET_parameters.mobile ? getTenantDashboardsUsingGET_parameters.mobile : msg.payload;
                
                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_textSearch;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_textSearchType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.textSearch = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.textSearch = !!getTenantDashboardsUsingGET_parameters.textSearch ? getTenantDashboardsUsingGET_parameters.textSearch : msg.payload;
                
                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_sortProperty;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_sortPropertyType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.sortProperty = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.sortProperty = !!getTenantDashboardsUsingGET_parameters.sortProperty ? getTenantDashboardsUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantDashboardsUsingGET_nodeParam = node.getTenantDashboardsUsingGET_sortOrder;
                getTenantDashboardsUsingGET_nodeParamType = node.getTenantDashboardsUsingGET_sortOrderType;
                if (getTenantDashboardsUsingGET_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_parameters.sortOrder = getTenantDashboardsUsingGET_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_nodeParam);
                }
                getTenantDashboardsUsingGET_parameters.sortOrder = !!getTenantDashboardsUsingGET_parameters.sortOrder ? getTenantDashboardsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantDashboardsUsingGET(getTenantDashboardsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantDashboardsUsingGET_1') {
                var getTenantDashboardsUsingGET_1_parameters = [];
                var getTenantDashboardsUsingGET_1_nodeParam;
                var getTenantDashboardsUsingGET_1_nodeParamType;

                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_tenantId;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_tenantIdType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.tenantId = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.tenantId = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.tenantId = !!getTenantDashboardsUsingGET_1_parameters.tenantId ? getTenantDashboardsUsingGET_1_parameters.tenantId : msg.payload;
                
                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_pageSize;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_pageSizeType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.pageSize = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.pageSize = !!getTenantDashboardsUsingGET_1_parameters.pageSize ? getTenantDashboardsUsingGET_1_parameters.pageSize : msg.payload;
                
                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_page;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_pageType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.page = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.page = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.page = !!getTenantDashboardsUsingGET_1_parameters.page ? getTenantDashboardsUsingGET_1_parameters.page : msg.payload;
                
                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_textSearch;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_textSearchType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.textSearch = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.textSearch = !!getTenantDashboardsUsingGET_1_parameters.textSearch ? getTenantDashboardsUsingGET_1_parameters.textSearch : msg.payload;
                
                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_sortProperty;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_sortPropertyType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.sortProperty = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.sortProperty = !!getTenantDashboardsUsingGET_1_parameters.sortProperty ? getTenantDashboardsUsingGET_1_parameters.sortProperty : msg.payload;
                
                getTenantDashboardsUsingGET_1_nodeParam = node.getTenantDashboardsUsingGET_1_sortOrder;
                getTenantDashboardsUsingGET_1_nodeParamType = node.getTenantDashboardsUsingGET_1_sortOrderType;
                if (getTenantDashboardsUsingGET_1_nodeParamType === 'str') {
                    getTenantDashboardsUsingGET_1_parameters.sortOrder = getTenantDashboardsUsingGET_1_nodeParam || '';
                } else {
                    getTenantDashboardsUsingGET_1_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantDashboardsUsingGET_1_nodeParam);
                }
                getTenantDashboardsUsingGET_1_parameters.sortOrder = !!getTenantDashboardsUsingGET_1_parameters.sortOrder ? getTenantDashboardsUsingGET_1_parameters.sortOrder : msg.payload;
                                result = client.getTenantDashboardsUsingGET_1(getTenantDashboardsUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'getUserDashboardsUsingGET') {
                var getUserDashboardsUsingGET_parameters = [];
                var getUserDashboardsUsingGET_nodeParam;
                var getUserDashboardsUsingGET_nodeParamType;

                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_pageSize;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_pageSizeType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.pageSize = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.pageSize = !!getUserDashboardsUsingGET_parameters.pageSize ? getUserDashboardsUsingGET_parameters.pageSize : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_page;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_pageType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.page = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.page = !!getUserDashboardsUsingGET_parameters.page ? getUserDashboardsUsingGET_parameters.page : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_mobile;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_mobileType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.mobile = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.mobile = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.mobile = !!getUserDashboardsUsingGET_parameters.mobile ? getUserDashboardsUsingGET_parameters.mobile : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_textSearch;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_textSearchType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.textSearch = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.textSearch = !!getUserDashboardsUsingGET_parameters.textSearch ? getUserDashboardsUsingGET_parameters.textSearch : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_sortProperty;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_sortPropertyType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.sortProperty = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.sortProperty = !!getUserDashboardsUsingGET_parameters.sortProperty ? getUserDashboardsUsingGET_parameters.sortProperty : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_sortOrder;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_sortOrderType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.sortOrder = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.sortOrder = !!getUserDashboardsUsingGET_parameters.sortOrder ? getUserDashboardsUsingGET_parameters.sortOrder : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_operation;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_operationType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.operation = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.operation = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.operation = !!getUserDashboardsUsingGET_parameters.operation ? getUserDashboardsUsingGET_parameters.operation : msg.payload;
                
                getUserDashboardsUsingGET_nodeParam = node.getUserDashboardsUsingGET_userId;
                getUserDashboardsUsingGET_nodeParamType = node.getUserDashboardsUsingGET_userIdType;
                if (getUserDashboardsUsingGET_nodeParamType === 'str') {
                    getUserDashboardsUsingGET_parameters.userId = getUserDashboardsUsingGET_nodeParam || '';
                } else {
                    getUserDashboardsUsingGET_parameters.userId = RED.util.getMessageProperty(msg, getUserDashboardsUsingGET_nodeParam);
                }
                getUserDashboardsUsingGET_parameters.userId = !!getUserDashboardsUsingGET_parameters.userId ? getUserDashboardsUsingGET_parameters.userId : msg.payload;
                                result = client.getUserDashboardsUsingGET(getUserDashboardsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'reClaimDeviceUsingDELETE') {
                var reClaimDeviceUsingDELETE_parameters = [];
                var reClaimDeviceUsingDELETE_nodeParam;
                var reClaimDeviceUsingDELETE_nodeParamType;

                reClaimDeviceUsingDELETE_nodeParam = node.reClaimDeviceUsingDELETE_deviceName;
                reClaimDeviceUsingDELETE_nodeParamType = node.reClaimDeviceUsingDELETE_deviceNameType;
                if (reClaimDeviceUsingDELETE_nodeParamType === 'str') {
                    reClaimDeviceUsingDELETE_parameters.deviceName = reClaimDeviceUsingDELETE_nodeParam || '';
                } else {
                    reClaimDeviceUsingDELETE_parameters.deviceName = RED.util.getMessageProperty(msg, reClaimDeviceUsingDELETE_nodeParam);
                }
                reClaimDeviceUsingDELETE_parameters.deviceName = !!reClaimDeviceUsingDELETE_parameters.deviceName ? reClaimDeviceUsingDELETE_parameters.deviceName : msg.payload;
                                result = client.reClaimDeviceUsingDELETE(reClaimDeviceUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'claimDeviceUsingPOST') {
                var claimDeviceUsingPOST_parameters = [];
                var claimDeviceUsingPOST_nodeParam;
                var claimDeviceUsingPOST_nodeParamType;

                claimDeviceUsingPOST_nodeParam = node.claimDeviceUsingPOST_deviceName;
                claimDeviceUsingPOST_nodeParamType = node.claimDeviceUsingPOST_deviceNameType;
                if (claimDeviceUsingPOST_nodeParamType === 'str') {
                    claimDeviceUsingPOST_parameters.deviceName = claimDeviceUsingPOST_nodeParam || '';
                } else {
                    claimDeviceUsingPOST_parameters.deviceName = RED.util.getMessageProperty(msg, claimDeviceUsingPOST_nodeParam);
                }
                claimDeviceUsingPOST_parameters.deviceName = !!claimDeviceUsingPOST_parameters.deviceName ? claimDeviceUsingPOST_parameters.deviceName : msg.payload;
                
                claimDeviceUsingPOST_nodeParam = node.claimDeviceUsingPOST_subCustomerId;
                claimDeviceUsingPOST_nodeParamType = node.claimDeviceUsingPOST_subCustomerIdType;
                if (claimDeviceUsingPOST_nodeParamType === 'str') {
                    claimDeviceUsingPOST_parameters.subCustomerId = claimDeviceUsingPOST_nodeParam || '';
                } else {
                    claimDeviceUsingPOST_parameters.subCustomerId = RED.util.getMessageProperty(msg, claimDeviceUsingPOST_nodeParam);
                }
                claimDeviceUsingPOST_parameters.subCustomerId = !!claimDeviceUsingPOST_parameters.subCustomerId ? claimDeviceUsingPOST_parameters.subCustomerId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    claimDeviceUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.claimDeviceUsingPOST(claimDeviceUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerDevicesUsingGET') {
                var getCustomerDevicesUsingGET_parameters = [];
                var getCustomerDevicesUsingGET_nodeParam;
                var getCustomerDevicesUsingGET_nodeParamType;

                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_customerId;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_customerIdType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.customerId = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.customerId = !!getCustomerDevicesUsingGET_parameters.customerId ? getCustomerDevicesUsingGET_parameters.customerId : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_pageSize;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_pageSizeType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.pageSize = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.pageSize = !!getCustomerDevicesUsingGET_parameters.pageSize ? getCustomerDevicesUsingGET_parameters.pageSize : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_page;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_pageType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.page = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.page = !!getCustomerDevicesUsingGET_parameters.page ? getCustomerDevicesUsingGET_parameters.page : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_type;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_typeType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.type = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.type = !!getCustomerDevicesUsingGET_parameters.type ? getCustomerDevicesUsingGET_parameters.type : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_textSearch;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_textSearchType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.textSearch = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.textSearch = !!getCustomerDevicesUsingGET_parameters.textSearch ? getCustomerDevicesUsingGET_parameters.textSearch : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_sortProperty;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_sortPropertyType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.sortProperty = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.sortProperty = !!getCustomerDevicesUsingGET_parameters.sortProperty ? getCustomerDevicesUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomerDevicesUsingGET_nodeParam = node.getCustomerDevicesUsingGET_sortOrder;
                getCustomerDevicesUsingGET_nodeParamType = node.getCustomerDevicesUsingGET_sortOrderType;
                if (getCustomerDevicesUsingGET_nodeParamType === 'str') {
                    getCustomerDevicesUsingGET_parameters.sortOrder = getCustomerDevicesUsingGET_nodeParam || '';
                } else {
                    getCustomerDevicesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomerDevicesUsingGET_nodeParam);
                }
                getCustomerDevicesUsingGET_parameters.sortOrder = !!getCustomerDevicesUsingGET_parameters.sortOrder ? getCustomerDevicesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomerDevicesUsingGET(getCustomerDevicesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveDeviceWithCredentialsUsingPOST') {
                var saveDeviceWithCredentialsUsingPOST_parameters = [];
                var saveDeviceWithCredentialsUsingPOST_nodeParam;
                var saveDeviceWithCredentialsUsingPOST_nodeParamType;

                saveDeviceWithCredentialsUsingPOST_nodeParam = node.saveDeviceWithCredentialsUsingPOST_entityGroupId;
                saveDeviceWithCredentialsUsingPOST_nodeParamType = node.saveDeviceWithCredentialsUsingPOST_entityGroupIdType;
                if (saveDeviceWithCredentialsUsingPOST_nodeParamType === 'str') {
                    saveDeviceWithCredentialsUsingPOST_parameters.entityGroupId = saveDeviceWithCredentialsUsingPOST_nodeParam || '';
                } else {
                    saveDeviceWithCredentialsUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveDeviceWithCredentialsUsingPOST_nodeParam);
                }
                saveDeviceWithCredentialsUsingPOST_parameters.entityGroupId = !!saveDeviceWithCredentialsUsingPOST_parameters.entityGroupId ? saveDeviceWithCredentialsUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveDeviceWithCredentialsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDeviceWithCredentialsUsingPOST(saveDeviceWithCredentialsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'processDevicesBulkImportUsingPOST') {
                var processDevicesBulkImportUsingPOST_parameters = [];
                var processDevicesBulkImportUsingPOST_nodeParam;
                var processDevicesBulkImportUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    processDevicesBulkImportUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.processDevicesBulkImportUsingPOST(processDevicesBulkImportUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'updateDeviceCredentialsUsingPOST') {
                var updateDeviceCredentialsUsingPOST_parameters = [];
                var updateDeviceCredentialsUsingPOST_nodeParam;
                var updateDeviceCredentialsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    updateDeviceCredentialsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.updateDeviceCredentialsUsingPOST(updateDeviceCredentialsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceTypesUsingGET') {
                var getDeviceTypesUsingGET_parameters = [];
                var getDeviceTypesUsingGET_nodeParam;
                var getDeviceTypesUsingGET_nodeParamType;
                result = client.getDeviceTypesUsingGET(getDeviceTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceByIdUsingGET') {
                var getDeviceByIdUsingGET_parameters = [];
                var getDeviceByIdUsingGET_nodeParam;
                var getDeviceByIdUsingGET_nodeParamType;

                getDeviceByIdUsingGET_nodeParam = node.getDeviceByIdUsingGET_deviceId;
                getDeviceByIdUsingGET_nodeParamType = node.getDeviceByIdUsingGET_deviceIdType;
                if (getDeviceByIdUsingGET_nodeParamType === 'str') {
                    getDeviceByIdUsingGET_parameters.deviceId = getDeviceByIdUsingGET_nodeParam || '';
                } else {
                    getDeviceByIdUsingGET_parameters.deviceId = RED.util.getMessageProperty(msg, getDeviceByIdUsingGET_nodeParam);
                }
                getDeviceByIdUsingGET_parameters.deviceId = !!getDeviceByIdUsingGET_parameters.deviceId ? getDeviceByIdUsingGET_parameters.deviceId : msg.payload;
                                result = client.getDeviceByIdUsingGET(getDeviceByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteDeviceUsingDELETE') {
                var deleteDeviceUsingDELETE_parameters = [];
                var deleteDeviceUsingDELETE_nodeParam;
                var deleteDeviceUsingDELETE_nodeParamType;

                deleteDeviceUsingDELETE_nodeParam = node.deleteDeviceUsingDELETE_deviceId;
                deleteDeviceUsingDELETE_nodeParamType = node.deleteDeviceUsingDELETE_deviceIdType;
                if (deleteDeviceUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceUsingDELETE_parameters.deviceId = deleteDeviceUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceUsingDELETE_parameters.deviceId = RED.util.getMessageProperty(msg, deleteDeviceUsingDELETE_nodeParam);
                }
                deleteDeviceUsingDELETE_parameters.deviceId = !!deleteDeviceUsingDELETE_parameters.deviceId ? deleteDeviceUsingDELETE_parameters.deviceId : msg.payload;
                                result = client.deleteDeviceUsingDELETE(deleteDeviceUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceCredentialsByDeviceIdUsingGET') {
                var getDeviceCredentialsByDeviceIdUsingGET_parameters = [];
                var getDeviceCredentialsByDeviceIdUsingGET_nodeParam;
                var getDeviceCredentialsByDeviceIdUsingGET_nodeParamType;

                getDeviceCredentialsByDeviceIdUsingGET_nodeParam = node.getDeviceCredentialsByDeviceIdUsingGET_deviceId;
                getDeviceCredentialsByDeviceIdUsingGET_nodeParamType = node.getDeviceCredentialsByDeviceIdUsingGET_deviceIdType;
                if (getDeviceCredentialsByDeviceIdUsingGET_nodeParamType === 'str') {
                    getDeviceCredentialsByDeviceIdUsingGET_parameters.deviceId = getDeviceCredentialsByDeviceIdUsingGET_nodeParam || '';
                } else {
                    getDeviceCredentialsByDeviceIdUsingGET_parameters.deviceId = RED.util.getMessageProperty(msg, getDeviceCredentialsByDeviceIdUsingGET_nodeParam);
                }
                getDeviceCredentialsByDeviceIdUsingGET_parameters.deviceId = !!getDeviceCredentialsByDeviceIdUsingGET_parameters.deviceId ? getDeviceCredentialsByDeviceIdUsingGET_parameters.deviceId : msg.payload;
                                result = client.getDeviceCredentialsByDeviceIdUsingGET(getDeviceCredentialsByDeviceIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'findByQueryUsingPOST_1') {
                var findByQueryUsingPOST_1_parameters = [];
                var findByQueryUsingPOST_1_nodeParam;
                var findByQueryUsingPOST_1_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findByQueryUsingPOST_1_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findByQueryUsingPOST_1(findByQueryUsingPOST_1_parameters);
            }
            if (!errorFlag && node.method === 'countByDeviceProfileAndEmptyOtaPackageUsingGET') {
                var countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters = [];
                var countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam;
                var countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParamType;

                countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam = node.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageType;
                countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParamType = node.countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageTypeType;
                if (countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParamType === 'str') {
                    countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.otaPackageType = countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam || '';
                } else {
                    countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.otaPackageType = RED.util.getMessageProperty(msg, countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam);
                }
                countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.otaPackageType = !!countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.otaPackageType ? countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.otaPackageType : msg.payload;
                
                countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam = node.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileId;
                countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParamType = node.countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileIdType;
                if (countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParamType === 'str') {
                    countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.deviceProfileId = countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam || '';
                } else {
                    countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.deviceProfileId = RED.util.getMessageProperty(msg, countByDeviceProfileAndEmptyOtaPackageUsingGET_nodeParam);
                }
                countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.deviceProfileId = !!countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.deviceProfileId ? countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters.deviceProfileId : msg.payload;
                                result = client.countByDeviceProfileAndEmptyOtaPackageUsingGET(countByDeviceProfileAndEmptyOtaPackageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'countByDeviceGroupAndEmptyOtaPackageUsingGET') {
                var countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters = [];
                var countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam;
                var countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType;

                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageType;
                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageTypeType;
                if (countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType === 'str') {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageType = countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam || '';
                } else {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageType = RED.util.getMessageProperty(msg, countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam);
                }
                countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageType = !!countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageType ? countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageType : msg.payload;
                
                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageId;
                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageIdType;
                if (countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType === 'str') {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageId = countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam || '';
                } else {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageId = RED.util.getMessageProperty(msg, countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam);
                }
                countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageId = !!countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageId ? countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.otaPackageId : msg.payload;
                
                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupId;
                countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType = node.countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupIdType;
                if (countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParamType === 'str') {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.entityGroupId = countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam || '';
                } else {
                    countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, countByDeviceGroupAndEmptyOtaPackageUsingGET_nodeParam);
                }
                countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.entityGroupId = !!countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.entityGroupId ? countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters.entityGroupId : msg.payload;
                                result = client.countByDeviceGroupAndEmptyOtaPackageUsingGET(countByDeviceGroupAndEmptyOtaPackageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDevicesByIdsUsingGET') {
                var getDevicesByIdsUsingGET_parameters = [];
                var getDevicesByIdsUsingGET_nodeParam;
                var getDevicesByIdsUsingGET_nodeParamType;

                getDevicesByIdsUsingGET_nodeParam = node.getDevicesByIdsUsingGET_deviceIds;
                getDevicesByIdsUsingGET_nodeParamType = node.getDevicesByIdsUsingGET_deviceIdsType;
                if (getDevicesByIdsUsingGET_nodeParamType === 'str') {
                    getDevicesByIdsUsingGET_parameters.deviceIds = getDevicesByIdsUsingGET_nodeParam || '';
                } else {
                    getDevicesByIdsUsingGET_parameters.deviceIds = RED.util.getMessageProperty(msg, getDevicesByIdsUsingGET_nodeParam);
                }
                getDevicesByIdsUsingGET_parameters.deviceIds = !!getDevicesByIdsUsingGET_parameters.deviceIds ? getDevicesByIdsUsingGET_parameters.deviceIds : msg.payload;
                                result = client.getDevicesByIdsUsingGET(getDevicesByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveDeviceUsingPOST') {
                var saveDeviceUsingPOST_parameters = [];
                var saveDeviceUsingPOST_nodeParam;
                var saveDeviceUsingPOST_nodeParamType;

                saveDeviceUsingPOST_nodeParam = node.saveDeviceUsingPOST_accessToken;
                saveDeviceUsingPOST_nodeParamType = node.saveDeviceUsingPOST_accessTokenType;
                if (saveDeviceUsingPOST_nodeParamType === 'str') {
                    saveDeviceUsingPOST_parameters.accessToken = saveDeviceUsingPOST_nodeParam || '';
                } else {
                    saveDeviceUsingPOST_parameters.accessToken = RED.util.getMessageProperty(msg, saveDeviceUsingPOST_nodeParam);
                }
                saveDeviceUsingPOST_parameters.accessToken = !!saveDeviceUsingPOST_parameters.accessToken ? saveDeviceUsingPOST_parameters.accessToken : msg.payload;
                
                saveDeviceUsingPOST_nodeParam = node.saveDeviceUsingPOST_entityGroupId;
                saveDeviceUsingPOST_nodeParamType = node.saveDeviceUsingPOST_entityGroupIdType;
                if (saveDeviceUsingPOST_nodeParamType === 'str') {
                    saveDeviceUsingPOST_parameters.entityGroupId = saveDeviceUsingPOST_nodeParam || '';
                } else {
                    saveDeviceUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveDeviceUsingPOST_nodeParam);
                }
                saveDeviceUsingPOST_parameters.entityGroupId = !!saveDeviceUsingPOST_parameters.entityGroupId ? saveDeviceUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveDeviceUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDeviceUsingPOST(saveDeviceUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getDevicesByEntityGroupIdUsingGET') {
                var getDevicesByEntityGroupIdUsingGET_parameters = [];
                var getDevicesByEntityGroupIdUsingGET_nodeParam;
                var getDevicesByEntityGroupIdUsingGET_nodeParamType;

                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_entityGroupId;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_entityGroupIdType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.entityGroupId = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.entityGroupId = !!getDevicesByEntityGroupIdUsingGET_parameters.entityGroupId ? getDevicesByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_pageSize;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_pageSizeType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.pageSize = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.pageSize = !!getDevicesByEntityGroupIdUsingGET_parameters.pageSize ? getDevicesByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_page;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_pageType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.page = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.page = !!getDevicesByEntityGroupIdUsingGET_parameters.page ? getDevicesByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_textSearch;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_textSearchType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.textSearch = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.textSearch = !!getDevicesByEntityGroupIdUsingGET_parameters.textSearch ? getDevicesByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_sortProperty;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_sortPropertyType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.sortProperty = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.sortProperty = !!getDevicesByEntityGroupIdUsingGET_parameters.sortProperty ? getDevicesByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getDevicesByEntityGroupIdUsingGET_nodeParam = node.getDevicesByEntityGroupIdUsingGET_sortOrder;
                getDevicesByEntityGroupIdUsingGET_nodeParamType = node.getDevicesByEntityGroupIdUsingGET_sortOrderType;
                if (getDevicesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getDevicesByEntityGroupIdUsingGET_parameters.sortOrder = getDevicesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getDevicesByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getDevicesByEntityGroupIdUsingGET_nodeParam);
                }
                getDevicesByEntityGroupIdUsingGET_parameters.sortOrder = !!getDevicesByEntityGroupIdUsingGET_parameters.sortOrder ? getDevicesByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getDevicesByEntityGroupIdUsingGET(getDevicesByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantDeviceUsingGET') {
                var getTenantDeviceUsingGET_parameters = [];
                var getTenantDeviceUsingGET_nodeParam;
                var getTenantDeviceUsingGET_nodeParamType;

                getTenantDeviceUsingGET_nodeParam = node.getTenantDeviceUsingGET_deviceName;
                getTenantDeviceUsingGET_nodeParamType = node.getTenantDeviceUsingGET_deviceNameType;
                if (getTenantDeviceUsingGET_nodeParamType === 'str') {
                    getTenantDeviceUsingGET_parameters.deviceName = getTenantDeviceUsingGET_nodeParam || '';
                } else {
                    getTenantDeviceUsingGET_parameters.deviceName = RED.util.getMessageProperty(msg, getTenantDeviceUsingGET_nodeParam);
                }
                getTenantDeviceUsingGET_parameters.deviceName = !!getTenantDeviceUsingGET_parameters.deviceName ? getTenantDeviceUsingGET_parameters.deviceName : msg.payload;
                                result = client.getTenantDeviceUsingGET(getTenantDeviceUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantDevicesUsingGET') {
                var getTenantDevicesUsingGET_parameters = [];
                var getTenantDevicesUsingGET_nodeParam;
                var getTenantDevicesUsingGET_nodeParamType;

                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_pageSize;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_pageSizeType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.pageSize = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.pageSize = !!getTenantDevicesUsingGET_parameters.pageSize ? getTenantDevicesUsingGET_parameters.pageSize : msg.payload;
                
                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_page;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_pageType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.page = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.page = !!getTenantDevicesUsingGET_parameters.page ? getTenantDevicesUsingGET_parameters.page : msg.payload;
                
                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_type;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_typeType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.type = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.type = !!getTenantDevicesUsingGET_parameters.type ? getTenantDevicesUsingGET_parameters.type : msg.payload;
                
                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_textSearch;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_textSearchType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.textSearch = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.textSearch = !!getTenantDevicesUsingGET_parameters.textSearch ? getTenantDevicesUsingGET_parameters.textSearch : msg.payload;
                
                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_sortProperty;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_sortPropertyType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.sortProperty = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.sortProperty = !!getTenantDevicesUsingGET_parameters.sortProperty ? getTenantDevicesUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantDevicesUsingGET_nodeParam = node.getTenantDevicesUsingGET_sortOrder;
                getTenantDevicesUsingGET_nodeParamType = node.getTenantDevicesUsingGET_sortOrderType;
                if (getTenantDevicesUsingGET_nodeParamType === 'str') {
                    getTenantDevicesUsingGET_parameters.sortOrder = getTenantDevicesUsingGET_nodeParam || '';
                } else {
                    getTenantDevicesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantDevicesUsingGET_nodeParam);
                }
                getTenantDevicesUsingGET_parameters.sortOrder = !!getTenantDevicesUsingGET_parameters.sortOrder ? getTenantDevicesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantDevicesUsingGET(getTenantDevicesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'assignDeviceToTenantUsingPOST') {
                var assignDeviceToTenantUsingPOST_parameters = [];
                var assignDeviceToTenantUsingPOST_nodeParam;
                var assignDeviceToTenantUsingPOST_nodeParamType;

                assignDeviceToTenantUsingPOST_nodeParam = node.assignDeviceToTenantUsingPOST_tenantId;
                assignDeviceToTenantUsingPOST_nodeParamType = node.assignDeviceToTenantUsingPOST_tenantIdType;
                if (assignDeviceToTenantUsingPOST_nodeParamType === 'str') {
                    assignDeviceToTenantUsingPOST_parameters.tenantId = assignDeviceToTenantUsingPOST_nodeParam || '';
                } else {
                    assignDeviceToTenantUsingPOST_parameters.tenantId = RED.util.getMessageProperty(msg, assignDeviceToTenantUsingPOST_nodeParam);
                }
                assignDeviceToTenantUsingPOST_parameters.tenantId = !!assignDeviceToTenantUsingPOST_parameters.tenantId ? assignDeviceToTenantUsingPOST_parameters.tenantId : msg.payload;
                
                assignDeviceToTenantUsingPOST_nodeParam = node.assignDeviceToTenantUsingPOST_deviceId;
                assignDeviceToTenantUsingPOST_nodeParamType = node.assignDeviceToTenantUsingPOST_deviceIdType;
                if (assignDeviceToTenantUsingPOST_nodeParamType === 'str') {
                    assignDeviceToTenantUsingPOST_parameters.deviceId = assignDeviceToTenantUsingPOST_nodeParam || '';
                } else {
                    assignDeviceToTenantUsingPOST_parameters.deviceId = RED.util.getMessageProperty(msg, assignDeviceToTenantUsingPOST_nodeParam);
                }
                assignDeviceToTenantUsingPOST_parameters.deviceId = !!assignDeviceToTenantUsingPOST_parameters.deviceId ? assignDeviceToTenantUsingPOST_parameters.deviceId : msg.payload;
                                result = client.assignDeviceToTenantUsingPOST(assignDeviceToTenantUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getUserDevicesUsingGET') {
                var getUserDevicesUsingGET_parameters = [];
                var getUserDevicesUsingGET_nodeParam;
                var getUserDevicesUsingGET_nodeParamType;

                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_pageSize;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_pageSizeType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.pageSize = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.pageSize = !!getUserDevicesUsingGET_parameters.pageSize ? getUserDevicesUsingGET_parameters.pageSize : msg.payload;
                
                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_page;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_pageType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.page = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.page = !!getUserDevicesUsingGET_parameters.page ? getUserDevicesUsingGET_parameters.page : msg.payload;
                
                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_type;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_typeType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.type = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.type = !!getUserDevicesUsingGET_parameters.type ? getUserDevicesUsingGET_parameters.type : msg.payload;
                
                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_textSearch;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_textSearchType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.textSearch = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.textSearch = !!getUserDevicesUsingGET_parameters.textSearch ? getUserDevicesUsingGET_parameters.textSearch : msg.payload;
                
                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_sortProperty;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_sortPropertyType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.sortProperty = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.sortProperty = !!getUserDevicesUsingGET_parameters.sortProperty ? getUserDevicesUsingGET_parameters.sortProperty : msg.payload;
                
                getUserDevicesUsingGET_nodeParam = node.getUserDevicesUsingGET_sortOrder;
                getUserDevicesUsingGET_nodeParamType = node.getUserDevicesUsingGET_sortOrderType;
                if (getUserDevicesUsingGET_nodeParamType === 'str') {
                    getUserDevicesUsingGET_parameters.sortOrder = getUserDevicesUsingGET_nodeParam || '';
                } else {
                    getUserDevicesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserDevicesUsingGET_nodeParam);
                }
                getUserDevicesUsingGET_parameters.sortOrder = !!getUserDevicesUsingGET_parameters.sortOrder ? getUserDevicesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserDevicesUsingGET(getUserDevicesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveDeviceGroupOtaPackageUsingPOST') {
                var saveDeviceGroupOtaPackageUsingPOST_parameters = [];
                var saveDeviceGroupOtaPackageUsingPOST_nodeParam;
                var saveDeviceGroupOtaPackageUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveDeviceGroupOtaPackageUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDeviceGroupOtaPackageUsingPOST(saveDeviceGroupOtaPackageUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getFirmwareByIdUsingGET') {
                var getFirmwareByIdUsingGET_parameters = [];
                var getFirmwareByIdUsingGET_nodeParam;
                var getFirmwareByIdUsingGET_nodeParamType;

                getFirmwareByIdUsingGET_nodeParam = node.getFirmwareByIdUsingGET_groupId;
                getFirmwareByIdUsingGET_nodeParamType = node.getFirmwareByIdUsingGET_groupIdType;
                if (getFirmwareByIdUsingGET_nodeParamType === 'str') {
                    getFirmwareByIdUsingGET_parameters.groupId = getFirmwareByIdUsingGET_nodeParam || '';
                } else {
                    getFirmwareByIdUsingGET_parameters.groupId = RED.util.getMessageProperty(msg, getFirmwareByIdUsingGET_nodeParam);
                }
                getFirmwareByIdUsingGET_parameters.groupId = !!getFirmwareByIdUsingGET_parameters.groupId ? getFirmwareByIdUsingGET_parameters.groupId : msg.payload;
                
                getFirmwareByIdUsingGET_nodeParam = node.getFirmwareByIdUsingGET_firmwareType;
                getFirmwareByIdUsingGET_nodeParamType = node.getFirmwareByIdUsingGET_firmwareTypeType;
                if (getFirmwareByIdUsingGET_nodeParamType === 'str') {
                    getFirmwareByIdUsingGET_parameters.firmwareType = getFirmwareByIdUsingGET_nodeParam || '';
                } else {
                    getFirmwareByIdUsingGET_parameters.firmwareType = RED.util.getMessageProperty(msg, getFirmwareByIdUsingGET_nodeParam);
                }
                getFirmwareByIdUsingGET_parameters.firmwareType = !!getFirmwareByIdUsingGET_parameters.firmwareType ? getFirmwareByIdUsingGET_parameters.firmwareType : msg.payload;
                                result = client.getFirmwareByIdUsingGET(getFirmwareByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteDeviceGroupOtaPackageUsingDELETE') {
                var deleteDeviceGroupOtaPackageUsingDELETE_parameters = [];
                var deleteDeviceGroupOtaPackageUsingDELETE_nodeParam;
                var deleteDeviceGroupOtaPackageUsingDELETE_nodeParamType;

                deleteDeviceGroupOtaPackageUsingDELETE_nodeParam = node.deleteDeviceGroupOtaPackageUsingDELETE_id;
                deleteDeviceGroupOtaPackageUsingDELETE_nodeParamType = node.deleteDeviceGroupOtaPackageUsingDELETE_idType;
                if (deleteDeviceGroupOtaPackageUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceGroupOtaPackageUsingDELETE_parameters.id = deleteDeviceGroupOtaPackageUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceGroupOtaPackageUsingDELETE_parameters.id = RED.util.getMessageProperty(msg, deleteDeviceGroupOtaPackageUsingDELETE_nodeParam);
                }
                deleteDeviceGroupOtaPackageUsingDELETE_parameters.id = !!deleteDeviceGroupOtaPackageUsingDELETE_parameters.id ? deleteDeviceGroupOtaPackageUsingDELETE_parameters.id : msg.payload;
                                result = client.deleteDeviceGroupOtaPackageUsingDELETE(deleteDeviceGroupOtaPackageUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'saveDeviceProfileUsingPOST') {
                var saveDeviceProfileUsingPOST_parameters = [];
                var saveDeviceProfileUsingPOST_nodeParam;
                var saveDeviceProfileUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveDeviceProfileUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDeviceProfileUsingPOST(saveDeviceProfileUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAttributesKeysUsingGET') {
                var getAttributesKeysUsingGET_parameters = [];
                var getAttributesKeysUsingGET_nodeParam;
                var getAttributesKeysUsingGET_nodeParamType;

                getAttributesKeysUsingGET_nodeParam = node.getAttributesKeysUsingGET_deviceProfileId;
                getAttributesKeysUsingGET_nodeParamType = node.getAttributesKeysUsingGET_deviceProfileIdType;
                if (getAttributesKeysUsingGET_nodeParamType === 'str') {
                    getAttributesKeysUsingGET_parameters.deviceProfileId = getAttributesKeysUsingGET_nodeParam || '';
                } else {
                    getAttributesKeysUsingGET_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getAttributesKeysUsingGET_nodeParam);
                }
                getAttributesKeysUsingGET_parameters.deviceProfileId = !!getAttributesKeysUsingGET_parameters.deviceProfileId ? getAttributesKeysUsingGET_parameters.deviceProfileId : msg.payload;
                                result = client.getAttributesKeysUsingGET(getAttributesKeysUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTimeseriesKeysUsingGET') {
                var getTimeseriesKeysUsingGET_parameters = [];
                var getTimeseriesKeysUsingGET_nodeParam;
                var getTimeseriesKeysUsingGET_nodeParamType;

                getTimeseriesKeysUsingGET_nodeParam = node.getTimeseriesKeysUsingGET_deviceProfileId;
                getTimeseriesKeysUsingGET_nodeParamType = node.getTimeseriesKeysUsingGET_deviceProfileIdType;
                if (getTimeseriesKeysUsingGET_nodeParamType === 'str') {
                    getTimeseriesKeysUsingGET_parameters.deviceProfileId = getTimeseriesKeysUsingGET_nodeParam || '';
                } else {
                    getTimeseriesKeysUsingGET_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getTimeseriesKeysUsingGET_nodeParam);
                }
                getTimeseriesKeysUsingGET_parameters.deviceProfileId = !!getTimeseriesKeysUsingGET_parameters.deviceProfileId ? getTimeseriesKeysUsingGET_parameters.deviceProfileId : msg.payload;
                                result = client.getTimeseriesKeysUsingGET(getTimeseriesKeysUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceProfileByIdUsingGET') {
                var getDeviceProfileByIdUsingGET_parameters = [];
                var getDeviceProfileByIdUsingGET_nodeParam;
                var getDeviceProfileByIdUsingGET_nodeParamType;

                getDeviceProfileByIdUsingGET_nodeParam = node.getDeviceProfileByIdUsingGET_deviceProfileId;
                getDeviceProfileByIdUsingGET_nodeParamType = node.getDeviceProfileByIdUsingGET_deviceProfileIdType;
                if (getDeviceProfileByIdUsingGET_nodeParamType === 'str') {
                    getDeviceProfileByIdUsingGET_parameters.deviceProfileId = getDeviceProfileByIdUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileByIdUsingGET_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getDeviceProfileByIdUsingGET_nodeParam);
                }
                getDeviceProfileByIdUsingGET_parameters.deviceProfileId = !!getDeviceProfileByIdUsingGET_parameters.deviceProfileId ? getDeviceProfileByIdUsingGET_parameters.deviceProfileId : msg.payload;
                                result = client.getDeviceProfileByIdUsingGET(getDeviceProfileByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteDeviceProfileUsingDELETE') {
                var deleteDeviceProfileUsingDELETE_parameters = [];
                var deleteDeviceProfileUsingDELETE_nodeParam;
                var deleteDeviceProfileUsingDELETE_nodeParamType;

                deleteDeviceProfileUsingDELETE_nodeParam = node.deleteDeviceProfileUsingDELETE_deviceProfileId;
                deleteDeviceProfileUsingDELETE_nodeParamType = node.deleteDeviceProfileUsingDELETE_deviceProfileIdType;
                if (deleteDeviceProfileUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceProfileUsingDELETE_parameters.deviceProfileId = deleteDeviceProfileUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceProfileUsingDELETE_parameters.deviceProfileId = RED.util.getMessageProperty(msg, deleteDeviceProfileUsingDELETE_nodeParam);
                }
                deleteDeviceProfileUsingDELETE_parameters.deviceProfileId = !!deleteDeviceProfileUsingDELETE_parameters.deviceProfileId ? deleteDeviceProfileUsingDELETE_parameters.deviceProfileId : msg.payload;
                                result = client.deleteDeviceProfileUsingDELETE(deleteDeviceProfileUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'setDefaultDeviceProfileUsingPOST') {
                var setDefaultDeviceProfileUsingPOST_parameters = [];
                var setDefaultDeviceProfileUsingPOST_nodeParam;
                var setDefaultDeviceProfileUsingPOST_nodeParamType;

                setDefaultDeviceProfileUsingPOST_nodeParam = node.setDefaultDeviceProfileUsingPOST_deviceProfileId;
                setDefaultDeviceProfileUsingPOST_nodeParamType = node.setDefaultDeviceProfileUsingPOST_deviceProfileIdType;
                if (setDefaultDeviceProfileUsingPOST_nodeParamType === 'str') {
                    setDefaultDeviceProfileUsingPOST_parameters.deviceProfileId = setDefaultDeviceProfileUsingPOST_nodeParam || '';
                } else {
                    setDefaultDeviceProfileUsingPOST_parameters.deviceProfileId = RED.util.getMessageProperty(msg, setDefaultDeviceProfileUsingPOST_nodeParam);
                }
                setDefaultDeviceProfileUsingPOST_parameters.deviceProfileId = !!setDefaultDeviceProfileUsingPOST_parameters.deviceProfileId ? setDefaultDeviceProfileUsingPOST_parameters.deviceProfileId : msg.payload;
                                result = client.setDefaultDeviceProfileUsingPOST(setDefaultDeviceProfileUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getDefaultDeviceProfileInfoUsingGET') {
                var getDefaultDeviceProfileInfoUsingGET_parameters = [];
                var getDefaultDeviceProfileInfoUsingGET_nodeParam;
                var getDefaultDeviceProfileInfoUsingGET_nodeParamType;
                result = client.getDefaultDeviceProfileInfoUsingGET(getDefaultDeviceProfileInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceProfileInfoByIdUsingGET') {
                var getDeviceProfileInfoByIdUsingGET_parameters = [];
                var getDeviceProfileInfoByIdUsingGET_nodeParam;
                var getDeviceProfileInfoByIdUsingGET_nodeParamType;

                getDeviceProfileInfoByIdUsingGET_nodeParam = node.getDeviceProfileInfoByIdUsingGET_deviceProfileId;
                getDeviceProfileInfoByIdUsingGET_nodeParamType = node.getDeviceProfileInfoByIdUsingGET_deviceProfileIdType;
                if (getDeviceProfileInfoByIdUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfoByIdUsingGET_parameters.deviceProfileId = getDeviceProfileInfoByIdUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfoByIdUsingGET_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getDeviceProfileInfoByIdUsingGET_nodeParam);
                }
                getDeviceProfileInfoByIdUsingGET_parameters.deviceProfileId = !!getDeviceProfileInfoByIdUsingGET_parameters.deviceProfileId ? getDeviceProfileInfoByIdUsingGET_parameters.deviceProfileId : msg.payload;
                                result = client.getDeviceProfileInfoByIdUsingGET(getDeviceProfileInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceProfileInfosUsingGET') {
                var getDeviceProfileInfosUsingGET_parameters = [];
                var getDeviceProfileInfosUsingGET_nodeParam;
                var getDeviceProfileInfosUsingGET_nodeParamType;

                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_pageSize;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_pageSizeType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.pageSize = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.pageSize = !!getDeviceProfileInfosUsingGET_parameters.pageSize ? getDeviceProfileInfosUsingGET_parameters.pageSize : msg.payload;
                
                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_page;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_pageType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.page = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.page = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.page = !!getDeviceProfileInfosUsingGET_parameters.page ? getDeviceProfileInfosUsingGET_parameters.page : msg.payload;
                
                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_textSearch;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_textSearchType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.textSearch = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.textSearch = !!getDeviceProfileInfosUsingGET_parameters.textSearch ? getDeviceProfileInfosUsingGET_parameters.textSearch : msg.payload;
                
                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_sortProperty;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_sortPropertyType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.sortProperty = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.sortProperty = !!getDeviceProfileInfosUsingGET_parameters.sortProperty ? getDeviceProfileInfosUsingGET_parameters.sortProperty : msg.payload;
                
                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_sortOrder;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_sortOrderType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.sortOrder = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.sortOrder = !!getDeviceProfileInfosUsingGET_parameters.sortOrder ? getDeviceProfileInfosUsingGET_parameters.sortOrder : msg.payload;
                
                getDeviceProfileInfosUsingGET_nodeParam = node.getDeviceProfileInfosUsingGET_transportType;
                getDeviceProfileInfosUsingGET_nodeParamType = node.getDeviceProfileInfosUsingGET_transportTypeType;
                if (getDeviceProfileInfosUsingGET_nodeParamType === 'str') {
                    getDeviceProfileInfosUsingGET_parameters.transportType = getDeviceProfileInfosUsingGET_nodeParam || '';
                } else {
                    getDeviceProfileInfosUsingGET_parameters.transportType = RED.util.getMessageProperty(msg, getDeviceProfileInfosUsingGET_nodeParam);
                }
                getDeviceProfileInfosUsingGET_parameters.transportType = !!getDeviceProfileInfosUsingGET_parameters.transportType ? getDeviceProfileInfosUsingGET_parameters.transportType : msg.payload;
                                result = client.getDeviceProfileInfosUsingGET(getDeviceProfileInfosUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getDeviceProfilesUsingGET') {
                var getDeviceProfilesUsingGET_parameters = [];
                var getDeviceProfilesUsingGET_nodeParam;
                var getDeviceProfilesUsingGET_nodeParamType;

                getDeviceProfilesUsingGET_nodeParam = node.getDeviceProfilesUsingGET_pageSize;
                getDeviceProfilesUsingGET_nodeParamType = node.getDeviceProfilesUsingGET_pageSizeType;
                if (getDeviceProfilesUsingGET_nodeParamType === 'str') {
                    getDeviceProfilesUsingGET_parameters.pageSize = getDeviceProfilesUsingGET_nodeParam || '';
                } else {
                    getDeviceProfilesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getDeviceProfilesUsingGET_nodeParam);
                }
                getDeviceProfilesUsingGET_parameters.pageSize = !!getDeviceProfilesUsingGET_parameters.pageSize ? getDeviceProfilesUsingGET_parameters.pageSize : msg.payload;
                
                getDeviceProfilesUsingGET_nodeParam = node.getDeviceProfilesUsingGET_page;
                getDeviceProfilesUsingGET_nodeParamType = node.getDeviceProfilesUsingGET_pageType;
                if (getDeviceProfilesUsingGET_nodeParamType === 'str') {
                    getDeviceProfilesUsingGET_parameters.page = getDeviceProfilesUsingGET_nodeParam || '';
                } else {
                    getDeviceProfilesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getDeviceProfilesUsingGET_nodeParam);
                }
                getDeviceProfilesUsingGET_parameters.page = !!getDeviceProfilesUsingGET_parameters.page ? getDeviceProfilesUsingGET_parameters.page : msg.payload;
                
                getDeviceProfilesUsingGET_nodeParam = node.getDeviceProfilesUsingGET_textSearch;
                getDeviceProfilesUsingGET_nodeParamType = node.getDeviceProfilesUsingGET_textSearchType;
                if (getDeviceProfilesUsingGET_nodeParamType === 'str') {
                    getDeviceProfilesUsingGET_parameters.textSearch = getDeviceProfilesUsingGET_nodeParam || '';
                } else {
                    getDeviceProfilesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getDeviceProfilesUsingGET_nodeParam);
                }
                getDeviceProfilesUsingGET_parameters.textSearch = !!getDeviceProfilesUsingGET_parameters.textSearch ? getDeviceProfilesUsingGET_parameters.textSearch : msg.payload;
                
                getDeviceProfilesUsingGET_nodeParam = node.getDeviceProfilesUsingGET_sortProperty;
                getDeviceProfilesUsingGET_nodeParamType = node.getDeviceProfilesUsingGET_sortPropertyType;
                if (getDeviceProfilesUsingGET_nodeParamType === 'str') {
                    getDeviceProfilesUsingGET_parameters.sortProperty = getDeviceProfilesUsingGET_nodeParam || '';
                } else {
                    getDeviceProfilesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getDeviceProfilesUsingGET_nodeParam);
                }
                getDeviceProfilesUsingGET_parameters.sortProperty = !!getDeviceProfilesUsingGET_parameters.sortProperty ? getDeviceProfilesUsingGET_parameters.sortProperty : msg.payload;
                
                getDeviceProfilesUsingGET_nodeParam = node.getDeviceProfilesUsingGET_sortOrder;
                getDeviceProfilesUsingGET_nodeParamType = node.getDeviceProfilesUsingGET_sortOrderType;
                if (getDeviceProfilesUsingGET_nodeParamType === 'str') {
                    getDeviceProfilesUsingGET_parameters.sortOrder = getDeviceProfilesUsingGET_nodeParam || '';
                } else {
                    getDeviceProfilesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getDeviceProfilesUsingGET_nodeParam);
                }
                getDeviceProfilesUsingGET_parameters.sortOrder = !!getDeviceProfilesUsingGET_parameters.sortOrder ? getDeviceProfilesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getDeviceProfilesUsingGET(getDeviceProfilesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerEdgesUsingGET') {
                var getCustomerEdgesUsingGET_parameters = [];
                var getCustomerEdgesUsingGET_nodeParam;
                var getCustomerEdgesUsingGET_nodeParamType;

                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_customerId;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_customerIdType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.customerId = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.customerId = !!getCustomerEdgesUsingGET_parameters.customerId ? getCustomerEdgesUsingGET_parameters.customerId : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_pageSize;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_pageSizeType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.pageSize = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.pageSize = !!getCustomerEdgesUsingGET_parameters.pageSize ? getCustomerEdgesUsingGET_parameters.pageSize : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_page;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_pageType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.page = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.page = !!getCustomerEdgesUsingGET_parameters.page ? getCustomerEdgesUsingGET_parameters.page : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_type;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_typeType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.type = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.type = !!getCustomerEdgesUsingGET_parameters.type ? getCustomerEdgesUsingGET_parameters.type : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_textSearch;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_textSearchType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.textSearch = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.textSearch = !!getCustomerEdgesUsingGET_parameters.textSearch ? getCustomerEdgesUsingGET_parameters.textSearch : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_sortProperty;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_sortPropertyType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.sortProperty = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.sortProperty = !!getCustomerEdgesUsingGET_parameters.sortProperty ? getCustomerEdgesUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomerEdgesUsingGET_nodeParam = node.getCustomerEdgesUsingGET_sortOrder;
                getCustomerEdgesUsingGET_nodeParamType = node.getCustomerEdgesUsingGET_sortOrderType;
                if (getCustomerEdgesUsingGET_nodeParamType === 'str') {
                    getCustomerEdgesUsingGET_parameters.sortOrder = getCustomerEdgesUsingGET_nodeParam || '';
                } else {
                    getCustomerEdgesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomerEdgesUsingGET_nodeParam);
                }
                getCustomerEdgesUsingGET_parameters.sortOrder = !!getCustomerEdgesUsingGET_parameters.sortOrder ? getCustomerEdgesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomerEdgesUsingGET(getCustomerEdgesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'processEdgesBulkImportUsingPOST') {
                var processEdgesBulkImportUsingPOST_parameters = [];
                var processEdgesBulkImportUsingPOST_nodeParam;
                var processEdgesBulkImportUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    processEdgesBulkImportUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.processEdgesBulkImportUsingPOST(processEdgesBulkImportUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findMissingToRelatedRuleChainsUsingGET') {
                var findMissingToRelatedRuleChainsUsingGET_parameters = [];
                var findMissingToRelatedRuleChainsUsingGET_nodeParam;
                var findMissingToRelatedRuleChainsUsingGET_nodeParamType;

                findMissingToRelatedRuleChainsUsingGET_nodeParam = node.findMissingToRelatedRuleChainsUsingGET_edgeId;
                findMissingToRelatedRuleChainsUsingGET_nodeParamType = node.findMissingToRelatedRuleChainsUsingGET_edgeIdType;
                if (findMissingToRelatedRuleChainsUsingGET_nodeParamType === 'str') {
                    findMissingToRelatedRuleChainsUsingGET_parameters.edgeId = findMissingToRelatedRuleChainsUsingGET_nodeParam || '';
                } else {
                    findMissingToRelatedRuleChainsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, findMissingToRelatedRuleChainsUsingGET_nodeParam);
                }
                findMissingToRelatedRuleChainsUsingGET_parameters.edgeId = !!findMissingToRelatedRuleChainsUsingGET_parameters.edgeId ? findMissingToRelatedRuleChainsUsingGET_parameters.edgeId : msg.payload;
                                result = client.findMissingToRelatedRuleChainsUsingGET(findMissingToRelatedRuleChainsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'syncEdgeUsingPOST') {
                var syncEdgeUsingPOST_parameters = [];
                var syncEdgeUsingPOST_nodeParam;
                var syncEdgeUsingPOST_nodeParamType;

                syncEdgeUsingPOST_nodeParam = node.syncEdgeUsingPOST_edgeId;
                syncEdgeUsingPOST_nodeParamType = node.syncEdgeUsingPOST_edgeIdType;
                if (syncEdgeUsingPOST_nodeParamType === 'str') {
                    syncEdgeUsingPOST_parameters.edgeId = syncEdgeUsingPOST_nodeParam || '';
                } else {
                    syncEdgeUsingPOST_parameters.edgeId = RED.util.getMessageProperty(msg, syncEdgeUsingPOST_nodeParam);
                }
                syncEdgeUsingPOST_parameters.edgeId = !!syncEdgeUsingPOST_parameters.edgeId ? syncEdgeUsingPOST_parameters.edgeId : msg.payload;
                                result = client.syncEdgeUsingPOST(syncEdgeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeTypesUsingGET') {
                var getEdgeTypesUsingGET_parameters = [];
                var getEdgeTypesUsingGET_nodeParam;
                var getEdgeTypesUsingGET_nodeParamType;
                result = client.getEdgeTypesUsingGET(getEdgeTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeByIdUsingGET') {
                var getEdgeByIdUsingGET_parameters = [];
                var getEdgeByIdUsingGET_nodeParam;
                var getEdgeByIdUsingGET_nodeParamType;

                getEdgeByIdUsingGET_nodeParam = node.getEdgeByIdUsingGET_edgeId;
                getEdgeByIdUsingGET_nodeParamType = node.getEdgeByIdUsingGET_edgeIdType;
                if (getEdgeByIdUsingGET_nodeParamType === 'str') {
                    getEdgeByIdUsingGET_parameters.edgeId = getEdgeByIdUsingGET_nodeParam || '';
                } else {
                    getEdgeByIdUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getEdgeByIdUsingGET_nodeParam);
                }
                getEdgeByIdUsingGET_parameters.edgeId = !!getEdgeByIdUsingGET_parameters.edgeId ? getEdgeByIdUsingGET_parameters.edgeId : msg.payload;
                                result = client.getEdgeByIdUsingGET(getEdgeByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteEdgeUsingDELETE') {
                var deleteEdgeUsingDELETE_parameters = [];
                var deleteEdgeUsingDELETE_nodeParam;
                var deleteEdgeUsingDELETE_nodeParamType;

                deleteEdgeUsingDELETE_nodeParam = node.deleteEdgeUsingDELETE_edgeId;
                deleteEdgeUsingDELETE_nodeParamType = node.deleteEdgeUsingDELETE_edgeIdType;
                if (deleteEdgeUsingDELETE_nodeParamType === 'str') {
                    deleteEdgeUsingDELETE_parameters.edgeId = deleteEdgeUsingDELETE_nodeParam || '';
                } else {
                    deleteEdgeUsingDELETE_parameters.edgeId = RED.util.getMessageProperty(msg, deleteEdgeUsingDELETE_nodeParam);
                }
                deleteEdgeUsingDELETE_parameters.edgeId = !!deleteEdgeUsingDELETE_parameters.edgeId ? deleteEdgeUsingDELETE_parameters.edgeId : msg.payload;
                                result = client.deleteEdgeUsingDELETE(deleteEdgeUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'setEdgeRootRuleChainUsingPOST') {
                var setEdgeRootRuleChainUsingPOST_parameters = [];
                var setEdgeRootRuleChainUsingPOST_nodeParam;
                var setEdgeRootRuleChainUsingPOST_nodeParamType;

                setEdgeRootRuleChainUsingPOST_nodeParam = node.setEdgeRootRuleChainUsingPOST_edgeId;
                setEdgeRootRuleChainUsingPOST_nodeParamType = node.setEdgeRootRuleChainUsingPOST_edgeIdType;
                if (setEdgeRootRuleChainUsingPOST_nodeParamType === 'str') {
                    setEdgeRootRuleChainUsingPOST_parameters.edgeId = setEdgeRootRuleChainUsingPOST_nodeParam || '';
                } else {
                    setEdgeRootRuleChainUsingPOST_parameters.edgeId = RED.util.getMessageProperty(msg, setEdgeRootRuleChainUsingPOST_nodeParam);
                }
                setEdgeRootRuleChainUsingPOST_parameters.edgeId = !!setEdgeRootRuleChainUsingPOST_parameters.edgeId ? setEdgeRootRuleChainUsingPOST_parameters.edgeId : msg.payload;
                
                setEdgeRootRuleChainUsingPOST_nodeParam = node.setEdgeRootRuleChainUsingPOST_ruleChainId;
                setEdgeRootRuleChainUsingPOST_nodeParamType = node.setEdgeRootRuleChainUsingPOST_ruleChainIdType;
                if (setEdgeRootRuleChainUsingPOST_nodeParamType === 'str') {
                    setEdgeRootRuleChainUsingPOST_parameters.ruleChainId = setEdgeRootRuleChainUsingPOST_nodeParam || '';
                } else {
                    setEdgeRootRuleChainUsingPOST_parameters.ruleChainId = RED.util.getMessageProperty(msg, setEdgeRootRuleChainUsingPOST_nodeParam);
                }
                setEdgeRootRuleChainUsingPOST_parameters.ruleChainId = !!setEdgeRootRuleChainUsingPOST_parameters.ruleChainId ? setEdgeRootRuleChainUsingPOST_parameters.ruleChainId : msg.payload;
                                result = client.setEdgeRootRuleChainUsingPOST(setEdgeRootRuleChainUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findByQueryUsingPOST_2') {
                var findByQueryUsingPOST_2_parameters = [];
                var findByQueryUsingPOST_2_nodeParam;
                var findByQueryUsingPOST_2_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findByQueryUsingPOST_2_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findByQueryUsingPOST_2(findByQueryUsingPOST_2_parameters);
            }
            if (!errorFlag && node.method === 'isEdgesSupportEnabledUsingGET') {
                var isEdgesSupportEnabledUsingGET_parameters = [];
                var isEdgesSupportEnabledUsingGET_nodeParam;
                var isEdgesSupportEnabledUsingGET_nodeParamType;
                result = client.isEdgesSupportEnabledUsingGET(isEdgesSupportEnabledUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEdgesByIdsUsingGET') {
                var getEdgesByIdsUsingGET_parameters = [];
                var getEdgesByIdsUsingGET_nodeParam;
                var getEdgesByIdsUsingGET_nodeParamType;

                getEdgesByIdsUsingGET_nodeParam = node.getEdgesByIdsUsingGET_edgeIds;
                getEdgesByIdsUsingGET_nodeParamType = node.getEdgesByIdsUsingGET_edgeIdsType;
                if (getEdgesByIdsUsingGET_nodeParamType === 'str') {
                    getEdgesByIdsUsingGET_parameters.edgeIds = getEdgesByIdsUsingGET_nodeParam || '';
                } else {
                    getEdgesByIdsUsingGET_parameters.edgeIds = RED.util.getMessageProperty(msg, getEdgesByIdsUsingGET_nodeParam);
                }
                getEdgesByIdsUsingGET_parameters.edgeIds = !!getEdgesByIdsUsingGET_parameters.edgeIds ? getEdgesByIdsUsingGET_parameters.edgeIds : msg.payload;
                                result = client.getEdgesByIdsUsingGET(getEdgesByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEdgesUsingGET') {
                var getEdgesUsingGET_parameters = [];
                var getEdgesUsingGET_nodeParam;
                var getEdgesUsingGET_nodeParamType;

                getEdgesUsingGET_nodeParam = node.getEdgesUsingGET_pageSize;
                getEdgesUsingGET_nodeParamType = node.getEdgesUsingGET_pageSizeType;
                if (getEdgesUsingGET_nodeParamType === 'str') {
                    getEdgesUsingGET_parameters.pageSize = getEdgesUsingGET_nodeParam || '';
                } else {
                    getEdgesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgesUsingGET_nodeParam);
                }
                getEdgesUsingGET_parameters.pageSize = !!getEdgesUsingGET_parameters.pageSize ? getEdgesUsingGET_parameters.pageSize : msg.payload;
                
                getEdgesUsingGET_nodeParam = node.getEdgesUsingGET_page;
                getEdgesUsingGET_nodeParamType = node.getEdgesUsingGET_pageType;
                if (getEdgesUsingGET_nodeParamType === 'str') {
                    getEdgesUsingGET_parameters.page = getEdgesUsingGET_nodeParam || '';
                } else {
                    getEdgesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgesUsingGET_nodeParam);
                }
                getEdgesUsingGET_parameters.page = !!getEdgesUsingGET_parameters.page ? getEdgesUsingGET_parameters.page : msg.payload;
                
                getEdgesUsingGET_nodeParam = node.getEdgesUsingGET_textSearch;
                getEdgesUsingGET_nodeParamType = node.getEdgesUsingGET_textSearchType;
                if (getEdgesUsingGET_nodeParamType === 'str') {
                    getEdgesUsingGET_parameters.textSearch = getEdgesUsingGET_nodeParam || '';
                } else {
                    getEdgesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEdgesUsingGET_nodeParam);
                }
                getEdgesUsingGET_parameters.textSearch = !!getEdgesUsingGET_parameters.textSearch ? getEdgesUsingGET_parameters.textSearch : msg.payload;
                
                getEdgesUsingGET_nodeParam = node.getEdgesUsingGET_sortProperty;
                getEdgesUsingGET_nodeParamType = node.getEdgesUsingGET_sortPropertyType;
                if (getEdgesUsingGET_nodeParamType === 'str') {
                    getEdgesUsingGET_parameters.sortProperty = getEdgesUsingGET_nodeParam || '';
                } else {
                    getEdgesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgesUsingGET_nodeParam);
                }
                getEdgesUsingGET_parameters.sortProperty = !!getEdgesUsingGET_parameters.sortProperty ? getEdgesUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgesUsingGET_nodeParam = node.getEdgesUsingGET_sortOrder;
                getEdgesUsingGET_nodeParamType = node.getEdgesUsingGET_sortOrderType;
                if (getEdgesUsingGET_nodeParamType === 'str') {
                    getEdgesUsingGET_parameters.sortOrder = getEdgesUsingGET_nodeParam || '';
                } else {
                    getEdgesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgesUsingGET_nodeParam);
                }
                getEdgesUsingGET_parameters.sortOrder = !!getEdgesUsingGET_parameters.sortOrder ? getEdgesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEdgesUsingGET(getEdgesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveEdgeUsingPOST') {
                var saveEdgeUsingPOST_parameters = [];
                var saveEdgeUsingPOST_nodeParam;
                var saveEdgeUsingPOST_nodeParamType;

                saveEdgeUsingPOST_nodeParam = node.saveEdgeUsingPOST_entityGroupId;
                saveEdgeUsingPOST_nodeParamType = node.saveEdgeUsingPOST_entityGroupIdType;
                if (saveEdgeUsingPOST_nodeParamType === 'str') {
                    saveEdgeUsingPOST_parameters.entityGroupId = saveEdgeUsingPOST_nodeParam || '';
                } else {
                    saveEdgeUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveEdgeUsingPOST_nodeParam);
                }
                saveEdgeUsingPOST_parameters.entityGroupId = !!saveEdgeUsingPOST_parameters.entityGroupId ? saveEdgeUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEdgeUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEdgeUsingPOST(saveEdgeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEdgesByEntityGroupIdUsingGET') {
                var getEdgesByEntityGroupIdUsingGET_parameters = [];
                var getEdgesByEntityGroupIdUsingGET_nodeParam;
                var getEdgesByEntityGroupIdUsingGET_nodeParamType;

                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_entityGroupId;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_entityGroupIdType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.entityGroupId = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.entityGroupId = !!getEdgesByEntityGroupIdUsingGET_parameters.entityGroupId ? getEdgesByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_pageSize;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_pageSizeType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.pageSize = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.pageSize = !!getEdgesByEntityGroupIdUsingGET_parameters.pageSize ? getEdgesByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_page;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_pageType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.page = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.page = !!getEdgesByEntityGroupIdUsingGET_parameters.page ? getEdgesByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_textSearch;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_textSearchType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.textSearch = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.textSearch = !!getEdgesByEntityGroupIdUsingGET_parameters.textSearch ? getEdgesByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_sortProperty;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_sortPropertyType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.sortProperty = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.sortProperty = !!getEdgesByEntityGroupIdUsingGET_parameters.sortProperty ? getEdgesByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgesByEntityGroupIdUsingGET_nodeParam = node.getEdgesByEntityGroupIdUsingGET_sortOrder;
                getEdgesByEntityGroupIdUsingGET_nodeParamType = node.getEdgesByEntityGroupIdUsingGET_sortOrderType;
                if (getEdgesByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEdgesByEntityGroupIdUsingGET_parameters.sortOrder = getEdgesByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEdgesByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgesByEntityGroupIdUsingGET_nodeParam);
                }
                getEdgesByEntityGroupIdUsingGET_parameters.sortOrder = !!getEdgesByEntityGroupIdUsingGET_parameters.sortOrder ? getEdgesByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEdgesByEntityGroupIdUsingGET(getEdgesByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'activateInstanceUsingPOST') {
                var activateInstanceUsingPOST_parameters = [];
                var activateInstanceUsingPOST_nodeParam;
                var activateInstanceUsingPOST_nodeParamType;

                activateInstanceUsingPOST_nodeParam = node.activateInstanceUsingPOST_licenseSecret;
                activateInstanceUsingPOST_nodeParamType = node.activateInstanceUsingPOST_licenseSecretType;
                if (activateInstanceUsingPOST_nodeParamType === 'str') {
                    activateInstanceUsingPOST_parameters.licenseSecret = activateInstanceUsingPOST_nodeParam || '';
                } else {
                    activateInstanceUsingPOST_parameters.licenseSecret = RED.util.getMessageProperty(msg, activateInstanceUsingPOST_nodeParam);
                }
                activateInstanceUsingPOST_parameters.licenseSecret = !!activateInstanceUsingPOST_parameters.licenseSecret ? activateInstanceUsingPOST_parameters.licenseSecret : msg.payload;
                
                activateInstanceUsingPOST_nodeParam = node.activateInstanceUsingPOST_releaseDate;
                activateInstanceUsingPOST_nodeParamType = node.activateInstanceUsingPOST_releaseDateType;
                if (activateInstanceUsingPOST_nodeParamType === 'str') {
                    activateInstanceUsingPOST_parameters.releaseDate = activateInstanceUsingPOST_nodeParam || '';
                } else {
                    activateInstanceUsingPOST_parameters.releaseDate = RED.util.getMessageProperty(msg, activateInstanceUsingPOST_nodeParam);
                }
                activateInstanceUsingPOST_parameters.releaseDate = !!activateInstanceUsingPOST_parameters.releaseDate ? activateInstanceUsingPOST_parameters.releaseDate : msg.payload;
                                result = client.activateInstanceUsingPOST(activateInstanceUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'checkInstanceUsingPOST') {
                var checkInstanceUsingPOST_parameters = [];
                var checkInstanceUsingPOST_nodeParam;
                var checkInstanceUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    checkInstanceUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.checkInstanceUsingPOST(checkInstanceUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantEdgeUsingGET') {
                var getTenantEdgeUsingGET_parameters = [];
                var getTenantEdgeUsingGET_nodeParam;
                var getTenantEdgeUsingGET_nodeParamType;

                getTenantEdgeUsingGET_nodeParam = node.getTenantEdgeUsingGET_edgeName;
                getTenantEdgeUsingGET_nodeParamType = node.getTenantEdgeUsingGET_edgeNameType;
                if (getTenantEdgeUsingGET_nodeParamType === 'str') {
                    getTenantEdgeUsingGET_parameters.edgeName = getTenantEdgeUsingGET_nodeParam || '';
                } else {
                    getTenantEdgeUsingGET_parameters.edgeName = RED.util.getMessageProperty(msg, getTenantEdgeUsingGET_nodeParam);
                }
                getTenantEdgeUsingGET_parameters.edgeName = !!getTenantEdgeUsingGET_parameters.edgeName ? getTenantEdgeUsingGET_parameters.edgeName : msg.payload;
                                result = client.getTenantEdgeUsingGET(getTenantEdgeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantEdgesUsingGET') {
                var getTenantEdgesUsingGET_parameters = [];
                var getTenantEdgesUsingGET_nodeParam;
                var getTenantEdgesUsingGET_nodeParamType;

                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_pageSize;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_pageSizeType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.pageSize = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.pageSize = !!getTenantEdgesUsingGET_parameters.pageSize ? getTenantEdgesUsingGET_parameters.pageSize : msg.payload;
                
                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_page;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_pageType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.page = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.page = !!getTenantEdgesUsingGET_parameters.page ? getTenantEdgesUsingGET_parameters.page : msg.payload;
                
                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_type;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_typeType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.type = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.type = !!getTenantEdgesUsingGET_parameters.type ? getTenantEdgesUsingGET_parameters.type : msg.payload;
                
                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_textSearch;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_textSearchType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.textSearch = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.textSearch = !!getTenantEdgesUsingGET_parameters.textSearch ? getTenantEdgesUsingGET_parameters.textSearch : msg.payload;
                
                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_sortProperty;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_sortPropertyType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.sortProperty = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.sortProperty = !!getTenantEdgesUsingGET_parameters.sortProperty ? getTenantEdgesUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantEdgesUsingGET_nodeParam = node.getTenantEdgesUsingGET_sortOrder;
                getTenantEdgesUsingGET_nodeParamType = node.getTenantEdgesUsingGET_sortOrderType;
                if (getTenantEdgesUsingGET_nodeParamType === 'str') {
                    getTenantEdgesUsingGET_parameters.sortOrder = getTenantEdgesUsingGET_nodeParam || '';
                } else {
                    getTenantEdgesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantEdgesUsingGET_nodeParam);
                }
                getTenantEdgesUsingGET_parameters.sortOrder = !!getTenantEdgesUsingGET_parameters.sortOrder ? getTenantEdgesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantEdgesUsingGET(getTenantEdgesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserEdgesUsingGET') {
                var getUserEdgesUsingGET_parameters = [];
                var getUserEdgesUsingGET_nodeParam;
                var getUserEdgesUsingGET_nodeParamType;

                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_pageSize;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_pageSizeType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.pageSize = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.pageSize = !!getUserEdgesUsingGET_parameters.pageSize ? getUserEdgesUsingGET_parameters.pageSize : msg.payload;
                
                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_page;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_pageType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.page = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.page = !!getUserEdgesUsingGET_parameters.page ? getUserEdgesUsingGET_parameters.page : msg.payload;
                
                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_type;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_typeType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.type = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.type = !!getUserEdgesUsingGET_parameters.type ? getUserEdgesUsingGET_parameters.type : msg.payload;
                
                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_textSearch;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_textSearchType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.textSearch = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.textSearch = !!getUserEdgesUsingGET_parameters.textSearch ? getUserEdgesUsingGET_parameters.textSearch : msg.payload;
                
                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_sortProperty;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_sortPropertyType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.sortProperty = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.sortProperty = !!getUserEdgesUsingGET_parameters.sortProperty ? getUserEdgesUsingGET_parameters.sortProperty : msg.payload;
                
                getUserEdgesUsingGET_nodeParam = node.getUserEdgesUsingGET_sortOrder;
                getUserEdgesUsingGET_nodeParamType = node.getUserEdgesUsingGET_sortOrderType;
                if (getUserEdgesUsingGET_nodeParamType === 'str') {
                    getUserEdgesUsingGET_parameters.sortOrder = getUserEdgesUsingGET_nodeParam || '';
                } else {
                    getUserEdgesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserEdgesUsingGET_nodeParam);
                }
                getUserEdgesUsingGET_parameters.sortOrder = !!getUserEdgesUsingGET_parameters.sortOrder ? getUserEdgesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserEdgesUsingGET(getUserEdgesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeEventsUsingGET') {
                var getEdgeEventsUsingGET_parameters = [];
                var getEdgeEventsUsingGET_nodeParam;
                var getEdgeEventsUsingGET_nodeParamType;

                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_edgeId;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_edgeIdType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.edgeId = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.edgeId = !!getEdgeEventsUsingGET_parameters.edgeId ? getEdgeEventsUsingGET_parameters.edgeId : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_pageSize;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_pageSizeType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.pageSize = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.pageSize = !!getEdgeEventsUsingGET_parameters.pageSize ? getEdgeEventsUsingGET_parameters.pageSize : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_page;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_pageType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.page = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.page = !!getEdgeEventsUsingGET_parameters.page ? getEdgeEventsUsingGET_parameters.page : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_textSearch;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_textSearchType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.textSearch = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.textSearch = !!getEdgeEventsUsingGET_parameters.textSearch ? getEdgeEventsUsingGET_parameters.textSearch : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_sortProperty;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_sortPropertyType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.sortProperty = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.sortProperty = !!getEdgeEventsUsingGET_parameters.sortProperty ? getEdgeEventsUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_sortOrder;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_sortOrderType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.sortOrder = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.sortOrder = !!getEdgeEventsUsingGET_parameters.sortOrder ? getEdgeEventsUsingGET_parameters.sortOrder : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_startTime;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_startTimeType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.startTime = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.startTime = !!getEdgeEventsUsingGET_parameters.startTime ? getEdgeEventsUsingGET_parameters.startTime : msg.payload;
                
                getEdgeEventsUsingGET_nodeParam = node.getEdgeEventsUsingGET_endTime;
                getEdgeEventsUsingGET_nodeParamType = node.getEdgeEventsUsingGET_endTimeType;
                if (getEdgeEventsUsingGET_nodeParamType === 'str') {
                    getEdgeEventsUsingGET_parameters.endTime = getEdgeEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeEventsUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getEdgeEventsUsingGET_nodeParam);
                }
                getEdgeEventsUsingGET_parameters.endTime = !!getEdgeEventsUsingGET_parameters.endTime ? getEdgeEventsUsingGET_parameters.endTime : msg.payload;
                                result = client.getEdgeEventsUsingGET(getEdgeEventsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAllEdgeEntityGroupsUsingGET') {
                var getAllEdgeEntityGroupsUsingGET_parameters = [];
                var getAllEdgeEntityGroupsUsingGET_nodeParam;
                var getAllEdgeEntityGroupsUsingGET_nodeParamType;

                getAllEdgeEntityGroupsUsingGET_nodeParam = node.getAllEdgeEntityGroupsUsingGET_edgeId;
                getAllEdgeEntityGroupsUsingGET_nodeParamType = node.getAllEdgeEntityGroupsUsingGET_edgeIdType;
                if (getAllEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getAllEdgeEntityGroupsUsingGET_parameters.edgeId = getAllEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getAllEdgeEntityGroupsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getAllEdgeEntityGroupsUsingGET_nodeParam);
                }
                getAllEdgeEntityGroupsUsingGET_parameters.edgeId = !!getAllEdgeEntityGroupsUsingGET_parameters.edgeId ? getAllEdgeEntityGroupsUsingGET_parameters.edgeId : msg.payload;
                
                getAllEdgeEntityGroupsUsingGET_nodeParam = node.getAllEdgeEntityGroupsUsingGET_groupType;
                getAllEdgeEntityGroupsUsingGET_nodeParamType = node.getAllEdgeEntityGroupsUsingGET_groupTypeType;
                if (getAllEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getAllEdgeEntityGroupsUsingGET_parameters.groupType = getAllEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getAllEdgeEntityGroupsUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getAllEdgeEntityGroupsUsingGET_nodeParam);
                }
                getAllEdgeEntityGroupsUsingGET_parameters.groupType = !!getAllEdgeEntityGroupsUsingGET_parameters.groupType ? getAllEdgeEntityGroupsUsingGET_parameters.groupType : msg.payload;
                                result = client.getAllEdgeEntityGroupsUsingGET(getAllEdgeEntityGroupsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'assignEntityGroupToEdgeUsingPOST') {
                var assignEntityGroupToEdgeUsingPOST_parameters = [];
                var assignEntityGroupToEdgeUsingPOST_nodeParam;
                var assignEntityGroupToEdgeUsingPOST_nodeParamType;

                assignEntityGroupToEdgeUsingPOST_nodeParam = node.assignEntityGroupToEdgeUsingPOST_edgeId;
                assignEntityGroupToEdgeUsingPOST_nodeParamType = node.assignEntityGroupToEdgeUsingPOST_edgeIdType;
                if (assignEntityGroupToEdgeUsingPOST_nodeParamType === 'str') {
                    assignEntityGroupToEdgeUsingPOST_parameters.edgeId = assignEntityGroupToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignEntityGroupToEdgeUsingPOST_parameters.edgeId = RED.util.getMessageProperty(msg, assignEntityGroupToEdgeUsingPOST_nodeParam);
                }
                assignEntityGroupToEdgeUsingPOST_parameters.edgeId = !!assignEntityGroupToEdgeUsingPOST_parameters.edgeId ? assignEntityGroupToEdgeUsingPOST_parameters.edgeId : msg.payload;
                
                assignEntityGroupToEdgeUsingPOST_nodeParam = node.assignEntityGroupToEdgeUsingPOST_groupType;
                assignEntityGroupToEdgeUsingPOST_nodeParamType = node.assignEntityGroupToEdgeUsingPOST_groupTypeType;
                if (assignEntityGroupToEdgeUsingPOST_nodeParamType === 'str') {
                    assignEntityGroupToEdgeUsingPOST_parameters.groupType = assignEntityGroupToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignEntityGroupToEdgeUsingPOST_parameters.groupType = RED.util.getMessageProperty(msg, assignEntityGroupToEdgeUsingPOST_nodeParam);
                }
                assignEntityGroupToEdgeUsingPOST_parameters.groupType = !!assignEntityGroupToEdgeUsingPOST_parameters.groupType ? assignEntityGroupToEdgeUsingPOST_parameters.groupType : msg.payload;
                
                assignEntityGroupToEdgeUsingPOST_nodeParam = node.assignEntityGroupToEdgeUsingPOST_entityGroupId;
                assignEntityGroupToEdgeUsingPOST_nodeParamType = node.assignEntityGroupToEdgeUsingPOST_entityGroupIdType;
                if (assignEntityGroupToEdgeUsingPOST_nodeParamType === 'str') {
                    assignEntityGroupToEdgeUsingPOST_parameters.entityGroupId = assignEntityGroupToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignEntityGroupToEdgeUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, assignEntityGroupToEdgeUsingPOST_nodeParam);
                }
                assignEntityGroupToEdgeUsingPOST_parameters.entityGroupId = !!assignEntityGroupToEdgeUsingPOST_parameters.entityGroupId ? assignEntityGroupToEdgeUsingPOST_parameters.entityGroupId : msg.payload;
                                result = client.assignEntityGroupToEdgeUsingPOST(assignEntityGroupToEdgeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'unassignEntityGroupFromEdgeUsingDELETE') {
                var unassignEntityGroupFromEdgeUsingDELETE_parameters = [];
                var unassignEntityGroupFromEdgeUsingDELETE_nodeParam;
                var unassignEntityGroupFromEdgeUsingDELETE_nodeParamType;

                unassignEntityGroupFromEdgeUsingDELETE_nodeParam = node.unassignEntityGroupFromEdgeUsingDELETE_edgeId;
                unassignEntityGroupFromEdgeUsingDELETE_nodeParamType = node.unassignEntityGroupFromEdgeUsingDELETE_edgeIdType;
                if (unassignEntityGroupFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.edgeId = unassignEntityGroupFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.edgeId = RED.util.getMessageProperty(msg, unassignEntityGroupFromEdgeUsingDELETE_nodeParam);
                }
                unassignEntityGroupFromEdgeUsingDELETE_parameters.edgeId = !!unassignEntityGroupFromEdgeUsingDELETE_parameters.edgeId ? unassignEntityGroupFromEdgeUsingDELETE_parameters.edgeId : msg.payload;
                
                unassignEntityGroupFromEdgeUsingDELETE_nodeParam = node.unassignEntityGroupFromEdgeUsingDELETE_groupType;
                unassignEntityGroupFromEdgeUsingDELETE_nodeParamType = node.unassignEntityGroupFromEdgeUsingDELETE_groupTypeType;
                if (unassignEntityGroupFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.groupType = unassignEntityGroupFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.groupType = RED.util.getMessageProperty(msg, unassignEntityGroupFromEdgeUsingDELETE_nodeParam);
                }
                unassignEntityGroupFromEdgeUsingDELETE_parameters.groupType = !!unassignEntityGroupFromEdgeUsingDELETE_parameters.groupType ? unassignEntityGroupFromEdgeUsingDELETE_parameters.groupType : msg.payload;
                
                unassignEntityGroupFromEdgeUsingDELETE_nodeParam = node.unassignEntityGroupFromEdgeUsingDELETE_entityGroupId;
                unassignEntityGroupFromEdgeUsingDELETE_nodeParamType = node.unassignEntityGroupFromEdgeUsingDELETE_entityGroupIdType;
                if (unassignEntityGroupFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.entityGroupId = unassignEntityGroupFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignEntityGroupFromEdgeUsingDELETE_parameters.entityGroupId = RED.util.getMessageProperty(msg, unassignEntityGroupFromEdgeUsingDELETE_nodeParam);
                }
                unassignEntityGroupFromEdgeUsingDELETE_parameters.entityGroupId = !!unassignEntityGroupFromEdgeUsingDELETE_parameters.entityGroupId ? unassignEntityGroupFromEdgeUsingDELETE_parameters.entityGroupId : msg.payload;
                                result = client.unassignEntityGroupFromEdgeUsingDELETE(unassignEntityGroupFromEdgeUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityGroupUsingPOST') {
                var saveEntityGroupUsingPOST_parameters = [];
                var saveEntityGroupUsingPOST_nodeParam;
                var saveEntityGroupUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveEntityGroupUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityGroupUsingPOST(saveEntityGroupUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupAllByOwnerAndTypeUsingGET') {
                var getEntityGroupAllByOwnerAndTypeUsingGET_parameters = [];
                var getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam;
                var getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType;

                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupAllByOwnerAndTypeUsingGET_ownerType;
                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupAllByOwnerAndTypeUsingGET_ownerTypeType;
                if (getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerType = getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerType = RED.util.getMessageProperty(msg, getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerType = !!getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerType ? getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerType : msg.payload;
                
                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupAllByOwnerAndTypeUsingGET_ownerId;
                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupAllByOwnerAndTypeUsingGET_ownerIdType;
                if (getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerId = getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerId = RED.util.getMessageProperty(msg, getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerId = !!getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerId ? getEntityGroupAllByOwnerAndTypeUsingGET_parameters.ownerId : msg.payload;
                
                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupAllByOwnerAndTypeUsingGET_groupType;
                getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupAllByOwnerAndTypeUsingGET_groupTypeType;
                if (getEntityGroupAllByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.groupType = getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupAllByOwnerAndTypeUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getEntityGroupAllByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupAllByOwnerAndTypeUsingGET_parameters.groupType = !!getEntityGroupAllByOwnerAndTypeUsingGET_parameters.groupType ? getEntityGroupAllByOwnerAndTypeUsingGET_parameters.groupType : msg.payload;
                                result = client.getEntityGroupAllByOwnerAndTypeUsingGET(getEntityGroupAllByOwnerAndTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupByIdUsingGET') {
                var getEntityGroupByIdUsingGET_parameters = [];
                var getEntityGroupByIdUsingGET_nodeParam;
                var getEntityGroupByIdUsingGET_nodeParamType;

                getEntityGroupByIdUsingGET_nodeParam = node.getEntityGroupByIdUsingGET_entityGroupId;
                getEntityGroupByIdUsingGET_nodeParamType = node.getEntityGroupByIdUsingGET_entityGroupIdType;
                if (getEntityGroupByIdUsingGET_nodeParamType === 'str') {
                    getEntityGroupByIdUsingGET_parameters.entityGroupId = getEntityGroupByIdUsingGET_nodeParam || '';
                } else {
                    getEntityGroupByIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getEntityGroupByIdUsingGET_nodeParam);
                }
                getEntityGroupByIdUsingGET_parameters.entityGroupId = !!getEntityGroupByIdUsingGET_parameters.entityGroupId ? getEntityGroupByIdUsingGET_parameters.entityGroupId : msg.payload;
                                result = client.getEntityGroupByIdUsingGET(getEntityGroupByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteEntityGroupUsingDELETE') {
                var deleteEntityGroupUsingDELETE_parameters = [];
                var deleteEntityGroupUsingDELETE_nodeParam;
                var deleteEntityGroupUsingDELETE_nodeParamType;

                deleteEntityGroupUsingDELETE_nodeParam = node.deleteEntityGroupUsingDELETE_entityGroupId;
                deleteEntityGroupUsingDELETE_nodeParamType = node.deleteEntityGroupUsingDELETE_entityGroupIdType;
                if (deleteEntityGroupUsingDELETE_nodeParamType === 'str') {
                    deleteEntityGroupUsingDELETE_parameters.entityGroupId = deleteEntityGroupUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityGroupUsingDELETE_parameters.entityGroupId = RED.util.getMessageProperty(msg, deleteEntityGroupUsingDELETE_nodeParam);
                }
                deleteEntityGroupUsingDELETE_parameters.entityGroupId = !!deleteEntityGroupUsingDELETE_parameters.entityGroupId ? deleteEntityGroupUsingDELETE_parameters.entityGroupId : msg.payload;
                                result = client.deleteEntityGroupUsingDELETE(deleteEntityGroupUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'addEntitiesToEntityGroupUsingPOST') {
                var addEntitiesToEntityGroupUsingPOST_parameters = [];
                var addEntitiesToEntityGroupUsingPOST_nodeParam;
                var addEntitiesToEntityGroupUsingPOST_nodeParamType;

                addEntitiesToEntityGroupUsingPOST_nodeParam = node.addEntitiesToEntityGroupUsingPOST_entityGroupId;
                addEntitiesToEntityGroupUsingPOST_nodeParamType = node.addEntitiesToEntityGroupUsingPOST_entityGroupIdType;
                if (addEntitiesToEntityGroupUsingPOST_nodeParamType === 'str') {
                    addEntitiesToEntityGroupUsingPOST_parameters.entityGroupId = addEntitiesToEntityGroupUsingPOST_nodeParam || '';
                } else {
                    addEntitiesToEntityGroupUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, addEntitiesToEntityGroupUsingPOST_nodeParam);
                }
                addEntitiesToEntityGroupUsingPOST_parameters.entityGroupId = !!addEntitiesToEntityGroupUsingPOST_parameters.entityGroupId ? addEntitiesToEntityGroupUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    addEntitiesToEntityGroupUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.addEntitiesToEntityGroupUsingPOST(addEntitiesToEntityGroupUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'removeEntitiesFromEntityGroupUsingPOST') {
                var removeEntitiesFromEntityGroupUsingPOST_parameters = [];
                var removeEntitiesFromEntityGroupUsingPOST_nodeParam;
                var removeEntitiesFromEntityGroupUsingPOST_nodeParamType;

                removeEntitiesFromEntityGroupUsingPOST_nodeParam = node.removeEntitiesFromEntityGroupUsingPOST_entityGroupId;
                removeEntitiesFromEntityGroupUsingPOST_nodeParamType = node.removeEntitiesFromEntityGroupUsingPOST_entityGroupIdType;
                if (removeEntitiesFromEntityGroupUsingPOST_nodeParamType === 'str') {
                    removeEntitiesFromEntityGroupUsingPOST_parameters.entityGroupId = removeEntitiesFromEntityGroupUsingPOST_nodeParam || '';
                } else {
                    removeEntitiesFromEntityGroupUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, removeEntitiesFromEntityGroupUsingPOST_nodeParam);
                }
                removeEntitiesFromEntityGroupUsingPOST_parameters.entityGroupId = !!removeEntitiesFromEntityGroupUsingPOST_parameters.entityGroupId ? removeEntitiesFromEntityGroupUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    removeEntitiesFromEntityGroupUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.removeEntitiesFromEntityGroupUsingPOST(removeEntitiesFromEntityGroupUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEntitiesUsingGET') {
                var getEntitiesUsingGET_parameters = [];
                var getEntitiesUsingGET_nodeParam;
                var getEntitiesUsingGET_nodeParamType;

                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_entityGroupId;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_entityGroupIdType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.entityGroupId = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.entityGroupId = !!getEntitiesUsingGET_parameters.entityGroupId ? getEntitiesUsingGET_parameters.entityGroupId : msg.payload;
                
                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_pageSize;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_pageSizeType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.pageSize = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.pageSize = !!getEntitiesUsingGET_parameters.pageSize ? getEntitiesUsingGET_parameters.pageSize : msg.payload;
                
                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_page;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_pageType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.page = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.page = !!getEntitiesUsingGET_parameters.page ? getEntitiesUsingGET_parameters.page : msg.payload;
                
                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_textSearch;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_textSearchType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.textSearch = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.textSearch = !!getEntitiesUsingGET_parameters.textSearch ? getEntitiesUsingGET_parameters.textSearch : msg.payload;
                
                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_sortProperty;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_sortPropertyType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.sortProperty = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.sortProperty = !!getEntitiesUsingGET_parameters.sortProperty ? getEntitiesUsingGET_parameters.sortProperty : msg.payload;
                
                getEntitiesUsingGET_nodeParam = node.getEntitiesUsingGET_sortOrder;
                getEntitiesUsingGET_nodeParamType = node.getEntitiesUsingGET_sortOrderType;
                if (getEntitiesUsingGET_nodeParamType === 'str') {
                    getEntitiesUsingGET_parameters.sortOrder = getEntitiesUsingGET_nodeParam || '';
                } else {
                    getEntitiesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEntitiesUsingGET_nodeParam);
                }
                getEntitiesUsingGET_parameters.sortOrder = !!getEntitiesUsingGET_parameters.sortOrder ? getEntitiesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEntitiesUsingGET(getEntitiesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'makeEntityGroupPrivateUsingPOST') {
                var makeEntityGroupPrivateUsingPOST_parameters = [];
                var makeEntityGroupPrivateUsingPOST_nodeParam;
                var makeEntityGroupPrivateUsingPOST_nodeParamType;

                makeEntityGroupPrivateUsingPOST_nodeParam = node.makeEntityGroupPrivateUsingPOST_entityGroupId;
                makeEntityGroupPrivateUsingPOST_nodeParamType = node.makeEntityGroupPrivateUsingPOST_entityGroupIdType;
                if (makeEntityGroupPrivateUsingPOST_nodeParamType === 'str') {
                    makeEntityGroupPrivateUsingPOST_parameters.entityGroupId = makeEntityGroupPrivateUsingPOST_nodeParam || '';
                } else {
                    makeEntityGroupPrivateUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, makeEntityGroupPrivateUsingPOST_nodeParam);
                }
                makeEntityGroupPrivateUsingPOST_parameters.entityGroupId = !!makeEntityGroupPrivateUsingPOST_parameters.entityGroupId ? makeEntityGroupPrivateUsingPOST_parameters.entityGroupId : msg.payload;
                                result = client.makeEntityGroupPrivateUsingPOST(makeEntityGroupPrivateUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'makeEntityGroupPublicUsingPOST') {
                var makeEntityGroupPublicUsingPOST_parameters = [];
                var makeEntityGroupPublicUsingPOST_nodeParam;
                var makeEntityGroupPublicUsingPOST_nodeParamType;

                makeEntityGroupPublicUsingPOST_nodeParam = node.makeEntityGroupPublicUsingPOST_entityGroupId;
                makeEntityGroupPublicUsingPOST_nodeParamType = node.makeEntityGroupPublicUsingPOST_entityGroupIdType;
                if (makeEntityGroupPublicUsingPOST_nodeParamType === 'str') {
                    makeEntityGroupPublicUsingPOST_parameters.entityGroupId = makeEntityGroupPublicUsingPOST_nodeParam || '';
                } else {
                    makeEntityGroupPublicUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, makeEntityGroupPublicUsingPOST_nodeParam);
                }
                makeEntityGroupPublicUsingPOST_parameters.entityGroupId = !!makeEntityGroupPublicUsingPOST_parameters.entityGroupId ? makeEntityGroupPublicUsingPOST_parameters.entityGroupId : msg.payload;
                                result = client.makeEntityGroupPublicUsingPOST(makeEntityGroupPublicUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'shareEntityGroupUsingPOST') {
                var shareEntityGroupUsingPOST_parameters = [];
                var shareEntityGroupUsingPOST_nodeParam;
                var shareEntityGroupUsingPOST_nodeParamType;

                shareEntityGroupUsingPOST_nodeParam = node.shareEntityGroupUsingPOST_entityGroupId;
                shareEntityGroupUsingPOST_nodeParamType = node.shareEntityGroupUsingPOST_entityGroupIdType;
                if (shareEntityGroupUsingPOST_nodeParamType === 'str') {
                    shareEntityGroupUsingPOST_parameters.entityGroupId = shareEntityGroupUsingPOST_nodeParam || '';
                } else {
                    shareEntityGroupUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, shareEntityGroupUsingPOST_nodeParam);
                }
                shareEntityGroupUsingPOST_parameters.entityGroupId = !!shareEntityGroupUsingPOST_parameters.entityGroupId ? shareEntityGroupUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    shareEntityGroupUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.shareEntityGroupUsingPOST(shareEntityGroupUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getGroupEntityUsingGET') {
                var getGroupEntityUsingGET_parameters = [];
                var getGroupEntityUsingGET_nodeParam;
                var getGroupEntityUsingGET_nodeParamType;

                getGroupEntityUsingGET_nodeParam = node.getGroupEntityUsingGET_entityGroupId;
                getGroupEntityUsingGET_nodeParamType = node.getGroupEntityUsingGET_entityGroupIdType;
                if (getGroupEntityUsingGET_nodeParamType === 'str') {
                    getGroupEntityUsingGET_parameters.entityGroupId = getGroupEntityUsingGET_nodeParam || '';
                } else {
                    getGroupEntityUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getGroupEntityUsingGET_nodeParam);
                }
                getGroupEntityUsingGET_parameters.entityGroupId = !!getGroupEntityUsingGET_parameters.entityGroupId ? getGroupEntityUsingGET_parameters.entityGroupId : msg.payload;
                
                getGroupEntityUsingGET_nodeParam = node.getGroupEntityUsingGET_entityId;
                getGroupEntityUsingGET_nodeParamType = node.getGroupEntityUsingGET_entityIdType;
                if (getGroupEntityUsingGET_nodeParamType === 'str') {
                    getGroupEntityUsingGET_parameters.entityId = getGroupEntityUsingGET_nodeParam || '';
                } else {
                    getGroupEntityUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getGroupEntityUsingGET_nodeParam);
                }
                getGroupEntityUsingGET_parameters.entityId = !!getGroupEntityUsingGET_parameters.entityId ? getGroupEntityUsingGET_parameters.entityId : msg.payload;
                                result = client.getGroupEntityUsingGET(getGroupEntityUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'shareEntityGroupToChildOwnerUserGroupUsingPOST') {
                var shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters = [];
                var shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam;
                var shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType;

                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupId;
                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupIdType;
                if (shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType === 'str') {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.entityGroupId = shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam || '';
                } else {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam);
                }
                shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.entityGroupId = !!shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.entityGroupId ? shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.entityGroupId : msg.payload;
                
                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupId;
                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupIdType;
                if (shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType === 'str') {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.userGroupId = shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam || '';
                } else {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.userGroupId = RED.util.getMessageProperty(msg, shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam);
                }
                shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.userGroupId = !!shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.userGroupId ? shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.userGroupId : msg.payload;
                
                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleId;
                shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType = node.shareEntityGroupToChildOwnerUserGroupUsingPOST_roleIdType;
                if (shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParamType === 'str') {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.roleId = shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam || '';
                } else {
                    shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.roleId = RED.util.getMessageProperty(msg, shareEntityGroupToChildOwnerUserGroupUsingPOST_nodeParam);
                }
                shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.roleId = !!shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.roleId ? shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters.roleId : msg.payload;
                                result = client.shareEntityGroupToChildOwnerUserGroupUsingPOST(shareEntityGroupToChildOwnerUserGroupUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupByOwnerAndNameAndTypeUsingGET') {
                var getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters = [];
                var getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam;
                var getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType;

                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerType;
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerTypeType;
                if (getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerType = getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerType = RED.util.getMessageProperty(msg, getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam);
                }
                getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerType = !!getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerType ? getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerType : msg.payload;
                
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerId;
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerIdType;
                if (getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerId = getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerId = RED.util.getMessageProperty(msg, getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam);
                }
                getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerId = !!getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerId ? getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.ownerId : msg.payload;
                
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupType;
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupTypeType;
                if (getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupType = getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam);
                }
                getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupType = !!getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupType ? getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupType : msg.payload;
                
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupName;
                getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType = node.getEntityGroupByOwnerAndNameAndTypeUsingGET_groupNameType;
                if (getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupName = getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupName = RED.util.getMessageProperty(msg, getEntityGroupByOwnerAndNameAndTypeUsingGET_nodeParam);
                }
                getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupName = !!getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupName ? getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters.groupName : msg.payload;
                                result = client.getEntityGroupByOwnerAndNameAndTypeUsingGET(getEntityGroupByOwnerAndNameAndTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeEntityGroupsUsingGET') {
                var getEdgeEntityGroupsUsingGET_parameters = [];
                var getEdgeEntityGroupsUsingGET_nodeParam;
                var getEdgeEntityGroupsUsingGET_nodeParamType;

                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_edgeId;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_edgeIdType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.edgeId = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.edgeId = !!getEdgeEntityGroupsUsingGET_parameters.edgeId ? getEdgeEntityGroupsUsingGET_parameters.edgeId : msg.payload;
                
                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_groupType;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_groupTypeType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.groupType = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.groupType = !!getEdgeEntityGroupsUsingGET_parameters.groupType ? getEdgeEntityGroupsUsingGET_parameters.groupType : msg.payload;
                
                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_pageSize;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_pageSizeType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.pageSize = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.pageSize = !!getEdgeEntityGroupsUsingGET_parameters.pageSize ? getEdgeEntityGroupsUsingGET_parameters.pageSize : msg.payload;
                
                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_page;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_pageType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.page = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.page = !!getEdgeEntityGroupsUsingGET_parameters.page ? getEdgeEntityGroupsUsingGET_parameters.page : msg.payload;
                
                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_sortProperty;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_sortPropertyType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.sortProperty = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.sortProperty = !!getEdgeEntityGroupsUsingGET_parameters.sortProperty ? getEdgeEntityGroupsUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgeEntityGroupsUsingGET_nodeParam = node.getEdgeEntityGroupsUsingGET_sortOrder;
                getEdgeEntityGroupsUsingGET_nodeParamType = node.getEdgeEntityGroupsUsingGET_sortOrderType;
                if (getEdgeEntityGroupsUsingGET_nodeParamType === 'str') {
                    getEdgeEntityGroupsUsingGET_parameters.sortOrder = getEdgeEntityGroupsUsingGET_nodeParam || '';
                } else {
                    getEdgeEntityGroupsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgeEntityGroupsUsingGET_nodeParam);
                }
                getEdgeEntityGroupsUsingGET_parameters.sortOrder = !!getEdgeEntityGroupsUsingGET_parameters.sortOrder ? getEdgeEntityGroupsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEdgeEntityGroupsUsingGET(getEdgeEntityGroupsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupsForEntityUsingGET') {
                var getEntityGroupsForEntityUsingGET_parameters = [];
                var getEntityGroupsForEntityUsingGET_nodeParam;
                var getEntityGroupsForEntityUsingGET_nodeParamType;

                getEntityGroupsForEntityUsingGET_nodeParam = node.getEntityGroupsForEntityUsingGET_entityType;
                getEntityGroupsForEntityUsingGET_nodeParamType = node.getEntityGroupsForEntityUsingGET_entityTypeType;
                if (getEntityGroupsForEntityUsingGET_nodeParamType === 'str') {
                    getEntityGroupsForEntityUsingGET_parameters.entityType = getEntityGroupsForEntityUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsForEntityUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getEntityGroupsForEntityUsingGET_nodeParam);
                }
                getEntityGroupsForEntityUsingGET_parameters.entityType = !!getEntityGroupsForEntityUsingGET_parameters.entityType ? getEntityGroupsForEntityUsingGET_parameters.entityType : msg.payload;
                
                getEntityGroupsForEntityUsingGET_nodeParam = node.getEntityGroupsForEntityUsingGET_entityId;
                getEntityGroupsForEntityUsingGET_nodeParamType = node.getEntityGroupsForEntityUsingGET_entityIdType;
                if (getEntityGroupsForEntityUsingGET_nodeParamType === 'str') {
                    getEntityGroupsForEntityUsingGET_parameters.entityId = getEntityGroupsForEntityUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsForEntityUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getEntityGroupsForEntityUsingGET_nodeParam);
                }
                getEntityGroupsForEntityUsingGET_parameters.entityId = !!getEntityGroupsForEntityUsingGET_parameters.entityId ? getEntityGroupsForEntityUsingGET_parameters.entityId : msg.payload;
                                result = client.getEntityGroupsForEntityUsingGET(getEntityGroupsForEntityUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupsByTypeUsingGET') {
                var getEntityGroupsByTypeUsingGET_parameters = [];
                var getEntityGroupsByTypeUsingGET_nodeParam;
                var getEntityGroupsByTypeUsingGET_nodeParamType;

                getEntityGroupsByTypeUsingGET_nodeParam = node.getEntityGroupsByTypeUsingGET_groupType;
                getEntityGroupsByTypeUsingGET_nodeParamType = node.getEntityGroupsByTypeUsingGET_groupTypeType;
                if (getEntityGroupsByTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupsByTypeUsingGET_parameters.groupType = getEntityGroupsByTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsByTypeUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getEntityGroupsByTypeUsingGET_nodeParam);
                }
                getEntityGroupsByTypeUsingGET_parameters.groupType = !!getEntityGroupsByTypeUsingGET_parameters.groupType ? getEntityGroupsByTypeUsingGET_parameters.groupType : msg.payload;
                                result = client.getEntityGroupsByTypeUsingGET(getEntityGroupsByTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupsByOwnerAndTypeUsingGET') {
                var getEntityGroupsByOwnerAndTypeUsingGET_parameters = [];
                var getEntityGroupsByOwnerAndTypeUsingGET_nodeParam;
                var getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType;

                getEntityGroupsByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupsByOwnerAndTypeUsingGET_ownerType;
                getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupsByOwnerAndTypeUsingGET_ownerTypeType;
                if (getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerType = getEntityGroupsByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerType = RED.util.getMessageProperty(msg, getEntityGroupsByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerType = !!getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerType ? getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerType : msg.payload;
                
                getEntityGroupsByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupsByOwnerAndTypeUsingGET_ownerId;
                getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupsByOwnerAndTypeUsingGET_ownerIdType;
                if (getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerId = getEntityGroupsByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerId = RED.util.getMessageProperty(msg, getEntityGroupsByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerId = !!getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerId ? getEntityGroupsByOwnerAndTypeUsingGET_parameters.ownerId : msg.payload;
                
                getEntityGroupsByOwnerAndTypeUsingGET_nodeParam = node.getEntityGroupsByOwnerAndTypeUsingGET_groupType;
                getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType = node.getEntityGroupsByOwnerAndTypeUsingGET_groupTypeType;
                if (getEntityGroupsByOwnerAndTypeUsingGET_nodeParamType === 'str') {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.groupType = getEntityGroupsByOwnerAndTypeUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsByOwnerAndTypeUsingGET_parameters.groupType = RED.util.getMessageProperty(msg, getEntityGroupsByOwnerAndTypeUsingGET_nodeParam);
                }
                getEntityGroupsByOwnerAndTypeUsingGET_parameters.groupType = !!getEntityGroupsByOwnerAndTypeUsingGET_parameters.groupType ? getEntityGroupsByOwnerAndTypeUsingGET_parameters.groupType : msg.payload;
                                result = client.getEntityGroupsByOwnerAndTypeUsingGET(getEntityGroupsByOwnerAndTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupsByIdsUsingGET') {
                var getEntityGroupsByIdsUsingGET_parameters = [];
                var getEntityGroupsByIdsUsingGET_nodeParam;
                var getEntityGroupsByIdsUsingGET_nodeParamType;

                getEntityGroupsByIdsUsingGET_nodeParam = node.getEntityGroupsByIdsUsingGET_entityGroupIds;
                getEntityGroupsByIdsUsingGET_nodeParamType = node.getEntityGroupsByIdsUsingGET_entityGroupIdsType;
                if (getEntityGroupsByIdsUsingGET_nodeParamType === 'str') {
                    getEntityGroupsByIdsUsingGET_parameters.entityGroupIds = getEntityGroupsByIdsUsingGET_nodeParam || '';
                } else {
                    getEntityGroupsByIdsUsingGET_parameters.entityGroupIds = RED.util.getMessageProperty(msg, getEntityGroupsByIdsUsingGET_nodeParam);
                }
                getEntityGroupsByIdsUsingGET_parameters.entityGroupIds = !!getEntityGroupsByIdsUsingGET_parameters.entityGroupIds ? getEntityGroupsByIdsUsingGET_parameters.entityGroupIds : msg.payload;
                                result = client.getEntityGroupsByIdsUsingGET(getEntityGroupsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getOwnersUsingGET') {
                var getOwnersUsingGET_parameters = [];
                var getOwnersUsingGET_nodeParam;
                var getOwnersUsingGET_nodeParamType;

                getOwnersUsingGET_nodeParam = node.getOwnersUsingGET_pageSize;
                getOwnersUsingGET_nodeParamType = node.getOwnersUsingGET_pageSizeType;
                if (getOwnersUsingGET_nodeParamType === 'str') {
                    getOwnersUsingGET_parameters.pageSize = getOwnersUsingGET_nodeParam || '';
                } else {
                    getOwnersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getOwnersUsingGET_nodeParam);
                }
                getOwnersUsingGET_parameters.pageSize = !!getOwnersUsingGET_parameters.pageSize ? getOwnersUsingGET_parameters.pageSize : msg.payload;
                
                getOwnersUsingGET_nodeParam = node.getOwnersUsingGET_page;
                getOwnersUsingGET_nodeParamType = node.getOwnersUsingGET_pageType;
                if (getOwnersUsingGET_nodeParamType === 'str') {
                    getOwnersUsingGET_parameters.page = getOwnersUsingGET_nodeParam || '';
                } else {
                    getOwnersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getOwnersUsingGET_nodeParam);
                }
                getOwnersUsingGET_parameters.page = !!getOwnersUsingGET_parameters.page ? getOwnersUsingGET_parameters.page : msg.payload;
                
                getOwnersUsingGET_nodeParam = node.getOwnersUsingGET_textSearch;
                getOwnersUsingGET_nodeParamType = node.getOwnersUsingGET_textSearchType;
                if (getOwnersUsingGET_nodeParamType === 'str') {
                    getOwnersUsingGET_parameters.textSearch = getOwnersUsingGET_nodeParam || '';
                } else {
                    getOwnersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getOwnersUsingGET_nodeParam);
                }
                getOwnersUsingGET_parameters.textSearch = !!getOwnersUsingGET_parameters.textSearch ? getOwnersUsingGET_parameters.textSearch : msg.payload;
                
                getOwnersUsingGET_nodeParam = node.getOwnersUsingGET_sortProperty;
                getOwnersUsingGET_nodeParamType = node.getOwnersUsingGET_sortPropertyType;
                if (getOwnersUsingGET_nodeParamType === 'str') {
                    getOwnersUsingGET_parameters.sortProperty = getOwnersUsingGET_nodeParam || '';
                } else {
                    getOwnersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getOwnersUsingGET_nodeParam);
                }
                getOwnersUsingGET_parameters.sortProperty = !!getOwnersUsingGET_parameters.sortProperty ? getOwnersUsingGET_parameters.sortProperty : msg.payload;
                
                getOwnersUsingGET_nodeParam = node.getOwnersUsingGET_sortOrder;
                getOwnersUsingGET_nodeParamType = node.getOwnersUsingGET_sortOrderType;
                if (getOwnersUsingGET_nodeParamType === 'str') {
                    getOwnersUsingGET_parameters.sortOrder = getOwnersUsingGET_nodeParam || '';
                } else {
                    getOwnersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getOwnersUsingGET_nodeParam);
                }
                getOwnersUsingGET_parameters.sortOrder = !!getOwnersUsingGET_parameters.sortOrder ? getOwnersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getOwnersUsingGET(getOwnersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'findAlarmDataByQueryUsingPOST') {
                var findAlarmDataByQueryUsingPOST_parameters = [];
                var findAlarmDataByQueryUsingPOST_nodeParam;
                var findAlarmDataByQueryUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findAlarmDataByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findAlarmDataByQueryUsingPOST(findAlarmDataByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'countEntitiesByQueryUsingPOST') {
                var countEntitiesByQueryUsingPOST_parameters = [];
                var countEntitiesByQueryUsingPOST_nodeParam;
                var countEntitiesByQueryUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    countEntitiesByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.countEntitiesByQueryUsingPOST(countEntitiesByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findEntityDataByQueryUsingPOST') {
                var findEntityDataByQueryUsingPOST_parameters = [];
                var findEntityDataByQueryUsingPOST_nodeParam;
                var findEntityDataByQueryUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findEntityDataByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findEntityDataByQueryUsingPOST(findEntityDataByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findEntityTimeseriesAndAttributesKeysByQueryUsingPOST') {
                var findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters = [];
                var findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam;
                var findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParamType;

                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam = node.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseries;
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParamType = node.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseriesType;
                if (findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParamType === 'str') {
                    findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.timeseries = findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam || '';
                } else {
                    findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.timeseries = RED.util.getMessageProperty(msg, findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam);
                }
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.timeseries = !!findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.timeseries ? findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.timeseries : msg.payload;
                
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam = node.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributes;
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParamType = node.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributesType;
                if (findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParamType === 'str') {
                    findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.attributes = findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam || '';
                } else {
                    findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.attributes = RED.util.getMessageProperty(msg, findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_nodeParam);
                }
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.attributes = !!findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.attributes ? findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.attributes : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findEntityTimeseriesAndAttributesKeysByQueryUsingPOST(findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveRelationUsingPOST') {
                var saveRelationUsingPOST_parameters = [];
                var saveRelationUsingPOST_nodeParam;
                var saveRelationUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveRelationUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveRelationUsingPOST(saveRelationUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findByQueryUsingPOST_3') {
                var findByQueryUsingPOST_3_parameters = [];
                var findByQueryUsingPOST_3_nodeParam;
                var findByQueryUsingPOST_3_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findByQueryUsingPOST_3_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findByQueryUsingPOST_3(findByQueryUsingPOST_3_parameters);
            }
            if (!errorFlag && node.method === 'findInfoByQueryUsingPOST') {
                var findInfoByQueryUsingPOST_parameters = [];
                var findInfoByQueryUsingPOST_nodeParam;
                var findInfoByQueryUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findInfoByQueryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findInfoByQueryUsingPOST(findInfoByQueryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'findInfoByFromUsingGET') {
                var findInfoByFromUsingGET_parameters = [];
                var findInfoByFromUsingGET_nodeParam;
                var findInfoByFromUsingGET_nodeParamType;

                findInfoByFromUsingGET_nodeParam = node.findInfoByFromUsingGET_fromId;
                findInfoByFromUsingGET_nodeParamType = node.findInfoByFromUsingGET_fromIdType;
                if (findInfoByFromUsingGET_nodeParamType === 'str') {
                    findInfoByFromUsingGET_parameters.fromId = findInfoByFromUsingGET_nodeParam || '';
                } else {
                    findInfoByFromUsingGET_parameters.fromId = RED.util.getMessageProperty(msg, findInfoByFromUsingGET_nodeParam);
                }
                findInfoByFromUsingGET_parameters.fromId = !!findInfoByFromUsingGET_parameters.fromId ? findInfoByFromUsingGET_parameters.fromId : msg.payload;
                
                findInfoByFromUsingGET_nodeParam = node.findInfoByFromUsingGET_fromType;
                findInfoByFromUsingGET_nodeParamType = node.findInfoByFromUsingGET_fromTypeType;
                if (findInfoByFromUsingGET_nodeParamType === 'str') {
                    findInfoByFromUsingGET_parameters.fromType = findInfoByFromUsingGET_nodeParam || '';
                } else {
                    findInfoByFromUsingGET_parameters.fromType = RED.util.getMessageProperty(msg, findInfoByFromUsingGET_nodeParam);
                }
                findInfoByFromUsingGET_parameters.fromType = !!findInfoByFromUsingGET_parameters.fromType ? findInfoByFromUsingGET_parameters.fromType : msg.payload;
                
                findInfoByFromUsingGET_nodeParam = node.findInfoByFromUsingGET_relationTypeGroup;
                findInfoByFromUsingGET_nodeParamType = node.findInfoByFromUsingGET_relationTypeGroupType;
                if (findInfoByFromUsingGET_nodeParamType === 'str') {
                    findInfoByFromUsingGET_parameters.relationTypeGroup = findInfoByFromUsingGET_nodeParam || '';
                } else {
                    findInfoByFromUsingGET_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findInfoByFromUsingGET_nodeParam);
                }
                findInfoByFromUsingGET_parameters.relationTypeGroup = !!findInfoByFromUsingGET_parameters.relationTypeGroup ? findInfoByFromUsingGET_parameters.relationTypeGroup : msg.payload;
                                result = client.findInfoByFromUsingGET(findInfoByFromUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'findInfoByToUsingGET') {
                var findInfoByToUsingGET_parameters = [];
                var findInfoByToUsingGET_nodeParam;
                var findInfoByToUsingGET_nodeParamType;

                findInfoByToUsingGET_nodeParam = node.findInfoByToUsingGET_toId;
                findInfoByToUsingGET_nodeParamType = node.findInfoByToUsingGET_toIdType;
                if (findInfoByToUsingGET_nodeParamType === 'str') {
                    findInfoByToUsingGET_parameters.toId = findInfoByToUsingGET_nodeParam || '';
                } else {
                    findInfoByToUsingGET_parameters.toId = RED.util.getMessageProperty(msg, findInfoByToUsingGET_nodeParam);
                }
                findInfoByToUsingGET_parameters.toId = !!findInfoByToUsingGET_parameters.toId ? findInfoByToUsingGET_parameters.toId : msg.payload;
                
                findInfoByToUsingGET_nodeParam = node.findInfoByToUsingGET_toType;
                findInfoByToUsingGET_nodeParamType = node.findInfoByToUsingGET_toTypeType;
                if (findInfoByToUsingGET_nodeParamType === 'str') {
                    findInfoByToUsingGET_parameters.toType = findInfoByToUsingGET_nodeParam || '';
                } else {
                    findInfoByToUsingGET_parameters.toType = RED.util.getMessageProperty(msg, findInfoByToUsingGET_nodeParam);
                }
                findInfoByToUsingGET_parameters.toType = !!findInfoByToUsingGET_parameters.toType ? findInfoByToUsingGET_parameters.toType : msg.payload;
                
                findInfoByToUsingGET_nodeParam = node.findInfoByToUsingGET_relationTypeGroup;
                findInfoByToUsingGET_nodeParamType = node.findInfoByToUsingGET_relationTypeGroupType;
                if (findInfoByToUsingGET_nodeParamType === 'str') {
                    findInfoByToUsingGET_parameters.relationTypeGroup = findInfoByToUsingGET_nodeParam || '';
                } else {
                    findInfoByToUsingGET_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findInfoByToUsingGET_nodeParam);
                }
                findInfoByToUsingGET_parameters.relationTypeGroup = !!findInfoByToUsingGET_parameters.relationTypeGroup ? findInfoByToUsingGET_parameters.relationTypeGroup : msg.payload;
                                result = client.findInfoByToUsingGET(findInfoByToUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteRelationsUsingDELETE') {
                var deleteRelationsUsingDELETE_parameters = [];
                var deleteRelationsUsingDELETE_nodeParam;
                var deleteRelationsUsingDELETE_nodeParamType;

                deleteRelationsUsingDELETE_nodeParam = node.deleteRelationsUsingDELETE_entityId;
                deleteRelationsUsingDELETE_nodeParamType = node.deleteRelationsUsingDELETE_entityIdType;
                if (deleteRelationsUsingDELETE_nodeParamType === 'str') {
                    deleteRelationsUsingDELETE_parameters.entityId = deleteRelationsUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationsUsingDELETE_parameters.entityId = RED.util.getMessageProperty(msg, deleteRelationsUsingDELETE_nodeParam);
                }
                deleteRelationsUsingDELETE_parameters.entityId = !!deleteRelationsUsingDELETE_parameters.entityId ? deleteRelationsUsingDELETE_parameters.entityId : msg.payload;
                
                deleteRelationsUsingDELETE_nodeParam = node.deleteRelationsUsingDELETE_entityType;
                deleteRelationsUsingDELETE_nodeParamType = node.deleteRelationsUsingDELETE_entityTypeType;
                if (deleteRelationsUsingDELETE_nodeParamType === 'str') {
                    deleteRelationsUsingDELETE_parameters.entityType = deleteRelationsUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationsUsingDELETE_parameters.entityType = RED.util.getMessageProperty(msg, deleteRelationsUsingDELETE_nodeParam);
                }
                deleteRelationsUsingDELETE_parameters.entityType = !!deleteRelationsUsingDELETE_parameters.entityType ? deleteRelationsUsingDELETE_parameters.entityType : msg.payload;
                                result = client.deleteRelationsUsingDELETE(deleteRelationsUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'findByFromUsingGET') {
                var findByFromUsingGET_parameters = [];
                var findByFromUsingGET_nodeParam;
                var findByFromUsingGET_nodeParamType;

                findByFromUsingGET_nodeParam = node.findByFromUsingGET_fromId;
                findByFromUsingGET_nodeParamType = node.findByFromUsingGET_fromIdType;
                if (findByFromUsingGET_nodeParamType === 'str') {
                    findByFromUsingGET_parameters.fromId = findByFromUsingGET_nodeParam || '';
                } else {
                    findByFromUsingGET_parameters.fromId = RED.util.getMessageProperty(msg, findByFromUsingGET_nodeParam);
                }
                findByFromUsingGET_parameters.fromId = !!findByFromUsingGET_parameters.fromId ? findByFromUsingGET_parameters.fromId : msg.payload;
                
                findByFromUsingGET_nodeParam = node.findByFromUsingGET_fromType;
                findByFromUsingGET_nodeParamType = node.findByFromUsingGET_fromTypeType;
                if (findByFromUsingGET_nodeParamType === 'str') {
                    findByFromUsingGET_parameters.fromType = findByFromUsingGET_nodeParam || '';
                } else {
                    findByFromUsingGET_parameters.fromType = RED.util.getMessageProperty(msg, findByFromUsingGET_nodeParam);
                }
                findByFromUsingGET_parameters.fromType = !!findByFromUsingGET_parameters.fromType ? findByFromUsingGET_parameters.fromType : msg.payload;
                
                findByFromUsingGET_nodeParam = node.findByFromUsingGET_relationType;
                findByFromUsingGET_nodeParamType = node.findByFromUsingGET_relationTypeType;
                if (findByFromUsingGET_nodeParamType === 'str') {
                    findByFromUsingGET_parameters.relationType = findByFromUsingGET_nodeParam || '';
                } else {
                    findByFromUsingGET_parameters.relationType = RED.util.getMessageProperty(msg, findByFromUsingGET_nodeParam);
                }
                findByFromUsingGET_parameters.relationType = !!findByFromUsingGET_parameters.relationType ? findByFromUsingGET_parameters.relationType : msg.payload;
                
                findByFromUsingGET_nodeParam = node.findByFromUsingGET_relationTypeGroup;
                findByFromUsingGET_nodeParamType = node.findByFromUsingGET_relationTypeGroupType;
                if (findByFromUsingGET_nodeParamType === 'str') {
                    findByFromUsingGET_parameters.relationTypeGroup = findByFromUsingGET_nodeParam || '';
                } else {
                    findByFromUsingGET_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findByFromUsingGET_nodeParam);
                }
                findByFromUsingGET_parameters.relationTypeGroup = !!findByFromUsingGET_parameters.relationTypeGroup ? findByFromUsingGET_parameters.relationTypeGroup : msg.payload;
                                result = client.findByFromUsingGET(findByFromUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'findByFromUsingGET_1') {
                var findByFromUsingGET_1_parameters = [];
                var findByFromUsingGET_1_nodeParam;
                var findByFromUsingGET_1_nodeParamType;

                findByFromUsingGET_1_nodeParam = node.findByFromUsingGET_1_fromId;
                findByFromUsingGET_1_nodeParamType = node.findByFromUsingGET_1_fromIdType;
                if (findByFromUsingGET_1_nodeParamType === 'str') {
                    findByFromUsingGET_1_parameters.fromId = findByFromUsingGET_1_nodeParam || '';
                } else {
                    findByFromUsingGET_1_parameters.fromId = RED.util.getMessageProperty(msg, findByFromUsingGET_1_nodeParam);
                }
                findByFromUsingGET_1_parameters.fromId = !!findByFromUsingGET_1_parameters.fromId ? findByFromUsingGET_1_parameters.fromId : msg.payload;
                
                findByFromUsingGET_1_nodeParam = node.findByFromUsingGET_1_fromType;
                findByFromUsingGET_1_nodeParamType = node.findByFromUsingGET_1_fromTypeType;
                if (findByFromUsingGET_1_nodeParamType === 'str') {
                    findByFromUsingGET_1_parameters.fromType = findByFromUsingGET_1_nodeParam || '';
                } else {
                    findByFromUsingGET_1_parameters.fromType = RED.util.getMessageProperty(msg, findByFromUsingGET_1_nodeParam);
                }
                findByFromUsingGET_1_parameters.fromType = !!findByFromUsingGET_1_parameters.fromType ? findByFromUsingGET_1_parameters.fromType : msg.payload;
                
                findByFromUsingGET_1_nodeParam = node.findByFromUsingGET_1_relationTypeGroup;
                findByFromUsingGET_1_nodeParamType = node.findByFromUsingGET_1_relationTypeGroupType;
                if (findByFromUsingGET_1_nodeParamType === 'str') {
                    findByFromUsingGET_1_parameters.relationTypeGroup = findByFromUsingGET_1_nodeParam || '';
                } else {
                    findByFromUsingGET_1_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findByFromUsingGET_1_nodeParam);
                }
                findByFromUsingGET_1_parameters.relationTypeGroup = !!findByFromUsingGET_1_parameters.relationTypeGroup ? findByFromUsingGET_1_parameters.relationTypeGroup : msg.payload;
                                result = client.findByFromUsingGET_1(findByFromUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'findByToUsingGET') {
                var findByToUsingGET_parameters = [];
                var findByToUsingGET_nodeParam;
                var findByToUsingGET_nodeParamType;

                findByToUsingGET_nodeParam = node.findByToUsingGET_toId;
                findByToUsingGET_nodeParamType = node.findByToUsingGET_toIdType;
                if (findByToUsingGET_nodeParamType === 'str') {
                    findByToUsingGET_parameters.toId = findByToUsingGET_nodeParam || '';
                } else {
                    findByToUsingGET_parameters.toId = RED.util.getMessageProperty(msg, findByToUsingGET_nodeParam);
                }
                findByToUsingGET_parameters.toId = !!findByToUsingGET_parameters.toId ? findByToUsingGET_parameters.toId : msg.payload;
                
                findByToUsingGET_nodeParam = node.findByToUsingGET_toType;
                findByToUsingGET_nodeParamType = node.findByToUsingGET_toTypeType;
                if (findByToUsingGET_nodeParamType === 'str') {
                    findByToUsingGET_parameters.toType = findByToUsingGET_nodeParam || '';
                } else {
                    findByToUsingGET_parameters.toType = RED.util.getMessageProperty(msg, findByToUsingGET_nodeParam);
                }
                findByToUsingGET_parameters.toType = !!findByToUsingGET_parameters.toType ? findByToUsingGET_parameters.toType : msg.payload;
                
                findByToUsingGET_nodeParam = node.findByToUsingGET_relationType;
                findByToUsingGET_nodeParamType = node.findByToUsingGET_relationTypeType;
                if (findByToUsingGET_nodeParamType === 'str') {
                    findByToUsingGET_parameters.relationType = findByToUsingGET_nodeParam || '';
                } else {
                    findByToUsingGET_parameters.relationType = RED.util.getMessageProperty(msg, findByToUsingGET_nodeParam);
                }
                findByToUsingGET_parameters.relationType = !!findByToUsingGET_parameters.relationType ? findByToUsingGET_parameters.relationType : msg.payload;
                
                findByToUsingGET_nodeParam = node.findByToUsingGET_relationTypeGroup;
                findByToUsingGET_nodeParamType = node.findByToUsingGET_relationTypeGroupType;
                if (findByToUsingGET_nodeParamType === 'str') {
                    findByToUsingGET_parameters.relationTypeGroup = findByToUsingGET_nodeParam || '';
                } else {
                    findByToUsingGET_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findByToUsingGET_nodeParam);
                }
                findByToUsingGET_parameters.relationTypeGroup = !!findByToUsingGET_parameters.relationTypeGroup ? findByToUsingGET_parameters.relationTypeGroup : msg.payload;
                                result = client.findByToUsingGET(findByToUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'findByToUsingGET_1') {
                var findByToUsingGET_1_parameters = [];
                var findByToUsingGET_1_nodeParam;
                var findByToUsingGET_1_nodeParamType;

                findByToUsingGET_1_nodeParam = node.findByToUsingGET_1_toId;
                findByToUsingGET_1_nodeParamType = node.findByToUsingGET_1_toIdType;
                if (findByToUsingGET_1_nodeParamType === 'str') {
                    findByToUsingGET_1_parameters.toId = findByToUsingGET_1_nodeParam || '';
                } else {
                    findByToUsingGET_1_parameters.toId = RED.util.getMessageProperty(msg, findByToUsingGET_1_nodeParam);
                }
                findByToUsingGET_1_parameters.toId = !!findByToUsingGET_1_parameters.toId ? findByToUsingGET_1_parameters.toId : msg.payload;
                
                findByToUsingGET_1_nodeParam = node.findByToUsingGET_1_toType;
                findByToUsingGET_1_nodeParamType = node.findByToUsingGET_1_toTypeType;
                if (findByToUsingGET_1_nodeParamType === 'str') {
                    findByToUsingGET_1_parameters.toType = findByToUsingGET_1_nodeParam || '';
                } else {
                    findByToUsingGET_1_parameters.toType = RED.util.getMessageProperty(msg, findByToUsingGET_1_nodeParam);
                }
                findByToUsingGET_1_parameters.toType = !!findByToUsingGET_1_parameters.toType ? findByToUsingGET_1_parameters.toType : msg.payload;
                
                findByToUsingGET_1_nodeParam = node.findByToUsingGET_1_relationTypeGroup;
                findByToUsingGET_1_nodeParamType = node.findByToUsingGET_1_relationTypeGroupType;
                if (findByToUsingGET_1_nodeParamType === 'str') {
                    findByToUsingGET_1_parameters.relationTypeGroup = findByToUsingGET_1_nodeParam || '';
                } else {
                    findByToUsingGET_1_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, findByToUsingGET_1_nodeParam);
                }
                findByToUsingGET_1_parameters.relationTypeGroup = !!findByToUsingGET_1_parameters.relationTypeGroup ? findByToUsingGET_1_parameters.relationTypeGroup : msg.payload;
                                result = client.findByToUsingGET_1(findByToUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'getRelationUsingGET') {
                var getRelationUsingGET_parameters = [];
                var getRelationUsingGET_nodeParam;
                var getRelationUsingGET_nodeParamType;

                getRelationUsingGET_nodeParam = node.getRelationUsingGET_fromId;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_fromIdType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.fromId = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.fromId = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.fromId = !!getRelationUsingGET_parameters.fromId ? getRelationUsingGET_parameters.fromId : msg.payload;
                
                getRelationUsingGET_nodeParam = node.getRelationUsingGET_fromType;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_fromTypeType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.fromType = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.fromType = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.fromType = !!getRelationUsingGET_parameters.fromType ? getRelationUsingGET_parameters.fromType : msg.payload;
                
                getRelationUsingGET_nodeParam = node.getRelationUsingGET_relationType;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_relationTypeType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.relationType = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.relationType = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.relationType = !!getRelationUsingGET_parameters.relationType ? getRelationUsingGET_parameters.relationType : msg.payload;
                
                getRelationUsingGET_nodeParam = node.getRelationUsingGET_relationTypeGroup;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_relationTypeGroupType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.relationTypeGroup = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.relationTypeGroup = !!getRelationUsingGET_parameters.relationTypeGroup ? getRelationUsingGET_parameters.relationTypeGroup : msg.payload;
                
                getRelationUsingGET_nodeParam = node.getRelationUsingGET_toId;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_toIdType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.toId = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.toId = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.toId = !!getRelationUsingGET_parameters.toId ? getRelationUsingGET_parameters.toId : msg.payload;
                
                getRelationUsingGET_nodeParam = node.getRelationUsingGET_toType;
                getRelationUsingGET_nodeParamType = node.getRelationUsingGET_toTypeType;
                if (getRelationUsingGET_nodeParamType === 'str') {
                    getRelationUsingGET_parameters.toType = getRelationUsingGET_nodeParam || '';
                } else {
                    getRelationUsingGET_parameters.toType = RED.util.getMessageProperty(msg, getRelationUsingGET_nodeParam);
                }
                getRelationUsingGET_parameters.toType = !!getRelationUsingGET_parameters.toType ? getRelationUsingGET_parameters.toType : msg.payload;
                                result = client.getRelationUsingGET(getRelationUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteRelationUsingDELETE') {
                var deleteRelationUsingDELETE_parameters = [];
                var deleteRelationUsingDELETE_nodeParam;
                var deleteRelationUsingDELETE_nodeParamType;

                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_fromId;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_fromIdType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.fromId = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.fromId = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.fromId = !!deleteRelationUsingDELETE_parameters.fromId ? deleteRelationUsingDELETE_parameters.fromId : msg.payload;
                
                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_fromType;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_fromTypeType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.fromType = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.fromType = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.fromType = !!deleteRelationUsingDELETE_parameters.fromType ? deleteRelationUsingDELETE_parameters.fromType : msg.payload;
                
                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_relationType;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_relationTypeType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.relationType = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.relationType = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.relationType = !!deleteRelationUsingDELETE_parameters.relationType ? deleteRelationUsingDELETE_parameters.relationType : msg.payload;
                
                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_relationTypeGroup;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_relationTypeGroupType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.relationTypeGroup = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.relationTypeGroup = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.relationTypeGroup = !!deleteRelationUsingDELETE_parameters.relationTypeGroup ? deleteRelationUsingDELETE_parameters.relationTypeGroup : msg.payload;
                
                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_toId;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_toIdType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.toId = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.toId = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.toId = !!deleteRelationUsingDELETE_parameters.toId ? deleteRelationUsingDELETE_parameters.toId : msg.payload;
                
                deleteRelationUsingDELETE_nodeParam = node.deleteRelationUsingDELETE_toType;
                deleteRelationUsingDELETE_nodeParamType = node.deleteRelationUsingDELETE_toTypeType;
                if (deleteRelationUsingDELETE_nodeParamType === 'str') {
                    deleteRelationUsingDELETE_parameters.toType = deleteRelationUsingDELETE_nodeParam || '';
                } else {
                    deleteRelationUsingDELETE_parameters.toType = RED.util.getMessageProperty(msg, deleteRelationUsingDELETE_nodeParam);
                }
                deleteRelationUsingDELETE_parameters.toType = !!deleteRelationUsingDELETE_parameters.toType ? deleteRelationUsingDELETE_parameters.toType : msg.payload;
                                result = client.deleteRelationUsingDELETE(deleteRelationUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerEntityViewsUsingGET') {
                var getCustomerEntityViewsUsingGET_parameters = [];
                var getCustomerEntityViewsUsingGET_nodeParam;
                var getCustomerEntityViewsUsingGET_nodeParamType;

                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_customerId;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_customerIdType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.customerId = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.customerId = !!getCustomerEntityViewsUsingGET_parameters.customerId ? getCustomerEntityViewsUsingGET_parameters.customerId : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_pageSize;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_pageSizeType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.pageSize = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.pageSize = !!getCustomerEntityViewsUsingGET_parameters.pageSize ? getCustomerEntityViewsUsingGET_parameters.pageSize : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_page;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_pageType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.page = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.page = !!getCustomerEntityViewsUsingGET_parameters.page ? getCustomerEntityViewsUsingGET_parameters.page : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_type;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_typeType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.type = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.type = !!getCustomerEntityViewsUsingGET_parameters.type ? getCustomerEntityViewsUsingGET_parameters.type : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_textSearch;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_textSearchType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.textSearch = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.textSearch = !!getCustomerEntityViewsUsingGET_parameters.textSearch ? getCustomerEntityViewsUsingGET_parameters.textSearch : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_sortProperty;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_sortPropertyType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.sortProperty = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.sortProperty = !!getCustomerEntityViewsUsingGET_parameters.sortProperty ? getCustomerEntityViewsUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomerEntityViewsUsingGET_nodeParam = node.getCustomerEntityViewsUsingGET_sortOrder;
                getCustomerEntityViewsUsingGET_nodeParamType = node.getCustomerEntityViewsUsingGET_sortOrderType;
                if (getCustomerEntityViewsUsingGET_nodeParamType === 'str') {
                    getCustomerEntityViewsUsingGET_parameters.sortOrder = getCustomerEntityViewsUsingGET_nodeParam || '';
                } else {
                    getCustomerEntityViewsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomerEntityViewsUsingGET_nodeParam);
                }
                getCustomerEntityViewsUsingGET_parameters.sortOrder = !!getCustomerEntityViewsUsingGET_parameters.sortOrder ? getCustomerEntityViewsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomerEntityViewsUsingGET(getCustomerEntityViewsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityViewsByEntityGroupIdUsingGET') {
                var getEntityViewsByEntityGroupIdUsingGET_parameters = [];
                var getEntityViewsByEntityGroupIdUsingGET_nodeParam;
                var getEntityViewsByEntityGroupIdUsingGET_nodeParamType;

                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_entityGroupId;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_entityGroupIdType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.entityGroupId = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.entityGroupId = !!getEntityViewsByEntityGroupIdUsingGET_parameters.entityGroupId ? getEntityViewsByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_pageSize;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_pageSizeType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.pageSize = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.pageSize = !!getEntityViewsByEntityGroupIdUsingGET_parameters.pageSize ? getEntityViewsByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_page;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_pageType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.page = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.page = !!getEntityViewsByEntityGroupIdUsingGET_parameters.page ? getEntityViewsByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_textSearch;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_textSearchType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.textSearch = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.textSearch = !!getEntityViewsByEntityGroupIdUsingGET_parameters.textSearch ? getEntityViewsByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_sortProperty;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_sortPropertyType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.sortProperty = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.sortProperty = !!getEntityViewsByEntityGroupIdUsingGET_parameters.sortProperty ? getEntityViewsByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getEntityViewsByEntityGroupIdUsingGET_nodeParam = node.getEntityViewsByEntityGroupIdUsingGET_sortOrder;
                getEntityViewsByEntityGroupIdUsingGET_nodeParamType = node.getEntityViewsByEntityGroupIdUsingGET_sortOrderType;
                if (getEntityViewsByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.sortOrder = getEntityViewsByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEntityViewsByEntityGroupIdUsingGET_nodeParam);
                }
                getEntityViewsByEntityGroupIdUsingGET_parameters.sortOrder = !!getEntityViewsByEntityGroupIdUsingGET_parameters.sortOrder ? getEntityViewsByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEntityViewsByEntityGroupIdUsingGET(getEntityViewsByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityViewTypesUsingGET') {
                var getEntityViewTypesUsingGET_parameters = [];
                var getEntityViewTypesUsingGET_nodeParam;
                var getEntityViewTypesUsingGET_nodeParamType;
                result = client.getEntityViewTypesUsingGET(getEntityViewTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEntityViewByIdUsingGET') {
                var getEntityViewByIdUsingGET_parameters = [];
                var getEntityViewByIdUsingGET_nodeParam;
                var getEntityViewByIdUsingGET_nodeParamType;

                getEntityViewByIdUsingGET_nodeParam = node.getEntityViewByIdUsingGET_entityViewId;
                getEntityViewByIdUsingGET_nodeParamType = node.getEntityViewByIdUsingGET_entityViewIdType;
                if (getEntityViewByIdUsingGET_nodeParamType === 'str') {
                    getEntityViewByIdUsingGET_parameters.entityViewId = getEntityViewByIdUsingGET_nodeParam || '';
                } else {
                    getEntityViewByIdUsingGET_parameters.entityViewId = RED.util.getMessageProperty(msg, getEntityViewByIdUsingGET_nodeParam);
                }
                getEntityViewByIdUsingGET_parameters.entityViewId = !!getEntityViewByIdUsingGET_parameters.entityViewId ? getEntityViewByIdUsingGET_parameters.entityViewId : msg.payload;
                                result = client.getEntityViewByIdUsingGET(getEntityViewByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteEntityViewUsingDELETE') {
                var deleteEntityViewUsingDELETE_parameters = [];
                var deleteEntityViewUsingDELETE_nodeParam;
                var deleteEntityViewUsingDELETE_nodeParamType;

                deleteEntityViewUsingDELETE_nodeParam = node.deleteEntityViewUsingDELETE_entityViewId;
                deleteEntityViewUsingDELETE_nodeParamType = node.deleteEntityViewUsingDELETE_entityViewIdType;
                if (deleteEntityViewUsingDELETE_nodeParamType === 'str') {
                    deleteEntityViewUsingDELETE_parameters.entityViewId = deleteEntityViewUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityViewUsingDELETE_parameters.entityViewId = RED.util.getMessageProperty(msg, deleteEntityViewUsingDELETE_nodeParam);
                }
                deleteEntityViewUsingDELETE_parameters.entityViewId = !!deleteEntityViewUsingDELETE_parameters.entityViewId ? deleteEntityViewUsingDELETE_parameters.entityViewId : msg.payload;
                                result = client.deleteEntityViewUsingDELETE(deleteEntityViewUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'findByQueryUsingPOST_4') {
                var findByQueryUsingPOST_4_parameters = [];
                var findByQueryUsingPOST_4_nodeParam;
                var findByQueryUsingPOST_4_nodeParamType;

                if (typeof msg.payload === 'object') {
                    findByQueryUsingPOST_4_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.findByQueryUsingPOST_4(findByQueryUsingPOST_4_parameters);
            }
            if (!errorFlag && node.method === 'getEntityViewsByIdsUsingGET') {
                var getEntityViewsByIdsUsingGET_parameters = [];
                var getEntityViewsByIdsUsingGET_nodeParam;
                var getEntityViewsByIdsUsingGET_nodeParamType;

                getEntityViewsByIdsUsingGET_nodeParam = node.getEntityViewsByIdsUsingGET_entityViewIds;
                getEntityViewsByIdsUsingGET_nodeParamType = node.getEntityViewsByIdsUsingGET_entityViewIdsType;
                if (getEntityViewsByIdsUsingGET_nodeParamType === 'str') {
                    getEntityViewsByIdsUsingGET_parameters.entityViewIds = getEntityViewsByIdsUsingGET_nodeParam || '';
                } else {
                    getEntityViewsByIdsUsingGET_parameters.entityViewIds = RED.util.getMessageProperty(msg, getEntityViewsByIdsUsingGET_nodeParam);
                }
                getEntityViewsByIdsUsingGET_parameters.entityViewIds = !!getEntityViewsByIdsUsingGET_parameters.entityViewIds ? getEntityViewsByIdsUsingGET_parameters.entityViewIds : msg.payload;
                                result = client.getEntityViewsByIdsUsingGET(getEntityViewsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityViewUsingPOST') {
                var saveEntityViewUsingPOST_parameters = [];
                var saveEntityViewUsingPOST_nodeParam;
                var saveEntityViewUsingPOST_nodeParamType;

                saveEntityViewUsingPOST_nodeParam = node.saveEntityViewUsingPOST_entityGroupId;
                saveEntityViewUsingPOST_nodeParamType = node.saveEntityViewUsingPOST_entityGroupIdType;
                if (saveEntityViewUsingPOST_nodeParamType === 'str') {
                    saveEntityViewUsingPOST_parameters.entityGroupId = saveEntityViewUsingPOST_nodeParam || '';
                } else {
                    saveEntityViewUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveEntityViewUsingPOST_nodeParam);
                }
                saveEntityViewUsingPOST_parameters.entityGroupId = !!saveEntityViewUsingPOST_parameters.entityGroupId ? saveEntityViewUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEntityViewUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityViewUsingPOST(saveEntityViewUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantEntityViewUsingGET') {
                var getTenantEntityViewUsingGET_parameters = [];
                var getTenantEntityViewUsingGET_nodeParam;
                var getTenantEntityViewUsingGET_nodeParamType;

                getTenantEntityViewUsingGET_nodeParam = node.getTenantEntityViewUsingGET_entityViewName;
                getTenantEntityViewUsingGET_nodeParamType = node.getTenantEntityViewUsingGET_entityViewNameType;
                if (getTenantEntityViewUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewUsingGET_parameters.entityViewName = getTenantEntityViewUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewUsingGET_parameters.entityViewName = RED.util.getMessageProperty(msg, getTenantEntityViewUsingGET_nodeParam);
                }
                getTenantEntityViewUsingGET_parameters.entityViewName = !!getTenantEntityViewUsingGET_parameters.entityViewName ? getTenantEntityViewUsingGET_parameters.entityViewName : msg.payload;
                                result = client.getTenantEntityViewUsingGET(getTenantEntityViewUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantEntityViewsUsingGET') {
                var getTenantEntityViewsUsingGET_parameters = [];
                var getTenantEntityViewsUsingGET_nodeParam;
                var getTenantEntityViewsUsingGET_nodeParamType;

                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_pageSize;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_pageSizeType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.pageSize = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.pageSize = !!getTenantEntityViewsUsingGET_parameters.pageSize ? getTenantEntityViewsUsingGET_parameters.pageSize : msg.payload;
                
                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_page;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_pageType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.page = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.page = !!getTenantEntityViewsUsingGET_parameters.page ? getTenantEntityViewsUsingGET_parameters.page : msg.payload;
                
                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_type;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_typeType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.type = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.type = !!getTenantEntityViewsUsingGET_parameters.type ? getTenantEntityViewsUsingGET_parameters.type : msg.payload;
                
                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_textSearch;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_textSearchType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.textSearch = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.textSearch = !!getTenantEntityViewsUsingGET_parameters.textSearch ? getTenantEntityViewsUsingGET_parameters.textSearch : msg.payload;
                
                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_sortProperty;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_sortPropertyType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.sortProperty = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.sortProperty = !!getTenantEntityViewsUsingGET_parameters.sortProperty ? getTenantEntityViewsUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantEntityViewsUsingGET_nodeParam = node.getTenantEntityViewsUsingGET_sortOrder;
                getTenantEntityViewsUsingGET_nodeParamType = node.getTenantEntityViewsUsingGET_sortOrderType;
                if (getTenantEntityViewsUsingGET_nodeParamType === 'str') {
                    getTenantEntityViewsUsingGET_parameters.sortOrder = getTenantEntityViewsUsingGET_nodeParam || '';
                } else {
                    getTenantEntityViewsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantEntityViewsUsingGET_nodeParam);
                }
                getTenantEntityViewsUsingGET_parameters.sortOrder = !!getTenantEntityViewsUsingGET_parameters.sortOrder ? getTenantEntityViewsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantEntityViewsUsingGET(getTenantEntityViewsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserEntityViewsUsingGET') {
                var getUserEntityViewsUsingGET_parameters = [];
                var getUserEntityViewsUsingGET_nodeParam;
                var getUserEntityViewsUsingGET_nodeParamType;

                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_pageSize;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_pageSizeType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.pageSize = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.pageSize = !!getUserEntityViewsUsingGET_parameters.pageSize ? getUserEntityViewsUsingGET_parameters.pageSize : msg.payload;
                
                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_page;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_pageType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.page = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.page = !!getUserEntityViewsUsingGET_parameters.page ? getUserEntityViewsUsingGET_parameters.page : msg.payload;
                
                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_type;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_typeType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.type = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.type = !!getUserEntityViewsUsingGET_parameters.type ? getUserEntityViewsUsingGET_parameters.type : msg.payload;
                
                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_textSearch;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_textSearchType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.textSearch = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.textSearch = !!getUserEntityViewsUsingGET_parameters.textSearch ? getUserEntityViewsUsingGET_parameters.textSearch : msg.payload;
                
                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_sortProperty;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_sortPropertyType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.sortProperty = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.sortProperty = !!getUserEntityViewsUsingGET_parameters.sortProperty ? getUserEntityViewsUsingGET_parameters.sortProperty : msg.payload;
                
                getUserEntityViewsUsingGET_nodeParam = node.getUserEntityViewsUsingGET_sortOrder;
                getUserEntityViewsUsingGET_nodeParamType = node.getUserEntityViewsUsingGET_sortOrderType;
                if (getUserEntityViewsUsingGET_nodeParamType === 'str') {
                    getUserEntityViewsUsingGET_parameters.sortOrder = getUserEntityViewsUsingGET_nodeParam || '';
                } else {
                    getUserEntityViewsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserEntityViewsUsingGET_nodeParam);
                }
                getUserEntityViewsUsingGET_parameters.sortOrder = !!getUserEntityViewsUsingGET_parameters.sortOrder ? getUserEntityViewsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserEntityViewsUsingGET(getUserEntityViewsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'clearEventsUsingPOST') {
                var clearEventsUsingPOST_parameters = [];
                var clearEventsUsingPOST_nodeParam;
                var clearEventsUsingPOST_nodeParamType;

                clearEventsUsingPOST_nodeParam = node.clearEventsUsingPOST_entityType;
                clearEventsUsingPOST_nodeParamType = node.clearEventsUsingPOST_entityTypeType;
                if (clearEventsUsingPOST_nodeParamType === 'str') {
                    clearEventsUsingPOST_parameters.entityType = clearEventsUsingPOST_nodeParam || '';
                } else {
                    clearEventsUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, clearEventsUsingPOST_nodeParam);
                }
                clearEventsUsingPOST_parameters.entityType = !!clearEventsUsingPOST_parameters.entityType ? clearEventsUsingPOST_parameters.entityType : msg.payload;
                
                clearEventsUsingPOST_nodeParam = node.clearEventsUsingPOST_entityId;
                clearEventsUsingPOST_nodeParamType = node.clearEventsUsingPOST_entityIdType;
                if (clearEventsUsingPOST_nodeParamType === 'str') {
                    clearEventsUsingPOST_parameters.entityId = clearEventsUsingPOST_nodeParam || '';
                } else {
                    clearEventsUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, clearEventsUsingPOST_nodeParam);
                }
                clearEventsUsingPOST_parameters.entityId = !!clearEventsUsingPOST_parameters.entityId ? clearEventsUsingPOST_parameters.entityId : msg.payload;
                
                clearEventsUsingPOST_nodeParam = node.clearEventsUsingPOST_startTime;
                clearEventsUsingPOST_nodeParamType = node.clearEventsUsingPOST_startTimeType;
                if (clearEventsUsingPOST_nodeParamType === 'str') {
                    clearEventsUsingPOST_parameters.startTime = clearEventsUsingPOST_nodeParam || '';
                } else {
                    clearEventsUsingPOST_parameters.startTime = RED.util.getMessageProperty(msg, clearEventsUsingPOST_nodeParam);
                }
                clearEventsUsingPOST_parameters.startTime = !!clearEventsUsingPOST_parameters.startTime ? clearEventsUsingPOST_parameters.startTime : msg.payload;
                
                clearEventsUsingPOST_nodeParam = node.clearEventsUsingPOST_endTime;
                clearEventsUsingPOST_nodeParamType = node.clearEventsUsingPOST_endTimeType;
                if (clearEventsUsingPOST_nodeParamType === 'str') {
                    clearEventsUsingPOST_parameters.endTime = clearEventsUsingPOST_nodeParam || '';
                } else {
                    clearEventsUsingPOST_parameters.endTime = RED.util.getMessageProperty(msg, clearEventsUsingPOST_nodeParam);
                }
                clearEventsUsingPOST_parameters.endTime = !!clearEventsUsingPOST_parameters.endTime ? clearEventsUsingPOST_parameters.endTime : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    clearEventsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.clearEventsUsingPOST(clearEventsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEventsUsingGET_1') {
                var getEventsUsingGET_1_parameters = [];
                var getEventsUsingGET_1_nodeParam;
                var getEventsUsingGET_1_nodeParamType;

                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_entityType;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_entityTypeType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.entityType = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.entityType = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.entityType = !!getEventsUsingGET_1_parameters.entityType ? getEventsUsingGET_1_parameters.entityType : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_entityId;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_entityIdType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.entityId = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.entityId = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.entityId = !!getEventsUsingGET_1_parameters.entityId ? getEventsUsingGET_1_parameters.entityId : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_eventType;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_eventTypeType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.eventType = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.eventType = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.eventType = !!getEventsUsingGET_1_parameters.eventType ? getEventsUsingGET_1_parameters.eventType : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_tenantId;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_tenantIdType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.tenantId = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.tenantId = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.tenantId = !!getEventsUsingGET_1_parameters.tenantId ? getEventsUsingGET_1_parameters.tenantId : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_pageSize;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_pageSizeType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.pageSize = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.pageSize = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.pageSize = !!getEventsUsingGET_1_parameters.pageSize ? getEventsUsingGET_1_parameters.pageSize : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_page;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_pageType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.page = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.page = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.page = !!getEventsUsingGET_1_parameters.page ? getEventsUsingGET_1_parameters.page : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_textSearch;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_textSearchType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.textSearch = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.textSearch = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.textSearch = !!getEventsUsingGET_1_parameters.textSearch ? getEventsUsingGET_1_parameters.textSearch : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_sortProperty;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_sortPropertyType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.sortProperty = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.sortProperty = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.sortProperty = !!getEventsUsingGET_1_parameters.sortProperty ? getEventsUsingGET_1_parameters.sortProperty : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_sortOrder;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_sortOrderType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.sortOrder = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.sortOrder = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.sortOrder = !!getEventsUsingGET_1_parameters.sortOrder ? getEventsUsingGET_1_parameters.sortOrder : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_startTime;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_startTimeType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.startTime = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.startTime = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.startTime = !!getEventsUsingGET_1_parameters.startTime ? getEventsUsingGET_1_parameters.startTime : msg.payload;
                
                getEventsUsingGET_1_nodeParam = node.getEventsUsingGET_1_endTime;
                getEventsUsingGET_1_nodeParamType = node.getEventsUsingGET_1_endTimeType;
                if (getEventsUsingGET_1_nodeParamType === 'str') {
                    getEventsUsingGET_1_parameters.endTime = getEventsUsingGET_1_nodeParam || '';
                } else {
                    getEventsUsingGET_1_parameters.endTime = RED.util.getMessageProperty(msg, getEventsUsingGET_1_nodeParam);
                }
                getEventsUsingGET_1_parameters.endTime = !!getEventsUsingGET_1_parameters.endTime ? getEventsUsingGET_1_parameters.endTime : msg.payload;
                                result = client.getEventsUsingGET_1(getEventsUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'getEventsUsingGET') {
                var getEventsUsingGET_parameters = [];
                var getEventsUsingGET_nodeParam;
                var getEventsUsingGET_nodeParamType;

                getEventsUsingGET_nodeParam = node.getEventsUsingGET_entityType;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_entityTypeType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.entityType = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.entityType = !!getEventsUsingGET_parameters.entityType ? getEventsUsingGET_parameters.entityType : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_entityId;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_entityIdType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.entityId = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.entityId = !!getEventsUsingGET_parameters.entityId ? getEventsUsingGET_parameters.entityId : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_tenantId;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_tenantIdType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.tenantId = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.tenantId = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.tenantId = !!getEventsUsingGET_parameters.tenantId ? getEventsUsingGET_parameters.tenantId : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_pageSize;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_pageSizeType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.pageSize = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.pageSize = !!getEventsUsingGET_parameters.pageSize ? getEventsUsingGET_parameters.pageSize : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_page;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_pageType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.page = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.page = !!getEventsUsingGET_parameters.page ? getEventsUsingGET_parameters.page : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_textSearch;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_textSearchType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.textSearch = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.textSearch = !!getEventsUsingGET_parameters.textSearch ? getEventsUsingGET_parameters.textSearch : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_sortProperty;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_sortPropertyType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.sortProperty = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.sortProperty = !!getEventsUsingGET_parameters.sortProperty ? getEventsUsingGET_parameters.sortProperty : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_sortOrder;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_sortOrderType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.sortOrder = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.sortOrder = !!getEventsUsingGET_parameters.sortOrder ? getEventsUsingGET_parameters.sortOrder : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_startTime;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_startTimeType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.startTime = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.startTime = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.startTime = !!getEventsUsingGET_parameters.startTime ? getEventsUsingGET_parameters.startTime : msg.payload;
                
                getEventsUsingGET_nodeParam = node.getEventsUsingGET_endTime;
                getEventsUsingGET_nodeParamType = node.getEventsUsingGET_endTimeType;
                if (getEventsUsingGET_nodeParamType === 'str') {
                    getEventsUsingGET_parameters.endTime = getEventsUsingGET_nodeParam || '';
                } else {
                    getEventsUsingGET_parameters.endTime = RED.util.getMessageProperty(msg, getEventsUsingGET_nodeParam);
                }
                getEventsUsingGET_parameters.endTime = !!getEventsUsingGET_parameters.endTime ? getEventsUsingGET_parameters.endTime : msg.payload;
                                result = client.getEventsUsingGET(getEventsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getEventsUsingPOST') {
                var getEventsUsingPOST_parameters = [];
                var getEventsUsingPOST_nodeParam;
                var getEventsUsingPOST_nodeParamType;

                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_entityType;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_entityTypeType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.entityType = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.entityType = !!getEventsUsingPOST_parameters.entityType ? getEventsUsingPOST_parameters.entityType : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_entityId;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_entityIdType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.entityId = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.entityId = !!getEventsUsingPOST_parameters.entityId ? getEventsUsingPOST_parameters.entityId : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_tenantId;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_tenantIdType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.tenantId = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.tenantId = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.tenantId = !!getEventsUsingPOST_parameters.tenantId ? getEventsUsingPOST_parameters.tenantId : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_pageSize;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_pageSizeType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.pageSize = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.pageSize = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.pageSize = !!getEventsUsingPOST_parameters.pageSize ? getEventsUsingPOST_parameters.pageSize : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_page;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_pageType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.page = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.page = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.page = !!getEventsUsingPOST_parameters.page ? getEventsUsingPOST_parameters.page : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_textSearch;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_textSearchType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.textSearch = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.textSearch = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.textSearch = !!getEventsUsingPOST_parameters.textSearch ? getEventsUsingPOST_parameters.textSearch : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_sortProperty;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_sortPropertyType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.sortProperty = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.sortProperty = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.sortProperty = !!getEventsUsingPOST_parameters.sortProperty ? getEventsUsingPOST_parameters.sortProperty : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_sortOrder;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_sortOrderType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.sortOrder = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.sortOrder = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.sortOrder = !!getEventsUsingPOST_parameters.sortOrder ? getEventsUsingPOST_parameters.sortOrder : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_startTime;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_startTimeType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.startTime = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.startTime = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.startTime = !!getEventsUsingPOST_parameters.startTime ? getEventsUsingPOST_parameters.startTime : msg.payload;
                
                getEventsUsingPOST_nodeParam = node.getEventsUsingPOST_endTime;
                getEventsUsingPOST_nodeParamType = node.getEventsUsingPOST_endTimeType;
                if (getEventsUsingPOST_nodeParamType === 'str') {
                    getEventsUsingPOST_parameters.endTime = getEventsUsingPOST_nodeParam || '';
                } else {
                    getEventsUsingPOST_parameters.endTime = RED.util.getMessageProperty(msg, getEventsUsingPOST_nodeParam);
                }
                getEventsUsingPOST_parameters.endTime = !!getEventsUsingPOST_parameters.endTime ? getEventsUsingPOST_parameters.endTime : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    getEventsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.getEventsUsingPOST(getEventsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getEntityGroupPermissionsUsingGET') {
                var getEntityGroupPermissionsUsingGET_parameters = [];
                var getEntityGroupPermissionsUsingGET_nodeParam;
                var getEntityGroupPermissionsUsingGET_nodeParamType;

                getEntityGroupPermissionsUsingGET_nodeParam = node.getEntityGroupPermissionsUsingGET_entityGroupId;
                getEntityGroupPermissionsUsingGET_nodeParamType = node.getEntityGroupPermissionsUsingGET_entityGroupIdType;
                if (getEntityGroupPermissionsUsingGET_nodeParamType === 'str') {
                    getEntityGroupPermissionsUsingGET_parameters.entityGroupId = getEntityGroupPermissionsUsingGET_nodeParam || '';
                } else {
                    getEntityGroupPermissionsUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getEntityGroupPermissionsUsingGET_nodeParam);
                }
                getEntityGroupPermissionsUsingGET_parameters.entityGroupId = !!getEntityGroupPermissionsUsingGET_parameters.entityGroupId ? getEntityGroupPermissionsUsingGET_parameters.entityGroupId : msg.payload;
                                result = client.getEntityGroupPermissionsUsingGET(getEntityGroupPermissionsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveGroupPermissionUsingPOST') {
                var saveGroupPermissionUsingPOST_parameters = [];
                var saveGroupPermissionUsingPOST_nodeParam;
                var saveGroupPermissionUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveGroupPermissionUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveGroupPermissionUsingPOST(saveGroupPermissionUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getGroupPermissionInfoByIdUsingGET') {
                var getGroupPermissionInfoByIdUsingGET_parameters = [];
                var getGroupPermissionInfoByIdUsingGET_nodeParam;
                var getGroupPermissionInfoByIdUsingGET_nodeParamType;

                getGroupPermissionInfoByIdUsingGET_nodeParam = node.getGroupPermissionInfoByIdUsingGET_groupPermissionId;
                getGroupPermissionInfoByIdUsingGET_nodeParamType = node.getGroupPermissionInfoByIdUsingGET_groupPermissionIdType;
                if (getGroupPermissionInfoByIdUsingGET_nodeParamType === 'str') {
                    getGroupPermissionInfoByIdUsingGET_parameters.groupPermissionId = getGroupPermissionInfoByIdUsingGET_nodeParam || '';
                } else {
                    getGroupPermissionInfoByIdUsingGET_parameters.groupPermissionId = RED.util.getMessageProperty(msg, getGroupPermissionInfoByIdUsingGET_nodeParam);
                }
                getGroupPermissionInfoByIdUsingGET_parameters.groupPermissionId = !!getGroupPermissionInfoByIdUsingGET_parameters.groupPermissionId ? getGroupPermissionInfoByIdUsingGET_parameters.groupPermissionId : msg.payload;
                
                getGroupPermissionInfoByIdUsingGET_nodeParam = node.getGroupPermissionInfoByIdUsingGET_isUserGroup;
                getGroupPermissionInfoByIdUsingGET_nodeParamType = node.getGroupPermissionInfoByIdUsingGET_isUserGroupType;
                if (getGroupPermissionInfoByIdUsingGET_nodeParamType === 'str') {
                    getGroupPermissionInfoByIdUsingGET_parameters.isUserGroup = getGroupPermissionInfoByIdUsingGET_nodeParam || '';
                } else {
                    getGroupPermissionInfoByIdUsingGET_parameters.isUserGroup = RED.util.getMessageProperty(msg, getGroupPermissionInfoByIdUsingGET_nodeParam);
                }
                getGroupPermissionInfoByIdUsingGET_parameters.isUserGroup = !!getGroupPermissionInfoByIdUsingGET_parameters.isUserGroup ? getGroupPermissionInfoByIdUsingGET_parameters.isUserGroup : msg.payload;
                                result = client.getGroupPermissionInfoByIdUsingGET(getGroupPermissionInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getGroupPermissionByIdUsingGET') {
                var getGroupPermissionByIdUsingGET_parameters = [];
                var getGroupPermissionByIdUsingGET_nodeParam;
                var getGroupPermissionByIdUsingGET_nodeParamType;

                getGroupPermissionByIdUsingGET_nodeParam = node.getGroupPermissionByIdUsingGET_groupPermissionId;
                getGroupPermissionByIdUsingGET_nodeParamType = node.getGroupPermissionByIdUsingGET_groupPermissionIdType;
                if (getGroupPermissionByIdUsingGET_nodeParamType === 'str') {
                    getGroupPermissionByIdUsingGET_parameters.groupPermissionId = getGroupPermissionByIdUsingGET_nodeParam || '';
                } else {
                    getGroupPermissionByIdUsingGET_parameters.groupPermissionId = RED.util.getMessageProperty(msg, getGroupPermissionByIdUsingGET_nodeParam);
                }
                getGroupPermissionByIdUsingGET_parameters.groupPermissionId = !!getGroupPermissionByIdUsingGET_parameters.groupPermissionId ? getGroupPermissionByIdUsingGET_parameters.groupPermissionId : msg.payload;
                                result = client.getGroupPermissionByIdUsingGET(getGroupPermissionByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteGroupPermissionUsingDELETE') {
                var deleteGroupPermissionUsingDELETE_parameters = [];
                var deleteGroupPermissionUsingDELETE_nodeParam;
                var deleteGroupPermissionUsingDELETE_nodeParamType;

                deleteGroupPermissionUsingDELETE_nodeParam = node.deleteGroupPermissionUsingDELETE_groupPermissionId;
                deleteGroupPermissionUsingDELETE_nodeParamType = node.deleteGroupPermissionUsingDELETE_groupPermissionIdType;
                if (deleteGroupPermissionUsingDELETE_nodeParamType === 'str') {
                    deleteGroupPermissionUsingDELETE_parameters.groupPermissionId = deleteGroupPermissionUsingDELETE_nodeParam || '';
                } else {
                    deleteGroupPermissionUsingDELETE_parameters.groupPermissionId = RED.util.getMessageProperty(msg, deleteGroupPermissionUsingDELETE_nodeParam);
                }
                deleteGroupPermissionUsingDELETE_parameters.groupPermissionId = !!deleteGroupPermissionUsingDELETE_parameters.groupPermissionId ? deleteGroupPermissionUsingDELETE_parameters.groupPermissionId : msg.payload;
                                result = client.deleteGroupPermissionUsingDELETE(deleteGroupPermissionUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'loadUserGroupPermissionInfosUsingPOST') {
                var loadUserGroupPermissionInfosUsingPOST_parameters = [];
                var loadUserGroupPermissionInfosUsingPOST_nodeParam;
                var loadUserGroupPermissionInfosUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    loadUserGroupPermissionInfosUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.loadUserGroupPermissionInfosUsingPOST(loadUserGroupPermissionInfosUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getUserGroupPermissionsUsingGET') {
                var getUserGroupPermissionsUsingGET_parameters = [];
                var getUserGroupPermissionsUsingGET_nodeParam;
                var getUserGroupPermissionsUsingGET_nodeParamType;

                getUserGroupPermissionsUsingGET_nodeParam = node.getUserGroupPermissionsUsingGET_userGroupId;
                getUserGroupPermissionsUsingGET_nodeParamType = node.getUserGroupPermissionsUsingGET_userGroupIdType;
                if (getUserGroupPermissionsUsingGET_nodeParamType === 'str') {
                    getUserGroupPermissionsUsingGET_parameters.userGroupId = getUserGroupPermissionsUsingGET_nodeParam || '';
                } else {
                    getUserGroupPermissionsUsingGET_parameters.userGroupId = RED.util.getMessageProperty(msg, getUserGroupPermissionsUsingGET_nodeParam);
                }
                getUserGroupPermissionsUsingGET_parameters.userGroupId = !!getUserGroupPermissionsUsingGET_parameters.userGroupId ? getUserGroupPermissionsUsingGET_parameters.userGroupId : msg.payload;
                                result = client.getUserGroupPermissionsUsingGET(getUserGroupPermissionsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveIntegrationUsingPOST') {
                var saveIntegrationUsingPOST_parameters = [];
                var saveIntegrationUsingPOST_nodeParam;
                var saveIntegrationUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveIntegrationUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveIntegrationUsingPOST(saveIntegrationUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'checkIntegrationConnectionUsingPOST') {
                var checkIntegrationConnectionUsingPOST_parameters = [];
                var checkIntegrationConnectionUsingPOST_nodeParam;
                var checkIntegrationConnectionUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    checkIntegrationConnectionUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.checkIntegrationConnectionUsingPOST(checkIntegrationConnectionUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getIntegrationByRoutingKeyUsingGET') {
                var getIntegrationByRoutingKeyUsingGET_parameters = [];
                var getIntegrationByRoutingKeyUsingGET_nodeParam;
                var getIntegrationByRoutingKeyUsingGET_nodeParamType;

                getIntegrationByRoutingKeyUsingGET_nodeParam = node.getIntegrationByRoutingKeyUsingGET_routingKey;
                getIntegrationByRoutingKeyUsingGET_nodeParamType = node.getIntegrationByRoutingKeyUsingGET_routingKeyType;
                if (getIntegrationByRoutingKeyUsingGET_nodeParamType === 'str') {
                    getIntegrationByRoutingKeyUsingGET_parameters.routingKey = getIntegrationByRoutingKeyUsingGET_nodeParam || '';
                } else {
                    getIntegrationByRoutingKeyUsingGET_parameters.routingKey = RED.util.getMessageProperty(msg, getIntegrationByRoutingKeyUsingGET_nodeParam);
                }
                getIntegrationByRoutingKeyUsingGET_parameters.routingKey = !!getIntegrationByRoutingKeyUsingGET_parameters.routingKey ? getIntegrationByRoutingKeyUsingGET_parameters.routingKey : msg.payload;
                                result = client.getIntegrationByRoutingKeyUsingGET(getIntegrationByRoutingKeyUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getIntegrationByIdUsingGET') {
                var getIntegrationByIdUsingGET_parameters = [];
                var getIntegrationByIdUsingGET_nodeParam;
                var getIntegrationByIdUsingGET_nodeParamType;

                getIntegrationByIdUsingGET_nodeParam = node.getIntegrationByIdUsingGET_integrationId;
                getIntegrationByIdUsingGET_nodeParamType = node.getIntegrationByIdUsingGET_integrationIdType;
                if (getIntegrationByIdUsingGET_nodeParamType === 'str') {
                    getIntegrationByIdUsingGET_parameters.integrationId = getIntegrationByIdUsingGET_nodeParam || '';
                } else {
                    getIntegrationByIdUsingGET_parameters.integrationId = RED.util.getMessageProperty(msg, getIntegrationByIdUsingGET_nodeParam);
                }
                getIntegrationByIdUsingGET_parameters.integrationId = !!getIntegrationByIdUsingGET_parameters.integrationId ? getIntegrationByIdUsingGET_parameters.integrationId : msg.payload;
                                result = client.getIntegrationByIdUsingGET(getIntegrationByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteIntegrationUsingDELETE') {
                var deleteIntegrationUsingDELETE_parameters = [];
                var deleteIntegrationUsingDELETE_nodeParam;
                var deleteIntegrationUsingDELETE_nodeParamType;

                deleteIntegrationUsingDELETE_nodeParam = node.deleteIntegrationUsingDELETE_integrationId;
                deleteIntegrationUsingDELETE_nodeParamType = node.deleteIntegrationUsingDELETE_integrationIdType;
                if (deleteIntegrationUsingDELETE_nodeParamType === 'str') {
                    deleteIntegrationUsingDELETE_parameters.integrationId = deleteIntegrationUsingDELETE_nodeParam || '';
                } else {
                    deleteIntegrationUsingDELETE_parameters.integrationId = RED.util.getMessageProperty(msg, deleteIntegrationUsingDELETE_nodeParam);
                }
                deleteIntegrationUsingDELETE_parameters.integrationId = !!deleteIntegrationUsingDELETE_parameters.integrationId ? deleteIntegrationUsingDELETE_parameters.integrationId : msg.payload;
                                result = client.deleteIntegrationUsingDELETE(deleteIntegrationUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getIntegrationsByIdsUsingGET') {
                var getIntegrationsByIdsUsingGET_parameters = [];
                var getIntegrationsByIdsUsingGET_nodeParam;
                var getIntegrationsByIdsUsingGET_nodeParamType;

                getIntegrationsByIdsUsingGET_nodeParam = node.getIntegrationsByIdsUsingGET_integrationIds;
                getIntegrationsByIdsUsingGET_nodeParamType = node.getIntegrationsByIdsUsingGET_integrationIdsType;
                if (getIntegrationsByIdsUsingGET_nodeParamType === 'str') {
                    getIntegrationsByIdsUsingGET_parameters.integrationIds = getIntegrationsByIdsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsByIdsUsingGET_parameters.integrationIds = RED.util.getMessageProperty(msg, getIntegrationsByIdsUsingGET_nodeParam);
                }
                getIntegrationsByIdsUsingGET_parameters.integrationIds = !!getIntegrationsByIdsUsingGET_parameters.integrationIds ? getIntegrationsByIdsUsingGET_parameters.integrationIds : msg.payload;
                                result = client.getIntegrationsByIdsUsingGET(getIntegrationsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getIntegrationsUsingGET') {
                var getIntegrationsUsingGET_parameters = [];
                var getIntegrationsUsingGET_nodeParam;
                var getIntegrationsUsingGET_nodeParamType;

                getIntegrationsUsingGET_nodeParam = node.getIntegrationsUsingGET_pageSize;
                getIntegrationsUsingGET_nodeParamType = node.getIntegrationsUsingGET_pageSizeType;
                if (getIntegrationsUsingGET_nodeParamType === 'str') {
                    getIntegrationsUsingGET_parameters.pageSize = getIntegrationsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getIntegrationsUsingGET_nodeParam);
                }
                getIntegrationsUsingGET_parameters.pageSize = !!getIntegrationsUsingGET_parameters.pageSize ? getIntegrationsUsingGET_parameters.pageSize : msg.payload;
                
                getIntegrationsUsingGET_nodeParam = node.getIntegrationsUsingGET_page;
                getIntegrationsUsingGET_nodeParamType = node.getIntegrationsUsingGET_pageType;
                if (getIntegrationsUsingGET_nodeParamType === 'str') {
                    getIntegrationsUsingGET_parameters.page = getIntegrationsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getIntegrationsUsingGET_nodeParam);
                }
                getIntegrationsUsingGET_parameters.page = !!getIntegrationsUsingGET_parameters.page ? getIntegrationsUsingGET_parameters.page : msg.payload;
                
                getIntegrationsUsingGET_nodeParam = node.getIntegrationsUsingGET_textSearch;
                getIntegrationsUsingGET_nodeParamType = node.getIntegrationsUsingGET_textSearchType;
                if (getIntegrationsUsingGET_nodeParamType === 'str') {
                    getIntegrationsUsingGET_parameters.textSearch = getIntegrationsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getIntegrationsUsingGET_nodeParam);
                }
                getIntegrationsUsingGET_parameters.textSearch = !!getIntegrationsUsingGET_parameters.textSearch ? getIntegrationsUsingGET_parameters.textSearch : msg.payload;
                
                getIntegrationsUsingGET_nodeParam = node.getIntegrationsUsingGET_sortProperty;
                getIntegrationsUsingGET_nodeParamType = node.getIntegrationsUsingGET_sortPropertyType;
                if (getIntegrationsUsingGET_nodeParamType === 'str') {
                    getIntegrationsUsingGET_parameters.sortProperty = getIntegrationsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getIntegrationsUsingGET_nodeParam);
                }
                getIntegrationsUsingGET_parameters.sortProperty = !!getIntegrationsUsingGET_parameters.sortProperty ? getIntegrationsUsingGET_parameters.sortProperty : msg.payload;
                
                getIntegrationsUsingGET_nodeParam = node.getIntegrationsUsingGET_sortOrder;
                getIntegrationsUsingGET_nodeParamType = node.getIntegrationsUsingGET_sortOrderType;
                if (getIntegrationsUsingGET_nodeParamType === 'str') {
                    getIntegrationsUsingGET_parameters.sortOrder = getIntegrationsUsingGET_nodeParam || '';
                } else {
                    getIntegrationsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getIntegrationsUsingGET_nodeParam);
                }
                getIntegrationsUsingGET_parameters.sortOrder = !!getIntegrationsUsingGET_parameters.sortOrder ? getIntegrationsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getIntegrationsUsingGET(getIntegrationsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLwm2mBootstrapSecurityInfoUsingGET') {
                var getLwm2mBootstrapSecurityInfoUsingGET_parameters = [];
                var getLwm2mBootstrapSecurityInfoUsingGET_nodeParam;
                var getLwm2mBootstrapSecurityInfoUsingGET_nodeParamType;

                getLwm2mBootstrapSecurityInfoUsingGET_nodeParam = node.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServer;
                getLwm2mBootstrapSecurityInfoUsingGET_nodeParamType = node.getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServerType;
                if (getLwm2mBootstrapSecurityInfoUsingGET_nodeParamType === 'str') {
                    getLwm2mBootstrapSecurityInfoUsingGET_parameters.isBootstrapServer = getLwm2mBootstrapSecurityInfoUsingGET_nodeParam || '';
                } else {
                    getLwm2mBootstrapSecurityInfoUsingGET_parameters.isBootstrapServer = RED.util.getMessageProperty(msg, getLwm2mBootstrapSecurityInfoUsingGET_nodeParam);
                }
                getLwm2mBootstrapSecurityInfoUsingGET_parameters.isBootstrapServer = !!getLwm2mBootstrapSecurityInfoUsingGET_parameters.isBootstrapServer ? getLwm2mBootstrapSecurityInfoUsingGET_parameters.isBootstrapServer : msg.payload;
                                result = client.getLwm2mBootstrapSecurityInfoUsingGET(getLwm2mBootstrapSecurityInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getClientRegistrationTemplatesUsingGET') {
                var getClientRegistrationTemplatesUsingGET_parameters = [];
                var getClientRegistrationTemplatesUsingGET_nodeParam;
                var getClientRegistrationTemplatesUsingGET_nodeParamType;
                result = client.getClientRegistrationTemplatesUsingGET(getClientRegistrationTemplatesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveClientRegistrationTemplateUsingPOST') {
                var saveClientRegistrationTemplateUsingPOST_parameters = [];
                var saveClientRegistrationTemplateUsingPOST_nodeParam;
                var saveClientRegistrationTemplateUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveClientRegistrationTemplateUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveClientRegistrationTemplateUsingPOST(saveClientRegistrationTemplateUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'deleteClientRegistrationTemplateUsingDELETE') {
                var deleteClientRegistrationTemplateUsingDELETE_parameters = [];
                var deleteClientRegistrationTemplateUsingDELETE_nodeParam;
                var deleteClientRegistrationTemplateUsingDELETE_nodeParamType;

                deleteClientRegistrationTemplateUsingDELETE_nodeParam = node.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateId;
                deleteClientRegistrationTemplateUsingDELETE_nodeParamType = node.deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateIdType;
                if (deleteClientRegistrationTemplateUsingDELETE_nodeParamType === 'str') {
                    deleteClientRegistrationTemplateUsingDELETE_parameters.clientRegistrationTemplateId = deleteClientRegistrationTemplateUsingDELETE_nodeParam || '';
                } else {
                    deleteClientRegistrationTemplateUsingDELETE_parameters.clientRegistrationTemplateId = RED.util.getMessageProperty(msg, deleteClientRegistrationTemplateUsingDELETE_nodeParam);
                }
                deleteClientRegistrationTemplateUsingDELETE_parameters.clientRegistrationTemplateId = !!deleteClientRegistrationTemplateUsingDELETE_parameters.clientRegistrationTemplateId ? deleteClientRegistrationTemplateUsingDELETE_parameters.clientRegistrationTemplateId : msg.payload;
                                result = client.deleteClientRegistrationTemplateUsingDELETE(deleteClientRegistrationTemplateUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getOAuth2ClientsUsingPOST') {
                var getOAuth2ClientsUsingPOST_parameters = [];
                var getOAuth2ClientsUsingPOST_nodeParam;
                var getOAuth2ClientsUsingPOST_nodeParamType;

                getOAuth2ClientsUsingPOST_nodeParam = node.getOAuth2ClientsUsingPOST_pkgName;
                getOAuth2ClientsUsingPOST_nodeParamType = node.getOAuth2ClientsUsingPOST_pkgNameType;
                if (getOAuth2ClientsUsingPOST_nodeParamType === 'str') {
                    getOAuth2ClientsUsingPOST_parameters.pkgName = getOAuth2ClientsUsingPOST_nodeParam || '';
                } else {
                    getOAuth2ClientsUsingPOST_parameters.pkgName = RED.util.getMessageProperty(msg, getOAuth2ClientsUsingPOST_nodeParam);
                }
                getOAuth2ClientsUsingPOST_parameters.pkgName = !!getOAuth2ClientsUsingPOST_parameters.pkgName ? getOAuth2ClientsUsingPOST_parameters.pkgName : msg.payload;
                
                getOAuth2ClientsUsingPOST_nodeParam = node.getOAuth2ClientsUsingPOST_platform;
                getOAuth2ClientsUsingPOST_nodeParamType = node.getOAuth2ClientsUsingPOST_platformType;
                if (getOAuth2ClientsUsingPOST_nodeParamType === 'str') {
                    getOAuth2ClientsUsingPOST_parameters.platform = getOAuth2ClientsUsingPOST_nodeParam || '';
                } else {
                    getOAuth2ClientsUsingPOST_parameters.platform = RED.util.getMessageProperty(msg, getOAuth2ClientsUsingPOST_nodeParam);
                }
                getOAuth2ClientsUsingPOST_parameters.platform = !!getOAuth2ClientsUsingPOST_parameters.platform ? getOAuth2ClientsUsingPOST_parameters.platform : msg.payload;
                                result = client.getOAuth2ClientsUsingPOST(getOAuth2ClientsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getCurrentOAuth2InfoUsingGET') {
                var getCurrentOAuth2InfoUsingGET_parameters = [];
                var getCurrentOAuth2InfoUsingGET_nodeParam;
                var getCurrentOAuth2InfoUsingGET_nodeParamType;
                result = client.getCurrentOAuth2InfoUsingGET(getCurrentOAuth2InfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveOAuth2InfoUsingPOST') {
                var saveOAuth2InfoUsingPOST_parameters = [];
                var saveOAuth2InfoUsingPOST_nodeParam;
                var saveOAuth2InfoUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveOAuth2InfoUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveOAuth2InfoUsingPOST(saveOAuth2InfoUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getLoginProcessingUrlUsingGET') {
                var getLoginProcessingUrlUsingGET_parameters = [];
                var getLoginProcessingUrlUsingGET_nodeParam;
                var getLoginProcessingUrlUsingGET_nodeParamType;
                result = client.getLoginProcessingUrlUsingGET(getLoginProcessingUrlUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveOtaPackageInfoUsingPOST') {
                var saveOtaPackageInfoUsingPOST_parameters = [];
                var saveOtaPackageInfoUsingPOST_nodeParam;
                var saveOtaPackageInfoUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveOtaPackageInfoUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveOtaPackageInfoUsingPOST(saveOtaPackageInfoUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getOtaPackageInfoByIdUsingGET') {
                var getOtaPackageInfoByIdUsingGET_parameters = [];
                var getOtaPackageInfoByIdUsingGET_nodeParam;
                var getOtaPackageInfoByIdUsingGET_nodeParamType;

                getOtaPackageInfoByIdUsingGET_nodeParam = node.getOtaPackageInfoByIdUsingGET_otaPackageId;
                getOtaPackageInfoByIdUsingGET_nodeParamType = node.getOtaPackageInfoByIdUsingGET_otaPackageIdType;
                if (getOtaPackageInfoByIdUsingGET_nodeParamType === 'str') {
                    getOtaPackageInfoByIdUsingGET_parameters.otaPackageId = getOtaPackageInfoByIdUsingGET_nodeParam || '';
                } else {
                    getOtaPackageInfoByIdUsingGET_parameters.otaPackageId = RED.util.getMessageProperty(msg, getOtaPackageInfoByIdUsingGET_nodeParam);
                }
                getOtaPackageInfoByIdUsingGET_parameters.otaPackageId = !!getOtaPackageInfoByIdUsingGET_parameters.otaPackageId ? getOtaPackageInfoByIdUsingGET_parameters.otaPackageId : msg.payload;
                                result = client.getOtaPackageInfoByIdUsingGET(getOtaPackageInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getOtaPackageByIdUsingGET') {
                var getOtaPackageByIdUsingGET_parameters = [];
                var getOtaPackageByIdUsingGET_nodeParam;
                var getOtaPackageByIdUsingGET_nodeParamType;

                getOtaPackageByIdUsingGET_nodeParam = node.getOtaPackageByIdUsingGET_otaPackageId;
                getOtaPackageByIdUsingGET_nodeParamType = node.getOtaPackageByIdUsingGET_otaPackageIdType;
                if (getOtaPackageByIdUsingGET_nodeParamType === 'str') {
                    getOtaPackageByIdUsingGET_parameters.otaPackageId = getOtaPackageByIdUsingGET_nodeParam || '';
                } else {
                    getOtaPackageByIdUsingGET_parameters.otaPackageId = RED.util.getMessageProperty(msg, getOtaPackageByIdUsingGET_nodeParam);
                }
                getOtaPackageByIdUsingGET_parameters.otaPackageId = !!getOtaPackageByIdUsingGET_parameters.otaPackageId ? getOtaPackageByIdUsingGET_parameters.otaPackageId : msg.payload;
                                result = client.getOtaPackageByIdUsingGET(getOtaPackageByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteOtaPackageUsingDELETE') {
                var deleteOtaPackageUsingDELETE_parameters = [];
                var deleteOtaPackageUsingDELETE_nodeParam;
                var deleteOtaPackageUsingDELETE_nodeParamType;

                deleteOtaPackageUsingDELETE_nodeParam = node.deleteOtaPackageUsingDELETE_otaPackageId;
                deleteOtaPackageUsingDELETE_nodeParamType = node.deleteOtaPackageUsingDELETE_otaPackageIdType;
                if (deleteOtaPackageUsingDELETE_nodeParamType === 'str') {
                    deleteOtaPackageUsingDELETE_parameters.otaPackageId = deleteOtaPackageUsingDELETE_nodeParam || '';
                } else {
                    deleteOtaPackageUsingDELETE_parameters.otaPackageId = RED.util.getMessageProperty(msg, deleteOtaPackageUsingDELETE_nodeParam);
                }
                deleteOtaPackageUsingDELETE_parameters.otaPackageId = !!deleteOtaPackageUsingDELETE_parameters.otaPackageId ? deleteOtaPackageUsingDELETE_parameters.otaPackageId : msg.payload;
                                result = client.deleteOtaPackageUsingDELETE(deleteOtaPackageUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'downloadOtaPackageUsingGET') {
                var downloadOtaPackageUsingGET_parameters = [];
                var downloadOtaPackageUsingGET_nodeParam;
                var downloadOtaPackageUsingGET_nodeParamType;

                downloadOtaPackageUsingGET_nodeParam = node.downloadOtaPackageUsingGET_otaPackageId;
                downloadOtaPackageUsingGET_nodeParamType = node.downloadOtaPackageUsingGET_otaPackageIdType;
                if (downloadOtaPackageUsingGET_nodeParamType === 'str') {
                    downloadOtaPackageUsingGET_parameters.otaPackageId = downloadOtaPackageUsingGET_nodeParam || '';
                } else {
                    downloadOtaPackageUsingGET_parameters.otaPackageId = RED.util.getMessageProperty(msg, downloadOtaPackageUsingGET_nodeParam);
                }
                downloadOtaPackageUsingGET_parameters.otaPackageId = !!downloadOtaPackageUsingGET_parameters.otaPackageId ? downloadOtaPackageUsingGET_parameters.otaPackageId : msg.payload;
                                result = client.downloadOtaPackageUsingGET(downloadOtaPackageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveOtaPackageDataUsingPOST') {
                var saveOtaPackageDataUsingPOST_parameters = [];
                var saveOtaPackageDataUsingPOST_nodeParam;
                var saveOtaPackageDataUsingPOST_nodeParamType;

                saveOtaPackageDataUsingPOST_nodeParam = node.saveOtaPackageDataUsingPOST_otaPackageId;
                saveOtaPackageDataUsingPOST_nodeParamType = node.saveOtaPackageDataUsingPOST_otaPackageIdType;
                if (saveOtaPackageDataUsingPOST_nodeParamType === 'str') {
                    saveOtaPackageDataUsingPOST_parameters.otaPackageId = saveOtaPackageDataUsingPOST_nodeParam || '';
                } else {
                    saveOtaPackageDataUsingPOST_parameters.otaPackageId = RED.util.getMessageProperty(msg, saveOtaPackageDataUsingPOST_nodeParam);
                }
                saveOtaPackageDataUsingPOST_parameters.otaPackageId = !!saveOtaPackageDataUsingPOST_parameters.otaPackageId ? saveOtaPackageDataUsingPOST_parameters.otaPackageId : msg.payload;
                
                saveOtaPackageDataUsingPOST_nodeParam = node.saveOtaPackageDataUsingPOST_checksum;
                saveOtaPackageDataUsingPOST_nodeParamType = node.saveOtaPackageDataUsingPOST_checksumType;
                if (saveOtaPackageDataUsingPOST_nodeParamType === 'str') {
                    saveOtaPackageDataUsingPOST_parameters.checksum = saveOtaPackageDataUsingPOST_nodeParam || '';
                } else {
                    saveOtaPackageDataUsingPOST_parameters.checksum = RED.util.getMessageProperty(msg, saveOtaPackageDataUsingPOST_nodeParam);
                }
                saveOtaPackageDataUsingPOST_parameters.checksum = !!saveOtaPackageDataUsingPOST_parameters.checksum ? saveOtaPackageDataUsingPOST_parameters.checksum : msg.payload;
                
                saveOtaPackageDataUsingPOST_nodeParam = node.saveOtaPackageDataUsingPOST_checksumAlgorithm;
                saveOtaPackageDataUsingPOST_nodeParamType = node.saveOtaPackageDataUsingPOST_checksumAlgorithmType;
                if (saveOtaPackageDataUsingPOST_nodeParamType === 'str') {
                    saveOtaPackageDataUsingPOST_parameters.checksumAlgorithm = saveOtaPackageDataUsingPOST_nodeParam || '';
                } else {
                    saveOtaPackageDataUsingPOST_parameters.checksumAlgorithm = RED.util.getMessageProperty(msg, saveOtaPackageDataUsingPOST_nodeParam);
                }
                saveOtaPackageDataUsingPOST_parameters.checksumAlgorithm = !!saveOtaPackageDataUsingPOST_parameters.checksumAlgorithm ? saveOtaPackageDataUsingPOST_parameters.checksumAlgorithm : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveOtaPackageDataUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveOtaPackageDataUsingPOST(saveOtaPackageDataUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getGroupOtaPackagesUsingGET') {
                var getGroupOtaPackagesUsingGET_parameters = [];
                var getGroupOtaPackagesUsingGET_nodeParam;
                var getGroupOtaPackagesUsingGET_nodeParamType;

                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_groupId;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_groupIdType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.groupId = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.groupId = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.groupId = !!getGroupOtaPackagesUsingGET_parameters.groupId ? getGroupOtaPackagesUsingGET_parameters.groupId : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_type;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_typeType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.type = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.type = !!getGroupOtaPackagesUsingGET_parameters.type ? getGroupOtaPackagesUsingGET_parameters.type : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_pageSize;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_pageSizeType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.pageSize = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.pageSize = !!getGroupOtaPackagesUsingGET_parameters.pageSize ? getGroupOtaPackagesUsingGET_parameters.pageSize : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_page;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_pageType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.page = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.page = !!getGroupOtaPackagesUsingGET_parameters.page ? getGroupOtaPackagesUsingGET_parameters.page : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_textSearch;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_textSearchType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.textSearch = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.textSearch = !!getGroupOtaPackagesUsingGET_parameters.textSearch ? getGroupOtaPackagesUsingGET_parameters.textSearch : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_sortProperty;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_sortPropertyType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.sortProperty = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.sortProperty = !!getGroupOtaPackagesUsingGET_parameters.sortProperty ? getGroupOtaPackagesUsingGET_parameters.sortProperty : msg.payload;
                
                getGroupOtaPackagesUsingGET_nodeParam = node.getGroupOtaPackagesUsingGET_sortOrder;
                getGroupOtaPackagesUsingGET_nodeParamType = node.getGroupOtaPackagesUsingGET_sortOrderType;
                if (getGroupOtaPackagesUsingGET_nodeParamType === 'str') {
                    getGroupOtaPackagesUsingGET_parameters.sortOrder = getGroupOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getGroupOtaPackagesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getGroupOtaPackagesUsingGET_nodeParam);
                }
                getGroupOtaPackagesUsingGET_parameters.sortOrder = !!getGroupOtaPackagesUsingGET_parameters.sortOrder ? getGroupOtaPackagesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getGroupOtaPackagesUsingGET(getGroupOtaPackagesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getOtaPackagesUsingGET_1') {
                var getOtaPackagesUsingGET_1_parameters = [];
                var getOtaPackagesUsingGET_1_nodeParam;
                var getOtaPackagesUsingGET_1_nodeParamType;

                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_deviceProfileId;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_deviceProfileIdType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.deviceProfileId = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.deviceProfileId = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.deviceProfileId = !!getOtaPackagesUsingGET_1_parameters.deviceProfileId ? getOtaPackagesUsingGET_1_parameters.deviceProfileId : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_type;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_typeType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.type = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.type = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.type = !!getOtaPackagesUsingGET_1_parameters.type ? getOtaPackagesUsingGET_1_parameters.type : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_pageSize;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_pageSizeType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.pageSize = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.pageSize = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.pageSize = !!getOtaPackagesUsingGET_1_parameters.pageSize ? getOtaPackagesUsingGET_1_parameters.pageSize : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_page;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_pageType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.page = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.page = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.page = !!getOtaPackagesUsingGET_1_parameters.page ? getOtaPackagesUsingGET_1_parameters.page : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_textSearch;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_textSearchType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.textSearch = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.textSearch = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.textSearch = !!getOtaPackagesUsingGET_1_parameters.textSearch ? getOtaPackagesUsingGET_1_parameters.textSearch : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_sortProperty;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_sortPropertyType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.sortProperty = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.sortProperty = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.sortProperty = !!getOtaPackagesUsingGET_1_parameters.sortProperty ? getOtaPackagesUsingGET_1_parameters.sortProperty : msg.payload;
                
                getOtaPackagesUsingGET_1_nodeParam = node.getOtaPackagesUsingGET_1_sortOrder;
                getOtaPackagesUsingGET_1_nodeParamType = node.getOtaPackagesUsingGET_1_sortOrderType;
                if (getOtaPackagesUsingGET_1_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_1_parameters.sortOrder = getOtaPackagesUsingGET_1_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_1_parameters.sortOrder = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_1_nodeParam);
                }
                getOtaPackagesUsingGET_1_parameters.sortOrder = !!getOtaPackagesUsingGET_1_parameters.sortOrder ? getOtaPackagesUsingGET_1_parameters.sortOrder : msg.payload;
                                result = client.getOtaPackagesUsingGET_1(getOtaPackagesUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'getOtaPackagesUsingGET') {
                var getOtaPackagesUsingGET_parameters = [];
                var getOtaPackagesUsingGET_nodeParam;
                var getOtaPackagesUsingGET_nodeParamType;

                getOtaPackagesUsingGET_nodeParam = node.getOtaPackagesUsingGET_pageSize;
                getOtaPackagesUsingGET_nodeParamType = node.getOtaPackagesUsingGET_pageSizeType;
                if (getOtaPackagesUsingGET_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_parameters.pageSize = getOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_nodeParam);
                }
                getOtaPackagesUsingGET_parameters.pageSize = !!getOtaPackagesUsingGET_parameters.pageSize ? getOtaPackagesUsingGET_parameters.pageSize : msg.payload;
                
                getOtaPackagesUsingGET_nodeParam = node.getOtaPackagesUsingGET_page;
                getOtaPackagesUsingGET_nodeParamType = node.getOtaPackagesUsingGET_pageType;
                if (getOtaPackagesUsingGET_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_parameters.page = getOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_nodeParam);
                }
                getOtaPackagesUsingGET_parameters.page = !!getOtaPackagesUsingGET_parameters.page ? getOtaPackagesUsingGET_parameters.page : msg.payload;
                
                getOtaPackagesUsingGET_nodeParam = node.getOtaPackagesUsingGET_textSearch;
                getOtaPackagesUsingGET_nodeParamType = node.getOtaPackagesUsingGET_textSearchType;
                if (getOtaPackagesUsingGET_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_parameters.textSearch = getOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_nodeParam);
                }
                getOtaPackagesUsingGET_parameters.textSearch = !!getOtaPackagesUsingGET_parameters.textSearch ? getOtaPackagesUsingGET_parameters.textSearch : msg.payload;
                
                getOtaPackagesUsingGET_nodeParam = node.getOtaPackagesUsingGET_sortProperty;
                getOtaPackagesUsingGET_nodeParamType = node.getOtaPackagesUsingGET_sortPropertyType;
                if (getOtaPackagesUsingGET_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_parameters.sortProperty = getOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_nodeParam);
                }
                getOtaPackagesUsingGET_parameters.sortProperty = !!getOtaPackagesUsingGET_parameters.sortProperty ? getOtaPackagesUsingGET_parameters.sortProperty : msg.payload;
                
                getOtaPackagesUsingGET_nodeParam = node.getOtaPackagesUsingGET_sortOrder;
                getOtaPackagesUsingGET_nodeParamType = node.getOtaPackagesUsingGET_sortOrderType;
                if (getOtaPackagesUsingGET_nodeParamType === 'str') {
                    getOtaPackagesUsingGET_parameters.sortOrder = getOtaPackagesUsingGET_nodeParam || '';
                } else {
                    getOtaPackagesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getOtaPackagesUsingGET_nodeParam);
                }
                getOtaPackagesUsingGET_parameters.sortOrder = !!getOtaPackagesUsingGET_parameters.sortOrder ? getOtaPackagesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getOtaPackagesUsingGET(getOtaPackagesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'changeOwnerToCustomerUsingPOST') {
                var changeOwnerToCustomerUsingPOST_parameters = [];
                var changeOwnerToCustomerUsingPOST_nodeParam;
                var changeOwnerToCustomerUsingPOST_nodeParamType;

                changeOwnerToCustomerUsingPOST_nodeParam = node.changeOwnerToCustomerUsingPOST_ownerId;
                changeOwnerToCustomerUsingPOST_nodeParamType = node.changeOwnerToCustomerUsingPOST_ownerIdType;
                if (changeOwnerToCustomerUsingPOST_nodeParamType === 'str') {
                    changeOwnerToCustomerUsingPOST_parameters.ownerId = changeOwnerToCustomerUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToCustomerUsingPOST_parameters.ownerId = RED.util.getMessageProperty(msg, changeOwnerToCustomerUsingPOST_nodeParam);
                }
                changeOwnerToCustomerUsingPOST_parameters.ownerId = !!changeOwnerToCustomerUsingPOST_parameters.ownerId ? changeOwnerToCustomerUsingPOST_parameters.ownerId : msg.payload;
                
                changeOwnerToCustomerUsingPOST_nodeParam = node.changeOwnerToCustomerUsingPOST_entityType;
                changeOwnerToCustomerUsingPOST_nodeParamType = node.changeOwnerToCustomerUsingPOST_entityTypeType;
                if (changeOwnerToCustomerUsingPOST_nodeParamType === 'str') {
                    changeOwnerToCustomerUsingPOST_parameters.entityType = changeOwnerToCustomerUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToCustomerUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, changeOwnerToCustomerUsingPOST_nodeParam);
                }
                changeOwnerToCustomerUsingPOST_parameters.entityType = !!changeOwnerToCustomerUsingPOST_parameters.entityType ? changeOwnerToCustomerUsingPOST_parameters.entityType : msg.payload;
                
                changeOwnerToCustomerUsingPOST_nodeParam = node.changeOwnerToCustomerUsingPOST_entityId;
                changeOwnerToCustomerUsingPOST_nodeParamType = node.changeOwnerToCustomerUsingPOST_entityIdType;
                if (changeOwnerToCustomerUsingPOST_nodeParamType === 'str') {
                    changeOwnerToCustomerUsingPOST_parameters.entityId = changeOwnerToCustomerUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToCustomerUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, changeOwnerToCustomerUsingPOST_nodeParam);
                }
                changeOwnerToCustomerUsingPOST_parameters.entityId = !!changeOwnerToCustomerUsingPOST_parameters.entityId ? changeOwnerToCustomerUsingPOST_parameters.entityId : msg.payload;
                                result = client.changeOwnerToCustomerUsingPOST(changeOwnerToCustomerUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'changeOwnerToTenantUsingPOST') {
                var changeOwnerToTenantUsingPOST_parameters = [];
                var changeOwnerToTenantUsingPOST_nodeParam;
                var changeOwnerToTenantUsingPOST_nodeParamType;

                changeOwnerToTenantUsingPOST_nodeParam = node.changeOwnerToTenantUsingPOST_ownerId;
                changeOwnerToTenantUsingPOST_nodeParamType = node.changeOwnerToTenantUsingPOST_ownerIdType;
                if (changeOwnerToTenantUsingPOST_nodeParamType === 'str') {
                    changeOwnerToTenantUsingPOST_parameters.ownerId = changeOwnerToTenantUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToTenantUsingPOST_parameters.ownerId = RED.util.getMessageProperty(msg, changeOwnerToTenantUsingPOST_nodeParam);
                }
                changeOwnerToTenantUsingPOST_parameters.ownerId = !!changeOwnerToTenantUsingPOST_parameters.ownerId ? changeOwnerToTenantUsingPOST_parameters.ownerId : msg.payload;
                
                changeOwnerToTenantUsingPOST_nodeParam = node.changeOwnerToTenantUsingPOST_entityType;
                changeOwnerToTenantUsingPOST_nodeParamType = node.changeOwnerToTenantUsingPOST_entityTypeType;
                if (changeOwnerToTenantUsingPOST_nodeParamType === 'str') {
                    changeOwnerToTenantUsingPOST_parameters.entityType = changeOwnerToTenantUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToTenantUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, changeOwnerToTenantUsingPOST_nodeParam);
                }
                changeOwnerToTenantUsingPOST_parameters.entityType = !!changeOwnerToTenantUsingPOST_parameters.entityType ? changeOwnerToTenantUsingPOST_parameters.entityType : msg.payload;
                
                changeOwnerToTenantUsingPOST_nodeParam = node.changeOwnerToTenantUsingPOST_entityId;
                changeOwnerToTenantUsingPOST_nodeParamType = node.changeOwnerToTenantUsingPOST_entityIdType;
                if (changeOwnerToTenantUsingPOST_nodeParamType === 'str') {
                    changeOwnerToTenantUsingPOST_parameters.entityId = changeOwnerToTenantUsingPOST_nodeParam || '';
                } else {
                    changeOwnerToTenantUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, changeOwnerToTenantUsingPOST_nodeParam);
                }
                changeOwnerToTenantUsingPOST_parameters.entityId = !!changeOwnerToTenantUsingPOST_parameters.entityId ? changeOwnerToTenantUsingPOST_parameters.entityId : msg.payload;
                                result = client.changeOwnerToTenantUsingPOST(changeOwnerToTenantUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantQueuesByServiceTypeUsingGET') {
                var getTenantQueuesByServiceTypeUsingGET_parameters = [];
                var getTenantQueuesByServiceTypeUsingGET_nodeParam;
                var getTenantQueuesByServiceTypeUsingGET_nodeParamType;

                getTenantQueuesByServiceTypeUsingGET_nodeParam = node.getTenantQueuesByServiceTypeUsingGET_serviceType;
                getTenantQueuesByServiceTypeUsingGET_nodeParamType = node.getTenantQueuesByServiceTypeUsingGET_serviceTypeType;
                if (getTenantQueuesByServiceTypeUsingGET_nodeParamType === 'str') {
                    getTenantQueuesByServiceTypeUsingGET_parameters.serviceType = getTenantQueuesByServiceTypeUsingGET_nodeParam || '';
                } else {
                    getTenantQueuesByServiceTypeUsingGET_parameters.serviceType = RED.util.getMessageProperty(msg, getTenantQueuesByServiceTypeUsingGET_nodeParam);
                }
                getTenantQueuesByServiceTypeUsingGET_parameters.serviceType = !!getTenantQueuesByServiceTypeUsingGET_parameters.serviceType ? getTenantQueuesByServiceTypeUsingGET_parameters.serviceType : msg.payload;
                                result = client.getTenantQueuesByServiceTypeUsingGET(getTenantQueuesByServiceTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'downloadTestReportUsingPOST') {
                var downloadTestReportUsingPOST_parameters = [];
                var downloadTestReportUsingPOST_nodeParam;
                var downloadTestReportUsingPOST_nodeParamType;

                downloadTestReportUsingPOST_nodeParam = node.downloadTestReportUsingPOST_reportsServerEndpointUrl;
                downloadTestReportUsingPOST_nodeParamType = node.downloadTestReportUsingPOST_reportsServerEndpointUrlType;
                if (downloadTestReportUsingPOST_nodeParamType === 'str') {
                    downloadTestReportUsingPOST_parameters.reportsServerEndpointUrl = downloadTestReportUsingPOST_nodeParam || '';
                } else {
                    downloadTestReportUsingPOST_parameters.reportsServerEndpointUrl = RED.util.getMessageProperty(msg, downloadTestReportUsingPOST_nodeParam);
                }
                downloadTestReportUsingPOST_parameters.reportsServerEndpointUrl = !!downloadTestReportUsingPOST_parameters.reportsServerEndpointUrl ? downloadTestReportUsingPOST_parameters.reportsServerEndpointUrl : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    downloadTestReportUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.downloadTestReportUsingPOST(downloadTestReportUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'downloadDashboardReportUsingPOST') {
                var downloadDashboardReportUsingPOST_parameters = [];
                var downloadDashboardReportUsingPOST_nodeParam;
                var downloadDashboardReportUsingPOST_nodeParamType;

                downloadDashboardReportUsingPOST_nodeParam = node.downloadDashboardReportUsingPOST_dashboardId;
                downloadDashboardReportUsingPOST_nodeParamType = node.downloadDashboardReportUsingPOST_dashboardIdType;
                if (downloadDashboardReportUsingPOST_nodeParamType === 'str') {
                    downloadDashboardReportUsingPOST_parameters.dashboardId = downloadDashboardReportUsingPOST_nodeParam || '';
                } else {
                    downloadDashboardReportUsingPOST_parameters.dashboardId = RED.util.getMessageProperty(msg, downloadDashboardReportUsingPOST_nodeParam);
                }
                downloadDashboardReportUsingPOST_parameters.dashboardId = !!downloadDashboardReportUsingPOST_parameters.dashboardId ? downloadDashboardReportUsingPOST_parameters.dashboardId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    downloadDashboardReportUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.downloadDashboardReportUsingPOST(downloadDashboardReportUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveRoleUsingPOST') {
                var saveRoleUsingPOST_parameters = [];
                var saveRoleUsingPOST_nodeParam;
                var saveRoleUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveRoleUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveRoleUsingPOST(saveRoleUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getRoleByIdUsingGET') {
                var getRoleByIdUsingGET_parameters = [];
                var getRoleByIdUsingGET_nodeParam;
                var getRoleByIdUsingGET_nodeParamType;

                getRoleByIdUsingGET_nodeParam = node.getRoleByIdUsingGET_roleId;
                getRoleByIdUsingGET_nodeParamType = node.getRoleByIdUsingGET_roleIdType;
                if (getRoleByIdUsingGET_nodeParamType === 'str') {
                    getRoleByIdUsingGET_parameters.roleId = getRoleByIdUsingGET_nodeParam || '';
                } else {
                    getRoleByIdUsingGET_parameters.roleId = RED.util.getMessageProperty(msg, getRoleByIdUsingGET_nodeParam);
                }
                getRoleByIdUsingGET_parameters.roleId = !!getRoleByIdUsingGET_parameters.roleId ? getRoleByIdUsingGET_parameters.roleId : msg.payload;
                                result = client.getRoleByIdUsingGET(getRoleByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteRoleUsingDELETE') {
                var deleteRoleUsingDELETE_parameters = [];
                var deleteRoleUsingDELETE_nodeParam;
                var deleteRoleUsingDELETE_nodeParamType;

                deleteRoleUsingDELETE_nodeParam = node.deleteRoleUsingDELETE_roleId;
                deleteRoleUsingDELETE_nodeParamType = node.deleteRoleUsingDELETE_roleIdType;
                if (deleteRoleUsingDELETE_nodeParamType === 'str') {
                    deleteRoleUsingDELETE_parameters.roleId = deleteRoleUsingDELETE_nodeParam || '';
                } else {
                    deleteRoleUsingDELETE_parameters.roleId = RED.util.getMessageProperty(msg, deleteRoleUsingDELETE_nodeParam);
                }
                deleteRoleUsingDELETE_parameters.roleId = !!deleteRoleUsingDELETE_parameters.roleId ? deleteRoleUsingDELETE_parameters.roleId : msg.payload;
                                result = client.deleteRoleUsingDELETE(deleteRoleUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getRolesUsingGET') {
                var getRolesUsingGET_parameters = [];
                var getRolesUsingGET_nodeParam;
                var getRolesUsingGET_nodeParamType;

                getRolesUsingGET_nodeParam = node.getRolesUsingGET_pageSize;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_pageSizeType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.pageSize = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.pageSize = !!getRolesUsingGET_parameters.pageSize ? getRolesUsingGET_parameters.pageSize : msg.payload;
                
                getRolesUsingGET_nodeParam = node.getRolesUsingGET_page;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_pageType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.page = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.page = !!getRolesUsingGET_parameters.page ? getRolesUsingGET_parameters.page : msg.payload;
                
                getRolesUsingGET_nodeParam = node.getRolesUsingGET_type;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_typeType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.type = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.type = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.type = !!getRolesUsingGET_parameters.type ? getRolesUsingGET_parameters.type : msg.payload;
                
                getRolesUsingGET_nodeParam = node.getRolesUsingGET_textSearch;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_textSearchType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.textSearch = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.textSearch = !!getRolesUsingGET_parameters.textSearch ? getRolesUsingGET_parameters.textSearch : msg.payload;
                
                getRolesUsingGET_nodeParam = node.getRolesUsingGET_sortProperty;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_sortPropertyType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.sortProperty = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.sortProperty = !!getRolesUsingGET_parameters.sortProperty ? getRolesUsingGET_parameters.sortProperty : msg.payload;
                
                getRolesUsingGET_nodeParam = node.getRolesUsingGET_sortOrder;
                getRolesUsingGET_nodeParamType = node.getRolesUsingGET_sortOrderType;
                if (getRolesUsingGET_nodeParamType === 'str') {
                    getRolesUsingGET_parameters.sortOrder = getRolesUsingGET_nodeParam || '';
                } else {
                    getRolesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getRolesUsingGET_nodeParam);
                }
                getRolesUsingGET_parameters.sortOrder = !!getRolesUsingGET_parameters.sortOrder ? getRolesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getRolesUsingGET(getRolesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getRolesByIdsUsingGET') {
                var getRolesByIdsUsingGET_parameters = [];
                var getRolesByIdsUsingGET_nodeParam;
                var getRolesByIdsUsingGET_nodeParamType;

                getRolesByIdsUsingGET_nodeParam = node.getRolesByIdsUsingGET_roleIds;
                getRolesByIdsUsingGET_nodeParamType = node.getRolesByIdsUsingGET_roleIdsType;
                if (getRolesByIdsUsingGET_nodeParamType === 'str') {
                    getRolesByIdsUsingGET_parameters.roleIds = getRolesByIdsUsingGET_nodeParam || '';
                } else {
                    getRolesByIdsUsingGET_parameters.roleIds = RED.util.getMessageProperty(msg, getRolesByIdsUsingGET_nodeParam);
                }
                getRolesByIdsUsingGET_parameters.roleIds = !!getRolesByIdsUsingGET_parameters.roleIds ? getRolesByIdsUsingGET_parameters.roleIds : msg.payload;
                                result = client.getRolesByIdsUsingGET(getRolesByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'handleOneWayDeviceRPCRequestUsingPOST') {
                var handleOneWayDeviceRPCRequestUsingPOST_parameters = [];
                var handleOneWayDeviceRPCRequestUsingPOST_nodeParam;
                var handleOneWayDeviceRPCRequestUsingPOST_nodeParamType;

                handleOneWayDeviceRPCRequestUsingPOST_nodeParam = node.handleOneWayDeviceRPCRequestUsingPOST_deviceId;
                handleOneWayDeviceRPCRequestUsingPOST_nodeParamType = node.handleOneWayDeviceRPCRequestUsingPOST_deviceIdType;
                if (handleOneWayDeviceRPCRequestUsingPOST_nodeParamType === 'str') {
                    handleOneWayDeviceRPCRequestUsingPOST_parameters.deviceId = handleOneWayDeviceRPCRequestUsingPOST_nodeParam || '';
                } else {
                    handleOneWayDeviceRPCRequestUsingPOST_parameters.deviceId = RED.util.getMessageProperty(msg, handleOneWayDeviceRPCRequestUsingPOST_nodeParam);
                }
                handleOneWayDeviceRPCRequestUsingPOST_parameters.deviceId = !!handleOneWayDeviceRPCRequestUsingPOST_parameters.deviceId ? handleOneWayDeviceRPCRequestUsingPOST_parameters.deviceId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleOneWayDeviceRPCRequestUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleOneWayDeviceRPCRequestUsingPOST(handleOneWayDeviceRPCRequestUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'handleTwoWayDeviceRPCRequestUsingPOST') {
                var handleTwoWayDeviceRPCRequestUsingPOST_parameters = [];
                var handleTwoWayDeviceRPCRequestUsingPOST_nodeParam;
                var handleTwoWayDeviceRPCRequestUsingPOST_nodeParamType;

                handleTwoWayDeviceRPCRequestUsingPOST_nodeParam = node.handleTwoWayDeviceRPCRequestUsingPOST_deviceId;
                handleTwoWayDeviceRPCRequestUsingPOST_nodeParamType = node.handleTwoWayDeviceRPCRequestUsingPOST_deviceIdType;
                if (handleTwoWayDeviceRPCRequestUsingPOST_nodeParamType === 'str') {
                    handleTwoWayDeviceRPCRequestUsingPOST_parameters.deviceId = handleTwoWayDeviceRPCRequestUsingPOST_nodeParam || '';
                } else {
                    handleTwoWayDeviceRPCRequestUsingPOST_parameters.deviceId = RED.util.getMessageProperty(msg, handleTwoWayDeviceRPCRequestUsingPOST_nodeParam);
                }
                handleTwoWayDeviceRPCRequestUsingPOST_parameters.deviceId = !!handleTwoWayDeviceRPCRequestUsingPOST_parameters.deviceId ? handleTwoWayDeviceRPCRequestUsingPOST_parameters.deviceId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleTwoWayDeviceRPCRequestUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleTwoWayDeviceRPCRequestUsingPOST(handleTwoWayDeviceRPCRequestUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'handleOneWayDeviceRPCRequestUsingPOST_1') {
                var handleOneWayDeviceRPCRequestUsingPOST_1_parameters = [];
                var handleOneWayDeviceRPCRequestUsingPOST_1_nodeParam;
                var handleOneWayDeviceRPCRequestUsingPOST_1_nodeParamType;

                handleOneWayDeviceRPCRequestUsingPOST_1_nodeParam = node.handleOneWayDeviceRPCRequestUsingPOST_1_deviceId;
                handleOneWayDeviceRPCRequestUsingPOST_1_nodeParamType = node.handleOneWayDeviceRPCRequestUsingPOST_1_deviceIdType;
                if (handleOneWayDeviceRPCRequestUsingPOST_1_nodeParamType === 'str') {
                    handleOneWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = handleOneWayDeviceRPCRequestUsingPOST_1_nodeParam || '';
                } else {
                    handleOneWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = RED.util.getMessageProperty(msg, handleOneWayDeviceRPCRequestUsingPOST_1_nodeParam);
                }
                handleOneWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = !!handleOneWayDeviceRPCRequestUsingPOST_1_parameters.deviceId ? handleOneWayDeviceRPCRequestUsingPOST_1_parameters.deviceId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleOneWayDeviceRPCRequestUsingPOST_1_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleOneWayDeviceRPCRequestUsingPOST_1(handleOneWayDeviceRPCRequestUsingPOST_1_parameters);
            }
            if (!errorFlag && node.method === 'getPersistedRpcByDeviceUsingGET') {
                var getPersistedRpcByDeviceUsingGET_parameters = [];
                var getPersistedRpcByDeviceUsingGET_nodeParam;
                var getPersistedRpcByDeviceUsingGET_nodeParamType;

                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_deviceId;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_deviceIdType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.deviceId = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.deviceId = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.deviceId = !!getPersistedRpcByDeviceUsingGET_parameters.deviceId ? getPersistedRpcByDeviceUsingGET_parameters.deviceId : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_pageSize;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_pageSizeType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.pageSize = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.pageSize = !!getPersistedRpcByDeviceUsingGET_parameters.pageSize ? getPersistedRpcByDeviceUsingGET_parameters.pageSize : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_page;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_pageType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.page = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.page = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.page = !!getPersistedRpcByDeviceUsingGET_parameters.page ? getPersistedRpcByDeviceUsingGET_parameters.page : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_rpcStatus;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_rpcStatusType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.rpcStatus = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.rpcStatus = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.rpcStatus = !!getPersistedRpcByDeviceUsingGET_parameters.rpcStatus ? getPersistedRpcByDeviceUsingGET_parameters.rpcStatus : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_textSearch;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_textSearchType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.textSearch = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.textSearch = !!getPersistedRpcByDeviceUsingGET_parameters.textSearch ? getPersistedRpcByDeviceUsingGET_parameters.textSearch : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_sortProperty;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_sortPropertyType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.sortProperty = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.sortProperty = !!getPersistedRpcByDeviceUsingGET_parameters.sortProperty ? getPersistedRpcByDeviceUsingGET_parameters.sortProperty : msg.payload;
                
                getPersistedRpcByDeviceUsingGET_nodeParam = node.getPersistedRpcByDeviceUsingGET_sortOrder;
                getPersistedRpcByDeviceUsingGET_nodeParamType = node.getPersistedRpcByDeviceUsingGET_sortOrderType;
                if (getPersistedRpcByDeviceUsingGET_nodeParamType === 'str') {
                    getPersistedRpcByDeviceUsingGET_parameters.sortOrder = getPersistedRpcByDeviceUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcByDeviceUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getPersistedRpcByDeviceUsingGET_nodeParam);
                }
                getPersistedRpcByDeviceUsingGET_parameters.sortOrder = !!getPersistedRpcByDeviceUsingGET_parameters.sortOrder ? getPersistedRpcByDeviceUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getPersistedRpcByDeviceUsingGET(getPersistedRpcByDeviceUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getPersistedRpcUsingGET') {
                var getPersistedRpcUsingGET_parameters = [];
                var getPersistedRpcUsingGET_nodeParam;
                var getPersistedRpcUsingGET_nodeParamType;

                getPersistedRpcUsingGET_nodeParam = node.getPersistedRpcUsingGET_rpcId;
                getPersistedRpcUsingGET_nodeParamType = node.getPersistedRpcUsingGET_rpcIdType;
                if (getPersistedRpcUsingGET_nodeParamType === 'str') {
                    getPersistedRpcUsingGET_parameters.rpcId = getPersistedRpcUsingGET_nodeParam || '';
                } else {
                    getPersistedRpcUsingGET_parameters.rpcId = RED.util.getMessageProperty(msg, getPersistedRpcUsingGET_nodeParam);
                }
                getPersistedRpcUsingGET_parameters.rpcId = !!getPersistedRpcUsingGET_parameters.rpcId ? getPersistedRpcUsingGET_parameters.rpcId : msg.payload;
                                result = client.getPersistedRpcUsingGET(getPersistedRpcUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteRpcUsingDELETE') {
                var deleteRpcUsingDELETE_parameters = [];
                var deleteRpcUsingDELETE_nodeParam;
                var deleteRpcUsingDELETE_nodeParamType;

                deleteRpcUsingDELETE_nodeParam = node.deleteRpcUsingDELETE_rpcId;
                deleteRpcUsingDELETE_nodeParamType = node.deleteRpcUsingDELETE_rpcIdType;
                if (deleteRpcUsingDELETE_nodeParamType === 'str') {
                    deleteRpcUsingDELETE_parameters.rpcId = deleteRpcUsingDELETE_nodeParam || '';
                } else {
                    deleteRpcUsingDELETE_parameters.rpcId = RED.util.getMessageProperty(msg, deleteRpcUsingDELETE_nodeParam);
                }
                deleteRpcUsingDELETE_parameters.rpcId = !!deleteRpcUsingDELETE_parameters.rpcId ? deleteRpcUsingDELETE_parameters.rpcId : msg.payload;
                                result = client.deleteRpcUsingDELETE(deleteRpcUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'handleTwoWayDeviceRPCRequestUsingPOST_1') {
                var handleTwoWayDeviceRPCRequestUsingPOST_1_parameters = [];
                var handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParam;
                var handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParamType;

                handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParam = node.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceId;
                handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParamType = node.handleTwoWayDeviceRPCRequestUsingPOST_1_deviceIdType;
                if (handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParamType === 'str') {
                    handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParam || '';
                } else {
                    handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = RED.util.getMessageProperty(msg, handleTwoWayDeviceRPCRequestUsingPOST_1_nodeParam);
                }
                handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.deviceId = !!handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.deviceId ? handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.deviceId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleTwoWayDeviceRPCRequestUsingPOST_1_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleTwoWayDeviceRPCRequestUsingPOST_1(handleTwoWayDeviceRPCRequestUsingPOST_1_parameters);
            }
            if (!errorFlag && node.method === 'assignRuleChainToEdgeUsingPOST') {
                var assignRuleChainToEdgeUsingPOST_parameters = [];
                var assignRuleChainToEdgeUsingPOST_nodeParam;
                var assignRuleChainToEdgeUsingPOST_nodeParamType;

                assignRuleChainToEdgeUsingPOST_nodeParam = node.assignRuleChainToEdgeUsingPOST_edgeId;
                assignRuleChainToEdgeUsingPOST_nodeParamType = node.assignRuleChainToEdgeUsingPOST_edgeIdType;
                if (assignRuleChainToEdgeUsingPOST_nodeParamType === 'str') {
                    assignRuleChainToEdgeUsingPOST_parameters.edgeId = assignRuleChainToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignRuleChainToEdgeUsingPOST_parameters.edgeId = RED.util.getMessageProperty(msg, assignRuleChainToEdgeUsingPOST_nodeParam);
                }
                assignRuleChainToEdgeUsingPOST_parameters.edgeId = !!assignRuleChainToEdgeUsingPOST_parameters.edgeId ? assignRuleChainToEdgeUsingPOST_parameters.edgeId : msg.payload;
                
                assignRuleChainToEdgeUsingPOST_nodeParam = node.assignRuleChainToEdgeUsingPOST_ruleChainId;
                assignRuleChainToEdgeUsingPOST_nodeParamType = node.assignRuleChainToEdgeUsingPOST_ruleChainIdType;
                if (assignRuleChainToEdgeUsingPOST_nodeParamType === 'str') {
                    assignRuleChainToEdgeUsingPOST_parameters.ruleChainId = assignRuleChainToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignRuleChainToEdgeUsingPOST_parameters.ruleChainId = RED.util.getMessageProperty(msg, assignRuleChainToEdgeUsingPOST_nodeParam);
                }
                assignRuleChainToEdgeUsingPOST_parameters.ruleChainId = !!assignRuleChainToEdgeUsingPOST_parameters.ruleChainId ? assignRuleChainToEdgeUsingPOST_parameters.ruleChainId : msg.payload;
                                result = client.assignRuleChainToEdgeUsingPOST(assignRuleChainToEdgeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'unassignRuleChainFromEdgeUsingDELETE') {
                var unassignRuleChainFromEdgeUsingDELETE_parameters = [];
                var unassignRuleChainFromEdgeUsingDELETE_nodeParam;
                var unassignRuleChainFromEdgeUsingDELETE_nodeParamType;

                unassignRuleChainFromEdgeUsingDELETE_nodeParam = node.unassignRuleChainFromEdgeUsingDELETE_edgeId;
                unassignRuleChainFromEdgeUsingDELETE_nodeParamType = node.unassignRuleChainFromEdgeUsingDELETE_edgeIdType;
                if (unassignRuleChainFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignRuleChainFromEdgeUsingDELETE_parameters.edgeId = unassignRuleChainFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignRuleChainFromEdgeUsingDELETE_parameters.edgeId = RED.util.getMessageProperty(msg, unassignRuleChainFromEdgeUsingDELETE_nodeParam);
                }
                unassignRuleChainFromEdgeUsingDELETE_parameters.edgeId = !!unassignRuleChainFromEdgeUsingDELETE_parameters.edgeId ? unassignRuleChainFromEdgeUsingDELETE_parameters.edgeId : msg.payload;
                
                unassignRuleChainFromEdgeUsingDELETE_nodeParam = node.unassignRuleChainFromEdgeUsingDELETE_ruleChainId;
                unassignRuleChainFromEdgeUsingDELETE_nodeParamType = node.unassignRuleChainFromEdgeUsingDELETE_ruleChainIdType;
                if (unassignRuleChainFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignRuleChainFromEdgeUsingDELETE_parameters.ruleChainId = unassignRuleChainFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignRuleChainFromEdgeUsingDELETE_parameters.ruleChainId = RED.util.getMessageProperty(msg, unassignRuleChainFromEdgeUsingDELETE_nodeParam);
                }
                unassignRuleChainFromEdgeUsingDELETE_parameters.ruleChainId = !!unassignRuleChainFromEdgeUsingDELETE_parameters.ruleChainId ? unassignRuleChainFromEdgeUsingDELETE_parameters.ruleChainId : msg.payload;
                                result = client.unassignRuleChainFromEdgeUsingDELETE(unassignRuleChainFromEdgeUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeRuleChainsUsingGET') {
                var getEdgeRuleChainsUsingGET_parameters = [];
                var getEdgeRuleChainsUsingGET_nodeParam;
                var getEdgeRuleChainsUsingGET_nodeParamType;

                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_edgeId;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_edgeIdType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.edgeId = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.edgeId = !!getEdgeRuleChainsUsingGET_parameters.edgeId ? getEdgeRuleChainsUsingGET_parameters.edgeId : msg.payload;
                
                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_pageSize;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_pageSizeType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.pageSize = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.pageSize = !!getEdgeRuleChainsUsingGET_parameters.pageSize ? getEdgeRuleChainsUsingGET_parameters.pageSize : msg.payload;
                
                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_page;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_pageType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.page = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.page = !!getEdgeRuleChainsUsingGET_parameters.page ? getEdgeRuleChainsUsingGET_parameters.page : msg.payload;
                
                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_textSearch;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_textSearchType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.textSearch = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.textSearch = !!getEdgeRuleChainsUsingGET_parameters.textSearch ? getEdgeRuleChainsUsingGET_parameters.textSearch : msg.payload;
                
                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_sortProperty;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_sortPropertyType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.sortProperty = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.sortProperty = !!getEdgeRuleChainsUsingGET_parameters.sortProperty ? getEdgeRuleChainsUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgeRuleChainsUsingGET_nodeParam = node.getEdgeRuleChainsUsingGET_sortOrder;
                getEdgeRuleChainsUsingGET_nodeParamType = node.getEdgeRuleChainsUsingGET_sortOrderType;
                if (getEdgeRuleChainsUsingGET_nodeParamType === 'str') {
                    getEdgeRuleChainsUsingGET_parameters.sortOrder = getEdgeRuleChainsUsingGET_nodeParam || '';
                } else {
                    getEdgeRuleChainsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgeRuleChainsUsingGET_nodeParam);
                }
                getEdgeRuleChainsUsingGET_parameters.sortOrder = !!getEdgeRuleChainsUsingGET_parameters.sortOrder ? getEdgeRuleChainsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEdgeRuleChainsUsingGET(getEdgeRuleChainsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveRuleChainUsingPOST_1') {
                var saveRuleChainUsingPOST_1_parameters = [];
                var saveRuleChainUsingPOST_1_nodeParam;
                var saveRuleChainUsingPOST_1_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveRuleChainUsingPOST_1_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveRuleChainUsingPOST_1(saveRuleChainUsingPOST_1_parameters);
            }
            if (!errorFlag && node.method === 'getAutoAssignToEdgeRuleChainsUsingGET') {
                var getAutoAssignToEdgeRuleChainsUsingGET_parameters = [];
                var getAutoAssignToEdgeRuleChainsUsingGET_nodeParam;
                var getAutoAssignToEdgeRuleChainsUsingGET_nodeParamType;
                result = client.getAutoAssignToEdgeRuleChainsUsingGET(getAutoAssignToEdgeRuleChainsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveRuleChainUsingPOST') {
                var saveRuleChainUsingPOST_parameters = [];
                var saveRuleChainUsingPOST_nodeParam;
                var saveRuleChainUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveRuleChainUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveRuleChainUsingPOST(saveRuleChainUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveRuleChainMetaDataUsingPOST') {
                var saveRuleChainMetaDataUsingPOST_parameters = [];
                var saveRuleChainMetaDataUsingPOST_nodeParam;
                var saveRuleChainMetaDataUsingPOST_nodeParamType;

                saveRuleChainMetaDataUsingPOST_nodeParam = node.saveRuleChainMetaDataUsingPOST_updateRelated;
                saveRuleChainMetaDataUsingPOST_nodeParamType = node.saveRuleChainMetaDataUsingPOST_updateRelatedType;
                if (saveRuleChainMetaDataUsingPOST_nodeParamType === 'str') {
                    saveRuleChainMetaDataUsingPOST_parameters.updateRelated = saveRuleChainMetaDataUsingPOST_nodeParam || '';
                } else {
                    saveRuleChainMetaDataUsingPOST_parameters.updateRelated = RED.util.getMessageProperty(msg, saveRuleChainMetaDataUsingPOST_nodeParam);
                }
                saveRuleChainMetaDataUsingPOST_parameters.updateRelated = !!saveRuleChainMetaDataUsingPOST_parameters.updateRelated ? saveRuleChainMetaDataUsingPOST_parameters.updateRelated : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveRuleChainMetaDataUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveRuleChainMetaDataUsingPOST(saveRuleChainMetaDataUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'testScriptUsingPOST') {
                var testScriptUsingPOST_parameters = [];
                var testScriptUsingPOST_nodeParam;
                var testScriptUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    testScriptUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.testScriptUsingPOST(testScriptUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getRuleChainByIdUsingGET') {
                var getRuleChainByIdUsingGET_parameters = [];
                var getRuleChainByIdUsingGET_nodeParam;
                var getRuleChainByIdUsingGET_nodeParamType;

                getRuleChainByIdUsingGET_nodeParam = node.getRuleChainByIdUsingGET_ruleChainId;
                getRuleChainByIdUsingGET_nodeParamType = node.getRuleChainByIdUsingGET_ruleChainIdType;
                if (getRuleChainByIdUsingGET_nodeParamType === 'str') {
                    getRuleChainByIdUsingGET_parameters.ruleChainId = getRuleChainByIdUsingGET_nodeParam || '';
                } else {
                    getRuleChainByIdUsingGET_parameters.ruleChainId = RED.util.getMessageProperty(msg, getRuleChainByIdUsingGET_nodeParam);
                }
                getRuleChainByIdUsingGET_parameters.ruleChainId = !!getRuleChainByIdUsingGET_parameters.ruleChainId ? getRuleChainByIdUsingGET_parameters.ruleChainId : msg.payload;
                                result = client.getRuleChainByIdUsingGET(getRuleChainByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteRuleChainUsingDELETE') {
                var deleteRuleChainUsingDELETE_parameters = [];
                var deleteRuleChainUsingDELETE_nodeParam;
                var deleteRuleChainUsingDELETE_nodeParamType;

                deleteRuleChainUsingDELETE_nodeParam = node.deleteRuleChainUsingDELETE_ruleChainId;
                deleteRuleChainUsingDELETE_nodeParamType = node.deleteRuleChainUsingDELETE_ruleChainIdType;
                if (deleteRuleChainUsingDELETE_nodeParamType === 'str') {
                    deleteRuleChainUsingDELETE_parameters.ruleChainId = deleteRuleChainUsingDELETE_nodeParam || '';
                } else {
                    deleteRuleChainUsingDELETE_parameters.ruleChainId = RED.util.getMessageProperty(msg, deleteRuleChainUsingDELETE_nodeParam);
                }
                deleteRuleChainUsingDELETE_parameters.ruleChainId = !!deleteRuleChainUsingDELETE_parameters.ruleChainId ? deleteRuleChainUsingDELETE_parameters.ruleChainId : msg.payload;
                                result = client.deleteRuleChainUsingDELETE(deleteRuleChainUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'setAutoAssignToEdgeRuleChainUsingPOST') {
                var setAutoAssignToEdgeRuleChainUsingPOST_parameters = [];
                var setAutoAssignToEdgeRuleChainUsingPOST_nodeParam;
                var setAutoAssignToEdgeRuleChainUsingPOST_nodeParamType;

                setAutoAssignToEdgeRuleChainUsingPOST_nodeParam = node.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainId;
                setAutoAssignToEdgeRuleChainUsingPOST_nodeParamType = node.setAutoAssignToEdgeRuleChainUsingPOST_ruleChainIdType;
                if (setAutoAssignToEdgeRuleChainUsingPOST_nodeParamType === 'str') {
                    setAutoAssignToEdgeRuleChainUsingPOST_parameters.ruleChainId = setAutoAssignToEdgeRuleChainUsingPOST_nodeParam || '';
                } else {
                    setAutoAssignToEdgeRuleChainUsingPOST_parameters.ruleChainId = RED.util.getMessageProperty(msg, setAutoAssignToEdgeRuleChainUsingPOST_nodeParam);
                }
                setAutoAssignToEdgeRuleChainUsingPOST_parameters.ruleChainId = !!setAutoAssignToEdgeRuleChainUsingPOST_parameters.ruleChainId ? setAutoAssignToEdgeRuleChainUsingPOST_parameters.ruleChainId : msg.payload;
                                result = client.setAutoAssignToEdgeRuleChainUsingPOST(setAutoAssignToEdgeRuleChainUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'unsetAutoAssignToEdgeRuleChainUsingDELETE') {
                var unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters = [];
                var unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParam;
                var unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParamType;

                unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParam = node.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainId;
                unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParamType = node.unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainIdType;
                if (unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParamType === 'str') {
                    unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters.ruleChainId = unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParam || '';
                } else {
                    unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters.ruleChainId = RED.util.getMessageProperty(msg, unsetAutoAssignToEdgeRuleChainUsingDELETE_nodeParam);
                }
                unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters.ruleChainId = !!unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters.ruleChainId ? unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters.ruleChainId : msg.payload;
                                result = client.unsetAutoAssignToEdgeRuleChainUsingDELETE(unsetAutoAssignToEdgeRuleChainUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'setEdgeTemplateRootRuleChainUsingPOST') {
                var setEdgeTemplateRootRuleChainUsingPOST_parameters = [];
                var setEdgeTemplateRootRuleChainUsingPOST_nodeParam;
                var setEdgeTemplateRootRuleChainUsingPOST_nodeParamType;

                setEdgeTemplateRootRuleChainUsingPOST_nodeParam = node.setEdgeTemplateRootRuleChainUsingPOST_ruleChainId;
                setEdgeTemplateRootRuleChainUsingPOST_nodeParamType = node.setEdgeTemplateRootRuleChainUsingPOST_ruleChainIdType;
                if (setEdgeTemplateRootRuleChainUsingPOST_nodeParamType === 'str') {
                    setEdgeTemplateRootRuleChainUsingPOST_parameters.ruleChainId = setEdgeTemplateRootRuleChainUsingPOST_nodeParam || '';
                } else {
                    setEdgeTemplateRootRuleChainUsingPOST_parameters.ruleChainId = RED.util.getMessageProperty(msg, setEdgeTemplateRootRuleChainUsingPOST_nodeParam);
                }
                setEdgeTemplateRootRuleChainUsingPOST_parameters.ruleChainId = !!setEdgeTemplateRootRuleChainUsingPOST_parameters.ruleChainId ? setEdgeTemplateRootRuleChainUsingPOST_parameters.ruleChainId : msg.payload;
                                result = client.setEdgeTemplateRootRuleChainUsingPOST(setEdgeTemplateRootRuleChainUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getRuleChainMetaDataUsingGET') {
                var getRuleChainMetaDataUsingGET_parameters = [];
                var getRuleChainMetaDataUsingGET_nodeParam;
                var getRuleChainMetaDataUsingGET_nodeParamType;

                getRuleChainMetaDataUsingGET_nodeParam = node.getRuleChainMetaDataUsingGET_ruleChainId;
                getRuleChainMetaDataUsingGET_nodeParamType = node.getRuleChainMetaDataUsingGET_ruleChainIdType;
                if (getRuleChainMetaDataUsingGET_nodeParamType === 'str') {
                    getRuleChainMetaDataUsingGET_parameters.ruleChainId = getRuleChainMetaDataUsingGET_nodeParam || '';
                } else {
                    getRuleChainMetaDataUsingGET_parameters.ruleChainId = RED.util.getMessageProperty(msg, getRuleChainMetaDataUsingGET_nodeParam);
                }
                getRuleChainMetaDataUsingGET_parameters.ruleChainId = !!getRuleChainMetaDataUsingGET_parameters.ruleChainId ? getRuleChainMetaDataUsingGET_parameters.ruleChainId : msg.payload;
                                result = client.getRuleChainMetaDataUsingGET(getRuleChainMetaDataUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getRuleChainOutputLabelsUsingGET') {
                var getRuleChainOutputLabelsUsingGET_parameters = [];
                var getRuleChainOutputLabelsUsingGET_nodeParam;
                var getRuleChainOutputLabelsUsingGET_nodeParamType;

                getRuleChainOutputLabelsUsingGET_nodeParam = node.getRuleChainOutputLabelsUsingGET_ruleChainId;
                getRuleChainOutputLabelsUsingGET_nodeParamType = node.getRuleChainOutputLabelsUsingGET_ruleChainIdType;
                if (getRuleChainOutputLabelsUsingGET_nodeParamType === 'str') {
                    getRuleChainOutputLabelsUsingGET_parameters.ruleChainId = getRuleChainOutputLabelsUsingGET_nodeParam || '';
                } else {
                    getRuleChainOutputLabelsUsingGET_parameters.ruleChainId = RED.util.getMessageProperty(msg, getRuleChainOutputLabelsUsingGET_nodeParam);
                }
                getRuleChainOutputLabelsUsingGET_parameters.ruleChainId = !!getRuleChainOutputLabelsUsingGET_parameters.ruleChainId ? getRuleChainOutputLabelsUsingGET_parameters.ruleChainId : msg.payload;
                                result = client.getRuleChainOutputLabelsUsingGET(getRuleChainOutputLabelsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getRuleChainOutputLabelsUsageUsingGET') {
                var getRuleChainOutputLabelsUsageUsingGET_parameters = [];
                var getRuleChainOutputLabelsUsageUsingGET_nodeParam;
                var getRuleChainOutputLabelsUsageUsingGET_nodeParamType;

                getRuleChainOutputLabelsUsageUsingGET_nodeParam = node.getRuleChainOutputLabelsUsageUsingGET_ruleChainId;
                getRuleChainOutputLabelsUsageUsingGET_nodeParamType = node.getRuleChainOutputLabelsUsageUsingGET_ruleChainIdType;
                if (getRuleChainOutputLabelsUsageUsingGET_nodeParamType === 'str') {
                    getRuleChainOutputLabelsUsageUsingGET_parameters.ruleChainId = getRuleChainOutputLabelsUsageUsingGET_nodeParam || '';
                } else {
                    getRuleChainOutputLabelsUsageUsingGET_parameters.ruleChainId = RED.util.getMessageProperty(msg, getRuleChainOutputLabelsUsageUsingGET_nodeParam);
                }
                getRuleChainOutputLabelsUsageUsingGET_parameters.ruleChainId = !!getRuleChainOutputLabelsUsageUsingGET_parameters.ruleChainId ? getRuleChainOutputLabelsUsageUsingGET_parameters.ruleChainId : msg.payload;
                                result = client.getRuleChainOutputLabelsUsageUsingGET(getRuleChainOutputLabelsUsageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'setRootRuleChainUsingPOST') {
                var setRootRuleChainUsingPOST_parameters = [];
                var setRootRuleChainUsingPOST_nodeParam;
                var setRootRuleChainUsingPOST_nodeParamType;

                setRootRuleChainUsingPOST_nodeParam = node.setRootRuleChainUsingPOST_ruleChainId;
                setRootRuleChainUsingPOST_nodeParamType = node.setRootRuleChainUsingPOST_ruleChainIdType;
                if (setRootRuleChainUsingPOST_nodeParamType === 'str') {
                    setRootRuleChainUsingPOST_parameters.ruleChainId = setRootRuleChainUsingPOST_nodeParam || '';
                } else {
                    setRootRuleChainUsingPOST_parameters.ruleChainId = RED.util.getMessageProperty(msg, setRootRuleChainUsingPOST_nodeParam);
                }
                setRootRuleChainUsingPOST_parameters.ruleChainId = !!setRootRuleChainUsingPOST_parameters.ruleChainId ? setRootRuleChainUsingPOST_parameters.ruleChainId : msg.payload;
                                result = client.setRootRuleChainUsingPOST(setRootRuleChainUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'exportRuleChainsUsingGET') {
                var exportRuleChainsUsingGET_parameters = [];
                var exportRuleChainsUsingGET_nodeParam;
                var exportRuleChainsUsingGET_nodeParamType;

                exportRuleChainsUsingGET_nodeParam = node.exportRuleChainsUsingGET_limit;
                exportRuleChainsUsingGET_nodeParamType = node.exportRuleChainsUsingGET_limitType;
                if (exportRuleChainsUsingGET_nodeParamType === 'str') {
                    exportRuleChainsUsingGET_parameters.limit = exportRuleChainsUsingGET_nodeParam || '';
                } else {
                    exportRuleChainsUsingGET_parameters.limit = RED.util.getMessageProperty(msg, exportRuleChainsUsingGET_nodeParam);
                }
                exportRuleChainsUsingGET_parameters.limit = !!exportRuleChainsUsingGET_parameters.limit ? exportRuleChainsUsingGET_parameters.limit : msg.payload;
                                result = client.exportRuleChainsUsingGET(exportRuleChainsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'importRuleChainsUsingPOST') {
                var importRuleChainsUsingPOST_parameters = [];
                var importRuleChainsUsingPOST_nodeParam;
                var importRuleChainsUsingPOST_nodeParamType;

                importRuleChainsUsingPOST_nodeParam = node.importRuleChainsUsingPOST_overwrite;
                importRuleChainsUsingPOST_nodeParamType = node.importRuleChainsUsingPOST_overwriteType;
                if (importRuleChainsUsingPOST_nodeParamType === 'str') {
                    importRuleChainsUsingPOST_parameters.overwrite = importRuleChainsUsingPOST_nodeParam || '';
                } else {
                    importRuleChainsUsingPOST_parameters.overwrite = RED.util.getMessageProperty(msg, importRuleChainsUsingPOST_nodeParam);
                }
                importRuleChainsUsingPOST_parameters.overwrite = !!importRuleChainsUsingPOST_parameters.overwrite ? importRuleChainsUsingPOST_parameters.overwrite : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    importRuleChainsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.importRuleChainsUsingPOST(importRuleChainsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getRuleChainsUsingGET') {
                var getRuleChainsUsingGET_parameters = [];
                var getRuleChainsUsingGET_nodeParam;
                var getRuleChainsUsingGET_nodeParamType;

                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_pageSize;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_pageSizeType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.pageSize = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.pageSize = !!getRuleChainsUsingGET_parameters.pageSize ? getRuleChainsUsingGET_parameters.pageSize : msg.payload;
                
                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_page;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_pageType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.page = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.page = !!getRuleChainsUsingGET_parameters.page ? getRuleChainsUsingGET_parameters.page : msg.payload;
                
                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_type;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_typeType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.type = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.type = !!getRuleChainsUsingGET_parameters.type ? getRuleChainsUsingGET_parameters.type : msg.payload;
                
                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_textSearch;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_textSearchType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.textSearch = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.textSearch = !!getRuleChainsUsingGET_parameters.textSearch ? getRuleChainsUsingGET_parameters.textSearch : msg.payload;
                
                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_sortProperty;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_sortPropertyType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.sortProperty = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.sortProperty = !!getRuleChainsUsingGET_parameters.sortProperty ? getRuleChainsUsingGET_parameters.sortProperty : msg.payload;
                
                getRuleChainsUsingGET_nodeParam = node.getRuleChainsUsingGET_sortOrder;
                getRuleChainsUsingGET_nodeParamType = node.getRuleChainsUsingGET_sortOrderType;
                if (getRuleChainsUsingGET_nodeParamType === 'str') {
                    getRuleChainsUsingGET_parameters.sortOrder = getRuleChainsUsingGET_nodeParam || '';
                } else {
                    getRuleChainsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getRuleChainsUsingGET_nodeParam);
                }
                getRuleChainsUsingGET_parameters.sortOrder = !!getRuleChainsUsingGET_parameters.sortOrder ? getRuleChainsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getRuleChainsUsingGET(getRuleChainsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLatestRuleNodeDebugInputUsingGET') {
                var getLatestRuleNodeDebugInputUsingGET_parameters = [];
                var getLatestRuleNodeDebugInputUsingGET_nodeParam;
                var getLatestRuleNodeDebugInputUsingGET_nodeParamType;

                getLatestRuleNodeDebugInputUsingGET_nodeParam = node.getLatestRuleNodeDebugInputUsingGET_ruleNodeId;
                getLatestRuleNodeDebugInputUsingGET_nodeParamType = node.getLatestRuleNodeDebugInputUsingGET_ruleNodeIdType;
                if (getLatestRuleNodeDebugInputUsingGET_nodeParamType === 'str') {
                    getLatestRuleNodeDebugInputUsingGET_parameters.ruleNodeId = getLatestRuleNodeDebugInputUsingGET_nodeParam || '';
                } else {
                    getLatestRuleNodeDebugInputUsingGET_parameters.ruleNodeId = RED.util.getMessageProperty(msg, getLatestRuleNodeDebugInputUsingGET_nodeParam);
                }
                getLatestRuleNodeDebugInputUsingGET_parameters.ruleNodeId = !!getLatestRuleNodeDebugInputUsingGET_parameters.ruleNodeId ? getLatestRuleNodeDebugInputUsingGET_parameters.ruleNodeId : msg.payload;
                                result = client.getLatestRuleNodeDebugInputUsingGET(getLatestRuleNodeDebugInputUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'handleRuleEngineRequestUsingPOST_2') {
                var handleRuleEngineRequestUsingPOST_2_parameters = [];
                var handleRuleEngineRequestUsingPOST_2_nodeParam;
                var handleRuleEngineRequestUsingPOST_2_nodeParamType;

                if (typeof msg.payload === 'object') {
                    handleRuleEngineRequestUsingPOST_2_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleRuleEngineRequestUsingPOST_2(handleRuleEngineRequestUsingPOST_2_parameters);
            }
            if (!errorFlag && node.method === 'handleRuleEngineRequestUsingPOST_1') {
                var handleRuleEngineRequestUsingPOST_1_parameters = [];
                var handleRuleEngineRequestUsingPOST_1_nodeParam;
                var handleRuleEngineRequestUsingPOST_1_nodeParamType;

                handleRuleEngineRequestUsingPOST_1_nodeParam = node.handleRuleEngineRequestUsingPOST_1_entityType;
                handleRuleEngineRequestUsingPOST_1_nodeParamType = node.handleRuleEngineRequestUsingPOST_1_entityTypeType;
                if (handleRuleEngineRequestUsingPOST_1_nodeParamType === 'str') {
                    handleRuleEngineRequestUsingPOST_1_parameters.entityType = handleRuleEngineRequestUsingPOST_1_nodeParam || '';
                } else {
                    handleRuleEngineRequestUsingPOST_1_parameters.entityType = RED.util.getMessageProperty(msg, handleRuleEngineRequestUsingPOST_1_nodeParam);
                }
                handleRuleEngineRequestUsingPOST_1_parameters.entityType = !!handleRuleEngineRequestUsingPOST_1_parameters.entityType ? handleRuleEngineRequestUsingPOST_1_parameters.entityType : msg.payload;
                
                handleRuleEngineRequestUsingPOST_1_nodeParam = node.handleRuleEngineRequestUsingPOST_1_entityId;
                handleRuleEngineRequestUsingPOST_1_nodeParamType = node.handleRuleEngineRequestUsingPOST_1_entityIdType;
                if (handleRuleEngineRequestUsingPOST_1_nodeParamType === 'str') {
                    handleRuleEngineRequestUsingPOST_1_parameters.entityId = handleRuleEngineRequestUsingPOST_1_nodeParam || '';
                } else {
                    handleRuleEngineRequestUsingPOST_1_parameters.entityId = RED.util.getMessageProperty(msg, handleRuleEngineRequestUsingPOST_1_nodeParam);
                }
                handleRuleEngineRequestUsingPOST_1_parameters.entityId = !!handleRuleEngineRequestUsingPOST_1_parameters.entityId ? handleRuleEngineRequestUsingPOST_1_parameters.entityId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleRuleEngineRequestUsingPOST_1_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleRuleEngineRequestUsingPOST_1(handleRuleEngineRequestUsingPOST_1_parameters);
            }
            if (!errorFlag && node.method === 'handleRuleEngineRequestUsingPOST') {
                var handleRuleEngineRequestUsingPOST_parameters = [];
                var handleRuleEngineRequestUsingPOST_nodeParam;
                var handleRuleEngineRequestUsingPOST_nodeParamType;

                handleRuleEngineRequestUsingPOST_nodeParam = node.handleRuleEngineRequestUsingPOST_entityType;
                handleRuleEngineRequestUsingPOST_nodeParamType = node.handleRuleEngineRequestUsingPOST_entityTypeType;
                if (handleRuleEngineRequestUsingPOST_nodeParamType === 'str') {
                    handleRuleEngineRequestUsingPOST_parameters.entityType = handleRuleEngineRequestUsingPOST_nodeParam || '';
                } else {
                    handleRuleEngineRequestUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, handleRuleEngineRequestUsingPOST_nodeParam);
                }
                handleRuleEngineRequestUsingPOST_parameters.entityType = !!handleRuleEngineRequestUsingPOST_parameters.entityType ? handleRuleEngineRequestUsingPOST_parameters.entityType : msg.payload;
                
                handleRuleEngineRequestUsingPOST_nodeParam = node.handleRuleEngineRequestUsingPOST_entityId;
                handleRuleEngineRequestUsingPOST_nodeParamType = node.handleRuleEngineRequestUsingPOST_entityIdType;
                if (handleRuleEngineRequestUsingPOST_nodeParamType === 'str') {
                    handleRuleEngineRequestUsingPOST_parameters.entityId = handleRuleEngineRequestUsingPOST_nodeParam || '';
                } else {
                    handleRuleEngineRequestUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, handleRuleEngineRequestUsingPOST_nodeParam);
                }
                handleRuleEngineRequestUsingPOST_parameters.entityId = !!handleRuleEngineRequestUsingPOST_parameters.entityId ? handleRuleEngineRequestUsingPOST_parameters.entityId : msg.payload;
                
                handleRuleEngineRequestUsingPOST_nodeParam = node.handleRuleEngineRequestUsingPOST_timeout;
                handleRuleEngineRequestUsingPOST_nodeParamType = node.handleRuleEngineRequestUsingPOST_timeoutType;
                if (handleRuleEngineRequestUsingPOST_nodeParamType === 'str') {
                    handleRuleEngineRequestUsingPOST_parameters.timeout = handleRuleEngineRequestUsingPOST_nodeParam || '';
                } else {
                    handleRuleEngineRequestUsingPOST_parameters.timeout = RED.util.getMessageProperty(msg, handleRuleEngineRequestUsingPOST_nodeParam);
                }
                handleRuleEngineRequestUsingPOST_parameters.timeout = !!handleRuleEngineRequestUsingPOST_parameters.timeout ? handleRuleEngineRequestUsingPOST_parameters.timeout : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    handleRuleEngineRequestUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.handleRuleEngineRequestUsingPOST(handleRuleEngineRequestUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAllSchedulerEventsUsingGET') {
                var getAllSchedulerEventsUsingGET_parameters = [];
                var getAllSchedulerEventsUsingGET_nodeParam;
                var getAllSchedulerEventsUsingGET_nodeParamType;

                getAllSchedulerEventsUsingGET_nodeParam = node.getAllSchedulerEventsUsingGET_edgeId;
                getAllSchedulerEventsUsingGET_nodeParamType = node.getAllSchedulerEventsUsingGET_edgeIdType;
                if (getAllSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getAllSchedulerEventsUsingGET_parameters.edgeId = getAllSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getAllSchedulerEventsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getAllSchedulerEventsUsingGET_nodeParam);
                }
                getAllSchedulerEventsUsingGET_parameters.edgeId = !!getAllSchedulerEventsUsingGET_parameters.edgeId ? getAllSchedulerEventsUsingGET_parameters.edgeId : msg.payload;
                                result = client.getAllSchedulerEventsUsingGET(getAllSchedulerEventsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'assignSchedulerEventToEdgeUsingPOST') {
                var assignSchedulerEventToEdgeUsingPOST_parameters = [];
                var assignSchedulerEventToEdgeUsingPOST_nodeParam;
                var assignSchedulerEventToEdgeUsingPOST_nodeParamType;

                assignSchedulerEventToEdgeUsingPOST_nodeParam = node.assignSchedulerEventToEdgeUsingPOST_edgeId;
                assignSchedulerEventToEdgeUsingPOST_nodeParamType = node.assignSchedulerEventToEdgeUsingPOST_edgeIdType;
                if (assignSchedulerEventToEdgeUsingPOST_nodeParamType === 'str') {
                    assignSchedulerEventToEdgeUsingPOST_parameters.edgeId = assignSchedulerEventToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignSchedulerEventToEdgeUsingPOST_parameters.edgeId = RED.util.getMessageProperty(msg, assignSchedulerEventToEdgeUsingPOST_nodeParam);
                }
                assignSchedulerEventToEdgeUsingPOST_parameters.edgeId = !!assignSchedulerEventToEdgeUsingPOST_parameters.edgeId ? assignSchedulerEventToEdgeUsingPOST_parameters.edgeId : msg.payload;
                
                assignSchedulerEventToEdgeUsingPOST_nodeParam = node.assignSchedulerEventToEdgeUsingPOST_schedulerEventId;
                assignSchedulerEventToEdgeUsingPOST_nodeParamType = node.assignSchedulerEventToEdgeUsingPOST_schedulerEventIdType;
                if (assignSchedulerEventToEdgeUsingPOST_nodeParamType === 'str') {
                    assignSchedulerEventToEdgeUsingPOST_parameters.schedulerEventId = assignSchedulerEventToEdgeUsingPOST_nodeParam || '';
                } else {
                    assignSchedulerEventToEdgeUsingPOST_parameters.schedulerEventId = RED.util.getMessageProperty(msg, assignSchedulerEventToEdgeUsingPOST_nodeParam);
                }
                assignSchedulerEventToEdgeUsingPOST_parameters.schedulerEventId = !!assignSchedulerEventToEdgeUsingPOST_parameters.schedulerEventId ? assignSchedulerEventToEdgeUsingPOST_parameters.schedulerEventId : msg.payload;
                                result = client.assignSchedulerEventToEdgeUsingPOST(assignSchedulerEventToEdgeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'unassignSchedulerEventFromEdgeUsingDELETE') {
                var unassignSchedulerEventFromEdgeUsingDELETE_parameters = [];
                var unassignSchedulerEventFromEdgeUsingDELETE_nodeParam;
                var unassignSchedulerEventFromEdgeUsingDELETE_nodeParamType;

                unassignSchedulerEventFromEdgeUsingDELETE_nodeParam = node.unassignSchedulerEventFromEdgeUsingDELETE_edgeId;
                unassignSchedulerEventFromEdgeUsingDELETE_nodeParamType = node.unassignSchedulerEventFromEdgeUsingDELETE_edgeIdType;
                if (unassignSchedulerEventFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignSchedulerEventFromEdgeUsingDELETE_parameters.edgeId = unassignSchedulerEventFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignSchedulerEventFromEdgeUsingDELETE_parameters.edgeId = RED.util.getMessageProperty(msg, unassignSchedulerEventFromEdgeUsingDELETE_nodeParam);
                }
                unassignSchedulerEventFromEdgeUsingDELETE_parameters.edgeId = !!unassignSchedulerEventFromEdgeUsingDELETE_parameters.edgeId ? unassignSchedulerEventFromEdgeUsingDELETE_parameters.edgeId : msg.payload;
                
                unassignSchedulerEventFromEdgeUsingDELETE_nodeParam = node.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventId;
                unassignSchedulerEventFromEdgeUsingDELETE_nodeParamType = node.unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventIdType;
                if (unassignSchedulerEventFromEdgeUsingDELETE_nodeParamType === 'str') {
                    unassignSchedulerEventFromEdgeUsingDELETE_parameters.schedulerEventId = unassignSchedulerEventFromEdgeUsingDELETE_nodeParam || '';
                } else {
                    unassignSchedulerEventFromEdgeUsingDELETE_parameters.schedulerEventId = RED.util.getMessageProperty(msg, unassignSchedulerEventFromEdgeUsingDELETE_nodeParam);
                }
                unassignSchedulerEventFromEdgeUsingDELETE_parameters.schedulerEventId = !!unassignSchedulerEventFromEdgeUsingDELETE_parameters.schedulerEventId ? unassignSchedulerEventFromEdgeUsingDELETE_parameters.schedulerEventId : msg.payload;
                                result = client.unassignSchedulerEventFromEdgeUsingDELETE(unassignSchedulerEventFromEdgeUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getEdgeSchedulerEventsUsingGET') {
                var getEdgeSchedulerEventsUsingGET_parameters = [];
                var getEdgeSchedulerEventsUsingGET_nodeParam;
                var getEdgeSchedulerEventsUsingGET_nodeParamType;

                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_edgeId;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_edgeIdType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.edgeId = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.edgeId = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.edgeId = !!getEdgeSchedulerEventsUsingGET_parameters.edgeId ? getEdgeSchedulerEventsUsingGET_parameters.edgeId : msg.payload;
                
                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_pageSize;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_pageSizeType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.pageSize = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.pageSize = !!getEdgeSchedulerEventsUsingGET_parameters.pageSize ? getEdgeSchedulerEventsUsingGET_parameters.pageSize : msg.payload;
                
                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_page;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_pageType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.page = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.page = !!getEdgeSchedulerEventsUsingGET_parameters.page ? getEdgeSchedulerEventsUsingGET_parameters.page : msg.payload;
                
                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_textSearch;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_textSearchType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.textSearch = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.textSearch = !!getEdgeSchedulerEventsUsingGET_parameters.textSearch ? getEdgeSchedulerEventsUsingGET_parameters.textSearch : msg.payload;
                
                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_sortProperty;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_sortPropertyType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.sortProperty = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.sortProperty = !!getEdgeSchedulerEventsUsingGET_parameters.sortProperty ? getEdgeSchedulerEventsUsingGET_parameters.sortProperty : msg.payload;
                
                getEdgeSchedulerEventsUsingGET_nodeParam = node.getEdgeSchedulerEventsUsingGET_sortOrder;
                getEdgeSchedulerEventsUsingGET_nodeParamType = node.getEdgeSchedulerEventsUsingGET_sortOrderType;
                if (getEdgeSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getEdgeSchedulerEventsUsingGET_parameters.sortOrder = getEdgeSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getEdgeSchedulerEventsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getEdgeSchedulerEventsUsingGET_nodeParam);
                }
                getEdgeSchedulerEventsUsingGET_parameters.sortOrder = !!getEdgeSchedulerEventsUsingGET_parameters.sortOrder ? getEdgeSchedulerEventsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getEdgeSchedulerEventsUsingGET(getEdgeSchedulerEventsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveSchedulerEventUsingPOST') {
                var saveSchedulerEventUsingPOST_parameters = [];
                var saveSchedulerEventUsingPOST_nodeParam;
                var saveSchedulerEventUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveSchedulerEventUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveSchedulerEventUsingPOST(saveSchedulerEventUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getSchedulerEventInfoByIdUsingGET') {
                var getSchedulerEventInfoByIdUsingGET_parameters = [];
                var getSchedulerEventInfoByIdUsingGET_nodeParam;
                var getSchedulerEventInfoByIdUsingGET_nodeParamType;

                getSchedulerEventInfoByIdUsingGET_nodeParam = node.getSchedulerEventInfoByIdUsingGET_schedulerEventId;
                getSchedulerEventInfoByIdUsingGET_nodeParamType = node.getSchedulerEventInfoByIdUsingGET_schedulerEventIdType;
                if (getSchedulerEventInfoByIdUsingGET_nodeParamType === 'str') {
                    getSchedulerEventInfoByIdUsingGET_parameters.schedulerEventId = getSchedulerEventInfoByIdUsingGET_nodeParam || '';
                } else {
                    getSchedulerEventInfoByIdUsingGET_parameters.schedulerEventId = RED.util.getMessageProperty(msg, getSchedulerEventInfoByIdUsingGET_nodeParam);
                }
                getSchedulerEventInfoByIdUsingGET_parameters.schedulerEventId = !!getSchedulerEventInfoByIdUsingGET_parameters.schedulerEventId ? getSchedulerEventInfoByIdUsingGET_parameters.schedulerEventId : msg.payload;
                                result = client.getSchedulerEventInfoByIdUsingGET(getSchedulerEventInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSchedulerEventByIdUsingGET') {
                var getSchedulerEventByIdUsingGET_parameters = [];
                var getSchedulerEventByIdUsingGET_nodeParam;
                var getSchedulerEventByIdUsingGET_nodeParamType;

                getSchedulerEventByIdUsingGET_nodeParam = node.getSchedulerEventByIdUsingGET_schedulerEventId;
                getSchedulerEventByIdUsingGET_nodeParamType = node.getSchedulerEventByIdUsingGET_schedulerEventIdType;
                if (getSchedulerEventByIdUsingGET_nodeParamType === 'str') {
                    getSchedulerEventByIdUsingGET_parameters.schedulerEventId = getSchedulerEventByIdUsingGET_nodeParam || '';
                } else {
                    getSchedulerEventByIdUsingGET_parameters.schedulerEventId = RED.util.getMessageProperty(msg, getSchedulerEventByIdUsingGET_nodeParam);
                }
                getSchedulerEventByIdUsingGET_parameters.schedulerEventId = !!getSchedulerEventByIdUsingGET_parameters.schedulerEventId ? getSchedulerEventByIdUsingGET_parameters.schedulerEventId : msg.payload;
                                result = client.getSchedulerEventByIdUsingGET(getSchedulerEventByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteSchedulerEventUsingDELETE') {
                var deleteSchedulerEventUsingDELETE_parameters = [];
                var deleteSchedulerEventUsingDELETE_nodeParam;
                var deleteSchedulerEventUsingDELETE_nodeParamType;

                deleteSchedulerEventUsingDELETE_nodeParam = node.deleteSchedulerEventUsingDELETE_schedulerEventId;
                deleteSchedulerEventUsingDELETE_nodeParamType = node.deleteSchedulerEventUsingDELETE_schedulerEventIdType;
                if (deleteSchedulerEventUsingDELETE_nodeParamType === 'str') {
                    deleteSchedulerEventUsingDELETE_parameters.schedulerEventId = deleteSchedulerEventUsingDELETE_nodeParam || '';
                } else {
                    deleteSchedulerEventUsingDELETE_parameters.schedulerEventId = RED.util.getMessageProperty(msg, deleteSchedulerEventUsingDELETE_nodeParam);
                }
                deleteSchedulerEventUsingDELETE_parameters.schedulerEventId = !!deleteSchedulerEventUsingDELETE_parameters.schedulerEventId ? deleteSchedulerEventUsingDELETE_parameters.schedulerEventId : msg.payload;
                                result = client.deleteSchedulerEventUsingDELETE(deleteSchedulerEventUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getSchedulerEventsByIdsUsingGET') {
                var getSchedulerEventsByIdsUsingGET_parameters = [];
                var getSchedulerEventsByIdsUsingGET_nodeParam;
                var getSchedulerEventsByIdsUsingGET_nodeParamType;

                getSchedulerEventsByIdsUsingGET_nodeParam = node.getSchedulerEventsByIdsUsingGET_schedulerEventIds;
                getSchedulerEventsByIdsUsingGET_nodeParamType = node.getSchedulerEventsByIdsUsingGET_schedulerEventIdsType;
                if (getSchedulerEventsByIdsUsingGET_nodeParamType === 'str') {
                    getSchedulerEventsByIdsUsingGET_parameters.schedulerEventIds = getSchedulerEventsByIdsUsingGET_nodeParam || '';
                } else {
                    getSchedulerEventsByIdsUsingGET_parameters.schedulerEventIds = RED.util.getMessageProperty(msg, getSchedulerEventsByIdsUsingGET_nodeParam);
                }
                getSchedulerEventsByIdsUsingGET_parameters.schedulerEventIds = !!getSchedulerEventsByIdsUsingGET_parameters.schedulerEventIds ? getSchedulerEventsByIdsUsingGET_parameters.schedulerEventIds : msg.payload;
                                result = client.getSchedulerEventsByIdsUsingGET(getSchedulerEventsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSchedulerEventsUsingGET') {
                var getSchedulerEventsUsingGET_parameters = [];
                var getSchedulerEventsUsingGET_nodeParam;
                var getSchedulerEventsUsingGET_nodeParamType;

                getSchedulerEventsUsingGET_nodeParam = node.getSchedulerEventsUsingGET_type;
                getSchedulerEventsUsingGET_nodeParamType = node.getSchedulerEventsUsingGET_typeType;
                if (getSchedulerEventsUsingGET_nodeParamType === 'str') {
                    getSchedulerEventsUsingGET_parameters.type = getSchedulerEventsUsingGET_nodeParam || '';
                } else {
                    getSchedulerEventsUsingGET_parameters.type = RED.util.getMessageProperty(msg, getSchedulerEventsUsingGET_nodeParam);
                }
                getSchedulerEventsUsingGET_parameters.type = !!getSchedulerEventsUsingGET_parameters.type ? getSchedulerEventsUsingGET_parameters.type : msg.payload;
                                result = client.getSchedulerEventsUsingGET(getSchedulerEventsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getPrivacyPolicyUsingGET') {
                var getPrivacyPolicyUsingGET_parameters = [];
                var getPrivacyPolicyUsingGET_nodeParam;
                var getPrivacyPolicyUsingGET_nodeParamType;
                result = client.getPrivacyPolicyUsingGET(getPrivacyPolicyUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSignUpSelfRegistrationParamsUsingGET') {
                var getSignUpSelfRegistrationParamsUsingGET_parameters = [];
                var getSignUpSelfRegistrationParamsUsingGET_nodeParam;
                var getSignUpSelfRegistrationParamsUsingGET_nodeParamType;

                getSignUpSelfRegistrationParamsUsingGET_nodeParam = node.getSignUpSelfRegistrationParamsUsingGET_pkgName;
                getSignUpSelfRegistrationParamsUsingGET_nodeParamType = node.getSignUpSelfRegistrationParamsUsingGET_pkgNameType;
                if (getSignUpSelfRegistrationParamsUsingGET_nodeParamType === 'str') {
                    getSignUpSelfRegistrationParamsUsingGET_parameters.pkgName = getSignUpSelfRegistrationParamsUsingGET_nodeParam || '';
                } else {
                    getSignUpSelfRegistrationParamsUsingGET_parameters.pkgName = RED.util.getMessageProperty(msg, getSignUpSelfRegistrationParamsUsingGET_nodeParam);
                }
                getSignUpSelfRegistrationParamsUsingGET_parameters.pkgName = !!getSignUpSelfRegistrationParamsUsingGET_parameters.pkgName ? getSignUpSelfRegistrationParamsUsingGET_parameters.pkgName : msg.payload;
                                result = client.getSignUpSelfRegistrationParamsUsingGET(getSignUpSelfRegistrationParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTermsOfUseUsingGET') {
                var getTermsOfUseUsingGET_parameters = [];
                var getTermsOfUseUsingGET_nodeParam;
                var getTermsOfUseUsingGET_nodeParamType;
                result = client.getTermsOfUseUsingGET(getTermsOfUseUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSelfRegistrationParamsUsingGET') {
                var getSelfRegistrationParamsUsingGET_parameters = [];
                var getSelfRegistrationParamsUsingGET_nodeParam;
                var getSelfRegistrationParamsUsingGET_nodeParamType;
                result = client.getSelfRegistrationParamsUsingGET(getSelfRegistrationParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveSelfRegistrationParamsUsingPOST') {
                var saveSelfRegistrationParamsUsingPOST_parameters = [];
                var saveSelfRegistrationParamsUsingPOST_nodeParam;
                var saveSelfRegistrationParamsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveSelfRegistrationParamsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveSelfRegistrationParamsUsingPOST(saveSelfRegistrationParamsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'deleteSelfRegistrationParamsUsingDELETE') {
                var deleteSelfRegistrationParamsUsingDELETE_parameters = [];
                var deleteSelfRegistrationParamsUsingDELETE_nodeParam;
                var deleteSelfRegistrationParamsUsingDELETE_nodeParamType;

                deleteSelfRegistrationParamsUsingDELETE_nodeParam = node.deleteSelfRegistrationParamsUsingDELETE_domainName;
                deleteSelfRegistrationParamsUsingDELETE_nodeParamType = node.deleteSelfRegistrationParamsUsingDELETE_domainNameType;
                if (deleteSelfRegistrationParamsUsingDELETE_nodeParamType === 'str') {
                    deleteSelfRegistrationParamsUsingDELETE_parameters.domainName = deleteSelfRegistrationParamsUsingDELETE_nodeParam || '';
                } else {
                    deleteSelfRegistrationParamsUsingDELETE_parameters.domainName = RED.util.getMessageProperty(msg, deleteSelfRegistrationParamsUsingDELETE_nodeParam);
                }
                deleteSelfRegistrationParamsUsingDELETE_parameters.domainName = !!deleteSelfRegistrationParamsUsingDELETE_parameters.domainName ? deleteSelfRegistrationParamsUsingDELETE_parameters.domainName : msg.payload;
                                result = client.deleteSelfRegistrationParamsUsingDELETE(deleteSelfRegistrationParamsUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'activateUserByEmailCodeUsingPOST') {
                var activateUserByEmailCodeUsingPOST_parameters = [];
                var activateUserByEmailCodeUsingPOST_nodeParam;
                var activateUserByEmailCodeUsingPOST_nodeParamType;

                activateUserByEmailCodeUsingPOST_nodeParam = node.activateUserByEmailCodeUsingPOST_emailCode;
                activateUserByEmailCodeUsingPOST_nodeParamType = node.activateUserByEmailCodeUsingPOST_emailCodeType;
                if (activateUserByEmailCodeUsingPOST_nodeParamType === 'str') {
                    activateUserByEmailCodeUsingPOST_parameters.emailCode = activateUserByEmailCodeUsingPOST_nodeParam || '';
                } else {
                    activateUserByEmailCodeUsingPOST_parameters.emailCode = RED.util.getMessageProperty(msg, activateUserByEmailCodeUsingPOST_nodeParam);
                }
                activateUserByEmailCodeUsingPOST_parameters.emailCode = !!activateUserByEmailCodeUsingPOST_parameters.emailCode ? activateUserByEmailCodeUsingPOST_parameters.emailCode : msg.payload;
                
                activateUserByEmailCodeUsingPOST_nodeParam = node.activateUserByEmailCodeUsingPOST_pkgName;
                activateUserByEmailCodeUsingPOST_nodeParamType = node.activateUserByEmailCodeUsingPOST_pkgNameType;
                if (activateUserByEmailCodeUsingPOST_nodeParamType === 'str') {
                    activateUserByEmailCodeUsingPOST_parameters.pkgName = activateUserByEmailCodeUsingPOST_nodeParam || '';
                } else {
                    activateUserByEmailCodeUsingPOST_parameters.pkgName = RED.util.getMessageProperty(msg, activateUserByEmailCodeUsingPOST_nodeParam);
                }
                activateUserByEmailCodeUsingPOST_parameters.pkgName = !!activateUserByEmailCodeUsingPOST_parameters.pkgName ? activateUserByEmailCodeUsingPOST_parameters.pkgName : msg.payload;
                                result = client.activateUserByEmailCodeUsingPOST(activateUserByEmailCodeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'activateEmailUsingGET') {
                var activateEmailUsingGET_parameters = [];
                var activateEmailUsingGET_nodeParam;
                var activateEmailUsingGET_nodeParamType;

                activateEmailUsingGET_nodeParam = node.activateEmailUsingGET_emailCode;
                activateEmailUsingGET_nodeParamType = node.activateEmailUsingGET_emailCodeType;
                if (activateEmailUsingGET_nodeParamType === 'str') {
                    activateEmailUsingGET_parameters.emailCode = activateEmailUsingGET_nodeParam || '';
                } else {
                    activateEmailUsingGET_parameters.emailCode = RED.util.getMessageProperty(msg, activateEmailUsingGET_nodeParam);
                }
                activateEmailUsingGET_parameters.emailCode = !!activateEmailUsingGET_parameters.emailCode ? activateEmailUsingGET_parameters.emailCode : msg.payload;
                
                activateEmailUsingGET_nodeParam = node.activateEmailUsingGET_pkgName;
                activateEmailUsingGET_nodeParamType = node.activateEmailUsingGET_pkgNameType;
                if (activateEmailUsingGET_nodeParamType === 'str') {
                    activateEmailUsingGET_parameters.pkgName = activateEmailUsingGET_nodeParam || '';
                } else {
                    activateEmailUsingGET_parameters.pkgName = RED.util.getMessageProperty(msg, activateEmailUsingGET_nodeParam);
                }
                activateEmailUsingGET_parameters.pkgName = !!activateEmailUsingGET_parameters.pkgName ? activateEmailUsingGET_parameters.pkgName : msg.payload;
                                result = client.activateEmailUsingGET(activateEmailUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'activateCloudUserByEmailCodeUsingPOST') {
                var activateCloudUserByEmailCodeUsingPOST_parameters = [];
                var activateCloudUserByEmailCodeUsingPOST_nodeParam;
                var activateCloudUserByEmailCodeUsingPOST_nodeParamType;

                activateCloudUserByEmailCodeUsingPOST_nodeParam = node.activateCloudUserByEmailCodeUsingPOST_emailCode;
                activateCloudUserByEmailCodeUsingPOST_nodeParamType = node.activateCloudUserByEmailCodeUsingPOST_emailCodeType;
                if (activateCloudUserByEmailCodeUsingPOST_nodeParamType === 'str') {
                    activateCloudUserByEmailCodeUsingPOST_parameters.emailCode = activateCloudUserByEmailCodeUsingPOST_nodeParam || '';
                } else {
                    activateCloudUserByEmailCodeUsingPOST_parameters.emailCode = RED.util.getMessageProperty(msg, activateCloudUserByEmailCodeUsingPOST_nodeParam);
                }
                activateCloudUserByEmailCodeUsingPOST_parameters.emailCode = !!activateCloudUserByEmailCodeUsingPOST_parameters.emailCode ? activateCloudUserByEmailCodeUsingPOST_parameters.emailCode : msg.payload;
                                result = client.activateCloudUserByEmailCodeUsingPOST(activateCloudUserByEmailCodeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'activateCloudEmailUsingGET') {
                var activateCloudEmailUsingGET_parameters = [];
                var activateCloudEmailUsingGET_nodeParam;
                var activateCloudEmailUsingGET_nodeParamType;

                activateCloudEmailUsingGET_nodeParam = node.activateCloudEmailUsingGET_emailCode;
                activateCloudEmailUsingGET_nodeParamType = node.activateCloudEmailUsingGET_emailCodeType;
                if (activateCloudEmailUsingGET_nodeParamType === 'str') {
                    activateCloudEmailUsingGET_parameters.emailCode = activateCloudEmailUsingGET_nodeParam || '';
                } else {
                    activateCloudEmailUsingGET_parameters.emailCode = RED.util.getMessageProperty(msg, activateCloudEmailUsingGET_nodeParam);
                }
                activateCloudEmailUsingGET_parameters.emailCode = !!activateCloudEmailUsingGET_parameters.emailCode ? activateCloudEmailUsingGET_parameters.emailCode : msg.payload;
                                result = client.activateCloudEmailUsingGET(activateCloudEmailUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'resendCloudEmailActivationUsingPOST') {
                var resendCloudEmailActivationUsingPOST_parameters = [];
                var resendCloudEmailActivationUsingPOST_nodeParam;
                var resendCloudEmailActivationUsingPOST_nodeParamType;

                resendCloudEmailActivationUsingPOST_nodeParam = node.resendCloudEmailActivationUsingPOST_email;
                resendCloudEmailActivationUsingPOST_nodeParamType = node.resendCloudEmailActivationUsingPOST_emailType;
                if (resendCloudEmailActivationUsingPOST_nodeParamType === 'str') {
                    resendCloudEmailActivationUsingPOST_parameters.email = resendCloudEmailActivationUsingPOST_nodeParam || '';
                } else {
                    resendCloudEmailActivationUsingPOST_parameters.email = RED.util.getMessageProperty(msg, resendCloudEmailActivationUsingPOST_nodeParam);
                }
                resendCloudEmailActivationUsingPOST_parameters.email = !!resendCloudEmailActivationUsingPOST_parameters.email ? resendCloudEmailActivationUsingPOST_parameters.email : msg.payload;
                                result = client.resendCloudEmailActivationUsingPOST(resendCloudEmailActivationUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'mobileLoginUsingGET') {
                var mobileLoginUsingGET_parameters = [];
                var mobileLoginUsingGET_nodeParam;
                var mobileLoginUsingGET_nodeParamType;

                mobileLoginUsingGET_nodeParam = node.mobileLoginUsingGET_pkgName;
                mobileLoginUsingGET_nodeParamType = node.mobileLoginUsingGET_pkgNameType;
                if (mobileLoginUsingGET_nodeParamType === 'str') {
                    mobileLoginUsingGET_parameters.pkgName = mobileLoginUsingGET_nodeParam || '';
                } else {
                    mobileLoginUsingGET_parameters.pkgName = RED.util.getMessageProperty(msg, mobileLoginUsingGET_nodeParam);
                }
                mobileLoginUsingGET_parameters.pkgName = !!mobileLoginUsingGET_parameters.pkgName ? mobileLoginUsingGET_parameters.pkgName : msg.payload;
                                result = client.mobileLoginUsingGET(mobileLoginUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'resendEmailActivationUsingPOST') {
                var resendEmailActivationUsingPOST_parameters = [];
                var resendEmailActivationUsingPOST_nodeParam;
                var resendEmailActivationUsingPOST_nodeParamType;

                resendEmailActivationUsingPOST_nodeParam = node.resendEmailActivationUsingPOST_email;
                resendEmailActivationUsingPOST_nodeParamType = node.resendEmailActivationUsingPOST_emailType;
                if (resendEmailActivationUsingPOST_nodeParamType === 'str') {
                    resendEmailActivationUsingPOST_parameters.email = resendEmailActivationUsingPOST_nodeParam || '';
                } else {
                    resendEmailActivationUsingPOST_parameters.email = RED.util.getMessageProperty(msg, resendEmailActivationUsingPOST_nodeParam);
                }
                resendEmailActivationUsingPOST_parameters.email = !!resendEmailActivationUsingPOST_parameters.email ? resendEmailActivationUsingPOST_parameters.email : msg.payload;
                
                resendEmailActivationUsingPOST_nodeParam = node.resendEmailActivationUsingPOST_pkgName;
                resendEmailActivationUsingPOST_nodeParamType = node.resendEmailActivationUsingPOST_pkgNameType;
                if (resendEmailActivationUsingPOST_nodeParamType === 'str') {
                    resendEmailActivationUsingPOST_parameters.pkgName = resendEmailActivationUsingPOST_nodeParam || '';
                } else {
                    resendEmailActivationUsingPOST_parameters.pkgName = RED.util.getMessageProperty(msg, resendEmailActivationUsingPOST_nodeParam);
                }
                resendEmailActivationUsingPOST_parameters.pkgName = !!resendEmailActivationUsingPOST_parameters.pkgName ? resendEmailActivationUsingPOST_parameters.pkgName : msg.payload;
                                result = client.resendEmailActivationUsingPOST(resendEmailActivationUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'signUpUsingPOST') {
                var signUpUsingPOST_parameters = [];
                var signUpUsingPOST_nodeParam;
                var signUpUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    signUpUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.signUpUsingPOST(signUpUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getRecaptchaPublicKeyUsingGET') {
                var getRecaptchaPublicKeyUsingGET_parameters = [];
                var getRecaptchaPublicKeyUsingGET_nodeParam;
                var getRecaptchaPublicKeyUsingGET_nodeParamType;
                result = client.getRecaptchaPublicKeyUsingGET(getRecaptchaPublicKeyUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'acceptPrivacyPolicyUsingPOST') {
                var acceptPrivacyPolicyUsingPOST_parameters = [];
                var acceptPrivacyPolicyUsingPOST_nodeParam;
                var acceptPrivacyPolicyUsingPOST_nodeParamType;
                result = client.acceptPrivacyPolicyUsingPOST(acceptPrivacyPolicyUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'acceptPrivacyPolicyAndTermsOfUseUsingPOST') {
                var acceptPrivacyPolicyAndTermsOfUseUsingPOST_parameters = [];
                var acceptPrivacyPolicyAndTermsOfUseUsingPOST_nodeParam;
                var acceptPrivacyPolicyAndTermsOfUseUsingPOST_nodeParamType;
                result = client.acceptPrivacyPolicyAndTermsOfUseUsingPOST(acceptPrivacyPolicyAndTermsOfUseUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'acceptTermsOfUseUsingPOST') {
                var acceptTermsOfUseUsingPOST_parameters = [];
                var acceptTermsOfUseUsingPOST_nodeParam;
                var acceptTermsOfUseUsingPOST_nodeParamType;
                result = client.acceptTermsOfUseUsingPOST(acceptTermsOfUseUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'isDisplayWelcomeUsingGET') {
                var isDisplayWelcomeUsingGET_parameters = [];
                var isDisplayWelcomeUsingGET_nodeParam;
                var isDisplayWelcomeUsingGET_nodeParamType;
                result = client.isDisplayWelcomeUsingGET(isDisplayWelcomeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'setNotDisplayWelcomeUsingPOST') {
                var setNotDisplayWelcomeUsingPOST_parameters = [];
                var setNotDisplayWelcomeUsingPOST_nodeParam;
                var setNotDisplayWelcomeUsingPOST_nodeParamType;
                result = client.setNotDisplayWelcomeUsingPOST(setNotDisplayWelcomeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'privacyPolicyAcceptedUsingGET') {
                var privacyPolicyAcceptedUsingGET_parameters = [];
                var privacyPolicyAcceptedUsingGET_nodeParam;
                var privacyPolicyAcceptedUsingGET_nodeParamType;
                result = client.privacyPolicyAcceptedUsingGET(privacyPolicyAcceptedUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteTenantAccountUsingPOST') {
                var deleteTenantAccountUsingPOST_parameters = [];
                var deleteTenantAccountUsingPOST_nodeParam;
                var deleteTenantAccountUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    deleteTenantAccountUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.deleteTenantAccountUsingPOST(deleteTenantAccountUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'termsOfUseAcceptedUsingGET') {
                var termsOfUseAcceptedUsingGET_parameters = [];
                var termsOfUseAcceptedUsingGET_nodeParam;
                var termsOfUseAcceptedUsingGET_nodeParamType;
                result = client.termsOfUseAcceptedUsingGET(termsOfUseAcceptedUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSolutionTemplateDetailsUsingGET') {
                var getSolutionTemplateDetailsUsingGET_parameters = [];
                var getSolutionTemplateDetailsUsingGET_nodeParam;
                var getSolutionTemplateDetailsUsingGET_nodeParamType;

                getSolutionTemplateDetailsUsingGET_nodeParam = node.getSolutionTemplateDetailsUsingGET_solutionTemplateId;
                getSolutionTemplateDetailsUsingGET_nodeParamType = node.getSolutionTemplateDetailsUsingGET_solutionTemplateIdType;
                if (getSolutionTemplateDetailsUsingGET_nodeParamType === 'str') {
                    getSolutionTemplateDetailsUsingGET_parameters.solutionTemplateId = getSolutionTemplateDetailsUsingGET_nodeParam || '';
                } else {
                    getSolutionTemplateDetailsUsingGET_parameters.solutionTemplateId = RED.util.getMessageProperty(msg, getSolutionTemplateDetailsUsingGET_nodeParam);
                }
                getSolutionTemplateDetailsUsingGET_parameters.solutionTemplateId = !!getSolutionTemplateDetailsUsingGET_parameters.solutionTemplateId ? getSolutionTemplateDetailsUsingGET_parameters.solutionTemplateId : msg.payload;
                                result = client.getSolutionTemplateDetailsUsingGET(getSolutionTemplateDetailsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSolutionTemplateInfosUsingGET') {
                var getSolutionTemplateInfosUsingGET_parameters = [];
                var getSolutionTemplateInfosUsingGET_nodeParam;
                var getSolutionTemplateInfosUsingGET_nodeParamType;
                result = client.getSolutionTemplateInfosUsingGET(getSolutionTemplateInfosUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getSolutionTemplateInstructionsUsingGET') {
                var getSolutionTemplateInstructionsUsingGET_parameters = [];
                var getSolutionTemplateInstructionsUsingGET_nodeParam;
                var getSolutionTemplateInstructionsUsingGET_nodeParamType;

                getSolutionTemplateInstructionsUsingGET_nodeParam = node.getSolutionTemplateInstructionsUsingGET_solutionTemplateId;
                getSolutionTemplateInstructionsUsingGET_nodeParamType = node.getSolutionTemplateInstructionsUsingGET_solutionTemplateIdType;
                if (getSolutionTemplateInstructionsUsingGET_nodeParamType === 'str') {
                    getSolutionTemplateInstructionsUsingGET_parameters.solutionTemplateId = getSolutionTemplateInstructionsUsingGET_nodeParam || '';
                } else {
                    getSolutionTemplateInstructionsUsingGET_parameters.solutionTemplateId = RED.util.getMessageProperty(msg, getSolutionTemplateInstructionsUsingGET_nodeParam);
                }
                getSolutionTemplateInstructionsUsingGET_parameters.solutionTemplateId = !!getSolutionTemplateInstructionsUsingGET_parameters.solutionTemplateId ? getSolutionTemplateInstructionsUsingGET_parameters.solutionTemplateId : msg.payload;
                                result = client.getSolutionTemplateInstructionsUsingGET(getSolutionTemplateInstructionsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'uninstallSolutionTemplateUsingDELETE') {
                var uninstallSolutionTemplateUsingDELETE_parameters = [];
                var uninstallSolutionTemplateUsingDELETE_nodeParam;
                var uninstallSolutionTemplateUsingDELETE_nodeParamType;

                uninstallSolutionTemplateUsingDELETE_nodeParam = node.uninstallSolutionTemplateUsingDELETE_solutionTemplateId;
                uninstallSolutionTemplateUsingDELETE_nodeParamType = node.uninstallSolutionTemplateUsingDELETE_solutionTemplateIdType;
                if (uninstallSolutionTemplateUsingDELETE_nodeParamType === 'str') {
                    uninstallSolutionTemplateUsingDELETE_parameters.solutionTemplateId = uninstallSolutionTemplateUsingDELETE_nodeParam || '';
                } else {
                    uninstallSolutionTemplateUsingDELETE_parameters.solutionTemplateId = RED.util.getMessageProperty(msg, uninstallSolutionTemplateUsingDELETE_nodeParam);
                }
                uninstallSolutionTemplateUsingDELETE_parameters.solutionTemplateId = !!uninstallSolutionTemplateUsingDELETE_parameters.solutionTemplateId ? uninstallSolutionTemplateUsingDELETE_parameters.solutionTemplateId : msg.payload;
                                result = client.uninstallSolutionTemplateUsingDELETE(uninstallSolutionTemplateUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'installSolutionTemplateUsingPOST') {
                var installSolutionTemplateUsingPOST_parameters = [];
                var installSolutionTemplateUsingPOST_nodeParam;
                var installSolutionTemplateUsingPOST_nodeParamType;

                installSolutionTemplateUsingPOST_nodeParam = node.installSolutionTemplateUsingPOST_solutionTemplateId;
                installSolutionTemplateUsingPOST_nodeParamType = node.installSolutionTemplateUsingPOST_solutionTemplateIdType;
                if (installSolutionTemplateUsingPOST_nodeParamType === 'str') {
                    installSolutionTemplateUsingPOST_parameters.solutionTemplateId = installSolutionTemplateUsingPOST_nodeParam || '';
                } else {
                    installSolutionTemplateUsingPOST_parameters.solutionTemplateId = RED.util.getMessageProperty(msg, installSolutionTemplateUsingPOST_nodeParam);
                }
                installSolutionTemplateUsingPOST_parameters.solutionTemplateId = !!installSolutionTemplateUsingPOST_parameters.solutionTemplateId ? installSolutionTemplateUsingPOST_parameters.solutionTemplateId : msg.payload;
                                result = client.installSolutionTemplateUsingPOST(installSolutionTemplateUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfileDataUsingGET') {
                var getTenantProfileDataUsingGET_parameters = [];
                var getTenantProfileDataUsingGET_nodeParam;
                var getTenantProfileDataUsingGET_nodeParamType;
                result = client.getTenantProfileDataUsingGET(getTenantProfileDataUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantSubscriptionUsageUsingGET') {
                var getTenantSubscriptionUsageUsingGET_parameters = [];
                var getTenantSubscriptionUsageUsingGET_nodeParam;
                var getTenantSubscriptionUsageUsingGET_nodeParamType;
                result = client.getTenantSubscriptionUsageUsingGET(getTenantSubscriptionUsageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfileDataByIdUsingGET') {
                var getTenantProfileDataByIdUsingGET_parameters = [];
                var getTenantProfileDataByIdUsingGET_nodeParam;
                var getTenantProfileDataByIdUsingGET_nodeParamType;

                getTenantProfileDataByIdUsingGET_nodeParam = node.getTenantProfileDataByIdUsingGET_tenantProfileId;
                getTenantProfileDataByIdUsingGET_nodeParamType = node.getTenantProfileDataByIdUsingGET_tenantProfileIdType;
                if (getTenantProfileDataByIdUsingGET_nodeParamType === 'str') {
                    getTenantProfileDataByIdUsingGET_parameters.tenantProfileId = getTenantProfileDataByIdUsingGET_nodeParam || '';
                } else {
                    getTenantProfileDataByIdUsingGET_parameters.tenantProfileId = RED.util.getMessageProperty(msg, getTenantProfileDataByIdUsingGET_nodeParam);
                }
                getTenantProfileDataByIdUsingGET_parameters.tenantProfileId = !!getTenantProfileDataByIdUsingGET_parameters.tenantProfileId ? getTenantProfileDataByIdUsingGET_parameters.tenantProfileId : msg.payload;
                                result = client.getTenantProfileDataByIdUsingGET(getTenantProfileDataByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveResourceUsingPOST') {
                var saveResourceUsingPOST_parameters = [];
                var saveResourceUsingPOST_nodeParam;
                var saveResourceUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveResourceUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveResourceUsingPOST(saveResourceUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getResourceInfoByIdUsingGET') {
                var getResourceInfoByIdUsingGET_parameters = [];
                var getResourceInfoByIdUsingGET_nodeParam;
                var getResourceInfoByIdUsingGET_nodeParamType;

                getResourceInfoByIdUsingGET_nodeParam = node.getResourceInfoByIdUsingGET_resourceId;
                getResourceInfoByIdUsingGET_nodeParamType = node.getResourceInfoByIdUsingGET_resourceIdType;
                if (getResourceInfoByIdUsingGET_nodeParamType === 'str') {
                    getResourceInfoByIdUsingGET_parameters.resourceId = getResourceInfoByIdUsingGET_nodeParam || '';
                } else {
                    getResourceInfoByIdUsingGET_parameters.resourceId = RED.util.getMessageProperty(msg, getResourceInfoByIdUsingGET_nodeParam);
                }
                getResourceInfoByIdUsingGET_parameters.resourceId = !!getResourceInfoByIdUsingGET_parameters.resourceId ? getResourceInfoByIdUsingGET_parameters.resourceId : msg.payload;
                                result = client.getResourceInfoByIdUsingGET(getResourceInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLwm2mListObjectsPageUsingGET') {
                var getLwm2mListObjectsPageUsingGET_parameters = [];
                var getLwm2mListObjectsPageUsingGET_nodeParam;
                var getLwm2mListObjectsPageUsingGET_nodeParamType;

                getLwm2mListObjectsPageUsingGET_nodeParam = node.getLwm2mListObjectsPageUsingGET_pageSize;
                getLwm2mListObjectsPageUsingGET_nodeParamType = node.getLwm2mListObjectsPageUsingGET_pageSizeType;
                if (getLwm2mListObjectsPageUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsPageUsingGET_parameters.pageSize = getLwm2mListObjectsPageUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsPageUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getLwm2mListObjectsPageUsingGET_nodeParam);
                }
                getLwm2mListObjectsPageUsingGET_parameters.pageSize = !!getLwm2mListObjectsPageUsingGET_parameters.pageSize ? getLwm2mListObjectsPageUsingGET_parameters.pageSize : msg.payload;
                
                getLwm2mListObjectsPageUsingGET_nodeParam = node.getLwm2mListObjectsPageUsingGET_page;
                getLwm2mListObjectsPageUsingGET_nodeParamType = node.getLwm2mListObjectsPageUsingGET_pageType;
                if (getLwm2mListObjectsPageUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsPageUsingGET_parameters.page = getLwm2mListObjectsPageUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsPageUsingGET_parameters.page = RED.util.getMessageProperty(msg, getLwm2mListObjectsPageUsingGET_nodeParam);
                }
                getLwm2mListObjectsPageUsingGET_parameters.page = !!getLwm2mListObjectsPageUsingGET_parameters.page ? getLwm2mListObjectsPageUsingGET_parameters.page : msg.payload;
                
                getLwm2mListObjectsPageUsingGET_nodeParam = node.getLwm2mListObjectsPageUsingGET_textSearch;
                getLwm2mListObjectsPageUsingGET_nodeParamType = node.getLwm2mListObjectsPageUsingGET_textSearchType;
                if (getLwm2mListObjectsPageUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsPageUsingGET_parameters.textSearch = getLwm2mListObjectsPageUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsPageUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getLwm2mListObjectsPageUsingGET_nodeParam);
                }
                getLwm2mListObjectsPageUsingGET_parameters.textSearch = !!getLwm2mListObjectsPageUsingGET_parameters.textSearch ? getLwm2mListObjectsPageUsingGET_parameters.textSearch : msg.payload;
                
                getLwm2mListObjectsPageUsingGET_nodeParam = node.getLwm2mListObjectsPageUsingGET_sortProperty;
                getLwm2mListObjectsPageUsingGET_nodeParamType = node.getLwm2mListObjectsPageUsingGET_sortPropertyType;
                if (getLwm2mListObjectsPageUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsPageUsingGET_parameters.sortProperty = getLwm2mListObjectsPageUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsPageUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getLwm2mListObjectsPageUsingGET_nodeParam);
                }
                getLwm2mListObjectsPageUsingGET_parameters.sortProperty = !!getLwm2mListObjectsPageUsingGET_parameters.sortProperty ? getLwm2mListObjectsPageUsingGET_parameters.sortProperty : msg.payload;
                
                getLwm2mListObjectsPageUsingGET_nodeParam = node.getLwm2mListObjectsPageUsingGET_sortOrder;
                getLwm2mListObjectsPageUsingGET_nodeParamType = node.getLwm2mListObjectsPageUsingGET_sortOrderType;
                if (getLwm2mListObjectsPageUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsPageUsingGET_parameters.sortOrder = getLwm2mListObjectsPageUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsPageUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getLwm2mListObjectsPageUsingGET_nodeParam);
                }
                getLwm2mListObjectsPageUsingGET_parameters.sortOrder = !!getLwm2mListObjectsPageUsingGET_parameters.sortOrder ? getLwm2mListObjectsPageUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getLwm2mListObjectsPageUsingGET(getLwm2mListObjectsPageUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLwm2mListObjectsUsingGET') {
                var getLwm2mListObjectsUsingGET_parameters = [];
                var getLwm2mListObjectsUsingGET_nodeParam;
                var getLwm2mListObjectsUsingGET_nodeParamType;

                getLwm2mListObjectsUsingGET_nodeParam = node.getLwm2mListObjectsUsingGET_sortOrder;
                getLwm2mListObjectsUsingGET_nodeParamType = node.getLwm2mListObjectsUsingGET_sortOrderType;
                if (getLwm2mListObjectsUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsUsingGET_parameters.sortOrder = getLwm2mListObjectsUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getLwm2mListObjectsUsingGET_nodeParam);
                }
                getLwm2mListObjectsUsingGET_parameters.sortOrder = !!getLwm2mListObjectsUsingGET_parameters.sortOrder ? getLwm2mListObjectsUsingGET_parameters.sortOrder : msg.payload;
                
                getLwm2mListObjectsUsingGET_nodeParam = node.getLwm2mListObjectsUsingGET_sortProperty;
                getLwm2mListObjectsUsingGET_nodeParamType = node.getLwm2mListObjectsUsingGET_sortPropertyType;
                if (getLwm2mListObjectsUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsUsingGET_parameters.sortProperty = getLwm2mListObjectsUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getLwm2mListObjectsUsingGET_nodeParam);
                }
                getLwm2mListObjectsUsingGET_parameters.sortProperty = !!getLwm2mListObjectsUsingGET_parameters.sortProperty ? getLwm2mListObjectsUsingGET_parameters.sortProperty : msg.payload;
                
                getLwm2mListObjectsUsingGET_nodeParam = node.getLwm2mListObjectsUsingGET_objectIds;
                getLwm2mListObjectsUsingGET_nodeParamType = node.getLwm2mListObjectsUsingGET_objectIdsType;
                if (getLwm2mListObjectsUsingGET_nodeParamType === 'str') {
                    getLwm2mListObjectsUsingGET_parameters.objectIds = getLwm2mListObjectsUsingGET_nodeParam || '';
                } else {
                    getLwm2mListObjectsUsingGET_parameters.objectIds = RED.util.getMessageProperty(msg, getLwm2mListObjectsUsingGET_nodeParam);
                }
                getLwm2mListObjectsUsingGET_parameters.objectIds = !!getLwm2mListObjectsUsingGET_parameters.objectIds ? getLwm2mListObjectsUsingGET_parameters.objectIds : msg.payload;
                                result = client.getLwm2mListObjectsUsingGET(getLwm2mListObjectsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getResourceByIdUsingGET') {
                var getResourceByIdUsingGET_parameters = [];
                var getResourceByIdUsingGET_nodeParam;
                var getResourceByIdUsingGET_nodeParamType;

                getResourceByIdUsingGET_nodeParam = node.getResourceByIdUsingGET_resourceId;
                getResourceByIdUsingGET_nodeParamType = node.getResourceByIdUsingGET_resourceIdType;
                if (getResourceByIdUsingGET_nodeParamType === 'str') {
                    getResourceByIdUsingGET_parameters.resourceId = getResourceByIdUsingGET_nodeParam || '';
                } else {
                    getResourceByIdUsingGET_parameters.resourceId = RED.util.getMessageProperty(msg, getResourceByIdUsingGET_nodeParam);
                }
                getResourceByIdUsingGET_parameters.resourceId = !!getResourceByIdUsingGET_parameters.resourceId ? getResourceByIdUsingGET_parameters.resourceId : msg.payload;
                                result = client.getResourceByIdUsingGET(getResourceByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteResourceUsingDELETE') {
                var deleteResourceUsingDELETE_parameters = [];
                var deleteResourceUsingDELETE_nodeParam;
                var deleteResourceUsingDELETE_nodeParamType;

                deleteResourceUsingDELETE_nodeParam = node.deleteResourceUsingDELETE_resourceId;
                deleteResourceUsingDELETE_nodeParamType = node.deleteResourceUsingDELETE_resourceIdType;
                if (deleteResourceUsingDELETE_nodeParamType === 'str') {
                    deleteResourceUsingDELETE_parameters.resourceId = deleteResourceUsingDELETE_nodeParam || '';
                } else {
                    deleteResourceUsingDELETE_parameters.resourceId = RED.util.getMessageProperty(msg, deleteResourceUsingDELETE_nodeParam);
                }
                deleteResourceUsingDELETE_parameters.resourceId = !!deleteResourceUsingDELETE_parameters.resourceId ? deleteResourceUsingDELETE_parameters.resourceId : msg.payload;
                                result = client.deleteResourceUsingDELETE(deleteResourceUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'downloadResourceUsingGET') {
                var downloadResourceUsingGET_parameters = [];
                var downloadResourceUsingGET_nodeParam;
                var downloadResourceUsingGET_nodeParamType;

                downloadResourceUsingGET_nodeParam = node.downloadResourceUsingGET_resourceId;
                downloadResourceUsingGET_nodeParamType = node.downloadResourceUsingGET_resourceIdType;
                if (downloadResourceUsingGET_nodeParamType === 'str') {
                    downloadResourceUsingGET_parameters.resourceId = downloadResourceUsingGET_nodeParam || '';
                } else {
                    downloadResourceUsingGET_parameters.resourceId = RED.util.getMessageProperty(msg, downloadResourceUsingGET_nodeParam);
                }
                downloadResourceUsingGET_parameters.resourceId = !!downloadResourceUsingGET_parameters.resourceId ? downloadResourceUsingGET_parameters.resourceId : msg.payload;
                                result = client.downloadResourceUsingGET(downloadResourceUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getResourcesUsingGET') {
                var getResourcesUsingGET_parameters = [];
                var getResourcesUsingGET_nodeParam;
                var getResourcesUsingGET_nodeParamType;

                getResourcesUsingGET_nodeParam = node.getResourcesUsingGET_pageSize;
                getResourcesUsingGET_nodeParamType = node.getResourcesUsingGET_pageSizeType;
                if (getResourcesUsingGET_nodeParamType === 'str') {
                    getResourcesUsingGET_parameters.pageSize = getResourcesUsingGET_nodeParam || '';
                } else {
                    getResourcesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getResourcesUsingGET_nodeParam);
                }
                getResourcesUsingGET_parameters.pageSize = !!getResourcesUsingGET_parameters.pageSize ? getResourcesUsingGET_parameters.pageSize : msg.payload;
                
                getResourcesUsingGET_nodeParam = node.getResourcesUsingGET_page;
                getResourcesUsingGET_nodeParamType = node.getResourcesUsingGET_pageType;
                if (getResourcesUsingGET_nodeParamType === 'str') {
                    getResourcesUsingGET_parameters.page = getResourcesUsingGET_nodeParam || '';
                } else {
                    getResourcesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getResourcesUsingGET_nodeParam);
                }
                getResourcesUsingGET_parameters.page = !!getResourcesUsingGET_parameters.page ? getResourcesUsingGET_parameters.page : msg.payload;
                
                getResourcesUsingGET_nodeParam = node.getResourcesUsingGET_textSearch;
                getResourcesUsingGET_nodeParamType = node.getResourcesUsingGET_textSearchType;
                if (getResourcesUsingGET_nodeParamType === 'str') {
                    getResourcesUsingGET_parameters.textSearch = getResourcesUsingGET_nodeParam || '';
                } else {
                    getResourcesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getResourcesUsingGET_nodeParam);
                }
                getResourcesUsingGET_parameters.textSearch = !!getResourcesUsingGET_parameters.textSearch ? getResourcesUsingGET_parameters.textSearch : msg.payload;
                
                getResourcesUsingGET_nodeParam = node.getResourcesUsingGET_sortProperty;
                getResourcesUsingGET_nodeParamType = node.getResourcesUsingGET_sortPropertyType;
                if (getResourcesUsingGET_nodeParamType === 'str') {
                    getResourcesUsingGET_parameters.sortProperty = getResourcesUsingGET_nodeParam || '';
                } else {
                    getResourcesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getResourcesUsingGET_nodeParam);
                }
                getResourcesUsingGET_parameters.sortProperty = !!getResourcesUsingGET_parameters.sortProperty ? getResourcesUsingGET_parameters.sortProperty : msg.payload;
                
                getResourcesUsingGET_nodeParam = node.getResourcesUsingGET_sortOrder;
                getResourcesUsingGET_nodeParamType = node.getResourcesUsingGET_sortOrderType;
                if (getResourcesUsingGET_nodeParamType === 'str') {
                    getResourcesUsingGET_parameters.sortOrder = getResourcesUsingGET_nodeParam || '';
                } else {
                    getResourcesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getResourcesUsingGET_nodeParam);
                }
                getResourcesUsingGET_parameters.sortOrder = !!getResourcesUsingGET_parameters.sortOrder ? getResourcesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getResourcesUsingGET(getResourcesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveDeviceAttributesUsingPOST') {
                var saveDeviceAttributesUsingPOST_parameters = [];
                var saveDeviceAttributesUsingPOST_nodeParam;
                var saveDeviceAttributesUsingPOST_nodeParamType;

                saveDeviceAttributesUsingPOST_nodeParam = node.saveDeviceAttributesUsingPOST_deviceId;
                saveDeviceAttributesUsingPOST_nodeParamType = node.saveDeviceAttributesUsingPOST_deviceIdType;
                if (saveDeviceAttributesUsingPOST_nodeParamType === 'str') {
                    saveDeviceAttributesUsingPOST_parameters.deviceId = saveDeviceAttributesUsingPOST_nodeParam || '';
                } else {
                    saveDeviceAttributesUsingPOST_parameters.deviceId = RED.util.getMessageProperty(msg, saveDeviceAttributesUsingPOST_nodeParam);
                }
                saveDeviceAttributesUsingPOST_parameters.deviceId = !!saveDeviceAttributesUsingPOST_parameters.deviceId ? saveDeviceAttributesUsingPOST_parameters.deviceId : msg.payload;
                
                saveDeviceAttributesUsingPOST_nodeParam = node.saveDeviceAttributesUsingPOST_scope;
                saveDeviceAttributesUsingPOST_nodeParamType = node.saveDeviceAttributesUsingPOST_scopeType;
                if (saveDeviceAttributesUsingPOST_nodeParamType === 'str') {
                    saveDeviceAttributesUsingPOST_parameters.scope = saveDeviceAttributesUsingPOST_nodeParam || '';
                } else {
                    saveDeviceAttributesUsingPOST_parameters.scope = RED.util.getMessageProperty(msg, saveDeviceAttributesUsingPOST_nodeParam);
                }
                saveDeviceAttributesUsingPOST_parameters.scope = !!saveDeviceAttributesUsingPOST_parameters.scope ? saveDeviceAttributesUsingPOST_parameters.scope : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveDeviceAttributesUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveDeviceAttributesUsingPOST(saveDeviceAttributesUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'deleteDeviceAttributesUsingDELETE') {
                var deleteDeviceAttributesUsingDELETE_parameters = [];
                var deleteDeviceAttributesUsingDELETE_nodeParam;
                var deleteDeviceAttributesUsingDELETE_nodeParamType;

                deleteDeviceAttributesUsingDELETE_nodeParam = node.deleteDeviceAttributesUsingDELETE_deviceId;
                deleteDeviceAttributesUsingDELETE_nodeParamType = node.deleteDeviceAttributesUsingDELETE_deviceIdType;
                if (deleteDeviceAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceAttributesUsingDELETE_parameters.deviceId = deleteDeviceAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceAttributesUsingDELETE_parameters.deviceId = RED.util.getMessageProperty(msg, deleteDeviceAttributesUsingDELETE_nodeParam);
                }
                deleteDeviceAttributesUsingDELETE_parameters.deviceId = !!deleteDeviceAttributesUsingDELETE_parameters.deviceId ? deleteDeviceAttributesUsingDELETE_parameters.deviceId : msg.payload;
                
                deleteDeviceAttributesUsingDELETE_nodeParam = node.deleteDeviceAttributesUsingDELETE_scope;
                deleteDeviceAttributesUsingDELETE_nodeParamType = node.deleteDeviceAttributesUsingDELETE_scopeType;
                if (deleteDeviceAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceAttributesUsingDELETE_parameters.scope = deleteDeviceAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceAttributesUsingDELETE_parameters.scope = RED.util.getMessageProperty(msg, deleteDeviceAttributesUsingDELETE_nodeParam);
                }
                deleteDeviceAttributesUsingDELETE_parameters.scope = !!deleteDeviceAttributesUsingDELETE_parameters.scope ? deleteDeviceAttributesUsingDELETE_parameters.scope : msg.payload;
                
                deleteDeviceAttributesUsingDELETE_nodeParam = node.deleteDeviceAttributesUsingDELETE_keys;
                deleteDeviceAttributesUsingDELETE_nodeParamType = node.deleteDeviceAttributesUsingDELETE_keysType;
                if (deleteDeviceAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteDeviceAttributesUsingDELETE_parameters.keys = deleteDeviceAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteDeviceAttributesUsingDELETE_parameters.keys = RED.util.getMessageProperty(msg, deleteDeviceAttributesUsingDELETE_nodeParam);
                }
                deleteDeviceAttributesUsingDELETE_parameters.keys = !!deleteDeviceAttributesUsingDELETE_parameters.keys ? deleteDeviceAttributesUsingDELETE_parameters.keys : msg.payload;
                                result = client.deleteDeviceAttributesUsingDELETE(deleteDeviceAttributesUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityAttributesV2UsingPOST') {
                var saveEntityAttributesV2UsingPOST_parameters = [];
                var saveEntityAttributesV2UsingPOST_nodeParam;
                var saveEntityAttributesV2UsingPOST_nodeParamType;

                saveEntityAttributesV2UsingPOST_nodeParam = node.saveEntityAttributesV2UsingPOST_entityType;
                saveEntityAttributesV2UsingPOST_nodeParamType = node.saveEntityAttributesV2UsingPOST_entityTypeType;
                if (saveEntityAttributesV2UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV2UsingPOST_parameters.entityType = saveEntityAttributesV2UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV2UsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, saveEntityAttributesV2UsingPOST_nodeParam);
                }
                saveEntityAttributesV2UsingPOST_parameters.entityType = !!saveEntityAttributesV2UsingPOST_parameters.entityType ? saveEntityAttributesV2UsingPOST_parameters.entityType : msg.payload;
                
                saveEntityAttributesV2UsingPOST_nodeParam = node.saveEntityAttributesV2UsingPOST_entityId;
                saveEntityAttributesV2UsingPOST_nodeParamType = node.saveEntityAttributesV2UsingPOST_entityIdType;
                if (saveEntityAttributesV2UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV2UsingPOST_parameters.entityId = saveEntityAttributesV2UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV2UsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, saveEntityAttributesV2UsingPOST_nodeParam);
                }
                saveEntityAttributesV2UsingPOST_parameters.entityId = !!saveEntityAttributesV2UsingPOST_parameters.entityId ? saveEntityAttributesV2UsingPOST_parameters.entityId : msg.payload;
                
                saveEntityAttributesV2UsingPOST_nodeParam = node.saveEntityAttributesV2UsingPOST_scope;
                saveEntityAttributesV2UsingPOST_nodeParamType = node.saveEntityAttributesV2UsingPOST_scopeType;
                if (saveEntityAttributesV2UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV2UsingPOST_parameters.scope = saveEntityAttributesV2UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV2UsingPOST_parameters.scope = RED.util.getMessageProperty(msg, saveEntityAttributesV2UsingPOST_nodeParam);
                }
                saveEntityAttributesV2UsingPOST_parameters.scope = !!saveEntityAttributesV2UsingPOST_parameters.scope ? saveEntityAttributesV2UsingPOST_parameters.scope : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEntityAttributesV2UsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityAttributesV2UsingPOST(saveEntityAttributesV2UsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAttributeKeysUsingGET') {
                var getAttributeKeysUsingGET_parameters = [];
                var getAttributeKeysUsingGET_nodeParam;
                var getAttributeKeysUsingGET_nodeParamType;

                getAttributeKeysUsingGET_nodeParam = node.getAttributeKeysUsingGET_entityType;
                getAttributeKeysUsingGET_nodeParamType = node.getAttributeKeysUsingGET_entityTypeType;
                if (getAttributeKeysUsingGET_nodeParamType === 'str') {
                    getAttributeKeysUsingGET_parameters.entityType = getAttributeKeysUsingGET_nodeParam || '';
                } else {
                    getAttributeKeysUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAttributeKeysUsingGET_nodeParam);
                }
                getAttributeKeysUsingGET_parameters.entityType = !!getAttributeKeysUsingGET_parameters.entityType ? getAttributeKeysUsingGET_parameters.entityType : msg.payload;
                
                getAttributeKeysUsingGET_nodeParam = node.getAttributeKeysUsingGET_entityId;
                getAttributeKeysUsingGET_nodeParamType = node.getAttributeKeysUsingGET_entityIdType;
                if (getAttributeKeysUsingGET_nodeParamType === 'str') {
                    getAttributeKeysUsingGET_parameters.entityId = getAttributeKeysUsingGET_nodeParam || '';
                } else {
                    getAttributeKeysUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAttributeKeysUsingGET_nodeParam);
                }
                getAttributeKeysUsingGET_parameters.entityId = !!getAttributeKeysUsingGET_parameters.entityId ? getAttributeKeysUsingGET_parameters.entityId : msg.payload;
                                result = client.getAttributeKeysUsingGET(getAttributeKeysUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAttributeKeysByScopeUsingGET') {
                var getAttributeKeysByScopeUsingGET_parameters = [];
                var getAttributeKeysByScopeUsingGET_nodeParam;
                var getAttributeKeysByScopeUsingGET_nodeParamType;

                getAttributeKeysByScopeUsingGET_nodeParam = node.getAttributeKeysByScopeUsingGET_entityType;
                getAttributeKeysByScopeUsingGET_nodeParamType = node.getAttributeKeysByScopeUsingGET_entityTypeType;
                if (getAttributeKeysByScopeUsingGET_nodeParamType === 'str') {
                    getAttributeKeysByScopeUsingGET_parameters.entityType = getAttributeKeysByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributeKeysByScopeUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAttributeKeysByScopeUsingGET_nodeParam);
                }
                getAttributeKeysByScopeUsingGET_parameters.entityType = !!getAttributeKeysByScopeUsingGET_parameters.entityType ? getAttributeKeysByScopeUsingGET_parameters.entityType : msg.payload;
                
                getAttributeKeysByScopeUsingGET_nodeParam = node.getAttributeKeysByScopeUsingGET_entityId;
                getAttributeKeysByScopeUsingGET_nodeParamType = node.getAttributeKeysByScopeUsingGET_entityIdType;
                if (getAttributeKeysByScopeUsingGET_nodeParamType === 'str') {
                    getAttributeKeysByScopeUsingGET_parameters.entityId = getAttributeKeysByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributeKeysByScopeUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAttributeKeysByScopeUsingGET_nodeParam);
                }
                getAttributeKeysByScopeUsingGET_parameters.entityId = !!getAttributeKeysByScopeUsingGET_parameters.entityId ? getAttributeKeysByScopeUsingGET_parameters.entityId : msg.payload;
                
                getAttributeKeysByScopeUsingGET_nodeParam = node.getAttributeKeysByScopeUsingGET_scope;
                getAttributeKeysByScopeUsingGET_nodeParamType = node.getAttributeKeysByScopeUsingGET_scopeType;
                if (getAttributeKeysByScopeUsingGET_nodeParamType === 'str') {
                    getAttributeKeysByScopeUsingGET_parameters.scope = getAttributeKeysByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributeKeysByScopeUsingGET_parameters.scope = RED.util.getMessageProperty(msg, getAttributeKeysByScopeUsingGET_nodeParam);
                }
                getAttributeKeysByScopeUsingGET_parameters.scope = !!getAttributeKeysByScopeUsingGET_parameters.scope ? getAttributeKeysByScopeUsingGET_parameters.scope : msg.payload;
                                result = client.getAttributeKeysByScopeUsingGET(getAttributeKeysByScopeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTimeseriesKeysUsingGET_1') {
                var getTimeseriesKeysUsingGET_1_parameters = [];
                var getTimeseriesKeysUsingGET_1_nodeParam;
                var getTimeseriesKeysUsingGET_1_nodeParamType;

                getTimeseriesKeysUsingGET_1_nodeParam = node.getTimeseriesKeysUsingGET_1_entityType;
                getTimeseriesKeysUsingGET_1_nodeParamType = node.getTimeseriesKeysUsingGET_1_entityTypeType;
                if (getTimeseriesKeysUsingGET_1_nodeParamType === 'str') {
                    getTimeseriesKeysUsingGET_1_parameters.entityType = getTimeseriesKeysUsingGET_1_nodeParam || '';
                } else {
                    getTimeseriesKeysUsingGET_1_parameters.entityType = RED.util.getMessageProperty(msg, getTimeseriesKeysUsingGET_1_nodeParam);
                }
                getTimeseriesKeysUsingGET_1_parameters.entityType = !!getTimeseriesKeysUsingGET_1_parameters.entityType ? getTimeseriesKeysUsingGET_1_parameters.entityType : msg.payload;
                
                getTimeseriesKeysUsingGET_1_nodeParam = node.getTimeseriesKeysUsingGET_1_entityId;
                getTimeseriesKeysUsingGET_1_nodeParamType = node.getTimeseriesKeysUsingGET_1_entityIdType;
                if (getTimeseriesKeysUsingGET_1_nodeParamType === 'str') {
                    getTimeseriesKeysUsingGET_1_parameters.entityId = getTimeseriesKeysUsingGET_1_nodeParam || '';
                } else {
                    getTimeseriesKeysUsingGET_1_parameters.entityId = RED.util.getMessageProperty(msg, getTimeseriesKeysUsingGET_1_nodeParam);
                }
                getTimeseriesKeysUsingGET_1_parameters.entityId = !!getTimeseriesKeysUsingGET_1_parameters.entityId ? getTimeseriesKeysUsingGET_1_parameters.entityId : msg.payload;
                                result = client.getTimeseriesKeysUsingGET_1(getTimeseriesKeysUsingGET_1_parameters);
            }
            if (!errorFlag && node.method === 'deleteEntityTimeseriesUsingDELETE') {
                var deleteEntityTimeseriesUsingDELETE_parameters = [];
                var deleteEntityTimeseriesUsingDELETE_nodeParam;
                var deleteEntityTimeseriesUsingDELETE_nodeParamType;

                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_entityType;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_entityTypeType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.entityType = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.entityType = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.entityType = !!deleteEntityTimeseriesUsingDELETE_parameters.entityType ? deleteEntityTimeseriesUsingDELETE_parameters.entityType : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_entityId;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_entityIdType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.entityId = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.entityId = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.entityId = !!deleteEntityTimeseriesUsingDELETE_parameters.entityId ? deleteEntityTimeseriesUsingDELETE_parameters.entityId : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_keys;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_keysType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.keys = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.keys = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.keys = !!deleteEntityTimeseriesUsingDELETE_parameters.keys ? deleteEntityTimeseriesUsingDELETE_parameters.keys : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeys;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeysType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.deleteAllDataForKeys = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.deleteAllDataForKeys = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.deleteAllDataForKeys = !!deleteEntityTimeseriesUsingDELETE_parameters.deleteAllDataForKeys ? deleteEntityTimeseriesUsingDELETE_parameters.deleteAllDataForKeys : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_startTs;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_startTsType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.startTs = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.startTs = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.startTs = !!deleteEntityTimeseriesUsingDELETE_parameters.startTs ? deleteEntityTimeseriesUsingDELETE_parameters.startTs : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_endTs;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_endTsType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.endTs = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.endTs = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.endTs = !!deleteEntityTimeseriesUsingDELETE_parameters.endTs ? deleteEntityTimeseriesUsingDELETE_parameters.endTs : msg.payload;
                
                deleteEntityTimeseriesUsingDELETE_nodeParam = node.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeleted;
                deleteEntityTimeseriesUsingDELETE_nodeParamType = node.deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeletedType;
                if (deleteEntityTimeseriesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityTimeseriesUsingDELETE_parameters.rewriteLatestIfDeleted = deleteEntityTimeseriesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityTimeseriesUsingDELETE_parameters.rewriteLatestIfDeleted = RED.util.getMessageProperty(msg, deleteEntityTimeseriesUsingDELETE_nodeParam);
                }
                deleteEntityTimeseriesUsingDELETE_parameters.rewriteLatestIfDeleted = !!deleteEntityTimeseriesUsingDELETE_parameters.rewriteLatestIfDeleted ? deleteEntityTimeseriesUsingDELETE_parameters.rewriteLatestIfDeleted : msg.payload;
                                result = client.deleteEntityTimeseriesUsingDELETE(deleteEntityTimeseriesUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityTelemetryWithTTLUsingPOST') {
                var saveEntityTelemetryWithTTLUsingPOST_parameters = [];
                var saveEntityTelemetryWithTTLUsingPOST_nodeParam;
                var saveEntityTelemetryWithTTLUsingPOST_nodeParamType;

                saveEntityTelemetryWithTTLUsingPOST_nodeParam = node.saveEntityTelemetryWithTTLUsingPOST_entityType;
                saveEntityTelemetryWithTTLUsingPOST_nodeParamType = node.saveEntityTelemetryWithTTLUsingPOST_entityTypeType;
                if (saveEntityTelemetryWithTTLUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.entityType = saveEntityTelemetryWithTTLUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, saveEntityTelemetryWithTTLUsingPOST_nodeParam);
                }
                saveEntityTelemetryWithTTLUsingPOST_parameters.entityType = !!saveEntityTelemetryWithTTLUsingPOST_parameters.entityType ? saveEntityTelemetryWithTTLUsingPOST_parameters.entityType : msg.payload;
                
                saveEntityTelemetryWithTTLUsingPOST_nodeParam = node.saveEntityTelemetryWithTTLUsingPOST_entityId;
                saveEntityTelemetryWithTTLUsingPOST_nodeParamType = node.saveEntityTelemetryWithTTLUsingPOST_entityIdType;
                if (saveEntityTelemetryWithTTLUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.entityId = saveEntityTelemetryWithTTLUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, saveEntityTelemetryWithTTLUsingPOST_nodeParam);
                }
                saveEntityTelemetryWithTTLUsingPOST_parameters.entityId = !!saveEntityTelemetryWithTTLUsingPOST_parameters.entityId ? saveEntityTelemetryWithTTLUsingPOST_parameters.entityId : msg.payload;
                
                saveEntityTelemetryWithTTLUsingPOST_nodeParam = node.saveEntityTelemetryWithTTLUsingPOST_scope;
                saveEntityTelemetryWithTTLUsingPOST_nodeParamType = node.saveEntityTelemetryWithTTLUsingPOST_scopeType;
                if (saveEntityTelemetryWithTTLUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.scope = saveEntityTelemetryWithTTLUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.scope = RED.util.getMessageProperty(msg, saveEntityTelemetryWithTTLUsingPOST_nodeParam);
                }
                saveEntityTelemetryWithTTLUsingPOST_parameters.scope = !!saveEntityTelemetryWithTTLUsingPOST_parameters.scope ? saveEntityTelemetryWithTTLUsingPOST_parameters.scope : msg.payload;
                
                saveEntityTelemetryWithTTLUsingPOST_nodeParam = node.saveEntityTelemetryWithTTLUsingPOST_ttl;
                saveEntityTelemetryWithTTLUsingPOST_nodeParamType = node.saveEntityTelemetryWithTTLUsingPOST_ttlType;
                if (saveEntityTelemetryWithTTLUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.ttl = saveEntityTelemetryWithTTLUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.ttl = RED.util.getMessageProperty(msg, saveEntityTelemetryWithTTLUsingPOST_nodeParam);
                }
                saveEntityTelemetryWithTTLUsingPOST_parameters.ttl = !!saveEntityTelemetryWithTTLUsingPOST_parameters.ttl ? saveEntityTelemetryWithTTLUsingPOST_parameters.ttl : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEntityTelemetryWithTTLUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityTelemetryWithTTLUsingPOST(saveEntityTelemetryWithTTLUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityTelemetryUsingPOST') {
                var saveEntityTelemetryUsingPOST_parameters = [];
                var saveEntityTelemetryUsingPOST_nodeParam;
                var saveEntityTelemetryUsingPOST_nodeParamType;

                saveEntityTelemetryUsingPOST_nodeParam = node.saveEntityTelemetryUsingPOST_entityType;
                saveEntityTelemetryUsingPOST_nodeParamType = node.saveEntityTelemetryUsingPOST_entityTypeType;
                if (saveEntityTelemetryUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryUsingPOST_parameters.entityType = saveEntityTelemetryUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryUsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, saveEntityTelemetryUsingPOST_nodeParam);
                }
                saveEntityTelemetryUsingPOST_parameters.entityType = !!saveEntityTelemetryUsingPOST_parameters.entityType ? saveEntityTelemetryUsingPOST_parameters.entityType : msg.payload;
                
                saveEntityTelemetryUsingPOST_nodeParam = node.saveEntityTelemetryUsingPOST_entityId;
                saveEntityTelemetryUsingPOST_nodeParamType = node.saveEntityTelemetryUsingPOST_entityIdType;
                if (saveEntityTelemetryUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryUsingPOST_parameters.entityId = saveEntityTelemetryUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryUsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, saveEntityTelemetryUsingPOST_nodeParam);
                }
                saveEntityTelemetryUsingPOST_parameters.entityId = !!saveEntityTelemetryUsingPOST_parameters.entityId ? saveEntityTelemetryUsingPOST_parameters.entityId : msg.payload;
                
                saveEntityTelemetryUsingPOST_nodeParam = node.saveEntityTelemetryUsingPOST_scope;
                saveEntityTelemetryUsingPOST_nodeParamType = node.saveEntityTelemetryUsingPOST_scopeType;
                if (saveEntityTelemetryUsingPOST_nodeParamType === 'str') {
                    saveEntityTelemetryUsingPOST_parameters.scope = saveEntityTelemetryUsingPOST_nodeParam || '';
                } else {
                    saveEntityTelemetryUsingPOST_parameters.scope = RED.util.getMessageProperty(msg, saveEntityTelemetryUsingPOST_nodeParam);
                }
                saveEntityTelemetryUsingPOST_parameters.scope = !!saveEntityTelemetryUsingPOST_parameters.scope ? saveEntityTelemetryUsingPOST_parameters.scope : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEntityTelemetryUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityTelemetryUsingPOST(saveEntityTelemetryUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAttributesByScopeUsingGET') {
                var getAttributesByScopeUsingGET_parameters = [];
                var getAttributesByScopeUsingGET_nodeParam;
                var getAttributesByScopeUsingGET_nodeParamType;

                getAttributesByScopeUsingGET_nodeParam = node.getAttributesByScopeUsingGET_entityType;
                getAttributesByScopeUsingGET_nodeParamType = node.getAttributesByScopeUsingGET_entityTypeType;
                if (getAttributesByScopeUsingGET_nodeParamType === 'str') {
                    getAttributesByScopeUsingGET_parameters.entityType = getAttributesByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributesByScopeUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAttributesByScopeUsingGET_nodeParam);
                }
                getAttributesByScopeUsingGET_parameters.entityType = !!getAttributesByScopeUsingGET_parameters.entityType ? getAttributesByScopeUsingGET_parameters.entityType : msg.payload;
                
                getAttributesByScopeUsingGET_nodeParam = node.getAttributesByScopeUsingGET_entityId;
                getAttributesByScopeUsingGET_nodeParamType = node.getAttributesByScopeUsingGET_entityIdType;
                if (getAttributesByScopeUsingGET_nodeParamType === 'str') {
                    getAttributesByScopeUsingGET_parameters.entityId = getAttributesByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributesByScopeUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAttributesByScopeUsingGET_nodeParam);
                }
                getAttributesByScopeUsingGET_parameters.entityId = !!getAttributesByScopeUsingGET_parameters.entityId ? getAttributesByScopeUsingGET_parameters.entityId : msg.payload;
                
                getAttributesByScopeUsingGET_nodeParam = node.getAttributesByScopeUsingGET_scope;
                getAttributesByScopeUsingGET_nodeParamType = node.getAttributesByScopeUsingGET_scopeType;
                if (getAttributesByScopeUsingGET_nodeParamType === 'str') {
                    getAttributesByScopeUsingGET_parameters.scope = getAttributesByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributesByScopeUsingGET_parameters.scope = RED.util.getMessageProperty(msg, getAttributesByScopeUsingGET_nodeParam);
                }
                getAttributesByScopeUsingGET_parameters.scope = !!getAttributesByScopeUsingGET_parameters.scope ? getAttributesByScopeUsingGET_parameters.scope : msg.payload;
                
                getAttributesByScopeUsingGET_nodeParam = node.getAttributesByScopeUsingGET_keys;
                getAttributesByScopeUsingGET_nodeParamType = node.getAttributesByScopeUsingGET_keysType;
                if (getAttributesByScopeUsingGET_nodeParamType === 'str') {
                    getAttributesByScopeUsingGET_parameters.keys = getAttributesByScopeUsingGET_nodeParam || '';
                } else {
                    getAttributesByScopeUsingGET_parameters.keys = RED.util.getMessageProperty(msg, getAttributesByScopeUsingGET_nodeParam);
                }
                getAttributesByScopeUsingGET_parameters.keys = !!getAttributesByScopeUsingGET_parameters.keys ? getAttributesByScopeUsingGET_parameters.keys : msg.payload;
                                result = client.getAttributesByScopeUsingGET(getAttributesByScopeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAttributesUsingGET') {
                var getAttributesUsingGET_parameters = [];
                var getAttributesUsingGET_nodeParam;
                var getAttributesUsingGET_nodeParamType;

                getAttributesUsingGET_nodeParam = node.getAttributesUsingGET_entityType;
                getAttributesUsingGET_nodeParamType = node.getAttributesUsingGET_entityTypeType;
                if (getAttributesUsingGET_nodeParamType === 'str') {
                    getAttributesUsingGET_parameters.entityType = getAttributesUsingGET_nodeParam || '';
                } else {
                    getAttributesUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getAttributesUsingGET_nodeParam);
                }
                getAttributesUsingGET_parameters.entityType = !!getAttributesUsingGET_parameters.entityType ? getAttributesUsingGET_parameters.entityType : msg.payload;
                
                getAttributesUsingGET_nodeParam = node.getAttributesUsingGET_entityId;
                getAttributesUsingGET_nodeParamType = node.getAttributesUsingGET_entityIdType;
                if (getAttributesUsingGET_nodeParamType === 'str') {
                    getAttributesUsingGET_parameters.entityId = getAttributesUsingGET_nodeParam || '';
                } else {
                    getAttributesUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getAttributesUsingGET_nodeParam);
                }
                getAttributesUsingGET_parameters.entityId = !!getAttributesUsingGET_parameters.entityId ? getAttributesUsingGET_parameters.entityId : msg.payload;
                
                getAttributesUsingGET_nodeParam = node.getAttributesUsingGET_keys;
                getAttributesUsingGET_nodeParamType = node.getAttributesUsingGET_keysType;
                if (getAttributesUsingGET_nodeParamType === 'str') {
                    getAttributesUsingGET_parameters.keys = getAttributesUsingGET_nodeParam || '';
                } else {
                    getAttributesUsingGET_parameters.keys = RED.util.getMessageProperty(msg, getAttributesUsingGET_nodeParam);
                }
                getAttributesUsingGET_parameters.keys = !!getAttributesUsingGET_parameters.keys ? getAttributesUsingGET_parameters.keys : msg.payload;
                                result = client.getAttributesUsingGET(getAttributesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTimeseriesUsingGET') {
                var getTimeseriesUsingGET_parameters = [];
                var getTimeseriesUsingGET_nodeParam;
                var getTimeseriesUsingGET_nodeParamType;

                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_entityType;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_entityTypeType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.entityType = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.entityType = !!getTimeseriesUsingGET_parameters.entityType ? getTimeseriesUsingGET_parameters.entityType : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_entityId;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_entityIdType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.entityId = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.entityId = !!getTimeseriesUsingGET_parameters.entityId ? getTimeseriesUsingGET_parameters.entityId : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_keys;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_keysType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.keys = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.keys = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.keys = !!getTimeseriesUsingGET_parameters.keys ? getTimeseriesUsingGET_parameters.keys : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_startTs;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_startTsType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.startTs = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.startTs = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.startTs = !!getTimeseriesUsingGET_parameters.startTs ? getTimeseriesUsingGET_parameters.startTs : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_endTs;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_endTsType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.endTs = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.endTs = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.endTs = !!getTimeseriesUsingGET_parameters.endTs ? getTimeseriesUsingGET_parameters.endTs : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_interval;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_intervalType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.interval = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.interval = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.interval = !!getTimeseriesUsingGET_parameters.interval ? getTimeseriesUsingGET_parameters.interval : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_limit;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_limitType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.limit = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.limit = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.limit = !!getTimeseriesUsingGET_parameters.limit ? getTimeseriesUsingGET_parameters.limit : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_agg;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_aggType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.agg = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.agg = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.agg = !!getTimeseriesUsingGET_parameters.agg ? getTimeseriesUsingGET_parameters.agg : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_orderBy;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_orderByType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.orderBy = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.orderBy = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.orderBy = !!getTimeseriesUsingGET_parameters.orderBy ? getTimeseriesUsingGET_parameters.orderBy : msg.payload;
                
                getTimeseriesUsingGET_nodeParam = node.getTimeseriesUsingGET_useStrictDataTypes;
                getTimeseriesUsingGET_nodeParamType = node.getTimeseriesUsingGET_useStrictDataTypesType;
                if (getTimeseriesUsingGET_nodeParamType === 'str') {
                    getTimeseriesUsingGET_parameters.useStrictDataTypes = getTimeseriesUsingGET_nodeParam || '';
                } else {
                    getTimeseriesUsingGET_parameters.useStrictDataTypes = RED.util.getMessageProperty(msg, getTimeseriesUsingGET_nodeParam);
                }
                getTimeseriesUsingGET_parameters.useStrictDataTypes = !!getTimeseriesUsingGET_parameters.useStrictDataTypes ? getTimeseriesUsingGET_parameters.useStrictDataTypes : msg.payload;
                                result = client.getTimeseriesUsingGET(getTimeseriesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLatestTimeseriesUsingGET') {
                var getLatestTimeseriesUsingGET_parameters = [];
                var getLatestTimeseriesUsingGET_nodeParam;
                var getLatestTimeseriesUsingGET_nodeParamType;

                getLatestTimeseriesUsingGET_nodeParam = node.getLatestTimeseriesUsingGET_entityType;
                getLatestTimeseriesUsingGET_nodeParamType = node.getLatestTimeseriesUsingGET_entityTypeType;
                if (getLatestTimeseriesUsingGET_nodeParamType === 'str') {
                    getLatestTimeseriesUsingGET_parameters.entityType = getLatestTimeseriesUsingGET_nodeParam || '';
                } else {
                    getLatestTimeseriesUsingGET_parameters.entityType = RED.util.getMessageProperty(msg, getLatestTimeseriesUsingGET_nodeParam);
                }
                getLatestTimeseriesUsingGET_parameters.entityType = !!getLatestTimeseriesUsingGET_parameters.entityType ? getLatestTimeseriesUsingGET_parameters.entityType : msg.payload;
                
                getLatestTimeseriesUsingGET_nodeParam = node.getLatestTimeseriesUsingGET_entityId;
                getLatestTimeseriesUsingGET_nodeParamType = node.getLatestTimeseriesUsingGET_entityIdType;
                if (getLatestTimeseriesUsingGET_nodeParamType === 'str') {
                    getLatestTimeseriesUsingGET_parameters.entityId = getLatestTimeseriesUsingGET_nodeParam || '';
                } else {
                    getLatestTimeseriesUsingGET_parameters.entityId = RED.util.getMessageProperty(msg, getLatestTimeseriesUsingGET_nodeParam);
                }
                getLatestTimeseriesUsingGET_parameters.entityId = !!getLatestTimeseriesUsingGET_parameters.entityId ? getLatestTimeseriesUsingGET_parameters.entityId : msg.payload;
                
                getLatestTimeseriesUsingGET_nodeParam = node.getLatestTimeseriesUsingGET_keys;
                getLatestTimeseriesUsingGET_nodeParamType = node.getLatestTimeseriesUsingGET_keysType;
                if (getLatestTimeseriesUsingGET_nodeParamType === 'str') {
                    getLatestTimeseriesUsingGET_parameters.keys = getLatestTimeseriesUsingGET_nodeParam || '';
                } else {
                    getLatestTimeseriesUsingGET_parameters.keys = RED.util.getMessageProperty(msg, getLatestTimeseriesUsingGET_nodeParam);
                }
                getLatestTimeseriesUsingGET_parameters.keys = !!getLatestTimeseriesUsingGET_parameters.keys ? getLatestTimeseriesUsingGET_parameters.keys : msg.payload;
                
                getLatestTimeseriesUsingGET_nodeParam = node.getLatestTimeseriesUsingGET_useStrictDataTypes;
                getLatestTimeseriesUsingGET_nodeParamType = node.getLatestTimeseriesUsingGET_useStrictDataTypesType;
                if (getLatestTimeseriesUsingGET_nodeParamType === 'str') {
                    getLatestTimeseriesUsingGET_parameters.useStrictDataTypes = getLatestTimeseriesUsingGET_nodeParam || '';
                } else {
                    getLatestTimeseriesUsingGET_parameters.useStrictDataTypes = RED.util.getMessageProperty(msg, getLatestTimeseriesUsingGET_nodeParam);
                }
                getLatestTimeseriesUsingGET_parameters.useStrictDataTypes = !!getLatestTimeseriesUsingGET_parameters.useStrictDataTypes ? getLatestTimeseriesUsingGET_parameters.useStrictDataTypes : msg.payload;
                                result = client.getLatestTimeseriesUsingGET(getLatestTimeseriesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveEntityAttributesV1UsingPOST') {
                var saveEntityAttributesV1UsingPOST_parameters = [];
                var saveEntityAttributesV1UsingPOST_nodeParam;
                var saveEntityAttributesV1UsingPOST_nodeParamType;

                saveEntityAttributesV1UsingPOST_nodeParam = node.saveEntityAttributesV1UsingPOST_entityType;
                saveEntityAttributesV1UsingPOST_nodeParamType = node.saveEntityAttributesV1UsingPOST_entityTypeType;
                if (saveEntityAttributesV1UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV1UsingPOST_parameters.entityType = saveEntityAttributesV1UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV1UsingPOST_parameters.entityType = RED.util.getMessageProperty(msg, saveEntityAttributesV1UsingPOST_nodeParam);
                }
                saveEntityAttributesV1UsingPOST_parameters.entityType = !!saveEntityAttributesV1UsingPOST_parameters.entityType ? saveEntityAttributesV1UsingPOST_parameters.entityType : msg.payload;
                
                saveEntityAttributesV1UsingPOST_nodeParam = node.saveEntityAttributesV1UsingPOST_entityId;
                saveEntityAttributesV1UsingPOST_nodeParamType = node.saveEntityAttributesV1UsingPOST_entityIdType;
                if (saveEntityAttributesV1UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV1UsingPOST_parameters.entityId = saveEntityAttributesV1UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV1UsingPOST_parameters.entityId = RED.util.getMessageProperty(msg, saveEntityAttributesV1UsingPOST_nodeParam);
                }
                saveEntityAttributesV1UsingPOST_parameters.entityId = !!saveEntityAttributesV1UsingPOST_parameters.entityId ? saveEntityAttributesV1UsingPOST_parameters.entityId : msg.payload;
                
                saveEntityAttributesV1UsingPOST_nodeParam = node.saveEntityAttributesV1UsingPOST_scope;
                saveEntityAttributesV1UsingPOST_nodeParamType = node.saveEntityAttributesV1UsingPOST_scopeType;
                if (saveEntityAttributesV1UsingPOST_nodeParamType === 'str') {
                    saveEntityAttributesV1UsingPOST_parameters.scope = saveEntityAttributesV1UsingPOST_nodeParam || '';
                } else {
                    saveEntityAttributesV1UsingPOST_parameters.scope = RED.util.getMessageProperty(msg, saveEntityAttributesV1UsingPOST_nodeParam);
                }
                saveEntityAttributesV1UsingPOST_parameters.scope = !!saveEntityAttributesV1UsingPOST_parameters.scope ? saveEntityAttributesV1UsingPOST_parameters.scope : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveEntityAttributesV1UsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveEntityAttributesV1UsingPOST(saveEntityAttributesV1UsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'deleteEntityAttributesUsingDELETE') {
                var deleteEntityAttributesUsingDELETE_parameters = [];
                var deleteEntityAttributesUsingDELETE_nodeParam;
                var deleteEntityAttributesUsingDELETE_nodeParamType;

                deleteEntityAttributesUsingDELETE_nodeParam = node.deleteEntityAttributesUsingDELETE_entityType;
                deleteEntityAttributesUsingDELETE_nodeParamType = node.deleteEntityAttributesUsingDELETE_entityTypeType;
                if (deleteEntityAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityAttributesUsingDELETE_parameters.entityType = deleteEntityAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityAttributesUsingDELETE_parameters.entityType = RED.util.getMessageProperty(msg, deleteEntityAttributesUsingDELETE_nodeParam);
                }
                deleteEntityAttributesUsingDELETE_parameters.entityType = !!deleteEntityAttributesUsingDELETE_parameters.entityType ? deleteEntityAttributesUsingDELETE_parameters.entityType : msg.payload;
                
                deleteEntityAttributesUsingDELETE_nodeParam = node.deleteEntityAttributesUsingDELETE_entityId;
                deleteEntityAttributesUsingDELETE_nodeParamType = node.deleteEntityAttributesUsingDELETE_entityIdType;
                if (deleteEntityAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityAttributesUsingDELETE_parameters.entityId = deleteEntityAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityAttributesUsingDELETE_parameters.entityId = RED.util.getMessageProperty(msg, deleteEntityAttributesUsingDELETE_nodeParam);
                }
                deleteEntityAttributesUsingDELETE_parameters.entityId = !!deleteEntityAttributesUsingDELETE_parameters.entityId ? deleteEntityAttributesUsingDELETE_parameters.entityId : msg.payload;
                
                deleteEntityAttributesUsingDELETE_nodeParam = node.deleteEntityAttributesUsingDELETE_scope;
                deleteEntityAttributesUsingDELETE_nodeParamType = node.deleteEntityAttributesUsingDELETE_scopeType;
                if (deleteEntityAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityAttributesUsingDELETE_parameters.scope = deleteEntityAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityAttributesUsingDELETE_parameters.scope = RED.util.getMessageProperty(msg, deleteEntityAttributesUsingDELETE_nodeParam);
                }
                deleteEntityAttributesUsingDELETE_parameters.scope = !!deleteEntityAttributesUsingDELETE_parameters.scope ? deleteEntityAttributesUsingDELETE_parameters.scope : msg.payload;
                
                deleteEntityAttributesUsingDELETE_nodeParam = node.deleteEntityAttributesUsingDELETE_keys;
                deleteEntityAttributesUsingDELETE_nodeParamType = node.deleteEntityAttributesUsingDELETE_keysType;
                if (deleteEntityAttributesUsingDELETE_nodeParamType === 'str') {
                    deleteEntityAttributesUsingDELETE_parameters.keys = deleteEntityAttributesUsingDELETE_nodeParam || '';
                } else {
                    deleteEntityAttributesUsingDELETE_parameters.keys = RED.util.getMessageProperty(msg, deleteEntityAttributesUsingDELETE_nodeParam);
                }
                deleteEntityAttributesUsingDELETE_parameters.keys = !!deleteEntityAttributesUsingDELETE_parameters.keys ? deleteEntityAttributesUsingDELETE_parameters.keys : msg.payload;
                                result = client.deleteEntityAttributesUsingDELETE(deleteEntityAttributesUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'saveTenantUsingPOST') {
                var saveTenantUsingPOST_parameters = [];
                var saveTenantUsingPOST_nodeParam;
                var saveTenantUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveTenantUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveTenantUsingPOST(saveTenantUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantInfoByIdUsingGET') {
                var getTenantInfoByIdUsingGET_parameters = [];
                var getTenantInfoByIdUsingGET_nodeParam;
                var getTenantInfoByIdUsingGET_nodeParamType;

                getTenantInfoByIdUsingGET_nodeParam = node.getTenantInfoByIdUsingGET_tenantId;
                getTenantInfoByIdUsingGET_nodeParamType = node.getTenantInfoByIdUsingGET_tenantIdType;
                if (getTenantInfoByIdUsingGET_nodeParamType === 'str') {
                    getTenantInfoByIdUsingGET_parameters.tenantId = getTenantInfoByIdUsingGET_nodeParam || '';
                } else {
                    getTenantInfoByIdUsingGET_parameters.tenantId = RED.util.getMessageProperty(msg, getTenantInfoByIdUsingGET_nodeParam);
                }
                getTenantInfoByIdUsingGET_parameters.tenantId = !!getTenantInfoByIdUsingGET_parameters.tenantId ? getTenantInfoByIdUsingGET_parameters.tenantId : msg.payload;
                                result = client.getTenantInfoByIdUsingGET(getTenantInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantByIdUsingGET') {
                var getTenantByIdUsingGET_parameters = [];
                var getTenantByIdUsingGET_nodeParam;
                var getTenantByIdUsingGET_nodeParamType;

                getTenantByIdUsingGET_nodeParam = node.getTenantByIdUsingGET_tenantId;
                getTenantByIdUsingGET_nodeParamType = node.getTenantByIdUsingGET_tenantIdType;
                if (getTenantByIdUsingGET_nodeParamType === 'str') {
                    getTenantByIdUsingGET_parameters.tenantId = getTenantByIdUsingGET_nodeParam || '';
                } else {
                    getTenantByIdUsingGET_parameters.tenantId = RED.util.getMessageProperty(msg, getTenantByIdUsingGET_nodeParam);
                }
                getTenantByIdUsingGET_parameters.tenantId = !!getTenantByIdUsingGET_parameters.tenantId ? getTenantByIdUsingGET_parameters.tenantId : msg.payload;
                                result = client.getTenantByIdUsingGET(getTenantByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteTenantUsingDELETE') {
                var deleteTenantUsingDELETE_parameters = [];
                var deleteTenantUsingDELETE_nodeParam;
                var deleteTenantUsingDELETE_nodeParamType;

                deleteTenantUsingDELETE_nodeParam = node.deleteTenantUsingDELETE_tenantId;
                deleteTenantUsingDELETE_nodeParamType = node.deleteTenantUsingDELETE_tenantIdType;
                if (deleteTenantUsingDELETE_nodeParamType === 'str') {
                    deleteTenantUsingDELETE_parameters.tenantId = deleteTenantUsingDELETE_nodeParam || '';
                } else {
                    deleteTenantUsingDELETE_parameters.tenantId = RED.util.getMessageProperty(msg, deleteTenantUsingDELETE_nodeParam);
                }
                deleteTenantUsingDELETE_parameters.tenantId = !!deleteTenantUsingDELETE_parameters.tenantId ? deleteTenantUsingDELETE_parameters.tenantId : msg.payload;
                                result = client.deleteTenantUsingDELETE(deleteTenantUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getTenantInfosUsingGET') {
                var getTenantInfosUsingGET_parameters = [];
                var getTenantInfosUsingGET_nodeParam;
                var getTenantInfosUsingGET_nodeParamType;

                getTenantInfosUsingGET_nodeParam = node.getTenantInfosUsingGET_pageSize;
                getTenantInfosUsingGET_nodeParamType = node.getTenantInfosUsingGET_pageSizeType;
                if (getTenantInfosUsingGET_nodeParamType === 'str') {
                    getTenantInfosUsingGET_parameters.pageSize = getTenantInfosUsingGET_nodeParam || '';
                } else {
                    getTenantInfosUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantInfosUsingGET_nodeParam);
                }
                getTenantInfosUsingGET_parameters.pageSize = !!getTenantInfosUsingGET_parameters.pageSize ? getTenantInfosUsingGET_parameters.pageSize : msg.payload;
                
                getTenantInfosUsingGET_nodeParam = node.getTenantInfosUsingGET_page;
                getTenantInfosUsingGET_nodeParamType = node.getTenantInfosUsingGET_pageType;
                if (getTenantInfosUsingGET_nodeParamType === 'str') {
                    getTenantInfosUsingGET_parameters.page = getTenantInfosUsingGET_nodeParam || '';
                } else {
                    getTenantInfosUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantInfosUsingGET_nodeParam);
                }
                getTenantInfosUsingGET_parameters.page = !!getTenantInfosUsingGET_parameters.page ? getTenantInfosUsingGET_parameters.page : msg.payload;
                
                getTenantInfosUsingGET_nodeParam = node.getTenantInfosUsingGET_textSearch;
                getTenantInfosUsingGET_nodeParamType = node.getTenantInfosUsingGET_textSearchType;
                if (getTenantInfosUsingGET_nodeParamType === 'str') {
                    getTenantInfosUsingGET_parameters.textSearch = getTenantInfosUsingGET_nodeParam || '';
                } else {
                    getTenantInfosUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantInfosUsingGET_nodeParam);
                }
                getTenantInfosUsingGET_parameters.textSearch = !!getTenantInfosUsingGET_parameters.textSearch ? getTenantInfosUsingGET_parameters.textSearch : msg.payload;
                
                getTenantInfosUsingGET_nodeParam = node.getTenantInfosUsingGET_sortProperty;
                getTenantInfosUsingGET_nodeParamType = node.getTenantInfosUsingGET_sortPropertyType;
                if (getTenantInfosUsingGET_nodeParamType === 'str') {
                    getTenantInfosUsingGET_parameters.sortProperty = getTenantInfosUsingGET_nodeParam || '';
                } else {
                    getTenantInfosUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantInfosUsingGET_nodeParam);
                }
                getTenantInfosUsingGET_parameters.sortProperty = !!getTenantInfosUsingGET_parameters.sortProperty ? getTenantInfosUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantInfosUsingGET_nodeParam = node.getTenantInfosUsingGET_sortOrder;
                getTenantInfosUsingGET_nodeParamType = node.getTenantInfosUsingGET_sortOrderType;
                if (getTenantInfosUsingGET_nodeParamType === 'str') {
                    getTenantInfosUsingGET_parameters.sortOrder = getTenantInfosUsingGET_nodeParam || '';
                } else {
                    getTenantInfosUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantInfosUsingGET_nodeParam);
                }
                getTenantInfosUsingGET_parameters.sortOrder = !!getTenantInfosUsingGET_parameters.sortOrder ? getTenantInfosUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantInfosUsingGET(getTenantInfosUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantsUsingGET') {
                var getTenantsUsingGET_parameters = [];
                var getTenantsUsingGET_nodeParam;
                var getTenantsUsingGET_nodeParamType;

                getTenantsUsingGET_nodeParam = node.getTenantsUsingGET_pageSize;
                getTenantsUsingGET_nodeParamType = node.getTenantsUsingGET_pageSizeType;
                if (getTenantsUsingGET_nodeParamType === 'str') {
                    getTenantsUsingGET_parameters.pageSize = getTenantsUsingGET_nodeParam || '';
                } else {
                    getTenantsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantsUsingGET_nodeParam);
                }
                getTenantsUsingGET_parameters.pageSize = !!getTenantsUsingGET_parameters.pageSize ? getTenantsUsingGET_parameters.pageSize : msg.payload;
                
                getTenantsUsingGET_nodeParam = node.getTenantsUsingGET_page;
                getTenantsUsingGET_nodeParamType = node.getTenantsUsingGET_pageType;
                if (getTenantsUsingGET_nodeParamType === 'str') {
                    getTenantsUsingGET_parameters.page = getTenantsUsingGET_nodeParam || '';
                } else {
                    getTenantsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantsUsingGET_nodeParam);
                }
                getTenantsUsingGET_parameters.page = !!getTenantsUsingGET_parameters.page ? getTenantsUsingGET_parameters.page : msg.payload;
                
                getTenantsUsingGET_nodeParam = node.getTenantsUsingGET_textSearch;
                getTenantsUsingGET_nodeParamType = node.getTenantsUsingGET_textSearchType;
                if (getTenantsUsingGET_nodeParamType === 'str') {
                    getTenantsUsingGET_parameters.textSearch = getTenantsUsingGET_nodeParam || '';
                } else {
                    getTenantsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantsUsingGET_nodeParam);
                }
                getTenantsUsingGET_parameters.textSearch = !!getTenantsUsingGET_parameters.textSearch ? getTenantsUsingGET_parameters.textSearch : msg.payload;
                
                getTenantsUsingGET_nodeParam = node.getTenantsUsingGET_sortProperty;
                getTenantsUsingGET_nodeParamType = node.getTenantsUsingGET_sortPropertyType;
                if (getTenantsUsingGET_nodeParamType === 'str') {
                    getTenantsUsingGET_parameters.sortProperty = getTenantsUsingGET_nodeParam || '';
                } else {
                    getTenantsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantsUsingGET_nodeParam);
                }
                getTenantsUsingGET_parameters.sortProperty = !!getTenantsUsingGET_parameters.sortProperty ? getTenantsUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantsUsingGET_nodeParam = node.getTenantsUsingGET_sortOrder;
                getTenantsUsingGET_nodeParamType = node.getTenantsUsingGET_sortOrderType;
                if (getTenantsUsingGET_nodeParamType === 'str') {
                    getTenantsUsingGET_parameters.sortOrder = getTenantsUsingGET_nodeParam || '';
                } else {
                    getTenantsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantsUsingGET_nodeParam);
                }
                getTenantsUsingGET_parameters.sortOrder = !!getTenantsUsingGET_parameters.sortOrder ? getTenantsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantsUsingGET(getTenantsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantsByIdsUsingGET') {
                var getTenantsByIdsUsingGET_parameters = [];
                var getTenantsByIdsUsingGET_nodeParam;
                var getTenantsByIdsUsingGET_nodeParamType;

                getTenantsByIdsUsingGET_nodeParam = node.getTenantsByIdsUsingGET_tenantIds;
                getTenantsByIdsUsingGET_nodeParamType = node.getTenantsByIdsUsingGET_tenantIdsType;
                if (getTenantsByIdsUsingGET_nodeParamType === 'str') {
                    getTenantsByIdsUsingGET_parameters.tenantIds = getTenantsByIdsUsingGET_nodeParam || '';
                } else {
                    getTenantsByIdsUsingGET_parameters.tenantIds = RED.util.getMessageProperty(msg, getTenantsByIdsUsingGET_nodeParam);
                }
                getTenantsByIdsUsingGET_parameters.tenantIds = !!getTenantsByIdsUsingGET_parameters.tenantIds ? getTenantsByIdsUsingGET_parameters.tenantIds : msg.payload;
                                result = client.getTenantsByIdsUsingGET(getTenantsByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveTenantProfileUsingPOST') {
                var saveTenantProfileUsingPOST_parameters = [];
                var saveTenantProfileUsingPOST_nodeParam;
                var saveTenantProfileUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveTenantProfileUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveTenantProfileUsingPOST(saveTenantProfileUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfileByIdUsingGET') {
                var getTenantProfileByIdUsingGET_parameters = [];
                var getTenantProfileByIdUsingGET_nodeParam;
                var getTenantProfileByIdUsingGET_nodeParamType;

                getTenantProfileByIdUsingGET_nodeParam = node.getTenantProfileByIdUsingGET_tenantProfileId;
                getTenantProfileByIdUsingGET_nodeParamType = node.getTenantProfileByIdUsingGET_tenantProfileIdType;
                if (getTenantProfileByIdUsingGET_nodeParamType === 'str') {
                    getTenantProfileByIdUsingGET_parameters.tenantProfileId = getTenantProfileByIdUsingGET_nodeParam || '';
                } else {
                    getTenantProfileByIdUsingGET_parameters.tenantProfileId = RED.util.getMessageProperty(msg, getTenantProfileByIdUsingGET_nodeParam);
                }
                getTenantProfileByIdUsingGET_parameters.tenantProfileId = !!getTenantProfileByIdUsingGET_parameters.tenantProfileId ? getTenantProfileByIdUsingGET_parameters.tenantProfileId : msg.payload;
                                result = client.getTenantProfileByIdUsingGET(getTenantProfileByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteTenantProfileUsingDELETE') {
                var deleteTenantProfileUsingDELETE_parameters = [];
                var deleteTenantProfileUsingDELETE_nodeParam;
                var deleteTenantProfileUsingDELETE_nodeParamType;

                deleteTenantProfileUsingDELETE_nodeParam = node.deleteTenantProfileUsingDELETE_tenantProfileId;
                deleteTenantProfileUsingDELETE_nodeParamType = node.deleteTenantProfileUsingDELETE_tenantProfileIdType;
                if (deleteTenantProfileUsingDELETE_nodeParamType === 'str') {
                    deleteTenantProfileUsingDELETE_parameters.tenantProfileId = deleteTenantProfileUsingDELETE_nodeParam || '';
                } else {
                    deleteTenantProfileUsingDELETE_parameters.tenantProfileId = RED.util.getMessageProperty(msg, deleteTenantProfileUsingDELETE_nodeParam);
                }
                deleteTenantProfileUsingDELETE_parameters.tenantProfileId = !!deleteTenantProfileUsingDELETE_parameters.tenantProfileId ? deleteTenantProfileUsingDELETE_parameters.tenantProfileId : msg.payload;
                                result = client.deleteTenantProfileUsingDELETE(deleteTenantProfileUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'setDefaultTenantProfileUsingPOST') {
                var setDefaultTenantProfileUsingPOST_parameters = [];
                var setDefaultTenantProfileUsingPOST_nodeParam;
                var setDefaultTenantProfileUsingPOST_nodeParamType;

                setDefaultTenantProfileUsingPOST_nodeParam = node.setDefaultTenantProfileUsingPOST_tenantProfileId;
                setDefaultTenantProfileUsingPOST_nodeParamType = node.setDefaultTenantProfileUsingPOST_tenantProfileIdType;
                if (setDefaultTenantProfileUsingPOST_nodeParamType === 'str') {
                    setDefaultTenantProfileUsingPOST_parameters.tenantProfileId = setDefaultTenantProfileUsingPOST_nodeParam || '';
                } else {
                    setDefaultTenantProfileUsingPOST_parameters.tenantProfileId = RED.util.getMessageProperty(msg, setDefaultTenantProfileUsingPOST_nodeParam);
                }
                setDefaultTenantProfileUsingPOST_parameters.tenantProfileId = !!setDefaultTenantProfileUsingPOST_parameters.tenantProfileId ? setDefaultTenantProfileUsingPOST_parameters.tenantProfileId : msg.payload;
                                result = client.setDefaultTenantProfileUsingPOST(setDefaultTenantProfileUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getDefaultTenantProfileInfoUsingGET') {
                var getDefaultTenantProfileInfoUsingGET_parameters = [];
                var getDefaultTenantProfileInfoUsingGET_nodeParam;
                var getDefaultTenantProfileInfoUsingGET_nodeParamType;
                result = client.getDefaultTenantProfileInfoUsingGET(getDefaultTenantProfileInfoUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfileInfoByIdUsingGET') {
                var getTenantProfileInfoByIdUsingGET_parameters = [];
                var getTenantProfileInfoByIdUsingGET_nodeParam;
                var getTenantProfileInfoByIdUsingGET_nodeParamType;

                getTenantProfileInfoByIdUsingGET_nodeParam = node.getTenantProfileInfoByIdUsingGET_tenantProfileId;
                getTenantProfileInfoByIdUsingGET_nodeParamType = node.getTenantProfileInfoByIdUsingGET_tenantProfileIdType;
                if (getTenantProfileInfoByIdUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfoByIdUsingGET_parameters.tenantProfileId = getTenantProfileInfoByIdUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfoByIdUsingGET_parameters.tenantProfileId = RED.util.getMessageProperty(msg, getTenantProfileInfoByIdUsingGET_nodeParam);
                }
                getTenantProfileInfoByIdUsingGET_parameters.tenantProfileId = !!getTenantProfileInfoByIdUsingGET_parameters.tenantProfileId ? getTenantProfileInfoByIdUsingGET_parameters.tenantProfileId : msg.payload;
                                result = client.getTenantProfileInfoByIdUsingGET(getTenantProfileInfoByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfileInfosUsingGET') {
                var getTenantProfileInfosUsingGET_parameters = [];
                var getTenantProfileInfosUsingGET_nodeParam;
                var getTenantProfileInfosUsingGET_nodeParamType;

                getTenantProfileInfosUsingGET_nodeParam = node.getTenantProfileInfosUsingGET_pageSize;
                getTenantProfileInfosUsingGET_nodeParamType = node.getTenantProfileInfosUsingGET_pageSizeType;
                if (getTenantProfileInfosUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfosUsingGET_parameters.pageSize = getTenantProfileInfosUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfosUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantProfileInfosUsingGET_nodeParam);
                }
                getTenantProfileInfosUsingGET_parameters.pageSize = !!getTenantProfileInfosUsingGET_parameters.pageSize ? getTenantProfileInfosUsingGET_parameters.pageSize : msg.payload;
                
                getTenantProfileInfosUsingGET_nodeParam = node.getTenantProfileInfosUsingGET_page;
                getTenantProfileInfosUsingGET_nodeParamType = node.getTenantProfileInfosUsingGET_pageType;
                if (getTenantProfileInfosUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfosUsingGET_parameters.page = getTenantProfileInfosUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfosUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantProfileInfosUsingGET_nodeParam);
                }
                getTenantProfileInfosUsingGET_parameters.page = !!getTenantProfileInfosUsingGET_parameters.page ? getTenantProfileInfosUsingGET_parameters.page : msg.payload;
                
                getTenantProfileInfosUsingGET_nodeParam = node.getTenantProfileInfosUsingGET_textSearch;
                getTenantProfileInfosUsingGET_nodeParamType = node.getTenantProfileInfosUsingGET_textSearchType;
                if (getTenantProfileInfosUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfosUsingGET_parameters.textSearch = getTenantProfileInfosUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfosUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantProfileInfosUsingGET_nodeParam);
                }
                getTenantProfileInfosUsingGET_parameters.textSearch = !!getTenantProfileInfosUsingGET_parameters.textSearch ? getTenantProfileInfosUsingGET_parameters.textSearch : msg.payload;
                
                getTenantProfileInfosUsingGET_nodeParam = node.getTenantProfileInfosUsingGET_sortProperty;
                getTenantProfileInfosUsingGET_nodeParamType = node.getTenantProfileInfosUsingGET_sortPropertyType;
                if (getTenantProfileInfosUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfosUsingGET_parameters.sortProperty = getTenantProfileInfosUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfosUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantProfileInfosUsingGET_nodeParam);
                }
                getTenantProfileInfosUsingGET_parameters.sortProperty = !!getTenantProfileInfosUsingGET_parameters.sortProperty ? getTenantProfileInfosUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantProfileInfosUsingGET_nodeParam = node.getTenantProfileInfosUsingGET_sortOrder;
                getTenantProfileInfosUsingGET_nodeParamType = node.getTenantProfileInfosUsingGET_sortOrderType;
                if (getTenantProfileInfosUsingGET_nodeParamType === 'str') {
                    getTenantProfileInfosUsingGET_parameters.sortOrder = getTenantProfileInfosUsingGET_nodeParam || '';
                } else {
                    getTenantProfileInfosUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantProfileInfosUsingGET_nodeParam);
                }
                getTenantProfileInfosUsingGET_parameters.sortOrder = !!getTenantProfileInfosUsingGET_parameters.sortOrder ? getTenantProfileInfosUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantProfileInfosUsingGET(getTenantProfileInfosUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantProfilesUsingGET') {
                var getTenantProfilesUsingGET_parameters = [];
                var getTenantProfilesUsingGET_nodeParam;
                var getTenantProfilesUsingGET_nodeParamType;

                getTenantProfilesUsingGET_nodeParam = node.getTenantProfilesUsingGET_pageSize;
                getTenantProfilesUsingGET_nodeParamType = node.getTenantProfilesUsingGET_pageSizeType;
                if (getTenantProfilesUsingGET_nodeParamType === 'str') {
                    getTenantProfilesUsingGET_parameters.pageSize = getTenantProfilesUsingGET_nodeParam || '';
                } else {
                    getTenantProfilesUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantProfilesUsingGET_nodeParam);
                }
                getTenantProfilesUsingGET_parameters.pageSize = !!getTenantProfilesUsingGET_parameters.pageSize ? getTenantProfilesUsingGET_parameters.pageSize : msg.payload;
                
                getTenantProfilesUsingGET_nodeParam = node.getTenantProfilesUsingGET_page;
                getTenantProfilesUsingGET_nodeParamType = node.getTenantProfilesUsingGET_pageType;
                if (getTenantProfilesUsingGET_nodeParamType === 'str') {
                    getTenantProfilesUsingGET_parameters.page = getTenantProfilesUsingGET_nodeParam || '';
                } else {
                    getTenantProfilesUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantProfilesUsingGET_nodeParam);
                }
                getTenantProfilesUsingGET_parameters.page = !!getTenantProfilesUsingGET_parameters.page ? getTenantProfilesUsingGET_parameters.page : msg.payload;
                
                getTenantProfilesUsingGET_nodeParam = node.getTenantProfilesUsingGET_textSearch;
                getTenantProfilesUsingGET_nodeParamType = node.getTenantProfilesUsingGET_textSearchType;
                if (getTenantProfilesUsingGET_nodeParamType === 'str') {
                    getTenantProfilesUsingGET_parameters.textSearch = getTenantProfilesUsingGET_nodeParam || '';
                } else {
                    getTenantProfilesUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantProfilesUsingGET_nodeParam);
                }
                getTenantProfilesUsingGET_parameters.textSearch = !!getTenantProfilesUsingGET_parameters.textSearch ? getTenantProfilesUsingGET_parameters.textSearch : msg.payload;
                
                getTenantProfilesUsingGET_nodeParam = node.getTenantProfilesUsingGET_sortProperty;
                getTenantProfilesUsingGET_nodeParamType = node.getTenantProfilesUsingGET_sortPropertyType;
                if (getTenantProfilesUsingGET_nodeParamType === 'str') {
                    getTenantProfilesUsingGET_parameters.sortProperty = getTenantProfilesUsingGET_nodeParam || '';
                } else {
                    getTenantProfilesUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantProfilesUsingGET_nodeParam);
                }
                getTenantProfilesUsingGET_parameters.sortProperty = !!getTenantProfilesUsingGET_parameters.sortProperty ? getTenantProfilesUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantProfilesUsingGET_nodeParam = node.getTenantProfilesUsingGET_sortOrder;
                getTenantProfilesUsingGET_nodeParamType = node.getTenantProfilesUsingGET_sortOrderType;
                if (getTenantProfilesUsingGET_nodeParamType === 'str') {
                    getTenantProfilesUsingGET_parameters.sortOrder = getTenantProfilesUsingGET_nodeParam || '';
                } else {
                    getTenantProfilesUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantProfilesUsingGET_nodeParam);
                }
                getTenantProfilesUsingGET_parameters.sortOrder = !!getTenantProfilesUsingGET_parameters.sortOrder ? getTenantProfilesUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantProfilesUsingGET(getTenantProfilesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getHelpBaseUrlUsingGET') {
                var getHelpBaseUrlUsingGET_parameters = [];
                var getHelpBaseUrlUsingGET_nodeParam;
                var getHelpBaseUrlUsingGET_nodeParamType;
                result = client.getHelpBaseUrlUsingGET(getHelpBaseUrlUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getAllCustomerUsersUsingGET') {
                var getAllCustomerUsersUsingGET_parameters = [];
                var getAllCustomerUsersUsingGET_nodeParam;
                var getAllCustomerUsersUsingGET_nodeParamType;

                getAllCustomerUsersUsingGET_nodeParam = node.getAllCustomerUsersUsingGET_pageSize;
                getAllCustomerUsersUsingGET_nodeParamType = node.getAllCustomerUsersUsingGET_pageSizeType;
                if (getAllCustomerUsersUsingGET_nodeParamType === 'str') {
                    getAllCustomerUsersUsingGET_parameters.pageSize = getAllCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getAllCustomerUsersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getAllCustomerUsersUsingGET_nodeParam);
                }
                getAllCustomerUsersUsingGET_parameters.pageSize = !!getAllCustomerUsersUsingGET_parameters.pageSize ? getAllCustomerUsersUsingGET_parameters.pageSize : msg.payload;
                
                getAllCustomerUsersUsingGET_nodeParam = node.getAllCustomerUsersUsingGET_page;
                getAllCustomerUsersUsingGET_nodeParamType = node.getAllCustomerUsersUsingGET_pageType;
                if (getAllCustomerUsersUsingGET_nodeParamType === 'str') {
                    getAllCustomerUsersUsingGET_parameters.page = getAllCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getAllCustomerUsersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getAllCustomerUsersUsingGET_nodeParam);
                }
                getAllCustomerUsersUsingGET_parameters.page = !!getAllCustomerUsersUsingGET_parameters.page ? getAllCustomerUsersUsingGET_parameters.page : msg.payload;
                
                getAllCustomerUsersUsingGET_nodeParam = node.getAllCustomerUsersUsingGET_textSearch;
                getAllCustomerUsersUsingGET_nodeParamType = node.getAllCustomerUsersUsingGET_textSearchType;
                if (getAllCustomerUsersUsingGET_nodeParamType === 'str') {
                    getAllCustomerUsersUsingGET_parameters.textSearch = getAllCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getAllCustomerUsersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getAllCustomerUsersUsingGET_nodeParam);
                }
                getAllCustomerUsersUsingGET_parameters.textSearch = !!getAllCustomerUsersUsingGET_parameters.textSearch ? getAllCustomerUsersUsingGET_parameters.textSearch : msg.payload;
                
                getAllCustomerUsersUsingGET_nodeParam = node.getAllCustomerUsersUsingGET_sortProperty;
                getAllCustomerUsersUsingGET_nodeParamType = node.getAllCustomerUsersUsingGET_sortPropertyType;
                if (getAllCustomerUsersUsingGET_nodeParamType === 'str') {
                    getAllCustomerUsersUsingGET_parameters.sortProperty = getAllCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getAllCustomerUsersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getAllCustomerUsersUsingGET_nodeParam);
                }
                getAllCustomerUsersUsingGET_parameters.sortProperty = !!getAllCustomerUsersUsingGET_parameters.sortProperty ? getAllCustomerUsersUsingGET_parameters.sortProperty : msg.payload;
                
                getAllCustomerUsersUsingGET_nodeParam = node.getAllCustomerUsersUsingGET_sortOrder;
                getAllCustomerUsersUsingGET_nodeParamType = node.getAllCustomerUsersUsingGET_sortOrderType;
                if (getAllCustomerUsersUsingGET_nodeParamType === 'str') {
                    getAllCustomerUsersUsingGET_parameters.sortOrder = getAllCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getAllCustomerUsersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getAllCustomerUsersUsingGET_nodeParam);
                }
                getAllCustomerUsersUsingGET_parameters.sortOrder = !!getAllCustomerUsersUsingGET_parameters.sortOrder ? getAllCustomerUsersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getAllCustomerUsersUsingGET(getAllCustomerUsersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCustomerUsersUsingGET') {
                var getCustomerUsersUsingGET_parameters = [];
                var getCustomerUsersUsingGET_nodeParam;
                var getCustomerUsersUsingGET_nodeParamType;

                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_customerId;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_customerIdType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.customerId = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.customerId = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.customerId = !!getCustomerUsersUsingGET_parameters.customerId ? getCustomerUsersUsingGET_parameters.customerId : msg.payload;
                
                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_pageSize;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_pageSizeType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.pageSize = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.pageSize = !!getCustomerUsersUsingGET_parameters.pageSize ? getCustomerUsersUsingGET_parameters.pageSize : msg.payload;
                
                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_page;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_pageType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.page = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.page = !!getCustomerUsersUsingGET_parameters.page ? getCustomerUsersUsingGET_parameters.page : msg.payload;
                
                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_textSearch;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_textSearchType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.textSearch = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.textSearch = !!getCustomerUsersUsingGET_parameters.textSearch ? getCustomerUsersUsingGET_parameters.textSearch : msg.payload;
                
                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_sortProperty;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_sortPropertyType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.sortProperty = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.sortProperty = !!getCustomerUsersUsingGET_parameters.sortProperty ? getCustomerUsersUsingGET_parameters.sortProperty : msg.payload;
                
                getCustomerUsersUsingGET_nodeParam = node.getCustomerUsersUsingGET_sortOrder;
                getCustomerUsersUsingGET_nodeParamType = node.getCustomerUsersUsingGET_sortOrderType;
                if (getCustomerUsersUsingGET_nodeParamType === 'str') {
                    getCustomerUsersUsingGET_parameters.sortOrder = getCustomerUsersUsingGET_nodeParam || '';
                } else {
                    getCustomerUsersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getCustomerUsersUsingGET_nodeParam);
                }
                getCustomerUsersUsingGET_parameters.sortOrder = !!getCustomerUsersUsingGET_parameters.sortOrder ? getCustomerUsersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getCustomerUsersUsingGET(getCustomerUsersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByEntityGroupIdUsingGET') {
                var getUsersByEntityGroupIdUsingGET_parameters = [];
                var getUsersByEntityGroupIdUsingGET_nodeParam;
                var getUsersByEntityGroupIdUsingGET_nodeParamType;

                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_entityGroupId;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_entityGroupIdType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.entityGroupId = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.entityGroupId = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.entityGroupId = !!getUsersByEntityGroupIdUsingGET_parameters.entityGroupId ? getUsersByEntityGroupIdUsingGET_parameters.entityGroupId : msg.payload;
                
                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_pageSize;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_pageSizeType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.pageSize = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.pageSize = !!getUsersByEntityGroupIdUsingGET_parameters.pageSize ? getUsersByEntityGroupIdUsingGET_parameters.pageSize : msg.payload;
                
                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_page;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_pageType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.page = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.page = !!getUsersByEntityGroupIdUsingGET_parameters.page ? getUsersByEntityGroupIdUsingGET_parameters.page : msg.payload;
                
                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_textSearch;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_textSearchType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.textSearch = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.textSearch = !!getUsersByEntityGroupIdUsingGET_parameters.textSearch ? getUsersByEntityGroupIdUsingGET_parameters.textSearch : msg.payload;
                
                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_sortProperty;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_sortPropertyType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.sortProperty = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.sortProperty = !!getUsersByEntityGroupIdUsingGET_parameters.sortProperty ? getUsersByEntityGroupIdUsingGET_parameters.sortProperty : msg.payload;
                
                getUsersByEntityGroupIdUsingGET_nodeParam = node.getUsersByEntityGroupIdUsingGET_sortOrder;
                getUsersByEntityGroupIdUsingGET_nodeParamType = node.getUsersByEntityGroupIdUsingGET_sortOrderType;
                if (getUsersByEntityGroupIdUsingGET_nodeParamType === 'str') {
                    getUsersByEntityGroupIdUsingGET_parameters.sortOrder = getUsersByEntityGroupIdUsingGET_nodeParam || '';
                } else {
                    getUsersByEntityGroupIdUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUsersByEntityGroupIdUsingGET_nodeParam);
                }
                getUsersByEntityGroupIdUsingGET_parameters.sortOrder = !!getUsersByEntityGroupIdUsingGET_parameters.sortOrder ? getUsersByEntityGroupIdUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUsersByEntityGroupIdUsingGET(getUsersByEntityGroupIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getTenantAdminsUsingGET') {
                var getTenantAdminsUsingGET_parameters = [];
                var getTenantAdminsUsingGET_nodeParam;
                var getTenantAdminsUsingGET_nodeParamType;

                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_tenantId;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_tenantIdType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.tenantId = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.tenantId = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.tenantId = !!getTenantAdminsUsingGET_parameters.tenantId ? getTenantAdminsUsingGET_parameters.tenantId : msg.payload;
                
                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_pageSize;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_pageSizeType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.pageSize = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.pageSize = !!getTenantAdminsUsingGET_parameters.pageSize ? getTenantAdminsUsingGET_parameters.pageSize : msg.payload;
                
                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_page;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_pageType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.page = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.page = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.page = !!getTenantAdminsUsingGET_parameters.page ? getTenantAdminsUsingGET_parameters.page : msg.payload;
                
                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_textSearch;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_textSearchType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.textSearch = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.textSearch = !!getTenantAdminsUsingGET_parameters.textSearch ? getTenantAdminsUsingGET_parameters.textSearch : msg.payload;
                
                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_sortProperty;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_sortPropertyType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.sortProperty = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.sortProperty = !!getTenantAdminsUsingGET_parameters.sortProperty ? getTenantAdminsUsingGET_parameters.sortProperty : msg.payload;
                
                getTenantAdminsUsingGET_nodeParam = node.getTenantAdminsUsingGET_sortOrder;
                getTenantAdminsUsingGET_nodeParamType = node.getTenantAdminsUsingGET_sortOrderType;
                if (getTenantAdminsUsingGET_nodeParamType === 'str') {
                    getTenantAdminsUsingGET_parameters.sortOrder = getTenantAdminsUsingGET_nodeParam || '';
                } else {
                    getTenantAdminsUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getTenantAdminsUsingGET_nodeParam);
                }
                getTenantAdminsUsingGET_parameters.sortOrder = !!getTenantAdminsUsingGET_parameters.sortOrder ? getTenantAdminsUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getTenantAdminsUsingGET(getTenantAdminsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'sendActivationEmailUsingPOST') {
                var sendActivationEmailUsingPOST_parameters = [];
                var sendActivationEmailUsingPOST_nodeParam;
                var sendActivationEmailUsingPOST_nodeParamType;

                sendActivationEmailUsingPOST_nodeParam = node.sendActivationEmailUsingPOST_email;
                sendActivationEmailUsingPOST_nodeParamType = node.sendActivationEmailUsingPOST_emailType;
                if (sendActivationEmailUsingPOST_nodeParamType === 'str') {
                    sendActivationEmailUsingPOST_parameters.email = sendActivationEmailUsingPOST_nodeParam || '';
                } else {
                    sendActivationEmailUsingPOST_parameters.email = RED.util.getMessageProperty(msg, sendActivationEmailUsingPOST_nodeParam);
                }
                sendActivationEmailUsingPOST_parameters.email = !!sendActivationEmailUsingPOST_parameters.email ? sendActivationEmailUsingPOST_parameters.email : msg.payload;
                                result = client.sendActivationEmailUsingPOST(sendActivationEmailUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'isUserTokenAccessEnabledUsingGET') {
                var isUserTokenAccessEnabledUsingGET_parameters = [];
                var isUserTokenAccessEnabledUsingGET_nodeParam;
                var isUserTokenAccessEnabledUsingGET_nodeParamType;
                result = client.isUserTokenAccessEnabledUsingGET(isUserTokenAccessEnabledUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserUsersUsingGET') {
                var getUserUsersUsingGET_parameters = [];
                var getUserUsersUsingGET_nodeParam;
                var getUserUsersUsingGET_nodeParamType;

                getUserUsersUsingGET_nodeParam = node.getUserUsersUsingGET_pageSize;
                getUserUsersUsingGET_nodeParamType = node.getUserUsersUsingGET_pageSizeType;
                if (getUserUsersUsingGET_nodeParamType === 'str') {
                    getUserUsersUsingGET_parameters.pageSize = getUserUsersUsingGET_nodeParam || '';
                } else {
                    getUserUsersUsingGET_parameters.pageSize = RED.util.getMessageProperty(msg, getUserUsersUsingGET_nodeParam);
                }
                getUserUsersUsingGET_parameters.pageSize = !!getUserUsersUsingGET_parameters.pageSize ? getUserUsersUsingGET_parameters.pageSize : msg.payload;
                
                getUserUsersUsingGET_nodeParam = node.getUserUsersUsingGET_page;
                getUserUsersUsingGET_nodeParamType = node.getUserUsersUsingGET_pageType;
                if (getUserUsersUsingGET_nodeParamType === 'str') {
                    getUserUsersUsingGET_parameters.page = getUserUsersUsingGET_nodeParam || '';
                } else {
                    getUserUsersUsingGET_parameters.page = RED.util.getMessageProperty(msg, getUserUsersUsingGET_nodeParam);
                }
                getUserUsersUsingGET_parameters.page = !!getUserUsersUsingGET_parameters.page ? getUserUsersUsingGET_parameters.page : msg.payload;
                
                getUserUsersUsingGET_nodeParam = node.getUserUsersUsingGET_textSearch;
                getUserUsersUsingGET_nodeParamType = node.getUserUsersUsingGET_textSearchType;
                if (getUserUsersUsingGET_nodeParamType === 'str') {
                    getUserUsersUsingGET_parameters.textSearch = getUserUsersUsingGET_nodeParam || '';
                } else {
                    getUserUsersUsingGET_parameters.textSearch = RED.util.getMessageProperty(msg, getUserUsersUsingGET_nodeParam);
                }
                getUserUsersUsingGET_parameters.textSearch = !!getUserUsersUsingGET_parameters.textSearch ? getUserUsersUsingGET_parameters.textSearch : msg.payload;
                
                getUserUsersUsingGET_nodeParam = node.getUserUsersUsingGET_sortProperty;
                getUserUsersUsingGET_nodeParamType = node.getUserUsersUsingGET_sortPropertyType;
                if (getUserUsersUsingGET_nodeParamType === 'str') {
                    getUserUsersUsingGET_parameters.sortProperty = getUserUsersUsingGET_nodeParam || '';
                } else {
                    getUserUsersUsingGET_parameters.sortProperty = RED.util.getMessageProperty(msg, getUserUsersUsingGET_nodeParam);
                }
                getUserUsersUsingGET_parameters.sortProperty = !!getUserUsersUsingGET_parameters.sortProperty ? getUserUsersUsingGET_parameters.sortProperty : msg.payload;
                
                getUserUsersUsingGET_nodeParam = node.getUserUsersUsingGET_sortOrder;
                getUserUsersUsingGET_nodeParamType = node.getUserUsersUsingGET_sortOrderType;
                if (getUserUsersUsingGET_nodeParamType === 'str') {
                    getUserUsersUsingGET_parameters.sortOrder = getUserUsersUsingGET_nodeParam || '';
                } else {
                    getUserUsersUsingGET_parameters.sortOrder = RED.util.getMessageProperty(msg, getUserUsersUsingGET_nodeParam);
                }
                getUserUsersUsingGET_parameters.sortOrder = !!getUserUsersUsingGET_parameters.sortOrder ? getUserUsersUsingGET_parameters.sortOrder : msg.payload;
                                result = client.getUserUsersUsingGET(getUserUsersUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserByIdUsingGET') {
                var getUserByIdUsingGET_parameters = [];
                var getUserByIdUsingGET_nodeParam;
                var getUserByIdUsingGET_nodeParamType;

                getUserByIdUsingGET_nodeParam = node.getUserByIdUsingGET_userId;
                getUserByIdUsingGET_nodeParamType = node.getUserByIdUsingGET_userIdType;
                if (getUserByIdUsingGET_nodeParamType === 'str') {
                    getUserByIdUsingGET_parameters.userId = getUserByIdUsingGET_nodeParam || '';
                } else {
                    getUserByIdUsingGET_parameters.userId = RED.util.getMessageProperty(msg, getUserByIdUsingGET_nodeParam);
                }
                getUserByIdUsingGET_parameters.userId = !!getUserByIdUsingGET_parameters.userId ? getUserByIdUsingGET_parameters.userId : msg.payload;
                                result = client.getUserByIdUsingGET(getUserByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteUserUsingDELETE') {
                var deleteUserUsingDELETE_parameters = [];
                var deleteUserUsingDELETE_nodeParam;
                var deleteUserUsingDELETE_nodeParamType;

                deleteUserUsingDELETE_nodeParam = node.deleteUserUsingDELETE_userId;
                deleteUserUsingDELETE_nodeParamType = node.deleteUserUsingDELETE_userIdType;
                if (deleteUserUsingDELETE_nodeParamType === 'str') {
                    deleteUserUsingDELETE_parameters.userId = deleteUserUsingDELETE_nodeParam || '';
                } else {
                    deleteUserUsingDELETE_parameters.userId = RED.util.getMessageProperty(msg, deleteUserUsingDELETE_nodeParam);
                }
                deleteUserUsingDELETE_parameters.userId = !!deleteUserUsingDELETE_parameters.userId ? deleteUserUsingDELETE_parameters.userId : msg.payload;
                                result = client.deleteUserUsingDELETE(deleteUserUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getActivationLinkUsingGET') {
                var getActivationLinkUsingGET_parameters = [];
                var getActivationLinkUsingGET_nodeParam;
                var getActivationLinkUsingGET_nodeParamType;

                getActivationLinkUsingGET_nodeParam = node.getActivationLinkUsingGET_userId;
                getActivationLinkUsingGET_nodeParamType = node.getActivationLinkUsingGET_userIdType;
                if (getActivationLinkUsingGET_nodeParamType === 'str') {
                    getActivationLinkUsingGET_parameters.userId = getActivationLinkUsingGET_nodeParam || '';
                } else {
                    getActivationLinkUsingGET_parameters.userId = RED.util.getMessageProperty(msg, getActivationLinkUsingGET_nodeParam);
                }
                getActivationLinkUsingGET_parameters.userId = !!getActivationLinkUsingGET_parameters.userId ? getActivationLinkUsingGET_parameters.userId : msg.payload;
                                result = client.getActivationLinkUsingGET(getActivationLinkUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getUserTokenUsingGET') {
                var getUserTokenUsingGET_parameters = [];
                var getUserTokenUsingGET_nodeParam;
                var getUserTokenUsingGET_nodeParamType;

                getUserTokenUsingGET_nodeParam = node.getUserTokenUsingGET_userId;
                getUserTokenUsingGET_nodeParamType = node.getUserTokenUsingGET_userIdType;
                if (getUserTokenUsingGET_nodeParamType === 'str') {
                    getUserTokenUsingGET_parameters.userId = getUserTokenUsingGET_nodeParam || '';
                } else {
                    getUserTokenUsingGET_parameters.userId = RED.util.getMessageProperty(msg, getUserTokenUsingGET_nodeParam);
                }
                getUserTokenUsingGET_parameters.userId = !!getUserTokenUsingGET_parameters.userId ? getUserTokenUsingGET_parameters.userId : msg.payload;
                                result = client.getUserTokenUsingGET(getUserTokenUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'setUserCredentialsEnabledUsingPOST') {
                var setUserCredentialsEnabledUsingPOST_parameters = [];
                var setUserCredentialsEnabledUsingPOST_nodeParam;
                var setUserCredentialsEnabledUsingPOST_nodeParamType;

                setUserCredentialsEnabledUsingPOST_nodeParam = node.setUserCredentialsEnabledUsingPOST_userId;
                setUserCredentialsEnabledUsingPOST_nodeParamType = node.setUserCredentialsEnabledUsingPOST_userIdType;
                if (setUserCredentialsEnabledUsingPOST_nodeParamType === 'str') {
                    setUserCredentialsEnabledUsingPOST_parameters.userId = setUserCredentialsEnabledUsingPOST_nodeParam || '';
                } else {
                    setUserCredentialsEnabledUsingPOST_parameters.userId = RED.util.getMessageProperty(msg, setUserCredentialsEnabledUsingPOST_nodeParam);
                }
                setUserCredentialsEnabledUsingPOST_parameters.userId = !!setUserCredentialsEnabledUsingPOST_parameters.userId ? setUserCredentialsEnabledUsingPOST_parameters.userId : msg.payload;
                
                setUserCredentialsEnabledUsingPOST_nodeParam = node.setUserCredentialsEnabledUsingPOST_userCredentialsEnabled;
                setUserCredentialsEnabledUsingPOST_nodeParamType = node.setUserCredentialsEnabledUsingPOST_userCredentialsEnabledType;
                if (setUserCredentialsEnabledUsingPOST_nodeParamType === 'str') {
                    setUserCredentialsEnabledUsingPOST_parameters.userCredentialsEnabled = setUserCredentialsEnabledUsingPOST_nodeParam || '';
                } else {
                    setUserCredentialsEnabledUsingPOST_parameters.userCredentialsEnabled = RED.util.getMessageProperty(msg, setUserCredentialsEnabledUsingPOST_nodeParam);
                }
                setUserCredentialsEnabledUsingPOST_parameters.userCredentialsEnabled = !!setUserCredentialsEnabledUsingPOST_parameters.userCredentialsEnabled ? setUserCredentialsEnabledUsingPOST_parameters.userCredentialsEnabled : msg.payload;
                                result = client.setUserCredentialsEnabledUsingPOST(setUserCredentialsEnabledUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByIdsUsingGET') {
                var getUsersByIdsUsingGET_parameters = [];
                var getUsersByIdsUsingGET_nodeParam;
                var getUsersByIdsUsingGET_nodeParamType;

                getUsersByIdsUsingGET_nodeParam = node.getUsersByIdsUsingGET_userIds;
                getUsersByIdsUsingGET_nodeParamType = node.getUsersByIdsUsingGET_userIdsType;
                if (getUsersByIdsUsingGET_nodeParamType === 'str') {
                    getUsersByIdsUsingGET_parameters.userIds = getUsersByIdsUsingGET_nodeParam || '';
                } else {
                    getUsersByIdsUsingGET_parameters.userIds = RED.util.getMessageProperty(msg, getUsersByIdsUsingGET_nodeParam);
                }
                getUsersByIdsUsingGET_parameters.userIds = !!getUsersByIdsUsingGET_parameters.userIds ? getUsersByIdsUsingGET_parameters.userIds : msg.payload;
                                result = client.getUsersByIdsUsingGET(getUsersByIdsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveUserUsingPOST') {
                var saveUserUsingPOST_parameters = [];
                var saveUserUsingPOST_nodeParam;
                var saveUserUsingPOST_nodeParamType;

                saveUserUsingPOST_nodeParam = node.saveUserUsingPOST_sendActivationMail;
                saveUserUsingPOST_nodeParamType = node.saveUserUsingPOST_sendActivationMailType;
                if (saveUserUsingPOST_nodeParamType === 'str') {
                    saveUserUsingPOST_parameters.sendActivationMail = saveUserUsingPOST_nodeParam || '';
                } else {
                    saveUserUsingPOST_parameters.sendActivationMail = RED.util.getMessageProperty(msg, saveUserUsingPOST_nodeParam);
                }
                saveUserUsingPOST_parameters.sendActivationMail = !!saveUserUsingPOST_parameters.sendActivationMail ? saveUserUsingPOST_parameters.sendActivationMail : msg.payload;
                
                saveUserUsingPOST_nodeParam = node.saveUserUsingPOST_entityGroupId;
                saveUserUsingPOST_nodeParamType = node.saveUserUsingPOST_entityGroupIdType;
                if (saveUserUsingPOST_nodeParamType === 'str') {
                    saveUserUsingPOST_parameters.entityGroupId = saveUserUsingPOST_nodeParam || '';
                } else {
                    saveUserUsingPOST_parameters.entityGroupId = RED.util.getMessageProperty(msg, saveUserUsingPOST_nodeParam);
                }
                saveUserUsingPOST_parameters.entityGroupId = !!saveUserUsingPOST_parameters.entityGroupId ? saveUserUsingPOST_parameters.entityGroupId : msg.payload;
                
                if (typeof msg.payload === 'object') {
                    saveUserUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveUserUsingPOST(saveUserUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAllowedPermissionsUsingGET') {
                var getAllowedPermissionsUsingGET_parameters = [];
                var getAllowedPermissionsUsingGET_nodeParam;
                var getAllowedPermissionsUsingGET_nodeParamType;
                result = client.getAllowedPermissionsUsingGET(getAllowedPermissionsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getLoginWhiteLabelParamsUsingGET') {
                var getLoginWhiteLabelParamsUsingGET_parameters = [];
                var getLoginWhiteLabelParamsUsingGET_nodeParam;
                var getLoginWhiteLabelParamsUsingGET_nodeParamType;

                getLoginWhiteLabelParamsUsingGET_nodeParam = node.getLoginWhiteLabelParamsUsingGET_logoImageChecksum;
                getLoginWhiteLabelParamsUsingGET_nodeParamType = node.getLoginWhiteLabelParamsUsingGET_logoImageChecksumType;
                if (getLoginWhiteLabelParamsUsingGET_nodeParamType === 'str') {
                    getLoginWhiteLabelParamsUsingGET_parameters.logoImageChecksum = getLoginWhiteLabelParamsUsingGET_nodeParam || '';
                } else {
                    getLoginWhiteLabelParamsUsingGET_parameters.logoImageChecksum = RED.util.getMessageProperty(msg, getLoginWhiteLabelParamsUsingGET_nodeParam);
                }
                getLoginWhiteLabelParamsUsingGET_parameters.logoImageChecksum = !!getLoginWhiteLabelParamsUsingGET_parameters.logoImageChecksum ? getLoginWhiteLabelParamsUsingGET_parameters.logoImageChecksum : msg.payload;
                
                getLoginWhiteLabelParamsUsingGET_nodeParam = node.getLoginWhiteLabelParamsUsingGET_faviconChecksum;
                getLoginWhiteLabelParamsUsingGET_nodeParamType = node.getLoginWhiteLabelParamsUsingGET_faviconChecksumType;
                if (getLoginWhiteLabelParamsUsingGET_nodeParamType === 'str') {
                    getLoginWhiteLabelParamsUsingGET_parameters.faviconChecksum = getLoginWhiteLabelParamsUsingGET_nodeParam || '';
                } else {
                    getLoginWhiteLabelParamsUsingGET_parameters.faviconChecksum = RED.util.getMessageProperty(msg, getLoginWhiteLabelParamsUsingGET_nodeParam);
                }
                getLoginWhiteLabelParamsUsingGET_parameters.faviconChecksum = !!getLoginWhiteLabelParamsUsingGET_parameters.faviconChecksum ? getLoginWhiteLabelParamsUsingGET_parameters.faviconChecksum : msg.payload;
                                result = client.getLoginWhiteLabelParamsUsingGET(getLoginWhiteLabelParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'tenantWhiteLabelingAllowedUsingGET') {
                var tenantWhiteLabelingAllowedUsingGET_parameters = [];
                var tenantWhiteLabelingAllowedUsingGET_nodeParam;
                var tenantWhiteLabelingAllowedUsingGET_nodeParamType;
                result = client.tenantWhiteLabelingAllowedUsingGET(tenantWhiteLabelingAllowedUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCurrentLoginWhiteLabelParamsUsingGET') {
                var getCurrentLoginWhiteLabelParamsUsingGET_parameters = [];
                var getCurrentLoginWhiteLabelParamsUsingGET_nodeParam;
                var getCurrentLoginWhiteLabelParamsUsingGET_nodeParamType;
                result = client.getCurrentLoginWhiteLabelParamsUsingGET(getCurrentLoginWhiteLabelParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getCurrentWhiteLabelParamsUsingGET') {
                var getCurrentWhiteLabelParamsUsingGET_parameters = [];
                var getCurrentWhiteLabelParamsUsingGET_nodeParam;
                var getCurrentWhiteLabelParamsUsingGET_nodeParamType;
                result = client.getCurrentWhiteLabelParamsUsingGET(getCurrentWhiteLabelParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'isCustomerWhiteLabelingAllowedUsingGET') {
                var isCustomerWhiteLabelingAllowedUsingGET_parameters = [];
                var isCustomerWhiteLabelingAllowedUsingGET_nodeParam;
                var isCustomerWhiteLabelingAllowedUsingGET_nodeParamType;
                result = client.isCustomerWhiteLabelingAllowedUsingGET(isCustomerWhiteLabelingAllowedUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'isWhiteLabelingAllowedUsingGET') {
                var isWhiteLabelingAllowedUsingGET_parameters = [];
                var isWhiteLabelingAllowedUsingGET_nodeParam;
                var isWhiteLabelingAllowedUsingGET_nodeParamType;
                result = client.isWhiteLabelingAllowedUsingGET(isWhiteLabelingAllowedUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveLoginWhiteLabelParamsUsingPOST') {
                var saveLoginWhiteLabelParamsUsingPOST_parameters = [];
                var saveLoginWhiteLabelParamsUsingPOST_nodeParam;
                var saveLoginWhiteLabelParamsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveLoginWhiteLabelParamsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveLoginWhiteLabelParamsUsingPOST(saveLoginWhiteLabelParamsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'previewWhiteLabelParamsUsingPOST') {
                var previewWhiteLabelParamsUsingPOST_parameters = [];
                var previewWhiteLabelParamsUsingPOST_nodeParam;
                var previewWhiteLabelParamsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    previewWhiteLabelParamsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.previewWhiteLabelParamsUsingPOST(previewWhiteLabelParamsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveWhiteLabelParamsUsingPOST') {
                var saveWhiteLabelParamsUsingPOST_parameters = [];
                var saveWhiteLabelParamsUsingPOST_nodeParam;
                var saveWhiteLabelParamsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveWhiteLabelParamsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveWhiteLabelParamsUsingPOST(saveWhiteLabelParamsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getWhiteLabelParamsUsingGET') {
                var getWhiteLabelParamsUsingGET_parameters = [];
                var getWhiteLabelParamsUsingGET_nodeParam;
                var getWhiteLabelParamsUsingGET_nodeParamType;

                getWhiteLabelParamsUsingGET_nodeParam = node.getWhiteLabelParamsUsingGET_logoImageChecksum;
                getWhiteLabelParamsUsingGET_nodeParamType = node.getWhiteLabelParamsUsingGET_logoImageChecksumType;
                if (getWhiteLabelParamsUsingGET_nodeParamType === 'str') {
                    getWhiteLabelParamsUsingGET_parameters.logoImageChecksum = getWhiteLabelParamsUsingGET_nodeParam || '';
                } else {
                    getWhiteLabelParamsUsingGET_parameters.logoImageChecksum = RED.util.getMessageProperty(msg, getWhiteLabelParamsUsingGET_nodeParam);
                }
                getWhiteLabelParamsUsingGET_parameters.logoImageChecksum = !!getWhiteLabelParamsUsingGET_parameters.logoImageChecksum ? getWhiteLabelParamsUsingGET_parameters.logoImageChecksum : msg.payload;
                
                getWhiteLabelParamsUsingGET_nodeParam = node.getWhiteLabelParamsUsingGET_faviconChecksum;
                getWhiteLabelParamsUsingGET_nodeParamType = node.getWhiteLabelParamsUsingGET_faviconChecksumType;
                if (getWhiteLabelParamsUsingGET_nodeParamType === 'str') {
                    getWhiteLabelParamsUsingGET_parameters.faviconChecksum = getWhiteLabelParamsUsingGET_nodeParam || '';
                } else {
                    getWhiteLabelParamsUsingGET_parameters.faviconChecksum = RED.util.getMessageProperty(msg, getWhiteLabelParamsUsingGET_nodeParam);
                }
                getWhiteLabelParamsUsingGET_parameters.faviconChecksum = !!getWhiteLabelParamsUsingGET_parameters.faviconChecksum ? getWhiteLabelParamsUsingGET_parameters.faviconChecksum : msg.payload;
                                result = client.getWhiteLabelParamsUsingGET(getWhiteLabelParamsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveWidgetTypeUsingPOST') {
                var saveWidgetTypeUsingPOST_parameters = [];
                var saveWidgetTypeUsingPOST_nodeParam;
                var saveWidgetTypeUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveWidgetTypeUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveWidgetTypeUsingPOST(saveWidgetTypeUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getWidgetTypeByIdUsingGET') {
                var getWidgetTypeByIdUsingGET_parameters = [];
                var getWidgetTypeByIdUsingGET_nodeParam;
                var getWidgetTypeByIdUsingGET_nodeParamType;

                getWidgetTypeByIdUsingGET_nodeParam = node.getWidgetTypeByIdUsingGET_widgetTypeId;
                getWidgetTypeByIdUsingGET_nodeParamType = node.getWidgetTypeByIdUsingGET_widgetTypeIdType;
                if (getWidgetTypeByIdUsingGET_nodeParamType === 'str') {
                    getWidgetTypeByIdUsingGET_parameters.widgetTypeId = getWidgetTypeByIdUsingGET_nodeParam || '';
                } else {
                    getWidgetTypeByIdUsingGET_parameters.widgetTypeId = RED.util.getMessageProperty(msg, getWidgetTypeByIdUsingGET_nodeParam);
                }
                getWidgetTypeByIdUsingGET_parameters.widgetTypeId = !!getWidgetTypeByIdUsingGET_parameters.widgetTypeId ? getWidgetTypeByIdUsingGET_parameters.widgetTypeId : msg.payload;
                                result = client.getWidgetTypeByIdUsingGET(getWidgetTypeByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteWidgetTypeUsingDELETE') {
                var deleteWidgetTypeUsingDELETE_parameters = [];
                var deleteWidgetTypeUsingDELETE_nodeParam;
                var deleteWidgetTypeUsingDELETE_nodeParamType;

                deleteWidgetTypeUsingDELETE_nodeParam = node.deleteWidgetTypeUsingDELETE_widgetTypeId;
                deleteWidgetTypeUsingDELETE_nodeParamType = node.deleteWidgetTypeUsingDELETE_widgetTypeIdType;
                if (deleteWidgetTypeUsingDELETE_nodeParamType === 'str') {
                    deleteWidgetTypeUsingDELETE_parameters.widgetTypeId = deleteWidgetTypeUsingDELETE_nodeParam || '';
                } else {
                    deleteWidgetTypeUsingDELETE_parameters.widgetTypeId = RED.util.getMessageProperty(msg, deleteWidgetTypeUsingDELETE_nodeParam);
                }
                deleteWidgetTypeUsingDELETE_parameters.widgetTypeId = !!deleteWidgetTypeUsingDELETE_parameters.widgetTypeId ? deleteWidgetTypeUsingDELETE_parameters.widgetTypeId : msg.payload;
                                result = client.deleteWidgetTypeUsingDELETE(deleteWidgetTypeUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getBundleWidgetTypesDetailsUsingGET') {
                var getBundleWidgetTypesDetailsUsingGET_parameters = [];
                var getBundleWidgetTypesDetailsUsingGET_nodeParam;
                var getBundleWidgetTypesDetailsUsingGET_nodeParamType;

                getBundleWidgetTypesDetailsUsingGET_nodeParam = node.getBundleWidgetTypesDetailsUsingGET_isSystem;
                getBundleWidgetTypesDetailsUsingGET_nodeParamType = node.getBundleWidgetTypesDetailsUsingGET_isSystemType;
                if (getBundleWidgetTypesDetailsUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesDetailsUsingGET_parameters.isSystem = getBundleWidgetTypesDetailsUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesDetailsUsingGET_parameters.isSystem = RED.util.getMessageProperty(msg, getBundleWidgetTypesDetailsUsingGET_nodeParam);
                }
                getBundleWidgetTypesDetailsUsingGET_parameters.isSystem = !!getBundleWidgetTypesDetailsUsingGET_parameters.isSystem ? getBundleWidgetTypesDetailsUsingGET_parameters.isSystem : msg.payload;
                
                getBundleWidgetTypesDetailsUsingGET_nodeParam = node.getBundleWidgetTypesDetailsUsingGET_bundleAlias;
                getBundleWidgetTypesDetailsUsingGET_nodeParamType = node.getBundleWidgetTypesDetailsUsingGET_bundleAliasType;
                if (getBundleWidgetTypesDetailsUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesDetailsUsingGET_parameters.bundleAlias = getBundleWidgetTypesDetailsUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesDetailsUsingGET_parameters.bundleAlias = RED.util.getMessageProperty(msg, getBundleWidgetTypesDetailsUsingGET_nodeParam);
                }
                getBundleWidgetTypesDetailsUsingGET_parameters.bundleAlias = !!getBundleWidgetTypesDetailsUsingGET_parameters.bundleAlias ? getBundleWidgetTypesDetailsUsingGET_parameters.bundleAlias : msg.payload;
                                result = client.getBundleWidgetTypesDetailsUsingGET(getBundleWidgetTypesDetailsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getBundleWidgetTypesInfosUsingGET') {
                var getBundleWidgetTypesInfosUsingGET_parameters = [];
                var getBundleWidgetTypesInfosUsingGET_nodeParam;
                var getBundleWidgetTypesInfosUsingGET_nodeParamType;

                getBundleWidgetTypesInfosUsingGET_nodeParam = node.getBundleWidgetTypesInfosUsingGET_isSystem;
                getBundleWidgetTypesInfosUsingGET_nodeParamType = node.getBundleWidgetTypesInfosUsingGET_isSystemType;
                if (getBundleWidgetTypesInfosUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesInfosUsingGET_parameters.isSystem = getBundleWidgetTypesInfosUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesInfosUsingGET_parameters.isSystem = RED.util.getMessageProperty(msg, getBundleWidgetTypesInfosUsingGET_nodeParam);
                }
                getBundleWidgetTypesInfosUsingGET_parameters.isSystem = !!getBundleWidgetTypesInfosUsingGET_parameters.isSystem ? getBundleWidgetTypesInfosUsingGET_parameters.isSystem : msg.payload;
                
                getBundleWidgetTypesInfosUsingGET_nodeParam = node.getBundleWidgetTypesInfosUsingGET_bundleAlias;
                getBundleWidgetTypesInfosUsingGET_nodeParamType = node.getBundleWidgetTypesInfosUsingGET_bundleAliasType;
                if (getBundleWidgetTypesInfosUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesInfosUsingGET_parameters.bundleAlias = getBundleWidgetTypesInfosUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesInfosUsingGET_parameters.bundleAlias = RED.util.getMessageProperty(msg, getBundleWidgetTypesInfosUsingGET_nodeParam);
                }
                getBundleWidgetTypesInfosUsingGET_parameters.bundleAlias = !!getBundleWidgetTypesInfosUsingGET_parameters.bundleAlias ? getBundleWidgetTypesInfosUsingGET_parameters.bundleAlias : msg.payload;
                                result = client.getBundleWidgetTypesInfosUsingGET(getBundleWidgetTypesInfosUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getBundleWidgetTypesUsingGET') {
                var getBundleWidgetTypesUsingGET_parameters = [];
                var getBundleWidgetTypesUsingGET_nodeParam;
                var getBundleWidgetTypesUsingGET_nodeParamType;

                getBundleWidgetTypesUsingGET_nodeParam = node.getBundleWidgetTypesUsingGET_isSystem;
                getBundleWidgetTypesUsingGET_nodeParamType = node.getBundleWidgetTypesUsingGET_isSystemType;
                if (getBundleWidgetTypesUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesUsingGET_parameters.isSystem = getBundleWidgetTypesUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesUsingGET_parameters.isSystem = RED.util.getMessageProperty(msg, getBundleWidgetTypesUsingGET_nodeParam);
                }
                getBundleWidgetTypesUsingGET_parameters.isSystem = !!getBundleWidgetTypesUsingGET_parameters.isSystem ? getBundleWidgetTypesUsingGET_parameters.isSystem : msg.payload;
                
                getBundleWidgetTypesUsingGET_nodeParam = node.getBundleWidgetTypesUsingGET_bundleAlias;
                getBundleWidgetTypesUsingGET_nodeParamType = node.getBundleWidgetTypesUsingGET_bundleAliasType;
                if (getBundleWidgetTypesUsingGET_nodeParamType === 'str') {
                    getBundleWidgetTypesUsingGET_parameters.bundleAlias = getBundleWidgetTypesUsingGET_nodeParam || '';
                } else {
                    getBundleWidgetTypesUsingGET_parameters.bundleAlias = RED.util.getMessageProperty(msg, getBundleWidgetTypesUsingGET_nodeParam);
                }
                getBundleWidgetTypesUsingGET_parameters.bundleAlias = !!getBundleWidgetTypesUsingGET_parameters.bundleAlias ? getBundleWidgetTypesUsingGET_parameters.bundleAlias : msg.payload;
                                result = client.getBundleWidgetTypesUsingGET(getBundleWidgetTypesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getWidgetTypeUsingGET') {
                var getWidgetTypeUsingGET_parameters = [];
                var getWidgetTypeUsingGET_nodeParam;
                var getWidgetTypeUsingGET_nodeParamType;

                getWidgetTypeUsingGET_nodeParam = node.getWidgetTypeUsingGET_isSystem;
                getWidgetTypeUsingGET_nodeParamType = node.getWidgetTypeUsingGET_isSystemType;
                if (getWidgetTypeUsingGET_nodeParamType === 'str') {
                    getWidgetTypeUsingGET_parameters.isSystem = getWidgetTypeUsingGET_nodeParam || '';
                } else {
                    getWidgetTypeUsingGET_parameters.isSystem = RED.util.getMessageProperty(msg, getWidgetTypeUsingGET_nodeParam);
                }
                getWidgetTypeUsingGET_parameters.isSystem = !!getWidgetTypeUsingGET_parameters.isSystem ? getWidgetTypeUsingGET_parameters.isSystem : msg.payload;
                
                getWidgetTypeUsingGET_nodeParam = node.getWidgetTypeUsingGET_bundleAlias;
                getWidgetTypeUsingGET_nodeParamType = node.getWidgetTypeUsingGET_bundleAliasType;
                if (getWidgetTypeUsingGET_nodeParamType === 'str') {
                    getWidgetTypeUsingGET_parameters.bundleAlias = getWidgetTypeUsingGET_nodeParam || '';
                } else {
                    getWidgetTypeUsingGET_parameters.bundleAlias = RED.util.getMessageProperty(msg, getWidgetTypeUsingGET_nodeParam);
                }
                getWidgetTypeUsingGET_parameters.bundleAlias = !!getWidgetTypeUsingGET_parameters.bundleAlias ? getWidgetTypeUsingGET_parameters.bundleAlias : msg.payload;
                
                getWidgetTypeUsingGET_nodeParam = node.getWidgetTypeUsingGET_alias;
                getWidgetTypeUsingGET_nodeParamType = node.getWidgetTypeUsingGET_aliasType;
                if (getWidgetTypeUsingGET_nodeParamType === 'str') {
                    getWidgetTypeUsingGET_parameters.alias = getWidgetTypeUsingGET_nodeParam || '';
                } else {
                    getWidgetTypeUsingGET_parameters.alias = RED.util.getMessageProperty(msg, getWidgetTypeUsingGET_nodeParam);
                }
                getWidgetTypeUsingGET_parameters.alias = !!getWidgetTypeUsingGET_parameters.alias ? getWidgetTypeUsingGET_parameters.alias : msg.payload;
                                result = client.getWidgetTypeUsingGET(getWidgetTypeUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveWidgetsBundleUsingPOST') {
                var saveWidgetsBundleUsingPOST_parameters = [];
                var saveWidgetsBundleUsingPOST_nodeParam;
                var saveWidgetsBundleUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveWidgetsBundleUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveWidgetsBundleUsingPOST(saveWidgetsBundleUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getWidgetsBundleByIdUsingGET') {
                var getWidgetsBundleByIdUsingGET_parameters = [];
                var getWidgetsBundleByIdUsingGET_nodeParam;
                var getWidgetsBundleByIdUsingGET_nodeParamType;

                getWidgetsBundleByIdUsingGET_nodeParam = node.getWidgetsBundleByIdUsingGET_widgetsBundleId;
                getWidgetsBundleByIdUsingGET_nodeParamType = node.getWidgetsBundleByIdUsingGET_widgetsBundleIdType;
                if (getWidgetsBundleByIdUsingGET_nodeParamType === 'str') {
                    getWidgetsBundleByIdUsingGET_parameters.widgetsBundleId = getWidgetsBundleByIdUsingGET_nodeParam || '';
                } else {
                    getWidgetsBundleByIdUsingGET_parameters.widgetsBundleId = RED.util.getMessageProperty(msg, getWidgetsBundleByIdUsingGET_nodeParam);
                }
                getWidgetsBundleByIdUsingGET_parameters.widgetsBundleId = !!getWidgetsBundleByIdUsingGET_parameters.widgetsBundleId ? getWidgetsBundleByIdUsingGET_parameters.widgetsBundleId : msg.payload;
                                result = client.getWidgetsBundleByIdUsingGET(getWidgetsBundleByIdUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'deleteWidgetsBundleUsingDELETE') {
                var deleteWidgetsBundleUsingDELETE_parameters = [];
                var deleteWidgetsBundleUsingDELETE_nodeParam;
                var deleteWidgetsBundleUsingDELETE_nodeParamType;

                deleteWidgetsBundleUsingDELETE_nodeParam = node.deleteWidgetsBundleUsingDELETE_widgetsBundleId;
                deleteWidgetsBundleUsingDELETE_nodeParamType = node.deleteWidgetsBundleUsingDELETE_widgetsBundleIdType;
                if (deleteWidgetsBundleUsingDELETE_nodeParamType === 'str') {
                    deleteWidgetsBundleUsingDELETE_parameters.widgetsBundleId = deleteWidgetsBundleUsingDELETE_nodeParam || '';
                } else {
                    deleteWidgetsBundleUsingDELETE_parameters.widgetsBundleId = RED.util.getMessageProperty(msg, deleteWidgetsBundleUsingDELETE_nodeParam);
                }
                deleteWidgetsBundleUsingDELETE_parameters.widgetsBundleId = !!deleteWidgetsBundleUsingDELETE_parameters.widgetsBundleId ? deleteWidgetsBundleUsingDELETE_parameters.widgetsBundleId : msg.payload;
                                result = client.deleteWidgetsBundleUsingDELETE(deleteWidgetsBundleUsingDELETE_parameters);
            }
            if (!errorFlag && node.method === 'getWidgetsBundlesUsingGET') {
                var getWidgetsBundlesUsingGET_parameters = [];
                var getWidgetsBundlesUsingGET_nodeParam;
                var getWidgetsBundlesUsingGET_nodeParamType;
                result = client.getWidgetsBundlesUsingGET(getWidgetsBundlesUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'getWidgetsBundlesUsingGET_1') {
                var getWidgetsBundlesUsingGET_1_parameters = [];
                var getWidgetsBundlesUsingGET_1_nodeParam;
                var getWidgetsBundlesUsingGET_1_nodeParamType;

                getWidgetsBundlesUsingGET_1_nodeParam = node.getWidgetsBundlesUsingGET_1_pageSize;
                getWidgetsBundlesUsingGET_1_nodeParamType = node.getWidgetsBundlesUsingGET_1_pageSizeType;
                if (getWidgetsBundlesUsingGET_1_nodeParamType === 'str') {
                    getWidgetsBundlesUsingGET_1_parameters.pageSize = getWidgetsBundlesUsingGET_1_nodeParam || '';
                } else {
                    getWidgetsBundlesUsingGET_1_parameters.pageSize = RED.util.getMessageProperty(msg, getWidgetsBundlesUsingGET_1_nodeParam);
                }
                getWidgetsBundlesUsingGET_1_parameters.pageSize = !!getWidgetsBundlesUsingGET_1_parameters.pageSize ? getWidgetsBundlesUsingGET_1_parameters.pageSize : msg.payload;
                
                getWidgetsBundlesUsingGET_1_nodeParam = node.getWidgetsBundlesUsingGET_1_page;
                getWidgetsBundlesUsingGET_1_nodeParamType = node.getWidgetsBundlesUsingGET_1_pageType;
                if (getWidgetsBundlesUsingGET_1_nodeParamType === 'str') {
                    getWidgetsBundlesUsingGET_1_parameters.page = getWidgetsBundlesUsingGET_1_nodeParam || '';
                } else {
                    getWidgetsBundlesUsingGET_1_parameters.page = RED.util.getMessageProperty(msg, getWidgetsBundlesUsingGET_1_nodeParam);
                }
                getWidgetsBundlesUsingGET_1_parameters.page = !!getWidgetsBundlesUsingGET_1_parameters.page ? getWidgetsBundlesUsingGET_1_parameters.page : msg.payload;
                
                getWidgetsBundlesUsingGET_1_nodeParam = node.getWidgetsBundlesUsingGET_1_textSearch;
                getWidgetsBundlesUsingGET_1_nodeParamType = node.getWidgetsBundlesUsingGET_1_textSearchType;
                if (getWidgetsBundlesUsingGET_1_nodeParamType === 'str') {
                    getWidgetsBundlesUsingGET_1_parameters.textSearch = getWidgetsBundlesUsingGET_1_nodeParam || '';
                } else {
                    getWidgetsBundlesUsingGET_1_parameters.textSearch = RED.util.getMessageProperty(msg, getWidgetsBundlesUsingGET_1_nodeParam);
                }
                getWidgetsBundlesUsingGET_1_parameters.textSearch = !!getWidgetsBundlesUsingGET_1_parameters.textSearch ? getWidgetsBundlesUsingGET_1_parameters.textSearch : msg.payload;
                
                getWidgetsBundlesUsingGET_1_nodeParam = node.getWidgetsBundlesUsingGET_1_sortProperty;
                getWidgetsBundlesUsingGET_1_nodeParamType = node.getWidgetsBundlesUsingGET_1_sortPropertyType;
                if (getWidgetsBundlesUsingGET_1_nodeParamType === 'str') {
                    getWidgetsBundlesUsingGET_1_parameters.sortProperty = getWidgetsBundlesUsingGET_1_nodeParam || '';
                } else {
                    getWidgetsBundlesUsingGET_1_parameters.sortProperty = RED.util.getMessageProperty(msg, getWidgetsBundlesUsingGET_1_nodeParam);
                }
                getWidgetsBundlesUsingGET_1_parameters.sortProperty = !!getWidgetsBundlesUsingGET_1_parameters.sortProperty ? getWidgetsBundlesUsingGET_1_parameters.sortProperty : msg.payload;
                
                getWidgetsBundlesUsingGET_1_nodeParam = node.getWidgetsBundlesUsingGET_1_sortOrder;
                getWidgetsBundlesUsingGET_1_nodeParamType = node.getWidgetsBundlesUsingGET_1_sortOrderType;
                if (getWidgetsBundlesUsingGET_1_nodeParamType === 'str') {
                    getWidgetsBundlesUsingGET_1_parameters.sortOrder = getWidgetsBundlesUsingGET_1_nodeParam || '';
                } else {
                    getWidgetsBundlesUsingGET_1_parameters.sortOrder = RED.util.getMessageProperty(msg, getWidgetsBundlesUsingGET_1_nodeParam);
                }
                getWidgetsBundlesUsingGET_1_parameters.sortOrder = !!getWidgetsBundlesUsingGET_1_parameters.sortOrder ? getWidgetsBundlesUsingGET_1_parameters.sortOrder : msg.payload;
                                result = client.getWidgetsBundlesUsingGET_1(getWidgetsBundlesUsingGET_1_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'ThingsboardPeRestApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('thingsboard-pe-rest-api', ThingsboardPeRestApiNode);
    function ThingsboardPeRestApiServiceNode(n) {
        RED.nodes.createNode(this, n);

    }

    RED.nodes.registerType('thingsboard-pe-rest-api-service', ThingsboardPeRestApiServiceNode, {
        credentials: {
            temp: { type: 'text' }
        }
    });
};
