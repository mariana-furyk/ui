const downloadFile = (fileName, response) => {
  const url = URL.createObjectURL(new Blob([response.data]))
  const handleClick = function() {
    setTimeout(() => {
      URL.revokeObjectURL(url)
      this.removeEventListener('click', handleClick)
      this.remove()
    }, 150)
  }
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.addEventListener('click', handleClick, false)
  link.click()
}

export default downloadFile
