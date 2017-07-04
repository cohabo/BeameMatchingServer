/**
 * Created by zenit1 on 28/12/2016.
 */
"use strict";

const path = require('path');
const os   = require('os');
const home = os.homedir();

const Constants   = require('./constants');
const db_provider = Constants.DbProviders.NeDB;


const sqlite_db_name           = "beame_matching.db";
const sqlite_db_admin_username = "admin";
const sqlite_env_name          = "production";
const sqlite_db_storage_root   = path.join(home, ".beame_matching_data");

const nedb_storage_root = path.join(home, process.env.BEAME_DATA_FOLDER || ".beame_data");

const SqliteConfigTemplate = {
	[sqlite_env_name]: {
		"username":             "",
		"password":             "",
		"storage":              "",
		"database":             "beame_matching_db",
		"host":                 "127.0.0.1",
		"dialect":              "sqlite",
		"autoMigrateOldSchema": true,
		"seederStorage":        "sequelize"
	}
};

const ConfigProps = {
	Settings: {
		DbProvider:                    "db_provider"
	},
	Sqlite:   {
		ConfigTemplate: "SqliteConfigTemplate",
		DbName:         "sqlite_db_name",
		AdminUserName:  "sqlite_db_admin_username",
		StorageRoot:    "sqlite_db_storage_root",
		EnvName:        "sqlite_env_name"
	},
	NeDB:     {
		StorageRoot: "nedb_storage_root"
	},
	BeameDir: {
		BeameFolderRootPath: "beame_server_folder_path",
		BeameFolderName:     "beame_server_folder_name"
	}
};

const ClientServersTemplate = {
	"Servers": []
};

module.exports = {
	ConfigProps,
	ClientServersTemplate,
	SqliteConfigTemplate,

	db_provider,

	nedb_storage_root,

	sqlite_db_name,
	sqlite_db_storage_root,
	sqlite_db_admin_username,
	sqlite_env_name
};