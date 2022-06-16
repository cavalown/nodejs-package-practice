/**
 * 使用fs-extra操作檔案。
 */

const fs = require('fs-extra');
const _ = require('lodash');

const filePath = './sampleFiles/sample.xml';
const newFilePath = './writeFiles/test.txt'
const data = '這是一個測試的檔案內容～'

module.exports = {
	// 讀取檔案: 以String輸出。
	toReadFile: (filePath)=>{
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				console.log(err)
			} else {
				console.log('read file ok:', data.toString());
			};
		})
	},
	toWriteFile: (newFilePath, data)=> {
		// 編寫檔案
		fs.writeFile(newFilePath, data, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`File "${_.last(newFilePath.split('/'))} write done."`);
			}
		})
	}
}