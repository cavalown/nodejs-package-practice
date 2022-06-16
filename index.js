const fileOperate = require("./fileOperate");

const filePath = './sampleFiles/sample.json'
const newFilePath = './writeFiles/testFile.txt'

// fileOperate.toReadFile(filePath);

const data = '嘎嘎嗚拉拉！唷唷唷！'
fileOperate.toWriteFile(newFilePath, data);