/**
 * Use ArangoDB
 */
import config from '../../config'
import { Database } from 'arangojs'
import _ from 'lodash'

export default class ArangoDB {
  /**
   * 初始建立，資料庫連線設定，無設定則使用預設
   * @param {Json} config 資料庫連線設定
   */
  connectionDB(customeConfig = {}) {
    const useConfig = _.merge(customeConfig, config.arangodb)
    const connectionConfig = {
      url: `${useConfig.protocol}://${useConfig.host}:${useConfig.port}`,
      databaseName: useConfig.databaseName,
      auth: useConfig.auth
    }
    this.db = new Database(connectionConfig)
  }

  /**
   * 連線關閉
   */
  closeConnection() {
    this.db.close()
    console.log('close db connection')
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
    const selectCollection = this.db.collection(collectionName)
    try {
      const result = await selectCollection.save(saveData)
      console.log('save result:', result)
      return result
    } catch (error) {
      // console.log(error)
      return { error: error }
    }
  }

  /**
   * 修改資料庫資料，包含新增既有的document的record
   * @param {String} collectionName 目標集合名
   * @param {JSON} feature 欲使用來指定document的特徵值
   * @param {JSON} saveData 儲存檔案
   * @returns {JSON} 儲存回傳
   */
  async updateData(collectionName, key, newData) {
    const selectCollection = this.db.collection(collectionName)
    const baseData = {
      updateTime: new Date().toISOString()
    }
    const updateData = _.merge(baseData, newData)
    try {
      const result = await selectCollection.update({ _key: key }, updateData)
      console.log('update result:', result)
      return { result }
    } catch (error) {
      // console.log(error)
      return { error: error }
    }
  }

  /**
   * 用_key獲取資料庫特定資料
   * @param {String} 資料庫資料_key值
   */
  async getDatabyKey(collectionName, key) {
    const selectCollection = this.db.collection(collectionName)
    try {
      const result = await selectCollection.document(key)
      return result
    } catch (error) {
      // console.log(error)
      return { error: error }
    }
  }

  /**
   * 用AQL查詢
   */
  async getDataAql(aql) {
    try {
      const result = await this.db.query(aql)
      return result
    } catch (error) {
      // console.log(error)
      return { error: error }
    }
  }

  /**
   * 用AQL更新
   */
  async updateDataAql(aql) {
    try {
      const result = await this.db.query(aql)
      return result
    } catch (error) {
      // console.log(error)
      return { error: error }
    }
  }
}
