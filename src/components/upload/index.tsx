import React, { ChangeEvent, useState } from "react";
import XLSX from 'xlsx'
import { Result, Button } from 'antd';

interface targetBlob {
  busProps: Object;
  userProps: Object;
  eventId: String;
  userName: String;
  realIp: String;
}


function Upload() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([])


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let fileName:Blob = event.target.files![0]
    let reader = new FileReader()
    reader.readAsBinaryString(fileName)
    reader.onload = function (e: any) {
      let workbook = XLSX.read(e.target.result, {type: 'binary'})
      const wsname = workbook.SheetNames[0]; //取第一张表
      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      const outputs:[] = ws.map((item: any) => ({
        usrProps: JSON.parse(item['py_dwd_track_testenv.usr_props']) ,
        busProps: JSON.parse(item['py_dwd_track_testenv.bus_props']) ,
        userName: item['py_dwd_track_testenv.user_name'],
        eventId: item['py_dwd_track_testenv.event_id'],
        realIp: item['py_dwd_track_testenv.realip'],
      }))
      setShowResult(true)
      setResult(outputs)
    }
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
          key="reset">重新上传</Button>,
      ]}
    />
  )

  return (
      <>
        <input onChange={handleChange} type="file" />
       {showResult ? UploadResult : null}  
      </>
 
  )
}

export default Upload;
