/* eslint-disable react/jsx-no-undef */
import React, { ChangeEvent, useState } from "react";
import XLSX from 'xlsx'
import { Result, Button } from 'antd';
import FunnelAnalylize from '../funnel/index';

interface targetResult {
  busProps: Object;
  userProps: Object;
  eventId: String;
  userName: String;
  realIp: String;
}


function Upload() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<targetResult[]>([])
  const [showFunnel, setShowFunnel] = useState(false)


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let fileName:Blob = event.target.files![0]
    let reader = new FileReader()
    reader.readAsBinaryString(fileName)
    reader.onload = function (e: any) {
      let workbook = XLSX.read(e.target.result, {type: 'binary'})
      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const outputs:targetResult[] = ws.map((item: any) => ({
        userProps: JSON.parse(item['py_dwd_track_analysis_codemonkey_view.usr_props']) ,
        busProps: JSON.parse(item['py_dwd_track_analysis_codemonkey_view.bus_props']) ,
        userName: item['py_dwd_track_analysis_codemonkey_view.user_name'],
        eventId: item['py_dwd_track_analysis_codemonkey_view.event_id'],
        realIp: item['py_dwd_track_analysis_codemonkey_view.realip'],
      }))
      setShowResult(true)
      setResult(outputs)
    }

  }

  const handleFunnelClick = () => {
    setShowResult(false)
    setShowFunnel(true)
  }

  const UploadResult =  (
    <Result
      status="success"
      title="Successfully Upload"
      subTitle="文件上传成功，请选择分析模式"
      extra={[
        <Button 
          type="primary" 
          onClick={handleFunnelClick}
          key="funnel"
        >
          漏斗分析
        </Button>,
        <Button
          onClick={() => window.location.reload()}
          key="reset">
          重新上传
        </Button>,
      ]}
    />
  )
  return (
      <>
       {showResult ? null : <input onChange={handleChange} type="file" /> }
       {showResult ? UploadResult : null}  
       <FunnelAnalylize data={result} />
       {showFunnel ?  <FunnelAnalylize data={result} /> : null}
      </>
  )
}

export default Upload;
