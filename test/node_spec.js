var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('thingsboard-pe-rest-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'thingsboard-pe-rest-api');
            done();
        });
    });

    it('should handle getSecuritySettingsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSecuritySettingsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveSecuritySettingsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveSecuritySettingsUsingPOST',
                saveSecuritySettingsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveAdminSettingsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveAdminSettingsUsingPOST',
                saveAdminSettingsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle sendTestMailUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'sendTestMailUsingPOST',
                sendTestMailUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle sendTestSmsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'sendTestSmsUsingPOST',
                sendTestSmsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAdminSettingsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAdminSettingsUsingGET',
                getAdminSettingsUsingGET_key: '<node property>', // (1) define node properties
                getAdminSettingsUsingGET_systemByDefault: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkUpdatesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'checkUpdatesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle loginPost()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'loginPost',
                loginPost_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveAlarmUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveAlarmUsingPOST',
                saveAlarmUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getHighestAlarmSeverityUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getHighestAlarmSeverityUsingGET',
                getHighestAlarmSeverityUsingGET_entityType: '<node property>', // (1) define node properties
                getHighestAlarmSeverityUsingGET_entityId: '<node property>', // (1) define node properties
                getHighestAlarmSeverityUsingGET_searchStatus: '<node property>', // (1) define node properties
                getHighestAlarmSeverityUsingGET_status: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAlarmInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAlarmInfoByIdUsingGET',
                getAlarmInfoByIdUsingGET_alarmId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAlarmByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAlarmByIdUsingGET',
                getAlarmByIdUsingGET_alarmId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteAlarmUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteAlarmUsingDELETE',
                deleteAlarmUsingDELETE_alarmId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle ackAlarmUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'ackAlarmUsingPOST',
                ackAlarmUsingPOST_alarmId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle clearAlarmUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'clearAlarmUsingPOST',
                clearAlarmUsingPOST_alarmId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAlarmsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAlarmsUsingGET',
                getAlarmsUsingGET_entityType: '<node property>', // (1) define node properties
                getAlarmsUsingGET_entityId: '<node property>', // (1) define node properties
                getAlarmsUsingGET_searchStatus: '<node property>', // (1) define node properties
                getAlarmsUsingGET_status: '<node property>', // (1) define node properties
                getAlarmsUsingGET_pageSize: '<node property>', // (1) define node properties
                getAlarmsUsingGET_page: '<node property>', // (1) define node properties
                getAlarmsUsingGET_textSearch: '<node property>', // (1) define node properties
                getAlarmsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAlarmsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAlarmsUsingGET_startTime: '<node property>', // (1) define node properties
                getAlarmsUsingGET_endTime: '<node property>', // (1) define node properties
                getAlarmsUsingGET_fetchOriginator: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAllAlarmsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAllAlarmsUsingGET',
                getAllAlarmsUsingGET_searchStatus: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_status: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_pageSize: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_page: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_textSearch: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_startTime: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_endTime: '<node property>', // (1) define node properties
                getAllAlarmsUsingGET_fetchOriginator: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle processAssetBulkImportUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'processAssetBulkImportUsingPOST',
                processAssetBulkImportUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAssetTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAssetTypesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAssetByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAssetByIdUsingGET',
                getAssetByIdUsingGET_assetId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteAssetUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteAssetUsingDELETE',
                deleteAssetUsingDELETE_assetId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByQueryUsingPOST',
                findByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAssetsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAssetsByIdsUsingGET',
                getAssetsByIdsUsingGET_assetIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveAssetUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveAssetUsingPOST',
                saveAssetUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveAssetUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerAssetsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerAssetsUsingGET',
                getCustomerAssetsUsingGET_customerId: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_page: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_type: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomerAssetsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAssetsByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAssetsByEntityGroupIdUsingGET',
                getAssetsByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getAssetsByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getAssetsByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getAssetsByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getAssetsByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAssetsByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantAssetUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantAssetUsingGET',
                getTenantAssetUsingGET_assetName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantAssetsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantAssetsUsingGET',
                getTenantAssetsUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantAssetsUsingGET_page: '<node property>', // (1) define node properties
                getTenantAssetsUsingGET_type: '<node property>', // (1) define node properties
                getTenantAssetsUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantAssetsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantAssetsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserAssetsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserAssetsUsingGET',
                getUserAssetsUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserAssetsUsingGET_page: '<node property>', // (1) define node properties
                getUserAssetsUsingGET_type: '<node property>', // (1) define node properties
                getUserAssetsUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserAssetsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserAssetsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAuditLogsByCustomerIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAuditLogsByCustomerIdUsingGET',
                getAuditLogsByCustomerIdUsingGET_customerId: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_page: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_startTime: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_endTime: '<node property>', // (1) define node properties
                getAuditLogsByCustomerIdUsingGET_actionTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAuditLogsByEntityIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAuditLogsByEntityIdUsingGET',
                getAuditLogsByEntityIdUsingGET_entityType: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_entityId: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_page: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_startTime: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_endTime: '<node property>', // (1) define node properties
                getAuditLogsByEntityIdUsingGET_actionTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAuditLogsByUserIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAuditLogsByUserIdUsingGET',
                getAuditLogsByUserIdUsingGET_userId: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_page: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_startTime: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_endTime: '<node property>', // (1) define node properties
                getAuditLogsByUserIdUsingGET_actionTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAuditLogsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAuditLogsUsingGET',
                getAuditLogsUsingGET_pageSize: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_page: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_textSearch: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_startTime: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_endTime: '<node property>', // (1) define node properties
                getAuditLogsUsingGET_actionTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle changePasswordUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'changePasswordUsingPOST',
                changePasswordUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle logoutUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'logoutUsingPOST',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkActivateTokenUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'checkActivateTokenUsingGET',
                checkActivateTokenUsingGET_activateToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateUserUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateUserUsingPOST',
                activateUserUsingPOST_sendActivationMail: '<node property>', // (1) define node properties
                activateUserUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle resetPasswordUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'resetPasswordUsingPOST',
                resetPasswordUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle requestResetPasswordByEmailUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'requestResetPasswordByEmailUsingPOST',
                requestResetPasswordByEmailUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkResetTokenUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'checkResetTokenUsingGET',
                checkResetTokenUsingGET_resetToken: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserPasswordPolicyUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserPasswordPolicyUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBlobEntitiesByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBlobEntitiesByIdsUsingGET',
                getBlobEntitiesByIdsUsingGET_blobEntityIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBlobEntitiesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBlobEntitiesUsingGET',
                getBlobEntitiesUsingGET_pageSize: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_page: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_type: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_textSearch: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_sortOrder: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_startTime: '<node property>', // (1) define node properties
                getBlobEntitiesUsingGET_endTime: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBlobEntityInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBlobEntityInfoByIdUsingGET',
                getBlobEntityInfoByIdUsingGET_blobEntityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteBlobEntityUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteBlobEntityUsingDELETE',
                deleteBlobEntityUsingDELETE_blobEntityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle downloadBlobEntityUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'downloadBlobEntityUsingGET',
                downloadBlobEntityUsingGET_blobEntityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getComponentDescriptorByClazzUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getComponentDescriptorByClazzUsingGET',
                getComponentDescriptorByClazzUsingGET_componentDescriptorClazz: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getComponentDescriptorsByTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getComponentDescriptorsByTypeUsingGET',
                getComponentDescriptorsByTypeUsingGET_componentType: '<node property>', // (1) define node properties
                getComponentDescriptorsByTypeUsingGET_ruleChainType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getComponentDescriptorsByTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getComponentDescriptorsByTypesUsingGET',
                getComponentDescriptorsByTypesUsingGET_componentTypes: '<node property>', // (1) define node properties
                getComponentDescriptorsByTypesUsingGET_ruleChainType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveConverterUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveConverterUsingPOST',
                saveConverterUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle testDownLinkConverterUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'testDownLinkConverterUsingPOST',
                testDownLinkConverterUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle testUpLinkConverterUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'testUpLinkConverterUsingPOST',
                testUpLinkConverterUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getConverterByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getConverterByIdUsingGET',
                getConverterByIdUsingGET_converterId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteConverterUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteConverterUsingDELETE',
                deleteConverterUsingDELETE_converterId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLatestConverterDebugInputUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLatestConverterDebugInputUsingGET',
                getLatestConverterDebugInputUsingGET_converterId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getConvertersByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getConvertersByIdsUsingGET',
                getConvertersByIdsUsingGET_converterIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getConvertersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getConvertersUsingGET',
                getConvertersUsingGET_pageSize: '<node property>', // (1) define node properties
                getConvertersUsingGET_page: '<node property>', // (1) define node properties
                getConvertersUsingGET_textSearch: '<node property>', // (1) define node properties
                getConvertersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getConvertersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCurrentCustomMenuUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCurrentCustomMenuUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomMenuUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomMenuUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveCustomMenuUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveCustomMenuUsingPOST',
                saveCustomMenuUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCurrentCustomTranslationUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCurrentCustomTranslationUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomTranslationUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomTranslationUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveCustomTranslationUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveCustomTranslationUsingPOST',
                saveCustomTranslationUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerByIdUsingGET',
                getCustomerByIdUsingGET_customerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteCustomerUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteCustomerUsingDELETE',
                deleteCustomerUsingDELETE_customerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getShortCustomerInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getShortCustomerInfoByIdUsingGET',
                getShortCustomerInfoByIdUsingGET_customerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerTitleByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerTitleByIdUsingGET',
                getCustomerTitleByIdUsingGET_customerId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomersByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomersByIdsUsingGET',
                getCustomersByIdsUsingGET_customerIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomersUsingGET',
                getCustomersUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomersUsingGET_page: '<node property>', // (1) define node properties
                getCustomersUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveCustomerUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveCustomerUsingPOST',
                saveCustomerUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveCustomerUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomersByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomersByEntityGroupIdUsingGET',
                getCustomersByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getCustomersByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomersByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getCustomersByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomersByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomersByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantCustomerUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantCustomerUsingGET',
                getTenantCustomerUsingGET_customerTitle: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserCustomersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserCustomersUsingGET',
                getUserCustomersUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserCustomersUsingGET_page: '<node property>', // (1) define node properties
                getUserCustomersUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserCustomersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserCustomersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerHomeDashboardInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerHomeDashboardInfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setCustomerHomeDashboardInfoUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setCustomerHomeDashboardInfoUsingPOST',
                setCustomerHomeDashboardInfoUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getHomeDashboardUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getHomeDashboardUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getHomeDashboardInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getHomeDashboardInfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDashboardInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDashboardInfoByIdUsingGET',
                getDashboardInfoByIdUsingGET_dashboardId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMaxDatapointsLimitUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getMaxDatapointsLimitUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getServerTimeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getServerTimeUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDashboardByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDashboardByIdUsingGET',
                getDashboardByIdUsingGET_dashboardId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDashboardUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteDashboardUsingDELETE',
                deleteDashboardUsingDELETE_dashboardId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDashboardsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDashboardsByIdsUsingGET',
                getDashboardsByIdsUsingGET_dashboardIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDashboardUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDashboardUsingPOST',
                saveDashboardUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveDashboardUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle exportGroupDashboardsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'exportGroupDashboardsUsingGET',
                exportGroupDashboardsUsingGET_entityGroupId: '<node property>', // (1) define node properties
                exportGroupDashboardsUsingGET_limit: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle importGroupDashboardsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'importGroupDashboardsUsingPOST',
                importGroupDashboardsUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                importGroupDashboardsUsingPOST_overwrite: '<node property>', // (1) define node properties
                importGroupDashboardsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDashboardsByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDashboardsByEntityGroupIdUsingGET',
                getDashboardsByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getDashboardsByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getDashboardsByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getDashboardsByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getDashboardsByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getDashboardsByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantHomeDashboardInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantHomeDashboardInfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setTenantHomeDashboardInfoUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setTenantHomeDashboardInfoUsingPOST',
                setTenantHomeDashboardInfoUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantDashboardsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantDashboardsUsingGET',
                getTenantDashboardsUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_page: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_mobile: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantDashboardsUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantDashboardsUsingGET_1',
                getTenantDashboardsUsingGET_1_tenantId: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_1_pageSize: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_1_page: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_1_textSearch: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_1_sortProperty: '<node property>', // (1) define node properties
                getTenantDashboardsUsingGET_1_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserDashboardsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserDashboardsUsingGET',
                getUserDashboardsUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_page: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_mobile: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_operation: '<node property>', // (1) define node properties
                getUserDashboardsUsingGET_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle reClaimDeviceUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'reClaimDeviceUsingDELETE',
                reClaimDeviceUsingDELETE_deviceName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle claimDeviceUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'claimDeviceUsingPOST',
                claimDeviceUsingPOST_deviceName: '<node property>', // (1) define node properties
                claimDeviceUsingPOST_subCustomerId: '<node property>', // (1) define node properties
                claimDeviceUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerDevicesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerDevicesUsingGET',
                getCustomerDevicesUsingGET_customerId: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_page: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_type: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomerDevicesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDeviceWithCredentialsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDeviceWithCredentialsUsingPOST',
                saveDeviceWithCredentialsUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveDeviceWithCredentialsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle processDevicesBulkImportUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'processDevicesBulkImportUsingPOST',
                processDevicesBulkImportUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle updateDeviceCredentialsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'updateDeviceCredentialsUsingPOST',
                updateDeviceCredentialsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceTypesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceByIdUsingGET',
                getDeviceByIdUsingGET_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDeviceUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteDeviceUsingDELETE',
                deleteDeviceUsingDELETE_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceCredentialsByDeviceIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceCredentialsByDeviceIdUsingGET',
                getDeviceCredentialsByDeviceIdUsingGET_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByQueryUsingPOST_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByQueryUsingPOST_1',
                findByQueryUsingPOST_1_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle countByDeviceProfileAndEmptyOtaPackageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'countByDeviceProfileAndEmptyOtaPackageUsingGET',
                countByDeviceProfileAndEmptyOtaPackageUsingGET_otaPackageType: '<node property>', // (1) define node properties
                countByDeviceProfileAndEmptyOtaPackageUsingGET_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle countByDeviceGroupAndEmptyOtaPackageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'countByDeviceGroupAndEmptyOtaPackageUsingGET',
                countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageType: '<node property>', // (1) define node properties
                countByDeviceGroupAndEmptyOtaPackageUsingGET_otaPackageId: '<node property>', // (1) define node properties
                countByDeviceGroupAndEmptyOtaPackageUsingGET_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDevicesByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDevicesByIdsUsingGET',
                getDevicesByIdsUsingGET_deviceIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDeviceUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDeviceUsingPOST',
                saveDeviceUsingPOST_accessToken: '<node property>', // (1) define node properties
                saveDeviceUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveDeviceUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDevicesByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDevicesByEntityGroupIdUsingGET',
                getDevicesByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getDevicesByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getDevicesByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getDevicesByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getDevicesByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getDevicesByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantDeviceUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantDeviceUsingGET',
                getTenantDeviceUsingGET_deviceName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantDevicesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantDevicesUsingGET',
                getTenantDevicesUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantDevicesUsingGET_page: '<node property>', // (1) define node properties
                getTenantDevicesUsingGET_type: '<node property>', // (1) define node properties
                getTenantDevicesUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantDevicesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantDevicesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle assignDeviceToTenantUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'assignDeviceToTenantUsingPOST',
                assignDeviceToTenantUsingPOST_tenantId: '<node property>', // (1) define node properties
                assignDeviceToTenantUsingPOST_deviceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserDevicesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserDevicesUsingGET',
                getUserDevicesUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserDevicesUsingGET_page: '<node property>', // (1) define node properties
                getUserDevicesUsingGET_type: '<node property>', // (1) define node properties
                getUserDevicesUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserDevicesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserDevicesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDeviceGroupOtaPackageUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDeviceGroupOtaPackageUsingPOST',
                saveDeviceGroupOtaPackageUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getFirmwareByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getFirmwareByIdUsingGET',
                getFirmwareByIdUsingGET_groupId: '<node property>', // (1) define node properties
                getFirmwareByIdUsingGET_firmwareType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDeviceGroupOtaPackageUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteDeviceGroupOtaPackageUsingDELETE',
                deleteDeviceGroupOtaPackageUsingDELETE_id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDeviceProfileUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDeviceProfileUsingPOST',
                saveDeviceProfileUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAttributesKeysUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAttributesKeysUsingGET',
                getAttributesKeysUsingGET_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTimeseriesKeysUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTimeseriesKeysUsingGET',
                getTimeseriesKeysUsingGET_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceProfileByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceProfileByIdUsingGET',
                getDeviceProfileByIdUsingGET_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDeviceProfileUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteDeviceProfileUsingDELETE',
                deleteDeviceProfileUsingDELETE_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setDefaultDeviceProfileUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setDefaultDeviceProfileUsingPOST',
                setDefaultDeviceProfileUsingPOST_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDefaultDeviceProfileInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDefaultDeviceProfileInfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceProfileInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceProfileInfoByIdUsingGET',
                getDeviceProfileInfoByIdUsingGET_deviceProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceProfileInfosUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceProfileInfosUsingGET',
                getDeviceProfileInfosUsingGET_pageSize: '<node property>', // (1) define node properties
                getDeviceProfileInfosUsingGET_page: '<node property>', // (1) define node properties
                getDeviceProfileInfosUsingGET_textSearch: '<node property>', // (1) define node properties
                getDeviceProfileInfosUsingGET_sortProperty: '<node property>', // (1) define node properties
                getDeviceProfileInfosUsingGET_sortOrder: '<node property>', // (1) define node properties
                getDeviceProfileInfosUsingGET_transportType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDeviceProfilesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDeviceProfilesUsingGET',
                getDeviceProfilesUsingGET_pageSize: '<node property>', // (1) define node properties
                getDeviceProfilesUsingGET_page: '<node property>', // (1) define node properties
                getDeviceProfilesUsingGET_textSearch: '<node property>', // (1) define node properties
                getDeviceProfilesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getDeviceProfilesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerEdgesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerEdgesUsingGET',
                getCustomerEdgesUsingGET_customerId: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_page: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_type: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomerEdgesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle processEdgesBulkImportUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'processEdgesBulkImportUsingPOST',
                processEdgesBulkImportUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findMissingToRelatedRuleChainsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findMissingToRelatedRuleChainsUsingGET',
                findMissingToRelatedRuleChainsUsingGET_edgeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle syncEdgeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'syncEdgeUsingPOST',
                syncEdgeUsingPOST_edgeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeTypesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeByIdUsingGET',
                getEdgeByIdUsingGET_edgeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteEdgeUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteEdgeUsingDELETE',
                deleteEdgeUsingDELETE_edgeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setEdgeRootRuleChainUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setEdgeRootRuleChainUsingPOST',
                setEdgeRootRuleChainUsingPOST_edgeId: '<node property>', // (1) define node properties
                setEdgeRootRuleChainUsingPOST_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByQueryUsingPOST_2()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByQueryUsingPOST_2',
                findByQueryUsingPOST_2_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle isEdgesSupportEnabledUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'isEdgesSupportEnabledUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgesByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgesByIdsUsingGET',
                getEdgesByIdsUsingGET_edgeIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgesUsingGET',
                getEdgesUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgesUsingGET_page: '<node property>', // (1) define node properties
                getEdgesUsingGET_textSearch: '<node property>', // (1) define node properties
                getEdgesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEdgeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEdgeUsingPOST',
                saveEdgeUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveEdgeUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgesByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgesByEntityGroupIdUsingGET',
                getEdgesByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getEdgesByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgesByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getEdgesByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getEdgesByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgesByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateInstanceUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateInstanceUsingPOST',
                activateInstanceUsingPOST_licenseSecret: '<node property>', // (1) define node properties
                activateInstanceUsingPOST_releaseDate: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkInstanceUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'checkInstanceUsingPOST',
                checkInstanceUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantEdgeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantEdgeUsingGET',
                getTenantEdgeUsingGET_edgeName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantEdgesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantEdgesUsingGET',
                getTenantEdgesUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantEdgesUsingGET_page: '<node property>', // (1) define node properties
                getTenantEdgesUsingGET_type: '<node property>', // (1) define node properties
                getTenantEdgesUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantEdgesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantEdgesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserEdgesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserEdgesUsingGET',
                getUserEdgesUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserEdgesUsingGET_page: '<node property>', // (1) define node properties
                getUserEdgesUsingGET_type: '<node property>', // (1) define node properties
                getUserEdgesUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserEdgesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserEdgesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeEventsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeEventsUsingGET',
                getEdgeEventsUsingGET_edgeId: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_page: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_textSearch: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_startTime: '<node property>', // (1) define node properties
                getEdgeEventsUsingGET_endTime: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAllEdgeEntityGroupsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAllEdgeEntityGroupsUsingGET',
                getAllEdgeEntityGroupsUsingGET_edgeId: '<node property>', // (1) define node properties
                getAllEdgeEntityGroupsUsingGET_groupType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle assignEntityGroupToEdgeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'assignEntityGroupToEdgeUsingPOST',
                assignEntityGroupToEdgeUsingPOST_edgeId: '<node property>', // (1) define node properties
                assignEntityGroupToEdgeUsingPOST_groupType: '<node property>', // (1) define node properties
                assignEntityGroupToEdgeUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unassignEntityGroupFromEdgeUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'unassignEntityGroupFromEdgeUsingDELETE',
                unassignEntityGroupFromEdgeUsingDELETE_edgeId: '<node property>', // (1) define node properties
                unassignEntityGroupFromEdgeUsingDELETE_groupType: '<node property>', // (1) define node properties
                unassignEntityGroupFromEdgeUsingDELETE_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityGroupUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityGroupUsingPOST',
                saveEntityGroupUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupAllByOwnerAndTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupAllByOwnerAndTypeUsingGET',
                getEntityGroupAllByOwnerAndTypeUsingGET_ownerType: '<node property>', // (1) define node properties
                getEntityGroupAllByOwnerAndTypeUsingGET_ownerId: '<node property>', // (1) define node properties
                getEntityGroupAllByOwnerAndTypeUsingGET_groupType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupByIdUsingGET',
                getEntityGroupByIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteEntityGroupUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteEntityGroupUsingDELETE',
                deleteEntityGroupUsingDELETE_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addEntitiesToEntityGroupUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'addEntitiesToEntityGroupUsingPOST',
                addEntitiesToEntityGroupUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                addEntitiesToEntityGroupUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeEntitiesFromEntityGroupUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'removeEntitiesFromEntityGroupUsingPOST',
                removeEntitiesFromEntityGroupUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                removeEntitiesFromEntityGroupUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntitiesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntitiesUsingGET',
                getEntitiesUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getEntitiesUsingGET_pageSize: '<node property>', // (1) define node properties
                getEntitiesUsingGET_page: '<node property>', // (1) define node properties
                getEntitiesUsingGET_textSearch: '<node property>', // (1) define node properties
                getEntitiesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEntitiesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle makeEntityGroupPrivateUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'makeEntityGroupPrivateUsingPOST',
                makeEntityGroupPrivateUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle makeEntityGroupPublicUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'makeEntityGroupPublicUsingPOST',
                makeEntityGroupPublicUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle shareEntityGroupUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'shareEntityGroupUsingPOST',
                shareEntityGroupUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                shareEntityGroupUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getGroupEntityUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getGroupEntityUsingGET',
                getGroupEntityUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getGroupEntityUsingGET_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle shareEntityGroupToChildOwnerUserGroupUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'shareEntityGroupToChildOwnerUserGroupUsingPOST',
                shareEntityGroupToChildOwnerUserGroupUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                shareEntityGroupToChildOwnerUserGroupUsingPOST_userGroupId: '<node property>', // (1) define node properties
                shareEntityGroupToChildOwnerUserGroupUsingPOST_roleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupByOwnerAndNameAndTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupByOwnerAndNameAndTypeUsingGET',
                getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerType: '<node property>', // (1) define node properties
                getEntityGroupByOwnerAndNameAndTypeUsingGET_ownerId: '<node property>', // (1) define node properties
                getEntityGroupByOwnerAndNameAndTypeUsingGET_groupType: '<node property>', // (1) define node properties
                getEntityGroupByOwnerAndNameAndTypeUsingGET_groupName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeEntityGroupsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeEntityGroupsUsingGET',
                getEdgeEntityGroupsUsingGET_edgeId: '<node property>', // (1) define node properties
                getEdgeEntityGroupsUsingGET_groupType: '<node property>', // (1) define node properties
                getEdgeEntityGroupsUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgeEntityGroupsUsingGET_page: '<node property>', // (1) define node properties
                getEdgeEntityGroupsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgeEntityGroupsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupsForEntityUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupsForEntityUsingGET',
                getEntityGroupsForEntityUsingGET_entityType: '<node property>', // (1) define node properties
                getEntityGroupsForEntityUsingGET_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupsByTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupsByTypeUsingGET',
                getEntityGroupsByTypeUsingGET_groupType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupsByOwnerAndTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupsByOwnerAndTypeUsingGET',
                getEntityGroupsByOwnerAndTypeUsingGET_ownerType: '<node property>', // (1) define node properties
                getEntityGroupsByOwnerAndTypeUsingGET_ownerId: '<node property>', // (1) define node properties
                getEntityGroupsByOwnerAndTypeUsingGET_groupType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupsByIdsUsingGET',
                getEntityGroupsByIdsUsingGET_entityGroupIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOwnersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOwnersUsingGET',
                getOwnersUsingGET_pageSize: '<node property>', // (1) define node properties
                getOwnersUsingGET_page: '<node property>', // (1) define node properties
                getOwnersUsingGET_textSearch: '<node property>', // (1) define node properties
                getOwnersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getOwnersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findAlarmDataByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findAlarmDataByQueryUsingPOST',
                findAlarmDataByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle countEntitiesByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'countEntitiesByQueryUsingPOST',
                countEntitiesByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findEntityDataByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findEntityDataByQueryUsingPOST',
                findEntityDataByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findEntityTimeseriesAndAttributesKeysByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findEntityTimeseriesAndAttributesKeysByQueryUsingPOST',
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_timeseries: '<node property>', // (1) define node properties
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_attributes: '<node property>', // (1) define node properties
                findEntityTimeseriesAndAttributesKeysByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveRelationUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveRelationUsingPOST',
                saveRelationUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByQueryUsingPOST_3()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByQueryUsingPOST_3',
                findByQueryUsingPOST_3_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findInfoByQueryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findInfoByQueryUsingPOST',
                findInfoByQueryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findInfoByFromUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findInfoByFromUsingGET',
                findInfoByFromUsingGET_fromId: '<node property>', // (1) define node properties
                findInfoByFromUsingGET_fromType: '<node property>', // (1) define node properties
                findInfoByFromUsingGET_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findInfoByToUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findInfoByToUsingGET',
                findInfoByToUsingGET_toId: '<node property>', // (1) define node properties
                findInfoByToUsingGET_toType: '<node property>', // (1) define node properties
                findInfoByToUsingGET_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteRelationsUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteRelationsUsingDELETE',
                deleteRelationsUsingDELETE_entityId: '<node property>', // (1) define node properties
                deleteRelationsUsingDELETE_entityType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByFromUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByFromUsingGET',
                findByFromUsingGET_fromId: '<node property>', // (1) define node properties
                findByFromUsingGET_fromType: '<node property>', // (1) define node properties
                findByFromUsingGET_relationType: '<node property>', // (1) define node properties
                findByFromUsingGET_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByFromUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByFromUsingGET_1',
                findByFromUsingGET_1_fromId: '<node property>', // (1) define node properties
                findByFromUsingGET_1_fromType: '<node property>', // (1) define node properties
                findByFromUsingGET_1_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByToUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByToUsingGET',
                findByToUsingGET_toId: '<node property>', // (1) define node properties
                findByToUsingGET_toType: '<node property>', // (1) define node properties
                findByToUsingGET_relationType: '<node property>', // (1) define node properties
                findByToUsingGET_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByToUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByToUsingGET_1',
                findByToUsingGET_1_toId: '<node property>', // (1) define node properties
                findByToUsingGET_1_toType: '<node property>', // (1) define node properties
                findByToUsingGET_1_relationTypeGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRelationUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRelationUsingGET',
                getRelationUsingGET_fromId: '<node property>', // (1) define node properties
                getRelationUsingGET_fromType: '<node property>', // (1) define node properties
                getRelationUsingGET_relationType: '<node property>', // (1) define node properties
                getRelationUsingGET_relationTypeGroup: '<node property>', // (1) define node properties
                getRelationUsingGET_toId: '<node property>', // (1) define node properties
                getRelationUsingGET_toType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteRelationUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteRelationUsingDELETE',
                deleteRelationUsingDELETE_fromId: '<node property>', // (1) define node properties
                deleteRelationUsingDELETE_fromType: '<node property>', // (1) define node properties
                deleteRelationUsingDELETE_relationType: '<node property>', // (1) define node properties
                deleteRelationUsingDELETE_relationTypeGroup: '<node property>', // (1) define node properties
                deleteRelationUsingDELETE_toId: '<node property>', // (1) define node properties
                deleteRelationUsingDELETE_toType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerEntityViewsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerEntityViewsUsingGET',
                getCustomerEntityViewsUsingGET_customerId: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_page: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_type: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomerEntityViewsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityViewsByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityViewsByEntityGroupIdUsingGET',
                getEntityViewsByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getEntityViewsByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getEntityViewsByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getEntityViewsByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getEntityViewsByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEntityViewsByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityViewTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityViewTypesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityViewByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityViewByIdUsingGET',
                getEntityViewByIdUsingGET_entityViewId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteEntityViewUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteEntityViewUsingDELETE',
                deleteEntityViewUsingDELETE_entityViewId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle findByQueryUsingPOST_4()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'findByQueryUsingPOST_4',
                findByQueryUsingPOST_4_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityViewsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityViewsByIdsUsingGET',
                getEntityViewsByIdsUsingGET_entityViewIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityViewUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityViewUsingPOST',
                saveEntityViewUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveEntityViewUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantEntityViewUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantEntityViewUsingGET',
                getTenantEntityViewUsingGET_entityViewName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantEntityViewsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantEntityViewsUsingGET',
                getTenantEntityViewsUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantEntityViewsUsingGET_page: '<node property>', // (1) define node properties
                getTenantEntityViewsUsingGET_type: '<node property>', // (1) define node properties
                getTenantEntityViewsUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantEntityViewsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantEntityViewsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserEntityViewsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserEntityViewsUsingGET',
                getUserEntityViewsUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserEntityViewsUsingGET_page: '<node property>', // (1) define node properties
                getUserEntityViewsUsingGET_type: '<node property>', // (1) define node properties
                getUserEntityViewsUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserEntityViewsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserEntityViewsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle clearEventsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'clearEventsUsingPOST',
                clearEventsUsingPOST_entityType: '<node property>', // (1) define node properties
                clearEventsUsingPOST_entityId: '<node property>', // (1) define node properties
                clearEventsUsingPOST_startTime: '<node property>', // (1) define node properties
                clearEventsUsingPOST_endTime: '<node property>', // (1) define node properties
                clearEventsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEventsUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEventsUsingGET_1',
                getEventsUsingGET_1_entityType: '<node property>', // (1) define node properties
                getEventsUsingGET_1_entityId: '<node property>', // (1) define node properties
                getEventsUsingGET_1_eventType: '<node property>', // (1) define node properties
                getEventsUsingGET_1_tenantId: '<node property>', // (1) define node properties
                getEventsUsingGET_1_pageSize: '<node property>', // (1) define node properties
                getEventsUsingGET_1_page: '<node property>', // (1) define node properties
                getEventsUsingGET_1_textSearch: '<node property>', // (1) define node properties
                getEventsUsingGET_1_sortProperty: '<node property>', // (1) define node properties
                getEventsUsingGET_1_sortOrder: '<node property>', // (1) define node properties
                getEventsUsingGET_1_startTime: '<node property>', // (1) define node properties
                getEventsUsingGET_1_endTime: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEventsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEventsUsingGET',
                getEventsUsingGET_entityType: '<node property>', // (1) define node properties
                getEventsUsingGET_entityId: '<node property>', // (1) define node properties
                getEventsUsingGET_tenantId: '<node property>', // (1) define node properties
                getEventsUsingGET_pageSize: '<node property>', // (1) define node properties
                getEventsUsingGET_page: '<node property>', // (1) define node properties
                getEventsUsingGET_textSearch: '<node property>', // (1) define node properties
                getEventsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEventsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getEventsUsingGET_startTime: '<node property>', // (1) define node properties
                getEventsUsingGET_endTime: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEventsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEventsUsingPOST',
                getEventsUsingPOST_entityType: '<node property>', // (1) define node properties
                getEventsUsingPOST_entityId: '<node property>', // (1) define node properties
                getEventsUsingPOST_tenantId: '<node property>', // (1) define node properties
                getEventsUsingPOST_pageSize: '<node property>', // (1) define node properties
                getEventsUsingPOST_page: '<node property>', // (1) define node properties
                getEventsUsingPOST_textSearch: '<node property>', // (1) define node properties
                getEventsUsingPOST_sortProperty: '<node property>', // (1) define node properties
                getEventsUsingPOST_sortOrder: '<node property>', // (1) define node properties
                getEventsUsingPOST_startTime: '<node property>', // (1) define node properties
                getEventsUsingPOST_endTime: '<node property>', // (1) define node properties
                getEventsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEntityGroupPermissionsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEntityGroupPermissionsUsingGET',
                getEntityGroupPermissionsUsingGET_entityGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveGroupPermissionUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveGroupPermissionUsingPOST',
                saveGroupPermissionUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getGroupPermissionInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getGroupPermissionInfoByIdUsingGET',
                getGroupPermissionInfoByIdUsingGET_groupPermissionId: '<node property>', // (1) define node properties
                getGroupPermissionInfoByIdUsingGET_isUserGroup: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getGroupPermissionByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getGroupPermissionByIdUsingGET',
                getGroupPermissionByIdUsingGET_groupPermissionId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteGroupPermissionUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteGroupPermissionUsingDELETE',
                deleteGroupPermissionUsingDELETE_groupPermissionId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle loadUserGroupPermissionInfosUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'loadUserGroupPermissionInfosUsingPOST',
                loadUserGroupPermissionInfosUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserGroupPermissionsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserGroupPermissionsUsingGET',
                getUserGroupPermissionsUsingGET_userGroupId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveIntegrationUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveIntegrationUsingPOST',
                saveIntegrationUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle checkIntegrationConnectionUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'checkIntegrationConnectionUsingPOST',
                checkIntegrationConnectionUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getIntegrationByRoutingKeyUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getIntegrationByRoutingKeyUsingGET',
                getIntegrationByRoutingKeyUsingGET_routingKey: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getIntegrationByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getIntegrationByIdUsingGET',
                getIntegrationByIdUsingGET_integrationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteIntegrationUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteIntegrationUsingDELETE',
                deleteIntegrationUsingDELETE_integrationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getIntegrationsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getIntegrationsByIdsUsingGET',
                getIntegrationsByIdsUsingGET_integrationIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getIntegrationsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getIntegrationsUsingGET',
                getIntegrationsUsingGET_pageSize: '<node property>', // (1) define node properties
                getIntegrationsUsingGET_page: '<node property>', // (1) define node properties
                getIntegrationsUsingGET_textSearch: '<node property>', // (1) define node properties
                getIntegrationsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getIntegrationsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLwm2mBootstrapSecurityInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLwm2mBootstrapSecurityInfoUsingGET',
                getLwm2mBootstrapSecurityInfoUsingGET_isBootstrapServer: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getClientRegistrationTemplatesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getClientRegistrationTemplatesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveClientRegistrationTemplateUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveClientRegistrationTemplateUsingPOST',
                saveClientRegistrationTemplateUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteClientRegistrationTemplateUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteClientRegistrationTemplateUsingDELETE',
                deleteClientRegistrationTemplateUsingDELETE_clientRegistrationTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOAuth2ClientsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOAuth2ClientsUsingPOST',
                getOAuth2ClientsUsingPOST_pkgName: '<node property>', // (1) define node properties
                getOAuth2ClientsUsingPOST_platform: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCurrentOAuth2InfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCurrentOAuth2InfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveOAuth2InfoUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveOAuth2InfoUsingPOST',
                saveOAuth2InfoUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLoginProcessingUrlUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLoginProcessingUrlUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveOtaPackageInfoUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveOtaPackageInfoUsingPOST',
                saveOtaPackageInfoUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOtaPackageInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOtaPackageInfoByIdUsingGET',
                getOtaPackageInfoByIdUsingGET_otaPackageId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOtaPackageByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOtaPackageByIdUsingGET',
                getOtaPackageByIdUsingGET_otaPackageId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteOtaPackageUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteOtaPackageUsingDELETE',
                deleteOtaPackageUsingDELETE_otaPackageId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle downloadOtaPackageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'downloadOtaPackageUsingGET',
                downloadOtaPackageUsingGET_otaPackageId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveOtaPackageDataUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveOtaPackageDataUsingPOST',
                saveOtaPackageDataUsingPOST_otaPackageId: '<node property>', // (1) define node properties
                saveOtaPackageDataUsingPOST_checksum: '<node property>', // (1) define node properties
                saveOtaPackageDataUsingPOST_checksumAlgorithm: '<node property>', // (1) define node properties
                saveOtaPackageDataUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getGroupOtaPackagesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getGroupOtaPackagesUsingGET',
                getGroupOtaPackagesUsingGET_groupId: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_type: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_pageSize: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_page: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_textSearch: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getGroupOtaPackagesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOtaPackagesUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOtaPackagesUsingGET_1',
                getOtaPackagesUsingGET_1_deviceProfileId: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_type: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_pageSize: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_page: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_textSearch: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_sortProperty: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_1_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getOtaPackagesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getOtaPackagesUsingGET',
                getOtaPackagesUsingGET_pageSize: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_page: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_textSearch: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getOtaPackagesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle changeOwnerToCustomerUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'changeOwnerToCustomerUsingPOST',
                changeOwnerToCustomerUsingPOST_ownerId: '<node property>', // (1) define node properties
                changeOwnerToCustomerUsingPOST_entityType: '<node property>', // (1) define node properties
                changeOwnerToCustomerUsingPOST_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle changeOwnerToTenantUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'changeOwnerToTenantUsingPOST',
                changeOwnerToTenantUsingPOST_ownerId: '<node property>', // (1) define node properties
                changeOwnerToTenantUsingPOST_entityType: '<node property>', // (1) define node properties
                changeOwnerToTenantUsingPOST_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantQueuesByServiceTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantQueuesByServiceTypeUsingGET',
                getTenantQueuesByServiceTypeUsingGET_serviceType: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle downloadTestReportUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'downloadTestReportUsingPOST',
                downloadTestReportUsingPOST_reportsServerEndpointUrl: '<node property>', // (1) define node properties
                downloadTestReportUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle downloadDashboardReportUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'downloadDashboardReportUsingPOST',
                downloadDashboardReportUsingPOST_dashboardId: '<node property>', // (1) define node properties
                downloadDashboardReportUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveRoleUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveRoleUsingPOST',
                saveRoleUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRoleByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRoleByIdUsingGET',
                getRoleByIdUsingGET_roleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteRoleUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteRoleUsingDELETE',
                deleteRoleUsingDELETE_roleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRolesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRolesUsingGET',
                getRolesUsingGET_pageSize: '<node property>', // (1) define node properties
                getRolesUsingGET_page: '<node property>', // (1) define node properties
                getRolesUsingGET_type: '<node property>', // (1) define node properties
                getRolesUsingGET_textSearch: '<node property>', // (1) define node properties
                getRolesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getRolesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRolesByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRolesByIdsUsingGET',
                getRolesByIdsUsingGET_roleIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleOneWayDeviceRPCRequestUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleOneWayDeviceRPCRequestUsingPOST',
                handleOneWayDeviceRPCRequestUsingPOST_deviceId: '<node property>', // (1) define node properties
                handleOneWayDeviceRPCRequestUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleTwoWayDeviceRPCRequestUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleTwoWayDeviceRPCRequestUsingPOST',
                handleTwoWayDeviceRPCRequestUsingPOST_deviceId: '<node property>', // (1) define node properties
                handleTwoWayDeviceRPCRequestUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleOneWayDeviceRPCRequestUsingPOST_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleOneWayDeviceRPCRequestUsingPOST_1',
                handleOneWayDeviceRPCRequestUsingPOST_1_deviceId: '<node property>', // (1) define node properties
                handleOneWayDeviceRPCRequestUsingPOST_1_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getPersistedRpcByDeviceUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getPersistedRpcByDeviceUsingGET',
                getPersistedRpcByDeviceUsingGET_deviceId: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_pageSize: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_page: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_rpcStatus: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_textSearch: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_sortProperty: '<node property>', // (1) define node properties
                getPersistedRpcByDeviceUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getPersistedRpcUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getPersistedRpcUsingGET',
                getPersistedRpcUsingGET_rpcId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteRpcUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteRpcUsingDELETE',
                deleteRpcUsingDELETE_rpcId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleTwoWayDeviceRPCRequestUsingPOST_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleTwoWayDeviceRPCRequestUsingPOST_1',
                handleTwoWayDeviceRPCRequestUsingPOST_1_deviceId: '<node property>', // (1) define node properties
                handleTwoWayDeviceRPCRequestUsingPOST_1_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle assignRuleChainToEdgeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'assignRuleChainToEdgeUsingPOST',
                assignRuleChainToEdgeUsingPOST_edgeId: '<node property>', // (1) define node properties
                assignRuleChainToEdgeUsingPOST_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unassignRuleChainFromEdgeUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'unassignRuleChainFromEdgeUsingDELETE',
                unassignRuleChainFromEdgeUsingDELETE_edgeId: '<node property>', // (1) define node properties
                unassignRuleChainFromEdgeUsingDELETE_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeRuleChainsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeRuleChainsUsingGET',
                getEdgeRuleChainsUsingGET_edgeId: '<node property>', // (1) define node properties
                getEdgeRuleChainsUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgeRuleChainsUsingGET_page: '<node property>', // (1) define node properties
                getEdgeRuleChainsUsingGET_textSearch: '<node property>', // (1) define node properties
                getEdgeRuleChainsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgeRuleChainsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveRuleChainUsingPOST_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveRuleChainUsingPOST_1',
                saveRuleChainUsingPOST_1_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAutoAssignToEdgeRuleChainsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAutoAssignToEdgeRuleChainsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveRuleChainUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveRuleChainUsingPOST',
                saveRuleChainUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveRuleChainMetaDataUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveRuleChainMetaDataUsingPOST',
                saveRuleChainMetaDataUsingPOST_updateRelated: '<node property>', // (1) define node properties
                saveRuleChainMetaDataUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle testScriptUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'testScriptUsingPOST',
                testScriptUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRuleChainByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRuleChainByIdUsingGET',
                getRuleChainByIdUsingGET_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteRuleChainUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteRuleChainUsingDELETE',
                deleteRuleChainUsingDELETE_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setAutoAssignToEdgeRuleChainUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setAutoAssignToEdgeRuleChainUsingPOST',
                setAutoAssignToEdgeRuleChainUsingPOST_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unsetAutoAssignToEdgeRuleChainUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'unsetAutoAssignToEdgeRuleChainUsingDELETE',
                unsetAutoAssignToEdgeRuleChainUsingDELETE_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setEdgeTemplateRootRuleChainUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setEdgeTemplateRootRuleChainUsingPOST',
                setEdgeTemplateRootRuleChainUsingPOST_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRuleChainMetaDataUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRuleChainMetaDataUsingGET',
                getRuleChainMetaDataUsingGET_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRuleChainOutputLabelsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRuleChainOutputLabelsUsingGET',
                getRuleChainOutputLabelsUsingGET_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRuleChainOutputLabelsUsageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRuleChainOutputLabelsUsageUsingGET',
                getRuleChainOutputLabelsUsageUsingGET_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setRootRuleChainUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setRootRuleChainUsingPOST',
                setRootRuleChainUsingPOST_ruleChainId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle exportRuleChainsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'exportRuleChainsUsingGET',
                exportRuleChainsUsingGET_limit: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle importRuleChainsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'importRuleChainsUsingPOST',
                importRuleChainsUsingPOST_overwrite: '<node property>', // (1) define node properties
                importRuleChainsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRuleChainsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRuleChainsUsingGET',
                getRuleChainsUsingGET_pageSize: '<node property>', // (1) define node properties
                getRuleChainsUsingGET_page: '<node property>', // (1) define node properties
                getRuleChainsUsingGET_type: '<node property>', // (1) define node properties
                getRuleChainsUsingGET_textSearch: '<node property>', // (1) define node properties
                getRuleChainsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getRuleChainsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLatestRuleNodeDebugInputUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLatestRuleNodeDebugInputUsingGET',
                getLatestRuleNodeDebugInputUsingGET_ruleNodeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleRuleEngineRequestUsingPOST_2()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleRuleEngineRequestUsingPOST_2',
                handleRuleEngineRequestUsingPOST_2_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleRuleEngineRequestUsingPOST_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleRuleEngineRequestUsingPOST_1',
                handleRuleEngineRequestUsingPOST_1_entityType: '<node property>', // (1) define node properties
                handleRuleEngineRequestUsingPOST_1_entityId: '<node property>', // (1) define node properties
                handleRuleEngineRequestUsingPOST_1_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle handleRuleEngineRequestUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'handleRuleEngineRequestUsingPOST',
                handleRuleEngineRequestUsingPOST_entityType: '<node property>', // (1) define node properties
                handleRuleEngineRequestUsingPOST_entityId: '<node property>', // (1) define node properties
                handleRuleEngineRequestUsingPOST_timeout: '<node property>', // (1) define node properties
                handleRuleEngineRequestUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAllSchedulerEventsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAllSchedulerEventsUsingGET',
                getAllSchedulerEventsUsingGET_edgeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle assignSchedulerEventToEdgeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'assignSchedulerEventToEdgeUsingPOST',
                assignSchedulerEventToEdgeUsingPOST_edgeId: '<node property>', // (1) define node properties
                assignSchedulerEventToEdgeUsingPOST_schedulerEventId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle unassignSchedulerEventFromEdgeUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'unassignSchedulerEventFromEdgeUsingDELETE',
                unassignSchedulerEventFromEdgeUsingDELETE_edgeId: '<node property>', // (1) define node properties
                unassignSchedulerEventFromEdgeUsingDELETE_schedulerEventId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getEdgeSchedulerEventsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getEdgeSchedulerEventsUsingGET',
                getEdgeSchedulerEventsUsingGET_edgeId: '<node property>', // (1) define node properties
                getEdgeSchedulerEventsUsingGET_pageSize: '<node property>', // (1) define node properties
                getEdgeSchedulerEventsUsingGET_page: '<node property>', // (1) define node properties
                getEdgeSchedulerEventsUsingGET_textSearch: '<node property>', // (1) define node properties
                getEdgeSchedulerEventsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getEdgeSchedulerEventsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveSchedulerEventUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveSchedulerEventUsingPOST',
                saveSchedulerEventUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedulerEventInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSchedulerEventInfoByIdUsingGET',
                getSchedulerEventInfoByIdUsingGET_schedulerEventId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedulerEventByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSchedulerEventByIdUsingGET',
                getSchedulerEventByIdUsingGET_schedulerEventId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteSchedulerEventUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteSchedulerEventUsingDELETE',
                deleteSchedulerEventUsingDELETE_schedulerEventId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedulerEventsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSchedulerEventsByIdsUsingGET',
                getSchedulerEventsByIdsUsingGET_schedulerEventIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSchedulerEventsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSchedulerEventsUsingGET',
                getSchedulerEventsUsingGET_type: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getPrivacyPolicyUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getPrivacyPolicyUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSignUpSelfRegistrationParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSignUpSelfRegistrationParamsUsingGET',
                getSignUpSelfRegistrationParamsUsingGET_pkgName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTermsOfUseUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTermsOfUseUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSelfRegistrationParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSelfRegistrationParamsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveSelfRegistrationParamsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveSelfRegistrationParamsUsingPOST',
                saveSelfRegistrationParamsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteSelfRegistrationParamsUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteSelfRegistrationParamsUsingDELETE',
                deleteSelfRegistrationParamsUsingDELETE_domainName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateUserByEmailCodeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateUserByEmailCodeUsingPOST',
                activateUserByEmailCodeUsingPOST_emailCode: '<node property>', // (1) define node properties
                activateUserByEmailCodeUsingPOST_pkgName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateEmailUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateEmailUsingGET',
                activateEmailUsingGET_emailCode: '<node property>', // (1) define node properties
                activateEmailUsingGET_pkgName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateCloudUserByEmailCodeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateCloudUserByEmailCodeUsingPOST',
                activateCloudUserByEmailCodeUsingPOST_emailCode: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle activateCloudEmailUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'activateCloudEmailUsingGET',
                activateCloudEmailUsingGET_emailCode: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle resendCloudEmailActivationUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'resendCloudEmailActivationUsingPOST',
                resendCloudEmailActivationUsingPOST_email: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle mobileLoginUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'mobileLoginUsingGET',
                mobileLoginUsingGET_pkgName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle resendEmailActivationUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'resendEmailActivationUsingPOST',
                resendEmailActivationUsingPOST_email: '<node property>', // (1) define node properties
                resendEmailActivationUsingPOST_pkgName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle signUpUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'signUpUsingPOST',
                signUpUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getRecaptchaPublicKeyUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getRecaptchaPublicKeyUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle acceptPrivacyPolicyUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'acceptPrivacyPolicyUsingPOST',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle acceptPrivacyPolicyAndTermsOfUseUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'acceptPrivacyPolicyAndTermsOfUseUsingPOST',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle acceptTermsOfUseUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'acceptTermsOfUseUsingPOST',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle isDisplayWelcomeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'isDisplayWelcomeUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setNotDisplayWelcomeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setNotDisplayWelcomeUsingPOST',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle privacyPolicyAcceptedUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'privacyPolicyAcceptedUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteTenantAccountUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteTenantAccountUsingPOST',
                deleteTenantAccountUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle termsOfUseAcceptedUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'termsOfUseAcceptedUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSolutionTemplateDetailsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSolutionTemplateDetailsUsingGET',
                getSolutionTemplateDetailsUsingGET_solutionTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSolutionTemplateInfosUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSolutionTemplateInfosUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getSolutionTemplateInstructionsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getSolutionTemplateInstructionsUsingGET',
                getSolutionTemplateInstructionsUsingGET_solutionTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle uninstallSolutionTemplateUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'uninstallSolutionTemplateUsingDELETE',
                uninstallSolutionTemplateUsingDELETE_solutionTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle installSolutionTemplateUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'installSolutionTemplateUsingPOST',
                installSolutionTemplateUsingPOST_solutionTemplateId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfileDataUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfileDataUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantSubscriptionUsageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantSubscriptionUsageUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfileDataByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfileDataByIdUsingGET',
                getTenantProfileDataByIdUsingGET_tenantProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveResourceUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveResourceUsingPOST',
                saveResourceUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getResourceInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getResourceInfoByIdUsingGET',
                getResourceInfoByIdUsingGET_resourceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLwm2mListObjectsPageUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLwm2mListObjectsPageUsingGET',
                getLwm2mListObjectsPageUsingGET_pageSize: '<node property>', // (1) define node properties
                getLwm2mListObjectsPageUsingGET_page: '<node property>', // (1) define node properties
                getLwm2mListObjectsPageUsingGET_textSearch: '<node property>', // (1) define node properties
                getLwm2mListObjectsPageUsingGET_sortProperty: '<node property>', // (1) define node properties
                getLwm2mListObjectsPageUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLwm2mListObjectsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLwm2mListObjectsUsingGET',
                getLwm2mListObjectsUsingGET_sortOrder: '<node property>', // (1) define node properties
                getLwm2mListObjectsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getLwm2mListObjectsUsingGET_objectIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getResourceByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getResourceByIdUsingGET',
                getResourceByIdUsingGET_resourceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteResourceUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteResourceUsingDELETE',
                deleteResourceUsingDELETE_resourceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle downloadResourceUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'downloadResourceUsingGET',
                downloadResourceUsingGET_resourceId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getResourcesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getResourcesUsingGET',
                getResourcesUsingGET_pageSize: '<node property>', // (1) define node properties
                getResourcesUsingGET_page: '<node property>', // (1) define node properties
                getResourcesUsingGET_textSearch: '<node property>', // (1) define node properties
                getResourcesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getResourcesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveDeviceAttributesUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveDeviceAttributesUsingPOST',
                saveDeviceAttributesUsingPOST_deviceId: '<node property>', // (1) define node properties
                saveDeviceAttributesUsingPOST_scope: '<node property>', // (1) define node properties
                saveDeviceAttributesUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteDeviceAttributesUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteDeviceAttributesUsingDELETE',
                deleteDeviceAttributesUsingDELETE_deviceId: '<node property>', // (1) define node properties
                deleteDeviceAttributesUsingDELETE_scope: '<node property>', // (1) define node properties
                deleteDeviceAttributesUsingDELETE_keys: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityAttributesV2UsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityAttributesV2UsingPOST',
                saveEntityAttributesV2UsingPOST_entityType: '<node property>', // (1) define node properties
                saveEntityAttributesV2UsingPOST_entityId: '<node property>', // (1) define node properties
                saveEntityAttributesV2UsingPOST_scope: '<node property>', // (1) define node properties
                saveEntityAttributesV2UsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAttributeKeysUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAttributeKeysUsingGET',
                getAttributeKeysUsingGET_entityType: '<node property>', // (1) define node properties
                getAttributeKeysUsingGET_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAttributeKeysByScopeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAttributeKeysByScopeUsingGET',
                getAttributeKeysByScopeUsingGET_entityType: '<node property>', // (1) define node properties
                getAttributeKeysByScopeUsingGET_entityId: '<node property>', // (1) define node properties
                getAttributeKeysByScopeUsingGET_scope: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTimeseriesKeysUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTimeseriesKeysUsingGET_1',
                getTimeseriesKeysUsingGET_1_entityType: '<node property>', // (1) define node properties
                getTimeseriesKeysUsingGET_1_entityId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteEntityTimeseriesUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteEntityTimeseriesUsingDELETE',
                deleteEntityTimeseriesUsingDELETE_entityType: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_entityId: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_keys: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_deleteAllDataForKeys: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_startTs: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_endTs: '<node property>', // (1) define node properties
                deleteEntityTimeseriesUsingDELETE_rewriteLatestIfDeleted: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityTelemetryWithTTLUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityTelemetryWithTTLUsingPOST',
                saveEntityTelemetryWithTTLUsingPOST_entityType: '<node property>', // (1) define node properties
                saveEntityTelemetryWithTTLUsingPOST_entityId: '<node property>', // (1) define node properties
                saveEntityTelemetryWithTTLUsingPOST_scope: '<node property>', // (1) define node properties
                saveEntityTelemetryWithTTLUsingPOST_ttl: '<node property>', // (1) define node properties
                saveEntityTelemetryWithTTLUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityTelemetryUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityTelemetryUsingPOST',
                saveEntityTelemetryUsingPOST_entityType: '<node property>', // (1) define node properties
                saveEntityTelemetryUsingPOST_entityId: '<node property>', // (1) define node properties
                saveEntityTelemetryUsingPOST_scope: '<node property>', // (1) define node properties
                saveEntityTelemetryUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAttributesByScopeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAttributesByScopeUsingGET',
                getAttributesByScopeUsingGET_entityType: '<node property>', // (1) define node properties
                getAttributesByScopeUsingGET_entityId: '<node property>', // (1) define node properties
                getAttributesByScopeUsingGET_scope: '<node property>', // (1) define node properties
                getAttributesByScopeUsingGET_keys: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAttributesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAttributesUsingGET',
                getAttributesUsingGET_entityType: '<node property>', // (1) define node properties
                getAttributesUsingGET_entityId: '<node property>', // (1) define node properties
                getAttributesUsingGET_keys: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTimeseriesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTimeseriesUsingGET',
                getTimeseriesUsingGET_entityType: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_entityId: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_keys: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_startTs: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_endTs: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_interval: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_limit: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_agg: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_orderBy: '<node property>', // (1) define node properties
                getTimeseriesUsingGET_useStrictDataTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLatestTimeseriesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLatestTimeseriesUsingGET',
                getLatestTimeseriesUsingGET_entityType: '<node property>', // (1) define node properties
                getLatestTimeseriesUsingGET_entityId: '<node property>', // (1) define node properties
                getLatestTimeseriesUsingGET_keys: '<node property>', // (1) define node properties
                getLatestTimeseriesUsingGET_useStrictDataTypes: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveEntityAttributesV1UsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveEntityAttributesV1UsingPOST',
                saveEntityAttributesV1UsingPOST_entityType: '<node property>', // (1) define node properties
                saveEntityAttributesV1UsingPOST_entityId: '<node property>', // (1) define node properties
                saveEntityAttributesV1UsingPOST_scope: '<node property>', // (1) define node properties
                saveEntityAttributesV1UsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteEntityAttributesUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteEntityAttributesUsingDELETE',
                deleteEntityAttributesUsingDELETE_entityType: '<node property>', // (1) define node properties
                deleteEntityAttributesUsingDELETE_entityId: '<node property>', // (1) define node properties
                deleteEntityAttributesUsingDELETE_scope: '<node property>', // (1) define node properties
                deleteEntityAttributesUsingDELETE_keys: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveTenantUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveTenantUsingPOST',
                saveTenantUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantInfoByIdUsingGET',
                getTenantInfoByIdUsingGET_tenantId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantByIdUsingGET',
                getTenantByIdUsingGET_tenantId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteTenantUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteTenantUsingDELETE',
                deleteTenantUsingDELETE_tenantId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantInfosUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantInfosUsingGET',
                getTenantInfosUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantInfosUsingGET_page: '<node property>', // (1) define node properties
                getTenantInfosUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantInfosUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantInfosUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantsUsingGET',
                getTenantsUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantsUsingGET_page: '<node property>', // (1) define node properties
                getTenantsUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantsByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantsByIdsUsingGET',
                getTenantsByIdsUsingGET_tenantIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveTenantProfileUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveTenantProfileUsingPOST',
                saveTenantProfileUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfileByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfileByIdUsingGET',
                getTenantProfileByIdUsingGET_tenantProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteTenantProfileUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteTenantProfileUsingDELETE',
                deleteTenantProfileUsingDELETE_tenantProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setDefaultTenantProfileUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setDefaultTenantProfileUsingPOST',
                setDefaultTenantProfileUsingPOST_tenantProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDefaultTenantProfileInfoUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getDefaultTenantProfileInfoUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfileInfoByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfileInfoByIdUsingGET',
                getTenantProfileInfoByIdUsingGET_tenantProfileId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfileInfosUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfileInfosUsingGET',
                getTenantProfileInfosUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantProfileInfosUsingGET_page: '<node property>', // (1) define node properties
                getTenantProfileInfosUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantProfileInfosUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantProfileInfosUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantProfilesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantProfilesUsingGET',
                getTenantProfilesUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantProfilesUsingGET_page: '<node property>', // (1) define node properties
                getTenantProfilesUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantProfilesUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantProfilesUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getHelpBaseUrlUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getHelpBaseUrlUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAllCustomerUsersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAllCustomerUsersUsingGET',
                getAllCustomerUsersUsingGET_pageSize: '<node property>', // (1) define node properties
                getAllCustomerUsersUsingGET_page: '<node property>', // (1) define node properties
                getAllCustomerUsersUsingGET_textSearch: '<node property>', // (1) define node properties
                getAllCustomerUsersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getAllCustomerUsersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCustomerUsersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCustomerUsersUsingGET',
                getCustomerUsersUsingGET_customerId: '<node property>', // (1) define node properties
                getCustomerUsersUsingGET_pageSize: '<node property>', // (1) define node properties
                getCustomerUsersUsingGET_page: '<node property>', // (1) define node properties
                getCustomerUsersUsingGET_textSearch: '<node property>', // (1) define node properties
                getCustomerUsersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getCustomerUsersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByEntityGroupIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUsersByEntityGroupIdUsingGET',
                getUsersByEntityGroupIdUsingGET_entityGroupId: '<node property>', // (1) define node properties
                getUsersByEntityGroupIdUsingGET_pageSize: '<node property>', // (1) define node properties
                getUsersByEntityGroupIdUsingGET_page: '<node property>', // (1) define node properties
                getUsersByEntityGroupIdUsingGET_textSearch: '<node property>', // (1) define node properties
                getUsersByEntityGroupIdUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUsersByEntityGroupIdUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTenantAdminsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getTenantAdminsUsingGET',
                getTenantAdminsUsingGET_tenantId: '<node property>', // (1) define node properties
                getTenantAdminsUsingGET_pageSize: '<node property>', // (1) define node properties
                getTenantAdminsUsingGET_page: '<node property>', // (1) define node properties
                getTenantAdminsUsingGET_textSearch: '<node property>', // (1) define node properties
                getTenantAdminsUsingGET_sortProperty: '<node property>', // (1) define node properties
                getTenantAdminsUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle sendActivationEmailUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'sendActivationEmailUsingPOST',
                sendActivationEmailUsingPOST_email: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle isUserTokenAccessEnabledUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'isUserTokenAccessEnabledUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserUsersUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserUsersUsingGET',
                getUserUsersUsingGET_pageSize: '<node property>', // (1) define node properties
                getUserUsersUsingGET_page: '<node property>', // (1) define node properties
                getUserUsersUsingGET_textSearch: '<node property>', // (1) define node properties
                getUserUsersUsingGET_sortProperty: '<node property>', // (1) define node properties
                getUserUsersUsingGET_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserByIdUsingGET',
                getUserByIdUsingGET_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteUserUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteUserUsingDELETE',
                deleteUserUsingDELETE_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getActivationLinkUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getActivationLinkUsingGET',
                getActivationLinkUsingGET_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUserTokenUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUserTokenUsingGET',
                getUserTokenUsingGET_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle setUserCredentialsEnabledUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'setUserCredentialsEnabledUsingPOST',
                setUserCredentialsEnabledUsingPOST_userId: '<node property>', // (1) define node properties
                setUserCredentialsEnabledUsingPOST_userCredentialsEnabled: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByIdsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getUsersByIdsUsingGET',
                getUsersByIdsUsingGET_userIds: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveUserUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveUserUsingPOST',
                saveUserUsingPOST_sendActivationMail: '<node property>', // (1) define node properties
                saveUserUsingPOST_entityGroupId: '<node property>', // (1) define node properties
                saveUserUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getAllowedPermissionsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getAllowedPermissionsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLoginWhiteLabelParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getLoginWhiteLabelParamsUsingGET',
                getLoginWhiteLabelParamsUsingGET_logoImageChecksum: '<node property>', // (1) define node properties
                getLoginWhiteLabelParamsUsingGET_faviconChecksum: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle tenantWhiteLabelingAllowedUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'tenantWhiteLabelingAllowedUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCurrentLoginWhiteLabelParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCurrentLoginWhiteLabelParamsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getCurrentWhiteLabelParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getCurrentWhiteLabelParamsUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle isCustomerWhiteLabelingAllowedUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'isCustomerWhiteLabelingAllowedUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle isWhiteLabelingAllowedUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'isWhiteLabelingAllowedUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveLoginWhiteLabelParamsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveLoginWhiteLabelParamsUsingPOST',
                saveLoginWhiteLabelParamsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle previewWhiteLabelParamsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'previewWhiteLabelParamsUsingPOST',
                previewWhiteLabelParamsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveWhiteLabelParamsUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveWhiteLabelParamsUsingPOST',
                saveWhiteLabelParamsUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWhiteLabelParamsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWhiteLabelParamsUsingGET',
                getWhiteLabelParamsUsingGET_logoImageChecksum: '<node property>', // (1) define node properties
                getWhiteLabelParamsUsingGET_faviconChecksum: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveWidgetTypeUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveWidgetTypeUsingPOST',
                saveWidgetTypeUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWidgetTypeByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWidgetTypeByIdUsingGET',
                getWidgetTypeByIdUsingGET_widgetTypeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteWidgetTypeUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteWidgetTypeUsingDELETE',
                deleteWidgetTypeUsingDELETE_widgetTypeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBundleWidgetTypesDetailsUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBundleWidgetTypesDetailsUsingGET',
                getBundleWidgetTypesDetailsUsingGET_isSystem: '<node property>', // (1) define node properties
                getBundleWidgetTypesDetailsUsingGET_bundleAlias: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBundleWidgetTypesInfosUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBundleWidgetTypesInfosUsingGET',
                getBundleWidgetTypesInfosUsingGET_isSystem: '<node property>', // (1) define node properties
                getBundleWidgetTypesInfosUsingGET_bundleAlias: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getBundleWidgetTypesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getBundleWidgetTypesUsingGET',
                getBundleWidgetTypesUsingGET_isSystem: '<node property>', // (1) define node properties
                getBundleWidgetTypesUsingGET_bundleAlias: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWidgetTypeUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWidgetTypeUsingGET',
                getWidgetTypeUsingGET_isSystem: '<node property>', // (1) define node properties
                getWidgetTypeUsingGET_bundleAlias: '<node property>', // (1) define node properties
                getWidgetTypeUsingGET_alias: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle saveWidgetsBundleUsingPOST()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'saveWidgetsBundleUsingPOST',
                saveWidgetsBundleUsingPOST_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWidgetsBundleByIdUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWidgetsBundleByIdUsingGET',
                getWidgetsBundleByIdUsingGET_widgetsBundleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteWidgetsBundleUsingDELETE()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'deleteWidgetsBundleUsingDELETE',
                deleteWidgetsBundleUsingDELETE_widgetsBundleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWidgetsBundlesUsingGET()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWidgetsBundlesUsingGET',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getWidgetsBundlesUsingGET_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'thingsboard-pe-rest-api', name: 'thingsboard-pe-rest-api',
                method: 'getWidgetsBundlesUsingGET_1',
                getWidgetsBundlesUsingGET_1_pageSize: '<node property>', // (1) define node properties
                getWidgetsBundlesUsingGET_1_page: '<node property>', // (1) define node properties
                getWidgetsBundlesUsingGET_1_textSearch: '<node property>', // (1) define node properties
                getWidgetsBundlesUsingGET_1_sortProperty: '<node property>', // (1) define node properties
                getWidgetsBundlesUsingGET_1_sortOrder: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'thingsboard-pe-rest-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
