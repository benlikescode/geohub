const parseJsonFile = async (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event: any) => resolve(JSON.parse(event.target.result))
    fileReader.onerror = (error) => reject(error)
    fileReader.readAsText(file)
  })
}

export default parseJsonFile
