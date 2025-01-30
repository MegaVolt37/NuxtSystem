export const usePendingState = (asyncFn) => {
  const [pending, togglePending] = useToggle(false)

  const execute = async (...args) => {
    try {
      togglePending(true)

      const res = await asyncFn(...args)

      togglePending(false)

      return res
    } catch (err) {
      togglePending(false)

      throw err
    }
  }

  return [execute, pending]
}