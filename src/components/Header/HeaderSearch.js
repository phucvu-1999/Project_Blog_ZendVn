import Input from '../shared/Input'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function HeaderSearch() {
  const history = useHistory()
  const [queryStr, setQueryStr] = useState('')

  function handleOnChange(evt) {
    setQueryStr(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    if (!queryStr) {
      return
    }

    const queryStrURI = encodeURIComponent(queryStr)

    history.push('/search?q=' + queryStrURI)
  }

  return (
    <div className="tcl-col-4">
      {/* Header Search */}
      <form onSubmit={handleSubmit} >
        <Input 
          type="search"
          placeholder="Nhap gia tri search ..."
          value={queryStr}
          onChange={handleOnChange}
        />
      </form>
    </div>
  )
}

export default HeaderSearch