import React from 'react'

export default function Alert({handleClick,text,type}) {
    return (
        <div class={`alert ${type} alert-dismissible fade show ms-5 me-5`} role="alert">
            {text}!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClick}></button>
        </div>
    )
}
