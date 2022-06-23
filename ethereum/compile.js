const path = require('path') ;
const solc = require('solc') ;
const fs = require('fs-extra') ;

const buildPath = path.resolve(__dirname, 'build') ;
fs.removeSync(buildPath) ;

const campaignPath = path.resolve(__dirname, 'Contracts', 'Campaign.sol') ;
const source = fs.readFileSync(campaignPath, 'utf8') ;

const input = {
	language : 'Solidity',
	sources : {
		'Campaign.sol' : {
			content : source,
		},
	},
	settings : {
		outputSelection : {
			'*' : {
				'*' : ['*'],
			},
		},
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts  ;
const compiledContract = output['Campaign.sol'] ;

fs.ensureDirSync(buildPath) ;

for(let contract in compiledContract){
	fs.outputJsonSync(
		path.resolve(__dirname, 'build' , contract + '.json') ,
		compiledContract[contract]
	);
}