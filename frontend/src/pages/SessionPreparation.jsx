import React from 'react'
import QuestionnaireTabs from '../components/Session/QuestionnaireTabs'

const SessionPreparation = () => {
  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

      <div className="z-10 w-full max-w-6xl px-4">
        <QuestionnaireTabs />
      </div>
    </div>
  )
}

export default SessionPreparation
