/**
 * Use MongoDB
 */
import config from '../../config'
import { MongoClient } from 'mongodb'
import _ from 'lodash'

export default class MongoDB {
  /**
    * 初始建立，資料庫連線設定，無設定則使用預設
    * @param {Json} config 資料庫連線設定
    */
  connectionDB() {
    const url = config.mongodb.url
    this.client = new MongoClient(url)
    this.client.connect()
    console.log('mongo get connection')
    const db = config.mongodb.database
    this.db = this.client.db(db)
  }

  /**
    * 連線關閉
    */
  closeConnection() {
    this.client.close()
    console.log('close mongo connection')
  }

  /**
    * 資料存入資料庫，並返回紀錄狀況
    * @param {String} collectionName 目標集合名
    * @param {JSON} data 儲存檔案
    * @returns {JSON} 儲存回傳
    */
  async saveData(collectionName, data) {
    const baseData = {
      createTime: new Date().toISOString()
    }
    const saveData = _.merge(baseData, data)
    const collection = this.db.collection(collectionName)
    try {
      const result = await collection.insertOne(saveData)
      console.log('save result:', result)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  /**
    * 修改資料庫資料，包含新增既有的document的record
    * @param {String} collectionName 目標集合名
    * @param {JSON} feature 欲使用來指定document的特徵值
    * @param {JSON} newData 儲存檔案
    * @returns {JSON} 儲存回傳
    */
  async updateData(collectionName, feature, newData) {
    const collection = this.db.collection(collectionName)
    const baseData = {
      updateTime: new Date().toISOString()
    }
    const updateData = _.merge(baseData, newData)
    try {
      const result = await collection.updateOne(feature, { $set: updateData })
      console.log('update result:', result)
      return { result }
    } catch (err) {
      console.log(err)
      return { err }
    }
  }

  /**
   * 用搜尋條件獲取資料庫特定資料
   * @param {String} collectionName 目標集合名
   * @param {Json} feature 欲使用來指定document的特徵值，若為空物件{}，會找出全部資料。
   * @returns {JSON} 搜尋結果回傳
   */
  async getData(collectionName, feature = {}) {
    const collection = this.db.collection(collectionName)
    try {
      const result = await collection.find(feature).toArray()
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
