import { createContext, useContext, useState } from 'react'

interface Toast {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

const ToastContext = createContext<{
  toast: (props: Toast) => void
  activeToast: Toast | null
}>({
  toast: () => {},
  activeToast: null,
})

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeToast, setActiveToast] = useState<Toast | null>(null)

  const toast = (props: Toast) => {
    setActiveToast(props)
    setTimeout(() => setActiveToast(null), 3000)
  }

  return (
    <ToastContext.Provider value={{ toast, activeToast }}>
      {children}
      {activeToast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
          activeToast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          <h3 className="font-bold">{activeToast.title}</h3>
          <p>{activeToast.description}</p>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export const Toaster: React.FC = () => {
  const { activeToast } = useToast()

  if (!activeToast) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
      activeToast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
    } text-white`}>
      <h3 className="font-bold">{activeToast.title}</h3>
      <p>{activeToast.description}</p>
    </div>
  )
}
