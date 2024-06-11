import React from 'react'
import {format} from 'timeago.js'

function Message({message,own}) {
  return <>
  <div className={own ? "message own" :"message"}>
    <div className="messageTop">
        <img className='messageImg' src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
        <p className='messageText'>{message?.text}</p>
    </div>
    <div className="messageBottom">{format(message?.createdAt)}</div>

  </div>
  
  </>
}

export default Message