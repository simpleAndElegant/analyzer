import React, { ChangeEvent } from "react";
import XLSX from 'xlsx'
interface targetFile {

}


function Upload() {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let fileName:Blob = event.target.files![0]
    let reader = new FileReader()
    reader.readAsBinaryString(fileName)
    reader.onload = function (e: any) {
      let workbook = XLSX.read(e.target.result, {type: 'binary'})
      let sheetList = workbook.SheetNames
      const result:any = []
      console.log(XLSX.utils.sheet_to_json(workbook.Sheets))
      // workbook.SheetNames.forEach((sheetName) => {
      //   result.push({
      //     sheetName: sheetName,
      //     sheet: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
      //   })
      // })
      console.log(result)

      // sheetList.forEach(function(y) {

      // })
    }
  }
  return (
    <input onChange={handleChange} type="file" />
  )
}

export default Upload;
