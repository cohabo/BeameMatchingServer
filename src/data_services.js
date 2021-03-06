/**
 * Created by zenit1 on 15/11/2016.
 */
"use strict";

/**
 * @typedef {Object} DataServicesSettings
 * @property {Number} session_timeout
 */

const beameSDK     = require('beame-sdk');
const module_name  = "DataServices";
const BeameLogger  = beameSDK.Logger;
const logger       = new BeameLogger(module_name);
const Bootstrapper = require('./bootstrapper');
const bootstrapper = Bootstrapper.getInstance();
const Constants    = require('../constants');
const DbProviders  = Constants.DbProviders;

var dataServicesInstance = null;

class DataServices {

	/**
	 * @param {DataServicesSettings} options
	 */
	constructor(options) {

		this._options = options || {};

		this._dbProvider = bootstrapper.dbProvider;
		this._dbService  = null;

		if (!this._dbProvider) {
			logger.error(`Db Provider not defined`);
			return;
		}

		switch (this._dbProvider) {
			case DbProviders.NeDB:
				this._dbService = new (require('./db/nedb'))(Bootstrapper.neDbRootPath, this._options);
				break;
			default:
				logger.error(`Unknown Db Provider ${this._dbProvider}`);
				return;
		}

	}

	start() {
		return this._dbService.start();
	}

	//region registration services
	getInvitations(appId) {
		return this._dbService.getInvitations(appId);
	}

	/**
	 *
	 * @param {Object} data
	 * @returns {Promise}
	 */
	saveInvitation(data) {
		return this._dbService.saveInvitation(data);
	}

	findInvitation(pin) {
		return this._dbService.findInvitation(pin);
	}

	deleteInvitation(id) {
		return this._dbService.deleteInvitation(id);
	}

	/**
	 * @param {String} fqdn
	 */
	markInvitationAsCompleted(fqdn) {
		return this._dbService.markInvitationAsCompleted(fqdn);
	}

	//endregion



	/**
	 *
	 * @param {DataServicesSettings|null|undefined} [options]
	 * @returns {DataServices}
	 */
	static getInstance(options){
		if(!dataServicesInstance){
			dataServicesInstance = new DataServices(options);
		}

		return dataServicesInstance;
	}
}


module.exports = DataServices;