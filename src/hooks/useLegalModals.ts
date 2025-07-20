import { useState, useCallback } from 'react'

type ModalType = 'terms' | 'privacy' | null

interface UseLegalModalsReturn {
  activeModal: ModalType
  openTerms: () => void
  openPrivacy: () => void
  closeModal: () => void
  isTermsOpen: boolean
  isPrivacyOpen: boolean
  isAnyModalOpen: boolean
}

export const useLegalModals = (): UseLegalModalsReturn => {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openTerms = useCallback(() => setActiveModal('terms'), [])
  const openPrivacy = useCallback(() => setActiveModal('privacy'), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  return {
    activeModal,
    openTerms,
    openPrivacy,
    closeModal,
    isTermsOpen: activeModal === 'terms',
    isPrivacyOpen: activeModal === 'privacy',
    isAnyModalOpen: activeModal !== null
  }
}
