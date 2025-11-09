
'use client'
import React, { useState } from 'react'

export default function VionixChat(){
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([
    { role:'assistant', content:'Namaste! Main Vionix hoon — kaise madad karun?' }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  async function send(){
    const text = input.trim()
    if(!text) return
    setMessages(prev=>[...prev, {role:'user', content:text}])
    setInput('')
    setThinking(true)
    const r = await fetch('/api/vionix', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ messages: [{role:'user', content:text}] })
    })
    const data = await r.json()
    setMessages(prev=>[...prev, {role:'assistant', content: data.reply || '...'}])
    setThinking(false)
  }

  return (
    <div style={{maxWidth:820,margin:'24px auto',background:'#fff',borderRadius:16,padding:16,boxShadow:'0 6px 24px rgba(0,0,0,0.08)'}}>
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <div style={{width:44,height:44,borderRadius:999,background:'#4f46e5',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>V</div>
        <div>
          <div style={{fontWeight:600}}>Vionix</div>
          <div style={{fontSize:12,color:'#64748b'}}>Real‑world AI assistant</div>
        </div>
      </div>
      <div style={{height:420,overflowY:'auto',border:'1px solid #e5e7eb',borderRadius:8,padding:12,background:'#fafafa'}}>
        {messages.map((m,i)=> (
          <div key={i} style={{marginBottom:8}}>
            <div style={{display:'inline-block',maxWidth:'85%',whiteSpace:'pre-wrap',fontSize:14,padding:'8px 10px',borderRadius:8,background:m.role==='user'?'#fff':'#eef2ff'}}>{m.content}</div>
            <div style={{fontSize:10,color:'#94a3b8',marginTop:4}}>{m.role}</div>
          </div>
        ))}
        {thinking && <div style={{fontSize:12,color:'#64748b'}}>Vionix soch raha hai…</div>}
      </div>
      <div style={{marginTop:12,display:'flex',gap:8,alignItems:'flex-end'}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Ask anything… (Hindi/English)" style={{flex:1,border:'1px solid #e5e7eb',borderRadius:8,padding:8,height:64}}/>
        <button onClick={send} style={{padding:'10px 14px',borderRadius:8,background:'#4f46e5',color:'#fff',border:'none',cursor:'pointer'}}>Send</button>
      </div>
    </div>
  )
}
